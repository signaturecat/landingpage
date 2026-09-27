/**
 * signature.cat edge Worker - Cloudflare.
 *
 * Route: signature.cat/*  (sits in front of the static origin, GitHub Pages).
 *
 * Responsibilities (in request order):
 *
 * 1. LANGUAGE ROUTER: only the bare ROOT is locale-routed; every other path
 *    (/pl, /de, /fr, /legal, /docs/*, /assets/*, ...) passes to the origin.
 *    URL canonicalization (routePath below): trailing-slash and /index.html
 *    requests 301 to the no-slash canonical; extension-less paths are
 *    internally rewritten to the origin's <path>/index.html.
 *      - manual choice wins: `sigcat_locale` cookie (set by the on-page switcher),
 *      - otherwise the first supported Accept-Language subtag,
 *      - English / no match stays on "/" (x-default indexes normally).
 *    The redirect is a 302 with Vary + no-store (never cached across users).
 *
 * 2. SECURITY HEADERS on every response (GitHub Pages cannot set them):
 *    HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy,
 *    COOP - and on HTML documents an ENFORCED Content-Security-Policy with a
 *    per-request nonce. HTMLRewriter stamps that nonce on every <script> of
 *    the page, so the static inline scripts keep working.
 *
 *    CSP allowlist: 'self' plus the Google Analytics 4 / gtag hosts
 *    (www.googletagmanager.com for the loader script; *.google-analytics.com
 *    and *.analytics.google.com - incl. EU regional endpoints - for beacons).
 *    !!! Any NEW external origin (script, image, fetch/XHR, frame) will be
 *    BLOCKED until it is added to buildCsp() below. Update the allowlist in
 *    the same PR that introduces the resource, then `wrangler deploy`.
 *
 * 3. COOKIE CONSENT BANNER injected into every HTML page before </body>
 *    (single source for the landing and all legal subpages, localized from
 *    the first path segment). The banner ships hidden; the injected script
 *    shows it only when the `sigcat_consent` cookie is absent. Categories:
 *      - necessary: always on (checkbox checked + disabled),
 *      - analytics: opt-in toggle, default OFF (GDPR).
 *    A choice writes `sigcat_consent=v1:a1|a0` (12 months) and hides the
 *    banner for good; any element with class `js-cookie-settings` (the
 *    "Cookie settings" footer links) re-opens it. The script exposes
 *    `window.sigcatConsent.analytics` (true/false/null) and dispatches a
 *    `sigcat-consent` CustomEvent.
 *
 * 4. GOOGLE ANALYTICS 4 (GA_MEASUREMENT_ID below), loaded by the same
 *    injected script in BASIC consent mode: gtag.js is appended to <head>
 *    ONLY once the visitor has opted in (cookie a1 on load, or the moment
 *    they accept), preceded by gtag('consent','default') with ad signals
 *    denied. Withdrawing consent fires gtag('consent','update') to denied
 *    AND removes the _ga / _ga_* cookies. No requests reach Google before
 *    opt-in (we deliberately do NOT use "advanced" consent mode pings).
 *
 * 5. BANNER-GENERATOR LEAD CAPTURE (POST /api/banner-leads): the email gate
 *    on /banners-generator posts {email, consent, locale, source} here and
 *    the Worker creates the address as a Resend audience contact
 *    (subscriber). Requires two bindings set in the Cloudflare dashboard
 *    (see handleBannerLead below); until they exist the endpoint answers
 *    503 and the front-end proceeds without storing the lead (best-effort
 *    by design - the gate must never block the tool).
 *
 * 6. CONTACT FORM, lead mode (POST /api/contact-requests): the "Book a
 *    call" / "Custom pricing" form on /form. Turnstile is REQUIRED (fail
 *    closed without TURNSTILE_SECRET) and bound to this host + the form's
 *    widget action/cData; per-IP rate limit (CONTACT_RL). The lead goes to
 *    the Notion leads database (notion.js, insert-only token) and to Slack
 *    (SLACK_WEBHOOK_URL) - delivered when either accepted it. The visitor
 *    gets a confirmation email in the page language (confirmation-email.js,
 *    Resend, from contact@signature.cat); the address joins the Resend
 *    audience ONLY with the optional marketing opt-in. The answer carries the
 *    Google Calendar booking page (BOOKING_URL) for the form's second step.
 *
 * 7. CONTACT FORM, help mode (POST /api/help-requests): the docs "Help"
 *    button opens /form?topic=help - name, email, optional phone, urgency and
 *    a description. Same Turnstile/rate-limit rules (own cData), delivered to
 *    a SEPARATE Slack channel (SLACK_HELP_WEBHOOK_URL), confirmation email to
 *    the requester; never Notion, never the marketing audience.
 *
 * Rollback: remove the route / `wrangler delete`. Per-locale pages, hreflang
 * and legal pages keep working; you lose the auto-redirect, the security
 * headers and the consent banner.
 */
import { createNotionLead, notionParent } from './notion.js';
import { renderHelpConfirmation, renderLeadConfirmation, sendConfirmation } from './confirmation-email.js';

const SUPPORTED = ['en', 'pl', 'de', 'fr'];
const CONSENT_COOKIE = 'sigcat_consent';
const CONSENT_MAX_AGE = 31536000; // 12 months

// Google Analytics 4. BASIC consent mode by design: gtag.js is injected ONLY
// after the visitor opts in (window.sigcatConsent.analytics === true) - no
// cookieless pings before consent (that would be "advanced" consent mode,
// which contradicts our Privacy Policy statement that the tool runs only
// after consent and is legally riskier in the EU). Empty string disables GA.
const GA_MEASUREMENT_ID = 'G-8M16LHQXQP';

// ---- consent banner copy --------------------------------------------------
export const BANNER_I18N = {
  en: {
    title: 'Cookies at signature.cat',
    desc: 'We use necessary cookies to run this site (language choice, security). With your consent we also use analytics cookies (Google Analytics) to understand site traffic. Details:',
    policy: 'Privacy Policy',
    legal: 'Legal',
    necessary: 'Necessary - always on',
    analytics: 'Analytics (Google Analytics)',
    acceptAll: 'Accept all',
    necessaryOnly: 'Necessary only',
    save: 'Save choices',
  },
  pl: {
    title: 'Cookies na signature.cat',
    desc: 'Używamy niezbędnych cookies do działania strony (wybór języka, bezpieczeństwo). Za Twoją zgodą używamy też cookies analitycznych (Google Analytics), by rozumieć ruch na stronie. Szczegóły:',
    policy: 'Polityka prywatności',
    legal: 'Dokumenty prawne',
    necessary: 'Niezbędne - zawsze aktywne',
    analytics: 'Analityczne (Google Analytics)',
    acceptAll: 'Akceptuj wszystkie',
    necessaryOnly: 'Tylko niezbędne',
    save: 'Zapisz wybór',
  },
  de: {
    title: 'Cookies auf signature.cat',
    desc: 'Wir verwenden notwendige Cookies für den Betrieb der Seite (Sprachwahl, Sicherheit). Mit Ihrer Einwilligung verwenden wir auch Analyse-Cookies (Google Analytics), um den Traffic zu verstehen. Details:',
    policy: 'Datenschutzerklärung',
    legal: 'Rechtliches',
    necessary: 'Notwendig - immer aktiv',
    analytics: 'Analyse (Google Analytics)',
    acceptAll: 'Alle akzeptieren',
    necessaryOnly: 'Nur notwendige',
    save: 'Auswahl speichern',
  },
  fr: {
    title: 'Cookies sur signature.cat',
    desc: 'Nous utilisons des cookies nécessaires au fonctionnement du site (choix de langue, sécurité). Avec votre consentement, nous utilisons aussi des cookies analytiques (Google Analytics) pour comprendre le trafic. Détails :',
    policy: 'Politique de confidentialité',
    legal: 'Mentions légales',
    necessary: 'Nécessaires - toujours actifs',
    analytics: 'Analytiques (Google Analytics)',
    acceptAll: 'Tout accepter',
    necessaryOnly: 'Nécessaires uniquement',
    save: 'Enregistrer mes choix',
  },
};

// ---- security headers -------------------------------------------------------
export function buildCsp(nonce) {
  return [
    "default-src 'self'",
    // challenges.cloudflare.com: Turnstile widget on /banners-generator
    // (script + challenge iframe; frame-src keeps 'self' because it stops
    // inheriting from default-src once declared)
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://challenges.cloudflare.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
    // status.signature.cat: the /docs status pill fetches /en/index.json
    "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://status.signature.cat",
    // calendar.google.com: the appointment-schedule booking page embedded as
    // the second step of the /form contact form (BOOKING_URL)
    "frame-src 'self' https://challenges.cloudflare.com https://calendar.google.com",
    "font-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; ');
}

const BASE_HEADERS = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

function applyBaseHeaders(headers) {
  for (const [k, v] of Object.entries(BASE_HEADERS)) headers.set(k, v);
}

function makeNonce() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

// ---- consent banner ----------------------------------------------------------
export function bannerHtml(lang, nonce) {
  const loc = SUPPORTED.includes(lang) ? lang : 'en';
  const t = BANNER_I18N[loc];
  const policyHref = `/${loc}/policy`;
  return `
<div id="sigcat-cookies" hidden>
<style>
  #sigcat-cookies { --scc-bg: #fffdf9; --scc-ink: #292524; --scc-muted: #6b6660; --scc-border: #e7ddd0; --scc-accent: #f2a8ff; }
  @media (prefers-color-scheme: dark) {
    #sigcat-cookies { --scc-bg: #292524; --scc-ink: #faf5ef; --scc-muted: #a8a29e; --scc-border: #3f3a37; }
  }
  #sigcat-cookies { position: fixed; z-index: 9999; left: 16px; right: 16px; bottom: 16px; display: flex; justify-content: center; font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif; }
  /* the author display:flex above would defeat the UA [hidden] rule - re-assert it */
  #sigcat-cookies[hidden] { display: none !important; }
  #sigcat-cookies .scc-card { max-width: 560px; width: 100%; background: var(--scc-bg); color: var(--scc-ink); border: 1px solid var(--scc-border); border-radius: 16px; box-shadow: 0 8px 30px rgba(0,0,0,.18); padding: 18px 20px; font-size: 14px; line-height: 1.5; }
  #sigcat-cookies h2 { margin: 0 0 6px; font-size: 15px; line-height: 1.3; }
  #sigcat-cookies p { margin: 0 0 10px; color: var(--scc-muted); }
  #sigcat-cookies a { color: var(--scc-ink); text-decoration: underline; text-decoration-color: var(--scc-accent); text-underline-offset: 2px; }
  #sigcat-cookies label { display: flex; align-items: center; gap: 8px; margin: 4px 0; }
  #sigcat-cookies input[type=checkbox] { width: 16px; height: 16px; accent-color: #d073e0; }
  #sigcat-cookies .scc-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
  #sigcat-cookies button { cursor: pointer; border-radius: 999px; padding: 8px 16px; font-size: 13.5px; font-weight: 600; border: 1px solid var(--scc-border); background: transparent; color: var(--scc-ink); }
  #sigcat-cookies button.scc-primary { background: var(--scc-accent); border-color: var(--scc-accent); color: #1c1917; }
  #sigcat-cookies button:focus-visible, #sigcat-cookies input:focus-visible, #sigcat-cookies a:focus-visible { outline: 2px solid var(--scc-accent); outline-offset: 2px; }
</style>
<div class="scc-card" role="dialog" aria-modal="false" aria-labelledby="scc-title">
  <h2 id="scc-title">${t.title}</h2>
  <p>${t.desc} <a href="${policyHref}">${t.policy}</a> &middot; <a href="/legal">${t.legal}</a></p>
  <label><input type="checkbox" checked disabled /> ${t.necessary}</label>
  <label><input type="checkbox" id="scc-analytics" /> ${t.analytics}</label>
  <div class="scc-actions">
    <button type="button" id="scc-accept" class="scc-primary">${t.acceptAll}</button>
    <button type="button" id="scc-necessary">${t.necessaryOnly}</button>
    <button type="button" id="scc-save">${t.save}</button>
  </div>
</div>
</div>
<script nonce="${nonce}">
(function () {
  var box = document.getElementById('sigcat-cookies');
  if (!box) return;
  var toggle = document.getElementById('scc-analytics');
  var GA_ID = '${GA_MEASUREMENT_ID}';
  var gaLoaded = false;
  function loadGA() {
    if (gaLoaded || !GA_ID) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }
  function clearGaCookies() {
    var parts = document.cookie.split(';');
    for (var i = 0; i < parts.length; i++) {
      var name = parts[i].split('=')[0].replace(/^\\s+/, '');
      if (name === '_ga' || name.indexOf('_ga_') === 0) {
        document.cookie = name + '=; Max-Age=0; Path=/; Domain=.signature.cat; SameSite=Lax; Secure';
        document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax; Secure';
      }
    }
  }
  function read() {
    var m = document.cookie.match(/(?:^|;\\s*)${CONSENT_COOKIE}=v1:a([01])(?:;|$)/);
    return m ? m[1] === '1' : null;
  }
  function expose(v) {
    window.sigcatConsent = { analytics: v };
    if (v === true) loadGA();
    if (typeof window.gtag === 'function' && v !== null) {
      window.gtag('consent', 'update', { analytics_storage: v ? 'granted' : 'denied', ad_storage: 'denied' });
    }
    if (v !== null) {
      try { document.dispatchEvent(new CustomEvent('sigcat-consent', { detail: { analytics: v } })); } catch (e) {}
    }
  }
  function write(v) {
    document.cookie = '${CONSENT_COOKIE}=v1:a' + (v ? '1' : '0') +
      '; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax; Secure';
    if (!v) clearGaCookies();
    expose(v);
    box.hidden = true;
  }
  var current = read();
  expose(current);
  if (current === null) { box.hidden = false; }
  document.getElementById('scc-accept').addEventListener('click', function () { toggle.checked = true; write(true); });
  document.getElementById('scc-necessary').addEventListener('click', function () { toggle.checked = false; write(false); });
  document.getElementById('scc-save').addEventListener('click', function () { write(toggle.checked); });
  document.addEventListener('click', function (e) {
    var opener = e.target && e.target.closest ? e.target.closest('.js-cookie-settings') : null;
    if (!opener) return;
    e.preventDefault();
    var v = read();
    toggle.checked = v === true;
    box.hidden = false;
    document.getElementById('scc-accept').focus();
  });
})();
</script>
`;
}

// ---- URL canonicalization: no trailing slashes ---------------------------------
// Canonical page URLs have NO trailing slash (https://signature.cat/pl,
// /docs/templates, /legal). The origin (GitHub Pages) stores every page as
// <path>/index.html and would itself 301 extension-less paths TO the slashed
// form, so the Worker (a) 301-redirects any slashed or /index.html request to
// the canonical form and (b) internally rewrites extension-less paths to the
// origin's <path>/index.html - the origin never gets a chance to redirect.
export function routePath(pathname) {
  if (pathname === '/') return { type: 'pass' };
  // /index.html and /foo/index.html -> canonical parent URL
  if (pathname.endsWith('/index.html')) {
    const parent = pathname.slice(0, -'/index.html'.length);
    return { type: 'redirect', to: parent === '' ? '/' : parent };
  }
  // /foo/ (and /foo///) -> /foo
  if (pathname.endsWith('/')) {
    const stripped = pathname.replace(/\/+$/, '');
    return { type: 'redirect', to: stripped === '' ? '/' : stripped };
  }
  // extension-less page URL -> serve the directory index from the origin
  if (!/\.[a-z0-9]+$/i.test(pathname)) {
    return { type: 'rewrite', path: `${pathname}/index.html` };
  }
  return { type: 'pass' };
}

// ---- shared API plumbing (banner leads + contact form) --------------------------
function jsonResponse(status, body) {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  });
  applyBaseHeaders(headers);
  return new Response(JSON.stringify(body), { status, headers });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const isEmail = (email) => email.length <= 254 && EMAIL_RE.test(email);

// Cloudflare Turnstile (canonical siteverify - the server-side check is
// what actually stops bots; the on-page widget is just the token source).
// By default enforced whenever TURNSTILE_SECRET is configured on the Worker
// (the banner gate is best-effort by design). Options for endpoints that
// must never run unverified:
//   required - no TURNSTILE_SECRET = 503, fail closed (nothing forwarded);
//   expect   - {action, cdata}: the token must also have been issued on
//              this very host, for this widget action and this form's cData
//              (Cloudflare's recommended hostname/action checks), so a token
//              solved elsewhere cannot be replayed here.
// Resolves to null when the request may proceed, otherwise to the
// rejection to send.
const TURNSTILE_TOKEN_MAX = 2048; // Cloudflare's documented token maximum
async function turnstileRejection(request, env, payload, { required = false, expect = null } = {}) {
  if (!env?.TURNSTILE_SECRET) {
    return required ? { status: 503, error: 'turnstile_unconfigured' } : null;
  }
  const token =
    typeof payload?.['cf-turnstile-response'] === 'string'
      ? payload['cf-turnstile-response']
      : '';
  if (!token) return { status: 403, error: 'turnstile_required' };
  if (token.length > TURNSTILE_TOKEN_MAX) return { status: 403, error: 'turnstile_invalid' };
  let outcome;
  try {
    const verify = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET,
          response: token,
          remoteip: request.headers.get('CF-Connecting-IP') || '',
        }),
      },
    );
    outcome = await verify.json();
  } catch (e) {
    return { status: 503, error: 'turnstile_unavailable' };
  }
  if (outcome?.success !== true) return { status: 403, error: 'turnstile_failed' };
  if (
    expect &&
    (outcome.hostname !== new URL(request.url).hostname ||
      outcome.action !== expect.action ||
      outcome.cdata !== expect.cdata)
  ) {
    return { status: 403, error: 'turnstile_mismatch' };
  }
  return null;
}

// Sent on every outbound API call: Resend rejects requests without a
// User-Agent (403), and it identifies us in the other providers' logs.
const USER_AGENT = 'signature.cat-worker/1.0 (+https://signature.cat)';

// Resend audience contact (subscribed). Callers only reach this with an
// explicit marketing opt-in from the visitor.
function addResendContact(env, audienceId, contact) {
  return fetch(
    `https://api.resend.com/audiences/${encodeURIComponent(audienceId)}/contacts`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
      },
      body: JSON.stringify({ ...contact, unsubscribed: false }),
    },
  );
}

// ---- banner-generator lead capture ----------------------------------------------
// POST /api/banner-leads -> create the address as a Resend audience contact.
// Configuration (set by DevOps in the Cloudflare dashboard - never in the
// repo): RESEND_API_KEY (secret) and RESEND_AUDIENCE_ID (variable). Consent
// is required in the payload - the front-end gate has a mandatory marketing
// consent checkbox; requests without consent === true are rejected.
export async function handleBannerLead(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'method_not_allowed' });
  }
  let payload;
  try {
    payload = await request.json();
  } catch (e) {
    return jsonResponse(400, { ok: false, error: 'invalid_json' });
  }
  const email = typeof payload?.email === 'string' ? payload.email.trim() : '';
  if (!isEmail(email) || payload?.consent !== true) {
    return jsonResponse(400, { ok: false, error: 'invalid_payload' });
  }
  const blocked = await turnstileRejection(request, env, payload);
  if (blocked) return jsonResponse(blocked.status, { ok: false, error: blocked.error });
  if (!env?.RESEND_API_KEY || !env?.RESEND_AUDIENCE_ID) {
    return jsonResponse(503, { ok: false, error: 'lead_capture_unconfigured' });
  }
  const res = await addResendContact(env, env.RESEND_AUDIENCE_ID, { email }).catch(() => null);
  if (!res || !res.ok) return jsonResponse(502, { ok: false, error: 'lead_capture_failed' });
  return jsonResponse(200, { ok: true });
}

// ---- contact form (/form): lead + help requests -------------------------------------
// POST /api/contact-requests - lead mode ("Book a call" / "Custom pricing").
// POST /api/help-requests    - help mode (the docs "Help" button).
// Configuration (Cloudflare dashboard -> Workers -> landingpage -> Settings ->
// Variables and Secrets; never in the repo; store values as Secret):
//   TURNSTILE_SECRET        - REQUIRED by both endpoints (shared with the banner
//                             gate). They fail closed: without it every request
//                             is answered 503 and nothing is forwarded.
//   SLACK_WEBHOOK_URL       - leads channel (Slack incoming webhook; the channel
//                             is the one the webhook was created for).
//   SLACK_HELP_WEBHOOK_URL  - help channel, a separate webhook. Unset = help
//                             requests are answered 503 (email fallback).
//   NOTION_TOKEN + NOTION_DATA_SOURCE_ID (or NOTION_DATABASE_ID) - leads
//                             database, insert-only (see notion.js). Leads only.
//   BOOKING_URL             - optional Google Calendar appointment schedule,
//                             returned to the page as the lead form's step 2.
//   RESEND_SEND_API_KEY     - optional "Sending access" key for the confirmation
//                             emails; falls back to RESEND_API_KEY.
//   RESEND_API_KEY + RESEND_AUDIENCE_ID (or RESEND_CONTACT_AUDIENCE_ID) - the
//                             marketing audience, only with the visitor's opt-in.
//   CONTACT_RL              - Workers rate-limit binding (wrangler.toml), per IP.
// A lead is delivered when Slack OR Notion accepted it (both are tried; each
// failure is logged, and a Notion failure is flagged in the Slack message), so
// nothing is lost silently and a retry after a half-failure cannot happen with
// the lead already stored twice by us. Confirmation email, marketing audience
// and logging are side channels that never fail the request.
export const CONTACT_SIZES = ['1-50', '51-120', '121-300', '301-1000', '1001-5000', '5000+'];
// What a token must carry (see turnstileRejection `expect`): the widget action
// is the Spin telemetry marker shared by every widget on the site, so the form
// mode is identified by the cData the widget is rendered with in
// assets/js/contact-form.js (TURNSTILE_CDATA) - keep the two in sync.
export const CONTACT_TURNSTILE = { action: 'turnstile-spin-v2', cdata: 'contact-form' };
export const HELP_TURNSTILE = { action: 'turnstile-spin-v2', cdata: 'help-form' };
const CONTACT_TOPICS = { call: 'Book a call', pricing: 'Custom pricing', general: 'General enquiry' };
export const HELP_URGENCIES = ['low', 'normal', 'high', 'critical'];
const HELP_URGENCY = {
  low: { label: 'Low', emoji: ':white_circle:' },
  normal: { label: 'Normal', emoji: ':large_blue_circle:' },
  high: { label: 'High', emoji: ':large_orange_circle:' },
  critical: { label: 'Critical', emoji: ':red_circle:' },
};
// Docs pages a help request can come from (the page's referrer, path only).
const DOCS_PATH_RE = /^\/(?:(?:pl|de|fr)\/)?docs(?:\/[a-z0-9-]+)?$/;
const CONTACT_MAX_BODY = 16384;
const PHONE_RE = /^[+()0-9 ./-]{6,32}$/;
const SLACK_TIMEOUT_MS = 8000;

// Single-line field: control characters and whitespace runs become one space.
const oneLine = (v) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u001F\u007F\s]+/g, ' ').trim() : '';
// Multi-line field: keep line breaks (at most one blank line), drop other
// control characters.
const multiLine = (v) =>
  typeof v === 'string'
    ? v
        .replace(/\r\n?/g, '\n')
        .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
    : '';
const isPhone = (phone) => {
  const digits = phone.replace(/\D/g, '').length;
  return PHONE_RE.test(phone) && digits >= 6 && digits <= 20;
};
const pickLocaleOf = (payload) => (SUPPORTED.includes(payload?.locale) ? payload.locale : 'en');

/** Validate + normalize a lead. Mirrors contact-form.js (lead mode); null = invalid. */
export function parseContact(payload) {
  const name = oneLine(payload?.name);
  const email = oneLine(payload?.email);
  const phone = oneLine(payload?.phone);
  const company = oneLine(payload?.company);
  const size = oneLine(payload?.size);
  const message = multiLine(payload?.message);
  if (name.length < 2 || name.length > 120) return null;
  if (!isEmail(email)) return null;
  if (!isPhone(phone)) return null;
  if (company.length < 1 || company.length > 120) return null;
  if (!CONTACT_SIZES.includes(size)) return null;
  if (message.length > 2000) return null;
  const topic =
    typeof payload?.topic === 'string' && Object.hasOwn(CONTACT_TOPICS, payload.topic)
      ? payload.topic
      : 'general';
  return {
    name,
    email,
    phone,
    company,
    size,
    message,
    topic,
    locale: pickLocaleOf(payload),
    marketing: payload?.marketing === true,
  };
}

/** Validate + normalize a help request. Mirrors contact-form.js (help mode). */
export function parseHelp(payload) {
  const name = oneLine(payload?.name);
  const email = oneLine(payload?.email);
  const phone = oneLine(payload?.phone);
  const urgency = oneLine(payload?.urgency);
  const message = multiLine(payload?.message);
  if (name.length < 2 || name.length > 120) return null;
  if (!isEmail(email)) return null;
  if (phone && !isPhone(phone)) return null; // optional here
  if (!HELP_URGENCIES.includes(urgency)) return null;
  if (message.length < 10 || message.length > 2000) return null;
  const from = typeof payload?.from === 'string' && DOCS_PATH_RE.test(payload.from) ? payload.from : '';
  return { name, email, phone, urgency, message, from, locale: pickLocaleOf(payload) };
}

/** BOOKING_URL -> the embeddable booking page, or '' when unset/invalid.
    Only Google Calendar appointment pages pass: that is the one host the CSP
    frame-src allows, so anything else would render as a blocked frame. */
export function bookingEmbedUrl(raw) {
  if (typeof raw !== 'string' || raw.trim() === '') return '';
  let url;
  try {
    url = new URL(raw.trim());
  } catch (e) {
    return '';
  }
  if (
    url.protocol !== 'https:' ||
    url.hostname !== 'calendar.google.com' ||
    !url.pathname.startsWith('/calendar/appointments/')
  ) {
    return '';
  }
  url.searchParams.set('gv', 'true'); // Google's embed mode (frameable view)
  return url.toString();
}

// Slack mrkdwn: & < > are the only characters that need escaping (this also
// neutralizes <!channel>-style mentions and <url|label> links in user input).
const slackEscape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slackField = (label, value) => ({ type: 'mrkdwn', text: `*${label}*\n${slackEscape(value)}` });
// section text caps at 3000 characters; escaping can grow the message
function slackMessageBlock(label, message) {
  const msg = slackEscape(message);
  return {
    type: 'section',
    text: { type: 'mrkdwn', text: `*${label}*\n${msg.length > 2900 ? `${msg.slice(0, 2900)}...` : msg}` },
  };
}
const NOTION_NOTE = { off: 'not configured', created: 'row added' };

/** The Slack message (Block Kit) for one lead. */
export function contactSlackMessage(lead, { booking = false, notion = { status: 'off' } } = {}) {
  const topic = CONTACT_TOPICS[lead.topic];
  const blocks = [
    { type: 'header', text: { type: 'plain_text', text: `New contact request: ${topic}` } },
    {
      type: 'section',
      fields: [
        slackField('Name', lead.name),
        slackField('Company', lead.company),
        slackField('Email', lead.email),
        slackField('Phone', lead.phone),
        slackField('Organization size', `${lead.size} employees`),
        slackField('Topic', topic),
        slackField('Language', lead.locale.toUpperCase()),
      ],
    },
  ];
  if (lead.message) blocks.push(slackMessageBlock('Message', lead.message));
  const notionNote =
    NOTION_NOTE[notion.status] || `:warning: FAILED (${notion.detail || 'error'}) - add the row by hand`;
  blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `Marketing opt-in: ${lead.marketing ? 'yes' : 'no'} | Booking calendar shown: ${booking ? 'yes' : 'no'} | Notion: ${notionNote} | signature.cat/form`,
      },
    ],
  });
  return {
    text: slackEscape(`New contact request (${topic}): ${lead.company}, ${lead.name}, ${lead.size} employees`),
    blocks,
    unfurl_links: false,
    unfurl_media: false,
  };
}

/** The Slack message (Block Kit) for one help request (its own channel). */
export function helpSlackMessage(req) {
  const urgency = HELP_URGENCY[req.urgency];
  return {
    text: slackEscape(`Help request (${urgency.label}): ${req.name} <${req.email}>`),
    blocks: [
      { type: 'header', text: { type: 'plain_text', text: `${urgency.emoji} Help request: ${urgency.label}`, emoji: true } },
      {
        type: 'section',
        fields: [
          slackField('Name', req.name),
          slackField('Email', req.email),
          slackField('Phone', req.phone || '-'),
          slackField('Urgency', urgency.label),
          slackField('Language', req.locale.toUpperCase()),
          slackField('Docs page', req.from ? `signature.cat${req.from}` : '-'),
        ],
      },
      slackMessageBlock('Problem', req.message),
      {
        type: 'context',
        elements: [
          { type: 'mrkdwn', text: 'Reply to the requester by email | signature.cat/form?topic=help' },
        ],
      },
    ],
    unfurl_links: false,
    unfurl_media: false,
  };
}

// Method + size + JSON checks shared by both endpoints.
async function readJsonBody(request) {
  if (request.method !== 'POST') {
    return { error: jsonResponse(405, { ok: false, error: 'method_not_allowed' }) };
  }
  if (Number(request.headers.get('Content-Length') || 0) > CONTACT_MAX_BODY) {
    return { error: jsonResponse(413, { ok: false, error: 'payload_too_large' }) };
  }
  const raw = await request.text();
  if (raw.length > CONTACT_MAX_BODY) {
    return { error: jsonResponse(413, { ok: false, error: 'payload_too_large' }) };
  }
  try {
    return { payload: JSON.parse(raw) };
  } catch (e) {
    return { error: jsonResponse(400, { ok: false, error: 'invalid_json' }) };
  }
}

// Per-IP rate limit (Workers rate-limit binding CONTACT_RL in wrangler.toml).
// The confirmation email goes to whatever address the form carries, so this
// caps how fast anyone who got past Turnstile can make us send mail. Absent
// binding (tests, local) = no limit; a binding error never blocks a visitor.
async function rateLimited(request, env, scope) {
  if (typeof env?.CONTACT_RL?.limit !== 'function') return false;
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  try {
    const { success } = await env.CONTACT_RL.limit({ key: `${scope}:${ip}` });
    return success === false;
  } catch (e) {
    return false;
  }
}

async function postSlack(webhookUrl, message) {
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
      signal: AbortSignal.timeout(SLACK_TIMEOUT_MS),
    });
    if (!res.ok) console.error(`contact form: Slack answered ${res.status}`);
    return res.ok;
  } catch (e) {
    console.error('contact form: Slack unreachable');
    return false;
  }
}

// Side channels run after the response (ctx.waitUntil); without a ctx (tests)
// they are awaited so their effects are observable.
async function inBackground(ctx, tasks) {
  const all = Promise.all(tasks.filter(Boolean));
  if (ctx?.waitUntil) ctx.waitUntil(all);
  else await all;
}

export async function handleContactRequest(request, env, ctx) {
  const read = await readJsonBody(request);
  if (read.error) return read.error;
  const lead = parseContact(read.payload);
  if (!lead) return jsonResponse(400, { ok: false, error: 'invalid_payload' });
  if (await rateLimited(request, env, 'contact')) {
    return jsonResponse(429, { ok: false, error: 'rate_limited' });
  }
  // Fail closed + token bound to this host, widget action and form cData.
  const blocked = await turnstileRejection(request, env, read.payload, {
    required: true,
    expect: CONTACT_TURNSTILE,
  });
  if (blocked) return jsonResponse(blocked.status, { ok: false, error: blocked.error });
  const notionOn = Boolean(env?.NOTION_TOKEN && notionParent(env));
  if (!env?.SLACK_WEBHOOK_URL && !notionOn) {
    return jsonResponse(503, { ok: false, error: 'contact_unconfigured' });
  }
  const booking = bookingEmbedUrl(env.BOOKING_URL);
  // Notion first, so the Slack message can say whether the row landed.
  const notion = notionOn ? await createNotionLead(env, lead) : { status: 'off' };
  const slackOk = env.SLACK_WEBHOOK_URL
    ? await postSlack(env.SLACK_WEBHOOK_URL, contactSlackMessage(lead, { booking: Boolean(booking), notion }))
    : false;
  if (!slackOk && notion.status !== 'created') {
    return jsonResponse(502, { ok: false, error: 'contact_delivery_failed' });
  }
  // Marketing audience ONLY with the separate, unticked-by-default opt-in: a
  // contact request alone is no consent to marketing email (GDPR art. 7(4)).
  const audienceId = env.RESEND_CONTACT_AUDIENCE_ID || env.RESEND_AUDIENCE_ID;
  const [firstName, ...rest] = lead.name.split(' ');
  await inBackground(ctx, [
    lead.marketing && env.RESEND_API_KEY && audienceId
      ? addResendContact(env, audienceId, { email: lead.email, first_name: firstName, last_name: rest.join(' ') })
          .then((res) => {
            if (!res.ok) console.error(`contact form: Resend audience answered ${res.status}`);
          })
          .catch(() => console.error('contact form: Resend audience unreachable'))
      : null,
    sendConfirmation(env, lead.email, renderLeadConfirmation(lead, { booking }), {
      kind: 'contact',
      locale: lead.locale,
    }),
  ]);
  return jsonResponse(200, booking ? { ok: true, booking } : { ok: true });
}

export async function handleHelpRequest(request, env, ctx) {
  const read = await readJsonBody(request);
  if (read.error) return read.error;
  const req = parseHelp(read.payload);
  if (!req) return jsonResponse(400, { ok: false, error: 'invalid_payload' });
  if (await rateLimited(request, env, 'help')) {
    return jsonResponse(429, { ok: false, error: 'rate_limited' });
  }
  const blocked = await turnstileRejection(request, env, read.payload, {
    required: true,
    expect: HELP_TURNSTILE,
  });
  if (blocked) return jsonResponse(blocked.status, { ok: false, error: blocked.error });
  if (!env?.SLACK_HELP_WEBHOOK_URL) {
    return jsonResponse(503, { ok: false, error: 'help_unconfigured' });
  }
  if (!(await postSlack(env.SLACK_HELP_WEBHOOK_URL, helpSlackMessage(req)))) {
    return jsonResponse(502, { ok: false, error: 'help_delivery_failed' });
  }
  // No Notion row and no marketing audience for help requests - only the
  // confirmation email to the requester.
  await inBackground(ctx, [
    sendConfirmation(env, req.email, renderHelpConfirmation(req), { kind: 'help', locale: req.locale }),
  ]);
  return jsonResponse(200, { ok: true });
}

// ---- worker -------------------------------------------------------------------
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // API routes are handled before URL canonicalization (an extension-less
    // /api/* path must never be rewritten to <path>/index.html on the origin).
    if (url.pathname === '/api/banner-leads') {
      return handleBannerLead(request, env);
    }
    if (url.pathname === '/api/contact-requests') {
      return handleContactRequest(request, env, ctx);
    }
    if (url.pathname === '/api/help-requests') {
      return handleHelpRequest(request, env, ctx);
    }

    if (url.pathname === '/' || url.pathname === '/index.html') {
      const loc = pickLocale(request);
      if (loc !== 'en') {
        const headers = new Headers({
          Location: `/${loc}`,
          Vary: 'Cookie, Accept-Language',
          'Cache-Control': 'no-store',
        });
        applyBaseHeaders(headers);
        return new Response(null, { status: 302, headers });
      }
    }

    const route = routePath(url.pathname);
    if (route.type === 'redirect') {
      const headers = new Headers({
        Location: route.to + url.search,
        'Cache-Control': 'public, max-age=86400',
      });
      applyBaseHeaders(headers);
      return new Response(null, { status: 301, headers });
    }

    // Conditional-request guard for documents: if we forwarded If-None-Match /
    // If-Modified-Since, the origin could answer 304 Not Modified (no body),
    // the banner injection would have nothing to rewrite and the browser would
    // keep reusing a cached body captured under an OLDER worker version -
    // indefinitely, because the ETag keeps matching. Strip the validators for
    // likely-HTML paths so documents always arrive as full 200 responses.
    // Assets (paths with a non-.html extension) keep normal revalidation.
    const originPath = route.type === 'rewrite' ? route.path : url.pathname;
    const likelyHtml =
      originPath.endsWith('.html') || !/\.[a-z0-9]+$/i.test(originPath);
    let originRequest = request;
    if (route.type === 'rewrite' || likelyHtml) {
      const originUrl = new URL(url);
      if (route.type === 'rewrite') originUrl.pathname = route.path;
      originRequest = new Request(originUrl.toString(), request);
      if (likelyHtml) {
        originRequest.headers.delete('If-None-Match');
        originRequest.headers.delete('If-Modified-Since');
      }
    }

    const res = await fetch(originRequest);
    const isHtml = (res.headers.get('content-type') || '').includes('text/html');

    if (!isHtml) {
      const out = new Response(res.body, res);
      applyBaseHeaders(out.headers);
      return out;
    }

    const seg = url.pathname.split('/')[1];
    const lang = SUPPORTED.includes(seg) ? seg : 'en';
    const nonce = makeNonce();

    const rewritten = new HTMLRewriter()
      .on('script', {
        element(el) {
          el.setAttribute('nonce', nonce);
        },
      })
      .on('body', {
        element(el) {
          el.append(bannerHtml(lang, nonce), { html: true });
        },
      })
      .transform(res);

    const out = new Response(rewritten.body, rewritten);
    applyBaseHeaders(out.headers);
    out.headers.set('Content-Language', lang);
    out.headers.set('Content-Security-Policy', buildCsp(nonce));
    // Documents must not be revalidated against origin validators (see the
    // conditional-request guard above) and must be refetched once stale, so
    // every page view carries the injected banner + a fresh CSP nonce.
    out.headers.delete('ETag');
    out.headers.delete('Last-Modified');
    out.headers.set('Cache-Control', 'no-cache');
    return out;
  },
};

function pickLocale(request) {
  // 1) Manual override cookie set by the language switcher.
  const cookie = request.headers.get('Cookie') || '';
  const m = cookie.match(/(?:^|;\s*)sigcat_locale=([a-zA-Z]{2})\b/);
  if (m && SUPPORTED.includes(m[1].toLowerCase())) return m[1].toLowerCase();

  // 2) First supported Accept-Language subtag.
  const al = request.headers.get('Accept-Language') || '';
  for (const part of al.split(',')) {
    const tag = part.split(';')[0].trim().toLowerCase().split('-')[0];
    if (SUPPORTED.includes(tag)) return tag;
  }

  // 3) Default: English at the root.
  return 'en';
}

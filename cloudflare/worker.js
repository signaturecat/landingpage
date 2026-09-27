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
 *    CSP allowlist: 'self' plus the Google Tag Manager / Google Analytics 4
 *    hosts from Google's "Use Tag Manager with a Content Security Policy"
 *    guide (container, GA4 without Ads features, Preview Mode):
 *    www.googletagmanager.com (gtm.js and the gtag.js it loads),
 *    *.google-analytics.com and *.google.com (beacons, incl. the EU regional
 *    *.analytics.google.com endpoints), Preview Mode assets from
 *    tagmanager.google.com, fonts.googleapis.com, fonts.gstatic.com,
 *    ssl.gstatic.com and www.gstatic.com. Still NO 'unsafe-inline' for
 *    scripts (gtm.js carries the nonce and GTM propagates it to the scripts
 *    it injects) and NO 'unsafe-eval' (GTM Custom JavaScript variables
 *    evaluate to undefined - use Custom Templates instead).
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
 * 4. GOOGLE TAG MANAGER (GTM_CONTAINER_ID below), which loads Google
 *    Analytics 4 - the GA4 measurement ID lives INSIDE the container, not in
 *    this file. Loaded by the same injected script in BASIC consent mode:
 *    gtm.js is appended to <head> ONLY once the visitor has opted in (cookie
 *    a1 on load, or the moment they accept), preceded by
 *    gtag('consent','default') with ad signals denied and by the 'gtm.js'
 *    start event. Withdrawing consent fires gtag('consent','update') to
 *    denied AND removes the _ga / _ga_* cookies. No requests reach Google
 *    before opt-in (we deliberately do NOT use "advanced" consent mode pings,
 *    and there is no <noscript> GTM iframe: it would load without consent).
 *
 * 5. BANNER-GENERATOR LEAD CAPTURE (POST /api/banner-leads): the email gate
 *    on /banners-generator posts {email, consent, locale, source} here and
 *    the Worker creates the address as a Resend contact (subscriber) in the
 *    marketing segment. Requires two bindings set in the Cloudflare dashboard
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
 *    marketing segment ONLY with the optional marketing opt-in. The answer carries the
 *    Google Calendar booking page (BOOKING_URL) for the form's second step.
 *
 * 7. CONTACT FORM, help mode (POST /api/help-requests): the docs "Help"
 *    button opens /form?topic=help - name, email, optional phone, urgency and
 *    a description. Same Turnstile/rate-limit rules (own cData), delivered to
 *    a SEPARATE Slack channel (SLACK_HELP_WEBHOOK_URL), confirmation email to
 *    the requester; never Notion, never the marketing segment.
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

// Google Tag Manager container; it loads Google Analytics 4 (the Google tag
// with the GA4 measurement ID is configured inside the container). BASIC
// consent mode by design: gtm.js is injected ONLY after the visitor opts in
// (window.sigcatConsent.analytics === true) - no cookieless pings before
// consent (that would be "advanced" consent mode, which contradicts our
// Privacy Policy statement that the tool runs only after consent and is
// legally riskier in the EU). Every tag in the container fires under the
// ANALYTICS consent only: keep the container to GA4 until the banner has a
// marketing category and the Privacy Policy covers more. Empty string
// disables GTM (and with it GA4).
export const GTM_CONTAINER_ID = 'GTM-PD5TQCBR';

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
    // Google Tag Manager + the GA4 it loads: hosts from Google's "Use Tag
    // Manager with a Content Security Policy" guide (container, GA4 without
    // Ads features, Preview Mode). gtm.js gets the nonce and GTM propagates
    // it to the scripts it injects, so still no 'unsafe-inline' for scripts;
    // no 'unsafe-eval' either (GTM Custom JavaScript variables stay
    // undefined - use Custom Templates).
    // challenges.cloudflare.com: Turnstile widget on /banners-generator
    // (script + challenge iframe; frame-src keeps 'self' because it stops
    // inheriting from default-src once declared)
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com https://tagmanager.google.com https://challenges.cloudflare.com`,
    // googletagmanager / tagmanager / fonts.*: GTM Preview Mode (Tag Assistant)
    "style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://tagmanager.google.com https://fonts.googleapis.com",
    // *.gstatic.com: GTM Preview Mode icons
    "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com https://ssl.gstatic.com https://www.gstatic.com",
    // *.google.com: GA4 beacons (incl. the EU regional *.analytics.google.com
    // endpoints) and www.google.com, which the GTM container itself needs;
    // status.signature.cat: the /docs status pill fetches /en/index.json
    "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com https://status.signature.cat",
    // calendar.google.com: the appointment-schedule booking page embedded as
    // the second step of the /form contact form (BOOKING_URL)
    "frame-src 'self' https://challenges.cloudflare.com https://calendar.google.com",
    // fonts.gstatic.com + data: GTM Preview Mode (Tag Assistant badge)
    "font-src 'self' https://fonts.gstatic.com data:",
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
  var GTM_ID = '${GTM_CONTAINER_ID}';
  var NONCE = '${nonce}';
  var gtmLoaded = false;
  function loadGTM() {
    if (gtmLoaded || !GTM_ID) return;
    gtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    // Consent defaults go in BEFORE the container starts (Google's order).
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    // Google's nonce-aware container snippet: GTM propagates this nonce to
    // every script it injects, so its tags pass the enforced CSP.
    s.setAttribute('nonce', NONCE);
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
    if (v === true) loadGTM();
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

// Marketing segment for each opt-in source. Resend renamed audiences to
// segments (the official SDKs send stored audience ids to the segment
// endpoints), so the older *_AUDIENCE_ID variables are expected to keep
// working; the *_SEGMENT_ID names win when both are set.
export const bannerSegmentId = (env) => env?.RESEND_SEGMENT_ID || env?.RESEND_AUDIENCE_ID || '';
export const contactSegmentId = (env) =>
  env?.RESEND_CONTACT_SEGMENT_ID || env?.RESEND_CONTACT_AUDIENCE_ID || bannerSegmentId(env);

// Marketing contact in Resend (subscribed). Callers only reach this with an
// explicit marketing opt-in from the visitor. Resend Contacts API (global
// contacts + segments; the legacy POST /audiences/{id}/contacts was removed
// from Resend's OpenAPI spec on 2026-02-23 and is no longer documented):
// POST /contacts creates the contact inside the segment. For an address that
// already exists Resend answers 2xx with the existing contact, and whether it
// then applies `segments` is not documented - so
// POST /contacts/{id}/segments/{segment} makes the membership explicit. It
// goes by the contact id from the create answer (the address stays out of
// URLs); the address is only the fallback for an answer without an id. Only
// the create decides success; a failed membership call is logged, never fatal
// (a non-2xx there can also mean the address already was a member).
const RESEND_API = 'https://api.resend.com';
const RESEND_CONTACT_TIMEOUT_MS = 8000;
// Resend's error `name` (e.g. "validation_error") for the logs - never the
// message, which can echo the submitted address.
async function resendErrorName(res) {
  const body = await res.clone().json().catch(() => null);
  return typeof body?.name === 'string' ? ` ${body.name.slice(0, 60)}` : '';
}
export async function addResendContact(env, segmentId, contact, { label = 'marketing contact' } = {}) {
  const auth = { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'User-Agent': USER_AGENT };
  const body = { email: contact.email, unsubscribed: false, segments: [{ id: segmentId }] };
  // Names only when there is one: an empty string would blank the name an
  // existing contact already has.
  if (contact.first_name) body.first_name = contact.first_name;
  if (contact.last_name) body.last_name = contact.last_name;
  const res = await fetch(`${RESEND_API}/contacts`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(RESEND_CONTACT_TIMEOUT_MS),
  });
  if (!res.ok) {
    console.error(`${label}: Resend contact answered ${res.status}${await resendErrorName(res)}`);
    return res;
  }
  const created = await res.clone().json().catch(() => null);
  const who = typeof created?.id === 'string' && created.id ? created.id : contact.email;
  let member = null;
  try {
    // URL built inside the try: encodeURIComponent throws on a malformed
    // (lone surrogate) address, which must not turn a stored contact into an error.
    member = await fetch(`${RESEND_API}/contacts/${encodeURIComponent(who)}/segments/${encodeURIComponent(segmentId)}`, {
      method: 'POST',
      headers: auth,
      signal: AbortSignal.timeout(RESEND_CONTACT_TIMEOUT_MS),
    });
  } catch (e) {
    member = null;
  }
  if (!member?.ok) {
    console.error(`${label}: Resend segment membership ${member ? `HTTP ${member.status}${await resendErrorName(member)}` : 'unreachable'}`);
  }
  return res;
}

// ---- banner-generator lead capture ----------------------------------------------
// POST /api/banner-leads -> create the address as a Resend contact in the
// marketing segment. Configuration (set by DevOps in the Cloudflare dashboard -
// never in the repo): RESEND_API_KEY (secret, full access) and
// RESEND_SEGMENT_ID (the legacy RESEND_AUDIENCE_ID still works). Consent
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
  const segmentId = bannerSegmentId(env);
  if (!env?.RESEND_API_KEY || !segmentId) {
    return jsonResponse(503, { ok: false, error: 'lead_capture_unconfigured' });
  }
  const res = await addResendContact(env, segmentId, { email }, { label: 'banner gate' }).catch(() => {
    console.error('banner gate: Resend contact unreachable');
    return null;
  });
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
//   RESEND_API_KEY + RESEND_CONTACT_SEGMENT_ID (or RESEND_SEGMENT_ID; legacy
//                             *_AUDIENCE_ID names still work) - the marketing
//                             segment, only with the visitor's opt-in.
//   CONTACT_RL              - Workers rate-limit binding (wrangler.toml), per IP
//                             (IPv6 per /64), per endpoint.
//   CONTACT_RCPT_RL         - rate-limit binding, one confirmation email per
//                             recipient per minute across both forms.
// A lead is delivered when Slack OR Notion accepted it (both are tried; each
// failure is logged, and a failed or unconfirmed Notion write is flagged in the
// Slack message), so nothing is lost silently. After a Notion timeout the row
// may still exist ("unconfirmed"), so a retry can store it twice - a possible
// duplicate beats a lost lead. Confirmation email (CONTACT_RCPT_RL-gated),
// marketing segment and logging are side channels that never fail the request.
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

// Invisible format characters (soft hyphen, zero-width, bidi overrides and
// isolates, word joiner, BOM) never belong in a name or a message - they are
// how "Acme<U+202E>gnp.exe"-style spoofing reaches Slack, Notion and the email.
const INVISIBLE_RE = /[\u00AD\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g;
// Single-line field: control characters and whitespace runs become one space.
const oneLine = (v) =>
  typeof v === 'string'
    ? v.replace(INVISIBLE_RE, '').replace(/[\u0000-\u001F\u007F\s]+/g, ' ').trim()
    : '';
// Multi-line field: keep line breaks (at most one blank line), drop other
// control and invisible characters. contact-form.js mirrors this exactly.
const multiLine = (v) =>
  typeof v === 'string'
    ? v
        .replace(INVISIBLE_RE, '')
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
// verbatim: true - Slack must not turn a plain "@channel" / "@here" or a
// "#channel" in visitor text into a mention (or a URL into a link).
const slackField = (label, value) => ({
  type: 'mrkdwn',
  text: `*${label}*\n${slackEscape(value)}`,
  verbatim: true,
});
// section text caps at 3000 characters; escaping can grow the message
function slackMessageBlock(label, message) {
  const msg = slackEscape(message);
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*${label}*\n${msg.length > 2900 ? `${msg.slice(0, 2900)}...` : msg}`,
      verbatim: true,
    },
  };
}
const notionNote = (notion) => {
  if (notion.status === 'off') return 'not configured';
  if (notion.status === 'created') return 'row added';
  if (notion.status === 'unknown') {
    return `:warning: UNCONFIRMED (${notion.detail || 'no answer'}) - check Notion before adding the row by hand`;
  }
  return `:warning: FAILED (${notion.detail || 'error'}) - add the row by hand`;
};

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
  blocks.push({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `Marketing opt-in: ${lead.marketing ? 'yes' : 'no'} | Booking calendar shown: ${booking ? 'yes' : 'no'} | Notion: ${notionNote(notion)} | signature.cat/form`,
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

// Read at most `max` bytes as they arrive: a chunked body without
// Content-Length is cut off at the cap instead of being buffered whole.
async function readBoundedText(request, max) {
  const reader = request.body?.getReader();
  if (!reader) return { raw: '' };
  const chunks = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > max) {
      reader.cancel().catch(() => {});
      return { tooLarge: true };
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return { raw: new TextDecoder().decode(bytes) };
}

// Method + size + JSON checks shared by both endpoints.
async function readJsonBody(request) {
  const tooLarge = () => ({ error: jsonResponse(413, { ok: false, error: 'payload_too_large' }) });
  if (request.method !== 'POST') {
    return { error: jsonResponse(405, { ok: false, error: 'method_not_allowed' }) };
  }
  if (Number(request.headers.get('Content-Length') || 0) > CONTACT_MAX_BODY) return tooLarge();
  const body = await readBoundedText(request, CONTACT_MAX_BODY);
  if (body.tooLarge) return tooLarge();
  try {
    return { payload: JSON.parse(body.raw) };
  } catch (e) {
    return { error: jsonResponse(400, { ok: false, error: 'invalid_json' }) };
  }
}

// Per-IP rate limit (Workers rate-limit binding CONTACT_RL in wrangler.toml).
// The confirmation email goes to whatever address the form carries, so this
// caps how fast anyone who got past Turnstile can make us send mail. Absent
// binding (tests, local) = no limit; a binding error never blocks a visitor.
// IPv4 as is, IPv6 reduced to its /64 (one subscriber gets a whole /64, so
// keying on the full address would hand out a fresh bucket per address).
export function rateLimitIpKey(ip) {
  if (!ip.includes(':')) return ip; // IPv4 or 'unknown'
  const [head, tail] = ip.toLowerCase().split('::');
  const h = head ? head.split(':') : [];
  const t = tail ? tail.split(':') : [];
  const groups = tail === undefined ? h : [...h, ...Array(Math.max(0, 8 - h.length - t.length)).fill('0'), ...t];
  return `${groups.slice(0, 4).map((g) => g.padStart(4, '0')).join(':')}::/64`;
}

async function limited(binding, key) {
  if (typeof binding?.limit !== 'function') return false;
  try {
    const { success } = await binding.limit({ key });
    return success === false;
  } catch (e) {
    return false;
  }
}

async function rateLimited(request, env, scope) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  return limited(env?.CONTACT_RL, `${scope}:${rateLimitIpKey(ip)}`);
}

// One confirmation email per recipient per minute across both forms
// (CONTACT_RCPT_RL): the email goes to whatever address a form carries, so
// this is what protects a third party's inbox - and our sending reputation.
// A refused confirmation only skips the email; the request still succeeds.
async function confirmationAllowed(env, email) {
  return !(await limited(env?.CONTACT_RCPT_RL, `rcpt:${email.toLowerCase()}`));
}

async function sendConfirmationIfAllowed(env, to, render, meta) {
  if (!(await confirmationAllowed(env, to))) {
    console.error('contact form: confirmation skipped (recipient rate limit)');
    return { status: 'limited' };
  }
  return sendConfirmation(env, to, render(), meta);
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
  // Marketing segment ONLY with the separate, unticked-by-default opt-in: a
  // contact request alone is no consent to marketing email (GDPR art. 7(4)).
  const segmentId = contactSegmentId(env);
  const [firstName, ...rest] = lead.name.split(' ');
  await inBackground(ctx, [
    lead.marketing && env.RESEND_API_KEY && segmentId
      ? addResendContact(
          env,
          segmentId,
          { email: lead.email, first_name: firstName, last_name: rest.join(' ') },
          { label: 'contact form' },
        ).catch(() => console.error('contact form: Resend contact unreachable'))
      : null,
    sendConfirmationIfAllowed(env, lead.email, () => renderLeadConfirmation(lead, { booking }), {
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
  // No Notion row and no marketing segment for help requests - only the
  // confirmation email to the requester.
  await inBackground(ctx, [
    sendConfirmationIfAllowed(env, req.email, () => renderHelpConfirmation(req), { kind: 'help', locale: req.locale }),
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

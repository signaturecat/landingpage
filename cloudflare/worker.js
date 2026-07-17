/**
 * signature.cat edge Worker - Cloudflare.
 *
 * Route: signature.cat/*  (sits in front of the static origin, GitHub Pages).
 *
 * Responsibilities (in request order):
 *
 * 1. LANGUAGE ROUTER (behaviour unchanged): only the bare ROOT is
 *    locale-routed; every other path (/pl/, /de/, /fr/, /legal/, /assets/*,
 *    ...) passes straight through to the origin.
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
 *      - analytics/marketing: opt-in toggle, default OFF (GDPR).
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
 * Rollback: remove the route / `wrangler delete`. Per-locale pages, hreflang
 * and legal pages keep working; you lose the auto-redirect, the security
 * headers and the consent banner.
 */
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
    analytics: 'Analytics / marketing (Google Analytics)',
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
    analytics: 'Analityczne / marketingowe (Google Analytics)',
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
    analytics: 'Analyse / Marketing (Google Analytics)',
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
    analytics: 'Analytique / marketing (Google Analytics)',
    acceptAll: 'Tout accepter',
    necessaryOnly: 'Nécessaires uniquement',
    save: 'Enregistrer mes choix',
  },
};

// ---- security headers -------------------------------------------------------
export function buildCsp(nonce) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
    "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
    "font-src 'self'",
    // the /docs service-status badge iframe (status.signature.cat/badge)
    "frame-src 'self' https://status.signature.cat",
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
  const policyHref = `/${loc}/policy/`;
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
  <p>${t.desc} <a href="${policyHref}">${t.policy}</a> &middot; <a href="/legal/">${t.legal}</a></p>
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

// ---- worker -------------------------------------------------------------------
export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/' || url.pathname === '/index.html') {
      const loc = pickLocale(request);
      if (loc !== 'en') {
        const headers = new Headers({
          Location: `/${loc}/`,
          Vary: 'Cookie, Accept-Language',
          'Cache-Control': 'no-store',
        });
        applyBaseHeaders(headers);
        return new Response(null, { status: 302, headers });
      }
    }

    // Conditional-request guard for documents: if we forwarded If-None-Match /
    // If-Modified-Since, the origin could answer 304 Not Modified (no body),
    // the banner injection would have nothing to rewrite and the browser would
    // keep reusing a cached body captured under an OLDER worker version -
    // indefinitely, because the ETag keeps matching. Strip the validators for
    // likely-HTML paths so documents always arrive as full 200 responses.
    // Assets (paths with a non-.html extension) keep normal revalidation.
    const likelyHtml =
      url.pathname.endsWith('.html') || !/\.[a-z0-9]+$/i.test(url.pathname);
    let originRequest = request;
    if (likelyHtml) {
      originRequest = new Request(request);
      originRequest.headers.delete('If-None-Match');
      originRequest.headers.delete('If-Modified-Since');
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

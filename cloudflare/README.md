# Cloudflare edge Worker (signature.cat)

One Worker on the `signature.cat/*` route, in front of the existing static host
(GitHub Pages) - **no hosting migration needed**. It has three jobs:

1. **Language router** - server-side, SEO-safe browser-language redirect for
   the bare root only (unchanged behaviour).
2. **Security headers** - HSTS, nosniff, X-Frame-Options, Referrer-Policy,
   Permissions-Policy, COOP on every response, plus an ENFORCED
   Content-Security-Policy with a per-request nonce on HTML documents
   (HTMLRewriter stamps the nonce on every `<script>`).
3. **Cookie consent banner** - injected into every HTML page (landing + legal
   subpages), localized from the first path segment, shown only until a choice
   is stored in the `sigcat_consent` cookie (12 months). Re-opened by any
   `.js-cookie-settings` element (the "Cookie settings" footer links).

## What it does (language router)

- `GET /` (or `/index.html`):
  - cookie `sigcat_locale` set (manual choice in the on-page switcher) -> redirect to that locale;
  - else first supported `Accept-Language` subtag -> redirect to `/pl/`, `/de/`, `/fr/`;
  - English / no match -> stay on `/` (the x-default, canonical English page).
  - Redirect is `302` + `Vary: Cookie, Accept-Language` + `Cache-Control: no-store`.
- Every other path (`/pl/`, `/de/`, `/assets/*`, `/docs`, ...) passes straight
  through to the origin.
- HTML responses are tagged with a `Content-Language` header per locale (`/` ->
  `en`, `/pl/` -> `pl`, ...), since GitHub Pages cannot set it. Assets pass
  through with the base security headers only.

## Security headers / CSP - READ BEFORE ADDING ANY EXTERNAL RESOURCE

The CSP is **enforced** (not report-only) and allowlists only:

- `'self'` for scripts, styles, images, fonts and XHR/fetch,
- the Google Analytics 4 stack: `www.googletagmanager.com` (gtag.js loader,
  script + img), `*.google-analytics.com` and `*.analytics.google.com`
  (beacons, incl. EU regional endpoints; img + connect),
- inline `<script>`s ONLY via the per-request nonce (added automatically to
  every script tag by HTMLRewriter) - a hand-written inline handler attribute
  (`onclick="..."`) is BLOCKED,
- `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`,
  `form-action 'self'`.

**Any new external origin (script, font, iframe, image CDN, fetch/XHR target)
will be silently blocked by the browser until it is added to `buildCsp()` in
`worker.js` and the Worker is redeployed.** Add the origin in the same PR that
introduces the resource. Watch the browser console for `Refused to load...`
messages when testing.

`X-Frame-Options: DENY` + `frame-ancestors 'none'` also mean the landing can
never be embedded in an iframe (including our own future embeds) without a
Worker change.

## Cookie consent banner

- Injected before `</body>` of every HTML response; ships hidden and the
  injected script shows it only when the `sigcat_consent` cookie is absent, so
  it appears once until a choice is made.
- Categories: necessary (always on, disabled checkbox) and analytics/marketing
  (opt-in, default OFF). Buttons: accept all / necessary only / save choices.
- The choice writes `sigcat_consent=v1:a1|a0; Max-Age=31536000; Path=/;
  SameSite=Lax; Secure` and exposes `window.sigcatConsent.analytics`
  (true / false / null=no choice yet) + dispatches a `sigcat-consent`
  CustomEvent on every explicit choice.
- **GA integration contract:** the future gtag.js loader must run ONLY when
  `window.sigcatConsent.analytics === true` (listen for the `sigcat-consent`
  event to start after a late opt-in). A `gtag('consent','update',...)` bridge
  already fires when `window.gtag` exists.
- Banner copy lives in `BANNER_I18N` in `worker.js` (en/pl/de/fr) and links to
  `/{locale}/policy/` + `/legal/`; keep it in sync with the Privacy Policy.

Googlebot crawls with `Accept-Language: en` (or none), so it is never redirected
off `/` and the English homepage indexes as x-default. The reciprocal `hreflang`
in each page (from `build.mjs`) is what exposes the alternates to search engines.

## Prerequisites (DevOps)

1. The `signature.cat` zone is on this Cloudflare account and **proxied** (orange
   cloud), with the static origin (current GitHub Pages custom domain) reachable.
2. SSL/TLS mode **Full** (GitHub Pages serves valid HTTPS at the origin).
3. The per-locale pages exist at the origin (`/`, `/pl/`, `/de/`, `/fr/`) - i.e.
   the `feat/i18n-seo-paths` change is deployed. The Worker redirects to them.

## Deploy

**Deploys are AUTOMATIC.** This repo is connected to the Worker via
**Cloudflare Workers Builds** (dashboard-side Git integration; root directory
`cloudflare/` - the config is NOT visible in the repo). Every push to `main`
builds and deploys the Worker; check Cloudflare dashboard -> Workers ->
`landingpage` -> Deployments/Builds for status. A `verify-worker` GitHub
Action additionally smoke-checks the live site after each push to `main`
(CSP header + injected banner + nonce consistency).

**Manual `wrangler deploy` is an EMERGENCY path only.** It bypasses the Git
integration and OVERRIDES whatever Workers Builds deployed - deploying from a
stale checkout ships an old Worker on top of a newer one (this exact incident
happened on 2026-07-16). If you must:

```bash
git pull                # ALWAYS from a fresh checkout of main
cd cloudflare
wrangler login          # or set CLOUDFLARE_API_TOKEN / CLOUDFLARE_ACCOUNT_ID
wrangler deploy
```

The route `signature.cat/*` in `wrangler.toml` binds it. Verify:

```bash
# Polish browser -> redirected to /pl/
curl -sI -H 'Accept-Language: pl-PL,pl;q=0.9' https://signature.cat/ | grep -i '^location\|^HTTP'
# English browser -> stays on / (200)
curl -sI -H 'Accept-Language: en-US,en;q=0.9' https://signature.cat/ | grep -i '^HTTP'
# Manual override cookie wins
curl -sI -H 'Cookie: sigcat_locale=de' https://signature.cat/ | grep -i '^location'
# A locale page is never redirected (passes through) + carries Content-Language
curl -sI https://signature.cat/pl/ | grep -iE '^HTTP|^content-language'   # -> 200, content-language: pl
# Security headers + CSP present on HTML
curl -sI https://signature.cat/pl/ | grep -iE 'strict-transport|content-security|x-content-type|x-frame|referrer-policy|permissions-policy'
# Consent banner injected (markup near </body>)
curl -s https://signature.cat/pl/ | grep -c 'sigcat-cookies'   # -> 2 (container + script)
```

## Rollback

Delete the route (or `wrangler delete`). The site falls back to plain static
serving - the per-locale pages, legal pages and `hreflang` keep working; you
lose the automatic root redirect, ALL security headers (incl. CSP) and the
cookie consent banner (the "Cookie settings" footer links become inert - they
point at `#cookie-settings` and are handled by the injected script).

## Notes

- `fetch(request)` passes through to the origin (Cloudflare does not re-invoke
  this Worker for its own subrequest, so there is no loop).
- Alternative hosting: the same `worker.js` logic works as a **Cloudflare Pages
  Function** (`functions/_middleware.js`) or a **Workers Static Assets** project
  if you later move the static files onto Cloudflare; only the pass-through line
  changes (`env.ASSETS.fetch(request)`). The directory layout (`/pl/index.html`
  etc.) is already Cloudflare-native, so migration needs no structural change.

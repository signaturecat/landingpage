# Cloudflare language router (signature.cat)

Server-side, SEO-safe browser-language redirect for the landing page. It sits in
front of the existing static host (GitHub Pages) - **no hosting migration
needed**. The per-locale pages it redirects to are produced by `../build.mjs`
and served by the origin; this Worker only redirects the bare root.

## What it does

- `GET /` (or `/index.html`):
  - cookie `sigcat_locale` set (manual choice in the on-page switcher) -> redirect to that locale;
  - else first supported `Accept-Language` subtag -> redirect to `/pl/`, `/de/`, `/fr/`;
  - English / no match -> stay on `/` (the x-default, canonical English page).
  - Redirect is `302` + `Vary: Cookie, Accept-Language` + `Cache-Control: no-store`.
- Every other path (`/pl/`, `/de/`, `/assets/*`, `/docs`, ...) passes straight
  through to the origin.
- HTML responses are tagged with a `Content-Language` header per locale (`/` ->
  `en`, `/pl/` -> `pl`, ...), since GitHub Pages cannot set it. Assets pass
  through untouched.

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

```bash
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
```

## Rollback

Delete the route (or `wrangler delete`). The site falls back to plain static
serving - the per-locale pages and `hreflang` keep working; only the automatic
root redirect goes away.

## Notes

- `fetch(request)` passes through to the origin (Cloudflare does not re-invoke
  this Worker for its own subrequest, so there is no loop).
- Alternative hosting: the same `worker.js` logic works as a **Cloudflare Pages
  Function** (`functions/_middleware.js`) or a **Workers Static Assets** project
  if you later move the static files onto Cloudflare; only the pass-through line
  changes (`env.ASSETS.fetch(request)`). The directory layout (`/pl/index.html`
  etc.) is already Cloudflare-native, so migration needs no structural change.

# Landing page — Changelog

> Language: English. Proper names not translated. Every change logged here (Definition of Done).

## 2026-07-18 - Docs navbar polish: own status pill, wider centered search, "/" shortcut

- **What:** (PM review feedback on PR #16, same branch)
  - **Status badge replaced with an own status pill.** The Better Stack
    badge iframe rendered an oversized opaque white box with invisible
    light text on dark pages in production (cross-origin iframe canvas;
    the vendor `color-scheme: normal` hint did not help). The iframe is
    gone; `.status-pill` is our own component on design-system tokens
    (surface/border/dot), fed by `fetch('https://status.signature.cat/en/index.json')`
    -> `aggregate_state`, mapped to: operational "All services online"
    (green), degraded (amber), downtime (red), maintenance (pink). It
    links to the status page; without JS or on fetch failure it degrades
    to a neutral "Status" link. GOTCHA: the bare `/index.json` answers
    with a 302 that carries no CORS header and the fetch dies - the
    `/en/`-prefixed URL must be used (same trap as `/badge`).
  - CSP (`cloudflare/worker.js`): `frame-src` allowance dropped (no more
    iframe), `https://status.signature.cat` added to `connect-src`.
  - **Search trigger wider and centered** in the free navbar space
    (`flex: 1 1 auto; max-width: 480px; margin-inline: auto`).
  - **Search shortcut is now "/" only** (more intuitive; Ctrl/Cmd+K
    removed, kbd hint shows "/", Esc still closes).
  - **Mobile (<=860px): Help button hidden**, the search trigger docks to
    the right edge next to "Open app".
  - **Scroll-spy bottom fix:** at the very end of the page the last
    heading can never cross the 25%-viewport reading line, so the TOC
    indicator never reached it; when the page is scrolled to the bottom
    and the last heading is on screen, it now becomes active.
- **Why:** PM review of PR #16 (badge unreadable on prod dark mode +
  four UX nits).
- **Scope:** landingpage /docs (build-docs.mjs template, docs.css,
  docs.js) + cloudflare worker (CSP).
- **Design impact:** status pill uses existing tokens (Light/Dark OK);
  navbar layout rebalanced around the centered search.
- **Performance impact:** one small same-purpose fetch replaces a whole
  iframe document (net win); no new dependencies.
- **A11y:** pill is a regular link with visible text; dot is
  `aria-hidden`; "/" shortcut ignores typing contexts and modifier
  combos; kbd hint updated.

## 2026-07-17 - Public documentation at /docs (22 pages, EN)

- **What:**
  - New zero-dep static generator `build-docs.mjs` (same philosophy as
    `build.mjs`/`build-legal.mjs`): Markdown sources in `docs-src/*.md`
    (front matter: title/description/updated) render to `/docs/<slug>/`
    pages. Railway-docs-like layout: left sidebar nav (active item gets a
    pink dot + tinted background), right "On this page" scroll-spy TOC with
    a sliding indicator, Previous/Next pager cards, breadcrumb.
  - Top bar: brand + DOCS wordmark, search trigger (Ctrl/Cmd+K or `/`,
    client-side index over generated `/docs/search-index.json`), the
    Better Stack status badge iframe (theme-aware: `?theme=light|dark`
    follows `prefers-color-scheme`; note the bare `/badge` redirect drops
    the query - `/en/badge` is used), a Help button
    (`mailto:contact@signature.cat`) and a distinct "Open app" CTA.
  - Content: 22 English pages per the PM's structure (Getting started,
    Advanced setup, Billing, Reference, Support), written from the app
    repo's canonical docs + code-verified facts (exact UI labels, scopes,
    limits). Deep links into `app.signature.cat/*` throughout. Warnings in
    styled callouts (`> [!NOTE|TIP|IMPORTANT|WARNING|CAUTION]`).
  - Headings h2-h4 get stable ids + hover anchor-link buttons (click
    copies the deep link, "Link copied" tip).
  - SEO: per-page `<title>TOPIC | SignatureCat Docs</title>`, meta
    description, self-canonical, OG/Twitter, JSON-LD TechArticle +
    BreadcrumbList; `/docs/sitemap.xml` (second `Sitemap:` line in
    `robots.txt`); `llms.txt` + `llms-full.txt` at the root; explicit AI
    crawler allows in `robots.txt`; 404.html links popular docs pages.
    AI-tell character guard asserted at build time (docs are EN-only, no
    hreflang cluster).
  - `cloudflare/worker.js` CSP: added
    `frame-src 'self' https://status.signature.cat` for the badge iframe
    (auto-deploys with the merge; without it the badge is blocked).
- **Why:** PM request 2026-07-17: publish real product documentation under
  signature.cat/docs (the header/footer "Docs" links already pointed
  there), SEO-first per the provided guidelines.
- **Scope:** landingpage (new /docs generator + pages), cloudflare worker
  (CSP one-liner).
- **Design impact:** new `assets/css/docs.css` built entirely on the
  existing style.css tokens (Light + Dark, warm minimalism, pink accent);
  no changes to landing styles. New `assets/js/docs.js` (plain JS, no deps,
  ~7 KB): search, scroll-spy, anchor copy, mobile drawer, badge theme.
- **Performance impact:** system fonts, no external assets (CSP-safe), one
  extra CSS + one deferred JS file on /docs only; search index fetched
  on demand (first search open). Static HTML, zero client rendering.
- **A11y:** semantic landmarks (nav/main/aside), skip-link, aria-current
  on the active sidebar item, dialog semantics + keyboard support for
  search (Esc/arrows/Enter), focus-visible states, `prefers-reduced-motion`
  disables the TOC indicator animation and drawer transition, AA contrast
  in both themes.
- **Verification note:** checked locally (light/dark, desktop/mobile,
  search, drawer, per-page metas). The status badge renders transparently
  in light; dark-theme transparency should be spot-checked on production
  after the Worker CSP deploy (the embedded preview browser could not
  composite the cross-origin iframe reliably).

## 2026-07-17 - Status page link in the footer; Terms v1.1 (status page as the SLA reference)

- **What:**
  - Footer "Resources" column gains a **Status** link to
    `https://status.signature.cat/` (new i18n key `footer.f.status`:
    en/pl/de "Status", fr "Statut"), baked into `/`, `/pl/`, `/de/`, `/fr/`
    via `node build.mjs`.
  - **Terms of Service bumped to v1.1 (effective 17.07.2026)** in all four
    language versions (`legal/src/regulamin.md` + en/de/fr translations),
    rebuilt with `node build-legal.mjs`. § 9 now states that availability is
    measured and published on the provider's status page ("Strona Statusu" /
    "Status Page") and that its readings are the basis for determining the
    99% monthly availability target - excluding: (a) planned technical
    breaks and maintenance announced in advance at
    `https://status.signature.cat/maintenance`, (b) failures attributable to
    external providers (hosting, CDN, payment operator, Google APIs),
    (c) force majeure, (d) causes on the customer's side. Old § 9(3)-(4)
    renumbered to (4)-(5); the only cross-reference in the documents
    (§ 7 -> "§ 9(1)") is unaffected. Final § 15(4) records the version
    history (1.1 from 17.07.2026, 1.0 from 16.07.2026).
  - Cleanup: removed a stray `</script>` right after `<head>` in
    `index.html` (slipped in with the ASCII-art easter-egg commit pushed
    straight to main on 2026-07-16; the easter egg itself stays).
- **Why:** PM request 2026-07-17: publish the status page and make it the
  SLA reference in the Terms, with provider-fault incidents and pre-announced
  maintenance windows excluded from the availability measure.
- **Scope:** landingpage (footer + baked locale pages) + legal sources.
- **Design impact:** none - the link reuses the existing footer link styles
  (verified identical computed styles to sibling links in dark mode; same
  tokens in light mode).
- **A11y / typography:** plain text link, AA contrast inherited; content uses
  ASCII hyphens only (build-legal.mjs AI-tell assertion passes).
- **Deploy note:** the legally binding PL wording changed - per § 14(2)(2)
  functional changes need 10 days' notice to existing customers; publication
  timing/notification is a PM decision (see report).

## 2026-07-16 - Google Analytics 4 wired through the consent banner (basic consent mode)

- **What:** The Worker-injected consent script now carries the GA4 loader
  (`GA_MEASUREMENT_ID = G-8M16LHQXQP` in `cloudflare/worker.js`; empty string
  disables). `gtag.js` is appended to `<head>` ONLY after analytics opt-in
  (stored cookie `a1` on load, or the moment of acceptance), preceded by
  `gtag('consent','default')` with all ad signals denied. Withdrawing consent
  fires `gtag('consent','update')` to denied and deletes `_ga` / `_ga_*`
  cookies. No page/static-file changes - GA ships via the same injection as
  the banner, on the landing and all legal subpages.
- **Why:** PM request 2026-07-16 (GA property ready). Basic - not "advanced" -
  consent mode on purpose: advanced loads gtag before consent and sends
  cookieless pings to Google for behavioral modeling, which contradicts the
  Privacy Policy ("analytics runs only after consent") and is legally
  contested under ePrivacy/GDPR in the EU. Trade-off accepted: no modeled
  data for declining visitors.
- **Scope:** cf-worker.
- **Privacy:** consistent with the published Privacy Policy (GA listed as
  consent-based, 14-month event retention to be set in the GA4 property).
- **CSP:** no changes needed - GA hosts were pre-allowlisted in `buildCsp()`.
- **Deploy:** automatic via Workers Builds on merge; verify-worker smoke check
  unaffected (banner/nonce assertions unchanged).

## 2026-07-16 - Fix: banner delivery (304 revalidation), [hidden] override; deploy docs

- **What:**
  1. `cloudflare/worker.js`: documents are now fetched from the origin WITHOUT
     `If-None-Match`/`If-Modified-Since`, and HTML responses drop
     `ETag`/`Last-Modified` + get `Cache-Control: no-cache`. Root cause: a
     browser that cached a page under an older Worker revalidated it, GitHub
     Pages answered `304 Not Modified` (origin content unchanged), the edge
     injection had no body to rewrite, and the stale cached body (no banner)
     was reused indefinitely - the ETag kept matching.
  2. Banner CSS: `#sigcat-cookies[hidden] { display: none !important; }` - the
     author-level `display: flex` on the container silently defeated the UA
     `[hidden]` rule, so the banner would never hide after a choice.
  3. Deploy docs corrected: the Worker auto-deploys via **Cloudflare Workers
     Builds** (dashboard Git integration, root `cloudflare/`) - the previous
     changelog/README instruction to run `wrangler deploy` after merge was
     wrong and caused the 2026-07-16 stale-deploy incident (manual deploy
     overrides Git builds). Manual wrangler is documented as emergency-only.
  4. New `.github/workflows/verify-worker.yml`: after each push to `main` it
     polls the live site (up to ~5 min, waiting out the Workers Builds deploy)
     and fails unless the CSP header is present, the banner markup is injected
     and the CSP nonce matches the script nonce. Verification only - it never
     deploys, so it cannot race Workers Builds.
- **Why:** banner reported missing on prod with the correct Worker deployed
  (PR #11); two stacked defects masked each other; deploy docs described a
  manual flow that fights the existing Git integration.
- **Scope:** cf-worker + CI + docs.
- **Performance impact:** HTML loses 304 revalidation (full 200 each fetch) -
  acceptable: documents are small, assets keep normal caching.

## 2026-07-16 - Cookie consent banner, security headers (CSP), FAQ & copy updates

- **What:**
  1. `cloudflare/worker.js` extended from a pure language router into the edge
     layer: security headers on every response (HSTS 2y incl. subdomains,
     nosniff, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy, COOP)
     plus an ENFORCED Content-Security-Policy with a per-request nonce stamped
     on every `<script>` via HTMLRewriter; and a localized (en/pl/de/fr) cookie
     consent banner injected before `</body>` on every HTML page. Necessary
     cookies are always-on; analytics/marketing is an opt-in toggle (default
     OFF). The choice is stored in `sigcat_consent` (12 months) so the banner
     shows only once; `.js-cookie-settings` footer links re-open it. Exposes
     `window.sigcatConsent.analytics` + `sigcat-consent` event + a
     `gtag('consent','update')` bridge for the upcoming Google Analytics.
  2. New "Cookie settings" footer link on the landing (all locales) and on
     every legal page (`build-legal.mjs` footer).
  3. Copy: FAQ a1 simplified (no Gmail API / DWD / sendAs jargon; plain "the
     tool connects to your Workspace via API"); "GCP Secret Manager" renamed to
     "Secret Manager" (sec.i1); the "No marketing cookies" security badge
     removed (GA is coming, consent-gated); two new FAQ entries: multi-language
     signatures per branch (q6) and implementation support + custom templates
     via contact@signature.cat (q7). All four locales.
- **Why:** GDPR/ePrivacy consent before Google Analytics goes live on the
  landing; GitHub Pages cannot set security headers, the Worker can; marketing
  copy asked to be less technical (PM request 2026-07-16).
- **Scope:** landingpage + cf-worker.
- **Design impact:** banner card styled with its own scoped tokens mirroring
  the design system (cream/ink/pink accent, Light/Dark via
  `prefers-color-scheme`); no changes to existing components.
- **Performance impact:** banner adds ~4 KB inline HTML/CSS/JS per page (no
  extra request); headers add no weight. CSP nonce disables no existing
  functionality (all scripts nonce-stamped at the edge).
- **A11y:** banner is `role="dialog"` (non-modal) with labelled controls,
  visible focus states, AA contrast in both schemes; disabled checkbox
  communicates the always-on necessary category.
- **CSP allowlist warning:** any NEW external origin must be added to
  `buildCsp()` in `cloudflare/worker.js` + `wrangler deploy`, or the browser
  will block it (console `Refused to load...`). GA4 hosts
  (googletagmanager.com, google-analytics.com, analytics.google.com) are
  pre-allowlisted; the GA loader must check
  `window.sigcatConsent.analytics === true`.
- **Deploy note:** the Worker change requires `cd cloudflare && wrangler
  deploy` after merge (page changes deploy with GitHub Pages as usual).

## 2026-07-16 - Legal pages: /legal hub, per-locale terms & privacy policy, SEO

- **What:** Published the legal documents on the landing site. New zero-dep
  generator `build-legal.mjs` renders `legal/src/*.md` (PL binding originals +
  EN/DE/FR automatic translations with supremacy banners) into: `/legal/` hub
  (all versions + DPA note), `/pl/terms/`, `/pl/policy/` (binding, indexable),
  `/{en,de,fr}/{terms,policy}/` (noindex,follow), and `/terms/` + `/privacy/`
  meta-refresh stubs to the Polish versions so the short URLs used inside the
  documents keep working. Footer "Legal" column now points to `/legal/#terms`,
  `/legal/#privacy`, `/legal/#dpa`; the dead `/subprocessors` link was removed
  (the named sub-processor list is confidential under the DPA - only categories
  are public, in the Privacy Policy). `build.mjs` sitemap now includes the three
  indexable legal URLs (`LEGAL_URLS`).
- **Why:** Terms of Service, Privacy Policy (PL binding + EN/DE/FR translations)
  and the English-only DPA were finalized on 2026-07-16; the footer legal links
  previously 404'd.
- **Scope:** landingpage.
- **Design impact:** New `assets/css/legal.css` document layout built on the
  existing tokens (Light/Dark via `prefers-color-scheme`, warm minimalism, pink
  accent for link underlines). No changes to landing components.
- **Performance impact:** Static pre-rendered HTML, one extra small CSS file on
  legal pages only; no JS on legal pages (except the redirect stubs' one-line
  `location.replace`).
- **A11y:** Semantic landmarks (`header`/`nav`/`main`/`article`/`footer`),
  `scope="col"` table headers, per-item `lang` attributes on the hub list, AA
  contrast in both schemes, no motion.
- **SEO:** Only `/legal/` + Polish originals indexable (self-canonical, in
  sitemap); machine translations `noindex,follow`; no hreflang cluster on legal
  pages (alternates are not indexable); redirect stubs `noindex` with canonical
  to their targets. Worker already tags `Content-Language` from the first path
  segment, so `/pl/terms/` etc. are covered without Worker changes.

## 2026-07-01 - Pricing calculator: true graduated total + slider reaches 400

- **What:** The calculator now computes the monthly total the GRADUATED
  (marginal) way - each seat is billed at its OWN tier's rate and the brackets
  are summed - matching the tier table and the "each seat is billed at its
  tier's rate" note. Previously `computeTotal` applied a single flat tier rate to
  the whole headcount (e.g. 400 users -> $220.00 = 400 x $0.55). It now sums the
  brackets: 400 users -> $252.00 = 50x0.80 + 70x0.70 + 180x0.60 + 100x0.55.
  Driven off the existing `TIERS` array; the flat `rateForCount` helper is
  removed. The result line now shows the headcount estimate (`pricing.estimate`)
  plus the blended effective rate (`pricing.tierLabel` + total/n), since there is
  no single per-seat rate once the headcount spans tiers.
- **What (slider):** `#seat-slider` `max` 300 -> 400 so dragging to the end
  reaches the 301+ tier (it was capped at 300, so the top bracket was never
  reachable by the slider). The number input `max` (100000) is unchanged.
- **Why:** PM: the calculator must use the graduated method (sum of tier rates),
  and the slider at max must reach into the higher (301+) tier.
- **Scope:** landingpage only (en/pl/de/fr). No new i18n keys (reuses
  `pricing.estimate` / `pricing.tierLabel` / `pricing.perUser` /
  `pricing.user(s)`). Tier rates and JSON-LD AggregateOffer unchanged. ASCII-clean.
- **Verify:** graduated math + per-locale result strings simulated against the
  real `i18n.js` dict (400 -> $252.00, eff $0.63; 100 -> $75.00, eff $0.75; 51 ->
  $40.70; en/pl/de/fr). Regenerated /pl /de /fr + sitemap.xml via `build.mjs`
  (idempotent).
- **Cross-team (Backend/DevOps):** the landing now estimates GRADUATED, which
  matches `packages/billing/src/tiers.ts` ("marginal price per seat"). Two things
  must hold for the app `/billing` and the Stripe charge to agree with this
  estimate: (1) the Stripe tiered Price is `graduated` billing_scheme (not
  `volume`); (2) the still-open 301+ split (landing has 4 tiers incl. 301+ $0.55;
  app `tiers.ts` is still 3 tiers, 121+ $0.60 unbounded - flagged in the
  2026-06-29 301+ entry below). The slider now reaching 400 makes that gap more
  visible, so it is worth closing app-side.

## 2026-06-29 - Pricing: add the 301+ tier ($0.55)

- **What:** New top volume tier. The table is now four tiers: 1-50 $0.80,
  51-120 $0.70, 121-300 $0.60, 301+ $0.55 (the old open-ended "121+ $0.60" is now
  bounded at 300; 301+ gets the new $0.55 rate). Updated the calculator
  (assets/js/app.js: TIERS / tierForCount / rateForCount re-indexed to 4 tiers),
  i18n tier labels (pricing.row3 -> "121 - 300", new pricing.row4 "301+" +
  pricing.row4sub), the tier table in index.html (new 4th row, $0.55), and
  JSON-LD AggregateOffer (lowPrice 0.60 -> 0.55, offerCount 3 -> 4). Regenerated
  /pl /de /fr + sitemap.xml via build.mjs.
- **Why:** PM introduced a volume tier for 301+ seats.
- **Scope:** landingpage only (en/pl/de/fr). ASCII-clean copy.
- **Verify:** calculator DOM-dump (400 users -> $220.00, 301+ row highlighted); build.mjs idempotent.
- **Cross-team:** the APP /billing tier display + packages/billing/tiers.ts + the
  Stripe Price still show 3 tiers (121+ $0.60); they need the 301+ split too
  (Backend + DevOps) so app and landing pricing agree.

## 2026-06-29 - Pricing model: 7-day free trial, drop "free for 1 user"

- **What:** Aligned the landing with the new billing model in `signaturecat/app`
  PR #74 (7-day trial + card at registration, no free seat).
  - **Hero trust badges** (`hero.meta1`/`hero.meta2`): "1 user free forever" ->
    "7-day free trial"; "No credit card to start" -> "No charge during the trial"
    (a card is now collected up front, so the old claim was false).
  - **Pricing tiers:** removed the "1 user - Free" row. The table is now 3 tiers
    (1-50 $0.80, 51-120 $0.70, 121+ $0.60), matching the app `/billing` page.
  - **Calculator** (`assets/js/app.js`): dropped the free tier and the `n === 1`
    special-case; 1 user now resolves to $0.80 (small tier). `TIERS`,
    `tierForCount`, `rateForCount` re-indexed to 3 tiers.
  - **CTA** `pricing.cta`: "Start free" -> "Start free trial".
  - **FAQ** `faq.q2`/`faq.a2`: "Is it really free for a single user?" reframed to
    "Do you offer a free trial?" (7 days, card at sign-up, no charge during trial,
    cancel anytime, then per-active-user from $0.80).
  - **JSON-LD** `AggregateOffer`: `lowPrice` "0" -> "0.60", `offerCount` "4" -> "3".
  - Removed now-unused `pricing.free`, `pricing.row4`, `pricing.row4sub`,
    `pricing.tierFree` keys.
- **Why:** The free-for-1-user copy contradicted the new model (docs/06) and would
  flag a drift; the app now charges every tenant after the trial.
- **Scope:** landingpage only (en + pl + de + fr). No DNS/Worker action needed.
- **i18n:** all 4 dictionaries updated; copy stays ASCII-clean per the no-AI-tell
  rule (German umlauts / French accents kept; no em/en dashes, no nbsp).
- **Build:** `node build.mjs` re-run; regenerated `/`, `/pl/`, `/de/`, `/fr/` and
  `sitemap.xml`. Calculator verified via headless DOM dump (1 user -> $0.80).
- **Deploy note:** land close to the app deploy + DevOps Stripe `STRIPE_PRICE_ID`
  switch so the public pricing and the signup flow agree.
## 2026-06-25 - Rename product term to "signature" (PL "stopka" -> "podpis")

- **What:** Unified the product term across the landing copy. Polish `stopka`
  and all inflected forms (`stopki`, `stopkę`, `stopką`, `stopce`, `stopek`,
  `stopkach`, `stopkami`) -> `podpis`/`podpisy`/... in `assets/js/i18n.js` (25
  strings), applying the correct masculine declension, pronoun (ja -> go) and
  adjective agreement (e.g. "każdą spersonalizowaną stopkę ... utrzymuje ją
  aktualną" -> "każdy spersonalizowany podpis ... utrzymuje go aktualnym"). Also
  fixed one stray English "footer language" -> "signature language"
  (`admin.c2.d`). Regenerated `/`, `/pl/`, `/de/`, `/fr/` and `sitemap.xml` via
  `node build.mjs`.
- **Why:** Consistency with the app, where the product is "signature" / "podpis";
  "stopka" (footer) was an inconsistent synonym. PM request.
- **Scope:** landingpage only. No DNS/Worker action needed.
- **i18n:** PL dictionary reworded; EN had one stray "footer" fixed; DE/FR already
  used "Signatur"/"signature" (unchanged). All copy stays ASCII-clean per the
  no-AI-tell typography rule (verified on the served `pl/index.html`).
- **Build:** `node build.mjs` re-run (idempotent); committed regenerated output.

## 2026-06-24 - SEO max-out: Content-Language header + crawlable `<a>` language switcher

- **What:** Two SEO/a11y improvements on top of the per-locale routing.
  - **`cloudflare/worker.js`:** sets `Content-Language: <locale>` on HTML responses (`/` -> en, `/pl/` -> pl, ...) - GitHub Pages cannot set it, the edge can. Assets pass through untouched. (Redeploy the Worker to apply: `cd cloudflare && wrangler deploy`.)
  - **Language switcher -> crawlable links:** the desktop dropdown + mobile language options are now `<a href="/pl/">` (etc.) instead of `<button>` - a real, indexable link path between locales that works without JS. `app.js` `setLocale` (which navigated) became `rememberLocale` (records the `sigcat_locale` cookie only); the `<a href>` does the navigation. `style.css` switcher selectors updated `button` -> `a` (+ `text-decoration:none`). Regenerated all per-locale pages.
- **Why:** Maximize SEO signals (Content-Language header; crawlable inter-locale links reinforcing hreflang) and improve a11y (a language switch is navigation, so a link, not a button). hreflang/canonical were already correct; these are additive.
- **Scope:** landingpage only. Redeploy the Cloudflare Worker for `Content-Language`. Remaining SEO step is on the PM: Google Search Console (verify domain, submit sitemap, watch the hreflang report).
- **Note (non-SEO edge):** without JS, a pl/de/fr-browser user clicking "English" (`<a href="/">`) is re-redirected to their language by the Worker (no cookie set without JS); with JS the cookie makes English stick. Crawlers (Accept-Language: en) always get `/` as English.

## 2026-06-24 - SEO: per-locale URLs (/pl/ /de/ /fr/) + zero-dep pre-render build + Cloudflare language router

- **What:** Each language is now its own indexable URL instead of one client-swapped page. Previously every `hreflang`/`canonical` pointed at `https://signature.cat/`, so pl/de/fr could never be indexed - the core SEO bug this fixes.
  - **`build.mjs` (new, zero-dep Node):** pre-renders `/` (en, x-default), `/pl/`, `/de/`, `/fr/` from the single `index.html` + `assets/js/i18n.js`. Per page it sets `<html lang>`, localized `<title>`/meta-description/Open Graph/Twitter/JSON-LD, `og:locale` (+alternates), self-canonical, an identical reciprocal `hreflang` block (en/pl/de/fr/x-default, trailing-slash form), fills the JS-only `data-i18n` placeholders so crawlers get real content, and rewrites page-level asset refs to root-absolute (`/assets/...`). Also regenerates `sitemap.xml` (4 URLs, reciprocal hreflang). HTML-escapes all injected copy (`&` etc.), preserves `{{del}}` literals, asserts idempotency + child-element-free `[data-i18n]` + slash-terminated URLs.
  - **`app.js`:** locale is now derived from the URL **path** (the served page), not navigator/cookie - so the client matches the pre-rendered HTML and never swaps the root. The language switcher sets a `sigcat_locale` cookie (manual override) and navigates to `/pl/` etc. Fixed `PHOTO` to root-absolute (`/assets/img/anna.jpg`) so the hero avatar resolves under `/pl/`.
  - **`cloudflare/` (new):** a Cloudflare Worker (`worker.js` + `wrangler.toml` + `README.md`) for `signature.cat/*` that does the **server-side** browser-language redirect on `/` only - cookie (manual choice) wins, else `Accept-Language`; English/crawlers stay on `/`. 302 + `Vary` + `no-store`; everything else passes through to the origin. Deployed separately (DevOps owns the zone/route/DNS); the site works without it.
  - **`404.html` (new):** static `noindex` fallback.
- **Why:** Get pl/de/fr indexed (distinct URLs + valid reciprocal hreflang), and give visitors a browser-language redirect with a manual override - without the SEO hazard of a client-side root redirect (validated against Google's i18n guidance).
- **Scope:** landingpage only. **Cross-team (DevOps):** create/confirm the `signature.cat` Cloudflare zone (proxied, SSL Full) + deploy the Worker + bind the `signature.cat/*` route. The per-locale pages + hreflang ship on GitHub Pages independently and work meanwhile.
- **Build note:** run `node build.mjs` after editing `index.html` or `i18n.js`, and commit the regenerated `/ /pl/ /de/ /fr/ sitemap.xml`. Generated files carry a "do not edit" banner.

## 2026-06-13 — Conditional card: add "section removed" case, colored status dots, unclipped tag borders, mobile auto-play

- **What:**
  1. **Card 3 (Conditional blocks) — added the "value absent" case:** the loop now demonstrates BOTH outcomes. The phone line still collapses its `{{del}}`/`{{/del}}` tags when the value is present (section stays), and now also fully removes the whole conditional line when the value is missing (section znika — no empty gap). New 4-phase IntersectionObserver loop: `raw template → value present → raw template → value absent → repeat` (2.5s per phase, 10s cycle).
  2. **Unclipped tag borders:** the `{{del}}`/`{{/del}}` chip borders were being cut off by `.cond-tag { overflow:hidden }` with no vertical padding. Added `align-items:center` + vertical padding to `.cond-tag` and bumped `.cond-tag code` padding (`1px 4px` → `2px 5px`) with `line-height:1.4`, so the rounded border renders fully on all four sides.
  3. **Colored status dots:** the status line dot + text now turn **green** for "Telefon obecny — sekcja zostaje" (`.cond-status.present`) and **red** for the new "Telefon nieobecny — sekcja znika" (`.cond-status.absent`). The raw-template state keeps the neutral pink-accent dot. Added theme-aware `--ok`/`--bad` tokens (Light: `#1f9d57`/`#d6453d`; Dark: brighter `#34d17e`/`#ff6b61` for contrast).
  4. **Mobile (no-hover) auto-play:** Card 1 (Smart variables) and Card 2 (Personalized per user) previously only animated on hover/focus, so nothing moved on touch devices. On `(hover: none)` devices the resolved values in Card 1 are now revealed via CSS, and Card 2 auto-cycles `{{firstname}}/{{lastname}}` ↔ "Anna Kowalska" every 2.6s while on screen (IntersectionObserver-gated). Card 3 was already IO-driven and works on mobile unchanged.
- **Why:** Tomasz's fourth round of conditional-card refinements.
- **Scope:** landingpage only. No backend/DevOps changes. No inter-team message required.
- **Implementation:** `assets/css/style.css` (`--ok`/`--bad` tokens in `:root` + dark block; `.cond-tag` padding/align fix; `.cond-line` collapse via `max-height`/`opacity` + `.line-gone`; `.cond-status.present`/`.absent` dot+text colors; `@media (hover:none)` reveal for `.card-vars .var-val`; reduced-motion override extended to `.cond-line`); `assets/js/app.js` (`initConditionalCard` tri-state `setStatus` + `showRaw`/`showPresent`/`showAbsent` + 4-phase loop; `initPersonalizeCard` `(hover:none)` IO auto-cycle); `assets/js/i18n.js` (new `feat.c3.statusAbsent` in en/pl/de/fr).
- **Design impact (Light + Dark):** Verified both themes. Present state: green dot + green label, tags faded, phone row stays. Absent state: red dot + red label, entire phone row removed with no orphaned gap, card height stays stable. Tag chip borders fully visible in the raw state. Achromatic + single-pink-accent system preserved for the raw/template state.
- **Performance:** No new fonts/libraries. All animations remain `transform`/`opacity`/`max-height` and IntersectionObserver-gated (Card 1/2 mobile cycles and Card 3 loop pause when off-screen or tab hidden).
- **A11y:** All motion stays disabled under `prefers-reduced-motion: reduce` (Card 3 settles on the present state; Card 1/2 mobile auto-cycle is skipped). Green/red status colors meet WCAG AA contrast in Light + Dark; the cue is carried by both color AND text, not color alone. No horizontal overflow at 390px.
- **Verified:** Playwright QA in Light + Dark + mobile (390px, `hover:none`). Card 3 loop sampled across 10s — raw (pink dot) → present (green `rgb(31,157,87)`, tags hidden, line kept) → raw → absent (red `rgb(214,69,61)`, `line-gone`, max-height 0) → repeat. Tag borders render fully (vertical padding applied). Mobile: Card 1 `.var-val` revealed (max-width 220px, opacity 1, "Anna"); Card 2 auto-cycles "Anna Kowalska" ↔ "{{firstname}} {{lastname}}"; Card 3 cycles all three states once on screen. 0 console/page errors; no horizontal overflow.

## 2026-06-13 — Card demo polish (marquee on hover, smooth swap, single-line conditional), copy & i18n updates

- **What:**
  1. **Card 1 (Smart variables) — values keep scrolling on hover:** removed the `animation-play-state: paused` rule on `.card-vars:hover .var-track`, so the resolved-value marquee keeps moving sideways while the user hovers (it no longer freezes).
  2. **Card 2 (Personalized per user) — smoother variable→name transition:** the `{{firstname}}`/`{{lastname}}` chips now swap to "Anna"/"Kowalska" with the same fade/lift/blur transition used by the hero footer-preview (`.sig-card .var.swapping`). Added `display:inline-block` + a `.28s` transition on `opacity/transform/filter` to `.pers-var`, a `.pers-var.swapping` state (`opacity:0; translateY(-4px); blur(2px)`), and a reduced-motion override. `initPersonalizeCard()` now uses a `swapVar()` helper (add `.swapping` → wait 280ms → change text → double-rAF removes the class) with a 260ms stagger between the two fields.
  3. **Card 3 (Conditional blocks) — single line, slower, simpler status:** the `{{del}}`/`{{/del}}` tags and the phone line now stay on **one line** so the card no longer stretches when the closing tag appears. `.cond-line` is `flex-wrap:nowrap; gap:4px; min-width:0`; `.cond-text` truncates with ellipsis if needed; `.cond-tag code` shrunk (11px→10px, padding `1px 6px`→`1px 4px`). The fade loop was slowed to **every 5s** (tags fade at 5000ms, loop at 10000ms; was 2200/5200ms). Status copy simplified to `feat.c3.statusPresent` = "Telefon obecny — sekcja zostaje" (and EN/DE/FR equivalents).
  4. **Admin kicker:** `admin.kicker` shortened from "Stworzone przez Administratora Google Workspace" to "Stworzone przez" (EN "Built by", DE "Entwickelt von", FR "Conçu par"). `admin.title` left unchanged per request.
  5. **Branding chip:** `brand.chip` changed to "Real-time marketing" in all four locales (was PL "Taki sam u wszystkich" / EN "Same for everyone" / etc.).
  6. **Pricing title:** `pricing.title` → PL "Proste rozliczenie, które wspiera rozwój Twojej firmy" (EN "Simple pricing that supports your company's growth", DE/FR equivalents).
  7. **Pricing sub:** `pricing.sub` tail changed to PL "…niższa stawka za miejsce. Nie musisz obawiać się wzrostu cennika wraz ze wzrostem działalności." (was "…niższa stawka za miejsce — rozliczenie miesięczne w USD."); EN/DE/FR updated to match.
  8. **Pricing note — removed "(graduated)":** the `(graduated)` parenthetical was dropped from `pricing.note` in all four locales.
- **Why:** Tomasz's third round of landing-page refinements.
- **Scope:** landingpage only. No backend/DevOps changes. No inter-team message required.
- **Implementation:** `assets/css/style.css` (Card 1 marquee no-pause-on-hover; `.pers-var` + `.pers-var.swapping` transition; `.cond-line` nowrap/`.cond-text` ellipsis/smaller `.cond-tag code`); `assets/js/app.js` (`initPersonalizeCard` `swapVar()` helper + stagger; `initConditionalCard` 5s/10s timings; updated fallback status string); `assets/js/i18n.js` (en/pl/de/fr: `feat.c3.statusPresent`, `admin.kicker`, `brand.chip`, `pricing.title`, `pricing.sub`, `pricing.note`); `index.html` (static fallback text for `admin.kicker`, `brand.chip`, `pricing.sub`).
- **Design impact (Light + Dark):** Verified both themes. Card 1 marquee animates continuously under hover; Card 2 name swap matches the hero preview's motion; Card 3 holds a constant height (cond-line locked to one 28px line — `{{del}} Phone/Telefon: +48 797 891 447 {{/del}}`), no more stretch. All copy renders within the existing achromatic + single-pink-accent system.
- **Performance:** No new fonts/libraries; all animations remain `transform`/`opacity`/`filter` and IntersectionObserver-gated. Slowing Card 3 to a 10s cycle reduces repaint frequency.
- **A11y:** All motion (marquee, Card 2 swap, Card 3 fade) stays disabled under `prefers-reduced-motion: reduce` via overrides. Text contrast meets WCAG AA in Light + Dark. No horizontal overflow at 390px.
- **Verified:** Playwright QA in Light + Dark + mobile (390px), EN + PL. Card 1 marquee `translateX` keeps advancing during hover; Card 2 mid-swap shows `.swapping` then resolves to "Anna Kowalska"; Card 3 `cond-line` height 28px / `flex-wrap:nowrap` with both `{{del}}`/`{{/del}}` on one line; admin kicker "STWORZONE PRZEZ" / brand chip "Real-time marketing" / pricing title+sub+note updated with no "graduated" (`hasGraduated:false`); 0 console/page errors; no horizontal overflow at 390px.

## 2026-06-13 — Feature-card height lock, Card 1/3 demo fixes, section reorder, Admin & Branding refinements

- **What:**
  1. **Feature cards — fixed target height:** the three top cards (`.card-compact`) now have a locked `min-height: 372px` so they no longer grow/jump when their demos fill in (hover-reveal on Card 1, `{{del}}` loop on Card 3). On mobile (<=680px, single column) the lock is released (`min-height: 0`). QA confirmed a constant 372px across rest + all hover frames (previously a transient resize during the value-expand transition).
  2. **Card 1 (Smart variables):** removed the "Hover to see example values" hint (`feat.c1.hint` / `.card-hover-hint`). Each chip is now `<span class="var-chip"><code>{{token}}</code><span class="var-val">VALUE</span></span>`; the value side expands from `max-width:0` to `220px` on hover so the longest value ("Head of Marketing") fits fully inside the chip with no overflow.
  3. **Card 3 (Conditional blocks):** the demo now always shows the full conditional block including both `{{del}}` and `{{/del}}` tags. When the phone value is present the animation fades **only the tags** (`.cond-line.tags-hidden .cond-tag`) — the phone line/section stays in place. Status copy reworded to `feat.c3.statusRaw` ("Template with conditional tags") and `feat.c3.statusPresent` ("Phone present — section kept, tags removed"); the old "section removed / missing" collapse state was dropped.
  4. **Section order:** moved `#how` (How it works) to sit directly above `#pricing` (new order: features → branding → admin → security → how → pricing → docs → faq).
  5. **Admin section (`#admin`):** "Admin" → "Administrator" in kicker + title; description reworded to "…so this tool fits how your organization is already managed — not the other way around."; section title + description are now left-aligned (removed `center` from `.section-head`); replaced the "Departments" card with a globe-icon "Per-locale signature languages" card (footers in each branch's own language for foreign offices).
  6. **Branding section (`#branding`):** swapped the example avatar to `assets/img/tomasz.jpg`; role → `SystemAdmin`, email → `tomek@signature.cat`; replaced the justjoin.it / Rocket Jobs banners with three generic example campaigns (`data-brand="sale"|"product"|"event"`); raised the banner field height (`.ad-banner min-height: 96px → 120px`) so content no longer clips; added a 4th bullet (`brand.p4`) about reacting in real time (Realtime marketing).
  7. **i18n (en/pl/de/fr):** updated for all of the above (`feat.c3.*`, `brand.p4`, generic ad-banner copy + eyebrows, `admin.kicker/title/sub`, `admin.c2.t/d`).
- **Why:** Tomasz's second round of landing-page refinements.
- **Scope:** landingpage only. No backend/DevOps changes. No inter-team message required.
- **Implementation:** `index.html` (card 1 chip markup, card 3 conditional markup, `#how` moved above `#pricing`, admin head left-aligned + Administrator wording + per-locale card, branding role/email/avatar + generic banners + 4th bullet); `assets/css/style.css` (`.card-compact min-height` lock + mobile release, `.var-chip`/`.var-val` flex hover-expand, `.cond-tag`/`.cond-line.tags-hidden` fade, `.brand-avatar` → tomasz.jpg, `.ad-banner` taller + sale/product/event gradients); `assets/js/app.js` (`initConditionalCard` now toggles `tags-hidden` on the line so the section stays; status uses `statusRaw`/`statusPresent`); `assets/js/i18n.js` (all 4 langs); new `assets/img/tomasz.jpg` (face-centred 180×180 crop, ~5KB).
- **Design impact (Light + Dark):** Verified both themes. Locked card height removes the layout jump; Card 1 values legible inside chips; Card 3 tags fade cleanly while the line stays; Admin header left-aligned reads as a normal section; branding banners use white text on dark gradients (AA contrast in both modes).
- **Performance:** No new fonts/libraries; banners remain pure CSS gradients; all animations are `transform`/`opacity` and IntersectionObserver-gated. The fixed `min-height` removes hover-driven reflow.
- **A11y:** All motion stays disabled under `prefers-reduced-motion: reduce` (Card 3 shows the tags-hidden static state). Text contrast meets WCAG AA in Light + Dark. No horizontal overflow at 390px.
- **Verified:** Playwright QA in Light + Dark + mobile (390px). Card height constant at 372px across rest and all hover frames (no jump); all 18 Card 1 value chips report no clipping; Card 3 cycles raw↔rendered with both `{{del}}` tags present and the phone line retained; all three banner variants fit the 120px field with no clipping; section order features→…→how→pricing confirmed; Admin header left-aligned with Administrator wording + per-locale card; Branding shows tomasz.jpg / SystemAdmin / tomek@signature.cat / Realtime-marketing bullet; 0 console/page errors; no horizontal overflow at 390px.

## 2026-06-13 — Interactive feature cards, Employer-branding & Workspace-Admin sections, language button, security permissions

- **What:**
  1. **Language switcher:** removed the `lang-globe` SVG from the desktop language button — it now shows only the flag + locale code (e.g. `🇬🇧 EN`).
  2. **Features section ("Everything you need…"):** reduced the height of the three top cards (`.card-compact`). Card 1 (Smart variables) now shows the variables in an auto-scrolling carousel that, on hover, flips each `{{variable}}` chip to its example resolved value (`{{firstname}}`→Anna, `{{jobtitle}}`→Head of Marketing, etc.). Card 2 (Personalized per user) shows `{{firstname}}` and `{{lastname}}` auto-filling on hover, and the copy now says signatures are rendered from "the template you created" instead of "a single template". Card 3 (Conditional blocks) demonstrates the `{{del}}` block live: it collapses the phone section and shows "Phone missing — section removed" when the value is absent in the Directory, then restores it on loop.
  3. **New section `#branding` — Employer branding in every email:** an example signature for Tomasz Piasecki (IT Administrator) with a rotating marketing banner inside the footer that swaps to a different campaign every 3s with a fade/scale animation (justjoin.it "What about that Eldorado? IT Salary Report 2025/2026", a Rocket Jobs slide, and an event slide). Copy frames every employee signature as an always-on marketing channel changeable for everyone at once. Added nav link `nav.branding`.
  4. **New section `#admin` — Designed by a Google Workspace Admin:** three cards (Group management, Departments, Organizational Units) framing the product around real Workspace structures so rollout is easier.
  5. **Security section:** added two items — `User permission levels` (granular access for admins/editors/viewers) and `Audit-ready accountability`.
- **Why:** Tomasz's landing-page improvement request — make the feature cards more illustrative/compact, demonstrate the conditional-block value visually, surface the employer-branding banner use case, position the product as Admin-designed, and make the user-permission management explicit in Security.
- **Scope:** landingpage only. No backend/DevOps changes. No inter-team message required.
- **Implementation:** `index.html` (button markup, 3 card demos, 2 new `<section>`s, 2 security items, nav link); `assets/css/style.css` (~150 lines appended: `.card-compact` with `min-width:0` to keep the 3-up grid columns equal, `.var-carousel`/`.var-track`/`.var-chip` hover-flip, `.pers-*`, `.cond-*` collapse, `.brand-*`, `.ad-banner`/`.ad-slide` gradient banners, responsive + dark + reduced-motion overrides); `assets/js/app.js` (`initPersonalizeCard`, `initConditionalCard`, `initAdBanner`, all IntersectionObserver-gated and reduced-motion-aware); `assets/js/i18n.js` (new keys in en/pl/de/fr, updated `feat.c2.d`). Added `assets/img/footer-example.jpg` (reference only — the live banners are CSS gradients, not raster).
- **Design impact (Light + Dark):** Verified both themes. Feature cards are shorter and equal-width; carousel masked with a fade edge; banner uses white text on dark gradients (contrast OK in both modes); all new sections follow the achromatic + single-pink-accent system.
- **Performance:** No new fonts or libraries; banners are pure CSS gradients (no images); all animations are `transform`/`opacity` only and gated by IntersectionObserver so off-screen sections don't animate. No layout-thrash.
- **A11y:** All motion (carousel, hover flips, `{{del}}` loop, 3s banner rotation) is disabled under `prefers-reduced-motion: reduce`. Text contrast meets WCAG AA in Light and Dark. No horizontal overflow at 390px.
- **Verified:** No console/page errors; 3-up feature grid renders equal columns (was a grid-blowout bug from the wide carousel, fixed with `min-width:0`); card hover-flip, firstname/lastname auto-fill, `{{del}}` collapse loop, and 3s banner rotation all confirmed working; Light + Dark + mobile (390px, no overflow) screenshots reviewed.

## 2026-05-31 — Mobile navbar: move language switcher into hamburger menu

- **What:** On mobile (<=680px) the navbar language switcher is now hidden and language selection lives inside the hamburger menu instead. Fixes overlapping navbar elements on iPhone 13 / Safari, where the brand wordmark collided with the language switcher and pushed the layout.
- **Why:** The compact in-navbar language button still took horizontal space and, combined with the brand + CTA, overflowed on narrow screens.
- **Scope:** landingpage.
- **Implementation:** Added a `.nav-lang` block at the end of `#nav-links` (hidden on desktop, shown only inside the open mobile menu) with a localized "Language" label and a 2x2 grid of locale buttons. They reuse the existing `data-lang` switching logic; the active locale is marked with `aria-current="true"`. Selecting a language closes the menu. Desktop keeps the existing dropdown switcher unchanged. Added i18n key `nav.language` (en: Language, pl: Jezyk, de: Sprache, fr: Langue).
- **Verified:** iPhone 13 viewport (390x844) — no horizontal overflow (scrollWidth == 390), hamburger visible, navbar language switcher hidden; opening the menu shows the language grid; switching locale works and closes the menu. Desktop unchanged (dropdown visible, in-menu block hidden).

## 2026-05-31 — favicon.ico + footer legal links

- **What:** (1) Set the site favicon to the newly added `assets/img/favicon.ico` (declared with `sizes="any"`, PNG kept as a secondary modern fallback). (2) Repointed the footer legal links from `app.signature.cat/legal/*` to the public site paths: Privacy -> `https://signature.cat/privacy`, Terms -> `/terms`, DPA -> `/dpa`, Sub-processors -> `/subprocessors`.
- **Why:** Use the supplied .ico favicon and host legal pages on the apex marketing domain rather than the app subdomain.
- **Scope:** landingpage.
- **Note:** Verified `favicon.ico` exists, is git-tracked, and resolves live at https://signature.cat/assets/img/favicon.ico (HTTP 200). A `favicon-reversed.ico` is also present in the repo but the standard `favicon.ico` (cat on pink, matching the logo) is the one referenced.

## 2026-05-30 — New logo, removed band glow, masked signature icons

- **What:** (1) Replaced the brand logo and site favicon/apple-touch with the newly supplied rounded app-icon (`logo-singaturecat.jpg` -> overwrote `logo-mark.png`, `favicon.png`, `apple-touch-icon.png`). (2) Removed the decorative `.band::after` radial glow circle in the docs CTA band. (3) Replaced the emoji icons in the signature preview body (envelope / phone / house) with the supplied glyph icons (`mail.jpg`, `phone-5.jpg`, `office.jpg`).
- **Why:** Use the latest brand mark, drop the band glow per request, and use proper branded line icons in the preview.
- **Scope:** landingpage.
- **Icon technique:** The three glyph JPGs (black-on-white) were converted to alpha PNG masks (`ico-mail.png`, `ico-phone.png`, `ico-office.png`, 64px). `.sig-ico` now renders them via CSS `mask-image` with `background-color: currentColor`, so they keep the exact same color modulation as the previous emoji (inherits the signature line color at `opacity: .55`). Fixed 16x16 size as requested.
- **Cleanup:** Dropped the `.band > *` z-index helper that only existed to sit above the now-removed glow (band buttons remain fully clickable).
- **Design impact:** Header/footer logo and favicon updated; docs band is now flat (no glow); preview icons are crisp branded glyphs that recolor with the theme.

## 2026-05-30 — Revert button hover + fix docs-band click blocking

- **What:** (1) Reverted the button hover effect back to the original (color/border change only) — removed the translateY lift, box-shadow and focus-visible ring added earlier today. (2) Fixed the docs CTA band where the "Zacznij teraz" (`.btn-ghost`) button could not be clicked on desktop: the decorative `.band::after` glow circle (top-right) overlapped the right-aligned button and intercepted pointer events.
- **Why:** Restore the preferred, calmer button interaction; make both docs-band CTAs clickable.
- **Scope:** landingpage.
- **Fix detail:** Added `pointer-events: none` + `z-index: 0` to `.band::after`, and `position: relative; z-index: 1` to `.band > *` so the heading and CTA links sit above the decoration. Verified via hit-testing that the topmost element at each band button's center is the link itself.
- **Design impact:** Button hover matches the original design system again; docs band visual unchanged.

## 2026-05-30 — Brand assets, button polish, avatar animation, copy updates

- **What:** (1) Replaced the inline-SVG logo mark with the real brand logo (`signaturecat_logo.jpg` -> `assets/img/logo-mark.png`) in header and footer; replaced the site favicon/apple-touch with `signaturecat-ico-3.jpg` (`favicon.png` 96px + `apple-touch-icon.png` 180px). (2) Buttons (`.btn-primary`, `.btn-ghost`, `.btn-lg`) now have a clear hover animation (translateY lift + shadow) and a focus-visible ring; both hero CTAs link out (docs -> https://signature.cat/docs). (3) On mobile the language-switcher globe icon is hidden and the button is tightened so it no longer stretches the nav. (4) Signature-preview animation: the avatar now swaps from a gradient placeholder to Anna's real photo (`anna.jpg`) as part of the staggered fill; once everything is filled and the 3s hold passes, all variables + the photo reset to placeholders at once (instead of one-by-one). (5) Equalized `.sig-ico` emoji sizes (fixed 16x16 box, centered). (6) Copy updates (see below).
- **Why:** Use real brand assets, make CTAs feel interactive, fix a mobile layout nit, make the animation reset cleaner, and align security/marketing wording with the team's preferred phrasing (PL-first, mirrored to en/de/fr).
- **Scope:** landingpage.
- **Copy changes (PL, mirrored across en/de/fr):** "Hosting w UE (RODO)" -> "Serwery w UE"; "Nie przechowujemy danych Twoich ludzi" -> "...Twoich pracowników"; "...odrzucane" -> "...kasowane"; "Scisla izolacja tenantow" -> "Izolacja danych organizacji" (+ reworded body to "Kazda operacja jest ograniczona do Twojego Workspace i calkowicie izolowana ze wzgledow bezpieczenstwa."); "Renderowanie odporne na injection" -> "...na code injection" (+ body "Szablony stopek sa sanityzowane przy zapisie, celem odpornosci na probe wstrzykniecia zlosliwego kodu."); "Zbudowane na platformie Google Workspace" -> "Stworzone z mysla o srodowisku Google Workspace"; "hosting" -> "serwery" where user-facing; footer "Hosting w UE" -> "Serwery w UE" + added "Stworzone w Polsce". Updated PL meta description and the OG cover tagline for consistency.
- **Design / a11y impact:** New `.logo-mark` is an `<img>` (object-fit cover, fixed 30px). Avatar gains photo/gradient swap with the same fade/blur transition as variables; `.sig-avatar` and the new animation respect `prefers-reduced-motion` (filled photo shown statically). Button hover lift disabled under reduced-motion. Added i18n key `footer.madePL` in all four locales.
- **Performance:** All raster assets are downscaled and optimized (logo 120px PNG ~10KB, favicon 96px ~9.6KB, avatar 160px JPG ~6KB). No new dependencies. Removed the unused `favicon.svg`.

## 2026-05-30 — Hero animation + pricing model update

- **What:** (1) Removed the hero `.eyebrow` badge. (2) Turned the signature preview into an animated demo: name/last name/job title and all body fields are now variables (`{{firstname}}`, `{{lastname}}`, `{{jobtitle}}`, `{{email}}`, `{{phone}}`, `{{department}}`, `{{domain}}`). They resolve to real signature.cat data **one variable at a time** (Anna, Kowalska, Head of Marketing, anna@signature.cat, +48 797 891 447, Marketing, signature.cat), hold the completed signature for 3s, then revert to placeholders one by one — looping forever. Each field carries an uppercase hint label explaining what the variable is for. (3) Reworked the pricing calculator.
- **Why:** The eyebrow was redundant with the H1. The animation makes the variable → real-value concept self-explanatory at a glance. The pricing change aligns the calculator with the requested flat-per-tier model.
- **Scope:** landingpage.
- **Pricing model change:** Switched from graduated (summing each seat at its tier rate) to **flat tier rate × headcount** — the whole headcount is billed at the single tier its size falls into. Examples: 50 users = $40.00 (0.80×50); 80 users = $56.00 (0.70×80); 121 users = $72.60 (0.60×121); 1 user = Free. Removed the "effective rate" line; the calculator now shows `N users × $rate / user / mo` and the monthly total. `rateForCount()` / `computeTotal()` in `assets/js/app.js` are the source of truth — keep tier boundaries in sync with the tier table.
  - NOTE: this intentionally diverges from `signaturecat/app` → `docs/06_stripe_billing.md`, which describes graduated billing. If the marketing estimate must match real Stripe invoices, reconcile the two models (decide whether billing or the landing estimate changes).
- **Design impact:** New states for `.var` (monospace pink placeholder vs resolved value `.is-value`) and a `.swapping` fade/blur transition; `.sig-hint` label chips; `.sig-field` flex layout. Consistent with the existing design system, both Light and Dark.
- **Performance / a11y:** Animation is pure class/text swaps (no layout thrash), pauses when the card is offscreen (IntersectionObserver) or the tab is hidden (visibilitychange), and fully respects `prefers-reduced-motion` (shows the filled signature statically, no loop). i18n: added `hero.hint.email|phone|dept` in en/pl/de/fr; removed obsolete `hero.eyebrow|sigName|sigRole`.

## 2026-05-29 — Initial landing page

- **What:** Built the first static landing page for SignatureCat (https://signature.cat), hosted on GitHub Pages. Single-page site with sections: hero, platform trust strip, features, how-it-works, security, pricing (with live calculator), docs CTA band, FAQ, footer. Added SEO (meta, OG/Twitter, hreflang en/pl/de/fr + x-default, JSON-LD `SoftwareApplication`, `sitemap.xml`, `robots.txt`), `CNAME` (signature.cat), `.nojekyll`, and placeholder SVG assets (favicon, OG cover).
- **Why:** Public marketing entry point for the product; communicates value (central Gmail signature management for Google Workspace), pricing transparency, security posture, and a link to the public docs.
- **Scope:** landingpage.
- **Design impact:** New site implements the shared design system (warm minimalism + glassmorphism, cream `#fff7ed` / ink `#292524`, single pink accent `#f2a8ff`). Tokens defined in `assets/css/style.css` `:root` + `prefers-color-scheme: dark` block. Light + Dark modes, default by system preference. Components introduced: header w/ language switcher, glass hero panel, feature cards, step cards, security list + badges, pricing calculator + tier table, FAQ accordion, footer. Consistent with `01_design-system.md` and the app's visual language — no stylistic drift.
- **Performance impact:** System fonts (no webfont fetch). One CSS file, two small JS files, all local — no runtime CDN, no framework. Inline outline SVG icons (no icon library). Glassmorphism `backdrop-blur` used sparingly (header + hero panel only). Reveal animations are `transform`/`opacity` only, gated behind `IntersectionObserver` and disabled under reduced-motion. Target: fast LCP, low CLS, light bundle.
- **A11y:** WCAG AA contrast (dark text on cream / warm-light text on ink). Semantic landmarks (`header`/`main`/`footer`/`nav`/`section`), labelled controls, focusable language menu with `aria-expanded`/`aria-current`, `prefers-reduced-motion` respected. `<html lang>` updates with the active locale.
- **i18n:** 4 locales (en fallback, pl, de, fr) in `assets/js/i18n.js`. Auto-detection from `navigator.languages`, manual override persisted in `localStorage`. Proper names left untranslated.
- **Pricing source of truth:** Calculator mirrors graduated tiers from `signaturecat/app` → `docs/06_stripe_billing.md` (1 user free; 2–50 $0.80; 51–120 $0.70; 121+ $0.60). `TIERS` array in `assets/js/app.js` must be kept in sync with that doc.

### Note to DevOps Team
- **Context:** The landing links "Docs" to `https://signature.cat/docs`, which must be publicly available alongside the GitHub Pages site at the apex domain.
- **Needed action:** (1) Configure DNS for `signature.cat` to GitHub Pages and enable the Pages custom domain + HTTPS. (2) Decide how `/docs` is served at the apex (e.g., publish `signaturecat/app` docs to that path, or a reverse-proxy / separate Pages site) so the public docs link resolves.
- **Dependency:** Frontend is complete and committed; the `/docs` link and custom-domain HTTPS depend on the DNS/hosting setup owned by DevOps.

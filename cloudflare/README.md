# Cloudflare edge Worker (signature.cat)

One Worker on the `signature.cat/*` route, in front of the existing static host
(GitHub Pages) - **no hosting migration needed**. It has three jobs, plus three
small API endpoints (`POST /api/banner-leads` for the banner generator's email
gate, `POST /api/contact-requests` and `POST /api/help-requests` for the
contact form - see "Contact form" below):

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
- Google Tag Manager and the Google Analytics 4 it loads - exactly the host
  lists of Google's "Use Tag Manager with a Content Security Policy" guide
  (container, GA4 without Ads features, Preview Mode):
  `www.googletagmanager.com` (gtm.js + the gtag.js it loads; script, img,
  connect, style), `*.google-analytics.com` (img + connect), `*.google.com`
  (connect: GA4 beacons incl. the EU regional `*.analytics.google.com`
  endpoints, and `www.google.com` for the container); Preview Mode only:
  `tagmanager.google.com` (script + style), `fonts.googleapis.com` (style),
  `fonts.gstatic.com` + `data:` (font), `ssl.gstatic.com` + `www.gstatic.com`
  (img). Deliberately NOT allowed: `'unsafe-eval'` (GTM Custom JavaScript
  variables evaluate to `undefined` - use Custom Templates) and
  `'unsafe-inline'` for scripts (GTM propagates the nonce instead),
- inline `<script>`s ONLY via the per-request nonce (added automatically to
  every script tag by HTMLRewriter) - a hand-written inline handler attribute
  (`onclick="..."`) is BLOCKED,
- Cloudflare Turnstile: `challenges.cloudflare.com` (script-src + frame-src),
- the Google Calendar booking page of the contact form:
  `calendar.google.com` (frame-src only),
- `status.signature.cat` (connect-src, the docs status pill),
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
- Banner copy lives in `BANNER_I18N` in `worker.js` (en/pl/de/fr) and links to
  `/{locale}/policy/` + `/legal/`; keep it in sync with the Privacy Policy.

## Google Tag Manager -> Google Analytics 4 (built into the injected script)

- Container: `GTM_CONTAINER_ID` (`GTM-PD5TQCBR`) in `worker.js`; an empty
  string disables GTM and with it GA4. The GA4 measurement ID
  (`G-8M16LHQXQP`) is no longer in the code - it lives in the container's
  Google tag.
- **BASIC consent mode, by design:** `gtm.js` is appended to `<head>` ONLY
  after the visitor opts in - immediately on page load when the stored cookie
  is `a1`, or the moment they click accept. Before the container starts, the
  loader fires `gtag('consent','default')` with `analytics_storage: granted`
  and all ad signals (`ad_storage`, `ad_user_data`, `ad_personalization`)
  denied, then pushes the `gtm.js` start event (the order Google requires).
- **No traffic reaches Google before opt-in.** We deliberately do NOT use
  "advanced" consent mode (tags loaded pre-consent sending cookieless pings
  for behavioral modeling): it would contradict the Privacy Policy statement
  that analytics runs only after consent, and pre-consent pings to a US
  provider are legally contested under ePrivacy/GDPR in the EU. Trade-off: no
  GA modeled data for visitors who decline - acceptable. For the same reason
  there is NO `<noscript>` GTM iframe (`ns.html`): it would load without
  consent (and `frame-src` blocks it anyway).
- **Nonce-aware loader:** `gtm.js` gets the request nonce
  (`setAttribute('nonce', ...)`, as in Google's nonce-aware snippet) and GTM
  propagates it to every script it injects, so container tags pass the
  enforced CSP without `'unsafe-inline'`.
- **Withdrawal:** choosing "necessary only" after a prior opt-in fires
  `gtag('consent','update')` to denied AND deletes the `_ga` / `_ga_*`
  cookies (both host and `.signature.cat` domain variants).
- **Events:** after a successful lead the contact form pushes
  `{event: 'generate_lead', form_topic}` to `window.dataLayer` (analytics
  consent only, no personal data); a GA4 Event tag in the container sends it
  to GA4.
- CSP: see "Security headers / CSP" above (Google's host lists for the
  container, GA4 and Preview Mode).

### Container rules (anyone editing GTM-PD5TQCBR)

- Every tag in the container fires under the **analytics** consent: keep it
  to Google Analytics 4 until the banner gets a marketing category and the
  Privacy Policy covers more (ads or remarketing tags need both, plus their
  hosts in `buildCsp()`).
- Required setup: a **Google tag** with `G-8M16LHQXQP` on *Initialization -
  All Pages*, and a **GA4 Event** tag `generate_lead` on the custom event
  `generate_lead` with the parameter `form_topic` = Data Layer Variable
  `form_topic`. Then **Submit / Publish** - only the published version is
  served to visitors.
- No Custom JavaScript variables (the CSP blocks `eval`; use Custom
  Templates) and no third-party hosts in Custom HTML tags (blocked by the CSP
  until added to `buildCsp()` in a PR).
- **Preview Mode (Tag Assistant):** accept analytics in the banner first -
  GTM loads only after consent. The CSP allows the Preview Mode hosts. Our
  `Cross-Origin-Opener-Policy: same-origin` isolates the tab Tag Assistant
  opens; if Tag Assistant cannot connect, try the Tag Assistant Companion
  browser extension before touching COOP.

Googlebot crawls with `Accept-Language: en` (or none), so it is never redirected
off `/` and the English homepage indexes as x-default. The reciprocal `hreflang`
in each page (from `build.mjs`) is what exposes the alternates to search engines.

## Contact form (POST /api/contact-requests, POST /api/help-requests)

`/form` (x4 locales) runs in two modes; the Worker has one endpoint per mode.
Code: `worker.js` (handlers, validation, Slack), `notion.js` (Notion leads
database), `confirmation-email.js` (emails). Tests:
`node --test cloudflare/worker.test.mjs`.

**Lead mode** - `POST /api/contact-requests` with `{name, email, phone,
company, size, message?, topic, locale, marketing, cf-turnstile-response}`
("Book a call" / "Custom pricing"):

1. `parseContact()` validates + normalizes (invisible and bidi characters
   dropped, control characters and whitespace runs collapsed; mirrored by
   `assets/js/contact-form.js`, a test pins the shared regex) -
   `400 invalid_payload`, `413` over 16 KB (checked while the body streams, not
   only from `Content-Length`);
2. per-IP rate limit (`CONTACT_RL`, 5 requests / 60 s, IPv6 counted per /64) -
   `429 rate_limited`;
3. **mandatory** Turnstile, fail closed: `503 turnstile_unconfigured` without
   `TURNSTILE_SECRET`, `403 turnstile_required|invalid|failed`, `503
   turnstile_unavailable`, `403 turnstile_mismatch` unless siteverify confirms
   the token was solved on this host with action `turnstile-spin-v2` and cData
   `contact-form` (`CONTACT_TURNSTILE`);
4. a **Notion** row (`notion.js`, 5 s timeout, no retry - POST is not
   idempotent), then a **Slack** message to `SLACK_WEBHOOK_URL` whose footer
   says whether the Notion row landed. The lead counts as delivered when Slack
   OR Notion accepted it; `502 contact_delivery_failed` only when both failed,
   `503 contact_unconfigured` when neither is configured;
5. in the background (`ctx.waitUntil`, never fails the request): the Resend
   marketing contact ONLY with the marketing opt-in (see "Marketing contacts"
   below), and the **confirmation
   email** - at most one per recipient address per minute
   (`CONTACT_RCPT_RL`), so the form cannot be used to mail-bomb someone else's
   address from rotating IPs; over the limit only the email is skipped;
6. `200 {ok: true, booking?}` - `booking` = `BOOKING_URL` in Google's embed
   mode, only for `https://calendar.google.com/calendar/appointments/...`.

**Help mode** - `POST /api/help-requests` with `{name, email, phone?, urgency,
message, from?, locale, cf-turnstile-response}` (the docs "Help" button):
`parseHelp()` (urgency `low|normal|high|critical`, description 10-2000
characters, phone optional, `from` = the docs page, allowlisted), the same rate
limit and mandatory Turnstile with cData `help-form` (`HELP_TURNSTILE` - a lead
token is refused here and vice versa), then a Slack message to the SEPARATE
`SLACK_HELP_WEBHOOK_URL` (`503 help_unconfigured` without it - it never falls
back to the leads channel; `502 help_delivery_failed`), then the confirmation
email (same `CONTACT_RCPT_RL` cap). Never Notion, never the marketing segment,
no booking step.

User input is escaped for every sink: Slack mrkdwn (`<!channel>`-style
mentions and `<url|label>` links neutralized, text blocks `verbatim` so a
plain `@channel` or `#channel` stays text, unfurling off), HTML email
(`& < > " ' \``), Notion (JSON values, never markup). The confirmation email
goes to whatever address the form carries, so the text it echoes back is
defanged: URL- and domain-like tokens in the name, company and description
become `evil[.]example` / `https[://]...` (mail clients would otherwise link
them in a message signed by signature.cat), and the greeting uses the first
name only when it is letters (else a plain "Thank you!"). With the marketing
opt-in the footer says how to get the address removed instead of "ignore it".

### Configuration

Cloudflare dashboard -> Workers -> `landingpage` -> Settings -> Variables and
Secrets; store every value as **Secret** (it also survives deploys regardless
of `keep_vars`):

| Name | Required | What |
|---|---|---|
| `TURNSTILE_SECRET` | **yes** (already set for the banner gate) | Same widget. Without it both form endpoints refuse every request (fail closed). |
| `SLACK_WEBHOOK_URL` | yes (or Notion) | Slack incoming webhook for leads. The channel is the one the webhook was created for: to move notifications, create a webhook for the new channel and replace the value. |
| `SLACK_HELP_WEBHOOK_URL` | yes for help | A **separate** incoming webhook (its own channel) for help requests. |
| `NOTION_TOKEN` | for Notion | Internal connection token with **only** the "Insert content" capability (see below). |
| `NOTION_DATA_SOURCE_ID` / `NOTION_DATABASE_ID` | for Notion | The leads database: the data source id (preferred) or the database id from its URL. |
| `BOOKING_URL` | no | **Only the link** (the iframe `src`, not the whole `<iframe>` snippet): Google Calendar -> appointment schedule -> Share -> Website embed -> Inline booking page. Unset = the lead form ends on a thank-you note. |
| `RESEND_SEND_API_KEY` | no | A Resend **Sending access** key limited to the `signature.cat` domain for the confirmation emails (least privilege). Unset = `RESEND_API_KEY` is used. |
| `RESEND_API_KEY` + `RESEND_SEGMENT_ID` | shared | Full-access key + marketing segment of the banner gate; used for the opt-in marketing contact (and for emails without `RESEND_SEND_API_KEY`). The legacy name `RESEND_AUDIENCE_ID` is still read (Resend renamed audiences to segments; confirm the id with `GET /segments/{id}`, see below); `RESEND_SEGMENT_ID` wins when both are set. |
| `RESEND_CONTACT_SEGMENT_ID` | no | Separate Resend segment for form opt-ins (legacy name `RESEND_CONTACT_AUDIENCE_ID`); defaults to the banner segment. A separate segment keeps the two consent sources apart. |

`CONTACT_RL` (per IP) and `CONTACT_RCPT_RL` (per confirmation recipient) are
not variables: they are `[[ratelimits]]` bindings in `wrangler.toml` (Workers
Rate Limiting API, GA, wrangler >= 4.36, namespaces `1001` / `1002`); the code
treats a missing binding or a limiter error as "no limit".

### Notion leads database (one-time setup)

1. Notion (workspace owner): Developer portal -> **Internal connections** ->
   create one (e.g. "signature.cat leads"). **Capabilities: tick ONLY "Insert
   content"** - no Read, no Update, no user information. Copy the installation
   token into `NOTION_TOKEN`.
2. Open the leads database -> **...** -> **Connections** -> **Add connection**
   -> the new connection (without it Notion answers 404 `object_not_found`).
3. Database settings -> **Manage data sources** -> **Copy data source ID** ->
   `NOTION_DATA_SOURCE_ID` (or put the database id from its URL into
   `NOTION_DATABASE_ID`; that works while the database has one data source).
4. The column names must match exactly (Notion matches properties by name):
   `Klient` (the title column), `Info` (text), `Kanał` (multi-select),
   `Phone` (phone), `Email` (email), `Wielkość - osoby` (multi-select, with a
   plain hyphen), `Kontakt` (text), `Status` (multi-select), `Data` (date),
   `Język` (text). They live in `NOTION_COLUMNS` in `notion.js`.
5. Create the multi-select options beforehand - `Formularz` (Kanał), `nowy`
   (Status) and `1-50`, `51-120`, `121-300`, `301-1000`, `1001-5000`, `5000+`
   (Wielkość - osoby): whether an insert-only connection may add new options
   on its own is not documented.
6. `Data` gets the submission time in Europe/Warsaw; the Polish display format
   is a column setting in Notion (**Date format & timezone** -> Day/Month/Year,
   24-hour time) - the API cannot set it.

Insert-only means a create can never overwrite an existing row - but it also
cannot look rows up (querying needs "Read content"), so a company that writes
again gets a second row. A refused insert (4xx, e.g. a renamed column) is
logged and flagged in the Slack message as "Notion: FAILED (HTTP 400
validation_error) - add the row by hand". No definite answer (timeout, dropped
connection, 5xx) is flagged as "Notion: UNCONFIRMED (...) - check Notion before
adding the row by hand": Notion may have committed the page anyway. A 503 that
carries `additional_data.committed_resource_id` counts as a row added. Free
workspaces with several members have a lifetime block limit (1,000) after
which creates fail with 403.

### Marketing contacts (Resend Contacts API)

Both opt-in paths (banner gate, contact-form checkbox) use the current Resend
Contacts API - global contacts + segments. The legacy
`POST /audiences/{id}/contacts` was removed from Resend's OpenAPI spec on
2026-02-23 and is no longer documented (no published sunset date; the official
SDKs still call it only for their deprecated `audienceId` option); a test
guards against it:

1. `POST https://api.resend.com/contacts` with `{email, first_name?, last_name?,
   unsubscribed: false, segments: [{id}]}` (names only when present; segments
   as objects, not strings) - its 2xx decides success (banner gate `200`,
   form: logged only);
2. then `POST https://api.resend.com/contacts/{contact id}/segments/{id}` (no
   body), with the id from the create answer `{object: "contact", id}`; the
   URL-encoded address is only the fallback for an answer without an id, so
   the address stays out of URLs. For an address that already exists Resend
   answers the create with the existing contact, and whether it then applies
   `segments` is undocumented, so this call makes the membership explicit. A
   non-2xx is logged and never fatal - it can also mean the address already
   was a member.

Both calls: full-access key (`RESEND_API_KEY`; a sending-only key is refused
with `restricted_api_key`, documented as 401), `User-Agent`, 8 s timeout. Log
lines carry the caller and Resend's error `name`, never the message or the
address: `banner gate: Resend contact answered 401 restricted_api_key`,
`contact form: Resend segment membership HTTP 404 not_found`.

**Before merging (DevOps):** confirm the configured id is a segment with a
read-only `GET https://api.resend.com/segments/{id}` (full-access key). This is
expected: Resend renamed audiences to segments and its official SDKs already
send stored audience ids to the segment endpoints - but it is not stated
verbatim in the docs.

### Confirmation emails

`confirmation-email.js` renders both emails (lead + help) in code - HTML +
text, 4 locales, the app's email layout, team guidelines in
`../mailing-wytyczne` - and sends them via `POST https://api.resend.com/emails`
from `SignatureCat <contact@signature.cat>` (replies land in the contact
mailbox) with a `User-Agent` (Resend rejects requests without one) and tags
`category=contact_confirmation|help_confirmation`, `locale=...`. The From
domain must be verified in Resend: public DNS shows the apex `signature.cat`
is the Resend sending domain (`resend._domainkey.signature.cat`,
`send.signature.cat` MX/SPF, `_dmarc` `p=reject`). Why not Resend Templates:
the copy is versioned and reviewed with the code, the 4 locales share one
table, all form values are HTML-escaped under our control and the output is
unit-tested (incl. the no-AI-tell typography rule), with no template ids to
keep in sync. The email logo is `assets/img/email-logo.png` (80x80, 7.9 KB).

`wrangler.toml` sets `keep_vars = true`: Workers Builds runs `wrangler deploy`
on every push to `main`, and without it each deploy would replace the Worker's
plain-text dashboard variables with the (empty) `[vars]` of the config.

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

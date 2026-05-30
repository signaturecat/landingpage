# SignatureCat — Landing page

Static marketing site for **SignatureCat** (https://signature.cat), hosted on **GitHub Pages**.
Centrally manage Gmail signatures across a Google Workspace.

## Tech & principles

- **Static only** — plain HTML + one CSS file + two small JS files. No build step, no framework, no runtime CDN.
- **System fonts** — zero webfont downloads (perf-first, per design system).
- **Design system** — warm minimalism + glassmorphism (ref: tryklack.com). Cream background, achromatic, single pink accent (`#f2a8ff`). Light + Dark via `prefers-color-scheme`. See space `01_design-system.md`.
- **Accessibility** — WCAG AA contrast, semantic HTML, focus states, `prefers-reduced-motion` respected.
- **SEO** — meta description, canonical, Open Graph / Twitter, `hreflang` (en/pl/de/fr + x-default), JSON-LD `SoftwareApplication`, `sitemap.xml`, `robots.txt`.

## Structure

```
.
├── index.html              # single-page landing
├── assets/
│   ├── css/style.css        # design tokens + all styles (Light/Dark)
│   ├── js/i18n.js           # translation dictionary (en, pl, de, fr)
│   ├── js/app.js            # locale resolution, pricing calculator, UI
│   └── img/                 # logo-mark.png, favicon.png, apple-touch-icon.png, anna.jpg, og-cover.svg
├── CNAME                    # signature.cat
├── .nojekyll                # serve assets/ as-is on GitHub Pages
├── robots.txt
└── sitemap.xml
```

## Internationalization

- Supported locales: **en** (fallback), **pl**, **de**, **fr**.
- On first visit, locale is auto-detected from `navigator.languages` (primary subtag); unsupported → `en`.
- Manual choice is persisted in `localStorage` (`sigcat_locale`).
- Proper names are never translated: SignatureCat, Google, Workspace, Gmail, Stripe, GCP, Secret Manager, Directory API, Domain-Wide Delegation, RODO/GDPR.
- To edit copy: change strings in `assets/js/i18n.js`. Every key must exist in all four locales.

## Pricing calculator

Mirrors the **graduated** per-seat model from `signaturecat/app` → `docs/06_stripe_billing.md`:

| Workspace user count | Price per user / month |
|---|---|
| 1 user | Free (no Stripe subscription) |
| 2 – 50 | $0.80 |
| 51 – 120 | $0.70 |
| 121+ | $0.60 |

The calculator applies a **single flat tier rate to the whole headcount** (rate for the size band × number of users) — it does NOT sum seats across tiers. Examples: 50 users = $40.00 (0.80×50), 80 users = $56.00 (0.70×80), 121 users = $72.60 (0.60×121), 1 user = Free. It shows `N users × $rate / user / mo` and the monthly total. Currency via `Intl.NumberFormat(locale, { currency: 'USD' })`. Totals are estimates excluding tax.

> Source of truth: `rateForCount()` / `computeTotal()` in `assets/js/app.js`. If tiers change, update those **and** the tier table + this README.
> NOTE: this flat-per-tier estimate intentionally differs from `signaturecat/app` → `docs/06_stripe_billing.md` (graduated). Reconcile if the landing estimate must match real Stripe invoices.

## Placeholders to replace

- `assets/img/og-cover.svg` — social share cover (SVG placeholder; swap for a real product shot if desired).
- Brand assets are real: `logo-mark.png` (header/footer), `favicon.png` + `apple-touch-icon.png` (site icon), `anna.jpg` (animated signature-preview avatar).
- Hero visual is a CSS/SVG glass mock of a signature preview — replace with a real product screenshot (`<img loading="lazy" width height>`) when available.

## Local preview

```bash
python3 -m http.server 8099
# open http://localhost:8099
```

## Deployment (GitHub Pages)

1. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
2. Branch: `main`, folder: `/ (root)`.
3. Custom domain `signature.cat` is set via the `CNAME` file. Configure DNS (apex `A`/`ALIAS` to GitHub Pages or `CNAME` for `www`) — DNS/infra is owned by the **DevOps Team**.
4. `.nojekyll` ensures the `assets/` directory is served verbatim.

## Docs link

The "Docs" links point to `https://signature.cat/docs` (publicly available documentation). Publishing that path is **out of frontend scope** — see the note to DevOps in the changelog.

## Documentation

All design/frontend changes are logged in [`docs/CHANGELOG.md`](docs/CHANGELOG.md). No change is complete without an entry (Definition of Done).

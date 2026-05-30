# Landing page — Changelog

> Language: English. Proper names not translated. Every change logged here (Definition of Done).

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

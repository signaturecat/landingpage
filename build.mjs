#!/usr/bin/env node
/**
 * Static i18n pre-renderer for signature.cat (zero dependencies).
 *
 * The site is authored ONCE in English in index.html (structure + [data-i18n]
 * keys) and assets/js/i18n.js (the per-locale copy dictionary). This script
 * pre-renders one crawlable, self-canonical page per locale so search engines
 * can index each language at its own URL:
 *
 *   /            -> en  (x-default + self-canonical)
 *   /pl/ /de/ /fr/ -> pl/de/fr
 *
 * It also (re)writes per-page <title>, meta description, canonical, the shared
 * reciprocal hreflang block, og/twitter/JSON-LD, og:locale, and root-absolute
 * asset paths so /pl/ etc. resolve correctly. Run it before committing any
 * change to index.html or assets/js/i18n.js:
 *
 *   node build.mjs
 *
 * It is idempotent (running twice is a no-op) and asserts so.
 * Browser-language routing is NOT done here - it is a server-side concern (the
 * Cloudflare Worker in ./cloudflare). This generator only produces the pages.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://signature.cat';
const SUPPORTED = ['en', 'pl', 'de', 'fr'];
const OG_LOCALE = { en: 'en_US', pl: 'pl_PL', de: 'de_DE', fr: 'fr_FR' };
// Canonical URLs carry NO trailing slash (the edge Worker 301s slashed
// requests and internally maps /pl -> pl/index.html on the origin).
const pathFor = (loc) => (loc === 'en' ? '/' : `/${loc}`);
const urlFor = (loc) => BASE + pathFor(loc);

// ---- escaping (mirror the browser: textContent / setAttribute semantics) ----
const escHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => escHtml(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const jsonStr = (s) => JSON.stringify(String(s)).slice(1, -1); // inner of a JSON string

// ---- load the copy dictionary (window.I18N = {...}) --------------------------
function loadDict() {
  const src = readFileSync(join(ROOT, 'assets/js/i18n.js'), 'utf8');
  const win = {};
  // i18n.js is a single `window.I18N = {...}` assignment with no exports.
  new Function('window', src)(win);
  const I18N = win.I18N;
  if (!I18N) throw new Error('i18n.js did not assign window.I18N');
  for (const loc of SUPPORTED) {
    if (!I18N[loc]) throw new Error(`i18n.js missing locale: ${loc}`);
  }
  return I18N;
}

// ---- the shared, identical hreflang block injected into every page ----------
const HREFLANG_BLOCK = [
  ...SUPPORTED.map(
    (l) => `  <link rel="alternate" hreflang="${l}" href="${urlFor(l)}" />`,
  ),
  `  <link rel="alternate" hreflang="x-default" href="${BASE}/" />`,
].join('\n');

// ---- structured data: JSON-LD @graph (SEO audit, PM 2026-07-23) ---------------
// One localized @graph per page: Organization (brand entity + sameAs),
// WebSite (domain <-> name + SearchAction into the docs search), the
// SoftwareApplication (now with logo/image/areaServed) and FAQPage built from
// the SAME i18n keys the visible FAQ section renders from - the markup and
// the structured data can never diverge.
const ORG_ID = `${BASE}/#organization`;
const LOGO_URL = `${BASE}/assets/img/logo-mark.png`;
const OG_IMAGE_URL = `${BASE}/assets/img/og-cover.svg`;
// Brand profiles for Organization.sameAs (E-E-A-T entity links). Only list
// profiles that actually exist and are ours; extend as new ones launch.
const SAME_AS = [
  'https://github.com/signaturecat',
];
const FAQ_COUNT = 7;

function jsonLdGraph(loc, tr) {
  const url = urlFor(loc);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'SignatureCat',
        url: `${BASE}/`,
        logo: { '@type': 'ImageObject', url: LOGO_URL },
        sameAs: SAME_AS,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'contact@signature.cat',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${BASE}/#website`,
        name: 'SignatureCat',
        url: `${BASE}/`,
        inLanguage: loc,
        publisher: { '@id': ORG_ID },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE}/docs?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'SignatureCat',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Google Workspace',
        description: tr('meta.desc'),
        url,
        logo: LOGO_URL,
        image: OG_IMAGE_URL,
        areaServed: 'EU',
        publisher: { '@id': ORG_ID },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '0.55',
          highPrice: '0.80',
          offerCount: '4',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: loc,
        mainEntity: Array.from({ length: FAQ_COUNT }, (_v, i) => ({
          '@type': 'Question',
          name: tr(`faq.q${i + 1}`),
          acceptedAnswer: { '@type': 'Answer', text: tr(`faq.a${i + 1}`) },
        })),
      },
    ],
  };
  return JSON.stringify(graph, null, 2);
}

/** Produce the fully localized HTML for `loc` from the English source. */
function render(src, loc, I18N) {
  const dict = I18N[loc];
  const en = I18N.en;
  const tr = (key) => {
    const v = dict[key] != null ? dict[key] : en[key];
    if (v == null) throw new Error(`Missing i18n key "${key}" (locale ${loc})`);
    return v;
  };
  let html = src;

  // <html lang>
  html = html.replace(/<html lang="[^"]*">/, `<html lang="${loc}">`);

  // [data-i18n] text nodes (content is text-only; assert no child markup)
  html = html.replace(
    /<(\w+)([^>]*\sdata-i18n="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g,
    (_m, tag, attrs, key, content) => {
      if (content.includes('<')) {
        throw new Error(
          `[data-i18n] <${tag} data-i18n="${key}"> contains child markup; the text applier is unsafe here. Keep data-i18n on text-only elements.`,
        );
      }
      return `<${tag}${attrs}>${escHtml(tr(key))}</${tag}>`;
    },
  );

  // meta description (the only data-i18n-attr usage: content:meta.desc)
  html = html.replace(
    /(<meta name="description"[^>]*\scontent=")[^"]*(")/,
    `$1${escAttr(tr('meta.desc'))}$2`,
  );

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escHtml(tr('meta.title'))}</title>`);

  // canonical -> this page's own URL (never the root for sub-locales)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${urlFor(loc)}$2`);

  // reciprocal hreflang block (identical on every page)
  html = html.replace(
    /(?:[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\n)+/,
    HREFLANG_BLOCK + '\n',
  );

  // og:url
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${urlFor(loc)}$2`);

  // og:locale (+ alternates) - remove any existing first so re-runs are idempotent
  html = html.replace(
    /[ \t]*<meta property="og:locale(?::alternate)?" content="[^"]*" \/>\n/g,
    '',
  );
  const ogLocale =
    `  <meta property="og:locale" content="${OG_LOCALE[loc]}" />\n` +
    SUPPORTED.filter((l) => l !== loc)
      .map((l) => `  <meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`)
      .join('\n') +
    '\n';
  html = html.replace(/(<meta property="og:url"[^>]*\/>\n)/, `$1${ogLocale}`);

  // Localized social copy for non-English (keep en's hand-tuned strings intact).
  if (loc !== 'en') {
    html = html.replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      `$1${escAttr(tr('meta.title'))}$2`,
    );
    html = html.replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${escAttr(tr('meta.desc'))}$2`,
    );
    html = html.replace(
      /(<meta name="twitter:title" content=")[^"]*(")/,
      `$1${escAttr(tr('meta.title'))}$2`,
    );
    html = html.replace(
      /(<meta name="twitter:description" content=")[^"]*(")/,
      `$1${escAttr(tr('meta.desc'))}$2`,
    );
  }

  // JSON-LD: the whole block is regenerated per locale from the i18n dict -
  // no field-level regex patching (deterministic, hence idempotent).
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${jsonLdGraph(loc, tr)}\n  </script>`,
  );

  // page-level relative asset refs -> root-absolute so /pl/ resolves them
  html = html.replace(/(\s(?:href|src)=")assets\//g, '$1/assets/');

  // The GENERATED banner is no longer emitted into served HTML (PM request
  // 2026-07-18) - keep stripping the historical one so re-renders of older
  // outputs stay idempotent. The "do not edit" rule lives in README/docs.
  html = html.replace(/<!-- GENERATED by build\.mjs[\s\S]*?-->\n/, '');
  return html;
}

// Indexable legal pages (generated by build-legal.mjs). Only the hub and the
// binding Polish originals are listed - the EN/DE/FR legal pages are automatic
// translations and carry noindex, so they must NOT appear here.
const LEGAL_URLS = ['/legal', '/pl/terms', '/pl/policy'];

function sitemap() {
  const alts = SUPPORTED.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(l)}"/>`,
  ).join('\n');
  const xdef = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/"/>`;
  const urls = SUPPORTED.map(
    (l) => `  <url>
    <loc>${urlFor(l)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${l === 'en' ? '1.0' : '0.9'}</priority>
${alts}
${xdef}
  </url>`,
  ).join('\n');
  const legal = LEGAL_URLS.map(
    (p) => `  <url>
    <loc>${BASE}${p}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>`,
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
${legal}
</urlset>
`;
}

// ---- run ---------------------------------------------------------------------
const I18N = loadDict();
const SRC = readFileSync(join(ROOT, 'index.html'), 'utf8');

// assert every translated key resolves in en (no visible raw keys)
for (const m of SRC.matchAll(/\sdata-i18n="([^"]+)"/g)) {
  if (I18N.en[m[1]] == null) throw new Error(`data-i18n key "${m[1]}" missing from en dictionary`);
}
for (const k of ['meta.title', 'meta.desc']) {
  if (I18N.en[k] == null) throw new Error(`required key "${k}" missing from en dictionary`);
}
// FAQPage JSON-LD is built from the same keys the visible FAQ renders from -
// every locale must have the full set (the FAQ schema must match the markup).
for (const loc of SUPPORTED) {
  for (let i = 1; i <= FAQ_COUNT; i += 1) {
    for (const k of [`faq.q${i}`, `faq.a${i}`]) {
      if (I18N[loc][k] == null) throw new Error(`FAQ key "${k}" missing from ${loc} dictionary`);
    }
  }
}

const outputs = {};
for (const loc of SUPPORTED) outputs[loc] = render(SRC, loc, I18N);

// idempotency: re-rendering an output must be a no-op
for (const loc of SUPPORTED) {
  if (render(outputs[loc], loc, I18N) !== outputs[loc]) {
    throw new Error(`render is not idempotent for locale ${loc}`);
  }
}

// invariants: canonicals match urlFor; only the root carries a trailing slash
for (const loc of SUPPORTED) {
  const canon = outputs[loc].match(/<link rel="canonical" href="([^"]*)"/)[1];
  if (canon !== urlFor(loc)) throw new Error(`canonical mismatch for ${loc}: ${canon}`);
  if (loc === 'en' ? canon !== `${BASE}/` : canon.endsWith('/')) {
    throw new Error(`canonical trailing-slash rule violated for ${loc}: ${canon}`);
  }
}

// write
writeFileSync(join(ROOT, 'index.html'), outputs.en);
for (const loc of SUPPORTED.filter((l) => l !== 'en')) {
  mkdirSync(join(ROOT, loc), { recursive: true });
  writeFileSync(join(ROOT, loc, 'index.html'), outputs[loc]);
}
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap());

console.log('Generated: /index.html, /pl/, /de/, /fr/, sitemap.xml (locales: ' + SUPPORTED.join(', ') + ')');

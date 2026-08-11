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
import { createHash } from 'node:crypto';

const ROOT = dirname(fileURLToPath(import.meta.url));

/* Content hash for first-party assets referenced from the built pages (cache
   busting - see the rewrite step in render()). One read per file per run;
   deterministic, so the build stays idempotent. */
const assetHashes = new Map();
function assetHash(path) {
  if (!assetHashes.has(path)) {
    const body = readFileSync(join(ROOT, path.slice(1)));
    assetHashes.set(path, createHash('sha256').update(body).digest('hex').slice(0, 10));
  }
  return assetHashes.get(path);
}
const BASE = 'https://signature.cat';
const SUPPORTED = ['en', 'pl', 'de', 'fr'];
const OG_LOCALE = { en: 'en_US', pl: 'pl_PL', de: 'de_DE', fr: 'fr_FR' };

/* Landing pages rendered by this generator. Each page is authored ONCE in
   English (src) with its own per-page title/description i18n keys and a
   dedicated JSON-LD graph builder (`graph`). Adding a page = a new source
   file + an entry here (+ the pp.-style keys in i18n.js x4 locales). */
const PAGES = [
  { src: 'index.html', slug: '', titleKey: 'meta.title', descKey: 'meta.desc', graph: 'home' },
  { src: 'pricing.html', slug: 'pricing', titleKey: 'pp.meta.title', descKey: 'pp.meta.desc', graph: 'pricing' },
  { src: 'banners.html', slug: 'banners-generator', titleKey: 'bg.meta.title', descKey: 'bg.meta.desc', graph: 'banners' },
];

// Canonical URLs carry NO trailing slash (the edge Worker 301s slashed
// requests and internally maps /pl -> pl/index.html on the origin). The only
// exception is the English home page, which is the bare root `/`.
const pathFor = (loc, slug = '') => {
  const prefix = loc === 'en' ? '' : `/${loc}`;
  if (!slug) return prefix || '/';
  return `${prefix}/${slug}`;
};
const urlFor = (loc, slug = '') => BASE + pathFor(loc, slug);

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

// ---- the reciprocal hreflang block, identical on a page's four variants -----
const hreflangBlock = (slug) =>
  [
    ...SUPPORTED.map(
      (l) => `  <link rel="alternate" hreflang="${l}" href="${urlFor(l, slug)}" />`,
    ),
    `  <link rel="alternate" hreflang="x-default" href="${urlFor('en', slug)}" />`,
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
// profiles that actually exist and are ours (PM decision 2026-07-23: none
// are ready yet, so the list stays empty and the property is OMITTED from
// the output - an empty sameAs is validator noise). When the profiles
// launch, add their URLs here and rerun the build.
const SAME_AS = [];
const FAQ_COUNT = 7;

// Shared brand nodes referenced (by @id) from every page's graph.
function orgNode() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'SignatureCat',
    url: `${BASE}/`,
    logo: { '@type': 'ImageObject', url: LOGO_URL },
    ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'contact@signature.cat',
    },
  };
}
function webSiteNode(loc) {
  return {
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
  };
}
function softwareNode(loc, tr, url) {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${BASE}/#software`,
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
  };
}

function jsonLdGraph(loc, tr) {
  const url = urlFor(loc);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      webSiteNode(loc),
      softwareNode(loc, tr, url),
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

// /pricing: WebPage about the SoftwareApplication (the offers live on the
// software node - same AggregateOffer as the home page, single source of
// truth for the price range). No FAQPage here: the page renders no FAQ
// markup and structured data must never claim content the page lacks.
function jsonLdPricingGraph(loc, tr) {
  const url = urlFor(loc, 'pricing');
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      webSiteNode(loc),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: tr('pp.meta.title'),
        description: tr('pp.meta.desc'),
        inLanguage: loc,
        isPartOf: { '@id': `${BASE}/#website` },
        about: { '@id': `${BASE}/#software` },
      },
      softwareNode(loc, tr, `${BASE}/`),
    ],
  };
  return JSON.stringify(graph, null, 2);
}

// /banners-generator: the free banner tool as a WebApplication (price 0 makes
// the "free" claim machine-readable) + a WebPage about it + a FAQPage built
// from the SAME bg.faq.* keys the visible FAQ section renders from - markup
// and structured data can never diverge (same rule as the home FAQ).
const BG_FAQ_COUNT = 4;
function jsonLdBannersGraph(loc, tr) {
  const url = urlFor(loc, 'banners-generator');
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      orgNode(),
      webSiteNode(loc),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: tr('bg.meta.title'),
        description: tr('bg.meta.desc'),
        inLanguage: loc,
        isPartOf: { '@id': `${BASE}/#website` },
        about: { '@id': `${url}#app` },
      },
      {
        '@type': 'WebApplication',
        '@id': `${url}#app`,
        name: tr('bg.hero.title'),
        description: tr('bg.meta.desc'),
        url,
        applicationCategory: 'DesignApplication',
        operatingSystem: 'Web',
        inLanguage: loc,
        isPartOf: { '@id': `${BASE}/#website` },
        publisher: { '@id': ORG_ID },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: loc,
        mainEntity: Array.from({ length: BG_FAQ_COUNT }, (_v, i) => ({
          '@type': 'Question',
          name: tr(`bg.faq.q${i + 1}`),
          acceptedAnswer: { '@type': 'Answer', text: tr(`bg.faq.a${i + 1}`) },
        })),
      },
    ],
  };
  return JSON.stringify(graph, null, 2);
}

/** Produce the fully localized HTML for `loc` from the page's English source. */
function render(src, loc, I18N, page) {
  const dict = I18N[loc];
  const en = I18N.en;
  const tr = (key) => {
    const v = dict[key] != null ? dict[key] : en[key];
    if (v == null) throw new Error(`Missing i18n key "${key}" (locale ${loc})`);
    return v;
  };
  const pageUrl = urlFor(loc, page.slug);
  let html = src;

  // <html lang> (attribute-only replace: subpages carry extra attributes on
  // the <html> tag, e.g. data-i18n-title)
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${loc}"`);

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

  // meta description (data-i18n-attr usage: content:<page desc key>)
  html = html.replace(
    /(<meta name="description"[^>]*\scontent=")[^"]*(")/,
    `$1${escAttr(tr(page.descKey))}$2`,
  );

  // <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escHtml(tr(page.titleKey))}</title>`);

  // canonical -> this page variant's own URL (never the root for sub-locales)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${pageUrl}$2`);

  // reciprocal hreflang block (identical on the page's four variants)
  html = html.replace(
    /(?:[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\n)+/,
    hreflangBlock(page.slug) + '\n',
  );

  // og:url
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${pageUrl}$2`);

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
      `$1${escAttr(tr(page.titleKey))}$2`,
    );
    html = html.replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${escAttr(tr(page.descKey))}$2`,
    );
    html = html.replace(
      /(<meta name="twitter:title" content=")[^"]*(")/,
      `$1${escAttr(tr(page.titleKey))}$2`,
    );
    html = html.replace(
      /(<meta name="twitter:description" content=")[^"]*(")/,
      `$1${escAttr(tr(page.descKey))}$2`,
    );
  }

  // JSON-LD: the whole block is regenerated per locale from the i18n dict -
  // no field-level regex patching (deterministic, hence idempotent).
  const graphBuilders = { home: jsonLdGraph, pricing: jsonLdPricingGraph, banners: jsonLdBannersGraph };
  const graph = graphBuilders[page.graph](loc, tr);
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${graph}\n  </script>`,
  );

  // Docs links follow the page language (PM 2026-07-23): /pl -> /pl/docs etc.
  // Only anchor hrefs - the JSON-LD SearchAction entrypoint stays canonical.
  // Idempotent: a /pl/docs href no longer matches the /docs pattern.
  if (loc !== 'en') {
    html = html.replace(
      /(href=")https:\/\/signature\.cat\/docs(?=["/#?])/g,
      `$1https://signature.cat/${loc}/docs`,
    );
  }

  // Cross-page internal links follow the page language too (subpages link
  // home sections as /#..., the home page as /, and the pricing page as
  // /pricing). Language-switcher anchors (data-lang) are exempt - they
  // deliberately point at a SPECIFIC locale's URL. Idempotent: /pl#, /pl and
  // /pl/pricing no longer match the English patterns.
  if (loc !== 'en') {
    html = html.replace(/href="\/#/g, `href="/${loc}#`);
    for (const target of ['/', '/pricing', '/banners-generator']) {
      html = html.replace(/<a\b[^>]*>/g, (tag) => {
        if (tag.includes('data-lang')) return tag;
        return tag.replace(`href="${target}"`, `href="${pathFor(loc, target.slice(1))}"`);
      });
    }
  }

  // "Book a call" CTA: the mailto subject is copy, so it lives in the
  // dictionary as plain text (contact.subject) and the URL is composed here,
  // percent-encoded. Baking it means the localized subject is in the served
  // HTML too, not only after app.js runs. Idempotent: an existing ?subject=
  // is replaced, not appended.
  html = html.replace(
    /(<a\b[^>]*\bhref=")mailto:contact@signature\.cat(?:\?subject=[^"]*)?(")/,
    `$1mailto:contact@signature.cat?subject=${encodeURIComponent(tr('contact.subject'))}$2`,
  );

  // page-level relative asset refs -> root-absolute so /pl/ resolves them
  html = html.replace(/(\s(?:href|src)=")assets\//g, '$1/assets/');

  // Cache-busting for first-party CSS/JS: documents are served no-cache by
  // the edge Worker, but /assets/* sits under the zone's 4h browser TTL - so
  // a deploy that changes a stylesheet would serve NEW markup with STALE
  // styles for hours (bit us on 2026-08-11: the fresh H1 <mark> rendered
  // with the UA's yellow until the cache expired). A content-hash query
  // string gives every asset revision its own URL: cold cache at the edge
  // AND in browsers the moment the new HTML lands. The Worker passes query
  // strings through to the origin and GitHub Pages ignores them. Idempotent:
  // an existing ?v=... is replaced with the current hash.
  html = html.replace(
    /(\s(?:href|src)=")(\/assets\/[^"?]+\.(?:css|js))(?:\?v=[0-9a-f]+)?(")/g,
    (_m, pre, path, post) => `${pre}${path}?v=${assetHash(path)}${post}`,
  );

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
  const urls = PAGES.flatMap((page) => {
    const alts = [
      ...SUPPORTED.map(
        (l) =>
          `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(l, page.slug)}"/>`,
      ),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor('en', page.slug)}"/>`,
    ].join('\n');
    return SUPPORTED.map(
      (l) => `  <url>
    <loc>${urlFor(l, page.slug)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.slug === '' ? (l === 'en' ? '1.0' : '0.9') : l === 'en' ? '0.8' : '0.7'}</priority>
${alts}
  </url>`,
    );
  }).join('\n');
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

// Forbidden-character guard (PM 2026-07-23 - same rule as build-docs.mjs):
// no AI-tell dashes, no invisible/bidi characters, and no typographic double
// quotes (guillemets, low-9, curly) in SERVED pages - rendered copy uses the
// plain keyboard '"' only. Apostrophes (') stay allowed.
const FORBIDDEN =
  /[\u2012\u2013\u2014\u2015\u200B\u200C\u200D\u2060\uFEFF\u00A0\u202F\u00AD\u200E\u200F\u00AB\u00BB\u201C\u201D\u201E\u201F]/;

// FAQPage JSON-LD is built from the same keys the visible FAQ renders from -
// every locale must have the full set (the FAQ schema must match the markup).
for (const loc of SUPPORTED) {
  for (let i = 1; i <= FAQ_COUNT; i += 1) {
    for (const k of [`faq.q${i}`, `faq.a${i}`]) {
      if (I18N[loc][k] == null) throw new Error(`FAQ key "${k}" missing from ${loc} dictionary`);
    }
  }
  for (let i = 1; i <= BG_FAQ_COUNT; i += 1) {
    for (const k of [`bg.faq.q${i}`, `bg.faq.a${i}`]) {
      if (I18N[loc][k] == null) throw new Error(`FAQ key "${k}" missing from ${loc} dictionary`);
    }
  }
}

const written = [];
for (const page of PAGES) {
  const SRC = readFileSync(join(ROOT, page.src), 'utf8');

  // assert every translated key resolves in en (no visible raw keys)
  for (const m of SRC.matchAll(/\sdata-i18n="([^"]+)"/g)) {
    if (I18N.en[m[1]] == null)
      throw new Error(`${page.src}: data-i18n key "${m[1]}" missing from en dictionary`);
  }
  for (const k of [page.titleKey, page.descKey]) {
    if (I18N.en[k] == null)
      throw new Error(`${page.src}: required key "${k}" missing from en dictionary`);
  }

  const outputs = {};
  for (const loc of SUPPORTED) outputs[loc] = render(SRC, loc, I18N, page);

  for (const loc of SUPPORTED) {
    const m = outputs[loc].match(FORBIDDEN);
    if (m) {
      const cp = m[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
      throw new Error(`${page.src} ${loc}: forbidden character U+${cp} in output`);
    }
  }

  // idempotency: re-rendering an output must be a no-op
  for (const loc of SUPPORTED) {
    if (render(outputs[loc], loc, I18N, page) !== outputs[loc]) {
      throw new Error(`${page.src}: render is not idempotent for locale ${loc}`);
    }
  }

  // invariants: canonicals match urlFor; only the en root carries a trailing slash
  for (const loc of SUPPORTED) {
    const canon = outputs[loc].match(/<link rel="canonical" href="([^"]*)"/)[1];
    if (canon !== urlFor(loc, page.slug))
      throw new Error(`${page.src}: canonical mismatch for ${loc}: ${canon}`);
    if (loc === 'en' && page.slug === '' ? canon !== `${BASE}/` : canon.endsWith('/')) {
      throw new Error(`${page.src}: canonical trailing-slash rule violated for ${loc}: ${canon}`);
    }
  }

  // write: en output overwrites the source in place (index.html / pricing.html
  // is served directly); pricing additionally lands at /pricing/index.html so
  // the Worker's extension-less rewrite finds it; sub-locales go to
  // /<loc>/<slug>/index.html.
  writeFileSync(join(ROOT, page.src), outputs.en);
  if (page.slug) {
    mkdirSync(join(ROOT, page.slug), { recursive: true });
    writeFileSync(join(ROOT, page.slug, 'index.html'), outputs.en);
  }
  for (const loc of SUPPORTED.filter((l) => l !== 'en')) {
    const dir = page.slug ? join(ROOT, loc, page.slug) : join(ROOT, loc);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), outputs[loc]);
  }
  written.push(...SUPPORTED.map((l) => pathFor(l, page.slug)));
}

writeFileSync(join(ROOT, 'sitemap.xml'), sitemap());

console.log(
  `Generated: ${written.join(', ')} + sitemap.xml (locales: ${SUPPORTED.join(', ')})`,
);

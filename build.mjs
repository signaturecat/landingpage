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
const pathFor = (loc) => (loc === 'en' ? '/' : `/${loc}/`);
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
  `  <link rel="alternate" hreflang="en" href="${BASE}/" />`,
  `  <link rel="alternate" hreflang="pl" href="${BASE}/pl/" />`,
  `  <link rel="alternate" hreflang="de" href="${BASE}/de/" />`,
  `  <link rel="alternate" hreflang="fr" href="${BASE}/fr/" />`,
  `  <link rel="alternate" hreflang="x-default" href="${BASE}/" />`,
].join('\n');

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

  // Localized social copy + JSON-LD description for non-English (keep en's
  // hand-tuned strings intact). url in JSON-LD is localized for every locale.
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
    html = html.replace(/("description":\s*")[^"]*(")/, `$1${jsonStr(tr('meta.desc'))}$2`);
  }
  html = html.replace(/("url":\s*")[^"]*(")/, `$1${urlFor(loc)}$2`);

  // page-level relative asset refs -> root-absolute so /pl/ resolves them
  html = html.replace(/(\s(?:href|src)=")assets\//g, '$1/assets/');

  // generated banner on the sub-locale files (root is also the source template).
  // Strip any existing banner first so re-runs do not stack duplicates.
  if (loc !== 'en') {
    html = html.replace(/<!-- GENERATED by build\.mjs[\s\S]*?-->\n/, '');
    html = html.replace(
      /(<!DOCTYPE html>\r?\n)/i,
      `$1<!-- GENERATED by build.mjs (${loc}) from /index.html + /assets/js/i18n.js. Do not edit directly; edit the source then run: node build.mjs -->\n`,
    );
  }
  return html;
}

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
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
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

const outputs = {};
for (const loc of SUPPORTED) outputs[loc] = render(SRC, loc, I18N);

// idempotency: re-rendering an output must be a no-op
for (const loc of SUPPORTED) {
  if (render(outputs[loc], loc, I18N) !== outputs[loc]) {
    throw new Error(`render is not idempotent for locale ${loc}`);
  }
}

// invariants: every emitted canonical/hreflang/og:url/sitemap URL ends with "/"
for (const loc of SUPPORTED) {
  const canon = outputs[loc].match(/<link rel="canonical" href="([^"]*)"/)[1];
  if (canon !== urlFor(loc)) throw new Error(`canonical mismatch for ${loc}: ${canon}`);
  if (!canon.endsWith('/')) throw new Error(`canonical not slash-terminated for ${loc}`);
}

// write
writeFileSync(join(ROOT, 'index.html'), outputs.en);
for (const loc of SUPPORTED.filter((l) => l !== 'en')) {
  mkdirSync(join(ROOT, loc), { recursive: true });
  writeFileSync(join(ROOT, loc, 'index.html'), outputs[loc]);
}
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap());

console.log('Generated: /index.html, /pl/, /de/, /fr/, sitemap.xml (locales: ' + SUPPORTED.join(', ') + ')');

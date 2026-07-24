#!/usr/bin/env node
/**
 * Static generator for the public documentation at signature.cat/docs
 * (zero dependencies, same philosophy as build.mjs / build-legal.mjs).
 *
 * Sources: /docs-src/*.md - Markdown with a small front-matter block:
 *
 *   ---
 *   title: Connect your Google Workspace
 *   description: Meta description shown in Google.
 *   updated: 2026-07-17
 *   ---
 *
 * i18n (PM 2026-07-23): English sources live in /docs-src/*.md and stay the
 * canonical content; translations live in /docs-src/<locale>/*.md (pl, de,
 * fr) with the SAME filenames and the SAME front-matter contract (title /
 * navTitle / description translated, `updated` copied from the English
 * source). A missing translation file fails the build - the language cluster
 * is all-or-nothing per page.
 *
 * The NAV manifest below is the single source of truth for the sidebar
 * structure, page order (prev/next) and the URL of every page. URLs:
 *
 *   en -> /docs/<slug>           (docs/<slug>/index.html)
 *   pl -> /pl/docs/<slug>        (pl/docs/<slug>/index.html), de/fr alike
 *
 * (canonical URLs carry no trailing slash - the edge Worker 301s slashed
 * requests and maps the extension-less URL onto the origin file).
 *
 * Besides the pages the build also emits:
 *   /docs/sitemap.xml            - docs-only sitemap, ALL locales, with
 *                                  xhtml:link hreflang alternates
 *   /docs/search-index.json      - client-side search index (per locale:
 *                                  /<loc>/docs/search-index.json)
 *   /llms.txt / /llms-full.txt   - llmstxt.org files (English only)
 *
 * SEO decisions (mirrors the landing conventions):
 *   - every page: <title>TOPIC | SignatureCat Docs</title>, self-canonical,
 *     indexable, Open Graph/Twitter, JSON-LD TechArticle + BreadcrumbList;
 *   - reciprocal hreflang cluster (en/pl/de/fr + x-default -> en) per page,
 *     identical on all four variants - the landing pattern;
 *   - canonical URLs have no trailing slash (see the Worker's routePath);
 *   - headings get stable ids (anchor deep-links, used by the TOC scroll-spy;
 *     ids derive from the localized heading text, so deep links are
 *     per-language - the per-locale search index links them correctly).
 *
 * Run after any change to /docs-src or this file:
 *
 *   node build-docs.mjs
 *
 * Output is committed (GitHub Pages serves the repo as-is). The internal
 * changelog docs/CHANGELOG.md is left untouched. The build asserts that no
 * "AI-tell" characters (em/en dash, NBSP and friends) leak into served HTML.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://signature.cat';
const DOCS_BASE = `${BASE}/docs`;
const APP = 'https://app.signature.cat';
const SITE_NAME = 'SignatureCat Docs';

/* ---- locales ---------------------------------------------------------------- */
const LOCALES = ['en', 'pl', 'de', 'fr'];
const OG_LOCALE = { en: 'en_US', pl: 'pl_PL', de: 'de_DE', fr: 'fr_FR' };
const LANG_NAMES = { en: 'English', pl: 'Polski', de: 'Deutsch', fr: 'Français' };

/* Sidebar section names per locale (NAV stays the structural source of truth). */
const SECTION_NAMES = {
  'Getting started': { en: 'Getting started', pl: 'Pierwsze kroki', de: 'Erste Schritte', fr: 'Premiers pas' },
  'Advanced setup': { en: 'Advanced setup', pl: 'Konfiguracja zaawansowana', de: 'Erweiterte Einrichtung', fr: 'Configuration avancée' },
  Billing: { en: 'Billing', pl: 'Rozliczenia', de: 'Abrechnung', fr: 'Facturation' },
  Reference: { en: 'Reference', pl: 'Referencja', de: 'Referenz', fr: 'Référence' },
  Support: { en: 'Support', pl: 'Wsparcie', de: 'Support', fr: 'Assistance' },
};

/* Page-chrome strings per locale (everything outside the Markdown content). */
const UI = {
  en: {
    skip: 'Skip to content', menu: 'Toggle documentation menu', docsCrumb: 'Docs',
    search: 'Search docs', searchPlaceholder: 'Search documentation',
    searchAria: 'Search documentation', searchClose: 'Close search',
    searchEmpty: 'No results. Try different keywords or email',
    onThisPage: 'On this page', prev: 'Previous', next: 'Next',
    help: 'Help', openApp: 'Open app', legal: 'Legal', language: 'Language',
    contact: 'Contact',
    breadcrumbAria: 'Breadcrumb', pagerAria: 'Pagination', navAria: 'Documentation',
    themeAria: 'Theme: system', anchorAria: 'Copy link to this section',
  },
  pl: {
    skip: 'Przejdź do treści', menu: 'Przełącz menu dokumentacji', docsCrumb: 'Dokumentacja',
    search: 'Szukaj w dokumentacji', searchPlaceholder: 'Przeszukaj dokumentację',
    searchAria: 'Przeszukaj dokumentację', searchClose: 'Zamknij wyszukiwarkę',
    searchEmpty: 'Brak wyników. Spróbuj innych słów kluczowych albo napisz na',
    onThisPage: 'Na tej stronie', prev: 'Poprzednia', next: 'Następna',
    help: 'Pomoc', openApp: 'Otwórz aplikację', legal: 'Informacje prawne', language: 'Język',
    contact: 'Kontakt',
    breadcrumbAria: 'Okruszki nawigacyjne', pagerAria: 'Stronicowanie', navAria: 'Dokumentacja',
    themeAria: 'Motyw: systemowy', anchorAria: 'Skopiuj link do tej sekcji',
  },
  de: {
    skip: 'Zum Inhalt springen', menu: 'Dokumentationsmenü umschalten', docsCrumb: 'Doku',
    search: 'Doku durchsuchen', searchPlaceholder: 'Dokumentation durchsuchen',
    searchAria: 'Dokumentation durchsuchen', searchClose: 'Suche schließen',
    searchEmpty: 'Keine Ergebnisse. Versuchen Sie andere Suchbegriffe oder schreiben Sie an',
    onThisPage: 'Auf dieser Seite', prev: 'Zurück', next: 'Weiter',
    help: 'Hilfe', openApp: 'App öffnen', legal: 'Rechtliches', language: 'Sprache',
    contact: 'Kontakt',
    breadcrumbAria: 'Brotkrümelnavigation', pagerAria: 'Seitennavigation', navAria: 'Dokumentation',
    themeAria: 'Design: System', anchorAria: 'Link zu diesem Abschnitt kopieren',
  },
  fr: {
    skip: 'Aller au contenu', menu: 'Basculer le menu de la documentation', docsCrumb: 'Docs',
    search: 'Rechercher dans la doc', searchPlaceholder: 'Rechercher dans la documentation',
    searchAria: 'Rechercher dans la documentation', searchClose: 'Fermer la recherche',
    searchEmpty: "Aucun résultat. Essayez d'autres mots-clés ou écrivez à",
    onThisPage: 'Sur cette page', prev: 'Précédent', next: 'Suivant',
    help: 'Aide', openApp: "Ouvrir l'app", legal: 'Mentions légales', language: 'Langue',
    contact: 'Contact',
    breadcrumbAria: "Fil d'Ariane", pagerAria: 'Pagination', navAria: 'Documentation',
    themeAria: 'Thème : système', anchorAria: 'Copier le lien vers cette section',
  },
};

/* ---- navigation manifest (sidebar structure + page order) ----------------- */
/* slug '' = /docs (source docs-src/index.md). Order here = prev/next order. */
const NAV = [
  {
    section: 'Getting started',
    items: [
      { slug: '' },
      { slug: 'connect-google-workspace' },
      { slug: 'create-your-first-template' },
      { slug: 'assign-templates' },
      { slug: 'verify-assignments' },
    ],
  },
  {
    section: 'Advanced setup',
    items: [
      { slug: 'user-management' },
      { slug: 'self-service' },
      { slug: 'custom-image-domain' },
      { slug: 'banners-and-logos' },
    ],
  },
  {
    section: 'Billing',
    items: [{ slug: 'invoices' }, { slug: 'billing-details' }],
  },
  {
    section: 'Reference',
    items: [
      { slug: 'domain-wide-delegation' },
      { slug: 'templates' },
      { slug: 'template-variables' },
      { slug: 'assignments' },
      { slug: 'apply-jobs' },
      { slug: 'logs' },
      { slug: 'images' },
      { slug: 'notifications' },
    ],
  },
  {
    section: 'Support',
    items: [
      { slug: 'support-access' },
      { slug: 'get-help' },
      { slug: 'service-status' },
      { slug: 'legal' },
    ],
  },
];

const urlFor = (slug, loc = 'en') => {
  const prefix = loc === 'en' ? '/docs' : `/${loc}/docs`;
  return slug === '' ? prefix : `${prefix}/${slug}`;
};
const srcFor = (slug, loc = 'en') =>
  join(ROOT, 'docs-src', loc === 'en' ? '.' : loc, `${slug === '' ? 'index' : slug}.md`);
const srcName = (slug, loc = 'en') =>
  `docs-src/${loc === 'en' ? '' : `${loc}/`}${slug === '' ? 'index' : slug}.md`;

/* ---- escaping ------------------------------------------------------------- */
const escHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => escHtml(s).replace(/"/g, '&quot;');

/* ---- front matter ---------------------------------------------------------- */
function parseFrontMatter(raw, name) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) throw new Error(`${name}: missing front matter block`);
  const meta = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  for (const req of ['title', 'description', 'updated']) {
    if (!meta[req]) throw new Error(`${name}: front matter missing "${req}"`);
  }
  return { meta, body: raw.slice(m[0].length) };
}

/* ---- heading slugger -------------------------------------------------------- */
function makeSlugger() {
  const seen = new Map();
  return (text) => {
    let s = text
      .toLowerCase()
      .replace(/`/g, '')
      .replace(/\{\{\s*|\s*\}\}/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    if (!s) s = 'section';
    const n = seen.get(s) || 0;
    seen.set(s, n + 1);
    return n === 0 ? s : `${s}-${n + 1}`;
  };
}


/* ---- internal URL normalization: canonical links carry no trailing slash ---- */
function normalizeInternalUrl(u) {
  const m = u.match(/^(https:\/\/signature\.cat)?(\/[^#?]*)([#?].*)?$/);
  if (!m) return u;
  let path = m[2].replace(/\/+$/, '');
  if (path === '') path = '/';
  return (m[1] || '') + path + (m[3] || '');
}
const normalizeMdLinks = (md) =>
  md.replace(/\]\(([^)\s]+)\)/g, (_m, u) => `](${normalizeInternalUrl(u)})`);

/* ---- inline markdown: code, links, bold, italic, autolink ------------------- */
function inline(text) {
  let s = escHtml(text);
  const hold = [];
  const stash = (html) => {
    hold.push(html);
    return ` ${hold.length - 1} `;
  };
  // code spans first (protect from link/bold/autolink processing)
  s = s.replace(/`([^`]+)`/g, (_m, c) => stash(`<code>${c}</code>`));
  // [text](url) - external links open a new tab, internal stay in-tab
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, url) => {
    const href = normalizeInternalUrl(url);
    const ext =
      /^https?:\/\//.test(href) &&
      !/^https:\/\/signature\.cat\/(?:(?:pl|de|fr)\/)?docs(?:\/|#|$)/.test(href);
    const attrs = ext ? ' target="_blank" rel="noopener"' : '';
    return stash(`<a href="${escAttr(href)}"${attrs}>${label}</a>`);
  });
  s = s.replace(/\*\*([^*]+(?:\*(?!\*)[^*]*)*)\*\*/g, (_m, b) => stash(`<strong>${b}</strong>`));
  s = s.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,;:!?]|$)/g, (_m, pre, i) => `${pre}${stash(`<em>${i}</em>`)}`);
  s = s.replace(/https?:\/\/[^\s<)"]*[^\s<)".,;:]/g, (url) =>
    stash(`<a href="${escAttr(url)}" target="_blank" rel="noopener">${url}</a>`),
  );
  s = s.replace(/ (\d+) /g, (_m, i) => hold[Number(i)]);
  return s;
}

/* ---- callout icons (Lucide outline, inline SVG) ------------------------------ */
const CALLOUT = {
  NOTE: { cls: 'note', label: 'Note', icon: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/>' },
  TIP: { cls: 'tip', label: 'Tip', icon: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 1 3.6 10.8c-.6.5-.6 1.2-.6 2.2h-6c0-1-.1-1.7-.6-2.2A6 6 0 0 1 12 3z"/>' },
  IMPORTANT: { cls: 'important', label: 'Important', icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5h.01"/>' },
  WARNING: { cls: 'warning', label: 'Warning', icon: '<path d="M10.3 4.1 2.9 17a2 2 0 0 0 1.7 3h14.8a2 2 0 0 0 1.7-3L13.7 4.1a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>' },
  CAUTION: { cls: 'caution', label: 'Caution', icon: '<path d="M4.9 4.9l14.2 14.2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/>' },
};
/* Localized callout titles (the [!TYPE] markers in sources stay English). */
const CALLOUT_LABELS = {
  NOTE: { en: 'Note', pl: 'Uwaga', de: 'Hinweis', fr: 'Note' },
  TIP: { en: 'Tip', pl: 'Wskazówka', de: 'Tipp', fr: 'Astuce' },
  IMPORTANT: { en: 'Important', pl: 'Ważne', de: 'Wichtig', fr: 'Important' },
  WARNING: { en: 'Warning', pl: 'Ostrzeżenie', de: 'Warnung', fr: 'Avertissement' },
  CAUTION: { en: 'Caution', pl: 'Przestroga', de: 'Achtung', fr: 'Attention' },
};
const calloutHtml = (type, bodyHtml, loc = 'en') => {
  const c = CALLOUT[type];
  const label = CALLOUT_LABELS[type][loc] || c.label;
  return (
    `<aside class="callout callout-${c.cls}" role="note">` +
    `<p class="callout-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${c.icon}</svg>${label}</p>` +
    `<div class="callout-body">\n${bodyHtml}\n</div></aside>`
  );
};

/* ---- block markdown ----------------------------------------------------------
   Supports: #..#### headings (with ids + anchor buttons), paragraphs, - and 1.
   lists (3-space nested continuation), tables, ``` code fences, --- rules,
   > blockquotes and > [!TYPE] callouts (NOTE/TIP/IMPORTANT/WARNING/CAUTION). */
function parseBlocks(lines, ctx) {
  const out = [];
  let i = 0;
  const isBlank = (l) => l == null || l.trim() === '';

  while (i < lines.length) {
    const line = lines[i];
    if (isBlank(line)) { i += 1; continue; }

    // code fence
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const buf = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) { buf.push(lines[i]); i += 1; }
      i += 1; // closing fence
      const langCls = fence[1] ? ` class="language-${fence[1]}"` : '';
      out.push(`<pre><code${langCls}>${escHtml(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // heading
    const h = line.match(/^(#{1,4}) (.*)$/);
    if (h) {
      const level = h[1].length;
      const text = h[2];
      const tag = `h${level}`;
      if (level === 1) {
        out.push(`<h1>${inline(text)}</h1>`);
      } else {
        const id = ctx.slugger(text);
        if (level <= 3) ctx.toc.push({ id, level, text: text.replace(/`/g, '') });
        ctx.headings.push({ id, text: text.replace(/`/g, '') });
        out.push(
          `<${tag} id="${id}">${inline(text)}` +
            `<a class="h-anchor" href="#${id}" aria-label="${escAttr(UI[ctx.loc || 'en'].anchorAria)}">` +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>' +
            `</a></${tag}>`,
        );
      }
      i += 1; continue;
    }

    // horizontal rule
    if (/^-{3,}$/.test(line.trim()) && !line.startsWith(' ')) {
      out.push('<hr />');
      i += 1; continue;
    }

    // blockquote / callout
    if (line.startsWith('>')) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        buf.push(lines[i].replace(/^> ?/, ''));
        i += 1;
      }
      const typeM = buf[0] && buf[0].match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/);
      if (typeM) {
        const bodyHtml = parseBlocks(buf.slice(1), ctx).join('\n');
        out.push(calloutHtml(typeM[1], bodyHtml, ctx.loc));
      } else {
        out.push(`<blockquote>\n${parseBlocks(buf, ctx).join('\n')}\n</blockquote>`);
      }
      continue;
    }

    // table
    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) { rows.push(lines[i]); i += 1; }
      out.push(renderTable(rows));
      continue;
    }

    // lists
    const oli = line.match(/^\d+\. /);
    const uli = line.match(/^- /);
    if (oli || uli) {
      const marker = oli ? /^\d+\. / : /^- /;
      const items = [];
      while (i < lines.length) {
        const m = lines[i] != null && lines[i].match(marker);
        if (!m) break;
        const first = lines[i].slice(m[0].length);
        i += 1;
        const nested = [];
        while (i < lines.length) {
          if (/^ {3}/.test(lines[i])) { nested.push(lines[i].slice(3)); i += 1; continue; }
          if (isBlank(lines[i])) {
            let j = i;
            while (j < lines.length && isBlank(lines[j])) j += 1;
            if (j < lines.length && /^ {3}/.test(lines[j])) { nested.push(''); i += 1; continue; }
          }
          break;
        }
        const body = inline(first) + (nested.length ? '\n' + parseBlocks(nested, ctx).join('\n') : '');
        items.push(`<li>${body}</li>`);
      }
      const tag = oli ? 'ol' : 'ul';
      out.push(`<${tag}>\n${items.join('\n')}\n</${tag}>`);
      continue;
    }

    // paragraph
    const para = [];
    while (
      i < lines.length && !isBlank(lines[i]) &&
      !/^(#{1,4} |- |\d+\. |>|```)/.test(lines[i]) &&
      !lines[i].startsWith('|') &&
      !(/^-{3,}$/.test(lines[i].trim()) && !lines[i].startsWith(' '))
    ) { para.push(lines[i].trim()); i += 1; }
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return out;
}

function renderTable(rows) {
  const cells = (row) => row.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
  const isSep = (row) => /^\|[\s:|-]+\|$/.test(row.replace(/\s/g, ''));
  const head = cells(rows[0]);
  const bodyRows = rows.slice(1).filter((r) => !isSep(r)).map(cells);
  const th = head.map((c) => `<th scope="col">${inline(c)}</th>`).join('');
  const trs = bodyRows
    .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
    .join('\n');
  return `<div class="tbl"><table>\n<thead><tr>${th}</tr></thead>\n<tbody>\n${trs}\n</tbody>\n</table></div>`;
}

function mdToHtml(md, loc = 'en') {
  const ctx = { slugger: makeSlugger(), toc: [], headings: [], loc };
  const lines = md.replace(/\r\n/g, '\n').split('\n').map((l) => l.replace(/\s+$/, ''));
  const html = parseBlocks(lines, ctx).join('\n');
  return { html, toc: ctx.toc, headings: ctx.headings };
}

/* Localize internal docs links in a Markdown body: translated pages must link
   to their own language cluster (/pl/docs/..., never back to English). Sources
   keep writing plain /docs/... - this rewrite happens at build time. */
function localizeDocsLinks(md, loc) {
  if (loc === 'en') return md;
  return md
    .replace(/\]\(\/docs(\/|\)|#)/g, (_m, tail) => `](/${loc}/docs${tail}`)
    .replace(
      /\]\(https:\/\/signature\.cat\/docs(\/|\)|#)/g,
      (_m, tail) => `](https://signature.cat/${loc}/docs${tail}`,
    );
}

/* ---- plain text extraction (search index + llms-full) ------------------------ */
function mdToText(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$/gm, ' ')
    .replace(/^[#>\-\d.|\s]+/gm, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*`_]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ---- page chrome --------------------------------------------------------------- */
const SEARCH_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
const HELP_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.2 9a2.8 2.8 0 0 1 5.5.9c0 1.8-2.7 2.3-2.7 3.6M12 17h.01"/></svg>';

function sidebarHtml(activeSlug, loc, pages) {
  const groups = NAV.map((g) => {
    const items = g.items
      .map((it) => {
        const { meta } = pages.get(it.slug);
        const current = it.slug === activeSlug ? ' aria-current="page"' : '';
        return `        <li><a href="${urlFor(it.slug, loc)}"${current}>${escHtml(meta.navTitle || meta.title)}</a></li>`;
      })
      .join('\n');
    return `      <div class="docs-nav-group">\n        <p class="docs-nav-label">${escHtml(SECTION_NAMES[g.section][loc])}</p>\n        <ul>\n${items}\n        </ul>\n      </div>`;
  }).join('\n');
  return groups;
}

/* Language dropdown in the docs footer (PM 2026-07-23, iteration 2: a design
   system select instead of sidebar links). Option values carry the SAME page
   in the target language; docs.js navigates on change and stores the manual
   choice in the sigcat_locale cookie so the root redirect honors it. The
   hreflang cluster in <head> + the sitemap keep the variants crawlable. */
function langSelectHtml(activeSlug, loc, ui) {
  const options = LOCALES.map((l) => {
    const selected = l === loc ? ' selected' : '';
    return `            <option value="${urlFor(activeSlug, l)}" data-lang="${l}" lang="${l}"${selected}>${LANG_NAMES[l]}</option>`;
  }).join('\n');
  return `<select class="docs-lang-select" id="docs-lang-select" aria-label="${escAttr(ui.language)}">
${options}
          </select>`;
}

function tocHtml(toc, loc) {
  if (!toc.length) return '';
  const ui = UI[loc];
  const items = toc
    .map(
      (t) =>
        `        <li class="toc-l${t.level}"><a href="#${t.id}">${escHtml(t.text)}</a></li>`,
    )
    .join('\n');
  return `    <aside class="docs-toc" aria-label="${escAttr(ui.onThisPage)}">
      <nav>
        <p class="docs-toc-title">${escHtml(ui.onThisPage)}</p>
        <ul class="docs-toc-list">
${items}
        </ul>
      </nav>
    </aside>`;
}

function pagerHtml(prev, next, loc, pages) {
  const ui = UI[loc];
  const card = (page, dir) => {
    if (!page) return '<span class="pager-spacer"></span>';
    const { meta } = pages.get(page.slug);
    const label = dir === 'prev' ? ui.prev : ui.next;
    return `<a class="pager-card pager-${dir}" href="${urlFor(page.slug, loc)}" rel="${dir}">
      <span class="pager-label">${escHtml(label)}</span>
      <span class="pager-title">${escHtml(meta.navTitle || meta.title)}</span>
    </a>`;
  };
  return `<nav class="docs-pager" aria-label="${escAttr(ui.pagerAria)}">
${card(prev, 'prev')}
${card(next, 'next')}
</nav>`;
}

function jsonLd(meta, slug, sectionName, loc) {
  const url = BASE + urlFor(slug, loc);
  const docsRoot = BASE + urlFor('', loc);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        headline: meta.title,
        description: meta.description,
        url,
        inLanguage: loc,
        datePublished: meta.published || meta.updated,
        dateModified: meta.updated,
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${DOCS_BASE}` },
        publisher: {
          '@type': 'Organization',
          '@id': `${BASE}/#organization`,
          name: 'SignatureCat',
          url: `${BASE}/`,
          logo: { '@type': 'ImageObject', url: `${BASE}/assets/img/logo-mark.png` },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: UI[loc].docsCrumb, item: docsRoot },
          { '@type': 'ListItem', position: 2, name: SECTION_NAMES[sectionName][loc], item: url },
          ...(slug === ''
            ? []
            : [{ '@type': 'ListItem', position: 3, name: meta.title, item: url }]),
        ],
      },
    ],
  };
  return JSON.stringify(graph, null, 2);
}

/* Reciprocal hreflang cluster for one slug - identical on all four variants. */
function hreflangBlock(slug) {
  return [
    ...LOCALES.map(
      (l) => `  <link rel="alternate" hreflang="${l}" href="${BASE}${urlFor(slug, l)}" />`,
    ),
    `  <link rel="alternate" hreflang="x-default" href="${BASE}${urlFor(slug, 'en')}" />`,
  ].join('\n');
}

function pageHtml({ slug, meta, articleHtml, toc, sectionName, prev, next, loc, pages }) {
  const ui = UI[loc];
  const url = BASE + urlFor(slug, loc);
  const fullTitle = `${meta.title} | ${SITE_NAME}`;
  const crumb =
    slug === ''
      ? `<span aria-current="page">${escHtml(ui.docsCrumb)}</span>`
      : `<a href="${urlFor('', loc)}">${escHtml(ui.docsCrumb)}</a><span class="crumb-sep">/</span><span class="crumb-section">${escHtml(SECTION_NAMES[sectionName][loc])}</span><span class="crumb-sep">/</span><span aria-current="page">${escHtml(meta.navTitle || meta.title)}</span>`;
  const ogLocaleBlock =
    `  <meta property="og:locale" content="${OG_LOCALE[loc]}" />\n` +
    LOCALES.filter((l) => l !== loc)
      .map((l) => `  <meta property="og:locale:alternate" content="${OG_LOCALE[l]}" />`)
      .join('\n');

  return `<!DOCTYPE html>
<html lang="${loc}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="theme-color" content="#fff7ed" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="#1c1917" media="(prefers-color-scheme: dark)" />
  <title>${escHtml(fullTitle)}</title>
  <meta name="description" content="${escAttr(meta.description)}" />
  <link rel="canonical" href="${url}" />
${hreflangBlock(slug)}
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:title" content="${escAttr(fullTitle)}" />
  <meta property="og:description" content="${escAttr(meta.description)}" />
  <meta property="og:url" content="${url}" />
${ogLocaleBlock}
  <meta property="og:image" content="${BASE}/assets/img/og-docs.png" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${BASE}/assets/img/og-docs.png" />
  <meta name="twitter:title" content="${escAttr(fullTitle)}" />
  <meta name="twitter:description" content="${escAttr(meta.description)}" />
  <link rel="icon" href="/assets/img/favicon.ico" sizes="any" />
  <link rel="icon" href="/assets/img/favicon.png" type="image/png" sizes="96x96" />
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
  <script>try{var t=localStorage.getItem('sigcat-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}</script>
  <link rel="stylesheet" href="/assets/css/style.css" />
  <link rel="stylesheet" href="/assets/css/docs.css" />
  <script type="application/ld+json">
${jsonLd(meta, slug, sectionName, loc)}
  </script>
</head>
<body class="docs-body">
  <a class="skip-link" href="#docs-content">${escHtml(ui.skip)}</a>

  <header class="site-header docs-header">
    <div class="docs-topbar">
      <div class="docs-topbar-left">
        <button class="docs-menu-btn" id="docs-menu-btn" aria-label="${escAttr(ui.menu)}" aria-expanded="false" aria-controls="docs-sidebar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
        <a href="/" class="brand" aria-label="SignatureCat home">
          <img class="logo-mark" src="/assets/img/logo-mark.png" width="30" height="30" alt="SignatureCat" />
          <span class="brand-name">SignatureCat</span>
        </a>
        <a href="${urlFor('', loc)}" class="docs-wordmark">Docs</a>
      </div>
      <button class="docs-search-btn" id="docs-search-btn" aria-label="${escAttr(ui.searchAria)}" aria-haspopup="dialog">
        ${SEARCH_ICON}
        <span class="docs-search-text">${escHtml(ui.search)}</span>
        <kbd class="docs-search-kbd" aria-hidden="true">/</kbd>
      </button>
      <div class="docs-topbar-right">
        <a class="status-pill" id="status-pill" href="https://status.signature.cat/" target="_blank" rel="noopener">
          <span class="status-pill-dot" aria-hidden="true"></span>
          <span class="status-pill-text">Status</span>
        </a>
        <button class="theme-toggle" id="theme-toggle" type="button" data-mode="system" aria-label="${escAttr(ui.themeAria)}" title="${escAttr(ui.themeAria)}">
          <svg class="i-system" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M9 21h6M12 17v4"/></svg>
          <svg class="i-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7"/></svg>
          <svg class="i-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.5 14.1A8.5 8.5 0 1 1 9.9 3.5a7 7 0 0 0 10.6 10.6z"/></svg>
        </button>
        <a class="btn-help" href="mailto:contact@signature.cat">${HELP_ICON}<span>${escHtml(ui.help)}</span></a>
        <a class="btn btn-primary docs-app-btn" href="${APP}">${escHtml(ui.openApp)}</a>
      </div>
    </div>
  </header>

  <div class="docs-shell">
    <nav class="docs-sidebar" id="docs-sidebar" aria-label="${escAttr(ui.navAria)}">
${sidebarHtml(slug, loc, pages)}
    </nav>
    <div class="docs-sidebar-backdrop" id="docs-sidebar-backdrop" hidden></div>

    <main class="docs-main" id="docs-content">
      <nav class="docs-breadcrumb" aria-label="${escAttr(ui.breadcrumbAria)}">${crumb}</nav>
      <article class="docs-article">
${articleHtml}
      </article>
${pagerHtml(prev, next, loc, pages)}
      <footer class="docs-foot">
        <span>&copy; 2026 SignatureCat</span>
        <span class="docs-foot-links">
          ${langSelectHtml(slug, loc, ui)}
          <a href="mailto:contact@signature.cat">${escHtml(ui.contact)}</a>
          <a href="https://status.signature.cat/" target="_blank" rel="noopener">Status</a>
          <a href="/legal">${escHtml(ui.legal)}</a>
        </span>
      </footer>
    </main>

${tocHtml(toc, loc)}
  </div>

  <div class="docs-search-overlay" id="docs-search" role="dialog" aria-modal="true" aria-label="${escAttr(ui.searchAria)}" hidden>
    <div class="docs-search-panel">
      <div class="docs-search-input-row">
        ${SEARCH_ICON}
        <input type="search" id="docs-search-input" placeholder="${escAttr(ui.searchPlaceholder)}" autocomplete="off" spellcheck="false" aria-label="${escAttr(ui.searchAria)}" />
        <button type="button" class="docs-search-close" id="docs-search-close" aria-label="${escAttr(ui.searchClose)}">Esc</button>
      </div>
      <ul class="docs-search-results" id="docs-search-results" role="listbox" aria-label="Search results"></ul>
      <p class="docs-search-empty" id="docs-search-empty" hidden>${escHtml(ui.searchEmpty)} <a href="mailto:contact@signature.cat">contact@signature.cat</a>.</p>
    </div>
  </div>

  <script src="/assets/js/docs.js" defer></script>
</body>
</html>
`;
}

/* ---- sitemap / search index / llms ---------------------------------------------- */
function docsSitemap(orderedBySlug) {
  const urls = orderedBySlug
    .flatMap(({ slug, byLocale }) => {
      const alts = [
        ...LOCALES.map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE}${urlFor(slug, l)}"/>`,
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}${urlFor(slug, 'en')}"/>`,
      ].join('\n');
      return LOCALES.map(
        (l) => `  <url>
    <loc>${BASE}${urlFor(slug, l)}</loc>
    <lastmod>${byLocale.get(l).meta.updated}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${slug === '' ? (l === 'en' ? '0.9' : '0.8') : l === 'en' ? '0.7' : '0.6'}</priority>
${alts}
  </url>`,
      );
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

function searchIndex(pages, loc) {
  return JSON.stringify(
    pages.map((p) => ({
      t: p.meta.title,
      u: urlFor(p.slug, loc),
      s: SECTION_NAMES[p.sectionName][loc],
      h: p.headings.map((h) => [h.id, h.text]),
      b: p.text.slice(0, 1600),
    })),
  );
}

function llmsTxt(pages, enPages) {
  const bySection = NAV.map((g) => {
    const lines = g.items
      .map((it) => {
        const p = enPages.get(it.slug);
        return `- [${p.meta.title}](${BASE}${urlFor(it.slug)}): ${p.meta.description}`;
      })
      .join('\n');
    return `## ${g.section}\n\n${lines}`;
  }).join('\n\n');
  return `# SignatureCat

> SignatureCat (https://signature.cat) centrally manages Gmail signatures across a Google Workspace: one HTML template with variables, assigned to users, groups, organizational units or the whole workspace, applied and kept up to date automatically. EU-hosted, GDPR-ready. The app runs at https://app.signature.cat.

Full documentation content in one file: ${BASE}/llms-full.txt

${bySection}

## Optional

- [Landing page](${BASE}/): product overview and pricing
- [Legal](${BASE}/legal): Terms of Service, Privacy Policy, DPA information
- [Service status](https://status.signature.cat/): live availability and incidents
`;
}

function llmsFullTxt(pages) {
  const parts = pages.map((p) => {
    const url = BASE + urlFor(p.slug);
    return `# ${p.meta.title}\nURL: ${url}\nSection: ${p.sectionName}\n\n${normalizeMdLinks(p.rawBody.trim())}`;
  });
  return `SignatureCat documentation (full content). Index: ${BASE}/llms.txt\n\n${'='.repeat(72)}\n\n${parts.join(`\n\n${'='.repeat(72)}\n\n`)}\n`;
}

/* ---- forbidden-character guard (same rule as the landing copy) --------------------
   Explicit escapes (PM 2026-07-23; previously literal characters - invisible
   in editors and grep-hostile): em/en/figure dashes + horizontal bar,
   zero-width and bidi controls, BOM, (narrow) no-break space, soft hyphen,
   and ALL typographic double quotes (guillemets, low-9, curly) - rendered
   copy uses plain keyboard '"' only. Apostrophes (') stay allowed. */
const FORBIDDEN =
  /[\u2012\u2013\u2014\u2015\u200B\u200C\u200D\u2060\uFEFF\u00A0\u202F\u00AD\u200E\u200F\u00AB\u00BB\u201C\u201D\u201E\u201F]/;
function assertClean(name, html) {
  const m = html.match(FORBIDDEN);
  if (m) {
    const cp = m[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
    throw new Error(`${name}: forbidden character U+${cp} in output`);
  }
}

/* ---- run ----------------------------------------------------------------------- */
const FLAT = NAV.flatMap((g) => g.items.map((it) => ({ ...it, sectionName: g.section })));
/* PAGES_BY_LOCALE: loc -> Map(slug -> parsed page). */
const PAGES_BY_LOCALE = new Map();

// pass 1: parse all sources for every locale (the sidebar needs every title
// before rendering; a missing translation file fails loudly here).
for (const loc of LOCALES) {
  const pages = new Map();
  for (const item of FLAT) {
    const name = srcName(item.slug, loc);
    let raw;
    try {
      raw = readFileSync(srcFor(item.slug, loc), 'utf8');
    } catch {
      throw new Error(`${name}: missing translation source (locale ${loc})`);
    }
    const { meta, body } = parseFrontMatter(raw, name);
    const localizedBody = localizeDocsLinks(body, loc);
    const { html, toc, headings } = mdToHtml(localizedBody, loc);
    pages.set(item.slug, {
      slug: item.slug,
      sectionName: item.sectionName,
      meta,
      articleHtml: html,
      toc,
      headings,
      rawBody: body,
      text: mdToText(body),
    });
  }
  PAGES_BY_LOCALE.set(loc, pages);
}

// `updated` must match the English source (translations inherit the date -
// it feeds JSON-LD dateModified and the sitemap lastmod).
for (const loc of LOCALES.filter((l) => l !== 'en')) {
  for (const item of FLAT) {
    const en = PAGES_BY_LOCALE.get('en').get(item.slug);
    const tr = PAGES_BY_LOCALE.get(loc).get(item.slug);
    if (tr.meta.updated !== en.meta.updated) {
      throw new Error(
        `${srcName(item.slug, loc)}: "updated" (${tr.meta.updated}) differs from the English source (${en.meta.updated})`,
      );
    }
  }
}

// pass 2: emit pages with prev/next from the flat order, per locale
const written = [];
for (const loc of LOCALES) {
  const pages = PAGES_BY_LOCALE.get(loc);
  FLAT.forEach((item, idx) => {
    const page = pages.get(item.slug);
    const html = pageHtml({
      ...page,
      prev: idx > 0 ? FLAT[idx - 1] : null,
      next: idx < FLAT.length - 1 ? FLAT[idx + 1] : null,
      loc,
      pages,
    });
    assertClean(urlFor(item.slug, loc), html);
    const dir = join(ROOT, ...urlFor(item.slug, loc).split('/').filter(Boolean));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
    written.push(urlFor(item.slug, loc));
  });
  // per-locale search index next to that locale's docs root
  const orderedLoc = FLAT.map((it) => pages.get(it.slug));
  const idxDir = join(ROOT, ...urlFor('', loc).split('/').filter(Boolean));
  writeFileSync(join(idxDir, 'search-index.json'), searchIndex(orderedLoc, loc));
}

const orderedBySlug = FLAT.map((it) => ({
  slug: it.slug,
  byLocale: new Map(LOCALES.map((l) => [l, PAGES_BY_LOCALE.get(l).get(it.slug)])),
}));
writeFileSync(join(ROOT, 'docs', 'sitemap.xml'), docsSitemap(orderedBySlug));

const enPages = PAGES_BY_LOCALE.get('en');
const orderedEn = FLAT.map((it) => enPages.get(it.slug));
const llms = llmsTxt(orderedEn, enPages);
const llmsFull = llmsFullTxt(orderedEn);
assertClean('llms.txt', llms);
assertClean('llms-full.txt', llmsFull);
writeFileSync(join(ROOT, 'llms.txt'), llms);
writeFileSync(join(ROOT, 'llms-full.txt'), llmsFull);

console.log(
  `Generated ${written.length} docs pages (${LOCALES.join(', ')}):\n  ` +
    written.join('\n  ') +
    '\n  /docs/sitemap.xml, per-locale search-index.json, /llms.txt, /llms-full.txt',
);

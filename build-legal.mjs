#!/usr/bin/env node
/**
 * Static generator for the legal pages of signature.cat (zero dependencies).
 *
 * Sources: /legal/src/*.md (Markdown; the Polish files are the legally binding
 * versions, the EN/DE/FR files are automatic translations carrying their own
 * supremacy banner). Outputs:
 *
 *   /legal/            hub page linking every version (indexable)
 *   /pl/terms/         Regulamin (PL, binding)            (indexable)
 *   /pl/policy/        Polityka prywatnosci (PL, binding) (indexable)
 *   /{en,de,fr}/terms/  and  /{en,de,fr}/policy/          (noindex,follow)
 *   /terms/ /privacy/  meta-refresh redirect stubs to the PL versions, so the
 *                      banner links inside the translated documents keep
 *                      working without per-file edits            (noindex)
 *
 * SEO decisions (see README "Legal pages"): only the hub and the Polish
 * originals are indexable (self-canonical, listed in sitemap.xml by build.mjs).
 * The EN/DE/FR pages are machine translations, so they are noindex,follow to
 * avoid scaled-content/duplicate signals; consequently the legal pages carry
 * NO hreflang cluster (hreflang requires all alternates to be indexable).
 *
 * Run after any change to /legal/src or this file:
 *
 *   node build-legal.mjs
 *
 * It is idempotent and asserts that no "AI-tell" characters (em/en dash,
 * NBSP and friends - see docs) leak into the served HTML.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url));
const BASE = 'https://signature.cat';

// ---- page map -----------------------------------------------------------------
const DOCS = [
  {
    src: 'regulamin.md', out: 'pl/terms', lang: 'pl', index: true,
    title: 'Regulamin - Signature.Cat',
    desc: 'Regulamin świadczenia usług Signature.Cat. Wersja polska jest wersją wiążącą prawnie.',
  },
  {
    src: 'polityka-prywatnosci.md', out: 'pl/policy', lang: 'pl', index: true,
    title: 'Polityka prywatności - Signature.Cat',
    desc: 'Polityka prywatności Signature.Cat: kategorie danych, cele i podstawy prawne, okresy przechowywania, prawa osób, cookies. Wersja polska jest wersją wiążącą prawnie.',
  },
  {
    src: 'terms.en.md', out: 'en/terms', lang: 'en', index: false,
    title: 'Terms of Service - Signature.Cat',
    desc: 'Signature.Cat Terms of Service. Automatic translation; the Polish version is legally binding.',
  },
  {
    src: 'privacy.en.md', out: 'en/policy', lang: 'en', index: false,
    title: 'Privacy Policy - Signature.Cat',
    desc: 'Signature.Cat Privacy Policy. Automatic translation; the Polish version is legally binding.',
  },
  {
    src: 'terms.de.md', out: 'de/terms', lang: 'de', index: false,
    title: 'AGB - Signature.Cat',
    desc: 'Allgemeine Geschäftsbedingungen für Signature.Cat. Automatische Übersetzung; die polnische Fassung ist rechtsverbindlich.',
  },
  {
    src: 'privacy.de.md', out: 'de/policy', lang: 'de', index: false,
    title: 'Datenschutzerklärung - Signature.Cat',
    desc: 'Datenschutzerklärung von Signature.Cat. Automatische Übersetzung; die polnische Fassung ist rechtsverbindlich.',
  },
  {
    src: 'terms.fr.md', out: 'fr/terms', lang: 'fr', index: false,
    title: "Conditions d'utilisation - Signature.Cat",
    desc: "Conditions d'utilisation de Signature.Cat. Traduction automatique; la version polonaise fait foi.",
  },
  {
    src: 'privacy.fr.md', out: 'fr/policy', lang: 'fr', index: false,
    title: 'Politique de confidentialité - Signature.Cat',
    desc: 'Politique de confidentialité de Signature.Cat. Traduction automatique; la version polonaise fait foi.',
  },
];

const REDIRECTS = [
  { out: 'terms', to: '/pl/terms/', title: 'Regulamin - Signature.Cat' },
  { out: 'privacy', to: '/pl/policy/', title: 'Polityka prywatności - Signature.Cat' },
];

// ---- escaping -------------------------------------------------------------------
const escHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => escHtml(s).replace(/"/g, '&quot;');

// ---- inline markdown: code, bold, autolinked URLs -------------------------------
function inline(text) {
  let s = escHtml(text);
  // protect code spans from bold/autolink processing
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_m, c) => {
    codes.push(`<code>${c}</code>`);
    return '\u0000' + (codes.length - 1) + '\u0000';
  });
  s = s.replace(/\*\*([^*]+(?:\*(?!\*)[^*]*)*)\*\*/g, '<strong>$1</strong>');
  s = s.replace(
    /https?:\/\/[^\s<)"]*[^\s<)".,;:]/g,
    (url) => `<a href="${escAttr(url)}">${url}</a>`,
  );
  s = s.replace(/\u0000(\d+)\u0000/g, (_m, i) => codes[Number(i)]);
  return s;
}

// ---- block markdown (subset used by the legal documents) -------------------------
// Supports: # ## ### headings, ---, paragraphs, tables, "- " lists and "1. "
// lists with 3-space-indented nested content (nested lists, tables, paragraphs).
function parseBlocks(lines) {
  const out = [];
  let i = 0;
  const isBlank = (l) => l == null || l.trim() === '';

  while (i < lines.length) {
    const line = lines[i];
    if (isBlank(line)) { i += 1; continue; }

    const h = line.match(/^(#{1,3}) (.*)$/);
    if (h) {
      const tag = `h${h[1].length}`;
      out.push(`<${tag}>${inline(h[2])}</${tag}>`);
      i += 1; continue;
    }
    if (/^-{3,}$/.test(line.trim()) && !line.startsWith(' ')) {
      out.push('<hr />');
      i += 1; continue;
    }
    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) { rows.push(lines[i]); i += 1; }
      out.push(renderTable(rows));
      continue;
    }
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
        // gather indented continuation (>= 3 spaces), spanning blank lines
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
        const body = inline(first) + (nested.length ? '\n' + parseBlocks(nested).join('\n') : '');
        items.push(`<li>${body}</li>`);
      }
      const tag = oli ? 'ol' : 'ul';
      out.push(`<${tag}>\n${items.join('\n')}\n</${tag}>`);
      continue;
    }
    // paragraph: consecutive plain lines
    const para = [];
    while (
      i < lines.length && !isBlank(lines[i]) && !/^(#{1,3} |- |\d+\. )/.test(lines[i]) &&
      !lines[i].startsWith('|') && !(/^-{3,}$/.test(lines[i].trim()) && !lines[i].startsWith(' '))
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

const mdToHtml = (md) => parseBlocks(md.replace(/\r\n/g, '\n').split('\n').map((l) => l.replace(/\s+$/, ''))).join('\n');

// ---- page chrome ------------------------------------------------------------------
function head({ lang, title, desc, canonicalPath, index, extra = '' }) {
  const robots = index
    ? `<link rel="canonical" href="${BASE}${canonicalPath}" />`
    : '<meta name="robots" content="noindex,follow" />';
  return `<!DOCTYPE html>
<!-- GENERATED by build-legal.mjs from /legal/src. Do not edit directly; edit the source then run: node build-legal.mjs -->
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="theme-color" content="#fff7ed" media="(prefers-color-scheme: light)" />
  <meta name="theme-color" content="#1c1917" media="(prefers-color-scheme: dark)" />
  <title>${escHtml(title)}</title>
  <meta name="description" content="${escAttr(desc)}" />
  ${robots}
  <link rel="icon" href="/assets/img/favicon.ico" sizes="any" />
  <link rel="icon" href="/assets/img/favicon.png" type="image/png" sizes="96x96" />
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" />
  <link rel="stylesheet" href="/assets/css/style.css" />
  <link rel="stylesheet" href="/assets/css/legal.css" />
${extra}</head>
<body class="legal-body">
<header class="legal-top">
  <a class="legal-brand" href="/"><img src="/assets/img/logo-mark.png" alt="" width="26" height="26" /> SignatureCat</a>
  <nav><a class="legal-hub-link" href="/legal/">Legal</a></nav>
</header>
`;
}

const FOOT = `
<footer class="legal-foot">
  <span>&copy; 2026 SignatureCat</span>
  <a href="/">signature.cat</a>
  <a href="mailto:contact@signature.cat">contact@signature.cat</a>
  <a href="/legal/">Legal</a>
</footer>
</body>
</html>
`;

function docPage(doc) {
  const md = readFileSync(join(ROOT, 'legal/src', doc.src), 'utf8');
  const article = mdToHtml(md);
  return (
    head({ lang: doc.lang, title: doc.title, desc: doc.desc, canonicalPath: `/${doc.out}/`, index: doc.index }) +
    `<main class="legal-doc">\n<article>\n${article}\n</article>\n</main>\n` +
    FOOT
  );
}

function redirectPage({ to, title }) {
  return `<!DOCTYPE html>
<!-- GENERATED by build-legal.mjs. Redirect stub so the canonical short URL keeps working. -->
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <meta http-equiv="refresh" content="0; url=${to}" />
  <link rel="canonical" href="${BASE}${to}" />
  <title>${escHtml(title)}</title>
</head>
<body>
  <p><a href="${to}">${escHtml(title)}</a></p>
  <script>location.replace('${to}');</script>
</body>
</html>
`;
}

function hubPage() {
  const item = (href, lang, label) => `    <li><a href="${href}" lang="${lang}">${escHtml(label)}</a></li>`;
  const body = `<main class="legal-doc">
<article>
<h1>Legal</h1>
<p>Signature.Cat legal documents. The Polish versions of the Terms of Service and the Privacy Policy are the legally binding versions; the other language versions are automatic translations provided for convenience and may contain errors.</p>
<p lang="pl">Dokumenty prawne Signature.Cat. Wersje polskie Regulaminu i Polityki prywatności są wersjami wiążącymi prawnie; pozostałe wersje językowe są tłumaczeniami automatycznymi o charakterze informacyjnym i mogą zawierać błędy.</p>
<section id="terms">
  <h2>Terms of Service / Regulamin</h2>
  <ul class="legal-list">
${item('/pl/terms/', 'pl', 'Regulamin (polski - wersja wiążąca)')}
${item('/en/terms/', 'en', 'Terms of Service (English - automatic translation)')}
${item('/de/terms/', 'de', 'Allgemeine Geschäftsbedingungen (Deutsch - automatische Übersetzung)')}
${item('/fr/terms/', 'fr', "Conditions d'utilisation (français - traduction automatique)")}
  </ul>
</section>
<section id="privacy">
  <h2>Privacy Policy / Polityka prywatności</h2>
  <ul class="legal-list">
${item('/pl/policy/', 'pl', 'Polityka prywatności (polski - wersja wiążąca)')}
${item('/en/policy/', 'en', 'Privacy Policy (English - automatic translation)')}
${item('/de/policy/', 'de', 'Datenschutzerklärung (Deutsch - automatische Übersetzung)')}
${item('/fr/policy/', 'fr', 'Politique de confidentialité (français - traduction automatique)')}
  </ul>
</section>
<section id="dpa">
  <h2>Data Processing Agreement (DPA)</h2>
  <p>The DPA (Art. 28 GDPR) is concluded in English only, at the customer's request: <a href="mailto:contact@signature.cat">contact@signature.cat</a>. Categories of sub-processors are listed in the Privacy Policy; the full named list is made available to customers under the DPA.</p>
  <p lang="pl">DPA (art. 28 RODO) zawierana jest wyłącznie w języku angielskim, na wniosek klienta: contact@signature.cat. Kategorie podprocesorów wskazane są w Polityce prywatności; pełna imienna lista udostępniana jest klientom w ramach DPA.</p>
</section>
</article>
</main>
`;
  return (
    head({
      lang: 'en',
      title: 'Legal - Signature.Cat',
      desc: 'Terms of Service and Privacy Policy of Signature.Cat in Polish (legally binding), English, German and French, plus DPA information.',
      canonicalPath: '/legal/',
      index: true,
    }) + body + FOOT
  );
}

// ---- forbidden-character guard (same rule as the landing copy) ---------------------
const FORBIDDEN = /[\u2013\u2014\u200B\u200C\u200D\u2060\uFEFF\u00A0\u202F\u00AD\u200E\u200F]/;
function assertClean(name, html) {
  const m = html.match(FORBIDDEN);
  if (m) {
    const cp = m[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
    throw new Error(`${name}: forbidden character U+${cp} in output`);
  }
}

// ---- run ---------------------------------------------------------------------------
const written = [];
for (const doc of DOCS) {
  const html = docPage(doc);
  assertClean(doc.out, html);
  if (html.includes('**')) throw new Error(`${doc.out}: unconverted markdown bold marker`);
  mkdirSync(join(ROOT, doc.out), { recursive: true });
  writeFileSync(join(ROOT, doc.out, 'index.html'), html);
  written.push(`/${doc.out}/`);
}
for (const r of REDIRECTS) {
  const html = redirectPage(r);
  assertClean(r.out, html);
  mkdirSync(join(ROOT, r.out), { recursive: true });
  writeFileSync(join(ROOT, r.out, 'index.html'), html);
  written.push(`/${r.out}/ -> ${r.to}`);
}
const hub = hubPage();
assertClean('legal', hub);
mkdirSync(join(ROOT, 'legal'), { recursive: true });
writeFileSync(join(ROOT, 'legal', 'index.html'), hub);
written.push('/legal/');

console.log('Generated legal pages:\n  ' + written.join('\n  '));

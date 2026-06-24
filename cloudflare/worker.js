/**
 * signature.cat language router - Cloudflare Worker.
 *
 * Route: signature.cat/*  (sits in front of the static origin, e.g. GitHub Pages).
 *
 * Only the bare ROOT is locale-routed; every other path (/pl/, /de/, /fr/,
 * /assets/*, /docs, ...) passes straight through to the origin untouched.
 *
 *   1. Manual choice wins: the `sigcat_locale` cookie (set by the on-page
 *      language switcher) overrides the browser language.
 *   2. Otherwise: the first supported Accept-Language subtag.
 *   3. English (or no match) STAYS on "/" - the x-default / canonical English
 *      page. Googlebot sends Accept-Language: en (or none), so it is never
 *      redirected and the English homepage indexes normally.
 *
 * Response is a 302 (depends on the visitor) with Vary + no-store so it is not
 * cached or shared across users. The per-locale pages themselves are produced
 * by build.mjs and served by the origin; this Worker only redirects the root.
 */
const SUPPORTED = ['en', 'pl', 'de', 'fr'];

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === '/' || url.pathname === '/index.html') {
      const loc = pickLocale(request);
      if (loc !== 'en') {
        return new Response(null, {
          status: 302,
          headers: {
            Location: `/${loc}/`,
            Vary: 'Cookie, Accept-Language',
            'Cache-Control': 'no-store',
          },
        });
      }
    }

    // Pass through to origin; tag localized HTML documents with Content-Language
    // (a secondary locale signal; GitHub Pages can't set it, the Worker can).
    const res = await fetch(request);
    if ((res.headers.get('content-type') || '').includes('text/html')) {
      const seg = url.pathname.split('/')[1];
      const lang = SUPPORTED.includes(seg) ? seg : 'en';
      const tagged = new Response(res.body, res);
      tagged.headers.set('Content-Language', lang);
      return tagged;
    }
    return res;
  },
};

function pickLocale(request) {
  // 1) Manual override cookie set by the language switcher.
  const cookie = request.headers.get('Cookie') || '';
  const m = cookie.match(/(?:^|;\s*)sigcat_locale=([a-zA-Z]{2})\b/);
  if (m && SUPPORTED.includes(m[1].toLowerCase())) return m[1].toLowerCase();

  // 2) First supported Accept-Language subtag.
  const al = request.headers.get('Accept-Language') || '';
  for (const part of al.split(',')) {
    const tag = part.split(';')[0].trim().toLowerCase().split('-')[0];
    if (SUPPORTED.includes(tag)) return tag;
  }

  // 3) Default: English at the root.
  return 'en';
}

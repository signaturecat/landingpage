/* Signature.Cat - app logic: i18n, pricing calculator, UI interactions */
(function () {
  'use strict';

  var SUPPORTED = ['en', 'pl', 'de', 'fr', 'ca'];
  var FALLBACK = 'en';
  // URL path segment -> locale code. Catalan is `ca` (html lang, cookie,
  // dictionary) but lives at /cat (PM 2026-11-13) - same map as build.mjs
  // (SEGMENT) and the Worker (pageLang).
  var SEGMENT_LOCALE = { pl: 'pl', de: 'de', fr: 'fr', cat: 'ca' };
  // No flag emoji in the language switcher: Windows has no flag glyphs and
  // renders the regional-indicator pair as bare letters (GB EN), which reads
  // as broken. The locale code alone is the label (PM 2026-08-08).

  // Graduated tiers (from app/docs 06_stripe_billing.md). No free tier: every
  // Workspace pays after the 7-day trial, the 1st seat included.
  // 1-50 => $0.80 ; 51-120 => $0.70 ; 121-300 => $0.60 ; 301+ => $0.55
  var TIERS = [
    { upTo: 50, rate: 0.8 },
    { upTo: 120, rate: 0.7 },
    { upTo: 300, rate: 0.6 },
    { upTo: Infinity, rate: 0.55 }
  ];

  // -------- Locale resolution: the URL PATH is the source of truth ----------
  // Each locale is its own pre-rendered page (/pl, /de, /fr, /cat; English at /).
  // The client must match the page it was served, so locale is derived from the
  // path - NOT from navigator/cookie. Browser-language routing is a server-side
  // concern (the Cloudflare Worker), so the client never swaps the root to a
  // different language (which would fight the per-URL SEO).
  function detectLocale() {
    var seg = (location.pathname.split('/')[1] || '').toLowerCase();
    return Object.prototype.hasOwnProperty.call(SEGMENT_LOCALE, seg) ? SEGMENT_LOCALE[seg] : FALLBACK;
  }

  var currentLocale = detectLocale();

  function t(key) {
    var dict = window.I18N[currentLocale] || window.I18N[FALLBACK];
    if (dict[key] != null) return dict[key];
    return window.I18N[FALLBACK][key] != null ? window.I18N[FALLBACK][key] : key;
  }
  // Expose translator so dynamic demos (e.g. conditional card status) can localize
  window.I18N_T = t;

  // -------- Apply translations to DOM --------------------------------------
  function applyTranslations() {
    document.documentElement.lang = currentLocale;

    // text content. If a key is missing (e.g. a stale cached i18n.js served
    // during a deploy), t() returns the key itself - keep the build-time baked
    // text instead of flashing the raw key (e.g. "pricing.row4") at the user.
    var nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (val !== key) el.textContent = val;
    });

    // attributes: data-i18n-attr="content:meta.desc;aria-label:nav.login"
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length !== 2) return;
        var key = parts[1].trim();
        var val = t(key);
        if (val !== key) el.setAttribute(parts[0].trim(), val);
      });
    });

    // <title> (keep the baked title if the key is unresolved). Subpages
    // declare their own key via <html data-i18n-title="...">; the home page
    // has no attribute and falls back to meta.title.
    var titleKey = document.documentElement.getAttribute('data-i18n-title') || 'meta.title';
    var title = t(titleKey);
    if (title !== titleKey) document.title = title;

    // language switcher label
    var label = document.getElementById('lang-current');
    if (label) label.textContent = currentLocale.toUpperCase();

    document.querySelectorAll('.lang-menu [data-lang], .nav-lang-opts [data-lang]').forEach(function (b) {
      b.setAttribute('aria-current', b.getAttribute('data-lang') === currentLocale ? 'true' : 'false');
    });

    renderPricing();
  }

  // Record the MANUAL choice (cookie) so the edge Worker - and return visits -
  // honor it over the browser's Accept-Language. Navigation itself is the
  // switcher's <a href> (a real, crawlable URL that works without JS), so this
  // does NOT navigate.
  function rememberLocale(loc) {
    if (SUPPORTED.indexOf(loc) === -1) return;
    try { localStorage.setItem('sigcat_locale', loc); } catch (e) {}
    document.cookie = 'sigcat_locale=' + loc + ';path=/;max-age=31536000;SameSite=Lax';
  }

  // -------- Pricing calculator (graduated) ---------------------------------
  function tierForCount(n) {
    if (n <= 50) return { label: '1-50', index: 0 };
    if (n <= 120) return { label: '51-120', index: 1 };
    if (n <= 300) return { label: '121-300', index: 2 };
    return { label: '301+', index: 3 };
  }

  function computeTotal(n) {
    // Graduated (marginal): each seat is billed at ITS tier's rate, then summed
    // across brackets - not one flat rate applied to the whole headcount. This
    // is the model the tier table + the "each seat is billed at its tier's rate"
    // note describe. Driven off TIERS so the rates live in one place.
    var total = 0;
    var prev = 0;
    for (var i = 0; i < TIERS.length; i++) {
      var seatsInTier = Math.min(n, TIERS[i].upTo) - prev;
      if (seatsInTier > 0) total += seatsInTier * TIERS[i].rate;
      if (n <= TIERS[i].upTo) break;
      prev = TIERS[i].upTo;
    }
    return total;
  }

  function fmtCurrency(v) {
    try {
      return new Intl.NumberFormat(currentLocale, {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2
      }).format(v);
    } catch (e) { return '$' + v.toFixed(2); }
  }
  function fmtRate(v) {
    try {
      return new Intl.NumberFormat(currentLocale, {
        style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2
      }).format(v);
    } catch (e) { return '$' + v.toFixed(2); }
  }
  function fmtNum(v) {
    try { return new Intl.NumberFormat(currentLocale).format(v); } catch (e) { return String(v); }
  }

  function renderPricing() {
    var input = document.getElementById('seat-count');
    if (!input) return;
    var n = parseInt(input.value, 10);
    if (isNaN(n) || n < 1) n = 1;
    if (n > 100000) n = 100000;

    var total = computeTotal(n);
    // Blended $/user across the graduated brackets (there is no single per-seat
    // rate once the headcount spans more than one tier).
    var effectiveRate = total / n;
    var tier = tierForCount(n);

    var amountEl = document.getElementById('calc-amount');
    var subEl = document.getElementById('calc-sub');
    var tierEl = document.getElementById('calc-tier');

    amountEl.textContent = fmtCurrency(total);
    var word = n === 1 ? t('pricing.user') : t('pricing.users');
    // Total is a graduated sum, so we show the headcount estimate + the blended
    // effective rate, not a single "N x rate" (which would misrepresent it).
    subEl.textContent = t('pricing.estimate') + ' ' + fmtNum(n) + ' ' + word + '.';
    tierEl.textContent = t('pricing.tierLabel') + ': ' + fmtRate(effectiveRate) + ' ' + t('pricing.perUser');

    // sync slider
    var slider = document.getElementById('seat-slider');
    if (slider && parseInt(slider.value, 10) !== Math.min(n, parseInt(slider.max, 10))) {
      slider.value = Math.min(n, parseInt(slider.max, 10));
    }

    // highlight active tier row
    document.querySelectorAll('.tier-row').forEach(function (row, i) {
      row.classList.toggle('active', i === tier.index);
    });
  }

  // -------- Wire up interactions -------------------------------------------
  function init() {
    applyTranslations();

    // Language switcher
    var langBtn = document.getElementById('lang-btn');
    var langMenu = document.getElementById('lang-menu');
    if (langBtn && langMenu) {
      langBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        langMenu.classList.toggle('open');
        langBtn.setAttribute('aria-expanded', langMenu.classList.contains('open'));
      });
      langMenu.querySelectorAll('[data-lang]').forEach(function (a) {
        a.addEventListener('click', function () {
          rememberLocale(a.getAttribute('data-lang'));
          langMenu.classList.remove('open');
          langBtn.setAttribute('aria-expanded', 'false');
          // navigation proceeds via the <a href>
        });
      });
      document.addEventListener('click', function () { langMenu.classList.remove('open'); });
    }

    // Pricing inputs
    var input = document.getElementById('seat-count');
    var slider = document.getElementById('seat-slider');
    if (input) input.addEventListener('input', renderPricing);
    if (slider) slider.addEventListener('input', function () { input.value = slider.value; renderPricing(); });
    var dec = document.getElementById('seat-dec');
    var inc = document.getElementById('seat-inc');
    if (dec) dec.addEventListener('click', function () { input.value = Math.max(1, (parseInt(input.value, 10) || 1) - 1); renderPricing(); });
    if (inc) inc.addEventListener('click', function () { input.value = (parseInt(input.value, 10) || 1) + 1; renderPricing(); });

    // Mobile nav
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        links.classList.toggle('mobile-open');
        toggle.setAttribute('aria-expanded', links.classList.contains('mobile-open'));
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { links.classList.remove('mobile-open'); });
      });
      // In-menu language links (mobile): record the choice (cookie); the <a href>
      // navigates and the generic link handler above closes the menu.
      links.querySelectorAll('.nav-lang-opts [data-lang]').forEach(function (a) {
        a.addEventListener('click', function () {
          rememberLocale(a.getAttribute('data-lang'));
        });
      });
    }

    // Reveal on scroll
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    }

    initSignatureDemo();
    initFeatVideo();
    initAdBanner();
  }

  // -------- Feature tour video (every locale) -----------------------------
  // One silent 24 s loop in the features section (markup comment in
  // index.html). Nothing downloads until the video is about a screen away
  // (preload="none" + the source attached here), the 720p file serves boxes
  // that do not need 1080p, the loop only plays while at least a third of it
  // is visible and the tab is shown, and prefers-reduced-motion never
  // autoplays - the poster stays and the button can still start it. The
  // button reflects the visitor's own choice; scrolling away only suspends
  // playback, it does not flip the button.
  function initFeatVideo() {
    var fig = document.querySelector('.feat-video');
    var video = fig && fig.querySelector('video');
    if (!video) return;
    var btn = fig.querySelector('.feat-video-toggle');
    var userPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var onscreen = false, loaded = false;
    function t(key, fallback) { var v = window.I18N_T ? window.I18N_T(key) : key; return v && v !== key ? v : fallback; }

    function load() {
      if (loaded) return;
      loaded = true;
      var px = (fig.clientWidth || 0) * (window.devicePixelRatio || 1);
      var sm = video.getAttribute('data-src-sm');
      video.preload = 'auto';
      video.src = (sm && px && px <= 1400) ? sm : video.getAttribute('data-src');
    }
    function sync() {
      if (!userPaused && onscreen && !document.hidden) {
        load();
        var pr = video.play();
        if (pr && pr.catch) pr.catch(function () {});
      } else if (!video.paused) {
        video.pause();
      }
      fig.classList.toggle('is-paused', userPaused);
      if (btn) btn.setAttribute('aria-label', userPaused ? t('feat.video.play', 'Play animation') : t('feat.video.pause', 'Pause animation'));
    }

    if (btn) {
      btn.hidden = false;
      btn.addEventListener('click', function () { userPaused = !userPaused; sync(); });
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        if (e[0].isIntersecting && !userPaused) load();
      }, { rootMargin: '600px 0px' }).observe(fig);
      new IntersectionObserver(function (e) {
        onscreen = e[0].isIntersecting;
        sync();
      }, { threshold: 0.33 }).observe(fig);
    } else {
      onscreen = true;
    }
    document.addEventListener('visibilitychange', sync);
    sync();
  }

  // -------- Rotating marketing banner (employer branding section) ---------
  // Cycles the campaign banner every 3s with a fade/scale swap.
  function initAdBanner() {
    var banner = document.getElementById('ad-banner');
    if (!banner) return;
    var slides = Array.prototype.slice.call(banner.querySelectorAll('.ad-slide'));
    if (slides.length < 2) return;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    var idx = 0, timer = null, onscreen = true, visible = true;
    function show(i) {
      slides.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
    }
    function tick() { idx = (idx + 1) % slides.length; show(idx); }
    function start() { if (timer) return; timer = setInterval(function () { if (onscreen && visible) tick(); }, 3000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    document.addEventListener('visibilitychange', function () { visible = !document.hidden; });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (e) {
        onscreen = e[0].isIntersecting;
        if (onscreen) start(); else stop();
      }, { threshold: 0.25 });
      io.observe(banner);
    } else { start(); }
  }

  // -------- Animated signature preview -------------------------------------
  // Cycles: placeholders -> fill real values one variable at a time (incl. the
  // avatar photo) -> hold the completed signature 3s -> reset all at once back
  // to placeholders -> short pause -> repeat.
  function initSignatureDemo() {
    var card = document.getElementById('sig-demo');
    if (!card) return;
    var fields = Array.prototype.slice.call(card.querySelectorAll('.var[data-var]'));
    if (!fields.length) return;
    var avatar = document.getElementById('sig-avatar');
    var PHOTO = '/assets/img/anna.jpg';

    // Real demo data tied to signature.cat
    var DATA = {
      firstname: 'Anna',
      lastname: 'Kowalska',
      jobtitle: 'Head of Marketing',
      email: 'anna@signature.cat',
      phone: '+48 797 891 447',
      department: 'Marketing',
      domain: 'signature.cat'
    };

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var STEP = 520;     // ms between consecutive variable swaps
    var SWAP = 280;     // ms for the fade/blur swap transition (matches CSS)
    var HOLD_FILLED = 3000;
    var HOLD_VARS = 1100;
    var timers = [];
    var running = false;

    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function later(fn, ms) { var id = setTimeout(fn, ms); timers.push(id); return id; }

    function placeholderText(el) { return '{{' + el.getAttribute('data-var') + '}}'; }

    // Swap one variable's content with a fade/blur transition
    function swap(el, text, asValue) {
      el.classList.add('swapping');
      later(function () {
        el.textContent = text;
        el.classList.toggle('is-value', !!asValue);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { el.classList.remove('swapping'); });
        });
      }, SWAP);
    }

    // Swap the avatar between the gradient placeholder and the real photo
    function swapAvatar(showPhoto) {
      if (!avatar) return;
      avatar.classList.add('swapping');
      later(function () {
        avatar.style.backgroundImage = showPhoto ? 'url(' + PHOTO + ')' : '';
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { avatar.classList.remove('swapping'); });
        });
      }, SWAP);
    }

    function resetAll(animated) {
      // Revert every variable AND the avatar back to the placeholder state at once
      if (animated) {
        fields.forEach(function (el) { swap(el, placeholderText(el), false); });
        swapAvatar(false);
      } else {
        fields.forEach(function (el) { el.textContent = placeholderText(el); el.classList.remove('is-value', 'swapping'); });
        if (avatar) { avatar.style.backgroundImage = ''; avatar.classList.remove('swapping'); }
      }
    }

    function cycle() {
      if (!running) return;
      var t = 0;
      // 1) Reveal the avatar photo first, then fill each field one variable at a time
      later(function () { swapAvatar(true); }, t);
      t += STEP;
      fields.forEach(function (el) {
        later(function () { swap(el, DATA[el.getAttribute('data-var')], true); }, t);
        t += STEP;
      });
      // 2) Hold the completed signature, then reset everything at once
      t += HOLD_FILLED;
      later(function () { resetAll(true); }, t);
      // 3) Short pause on placeholders, then repeat
      t += HOLD_VARS;
      later(cycle, t);
    }

    function start() {
      if (running) return;
      running = true;
      resetAll(false);
      // reduced motion: show the filled version statically, no looping
      if (reduce) {
        fields.forEach(function (el) {
          el.textContent = DATA[el.getAttribute('data-var')];
          el.classList.add('is-value');
        });
        if (avatar) avatar.style.backgroundImage = 'url(' + PHOTO + ')';
        running = false;
        return;
      }
      later(cycle, 700);
    }
    function stop() { running = false; clearTimers(); }

    // Only animate while the card is on screen and the tab is visible
    var visible = true, onscreen = true;
    function evaluate() {
      if (visible && onscreen) start();
      else stop();
    }
    document.addEventListener('visibilitychange', function () {
      visible = !document.hidden; evaluate();
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        onscreen = entries[0].isIntersecting; evaluate();
      }, { threshold: 0.25 });
      io.observe(card);
    } else {
      evaluate();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();

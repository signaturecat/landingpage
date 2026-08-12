/* Signature.Cat - app logic: i18n, pricing calculator, UI interactions */
(function () {
  'use strict';

  var SUPPORTED = ['en', 'pl', 'de', 'fr'];
  var FALLBACK = 'en';
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
  // Each locale is its own pre-rendered page (/pl, /de, /fr; English at /).
  // The client must match the page it was served, so locale is derived from the
  // path - NOT from navigator/cookie. Browser-language routing is a server-side
  // concern (the Cloudflare Worker), so the client never swaps the root to a
  // different language (which would fight the per-URL SEO).
  function detectLocale() {
    var seg = (location.pathname.split('/')[1] || '').toLowerCase();
    if (seg !== 'en' && SUPPORTED.indexOf(seg) !== -1) return seg;
    return FALLBACK;
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

    // attributes: data-i18n-attr="content:meta.desc;aria-label:nav.cta"
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
    initTileVeils();
    initFeatDeck();
    initPersonalizeCard();
    initConditionalCard();
    initAdBanner();
    initFoundersBar();
  }

  // -------- Polish feature deck: fanned-cards carousel ---------------------
  // The four /pl marketing graphics behave like a deck of playing cards laid
  // flat: the active card is fully visible, the cards before it stack as
  // slivers anchored to the left edge, the cards after it as slivers pinned
  // to the right edge. The cursor's X position over the deck picks the card
  // (equal zones: far left = first, far right = last - zones do not move
  // with the cards, so there is no feedback jitter), the wheel steps one
  // card per gesture (page scroll is only captured when a step actually
  // happens, so the ends never trap scrolling), arrow keys work when the
  // deck is focused, and touch devices swipe horizontally (vertical pans
  // stay native via touch-action: pan-y). Cards only ever move with
  // translateX + z-index - one formula, no layout thrash; the global
  // reduced-motion kill turns the glide into a snap.
  function initFeatDeck() {
    var deck = document.querySelector('.feat-deck');
    if (!deck) return;
    var cards = Array.prototype.slice.call(deck.querySelectorAll('.feat-card'));
    var n = cards.length;
    if (n < 2) return;
    var active = 0;

    function peek() {
      var v = parseFloat(getComputedStyle(deck).getPropertyValue('--deck-peek'));
      return isNaN(v) ? 56 : v;
    }
    function layout() {
      var w = deck.clientWidth;
      if (!w) return; // display:none (the deck only renders on /pl)
      var p = peek();
      cards.forEach(function (c, j) {
        var x = j <= active ? j * p : w - (n - j) * p;
        c.style.transform = 'translateX(' + x + 'px)';
        c.style.zIndex = String(j === active ? n + 1 : j + 1);
        c.classList.toggle('is-active', j === active);
      });
    }
    function setActive(i) {
      i = Math.max(0, Math.min(n - 1, i));
      if (i === active) return false;
      active = i;
      layout();
      return true;
    }

    // Cursor position picks the card (pointer devices only)
    if (!window.matchMedia('(hover: none)').matches) {
      deck.addEventListener('mousemove', function (e) {
        var r = deck.getBoundingClientRect();
        if (!r.width) return;
        setActive(Math.floor(((e.clientX - r.left) / r.width) * n));
      });
    }

    // Wheel steps through the deck; once at either end the page scrolls on
    var wheelAcc = 0, wheelLock = 0;
    deck.addEventListener('wheel', function (e) {
      var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      var now = Date.now();
      if (now < wheelLock) { e.preventDefault(); return; }
      if (wheelAcc * d < 0) wheelAcc = 0; // direction flip resets the gesture
      wheelAcc += d;
      if (Math.abs(wheelAcc) < 40) return;
      var step = wheelAcc > 0 ? 1 : -1;
      wheelAcc = 0;
      if (setActive(active + step)) {
        wheelLock = now + 350; // swallow the same gesture's inertia tail
        e.preventDefault();
      }
    }, { passive: false });

    // Touch swipe: horizontal drags step the deck (multiple cards per drag
    // when the finger keeps travelling); vertical pans scroll the page
    var startX = null;
    deck.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse') return;
      startX = e.clientX;
    });
    deck.addEventListener('pointermove', function (e) {
      if (startX == null || e.pointerType === 'mouse') return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) < 42) return;
      setActive(active + (dx < 0 ? 1 : -1)); // swipe left = next card
      startX = e.clientX;
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) {
      deck.addEventListener(t, function () { startX = null; });
    });

    // Keyboard parity: the deck carries tabindex="0"
    deck.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { if (setActive(active + 1)) e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { if (setActive(active - 1)) e.preventDefault(); }
    });

    window.addEventListener('resize', layout);
    layout();
  }

  // -------- Feature tiles 1-3: liquid-glass reveal -------------------------
  // Each .card-compact hides its content behind a frosted veil (.tile-veil,
  // CSS) showing only the title. This controller owns the single source of
  // truth for "revealed": hover/focus on pointer devices, IntersectionObserver
  // on touch devices (the tiles reveal themselves while scrolling past). Demo
  // animations subscribe via the 'tilereveal' CustomEvent so they run exactly
  // while their tile is uncovered and freeze the moment it is veiled again.
  function initTileVeils() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.card-compact'));
    if (!cards.length) return;
    var noHover = window.matchMedia('(hover: none)').matches;

    cards.forEach(function (card) {
      function set(on) {
        if (card.classList.contains('is-revealed') === on) return;
        card.classList.toggle('is-revealed', on);
        card.dispatchEvent(new CustomEvent('tilereveal', { detail: { revealed: on } }));
      }
      if (noHover && 'IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (e) {
          set(e[0].isIntersecting);
        }, { threshold: 0.55 });
        io.observe(card);
      } else {
        card.addEventListener('mouseenter', function () { set(true); });
        card.addEventListener('mouseleave', function () { set(false); });
        // Keyboard parity: the tiles carry tabindex="0"
        card.addEventListener('focusin', function () { set(true); });
        card.addEventListener('focusout', function (ev) {
          if (!card.contains(ev.relatedTarget)) set(false);
        });
      }
    });
  }

  // -------- Founders edition progress (/pricing) ---------------------------
  // The onboarded-user count is maintained MANUALLY as data-count on
  // #founders-bar in pricing.html (single source; the baked width/count/percent
  // in the HTML are the no-JS fallback). This derives the fill width, the
  // localized count and the rounded percent from that one attribute.
  function initFoundersBar() {
    var bar = document.getElementById('founders-bar');
    if (!bar) return;
    var count = parseInt(bar.getAttribute('data-count'), 10);
    var cap = parseInt(bar.getAttribute('data-cap'), 10) || 1000;
    if (isNaN(count) || count < 0) count = 0;
    var pct = Math.max(0, Math.min(100, (count / cap) * 100));
    var fill = bar.querySelector('i');
    if (fill) fill.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', String(Math.min(count, cap)));
    var countEl = document.getElementById('founders-count');
    if (countEl) countEl.textContent = fmtNum(count);
    var pctEl = document.getElementById('founders-pct');
    if (pctEl) pctEl.textContent = fmtNum(Math.round(pct)) + '%';
  }

  // -------- Card 1: {{firstname}} {{lastname}} auto-fill loop --------------
  // Runs while the tile is revealed (see initTileVeils): variables fill with
  // sample data, hold, revert to placeholders, pause, and repeat - a continuous
  // loop instead of the old one-shot hover fill. Veiling the tile freezes and
  // resets the demo so every reveal starts from the raw template.
  function initPersonalizeCard() {
    var card = document.querySelector('.card-personalize');
    if (!card) return;
    var vars = Array.prototype.slice.call(card.querySelectorAll('.pers-var'));
    if (!vars.length) return;
    var VALUES = { firstname: 'Anna', lastname: 'Kowalska' };
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var SWAP = 280;        // ms - matches the .pers-var fade/blur transition
    var STAGGER = 260;     // ms between the two variables filling
    var HOLD_FILLED = 2400;
    var HOLD_RAW = 1100;

    var timers = [];
    var running = false;
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    function placeholderText(el) { return '{{' + el.getAttribute('data-var') + '}}'; }

    // Smooth swap of one variable's content (fade out -> change text -> fade in).
    // The inner timeout is tracked so stop() can never leave a stale swap behind.
    function swapVar(el, text, asValue) {
      el.classList.add('swapping');
      later(function () {
        el.textContent = text;
        el.classList.toggle('filled', !!asValue);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { el.classList.remove('swapping'); });
        });
      }, SWAP);
    }

    function snapToRaw() {
      vars.forEach(function (el) {
        el.classList.remove('swapping', 'filled');
        el.textContent = placeholderText(el);
      });
    }

    function cycle() {
      if (!running) return;
      var t = 0;
      vars.forEach(function (el, i) {
        later(function () { swapVar(el, VALUES[el.getAttribute('data-var')], true); }, t + i * STAGGER);
      });
      t += (vars.length - 1) * STAGGER + SWAP + HOLD_FILLED;
      later(function () {
        vars.forEach(function (el) { swapVar(el, placeholderText(el), false); });
      }, t);
      t += SWAP + HOLD_RAW;
      later(cycle, t);
    }

    function start() {
      if (running) return;
      running = true;
      if (reduce) {
        // Reduced motion: show the resolved values statically, no looping
        vars.forEach(function (el) {
          el.textContent = VALUES[el.getAttribute('data-var')];
          el.classList.add('filled');
        });
        return;
      }
      snapToRaw();
      later(cycle, 320);
    }
    function stop() {
      if (!running) return;
      running = false;
      clearTimers();
      snapToRaw();
    }

    var revealed = card.classList.contains('is-revealed');
    function evaluate() { if (revealed && !document.hidden) start(); else stop(); }
    card.addEventListener('tilereveal', function (e) { revealed = e.detail.revealed; evaluate(); });
    document.addEventListener('visibilitychange', evaluate);
    evaluate();
  }

  // -------- Card 3: {{del}} conditional block animation -------------------
  // The phone value IS present in Directory, so the {{del}} / {{/del}} tags
  // are stripped on render and the phone section stays. The loop shows the raw
  // template tags, then fades only the tags away (section kept) to demonstrate
  // what {{del}} does when the value exists.
  function initConditionalCard() {
    var block = document.getElementById('cond-block');
    var status = document.getElementById('cond-status');
    if (!block || !status) return;
    var line = block.querySelector('.cond-line');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // state: 'raw' = template with visible tags, 'present' = value exists (tags stripped,
    // section stays, green dot), 'absent' = value missing (whole section removed, red dot)
    function t(key, fallback) { return window.I18N_T ? window.I18N_T(key) : fallback; }
    function setStatus(state) {
      status.classList.remove('present', 'absent');
      if (state === 'present') {
        status.classList.add('present');
        status.textContent = t('feat.c3.statusPresent', 'Phone present - section kept');
      } else if (state === 'absent') {
        status.classList.add('absent');
        status.textContent = t('feat.c3.statusAbsent', 'Phone missing - section removed');
      } else {
        status.textContent = t('feat.c3.statusRaw', 'Template with conditional tags');
      }
    }
    function showRaw() { if (line) line.classList.remove('tags-hidden', 'line-gone'); setStatus('raw'); }
    function showPresent() { if (line) { line.classList.remove('line-gone'); line.classList.add('tags-hidden'); } setStatus('present'); }
    function showAbsent() { if (line) line.classList.add('line-gone'); setStatus('absent'); }

    // Pin the demo box to its tallest (raw, all rows visible) height BEFORE
    // any phase runs: when the "absent" phase collapses the conditional line,
    // the rows above still slide together but the box - and therefore the
    // card and the whole grid row - never changes height. Measured at init,
    // so it is correct for every locale and platform font.
    if (block.offsetHeight) block.style.height = block.offsetHeight + 'px';

    if (reduce) { showPresent(); return; }

    var card = block.closest('.card-conditional');
    var timers = [];
    var running = false;
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function later(fn, ms) { var id = setTimeout(fn, ms); timers.push(id); return id; }

    // Four-phase loop:
    //  0s raw -> 2.5s value present (tags fade, green) -> 5s raw again -> 7.5s value absent (section gone, red) -> 10s repeat
    function loop() {
      if (!running) return;
      showRaw();
      later(showPresent, 2500);
      later(showRaw, 5000);
      later(showAbsent, 7500);
      later(loop, 10000);
    }
    function start() { if (running) return; running = true; loop(); }
    function stop() { if (!running) return; running = false; clearTimers(); showRaw(); }

    // Runs while the tile is revealed (see initTileVeils) and the tab visible;
    // veiling the tile freezes the demo back on the raw template.
    var revealed = card ? card.classList.contains('is-revealed') : true;
    function evaluate() { if (revealed && !document.hidden) start(); else stop(); }
    document.addEventListener('visibilitychange', evaluate);
    if (card) card.addEventListener('tilereveal', function (e) { revealed = e.detail.revealed; evaluate(); });
    evaluate();
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

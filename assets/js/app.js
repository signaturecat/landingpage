/* Signature.Cat - app logic: i18n, pricing calculator, UI interactions */
(function () {
  'use strict';

  var SUPPORTED = ['en', 'pl', 'de', 'fr'];
  var FALLBACK = 'en';
  var LANG_NAMES = { en: 'English', pl: 'Polski', de: 'Deutsch', fr: 'Français' };
  var LANG_FLAGS = { en: '🇬🇧', pl: '🇵🇱', de: '🇩🇪', fr: '🇫🇷' };

  // Graduated tiers (from app/docs 06_stripe_billing.md)
  // up_to:1 => $0 ; 2-50 => $0.80 ; 51-120 => $0.70 ; 121+ => $0.60
  var TIERS = [
    { upTo: 1, rate: 0.0 },
    { upTo: 50, rate: 0.8 },
    { upTo: 120, rate: 0.7 },
    { upTo: Infinity, rate: 0.6 }
  ];

  // -------- Locale resolution: stored -> browser -> fallback ----------------
  function detectLocale() {
    try {
      var stored = localStorage.getItem('sigcat_locale');
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    var langs = navigator.languages || [navigator.language || navigator.userLanguage || FALLBACK];
    for (var i = 0; i < langs.length; i++) {
      var primary = String(langs[i]).toLowerCase().split('-')[0];
      if (SUPPORTED.indexOf(primary) !== -1) return primary;
    }
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

    // text content
    var nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });

    // attributes: data-i18n-attr="content:meta.desc;aria-label:nav.cta"
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length === 2) el.setAttribute(parts[0].trim(), t(parts[1].trim()));
      });
    });

    // <title>
    document.title = t('meta.title');

    // language switcher label
    var label = document.getElementById('lang-current');
    if (label) label.textContent = LANG_FLAGS[currentLocale] + ' ' + currentLocale.toUpperCase();

    document.querySelectorAll('.lang-menu button, .nav-lang-opts button').forEach(function (b) {
      b.setAttribute('aria-current', b.getAttribute('data-lang') === currentLocale ? 'true' : 'false');
    });

    renderPricing();
  }

  function setLocale(loc) {
    if (SUPPORTED.indexOf(loc) === -1) return;
    currentLocale = loc;
    try { localStorage.setItem('sigcat_locale', loc); } catch (e) {}
    applyTranslations();
  }

  // -------- Pricing calculator (graduated) ---------------------------------
  function tierForCount(n) {
    if (n <= 1) return { label: 'free', index: 0 };
    if (n <= 50) return { label: '2-50', index: 1 };
    if (n <= 120) return { label: '51-120', index: 2 };
    return { label: '121+', index: 3 };
  }

  function rateForCount(n) {
    // Flat tier rate that applies to the whole headcount
    if (n <= 1) return 0;
    if (n <= 50) return 0.8;
    if (n <= 120) return 0.7;
    return 0.6;
  }
  function computeTotal(n) {
    // Single tier rate times the number of users (no graduated summing)
    return rateForCount(n) * n;
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
    var rate = rateForCount(n);
    var tier = tierForCount(n);

    var amountEl = document.getElementById('calc-amount');
    var subEl = document.getElementById('calc-sub');
    var tierEl = document.getElementById('calc-tier');

    if (n === 1) {
      amountEl.textContent = t('pricing.free');
      subEl.textContent = t('pricing.tierFree');
      tierEl.textContent = '🎉 ' + t('pricing.tierFree');
    } else {
      amountEl.textContent = fmtCurrency(total);
      var word = n === 1 ? t('pricing.user') : t('pricing.users');
      // e.g. "50 users × $0.80 / user / mo"
      subEl.textContent = fmtNum(n) + ' ' + word + ' × ' + fmtRate(rate) + ' ' + t('pricing.perUser');
      tierEl.textContent = t('pricing.estimate') + ' ' + fmtNum(n) + ' ' + word + '.';
    }

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
      langMenu.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          setLocale(b.getAttribute('data-lang'));
          langMenu.classList.remove('open');
          langBtn.setAttribute('aria-expanded', 'false');
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
      // In-menu language buttons (mobile): switch locale and close the menu
      links.querySelectorAll('.nav-lang-opts button').forEach(function (b) {
        b.addEventListener('click', function () {
          setLocale(b.getAttribute('data-lang'));
          links.classList.remove('mobile-open');
          toggle.setAttribute('aria-expanded', 'false');
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
    initPersonalizeCard();
    initConditionalCard();
    initAdBanner();
  }

  // -------- Card 2: {{firstname}} {{lastname}} auto-fill on hover ----------
  function initPersonalizeCard() {
    var card = document.querySelector('.card-personalize');
    if (!card) return;
    var vars = Array.prototype.slice.call(card.querySelectorAll('.pers-var'));
    if (!vars.length) return;
    var VALUES = { firstname: 'Anna', lastname: 'Kowalska' };
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var SWAP = 280; // ms - matches the .pers-var fade/blur transition (same as hero preview)

    // Smooth swap of one variable's content (fade out -> change text -> fade in)
    function swapVar(el, text, asValue) {
      if (reduce) { el.textContent = text; el.classList.toggle('filled', !!asValue); return; }
      el.classList.add('swapping');
      setTimeout(function () {
        el.textContent = text;
        el.classList.toggle('filled', !!asValue);
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { el.classList.remove('swapping'); });
        });
      }, SWAP);
    }

    function fill() {
      vars.forEach(function (el, i) {
        var key = el.getAttribute('data-var');
        if (reduce) { swapVar(el, VALUES[key], true); return; }
        setTimeout(function () { swapVar(el, VALUES[key], true); }, i * 260);
      });
    }
    function clear() {
      vars.forEach(function (el) {
        swapVar(el, '{{' + el.getAttribute('data-var') + '}}', false);
      });
    }
    card.addEventListener('mouseenter', fill);
    card.addEventListener('mouseleave', clear);
    card.addEventListener('focusin', fill);
    card.addEventListener('focusout', clear);

    // Touch / no-hover devices (mobile): auto-cycle fill <-> clear while on screen,
    // since there is no hover to trigger the swap.
    var noHover = window.matchMedia('(hover: none)').matches;
    if (noHover && !reduce && 'IntersectionObserver' in window) {
      var timer = null, filled = false, onscreen = false;
      function tick() { if (filled) clear(); else fill(); filled = !filled; }
      function run() { if (timer) return; tick(); timer = setInterval(tick, 2600); }
      function halt() { if (timer) { clearInterval(timer); timer = null; } }
      var io2 = new IntersectionObserver(function (e) {
        onscreen = e[0].isIntersecting;
        if (onscreen && !document.hidden) run(); else halt();
      }, { threshold: 0.4 });
      io2.observe(card);
      document.addEventListener('visibilitychange', function () {
        if (onscreen && !document.hidden) run(); else halt();
      });
    }
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

    if (reduce) { showPresent(); return; }

    var card = block.closest('.card-conditional');
    var timers = [];
    var running = false;
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function later(fn, ms) { var id = setTimeout(fn, ms); timers.push(id); return id; }

    // Four-phase loop (no hover needed - works on mobile/touch via IntersectionObserver):
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
    function stop() { running = false; clearTimers(); }

    var onscreen = true, visible = true;
    function evaluate() { if (onscreen && visible) start(); else stop(); }
    document.addEventListener('visibilitychange', function () { visible = !document.hidden; evaluate(); });
    if ('IntersectionObserver' in window && card) {
      var io = new IntersectionObserver(function (e) { onscreen = e[0].isIntersecting; evaluate(); }, { threshold: 0.3 });
      io.observe(card);
    } else { evaluate(); }
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
    var PHOTO = 'assets/img/anna.jpg';

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

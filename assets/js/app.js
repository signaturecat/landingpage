/* Signature.Cat — app logic: i18n, pricing calculator, UI interactions */
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

    document.querySelectorAll('.lang-menu button').forEach(function (b) {
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
  }

  // -------- Animated signature preview -------------------------------------
  // Cycles: placeholders -> fill real values one variable at a time ->
  // hold the completed signature 3s -> revert to placeholders one by one -> repeat.
  function initSignatureDemo() {
    var card = document.getElementById('sig-demo');
    if (!card) return;
    var fields = Array.prototype.slice.call(card.querySelectorAll('.var[data-var]'));
    if (!fields.length) return;

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

    // Swap one element's content with a fade/blur transition
    function swap(el, text, asValue) {
      el.classList.add('swapping');
      later(function () {
        el.textContent = text;
        el.classList.toggle('is-value', !!asValue);
        // next frame -> remove swapping to fade back in
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { el.classList.remove('swapping'); });
        });
      }, SWAP);
    }

    function setPlaceholders(animated) {
      fields.forEach(function (el) {
        if (animated) { swap(el, placeholderText(el), false); }
        else { el.textContent = placeholderText(el); el.classList.remove('is-value', 'swapping'); }
      });
    }

    function cycle() {
      if (!running) return;
      var t = 0;
      // 1) Fill each field, one variable at a time
      fields.forEach(function (el, i) {
        later(function () { swap(el, DATA[el.getAttribute('data-var')], true); }, t);
        t += STEP;
      });
      // 2) Hold completed signature, then revert one by one
      t += HOLD_FILLED;
      fields.forEach(function (el) {
        later(function () { swap(el, placeholderText(el), false); }, t);
        t += STEP;
      });
      // 3) Short hold on placeholders, then repeat
      t += HOLD_VARS;
      later(cycle, t);
    }

    function start() {
      if (running) return;
      running = true;
      setPlaceholders(false);
      // reduced motion: show the filled version statically, no looping
      if (reduce) {
        fields.forEach(function (el) {
          el.textContent = DATA[el.getAttribute('data-var')];
          el.classList.add('is-value');
        });
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

/* Signature.Cat - contact form (/form, all locales).
 * One form behind the "Book a call" and "Custom pricing" CTAs (?topic=call |
 * pricing). The request goes to the edge Worker (ENDPOINT below), which
 * REQUIRES a verified Turnstile token (fail closed), posts it to Slack and -
 * only with the optional marketing opt-in - adds the address to the Resend
 * audience. A successful answer may carry the Google Calendar booking page:
 * that is step 2, embedded in place of the form. Personal data never goes
 * into a URL (fetch body only; the form element itself is method=post and
 * cannot submit without JS).
 * Field rules mirror parseContact() in cloudflare/worker.js - keep in sync.
 */
(function () {
  'use strict';

  var form = document.getElementById('cf-form');
  if (!form) return; // not the contact page

  // Assembled at runtime like the banner-leads endpoint (anti-scraper hygiene
  // only - the Turnstile check and validation on the Worker are the real
  // protection).
  var ENDPOINT = '/api/' + ['contact', 'requests'].join('-');
  // Same managed Turnstile widget as /banners-generator (banner-generator.js);
  // the Worker enforces it via TURNSTILE_SECRET. Empty string = widget off.
  var TURNSTILE_SITE_KEY = '0x4AAAAAAEFN8TmQTXTz8or4';
  var TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=sigcatContactTurnstile';
  // The Worker only accepts a token issued for this action + cData on this
  // host (CONTACT_TURNSTILE in cloudflare/worker.js - keep in sync), and it
  // fails closed: no verified token, no request.
  var TURNSTILE_ACTION = 'turnstile-spin-v2'; // Spin telemetry marker, keep
  var TURNSTILE_CDATA = 'contact-form';
  var TOPICS = ['call', 'pricing'];
  var SIZES = ['1-50', '51-120', '121-300', '301-1000', '1001-5000', '5000+'];
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_RE = /^[+()0-9 .\/-]{6,32}$/;
  var TIMEOUT_MS = 20000;

  function t(key) { return window.I18N_T ? window.I18N_T(key) : key; }
  function $(id) { return document.getElementById(id); }
  // String.replace with a function: user input must never be read as a
  // replacement pattern ($&, $1...).
  function fill(template, token, value) { return template.replace(token, function () { return value; }); }

  var locale = document.documentElement.lang || 'en';
  var topicParam = new URLSearchParams(location.search).get('topic');
  var topic = TOPICS.indexOf(topicParam) !== -1 ? topicParam : 'general';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var els = {
    name: $('cf-name'),
    email: $('cf-email'),
    phone: $('cf-phone'),
    size: $('cf-size'),
    message: $('cf-message'),
    marketing: $('cf-marketing'),
    submit: $('cf-submit'),
    status: $('cf-status'),
    alert: $('cf-alert'),
    alertMsg: $('cf-alert-msg'),
    alertCode: $('cf-alert-code'),
    turnstile: $('cf-turnstile'),
    layout: $('cf-layout'),
    done: $('cf-done'),
    doneTitle: $('cf-done-title'),
    doneNext: $('cf-done-next'),
    booking: $('cf-booking'),
    bookingLink: $('cf-booking-link')
  };

  // Single-line value as the Worker will see it (whitespace runs collapsed).
  function value(el) { return el.value.replace(/\s+/g, ' ').trim(); }

  var FIELDS = [
    { el: els.name, err: 'cf.err.name', ok: function (v) { return v.length >= 2 && v.length <= 120; } },
    { el: els.email, err: 'cf.err.email', ok: function (v) { return v.length <= 254 && EMAIL_RE.test(v); } },
    { el: els.phone, err: 'cf.err.phone', ok: function (v) {
      var digits = v.replace(/\D/g, '').length;
      return PHONE_RE.test(v) && digits >= 6 && digits <= 20;
    } },
    { el: els.size, err: 'cf.err.size', ok: function (v) { return SIZES.indexOf(v) !== -1; } }
  ];

  function validate(field) {
    var ok = field.ok(value(field.el));
    var box = $(field.el.id + '-error');
    field.el.setAttribute('aria-invalid', ok ? 'false' : 'true');
    // An empty, hidden message keeps aria-describedby silent.
    box.textContent = ok ? '' : t(field.err);
    box.hidden = ok;
    return ok;
  }

  function setStatus(text) { els.status.textContent = text || ''; }

  function setBusy(on) {
    els.submit.disabled = on;
    els.submit.setAttribute('aria-busy', on ? 'true' : 'false');
    els.submit.textContent = t(on ? 'cf.form.sending' : 'cf.form.submit');
  }

  function hideAlert() {
    els.alert.hidden = true;
    els.alertMsg.textContent = '';
    els.alertCode.textContent = '';
  }

  // Readable, localized message + the technical detail one click away
  // (status + Worker error code) for a support request.
  function showAlert(status, code) {
    var key = status === 0 ? 'cf.err.network' : status === 403 ? 'cf.err.blocked' : 'cf.err.send';
    els.alert.hidden = false;
    // text after un-hiding, so the role=alert region announces it
    els.alertMsg.textContent = t(key);
    els.alertCode.textContent = (status ? 'HTTP ' + status + ' - ' : '') + code;
  }

  // ---- Cloudflare Turnstile ------------------------------------------------------
  // Loaded on the first interaction with the form (visitors who only read the
  // page never fetch the challenge script) and rendered explicitly, so the
  // widget can be reset after a failed submit: a token is single-use, and the
  // Worker has already spent it on siteverify. interaction-only = invisible
  // unless the visitor really has to click the challenge.
  var ts = { state: TURNSTILE_SITE_KEY ? 'idle' : 'off', id: null, token: '' };
  var pendingSubmit = false;

  function resumePending() {
    if (!pendingSubmit) return;
    pendingSubmit = false;
    trySubmit();
  }

  function loadTurnstile() {
    if (ts.state !== 'idle') return;
    ts.state = 'loading';
    window.sigcatContactTurnstile = function () {
      try {
        ts.id = window.turnstile.render(els.turnstile, {
          sitekey: TURNSTILE_SITE_KEY,
          action: TURNSTILE_ACTION,
          cData: TURNSTILE_CDATA,
          appearance: 'interaction-only',
          theme: 'auto',
          language: locale,
          callback: function (token) { ts.token = token; resumePending(); },
          'expired-callback': function () { ts.token = ''; },
          'error-callback': function () {
            ts.token = '';
            if (pendingSubmit) setStatus(t('cf.err.turnstile'));
          }
        });
        ts.state = 'ready';
      } catch (e) {
        ts.state = 'failed';
        resumePending();
      }
    };
    var s = document.createElement('script');
    s.src = TURNSTILE_SRC;
    s.async = true;
    s.defer = true;
    // Blocked or offline: send without a token and let the Worker refuse it
    // (403 turnstile_required - shown with the email fallback), instead of
    // leaving the visitor stuck on a spinner.
    s.onerror = function () { ts.state = 'failed'; resumePending(); };
    document.head.appendChild(s);
  }

  function resetTurnstile() {
    ts.token = '';
    if (ts.id === null || !window.turnstile) return;
    try { window.turnstile.reset(ts.id); } catch (e) { /* ignore */ }
  }

  // ---- submit ----------------------------------------------------------------------
  var busy = false;

  function trySubmit() {
    if (busy) return;
    hideAlert();
    var firstInvalid = null;
    FIELDS.forEach(function (f) {
      if (!validate(f) && !firstInvalid) firstInvalid = f.el;
    });
    if (firstInvalid) {
      pendingSubmit = false;
      setStatus('');
      firstInvalid.focus();
      return;
    }
    loadTurnstile();
    if ((ts.state === 'loading' || ts.state === 'ready') && !ts.token) {
      // the challenge is still running: submit as soon as the token lands
      pendingSubmit = true;
      setStatus(t('cf.status.verifying'));
      return;
    }
    send();
  }

  function send() {
    busy = true;
    setBusy(true);
    setStatus('');
    var payload = {
      name: value(els.name),
      email: value(els.email),
      phone: value(els.phone),
      size: els.size.value,
      message: els.message.value.trim(),
      marketing: els.marketing.checked,
      topic: topic,
      locale: locale
    };
    if (ts.token) payload['cf-turnstile-response'] = ts.token;
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, TIMEOUT_MS) : null;
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl ? ctrl.signal : undefined
    })
      .then(function (res) {
        return res.json()
          .catch(function () { return null; })
          .then(function (body) { return { status: res.status, body: body }; });
      })
      .then(function (r) {
        if (r.status === 200 && r.body && r.body.ok === true) {
          showDone(payload, typeof r.body.booking === 'string' ? r.body.booking : '');
          return;
        }
        resetTurnstile();
        showAlert(r.status, (r.body && r.body.error) || 'unexpected_response');
      }, function (err) {
        resetTurnstile();
        showAlert(0, err && err.name === 'AbortError' ? 'timeout' : 'network_error');
      })
      .then(function () {
        if (timer) clearTimeout(timer);
        busy = false;
        setBusy(false);
      });
  }

  // ---- step 2 ----------------------------------------------------------------------
  function showDone(payload, booking) {
    els.doneTitle.textContent = fill(t('cf.done.title'), '{name}', payload.name.split(' ')[0]);
    if (booking) {
      els.doneNext.textContent = t('cf.done.book');
      var frame = document.createElement('iframe');
      frame.className = 'cf-booking-frame';
      frame.src = booking;
      frame.title = t('cf.done.calendarTitle');
      els.booking.appendChild(frame);
      els.booking.hidden = false;
      els.bookingLink.href = booking;
      els.bookingLink.hidden = false;
      els.layout.classList.add('is-booking');
    } else {
      els.doneNext.textContent = fill(t('cf.done.reply'), '{email}', payload.email);
    }
    form.hidden = true;
    els.done.hidden = false;
    els.doneTitle.focus({ preventScroll: true });
    els.done.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
    // GA4 conversion, only when the visitor opted into analytics (the Worker's
    // consent script owns gtag). No personal data in the event.
    try {
      if (window.sigcatConsent && window.sigcatConsent.analytics === true && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { form_topic: topic });
      }
    } catch (e) { /* ignore */ }
  }

  // ---- wire up -------------------------------------------------------------------
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    trySubmit();
  });
  form.addEventListener('focusin', loadTurnstile);
  form.addEventListener('pointerdown', loadTurnstile);
  // Once a field has been flagged, re-check it as the visitor fixes it.
  FIELDS.forEach(function (f) {
    f.el.addEventListener(f.el.tagName === 'SELECT' ? 'change' : 'input', function () {
      if (f.el.getAttribute('aria-invalid') === 'true') validate(f);
    });
  });
  els.submit.disabled = false;
})();

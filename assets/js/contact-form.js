/* Signature.Cat - contact form (/form, all locales), two modes.
 * Lead mode (default): the "Book a call" and "Custom pricing" CTAs
 * (?topic=call | pricing) - name, email, phone, company, organization size,
 * optional description and marketing opt-in, sent to /api/contact-requests.
 * Help mode (?topic=help, the docs "Help" button): name, email, optional
 * phone, urgency and a required description, sent to /api/help-requests (its
 * own Slack channel, no Notion, no marketing). The mode attribute on <html>
 * is set by the inline script in form.html's <head>; this script only reads
 * it. The Worker REQUIRES a verified Turnstile token bound to the mode's
 * cData (fail closed), delivers the request and emails the visitor a
 * confirmation. A successful lead answer may carry the Google Calendar
 * booking page: that is step 2, embedded in place of the form. Personal data
 * never goes into a URL (fetch body only; the form element itself is
 * method=post and cannot submit without JS).
 * Field rules mirror parseContact() / parseHelp() in cloudflare/worker.js -
 * keep in sync.
 */
(function () {
  'use strict';

  var form = document.getElementById('cf-form');
  if (!form) return; // not the contact page

  // Assembled at runtime like the banner-leads endpoint (anti-scraper hygiene
  // only - the Turnstile check and validation on the Worker are the real
  // protection).
  var ENDPOINTS = {
    lead: '/api/' + ['contact', 'requests'].join('-'),
    help: '/api/' + ['help', 'requests'].join('-')
  };
  // Same managed Turnstile widget as /banners-generator (banner-generator.js);
  // the Worker enforces it via TURNSTILE_SECRET. Empty string = widget off.
  var TURNSTILE_SITE_KEY = '0x4AAAAAAEFN8TmQTXTz8or4';
  var TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=sigcatContactTurnstile';
  // The Worker only accepts a token issued for this action + the mode's cData
  // on this host (CONTACT_TURNSTILE / HELP_TURNSTILE in cloudflare/worker.js -
  // keep in sync), and it fails closed: no verified token, no request.
  var TURNSTILE_ACTION = 'turnstile-spin-v2'; // Spin telemetry marker, keep
  var TURNSTILE_CDATA = { lead: 'contact-form', help: 'help-form' };
  var TOPICS = ['call', 'pricing'];
  var SIZES = ['1-50', '51-120', '121-300', '301-1000', '1001-5000', '5000+'];
  var URGENCIES = ['low', 'normal', 'high', 'critical'];
  // Docs pages the help button lives on (the referrer becomes context in the
  // support ticket): /docs, /docs/<slug>, /pl/docs/<slug> ...
  var DOCS_PATH_RE = /^\/(?:(?:pl|de|fr)\/)?docs(?:\/[a-z0-9-]+)?$/;
  var FORM_PATH_RE = /^\/(?:(?:pl|de|fr)\/)?form\/?$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_RE = /^[+()0-9 .\/-]{6,32}$/;
  var TIMEOUT_MS = 20000;

  function t(key) { return window.I18N_T ? window.I18N_T(key) : key; }
  function $(id) { return document.getElementById(id); }
  // String.replace with a function: user input must never be read as a
  // replacement pattern ($&, $1...).
  function fill(template, token, value) { return template.replace(token, function () { return value; }); }

  var locale = document.documentElement.lang || 'en';
  var mode = document.documentElement.getAttribute('data-cf-mode') === 'help' ? 'help' : 'lead';
  var topicParam = new URLSearchParams(location.search).get('topic');
  var topic = TOPICS.indexOf(topicParam) !== -1 ? topicParam : 'general';
  // Same-origin docs page the visitor came from (path only), for help mode.
  // Kept for the tab in sessionStorage: after a language switch the referrer
  // is the form itself, not the docs page.
  var FROM_KEY = 'sc.cf.from';
  var fromPage = '';
  try {
    var ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.origin === location.origin && DOCS_PATH_RE.test(ref.pathname)) {
      fromPage = ref.pathname;
      sessionStorage.setItem(FROM_KEY, fromPage);
    } else if (ref && ref.origin === location.origin && FORM_PATH_RE.test(ref.pathname)) {
      var kept = sessionStorage.getItem(FROM_KEY) || '';
      if (DOCS_PATH_RE.test(kept)) fromPage = kept;
    }
  } catch (e) { /* ignore */ }
  // The language switch links are baked as plain /xx/form: carry the form's
  // mode or topic over so switching language does not turn a support request
  // into a sales one.
  if (topicParam === 'help' || TOPICS.indexOf(topicParam) !== -1) {
    document.querySelectorAll('.lang-menu a[data-lang], .nav-lang-opts a[data-lang]').forEach(function (a) {
      try {
        var u = new URL(a.getAttribute('href'), location.href);
        u.searchParams.set('topic', topicParam);
        a.setAttribute('href', u.pathname + u.search);
      } catch (e) { /* ignore */ }
    });
  }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var els = {
    name: $('cf-name'),
    email: $('cf-email'),
    phone: $('cf-phone'),
    company: $('cf-company'),
    size: $('cf-size'),
    urgency: $('cf-urgency'),
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
    bookingNote: $('cf-booking-note'),
    bookingLink: $('cf-booking-link')
  };

  // Values exactly as the Worker normalizes them (oneLine / multiLine in
  // cloudflare/worker.js), so a length the form accepts is one the Worker
  // accepts: invisible and bidi characters dropped, control characters and
  // whitespace runs collapsed; multi-line keeps at most one blank line.
  var INVISIBLE_RE = /[\u00AD\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u2069\uFEFF]/g;
  function value(el) { return el.value.replace(INVISIBLE_RE, '').replace(/[\u0000-\u001F\u007F\s]+/g, ' ').trim(); }
  function multiLine(el) {
    return el.value
      .replace(INVISIBLE_RE, '')
      .replace(/\r\n?/g, '\n')
      .replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function isPhone(v) {
    var digits = v.replace(/\D/g, '').length;
    return PHONE_RE.test(v) && digits >= 6 && digits <= 20;
  }
  var NAME = { el: els.name, err: 'cf.err.name', ok: function (v) { return v.length >= 2 && v.length <= 120; } };
  var EMAIL = { el: els.email, err: 'cf.err.email', ok: function (v) { return v.length <= 254 && EMAIL_RE.test(v); } };
  // Validated fields per mode, in visual order (the first invalid one gets
  // focus). Hidden fields of the other mode are never validated or sent.
  var FIELDS = mode === 'help' ? [
    NAME,
    EMAIL,
    { el: els.phone, err: 'cf.err.phone', ok: function (v) { return v === '' || isPhone(v); } },
    { el: els.urgency, err: 'cf.err.urgency', ok: function (v) { return URGENCIES.indexOf(v) !== -1; } },
    { el: els.message, err: 'cf.err.helpMessage', multiline: true, ok: function (v) { return v.length >= 10 && v.length <= 2000; } }
  ] : [
    NAME,
    EMAIL,
    { el: els.phone, err: 'cf.err.phone', ok: isPhone },
    { el: els.company, err: 'cf.err.company', ok: function (v) { return v.length >= 1 && v.length <= 120; } },
    { el: els.size, err: 'cf.err.size', ok: function (v) { return SIZES.indexOf(v) !== -1; } }
  ];

  function validate(field) {
    var ok = field.ok(field.multiline ? multiLine(field.el) : value(field.el));
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
          cData: TURNSTILE_CDATA[mode],
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
    var payload = mode === 'help' ? {
      name: value(els.name),
      email: value(els.email),
      phone: value(els.phone),
      urgency: els.urgency.value,
      message: multiLine(els.message),
      locale: locale
    } : {
      name: value(els.name),
      email: value(els.email),
      phone: value(els.phone),
      company: value(els.company),
      size: els.size.value,
      message: multiLine(els.message),
      marketing: els.marketing.checked,
      topic: topic,
      locale: locale
    };
    if (mode === 'help' && fromPage) payload.from = fromPage;
    if (ts.token) payload['cf-turnstile-response'] = ts.token;
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, TIMEOUT_MS) : null;
    fetch(ENDPOINTS[mode], {
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
    // Same rule as the confirmation email: greet by first name only when it
    // is letters (a name like "www.example.com Doe" gets the plain thanks).
    var first = payload.name.split(' ')[0];
    els.doneTitle.textContent = /^[\p{L}][\p{L}'-]{0,39}$/u.test(first)
      ? fill(t('cf.done.title'), '{name}', first)
      : t('cf.done.titleNoName');
    if (booking) {
      els.doneNext.textContent = t('cf.done.book');
      var frame = document.createElement('iframe');
      frame.className = 'cf-booking-frame';
      frame.src = booking;
      frame.title = t('cf.done.calendarTitle');
      els.booking.appendChild(frame);
      els.booking.hidden = false;
      // Google may set its own cookies inside the frame: say so right below it.
      els.bookingNote.hidden = false;
      els.bookingLink.href = booking;
      els.bookingLink.hidden = false;
      els.layout.classList.add('is-booking');
    } else {
      els.doneNext.textContent = fill(t(mode === 'help' ? 'cf.help.done.reply' : 'cf.done.reply'), '{email}', payload.email);
    }
    form.hidden = true;
    els.done.hidden = false;
    els.doneTitle.focus({ preventScroll: true });
    els.done.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
    // GA4 conversion, only when the visitor opted into analytics (the Worker's
    // consent script owns gtag). No personal data in the event.
    try {
      if (mode === 'lead' && window.sigcatConsent && window.sigcatConsent.analytics === true && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { form_topic: topic });
      }
    } catch (e) { /* ignore */ }
  }

  // ---- wire up -------------------------------------------------------------------
  // Required-ness follows the mode (the markup ships neutral): assistive tech
  // announces exactly the fields this mode asks for.
  FIELDS.forEach(function (f) {
    if (!(mode === 'help' && f.el === els.phone)) f.el.required = true;
  });
  // Controls whose label/hint has a lead and a help variant get their name and
  // description from the active variant explicitly (not every screen reader
  // skips the CSS-hidden twin inside a <label>).
  els.phone.setAttribute('aria-labelledby', 'cf-phone-label-' + mode);
  els.message.setAttribute('aria-labelledby', 'cf-message-label-' + mode);
  els.message.setAttribute('aria-describedby', 'cf-message-hint-' + mode + ' cf-message-error');
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

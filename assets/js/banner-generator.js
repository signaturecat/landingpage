/* Signature.Cat - email signature banner generator (/banners-generator).
 * Everything runs client-side: the canvas is the single source of truth for
 * both the live preview and the PNG export (one render path, no divergence).
 * The uploaded photo never leaves the browser (FileReader data: URL - allowed
 * by the Worker CSP img-src, unlike blob:). The email gate opens once per
 * device before the first download/copy; the lead is forwarded to Resend by
 * the edge Worker (LEAD_ENDPOINT below) and the sigcat_bg_lead cookie
 * suppresses the gate afterwards.
 */
(function () {
  'use strict';

  var canvas = document.getElementById('bg-canvas');
  if (!canvas) return; // not the generator page

  var LEAD_COOKIE = 'sigcat_bg_lead';
  // Assembled at runtime so the endpoint never appears verbatim in the served
  // source. Defense-in-depth against naive scrapers ONLY - the URL is public
  // by nature (visible in the network tab); what actually stops bots is the
  // Turnstile check + validation on the Worker side.
  var LEAD_ENDPOINT = '/api/' + ['banner', 'leads'].join('-');
  // Cloudflare Turnstile (managed widget). Lazy-loaded the first time the
  // gate opens, so regular visitors never fetch the challenge script. An
  // empty sitekey disables the widget client-side (the gate still works);
  // fill it in once the widget exists in the Cloudflare dashboard - and set
  // TURNSTILE_SECRET on the Worker, which is what enforces verification.
  var TURNSTILE_SITE_KEY = '';
  var TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  var turnstileInjected = false;
  var PAD = 20; // inner horizontal text padding (px, at banner scale)
  var PAD_Y = 14; // vertical text padding for top/bottom positions
  // PNG exports render at 2x the banner size: a 1x bitmap looks soft next to
  // the devicePixelRatio-scaled preview (and on every retina screen). PNG is
  // lossless, so resolution is the only sharpness lever.
  var EXPORT_SCALE = 2;

  function t(key) { return window.I18N_T ? window.I18N_T(key) : key; }
  function $(id) { return document.getElementById(id); }

  var els = {
    stage: $('bg-stage'),
    sizeCaption: $('bg-size-caption'),
    width: $('bg-width'),
    height: $('bg-height'),
    colorBg: $('bg-color-bg'),
    colorBar: $('bg-color-bar'),
    barEnabled: $('bg-bar-enabled'),
    barWidth: $('bg-bar-width'),
    gradType: $('bg-grad-type'),
    gradAngle: $('bg-grad-angle'),
    gradAngleVal: $('bg-grad-angle-val'),
    gradFrom: $('bg-grad-from'),
    gradTo: $('bg-grad-to'),
    imageFile: $('bg-image-file'),
    imageZoom: $('bg-image-zoom'),
    title: $('bg-title'),
    desc: $('bg-desc'),
    font: $('bg-font'),
    textPos: $('bg-text-pos'),
    titleColor: $('bg-title-color'),
    titleSize: $('bg-title-size'),
    descColor: $('bg-desc-color'),
    descSize: $('bg-desc-size'),
    radius: $('bg-radius'),
    borderStyle: $('bg-border-style'),
    borderWidth: $('bg-border-width'),
    borderColor: $('bg-border-color'),
    download: $('bg-download'),
    copyPng: $('bg-copy-png'),
    copyHtml: $('bg-copy-html'),
    htmlNote: $('bg-html-note'),
    status: $('bg-status'),
    dragHint: $('bg-drag-hint'),
    panels: {
      color: $('bg-panel-color'),
      gradient: $('bg-panel-gradient'),
      image: $('bg-panel-image')
    },
    gate: $('bg-gate'),
    gateForm: $('bg-gate-form'),
    gateEmail: $('bg-gate-email'),
    gateConsent: $('bg-gate-consent'),
    gateError: $('bg-gate-error'),
    gateTurnstile: $('bg-gate-turnstile')
  };

  // Uploaded photo state: the Image element plus the visible crop - focus is
  // fractional (0..1) so it survives banner size changes, zoom is 1..3.
  var photo = { img: null, fx: 0.5, fy: 0.5, zoom: 1 };

  function num(input, fallback) {
    var v = parseInt(input.value, 10);
    if (isNaN(v)) return fallback;
    var min = parseInt(input.min, 10);
    var max = parseInt(input.max, 10);
    if (!isNaN(min) && v < min) v = min;
    if (!isNaN(max) && v > max) v = max;
    return v;
  }

  function mode() {
    var checked = document.querySelector('input[name="bg-mode"]:checked');
    return checked ? checked.value : 'color';
  }

  function readState() {
    return {
      w: num(els.width, 450),
      h: num(els.height, 100),
      mode: mode(),
      bg: els.colorBg.value,
      barEnabled: els.barEnabled.checked,
      bar: els.colorBar.value,
      barWidth: num(els.barWidth, 56),
      gradType: els.gradType.value,
      gradAngle: num(els.gradAngle, 120),
      gradFrom: els.gradFrom.value,
      gradTo: els.gradTo.value,
      title: els.title.value,
      desc: els.desc.value,
      font: els.font.value,
      textPos: els.textPos.value,
      titleColor: els.titleColor.value,
      titleSize: num(els.titleSize, 26),
      descColor: els.descColor.value,
      descSize: num(els.descSize, 14),
      radius: num(els.radius, 16),
      borderStyle: els.borderStyle.value,
      borderWidth: num(els.borderWidth, 2),
      borderColor: els.borderColor.value
    };
  }

  // ---- canvas rendering -----------------------------------------------------
  function roundRectPath(ctx, x, y, w, h, r) {
    r = Math.max(0, Math.min(r, w / 2, h / 2));
    if (ctx.roundRect) { ctx.roundRect(x, y, w, h, r); return; }
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // CSS linear-gradient(angle) geometry: 0deg points up, 90deg right; the
  // gradient line length is |W*sin| + |H*cos| (the CSS spec formula), so the
  // color stops touch the corners exactly like the copied HTML will.
  function linearStops(ctx, s) {
    var rad = (s.gradAngle * Math.PI) / 180;
    var dx = Math.sin(rad), dy = -Math.cos(rad);
    var len = Math.abs(s.w * dx) + Math.abs(s.h * dy);
    var cx = s.w / 2, cy = s.h / 2;
    return ctx.createLinearGradient(cx - (dx * len) / 2, cy - (dy * len) / 2, cx + (dx * len) / 2, cy + (dy * len) / 2);
  }

  function drawBackground(ctx, s) {
    if (s.mode === 'gradient') {
      var g;
      if (s.gradType === 'radial') {
        g = ctx.createRadialGradient(s.w / 2, s.h / 2, 0, s.w / 2, s.h / 2, Math.hypot(s.w, s.h) / 2);
      } else {
        g = linearStops(ctx, s);
      }
      g.addColorStop(0, s.gradFrom);
      g.addColorStop(1, s.gradTo);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s.w, s.h);
      return;
    }
    if (s.mode === 'image') {
      if (!photo.img) {
        ctx.fillStyle = '#eee7db';
        ctx.fillRect(0, 0, s.w, s.h);
        ctx.fillStyle = '#8a8378';
        ctx.font = '600 13px ui-sans-serif, system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(t('bg.msg.chooseImage'), s.w / 2, s.h / 2);
        ctx.textAlign = 'left';
        return;
      }
      var iw = photo.img.naturalWidth, ih = photo.img.naturalHeight;
      var scale = Math.max(s.w / iw, s.h / ih) * photo.zoom;
      var sw = iw * scale, sh = ih * scale;
      var sx = (sw - s.w) * photo.fx, sy = (sh - s.h) * photo.fy;
      ctx.drawImage(photo.img, -sx, -sy, sw, sh);
      return;
    }
    // color mode
    ctx.fillStyle = s.bg;
    ctx.fillRect(0, 0, s.w, s.h);
    if (s.barEnabled && s.barWidth > 0) {
      ctx.fillStyle = s.bar;
      ctx.fillRect(0, 0, Math.min(s.barWidth, s.w), s.h);
    }
  }

  function drawText(ctx, s) {
    var x = PAD + (s.mode === 'color' && s.barEnabled ? Math.min(s.barWidth, s.w) : 0);
    var titleH = s.title ? Math.round(s.titleSize * 1.15) : 0;
    var descH = s.desc ? Math.round(s.descSize * 1.3) : 0;
    var gap = s.title && s.desc ? 6 : 0;
    var block = titleH + gap + descH;
    var top;
    if (s.textPos === 'top') top = PAD_Y;
    else if (s.textPos === 'bottom') top = s.h - block - PAD_Y;
    else top = Math.round((s.h - block) / 2);
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';
    if (s.title) {
      ctx.fillStyle = s.titleColor;
      ctx.font = '700 ' + s.titleSize + 'px ' + s.font;
      ctx.fillText(s.title, x, top);
    }
    if (s.desc) {
      ctx.fillStyle = s.descColor;
      ctx.font = '400 ' + s.descSize + 'px ' + s.font;
      ctx.fillText(s.desc, x, top + titleH + gap);
    }
  }

  function drawBorder(ctx, s) {
    if (s.borderStyle === 'none' || s.borderWidth <= 0) return;
    var bw = s.borderWidth;
    var inset = bw / 2;
    ctx.save();
    ctx.beginPath();
    roundRectPath(ctx, inset, inset, s.w - bw, s.h - bw, Math.max(0, s.radius - inset));
    ctx.strokeStyle = s.borderColor;
    ctx.lineWidth = bw;
    if (s.borderStyle === 'dashed') {
      ctx.setLineDash([bw * 3, bw * 2]);
    } else if (s.borderStyle === 'dotted') {
      ctx.lineCap = 'round';
      ctx.setLineDash([0.001, bw * 2.2]);
    }
    ctx.stroke();
    ctx.restore();
  }

  function drawBanner(ctx, s) {
    ctx.clearRect(0, 0, s.w, s.h);
    ctx.save();
    ctx.beginPath();
    roundRectPath(ctx, 0, 0, s.w, s.h, s.radius);
    ctx.clip();
    drawBackground(ctx, s);
    drawText(ctx, s);
    ctx.restore();
    drawBorder(ctx, s);
  }

  function render() {
    var s = readState();
    var dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = s.w * dpr;
    canvas.height = s.h * dpr;
    canvas.style.width = s.w + 'px';
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    drawBanner(ctx, s);
    els.sizeCaption.textContent = s.w + ' x ' + s.h + ' px';
    els.gradAngleVal.textContent = String(s.gradAngle);
    syncModeUi(s);
  }

  function syncModeUi(s) {
    Object.keys(els.panels).forEach(function (k) { els.panels[k].hidden = k !== s.mode; });
    var htmlAvailable = s.mode !== 'image';
    els.copyHtml.disabled = !htmlAvailable;
    els.copyHtml.style.opacity = htmlAvailable ? '' : '.45';
    els.htmlNote.hidden = !htmlAvailable;
    var draggable = s.mode === 'image' && !!photo.img;
    canvas.classList.toggle('bg-draggable', draggable);
    els.dragHint.hidden = !draggable;
    els.gradAngle.disabled = s.gradType === 'radial';
  }

  // ---- HTML export (color + gradient modes only) ----------------------------
  function escHtml(v) {
    return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function buildHtml(s) {
    var border = s.borderStyle !== 'none' ? 'border:' + s.borderWidth + 'px ' + s.borderStyle + ' ' + s.borderColor + ';' : '';
    var innerRadius = Math.max(0, s.radius - (s.borderStyle !== 'none' ? s.borderWidth : 0));
    var background;
    if (s.mode === 'gradient') {
      var stops = s.gradFrom + ', ' + s.gradTo;
      background = 'background-color:' + s.gradFrom + ';background-image:' +
        (s.gradType === 'radial' ? 'radial-gradient(circle, ' + stops + ')' : 'linear-gradient(' + s.gradAngle + 'deg, ' + stops + ')') + ';';
    } else {
      background = 'background-color:' + s.bg + ';';
    }
    var vAlign = s.textPos === 'top' ? 'top' : s.textPos === 'bottom' ? 'bottom' : 'middle';
    var vPad = vAlign === 'middle' ? '0' : PAD_Y + 'px';
    var titleHtml = s.title
      ? '<div style="font-size:' + s.titleSize + 'px;line-height:1.15;font-weight:bold;color:' + s.titleColor + ';">' + escHtml(s.title) + '</div>'
      : '';
    var descHtml = s.desc
      ? '<div style="font-size:' + s.descSize + 'px;line-height:1.3;color:' + s.descColor + ';' + (s.title ? 'padding-top:6px;' : '') + '">' + escHtml(s.desc) + '</div>'
      : '';
    var cells;
    var cellCommon = 'padding:' + vPad + ' ' + PAD + 'px;font-family:' + s.font.replace(/"/g, "'") + ';vertical-align:' + vAlign + ';';
    if (s.mode === 'color' && s.barEnabled && s.barWidth > 0) {
      cells =
        '<td width="' + s.barWidth + '" style="width:' + s.barWidth + 'px;background-color:' + s.bar + ';border-radius:' + innerRadius + 'px 0 0 ' + innerRadius + 'px;">&nbsp;</td>' +
        '<td style="' + cellCommon + 'border-radius:0 ' + innerRadius + 'px ' + innerRadius + 'px 0;">' + titleHtml + descHtml + '</td>';
    } else {
      cells =
        '<td style="' + cellCommon + 'border-radius:' + innerRadius + 'px;">' + titleHtml + descHtml + '</td>';
    }
    return '<table cellpadding="0" cellspacing="0" border="0" role="presentation" width="' + s.w + '" height="' + s.h + '" ' +
      'style="border-collapse:separate;width:' + s.w + 'px;height:' + s.h + 'px;' + background + border + 'border-radius:' + s.radius + 'px;">' +
      '<tr>' + cells + '</tr></table>';
  }

  // ---- status line -----------------------------------------------------------
  var statusTimer = null;
  function setStatus(key) {
    els.status.textContent = t(key);
    if (statusTimer) clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { els.status.textContent = ''; }, 4000);
  }

  // ---- export actions ---------------------------------------------------------
  function exportCanvas(s) {
    var out = document.createElement('canvas');
    out.width = s.w * EXPORT_SCALE;
    out.height = s.h * EXPORT_SCALE;
    var ctx = out.getContext('2d');
    ctx.scale(EXPORT_SCALE, EXPORT_SCALE);
    drawBanner(ctx, s);
    return out;
  }

  function doDownload() {
    var s = readState();
    exportCanvas(s).toBlob(function (blob) {
      if (!blob) return;
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'signature-banner-' + s.w + 'x' + s.h + '@2x.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
    }, 'image/png');
  }

  function doCopyPng() {
    if (!(navigator.clipboard && window.ClipboardItem)) { setStatus('bg.msg.copyFailed'); return; }
    var s = readState();
    // Safari requires the ClipboardItem to be created synchronously inside the
    // user gesture, with the blob supplied as a promise.
    var blobPromise = new Promise(function (resolve, reject) {
      exportCanvas(s).toBlob(function (blob) {
        if (blob) resolve(blob); else reject(new Error('toBlob failed'));
      }, 'image/png');
    });
    navigator.clipboard.write([new ClipboardItem({ 'image/png': blobPromise })]).then(
      function () { setStatus('bg.msg.copiedPng'); },
      function () { setStatus('bg.msg.copyFailed'); }
    );
  }

  function doCopyHtml() {
    var s = readState();
    if (s.mode === 'image') return;
    var html = buildHtml(s);
    // text/html so pasting into a signature editor inserts the rendered
    // banner; text/plain so code editors receive the raw markup.
    var done = function () { setStatus('bg.msg.copiedHtml'); };
    var fail = function () { setStatus('bg.msg.copyFailed'); };
    if (navigator.clipboard && window.ClipboardItem) {
      navigator.clipboard.write([new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([html], { type: 'text/plain' })
      })]).then(done, function () {
        if (navigator.clipboard.writeText) navigator.clipboard.writeText(html).then(done, fail); else fail();
      });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(html).then(done, fail);
    } else {
      fail();
    }
  }

  // ---- email gate --------------------------------------------------------------
  function hasLeadCookie() {
    return document.cookie.split(';').some(function (c) { return c.trim().indexOf(LEAD_COOKIE + '=') === 0; });
  }
  function setLeadCookie() {
    document.cookie = LEAD_COOKIE + '=1;path=/;max-age=31536000;SameSite=Lax';
  }

  var pendingAction = null;
  var lastFocused = null;

  // Mount the managed Turnstile widget on first open (implicit render: the
  // api.js script scans for .cf-turnstile once it loads). data-action is the
  // Spin telemetry marker - keep it.
  function mountTurnstile() {
    if (turnstileInjected || !TURNSTILE_SITE_KEY || !els.gateTurnstile) return;
    turnstileInjected = true;
    var widget = document.createElement('div');
    widget.className = 'cf-turnstile';
    widget.setAttribute('data-sitekey', TURNSTILE_SITE_KEY);
    widget.setAttribute('data-action', 'turnstile-spin-v2');
    widget.setAttribute('data-theme', 'auto');
    els.gateTurnstile.appendChild(widget);
    var s = document.createElement('script');
    s.src = TURNSTILE_SRC;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }

  function turnstileToken() {
    if (!TURNSTILE_SITE_KEY) return '';
    try {
      return window.turnstile ? window.turnstile.getResponse() || '' : '';
    } catch (e) { return ''; }
  }

  function openGate(action) {
    pendingAction = action;
    els.gateError.hidden = true;
    mountTurnstile();
    lastFocused = document.activeElement;
    els.gate.hidden = false;
    els.gateEmail.focus();
  }
  function closeGate() {
    els.gate.hidden = true;
    pendingAction = null;
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  // Every export goes through the gate exactly once per device.
  function gated(action) {
    return function () {
      if (hasLeadCookie()) { action(); return; }
      openGate(action);
    };
  }

  function submitGate(e) {
    e.preventDefault();
    var email = els.gateEmail.value.trim();
    var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
    if (!valid || !els.gateConsent.checked) {
      els.gateError.textContent = t('bg.gate.invalid');
      els.gateError.hidden = false;
      (valid ? els.gateConsent : els.gateEmail).focus();
      return;
    }
    // Turnstile: if the widget is up and the challenge is not solved yet,
    // hold the submit (sending a token-less request would be rejected by the
    // Worker anyway). If the script never loaded (blocked/offline), fall
    // through - the export must not depend on a third-party script.
    var tsToken = turnstileToken();
    if (TURNSTILE_SITE_KEY && window.turnstile && !tsToken) {
      els.gateError.textContent = t('bg.gate.turnstile');
      els.gateError.hidden = false;
      return;
    }
    // Best-effort lead capture: the Worker forwards to Resend; a transport or
    // configuration error must never block the tool (same rule as in-app
    // notifications - the side channel never fails the primary action).
    try {
      var lead = {
        email: email,
        consent: true,
        locale: (location.pathname.split('/')[1] || 'en'),
        source: 'banners-generator'
      };
      if (tsToken) lead['cf-turnstile-response'] = tsToken;
      fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        keepalive: true
      }).catch(function () {});
    } catch (err) { /* ignore */ }
    setLeadCookie();
    var action = pendingAction;
    closeGate();
    if (action) action();
  }

  // ---- photo upload + crop -------------------------------------------------------
  function loadPhoto(file) {
    if (!file || file.type.indexOf('image/') !== 0) { setStatus('bg.msg.imageError'); return; }
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        photo.img = img;
        photo.fx = 0.5;
        photo.fy = 0.5;
        photo.zoom = 1;
        els.imageZoom.value = '100';
        render();
      };
      img.onerror = function () { setStatus('bg.msg.imageError'); };
      img.src = String(reader.result); // data: URL - allowed by the Worker CSP
    };
    reader.onerror = function () { setStatus('bg.msg.imageError'); };
    reader.readAsDataURL(file);
  }

  function initDrag() {
    var dragging = false, startX = 0, startY = 0, startFx = 0.5, startFy = 0.5;
    canvas.addEventListener('pointerdown', function (e) {
      if (mode() !== 'image' || !photo.img) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startFx = photo.fx;
      startFy = photo.fy;
      canvas.classList.add('bg-dragging');
      canvas.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var s = readState();
      // convert on-screen px to banner px (the canvas may be CSS-downscaled)
      var view = canvas.getBoundingClientRect();
      var k = s.w / view.width;
      var iw = photo.img.naturalWidth, ih = photo.img.naturalHeight;
      var scale = Math.max(s.w / iw, s.h / ih) * photo.zoom;
      var overX = iw * scale - s.w, overY = ih * scale - s.h;
      if (overX > 0) photo.fx = Math.min(1, Math.max(0, startFx - ((e.clientX - startX) * k) / overX));
      if (overY > 0) photo.fy = Math.min(1, Math.max(0, startFy - ((e.clientY - startY) * k) / overY));
      render();
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      canvas.classList.remove('bg-dragging');
      if (e.pointerId != null && canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    }
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
  }

  // ---- wiring -------------------------------------------------------------------
  function init() {
    var inputs = [
      els.width, els.height, els.colorBg, els.colorBar, els.barEnabled, els.barWidth,
      els.gradType, els.gradAngle, els.gradFrom, els.gradTo, els.title, els.desc,
      els.font, els.textPos, els.titleColor, els.titleSize, els.descColor, els.descSize,
      els.radius, els.borderStyle, els.borderWidth, els.borderColor
    ];
    inputs.forEach(function (el) {
      el.addEventListener('input', render);
      el.addEventListener('change', render);
    });
    document.querySelectorAll('input[name="bg-mode"]').forEach(function (r) {
      r.addEventListener('change', render);
    });
    els.imageZoom.addEventListener('input', function () {
      photo.zoom = num(els.imageZoom, 100) / 100;
      render();
    });
    els.imageFile.addEventListener('change', function () {
      loadPhoto(els.imageFile.files && els.imageFile.files[0]);
    });

    // No context menu on the preview: "Save image as..." would route around
    // the email gate (best-effort only - it cannot stop a determined user,
    // but it closes the one-click path in mainstream browsers).
    canvas.addEventListener('contextmenu', function (e) { e.preventDefault(); });

    els.download.addEventListener('click', gated(doDownload));
    els.copyPng.addEventListener('click', gated(doCopyPng));
    els.copyHtml.addEventListener('click', gated(doCopyHtml));

    els.gateForm.addEventListener('submit', submitGate);
    els.gate.querySelectorAll('[data-gate-close]').forEach(function (el) {
      el.addEventListener('click', closeGate);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !els.gate.hidden) closeGate();
    });

    initDrag();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();

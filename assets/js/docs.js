/* Signature.Cat docs - client behavior (no dependencies).
   1. Status pill: live aggregate state from status.signature.cat/index.json.
   2. Mobile sidebar toggle.
   3. Heading anchor buttons: copy the deep link, show a "Link copied" tip.
   4. "On this page" scroll-spy with a sliding indicator.
   5. Search: "/" opens an overlay over the pre-built /docs/search-index.json. */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. status pill --------------------------------------------------------
     Own component instead of the vendor badge iframe (the iframe painted an
     opaque white canvas on dark pages). Without JS, or when the fetch fails,
     the pill stays a plain "Status" link with a neutral dot. */
  var pill = document.getElementById('status-pill');
  if (pill && window.fetch) {
    var STATES = {
      operational: ['ok', 'All services online'],
      degraded: ['warn', 'Degraded performance'],
      downtime: ['down', 'Service disruption'],
      maintenance: ['maint', 'Maintenance in progress'],
    };
    // /en/index.json directly - the bare /index.json answers with a 302 that
    // carries no CORS header, which fails the fetch (same trap as /badge).
    // If the status service is unreachable (offline, blocked, timeout) or
    // reports something we don't recognize, hide the pill entirely rather
    // than show a stale/neutral state. Without JS the static "Status" link
    // stays - it degrades to a plain link to the status page.
    var hidePill = function () { pill.hidden = true; };
    var controller = 'AbortController' in window ? new AbortController() : null;
    var timer = controller && setTimeout(function () { controller.abort(); }, 6000);
    fetch('https://status.signature.cat/en/index.json', controller ? { signal: controller.signal } : {})
      .then(function (r) {
        if (!r.ok) throw new Error('status http ' + r.status);
        return r.json();
      })
      .then(function (data) {
        var s = data && data.data && data.data.attributes && data.data.attributes.aggregate_state;
        var m = STATES[s];
        if (!m) { hidePill(); return; }
        pill.setAttribute('data-state', m[0]);
        pill.querySelector('.status-pill-text').textContent = m[1];
      })
      .catch(hidePill)
      .finally(function () { if (timer) clearTimeout(timer); });
  }

  /* ---- 1b. theme toggle: system -> light -> dark ------------------------------
     "system" = no data-theme attribute (prefers-color-scheme rules apply).
     A head inline script applies the stored choice before first paint. */
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    var THEME_KEY = 'sigcat-theme';
    var themeMode = document.documentElement.getAttribute('data-theme') || 'system';
    var applyTheme = function (mode) {
      themeMode = mode;
      try {
        if (mode === 'system') {
          document.documentElement.removeAttribute('data-theme');
          localStorage.removeItem(THEME_KEY);
        } else {
          document.documentElement.setAttribute('data-theme', mode);
          localStorage.setItem(THEME_KEY, mode);
        }
      } catch (e) { /* storage blocked - theme still applies for this page */ }
      themeBtn.setAttribute('data-mode', mode);
      var label = 'Theme: ' + mode;
      themeBtn.setAttribute('aria-label', label);
      themeBtn.title = label;
    };
    applyTheme(themeMode);
    themeBtn.addEventListener('click', function () {
      applyTheme(themeMode === 'system' ? 'light' : themeMode === 'light' ? 'dark' : 'system');
    });
  }

  /* ---- 2. mobile sidebar ---------------------------------------------------- */
  var sidebar = document.getElementById('docs-sidebar');
  var menuBtn = document.getElementById('docs-menu-btn');
  var backdrop = document.getElementById('docs-sidebar-backdrop');
  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    if (backdrop) { backdrop.classList.remove('show'); backdrop.hidden = true; }
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', function () {
      var open = sidebar.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      if (backdrop) { backdrop.hidden = !open; backdrop.classList.toggle('show', open); }
    });
    if (backdrop) backdrop.addEventListener('click', closeSidebar);
    // keep the active item in view (desktop only - on mobile the panel is
    // off-canvas and scrollIntoView would scroll the hidden container)
    var current = sidebar.querySelector('[aria-current="page"]');
    if (current && window.matchMedia('(min-width: 861px)').matches) {
      try { current.scrollIntoView({ block: 'center', inline: 'nearest' }); } catch (e) { /* older engines */ }
    }
  }

  /* ---- 3. heading anchor copy buttons ---------------------------------------- */
  document.querySelectorAll('.h-anchor').forEach(function (a) {
    a.addEventListener('click', function () {
      // let default navigation set the #hash; copy the absolute deep link too
      var url = location.origin + location.pathname + a.getAttribute('href');
      var done = function () {
        a.classList.add('copied');
        var tip = document.createElement('span');
        tip.className = 'anchor-tip';
        tip.setAttribute('role', 'status');
        tip.textContent = 'Link copied';
        a.appendChild(tip);
        setTimeout(function () {
          a.classList.remove('copied');
          if (tip.parentNode) tip.parentNode.removeChild(tip);
        }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () {});
      }
    });
  });

  /* ---- 4. TOC scroll-spy ------------------------------------------------------- */
  var tocList = document.querySelector('.docs-toc-list');
  if (tocList) {
    var tocLinks = Array.prototype.slice.call(tocList.querySelectorAll('a[href^="#"]'));
    var byId = {};
    tocLinks.forEach(function (link) {
      byId[decodeURIComponent(link.getAttribute('href').slice(1))] = link.parentElement;
    });
    var headings = Object.keys(byId)
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    var activeLi = null;
    function setActive(li) {
      if (!li || li === activeLi) return;
      if (activeLi) activeLi.classList.remove('toc-active');
      li.classList.add('toc-active');
      activeLi = li;
      var link = li.querySelector('a');
      tocList.style.setProperty('--toc-ind-top', link.offsetTop + 'px');
      tocList.style.setProperty('--toc-ind-h', link.offsetHeight + 'px');
      tocList.style.setProperty('--toc-ind-o', '1');
    }

    if (headings.length) {
      // The heading nearest above the reading line (~25% viewport) wins.
      // At the very bottom of the page the last heading may never cross that
      // line (no room left to scroll) - being on screen is enough there.
      var pickCurrent = function () {
        var line = window.innerHeight * 0.25;
        var current = headings[0];
        for (var i = 0; i < headings.length; i++) {
          if (headings[i].getBoundingClientRect().top <= line) current = headings[i];
          else break;
        }
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
          var last = headings[headings.length - 1];
          if (last.getBoundingClientRect().top < window.innerHeight) current = last;
        }
        setActive(byId[current.id]);
      };
      var ticking = false;
      var onScroll = function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { pickCurrent(); ticking = false; });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      pickCurrent();

      if (reducedMotion) tocList.style.setProperty('transition', 'none');
    }
  }

  /* ---- 5. search ------------------------------------------------------------------ */
  var overlay = document.getElementById('docs-search');
  var openBtn = document.getElementById('docs-search-btn');
  var input = document.getElementById('docs-search-input');
  var resultsEl = document.getElementById('docs-search-results');
  var emptyEl = document.getElementById('docs-search-empty');
  if (!overlay || !openBtn || !input) return;

  var index = null;
  var loading = null;
  // Locale-aware index: /pl/docs/* pages read /pl/docs/search-index.json etc.
  var localeMatch = location.pathname.match(/^\/(pl|de|fr)\//);
  var indexUrl = (localeMatch ? '/' + localeMatch[1] : '') + '/docs/search-index.json';
  function loadIndex() {
    if (index) return Promise.resolve(index);
    if (!loading) {
      loading = fetch(indexUrl)
        .then(function (r) { return r.json(); })
        .then(function (data) { index = data; return data; })
        .catch(function () { loading = null; return []; });
    }
    return loading;
  }

  var lastFocus = null;
  function openSearch() {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    input.value = '';
    render([]);
    input.focus();
    loadIndex();
  }
  function closeSearch() {
    overlay.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  openBtn.addEventListener('click', openSearch);
  document.getElementById('docs-search-close').addEventListener('click', closeSearch);
  overlay.addEventListener('mousedown', function (e) {
    if (e.target === overlay) closeSearch();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.hidden) {
      closeSearch();
    } else if (e.key === '/' && overlay.hidden && !e.metaKey && !e.ctrlKey && !e.altKey) {
      var t = e.target;
      var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
      if (!typing) { e.preventDefault(); openSearch(); }
    }
  });

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function highlight(text, terms) {
    var safe = escapeHtml(text);
    terms.forEach(function (t) {
      if (t.length < 2) return;
      safe = safe.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
    });
    return safe;
  }

  function score(page, terms) {
    var title = page.t.toLowerCase();
    var body = page.b.toLowerCase();
    var heads = page.h.map(function (h) { return h[1].toLowerCase(); }).join(' \n ');
    var total = 0;
    for (var i = 0; i < terms.length; i++) {
      var term = terms[i];
      var s = 0;
      if (title.indexOf(term) !== -1) s += title.indexOf(term) === 0 ? 30 : 20;
      if (heads.indexOf(term) !== -1) s += 12;
      if (body.indexOf(term) !== -1) s += 5;
      if (!s) return 0; // every term must match somewhere
      total += s;
    }
    return total;
  }

  function snippetFor(page, terms) {
    var body = page.b;
    var lower = body.toLowerCase();
    var pos = -1;
    for (var i = 0; i < terms.length; i++) {
      pos = lower.indexOf(terms[i]);
      if (pos !== -1) break;
    }
    if (pos === -1) return body.slice(0, 110);
    var start = Math.max(0, pos - 40);
    return (start > 0 ? '…' : '') + body.slice(start, start + 130) + '…';
  }

  function matchedHeading(page, terms) {
    for (var i = 0; i < page.h.length; i++) {
      var text = page.h[i][1].toLowerCase();
      for (var j = 0; j < terms.length; j++) {
        if (text.indexOf(terms[j]) !== -1) return page.h[i];
      }
    }
    return null;
  }

  var selected = -1;
  function render(items, terms) {
    resultsEl.innerHTML = '';
    selected = -1;
    emptyEl.hidden = !(input.value.trim() && items.length === 0);
    items.forEach(function (it) {
      var li = document.createElement('li');
      li.setAttribute('role', 'option');
      var head = matchedHeading(it.page, terms || []);
      var href = head ? it.page.u + '#' + head[0] : it.page.u;
      li.innerHTML =
        '<a href="' + href + '">' +
        '<span class="result-title">' + highlight(it.page.t, terms || []) + '</span>' +
        '<span class="result-meta">' + escapeHtml(it.page.s) + (head ? ' · ' + highlight(head[1], terms) : '') + '</span>' +
        '<span class="result-snippet">' + highlight(snippetFor(it.page, terms || []), terms || []) + '</span>' +
        '</a>';
      resultsEl.appendChild(li);
    });
  }

  function runSearch() {
    var q = input.value.trim().toLowerCase();
    if (!q) { render([]); return; }
    var terms = q.split(/\s+/).filter(Boolean).slice(0, 6);
    loadIndex().then(function (data) {
      var items = data
        .map(function (page) { return { page: page, s: score(page, terms) }; })
        .filter(function (it) { return it.s > 0; })
        .sort(function (a, b) { return b.s - a.s; })
        .slice(0, 8);
      render(items, terms);
    });
  }
  var debounce = null;
  input.addEventListener('input', function () {
    clearTimeout(debounce);
    debounce = setTimeout(runSearch, 80);
  });

  input.addEventListener('keydown', function (e) {
    var options = resultsEl.querySelectorAll('li');
    if (!options.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (selected >= 0) options[selected].removeAttribute('aria-selected');
      selected = e.key === 'ArrowDown'
        ? (selected + 1) % options.length
        : (selected - 1 + options.length) % options.length;
      options[selected].setAttribute('aria-selected', 'true');
      options[selected].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && selected >= 0) {
      e.preventDefault();
      options[selected].querySelector('a').click();
    }
  });

  /* ---- 6. language dropdown (docs footer) ----------------------------------------
     Option values carry the SAME page in the target language. On change we
     remember the manual choice (sigcat_locale cookie + localStorage - the
     contract the Worker's root redirect honors, same as the landing switcher)
     and navigate. Crawlability comes from the hreflang cluster + sitemap. */
  var langSelect = document.getElementById('docs-lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', function () {
      var opt = langSelect.selectedOptions && langSelect.selectedOptions[0];
      var loc = opt && opt.getAttribute('data-lang');
      if (loc) {
        try { localStorage.setItem('sigcat_locale', loc); } catch (e) {}
        document.cookie = 'sigcat_locale=' + loc + ';path=/;max-age=31536000;SameSite=Lax';
      }
      if (langSelect.value) location.href = langSelect.value;
    });
  }

  /* ---- 7. ?q= deep link (WebSite SearchAction on the landing JSON-LD) -----------
     /docs?q=foo opens the search overlay pre-filled - keeps the declared
     SearchAction honest. */
  var qParam = null;
  try { qParam = new URLSearchParams(location.search).get('q'); } catch (e) {}
  if (qParam) {
    openSearch();
    input.value = qParam;
    runSearch();
  }
})();

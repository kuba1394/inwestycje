/*
 * Rdzeń strony: wspólne narzędzia (window.KB), routing, katalog, renderer kart (instrumenty i podstawy),
 * podpowiedzi słownikowe i postęp nauki. Moduły (learn.js, compliance.js, tools.js) rejestrują własne trasy
 * przez KB.route(...). Start następuje po załadowaniu wszystkich skryptów (DOMContentLoaded).
 */
(function () {
  "use strict";

  var KB = window.KB = {};
  var INSTRUMENTS = KB.INSTRUMENTS = window.INSTRUMENTS || [];
  var BASICS = KB.BASICS = window.BASICS || [];
  var PLANNED = window.PLANNED || [];
  var LAW = KB.LAW = window.LAW || {};
  var META = window.META || {};

  KB.MARKETS = {
    exchange: { pl: "Notowane na giełdzie", en: "Exchange-Traded", tag: "Exchange-Traded" },
    otc: { pl: "Pozagiełdowe", en: "Over-the-Counter", tag: "OTC" }
  };
  KB.LEVELS = {
    1: { pl: "Podstawowy", en: "Beginner" },
    2: { pl: "Średni", en: "Intermediate" },
    3: { pl: "Zaawansowany", en: "Advanced" }
  };

  var UI = {
    pl: {
      keyFacts: "Kluczowe parametry", contents: "Spis treści", glossary: "Słowniczek",
      sources: "Podstawa prawna i źródła", back: "Katalog", langLabel: "Język opisu",
      tldr: "W 30 sekund", before: "Zanim przeczytasz", level: "Poziom", reviewed: "Zweryfikowano",
      markRead: "Oznacz jako przeczytane", isRead: "Przeczytane ✓", quiz: "Sprawdź się — quiz",
      basics: "Podstawy", related: "Powiązane instrumenty", codes: "Security types w aplikacji", variant: "(wariant)", notes: "Uwagi"
    },
    en: {
      keyFacts: "Key facts", contents: "Contents", glossary: "Glossary",
      sources: "Legal basis and sources", back: "Catalogue", langLabel: "Description language",
      tldr: "In 30 seconds", before: "Before you read", level: "Level", reviewed: "Reviewed",
      markRead: "Mark as read", isRead: "Read ✓", quiz: "Test yourself — quiz",
      basics: "Basics", related: "Related instruments", codes: "Security types in the application", variant: "(variant)", notes: "Notes"
    }
  };
  KB.UI = UI;

  var app = KB.app = document.getElementById("app");

  /* ---------- Narzędzia ---------- */

  KB.esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  };
  var esc = KB.esc;

  KB.norm = function (s) {
    return String(s || "").toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/[̀-ͯ]/g, "");
  };
  KB.strip = function (html) { return String(html || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(); };

  KB.instrument = function (id) {
    for (var i = 0; i < INSTRUMENTS.length; i++) if (INSTRUMENTS[i].id === id) return INSTRUMENTS[i];
    return null;
  };
  KB.basic = function (id) {
    for (var i = 0; i < BASICS.length; i++) if (BASICS[i].id === id) return BASICS[i];
    return null;
  };
  /* Link do karty instrumentu lub strony podstaw po id */
  KB.link = function (id, label) {
    var x = KB.instrument(id);
    if (x) return '<a href="#/i/' + id + '">' + esc(label || x.name) + '</a>';
    var b = KB.basic(id);
    if (b) return '<a href="#/basics/' + id + '">' + esc(label || b.title.pl) + '</a>';
    return esc(label || id);
  };
  KB.links = function (ids) { return (ids || []).map(function (i) { return KB.link(i); }).join(", "); };
  KB.meta = function (id) { return META[id] || {}; };
  /* Kody security type z aplikacji przypisane do karty (kind "card" i "variant") */
  KB.SECTYPES = window.SECTYPES || [];
  KB.codes = function (id) { return KB.SECTYPES.filter(function (c) { return c.card === id; }); };
  KB.REVIEWED = window.REVIEWED || "";

  /* Bezpieczna pamięć przeglądarki (może być niedostępna) */
  KB.store = {
    get: function (k, d) {
      try { var v = window.localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; }
    },
    set: function (k, v) {
      try { window.localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* brak pamięci — ignorujemy */ }
    }
  };
  KB.isRead = function (key) { return !!KB.store.get("kb.read", {})[key]; };
  KB.setRead = function (key, val) {
    var r = KB.store.get("kb.read", {});
    if (val) r[key] = true; else delete r[key];
    KB.store.set("kb.read", r);
  };

  KB.each = function (sel, fn, root) { Array.prototype.forEach.call((root || app).querySelectorAll(sel), fn); };

  KB.title = function (t) { document.title = t ? t + " — Instrumenty finansowe" : "Instrumenty finansowe — baza wiedzy"; };

  KB.levelBadge = function (lvl, lang) {
    if (!lvl) return "";
    return '<span class="badge level level-' + lvl + '">' + "●●●".slice(0, lvl) + "○○○".slice(lvl) + " " + KB.LEVELS[lvl][lang || "pl"] + '</span>';
  };

  /* ---------- Routing ---------- */

  var routes = [];
  KB.route = function (re, fn) { routes.push({ re: re, fn: fn }); };

  function route() {
    var h = location.hash || "#/";
    for (var i = 0; i < routes.length; i++) {
      var m = h.match(routes[i].re);
      if (m) { routes[i].fn.apply(null, m.slice(1)); break; }
    }
    window.scrollTo(0, 0);
    KB.each(".header-nav a", function (a) {
      var target = a.getAttribute("data-section");
      a.classList.toggle("active", !!target && h.indexOf(target) === 0);
    }, document);
  }
  KB.rerender = route;

  /* ---------- Słownik i podpowiedzi ---------- */

  /* Lista wszystkich haseł: ze słowniczków kart instrumentów, stron podstaw i dodatkowych haseł */
  var glossaryCache = null;
  KB.glossary = function () {
    if (glossaryCache) return glossaryCache;
    var map = {};
    function add(termPl, defPl, termEn, defEn, src) {
      var key = KB.norm(KB.strip(termEn || termPl));
      if (!map[key]) map[key] = { term: KB.strip(termEn || termPl), termPl: KB.strip(termPl), defPl: defPl, defEn: defEn, sources: [] };
      if (src && map[key].sources.indexOf(src) === -1) map[key].sources.push(src);
    }
    function fromDoc(doc) {
      var gp = (doc.content.pl.glossary || []), ge = (doc.content.en.glossary || []);
      gp.forEach(function (g, i) {
        var e = ge[i] || g;
        add(g[0], g[1], e[0], e[1], doc.id);
      });
    }
    INSTRUMENTS.forEach(fromDoc);
    BASICS.forEach(fromDoc);
    (window.EXTRA_GLOSSARY || []).forEach(function (g) { add(g.term, g.pl, g.term, g.en, null); });
    glossaryCache = Object.keys(map).map(function (k) { return map[k]; })
      .sort(function (a, b) { return a.term.localeCompare(b.term); });
    return glossaryCache;
  };

  /* Klucze dopasowania hasła w tekście: część główna, skrót w nawiasie, warianty po „/” */
  function termKeys(term) {
    var keys = [];
    var main = term.replace(/\s*\(.*?\)\s*/g, " ").trim();
    var inner = (term.match(/\(([^)]+)\)/) || [])[1];
    function addParts(s) {
      var parts = s.split(/\s*\/\s*/).map(function (p) { return p.trim(); });
      if (parts.length === 1) { keys.push(parts[0]); return; }
      // Przy wariantach „A / B” bierzemy tylko części jednoznaczne: wielowyrazowe, skróty lub długie słowa
      parts.forEach(function (p) {
        if (/\s/.test(p) || /^[A-Z0-9€]{2,}$/.test(p) || p.length >= 9) keys.push(p);
      });
    }
    addParts(main);
    if (inner) addParts(inner);
    return keys.filter(function (k) { return k.length >= 3 && !/^\d/.test(k); });
  }

  KB.applyTerms = function (root, lang) {
    var entries = KB.glossary();
    var used = {};
    var matchers = [];
    entries.forEach(function (e) {
      var def = KB.strip(lang === "en" ? e.defEn : e.defPl);
      termKeys(e.term).concat(e.termPl && e.termPl !== e.term ? termKeys(e.termPl) : []).forEach(function (k) {
        var safe = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        matchers.push({ key: KB.norm(k), re: new RegExp("(^|[^\\p{L}\\p{N}])(" + safe + ")(?=[^\\p{L}\\p{N}]|$)", "iu"), def: def, term: e.term });
      });
    });
    matchers.sort(function (a, b) { return b.key.length - a.key.length; });
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        while (p && p !== root) {
          if (/^(A|CODE|H1|H2|H3|H4|BUTTON|DT|TH)$/.test(p.nodeName) || (p.classList && (p.classList.contains("term") || p.classList.contains("formula") || p.classList.contains("noterms")))) return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return n.nodeValue.trim().length > 2 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (var n = 0; n < nodes.length; n++) {
      var node = nodes[n];
      for (var i = 0; i < matchers.length; i++) {
        var m = matchers[i];
        if (used[m.term]) continue;
        var r = m.re.exec(node.nodeValue);
        if (!r) continue;
        used[m.term] = true;
        var after = node.splitText(r.index + r[1].length);
        var rest = after.splitText(r[2].length);
        var span = document.createElement("span");
        span.className = "term";
        span.tabIndex = 0;
        span.setAttribute("data-tip", m.def.length > 260 ? m.def.slice(0, 257) + "…" : m.def);
        span.textContent = after.nodeValue;
        after.parentNode.replaceChild(span, after);
        // Tekst przed terminem i po nim sprawdzamy dalej jako osobne węzły
        if (node.nodeValue.trim().length > 2) nodes.push(node);
        if (rest.nodeValue.trim().length > 2) nodes.push(rest);
        break;
      }
    }
  };

  /* ---------- Strona główna / katalog ---------- */

  var homeState = { filter: "all", query: "", code: "" };

  function searchText(item) {
    var parts = [item.name, item.asset && item.asset.pl, item.asset && item.asset.en, KB.MARKETS[item.market].tag];
    if (item.aliases) parts = parts.concat(item.aliases);
    if (item.content) parts.push(item.content.pl.summary, item.content.en.summary);
    if (item.id) KB.codes(item.id).forEach(function (c) { parts.push(c.code, c.name); });
    return KB.norm(parts.join(" "));
  }

  function plInstr(n) {
    var d = n % 10, h = n % 100;
    if (n === 1) return "instrument";
    if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return "instrumenty";
    return "instrumentów";
  }
  KB.plInstr = plInstr;

  function renderHome() {
    KB.title("");
    var read = KB.store.get("kb.read", {});
    var readCount = INSTRUMENTS.filter(function (x) { return read[x.id]; }).length;
    app.innerHTML =
      '<section class="hero">' +
        '<h1>Jak naprawdę działają instrumenty finansowe</h1>' +
        '<p>Każda karta wyjaśnia mechanikę instrumentu krok po kroku, pokazuje przykład na liczbach i zbiera to, co ważne w <strong>post-trade compliance</strong> funduszy: dopuszczalność, limity, ekspozycję i raportowanie według <strong>UCITS</strong> i <strong>AIFMD</strong>.</p>' +
      '</section>' +
      '<section class="start-band">' +
        '<a class="start-tile" href="#/overview"><span class="st-k">Na start</span><strong>Przegląd instrumentów</strong><span>Wszystkie instrumenty z krótkimi opisami, w rodzinach.</span></a>' +
        '<a class="start-tile" href="#/learn/path"><span class="st-k">Zacznij tutaj</span><strong>Ścieżka nauki</strong><span>Od podstaw do derywatów OTC — w 6 etapach.</span></a>' +
        '<a class="start-tile" href="#/basics"><span class="st-k">Fundamenty</span><strong>Podstawy pojęć</strong><span>Duration, dźwignia, CCP, rozrachunek, ekspozycja.</span></a>' +
        '<a class="start-tile" href="#/compliance/decision"><span class="st-k">W pracy</span><strong>Nowy instrument w portfelu?</strong><span>Drzewo decyzyjne: jakie limity i obowiązki.</span></a>' +
        '<a class="start-tile" href="#/game"><span class="st-k">Motywacja</span><strong>Gra: Instrumentarium</strong><span>XP, poziomy, seria dni, sprint 60 s i mapa opanowania.</span></a>' +
        '<a class="start-tile" href="#/learn/quiz"><span class="st-k">Utrwal</span><strong>Quizy i fiszki</strong><span>Sprawdź, ile już wiesz.' + (readCount ? ' Przeczytane karty: ' + readCount + '/' + INSTRUMENTS.length + '.' : '') + '</span></a>' +
      '</section>' +
      '<section class="code-search">' +
        '<label class="search code-input"><span class="code-label">Security type code</span>' +
          '<input id="codeq" type="search" list="codelist" placeholder="Wpisz kod z aplikacji, np. SWAPIRS, TIPS, RCVBL1…" autocomplete="off" spellcheck="false" value="' + esc(homeState.code) + '">' +
        '</label>' +
        '<datalist id="codelist">' + KB.SECTYPES.map(function (c) { return '<option value="' + esc(c.code) + '">' + esc(c.name) + '</option>'; }).join("") + '</datalist>' +
        '<div id="code-results"></div>' +
      '</section>' +
      '<div class="controls">' +
        '<label class="search"><span class="sr-only">Szukaj</span>' +
          '<input id="q" type="search" placeholder="Szukaj instrumentu lub kodu security type, np. swap, SWAPIRS, akcje…" autocomplete="off" value="' + esc(homeState.query) + '">' +
        '</label>' +
        '<div class="chips" role="group" aria-label="Filtr rynku">' +
          chip("all", "Wszystkie") + chip("exchange", "Exchange-Traded") + chip("otc", "OTC") +
        '</div>' +
      '</div>' +
      '<div id="catalog"></div>';

    var cq = document.getElementById("codeq");
    cq.addEventListener("input", function () { homeState.code = cq.value; renderCodeResults(); });
    cq.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      var hit = KB.SECTYPES.filter(function (c) { return c.code.toUpperCase() === cq.value.trim().toUpperCase(); })[0];
      if (hit && hit.card) location.hash = "#/i/" + hit.card;
    });
    renderCodeResults();
    var q = document.getElementById("q");
    q.addEventListener("input", function () { homeState.query = q.value; renderCatalog(); });
    KB.each(".chip", function (b) {
      b.addEventListener("click", function () {
        homeState.filter = b.getAttribute("data-filter");
        KB.each(".chip", function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
        renderCatalog();
      });
    });
    renderCatalog();
  }

  /* Wyszukiwarka po samym kodzie security type: najpierw dokładne trafienie, potem kody zaczynające się od wpisanego tekstu, potem zawierające go */
  function renderCodeResults() {
    var box = document.getElementById("code-results");
    var q = homeState.code.trim().toUpperCase();
    if (!q) { box.innerHTML = ""; return; }
    var rank = function (c) { var k = c.code.toUpperCase(); return k === q ? 0 : k.indexOf(q) === 0 ? 1 : k.indexOf(q) !== -1 ? 2 : 9; };
    var hits = KB.SECTYPES.filter(function (c) { return rank(c) < 9; })
      .sort(function (a, b) { return rank(a) - rank(b) || a.code.localeCompare(b.code); });
    var KIND = { card: "Karta", variant: "Wariant w karcie", none: "Bez karty" };
    box.innerHTML = hits.length ? '<ul class="code-hits">' + hits.slice(0, 15).map(function (c) {
      var x = c.card && KB.instrument(c.card);
      var right = x ? '<a href="#/i/' + c.card + '">' + esc(x.name) + ' →</a>' : '<span class="cell-note">' + esc(c.group) + '</span>';
      return '<li class="' + (c.kind === "none" ? "tech" : "") + '"><code>' + esc(c.code) + '</code><span class="ch-name">' + esc(c.name) + '</span><span class="ch-kind">' + KIND[c.kind] + '</span>' + right +
        (c.kind === "none" || c.note ? '<p class="ch-note">' + esc(c.note || "") + '</p>' : '') + '</li>';
    }).join("") + '</ul>' + (hits.length > 15 ? '<p class="cell-note">Pokazano 15 z ' + hits.length + ' kodów — doprecyzuj kod. Pełna lista: <a href="#/compliance/security-types">Security types w aplikacji</a>.</p>' : '')
      : '<p class="empty">Brak kodu „' + esc(homeState.code) + '” na liście 209 security types. <a href="#/compliance/security-types">Pełna lista</a>.</p>';
  }

  function chip(value, label) {
    return '<button type="button" class="chip" data-filter="' + value + '" aria-pressed="' + (homeState.filter === value) + '">' + label + '</button>';
  }

  function renderCatalog() {
    var q = KB.norm(homeState.query.trim());
    var read = KB.store.get("kb.read", {});
    var html = "";
    ["exchange", "otc"].forEach(function (m) {
      if (homeState.filter !== "all" && homeState.filter !== m) return;
      var ready = INSTRUMENTS.filter(function (x) { return x.market === m && (!q || searchText(x).indexOf(q) !== -1); })
        .sort(function (a, b) { return a.name.localeCompare(b.name); });
      var planned = PLANNED.filter(function (x) { return x.market === m && (!q || searchText(x).indexOf(q) !== -1); });
      if (!ready.length && !planned.length) return;
      html += '<section class="market market-' + m + '">' +
        '<header class="market-head"><span class="market-tag">' + KB.MARKETS[m].tag + '</span>' +
        '<h2>' + KB.MARKETS[m].pl + '</h2>' +
        '<span class="count">' + ready.length + ' ' + plInstr(ready.length) + (planned.length ? ' · ' + planned.length + ' w przygotowaniu' : '') + '</span></header>';
      if (ready.length) html += '<div class="cards">' + ready.map(function (x) { return card(x, read[x.id]); }).join("") + '</div>';
      if (planned.length) {
        html += '<details class="planned"' + (q ? " open" : "") + '><summary>W przygotowaniu (' + planned.length + ')</summary><ul>' +
          planned.map(function (p) {
            return '<li><span class="p-name">' + esc(p.name) + '</span><span class="p-asset">' + esc(p.asset.pl) + (p.note ? ' · ' + esc(p.note.pl) : '') + '</span></li>';
          }).join("") + '</ul></details>';
      }
      html += '</section>';
    });
    // Kody techniczne (bez karty) — pokaż wyjaśnienie zamiast pustego wyniku
    if (q) {
      var tech = KB.SECTYPES.filter(function (c) { return c.kind === "none" && (KB.norm(c.code) === q || KB.norm(c.name).indexOf(q) !== -1); });
      if (tech.length) html = '<section class="tech-codes">' + tech.map(function (c) {
        return '<div class="tldr"><span class="tldr-k">' + esc(c.code) + ' · ' + esc(c.group) + '</span><p><strong>' + esc(c.name) + '</strong> — ' + esc(c.note) + '</p></div>';
      }).join("") + '<p class="cell-note">Pełna lista kodów: <a href="#/compliance/security-types">Security types w aplikacji</a>.</p></section>' + html;
    }
    if (!html) html = '<p class="empty">Brak wyników dla „' + esc(homeState.query) + '”.</p>';
    document.getElementById("catalog").innerHTML = html;
  }

  function card(x, isRead) {
    var meta = KB.meta(x.id);
    return '<a class="card" href="#/i/' + x.id + '">' +
      '<span class="card-top"><span class="card-asset">' + esc(x.asset.pl) + '</span>' + (meta.level ? '<span class="dots" title="Poziom: ' + KB.LEVELS[meta.level].pl + '">' + "●●●".slice(0, meta.level) + "○○○".slice(meta.level) + '</span>' : '') + '</span>' +
      '<h3>' + esc(x.name) + (isRead ? ' <span class="read-mark" title="Przeczytane">✓</span>' : '') + '</h3>' +
      '<p>' + esc(meta.tldr ? meta.tldr.pl : x.content.pl.summary) + '</p>' +
      (function () {
        var q = KB.norm(homeState.query.trim());
        if (!q) return "";
        var hit = KB.codes(x.id).filter(function (c) { return KB.norm(c.code + " " + c.name).indexOf(q) !== -1; });
        return hit.length ? '<span class="card-codes">' + hit.map(function (c) { return esc(c.code); }).join(" · ") + '</span>' : "";
      })() +
      '<span class="card-more">Otwórz kartę →</span>' +
    '</a>';
  }

  /* ---------- Renderer dokumentu (karta instrumentu lub strona podstaw) ---------- */

  /*
   * opts: { kind: "instrument"|"basic", id, title, aliases[], badgesHtml(lang), crumbsHtml(lang),
   *         content: {pl, en}, sources[], level, tldr{pl,en}, prereq[], related[], quizId }
   */
  KB.renderDoc = function (opts, lang) {
    var t = UI[lang];
    var c = opts.content[lang];
    var readKey = opts.id;

    var toc = c.sections.map(function (s) {
      return '<li><a href="#s-' + s.id + '" data-scroll="s-' + s.id + '">' + esc(s.title) + '</a></li>';
    }).join("");
    if (opts.codes && opts.codes.length) toc += '<li><a href="#s-codes" data-scroll="s-codes">' + t.codes + '</a></li>';
    if (c.glossary && c.glossary.length) toc += '<li><a href="#s-glossary" data-scroll="s-glossary">' + t.glossary + '</a></li>';
    if (opts.sources && opts.sources.length) toc += '<li><a href="#s-sources" data-scroll="s-sources">' + t.sources + '</a></li>';

    var top = "";
    if (opts.tldr) top += '<div class="tldr"><span class="tldr-k">' + t.tldr + '</span><p>' + esc(opts.tldr[lang]) + '</p></div>';
    if (opts.prereq && opts.prereq.length) {
      top += '<p class="prereq"><strong>' + t.before + ':</strong> ' + opts.prereq.map(function (p) {
        var b = KB.basic(p); return b ? '<a href="#/basics/' + p + '">' + esc(b.title[lang]) + '</a>' : '';
      }).join(" · ") + '</p>';
    }

    var facts = c.keyFacts && c.keyFacts.length ? '<section class="block facts"><h2>' + t.keyFacts + '</h2><table class="facts-table"><tbody>' +
      c.keyFacts.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + r[1] + '</td></tr>'; }).join("") +
      '</tbody></table></section>' : "";

    var sections = c.sections.map(function (s) {
      return '<section class="block" id="s-' + s.id + '"><h2>' + esc(s.title) + '</h2>' + s.html + '</section>';
    }).join("");

    var glossary = (c.glossary && c.glossary.length) ? '<section class="block noterms" id="s-glossary"><h2>' + t.glossary + '</h2><dl class="glossary">' +
      c.glossary.map(function (g) { return '<dt>' + esc(g[0]) + '</dt><dd>' + g[1] + '</dd>'; }).join("") + '</dl></section>' : "";

    var related = (opts.related && opts.related.length) ? '<section class="block noterms"><h2>' + t.related + '</h2><p class="related">' + opts.related.map(function (r) { return KB.link(r); }).join(" · ") + '</p></section>' : "";

    var sources = (opts.sources && opts.sources.length) ? '<section class="block noterms" id="s-sources"><h2>' + t.sources + '</h2><ul class="sources">' +
      opts.sources.map(function (key) {
        var s = LAW[key] || { label: key };
        return '<li>' + (s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>' : esc(s.label)) + '</li>';
      }).join("") + '</ul></section>' : "";

    var codes = opts.codes || [];
    var codesBlock = codes.length ? '<section class="block noterms" id="s-codes"><h2>' + t.codes + '</h2><div class="table-scroll"><table class="calc"><thead><tr><th>Security type</th><th>Name</th><th>' + t.notes + '</th></tr></thead><tbody>' +
      codes.map(function (c) { return '<tr><td><code>' + esc(c.code) + '</code></td><td>' + esc(c.name) + (c.kind === "variant" ? ' <span class="cell-note">' + t.variant + '</span>' : '') + '</td><td>' + esc((lang === "en" ? c.noteEn : c.note) || "") + '</td></tr>'; }).join("") +
      '</tbody></table></div></section>' : "";
    var isRead = KB.isRead(readKey);
    var actions = '<div class="doc-actions">' +
      '<button type="button" class="btn-read' + (isRead ? ' done' : '') + '" data-read>' + (isRead ? t.isRead : t.markRead) + '</button>' +
      (opts.quizId ? '<a class="btn" href="#/learn/quiz/' + opts.quizId + '">' + t.quiz + ' →</a>' : '') +
    '</div>';

    app.innerHTML =
      '<nav class="crumbs">' + opts.crumbsHtml(lang) + '</nav>' +
      '<header class="inst-head ' + (opts.headClass || "") + '">' +
        '<div class="inst-title">' +
          '<div class="badges">' + opts.badgesHtml(lang) + KB.levelBadge(opts.level, lang) + '</div>' +
          '<h1>' + esc(opts.title[lang] || opts.title) + '</h1>' +
          (opts.aliases && opts.aliases.length ? '<p class="aka">' + opts.aliases.map(esc).join(" · ") + '</p>' : '') +
          ((opts.codes || []).length ? '<p class="codes">' + opts.codes.map(function (c) { return '<code title="' + esc(c.name) + '">' + esc(c.code) + '</code>'; }).join(" ") + '</p>' : '') +
          (KB.REVIEWED ? '<p class="reviewed">' + t.reviewed + ': ' + esc(opts.reviewed || KB.REVIEWED) + '</p>' : '') +
        '</div>' +
        '<div class="lang-toggle" role="group" aria-label="' + t.langLabel + '">' +
          '<span class="lang-label">' + t.langLabel + '</span>' +
          '<button type="button" data-lang="pl" aria-pressed="' + (lang === "pl") + '">PL</button>' +
          '<button type="button" data-lang="en" aria-pressed="' + (lang === "en") + '">EN</button>' +
        '</div>' +
      '</header>' +
      '<div class="inst-layout">' +
        '<aside class="toc"><h2>' + t.contents + '</h2><ol>' + toc + '</ol></aside>' +
        '<article class="inst-body" lang="' + lang + '">' +
          '<p class="lead">' + esc(c.summary) + '</p>' + top + facts + sections + codesBlock + glossary + related + sources + actions +
        '</article>' +
      '</div>';

    var article = app.querySelector(".inst-body");
    KB.applyTerms(article, lang);

    KB.each(".lang-toggle button", function (b) {
      b.addEventListener("click", function () {
        var l = b.getAttribute("data-lang");
        if (l === lang) return;
        var y = window.scrollY;
        KB.renderDoc(opts, l);
        window.scrollTo(0, y);
      });
    });
    KB.each("[data-scroll]", function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var el = document.getElementById(a.getAttribute("data-scroll"));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    KB.each("[data-read]", function (b) {
      b.addEventListener("click", function () {
        var now = !KB.isRead(readKey);
        KB.setRead(readKey, now);
        b.classList.toggle("done", now);
        b.textContent = now ? t.isRead : t.markRead;
      });
    });
  };

  /* ---------- Karta instrumentu ---------- */

  function renderInstrument(id) {
    var x = KB.instrument(id);
    if (!x) { app.innerHTML = '<p class="empty">Nie znaleziono instrumentu. <a href="#/">Wróć do katalogu</a>.</p>'; return; }
    KB.title(x.name);
    var meta = KB.meta(id);
    var mk = KB.MARKETS[x.market];
    var hasQuiz = (window.QUIZ || []).some(function (s) { return s.id === id; });
    KB.renderDoc({
      kind: "instrument", id: id, title: { pl: x.name, en: x.name }, aliases: x.aliases,
      content: x.content, sources: x.sources, level: meta.level, tldr: meta.tldr, prereq: meta.prereq,
      related: meta.related, quizId: hasQuiz ? id : null, headClass: "market-" + x.market, codes: KB.codes(id),
      crumbsHtml: function (lang) {
        return '<a href="#/">' + UI[lang].back + '</a><span>/</span><span>' + mk.tag + '</span><span>/</span><span>' + esc(x.name) + '</span>';
      },
      badgesHtml: function (lang) {
        return '<span class="badge badge-market">' + mk.tag + '</span><span class="badge">' + esc(x.asset[lang]) + '</span>';
      }
    }, "pl"); // domyślnie zawsze polski
  }

  /* ---------- Strona podstaw ---------- */

  function renderBasic(id) {
    var b = KB.basic(id);
    if (!b) { app.innerHTML = '<p class="empty">Nie znaleziono strony. <a href="#/basics">Wróć do podstaw</a>.</p>'; return; }
    KB.title(b.title.pl);
    var hasQuiz = (window.QUIZ || []).some(function (s) { return s.id === "basics-" + id; });
    KB.renderDoc({
      kind: "basic", id: "basic:" + id, title: b.title, content: b.content, sources: b.sources, level: b.level,
      prereq: b.prereq, related: b.related, quizId: hasQuiz ? "basics-" + id : null, headClass: "basics-head",
      crumbsHtml: function (lang) {
        return '<a href="#/learn">' + (lang === "pl" ? "Nauka" : "Learning") + '</a><span>/</span><a href="#/basics">' + UI[lang].basics + '</a><span>/</span><span>' + esc(b.title[lang]) + '</span>';
      },
      badgesHtml: function (lang) { return '<span class="badge badge-basic">' + UI[lang].basics + '</span>'; }
    }, "pl");
  }

  /* ---------- O projekcie ---------- */

  function renderAbout() {
    KB.title("O projekcie");
    var ex = INSTRUMENTS.filter(function (x) { return x.market === "exchange"; }).length;
    app.innerHTML =
      '<article class="page">' +
        '<h1>O projekcie</h1>' +
        '<p>Repozytorium wiedzy o instrumentach finansowych dla zespołu post-trade compliance funduszy inwestycyjnych i dla osób, które dopiero zaczynają pracę z instrumentami. Instrumenty dzielimy na <strong>Exchange-Traded</strong> (notowane i rozliczane przez infrastrukturę giełdową) oraz <strong>OTC</strong> (zawierane bilateralnie, także gdy później rozliczane centralnie przez CCP).</p>' +
        '<h2>Co znajdziesz</h2>' +
        '<ul>' +
          '<li><a href="#/">Katalog</a> — ' + INSTRUMENTS.length + ' kart instrumentów (Exchange-Traded: ' + ex + ', OTC: ' + (INSTRUMENTS.length - ex) + ').</li>' +
          '<li><a href="#/learn">Nauka</a> — ścieżka nauki, podstawy pojęć, słownik, quizy i fiszki, porównania, lekcje z historii.</li>' +
          '<li><a href="#/compliance">Compliance</a> — drzewo decyzyjne, matryca obowiązków, tabela limitów, studia przypadków, zmiany w przepisach.</li>' +
          '<li><a href="#/tools">Kalkulatory</a> — interaktywne obliczenia do przykładów z kart.</li>' +
        '</ul>' +
        '<h2>Zasady</h2>' +
        '<ul>' +
          '<li>Nazwy instrumentów są zawsze po angielsku.</li>' +
          '<li>Opisy instrumentów i strony podstaw istnieją po polsku i po angielsku; domyślnie wyświetla się polski, przełącznik PL/EN jest na każdej karcie.</li>' +
          '<li>Przykłady liczbowe są hipotetyczne i służą zrozumieniu mechaniki.</li>' +
          '<li>Postęp nauki (przeczytane karty, wyniki quizów, fiszki) zapisuje się tylko w Twojej przeglądarce.</li>' +
        '</ul>' +
        '<p><a href="#/">← Wróć do katalogu</a></p>' +
      '</article>';
  }

  /* ---------- Rejestracja tras rdzenia ---------- */

  KB.route(/^#\/i\/([\w-]+)/, renderInstrument);
  KB.route(/^#\/basics\/([\w-]+)/, renderBasic);
  KB.route(/^#\/about/, renderAbout);

  window.addEventListener("hashchange", route);
  document.addEventListener("DOMContentLoaded", function () {
    KB.route(/^.*$/, renderHome); // trasa domyślna — dodana na końcu, po modułach
    route();
  });
})();

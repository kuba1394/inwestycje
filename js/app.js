(function () {
  "use strict";

  var INSTRUMENTS = window.INSTRUMENTS || [];
  var PLANNED = window.PLANNED || [];
  var LAW = window.LAW || {};

  var MARKETS = {
    exchange: { pl: "Notowane na giełdzie", en: "Exchange-Traded", tag: "Exchange-Traded" },
    otc: { pl: "Pozagiełdowe", en: "Over-the-Counter", tag: "OTC" }
  };

  // Etykiety wewnątrz karty instrumentu — przełączane razem z językiem opisu
  var UI = {
    pl: {
      keyFacts: "Kluczowe parametry",
      contents: "Spis treści",
      glossary: "Słowniczek",
      sources: "Podstawa prawna i źródła",
      back: "Katalog",
      langLabel: "Język opisu",
      summary: "W skrócie",
      market: "Rynek",
      assetClass: "Klasa aktywów"
    },
    en: {
      keyFacts: "Key facts",
      contents: "Contents",
      glossary: "Glossary",
      sources: "Legal basis and sources",
      back: "Catalogue",
      langLabel: "Description language",
      summary: "In short",
      market: "Market",
      assetClass: "Asset class"
    }
  };

  var app = document.getElementById("app");
  var homeState = { filter: "all", query: "" };

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function norm(s) {
    return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");
  }

  function findInstrument(id) {
    for (var i = 0; i < INSTRUMENTS.length; i++) if (INSTRUMENTS[i].id === id) return INSTRUMENTS[i];
    return null;
  }

  function searchText(item) {
    var parts = [item.name, item.asset && item.asset.pl, item.asset && item.asset.en, MARKETS[item.market].tag];
    if (item.aliases) parts = parts.concat(item.aliases);
    if (item.content) parts.push(item.content.pl.summary, item.content.en.summary);
    return norm(parts.join(" "));
  }

  /* ---------- Strona główna ---------- */

  function renderHome() {
    document.title = "Instrumenty finansowe — baza wiedzy";
    app.innerHTML =
      '<section class="hero">' +
        '<h1>Jak naprawdę działają instrumenty finansowe</h1>' +
        '<p>Każda karta wyjaśnia mechanikę instrumentu krok po kroku, pokazuje przykład na liczbach i zbiera to, co ważne w <strong>post-trade compliance</strong> funduszy: dopuszczalność, limity, ekspozycję i raportowanie według <strong>UCITS</strong> i <strong>AIFMD</strong>.</p>' +
        '<div class="controls">' +
          '<label class="search"><span class="sr-only">Szukaj</span>' +
            '<input id="q" type="search" placeholder="Szukaj instrumentu, np. swap, future, akcje…" autocomplete="off" value="' + esc(homeState.query) + '">' +
          '</label>' +
          '<div class="chips" role="group" aria-label="Filtr rynku">' +
            chip("all", "Wszystkie") + chip("exchange", "Exchange-Traded") + chip("otc", "OTC") +
          '</div>' +
        '</div>' +
      '</section>' +
      '<div id="catalog"></div>';

    var q = document.getElementById("q");
    q.addEventListener("input", function () { homeState.query = q.value; renderCatalog(); });
    Array.prototype.forEach.call(app.querySelectorAll(".chip"), function (b) {
      b.addEventListener("click", function () {
        homeState.filter = b.getAttribute("data-filter");
        Array.prototype.forEach.call(app.querySelectorAll(".chip"), function (c) {
          c.setAttribute("aria-pressed", c === b ? "true" : "false");
        });
        renderCatalog();
      });
    });
    renderCatalog();
  }

  function chip(value, label) {
    return '<button type="button" class="chip" data-filter="' + value + '" aria-pressed="' + (homeState.filter === value) + '">' + label + '</button>';
  }

  function renderCatalog() {
    var q = norm(homeState.query.trim());
    var html = "";
    ["exchange", "otc"].forEach(function (m) {
      if (homeState.filter !== "all" && homeState.filter !== m) return;
      var ready = INSTRUMENTS.filter(function (x) { return x.market === m && (!q || searchText(x).indexOf(q) !== -1); });
      var planned = PLANNED.filter(function (x) { return x.market === m && (!q || searchText(x).indexOf(q) !== -1); });
      if (!ready.length && !planned.length) return;
      html += '<section class="market market-' + m + '">' +
        '<header class="market-head"><span class="market-tag">' + MARKETS[m].tag + '</span>' +
        '<h2>' + MARKETS[m].pl + '</h2>' +
        '<span class="count">' + ready.length + ' gotowe · ' + planned.length + ' w przygotowaniu</span></header>';
      if (ready.length) {
        html += '<div class="cards">' + ready.map(card).join("") + '</div>';
      }
      if (planned.length) {
        html += '<details class="planned"' + (q ? " open" : "") + '><summary>W przygotowaniu (' + planned.length + ')</summary><ul>' +
          planned.map(function (p) {
            return '<li><span class="p-name">' + esc(p.name) + '</span><span class="p-asset">' + esc(p.asset.pl) +
              (p.note ? ' · ' + esc(p.note.pl) : '') + '</span></li>';
          }).join("") + '</ul></details>';
      }
      html += '</section>';
    });
    if (!html) html = '<p class="empty">Brak wyników dla „' + esc(homeState.query) + '”.</p>';
    document.getElementById("catalog").innerHTML = html;
  }

  function card(x) {
    return '<a class="card" href="#/i/' + x.id + '">' +
      '<span class="card-asset">' + esc(x.asset.pl) + '</span>' +
      '<h3>' + esc(x.name) + '</h3>' +
      '<p>' + esc(x.content.pl.summary) + '</p>' +
      '<span class="card-more">Otwórz kartę →</span>' +
    '</a>';
  }

  /* ---------- Karta instrumentu ---------- */

  function renderInstrument(id) {
    var x = findInstrument(id);
    if (!x) {
      app.innerHTML = '<p class="empty">Nie znaleziono instrumentu. <a href="#/">Wróć do katalogu</a>.</p>';
      return;
    }
    document.title = x.name + " — Instrumenty finansowe";
    // Domyślnie zawsze polski
    drawInstrument(x, "pl");
  }

  function drawInstrument(x, lang) {
    var t = UI[lang];
    var c = x.content[lang];
    var mk = MARKETS[x.market];

    var toc = c.sections.map(function (s) {
      return '<li><a href="#s-' + s.id + '" data-scroll="s-' + s.id + '">' + esc(s.title) + '</a></li>';
    }).join("");
    if (c.glossary && c.glossary.length) toc += '<li><a href="#s-glossary" data-scroll="s-glossary">' + t.glossary + '</a></li>';
    if (x.sources && x.sources.length) toc += '<li><a href="#s-sources" data-scroll="s-sources">' + t.sources + '</a></li>';

    var facts = c.keyFacts.map(function (r) {
      return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + r[1] + '</td></tr>';
    }).join("");

    var sections = c.sections.map(function (s) {
      return '<section class="block" id="s-' + s.id + '"><h2>' + esc(s.title) + '</h2>' + s.html + '</section>';
    }).join("");

    var glossary = "";
    if (c.glossary && c.glossary.length) {
      glossary = '<section class="block" id="s-glossary"><h2>' + t.glossary + '</h2><dl class="glossary">' +
        c.glossary.map(function (g) { return '<dt>' + esc(g[0]) + '</dt><dd>' + g[1] + '</dd>'; }).join("") +
        '</dl></section>';
    }

    var sources = "";
    if (x.sources && x.sources.length) {
      sources = '<section class="block" id="s-sources"><h2>' + t.sources + '</h2><ul class="sources">' +
        x.sources.map(function (key) {
          var s = LAW[key] || { label: key };
          return '<li>' + (s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>' : esc(s.label)) + '</li>';
        }).join("") + '</ul></section>';
    }

    app.innerHTML =
      '<nav class="crumbs"><a href="#/">' + t.back + '</a><span>/</span><span>' + mk.tag + '</span><span>/</span><span>' + esc(x.name) + '</span></nav>' +
      '<header class="inst-head market-' + x.market + '">' +
        '<div class="inst-title">' +
          '<div class="badges"><span class="badge badge-market">' + mk.tag + '</span><span class="badge">' + esc(x.asset[lang]) + '</span></div>' +
          '<h1>' + esc(x.name) + '</h1>' +
          (x.aliases && x.aliases.length ? '<p class="aka">' + x.aliases.map(esc).join(" · ") + '</p>' : '') +
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
          '<p class="lead">' + esc(c.summary) + '</p>' +
          '<section class="block facts"><h2>' + t.keyFacts + '</h2><table class="facts-table"><tbody>' + facts + '</tbody></table></section>' +
          sections + glossary + sources +
        '</article>' +
      '</div>';

    Array.prototype.forEach.call(app.querySelectorAll(".lang-toggle button"), function (b) {
      b.addEventListener("click", function () {
        var l = b.getAttribute("data-lang");
        if (l === lang) return;
        var y = window.scrollY;
        drawInstrument(x, l);
        window.scrollTo(0, y);
      });
    });
    // Linki spisu treści przewijają bez zmiany trasy (#/i/…)
    Array.prototype.forEach.call(app.querySelectorAll("[data-scroll]"), function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var el = document.getElementById(a.getAttribute("data-scroll"));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ---------- O projekcie ---------- */

  function renderAbout() {
    document.title = "O projekcie — Instrumenty finansowe";
    app.innerHTML =
      '<article class="about">' +
        '<h1>O projekcie</h1>' +
        '<p>Repozytorium wiedzy o instrumentach finansowych dla zespołu post-trade compliance funduszy inwestycyjnych. Instrumenty dzielimy na <strong>Exchange-Traded</strong> (notowane i rozliczane przez infrastrukturę giełdową) oraz <strong>OTC</strong> (zawierane bilateralnie, także gdy później rozliczane centralnie przez CCP).</p>' +
        '<h2>Zasady</h2>' +
        '<ul>' +
          '<li>Nazwy instrumentów są zawsze po angielsku.</li>' +
          '<li>Każdy opis istnieje po polsku i po angielsku; domyślnie wyświetla się polski, przełącznik PL/EN jest na karcie instrumentu.</li>' +
          '<li>Każda karta ma ten sam układ: definicja → mechanika krok po kroku → przykład liczbowy → wycena i ryzyka → cykl życia i rozliczenie → UCITS → AIFMD → raportowanie → identyfikatory → checklista kontroli.</li>' +
          '<li>Przykłady liczbowe są hipotetyczne i służą zrozumieniu mechaniki.</li>' +
        '</ul>' +
        '<h2>Statystyka</h2>' +
        '<p>Gotowe karty: <strong>' + INSTRUMENTS.length + '</strong>. W przygotowaniu: <strong>' + PLANNED.length + '</strong>.</p>' +
        '<p><a href="#/">← Wróć do katalogu</a></p>' +
      '</article>';
  }

  /* ---------- Routing ---------- */

  function route() {
    var h = location.hash || "#/";
    var m = h.match(/^#\/i\/([\w-]+)/);
    if (m) renderInstrument(m[1]);
    else if (h.indexOf("#/about") === 0) renderAbout();
    else renderHome();
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  route();
})();

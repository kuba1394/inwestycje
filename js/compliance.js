/*
 * Moduł „Compliance”: hub, drzewo decyzyjne, matryca obowiązków, tabela limitów, studia przypadków, zmiany w przepisach.
 */
(function () {
  "use strict";
  var KB = window.KB, esc = KB.esc, app = KB.app;
  var DECISION = window.DECISION || {}, TAGS = window.DECISION_TAGS || {};
  var MATRIX = window.MATRIX || [], COLS = window.MATRIX_COLS || [];
  var LIMITS = window.LIMITS || [], CASES = window.CASES || [], CHANGES = window.CHANGES || [];

  function crumbs(label) {
    return '<nav class="crumbs"><a href="#/compliance">Compliance</a><span>/</span><span>' + esc(label) + '</span></nav>';
  }
  function cardLinks(ids) {
    return (ids || []).filter(function (i) { return KB.instrument(i); }).map(function (i) { return KB.link(i); }).join(" · ");
  }
  function today() { return new Date().toISOString().slice(0, 10); }

  /* ---------- Hub ---------- */

  function renderHub() {
    KB.title("Compliance");
    var upcoming = CHANGES.filter(function (c) { return c.date > today(); }).sort(function (a, b) { return a.date.localeCompare(b.date); })[0];
    var tiles = [
      ["#/compliance/decision", "Nowy instrument w portfelu?", "Drzewo decyzyjne: czy instrument jest dopuszczalny i jakie limity oraz obowiązki uruchamia."],
      ["#/compliance/matrix", "Matryca obowiązków", MATRIX.length + " instrumentów × " + COLS.length + " obowiązków: limity, ekspozycja, EMIR, SFTR, SSR, znaczne pakiety."],
      ["#/compliance/limits", "Tabela limitów", "UCITS art. 50–56 i 83–89, ekspozycja z derywatów, AIFMD z AIFMD II, MMFR."],
      ["#/compliance/cases", "Studia przypadków", CASES.length + " sytuacji z obliczeniami: przekroczenia, kontrahenci, znaczne pakiety, zabezpieczenia."],
      ["#/compliance/changes", "Zmiany w przepisach", "Oś czasu: EMIR 3, AIFMD II, T+1, reforma WIBOR." + (upcoming ? " Najbliższa: " + upcoming.date + "." : "")],
      ["#/tools", "Kalkulatory", "Test 5/10/40, ekspozycja w metodzie zaangażowania, FX forward, duration, bon skarbowy, opcje."]
    ];
    app.innerHTML = '<article class="page"><h1>Compliance</h1>' +
      '<p class="intro">Narzędzia do codziennej pracy w post-trade compliance funduszy. Zawsze sprawdzaj też prospekt lub statut funduszu i aktualne przepisy krajowe — tutaj są zasady ogólne z prawa UE.</p>' +
      '<div class="tiles">' + tiles.map(function (t) { return '<a class="tile" href="' + t[0] + '"><h3>' + t[1] + '</h3><p>' + esc(t[2]) + '</p></a>'; }).join("") + '</div></article>';
  }

  /* ---------- Drzewo decyzyjne ---------- */

  var dt = { node: "start", path: [], tags: [] };

  function renderDecision() {
    KB.title("Nowy instrument w portfelu");
    var n = DECISION[dt.node];
    var pathHtml = dt.path.length ? '<ol class="dt-path">' + dt.path.map(function (p) { return '<li>' + esc(p.q) + ' — <strong>' + esc(p.a) + '</strong></li>'; }).join("") + '</ol>' : '';
    var body;
    if (!n) body = '<p class="empty">Błąd drzewa: brak węzła ' + esc(dt.node) + '.</p>';
    else if (n.result) {
      var cls = { ok: "flag-ok", warn: "flag-warn", bad: "flag-bad" }[n.verdict] || "";
      var extra = dt.tags.filter(function (t, i, a) { return a.indexOf(t) === i; }).map(function (t) { return TAGS[t]; }).filter(Boolean);
      body = '<div class="dt-result"><h3 class="' + cls + '">' + esc(n.result) + '</h3>' +
        '<ul>' + n.rules.concat(extra).map(function (r) { return '<li>' + esc(r) + '</li>'; }).join("") + '</ul>' +
        (n.cards && n.cards.length ? '<p class="related"><strong>Karty:</strong> ' + cardLinks(n.cards) + '</p>' : '') +
        '<p class="cell-note">To wskazówka, a nie opinia prawna. Ostateczną decyzję podejmuje się na podstawie prospektu, przepisów krajowych i praktyki nadzorcy.</p></div>';
    } else {
      body = '<p class="dt-q">' + esc(n.q) + '</p>' + (n.help ? '<p class="dt-help">' + esc(n.help) + '</p>' : '') +
        '<div class="dt-opts">' + n.opts.map(function (o, i) { return '<button type="button" class="quiz-opt" data-o="' + i + '">' + esc(o.label) + '</button>'; }).join("") + '</div>';
    }
    app.innerHTML = '<article class="page">' + crumbs("Drzewo decyzyjne") + '<h1>Nowy instrument w portfelu?</h1>' +
      '<p class="intro">Odpowiedz na kilka pytań, aby zobaczyć, czy instrument jest dopuszczalny i jakie limity oraz obowiązki uruchamia.</p>' +
      '<div class="dt-box">' + pathHtml + body +
      '<div class="fc-controls" style="margin-top:16px">' + (dt.path.length ? '<button type="button" class="btn-sec" id="dt-back">← Wstecz</button><button type="button" class="btn-sec" id="dt-reset">Od początku</button>' : '') + '</div></div></article>';
    KB.each("[data-o]", function (b) {
      b.addEventListener("click", function () {
        var o = n.opts[+b.getAttribute("data-o")];
        dt.path.push({ q: n.q, a: o.label, node: dt.node, tagsLen: dt.tags.length });
        dt.tags = dt.tags.concat(o.add || []);
        dt.node = o.next;
        renderDecision();
      });
    });
    var back = document.getElementById("dt-back");
    if (back) back.addEventListener("click", function () { var p = dt.path.pop(); dt.node = p.node; dt.tags = dt.tags.slice(0, p.tagsLen); renderDecision(); });
    var reset = document.getElementById("dt-reset");
    if (reset) reset.addEventListener("click", function () { dt = { node: "start", path: [], tags: [] }; renderDecision(); });
  }

  /* ---------- Matryca ---------- */

  var mx = { q: "", market: "all" };
  function mcell(v) {
    var m = String(v).match(/^(Tak|Nie)(.*)$/);
    if (m) return '<span class="' + (m[1] === "Tak" ? "yes" : "no") + '">' + m[1] + '</span>' + (m[2] ? '<span class="cell-note">' + esc(m[2].replace(/^[,\s—-]+/, "")) + '</span>' : '');
    return esc(v);
  }
  function renderMatrix() {
    KB.title("Matryca obowiązków");
    app.innerHTML = '<article class="page wide">' + crumbs("Matryca obowiązków") + '<h1>Matryca obowiązków</h1>' +
      '<p class="intro">Które limity i raporty uruchamia każdy instrument. Perspektywa: UCITS jako kontrahent finansowy (FC) w UE. Kolumna „Obowiązek clearingu” dotyczy kontrahentów powyżej progów clearingowych.</p>' +
      '<div class="filters"><input type="search" id="mq" placeholder="Filtruj instrument…" value="' + esc(mx.q) + '">' +
        '<select id="mm"><option value="all">Wszystkie rynki</option><option value="exchange">Exchange-Traded</option><option value="otc">OTC</option></select></div>' +
      '<div class="matrix-wrap"><table class="data-table"><thead><tr><th>Instrument</th>' + COLS.map(function (c) { return '<th>' + esc(c.t) + '</th>'; }).join("") + '</tr></thead><tbody id="mb"></tbody></table></div>' +
      '<p class="legend">SSR — rozporządzenie 236/2012 (zgłoszenie od 0,1%, publikacja od 0,5% kapitału). TD — dyrektywa 2004/109/WE (progi 5, 10, 15, 20, 25, 30, 50 i 75%; w Polsce 5, 10, 15, 20, 25, 33, 33⅓, 50, 75 i 90%). EMIR — raport do T+1 dla wszystkich derywatów, także giełdowych.</p></article>';
    document.getElementById("mm").value = mx.market;
    document.getElementById("mq").addEventListener("input", function () { mx.q = this.value; rows(); });
    document.getElementById("mm").addEventListener("change", function () { mx.market = this.value; rows(); });
    rows();
    function rows() {
      var q = KB.norm(mx.q.trim());
      document.getElementById("mb").innerHTML = MATRIX.filter(function (r) {
        var x = KB.instrument(r[0]);
        if (!x) return false;
        if (mx.market !== "all" && x.market !== mx.market) return false;
        return !q || KB.norm(x.name + " " + (x.aliases || []).join(" ")).indexOf(q) !== -1;
      }).map(function (r) {
        var x = KB.instrument(r[0]);
        return '<tr><th scope="row"><a href="#/i/' + x.id + '">' + esc(x.name) + '</a><span class="cell-note">' + KB.MARKETS[x.market].tag + '</span></th>' +
          r.slice(1).map(function (v) { return '<td>' + mcell(v) + '</td>'; }).join("") + '</tr>';
      }).join("");
    }
  }

  /* ---------- Limity ---------- */

  function renderLimits() {
    KB.title("Tabela limitów");
    app.innerHTML = '<article class="page">' + crumbs("Tabela limitów") + '<h1>Tabela limitów</h1>' +
      '<p class="intro">Limity z prawa UE w jednym miejscu. Prospekt może ustalać limity ostrzejsze — wtedy one obowiązują. Kalkulator testu 5/10/40 znajdziesz w <a href="#/tools">kalkulatorach</a>.</p>' +
      LIMITS.map(function (g) {
        return '<section class="block"><h2>' + esc(g.title) + '</h2>' + (g.intro ? '<p>' + esc(g.intro) + '</p>' : '') +
          '<div class="matrix-wrap" style="max-height:none"><table class="data-table"><thead><tr><th>Przepis</th><th>Limit</th><th>Czego dotyczy</th><th>Uwagi</th></tr></thead><tbody>' +
          g.rows.map(function (r) { return '<tr><td>' + esc(r[0]) + '</td><td><strong>' + esc(r[1]) + '</strong></td><td>' + esc(r[2]) + '</td><td>' + esc(r[3]) + '</td></tr>'; }).join("") +
          '</tbody></table></div></section>';
      }).join("") + '</article>';
  }

  /* ---------- Studia przypadków ---------- */

  function renderCases() {
    KB.title("Studia przypadków");
    app.innerHTML = '<article class="page">' + crumbs("Studia przypadków") + '<h1>Studia przypadków</h1>' +
      '<p class="intro">Spróbuj rozwiązać samodzielnie, zanim otworzysz rozwiązanie. Liczby są hipotetyczne.</p>' +
      CASES.map(function (c, i) {
        return '<section class="case" id="case-' + c.id + '"><p class="quiz-meta"><span>Przypadek ' + (i + 1) + '</span>' + KB.levelBadge(c.level, "pl") + '</p>' +
          '<h2>' + esc(c.title) + '</h2>' + c.situation + '<p><strong>Pytanie:</strong> ' + esc(c.question) + '</p>' +
          '<details><summary>Pokaż rozwiązanie</summary>' + c.solution + (c.cards && c.cards.length ? '<p class="related"><strong>Karty:</strong> ' + cardLinks(c.cards) + '</p>' : '') + '</details></section>';
      }).join("") + '</article>';
  }

  /* ---------- Zmiany w przepisach ---------- */

  function fmt(d) { var p = d.split("-"); return p[2] + "." + p[1] + "." + p[0]; }
  function renderChanges() {
    KB.title("Zmiany w przepisach");
    var t = today();
    var list = CHANGES.slice().sort(function (a, b) { return a.date.localeCompare(b.date); });
    app.innerHTML = '<article class="page">' + crumbs("Zmiany w przepisach") + '<h1>Zmiany w przepisach</h1>' +
      '<p class="intro">Najważniejsze daty dla post-trade compliance funduszy. Status liczony względem dzisiejszej daty (' + fmt(t) + '). Stan wiedzy: ' + esc(KB.REVIEWED) + '.</p>' +
      '<ol class="timeline">' + list.map(function (c) {
        var future = c.date > t;
        var st = c.ended ? ["wygasle", "zakończone"] : future ? ["wkrotce", "wkrótce"] : ["obowiazuje", "obowiązuje"];
        var law = KB.LAW[c.law] ? (KB.LAW[c.law].url ? '<a href="' + esc(KB.LAW[c.law].url) + '" target="_blank" rel="noopener">' + esc(KB.LAW[c.law].label) + '</a>' : esc(KB.LAW[c.law].label)) : esc(c.law || "");
        return '<li class="' + (future ? "future" : "done") + '"><span class="tl-date">' + fmt(c.date) + '</span> <span class="status ' + st[0] + '">' + st[1] + '</span>' +
          '<span class="tl-title">' + esc(c.title) + '</span><p>' + esc(c.text) + '</p>' +
          '<p class="cell-note">' + law + (c.cards && c.cards.length ? ' · ' + cardLinks(c.cards) : '') + '</p></li>';
      }).join("") + '</ol></article>';
  }

  KB.route(/^#\/compliance\/?$/, renderHub);
  KB.route(/^#\/compliance\/decision/, renderDecision);
  KB.route(/^#\/compliance\/matrix/, renderMatrix);
  KB.route(/^#\/compliance\/limits/, renderLimits);
  KB.route(/^#\/compliance\/cases/, renderCases);
  KB.route(/^#\/compliance\/changes/, renderChanges);
})();

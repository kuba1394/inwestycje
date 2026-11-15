/*
 * Moduł „Nauka”: hub, ścieżka nauki, lista podstaw, słownik, fiszki, quizy, porównania, lekcje z historii.
 */
(function () {
  "use strict";
  var KB = window.KB, esc = KB.esc, app = KB.app;
  var QUIZ = window.QUIZ || [], PATH = window.PATH || [], COMPARE = window.COMPARE || [], HISTORY = window.HISTORY || [];

  /* ---------- Postęp ---------- */

  function quizScores() { return KB.store.get("kb.quiz", {}); }
  function quizPassed(id) { var s = quizScores()[id]; return !!(s && s.best >= 0.7); }
  KB.visited = function (h) { return !!KB.store.get("kb.visited", {})[h]; };
  window.addEventListener("hashchange", function () {
    var h = location.hash;
    if (/^#\/(compliance|tools|learn)\//.test(h)) {
      var v = KB.store.get("kb.visited", {}); v[h.split("?")[0]] = 1; KB.store.set("kb.visited", v);
    }
  });

  function itemInfo(it) {
    if (it.t === "basic") {
      var b = KB.basic(it.id);
      return { href: "#/basics/" + it.id, label: b ? b.title.pl : it.id, kind: "Podstawy", done: KB.isRead("basic:" + it.id) };
    }
    if (it.t === "card") {
      var x = KB.instrument(it.id);
      return { href: "#/i/" + it.id, label: x ? x.name : it.id, kind: "Karta", done: KB.isRead(it.id) };
    }
    if (it.t === "quiz") {
      var q = QUIZ.filter(function (s) { return s.id === it.id; })[0];
      return { href: "#/learn/quiz/" + it.id, label: "Quiz: " + (q ? q.title : it.id), kind: "Quiz", done: quizPassed(it.id) };
    }
    return { href: it.id, label: it.label || it.id, kind: "Strona", done: KB.visited(it.id) };
  }

  function pathProgress() {
    var all = 0, done = 0;
    PATH.forEach(function (st) { st.items.forEach(function (it) { all++; if (itemInfo(it).done) done++; }); });
    return { all: all, done: done };
  }

  function bar(done, all) {
    var pct = all ? Math.round(done / all * 100) : 0;
    return '<div class="progress" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><span style="width:' + pct + '%"></span></div>' +
      '<p class="progress-label">' + done + ' z ' + all + ' (' + pct + '%)</p>';
  }

  /* ---------- Hub ---------- */

  function renderHub() {
    KB.title("Nauka");
    var p = pathProgress();
    var basicsRead = KB.BASICS.filter(function (b) { return KB.isRead("basic:" + b.id); }).length;
    var tiles = [
      ["#/learn/path", "Ścieżka nauki", "6 etapów od podstaw do derywatów OTC i compliance. Postęp: " + p.done + "/" + p.all + "."],
      ["#/basics", "Podstawy pojęć", KB.BASICS.length + " stron (PL/EN): duration, dźwignia, CCP, zabezpieczenia, ekspozycja. Przeczytane: " + basicsRead + "."],
      ["#/learn/glossary", "Słownik PL ↔ EN", KB.glossary().length + " haseł ze wszystkich kart, z wyszukiwarką."],
      ["#/learn/flashcards", "Fiszki", "Powtarzaj hasła ze słownika; zapamiętane odkładasz na bok."],
      ["#/learn/quiz", "Quizy", QUIZ.length + " zestawów pytań z wyjaśnieniami i test losowy."],
      ["#/learn/compare", "Porównania", COMPARE.length + " tabel: ETF/ETN/ETC, typy derywatów, SFT, instrumenty pieniężne."],
      ["#/learn/history", "Lekcje z historii", HISTORY.length + " kryzysów, które ukształtowały dzisiejsze przepisy."]
    ];
    app.innerHTML = '<article class="page"><h1>Nauka</h1>' +
      '<p class="intro">Jeżeli dopiero zaczynasz, idź <a href="#/learn/path">ścieżką nauki</a> — prowadzi przez podstawy, karty instrumentów i quizy w kolejności, w której pojęcia na siebie nachodzą. Postęp zapisuje się w tej przeglądarce.</p>' +
      '<div class="tiles">' + tiles.map(function (t) { return '<a class="tile" href="' + t[0] + '"><h3>' + t[1] + '</h3><p>' + esc(t[2]) + '</p></a>'; }).join("") + '</div>' +
      '</article>';
  }

  /* ---------- Ścieżka ---------- */

  function renderPath() {
    KB.title("Ścieżka nauki");
    var p = pathProgress();
    var html = '<article class="page"><nav class="crumbs"><a href="#/learn">Nauka</a><span>/</span><span>Ścieżka nauki</span></nav>' +
      '<h1>Ścieżka nauki</h1><p class="intro">Każdy etap kończy się quizem — zaliczasz go wynikiem co najmniej 70%. Karty i podstawy oznaczasz jako przeczytane przyciskiem na dole strony.</p>' +
      bar(p.done, p.all);
    PATH.forEach(function (st, i) {
      var infos = st.items.map(itemInfo);
      var d = infos.filter(function (x) { return x.done; }).length;
      html += '<section class="stage' + (d === infos.length ? ' complete' : '') + '">' +
        '<header class="stage-head"><div><span class="stage-num">Etap ' + (i + 1) + (d === infos.length ? ' · ukończony ✓' : '') + '</span><h2>' + esc(st.title) + '</h2></div><span class="quiz-meta">' + esc(st.time) + ' · ' + d + '/' + infos.length + '</span></header>' + '<div class="progress"><span style="width:' + Math.round(d / infos.length * 100) + '%"></span></div>' +
        '<p>' + esc(st.intro) + '</p>' +
        '<ul class="items">' + infos.map(function (x) {
          return '<li class="' + (x.done ? 'done' : '') + '"><span class="chk" aria-hidden="true">' + (x.done ? '✓' : '') + '</span><span class="kind">' + x.kind + '</span><a href="' + x.href + '">' + esc(x.label) + '</a></li>';
        }).join("") + '</ul>' +
        '<p class="goals"><strong>Po tym etapie:</strong> ' + esc(st.goals) + '</p>' +
      '</section>';
    });
    html += '<p><button type="button" class="btn-sec" id="reset-progress">Wyzeruj postęp</button></p></article>';
    app.innerHTML = html;
    var rb = document.getElementById("reset-progress"), armed = false;
    rb.addEventListener("click", function () {
      if (!armed) { armed = true; rb.textContent = "Na pewno? Kliknij ponownie, aby usunąć cały postęp"; return; }
      KB.store.set("kb.read", {}); KB.store.set("kb.quiz", {}); KB.store.set("kb.visited", {}); KB.store.set("kb.fc", {});
      renderPath();
    });
  }

  /* ---------- Lista podstaw ---------- */

  function renderBasicsList() {
    KB.title("Podstawy");
    var list = KB.BASICS.slice().sort(function (a, b) { return (a.level - b.level) || a.title.pl.localeCompare(b.title.pl); });
    app.innerHTML = '<article class="page"><nav class="crumbs"><a href="#/learn">Nauka</a><span>/</span><span>Podstawy</span></nav>' +
      '<h1>Podstawy pojęć</h1><p class="intro">Krótkie strony o pojęciach, które pojawiają się na wielu kartach instrumentów. Każda jest po polsku i po angielsku.</p>' +
      '<div class="cards">' + list.map(function (b) {
        var r = KB.isRead("basic:" + b.id);
        return '<a class="card" href="#/basics/' + b.id + '"><span class="card-top"><span class="card-asset">Podstawy · ' + KB.LEVELS[b.level].pl + '</span><span class="dots">' + "●●●".slice(0, b.level) + "○○○".slice(b.level) + '</span></span>' +
          '<h3>' + esc(b.title.pl) + (r ? ' <span class="read-mark">✓</span>' : '') + '</h3><p>' + esc(b.content.pl.summary) + '</p><span class="card-more">Czytaj →</span></a>';
      }).join("") + '</div></article>';
  }

  /* ---------- Słownik ---------- */

  var glossState = { q: "" };
  function srcLink(id) {
    if (KB.instrument(id)) return '<a href="#/i/' + id + '">' + esc(KB.instrument(id).name) + '</a>';
    var b = KB.basic(id); if (b) return '<a href="#/basics/' + id + '">' + esc(b.title.pl) + '</a>';
    return "";
  }
  function renderGlossary() {
    KB.title("Słownik");
    app.innerHTML = '<article class="page"><nav class="crumbs"><a href="#/learn">Nauka</a><span>/</span><span>Słownik</span></nav>' +
      '<h1>Słownik PL ↔ EN</h1><p class="intro">Hasła zebrane ze wszystkich kart i stron podstaw. Na kartach pierwsze wystąpienie hasła jest podkreślone — najedź na nie, aby zobaczyć definicję.</p>' +
      '<div class="controls"><label class="search"><span class="sr-only">Szukaj w słowniku</span><input id="gq" type="search" placeholder="Szukaj hasła po polsku lub po angielsku…" value="' + esc(glossState.q) + '"></label></div>' +
      '<p class="letters" id="letters"></p><div id="gl"></div></article>';
    var inp = document.getElementById("gq");
    inp.addEventListener("input", function () { glossState.q = inp.value; list(); });
    list();
    function list() {
      var q = KB.norm(glossState.q.trim());
      var items = KB.glossary().filter(function (e) {
        return !q || KB.norm(e.term + " " + e.termPl + " " + KB.strip(e.defPl) + " " + KB.strip(e.defEn)).indexOf(q) !== -1;
      });
      var groups = {};
      items.forEach(function (e) { var l = e.term.charAt(0).toUpperCase(); if (!/[A-Z]/.test(l)) l = "#"; (groups[l] = groups[l] || []).push(e); });
      var letters = Object.keys(groups).sort();
      document.getElementById("letters").innerHTML = letters.map(function (l) { return '<a href="#gl-' + l + '" data-jump="gl-' + l + '">' + l + '</a>'; }).join(" ") + ' <span class="count">' + items.length + ' haseł</span>';
      document.getElementById("gl").innerHTML = letters.map(function (l) {
        return '<h2 id="gl-' + l + '">' + l + '</h2>' + groups[l].map(function (e) {
          return '<dl class="gl-entry"><dt>' + esc(e.term) + (e.termPl && KB.norm(e.termPl) !== KB.norm(e.term) ? ' <span class="pl-name">· ' + esc(e.termPl) + '</span>' : '') + '</dt>' +
            '<dd lang="pl">' + e.defPl + '</dd>' + (e.defEn && e.defEn !== e.defPl ? '<dd lang="en"><em>EN:</em> ' + e.defEn + '</dd>' : '') +
            (e.sources.length ? '<p class="gl-src">Występuje: ' + e.sources.map(srcLink).filter(Boolean).join(", ") + '</p>' : '') + '</dl>';
        }).join("");
      }).join("") || '<p class="empty">Brak haseł.</p>';
      KB.each("[data-jump]", function (a) {
        a.addEventListener("click", function (ev) { ev.preventDefault(); var el = document.getElementById(a.getAttribute("data-jump")); if (el) el.scrollIntoView({ behavior: "smooth" }); });
      });
    }
  }

  /* ---------- Fiszki ---------- */

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  var fc = null;
  function renderFlashcards() {
    KB.title("Fiszki");
    var known = KB.store.get("kb.fc", {});
    if (!fc) fc = { deck: [], i: 0, flipped: false, lang: "pl", source: "all" };
    function build() {
      var all = KB.glossary().filter(function (e) {
        if (known[e.term]) return false;
        if (fc.source === "all") return true;
        if (fc.source === "extra") return !e.sources.length;
        return e.sources.some(function (s) { return fc.source === "basics" ? !!KB.basic(s) : !!KB.instrument(s) && KB.instrument(s).market === fc.source; });
      });
      fc.deck = shuffle(all); fc.i = 0; fc.flipped = false;
    }
    if (!fc.deck.length) build();
    draw();
    function draw() {
      known = KB.store.get("kb.fc", {});
      var e = fc.deck[fc.i];
      var total = KB.glossary().length, knownN = Object.keys(known).length;
      app.innerHTML = '<article class="page"><nav class="crumbs"><a href="#/learn">Nauka</a><span>/</span><span>Fiszki</span></nav>' +
        '<h1>Fiszki</h1><p class="intro">Na przodzie hasło po angielsku, na odwrocie definicja. Kliknij kartę, aby ją odwrócić. „Znam” odkłada hasło na stałe (do wyzerowania).</p>' +
        '<div class="filters"><label>Zestaw: <select id="fc-src">' +
          [["all", "Wszystkie hasła"], ["exchange", "Karty Exchange-Traded"], ["otc", "Karty OTC"], ["basics", "Podstawy"], ["extra", "Pojęcia ogólne"]].map(function (o) {
            return '<option value="' + o[0] + '"' + (fc.source === o[0] ? ' selected' : '') + '>' + o[1] + '</option>';
          }).join("") + '</select></label> ' +
          '<label>Definicja: <select id="fc-lang"><option value="pl"' + (fc.lang === "pl" ? " selected" : "") + '>po polsku</option><option value="en"' + (fc.lang === "en" ? " selected" : "") + '>po angielsku</option></select></label></div>' +
        (e ? '<button type="button" class="flashcard' + (fc.flipped ? ' flipped' : '') + '" id="card" aria-live="polite"><span class="flashcard-inner">' +
          '<span class="fc-face front"><span class="fc-term">' + esc(e.term) + '</span>' + (e.termPl && KB.norm(e.termPl) !== KB.norm(e.term) ? '<span class="fc-hint">' + esc(e.termPl) + '</span>' : '') + '<span class="fc-hint">kliknij, aby odwrócić</span></span>' +
          '<span class="fc-face back"><span class="fc-def">' + esc(KB.strip(fc.lang === "en" ? e.defEn : e.defPl)) + '</span></span>' +
          '</span></button>' +
          '<div class="fc-controls"><button type="button" class="btn-sec" id="fc-again">Jeszcze raz</button><button type="button" class="btn" id="fc-known">Znam ✓</button></div>'
          : '<p class="empty">Wszystkie hasła z tego zestawu oznaczone jako znane. Zmień zestaw albo wyzeruj fiszki.</p>') +
        '<p class="fc-stats">Karta ' + (e ? fc.i + 1 : 0) + ' z ' + fc.deck.length + ' w talii · znane: ' + knownN + ' z ' + total + ' · <button type="button" class="linklike" id="fc-reset">wyzeruj znane</button></p>' +
        '</article>';
      var card = document.getElementById("card");
      if (card) card.addEventListener("click", function () { fc.flipped = !fc.flipped; card.classList.toggle("flipped", fc.flipped); });
      bind("fc-again", function () { var c = fc.deck.splice(fc.i, 1)[0]; fc.deck.push(c); if (fc.i >= fc.deck.length) fc.i = 0; fc.flipped = false; draw(); });
      bind("fc-known", function () { var k = KB.store.get("kb.fc", {}); k[e.term] = 1; KB.store.set("kb.fc", k); fc.deck.splice(fc.i, 1); if (fc.i >= fc.deck.length) fc.i = 0; fc.flipped = false; draw(); });
      bind("fc-reset", function () { KB.store.set("kb.fc", {}); known = {}; build(); draw(); });
      document.getElementById("fc-src").addEventListener("change", function () { fc.source = this.value; build(); draw(); });
      document.getElementById("fc-lang").addEventListener("change", function () { fc.lang = this.value; draw(); });
    }
  }
  function bind(id, fn) { var el = document.getElementById(id); if (el) el.addEventListener("click", fn); }

  /* ---------- Quizy ---------- */

  function pct(x) { return Math.round(x * 100) + "%"; }

  function renderQuizList() {
    KB.title("Quizy");
    var sc = quizScores();
    function item(s) {
      var r = sc[s.id];
      return '<a class="set-item" href="#/learn/quiz/' + s.id + '"><span>' + esc(s.title) + '</span><small>' + s.questions.length + ' pyt.' +
        (r ? ' · ' + pct(r.best) + (r.best >= 0.7 ? ' ✓' : '') : '') + '</small></a>';
    }
    var topics = QUIZ.filter(function (s) { return s.kind === "topic"; });
    var cards = QUIZ.filter(function (s) { return s.kind === "card"; }).sort(function (a, b) { return a.title.localeCompare(b.title); });
    var total = QUIZ.reduce(function (n, s) { return n + s.questions.length; }, 0);
    app.innerHTML = '<article class="page"><nav class="crumbs"><a href="#/learn">Nauka</a><span>/</span><span>Quizy</span></nav>' +
      '<h1>Quizy</h1><p class="intro">Każde pytanie ma wyjaśnienie. Zestaw uznaje się za zaliczony przy wyniku co najmniej 70%. Łącznie ' + total + ' pytań.</p>' +
      '<div class="calc-box"><h2>Test losowy</h2><p>Pytania ze wszystkich zestawów w losowej kolejności.</p>' +
        '<p>' + [10, 20, 40].map(function (n) { return '<a class="btn" href="#/learn/quiz/random-' + n + '">' + n + ' pytań</a>'; }).join(" ") + '</p></div>' +
      '<h2>Tematy</h2><div class="set-list">' + topics.map(item).join("") + '</div>' +
      '<h2>Karty instrumentów</h2><div class="set-list">' + cards.map(item).join("") + '</div></article>';
  }

  function renderQuiz(id) {
    var set, rnd = id.match(/^random-(\d+)$/);
    if (rnd) {
      var pool = [];
      QUIZ.forEach(function (s) { s.questions.forEach(function (q) { pool.push(Object.assign({ from: s.title }, q)); }); });
      set = { id: id, title: "Test losowy", questions: shuffle(pool).slice(0, +rnd[1]) };
    } else {
      set = QUIZ.filter(function (s) { return s.id === id; })[0];
    }
    if (!set) { app.innerHTML = '<p class="empty">Nie ma takiego quizu. <a href="#/learn/quiz">Lista quizów</a>.</p>'; return; }
    KB.title("Quiz: " + set.title);
    var st = { i: 0, correct: 0, answered: false };
    var backLink = KB.instrument(set.id) ? '<a href="#/i/' + set.id + '">Wróć do karty</a>' : '<a href="#/learn/quiz">Wszystkie quizy</a>';
    draw();
    function draw() {
      var head = '<article class="page"><nav class="crumbs"><a href="#/learn">Nauka</a><span>/</span><a href="#/learn/quiz">Quizy</a><span>/</span><span>' + esc(set.title) + '</span></nav><h1>' + esc(set.title) + '</h1>';
      if (st.i >= set.questions.length) {
        var score = st.correct / set.questions.length;
        var all = quizScores(), prev = all[set.id];
        if (!rnd) { all[set.id] = { best: Math.max(score, prev ? prev.best : 0), last: score, date: new Date().toISOString().slice(0, 10) }; KB.store.set("kb.quiz", all); }
        app.innerHTML = head + '<div class="calc-box"><p class="score-big">' + st.correct + ' / ' + set.questions.length + '</p><p>' + pct(score) + ' — ' +
          (score >= 0.9 ? "Świetnie." : score >= 0.7 ? "Zaliczone." : "Warto wrócić do materiału i spróbować ponownie.") + '</p>' +
          '<p><a class="btn" href="#/learn/quiz/' + set.id + '" id="again">Jeszcze raz</a> ' + backLink + '</p></div></article>';
        bind("again", function (e) { e.preventDefault(); renderQuiz(id); });
        return;
      }
      var q = set.questions[st.i];
      app.innerHTML = head + '<p class="quiz-meta"><span>Pytanie ' + (st.i + 1) + ' z ' + set.questions.length + (q.from ? ' · ' + esc(q.from) : '') + '</span><span>poprawne: ' + st.correct + '</span></p>' +
        '<p class="quiz-q">' + esc(q.q) + '</p><div class="quiz-opts">' +
        q.o.map(function (o, k) { return '<button type="button" class="quiz-opt" data-k="' + k + '">' + esc(o) + '</button>'; }).join("") +
        '</div><div id="exp"></div></article>';
      KB.each(".quiz-opt", function (b) {
        b.addEventListener("click", function () {
          if (st.answered) return;
          st.answered = true;
          var k = +b.getAttribute("data-k"), ok = k === q.a;
          if (ok) st.correct++;
          KB.each(".quiz-opt", function (x) {
            var kk = +x.getAttribute("data-k");
            if (kk === q.a) x.classList.add("correct"); else if (kk === k) x.classList.add("wrong");
            x.disabled = true;
          });
          document.getElementById("exp").innerHTML = '<p class="quiz-exp"><strong>' + (ok ? "Dobrze." : "Niestety nie.") + '</strong> ' + esc(q.e) + '</p>' +
            '<p><button type="button" class="btn" id="next">' + (st.i + 1 < set.questions.length ? "Dalej →" : "Wynik") + '</button></p>';
          bind("next", function () { st.i++; st.answered = false; draw(); });
        });
      });
    }
  }

  /* ---------- Porównania ---------- */

  function cell(v) {
    return esc(v).replace(/\b([a-z]+(?:-[a-z]+)+)\b/g, function (m) { return KB.instrument(m) ? '<a href="#/i/' + m + '">' + esc(KB.instrument(m).name) + '</a>' : m; });
  }
  function renderCompare() {
    KB.title("Porównania");
    app.innerHTML = '<article class="page"><nav class="crumbs"><a href="#/learn">Nauka</a><span>/</span><span>Porównania</span></nav>' +
      '<h1>Porównania instrumentów</h1><p class="intro">Instrumenty, które łatwo pomylić, zestawione obok siebie — z naciskiem na różnice ważne w compliance.</p>' +
      '<p class="toc-inline">' + COMPARE.map(function (c) { return '<a href="#cmp-' + c.id + '" data-jump="cmp-' + c.id + '">' + esc(c.title) + '</a>'; }).join(" · ") + '</p>' +
      COMPARE.map(function (c) {
        return '<section class="block" id="cmp-' + c.id + '"><h2>' + esc(c.title) + '</h2><p>' + esc(c.intro) + '</p><div class="matrix-wrap"><table class="data-table"><thead><tr><th></th>' +
          c.cols.map(function (col) { var x = KB.instrument(col); return '<th>' + (x ? '<a href="#/i/' + col + '">' + esc(x.name) + '</a>' : esc(col)) + '</th>'; }).join("") + '</tr></thead><tbody>' +
          c.rows.map(function (r) { return '<tr><th scope="row">' + esc(r[0]) + '</th>' + r.slice(1).map(function (v) { return '<td>' + cell(v) + '</td>'; }).join("") + '</tr>'; }).join("") +
          '</tbody></table></div>' + (c.note ? '<p class="cell-note">' + esc(c.note) + '</p>' : '') + '</section>';
      }).join("") + '</article>';
    KB.each("[data-jump]", function (a) {
      a.addEventListener("click", function (ev) { ev.preventDefault(); var el = document.getElementById(a.getAttribute("data-jump")); if (el) el.scrollIntoView({ behavior: "smooth" }); });
    });
  }

  /* ---------- Historia ---------- */

  function renderHistory() {
    KB.title("Lekcje z historii");
    app.innerHTML = '<article class="page"><nav class="crumbs"><a href="#/learn">Nauka</a><span>/</span><span>Lekcje z historii</span></nav>' +
      '<h1>Lekcje z historii</h1><p class="intro">Większość przepisów, które stosujesz w compliance, powstała po konkretnym kryzysie. Znając historię, łatwiej zrozumieć, po co jest dany limit lub raport.</p>' +
      HISTORY.map(function (h) {
        var links = (h.cards || []).concat(h.basics || []).map(function (id) { return KB.link(id); }).join(" · ");
        return '<section class="lesson block" id="h-' + h.id + '"><p class="when">' + esc(h.date) + '</p><h2>' + esc(h.title) + '</h2>' +
          '<h3>Co się stało</h3><p>' + esc(h.what) + '</p>' +
          '<h3>Mechanizm</h3><p>' + esc(h.how) + '</p>' +
          '<h3>Lekcja dla compliance</h3><p>' + esc(h.lesson) + '</p>' +
          '<h3>Co zmieniło się w przepisach</h3><p>' + esc(h.changed) + '</p>' +
          (links ? '<p class="related"><strong>Zobacz:</strong> ' + links + '</p>' : '') + '</section>';
      }).join("") + '</article>';
  }

  /* ---------- Trasy ---------- */

  KB.route(/^#\/learn\/?$/, renderHub);
  KB.route(/^#\/learn\/path/, renderPath);
  KB.route(/^#\/basics\/?$/, renderBasicsList);
  KB.route(/^#\/learn\/glossary/, renderGlossary);
  KB.route(/^#\/learn\/flashcards/, renderFlashcards);
  KB.route(/^#\/learn\/quiz\/([\w-]+)/, renderQuiz);
  KB.route(/^#\/learn\/quiz\/?$/, renderQuizList);
  KB.route(/^#\/learn\/compare/, renderCompare);
  KB.route(/^#\/learn\/history/, renderHistory);
})();

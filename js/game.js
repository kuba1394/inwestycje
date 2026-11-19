/*
 * Gra: „Instrumentarium”. Tryby pytań generowane z danych kart (opisy, rodziny, rynek, kody security type),
 * punkty doświadczenia (XP), poziomy, seria dni, combo, mapa opanowania 68 instrumentów, odznaki.
 * Stan zapisuje się w przeglądarce (localStorage, klucz "kb.game").
 */
(function () {
  "use strict";
  var KB = window.KB, esc = KB.esc, app = KB.app;
  var KEY = "kb.game";
  var MASTER = 3; // tyle poprawnych odpowiedzi z rzędu = instrument opanowany

  /* ---------- Stan ---------- */
  function today() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function load() {
    var s = KB.store.get(KEY, null) || {};
    s.xp = s.xp || 0; s.m = s.m || {}; s.days = s.days || []; s.best = s.best || {}; s.badges = s.badges || {}; s.answers = s.answers || 0; s.correct = s.correct || 0;
    s.daily = s.daily || { date: "", n: 0 };
    return s;
  }
  function save(s) { KB.store.set(KEY, s); }
  var S = load();

  var LEVELS = [
    [0, "Praktykant"], [100, "Młodszy analityk"], [300, "Analityk"], [600, "Starszy analityk"],
    [1000, "Specjalista compliance"], [1600, "Ekspert"], [2500, "Mistrz instrumentów"], [4000, "Legenda post-trade"]
  ];
  function levelOf(xp) {
    var i = 0; while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1][0]) i++;
    var next = LEVELS[i + 1];
    return { n: i + 1, name: LEVELS[i][1], from: LEVELS[i][0], to: next ? next[0] : null };
  }
  function streak() {
    var set = {}; S.days.forEach(function (d) { set[d] = 1; });
    var d = new Date(), n = 0;
    if (!set[today()]) d.setDate(d.getDate() - 1); // seria trwa, jeśli wczoraj grano, a dziś jeszcze nie
    while (true) {
      var k = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
      if (!set[k]) break; n++; d.setDate(d.getDate() - 1);
    }
    return n;
  }
  var DAILY_GOAL = 20;

  /* ---------- Dane ---------- */
  function groups() { return KB.OVERVIEW_GROUPS || []; }
  function groupOf(id) { return groups().filter(function (g) { return g.ids.indexOf(id) !== -1; })[0]; }
  function all() { return KB.INSTRUMENTS.slice(); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function mastery(id) { return S.m[id] || { c: 0, w: 0, s: 0 }; }
  function isMastered(id) { return mastery(id).s >= MASTER; }

  // Wybór instrumentu: częściej te nieopanowane i z błędami (prosta powtórka rozłożona w czasie)
  function weightedPick(list) {
    var w = list.map(function (x) { var m = mastery(x.id); return isMastered(x.id) ? 1 : 3 + Math.min(m.w, 4) * 2; });
    var sum = w.reduce(function (a, b) { return a + b; }, 0), r = Math.random() * sum;
    for (var i = 0; i < list.length; i++) { r -= w[i]; if (r <= 0) return list[i]; }
    return list[list.length - 1];
  }
  function mask(text, x) {
    var words = [x.name].concat(x.aliases || []).filter(function (w) { return w && w.length >= 3; })
      .sort(function (a, b) { return b.length - a.length; });
    words.forEach(function (w) {
      var re = new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      text = text.replace(re, "▢▢▢");
    });
    return text;
  }
  function distractors(x, n, sameGroupFirst) {
    var g = groupOf(x.id), pool = all().filter(function (y) { return y.id !== x.id; });
    var same = shuffle(pool.filter(function (y) { return g && g.ids.indexOf(y.id) !== -1; }));
    var other = shuffle(pool.filter(function (y) { return !(g && g.ids.indexOf(y.id) !== -1); }));
    return (sameGroupFirst ? same.concat(other) : shuffle(pool)).slice(0, n);
  }

  /* ---------- Generatory pytań ---------- */
  var MODES = {
    what: { name: "Co to jest?", icon: "🔎", desc: "Czytasz krótki opis — wybierasz instrument. Rozpraszacze są z tej samej rodziny.",
      make: function () {
        var x = weightedPick(all()), m = KB.meta(x.id);
        var opts = shuffle([x].concat(distractors(x, 3, true)));
        return { id: x.id, prompt: mask(m.tldr ? m.tldr.pl : x.content.pl.summary, x), kind: "Opis", options: opts.map(function (o) { return o.name; }), answer: opts.indexOf(x), explain: x.name + " — " + (m.tldr ? m.tldr.pl : "") };
      } },
    family: { name: "Do jakiej rodziny?", icon: "🗂️", desc: "Przypisz instrument do rodziny z zakładki Przegląd.",
      make: function () {
        var x = weightedPick(all()), g = groupOf(x.id);
        var others = shuffle(groups().filter(function (h) { return h !== g; })).slice(0, 3);
        var opts = shuffle([g].concat(others));
        return { id: x.id, prompt: x.name, kind: "Instrument", options: opts.map(function (o) { return o.pl; }), answer: opts.indexOf(g), explain: g.pl + ": " + g.dpl };
      } },
    market: { name: "Giełda czy OTC?", icon: "⚖️", desc: "Szybka decyzja: gdzie zawiera się ten instrument.",
      make: function () {
        var x = weightedPick(all());
        return { id: x.id, prompt: x.name, kind: "Instrument", options: ["Exchange-Traded", "OTC"], answer: x.market === "exchange" ? 0 : 1,
          explain: x.name + " — " + KB.MARKETS[x.market].tag + ". " + (KB.meta(x.id).tldr ? KB.meta(x.id).tldr.pl : "") };
      } },
    code: { name: "Kod z aplikacji", icon: "🏷️", desc: "Widzisz security type code z aplikacji — wskaż, która karta go opisuje.",
      make: function () {
        var codes = KB.SECTYPES.filter(function (c) { return c.card && KB.instrument(c.card); });
        var c = pick(codes), x = KB.instrument(c.card);
        var opts = shuffle([x].concat(distractors(x, 3, true)));
        return { id: x.id, prompt: c.code, sub: c.name, kind: "Security type", options: opts.map(function (o) { return o.name; }), answer: opts.indexOf(x),
          explain: c.code + " (" + c.name + ") → " + x.name + (c.note ? ". " + c.note : "") };
      } },
    reverse: { name: "Który opis pasuje?", icon: "🧩", desc: "Masz nazwę — wybierz właściwy opis spośród czterech.",
      make: function () {
        var x = weightedPick(all());
        var opts = shuffle([x].concat(distractors(x, 3, true)));
        return { id: x.id, prompt: x.name, kind: "Instrument", long: true,
          options: opts.map(function (o) { var m = KB.meta(o.id); return mask(m.tldr ? m.tldr.pl : o.content.pl.summary, o); }),
          answer: opts.indexOf(x), explain: "" };
      } }
  };
  function mixed() { var k = Object.keys(MODES); return MODES[pick(k)].make(); }

  /* ---------- Odznaki ---------- */
  var BADGES = [
    { id: "first", icon: "🌱", name: "Pierwszy krok", desc: "Pierwsza poprawna odpowiedź.", test: function () { return S.correct >= 1; } },
    { id: "combo10", icon: "🔥", name: "Combo 10", desc: "10 poprawnych odpowiedzi z rzędu.", test: function (ctx) { return ctx && ctx.combo >= 10; } },
    { id: "sprint15", icon: "⚡", name: "Sprinter", desc: "15 punktów w jednym sprincie 60 s.", test: function (ctx) { return ctx && ctx.sprint >= 15; } },
    { id: "m10", icon: "🎓", name: "10 opanowanych", desc: "Opanuj 10 instrumentów.", test: function () { return masteredCount() >= 10; } },
    { id: "m34", icon: "🏅", name: "Połowa drogi", desc: "Opanuj połowę instrumentów.", test: function () { return masteredCount() >= Math.ceil(KB.INSTRUMENTS.length / 2); } },
    { id: "mall", icon: "🏆", name: "Wszystkie instrumenty", desc: "Opanuj wszystkie instrumenty.", test: function () { return masteredCount() >= KB.INSTRUMENTS.length; } },
    { id: "family", icon: "🗂️", name: "Rodzina w komplecie", desc: "Opanuj wszystkie instrumenty jednej rodziny.", test: function () { return groups().some(function (g) { return g.ids.every(isMastered); }); } },
    { id: "streak3", icon: "📅", name: "3 dni z rzędu", desc: "Graj trzy dni pod rząd.", test: function () { return streak() >= 3; } },
    { id: "streak7", icon: "🗓️", name: "Tydzień nauki", desc: "Graj siedem dni pod rząd.", test: function () { return streak() >= 7; } },
    { id: "daily", icon: "🎯", name: "Cel dnia", desc: "Wykonaj dzienny cel " + DAILY_GOAL + " poprawnych odpowiedzi.", test: function () { return S.daily.date === today() && S.daily.n >= DAILY_GOAL; } }
  ];
  function masteredCount() { return KB.INSTRUMENTS.filter(function (x) { return isMastered(x.id); }).length; }
  function checkBadges(ctx) {
    var got = [];
    BADGES.forEach(function (b) { if (!S.badges[b.id] && b.test(ctx)) { S.badges[b.id] = today(); got.push(b); } });
    return got;
  }

  /* ---------- Rejestracja odpowiedzi ---------- */
  function record(id, ok, combo) {
    var m = mastery(id), wasMastered = m.s >= MASTER, gained = 0;
    S.answers++;
    if (ok) {
      m.c++; m.s++; S.correct++;
      gained = 10 + Math.min(combo, 10) * 2;
      if (!wasMastered && m.s >= MASTER) gained += 25;
      if (S.daily.date !== today()) S.daily = { date: today(), n: 0 };
      S.daily.n++;
      if (S.daily.n === DAILY_GOAL) gained += 50;
    } else { m.w++; m.s = 0; }
    S.m[id] = m; S.xp += gained;
    if (S.days.indexOf(today()) === -1) S.days.push(today());
    save(S);
    return { gained: gained, newlyMastered: !wasMastered && m.s >= MASTER };
  }

  /* ---------- Widoki ---------- */
  function header() {
    var L = levelOf(S.xp), pct = L.to ? Math.round((S.xp - L.from) / (L.to - L.from) * 100) : 100;
    var dn = S.daily.date === today() ? S.daily.n : 0;
    return '<div class="g-stats">' +
      '<div class="g-stat"><span class="g-k">Poziom ' + L.n + '</span><strong>' + esc(L.name) + '</strong><div class="progress"><span style="width:' + pct + '%"></span></div><span class="g-s">' + S.xp + (L.to ? ' / ' + L.to : '') + ' XP</span></div>' +
      '<div class="g-stat"><span class="g-k">Seria</span><strong>🔥 ' + streak() + ' ' + (streak() === 1 ? 'dzień' : 'dni') + '</strong><span class="g-s">graj codziennie, żeby jej nie stracić</span></div>' +
      '<div class="g-stat"><span class="g-k">Cel dnia</span><strong>' + Math.min(dn, DAILY_GOAL) + ' / ' + DAILY_GOAL + '</strong><div class="progress"><span style="width:' + Math.min(100, dn / DAILY_GOAL * 100) + '%"></span></div><span class="g-s">poprawnych odpowiedzi</span></div>' +
      '<div class="g-stat"><span class="g-k">Opanowane</span><strong>' + masteredCount() + ' / ' + KB.INSTRUMENTS.length + '</strong><span class="g-s">' + MASTER + ' poprawne z rzędu = opanowany</span></div>' +
    '</div>';
  }

  function renderHub() {
    KB.title("Gra");
    var modes = Object.keys(MODES).map(function (k) {
      var m = MODES[k];
      return '<a class="g-mode" href="#/game/play/' + k + '"><span class="g-icon">' + m.icon + '</span><strong>' + m.name + '</strong><span>' + m.desc + '</span></a>';
    }).join("");
    var map = groups().map(function (g) {
      return '<div class="g-fam"><span class="g-fam-name">' + esc(g.pl) + '</span><div class="g-tiles">' + g.ids.map(function (id) {
        var x = KB.instrument(id); if (!x) return "";
        var m = mastery(id), lvl = isMastered(id) ? 3 : m.s >= 1 ? Math.min(m.s, 2) : (m.w ? -1 : 0);
        return '<a class="g-tile t' + lvl + '" href="#/i/' + id + '" title="' + esc(x.name) + ' — ' + (isMastered(id) ? 'opanowany' : m.s + '/' + MASTER) + '">' + esc(x.name.replace(/\s*\(.*\)/, "")) + '</a>';
      }).join("") + '</div></div>';
    }).join("");
    var badges = BADGES.map(function (b) {
      var got = S.badges[b.id];
      return '<div class="g-badge' + (got ? ' got' : '') + '" title="' + esc(b.desc) + '"><span>' + b.icon + '</span><strong>' + esc(b.name) + '</strong><small>' + (got ? 'zdobyta ' + got : esc(b.desc)) + '</small></div>';
    }).join("");
    app.innerHTML = '<article class="page wide game">' +
      '<h1>Instrumentarium</h1><p class="intro">Gra, która utrwala wiedzę o wszystkich ' + KB.INSTRUMENTS.length + ' instrumentach. Zbieraj XP, awansuj, utrzymuj serię dni i zapełniaj mapę. Instrumenty, przy których się mylisz, wracają częściej.</p>' +
      header() +
      '<section class="g-sprint"><div><span class="g-k">Tryb wyzwania</span><h2>Sprint 60 sekund</h2><p>Pytania ze wszystkich trybów, combo podbija punkty, błąd kosztuje 3 sekundy. Rekord: <strong>' + (S.best.sprint || 0) + '</strong></p></div><a class="btn" href="#/game/sprint">Start ⚡</a></section>' +
      '<h2>Tryby nauki</h2><div class="g-modes">' + modes + '<a class="g-mode" href="#/game/play/mixed"><span class="g-icon">🎲</span><strong>Mieszany</strong><span>Losowo ze wszystkich trybów — najlepsze na codzienną porcję.</span></a></div>' +
      '<h2>Mapa opanowania</h2><p class="legend"><span class="g-tile t0">nowy</span> <span class="g-tile t-1">pomyłka</span> <span class="g-tile t1">1/3</span> <span class="g-tile t2">2/3</span> <span class="g-tile t3">opanowany</span> — kliknij kafelek, żeby otworzyć kartę.</p>' +
      '<div class="g-map">' + map + '</div>' +
      '<h2>Odznaki</h2><div class="g-badges">' + badges + '</div>' +
      '<p class="cell-note">Postęp jest zapisany tylko w tej przeglądarce. <button type="button" class="linklike" id="g-reset">Wyzeruj grę</button></p>' +
    '</article>';
    var r = document.getElementById("g-reset"), armed = false;
    r.addEventListener("click", function () {
      if (!armed) { armed = true; r.textContent = "Na pewno? Kliknij ponownie, aby usunąć XP, serię i odznaki"; return; }
      KB.store.set(KEY, {}); S = load(); renderHub();
    });
  }

  function toast(html) {
    var t = document.createElement("div"); t.className = "g-toast"; t.innerHTML = html; document.body.appendChild(t);
    setTimeout(function () { t.classList.add("out"); }, 2200); setTimeout(function () { t.remove(); }, 2700);
  }

  /* Gra w trybie nauki (bez limitu czasu) */
  function renderPlay(modeKey) {
    var mode = modeKey === "mixed" ? null : MODES[modeKey];
    if (modeKey !== "mixed" && !mode) { location.hash = "#/game"; return; }
    KB.title("Gra — " + (mode ? mode.name : "Mieszany"));
    var st = { combo: 0, n: 0, ok: 0, q: null, done: false };
    next();
    function next() { st.q = mode ? mode.make() : mixed(); st.done = false; draw(); }
    function draw() {
      var q = st.q;
      app.innerHTML = '<article class="page game">' +
        '<nav class="crumbs"><a href="#/game">Gra</a><span>/</span><span>' + (mode ? mode.name : "Mieszany") + '</span></nav>' +
        header() +
        '<div class="g-card">' +
          '<div class="g-meta"><span>' + esc(q.kind) + '</span><span>Combo: <strong>' + st.combo + '</strong> · ' + st.ok + ' / ' + st.n + '</span></div>' +
          '<p class="g-prompt' + (q.prompt.length > 60 ? ' long' : '') + '">' + esc(q.prompt) + '</p>' + (q.sub ? '<p class="g-sub">' + esc(q.sub) + '</p>' : '') +
          '<div class="quiz-opts g-opts' + (q.long ? ' long' : '') + '">' + q.options.map(function (o, i) { return '<button type="button" class="quiz-opt" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd> ' + esc(o) + '</button>'; }).join("") + '</div>' +
          '<div id="g-exp"></div>' +
        '</div>' +
        '<p class="cell-note">Skróty: klawisze 1–4 wybierają odpowiedź, Enter — dalej.</p></article>';
      KB.each(".g-opts .quiz-opt", function (b) { b.addEventListener("click", function () { answer(+b.getAttribute("data-i")); }); });
    }
    function answer(i) {
      if (st.done) return; st.done = true; st.n++;
      var q = st.q, ok = i === q.answer;
      st.combo = ok ? st.combo + 1 : 0; if (ok) st.ok++;
      var r = record(q.id, ok, st.combo);
      KB.each(".g-opts .quiz-opt", function (b) { var k = +b.getAttribute("data-i"); b.disabled = true; if (k === q.answer) b.classList.add("correct"); else if (k === i) b.classList.add("wrong"); });
      var x = KB.instrument(q.id);
      document.getElementById("g-exp").innerHTML = '<div class="quiz-exp"><strong>' + (ok ? "Dobrze! +" + r.gained + " XP" : "Nie tym razem.") + '</strong> ' +
        (r.newlyMastered ? '<span class="g-new">✨ Opanowany: ' + esc(x.name) + '</span> ' : '') +
        esc(q.explain || (x.name + " — " + (KB.meta(x.id).tldr ? KB.meta(x.id).tldr.pl : ""))) +
        ' <a href="#/i/' + q.id + '">Otwórz kartę</a></div><p><button type="button" class="btn" id="g-next">Dalej →</button></p>';
      document.getElementById("g-next").addEventListener("click", next);
      checkBadges({ combo: st.combo }).forEach(function (b) { toast(b.icon + ' Nowa odznaka: <strong>' + esc(b.name) + '</strong>'); });
      if (st.combo > 0 && st.combo % 5 === 0) toast('🔥 Combo ' + st.combo + '!');
    }
    keyHandler = function (e) {
      if (!/^#\/game\/play/.test(location.hash)) return;
      if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
      var n = parseInt(e.key, 10);
      if (n >= 1 && n <= st.q.options.length && !st.done) answer(n - 1);
      else if (e.key === "Enter" && st.done) next();
    };
  }

  /* Sprint 60 s */
  var timer = null;
  function renderSprint() {
    KB.title("Gra — Sprint 60 s");
    var st = { left: 60, score: 0, combo: 0, maxCombo: 0, n: 0, q: null, over: false, lock: false };
    app.innerHTML = '<article class="page game"><nav class="crumbs"><a href="#/game">Gra</a><span>/</span><span>Sprint 60 s</span></nav>' +
      '<div class="g-sprint-bar"><span>⏱ <strong id="sp-t">60</strong> s</span><span>Punkty: <strong id="sp-s">0</strong></span><span>Combo: <strong id="sp-c">0</strong></span></div>' +
      '<div class="progress g-timer"><span id="sp-bar" style="width:100%"></span></div><div id="sp-q"></div></article>';
    clearInterval(timer);
    timer = setInterval(function () {
      if (!/^#\/game\/sprint/.test(location.hash)) { clearInterval(timer); return; }
      st.left -= 0.1; if (st.left <= 0) { st.left = 0; end(); }
      var t = document.getElementById("sp-t"), b = document.getElementById("sp-bar");
      if (t) t.textContent = Math.ceil(st.left); if (b) b.style.width = (st.left / 60 * 100) + "%";
    }, 100);
    next();
    function next() { if (st.over) return; st.q = mixed(); st.lock = false; draw(); }
    function draw() {
      var q = st.q;
      document.getElementById("sp-q").innerHTML = '<div class="g-card">' +
        '<p class="g-prompt' + (q.prompt.length > 60 ? ' long' : '') + '">' + esc(q.prompt) + '</p>' + (q.sub ? '<p class="g-sub">' + esc(q.sub) + '</p>' : '') +
        '<div class="quiz-opts g-opts' + (q.long ? ' long' : '') + '">' + q.options.map(function (o, i) { return '<button type="button" class="quiz-opt" data-i="' + i + '"><kbd>' + (i + 1) + '</kbd> ' + esc(o) + '</button>'; }).join("") + '</div></div>';
      KB.each("#sp-q .quiz-opt", function (b) { b.addEventListener("click", function () { answer(+b.getAttribute("data-i")); }); });
    }
    function answer(i) {
      if (st.lock || st.over) return; st.lock = true; st.n++;
      var q = st.q, ok = i === q.answer;
      if (ok) { st.combo++; st.maxCombo = Math.max(st.maxCombo, st.combo); st.score += 1 + Math.floor(st.combo / 5); }
      else { st.combo = 0; st.left = Math.max(0, st.left - 3); }
      record(q.id, ok, st.combo);
      KB.each("#sp-q .quiz-opt", function (b) { var k = +b.getAttribute("data-i"); if (k === q.answer) b.classList.add("correct"); else if (k === i) b.classList.add("wrong"); });
      document.getElementById("sp-s").textContent = st.score; document.getElementById("sp-c").textContent = st.combo;
      setTimeout(next, ok ? 350 : 900);
    }
    function end() {
      if (st.over) return; st.over = true; clearInterval(timer);
      var record_ = st.score > (S.best.sprint || 0);
      if (record_) { S.best.sprint = st.score; }
      S.xp += st.score * 5; save(S);
      var got = checkBadges({ sprint: st.score, combo: st.maxCombo });
      document.getElementById("sp-q").innerHTML = '<div class="g-card g-end"><p class="score-big">' + st.score + ' pkt</p>' +
        '<p>' + (record_ ? '🏆 Nowy rekord!' : 'Rekord: ' + (S.best.sprint || 0)) + ' · odpowiedzi: ' + st.n + ' · najdłuższe combo: ' + st.maxCombo + ' · bonus +' + (st.score * 5) + ' XP</p>' +
        (got.length ? '<p>' + got.map(function (b) { return b.icon + ' ' + esc(b.name); }).join(" · ") + '</p>' : '') +
        '<p><a class="btn" href="#/game/sprint" id="sp-again">Jeszcze raz</a> <a class="btn-sec btn" href="#/game">Wróć do gry</a></p></div>';
      document.getElementById("sp-again").addEventListener("click", function (e) { e.preventDefault(); renderSprint(); });
    }
    keyHandler = function (e) {
      if (!/^#\/game\/sprint/.test(location.hash)) return;
      var n = parseInt(e.key, 10);
      if (n >= 1 && st.q && n <= st.q.options.length) answer(n - 1);
    };
  }

  var keyHandler = null;
  document.addEventListener("keydown", function (e) { if (keyHandler) keyHandler(e); });

  KB.route(/^#\/game\/play\/([\w-]+)/, renderPlay);
  KB.route(/^#\/game\/sprint/, renderSprint);
  KB.route(/^#\/game\/?$/, function () { keyHandler = null; renderHub(); });
})();

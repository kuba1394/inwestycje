/*
 * Kalkulatory: test 5/10/40, ekspozycja w metodzie zaangażowania, FX forward, obligacja (cena, duration, DV01),
 * bon skarbowy, opcja (Black-Scholes). Wszystko liczone w przeglądarce.
 */
(function () {
  "use strict";
  var KB = window.KB, esc = KB.esc, app = KB.app;

  function num(id) { var v = document.getElementById(id).value; return parseFloat(String(v).replace(",", ".").replace(/\s/g, "")); }
  function f(x, d) {
    if (!isFinite(x)) return "—";
    return x.toLocaleString("pl-PL", { minimumFractionDigits: d === undefined ? 2 : d, maximumFractionDigits: d === undefined ? 2 : d });
  }
  function pct(x, d) { return f(x * 100, d === undefined ? 2 : d) + "%"; }
  function field(id, label, value, step) {
    return '<label>' + label + '<input id="' + id + '" type="number" step="' + (step || "any") + '" value="' + value + '"></label>';
  }

  var TOOLS = [
    { id: "51040", title: "Test limitów emitenta 5/10/40", desc: "Wpisz pozycje w procentach NAV. Kalkulator sprawdza art. 52 ust. 1–4 dla pojedynczych emitentów." },
    { id: "commitment", title: "Ekspozycja w metodzie zaangażowania", desc: "Suma ekspozycji z derywatów według CESR/10-788 (bez nettingu i hedgingu)." },
    { id: "fxfwd", title: "Kurs terminowy FX (parytet stóp procentowych)", desc: "Kurs forward z kursu spot i stóp procentowych obu walut." },
    { id: "bond", title: "Obligacja: cena, duration, DV01", desc: "Obligacja stałokuponowa w dniu płatności kuponu." },
    { id: "bill", title: "Bon skarbowy: cena i rentowność", desc: "Instrument dyskontowy — oprocentowanie proste." },
    { id: "bs", title: "Opcja europejska: Black-Scholes i delta", desc: "Cena opcji call i put oraz delta, z ciągłą stopą dywidendy." }
  ];

  /* ---------- Matematyka ---------- */

  function ncdf(x) { // dystrybuanta rozkładu normalnego (Abramowitz-Stegun 26.2.17)
    var t = 1 / (1 + 0.2316419 * Math.abs(x));
    var d = 0.3989422804014327 * Math.exp(-x * x / 2);
    var p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return x > 0 ? 1 - p : p;
  }
  KB.calc = {
    fxForward: function (S, rq, rb, days, basis) { return S * (1 + rq * days / basis) / (1 + rb * days / basis); },
    bond: function (c, y, n, freq) {
      freq = freq || 1;
      var cf = c / freq, yy = y / freq, N = Math.round(n * freq), price = 0, mac = 0;
      for (var k = 1; k <= N; k++) {
        var flow = cf * 100 + (k === N ? 100 : 0), pv = flow / Math.pow(1 + yy, k);
        price += pv; mac += (k / freq) * pv;
      }
      mac /= price;
      var mod = mac / (1 + yy);
      return { price: price, mac: mac, mod: mod, dv01: price * mod * 0.0001 };
    },
    bill: function (N, y, days, basis) { return N / (1 + y * days / basis); },
    billYield: function (N, P, days, basis) { return (N / P - 1) * basis / days; },
    bs: function (S, K, T, vol, r, q) {
      var d1 = (Math.log(S / K) + (r - q + vol * vol / 2) * T) / (vol * Math.sqrt(T)), d2 = d1 - vol * Math.sqrt(T);
      return {
        call: S * Math.exp(-q * T) * ncdf(d1) - K * Math.exp(-r * T) * ncdf(d2),
        put: K * Math.exp(-r * T) * ncdf(-d2) - S * Math.exp(-q * T) * ncdf(-d1),
        dCall: Math.exp(-q * T) * ncdf(d1), dPut: Math.exp(-q * T) * (ncdf(d1) - 1), d1: d1, d2: d2
      };
    },
    test51040: function (rows) {
      var bucket = 0, out = rows.map(function (r) {
        var w = r.w / 100, flag = "ok", note = "";
        if (r.type === "gov") { if (w > 0.35) { flag = "bad"; note = "> 35% (art. 52 ust. 3); do 100% tylko przy art. 54"; } else note = "art. 52 ust. 3 — poza koszykiem 40%"; }
        else if (r.type === "cov") {
          if (w > 0.25) { flag = "bad"; note = "> 25% (art. 52 ust. 4)"; } else note = "art. 52 ust. 4";
        } else {
          if (w > 0.10) { flag = "bad"; note = "> 10% (art. 52 ust. 1)"; }
          else if (w > 0.05) { bucket += w; flag = "warn"; note = "> 5% — wchodzi do koszyka 40%"; }
        }
        return { name: r.name, w: w, type: r.type, flag: flag, note: note };
      });
      var cov = rows.filter(function (r) { return r.type === "cov" && r.w > 5; }).reduce(function (s, r) { return s + r.w / 100; }, 0);
      return { rows: out, bucket: bucket, cov: cov };
    }
  };
  var C = KB.calc;

  /* ---------- Widoki ---------- */

  function out(id, html) { document.getElementById(id).innerHTML = html; }
  function live(ids, fn) { ids.forEach(function (i) { var el = document.getElementById(i); if (el) el.addEventListener("input", fn); }); fn(); }

  var builders = {
    "51040": function () {
      var init = [["Emitent A", "std", 9], ["Emitent B", "std", 8], ["Emitent C", "std", 7.5], ["Emitent D", "std", 6.5], ["Emitent E", "std", 6], ["Emitent F", "std", 4], ["Skarb Państwa", "gov", 30], ["Bank H — covered", "cov", 15]];
      function row(r) {
        return '<tr><td><input value="' + esc(r[0]) + '" data-c="name"></td><td><select data-c="type">' +
          [["std", "Standardowy (art. 52 ust. 1)"], ["gov", "Państwo/org. międzynar. (ust. 3)"], ["cov", "Covered bonds (ust. 4)"]].map(function (o) { return '<option value="' + o[0] + '"' + (r[1] === o[0] ? ' selected' : '') + '>' + o[1] + '</option>'; }).join("") +
          '</select></td><td><input type="number" step="any" value="' + r[2] + '" data-c="w"></td><td class="res"></td></tr>';
      }
      return { html: '<table class="pf-table"><thead><tr><th>Emitent</th><th>Typ</th><th>% NAV</th><th>Wynik</th></tr></thead><tbody id="pf">' + init.map(row).join("") + '</tbody></table>' +
        '<p><button type="button" class="btn-sec" id="pf-add">+ Dodaj wiersz</button></p><div class="calc-out" id="o-51040"></div>',
        bind: function () {
          function calc() {
            var trs = Array.prototype.slice.call(document.querySelectorAll("#pf tr"));
            var rows = trs.map(function (tr) { return { name: tr.querySelector('[data-c=name]').value, type: tr.querySelector('[data-c=type]').value, w: parseFloat(String(tr.querySelector('[data-c=w]').value).replace(",", ".")) || 0 }; });
            var r = C.test51040(rows);
            r.rows.forEach(function (x, i) { trs[i].querySelector(".res").innerHTML = '<span class="flag-' + x.flag + '">' + (x.flag === "bad" ? "Przekroczenie" : x.flag === "warn" ? "Koszyk 40%" : "OK") + '</span> <span class="cell-note">' + esc(x.note) + '</span>'; });
            var bad = r.rows.some(function (x) { return x.flag === "bad"; }) || r.bucket > 0.4 || r.cov > 0.8;
            out("o-51040", 'Koszyk pozycji 5–10%: <strong>' + pct(r.bucket) + '</strong> ' + (r.bucket > 0.4 ? '<span class="flag-bad">— przekracza 40%</span>' : '<span class="flag-ok">— w limicie 40%</span>') +
              '<br>Covered bonds powyżej 5%: <strong>' + pct(r.cov) + '</strong> ' + (r.cov > 0.8 ? '<span class="flag-bad">— przekracza 80%</span>' : '<span class="flag-ok">— w limicie 80%</span>') +
              '<br>' + (bad ? '<span class="flag-bad">Portfel narusza limity.</span>' : '<span class="flag-ok">Portfel spełnia limity 5/10/40.</span>') +
              '<br><span class="cell-note">Kalkulator nie łączy grup kapitałowych, depozytów ani ekspozycji OTC (limit łączny 20% i 35%) — sprawdź je osobno.</span>');
          }
          document.getElementById("pf").addEventListener("input", calc);
          document.getElementById("pf").addEventListener("change", calc);
          document.getElementById("pf-add").addEventListener("click", function () { document.getElementById("pf").insertAdjacentHTML("beforeend", row(["Nowy emitent", "std", 0])); calc(); });
          calc();
        } };
    },
    commitment: function () {
      var types = { fut: "Futures (liczba × wielkość × cena)", opt: "Opcja (liczba × wielkość × cena bazy × |delta|)", swap: "Swap / forward (nominał)" };
      var init = [["fut", 120, 10, 5000, 1], ["opt", 200, 100, 80, 0.6], ["swap", 1, 20000000, 1, 1]];
      function row(r) {
        return '<tr><td><select data-c="t">' + Object.keys(types).map(function (k) { return '<option value="' + k + '"' + (r[0] === k ? ' selected' : '') + '>' + types[k] + '</option>'; }).join("") + '</select></td>' +
          '<td><input type="number" step="any" data-c="n" value="' + r[1] + '"></td><td><input type="number" step="any" data-c="s" value="' + r[2] + '"></td><td><input type="number" step="any" data-c="p" value="' + r[3] + '"></td><td><input type="number" step="any" data-c="d" value="' + r[4] + '"></td><td class="res"></td></tr>';
      }
      return { html: '<div class="calc-grid">' + field("c-nav", "NAV funduszu", 50000000) + '</div>' +
        '<table class="pf-table"><thead><tr><th>Typ</th><th>Liczba</th><th>Wielkość / mnożnik / nominał</th><th>Cena</th><th>Delta</th><th>Ekspozycja</th></tr></thead><tbody id="cm">' + init.map(row).join("") + '</tbody></table>' +
        '<p><button type="button" class="btn-sec" id="cm-add">+ Dodaj pozycję</button></p><div class="calc-out" id="o-cm"></div>',
        bind: function () {
          function calc() {
            var nav = num("c-nav"), sum = 0;
            Array.prototype.forEach.call(document.querySelectorAll("#cm tr"), function (tr) {
              function v(c) { return parseFloat(String(tr.querySelector('[data-c=' + c + ']').value).replace(",", ".")) || 0; }
              var t = tr.querySelector('[data-c=t]').value;
              var e = t === "swap" ? Math.abs(v("n") * v("s")) : Math.abs(v("n") * v("s") * v("p") * (t === "opt" ? v("d") : 1));
              sum += e;
              tr.querySelector(".res").textContent = f(e, 0);
            });
            var r = sum / nav;
            out("o-cm", 'Łączna ekspozycja: <strong>' + f(sum, 0) + '</strong> = <strong>' + pct(r, 1) + ' NAV</strong> ' +
              (r > 1 ? '<span class="flag-bad">— przekracza 100% (art. 51 ust. 3)</span>' : r > 0.9 ? '<span class="flag-warn">— blisko limitu</span>' : '<span class="flag-ok">— w limicie</span>') +
              '<br>Zapas do 100% NAV: <strong>' + f(Math.max(0, nav - sum), 0) + '</strong>' +
              '<br><span class="cell-note">Wersja uproszczona: bez kompensowania (netting), zabezpieczeń (hedging) i duration netting. Opcje kupione i sprzedane liczone wartością bezwzględną.</span>');
          }
          document.getElementById("cm").addEventListener("input", calc);
          document.getElementById("cm").addEventListener("change", calc);
          document.getElementById("c-nav").addEventListener("input", calc);
          document.getElementById("cm-add").addEventListener("click", function () { document.getElementById("cm").insertAdjacentHTML("beforeend", row(["fut", 0, 0, 0, 1])); calc(); });
          calc();
        } };
    },
    fxfwd: function () {
      return { html: '<div class="calc-grid">' + field("fx-s", "Kurs spot EUR/PLN", 4.25) + field("fx-rq", "Stopa waluty kwotowanej PLN (%)", 4.5) + field("fx-rb", "Stopa waluty bazowej EUR (%)", 2.0) +
        field("fx-d", "Liczba dni", 90, 1) + '<label>Konwencja<select id="fx-b"><option value="360">ACT/360</option><option value="365">ACT/365</option></select></label>' + field("fx-n", "Nominał w walucie bazowej", 1000000) + '</div><div class="calc-out" id="o-fx"></div>',
        bind: function () {
          live(["fx-s", "fx-rq", "fx-rb", "fx-d", "fx-b", "fx-n"], function () {
            var S = num("fx-s"), F = C.fxForward(S, num("fx-rq") / 100, num("fx-rb") / 100, num("fx-d"), num("fx-b"));
            out("o-fx", 'Kurs terminowy: <strong>' + f(F, 5) + '</strong> · punkty terminowe: <strong>' + f((F - S) * 10000, 1) + ' pipsów</strong>' +
              '<br>Kwota w walucie kwotowanej na koniec: <strong>' + f(num("fx-n") * F, 2) + '</strong>' +
              '<br><span class="cell-note">Waluta o wyższej stopie procentowej jest w terminie tańsza (kurs terminowy > spot, gdy stopa waluty kwotowanej jest wyższa). Konwencja dni jest uproszczona do jednej dla obu walut.</span>');
          });
        } };
    },
    bond: function () {
      return { html: '<div class="calc-grid">' + field("b-c", "Kupon roczny (%)", 5) + field("b-y", "Rentowność (YTM, %)", 6) + field("b-n", "Lata do wykupu", 5) +
        '<label>Płatność kuponu<select id="b-f"><option value="1">Raz w roku</option><option value="2">Co pół roku</option></select></label>' + field("b-nom", "Nominał pozycji", 1000000) + field("b-dy", "Zmiana rentowności (pb)", 100) + '</div><div class="calc-out" id="o-b"></div>',
        bind: function () {
          live(["b-c", "b-y", "b-n", "b-f", "b-nom", "b-dy"], function () {
            var r = C.bond(num("b-c") / 100, num("b-y") / 100, num("b-n"), num("b-f")), nom = num("b-nom"), dy = num("b-dy") / 10000;
            var exact = C.bond(num("b-c") / 100, num("b-y") / 100 + dy, num("b-n"), num("b-f")).price;
            out("o-b", 'Cena: <strong>' + f(r.price, 4) + '</strong> (za 100 nominału)' +
              '<br>Duration Macaulaya: <strong>' + f(r.mac, 3) + '</strong> lat · zmodyfikowana: <strong>' + f(r.mod, 3) + '</strong>' +
              '<br>DV01 pozycji: <strong>' + f(r.dv01 / 100 * nom, 2) + '</strong> na 1 pb' +
              '<br>Zmiana o ' + f(dy * 10000, 0) + ' pb: wg duration <strong>' + f(-r.mod * dy * r.price / 100 * nom, 0) + '</strong>, dokładnie <strong>' + f((exact - r.price) / 100 * nom, 0) + '</strong>' +
              '<br><span class="cell-note">Różnica między przybliżeniem a wynikiem dokładnym to wypukłość (convexity).</span>');
          });
        } };
    },
    bill: function () {
      return { html: '<div class="calc-grid">' + field("t-n", "Nominał", 10000) + field("t-d", "Dni do wykupu", 182, 1) + field("t-y", "Rentowność (%)", 4.8) +
        '<label>Baza<select id="t-b"><option value="365">365 (PLN)</option><option value="360">360 (EUR, USD)</option></select></label>' + field("t-p", "…albo cena (wylicz rentowność)", "") + '</div><div class="calc-out" id="o-t"></div>',
        bind: function () {
          live(["t-n", "t-d", "t-y", "t-b", "t-p"], function () {
            var N = num("t-n"), d = num("t-d"), B = num("t-b"), P = num("t-p"), y = num("t-y") / 100;
            if (isFinite(P) && P > 0) y = C.billYield(N, P, d, B); else P = C.bill(N, y, d, B);
            out("o-t", 'Cena: <strong>' + f(P, 2) + '</strong> · rentowność: <strong>' + pct(y, 3) + '</strong>' +
              '<br>Dyskonto: <strong>' + f(N - P, 2) + '</strong> · stopa dyskonta: <strong>' + pct((N - P) / N * B / d, 3) + '</strong>' +
              '<br><span class="cell-note">Rentowność liczona od ceny, stopa dyskonta od nominału — stopa dyskonta jest zawsze niższa.</span>');
          });
        } };
    },
    bs: function () {
      return { html: '<div class="calc-grid">' + field("bs-s", "Cena instrumentu bazowego", 100) + field("bs-k", "Cena wykonania", 105) + field("bs-t", "Czas do wygaśnięcia (lata)", 0.5) +
        field("bs-v", "Zmienność (% rocznie)", 25) + field("bs-r", "Stopa wolna od ryzyka (%)", 3) + field("bs-q", "Stopa dywidendy (%)", 0) + field("bs-n", "Liczba opcji × wielkość kontraktu", 1000, 1) + '</div><div class="calc-out" id="o-bs"></div>',
        bind: function () {
          live(["bs-s", "bs-k", "bs-t", "bs-v", "bs-r", "bs-q", "bs-n"], function () {
            var S = num("bs-s"), n = num("bs-n"), r = C.bs(S, num("bs-k"), num("bs-t"), num("bs-v") / 100, num("bs-r") / 100, num("bs-q") / 100);
            out("o-bs", 'Call: <strong>' + f(r.call, 4) + '</strong> · delta <strong>' + f(r.dCall, 4) + '</strong>' +
              '<br>Put: <strong>' + f(r.put, 4) + '</strong> · delta <strong>' + f(r.dPut, 4) + '</strong>' +
              '<br>Ekspozycja (metoda zaangażowania): call <strong>' + f(n * S * r.dCall, 0) + '</strong>, put <strong>' + f(Math.abs(n * S * r.dPut), 0) + '</strong>' +
              '<br><span class="cell-note">Model Black-Scholesa dla opcji europejskiej. Parytet put-call: C − P = S·e^(−qT) − K·e^(−rT).</span>');
          });
        } };
    }
  };

  function renderTools() {
    KB.title("Kalkulatory");
    var built = TOOLS.map(function (t) { return { t: t, b: builders[t.id]() }; });
    app.innerHTML = '<article class="page"><h1>Kalkulatory</h1>' +
      '<p class="intro">Interaktywne wersje obliczeń z kart instrumentów. Zmień dowolną wartość — wynik przelicza się od razu. Wyniki są poglądowe.</p>' +
      '<p class="toc-inline">' + TOOLS.map(function (t) { return '<a href="#calc-' + t.id + '" data-jump="calc-' + t.id + '">' + esc(t.title) + '</a>'; }).join(" · ") + '</p>' +
      built.map(function (x) { return '<section class="calc-box" id="calc-' + x.t.id + '"><h2>' + esc(x.t.title) + '</h2><p>' + esc(x.t.desc) + '</p>' + x.b.html + '</section>'; }).join("") + '</article>';
    built.forEach(function (x) { x.b.bind(); });
    KB.each("[data-jump]", function (a) {
      a.addEventListener("click", function (ev) { ev.preventDefault(); var el = document.getElementById(a.getAttribute("data-jump")); if (el) el.scrollIntoView({ behavior: "smooth" }); });
    });
  }

  KB.route(/^#\/tools/, renderTools);
})();

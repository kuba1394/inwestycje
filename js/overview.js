/*
 * Przegląd: wszystkie instrumenty na jednej stronie, pogrupowane w rodziny,
 * z krótkim opisem „w 30 sekund” widocznym od razu (PL/EN).
 */
(function () {
  "use strict";
  var KB = window.KB, esc = KB.esc, app = KB.app;

  var GROUPS = [
    { id: "equity", pl: "Akcje i pokrewne", en: "Equity and related",
      dpl: "Udział we własności spółki albo prawo, które z tej własności wynika. Zarabia się na wzroście kursu i dywidendach.",
      den: "A share in a company's ownership, or a right derived from it. You earn from price gains and dividends.",
      ids: ["common-stock", "preferred-stock", "depositary-receipt", "subscription-right", "real-estate-investment-trust"] },
    { id: "funds", pl: "Fundusze", en: "Funds",
      dpl: "Wspólny portfel wielu inwestorów zarządzany przez profesjonalistę. Różnią się tym, jak się do nich wchodzi i wychodzi: przez fundusz, przez giełdę albo wcale przed końcem.",
      den: "A pooled portfolio run by a professional manager. They differ in how you get in and out: via the fund, via an exchange, or not at all before the end.",
      ids: ["open-ended-fund", "exchange-traded-fund", "money-market-fund", "closed-end-fund"] },
    { id: "etp", pl: "Produkty notowane i certyfikaty", en: "Exchange-traded products and certificates",
      dpl: "Papiery, które naśladują cenę czegoś innego (indeksu, towaru, akcji), ale prawnie są długiem emitenta — więc dochodzi jego ryzyko kredytowe.",
      den: "Securities that track the price of something else (an index, a commodity, a share) but are legally the issuer's debt — so its credit risk is added.",
      ids: ["exchange-traded-note", "exchange-traded-commodity", "exchange-traded-certificate", "warrant", "participatory-note"] },
    { id: "bonds", pl: "Obligacje", en: "Bonds",
      dpl: "Pożyczka dla państwa, samorządu, banku lub spółki. Inwestor dostaje odsetki (kupony) i zwrot kapitału w terminie. Główne ryzyka: stopy procentowe i wypłacalność emitenta.",
      den: "A loan to a government, local authority, bank or company. The investor receives interest (coupons) and the capital back at maturity. Main risks: interest rates and the issuer's solvency.",
      ids: ["government-bond", "corporate-bond", "covered-bond", "floating-rate-note", "zero-coupon-bond", "inflation-linked-bond", "municipal-bond", "convertible-bond"] },
    { id: "securitised", pl: "Sekurytyzacja i dług strukturyzowany", en: "Securitisation and structured debt",
      dpl: "Obligacje spłacane z puli kredytów albo powiązane z ryzykiem kredytowym kogoś innego niż emitent.",
      den: "Bonds repaid from a pool of loans, or linked to the credit risk of someone other than the issuer.",
      ids: ["asset-backed-security", "mortgage-backed-security", "credit-linked-note"] },
    { id: "money", pl: "Rynek pieniężny i gotówka", en: "Money market and cash",
      dpl: "Bardzo krótkie, bezpieczne instrumenty, w których fundusz trzyma gotówkę — do roku, często kilka tygodni.",
      den: "Very short, safe instruments where a fund keeps its cash — up to a year, often a few weeks.",
      ids: ["treasury-bill", "commercial-paper", "certificate-of-deposit", "bankers-acceptance", "bank-deposit"] },
    { id: "sft", pl: "Finansowanie papierami wartościowymi", en: "Securities financing",
      dpl: "Krótkie pożyczki gotówki pod zastaw papierów albo pożyczki samych papierów. Papiery wracają do właściciela.",
      den: "Short loans of cash against securities as collateral, or loans of the securities themselves. The securities come back to the owner.",
      ids: ["repurchase-agreement", "securities-lending"] },
    { id: "listed-der", pl: "Derywaty giełdowe", en: "Listed derivatives",
      dpl: "Standardowe kontrakty terminowe i opcje z giełdy. Rozlicza je izba rozliczeniowa (CCP), a zyski i straty są rozliczane codziennie.",
      den: "Standard futures and options traded on an exchange. A clearing house (CCP) settles them, and gains and losses are settled daily.",
      ids: ["equity-index-future", "government-bond-future", "stir-future", "interest-rate-swap-future", "currency-future", "commodity-future", "listed-equity-option", "option-on-futures"] },
    { id: "rates", pl: "Derywaty stopy procentowej (OTC)", en: "Interest rate derivatives (OTC)",
      dpl: "Umowy z bankiem na wymianę płatności odsetkowych albo opcje na stopy. Służą do zmiany lub zabezpieczenia ryzyka stóp procentowych i inflacji.",
      den: "Contracts with a bank to exchange interest payments, or options on rates. Used to change or hedge interest rate and inflation risk.",
      ids: ["interest-rate-swap", "overnight-index-swap", "forward-rate-agreement", "constant-maturity-swap", "asset-swap", "swaption", "interest-rate-cap-floor", "bond-option", "inflation-swap"] },
    { id: "fx", pl: "Derywaty walutowe", en: "FX derivatives",
      dpl: "Umowy na przyszłą wymianę walut po ustalonym kursie albo opcje na kurs. Najczęściej służą do zabezpieczenia walutowego.",
      den: "Contracts to exchange currencies in the future at a set rate, or options on the rate. Most often used for currency hedging.",
      ids: ["fx-forward", "fx-swap", "non-deliverable-forward", "cross-currency-swap", "fx-option"] },
    { id: "credit", pl: "Derywaty kredytowe", en: "Credit derivatives",
      dpl: "Ubezpieczenie od niewypłacalności spółki lub państwa, którym można handlować.",
      den: "Insurance against the default of a company or a country that can be traded.",
      ids: ["credit-default-swap", "cds-index-tranche", "credit-default-swaption"] },
    { id: "equity-der", pl: "Derywaty akcyjne i inne OTC", en: "Equity and other OTC derivatives",
      dpl: "Umowy z bankiem dające ekspozycję na akcje, indeksy, dywidendy, zmienność lub towary bez kupowania samych aktywów.",
      den: "Contracts with a bank giving exposure to shares, indices, dividends, volatility or commodities without buying the assets themselves.",
      ids: ["total-return-swap", "equity-swap", "contract-for-difference", "otc-equity-option", "dividend-swap", "variance-swap", "commodity-index-swap"] },
    { id: "private", pl: "Rynki prywatne i inne", en: "Private markets and other",
      dpl: "Aktywa poza giełdą i bez ISIN: kredyty, udziały w funduszach prywatnych, nieruchomości, umowy z ubezpieczycielem. Mało płynne, głównie dla AIF.",
      den: "Off-exchange assets without an ISIN: loans, private fund interests, property, insurance contracts. Illiquid, mainly for AIFs.",
      ids: ["syndicated-loan", "limited-partnership-interest", "direct-real-estate", "guaranteed-investment-contract"] }
  ];
  KB.OVERVIEW_GROUPS = GROUPS;

  var st = { lang: "pl", q: "", market: "all" };
  var UI = {
    pl: { title: "Przegląd instrumentów", intro: "Wszystkie instrumenty w jednym miejscu, pogrupowane w rodziny, z krótkim opisem każdego. Zacznij od opisu rodziny, potem przejrzyj instrumenty — szczegóły są na karcie.", search: "Filtruj: nazwa, opis lub kod security type…", all: "Wszystkie", none: "Brak instrumentów dla tego filtra.", open: "Karta →", count: function (n) { return n + " " + KB.plInstr(n); }, codes: "Kody" },
    en: { title: "Instrument overview", intro: "All instruments in one place, grouped into families, with a short description of each. Start with the family description, then scan the instruments — details are on each card.", search: "Filter: name, description or security type code…", all: "All", none: "No instruments match this filter.", open: "Card →", count: function (n) { return n + (n === 1 ? " instrument" : " instruments"); }, codes: "Codes" }
  };

  function text(x) {
    var m = KB.meta(x.id);
    return m.tldr ? m.tldr[st.lang] : x.content[st.lang].summary;
  }
  function matches(x, q) {
    if (st.market !== "all" && x.market !== st.market) return false;
    if (!q) return true;
    var parts = [x.name, (x.aliases || []).join(" "), text(x), x.asset.pl, x.asset.en];
    KB.codes(x.id).forEach(function (c) { parts.push(c.code); });
    return KB.norm(parts.join(" ")).indexOf(q) !== -1;
  }

  function render() {
    var t = UI[st.lang];
    KB.title(t.title);
    app.innerHTML = '<article class="page wide overview" lang="' + st.lang + '">' +
      '<div class="ov-head"><div><h1>' + t.title + '</h1><p class="intro">' + t.intro + '</p></div>' +
        '<div class="lang-toggle" role="group"><span class="lang-label">' + (st.lang === "pl" ? "Język opisu" : "Description language") + '</span>' +
        '<button type="button" data-lang="pl" aria-pressed="' + (st.lang === "pl") + '">PL</button><button type="button" data-lang="en" aria-pressed="' + (st.lang === "en") + '">EN</button></div></div>' +
      '<div class="controls"><label class="search"><span class="sr-only">' + t.search + '</span><input id="ovq" type="search" placeholder="' + t.search + '" value="' + esc(st.q) + '" autocomplete="off"></label>' +
        '<div class="chips">' + [["all", t.all], ["exchange", "Exchange-Traded"], ["otc", "OTC"]].map(function (c) {
          return '<button type="button" class="chip" data-m="' + c[0] + '" aria-pressed="' + (st.market === c[0]) + '">' + c[1] + '</button>'; }).join("") + '</div></div>' +
      '<nav class="ov-jump" id="ovjump"></nav><div id="ovlist"></div></article>';
    document.getElementById("ovq").addEventListener("input", function () { st.q = this.value; list(); });
    KB.each("[data-m]", function (b) { b.addEventListener("click", function () { st.market = b.getAttribute("data-m"); render(); }); });
    KB.each(".ov-head [data-lang]", function (b) { b.addEventListener("click", function () { st.lang = b.getAttribute("data-lang"); render(); }); });
    list();
  }

  function list() {
    var t = UI[st.lang], q = KB.norm(st.q.trim()), html = "", jump = [];
    GROUPS.forEach(function (g) {
      var items = g.ids.map(KB.instrument).filter(function (x) { return x && matches(x, q); });
      if (!items.length) return;
      jump.push('<a href="#ov-' + g.id + '" data-jump="ov-' + g.id + '">' + esc(g[st.lang]) + ' <span>' + items.length + '</span></a>');
      html += '<section class="ov-group" id="ov-' + g.id + '"><header><h2>' + esc(g[st.lang]) + '</h2><span class="count">' + t.count(items.length) + '</span></header>' +
        '<p class="ov-gdesc">' + esc(g["d" + st.lang]) + '</p><div class="ov-items">' +
        items.map(function (x) {
          var m = KB.meta(x.id), codes = KB.codes(x.id);
          return '<a class="ov-item market-' + x.market + '" href="#/i/' + x.id + '">' +
            '<div class="ov-top"><h3>' + esc(x.name) + '</h3><span class="ov-tags"><span class="badge badge-market">' + KB.MARKETS[x.market].tag + '</span>' +
            (m.level ? '<span class="dots" title="' + KB.LEVELS[m.level][st.lang] + '">' + "●●●".slice(0, m.level) + "○○○".slice(m.level) + '</span>' : '') + '</span></div>' +
            '<p>' + esc(text(x)) + '</p>' +
            (codes.length ? '<span class="ov-codes">' + codes.slice(0, 8).map(function (c) { return esc(c.code); }).join(" · ") + (codes.length > 8 ? ' +' + (codes.length - 8) : '') + '</span>' : '') +
          '</a>';
        }).join("") + '</div></section>';
    });
    document.getElementById("ovjump").innerHTML = jump.join("");
    document.getElementById("ovlist").innerHTML = html || '<p class="empty">' + t.none + '</p>';
    KB.each("[data-jump]", function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); var el = document.getElementById(a.getAttribute("data-jump")); if (el) el.scrollIntoView({ behavior: "smooth" }); });
    });
  }

  KB.route(/^#\/overview/, render);
})();

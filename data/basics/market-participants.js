(function () {
  // Diagram uczestników rynku (etykiety po angielsku — to nazwy ról używane w obu językach)
  function box(x, y, w, h, cls, title, sub) {
    return "<rect x='" + x + "' y='" + y + "' width='" + w + "' height='" + h + "' rx='10' class='" + cls + "'/>" +
      "<text x='" + (x + w / 2) + "' y='" + (y + (sub ? h / 2 - 3 : h / 2 + 5)) + "' text-anchor='middle' font-size='15' font-weight='700'>" + title + "</text>" +
      (sub ? "<text x='" + (x + w / 2) + "' y='" + (y + h / 2 + 16) + "' text-anchor='middle' class='small'>" + sub + "</text>" : "");
  }
  function line(x1, y1, x2, y2, cls) {
    return "<path d='M" + x1 + " " + y1 + " L" + x2 + " " + y2 + "' class='" + (cls || "arrow") + "'/>";
  }
  var svg =
    "<svg class='diagram' viewBox='0 0 960 450' role='img' aria-label='Market participants diagram'>" +
    "<defs><marker id='arr' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='7' markerHeight='7' orient='auto-start-reverse'><path d='M0 0 L10 5 L0 10 z' fill='currentColor' style='color:var(--ink-2)'/></marker>" +
    "<marker id='arr2' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='7' markerHeight='7' orient='auto'><path d='M0 0 L10 5 L0 10 z' style='fill:var(--warn)'/></marker></defs>" +
    box(20, 175, 190, 90, "box", "Fund / ManCo", "Portfolio manager · Compliance") +
    box(260, 50, 170, 64, "box", "Broker / Dealer", "executes orders") +
    box(490, 50, 180, 64, "box-acc", "Trading venue", "Exchange · MTF · OTF") +
    box(740, 50, 190, 64, "box-acc", "CCP", "clearing · margin") +
    box(740, 190, 190, 64, "box", "CSD / ICSD", "settlement (DvP)") +
    box(490, 190, 180, 64, "box", "Depositary", "custody · oversight") +
    box(260, 330, 170, 64, "box-otc", "Bank (OTC)", "ISDA · CSA") +
    box(740, 340, 190, 64, "box-reg", "Trade Repository", "EMIR · SFTR reports") +
    box(490, 340, 180, 64, "box-reg", "Regulator (NCA)", "e.g. KNF") +
    line(210, 200, 258, 110) + line(430, 82, 488, 82) + line(670, 82, 738, 82) + line(835, 114, 835, 188) +
    line(740, 222, 672, 222) + line(490, 232, 212, 232) +
    line(210, 250, 258, 340) + line(430, 352, 738, 120, "arrow-dash") +
    line(210, 262, 738, 372, "arrow-dash") + line(740, 380, 672, 380, "arrow-dash") +
    "<text x='450' y='160' class='small'>listed / cleared</text>" +
    "<text x='255' y='300' class='small'>bilateral OTC</text>" +
    "<text x='560' y='305' class='small' style='fill:var(--warn)'>reporting T+1</text>" +
    "<text x='560' y='150' class='small' style='fill:var(--warn)'>clearing (if cleared)</text>" +
    "</svg>";

  window.BASICS.push({
    id: "market-participants",
    title: { pl: "Uczestnicy rynku i cykl życia transakcji", en: "Market participants and the trade lifecycle" },
    level: 1,
    sources: ["emir", "sftr", "csdr"],
    related: ["common-stock", "equity-index-future", "interest-rate-swap"],
    content: {
      pl: {
        summary: "Zanim transakcja funduszu stanie się pozycją w portfelu, przechodzi przez kilka instytucji: brokera, giełdę lub bank, izbę rozliczeniową, depozyt papierów i depozytariusza. Równolegle trafia do raportów regulacyjnych. Znajomość tej drogi pomaga zrozumieć, skąd biorą się dane do kontroli compliance i gdzie mogą powstać błędy.",
        keyFacts: [
          ["Front office", "Zarządzający podejmuje decyzję i składa zlecenie (często przez dział tradingu)."],
          ["Middle office", "Potwierdzenia, alokacje, wycena, ryzyko, compliance."],
          ["Back office", "Rozrachunek, uzgodnienia, zdarzenia korporacyjne, księgowość funduszu."],
          ["Infrastruktura", "Giełdy i platformy, CCP, CSD/ICSD, repozytoria transakcji, systemy płatności."]
        ],
        sections: [
          { id: "map", title: "Mapa uczestników",
            html: svg +
              "<p>Strzałki ciągłe pokazują przepływ transakcji i rozliczenia, przerywane — obowiązki raportowe i ewentualny clearing transakcji OTC.</p>" +
              "<ul>" +
              "<li><strong>Broker / dealer</strong> — wykonuje zlecenia na rynku albo jest stroną transakcji (dealer).</li>" +
              "<li><strong>Miejsce obrotu</strong> — giełda (rynek regulowany), MTF lub OTF; kojarzy zlecenia.</li>" +
              "<li><strong>Bank (OTC)</strong> — kontrahent przy derywatach OTC, repo, FX; relację regulują ISDA i CSA.</li>" +
              "<li><strong>CCP</strong> — izba rozliczeniowa; staje się stroną dla obu uczestników i pobiera depozyty (zob. <a href='#/basics/clearing-ccp'>CCP i clearing</a>).</li>" +
              "<li><strong>CSD / ICSD</strong> — centralny depozyt papierów (np. KDPW, Euroclear, Clearstream); rozlicza papiery za gotówkę.</li>" +
              "<li><strong>Depozytariusz / custodian</strong> — przechowuje aktywa funduszu i kontroluje zgodność operacji.</li>" +
              "<li><strong>Repozytorium transakcji</strong> — zbiera raporty EMIR (derywaty) i SFTR (repo, pożyczki papierów) dla nadzorców.</li>" +
              "</ul>" },
          { id: "lifecycle", title: "Cykl życia transakcji krok po kroku",
            html: "<ol class='steps'>" +
              "<li><strong>Decyzja i zlecenie (T).</strong> Zarządzający decyduje; kontrola przedtransakcyjna (pre-trade) sprawdza limity na podstawie symulacji.</li>" +
              "<li><strong>Wykonanie (T).</strong> Broker wykonuje zlecenie na giełdzie albo bank zawiera transakcję OTC.</li>" +
              "<li><strong>Alokacja i potwierdzenie (T).</strong> Transakcja jest przypisywana do funduszy, a strony potwierdzają warunki (dla derywatów OTC — wymóg EMIR).</li>" +
              "<li><strong>Kontrola post-trade (T lub T+1).</strong> Compliance sprawdza transakcję i portfel po transakcji: dopuszczalność, limity, ekspozycję.</li>" +
              "<li><strong>Clearing.</strong> Dla instrumentów giełdowych i części OTC — rejestracja w CCP, depozyty.</li>" +
              "<li><strong>Raportowanie (do T+1).</strong> EMIR (derywaty), SFTR (repo, pożyczki), MiFIR (raporty transakcyjne firm inwestycyjnych).</li>" +
              "<li><strong>Rozrachunek (T+1 lub T+2).</strong> Wymiana papierów i gotówki w CSD (zob. <a href='#/basics/settlement'>Rozrachunek</a>).</li>" +
              "<li><strong>Życie pozycji.</strong> Codzienna wycena, depozyty, zdarzenia korporacyjne, kupony, NAV i codzienny monitoring limitów.</li>" +
              "</ol>" },
          { id: "where-errors", title: "Gdzie najczęściej powstają problemy",
            html: "<ul>" +
              "<li><strong>Dane statyczne</strong> — błędny emitent, grupa, typ instrumentu lub rynek notowania → błędny wynik testu limitów.</li>" +
              "<li><strong>Opóźnione zdarzenia</strong> — zdarzenie korporacyjne zaksięgowane z opóźnieniem tworzy chwilowo fałszywy obraz portfela.</li>" +
              "<li><strong>Nieudane rozrachunki</strong> — pozycja handlowa (trade date) różni się od pozycji rozliczonej (settlement date).</li>" +
              "<li><strong>Niezgodność raportów</strong> — różnice UTI, LEI czy wyceny między stronami w repozytorium.</li>" +
              "</ul>" }
        ],
        glossary: [
          ["Front / middle / back office", "Podział funkcji: decyzje i handel / kontrola i wycena / rozrachunek i księgowość."],
          ["Pre-trade check", "Kontrola limitów przed złożeniem zlecenia, na podstawie symulacji portfela."],
          ["Trade repository", "Repozytorium transakcji zbierające raporty EMIR i SFTR."]
        ]
      },
      en: {
        summary: "Before a fund's trade becomes a portfolio position, it passes through several institutions: a broker, an exchange or bank, a clearing house, a securities depository and the depositary. In parallel it goes into regulatory reports. Knowing this path helps you understand where compliance data comes from and where errors can arise.",
        keyFacts: [
          ["Front office", "The portfolio manager decides and places the order (often via a trading desk)."],
          ["Middle office", "Confirmations, allocations, valuation, risk, compliance."],
          ["Back office", "Settlement, reconciliations, corporate actions, fund accounting."],
          ["Infrastructure", "Exchanges and platforms, CCPs, CSDs/ICSDs, trade repositories, payment systems."]
        ],
        sections: [
          { id: "map", title: "Map of participants",
            html: svg +
              "<p>Solid arrows show the flow of trades and settlement; dashed arrows show reporting obligations and optional clearing of OTC trades.</p>" +
              "<ul>" +
              "<li><strong>Broker / dealer</strong> — executes orders in the market or is the counterparty (dealer).</li>" +
              "<li><strong>Trading venue</strong> — exchange (regulated market), MTF or OTF; matches orders.</li>" +
              "<li><strong>Bank (OTC)</strong> — counterparty for OTC derivatives, repo, FX; the relationship is governed by the ISDA and CSA.</li>" +
              "<li><strong>CCP</strong> — clearing house; becomes the counterparty to both sides and collects margin (see <a href='#/basics/clearing-ccp'>CCP and clearing</a>).</li>" +
              "<li><strong>CSD / ICSD</strong> — central securities depository (e.g. KDPW, Euroclear, Clearstream); settles securities against cash.</li>" +
              "<li><strong>Depositary / custodian</strong> — safekeeps the fund's assets and oversees compliance of operations.</li>" +
              "<li><strong>Trade repository</strong> — collects EMIR (derivatives) and SFTR (repo, securities lending) reports for regulators.</li>" +
              "</ul>" },
          { id: "lifecycle", title: "The trade lifecycle, step by step",
            html: "<ol class='steps'>" +
              "<li><strong>Decision and order (T).</strong> The manager decides; a pre-trade check tests limits on a simulated portfolio.</li>" +
              "<li><strong>Execution (T).</strong> The broker executes on the exchange or the bank enters an OTC trade.</li>" +
              "<li><strong>Allocation and confirmation (T).</strong> The trade is allocated to funds and the parties confirm terms (for OTC derivatives — an EMIR requirement).</li>" +
              "<li><strong>Post-trade check (T or T+1).</strong> Compliance checks the trade and the post-trade portfolio: eligibility, limits, exposure.</li>" +
              "<li><strong>Clearing.</strong> For exchange-traded and some OTC instruments — registration at the CCP, margin.</li>" +
              "<li><strong>Reporting (by T+1).</strong> EMIR (derivatives), SFTR (repo, lending), MiFIR (investment firms' transaction reports).</li>" +
              "<li><strong>Settlement (T+1 or T+2).</strong> Exchange of securities and cash at the CSD (see <a href='#/basics/settlement'>Settlement</a>).</li>" +
              "<li><strong>Life of the position.</strong> Daily valuation, margin, corporate actions, coupons, NAV and daily limit monitoring.</li>" +
              "</ol>" },
          { id: "where-errors", title: "Where problems most often arise",
            html: "<ul>" +
              "<li><strong>Static data</strong> — wrong issuer, group, instrument type or listing → wrong limit test result.</li>" +
              "<li><strong>Late events</strong> — a corporate action booked late temporarily distorts the portfolio picture.</li>" +
              "<li><strong>Settlement fails</strong> — the traded position (trade date) differs from the settled position (settlement date).</li>" +
              "<li><strong>Report mismatches</strong> — differences in UTI, LEI or valuation between the parties at the trade repository.</li>" +
              "</ul>" }
        ],
        glossary: [
          ["Front / middle / back office", "Division of functions: decisions and trading / control and valuation / settlement and accounting."],
          ["Pre-trade check", "A limit check before an order is placed, on a simulated portfolio."],
          ["Trade repository", "A repository collecting EMIR and SFTR reports."]
        ]
      }
    }
  });
})();

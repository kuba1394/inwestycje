window.INSTRUMENTS.push({
  id: "convertible-bond",
  name: "Convertible Bond",
  aliases: ["Convertible", "Exchangeable Bond", "Mandatory Convertible", "CoCo", "obligacja zamienna"],
  market: "otc",
  asset: { pl: "Dłużne / hybrydowe", en: "Fixed income / hybrid" },
  sources: ["ucits", "eligible", "cesr10788", "aifmd", "aifmdL2", "td"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Obligacja zamienna to obligacja, którą posiadacz może zamienić na określoną liczbę akcji emitenta. Łączy cechy obligacji (kupon, zwrot nominału, ochrona przy spadkach) z opcją kupna akcji (udział we wzrostach). Za tę opcję inwestor płaci niższym kuponem.",
      keyFacts: [
        ["Rynek", "Pierwotny: emisje przez banki (często przyspieszony bookbuilding). Wtórny: OTC, często formalnie notowane."],
        ["Kluczowe parametry", "Cena konwersji, współczynnik konwersji (liczba akcji na obligację), kupon, termin, opcje call/put."],
        ["Rodzaje", "Vanilla convertible, exchangeable (zamiana na akcje innej spółki), mandatory (obowiązkowa konwersja), CoCo (konwersja przy spadku kapitału banku)."],
        ["Nominał", "Często 100 000 lub 200 000 EUR na obligację."],
        ["Rozliczenie", "UE: T+2 (od 11.10.2027 T+1), zwykle w międzynarodowym CSD."],
        ["Wbudowany derywat", "Tak — opcja na akcje."],
        ["Kod CFI", "<code>DC****</code> (Debt – Convertible bonds)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Convertible Bond</em> = obligacja + opcja call na akcje emitenta. Kluczowe wielkości:</p>" +
            "<p class='formula'>Współczynnik konwersji = nominał / cena konwersji</p>" +
            "<p class='formula'>Parytet = współczynnik konwersji × cena akcji</p>" +
            "<p class='formula'>Premia konwersyjna = cena obligacji / parytet − 1</p>" +
            "<ul>" +
              "<li>Gdy akcje rosną, obligacja zachowuje się coraz bardziej jak akcje (delta → 1).</li>" +
              "<li>Gdy akcje spadają, cena obligacji zbliża się do wartości samej obligacji (<em>bond floor</em>), o ile emitent jest wypłacalny.</li>" +
            "</ul>" +
            "<p><strong>CoCo</strong> (contingent convertible, bankowe AT1) działa odwrotnie — konwersja lub odpis następuje przymusowo, gdy kapitał banku spadnie poniżej progu. To instrument o zupełnie innym profilu ryzyka.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Emisja.</strong> Spółka ustala kupon i cenę konwersji (zwykle 20–40% powyżej bieżącego kursu akcji).</li>" +
              "<li><strong>Posiadanie.</strong> Kupony jak w zwykłej obligacji; wycena zależy od akcji, zmienności, spreadu kredytowego i stóp.</li>" +
              "<li><strong>Konwersja.</strong> Posiadacz może zamienić obligację na akcje w okresie konwersji. Emitent może mieć prawo rozliczenia gotówką.</li>" +
              "<li><strong>Call emitenta.</strong> Często emitent może wykupić obligację, gdy kurs akcji przekroczy próg — wymusza to konwersję.</li>" +
              "<li><strong>Wykup</strong> po nominale, jeśli nie doszło do konwersji.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz (NAV 200 mln EUR) ma 5 mln EUR nominału obligacji zamiennych spółki Z: nominał jednej obligacji 100 000 EUR, cena konwersji 50 EUR, akcje Z po 45 EUR, cena obligacji 102%, delta 0,55.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Współczynnik konwersji</td><td>100 000 / 50</td><td class='num'>2 000 akcji na obligację</td></tr>" +
              "<tr><td>Parytet</td><td>2 000 × 45</td><td class='num'>90 000 EUR (90%)</td></tr>" +
              "<tr><td>Premia konwersyjna</td><td>102 / 90 − 1</td><td class='num'>13,3%</td></tr>" +
              "<tr><td>Wartość rynkowa pozycji</td><td>5 000 000 × 102%</td><td class='num'>5 100 000 EUR</td></tr>" +
              "<tr><td>Liczba akcji z konwersji</td><td>50 obligacji × 2 000</td><td class='num'>100 000 akcji</td></tr>" +
              "<tr><td>Ekspozycja akcyjna (ekwiwalent delta)</td><td>100 000 × 45 × 0,55</td><td class='num'>2 475 000 EUR (1,24% NAV)</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Limit emitenta:</strong> wartość rynkowa obligacji (2,55% NAV) wlicza się do limitu spółki Z razem z innymi jej papierami.</li>" +
              "<li><strong>Ekspozycja całkowita:</strong> wbudowana opcja — 2,475 mln EUR (CESR/10-788).</li>" +
              "<li><strong>Polityka inwestycyjna:</strong> jeśli prospekt ogranicza udział akcji (np. fundusz dłużny maks. 10% w akcjach), trzeba ustalić, czy obligacje zamienne liczy się do akcji, długu, czy proporcjonalnie (delta).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> kwotowania dealerów, serwisy cenowe; modele (drzewo dwumianowe, PDE) z parametrami: kurs, zmienność, spread kredytowy, stopy, dywidendy, opcje call/put.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko akcji</strong> (delta) i <strong>zmienności</strong> (vega).</li>" +
              "<li><strong>Ryzyko kredytowe</strong> — często emitenci bez ratingu lub high yield.</li>" +
              "<li><strong>Ryzyko stopy procentowej</strong>.</li>" +
              "<li><strong>Ryzyko płynności</strong> — rynek wtórny ograniczony.</li>" +
              "<li><strong>Ryzyko zapisów umownych</strong> — wymuszona konwersja, zmiany ceny konwersji (np. przy przejęciu), dywidendy nadzwyczajne.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Alokacja lub zakup wtórny, rozliczenie DvP.</li>" +
              "<li>Kupony, korekty ceny konwersji, call emitenta, put posiadacza.</li>" +
              "<li>Konwersja — w portfelu pojawiają się akcje (kontrola dopuszczalności i limitów).</li>" +
              "<li>Wykup.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. a–d; art. 2 i 10 dyr. 2007/16/WE</span></h4><p>Notowana obligacja zamienna to zbywalny papier wartościowy z wbudowanym derywatem; baza (akcje) jest dopuszczalna. Nienotowana — limit 10%.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>art. 51 ust. 3 akapit 4; CESR/10-788</span></h4><p>Liczba akcji z konwersji × cena akcji × delta.</p></div>" +
              "<div class='rule'><h4>Limity emitenta <span class='law'>art. 52</span></h4><p>Obligacja (wartość rynkowa) i ewentualnie ekwiwalent akcji — dla tego samego emitenta i jego grupy. Exchangeable: dodatkowo look-through do spółki, na której akcje zamienia się obligację.</p></div>" +
              "<div class='rule'><h4>Limity nabycia <span class='law'>art. 56 ust. 2 lit. b</span></h4><p>Maks. 10% papierów dłużnych emitenta.</p></div>" +
              "<div class='rule'><h4>CoCo</h4><p>Wiele nadzorców i prospektów traktuje CoCo osobno (limity, ostrzeżenia o ryzyku). Należy je poprawnie oznaczyć w systemie.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: liczba akcji z konwersji × cena × delta.</li>" +
              "<li>Limity emitenta i klas aktywów według dokumentów AIF.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html:
            "<ul>" +
              "<li><strong>Znaczne pakiety</strong> <span class='law'>dyr. 2004/109/WE, art. 13</span> — instrumenty dające prawo nabycia akcji z prawem głosu wlicza się do progów zawiadomień.</li>" +
              "<li><strong>MiFIR</strong> — raporty transakcyjne po stronie firmy inwestycyjnej.</li>" +
              "<li>Brak raportowania EMIR.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> obligacji, <strong>LEI emitenta</strong>; ISIN i LEI spółki, na której akcje zamienia się obligację (exchangeable).</li>" +
              "<li><strong>CFI</strong> — <code>D</code> (Debt), grupa <code>C</code> (Convertible bonds).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Klasyfikacja (vanilla, exchangeable, mandatory, CoCo) poprawna w systemie.</li>" +
              "<li>Wbudowany derywat w ekspozycji całkowitej (ekwiwalent delta).</li>" +
              "<li>Limity emitenta i grupy; look-through przy exchangeable.</li>" +
              "<li>Zgodność z limitami klas aktywów z prospektu (akcje vs dług).</li>" +
              "<li>Zdarzenia: konwersja, call, korekty ceny konwersji — nowe akcje w portfelu.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Conversion price", "Cena za akcję, po której następuje konwersja."],
        ["Parity", "Wartość akcji otrzymanych z konwersji jednej obligacji."],
        ["Bond floor", "Wartość obligacji bez opcji konwersji."],
        ["CoCo", "Contingent convertible — obligacja bankowa przymusowo zamieniana lub umarzana przy spadku kapitału."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A convertible bond is a bond the holder can exchange for a set number of the issuer's shares. It combines bond features (coupon, repayment of nominal, downside protection) with a call option on the shares (upside participation). The investor pays for the option through a lower coupon.",
      keyFacts: [
        ["Market", "Primary: issued via banks (often accelerated bookbuilding). Secondary: OTC, often formally listed."],
        ["Key terms", "Conversion price, conversion ratio (shares per bond), coupon, maturity, call/put options."],
        ["Types", "Vanilla convertible, exchangeable (into another company's shares), mandatory (compulsory conversion), CoCo (converts when a bank's capital falls)."],
        ["Denomination", "Often EUR 100,000 or 200,000 per bond."],
        ["Settlement", "EU: T+2 (T+1 from 11 Oct 2027), usually in an international CSD."],
        ["Embedded derivative", "Yes — an option on shares."],
        ["CFI code", "<code>DC****</code> (Debt – Convertible bonds)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Convertible Bond = a bond + a call option on the issuer's shares. Key quantities:</p>" +
            "<p class='formula'>Conversion ratio = nominal / conversion price</p>" +
            "<p class='formula'>Parity = conversion ratio × share price</p>" +
            "<p class='formula'>Conversion premium = bond price / parity − 1</p>" +
            "<ul>" +
              "<li>When the shares rise, the bond behaves more and more like equity (delta → 1).</li>" +
              "<li>When the shares fall, the bond price approaches the value of the bond alone (bond floor), as long as the issuer is solvent.</li>" +
            "</ul>" +
            "<p><strong>CoCos</strong> (contingent convertibles, bank AT1) work the other way — conversion or write-down is forced when the bank's capital falls below a trigger. It is an instrument with an entirely different risk profile.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Issuance.</strong> The company sets the coupon and the conversion price (usually 20–40% above the current share price).</li>" +
              "<li><strong>Holding.</strong> Coupons as for an ordinary bond; value depends on the shares, volatility, credit spread and rates.</li>" +
              "<li><strong>Conversion.</strong> The holder may convert into shares during the conversion period. The issuer may have a cash settlement option.</li>" +
              "<li><strong>Issuer call.</strong> The issuer can often redeem when the share price exceeds a trigger — forcing conversion.</li>" +
              "<li><strong>Redemption</strong> at par if not converted.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A fund (NAV EUR 200m) holds EUR 5m nominal of company Z convertibles: EUR 100,000 per bond, conversion price EUR 50, Z shares at EUR 45, bond price 102%, delta 0.55.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>Conversion ratio</td><td>100,000 / 50</td><td class='num'>2,000 shares per bond</td></tr>" +
              "<tr><td>Parity</td><td>2,000 × 45</td><td class='num'>EUR 90,000 (90%)</td></tr>" +
              "<tr><td>Conversion premium</td><td>102 / 90 − 1</td><td class='num'>13.3%</td></tr>" +
              "<tr><td>Position market value</td><td>5,000,000 × 102%</td><td class='num'>EUR 5,100,000</td></tr>" +
              "<tr><td>Shares on conversion</td><td>50 bonds × 2,000</td><td class='num'>100,000 shares</td></tr>" +
              "<tr><td>Equity exposure (delta-equivalent)</td><td>100,000 × 45 × 0.55</td><td class='num'>EUR 2,475,000 (1.24% of NAV)</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Issuer limit:</strong> the bonds' market value (2.55% of NAV) counts towards company Z's limit together with its other securities.</li>" +
              "<li><strong>Global exposure:</strong> embedded option — EUR 2.475m (CESR/10-788).</li>" +
              "<li><strong>Investment policy:</strong> if the prospectus limits equity (e.g. a bond fund with max 10% in equities), you must decide whether convertibles count as equity, debt or proportionally (delta).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> dealer quotes, pricing services; models (binomial tree, PDE) with inputs: share price, volatility, credit spread, rates, dividends, call/put features.</p>" +
            "<ul>" +
              "<li><strong>Equity risk</strong> (delta) and <strong>volatility risk</strong> (vega).</li>" +
              "<li><strong>Credit risk</strong> — issuers are often unrated or high yield.</li>" +
              "<li><strong>Interest rate risk</strong>.</li>" +
              "<li><strong>Liquidity risk</strong> — limited secondary market.</li>" +
              "<li><strong>Terms risk</strong> — forced conversion, conversion price resets (e.g. on takeover), special dividends.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Allocation or secondary purchase, DvP settlement.</li>" +
              "<li>Coupons, conversion price adjustments, issuer calls, holder puts.</li>" +
              "<li>Conversion — shares appear in the portfolio (eligibility and limit checks).</li>" +
              "<li>Redemption.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(a)–(d); Art. 2 and 10 Dir. 2007/16/EC</span></h4><p>A listed convertible is a transferable security with an embedded derivative; the underlying (shares) is eligible. Unlisted — 10% limit.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>Art. 51(3), fourth subpara.; CESR/10-788</span></h4><p>Number of shares on conversion × share price × delta.</p></div>" +
              "<div class='rule'><h4>Issuer limits <span class='law'>Art. 52</span></h4><p>The bond (market value) and, where relevant, the share equivalent — for the same issuer and its group. Exchangeables: also look-through to the company whose shares the bond converts into.</p></div>" +
              "<div class='rule'><h4>Acquisition limits <span class='law'>Art. 56(2)(b)</span></h4><p>Max 10% of an issuer's debt securities.</p></div>" +
              "<div class='rule'><h4>CoCos</h4><p>Many regulators and prospectuses treat CoCos separately (limits, risk warnings). They must be flagged correctly in the system.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: shares on conversion × price × delta.</li>" +
              "<li>Issuer and asset class limits per the AIF's documents.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html:
            "<ul>" +
              "<li><strong>Major holdings</strong> <span class='law'>Dir. 2004/109/EC, Art. 13</span> — instruments giving a right to acquire voting shares count towards notification thresholds.</li>" +
              "<li><strong>MiFIR</strong> — transaction reports by the investment firm.</li>" +
              "<li>No EMIR reporting.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li>Bond <strong>ISIN</strong>, <strong>issuer LEI</strong>; ISIN and LEI of the company whose shares the bond converts into (exchangeables).</li>" +
              "<li><strong>CFI</strong> — <code>D</code> (Debt), group <code>C</code> (Convertible bonds).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Classification (vanilla, exchangeable, mandatory, CoCo) correct in the system.</li>" +
              "<li>Embedded derivative in global exposure (delta-equivalent).</li>" +
              "<li>Issuer and group limits; look-through for exchangeables.</li>" +
              "<li>Consistency with prospectus asset class limits (equity vs debt).</li>" +
              "<li>Events: conversion, call, conversion price adjustments — new shares in the portfolio.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Conversion price", "Price per share at which conversion takes place."],
        ["Parity", "Value of the shares received on converting one bond."],
        ["Bond floor", "Value of the bond without the conversion option."],
        ["CoCo", "Contingent convertible — a bank bond compulsorily converted or written down when capital falls."]
      ]
    }
  }
});

window.INSTRUMENTS.push({
  id: "government-bond-future",
  name: "Government Bond Future",
  aliases: ["Bond Future", "Euro-Bund Future", "FGBL", "Treasury Future", "kontrakt na obligacje"],
  market: "exchange",
  asset: { pl: "Derywaty giełdowe — stopa procentowa", en: "Listed derivatives — interest rates" },
  sources: ["ucits", "eligible", "emir3dir", "cesr10788", "aifmd", "aifmdL2", "emir"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Kontrakt terminowy na obligacje skarbowe to giełdowe zobowiązanie do dostawy (sprzedający) i odbioru (kupujący) obligacji z określonego koszyka w przyszłym terminie po cenie ustalonej dziś. Fundusze używają go przede wszystkim do szybkiej zmiany duration portfela.",
      keyFacts: [
        ["Rynek", "Giełda (np. Eurex: Euro-Schatz, -Bobl, -Bund, -Buxl; CME: Treasury futures); rozliczenie przez CCP."],
        ["Instrument bazowy", "Obligacja syntetyczna (np. Bund: kupon 6%, pozostały termin 8,5–10,5 roku), w praktyce koszyk obligacji dopuszczonych do dostawy."],
        ["Wielkość kontraktu", "Euro-Bund: 100 000 EUR nominału; tick 0,01 = 10 EUR."],
        ["Terminy", "Marzec, czerwiec, wrzesień, grudzień; dostawa 10. dnia kalendarzowego miesiąca (Eurex)."],
        ["Rozliczenie", "Codzienny variation margin; na końcu fizyczna dostawa obligacji (wybór obligacji należy do sprzedającego)."],
        ["Dźwignia", "Tak — depozyt to niewielki ułamek nominału."],
        ["Kod CFI", "<code>FF****</code> (Futures – Financial), bazowy: dług"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p>Kontrakt na obligacje działa jak <a href='#/i/equity-index-future'>Equity Index Future</a> (CCP, depozyty, codzienne rozliczanie), ale jego instrumentem bazowym jest <strong>obligacja syntetyczna</strong> o standardowym kuponie. Na końcu sprzedający dostarcza prawdziwe obligacje — wybrane przez siebie z listy obligacji dopuszczonych do dostawy (<em>deliverable basket</em>).</p>" +
            "<p>Ponieważ obligacje w koszyku mają różne kupony i terminy, giełda przypisuje każdej <strong>współczynnik konwersji</strong> (<em>conversion factor</em>, CF). Wyrównuje on ich wartość względem obligacji syntetycznej. Sprzedający wybiera obligację najtańszą w dostawie — <strong>cheapest-to-deliver (CTD)</strong>. To jej cena i duration w praktyce wyznaczają zachowanie kontraktu.</p>" +
            "<p>Kupno kontraktu zwiększa duration portfela, a sprzedaż ją zmniejsza — bez handlowania samymi obligacjami.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Otwarcie pozycji.</strong> Kupno lub sprzedaż kontraktów na giełdzie, nowacja do CCP, depozyt początkowy.</li>" +
              "<li><strong>Codzienne rozliczenie.</strong> Zmiana ceny × 1 000 EUR za punkt (dla Bunda: 1 pkt = 1% od 100 000 EUR) rozliczana gotówką każdego dnia.</li>" +
              "<li><strong>Rolowanie.</strong> Przed miesiącem dostawy większość uczestników przechodzi na kolejną serię.</li>" +
              "<li><strong>Zawiadomienie o dostawie.</strong> Sprzedający, który nie zamknął pozycji, wskazuje obligację do dostawy (zwykle CTD).</li>" +
              "<li><strong>Dostawa.</strong> Kupujący płaci kwotę faktury i otrzymuje obligacje przez CSD:" +
                "<p class='formula'>Faktura = cena rozliczeniowa futures / 100 × CF × 100 000 + narosłe odsetki</p>" +
                "Przykład: cena 130,00, CF 0,75, narosłe odsetki 500 EUR → 1,30 × 0,75 × 100 000 + 500 = 98 000 EUR za kontrakt.</li>" +
            "</ol>" +
            "<h3>Wrażliwość na stopy</h3>" +
            "<p class='formula'>BPV kontraktu ≈ BPV obligacji CTD / CF</p>" +
            "<p>BPV (DV01) to zmiana wartości przy zmianie rentowności o 1 pb.</p>"
        },
        {
          id: "example", title: "Przykład liczbowy — skrócenie duration",
          html:
            "<p>Fundusz obligacji (NAV 200 mln EUR) ma modified duration 7,0 i chce ją obniżyć do 6,0 przed spodziewanym wzrostem rentowności. Sprzedaje kontrakty Euro-Bund. Założenie (hipotetyczne): BPV kontraktu = 110 EUR, cena CTD = 98% nominału.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Krok</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>DV01 portfela teraz</td><td>200 000 000 × 7,0 × 0,0001</td><td class='num'>140 000 EUR</td></tr>" +
              "<tr><td>DV01 docelowe</td><td>200 000 000 × 6,0 × 0,0001</td><td class='num'>120 000 EUR</td></tr>" +
              "<tr><td>Do zredukowania</td><td>140 000 − 120 000</td><td class='num'>20 000 EUR</td></tr>" +
              "<tr><td>Liczba kontraktów do sprzedaży</td><td>20 000 / 110</td><td class='num'>≈ 182</td></tr>" +
              "<tr><td>Rentowności +25 pb — wynik na kontraktach</td><td>182 × 110 × 25</td><td class='num'>+500 500 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<p>Zysk na kontraktach kompensuje część spadku wartości obligacji w portfelu.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Ekspozycja w metodzie zaangażowania</strong> (CESR/10-788): liczba kontraktów × nominał kontraktu × cena rynkowa obligacji CTD = 182 × 100 000 × 0,98 = <strong>17 836 000 EUR (≈ 8,9% NAV)</strong>.</li>" +
              "<li>Pozycja zmniejsza ryzyko, więc może być kompensowana na zasadach hedgingu lub duration netting z wytycznych.</li>" +
              "<li>Jeśli fundusz miałby pozycję <strong>długą</strong> do dostawy, otrzyma obligacje — muszą być dopuszczalne i zmieścić się w limitach emitenta (dla obligacji skarbowych państw UE często obowiązują wyższe limity, art. 52 ust. 3 i art. 54).</li>" +
              "<li>Jeśli pozostanie <strong>krótki</strong> do dostawy, musi mieć obligację CTD do dostarczenia (inaczej to niekryta sprzedaż).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> dzienna cena rozliczeniowa giełdy. Cena teoretyczna = (cena CTD − carry) / CF.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko stopy procentowej</strong> z dźwignią.</li>" +
              "<li><strong>Ryzyko bazy</strong> — kontrakt zachowuje się jak CTD, a nie jak portfel funduszu; zmiana CTD zmienia BPV kontraktu.</li>" +
              "<li><strong>Ryzyko krzywej</strong> — kontrakt zabezpiecza określony punkt krzywej (np. 10 lat), a portfel może mieć inny rozkład.</li>" +
              "<li><strong>Ryzyko płynności</strong> — dopłaty VM; ryzyko dostawy przy niezamkniętej pozycji.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie, rejestracja w CCP, depozyt.</li>" +
              "<li>Codzienny VM, monitoring zmian CTD.</li>" +
              "<li>Rolowanie przed pierwszym dniem zawiadomień o dostawie.</li>" +
              "<li>Ewentualna dostawa: zawiadomienie, faktura, rozliczenie obligacji w CSD.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywat notowany na rynku regulowanym; bazą są obligacje (dopuszczalne aktywa) i stopy procentowe.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>art. 51 ust. 3; CESR/10-788</span></h4><p>Liczba kontraktów × nominał kontraktu × cena rynkowa obligacji CTD. Dopuszczalne kompensowanie i duration netting.</p></div>" +
              "<div class='rule'><h4>Limity emitenta <span class='law'>art. 51 ust. 3, art. 52 ust. 3, art. 54</span></h4><p>Pozycja długa daje ekspozycję na emitenta obligacji (np. Republikę Federalną Niemiec). Dla obligacji państw członkowskich limit może wynosić do 35%, a przy zgodzie nadzorcy i co najmniej 6 emisjach — do 100% NAV (maks. 30% w jednej emisji).</p></div>" +
              "<div class='rule'><h4>Pokrycie</h4><p>Pozycja krótka do dostawy wymaga posiadania obligacji do dostarczenia lub zamknięcia przed dostawą. Pozycja długa — płynnych środków na zapłatę faktury.</p></div>" +
              "<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1 (po dyr. 2024/2994)</span></h4><p>Rozliczane przez CCP autoryzowaną lub uznaną — bez limitu kontrahenta; monitoring brokera.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: konwersja według ceny CTD, jak w UCITS. W metodzie zaangażowania dopuszczalny duration netting na warunkach rozporządzenia.</li>" +
              "<li>Limity duration i ekspozycji — według dokumentów AIF.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie (EMIR)",
          html:
            "<ul>" +
              "<li><strong>EMIR art. 9</strong> — raport do T+1, codzienna wycena i depozyty. Raportuje spółka zarządzająca lub ZAFI.</li>" +
              "<li>Brak obowiązku clearingu EMIR (to nie OTC), ale kontrakt i tak jest rozliczany przez CCP.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>Kod produktu</strong> giełdy, np. <code>FGBL</code> (Euro-Bund), <code>FGBM</code> (Euro-Bobl), <code>FGBS</code> (Euro-Schatz), plus seria.</li>" +
              "<li><strong>ISIN</strong> serii, <strong>MIC</strong> giełdy (np. <code>XEUR</code>).</li>" +
              "<li><strong>CFI</strong> — <code>F</code> (Futures), grupa <code>F</code> (Financial), atrybut instrumentu bazowego: dług.</li>" +
              "<li><strong>ISIN</strong> obligacji z koszyka dostawy i obligacji CTD.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Ekspozycja całkowita wg ceny CTD; poprawne oznaczenie hedgingu lub duration netting.</li>" +
              "<li>Duration portfela po transakcji wobec limitów z prospektu.</li>" +
              "<li>Kalendarz dostawy — czy pozycje zostały zrolowane lub czy fundusz jest gotowy na dostawę?</li>" +
              "<li>Limity emitenta przy pozycji długiej; pokrycie przy krótkiej.</li>" +
              "<li>Płynność na VM; raport EMIR.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Conversion factor (CF)", "Współczynnik wyrównujący wartość obligacji z koszyka względem obligacji syntetycznej kontraktu."],
        ["Cheapest-to-deliver (CTD)", "Obligacja, którą sprzedającemu najbardziej opłaca się dostarczyć; wyznacza zachowanie kontraktu."],
        ["Invoice amount", "Kwota płacona przez kupującego przy dostawie."],
        ["BPV / DV01", "Zmiana wartości przy zmianie rentowności o 1 punkt bazowy."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A government bond future is an exchange-traded commitment to deliver (seller) and take delivery of (buyer) bonds from a defined basket on a future date at a price fixed today. Funds use it mainly to change portfolio duration quickly.",
      keyFacts: [
        ["Market", "Exchange (e.g. Eurex: Euro-Schatz, -Bobl, -Bund, -Buxl; CME: Treasury futures); cleared through a CCP."],
        ["Underlying", "Notional bond (e.g. Bund: 6% coupon, 8.5–10.5 years remaining), in practice a basket of deliverable bonds."],
        ["Contract size", "Euro-Bund: EUR 100,000 nominal; tick 0.01 = EUR 10."],
        ["Delivery months", "March, June, September, December; delivery on the 10th calendar day of the month (Eurex)."],
        ["Settlement", "Daily variation margin; at the end, physical delivery of bonds (the seller chooses which bond)."],
        ["Leverage", "Yes — margin is a small fraction of notional."],
        ["CFI code", "<code>FF****</code> (Futures – Financial), underlying: debt"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A bond future works like an <a href='#/i/equity-index-future'>Equity Index Future</a> (CCP, margin, daily settlement), but its underlying is a <strong>notional bond</strong> with a standard coupon. At the end the seller delivers real bonds — chosen by the seller from the list of deliverable bonds (deliverable basket).</p>" +
            "<p>Because the bonds in the basket have different coupons and maturities, the exchange assigns each a <strong>conversion factor</strong> (CF). It aligns their value with the notional bond. The seller picks the bond that is cheapest to deliver — the <strong>cheapest-to-deliver (CTD)</strong>. In practice its price and duration drive the contract's behaviour.</p>" +
            "<p>Buying the contract increases portfolio duration and selling it reduces duration — without trading the bonds themselves.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Opening the position.</strong> Buy or sell contracts on the exchange, novation to the CCP, initial margin.</li>" +
              "<li><strong>Daily settlement.</strong> Price change × EUR 1,000 per point (for the Bund: 1 point = 1% of EUR 100,000) settled in cash every day.</li>" +
              "<li><strong>Rolling.</strong> Before the delivery month most participants move to the next series.</li>" +
              "<li><strong>Delivery notice.</strong> A seller that has not closed its position names the bond to deliver (usually the CTD).</li>" +
              "<li><strong>Delivery.</strong> The buyer pays the invoice amount and receives the bonds via the CSD:" +
                "<p class='formula'>Invoice = futures settlement price / 100 × CF × 100,000 + accrued interest</p>" +
                "Example: price 130.00, CF 0.75, accrued interest EUR 500 → 1.30 × 0.75 × 100,000 + 500 = EUR 98,000 per contract.</li>" +
            "</ol>" +
            "<h3>Rate sensitivity</h3>" +
            "<p class='formula'>Contract BPV ≈ BPV of the CTD bond / CF</p>" +
            "<p>BPV (DV01) is the change in value for a 1 bp change in yield.</p>"
        },
        {
          id: "example", title: "Worked example — reducing duration",
          html:
            "<p>A bond fund (NAV EUR 200m) has a modified duration of 7.0 and wants to cut it to 6.0 ahead of an expected rise in yields. It sells Euro-Bund futures. Assumptions (hypothetical): contract BPV = EUR 110, CTD price = 98% of nominal.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Step</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>Current portfolio DV01</td><td>200,000,000 × 7.0 × 0.0001</td><td class='num'>EUR 140,000</td></tr>" +
              "<tr><td>Target DV01</td><td>200,000,000 × 6.0 × 0.0001</td><td class='num'>EUR 120,000</td></tr>" +
              "<tr><td>To reduce</td><td>140,000 − 120,000</td><td class='num'>EUR 20,000</td></tr>" +
              "<tr><td>Number of contracts to sell</td><td>20,000 / 110</td><td class='num'>≈ 182</td></tr>" +
              "<tr><td>Yields +25 bp — result on the contracts</td><td>182 × 110 × 25</td><td class='num'>+EUR 500,500</td></tr>" +
            "</tbody></table></div>" +
            "<p>The gain on the contracts offsets part of the fall in the value of the portfolio's bonds.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Commitment exposure</strong> (CESR/10-788): number of contracts × contract nominal × market price of the CTD bond = 182 × 100,000 × 0.98 = <strong>EUR 17,836,000 (≈ 8.9% of NAV)</strong>.</li>" +
              "<li>The position reduces risk, so it may be netted under the guidelines' hedging or duration-netting rules.</li>" +
              "<li>If the fund held a <strong>long</strong> position into delivery, it would receive bonds — these must be eligible and fit within issuer limits (EU government bonds often benefit from higher limits, Art. 52(3) and Art. 54).</li>" +
              "<li>If it stayed <strong>short</strong> into delivery, it must hold the CTD bond to deliver (otherwise it is an uncovered sale).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> the exchange's daily settlement price. Theoretical price = (CTD price − carry) / CF.</p>" +
            "<ul>" +
              "<li><strong>Leveraged interest rate risk.</strong></li>" +
              "<li><strong>Basis risk</strong> — the contract behaves like the CTD, not like the fund's portfolio; a change in CTD changes the contract's BPV.</li>" +
              "<li><strong>Curve risk</strong> — the contract hedges one point on the curve (e.g. 10 years), while the portfolio may be spread differently.</li>" +
              "<li><strong>Liquidity risk</strong> — VM calls; delivery risk if the position is not closed.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution, CCP registration, margin.</li>" +
              "<li>Daily VM, monitoring CTD changes.</li>" +
              "<li>Roll before the first delivery notice day.</li>" +
              "<li>Delivery where applicable: notice, invoice, bond settlement at the CSD.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>Derivative dealt in on a regulated market; underlying is bonds (eligible assets) and interest rates.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>Art. 51(3); CESR/10-788</span></h4><p>Number of contracts × contract nominal × market price of the CTD bond. Netting and duration netting allowed.</p></div>" +
              "<div class='rule'><h4>Issuer limits <span class='law'>Art. 51(3), Art. 52(3), Art. 54</span></h4><p>A long position gives exposure to the bond issuer (e.g. the Federal Republic of Germany). For Member State bonds the limit can be up to 35%, and with regulatory approval and at least 6 issues — up to 100% of NAV (max 30% in a single issue).</p></div>" +
              "<div class='rule'><h4>Cover</h4><p>A short position into delivery requires holding bonds to deliver or closing before delivery. A long position — liquid assets to pay the invoice.</p></div>" +
              "<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1) (after Dir. 2024/2994)</span></h4><p>Cleared through an authorised or recognised CCP — no counterparty limit; broker monitoring.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: conversion at the CTD price, as in UCITS. Under the commitment method duration netting is allowed on the Regulation's conditions.</li>" +
              "<li>Duration and exposure limits — per the AIF's documents.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting (EMIR)",
          html:
            "<ul>" +
              "<li><strong>EMIR Art. 9</strong> — report by T+1, daily valuation and margin. Reported by the management company or AIFM.</li>" +
              "<li>No EMIR clearing obligation (it is not OTC), but the contract is cleared through a CCP anyway.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li>Exchange <strong>product code</strong>, e.g. <code>FGBL</code> (Euro-Bund), <code>FGBM</code> (Euro-Bobl), <code>FGBS</code> (Euro-Schatz), plus series.</li>" +
              "<li>Series <strong>ISIN</strong>, exchange <strong>MIC</strong> (e.g. <code>XEUR</code>).</li>" +
              "<li><strong>CFI</strong> — <code>F</code> (Futures), group <code>F</code> (Financial), underlying attribute: debt.</li>" +
              "<li><strong>ISIN</strong> of the deliverable basket bonds and the CTD.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Global exposure at the CTD price; hedging or duration netting correctly flagged.</li>" +
              "<li>Portfolio duration after the trade against prospectus limits.</li>" +
              "<li>Delivery calendar — have positions been rolled, or is the fund ready for delivery?</li>" +
              "<li>Issuer limits for long positions; cover for short positions.</li>" +
              "<li>Liquidity for VM; EMIR report.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Conversion factor (CF)", "Factor aligning the value of a basket bond with the contract's notional bond."],
        ["Cheapest-to-deliver (CTD)", "The bond the seller finds most profitable to deliver; it drives the contract's behaviour."],
        ["Invoice amount", "The amount the buyer pays on delivery."],
        ["BPV / DV01", "Change in value for a 1 basis point change in yield."]
      ]
    }
  }
});

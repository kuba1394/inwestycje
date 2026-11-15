window.INSTRUMENTS.push({
  id: "contract-for-difference",
  name: "Contract for Difference (CFD)",
  aliases: ["CFD", "kontrakt na różnicę"],
  market: "otc",
  asset: { pl: "Derywaty akcyjne (i inne)", en: "Equity (and other) derivatives" },
  sources: ["ucits", "eligible", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "marginRts", "ssr", "td"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "CFD to umowa OTC, w której strony rozliczają różnicę między ceną otwarcia a ceną zamknięcia instrumentu bazowego (najczęściej akcji lub indeksu), bez kupowania go. Nie ma terminu wygaśnięcia — pozycja trwa, dopóki się jej nie zamknie, a za każdy dzień nalicza się koszt finansowania. To w praktyce uproszczony, bezterminowy equity swap.",
      keyFacts: [
        ["Rynek", "OTC, z brokerem lub bankiem; brak obowiązku clearingu."],
        ["Instrument bazowy", "Akcje, indeksy, waluty, towary, obligacje."],
        ["Termin", "Brak (open-ended); pozycja trwa do zamknięcia."],
        ["Depozyt", "Wymagany depozyt zabezpieczający (margin) — dźwignia."],
        ["Finansowanie", "Codzienne: pozycja długa płaci stopę + spread; krótka otrzymuje stopę − spread (może to być wartość ujemna)."],
        ["Klienci detaliczni", "Ograniczenia ESMA/krajowe (limity dźwigni, zamykanie pozycji, ochrona przed ujemnym saldem) — nie dotyczą funduszy jako klientów profesjonalnych."],
        ["Kod CFI", "Zwykle <code>JE****</code> (Forwards – Equity) z oznaczeniem CFD"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Contract for Difference</em> wypłaca różnicę wartości instrumentu bazowego między otwarciem a zamknięciem pozycji:</p>" +
            "<p class='formula'>Wynik (long) = (cena zamknięcia − cena otwarcia) × liczba jednostek − koszty finansowania</p>" +
            "<p class='formula'>Dzienny koszt finansowania ≈ wartość pozycji × (stopa referencyjna ± spread) / 360</p>" +
            "<p>Ekonomicznie CFD na akcje to to samo co <a href='#/i/equity-swap'>Equity Swap</a> — różni się formą: brak terminu, standardowe warunki brokera, codzienne naliczanie finansowania. Posiadacz CFD na akcje otrzymuje (long) lub płaci (short) równowartość dywidend, ale nie ma prawa głosu.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Otwarcie.</strong> Fundusz otwiera pozycję long lub short na określoną liczbę akcji po bieżącej cenie; wnosi depozyt.</li>" +
              "<li><strong>Codziennie.</strong> Wycena po kursie zamknięcia, rozliczenie zmiany wartości (VM), naliczenie finansowania, korekty o dywidendy.</li>" +
              "<li><strong>Zamknięcie.</strong> Transakcja odwrotna; rozliczenie końcowe.</li>" +
              "<li><strong>Broker</strong> zabezpiecza się na rynku akcji (kupuje lub pożycza i sprzedaje akcje).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy — pozycja krótka",
          html:
            "<p>Fundusz UCITS (NAV 200 mln EUR) otwiera krótki CFD na 100 000 akcji spółki W po 50 EUR. Spółka W ma 40 mln akcji.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Wartość pozycji</td><td>100 000 × 50</td><td class='num'>5 000 000 EUR (2,5% NAV)</td></tr>" +
              "<tr><td>Kurs spada do 45 EUR — wynik (przed finansowaniem)</td><td>(50 − 45) × 100 000</td><td class='num'>+500 000 EUR</td></tr>" +
              "<tr><td>Pozycja krótka netto w akcjach W</td><td>100 000 / 40 000 000</td><td class='num'>0,25% kapitału</td></tr>" +
            "</tbody></table></div>" +
            "<p>Dla porównania: pozycja <strong>długa</strong> o tej samej wartości przy €STR 2,00% i spreadzie 2,50% kosztowałaby ok. 5 000 000 × 4,50% / 360 ≈ 625 EUR dziennie.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>SSR:</strong> 0,25% kapitału — przekroczone progi zgłoszeń 0,1% i 0,2% (zgłoszenia do nadzorcy). Kolejne przy 0,3%; publikacja od 0,5%.</li>" +
              "<li><strong>Ekspozycja całkowita:</strong> wartość rynkowa akcji bazowych = 5 mln EUR (2,5% NAV).</li>" +
              "<li><strong>Limit emitenta:</strong> pozycja krótka nie zwiększa ekspozycji długiej na W, ale polityka może wymagać monitorowania pozycji krótkich na emitenta.</li>" +
              "<li><strong>Kontrahent:</strong> dodatnia wycena (+500 000) i depozyt u brokera wobec limitu 10% / 5% NAV.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> kurs instrumentu bazowego × liczba jednostek minus cena otwarcia, plus naliczone finansowanie i dywidendy.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko rynkowe z dźwignią</strong> (short — teoretycznie nieograniczone).</li>" +
              "<li><strong>Ryzyko kontrahenta</strong> — broker CFD; segregacja depozytu.</li>" +
              "<li><strong>Koszt finansowania</strong> — przy długim utrzymywaniu pozycji istotnie obniża wynik.</li>" +
              "<li><strong>Ryzyko zamknięcia</strong> — broker może zamknąć pozycję przy braku depozytu lub wycofaniu pożyczki akcji (short).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Umowa z brokerem (ISDA lub warunki brokera), zatwierdzenie kontrahenta.</li>" +
              "<li>Otwarcie, depozyt, raport EMIR.</li>" +
              "<li>Codzienne VM, finansowanie, dywidendy, zdarzenia korporacyjne.</li>" +
              "<li>Zamknięcie i rozliczenie.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywat OTC na dopuszczalne aktywa; kontrahent musi być podmiotem nadzorowanym z zatwierdzonej kategorii, wycena codzienna i weryfikowalna.</p></div>" +
              "<div class='rule'><h4>Krótka ekspozycja <span class='law'>art. 89 UCITS</span></h4><p>CFD to dozwolony sposób uzyskania ekspozycji krótkiej — fizyczna krótka sprzedaż jest zakazana.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>CESR/10-788</span></h4><p>Wartość rynkowa instrumentu bazowego; kompensowanie long/short tej samej akcji.</p></div>" +
              "<div class='rule'><h4>Look-through i kontrahent <span class='law'>art. 51 ust. 3, art. 52</span></h4><p>Długi CFD — ekspozycja na emitenta akcji. Kontrahent: 10% / 5% NAV, limit łączny 20%.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: wartość rynkowa instrumentu bazowego (CFD wymienione wprost jako instrument podlegający konwersji).</li>" +
              "<li>Limity strategii long/short według dokumentów AIF.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR, SSR, przejrzystość",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>EMIR <span class='law'>art. 9, 11 EMIR</span></h4><p>Raport do T+1; potwierdzenie, VM i IM (powyżej progu). Brak obowiązku clearingu.</p></div>" +
              "<div class='rule'><h4>SSR <span class='law'>rozp. 236/2012</span></h4><p>Krótkie CFD na akcje i dług państw wlicza się do pozycji krótkich netto (progi 0,1% / 0,5% dla akcji).</p></div>" +
              "<div class='rule'><h4>Znaczne pakiety <span class='law'>art. 13 dyr. 2004/109/WE</span></h4><p>Długie CFD na akcje wlicza się do progów zawiadomień razem z akcjami.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), LEI brokera.</li>" +
              "<li><strong>ISIN/LEI instrumentu bazowego</strong> — do SSR, progów pakietów i look-through.</li>" +
              "<li><strong>CFI</strong> — zwykle <code>J</code> (Forwards), grupa <code>E</code> (Equity), z oznaczeniem CFD.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Kontrahent (broker) zatwierdzony i nadzorowany; depozyt i jego segregacja.</li>" +
              "<li>Pozycje krótkie netto wobec progów SSR.</li>" +
              "<li>Długie CFD w progach znacznych pakietów i w look-through do emitenta.</li>" +
              "<li>Ekspozycja całkowita / dźwignia, limit kontrahenta.</li>" +
              "<li>Raport EMIR do T+1; uzgodnienie finansowania i dywidend.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Open-ended", "Bez terminu wygaśnięcia — pozycja trwa do zamknięcia."],
        ["Financing charge", "Dzienny koszt (lub przychód) utrzymywania pozycji CFD."],
        ["Dividend adjustment", "Korekta o równowartość dywidendy: dopisywana do long, pobierana od short."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A CFD is an OTC contract in which the parties settle the difference between the opening and closing price of an underlying (most often a share or index), without buying it. It has no expiry — the position runs until closed, with a financing charge each day. In practice it is a simplified, open-ended equity swap.",
      keyFacts: [
        ["Market", "OTC, with a broker or bank; no clearing obligation."],
        ["Underlying", "Shares, indices, currencies, commodities, bonds."],
        ["Term", "None (open-ended); the position runs until closed."],
        ["Margin", "Margin required — leverage."],
        ["Financing", "Daily: a long pays the rate + spread; a short receives the rate − spread (which can be negative)."],
        ["Retail clients", "ESMA/national restrictions (leverage limits, margin close-out, negative balance protection) — do not apply to funds as professional clients."],
        ["CFI code", "Usually <code>JE****</code> (Forwards – Equity) flagged as CFD"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Contract for Difference pays the difference in the underlying's value between opening and closing the position:</p>" +
            "<p class='formula'>Result (long) = (closing price − opening price) × units − financing costs</p>" +
            "<p class='formula'>Daily financing ≈ position value × (reference rate ± spread) / 360</p>" +
            "<p>Economically an equity CFD is the same as an <a href='#/i/equity-swap'>Equity Swap</a> — it differs in form: no maturity, standard broker terms, daily financing. A CFD holder receives (long) or pays (short) the equivalent of dividends, but has no voting rights.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Opening.</strong> The fund opens a long or short position on a number of shares at the current price; it posts margin.</li>" +
              "<li><strong>Daily.</strong> Valuation at the closing price, settlement of the change in value (VM), financing accrual, dividend adjustments.</li>" +
              "<li><strong>Closing.</strong> Offsetting trade; final settlement.</li>" +
              "<li><strong>The broker</strong> hedges in the equity market (buying, or borrowing and selling, the shares).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example — short position",
          html:
            "<p>A UCITS fund (NAV EUR 200m) opens a short CFD on 100,000 shares of company W at EUR 50. Company W has 40m shares.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>Position value</td><td>100,000 × 50</td><td class='num'>EUR 5,000,000 (2.5% of NAV)</td></tr>" +
              "<tr><td>Price falls to EUR 45 — result (before financing)</td><td>(50 − 45) × 100,000</td><td class='num'>+EUR 500,000</td></tr>" +
              "<tr><td>Net short position in W shares</td><td>100,000 / 40,000,000</td><td class='num'>0.25% of capital</td></tr>" +
            "</tbody></table></div>" +
            "<p>For comparison: a <strong>long</strong> position of the same size with €STR at 2.00% and a 2.50% spread would cost about 5,000,000 × 4.50% / 360 ≈ EUR 625 a day.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>SSR:</strong> 0.25% of capital — the 0.1% and 0.2% notification thresholds have been crossed (notifications to the regulator). The next at 0.3%; publication from 0.5%.</li>" +
              "<li><strong>Global exposure:</strong> market value of the underlying shares = EUR 5m (2.5% of NAV).</li>" +
              "<li><strong>Issuer limit:</strong> a short position does not add to long exposure to W, but the policy may require monitoring short positions per issuer.</li>" +
              "<li><strong>Counterparty:</strong> positive value (+500,000) and margin with the broker against the 10% / 5% of NAV limit.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> underlying price × units less the opening price, plus accrued financing and dividends.</p>" +
            "<ul>" +
              "<li><strong>Leveraged market risk</strong> (short — theoretically unlimited).</li>" +
              "<li><strong>Counterparty risk</strong> — the CFD broker; margin segregation.</li>" +
              "<li><strong>Financing cost</strong> — materially reduces returns on long-held positions.</li>" +
              "<li><strong>Close-out risk</strong> — the broker may close the position on a margin shortfall or a stock loan recall (short).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Agreement with the broker (ISDA or broker terms), counterparty approval.</li>" +
              "<li>Opening, margin, EMIR report.</li>" +
              "<li>Daily VM, financing, dividends, corporate actions.</li>" +
              "<li>Closing and settlement.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>OTC derivative on eligible assets; the counterparty must be a supervised entity in an approved category, with daily, verifiable valuation.</p></div>" +
              "<div class='rule'><h4>Short exposure <span class='law'>Art. 89 UCITS</span></h4><p>A CFD is a permitted way to gain short exposure — physical short selling is prohibited.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Market value of the underlying; long/short netting in the same share.</p></div>" +
              "<div class='rule'><h4>Look-through and counterparty <span class='law'>Art. 51(3), Art. 52</span></h4><p>Long CFD — exposure to the share issuer. Counterparty: 10% / 5% of NAV, 20% combined limit.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: market value of the underlying (CFDs are listed explicitly as an instrument to convert).</li>" +
              "<li>Long/short strategy limits per the AIF's documents.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR, SSR, transparency",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>EMIR <span class='law'>Art. 9, 11 EMIR</span></h4><p>Report by T+1; confirmation, VM and IM (above the threshold). No clearing obligation.</p></div>" +
              "<div class='rule'><h4>SSR <span class='law'>Reg. 236/2012</span></h4><p>Short CFDs on shares and sovereign debt count towards net short positions (0.1% / 0.5% thresholds for shares).</p></div>" +
              "<div class='rule'><h4>Major holdings <span class='law'>Art. 13 Dir. 2004/109/EC</span></h4><p>Long equity CFDs count towards notification thresholds together with shares.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), broker LEI.</li>" +
              "<li><strong>Underlying ISIN/LEI</strong> — for SSR, holding thresholds and look-through.</li>" +
              "<li><strong>CFI</strong> — usually <code>J</code> (Forwards), group <code>E</code> (Equity), flagged as CFD.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Counterparty (broker) approved and supervised; margin and its segregation.</li>" +
              "<li>Net short positions against SSR thresholds.</li>" +
              "<li>Long CFDs in major holding thresholds and issuer look-through.</li>" +
              "<li>Global exposure / leverage, counterparty limit.</li>" +
              "<li>EMIR report by T+1; financing and dividend reconciliation.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Open-ended", "No expiry — the position runs until closed."],
        ["Financing charge", "Daily cost (or income) of holding a CFD position."],
        ["Dividend adjustment", "Adjustment for the dividend equivalent: credited to longs, debited to shorts."]
      ]
    }
  }
});

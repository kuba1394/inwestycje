window.INSTRUMENTS.push({
  id: "forward-rate-agreement",
  name: "Forward Rate Agreement (FRA)",
  aliases: ["FRA", "3x6 FRA", "kontrakt FRA"],
  market: "otc",
  asset: { pl: "Derywaty stopy procentowej", en: "Interest rate derivatives" },
  sources: ["ucits", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "marginRts", "bmr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "FRA to umowa OTC, w której strony ustalają dziś stopę procentową dla przyszłego okresu (np. za 3 miesiące na kolejne 3 miesiące). Na początku tego okresu rozlicza się tylko różnicę między ustaloną stopą a fixingiem stopy referencyjnej. To pozagiełdowy odpowiednik pojedynczego kontraktu STIR.",
      keyFacts: [
        ["Rynek", "OTC; w głównych walutach często rozliczane przez CCP."],
        ["Oznaczenie", "„3x6” — okres zaczyna się za 3 miesiące i kończy za 6 (stawka 3M)."],
        ["Stopy referencyjne", "IBOR-y (EURIBOR, WIBOR i inne). Po wygaszeniu LIBOR rynek FRA w USD i GBP praktycznie zanikł."],
        ["Rozliczenie", "Gotówkowe, jednorazowe — na początku okresu odsetkowego, zdyskontowane."],
        ["Strony", "Kupujący FRA płaci stałą stopę (zyskuje na wzroście stóp); sprzedający ją otrzymuje."],
        ["Dokumentacja", "ISDA Master Agreement + CSA."],
        ["Kod CFI", "<code>JR****</code> (Forwards – Rates)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Forward Rate Agreement</em> to umowa na <strong>jeden okres odsetkowy w przyszłości</strong>. Strony uzgadniają stopę (K), nominał i okres. Nominał nie przechodzi — rozlicza się tylko różnicę odsetek.</p>" +
            "<p class='formula'>Rozliczenie = N × (L − K) × d/360 / (1 + L × d/360)</p>" +
            "<p>N — nominał, L — fixing stopy referencyjnej w dniu ustalenia, K — stopa FRA, d — liczba dni okresu. Dzielenie przez (1 + L × d/360) wynika z tego, że płatność następuje na <strong>początku</strong> okresu, a odsetki normalnie płaci się na końcu.</p>" +
            "<p>Gdy L &gt; K, kupujący FRA dostaje płatność. Gdy L &lt; K — płaci. Seria FRA na kolejne okresy (strip) odpowiada krótkiemu <a href='#/i/interest-rate-swap'>Interest Rate Swap</a>.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Uzgodnienie nominału, okresu (np. 3x6), stopy FRA i indeksu (np. EURIBOR 3M).</li>" +
              "<li><strong>Do dnia fixingu.</strong> Wycena zmienia się wraz z oczekiwaniami co do przyszłej stopy. Ewentualny VM według CSA lub z CCP.</li>" +
              "<li><strong>Fixing.</strong> Zwykle 2 dni robocze przed początkiem okresu publikowana jest stawka referencyjna.</li>" +
              "<li><strong>Rozliczenie.</strong> Na początku okresu płatność netto według wzoru; FRA wygasa.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz (NAV 200 mln EUR) ma obligacje o zmiennym oprocentowaniu i boi się wzrostu kosztu finansowania pozycji. Kupuje FRA 3x6 na nominał 50 mln EUR po 2,30% na EURIBOR 3M. Okres: 92 dni.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Fixing EURIBOR 3M</td><td>—</td><td class='num'>2,55%</td></tr>" +
              "<tr><td>Różnica odsetek (płatna normalnie na końcu okresu)</td><td>50 000 000 × (2,55% − 2,30%) × 92/360</td><td class='num'>31 944,44 EUR</td></tr>" +
              "<tr><td>Rozliczenie na początku okresu (zdyskontowane)</td><td>31 944,44 / (1 + 2,55% × 92/360)</td><td class='num'>31 737,62 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Ekspozycja w metodzie zaangażowania</strong> (CESR/10-788): nominał = 50 mln EUR = 25% NAV, choć ryzyko to ok. 1 280 EUR na 1 pb (50 mln × 0,0001 × 92/360). Dlatego stosuje się duration netting.</li>" +
              "<li>FRA w EUR podlegają obowiązkowi clearingu dla kontrahentów powyżej progów. Rozliczone przez CCP są poza limitem kontrahenta UCITS.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> stopa forward z krzywej danego indeksu vs stopa FRA, zdyskontowana krzywą OIS.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — krótki punkt krzywej.</li>" +
              "<li><strong>Ryzyko kontrahenta</strong> — dla transakcji bilateralnych.</li>" +
              "<li><strong>Ryzyko wskaźnika</strong> — FRA istnieją tylko dla indeksów ustalanych z góry (IBOR). Zmiana lub wygaszenie wskaźnika wymaga zapisów fallback.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie, potwierdzenie, ewentualnie clearing.</li>" +
              "<li>Wycena, VM.</li>" +
              "<li>Fixing i jednorazowe rozliczenie gotówkowe.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywat OTC na stopy procentowe; warunki kontrahenta, wyceny i możliwości zamknięcia.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>CESR/10-788</span></h4><p>Nominał; duration netting dla portfeli stopy procentowej.</p></div>" +
              "<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1–2 (po dyr. 2024/2994)</span></h4><p>10% / 5% NAV dla FRA nierozliczanych centralnie; limit łączny 20%.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: nominał; w metodzie zaangażowania duration netting na warunkach rozporządzenia.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, zabezpieczenia, raportowanie",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Obowiązek rozliczania <span class='law'>art. 4 EMIR; rozp. 2015/2205, 2016/1178</span></h4><p>Obejmuje m.in. FRA w EUR, a także w PLN, NOK i SEK — w określonych tenorach i dla kontrahentów powyżej progów.</p></div>" +
              "<div class='rule'><h4>Nierozliczane centralnie <span class='law'>art. 11 EMIR; rozp. 2016/2251</span></h4><p>Potwierdzenie, uzgadnianie portfela, VM między FC, IM powyżej progu.</p></div>" +
              "<div class='rule'><h4>Raportowanie <span class='law'>art. 9 EMIR</span></h4><p>Do T+1. Odpowiada spółka zarządzająca lub ZAFI.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), LEI kontrahenta.</li>" +
              "<li><strong>CFI</strong> — <code>J</code> (Forwards), grupa <code>R</code> (Rates).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Status clearingu; limit kontrahenta dla bilateralnych.</li>" +
              "<li>Ekspozycja całkowita i duration netting.</li>" +
              "<li>Uzgodnienie kwoty rozliczenia po fixingu.</li>" +
              "<li>Raport EMIR, wskaźnik w rejestrze BMR.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["3x6", "FRA na okres zaczynający się za 3 miesiące i kończący za 6 miesięcy."],
        ["Fixing date", "Dzień ustalenia stopy referencyjnej dla okresu FRA."],
        ["FRA strip", "Seria FRA na kolejne okresy."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An FRA is an OTC contract in which the parties fix today the interest rate for a future period (e.g. 3 months from now for 3 months). At the start of that period only the difference between the agreed rate and the reference rate fixing is settled. It is the OTC equivalent of a single STIR contract.",
      keyFacts: [
        ["Market", "OTC; in the main currencies often cleared through a CCP."],
        ["Notation", "\"3x6\" — the period starts in 3 months and ends in 6 (3M rate)."],
        ["Reference rates", "IBORs (EURIBOR, WIBOR and others). After LIBOR ended, the USD and GBP FRA markets practically disappeared."],
        ["Settlement", "Cash, one-off — at the start of the interest period, discounted."],
        ["Parties", "The FRA buyer pays the fixed rate (gains when rates rise); the seller receives it."],
        ["Documentation", "ISDA Master Agreement + CSA."],
        ["CFI code", "<code>JR****</code> (Forwards – Rates)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Forward Rate Agreement is a contract on <strong>one future interest period</strong>. The parties agree the rate (K), notional and period. The notional does not change hands — only the interest difference is settled.</p>" +
            "<p class='formula'>Settlement = N × (L − K) × d/360 / (1 + L × d/360)</p>" +
            "<p>N — notional, L — reference rate fixing, K — FRA rate, d — days in the period. Dividing by (1 + L × d/360) reflects that payment is made at the <strong>start</strong> of the period, while interest is normally paid at the end.</p>" +
            "<p>When L &gt; K the FRA buyer receives a payment. When L &lt; K it pays. A series of FRAs over consecutive periods (a strip) is equivalent to a short <a href='#/i/interest-rate-swap'>Interest Rate Swap</a>.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> Agree notional, period (e.g. 3x6), FRA rate and index (e.g. 3M EURIBOR).</li>" +
              "<li><strong>Until fixing.</strong> Value changes with expectations of the future rate. VM under the CSA or with the CCP where applicable.</li>" +
              "<li><strong>Fixing.</strong> Usually 2 business days before the period starts, the reference rate is published.</li>" +
              "<li><strong>Settlement.</strong> At the start of the period the net amount per the formula is paid; the FRA ends.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A fund (NAV EUR 200m) has floating-rate positions and fears a rise in funding costs. It buys a 3x6 FRA on EUR 50m notional at 2.30% on 3M EURIBOR. Period: 92 days.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>3M EURIBOR fixing</td><td>—</td><td class='num'>2.55%</td></tr>" +
              "<tr><td>Interest difference (normally paid at period end)</td><td>50,000,000 × (2.55% − 2.30%) × 92/360</td><td class='num'>EUR 31,944.44</td></tr>" +
              "<tr><td>Settlement at period start (discounted)</td><td>31,944.44 / (1 + 2.55% × 92/360)</td><td class='num'>EUR 31,737.62</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Commitment exposure</strong> (CESR/10-788): notional = EUR 50m = 25% of NAV, although the risk is about EUR 1,280 per bp (50m × 0.0001 × 92/360). That is why duration netting is used.</li>" +
              "<li>EUR FRAs are subject to the clearing obligation for counterparties above the thresholds. Once cleared through a CCP they fall outside the UCITS counterparty limit.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> forward rate from the index curve vs the FRA rate, discounted on the OIS curve.</p>" +
            "<ul>" +
              "<li><strong>Interest rate risk</strong> — short end of the curve.</li>" +
              "<li><strong>Counterparty risk</strong> — for bilateral trades.</li>" +
              "<li><strong>Benchmark risk</strong> — FRAs exist only for indices set in advance (IBORs). A change or cessation of the benchmark requires fallback provisions.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution, confirmation, clearing where applicable.</li>" +
              "<li>Valuation, VM.</li>" +
              "<li>Fixing and one-off cash settlement.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>OTC interest rate derivative; counterparty, valuation and close-out conditions.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Notional; duration netting for interest rate portfolios.</p></div>" +
              "<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1)–(2) (after Dir. 2024/2994)</span></h4><p>10% / 5% of NAV for non-centrally cleared FRAs; 20% combined limit.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: notional; duration netting under the commitment method on the Regulation's conditions.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, margin, reporting",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Clearing obligation <span class='law'>Art. 4 EMIR; Reg. 2015/2205, 2016/1178</span></h4><p>Covers, among others, FRAs in EUR, and also in PLN, NOK and SEK — for specified tenors and counterparties above the thresholds.</p></div>" +
              "<div class='rule'><h4>Non-centrally cleared <span class='law'>Art. 11 EMIR; Reg. 2016/2251</span></h4><p>Confirmation, portfolio reconciliation, VM between FCs, IM above the threshold.</p></div>" +
              "<div class='rule'><h4>Reporting <span class='law'>Art. 9 EMIR</span></h4><p>By T+1. The management company or AIFM is responsible.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), counterparty LEI.</li>" +
              "<li><strong>CFI</strong> — <code>J</code> (Forwards), group <code>R</code> (Rates).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Clearing status; counterparty limit for bilateral trades.</li>" +
              "<li>Global exposure and duration netting.</li>" +
              "<li>Settlement amount reconciled after fixing.</li>" +
              "<li>EMIR report, benchmark in the BMR register.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["3x6", "FRA on a period starting in 3 months and ending in 6 months."],
        ["Fixing date", "Date the reference rate for the FRA period is set."],
        ["FRA strip", "A series of FRAs over consecutive periods."]
      ]
    }
  }
});

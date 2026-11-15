window.INSTRUMENTS.push({
  id: "interest-rate-cap-floor",
  name: "Interest Rate Cap / Floor",
  aliases: ["Cap", "Floor", "Collar", "Caplet", "Floorlet", "opcja na stopę procentową"],
  market: "otc",
  asset: { pl: "Derywaty stopy procentowej", en: "Interest rate derivatives" },
  sources: ["ucits", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "marginRts", "bmr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Cap i floor to opcje OTC na stopę procentową. Cap wypłaca różnicę, gdy stopa referencyjna przekroczy ustalony poziom, a floor — gdy spadnie poniżej niego. Każdy jest serią opcji na kolejne okresy odsetkowe (caplety lub floorlety). Kupujący płaci premię z góry i ogranicza ryzyko zmiennej stopy.",
      keyFacts: [
        ["Rynek", "OTC, bilateralnie z bankiem; brak obowiązku clearingu."],
        ["Budowa", "Seria capletów/floorletów — po jednym na każdy okres (np. 12 kwartałów dla 3-letniego capu na EURIBOR 3M)."],
        ["Wypłata", "Cap: N × max(L − K, 0) × d/360; floor: N × max(K − L, 0) × d/360 — za każdy okres."],
        ["Premia", "Płatna z góry (czasem rozłożona)."],
        ["Strategie", "Collar = kupno capu + sprzedaż floora (lub odwrotnie), często bezkosztowo (zero-cost collar)."],
        ["Typowi użytkownicy", "Kredytobiorcy ze zmienną stopą (cap), inwestorzy w obligacje zmiennokuponowe (floor)."],
        ["Kod CFI", "<code>HR****</code> (Non-listed options – Rates)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Cap</em> działa jak ubezpieczenie od wzrostu stóp: w każdym okresie, w którym stopa referencyjna (L) przekracza poziom capu (K), sprzedający wypłaca różnicę od nominału. <em>Floor</em> działa odwrotnie — chroni przed spadkiem stóp poniżej poziomu floora.</p>" +
            "<p class='formula'>Wypłata capletu = N × max(L − K, 0) × d/360</p>" +
            "<p class='formula'>Wypłata floorletu = N × max(K − L, 0) × d/360</p>" +
            "<p>Każdy caplet i floorlet to osobna opcja europejska na stopę za dany okres. Stopa ustalana jest na początku okresu, a wypłata następuje na jego końcu.</p>" +
            "<p><strong>Collar</strong> łączy kupno capu i sprzedaż floora: premia ze sprzedaży floora pokrywa koszt capu, a w zamian rezygnuje się z korzyści przy spadku stóp poniżej floora.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Nominał, indeks (np. EURIBOR 3M), poziom capu lub floora, termin, częstotliwość. Kupujący płaci premię.</li>" +
              "<li><strong>Fixing w każdym okresie.</strong> Na początku okresu znana jest stopa referencyjna; jeśli caplet/floorlet jest in-the-money, wypłata jest już ustalona.</li>" +
              "<li><strong>Płatność</strong> na koniec okresu, automatycznie (bez decyzji o wykonaniu).</li>" +
              "<li><strong>W trakcie</strong> — codzienna wycena, VM według CSA.</li>" +
              "<li><strong>Koniec</strong> po ostatnim okresie.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz (NAV 200 mln EUR) ma 30 mln EUR obligacji zmiennokuponowych na EURIBOR 3M i chce zabezpieczyć dochód przed spadkiem stóp. Kupuje 3-letni floor na EURIBOR 3M ze strike'iem 1,50%, premia 0,40% nominału.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Premia</td><td>30 000 000 × 0,40%</td><td class='num'>120 000 EUR</td></tr>" +
              "<tr><td>Kwartał, w którym EURIBOR = 1,00% (91 dni) — wypłata floorletu</td><td>30 000 000 × (1,50% − 1,00%) × 91/360</td><td class='num'>37 916,67 EUR</td></tr>" +
              "<tr><td>Kwartał, w którym EURIBOR ≥ 1,50%</td><td>floorlet out-of-the-money</td><td class='num'>0</td></tr>" +
            "</tbody></table></div>" +
            "<p>Dzięki floorowi łączny dochód z obligacji i floora nie spadnie poniżej odpowiednika 1,50% plus marża obligacji (minus koszt premii).</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Ekspozycja w metodzie zaangażowania:</strong> opcję na stopę przelicza się w ekwiwalencie delta (nominał × delta, zgodnie z polityką). Kupiony floor zabezpieczający zmiennokuponowe obligacje może spełniać warunki hedgingu.</li>" +
              "<li><strong>Kontrahent:</strong> wycena floora to należność od banku (limit 10% NAV).</li>" +
              "<li><strong>Collar:</strong> sprzedany floor to wystawiona opcja — wymaga pokrycia i ujęcia w ekspozycji.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> suma wartości capletów/floorletów z modelu (Bachelier lub Black) z powierzchnią zmienności cap/floor.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko stopy procentowej i zmienności.</strong></li>" +
              "<li><strong>Ryzyko kontrahenta</strong> dla kupującego.</li>" +
              "<li><strong>Ryzyko bazy</strong> — indeks capu/floora inny niż indeks zabezpieczanej pozycji.</li>" +
              "<li><strong>Ryzyko wskaźnika</strong> — zmiana lub wygaszenie IBOR.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie, potwierdzenie, premia.</li>" +
              "<li>Fixingi i okresowe płatności, wycena, VM.</li>" +
              "<li>Wygaśnięcie po ostatnim okresie.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywat OTC na stopy procentowe; warunki kontrahenta i wyceny.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>CESR/10-788</span></h4><p>Ekwiwalent delta instrumentu bazowego; hedging według wytycznych.</p></div>" +
              "<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1–2</span></h4><p>10% / 5% NAV, limit łączny 20%, zabezpieczenia.</p></div>" +
              "<div class='rule'><h4>Opcje wystawione</h4><p>Sprzedany cap lub floor (np. w collarze) wymaga pokrycia płynnymi aktywami.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: nominał × delta.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, zabezpieczenia, raportowanie",
          html:
            "<ul>" +
              "<li>Brak obowiązku clearingu.</li>" +
              "<li>VM między FC, IM powyżej progu AANA (rozp. 2016/2251).</li>" +
              "<li>Raport do T+1 (art. 9 EMIR); odpowiada spółka zarządzająca lub ZAFI.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), LEI kontrahenta.</li>" +
              "<li><strong>CFI</strong> — <code>H</code> (Non-listed options), grupa <code>R</code> (Rates).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Kierunek: kupno vs sprzedaż (collar zawiera opcję wystawioną).</li>" +
              "<li>Ekspozycja w ekwiwalencie delta, oznaczenie hedgingu.</li>" +
              "<li>Limit kontrahenta, zabezpieczenia.</li>" +
              "<li>Uzgodnienie okresowych płatności po fixingach.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Caplet / floorlet", "Pojedyncza opcja na stopę za jeden okres odsetkowy."],
        ["Strike (cap rate / floor rate)", "Poziom stopy, od którego cap lub floor zaczyna wypłacać."],
        ["Collar", "Kombinacja kupionego capu i sprzedanego floora (lub odwrotnie)."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "Caps and floors are OTC interest rate options. A cap pays the difference when the reference rate exceeds a set level, and a floor when it falls below it. Each is a series of options on consecutive interest periods (caplets or floorlets). The buyer pays an upfront premium and limits floating-rate risk.",
      keyFacts: [
        ["Market", "OTC, bilateral with a bank; no clearing obligation."],
        ["Structure", "A series of caplets/floorlets — one per period (e.g. 12 quarters for a 3-year cap on 3M EURIBOR)."],
        ["Payout", "Cap: N × max(L − K, 0) × d/360; floor: N × max(K − L, 0) × d/360 — for each period."],
        ["Premium", "Paid upfront (sometimes amortised)."],
        ["Strategies", "Collar = buy a cap + sell a floor (or vice versa), often zero-cost."],
        ["Typical users", "Floating-rate borrowers (cap), floating-rate note investors (floor)."],
        ["CFI code", "<code>HR****</code> (Non-listed options – Rates)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A cap works like insurance against rising rates: in every period in which the reference rate (L) exceeds the cap level (K), the seller pays the difference on the notional. A floor works the other way — it protects against rates falling below the floor level.</p>" +
            "<p class='formula'>Caplet payout = N × max(L − K, 0) × d/360</p>" +
            "<p class='formula'>Floorlet payout = N × max(K − L, 0) × d/360</p>" +
            "<p>Each caplet and floorlet is a separate European option on the rate for one period. The rate is fixed at the start of the period, and the payout is made at its end.</p>" +
            "<p>A <strong>collar</strong> combines buying a cap and selling a floor: the floor premium pays for the cap, in exchange for giving up the benefit of rates falling below the floor.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> Notional, index (e.g. 3M EURIBOR), cap or floor level, maturity, frequency. The buyer pays the premium.</li>" +
              "<li><strong>Fixing each period.</strong> At the start of each period the reference rate is known; if the caplet/floorlet is in-the-money, the payout is already set.</li>" +
              "<li><strong>Payment</strong> at period end, automatically (no exercise decision).</li>" +
              "<li><strong>During the life</strong> — daily valuation, VM under the CSA.</li>" +
              "<li><strong>End</strong> after the last period.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A fund (NAV EUR 200m) holds EUR 30m of floating-rate notes on 3M EURIBOR and wants to protect its income against falling rates. It buys a 3-year floor on 3M EURIBOR with a 1.50% strike, premium 0.40% of notional.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>Premium</td><td>30,000,000 × 0.40%</td><td class='num'>EUR 120,000</td></tr>" +
              "<tr><td>Quarter with EURIBOR = 1.00% (91 days) — floorlet payout</td><td>30,000,000 × (1.50% − 1.00%) × 91/360</td><td class='num'>EUR 37,916.67</td></tr>" +
              "<tr><td>Quarter with EURIBOR ≥ 1.50%</td><td>floorlet out-of-the-money</td><td class='num'>0</td></tr>" +
            "</tbody></table></div>" +
            "<p>With the floor, the combined income from the notes and the floor cannot fall below the equivalent of 1.50% plus the notes' margin (less the premium cost).</p>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Commitment exposure:</strong> a rate option is converted on a delta-equivalent basis (notional × delta, per policy). A floor bought to hedge floating-rate notes may meet the hedging conditions.</li>" +
              "<li><strong>Counterparty:</strong> the floor's value is a receivable from the bank (10% of NAV limit).</li>" +
              "<li><strong>Collar:</strong> the floor sold is a written option — it requires cover and must be included in exposure.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> sum of caplet/floorlet values from a model (Bachelier or Black) with the cap/floor volatility surface.</p>" +
            "<ul>" +
              "<li><strong>Interest rate and volatility risk.</strong></li>" +
              "<li><strong>Counterparty risk</strong> for the buyer.</li>" +
              "<li><strong>Basis risk</strong> — cap/floor index differs from the hedged position's index.</li>" +
              "<li><strong>Benchmark risk</strong> — change or cessation of the IBOR.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution, confirmation, premium.</li>" +
              "<li>Fixings and periodic payments, valuation, VM.</li>" +
              "<li>Expiry after the last period.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>OTC interest rate derivative; counterparty and valuation conditions.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Delta-equivalent of the underlying; hedging per the guidelines.</p></div>" +
              "<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1)–(2)</span></h4><p>10% / 5% of NAV, 20% combined limit, collateral.</p></div>" +
              "<div class='rule'><h4>Written options</h4><p>A cap or floor sold (e.g. in a collar) requires cover in liquid assets.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: notional × delta.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, margin, reporting",
          html:
            "<ul>" +
              "<li>No clearing obligation.</li>" +
              "<li>VM between FCs, IM above the AANA threshold (Reg. 2016/2251).</li>" +
              "<li>Report by T+1 (Art. 9 EMIR); the management company or AIFM is responsible.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), counterparty LEI.</li>" +
              "<li><strong>CFI</strong> — <code>H</code> (Non-listed options), group <code>R</code> (Rates).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Direction: bought vs sold (a collar contains a written option).</li>" +
              "<li>Delta-equivalent exposure, hedge flag.</li>" +
              "<li>Counterparty limit, collateral.</li>" +
              "<li>Periodic payments reconciled after fixings.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Caplet / floorlet", "A single rate option for one interest period."],
        ["Strike (cap rate / floor rate)", "The rate level at which the cap or floor starts to pay."],
        ["Collar", "Combination of a cap bought and a floor sold (or vice versa)."]
      ]
    }
  }
});

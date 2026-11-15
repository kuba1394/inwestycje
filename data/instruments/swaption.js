window.INSTRUMENTS.push({
  id: "swaption",
  name: "Swaption",
  aliases: ["Payer Swaption", "Receiver Swaption", "opcja na swap"],
  market: "otc",
  asset: { pl: "Derywaty stopy procentowej", en: "Interest rate derivatives" },
  sources: ["ucits", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "marginRts"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Swaption to opcja OTC, która daje prawo (ale nie obowiązek) zawarcia w przyszłości swapu procentowego po stałej stopie ustalonej dziś. Kupujący płaci premię i zyskuje ochronę przed niekorzystnym ruchem stóp, zachowując korzyść z ruchu korzystnego.",
      keyFacts: [
        ["Rynek", "OTC, bilateralnie z bankiem; brak obowiązku clearingu."],
        ["Typy", "Payer swaption — prawo płacenia stałej stopy (zyskuje na wzroście stóp). Receiver swaption — prawo otrzymywania stałej (zyskuje na spadku)."],
        ["Oznaczenie", "„1y×10y” (1y10y) — opcja wygasa za rok i daje prawo do 10-letniego swapu."],
        ["Styl", "Europejski (najczęściej), bermudzki, amerykański."],
        ["Rozliczenie", "Fizyczne (zawarcie swapu, często od razu rozliczanego przez CCP) albo gotówkowe."],
        ["Premia", "Płatna z góry, zwykle wyrażona jako % nominału lub pb."],
        ["Kod CFI", "<code>HR****</code> (Non-listed options – Rates)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p>Swaption to <strong>opcja, której instrumentem bazowym jest <a href='#/i/interest-rate-swap'>Interest Rate Swap</a></strong>. Cena wykonania (strike) to stała stopa przyszłego swapu.</p>" +
            "<ul>" +
              "<li><strong>Payer swaption</strong> — w dniu wygaśnięcia, jeśli rynkowa stopa swapowa jest wyższa od strike'u, wykonanie daje swap, w którym płaci się mniej niż rynek. Zabezpiecza przed wzrostem stóp.</li>" +
              "<li><strong>Receiver swaption</strong> — wartościowa, gdy rynkowa stopa jest niższa od strike'u. Zabezpiecza przed spadkiem stóp.</li>" +
            "</ul>" +
            "<p>Wartość w dniu wygaśnięcia (dla payera):</p>" +
            "<p class='formula'>max(S − K, 0) × annuity × nominał</p>" +
            "<p>S — stopa swapowa w dniu wygaśnięcia, K — strike, annuity — wartość bieżąca 1% rocznie przez okres swapu (dla 10 lat ok. 8–9).</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Typ (payer/receiver), strike, termin opcji, parametry swapu bazowego, styl, sposób rozliczenia. Kupujący płaci premię (zwykle T+2).</li>" +
              "<li><strong>W trakcie.</strong> Wycena zależy od stopy forward swapu, zmienności implikowanej (w pb) i czasu. Strony wymieniają VM według CSA.</li>" +
              "<li><strong>Wygaśnięcie.</strong> Jeśli opcja jest in-the-money, kupujący ją wykonuje: zawiera swap (rozliczenie fizyczne) albo dostaje gotówkę (rozliczenie gotówkowe, według formuły z dokumentacji).</li>" +
              "<li><strong>Po wykonaniu fizycznym</strong> powstaje nowy IRS z własnym cyklem życia, często przekazywany do CCP.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz obligacji (NAV 200 mln EUR) chce zabezpieczyć się przed gwałtownym wzrostem długoterminowych stóp za rok, nie rezygnując z zysków przy ich spadku. Kupuje payer swaption 1y×10y: nominał 20 mln EUR, strike 3,00%, premia 1,20% nominału, delta 0,45.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Premia</td><td>20 000 000 × 1,20%</td><td class='num'>240 000 EUR</td></tr>" +
              "<tr><td>Za rok 10-letnia stopa swapowa = 3,60%; wartość (annuity 8,3)</td><td>(3,60% − 3,00%) × 8,3 × 20 000 000</td><td class='num'>996 000 EUR</td></tr>" +
              "<tr><td>Wynik netto</td><td>996 000 − 240 000</td><td class='num'>+756 000 EUR</td></tr>" +
              "<tr><td>Stopa za rok ≤ 3,00%</td><td>opcja wygasa bez wartości</td><td class='num'>−240 000 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Ekspozycja w metodzie zaangażowania</strong> (CESR/10-788): ekwiwalent swapu bazowego × delta = 20 mln × 0,45 = <strong>9 mln EUR (4,5% NAV)</strong>. Zmienia się codziennie z deltą.</li>" +
              "<li><strong>Kontrahent:</strong> po zapłacie premii fundusz (kupujący) ma należność od banku równą wycenie opcji — ekspozycja wobec limitu 10% NAV, pomniejszona o zabezpieczenie.</li>" +
              "<li>Gdyby fundusz <strong>sprzedał</strong> swaption, musiałby mieć pokrycie i rozważyć, czy metoda zaangażowania właściwie oddaje ryzyko.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> model Bacheliera (normalny, zmienność w pb) lub Black'a, z kostki zmienności swaptions (termin opcji × tenor swapu × strike). Wymaga niezależnej weryfikacji parametrów.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko stopy procentowej</strong> (delta, gamma).</li>" +
              "<li><strong>Ryzyko zmienności</strong> (vega).</li>" +
              "<li><strong>Ryzyko kontrahenta</strong> — dla kupującego przez cały okres opcji.</li>" +
              "<li><strong>Ryzyko modelu i wyceny</strong> — mało płynne kombinacje terminów i strike'ów.</li>" +
              "<li><strong>Ryzyko rozliczenia</strong> — metoda rozliczenia gotówkowego może dawać inną kwotę niż wycena rynkowa.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie, potwierdzenie, rozliczenie premii.</li>" +
              "<li>Wycena, VM/IM.</li>" +
              "<li>Wygaśnięcie: wykonanie (swap lub gotówka) albo wygaśnięcie bez wartości.</li>" +
              "<li>Przy wykonaniu fizycznym — nowy swap w systemach i limitach.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywat OTC na stopy procentowe; warunki kontrahenta, codziennej wyceny i możliwości zamknięcia.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>CESR/10-788</span></h4><p>Kwota konwersji swapu bazowego × delta.</p></div>" +
              "<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1–2</span></h4><p>10% / 5% NAV i limit łączny 20%; zabezpieczenie według ESMA/2014/937.</p></div>" +
              "<div class='rule'><h4>Metoda pomiaru</h4><p>Przy znaczącym użyciu opcji (zwłaszcza wystawianych) nadzorcy oczekują, że fundusz rozważy metodę VaR, bo zaangażowanie nie oddaje ryzyka gamma i vega.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: ekwiwalent swapu bazowego × delta.</li>" +
              "<li>Limity strategii opcyjnych — według dokumentów AIF.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, zabezpieczenia, raportowanie",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Clearing</h4><p>Swaptions nie podlegają obowiązkowi rozliczania przez CCP. Swap powstały z wykonania może mu podlegać.</p></div>" +
              "<div class='rule'><h4>Depozyty <span class='law'>rozp. 2016/2251</span></h4><p>VM między FC, IM powyżej progu AANA.</p></div>" +
              "<div class='rule'><h4>Raportowanie <span class='law'>art. 9 EMIR</span></h4><p>Do T+1; wykonanie raportuje się jako zdarzenie cyklu życia, a nowy swap — jako nową transakcję.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), LEI kontrahenta.</li>" +
              "<li><strong>CFI</strong> — kategoria <code>H</code> (Non-listed and complex listed options), grupa <code>R</code> (Rates).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Kierunek (kupno/wystawienie) i typ (payer/receiver) poprawnie w systemie.</li>" +
              "<li>Ekspozycja całkowita w ekwiwalencie delta; ocena adekwatności metody.</li>" +
              "<li>Limit kontrahenta, zabezpieczenia.</li>" +
              "<li>Niezależna wycena (zmienność).</li>" +
              "<li>Kalendarz wygaśnięć; po wykonaniu — nowy swap w limitach i raportach.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Payer / receiver swaption", "Prawo do swapu, w którym płaci się / otrzymuje stałą stopę."],
        ["1y×10y", "Opcja wygasająca za rok na 10-letni swap."],
        ["Annuity", "Wartość bieżąca płatności 1% rocznie przez okres swapu."],
        ["Normal volatility", "Zmienność stóp wyrażona w punktach bazowych (model Bacheliera)."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A swaption is an OTC option giving the right (but not the obligation) to enter into an interest rate swap in the future at a fixed rate set today. The buyer pays a premium and gains protection against an adverse rate move while keeping the benefit of a favourable one.",
      keyFacts: [
        ["Market", "OTC, bilateral with a bank; no clearing obligation."],
        ["Types", "Payer swaption — right to pay fixed (gains when rates rise). Receiver swaption — right to receive fixed (gains when rates fall)."],
        ["Notation", "\"1y×10y\" (1y10y) — the option expires in one year and gives a right to a 10-year swap."],
        ["Style", "European (most common), Bermudan, American."],
        ["Settlement", "Physical (entering the swap, often cleared through a CCP right away) or cash."],
        ["Premium", "Paid upfront, usually quoted as % of notional or in bp."],
        ["CFI code", "<code>HR****</code> (Non-listed options – Rates)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A swaption is an <strong>option whose underlying is an <a href='#/i/interest-rate-swap'>Interest Rate Swap</a></strong>. The strike is the fixed rate of the future swap.</p>" +
            "<ul>" +
              "<li><strong>Payer swaption</strong> — at expiry, if the market swap rate is above the strike, exercise gives a swap paying less than the market. Protects against rising rates.</li>" +
              "<li><strong>Receiver swaption</strong> — valuable when the market rate is below the strike. Protects against falling rates.</li>" +
            "</ul>" +
            "<p>Value at expiry (payer):</p>" +
            "<p class='formula'>max(S − K, 0) × annuity × notional</p>" +
            "<p>S — swap rate at expiry, K — strike, annuity — present value of 1% a year over the swap's life (for 10 years about 8–9).</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> Type (payer/receiver), strike, option expiry, underlying swap terms, style, settlement method. The buyer pays the premium (usually T+2).</li>" +
              "<li><strong>During the life.</strong> Value depends on the forward swap rate, implied volatility (in bp) and time. The parties exchange VM under the CSA.</li>" +
              "<li><strong>Expiry.</strong> If in-the-money, the buyer exercises: enters the swap (physical settlement) or receives cash (cash settlement, per the documented formula).</li>" +
              "<li><strong>After physical exercise</strong> a new IRS exists with its own lifecycle, often passed to a CCP.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A bond fund (NAV EUR 200m) wants to hedge against a sharp rise in long rates in a year's time without giving up gains if they fall. It buys a 1y×10y payer swaption: EUR 20m notional, 3.00% strike, premium 1.20% of notional, delta 0.45.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>Premium</td><td>20,000,000 × 1.20%</td><td class='num'>EUR 240,000</td></tr>" +
              "<tr><td>In a year the 10-year swap rate = 3.60%; value (annuity 8.3)</td><td>(3.60% − 3.00%) × 8.3 × 20,000,000</td><td class='num'>EUR 996,000</td></tr>" +
              "<tr><td>Net result</td><td>996,000 − 240,000</td><td class='num'>+EUR 756,000</td></tr>" +
              "<tr><td>Rate in a year ≤ 3.00%</td><td>option expires worthless</td><td class='num'>−EUR 240,000</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Commitment exposure</strong> (CESR/10-788): underlying swap equivalent × delta = 20m × 0.45 = <strong>EUR 9m (4.5% of NAV)</strong>. It changes daily with delta.</li>" +
              "<li><strong>Counterparty:</strong> after paying the premium, the fund (buyer) has a receivable from the bank equal to the option value — exposure against the 10% of NAV limit, less collateral.</li>" +
              "<li>Had the fund <strong>sold</strong> the swaption, it would need cover and should consider whether the commitment approach properly captures the risk.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> Bachelier (normal, volatility in bp) or Black model, from the swaption volatility cube (option expiry × swap tenor × strike). Parameters require independent verification.</p>" +
            "<ul>" +
              "<li><strong>Interest rate risk</strong> (delta, gamma).</li>" +
              "<li><strong>Volatility risk</strong> (vega).</li>" +
              "<li><strong>Counterparty risk</strong> — for the buyer throughout the option's life.</li>" +
              "<li><strong>Model and valuation risk</strong> — illiquid expiry/strike combinations.</li>" +
              "<li><strong>Settlement risk</strong> — the cash settlement method may give a different amount from the market value.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution, confirmation, premium settlement.</li>" +
              "<li>Valuation, VM/IM.</li>" +
              "<li>Expiry: exercise (swap or cash) or worthless expiry.</li>" +
              "<li>On physical exercise — a new swap in systems and limits.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>OTC interest rate derivative; counterparty, daily valuation and close-out conditions.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Underlying swap conversion amount × delta.</p></div>" +
              "<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1)–(2)</span></h4><p>10% / 5% of NAV and the 20% combined limit; collateral per ESMA/2014/937.</p></div>" +
              "<div class='rule'><h4>Measurement method</h4><p>With significant option use (especially written options), regulators expect the fund to consider the VaR approach, because commitment does not capture gamma and vega risk.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: underlying swap equivalent × delta.</li>" +
              "<li>Option strategy limits — per the AIF's documents.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, margin, reporting",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Clearing</h4><p>Swaptions are not subject to the clearing obligation. The swap resulting from exercise may be.</p></div>" +
              "<div class='rule'><h4>Margin <span class='law'>Reg. 2016/2251</span></h4><p>VM between FCs, IM above the AANA threshold.</p></div>" +
              "<div class='rule'><h4>Reporting <span class='law'>Art. 9 EMIR</span></h4><p>By T+1; exercise is reported as a lifecycle event, and the new swap as a new trade.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), counterparty LEI.</li>" +
              "<li><strong>CFI</strong> — category <code>H</code> (Non-listed and complex listed options), group <code>R</code> (Rates).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Direction (bought/written) and type (payer/receiver) correct in the system.</li>" +
              "<li>Delta-equivalent global exposure; adequacy of the method assessed.</li>" +
              "<li>Counterparty limit, collateral.</li>" +
              "<li>Independent valuation (volatility).</li>" +
              "<li>Expiry calendar; after exercise — new swap in limits and reports.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Payer / receiver swaption", "Right to a swap paying / receiving the fixed rate."],
        ["1y×10y", "Option expiring in one year on a 10-year swap."],
        ["Annuity", "Present value of 1% a year paid over the swap's life."],
        ["Normal volatility", "Rate volatility expressed in basis points (Bachelier model)."]
      ]
    }
  }
});

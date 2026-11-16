window.INSTRUMENTS.push({
  id: "variance-swap",
  name: "Variance Swap",
  aliases: ["Volatility Swap", "Variance/Volatility Swap", "Vol Swap", "swap na wariancję", "swap na zmienność"],
  market: "otc",
  asset: { pl: "Derywaty OTC — zmienność", en: "OTC derivatives — volatility" },
  sources: ["ucits", "cesr10788", "emir", "marginRts"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Swap na zmienność: na końcu okresu strony rozliczają różnicę między zrealizowaną wariancją (kwadratem zmienności) indeksu lub akcji a poziomem ustalonym w dniu zawarcia. Kupujący zyskuje, gdy rynek był bardziej zmienny, niż zakładano. Volatility swap działa podobnie, ale na zmienności, a nie jej kwadracie.",
      keyFacts: [
        ["Wypłata (variance)", "Nominał wariancji × (σ²<sub>zrealizowana</sub> − K²)."],
        ["Nominał wariancji", "Vega notional / (2 × K)."],
        ["Zmienność zrealizowana", "Z dziennych logarytmicznych stóp zwrotu, annualizowana (× 252)."],
        ["Wypukłość", "Wypłata rośnie z kwadratem zmienności — duże straty dla sprzedającego w kryzysie; często z limitem (cap)."],
        ["Ekspozycja (CESR)", "Nominał wariancji × bieżąca wariancja; vol swap: vega notional × bieżąca zmienność."],
        ["Kod CFI", "<code>S</code> — Swaps"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Variance Swap</em> to kontrakt terminowy na zrealizowaną wariancję. Strike K ustala się zwykle blisko zmienności implikowanej opcji na ten sam termin, więc swap mierzy, czy rynek przecenił lub niedocenił przyszłą zmienność.</p>
<p class='formula'>σ² = 252 / n × Σ ln(P<sub>t</sub> / P<sub>t−1</sub>)²</p>
<p>Kwotowania podaje się w punktach zmienności (np. 20 = 20%), a wariancję w punktach kwadratowych (20² = 400).</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zawarcie</strong> — indeks, termin, strike, vega notional, ewentualny cap.</li>
<li><strong>Obserwacje</strong> — codzienne ceny zamknięcia.</li>
<li><strong>Termin</strong> — wyliczenie zmienności zrealizowanej i płatność netto.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Kupno variance swap na Euro Stoxx 50: vega notional 100 000 EUR, strike 20, zrealizowana zmienność 25.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Nominał wariancji</td><td>100 000 / (2 × 20)</td><td class='num'>2 500</td></tr>
<tr><td>Wypłata</td><td>2 500 × (25² − 20²)</td><td class='num'>562 500 EUR</td></tr>
<tr><td>Dla porównania: vol swap</td><td>100 000 × (25 − 20)</td><td class='num'>500 000 EUR</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Sprzedaż wariancji bez limitu (cap) to potencjalnie bardzo duża strata przy skoku zmienności — zwykle wymaga metody VaR i stress testów.</li>
<li>Derywat na zmienność indeksu finansowego — nie łączy się z limitami emitentów.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> zrealizowana część wariancji + oczekiwana (z cen opcji) dla pozostałego okresu.</p>
<ul>
<li><strong>Ryzyko zmienności</strong> z wypukłością.</li>
<li><strong>Ryzyko skoków</strong> cen (gap risk) — dla sprzedającego.</li>
<li><strong>Ryzyko kontrahenta</strong> i modelu.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zawarcie, raport EMIR.</li>
<li>Codzienne obserwacje, zdarzenia zakłócenia rynku.</li>
<li>Rozliczenie netto w terminie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g</span></h4><p>Derywat na zmienność indeksu finansowego — zwykle uznawany; udokumentuj ocenę.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Variance swap: nominał wariancji × bieżąca wariancja; volatility swap: vega notional × bieżąca zmienność. Fundusze z dużymi pozycjami zwykle stosują VaR.</p></div>
<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1</span></h4><p>10%/5% NAV.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Ekspozycja według metod brutto i zaangażowania (rozp. 231/2013, załącznik II); stress testy.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>EMIR</strong> — raport do T+1; brak obowiązku clearingu.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>UTI, UPI, LEI; indeks bazowy, strike, vega notional, cap.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Metoda global exposure (zaangażowanie vs VaR).</li>
<li>Cap dla sprzedanej wariancji.</li>
<li>Kontrahent i raport EMIR.</li>
</ul>`
        }
      ],
      glossary: [
        ["Vega notional", "Zysk lub strata na 1 punkt zmienności (w pobliżu strike'u)."],
        ["Realised volatility", "Zmienność obliczona z rzeczywistych zmian cen w okresie."],
        ["Convexity", "Wypukłość — nieliniowy wzrost wypłaty wraz ze zmiennością."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A swap on volatility: at the end of the period the parties settle the difference between the realised variance (squared volatility) of an index or share and a level set at trade date. The buyer gains when the market was more volatile than expected. A volatility swap works the same way but on volatility rather than its square.",
      keyFacts: [
        ["Payoff (variance)", "Variance notional × (σ²<sub>realised</sub> − K²)."],
        ["Variance notional", "Vega notional / (2 × K)."],
        ["Realised volatility", "From daily log returns, annualised (× 252)."],
        ["Convexity", "The payoff grows with the square of volatility — large losses for the seller in a crisis; often capped."],
        ["Exposure (CESR)", "Variance notional × current variance; vol swap: vega notional × current volatility."],
        ["CFI code", "<code>S</code> — Swaps"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Variance Swap</em> is a forward contract on realised variance. The strike K is usually set close to the implied volatility of options of the same maturity, so the swap measures whether the market over- or underpriced future volatility.</p>
<p class='formula'>σ² = 252 / n × Σ ln(P<sub>t</sub> / P<sub>t−1</sub>)²</p>
<p>Quotes are in volatility points (e.g. 20 = 20%), variance in squared points (20² = 400).</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Execution</strong> — index, maturity, strike, vega notional, any cap.</li>
<li><strong>Observations</strong> — daily closing prices.</li>
<li><strong>Maturity</strong> — realised volatility calculated and net payment made.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>Buying a Euro Stoxx 50 variance swap: vega notional EUR 100,000, strike 20, realised volatility 25.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Variance notional</td><td>100,000 / (2 × 20)</td><td class='num'>2,500</td></tr>
<tr><td>Payoff</td><td>2,500 × (25² − 20²)</td><td class='num'>EUR 562,500</td></tr>
<tr><td>For comparison: vol swap</td><td>100,000 × (25 − 20)</td><td class='num'>EUR 500,000</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>Selling variance without a cap means a potentially very large loss on a volatility spike — usually requires the VaR approach and stress tests.</li>
<li>A derivative on the volatility of a financial index — not combined with issuer limits.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> the realised part of variance + expected variance (from option prices) for the remaining period.</p>
<ul>
<li><strong>Volatility risk</strong> with convexity.</li>
<li><strong>Price jump (gap) risk</strong> — for the seller.</li>
<li><strong>Counterparty and model risk</strong>.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Execution, EMIR report.</li>
<li>Daily observations, market disruption events.</li>
<li>Net settlement at maturity.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g)</span></h4><p>A derivative on the volatility of a financial index — usually accepted; document the assessment.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Variance swap: variance notional × current variance; volatility swap: vega notional × current volatility. Funds with large positions usually use VaR.</p></div>
<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1)</span></h4><p>10%/5% of NAV.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Exposure under the gross and commitment methods (Reg. 231/2013, Annex II); stress tests.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li><strong>EMIR</strong> — report by T+1; no clearing obligation.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>UTI, UPI, LEI; underlying index, strike, vega notional, cap.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Global exposure method (commitment vs VaR).</li>
<li>Cap on sold variance.</li>
<li>Counterparty and EMIR report.</li>
</ul>`
        }
      ],
      glossary: [
        ["Vega notional", "Gain or loss per 1 volatility point (near the strike)."],
        ["Realised volatility", "Volatility calculated from actual price changes over the period."],
        ["Convexity", "Non-linear growth of the payoff with volatility."]
      ]
    }
  }
});

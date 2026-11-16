window.INSTRUMENTS.push({
  id: "constant-maturity-swap",
  name: "Constant Maturity Swap",
  aliases: ["CMS", "CMS Swap", "CMS Spread", "swap o stałym terminie"],
  market: "otc",
  asset: { pl: "Derywaty OTC — stopy", en: "OTC derivatives — rates" },
  sources: ["ucits", "cesr10788", "emir", "marginRts"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Swap procentowy, w którym noga zmienna nie jest oparta na krótkiej stopie (EURIBOR, €STR), lecz na stopie swapowej o stałym, długim terminie — np. 10-letniej stopie swapowej ustalanej co kwartał. Pozwala zająć pozycję na długie stopy lub na kształt krzywej (spread CMS 10Y−2Y).",
      keyFacts: [
        ["Noga CMS", "Stopa swapowa o stałym terminie (np. EUR 10Y) ustalana przy każdym okresie."],
        ["Druga noga", "Stopa stała, EURIBOR/€STR lub inna stopa CMS (spread)."],
        ["Korekta wypukłości", "Oczekiwana stopa CMS jest wyższa niż stopa terminowa — wycena wymaga modelu zmienności."],
        ["Zastosowanie", "Pozycje na nachylenie krzywej, zabezpieczenie produktów strukturyzowanych."],
        ["Clearing", "Brak obowiązku w UE."],
        ["Kod CFI", "<code>S</code> — Swaps (rates)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Constant Maturity Swap</em> to odmiana <a href='#/i/interest-rate-swap'>swapu procentowego</a>. Co okres noga CMS płaci bieżącą stopę swapową z rynku o stałym terminie — np. jeśli 10-letnia stopa swapowa wynosi 3,10%, płaci się 3,10% za ten okres.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zawarcie</strong> — nominał, termin, tenor CMS, druga noga.</li>
<li><strong>Fixing</strong> stopy CMS przed każdym okresem (np. z publikacji ICE Swap Rate).</li>
<li><strong>Płatności netto</strong> co okres.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Fundusz otrzymuje CMS 10Y i płaci EURIBOR 3M + 0,50% od 10 mln EUR. W kwartale: CMS 10Y = 3,10%, EURIBOR = 2,20%, 90 dni, ACT/360.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Noga CMS</td><td>10 000 000 × 3,10% × 90 / 360</td><td class='num'>77 500 EUR</td></tr>
<tr><td>Noga EURIBOR</td><td>10 000 000 × 2,70% × 90 / 360</td><td class='num'>67 500 EUR</td></tr>
<tr><td>Netto dla funduszu</td><td></td><td class='num'>10 000 EUR</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Pozycja zyskuje, gdy krzywa się stromi — metoda zaangażowania (nominał) słabo opisuje to ryzyko; rozważ VaR.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> krzywa swapowa + korekta wypukłości (model zmienności swapcji).</p>
<ul>
<li><strong>Ryzyko nachylenia krzywej</strong>.</li>
<li><strong>Ryzyko modelu</strong> (korekta wypukłości).</li>
<li><strong>Ryzyko kontrahenta</strong>.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zawarcie, raport EMIR.</li>
<li>Fixingi CMS, płatności netto, zabezpieczenia.</li>
<li>Termin lub zamknięcie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność i ekspozycja <span class='law'>art. 50 ust. 1 lit. g, CESR/10-788</span></h4><p>Derywat na stopę procentową; ekspozycja zwykle = nominał; kontrahent 10%/5% NAV.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Nominał w metodach brutto i zaangażowania.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>EMIR</strong> — raport do T+1; brak obowiązku clearingu; margin.</li>
<li><strong>BMR</strong> — stopa CMS (np. ICE Swap Rate) to wskaźnik referencyjny.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>UTI, UPI, LEI; tenor CMS i źródło fixingu.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Global exposure i ewentualny VaR.</li>
<li>Kontrahent i CSA.</li>
<li>Wskaźnik zgodny z BMR; raport EMIR.</li>
</ul>`
        }
      ],
      glossary: [
        ["CMS rate", "Stopa swapowa o stałym terminie, ustalana przy każdym okresie."],
        ["Convexity adjustment", "Korekta wypukłości — różnica między oczekiwaną stopą CMS a stopą terminową."],
        ["Curve steepener", "Pozycja zyskująca na wzroście różnicy między długimi a krótkimi stopami."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An interest rate swap whose floating leg is based not on a short rate (EURIBOR, €STR) but on a swap rate of a constant, long maturity — e.g. the 10-year swap rate fixed each quarter. It allows positions on long rates or on the shape of the curve (the CMS 10Y−2Y spread).",
      keyFacts: [
        ["CMS leg", "A constant-maturity swap rate (e.g. EUR 10Y) fixed each period."],
        ["Other leg", "Fixed rate, EURIBOR/€STR or another CMS rate (spread)."],
        ["Convexity adjustment", "The expected CMS rate is above the forward rate — valuation needs a volatility model."],
        ["Uses", "Curve slope positions, hedging structured products."],
        ["Clearing", "No obligation in the EU."],
        ["CFI code", "<code>S</code> — Swaps (rates)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Constant Maturity Swap</em> is a variant of the <a href='#/i/interest-rate-swap'>interest rate swap</a>. Each period the CMS leg pays the current market swap rate of a constant maturity — e.g. if the 10-year swap rate is 3.10%, 3.10% is paid for that period.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Execution</strong> — notional, maturity, CMS tenor, other leg.</li>
<li><strong>CMS fixing</strong> before each period (e.g. from the ICE Swap Rate).</li>
<li><strong>Net payments</strong> each period.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A fund receives CMS 10Y and pays 3M EURIBOR + 0.50% on EUR 10m. In the quarter: CMS 10Y = 3.10%, EURIBOR = 2.20%, 90 days, ACT/360.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>CMS leg</td><td>10,000,000 × 3.10% × 90 / 360</td><td class='num'>EUR 77,500</td></tr>
<tr><td>EURIBOR leg</td><td>10,000,000 × 2.70% × 90 / 360</td><td class='num'>EUR 67,500</td></tr>
<tr><td>Net to the fund</td><td></td><td class='num'>EUR 10,000</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>The position gains when the curve steepens — the commitment approach (notional) captures this risk poorly; consider VaR.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> swap curve + convexity adjustment (swaption volatility model).</p>
<ul>
<li><strong>Curve slope risk</strong>.</li>
<li><strong>Model risk</strong> (convexity adjustment).</li>
<li><strong>Counterparty risk</strong>.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Execution, EMIR report.</li>
<li>CMS fixings, net payments, collateral.</li>
<li>Maturity or close-out.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility and exposure <span class='law'>Art. 50(1)(g), CESR/10-788</span></h4><p>A derivative on an interest rate; exposure usually = notional; counterparty 10%/5% of NAV.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Notional under the gross and commitment methods.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li><strong>EMIR</strong> — report by T+1; no clearing obligation; margin.</li>
<li><strong>BMR</strong> — the CMS rate (e.g. ICE Swap Rate) is a benchmark.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>UTI, UPI, LEI; CMS tenor and fixing source.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Global exposure and possibly VaR.</li>
<li>Counterparty and CSA.</li>
<li>BMR-compliant benchmark; EMIR report.</li>
</ul>`
        }
      ],
      glossary: [
        ["CMS rate", "A constant-maturity swap rate, fixed each period."],
        ["Convexity adjustment", "The difference between the expected CMS rate and the forward rate."],
        ["Curve steepener", "A position that gains when the gap between long and short rates widens."]
      ]
    }
  }
});

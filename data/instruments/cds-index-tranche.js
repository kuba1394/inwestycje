window.INSTRUMENTS.push({
  id: "cds-index-tranche",
  name: "CDS Index Tranche",
  aliases: ["Index Tranche", "Credit Default Index Tranche", "iTraxx Tranche", "CDX Tranche", "transza indeksu CDS"],
  market: "otc",
  asset: { pl: "Derywaty kredytowe", en: "Credit derivatives" },
  sources: ["ucits", "cesr10788", "emir", "marginRts"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Ochrona kredytowa na wycinek strat indeksu CDS (np. iTraxx Europe, CDX IG) między punktem przyłączenia (attachment) a odłączenia (detachment). Transza equity 0–3% traci pierwsza, transze senior — dopiero po dużych stratach. Wartość zależy od korelacji niewypłacalności, a dźwignia transz niskich jest bardzo wysoka.",
      keyFacts: [
        ["Transze iTraxx Europe", "Np. 0–3%, 3–6%, 6–12%, 12–100%."],
        ["Strata transzy", "min(max(L − A, 0), D − A) / (D − A), gdzie L — strata portfela."],
        ["Płatności", "Premia od nominału transzy (często upfront + kupon)."],
        ["Kluczowe ryzyko", "Korelacja niewypłacalności."],
        ["Clearing", "Brak obowiązku; transze rzadko rozliczane centralnie."],
        ["Kod CFI", "<code>S</code> — Swaps (credit)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>CDS Index Tranche</em> dzieli straty portfela indeksu <a href='#/i/credit-default-swap'>CDS</a> na warstwy, jak w <a href='#/i/asset-backed-security'>sekurytyzacji</a>, ale syntetycznie. Sprzedający ochronę na transzę dostaje premię i pokrywa straty portfela w przedziale A–D.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zawarcie</strong> — seria indeksu, transza, nominał, premia.</li>
<li><strong>Zdarzenie kredytowe</strong> podmiotu z indeksu — strata = waga × (1 − odzysk) zmniejsza transze od najniższej.</li>
<li><strong>Płatności premii</strong> od pozostałego nominału transzy.</li>
<li><strong>Termin</strong> (zwykle 5 lub 7 lat).</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Indeks 125 podmiotów o równej wadze, odzysk 40%. Bankrutuje 5 podmiotów.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Strata portfela</td><td>5 / 125 × 60%</td><td class='num'>2,4%</td></tr>
<tr><td>Strata transzy 0–3%</td><td>2,4% / 3%</td><td class='num'>80%</td></tr>
<tr><td>Strata transzy 3–6%</td><td>—</td><td class='num'>0%</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Strata 2,4% portfela zabrała 80% transzy equity — dźwignia ok. 33×. Metoda zaangażowania słabo opisuje to ryzyko; zwykle stosuje się VaR.</li>
<li>Złożony derywat OTC — wymaga procesu zarządzania ryzykiem i niezależnej wyceny.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> model kopuli gaussowskiej z korelacją bazową (base correlation).</p>
<ul>
<li><strong>Ryzyko korelacji</strong> i modelu.</li>
<li><strong>Ryzyko kredytowe z dźwignią</strong>.</li>
<li><strong>Ryzyko płynności</strong> i kontrahenta.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zawarcie, raport EMIR.</li>
<li>Zdarzenia kredytowe, aukcje ISDA, zmniejszenie nominału transzy.</li>
<li>Termin lub zamknięcie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g</span></h4><p>Derywat kredytowy na indeks — dopuszczalny przy spełnieniu warunków OTC; wymaga oceny, czy proces zarządzania ryzykiem obejmuje to ryzyko.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Złożony derywat — w praktyce metoda VaR.</p></div>
<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1</span></h4><p>10%/5% NAV.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Ekspozycja i dźwignia według rozp. 231/2013; stress testy korelacji.</li>
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
<li>UTI, UPI, LEI; seria i wersja indeksu (RED code), attachment/detachment.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Metoda global exposure (VaR).</li>
<li>Kontrahent i zabezpieczenia.</li>
<li>Niezależna wycena modelu korelacji.</li>
</ul>`
        }
      ],
      glossary: [
        ["Attachment / detachment", "Dolna i górna granica strat portfela, które pokrywa transza."],
        ["Base correlation", "Kwotowana korelacja używana do wyceny transz."],
        ["Equity tranche", "Transza pierwszej straty (np. 0–3%)."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "Credit protection on a slice of a CDS index's losses (e.g. iTraxx Europe, CDX IG) between an attachment and a detachment point. The 0–3% equity tranche loses first, senior tranches only after large losses. The value depends on default correlation, and the leverage of junior tranches is very high.",
      keyFacts: [
        ["iTraxx Europe tranches", "E.g. 0–3%, 3–6%, 6–12%, 12–100%."],
        ["Tranche loss", "min(max(L − A, 0), D − A) / (D − A), where L is the portfolio loss."],
        ["Payments", "Premium on the tranche notional (often upfront + running coupon)."],
        ["Key risk", "Default correlation."],
        ["Clearing", "No obligation; tranches are rarely centrally cleared."],
        ["CFI code", "<code>S</code> — Swaps (credit)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>CDS Index Tranche</em> splits the losses of a <a href='#/i/credit-default-swap'>CDS</a> index portfolio into layers, as in <a href='#/i/asset-backed-security'>securitisation</a>, but synthetically. The tranche protection seller receives a premium and covers portfolio losses between A and D.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Execution</strong> — index series, tranche, notional, premium.</li>
<li><strong>Credit event</strong> of an index name — loss = weight × (1 − recovery) reduces tranches from the lowest up.</li>
<li><strong>Premium payments</strong> on the remaining tranche notional.</li>
<li><strong>Maturity</strong> (usually 5 or 7 years).</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>An index of 125 equally weighted names, recovery 40%. Five names default.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Portfolio loss</td><td>5 / 125 × 60%</td><td class='num'>2.4%</td></tr>
<tr><td>0–3% tranche loss</td><td>2.4% / 3%</td><td class='num'>80%</td></tr>
<tr><td>3–6% tranche loss</td><td>—</td><td class='num'>0%</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>A 2.4% portfolio loss took 80% of the equity tranche — leverage of about 33×. The commitment approach captures this poorly; VaR is usually used.</li>
<li>A complex OTC derivative — requires a risk management process and independent valuation.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> Gaussian copula model with base correlation.</p>
<ul>
<li><strong>Correlation and model risk</strong>.</li>
<li><strong>Leveraged credit risk</strong>.</li>
<li><strong>Liquidity and counterparty risk</strong>.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Execution, EMIR report.</li>
<li>Credit events, ISDA auctions, tranche notional reduction.</li>
<li>Maturity or close-out.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g)</span></h4><p>A credit derivative on an index — eligible if the OTC conditions are met; requires an assessment of whether the risk management process covers this risk.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>A complex derivative — in practice the VaR approach.</p></div>
<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1)</span></h4><p>10%/5% of NAV.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Exposure and leverage per Reg. 231/2013; correlation stress tests.</li>
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
<li>UTI, UPI, LEI; index series and version (RED code), attachment/detachment.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Global exposure method (VaR).</li>
<li>Counterparty and collateral.</li>
<li>Independent valuation of the correlation model.</li>
</ul>`
        }
      ],
      glossary: [
        ["Attachment / detachment", "The lower and upper bounds of portfolio losses covered by the tranche."],
        ["Base correlation", "The quoted correlation used to value tranches."],
        ["Equity tranche", "The first-loss tranche (e.g. 0–3%)."]
      ]
    }
  }
});

window.INSTRUMENTS.push({
  id: "inflation-swap",
  name: "Inflation Swap",
  aliases: ["Zero-Coupon Inflation Swap", "ZCIS", "Year-on-Year Inflation Swap", "HICPxT Swap", "swap inflacyjny"],
  market: "otc",
  asset: { pl: "Derywaty OTC — inflacja", en: "OTC derivatives — inflation" },
  sources: ["ucits", "cesr10788", "emir", "marginRts", "emir3dir"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Swap, w którym jedna strona płaci stałą stopę (stopę breakeven), a druga — faktyczną inflację mierzoną wskaźnikiem cen, np. HICP bez tytoniu w strefie euro, RPI w Wielkiej Brytanii lub CPI w USA. Najczęstsza forma to swap zerokuponowy z jedną płatnością netto na końcu. Służy do zabezpieczania zobowiązań indeksowanych inflacją.",
      keyFacts: [
        ["Noga stała", "N × [(1 + K)<sup>T</sup> − 1] w swapie zerokuponowym."],
        ["Noga inflacyjna", "N × [I(T) / I(0) − 1]."],
        ["Wskaźniki", "HICPxT (EUR), UK RPI, US CPI-U, FR CPI."],
        ["Opóźnienie", "Zwykle 3 miesiące (np. wskaźnik z kwietnia dla swapu z lipca)."],
        ["Clearing", "Dostępny (np. LCH), ale bez obowiązku w UE."],
        ["Kod CFI", "<code>S</code> — Swaps (baza: inflacja)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Inflation Swap</em> przenosi ryzyko inflacji między stronami. Odbiorca inflacji (inflation receiver) zyskuje, gdy inflacja przekroczy stopę stałą K, ustaloną w dniu zawarcia jako rynkowa inflacja breakeven.</p>
<p>W wersji <strong>zerokuponowej</strong> obie nogi rozlicza się raz, w terminie, kwotą netto. W wersji <strong>rok do roku</strong> (year-on-year) — co roku według rocznej stopy inflacji. Pokrewny instrument gotówkowy: <a href='#/i/inflation-linked-bond'>Inflation-Linked Bond</a>.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zawarcie</strong> — uzgodnienie nominału, terminu, wskaźnika i stopy K; brak wymiany kapitału.</li>
<li><strong>Wycena</strong> — według krzywej swapów inflacyjnych i stóp dyskontowych; wymiana variation margin.</li>
<li><strong>Termin</strong> — porównanie wzrostu wskaźnika z (1 + K)<sup>T</sup> i płatność netto.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Fundusz otrzymuje inflację w 5-letnim swapie zerokuponowym, nominał 10 mln EUR, K = 2,30%. Wskaźnik cen wzrósł ze 120 do 136.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Noga stała</td><td>1,023<sup>5</sup> − 1</td><td class='num'>12,04%</td></tr>
<tr><td>Noga inflacyjna</td><td>136 / 120 − 1</td><td class='num'>13,33%</td></tr>
<tr><td>Płatność netto dla funduszu</td><td>10 000 000 × (13,33% − 12,04%)</td><td class='num'>129 203 EUR</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Cała płatność następuje na końcu, więc dodatnia wycena (ekspozycja na kontrahenta) może rosnąć przez lata — kluczowe jest zabezpieczenie w CSA.</li>
<li>W metodzie zaangażowania ekspozycja zwykle równa się nominałowi (10 mln EUR); udokumentuj zastosowaną metodę.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> krzywa swapów inflacyjnych (breakeven) z uwzględnieniem sezonowości wskaźnika.</p>
<ul>
<li><strong>Ryzyko inflacji</strong> (wrażliwość na breakeven).</li>
<li><strong>Ryzyko stopy procentowej</strong> — dyskontowanie płatności końcowej.</li>
<li><strong>Ryzyko kontrahenta</strong> — duża płatność na końcu.</li>
<li><strong>Ryzyko wskaźnika</strong> — rewizje, zmiany metodologii.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zawarcie, konfirmacja, raport EMIR.</li>
<li>Wycena i zabezpieczenia; publikacje wskaźnika.</li>
<li>Rozliczenie netto w terminie (lub corocznie przy YoY).</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g</span></h4><p>W praktyce rynkowej uznawany za dopuszczalny derywat (wskaźnik inflacji traktowany jak stopa lub indeks finansowy) — sprawdź stanowisko nadzorcy kraju funduszu.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Zwykle nominał swapu; przy dużych pozycjach rozważ VaR.</p></div>
<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1</span></h4><p>10%/5% NAV, jeśli nierozliczany przez CCP.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Typowy w funduszach LDI i emerytalnych; ekspozycja nominału do dźwigni.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>EMIR</strong> — raport do T+1; brak obowiązku clearingu; margin dla nierozliczanych centralnie.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>UTI, UPI, LEI stron; wskaźnik (np. HICPxT) i opóźnienie w danych.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Dopuszczalność według stanowiska nadzorcy.</li>
<li>Global exposure i metoda.</li>
<li>Kontrahent i CSA.</li>
<li>Raport EMIR.</li>
</ul>`
        }
      ],
      glossary: [
        ["Breakeven inflation", "Stała stopa K, przy której swap ma zerową wartość w dniu zawarcia."],
        ["HICPxT", "Zharmonizowany wskaźnik cen w strefie euro bez tytoniu — standard dla swapów w EUR."],
        ["Year-on-year swap", "Swap z coroczną wymianą stopy inflacji na stopę stałą."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A swap in which one side pays a fixed rate (the breakeven rate) and the other pays actual inflation measured by a price index, e.g. euro-area HICP ex tobacco, UK RPI or US CPI. The most common form is a zero-coupon swap with one net payment at maturity. It is used to hedge inflation-linked liabilities.",
      keyFacts: [
        ["Fixed leg", "N × [(1 + K)<sup>T</sup> − 1] in a zero-coupon swap."],
        ["Inflation leg", "N × [I(T) / I(0) − 1]."],
        ["Indices", "HICPxT (EUR), UK RPI, US CPI-U, FR CPI."],
        ["Lag", "Usually 3 months (e.g. the April index for a July swap)."],
        ["Clearing", "Available (e.g. LCH), but not mandatory in the EU."],
        ["CFI code", "<code>S</code> — Swaps (underlying: inflation)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>An <em>Inflation Swap</em> transfers inflation risk between the parties. The inflation receiver gains when inflation exceeds the fixed rate K, set at trade date at the market breakeven inflation.</p>
<p>In the <strong>zero-coupon</strong> version both legs settle once, at maturity, as a net amount. In the <strong>year-on-year</strong> version — annually on the annual inflation rate. Related cash instrument: <a href='#/i/inflation-linked-bond'>Inflation-Linked Bond</a>.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Execution</strong> — agree nominal, maturity, index and rate K; no exchange of principal.</li>
<li><strong>Valuation</strong> — on the inflation swap curve and discount rates; variation margin exchanged.</li>
<li><strong>Maturity</strong> — the index increase is compared with (1 + K)<sup>T</sup> and the net amount paid.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A fund receives inflation in a 5-year zero-coupon swap, nominal EUR 10m, K = 2.30%. The price index rose from 120 to 136.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Fixed leg</td><td>1.023<sup>5</sup> − 1</td><td class='num'>12.04%</td></tr>
<tr><td>Inflation leg</td><td>136 / 120 − 1</td><td class='num'>13.33%</td></tr>
<tr><td>Net payment to the fund</td><td>10,000,000 × (13.33% − 12.04%)</td><td class='num'>EUR 129,203</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>The whole payment comes at the end, so the positive value (counterparty exposure) can build up for years — CSA collateral is key.</li>
<li>Under the commitment approach exposure usually equals the nominal (EUR 10m); document the method used.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> the inflation swap (breakeven) curve, allowing for index seasonality.</p>
<ul>
<li><strong>Inflation risk</strong> (breakeven sensitivity).</li>
<li><strong>Interest rate risk</strong> — discounting of the final payment.</li>
<li><strong>Counterparty risk</strong> — a large payment at the end.</li>
<li><strong>Index risk</strong> — revisions, methodology changes.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Execution, confirmation, EMIR report.</li>
<li>Valuation and collateral; index releases.</li>
<li>Net settlement at maturity (or annually for YoY).</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g)</span></h4><p>In market practice treated as an eligible derivative (the inflation index treated as a rate or financial index) — check your home supervisor's position.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Usually the swap's nominal; for large positions consider VaR.</p></div>
<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1)</span></h4><p>10%/5% of NAV if not cleared by a CCP.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Common in LDI and pension funds; nominal exposure in leverage.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li><strong>EMIR</strong> — report by T+1; no clearing obligation; margin for non-centrally cleared trades.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>UTI, UPI, counterparty LEIs; index (e.g. HICPxT) and lag in data.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Eligibility per the supervisor's position.</li>
<li>Global exposure and method.</li>
<li>Counterparty and CSA.</li>
<li>EMIR report.</li>
</ul>`
        }
      ],
      glossary: [
        ["Breakeven inflation", "The fixed rate K at which the swap has zero value at inception."],
        ["HICPxT", "Euro-area harmonised price index excluding tobacco — the standard for EUR swaps."],
        ["Year-on-year swap", "A swap exchanging annual inflation for a fixed rate every year."]
      ]
    }
  }
});

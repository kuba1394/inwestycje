window.INSTRUMENTS.push({
  id: "dividend-swap",
  name: "Dividend Swap",
  aliases: ["Dividend Future", "Index Dividend Swap", "Euro Stoxx 50 Dividend", "swap dywidendowy"],
  market: "otc",
  asset: { pl: "Derywaty OTC — akcje", en: "OTC derivatives — equity" },
  sources: ["ucits", "eligible", "cesr10788", "emir", "marginRts"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Swap, w którym jedna strona płaci stałą kwotę (strike), a druga — sumę dywidend faktycznie wypłaconych przez spółki z indeksu lub przez jedną spółkę w danym roku. Pozwala handlować samymi dywidendami, bez ryzyka kursu akcji. Na giełdzie Eurex jest odpowiednik — kontrakty futures na dywidendy z indeksu Euro Stoxx 50.",
      keyFacts: [
        ["Baza", "Suma dywidend z indeksu (w punktach indeksu dywidendowego) lub z akcji w okresie (zwykle rok kalendarzowy)."],
        ["Płatność", "Nominał na punkt × (dywidendy zrealizowane − strike), na końcu okresu."],
        ["Uczestnicy", "Banki zabezpieczają ryzyko dywidend z produktów strukturyzowanych; fundusze kupują ekspozycję na dywidendy."],
        ["Giełdowy odpowiednik", "Euro Stoxx 50 Index Dividend Futures (Eurex)."],
        ["Ekspozycja", "Zwykle nominał = strike × nominał na punkt."],
        ["Kod CFI", "<code>S</code> — Swaps (baza: dywidendy)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Dividend Swap</em> rozlicza różnicę między dywidendami zrealizowanymi a oczekiwanymi w dniu zawarcia. Kupujący dywidendy (receiver) zyskuje, gdy spółki wypłacą więcej niż strike.</p>
<p>Wartość nie zależy bezpośrednio od kursu akcji, ale jest z nim skorelowana (w kryzysie spółki tną dywidendy, jak w 2020 r.). Inne swapy akcyjne: <a href='#/i/equity-swap'>Equity Swap</a>, <a href='#/i/total-return-swap'>Total Return Swap</a>.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zawarcie</strong> — indeks, rok, strike, nominał na punkt.</li>
<li><strong>Okres</strong> — dywidendy z dniem ex w danym roku sumuje się w indeksie dywidendowym.</li>
<li><strong>Rozliczenie</strong> po końcu roku — płatność netto.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Fundusz kupuje dywidendy Euro Stoxx 50 za rok 2027: strike 150 punktów, nominał 5 000 EUR na punkt. Zrealizowane dywidendy: 160 punktów.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Płatność dla funduszu</td><td>5 000 × (160 − 150)</td><td class='num'>50 000 EUR</td></tr>
<tr><td>Nominał (ekspozycja)</td><td>5 000 × 150</td><td class='num'>750 000 EUR</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Ekspozycja na dywidendy indeksu finansowego — nie łączy się z limitami emitentów; przy swapie na jedną spółkę — look-through do niej.</li>
<li>Kontrahent 10%/5% NAV; udokumentuj metodę liczenia global exposure.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> oczekiwane dywidendy (rynek futures dywidendowych), dyskontowane.</p>
<ul>
<li><strong>Ryzyko dywidend</strong> — cięcia, zakazy wypłat (np. dla banków w 2020 r.).</li>
<li><strong>Ryzyko kontrahenta</strong> i płynności.</li>
<li><strong>Ryzyko podatkowe</strong> — dywidendy brutto vs netto według warunków.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zawarcie, raport EMIR.</li>
<li>Śledzenie dywidend w roku.</li>
<li>Rozliczenie netto po końcu okresu.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g, art. 9 dyr. 2007/16/WE</span></h4><p>Swap na indeks dywidendowy szerokiego indeksu akcyjnego — zwykle traktowany jak derywat na indeks finansowy; na jedną spółkę — derywat na dopuszczalny papier.</p></div>
<div class='rule'><h4>Limity <span class='law'>art. 51 ust. 3, art. 52 ust. 1</span></h4><p>Global exposure; kontrahent OTC.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Ekspozycja nominału do dźwigni.</li>
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
<li>UTI, UPI, LEI; indeks dywidendowy (np. SX5EDD) i rok.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Indeks finansowy czy jedna spółka (look-through).</li>
<li>Global exposure i kontrahent.</li>
<li>Raport EMIR.</li>
</ul>`
        }
      ],
      glossary: [
        ["Dividend index", "Indeks sumujący dywidendy spółek z indeksu w danym roku (w punktach)."],
        ["Strike", "Stała kwota dywidend ustalona w dniu zawarcia."],
        ["Realised dividends", "Dywidendy faktycznie wypłacone (z dniem ex) w okresie."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A swap in which one side pays a fixed amount (strike) and the other the total dividends actually paid by the companies in an index, or by one company, in a given year. It lets you trade dividends alone, without share price risk. Eurex lists a counterpart — futures on Euro Stoxx 50 index dividends.",
      keyFacts: [
        ["Underlying", "Total dividends of an index (in dividend index points) or of a share over a period (usually a calendar year)."],
        ["Payment", "Notional per point × (realised dividends − strike), at the end of the period."],
        ["Participants", "Banks hedge dividend risk from structured products; funds buy dividend exposure."],
        ["Listed counterpart", "Euro Stoxx 50 Index Dividend Futures (Eurex)."],
        ["Exposure", "Usually notional = strike × notional per point."],
        ["CFI code", "<code>S</code> — Swaps (underlying: dividends)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Dividend Swap</em> settles the difference between realised dividends and those expected at trade date. The dividend buyer (receiver) gains when companies pay more than the strike.</p>
<p>Its value does not depend directly on the share price but is correlated with it (in a crisis companies cut dividends, as in 2020). Other equity swaps: <a href='#/i/equity-swap'>Equity Swap</a>, <a href='#/i/total-return-swap'>Total Return Swap</a>.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Execution</strong> — index, year, strike, notional per point.</li>
<li><strong>Period</strong> — dividends with an ex-date in the year are summed in the dividend index.</li>
<li><strong>Settlement</strong> after year-end — net payment.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A fund buys Euro Stoxx 50 dividends for 2027: strike 150 points, notional EUR 5,000 per point. Realised dividends: 160 points.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Payment to the fund</td><td>5,000 × (160 − 150)</td><td class='num'>EUR 50,000</td></tr>
<tr><td>Notional (exposure)</td><td>5,000 × 150</td><td class='num'>EUR 750,000</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>Exposure to the dividends of a financial index — not combined with issuer limits; for a single-stock swap — look-through to that company.</li>
<li>Counterparty 10%/5% of NAV; document the global exposure method.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> expected dividends (dividend futures market), discounted.</p>
<ul>
<li><strong>Dividend risk</strong> — cuts, payout bans (e.g. for banks in 2020).</li>
<li><strong>Counterparty and liquidity risk</strong>.</li>
<li><strong>Tax risk</strong> — gross vs net dividends per the terms.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Execution, EMIR report.</li>
<li>Tracking dividends during the year.</li>
<li>Net settlement after the period ends.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g), Art. 9 Dir. 2007/16/EC</span></h4><p>A swap on the dividend index of a broad equity index — usually treated as a derivative on a financial index; on a single company — a derivative on an eligible security.</p></div>
<div class='rule'><h4>Limits <span class='law'>Art. 51(3), Art. 52(1)</span></h4><p>Global exposure; OTC counterparty.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Notional exposure in leverage.</li>
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
<li>UTI, UPI, LEI; dividend index (e.g. SX5EDD) and year.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Financial index or single company (look-through).</li>
<li>Global exposure and counterparty.</li>
<li>EMIR report.</li>
</ul>`
        }
      ],
      glossary: [
        ["Dividend index", "An index summing the dividends of index companies in a year (in points)."],
        ["Strike", "The fixed dividend amount set at trade date."],
        ["Realised dividends", "Dividends actually paid (by ex-date) in the period."]
      ]
    }
  }
});

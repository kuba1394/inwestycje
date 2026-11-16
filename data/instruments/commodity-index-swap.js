window.INSTRUMENTS.push({
  id: "commodity-index-swap",
  name: "Commodity Index Swap",
  aliases: ["Commodity Total Return Swap", "Commodity Index Excess Return Swap", "BCOM Swap", "GSCI Swap", "swap na indeks towarowy"],
  market: "otc",
  asset: { pl: "Derywaty OTC — towary", en: "OTC derivatives — commodities" },
  sources: ["ucits", "eligible", "esma2014", "sftr", "emir", "marginRts"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Swap, w którym fundusz otrzymuje stopę zwrotu z indeksu towarowego (np. Bloomberg Commodity Index, S&P GSCI) i płaci opłatę, a w wersji total return także stopę rynku pieniężnego. To główny sposób, w jaki UCITS uzyskuje ekspozycję na towary — pod warunkiem że indeks spełnia kryteria indeksu finansowego.",
      keyFacts: [
        ["Excess return (ER)", "Zwrot z kontraktów futures w indeksie (cena + rolowanie), bez odsetek od zabezpieczenia."],
        ["Total return (TR)", "ER + odsetki od zabezpieczenia gotówkowego (np. stopa bonów skarbowych)."],
        ["Płatność funduszu", "Opłata (np. 0,10–0,40% rocznie), w TR także stopa rynku pieniężnego."],
        ["Rozliczenie", "Okresowe (zwykle miesięczne), reset nominału."],
        ["SFTR", "Swap typu TRS — ujawnienia w prospekcie i sprawozdaniu (art. 13–14)."],
        ["Kod CFI", "<code>S</code> — Swaps (baza: towary)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Commodity Index Swap</em> to <a href='#/i/total-return-swap'>Total Return Swap</a> na indeks towarowy. Indeks składa się z kontraktów <a href='#/i/commodity-future'>futures na towary</a> rolowanych według zasad indeksu. Bank zabezpiecza swap, kupując te kontrakty.</p>
<p>Wersja <strong>excess return</strong> (w aplikacji: Commodity Index Excess Return Swap) daje sam zwrot z futures. Wersja <strong>total return</strong> dodaje odsetki od zabezpieczenia — fundusz, który trzyma gotówkę w bonach, zwykle wybiera ER i sam zarabia odsetki.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zawarcie</strong> — nominał, indeks, opłata, częstotliwość resetu.</li>
<li><strong>Okres</strong> — zmiana wartości indeksu × nominał minus opłata.</li>
<li><strong>Reset</strong> — płatność netto i ustalenie nowego nominału (zwykle co miesiąc).</li>
<li><strong>Zabezpieczenia</strong> według CSA.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>UCITS ma swap ER o nominale 20 mln USD, opłata 0,25% rocznie. W miesiącu indeks rośnie o 3%.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Zwrot z indeksu</td><td>20 000 000 × 3%</td><td class='num'>600 000 USD</td></tr>
<tr><td>Opłata miesięczna</td><td>20 000 000 × 0,25% / 12</td><td class='num'>4 167 USD</td></tr>
<tr><td>Płatność netto dla funduszu</td><td></td><td class='num'>595 833 USD</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Przed zawarciem: dokumentacja, że indeks spełnia kryteria indeksu finansowego (dywersyfikacja — maks. 20% jednego składnika, wyjątkowo 35%; reprezentatywność; publikacja; brak ingerencji kontrahenta w skład).</li>
<li>Do resetu dodatnia wycena rośnie — kontroluj limit kontrahenta w trakcie miesiąca.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> poziom indeksu publikowany dziennie.</p>
<ul>
<li><strong>Ryzyko cen towarów</strong> i rolowania.</li>
<li><strong>Ryzyko kontrahenta</strong> między resetami.</li>
<li><strong>Ryzyko indeksu</strong> — zmiany metodologii, wag.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zawarcie, raport EMIR.</li>
<li>Comiesięczne resety i płatności netto; rebalancing indeksu.</li>
<li>Zakończenie lub przedłużenie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Indeks finansowy <span class='law'>art. 9 dyr. 2007/16/WE, ESMA/2014/937</span></h4><p>Indeks towarowy musi być wystarczająco zdywersyfikowany, reprezentatywny i publikowany; ESMA wymaga m.in. przejrzystej metodologii i braku częstego rebalancingu, który podnosi koszty.</p></div>
<div class='rule'><h4>Global exposure i kontrahent <span class='law'>CESR/10-788, art. 52 ust. 1</span></h4><p>Ekspozycja = nominał (wartość rynkowa bazy); kontrahent 10%/5% NAV.</p></div>
<div class='rule'><h4>TRS <span class='law'>ESMA/2014/937</span></h4><p>Kontrahent nie może mieć swobody w składzie indeksu; ujawnienia w prospekcie.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Ekspozycja nominału do dźwigni; SFTR art. 13–14 także dla AIF.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>EMIR</strong> — raport do T+1; brak obowiązku clearingu.</li>
<li><strong>SFTR</strong> — ujawnienia TRS (bez raportu do repozytorium SFTR).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>UTI, UPI, LEI; nazwa i ticker indeksu (wersja ER/TR).</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Udokumentowane kryteria indeksu finansowego.</li>
<li>Kontrahent między resetami.</li>
<li>Global exposure.</li>
<li>Ujawnienia SFTR i raport EMIR.</li>
</ul>`
        }
      ],
      glossary: [
        ["Excess return index", "Indeks oparty tylko na zwrocie z futures (bez odsetek od zabezpieczenia)."],
        ["Total return index", "Indeks ER plus odsetki od zabezpieczenia."],
        ["Reset", "Okresowe rozliczenie swapu i ustalenie nowego nominału."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A swap in which the fund receives the return of a commodity index (e.g. Bloomberg Commodity Index, S&P GSCI) and pays a fee, and in the total return version also a money-market rate. It is the main way a UCITS gets commodity exposure — provided the index meets the financial index criteria.",
      keyFacts: [
        ["Excess return (ER)", "Return of the index futures (price + roll), without interest on collateral."],
        ["Total return (TR)", "ER + interest on cash collateral (e.g. the T-bill rate)."],
        ["Fund pays", "A fee (e.g. 0.10–0.40% a year), for TR also a money-market rate."],
        ["Settlement", "Periodic (usually monthly), nominal reset."],
        ["SFTR", "A TRS-type swap — prospectus and annual report disclosures (Art. 13–14)."],
        ["CFI code", "<code>S</code> — Swaps (underlying: commodities)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Commodity Index Swap</em> is a <a href='#/i/total-return-swap'>Total Return Swap</a> on a commodity index. The index is made of <a href='#/i/commodity-future'>commodity futures</a> rolled according to the index rules. The bank hedges the swap by buying those contracts.</p>
<p>The <strong>excess return</strong> version (in the application: Commodity Index Excess Return Swap) gives the futures return only. The <strong>total return</strong> version adds interest on collateral — a fund that keeps its cash in T-bills usually chooses ER and earns the interest itself.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Execution</strong> — nominal, index, fee, reset frequency.</li>
<li><strong>Period</strong> — change in index value × nominal minus the fee.</li>
<li><strong>Reset</strong> — net payment and a new nominal (usually monthly).</li>
<li><strong>Collateral</strong> under the CSA.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A UCITS has an ER swap with USD 20m nominal, fee 0.25% a year. Over the month the index rises 3%.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Index return</td><td>20,000,000 × 3%</td><td class='num'>USD 600,000</td></tr>
<tr><td>Monthly fee</td><td>20,000,000 × 0.25% / 12</td><td class='num'>USD 4,167</td></tr>
<tr><td>Net payment to the fund</td><td></td><td class='num'>USD 595,833</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>Before trading: documentation that the index meets the financial index criteria (diversification — max 20% per component, exceptionally 35%; representativeness; publication; no counterparty discretion over composition).</li>
<li>Positive value builds up until the reset — monitor the counterparty limit during the month.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> the index level published daily.</p>
<ul>
<li><strong>Commodity price and roll risk</strong>.</li>
<li><strong>Counterparty risk</strong> between resets.</li>
<li><strong>Index risk</strong> — methodology and weight changes.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Execution, EMIR report.</li>
<li>Monthly resets and net payments; index rebalancing.</li>
<li>Termination or extension.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Financial index <span class='law'>Art. 9 Dir. 2007/16/EC, ESMA/2014/937</span></h4><p>The commodity index must be sufficiently diversified, representative and published; ESMA also requires a transparent methodology and no frequent rebalancing that raises costs.</p></div>
<div class='rule'><h4>Global exposure and counterparty <span class='law'>CESR/10-788, Art. 52(1)</span></h4><p>Exposure = nominal (market value of the underlying); counterparty 10%/5% of NAV.</p></div>
<div class='rule'><h4>TRS <span class='law'>ESMA/2014/937</span></h4><p>The counterparty may have no discretion over index composition; prospectus disclosures.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Nominal exposure in leverage; SFTR Art. 13–14 also apply to AIFs.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li><strong>EMIR</strong> — report by T+1; no clearing obligation.</li>
<li><strong>SFTR</strong> — TRS disclosures (no SFTR repository report).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>UTI, UPI, LEI; index name and ticker (ER/TR version).</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Documented financial index criteria.</li>
<li>Counterparty between resets.</li>
<li>Global exposure.</li>
<li>SFTR disclosures and EMIR report.</li>
</ul>`
        }
      ],
      glossary: [
        ["Excess return index", "An index based only on the futures return (no interest on collateral)."],
        ["Total return index", "The ER index plus interest on collateral."],
        ["Reset", "Periodic settlement of the swap and setting of a new nominal."]
      ]
    }
  }
});

window.INSTRUMENTS.push({
  id: "limited-partnership-interest",
  name: "Limited Partnership Interest",
  aliases: ["Partnership Interest", "LP Interest", "Private Equity Fund", "Private Funds", "Private Infrastructure", "udział w funduszu private equity"],
  market: "otc",
  asset: { pl: "Kredyty i rynki prywatne", en: "Loans and private markets" },
  sources: ["aifmd", "aifmdL2", "aifmd2", "ucits"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Udział w funduszu rynku prywatnego zorganizowanym zwykle jako spółka komandytowa (limited partnership): private equity, infrastruktury, private credit czy venture capital. Inwestor deklaruje kwotę (commitment), którą zarządzający wzywa do wpłaty w ciągu kilku lat, a zwroty dostaje w miarę sprzedaży inwestycji. Udziały są niepłynne i wyceniane rzadko.",
      keyFacts: [
        ["Strony", "General partner (zarządzający, odpowiada bez ograniczeń) i limited partners (inwestorzy)."],
        ["Commitment", "Zadeklarowana kwota; wpłaty przez wezwania (capital calls)."],
        ["Okres", "Zwykle 10–12 lat: okres inwestycyjny 4–6 lat, potem wyjścia."],
        ["Wynagrodzenie", "Opłata za zarządzanie (np. 1,5–2%) i carried interest (np. 20% powyżej hurdle 8%)."],
        ["Wycena", "NAV kwartalny, publikowany z opóźnieniem."],
        ["Identyfikacja", "Zwykle brak ISIN; LEI funduszu, wewnętrzny identyfikator."]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Limited Partnership Interest</em> to udział komandytariusza w funduszu zamkniętym inwestującym w aktywa niepubliczne. W aplikacjach te same pozycje bywają opisane jako Partnership Interest, Private Equity, Private Funds czy Private Infrastructure — różni je strategia, a nie konstrukcja prawna.</p>
<p>Charakterystyczna jest <strong>krzywa J</strong>: w pierwszych latach wynik jest ujemny (opłaty, koszty transakcji, wyceny po koszcie), a zyski pojawiają się, gdy inwestycje są sprzedawane.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Subskrypcja</strong> — podpisanie umowy (LPA) i commitment.</li>
<li><strong>Wezwania</strong> — zarządzający wzywa do wpłaty części commitmentu z kilkudniowym terminem.</li>
<li><strong>Inwestycje</strong> w spółki lub projekty.</li>
<li><strong>Dystrybucje</strong> z wyjść (sprzedaż, IPO) według kaskady (waterfall): zwrot kapitału, hurdle, catch-up, carried interest.</li>
<li><strong>Rynek wtórny</strong> — sprzedaż udziału innemu inwestorowi (secondaries), zwykle z dyskontem do NAV.</li>
<li><strong>Likwidacja</strong> funduszu.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>AIF zadeklarował 10 mln EUR. Wezwano 6 mln, wypłacono 1 mln, NAV udziału wynosi 6,6 mln.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Miara</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Niewezwany commitment</td><td>10 − 6</td><td class='num'>4 mln EUR</td></tr>
<tr><td>DPI (wypłaty / wpłaty)</td><td>1 / 6</td><td class='num'>0,17×</td></tr>
<tr><td>TVPI ((wypłaty + NAV) / wpłaty)</td><td>(1 + 6,6) / 6</td><td class='num'>1,27×</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>4 mln EUR niewezwanego commitmentu to zobowiązanie — fundusz musi mieć płynność na wezwania. Kontrola płynności obejmuje zobowiązania pozabilansowe.</li>
<li>Limity statutowe mogą liczyć się od commitmentu, a nie od NAV — sprawdź definicję w dokumentach.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> NAV od zarządzającego (zwykle kwartalny, wg wytycznych IPEV), korygowany o przepływy po dniu wyceny.</p>
<ul>
<li><strong>Ryzyko płynności</strong> — brak możliwości wyjścia, wezwania kapitałowe.</li>
<li><strong>Ryzyko wyceny</strong> — opóźniony i modelowy NAV.</li>
<li><strong>Ryzyko niewypłacalności inwestora</strong> — kary za niewpłacenie wezwania.</li>
<li><strong>Ryzyko dźwigni</strong> na poziomie funduszu i spółek portfelowych.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Subskrypcja, kolejne zamknięcia (closings).</li>
<li>Wezwania i dystrybucje; raporty kwartalne.</li>
<li>Przedłużenia, sprzedaż na rynku wtórnym, likwidacja.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Niedopuszczalny <span class='law'>art. 50</span></h4><p>Udział LP nie jest notowanym papierem ani jednostką funduszu otwartego spełniającego art. 50 ust. 1 lit. e. Ekspozycję na private equity UCITS może mieć przez notowane spółki lub notowane fundusze zamknięte.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Fundusz funduszy (AIF) — limity według statutu; ekspozycja i dźwignia funduszy docelowych według rozp. 231/2013.</li>
<li>Depozytariusz weryfikuje tytuł prawny i prowadzi rejestr (art. 21 ust. 8 lit. b).</li>
<li>Wycena (art. 19) — co najmniej raz w roku.</li>
<li>ELTIF i fundusze dla klientów detalicznych — dodatkowe przepisy.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>Annex IV — ekspozycje private equity i zobowiązania.</li>
<li>Brak EMIR i SFTR.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>LEI funduszu docelowego; w danych: commitment, wezwane, wypłacone, NAV, data NAV.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Typ funduszu inwestującego (UCITS — niedopuszczalne).</li>
<li>Niewezwany commitment w kontroli płynności.</li>
<li>Limity statutowe (od commitmentu lub NAV).</li>
<li>Aktualność NAV i weryfikacja tytułu prawnego.</li>
</ul>`
        }
      ],
      glossary: [
        ["Capital call", "Wezwanie inwestora do wpłaty części zadeklarowanej kwoty."],
        ["Carried interest", "Udział zarządzającego w zyskach powyżej progu (hurdle)."],
        ["TVPI / DPI", "Wielokrotność: (wypłaty + NAV) / wpłaty oraz wypłaty / wpłaty."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An interest in a private markets fund, usually structured as a limited partnership: private equity, infrastructure, private credit or venture capital. The investor commits an amount that the manager calls over several years, and receives returns as investments are sold. Interests are illiquid and valued infrequently.",
      keyFacts: [
        ["Parties", "General partner (the manager, with unlimited liability) and limited partners (investors)."],
        ["Commitment", "The committed amount; paid in through capital calls."],
        ["Term", "Usually 10–12 years: 4–6 year investment period, then exits."],
        ["Fees", "Management fee (e.g. 1.5–2%) and carried interest (e.g. 20% above an 8% hurdle)."],
        ["Valuation", "Quarterly NAV, published with a lag."],
        ["Identification", "Usually no ISIN; fund LEI, internal identifier."]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Limited Partnership Interest</em> is a limited partner's stake in a closed-ended fund investing in private assets. In applications the same holdings appear as Partnership Interest, Private Equity, Private Funds or Private Infrastructure — they differ by strategy, not by legal form.</p>
<p>A typical feature is the <strong>J-curve</strong>: the result is negative in the early years (fees, deal costs, valuations at cost), and gains appear as investments are sold.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Subscription</strong> — signing the agreement (LPA) and the commitment.</li>
<li><strong>Capital calls</strong> — the manager calls part of the commitment with a few days' notice.</li>
<li><strong>Investments</strong> in companies or projects.</li>
<li><strong>Distributions</strong> from exits (sale, IPO) under the waterfall: return of capital, hurdle, catch-up, carried interest.</li>
<li><strong>Secondary market</strong> — sale of the interest to another investor (secondaries), usually at a discount to NAV.</li>
<li><strong>Fund liquidation</strong>.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>An AIF committed EUR 10m. EUR 6m has been called, EUR 1m distributed, and the interest's NAV is EUR 6.6m.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Measure</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Unfunded commitment</td><td>10 − 6</td><td class='num'>EUR 4m</td></tr>
<tr><td>DPI (distributions / paid-in)</td><td>1 / 6</td><td class='num'>0.17×</td></tr>
<tr><td>TVPI ((distributions + NAV) / paid-in)</td><td>(1 + 6.6) / 6</td><td class='num'>1.27×</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>EUR 4m of unfunded commitment is a liability — the fund must have liquidity for calls. Liquidity monitoring covers off-balance-sheet commitments.</li>
<li>Limits in the fund rules may be measured on commitment rather than NAV — check the definition in the documents.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> the manager's NAV (usually quarterly, per IPEV guidelines), adjusted for cash flows after the valuation date.</p>
<ul>
<li><strong>Liquidity risk</strong> — no exit, capital calls.</li>
<li><strong>Valuation risk</strong> — lagged, model-based NAV.</li>
<li><strong>Investor default risk</strong> — penalties for missing a call.</li>
<li><strong>Leverage risk</strong> at fund and portfolio company level.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Subscription, successive closings.</li>
<li>Calls and distributions; quarterly reports.</li>
<li>Extensions, secondary sale, liquidation.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Not eligible <span class='law'>Art. 50</span></h4><p>An LP interest is neither a listed security nor a unit of an open-ended fund meeting Art. 50(1)(e). A UCITS can get private equity exposure through listed companies or listed closed-end funds.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Fund of funds (AIF) — limits per its rules; exposure and leverage of target funds per Reg. 231/2013.</li>
<li>The depositary verifies ownership and keeps a record (Art. 21(8)(b)).</li>
<li>Valuation (Art. 19) — at least annually.</li>
<li>ELTIFs and funds for retail investors — additional rules.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>Annex IV — private equity exposures and commitments.</li>
<li>No EMIR or SFTR.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>Target fund LEI; in data: commitment, called, distributed, NAV, NAV date.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Type of investing fund (UCITS — not eligible).</li>
<li>Unfunded commitment in liquidity monitoring.</li>
<li>Limits in the rules (on commitment or NAV).</li>
<li>NAV freshness and verification of ownership.</li>
</ul>`
        }
      ],
      glossary: [
        ["Capital call", "A request for the investor to pay in part of the commitment."],
        ["Carried interest", "The manager's share of profits above a threshold (hurdle)."],
        ["TVPI / DPI", "Multiples: (distributions + NAV) / paid-in and distributions / paid-in."]
      ]
    }
  }
});

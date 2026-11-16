window.INSTRUMENTS.push({
  id: "direct-real-estate",
  name: "Direct Real Estate",
  aliases: ["Direct Property", "Private Real Estate", "Property", "nieruchomość", "spółka celowa nieruchomościowa"],
  market: "otc",
  asset: { pl: "Kredyty i rynki prywatne", en: "Loans and private markets" },
  sources: ["aifmd", "aifmdL2", "aifmd2", "ucits"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Nieruchomość — biuro, magazyn, centrum handlowe, mieszkania — posiadana przez fundusz bezpośrednio albo przez spółkę celową (SPV). Fundusz zarabia na czynszach i wzroście wartości, często finansując zakup kredytem hipotecznym. To aktywo tylko dla AIF: UCITS nie może inwestować w nieruchomości bezpośrednio.",
      keyFacts: [
        ["Forma", "Własność bezpośrednia lub udziały w SPV (propco)."],
        ["Dochód", "Czynsze netto (NOI) + zmiana wartości."],
        ["Finansowanie", "Kredyt hipoteczny; miara: LTV (loan-to-value)."],
        ["Wycena", "Niezależny rzeczoznawca, zwykle kwartalnie lub rocznie."],
        ["Płynność", "Sprzedaż trwa miesiące."],
        ["Identyfikacja", "Brak ISIN; księga wieczysta, wewnętrzny identyfikator aktywa."]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Direct Real Estate</em> to fizyczna nieruchomość w portfelu funduszu. Wartość ustala się metodą dochodową (czynsze / stopa kapitalizacji), porównawczą lub kosztową. Notowane formy ekspozycji na nieruchomości opisują karty <a href='#/i/real-estate-investment-trust'>REIT</a> i <a href='#/i/closed-end-fund'>Closed-End Fund</a>.</p>
<p class='formula'>Wartość ≈ NOI / cap rate</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Due diligence</strong> — techniczne, prawne, podatkowe, środowiskowe.</li>
<li><strong>Zakup</strong> (asset deal lub share deal przez SPV), często z kredytem.</li>
<li><strong>Zarządzanie</strong> — najem, utrzymanie, nakłady inwestycyjne.</li>
<li><strong>Wycena okresowa</strong> przez rzeczoznawcę.</li>
<li><strong>Sprzedaż</strong> i spłata kredytu.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>AIF kupuje magazyn za 50 mln EUR: kredyt 20 mln (LTV 40%), kapitał własny 30 mln. Wartość spada o 10%.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Spadek wartości</td><td>50 × 10%</td><td class='num'>5 mln EUR</td></tr>
<tr><td>Zmiana kapitału własnego</td><td>−5 / 30</td><td class='num'>−16,7%</td></tr>
<tr><td>Dźwignia (ekspozycja / NAV)</td><td>50 / 30</td><td class='num'>167%</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Kredyt hipoteczny to dźwignia AIF — wliczana w metodach brutto i zaangażowania (także kredyt na poziomie kontrolowanej SPV).</li>
<li>Kowenanty LTV w umowie kredytu — spadek wartości może wymusić dopłatę lub sprzedaż.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> niezależny rzeczoznawca (np. standardy RICS), z opóźnieniem względem rynku.</p>
<ul>
<li><strong>Ryzyko rynku nieruchomości</strong> i najemców.</li>
<li><strong>Ryzyko płynności</strong> — szczególnie w otwartych funduszach nieruchomości.</li>
<li><strong>Ryzyko dźwigni</strong> i refinansowania.</li>
<li><strong>Ryzyko wyceny</strong> — mało transakcji porównawczych.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Due diligence, zakup, rejestracja własności.</li>
<li>Najem, wyceny, nakłady.</li>
<li>Refinansowanie, sprzedaż.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Niedopuszczalne <span class='law'>art. 50</span></h4><p>Nieruchomości nie są dopuszczalnym aktywem UCITS. UCITS może kupić akcje spółek nieruchomościowych i notowane REIT-y.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li><strong>Depozytariusz</strong> weryfikuje tytuł własności i prowadzi rejestr (art. 21 ust. 8 lit. b).</li>
<li><strong>Wycena</strong> (art. 19) — co najmniej raz w roku, niezależny wyceniający lub funkcja oddzielona.</li>
<li><strong>Dźwignia</strong> — metody brutto i zaangażowania, ujawnienie maksymalnej dźwigni.</li>
<li><strong>Płynność</strong> — otwarte AIF nieruchomościowe: dopasowanie umorzeń (AIFMD II — narzędzia zarządzania płynnością).</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>Annex IV — ekspozycje nieruchomościowe według rodzaju i regionu.</li>
<li>SFDR — dla funduszy z cechami środowiskowymi, np. efektywność energetyczna budynków.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>Identyfikator aktywa, księga wieczysta, LEI SPV.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Tylko w AIF zgodnie ze statutem.</li>
<li>Weryfikacja własności przez depozytariusza.</li>
<li>Aktualna wycena rzeczoznawcy.</li>
<li>Dźwignia (z SPV) i kowenanty LTV.</li>
</ul>`
        }
      ],
      glossary: [
        ["NOI", "Net operating income — czynsze minus koszty operacyjne."],
        ["Cap rate", "Stopa kapitalizacji — NOI / wartość nieruchomości."],
        ["LTV", "Loan-to-value — kredyt / wartość nieruchomości."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "Real property — offices, warehouses, shopping centres, residential — held by a fund directly or through a special purpose vehicle (SPV). The fund earns rents and capital growth, often financing the purchase with a mortgage. It is an asset for AIFs only: a UCITS cannot invest in property directly.",
      keyFacts: [
        ["Form", "Direct ownership or shares in an SPV (propco)."],
        ["Income", "Net rents (NOI) + change in value."],
        ["Financing", "Mortgage loan; measure: LTV (loan-to-value)."],
        ["Valuation", "Independent valuer, usually quarterly or annually."],
        ["Liquidity", "A sale takes months."],
        ["Identification", "No ISIN; land register, internal asset identifier."]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p><em>Direct Real Estate</em> is physical property in a fund's portfolio. Value is set by the income approach (rents / cap rate), comparison or cost. Listed forms of property exposure are on the <a href='#/i/real-estate-investment-trust'>REIT</a> and <a href='#/i/closed-end-fund'>Closed-End Fund</a> cards.</p>
<p class='formula'>Value ≈ NOI / cap rate</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Due diligence</strong> — technical, legal, tax, environmental.</li>
<li><strong>Purchase</strong> (asset deal or share deal via an SPV), often with a loan.</li>
<li><strong>Management</strong> — letting, maintenance, capital expenditure.</li>
<li><strong>Periodic valuation</strong> by a valuer.</li>
<li><strong>Sale</strong> and loan repayment.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>An AIF buys a warehouse for EUR 50m: a EUR 20m loan (40% LTV), EUR 30m equity. The value falls 10%.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Fall in value</td><td>50 × 10%</td><td class='num'>EUR 5m</td></tr>
<tr><td>Change in equity</td><td>−5 / 30</td><td class='num'>−16.7%</td></tr>
<tr><td>Leverage (exposure / NAV)</td><td>50 / 30</td><td class='num'>167%</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>The mortgage is AIF leverage — included under the gross and commitment methods (including borrowing at the level of a controlled SPV).</li>
<li>LTV covenants in the loan agreement — a fall in value can force a top-up or a sale.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> an independent valuer (e.g. RICS standards), lagging the market.</p>
<ul>
<li><strong>Property market and tenant risk</strong>.</li>
<li><strong>Liquidity risk</strong> — especially in open-ended property funds.</li>
<li><strong>Leverage and refinancing risk</strong>.</li>
<li><strong>Valuation risk</strong> — few comparable transactions.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Due diligence, purchase, registration of title.</li>
<li>Letting, valuations, capex.</li>
<li>Refinancing, sale.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Not eligible <span class='law'>Art. 50</span></h4><p>Property is not an eligible UCITS asset. A UCITS can buy shares of property companies and listed REITs.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li><strong>Depositary</strong> verifies ownership and keeps a record (Art. 21(8)(b)).</li>
<li><strong>Valuation</strong> (Art. 19) — at least annually, by an independent valuer or a separate function.</li>
<li><strong>Leverage</strong> — gross and commitment methods, maximum leverage disclosed.</li>
<li><strong>Liquidity</strong> — open-ended property AIFs: redemption terms aligned (AIFMD II — liquidity management tools).</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>Annex IV — property exposures by type and region.</li>
<li>SFDR — for funds with environmental characteristics, e.g. building energy efficiency.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>Asset identifier, land register, SPV LEI.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Only in AIFs per their rules.</li>
<li>Ownership verified by the depositary.</li>
<li>Current valuer valuation.</li>
<li>Leverage (including SPVs) and LTV covenants.</li>
</ul>`
        }
      ],
      glossary: [
        ["NOI", "Net operating income — rents minus operating costs."],
        ["Cap rate", "Capitalisation rate — NOI / property value."],
        ["LTV", "Loan-to-value — loan / property value."]
      ]
    }
  }
});

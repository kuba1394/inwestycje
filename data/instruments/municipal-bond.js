window.INSTRUMENTS.push({
  id: "municipal-bond",
  name: "Municipal Bond",
  aliases: ["Muni", "Municipal Note", "General Obligation Bond", "Revenue Bond", "Muni Series", "Tender Option Bond", "obligacja komunalna"],
  market: "otc",
  asset: { pl: "Dłużne", en: "Debt" },
  sources: ["ucits", "eligible"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Obligacja emitowana przez władze lokalne lub regionalne — w USA stany, miasta, hrabstwa i ich agencje (rynek „muni”), w Europie np. miasta i landy. W USA odsetki są często zwolnione z podatku federalnego, więc rentowności są niższe niż obligacji korporacyjnych o podobnym ryzyku. Emisje są zwykle seryjne: jedna emisja ma wiele terminów wykupu.",
      keyFacts: [
        ["Rodzaje (USA)", "General obligation (GO) — z dochodów podatkowych; revenue bond — z przychodów projektu."],
        ["Krótkie", "Municipal notes (TAN, RAN, BAN) — do ok. 1 roku."],
        ["Seryjność", "Muni Series — emisja z wieloma terminami, każdy z osobnym CUSIP."],
        ["Amortyzacja", "Część emisji spłaca kapitał w ratach (sinking fund)."],
        ["Tender Option Bond", "Program: trust z obligacją muni emituje floatery z opcją odsprzedaży i residual (inverse floater)."],
        ["Kod CFI", "<code>DN</code> — Municipal bonds"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Municipal Bond</em> to dług samorządu. W USA rynek muni ma kilkadziesiąt tysięcy emitentów i setki tysięcy linii papierów, często mało płynnych.</p>
<p class='formula'>Rentowność ekwiwalentna przed podatkiem = rentowność zwolniona / (1 − stawka podatku)</p>
<p><strong>Tender Option Bond</strong> (TOB) to struktura z dźwignią: trust kupuje długą obligację muni i emituje dwa papiery — krótkie floatery z prawem odsprzedaży (kupowane przez fundusze rynku pieniężnego) i residual, który dostaje resztę odsetek i ponosi zmiany ceny.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Emisja</strong> przez syndykat lub w przetargu; seria terminów.</li>
<li><strong>Kupony</strong> zwykle co pół roku (USA).</li>
<li><strong>Wcześniejszy wykup</strong> (call) — częsty po 10 latach.</li>
<li><strong>Wykup</strong> lub spłata ratalna.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Obligacja muni zwolniona z podatku daje 3,00%; stawka podatku inwestora 37%.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Rentowność ekwiwalentna</td><td>3,00% / (1 − 0,37)</td><td class='num'>4,76%</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Dla funduszu z UE zwolnienie podatkowe zwykle nie ma znaczenia, a niska rentowność — tak.</li>
<li>Art. 52 ust. 3 UCITS dotyczy władz lokalnych <strong>państw członkowskich</strong>. Amerykańskie muni to zwykli emitenci — limit 5/10/40.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> serwisy wycen (matrix pricing) — rzadkie transakcje.</p>
<ul>
<li><strong>Ryzyko kredytowe</strong> samorządu lub projektu.</li>
<li><strong>Ryzyko płynności</strong> — bardzo fragmentaryczny rynek.</li>
<li><strong>Ryzyko wcześniejszego wykupu</strong>.</li>
<li><strong>Ryzyko dźwigni</strong> w residualach TOB.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Emisja, rozliczenie (DTC w USA).</li>
<li>Kupony, ewentualne raty kapitału, calle.</li>
<li>Wykup; w TOB — zdarzenia przetargowe (tender) i likwidacja trustu.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Limity emitenta <span class='law'>art. 52 ust. 1–3</span></h4><p>Władze lokalne państw UE — do 35% (ust. 3); samorządy spoza UE — 5/10/40.</p></div>
<div class='rule'><h4>Płynność <span class='law'>art. 2 dyr. 2007/16/WE</span></h4><p>Nienotowane lub mało płynne serie — ocena płynności; inaczej limit 10%.</p></div>
<div class='rule'><h4>TOB <span class='law'>art. 10 dyr. 2007/16/WE</span></h4><p>Residual (inverse floater) zawiera dźwignię — wbudowany derywat, zwykle nieodpowiedni dla UCITS.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limity według statutu; residuale TOB wliczane do dźwigni.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>W USA transakcje raportuje się do MSRB (EMMA) po stronie dealera.</li>
<li>Fundusz — brak EMIR i SFTR.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li><strong>CUSIP</strong> (każdy termin serii osobno), <strong>ISIN</strong>.</li>
<li><strong>CFI</strong> <code>DN</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Emitent: samorząd UE (art. 52 ust. 3) czy spoza UE (5/10/40).</li>
<li>Agregacja terminów jednej serii i agencji tego samego samorządu.</li>
<li>Płynność.</li>
<li>Brak residuali TOB w UCITS.</li>
</ul>`
        }
      ],
      glossary: [
        ["General obligation bond", "Obligacja spłacana z ogólnych dochodów podatkowych samorządu."],
        ["Revenue bond", "Obligacja spłacana z przychodów konkretnego projektu (np. opłat za drogę)."],
        ["Inverse floater", "Papier, którego kupon spada, gdy rosną stopy — z dźwignią."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A bond issued by local or regional government — in the US states, cities, counties and their agencies (the \"muni\" market), in Europe e.g. cities and German Länder. In the US interest is often exempt from federal tax, so yields are lower than on corporate bonds of similar risk. Issues are usually serial: one issue has many maturities.",
      keyFacts: [
        ["Types (US)", "General obligation (GO) — from tax revenue; revenue bond — from project revenue."],
        ["Short-dated", "Municipal notes (TAN, RAN, BAN) — up to about 1 year."],
        ["Serial issues", "Muni Series — an issue with many maturities, each with its own CUSIP."],
        ["Amortisation", "Some issues repay principal in instalments (sinking fund)."],
        ["Tender Option Bond", "A programme: a trust holding a muni bond issues puttable floaters and a residual (inverse floater)."],
        ["CFI code", "<code>DN</code> — Municipal bonds"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Municipal Bond</em> is local government debt. The US muni market has tens of thousands of issuers and hundreds of thousands of lines, often illiquid.</p>
<p class='formula'>Taxable-equivalent yield = tax-exempt yield / (1 − tax rate)</p>
<p>A <strong>Tender Option Bond</strong> (TOB) is a leveraged structure: a trust buys a long muni bond and issues two securities — short puttable floaters (bought by money market funds) and a residual that receives the remaining interest and bears price changes.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Issue</strong> via a syndicate or competitive sale; a series of maturities.</li>
<li><strong>Coupons</strong> usually semi-annual (US).</li>
<li><strong>Early redemption</strong> (call) — common after 10 years.</li>
<li><strong>Redemption</strong> or instalment repayment.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A tax-exempt muni yields 3.00%; the investor's tax rate is 37%.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Taxable-equivalent yield</td><td>3.00% / (1 − 0.37)</td><td class='num'>4.76%</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>For an EU fund the tax exemption usually does not matter, but the low yield does.</li>
<li>UCITS Art. 52(3) covers local authorities of <strong>Member States</strong>. US munis are ordinary issuers — the 5/10/40 limit.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> pricing services (matrix pricing) — trades are infrequent.</p>
<ul>
<li><strong>Credit risk</strong> of the authority or project.</li>
<li><strong>Liquidity risk</strong> — a highly fragmented market.</li>
<li><strong>Call risk</strong>.</li>
<li><strong>Leverage risk</strong> in TOB residuals.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Issue, settlement (DTC in the US).</li>
<li>Coupons, any principal instalments, calls.</li>
<li>Redemption; for TOBs — tender events and trust termination.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Issuer limits <span class='law'>Art. 52(1)–(3)</span></h4><p>Local authorities of EU states — up to 35% (para 3); non-EU local governments — 5/10/40.</p></div>
<div class='rule'><h4>Liquidity <span class='law'>Art. 2 Dir. 2007/16/EC</span></h4><p>Unlisted or illiquid series — liquidity assessment; otherwise the 10% limit.</p></div>
<div class='rule'><h4>TOBs <span class='law'>Art. 10 Dir. 2007/16/EC</span></h4><p>A residual (inverse floater) contains leverage — an embedded derivative, usually unsuitable for a UCITS.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limits per the fund rules; TOB residuals included in leverage.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>In the US trades are reported to the MSRB (EMMA) by the dealer.</li>
<li>The fund — no EMIR or SFTR.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li><strong>CUSIP</strong> (each maturity of a series separately), <strong>ISIN</strong>.</li>
<li><strong>CFI</strong> <code>DN</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Issuer: EU local authority (Art. 52(3)) or non-EU (5/10/40).</li>
<li>Aggregate the maturities of one series and agencies of the same authority.</li>
<li>Liquidity.</li>
<li>No TOB residuals in a UCITS.</li>
</ul>`
        }
      ],
      glossary: [
        ["General obligation bond", "A bond repaid from the authority's general tax revenue."],
        ["Revenue bond", "A bond repaid from a specific project's revenue (e.g. tolls)."],
        ["Inverse floater", "A security whose coupon falls when rates rise — leveraged."]
      ]
    }
  }
});

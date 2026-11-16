window.INSTRUMENTS.push({
  id: "asset-backed-security",
  name: "Asset-Backed Security",
  aliases: ["ABS", "Auto ABS", "Consumer ABS", "Credit Card ABS", "CLO", "Securitisation", "sekurytyzacja"],
  market: "otc",
  asset: { pl: "Dłużne — sekurytyzacja", en: "Debt — securitisation" },
  sources: ["secReg", "ucits", "eligible", "aifmd"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Papier wartościowy spłacany z przepływów puli aktywów — np. kredytów samochodowych, konsumenckich, kart kredytowych, leasingów albo (w CLO) kredytów lewarowanych. Spółka celowa (SPV) kupuje pulę od banku i emituje kilka transz o różnym pierwszeństwie. Straty z puli najpierw ponoszą transze najniższe.",
      keyFacts: [
        ["Emitent", "Spółka celowa (SPV), niezależna od upadłości banku (bankruptcy remote)."],
        ["Struktura", "Transze: senior, mezzanine, equity (first loss)."],
        ["Kolejność płatności", "Waterfall — najpierw koszty, odsetki senior, potem niższe transze."],
        ["Wsparcie kredytowe", "Podporządkowanie, nadzabezpieczenie, nadwyżka odsetek (excess spread), fundusz rezerwowy."],
        ["Regulacja w UE", "Rozporządzenie 2017/2402: należyta staranność inwestora, zatrzymanie 5% przez inicjatora, oznaczenie STS."],
        ["Kod CFI", "<code>DA</code> — Asset-backed securities"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Asset-Backed Security</em> powstaje w procesie <strong>sekurytyzacji</strong>: bank (inicjator) sprzedaje pulę należności do SPV, a SPV finansuje zakup emisją obligacji. Spłata obligacji zależy od przepływów z puli, a nie od kondycji banku.</p>
<p>Najważniejsze jest <strong>transzowanie</strong> — podział ryzyka kredytowego puli na warstwy. Transza equity ponosi pierwsze straty, mezzanine kolejne, a senior dopiero po wyczerpaniu niższych. Dlatego transza senior może mieć rating AAA, choć kredyty w puli takiego ratingu nie mają.</p>
<p>Podobne konstrukcje: <a href='#/i/mortgage-backed-security'>Mortgage-Backed Security</a> (kredyty hipoteczne) i CLO (kredyty lewarowane). Porównanie z <a href='#/i/covered-bond'>covered bond</a> jest w tabeli porównawczej.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Sprzedaż puli</strong> do SPV (true sale) albo transfer ryzyka derywatem (sekurytyzacja syntetyczna).</li>
<li><strong>Emisja transz</strong> z ratingami; inicjator zatrzymuje co najmniej 5% ryzyka.</li>
<li><strong>Obsługa puli</strong> przez servicera — zbiera spłaty i raportuje.</li>
<li><strong>Waterfall</strong> co miesiąc lub kwartał — podział wpływów między transze.</li>
<li><strong>Amortyzacja</strong> — spłaty kapitału zmniejszają nominał transz (factor &lt; 1); w puli odnawialnej (karty kredytowe) najpierw jest okres rewolwingu.</li>
<li><strong>Opcje wcześniejszego wykupu</strong> (clean-up call) przy małym saldzie puli.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Pula kredytów samochodowych 500 mln EUR; transze: equity 5% (25 mln), mezzanine 10% (50 mln), senior 85% (425 mln). Straty w puli: 40 mln EUR.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Transza</th><th>Strata</th><th class='num'>Odsetek straty transzy</th></tr></thead><tbody>
<tr><td>Equity (0–5%)</td><td>25 mln (pierwsze 25 z 40)</td><td class='num'>100%</td></tr>
<tr><td>Mezzanine (5–15%)</td><td>15 mln (pozostałe)</td><td class='num'>30%</td></tr>
<tr><td>Senior (15–100%)</td><td>0</td><td class='num'>0%</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Strata 8% puli zniszczyła całą transzę equity i 30% mezzanine. Ekspozycja na różne transze tej samej SPV to ten sam emitent w limicie 5/10/40.</li>
<li>Przed zakupem i w trakcie posiadania fundusz musi wykonać i udokumentować należytą staranność (art. 5 rozp. 2017/2402).</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> ceny dealerów lub model przepływów (założenia: wcześniejsze spłaty, niewypłacalności, odzyski).</p>
<ul>
<li><strong>Ryzyko kredytowe puli</strong> i ryzyko struktury (waterfall, triggery).</li>
<li><strong>Ryzyko wcześniejszych spłat i wydłużenia</strong> — zmienny WAL.</li>
<li><strong>Ryzyko płynności</strong> — rynek wtórny płytki, szczególnie w stresie.</li>
<li><strong>Ryzyko kontrahentów struktury</strong> — servicer, bank rachunku, kontrahent swapu w SPV.</li>
<li><strong>Ryzyko modelu i ratingu</strong> (lekcja z 2008 r.).</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Emisja, rozliczenie, raport inwestorski (loan-level data w UE przez repozytorium sekurytyzacji).</li>
<li>Comiesięczne lub kwartalne płatności i aktualizacja factora.</li>
<li>Zdarzenia: naruszenie triggerów, przejście na spłatę sekwencyjną, zmiana servicera.</li>
<li>Clean-up call lub wykup końcowy.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1, art. 2 dyr. 2007/16/WE</span></h4><p>Zbywalny papier wartościowy, jeśli jest notowany albo spełnia kryteria płynności i wyceny; inaczej limit 10%. Wbudowane derywaty (np. transze syntetyczne) — ujęcie w global exposure.</p></div>
<div class='rule'><h4>Limity emitenta <span class='law'>art. 52</span></h4><p>5/10/40 na SPV (nie na inicjatora). Różne transze tej samej SPV sumuje się.</p></div>
<div class='rule'><h4>Należyta staranność <span class='law'>rozp. 2017/2402 art. 5</span></h4><p>Spółka zarządzająca UCITS przed nabyciem weryfikuje m.in. zatrzymanie 5% przez inicjatora, standardy udzielania kredytów, dostępność informacji; w trakcie — monitoruje. Gdy wymogi przestają być spełnione, podejmuje działania naprawcze w interesie uczestników.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>ZAFI ma te same obowiązki należytej staranności z art. 5 rozporządzenia o sekurytyzacji.</li>
<li>Limity według statutu; w Annex IV jako papiery sekurytyzacyjne.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>Inicjator, sponsor lub SPV publikują raporty przez repozytorium sekurytyzacji (art. 7 rozp. 2017/2402).</li>
<li>Fundusz — bez raportów EMIR/SFTR dla samego papieru.</li>
<li>W prospekcie i sprawozdaniu — ujawnienie inwestycji w sekurytyzacje, jeśli wymaga tego polityka.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li><strong>ISIN</strong> każdej transzy, <strong>LEI</strong> SPV.</li>
<li><strong>CFI</strong> <code>DA</code>.</li>
<li>W danych referencyjnych: factor, transza, inicjator, status STS — wartość pozycji = nominał pierwotny × factor × cena.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Udokumentowana należyta staranność (art. 5) przed zakupem.</li>
<li>Limit emitenta na SPV, sumowanie transz.</li>
<li>Aktualny factor w wycenie.</li>
<li>Wbudowane derywaty i dźwignia (transze syntetyczne).</li>
<li>Płynność pozycji w stosunku do umorzeń.</li>
</ul>`
        }
      ],
      glossary: [
        ["Tranche", "Warstwa emisji o określonym pierwszeństwie w ponoszeniu strat."],
        ["Waterfall", "Kolejność podziału wpływów z puli między koszty i transze."],
        ["Factor", "Bieżący nominał transzy jako ułamek nominału pierwotnego."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A security repaid from the cash flows of an asset pool — e.g. auto loans, consumer loans, credit cards, leases or (in CLOs) leveraged loans. A special purpose vehicle (SPV) buys the pool from a bank and issues several tranches of different seniority. Losses in the pool hit the lowest tranches first.",
      keyFacts: [
        ["Issuer", "A special purpose vehicle (SPV), remote from the bank's insolvency (bankruptcy remote)."],
        ["Structure", "Tranches: senior, mezzanine, equity (first loss)."],
        ["Payment order", "Waterfall — costs first, senior interest, then lower tranches."],
        ["Credit enhancement", "Subordination, overcollateralisation, excess spread, reserve fund."],
        ["EU regulation", "Regulation 2017/2402: investor due diligence, 5% retention by the originator, STS label."],
        ["CFI code", "<code>DA</code> — Asset-backed securities"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>An <em>Asset-Backed Security</em> is created by <strong>securitisation</strong>: a bank (originator) sells a pool of receivables to an SPV, and the SPV funds the purchase by issuing bonds. Repayment depends on the pool's cash flows, not on the bank's condition.</p>
<p>The key feature is <strong>tranching</strong> — splitting the pool's credit risk into layers. The equity tranche takes the first losses, mezzanine the next, and senior only once the lower ones are exhausted. That is why a senior tranche can be rated AAA although the loans in the pool are not.</p>
<p>Similar structures: <a href='#/i/mortgage-backed-security'>Mortgage-Backed Security</a> (mortgages) and CLOs (leveraged loans). A comparison with a <a href='#/i/covered-bond'>covered bond</a> is in the comparison tables.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Sale of the pool</strong> to the SPV (true sale) or transfer of risk via a derivative (synthetic securitisation).</li>
<li><strong>Issue of rated tranches</strong>; the originator retains at least 5% of the risk.</li>
<li><strong>Pool servicing</strong> by a servicer — collects payments and reports.</li>
<li><strong>Waterfall</strong> monthly or quarterly — distribution of collections between tranches.</li>
<li><strong>Amortisation</strong> — principal repayments reduce tranche nominals (factor &lt; 1); revolving pools (credit cards) start with a revolving period.</li>
<li><strong>Early redemption options</strong> (clean-up call) when the pool balance is small.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>An auto loan pool of EUR 500m; tranches: equity 5% (25m), mezzanine 10% (50m), senior 85% (425m). Pool losses: EUR 40m.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Tranche</th><th>Loss</th><th class='num'>Tranche loss</th></tr></thead><tbody>
<tr><td>Equity (0–5%)</td><td>25m (the first 25 of 40)</td><td class='num'>100%</td></tr>
<tr><td>Mezzanine (5–15%)</td><td>15m (the rest)</td><td class='num'>30%</td></tr>
<tr><td>Senior (15–100%)</td><td>0</td><td class='num'>0%</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>An 8% pool loss wiped out the equity tranche and 30% of mezzanine. Exposure to different tranches of the same SPV is the same issuer in the 5/10/40 limit.</li>
<li>Before buying and while holding, the fund must carry out and document due diligence (Art. 5 Reg. 2017/2402).</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> dealer prices or a cash-flow model (assumptions: prepayments, defaults, recoveries).</p>
<ul>
<li><strong>Pool credit risk</strong> and structural risk (waterfall, triggers).</li>
<li><strong>Prepayment and extension risk</strong> — a variable WAL.</li>
<li><strong>Liquidity risk</strong> — a thin secondary market, especially under stress.</li>
<li><strong>Structure counterparty risk</strong> — servicer, account bank, swap counterparty in the SPV.</li>
<li><strong>Model and rating risk</strong> (the lesson of 2008).</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Issue, settlement, investor report (loan-level data in the EU via a securitisation repository).</li>
<li>Monthly or quarterly payments and factor updates.</li>
<li>Events: trigger breaches, switch to sequential pay, servicer replacement.</li>
<li>Clean-up call or final redemption.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1), Art. 2 Dir. 2007/16/EC</span></h4><p>A transferable security if listed or if it meets the liquidity and valuation criteria; otherwise the 10% limit. Embedded derivatives (e.g. synthetic tranches) — included in global exposure.</p></div>
<div class='rule'><h4>Issuer limits <span class='law'>Art. 52</span></h4><p>5/10/40 on the SPV (not the originator). Different tranches of the same SPV are added up.</p></div>
<div class='rule'><h4>Due diligence <span class='law'>Reg. 2017/2402 Art. 5</span></h4><p>Before buying, the UCITS management company verifies, among other things, the originator's 5% retention, credit-granting standards and availability of information; while holding — it monitors. If the requirements stop being met, it takes corrective action in the investors' interest.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>An AIFM has the same Art. 5 due diligence obligations under the Securitisation Regulation.</li>
<li>Limits per the fund rules; in Annex IV as securitisation positions.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>The originator, sponsor or SPV publishes reports via a securitisation repository (Art. 7 Reg. 2017/2402).</li>
<li>The fund — no EMIR/SFTR reports for the security itself.</li>
<li>Prospectus and annual report — disclosure of securitisation investments where the policy requires it.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li><strong>ISIN</strong> of each tranche, SPV <strong>LEI</strong>.</li>
<li><strong>CFI</strong> <code>DA</code>.</li>
<li>In reference data: factor, tranche, originator, STS status — position value = original nominal × factor × price.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Documented due diligence (Art. 5) before purchase.</li>
<li>Issuer limit on the SPV, tranches added up.</li>
<li>Current factor used in valuation.</li>
<li>Embedded derivatives and leverage (synthetic tranches).</li>
<li>Position liquidity relative to redemptions.</li>
</ul>`
        }
      ],
      glossary: [
        ["Tranche", "A layer of an issue with a set priority in absorbing losses."],
        ["Waterfall", "The order in which pool collections are paid to costs and tranches."],
        ["Factor", "A tranche's current nominal as a fraction of its original nominal."]
      ]
    }
  }
});

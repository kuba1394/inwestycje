window.INSTRUMENTS.push({
  id: "mortgage-backed-security",
  name: "Mortgage-Backed Security",
  aliases: ["MBS", "RMBS", "CMBS", "Agency MBS", "Pass-Through", "CMO", "TBA", "To Be Announced"],
  market: "otc",
  asset: { pl: "Dłużne — sekurytyzacja", en: "Debt — securitisation" },
  sources: ["secReg", "ucits", "eligible", "cesr10788", "emir"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Papier spłacany z rat puli kredytów hipotecznych: mieszkaniowych (RMBS) albo komercyjnych (CMBS). Największy rynek to amerykańskie MBS agencyjne (Ginnie Mae, Fannie Mae, Freddie Mac). Kredytobiorcy mogą wcześniej spłacać kredyty, więc nominał papieru maleje co miesiąc i nikt nie zna z góry jego terminu życia. Transakcje na przyszłe pule zawiera się na rynku TBA.",
      keyFacts: [
        ["Rodzaje", "Pass-through (MPT), CMO (agencyjne i nieagencyjne), RMBS, CMBS, TBA."],
        ["Gwarancja", "Ginnie Mae — wyraźna gwarancja rządu USA; Fannie Mae i Freddie Mac — gwarancja agencji (GSE) bez wyraźnej gwarancji rządu; private label — brak."],
        ["Płatności", "Miesięczne: odsetki + spłaty kapitału, w tym wcześniejsze."],
        ["Factor", "Bieżący nominał / nominał pierwotny — maleje co miesiąc."],
        ["TBA", "Forward na pulę agencyjną o znanych parametrach (emitent, kupon, termin), bez wskazania puli do 48 godzin przed rozliczeniem."],
        ["Kod CFI", "<code>DG</code> — Mortgage-backed securities"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Mortgage-Backed Security</em> to sekurytyzacja kredytów hipotecznych (ogólny mechanizm opisuje karta <a href='#/i/asset-backed-security'>Asset-Backed Security</a>).</p>
<ul>
<li><strong>Pass-through</strong> — każdy posiadacz dostaje proporcjonalną część wszystkich spłat puli.</li>
<li><strong>CMO</strong> (Collateralized Mortgage Obligation) — przepływy puli dzieli się na transze według kolejności spłat kapitału (np. sekwencyjne, PAC). W CMO agencyjnych transzuje się ryzyko wcześniejszych spłat, a nie kredytowe.</li>
<li><strong>CMBS</strong> — kredyty na nieruchomości komercyjne; mniej wcześniejszych spłat (kary, lockout), większe ryzyko kredytowe pojedynczych kredytów.</li>
<li><strong>TBA</strong> (To Be Announced) — kontrakt terminowy na dostawę puli agencyjnej o uzgodnionych cechach. Rozliczenie raz w miesiącu według kalendarza SIFMA.</li>
</ul>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Pula.</strong> Agencja lub bank tworzy pulę kredytów i emituje MBS.</li>
<li><strong>Płatności miesięczne.</strong> Odsetki i kapitał; wcześniejsze spłaty rosną, gdy stopy spadają (refinansowanie).</li>
<li><strong>Factor</strong> publikowany co miesiąc — zmienia wartość pozycji bez transakcji.</li>
<li><strong>TBA.</strong> Strony uzgadniają cenę i nominał; sprzedający wskazuje pule na 48 godzin przed rozliczeniem (48-hour day). Przesunięcie TBA na kolejny miesiąc to <em>dollar roll</em>.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Pass-through Fannie Mae: nominał pierwotny 10 mln USD, factor 0,85, cena 98,00.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Nominał bieżący</td><td>10 000 000 × 0,85</td><td class='num'>8 500 000</td></tr>
<tr><td>Wartość rynkowa</td><td>8 500 000 × 98,00%</td><td class='num'>8 330 000</td></tr>
<tr><td>Błąd przy pominięciu factora</td><td>10 000 000 × 98,00%</td><td class='num'>9 800 000 (+17,6%)</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Nieaktualny factor zawyża pozycję i limity emitenta. Factor trzeba aktualizować co miesiąc.</li>
<li>Zakup TBA to zobowiązanie terminowe — w UCITS ekspozycja w metodzie zaangażowania równa się wartości rynkowej puli, a fundusz musi mieć pokrycie (gotówkę) na rozliczenie.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> ceny dealerów (TBA jako punkt odniesienia dla pul) lub model z założeniami wcześniejszych spłat (CPR, PSA).</p>
<ul>
<li><strong>Ryzyko wcześniejszych spłat</strong> — ujemna wypukłość: gdy stopy spadają, kapitał wraca wcześniej i trzeba go reinwestować taniej.</li>
<li><strong>Ryzyko wydłużenia</strong> — gdy stopy rosną, spłaty zwalniają.</li>
<li><strong>Ryzyko kredytowe</strong> — w nieagencyjnych RMBS i CMBS.</li>
<li><strong>Ryzyko kontrahenta i rozliczenia TBA</strong> — margin wg zasad FINRA w USA.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Transakcja TBA lub zakup puli (specified pool).</li>
<li>Rozliczenie TBA w dniu z kalendarza SIFMA, wskazanie pul 48 godzin wcześniej.</li>
<li>Miesięczne płatności i aktualizacja factora.</li>
<li>Wykup końcowy, clean-up call; w CMBS — zdarzenia kredytowe, special servicing.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Limity emitenta <span class='law'>art. 52 ust. 1–3</span></h4><p>Ginnie Mae — papiery gwarantowane przez rząd USA, możliwy art. 52 ust. 3. Fannie Mae i Freddie Mac — brak wyraźnej gwarancji; zwykle traktowane jak emitenci prywatni (5/10/40), praktyka nadzorców się różni. Private label — limit na SPV.</p></div>
<div class='rule'><h4>TBA jako derywat <span class='law'>CESR/10-788</span></h4><p>Zakup terminowy — ekspozycja równa wartości rynkowej puli; zakaz niekrytej sprzedaży TBA bez posiadania pul.</p></div>
<div class='rule'><h4>Rozporządzenie o sekurytyzacji <span class='law'>2017/2402 art. 5</span></h4><p>Pass-through bez transzowania ryzyka kredytowego zwykle nie jest „sekurytyzacją” w rozumieniu rozporządzenia; nieagencyjne RMBS i CMBS z transzami — tak, z obowiązkiem należytej staranności.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Należyta staranność jak dla sekurytyzacji (dla transzowanych struktur).</li>
<li>Dollar roll i TBA zwiększają ekspozycję — wliczane do dźwigni.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>TBA zawierane przez fundusz z UE: traktuj jak derywat do oceny obowiązków EMIR (forward na papier rozliczany po terminie standardowym) — skonsultuj praktykę raportowania z zespołem prawnym.</li>
<li>W USA transakcje raportuje się do TRACE (po stronie dealera).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li><strong>CUSIP/ISIN</strong> puli, dla TBA — generyczny CUSIP TBA (agencja, kupon, termin, miesiąc).</li>
<li><strong>CFI</strong> <code>DG</code>.</li>
<li>Factor, typ (pass-through, CMO, CMBS), agencja — kluczowe pola danych referencyjnych.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Aktualny factor.</li>
<li>Klasyfikacja emitenta: Ginnie Mae, GSE, private label.</li>
<li>TBA — ekspozycja, pokrycie gotówkowe, brak niekrytej sprzedaży.</li>
<li>Należyta staranność dla struktur transzowanych.</li>
</ul>`
        }
      ],
      glossary: [
        ["Agency MBS", "MBS z gwarancją Ginnie Mae, Fannie Mae lub Freddie Mac."],
        ["Prepayment (CPR)", "Wcześniejsza spłata kredytów; CPR to jej roczna stopa."],
        ["Dollar roll", "Sprzedaż TBA na bieżący miesiąc i odkup na następny — sposób finansowania pozycji."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A security repaid from the instalments of a pool of mortgages: residential (RMBS) or commercial (CMBS). The largest market is US agency MBS (Ginnie Mae, Fannie Mae, Freddie Mac). Borrowers can prepay, so the security's nominal falls every month and nobody knows its life in advance. Trades in future pools are done in the TBA market.",
      keyFacts: [
        ["Types", "Pass-through (MPT), CMO (agency and non-agency), RMBS, CMBS, TBA."],
        ["Guarantee", "Ginnie Mae — explicit US government guarantee; Fannie Mae and Freddie Mac — agency (GSE) guarantee without an explicit government guarantee; private label — none."],
        ["Payments", "Monthly: interest + principal, including prepayments."],
        ["Factor", "Current nominal / original nominal — falls every month."],
        ["TBA", "A forward on an agency pool with known parameters (issuer, coupon, term), with pools named only 48 hours before settlement."],
        ["CFI code", "<code>DG</code> — Mortgage-backed securities"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Mortgage-Backed Security</em> is a securitisation of mortgage loans (the general mechanism is on the <a href='#/i/asset-backed-security'>Asset-Backed Security</a> card).</p>
<ul>
<li><strong>Pass-through</strong> — each holder receives a pro-rata share of all pool payments.</li>
<li><strong>CMO</strong> (Collateralized Mortgage Obligation) — pool cash flows are split into tranches by order of principal repayment (e.g. sequential, PAC). Agency CMOs tranche prepayment risk, not credit risk.</li>
<li><strong>CMBS</strong> — commercial property loans; fewer prepayments (penalties, lockouts), more credit risk in single loans.</li>
<li><strong>TBA</strong> (To Be Announced) — a forward contract to deliver an agency pool with agreed characteristics. Settles once a month per the SIFMA calendar.</li>
</ul>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Pool.</strong> An agency or bank pools loans and issues MBS.</li>
<li><strong>Monthly payments.</strong> Interest and principal; prepayments rise when rates fall (refinancing).</li>
<li><strong>Factor</strong> published monthly — changes the position value without a trade.</li>
<li><strong>TBA.</strong> The parties agree price and nominal; the seller names the pools 48 hours before settlement (48-hour day). Rolling a TBA into the next month is a <em>dollar roll</em>.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A Fannie Mae pass-through: original nominal USD 10m, factor 0.85, price 98.00.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Current nominal</td><td>10,000,000 × 0.85</td><td class='num'>8,500,000</td></tr>
<tr><td>Market value</td><td>8,500,000 × 98.00%</td><td class='num'>8,330,000</td></tr>
<tr><td>Error if the factor is ignored</td><td>10,000,000 × 98.00%</td><td class='num'>9,800,000 (+17.6%)</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>A stale factor overstates the position and issuer limits. The factor must be updated monthly.</li>
<li>A TBA purchase is a forward commitment — in a UCITS the commitment exposure equals the pool's market value, and the fund needs cover (cash) for settlement.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> dealer prices (TBA as the benchmark for pools) or a model with prepayment assumptions (CPR, PSA).</p>
<ul>
<li><strong>Prepayment risk</strong> — negative convexity: when rates fall, principal comes back early and has to be reinvested at lower rates.</li>
<li><strong>Extension risk</strong> — when rates rise, prepayments slow.</li>
<li><strong>Credit risk</strong> — in non-agency RMBS and CMBS.</li>
<li><strong>TBA counterparty and settlement risk</strong> — margining under FINRA rules in the US.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>TBA trade or purchase of a pool (specified pool).</li>
<li>TBA settlement on the SIFMA calendar date, pools named 48 hours earlier.</li>
<li>Monthly payments and factor updates.</li>
<li>Final redemption, clean-up call; in CMBS — credit events, special servicing.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Issuer limits <span class='law'>Art. 52(1)–(3)</span></h4><p>Ginnie Mae — securities guaranteed by the US government, Art. 52(3) possible. Fannie Mae and Freddie Mac — no explicit guarantee; usually treated as private issuers (5/10/40), supervisory practice varies. Private label — limit on the SPV.</p></div>
<div class='rule'><h4>TBA as a derivative <span class='law'>CESR/10-788</span></h4><p>A forward purchase — exposure equal to the pool's market value; no uncovered TBA sales without holding pools.</p></div>
<div class='rule'><h4>Securitisation Regulation <span class='law'>2017/2402 Art. 5</span></h4><p>A pass-through with no tranching of credit risk is usually not a "securitisation" under the Regulation; tranched non-agency RMBS and CMBS are, with due diligence obligations.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Due diligence as for securitisations (for tranched structures).</li>
<li>Dollar rolls and TBAs add exposure — included in leverage.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>TBAs traded by an EU fund: treat them as a derivative when assessing EMIR obligations (a forward on a security settling beyond the standard cycle) — check reporting practice with the legal team.</li>
<li>In the US trades are reported to TRACE (by the dealer).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>Pool <strong>CUSIP/ISIN</strong>; for TBAs — a generic TBA CUSIP (agency, coupon, term, month).</li>
<li><strong>CFI</strong> <code>DG</code>.</li>
<li>Factor, type (pass-through, CMO, CMBS), agency — key reference-data fields.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Current factor.</li>
<li>Issuer classification: Ginnie Mae, GSE, private label.</li>
<li>TBA — exposure, cash cover, no uncovered sales.</li>
<li>Due diligence for tranched structures.</li>
</ul>`
        }
      ],
      glossary: [
        ["Agency MBS", "MBS guaranteed by Ginnie Mae, Fannie Mae or Freddie Mac."],
        ["Prepayment (CPR)", "Early repayment of loans; CPR is its annual rate."],
        ["Dollar roll", "Selling a TBA for the current month and buying it back for the next — a way to finance the position."]
      ]
    }
  }
});

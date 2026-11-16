window.INSTRUMENTS.push({
  id: "floating-rate-note",
  name: "Floating Rate Note",
  aliases: ["FRN", "Floater", "Brazil LFT", "obligacja zmiennokuponowa", "WZ"],
  market: "otc",
  asset: { pl: "Dłużne", en: "Debt" },
  sources: ["ucits", "eligible", "mmfr", "bmr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Obligacja zmiennokuponowa płaci odsetki według stopy referencyjnej (np. EURIBOR 3M, WIBOR 6M, składany €STR lub SOFR) powiększonej o stałą marżę. Kupon zmienia się przy każdym ustaleniu stopy, więc cena jest mało wrażliwa na zmiany stóp procentowych, ale nadal zależy od ryzyka kredytowego emitenta.",
      keyFacts: [
        ["Kupon", "Stopa referencyjna + marża (quoted margin), ustalana okresowo."],
        ["Stopa referencyjna", "IBOR (EURIBOR, WIBOR) albo stopa overnight składana (€STR, SOFR, SONIA); w Brazylii (LFT) — Selic."],
        ["Duration stopy procentowej", "Bliska czasowi do najbliższego ustalenia kuponu."],
        ["Duration spreadu", "Bliska terminowi do wykupu — ryzyko kredytowe zostaje."],
        ["Emitenci", "Państwa (np. polskie WZ, brazylijskie LFT), banki, spółki, agencje."],
        ["Kod CFI", "<code>DB</code> z atrybutem oprocentowania <code>V</code> (variable)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Floating Rate Note</em> (FRN) to obligacja, której kupon na każdy okres odsetkowy wynosi:</p>
<p class='formula'>kupon = stopa referencyjna (ustalona na początku lub na końcu okresu) + marża</p>
<p>Marża jest stała przez cały okres życia obligacji i odzwierciedla ryzyko kredytowe emitenta z dnia emisji. Jeśli ryzyko kredytowe się zmieni, cena obligacji odchyli się od 100 — miarą jest <em>discount margin</em>, czyli marża, przy której wartość bieżąca przepływów równa się cenie.</p>
<p>Często FRN mają wbudowany <strong>floor</strong> (np. stopa referencyjna nie niższa niż 0%) albo <strong>cap</strong>. Zwykły floor na poziomie zero nie zmienia klasyfikacji papieru, ale opcje istotnie zmieniające profil wypłaty to już wbudowany derywat.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Ustalenie stopy (fixing).</strong> Przy IBOR — dwa dni robocze przed początkiem okresu. Przy stopach overnight — stopa składana z dziennych obserwacji, znana na końcu okresu (z przesunięciem obserwacji o kilka dni).</li>
<li><strong>Naliczanie.</strong> Odsetki = nominał × kupon × liczba dni / 360 (EUR, USD) lub / 365 (PLN, GBP).</li>
<li><strong>Płatność kuponu</strong> co kwartał lub co pół roku.</li>
<li><strong>Nowy okres</strong> — nowa stopa referencyjna, ta sama marża.</li>
<li><strong>Wykup</strong> po 100% nominału.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>FRN o nominale 10 mln EUR, kupon EURIBOR 3M + 0,80%, ustalony EURIBOR 3M = 2,10%, okres 91 dni, ACT/360.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Kupon roczny</td><td>2,10% + 0,80%</td><td class='num'>2,90%</td></tr>
<tr><td>Odsetki za okres</td><td>10 000 000 × 2,90% × 91 / 360</td><td class='num'>73 305,56 EUR</td></tr>
</tbody></table></div>
<p>Jeśli stopy wzrosną o 1 pkt proc., kolejny kupon wzrośnie do 3,90%, a cena obligacji prawie się nie zmieni. Jeśli natomiast rynek zacznie wymagać od emitenta marży 1,30% zamiast 0,80% przy 3 latach do wykupu, cena spadnie o ok. 0,5% × 3 ≈ 1,5%.</p>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>W funduszu rynku pieniężnego WAM liczy się do najbliższej zmiany stopy, ale WAL i maksymalny termin pojedynczego instrumentu (397 dni) — do terminu wykupu (MMFR art. 2 i art. 24).</li>
<li>Dla UCITS FRN to zwykły zbywalny papier wartościowy — limity emitenta jak dla obligacji.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> cena rynkowa lub model: przyszłe stopy z krzywej forward plus marża, dyskontowane krzywą plus discount margin.</p>
<ul>
<li><strong>Ryzyko kredytowe i spreadu</strong> — główne ryzyko.</li>
<li><strong>Ryzyko bazy</strong> — różnica między stopą referencyjną a kosztem finansowania.</li>
<li><strong>Ryzyko wskaźnika</strong> — zmiana lub zaprzestanie publikacji (LIBOR, WIBOR → POLSTR); sprawdź klauzule zastępcze (fallback).</li>
<li><strong>Ryzyko płynności</strong> obligacji korporacyjnych.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Emisja, nadanie ISIN, rozliczenie DvP.</li>
<li>Okresowe ustalenia stopy i płatności kuponów.</li>
<li>Zdarzenia wskaźnika: zastąpienie stopy referencyjnej zgodnie z warunkami emisji.</li>
<li>Wcześniejszy wykup (call), wykup w terminie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1</span></h4><p>Zbywalny papier wartościowy (notowany) lub MMI, gdy termin do wykupu lub korekty stopy spełnia kryteria MMI (art. 3 dyr. 2007/16/WE: korekta stopy co najmniej raz na 397 dni).</p></div>
<div class='rule'><h4>Limity emitenta <span class='law'>art. 52</span></h4><p>5/10/40 dla emitentów prywatnych, 35%/100% dla państw (np. polskie WZ).</p></div>
<div class='rule'><h4>Wbudowany derywat <span class='law'>art. 10 dyr. 2007/16/WE</span></h4><p>Zwykły floor lub cap nie zmienia klasyfikacji; struktury z dźwignią (np. inverse floater) wymagają ujęcia wbudowanego derywatu w global exposure.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limity według statutu; w raportach Annex IV jako obligacja (korporacyjna lub skarbowa).</li>
<li>Inverse floater i struktury z dźwignią — wliczane do dźwigni AIF.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>Brak raportów EMIR i SFTR (chyba że FRN jest zabezpieczeniem w SFT).</li>
<li>BMR — stosowana stopa referencyjna musi pochodzić od administratora zarejestrowanego w UE lub uznanego; w prospekcie funduszu ujawnia się wskaźniki, których używa.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li><strong>ISIN</strong>, <strong>LEI</strong> emitenta.</li>
<li><strong>CFI</strong> <code>DB V…</code> (oprocentowanie zmienne).</li>
<li>W danych referencyjnych: stopa referencyjna, marża, częstotliwość, sposób ustalania (in advance / in arrears), floor i cap.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Limit emitenta i grupy kapitałowej.</li>
<li>Dla MMF: WAM liczony do resetu, WAL i maks. termin — do wykupu.</li>
<li>Wbudowany floor/cap — czy wymaga ujęcia jako derywat.</li>
<li>Wskaźnik referencyjny zgodny z BMR, klauzula zastępcza.</li>
</ul>`
        }
      ],
      glossary: [
        ["Quoted margin", "Stała marża dodawana do stopy referencyjnej w kuponie."],
        ["Discount margin", "Marża, przy której wartość bieżąca przepływów równa się cenie rynkowej FRN."],
        ["In arrears", "Stopa ustalana na końcu okresu odsetkowego (typowe dla stóp overnight składanych)."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A floating rate note pays interest at a reference rate (e.g. 3M EURIBOR, 6M WIBOR, compounded €STR or SOFR) plus a fixed margin. The coupon changes at each rate fixing, so the price is barely sensitive to interest rate moves, but it still depends on the issuer's credit risk.",
      keyFacts: [
        ["Coupon", "Reference rate + margin (quoted margin), reset periodically."],
        ["Reference rate", "IBOR (EURIBOR, WIBOR) or compounded overnight rate (€STR, SOFR, SONIA); in Brazil (LFT) — Selic."],
        ["Interest rate duration", "Close to the time to the next coupon reset."],
        ["Spread duration", "Close to the time to maturity — credit risk remains."],
        ["Issuers", "Sovereigns (e.g. Polish WZ, Brazilian LFT), banks, corporates, agencies."],
        ["CFI code", "<code>DB</code> with interest attribute <code>V</code> (variable)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Floating Rate Note</em> (FRN) is a bond whose coupon for each interest period is:</p>
<p class='formula'>coupon = reference rate (fixed at the start or at the end of the period) + margin</p>
<p>The margin is fixed for the life of the bond and reflects the issuer's credit risk at issue. If the credit risk changes, the price moves away from 100 — the measure is the <em>discount margin</em>, the margin at which the present value of cash flows equals the price.</p>
<p>FRNs often have an embedded <strong>floor</strong> (e.g. reference rate not below 0%) or a <strong>cap</strong>. A plain zero floor does not change the bond's classification, but options that materially change the payoff are an embedded derivative.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Rate fixing.</strong> For IBOR — two business days before the period starts. For overnight rates — a rate compounded from daily observations, known at the end of the period (with an observation shift of a few days).</li>
<li><strong>Accrual.</strong> Interest = nominal × coupon × days / 360 (EUR, USD) or / 365 (PLN, GBP).</li>
<li><strong>Coupon payment</strong> quarterly or semi-annually.</li>
<li><strong>New period</strong> — new reference rate, same margin.</li>
<li><strong>Redemption</strong> at 100% of nominal.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>An FRN with EUR 10m nominal, coupon 3M EURIBOR + 0.80%, 3M EURIBOR fixed at 2.10%, 91-day period, ACT/360.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Annual coupon</td><td>2.10% + 0.80%</td><td class='num'>2.90%</td></tr>
<tr><td>Interest for the period</td><td>10,000,000 × 2.90% × 91 / 360</td><td class='num'>EUR 73,305.56</td></tr>
</tbody></table></div>
<p>If rates rise by 1 percentage point, the next coupon rises to 3.90% and the bond price barely moves. But if the market starts to require a 1.30% margin instead of 0.80% with 3 years to maturity, the price falls by about 0.5% × 3 ≈ 1.5%.</p>
<h3>What this means for compliance</h3>
<ul>
<li>In a money market fund, WAM is measured to the next rate reset, but WAL and the maximum maturity of a single instrument (397 days) — to final maturity (MMFR Art. 2 and Art. 24).</li>
<li>For a UCITS an FRN is an ordinary transferable security — issuer limits as for bonds.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> market price or a model: future rates from the forward curve plus margin, discounted at the curve plus discount margin.</p>
<ul>
<li><strong>Credit and spread risk</strong> — the main risk.</li>
<li><strong>Basis risk</strong> — difference between the reference rate and the funding cost.</li>
<li><strong>Benchmark risk</strong> — change or cessation (LIBOR, WIBOR → POLSTR); check the fallback clauses.</li>
<li><strong>Liquidity risk</strong> of corporate bonds.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Issue, ISIN assignment, DvP settlement.</li>
<li>Periodic rate fixings and coupon payments.</li>
<li>Benchmark events: replacement of the reference rate under the terms and conditions.</li>
<li>Early redemption (call), redemption at maturity.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)</span></h4><p>A transferable security (listed) or an MMI where the maturity or rate reset meets the MMI criteria (Art. 3 Dir. 2007/16/EC: rate adjusted at least every 397 days).</p></div>
<div class='rule'><h4>Issuer limits <span class='law'>Art. 52</span></h4><p>5/10/40 for private issuers, 35%/100% for sovereigns (e.g. Polish WZ).</p></div>
<div class='rule'><h4>Embedded derivative <span class='law'>Art. 10 Dir. 2007/16/EC</span></h4><p>A plain floor or cap does not change the classification; leveraged structures (e.g. an inverse floater) require the embedded derivative to be included in global exposure.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limits per the fund rules; in Annex IV reports as a bond (corporate or sovereign).</li>
<li>Inverse floaters and leveraged structures — included in the AIF's leverage.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>No EMIR or SFTR reports (unless the FRN is collateral in an SFT).</li>
<li>BMR — the reference rate must come from an administrator registered or recognised in the EU; the fund prospectus discloses the benchmarks it uses.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li><strong>ISIN</strong>, issuer <strong>LEI</strong>.</li>
<li><strong>CFI</strong> <code>DB V…</code> (variable interest).</li>
<li>In reference data: reference rate, margin, frequency, fixing method (in advance / in arrears), floor and cap.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Issuer and group limit.</li>
<li>For MMFs: WAM measured to the reset, WAL and maximum maturity to final maturity.</li>
<li>Embedded floor/cap — whether it must be treated as a derivative.</li>
<li>Reference rate compliant with BMR, fallback clause.</li>
</ul>`
        }
      ],
      glossary: [
        ["Quoted margin", "The fixed margin added to the reference rate in the coupon."],
        ["Discount margin", "The margin at which the present value of cash flows equals the FRN's market price."],
        ["In arrears", "Rate set at the end of the interest period (typical for compounded overnight rates)."]
      ]
    }
  }
});

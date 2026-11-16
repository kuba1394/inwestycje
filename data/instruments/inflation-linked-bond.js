window.INSTRUMENTS.push({
  id: "inflation-linked-bond",
  name: "Inflation-Linked Bond",
  aliases: ["Linker", "TIPS", "Index-Linked Gilt", "Real Return Bond", "OATi / OAT€i", "Brazil NTN-B", "obligacja indeksowana inflacją"],
  market: "otc",
  asset: { pl: "Dłużne", en: "Debt" },
  sources: ["ucits", "eligible"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Obligacja indeksowana inflacją ma kapitał (a przez to kupony) przeliczany według wskaźnika cen, np. CPI w USA, RPI lub CPI w Wielkiej Brytanii, HICP w strefie euro. Inwestor dostaje stały kupon realny od rosnącego nominału, więc jest chroniony przed inflacją. Rynek wycenia ją rentownością realną.",
      keyFacts: [
        ["Mechanizm", "Nominał indeksowany = nominał × współczynnik indeksacji (index ratio)."],
        ["Kupon", "Stały kupon realny × nominał indeksowany."],
        ["Opóźnienie indeksacji", "Zwykle 3 miesiące (TIPS, nowe gilty, kanadyjskie RRB); starsze gilty — 8 miesięcy."],
        ["Ochrona przed deflacją", "TIPS i OAT€i: wykup co najmniej po nominale; gilty indeksowane — bez takiej ochrony."],
        ["Przykłady", "TIPS (USA), index-linked gilts (UK), Real Return Bonds (Kanada), OATi/OAT€i (Francja), NTN-B i NTN-C (Brazylia)."],
        ["Kod CFI", "<code>DB</code>; często atrybut formy indeksacji w danych referencyjnych"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Inflation-Linked Bond</em> (linker) chroni realną wartość kapitału. Każdego dnia nominał przelicza się współczynnikiem:</p>
<p class='formula'>index ratio = wskaźnik cen referencyjny na dziś / wskaźnik cen z dnia emisji</p>
<p>Kupon i wykup liczy się od nominału indeksowanego. Różnica między rentownością obligacji nominalnej a rentownością realną linkera o podobnym terminie to <strong>inflacja breakeven</strong> — inflacja, przy której oba papiery dają ten sam wynik.</p>
<p>Brazylijskie NTN-B są indeksowane wskaźnikiem IPCA, NTN-C — wskaźnikiem IGP-M. „Index-linked gilt (pre-2005)” to starsze gilty z 8-miesięcznym opóźnieniem indeksacji, w odróżnieniu od nowszych z opóźnieniem 3-miesięcznym.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Emisja</strong> z kuponem realnym (np. 1,25%) i bazowym wskaźnikiem cen.</li>
<li><strong>Indeksacja dzienna.</strong> Wskaźnik referencyjny na dany dzień interpoluje się z miesięcznych odczytów sprzed 2–3 miesięcy.</li>
<li><strong>Kupon</strong> = kupon realny / liczba płatności w roku × nominał indeksowany.</li>
<li><strong>Rozliczenie transakcji</strong> = cena realna (kwotowana) × index ratio × nominał + narosłe odsetki (też indeksowane).</li>
<li><strong>Wykup</strong> nominału indeksowanego (z ewentualnym floorem na poziomie nominału).</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>TIPS o nominale 1 mln USD, kupon 1,25% płatny co pół roku, index ratio 1,08, cena kwotowana 97,50.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Nominał indeksowany</td><td>1 000 000 × 1,08</td><td class='num'>1 080 000</td></tr>
<tr><td>Kupon półroczny</td><td>1 080 000 × 1,25% / 2</td><td class='num'>6 750</td></tr>
<tr><td>Wartość rynkowa (bez odsetek)</td><td>1 000 000 × 97,50% × 1,08</td><td class='num'>1 053 000</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Częsty błąd w danych: wycena pozycji ceną kwotowaną bez index ratio (975 000 zamiast 1 053 000). Zaniża udział emitenta w NAV o ok. 7,4% — limity mogą wyglądać na spełnione, choć nie są.</li>
<li>Linkery państw UE i USA to papiery skarbowe — art. 52 ust. 3 UCITS.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> cena realna × index ratio; model — dyskontowanie przepływów realnych krzywą realną.</p>
<ul>
<li><strong>Ryzyko realnej stopy procentowej</strong> — duration realna.</li>
<li><strong>Ryzyko inflacji</strong> względem oczekiwań (breakeven).</li>
<li><strong>Ryzyko deflacji</strong> — tam, gdzie nie ma floora.</li>
<li><strong>Ryzyko płynności</strong> — rynek mniejszy niż obligacji nominalnych.</li>
<li><strong>Ryzyko wskaźnika</strong> — zmiany metodologii (np. reforma RPI w Wielkiej Brytanii od 2030 r.).</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Emisja (aukcja skarbowa), rozliczenie DvP.</li>
<li>Comiesięczna publikacja wskaźnika cen i aktualizacja index ratio.</li>
<li>Kupony od nominału indeksowanego.</li>
<li>Wykup z ewentualnym floorem.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Limity emitenta <span class='law'>art. 52 ust. 3, art. 54</span></h4><p>Linkery skarbowe — do 35%, przy spełnieniu art. 54 do 100%. Linkery korporacyjne — 5/10/40.</p></div>
<div class='rule'><h4>Wbudowany derywat <span class='law'>art. 10 dyr. 2007/16/WE</span></h4><p>Zwykła indeksacja do wskaźnika cen i floor na poziomie nominału zwykle nie są traktowane jako wbudowany derywat wymagający osobnego ujęcia.</p></div>
<div class='rule'><h4>Wartość pozycji</h4><p>Do limitów stosuje się wartość z index ratio i narosłymi odsetkami.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limity według statutu; w Annex IV jako obligacje skarbowe.</li>
<li>Typowe w funduszach LDI i emerytalnych — zwykle z dźwignią przez repo i swapy (lekcja LDI 2022 na stronie historii).</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>Brak raportów EMIR i SFTR (chyba że papier jest zabezpieczeniem w SFT).</li>
<li>SSR — pozycje krótkie w długu państw UE (np. OAT€i).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li><strong>ISIN</strong>, w USA <strong>CUSIP</strong>.</li>
<li>W danych referencyjnych: wskaźnik cen, wartość bazowa, opóźnienie, metoda interpolacji, floor — bez nich system policzy wartość błędnie.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Wartość pozycji z index ratio.</li>
<li>Emitent skarbowy — art. 52 ust. 3/art. 54; korporacyjny — 5/10/40.</li>
<li>Aktualny wskaźnik cen w danych referencyjnych.</li>
<li>Limity duration z prospektu (duration realna vs nominalna).</li>
</ul>`
        }
      ],
      glossary: [
        ["Index ratio", "Współczynnik przeliczenia nominału: wskaźnik cen dziś / wskaźnik bazowy."],
        ["Breakeven inflation", "Różnica rentowności obligacji nominalnej i realnej o podobnym terminie."],
        ["Real yield", "Rentowność realna — ponad inflację."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An inflation-linked bond has its principal (and therefore its coupons) adjusted by a price index, e.g. CPI in the US, RPI or CPI in the UK, HICP in the euro area. The investor receives a fixed real coupon on a growing nominal, so is protected against inflation. The market prices it in real yield.",
      keyFacts: [
        ["Mechanism", "Indexed nominal = nominal × index ratio."],
        ["Coupon", "Fixed real coupon × indexed nominal."],
        ["Indexation lag", "Usually 3 months (TIPS, new gilts, Canadian RRBs); older gilts — 8 months."],
        ["Deflation protection", "TIPS and OAT€i: redeemed at least at par; index-linked gilts — no such floor."],
        ["Examples", "TIPS (US), index-linked gilts (UK), Real Return Bonds (Canada), OATi/OAT€i (France), NTN-B and NTN-C (Brazil)."],
        ["CFI code", "<code>DB</code>; the indexation is often a reference-data attribute"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>An <em>Inflation-Linked Bond</em> (linker) protects the real value of capital. Each day the nominal is scaled by:</p>
<p class='formula'>index ratio = reference price index for today / price index at issue</p>
<p>Coupons and redemption are calculated on the indexed nominal. The difference between the yield of a nominal bond and the real yield of a linker of similar maturity is the <strong>breakeven inflation</strong> — the inflation rate at which both give the same result.</p>
<p>Brazilian NTN-B are indexed to IPCA, NTN-C to IGP-M. "Index-linked gilt (pre-2005)" refers to older gilts with an 8-month indexation lag, as opposed to newer ones with a 3-month lag.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Issue</strong> with a real coupon (e.g. 1.25%) and a base price index.</li>
<li><strong>Daily indexation.</strong> The reference index for each day is interpolated from monthly prints from 2–3 months earlier.</li>
<li><strong>Coupon</strong> = real coupon / payments per year × indexed nominal.</li>
<li><strong>Trade settlement</strong> = real (quoted) price × index ratio × nominal + accrued interest (also indexed).</li>
<li><strong>Redemption</strong> of the indexed nominal (with any par floor).</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A TIPS with USD 1m nominal, 1.25% coupon paid semi-annually, index ratio 1.08, quoted price 97.50.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Indexed nominal</td><td>1,000,000 × 1.08</td><td class='num'>1,080,000</td></tr>
<tr><td>Semi-annual coupon</td><td>1,080,000 × 1.25% / 2</td><td class='num'>6,750</td></tr>
<tr><td>Market value (ex accrued)</td><td>1,000,000 × 97.50% × 1.08</td><td class='num'>1,053,000</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>A common data error: valuing the position at the quoted price without the index ratio (975,000 instead of 1,053,000). It understates the issuer's share of NAV by about 7.4% — limits may look compliant when they are not.</li>
<li>EU and US government linkers are government securities — UCITS Art. 52(3).</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> real price × index ratio; model — discounting real cash flows on the real curve.</p>
<ul>
<li><strong>Real interest rate risk</strong> — real duration.</li>
<li><strong>Inflation risk</strong> relative to expectations (breakeven).</li>
<li><strong>Deflation risk</strong> — where there is no floor.</li>
<li><strong>Liquidity risk</strong> — a smaller market than nominal bonds.</li>
<li><strong>Index risk</strong> — methodology changes (e.g. UK RPI reform from 2030).</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Issue (Treasury auction), DvP settlement.</li>
<li>Monthly price index release and index ratio update.</li>
<li>Coupons on the indexed nominal.</li>
<li>Redemption with any floor.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Issuer limits <span class='law'>Art. 52(3), Art. 54</span></h4><p>Government linkers — up to 35%, up to 100% if Art. 54 is met. Corporate linkers — 5/10/40.</p></div>
<div class='rule'><h4>Embedded derivative <span class='law'>Art. 10 Dir. 2007/16/EC</span></h4><p>Plain indexation to a price index and a par floor are usually not treated as an embedded derivative needing separate treatment.</p></div>
<div class='rule'><h4>Position value</h4><p>Limits use the value including the index ratio and accrued interest.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limits per the fund rules; in Annex IV as government bonds.</li>
<li>Common in LDI and pension funds — usually leveraged through repo and swaps (see the LDI 2022 lesson on the history page).</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>No EMIR or SFTR reports (unless the bond is collateral in an SFT).</li>
<li>SSR — short positions in EU sovereign debt (e.g. OAT€i).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li><strong>ISIN</strong>, in the US a <strong>CUSIP</strong>.</li>
<li>In reference data: price index, base value, lag, interpolation method, floor — without them the system will value it wrongly.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Position value includes the index ratio.</li>
<li>Government issuer — Art. 52(3)/Art. 54; corporate — 5/10/40.</li>
<li>Current price index in reference data.</li>
<li>Prospectus duration limits (real vs nominal duration).</li>
</ul>`
        }
      ],
      glossary: [
        ["Index ratio", "Nominal scaling factor: price index today / base index."],
        ["Breakeven inflation", "The yield difference between a nominal and a real bond of similar maturity."],
        ["Real yield", "Yield over and above inflation."]
      ]
    }
  }
});

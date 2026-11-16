window.INSTRUMENTS.push({
  id: "zero-coupon-bond",
  name: "Zero-Coupon Bond",
  aliases: ["Zero", "Treasury STRIPS", "Strip", "CATS", "TIGRs", "Discount Bond", "obligacja zerokuponowa"],
  market: "otc",
  asset: { pl: "Dłużne", en: "Debt" },
  sources: ["ucits", "eligible", "mmfr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Obligacja zerokuponowa nie płaci kuponów: kupuje się ją poniżej nominału, a w terminie wykupu otrzymuje cały nominał. Cały dochód to różnica między ceną a nominałem. Duration równa się terminowi do wykupu, więc cena jest bardzo wrażliwa na zmiany stóp. Odmiana to strip — pojedynczy przepływ wydzielony z obligacji kuponowej.",
      keyFacts: [
        ["Kupon", "Brak; dochód z dyskonta."],
        ["Cena", "nominał / (1 + y)<sup>T</sup>."],
        ["Duration", "Macaulaya = T (termin do wykupu)."],
        ["Odmiany", "Emisje zerokuponowe, STRIPS (C-strip — kupon, P-strip — kapitał), historyczne CATS i TIGRs (stripy tworzone przez banki)."],
        ["Księgowanie", "Wycena rynkowa (mark-to-market) albo liniowe/efektywne narastanie dyskonta (amortyzacja)."],
        ["Kod CFI", "<code>DB</code> z atrybutem oprocentowania <code>Z</code> (zero)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Zero-Coupon Bond</em> to obligacja z jednym przepływem: zapłatą nominału w dniu wykupu.</p>
<p class='formula'>Cena = N / (1 + y)<sup>T</sup></p>
<p><strong>STRIPS</strong> (Separate Trading of Registered Interest and Principal of Securities) to program, w którym obligację skarbową USA rozdziela się na osobne papiery: każdy kupon i kapitał staje się zerokuponówką z własnym CUSIP. Podobne programy prowadzą m.in. Francja, Niemcy i Wielka Brytania. W latach 80. banki tworzyły podobne papiery samodzielnie — <em>CATS</em> (Certificates of Accrual on Treasury Securities) i <em>TIGRs</em> (Treasury Investment Growth Receipts): to kwity trustu przechowującego obligacje skarbowe, a nie bezpośrednie zobowiązania Skarbu USA.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zakup</strong> poniżej nominału (np. 74,41 za 100 przy 10 latach i 3%).</li>
<li><strong>Narastanie wartości.</strong> Bez płatności, cena zbliża się do 100 wraz z upływem czasu (pull to par).</li>
<li><strong>Wykup</strong> — wypłata 100% nominału.</li>
<li><strong>Stripping i rekonstytucja.</strong> Dealer może rozdzielić obligację kuponową na stripy i z powrotem je połączyć.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Nominał 1 mln USD, 10 lat do wykupu, rentowność 3% (kapitalizacja roczna).</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Cena przy 3%</td><td>1 000 000 / 1,03<sup>10</sup></td><td class='num'>744 093,91</td></tr>
<tr><td>Cena przy 4%</td><td>1 000 000 / 1,04<sup>10</sup></td><td class='num'>675 564,17</td></tr>
<tr><td>Zmiana wartości</td><td></td><td class='num'>−68 529,75 (−9,21%)</td></tr>
<tr><td>Przybliżenie przez duration zmodyfikowaną</td><td>10 / 1,03 × 1%</td><td class='num'>−9,71%</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Wycena metodą liniowej amortyzacji (spotykaną w systemach jako „zero coupon linear amortization”) nie pokazuje tej straty. Do limitów i NAV UCITS stosuje się wartość godziwą — metoda amortyzacji jest dopuszczalna tylko w wąskich przypadkach (np. w MMF typu CNAV i LVNAV z ograniczeniami MMFR).</li>
<li>Zerokuponówka ma najwyższą duration dla danego terminu — sprawdź limity duration z prospektu.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> dyskontowanie nominału krzywą zerokuponową emitenta.</p>
<ul>
<li><strong>Ryzyko stopy procentowej</strong> — najwyższe przy danym terminie.</li>
<li><strong>Ryzyko kredytowe</strong> — cały przepływ na końcu (brak kuponów zmniejszających ekspozycję).</li>
<li><strong>Ryzyko reinwestycji</strong> — brak (brak kuponów do reinwestowania).</li>
<li><strong>Ryzyko płynności</strong> — stripy pojedynczych kuponów bywają mało płynne.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zakup, rozliczenie (np. Fedwire dla STRIPS).</li>
<li>Brak kuponów; codzienna wycena lub narastanie dyskonta.</li>
<li>Wykup.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Limity emitenta <span class='law'>art. 52 ust. 1–3</span></h4><p>STRIPS i stripy innych państw są zobowiązaniem Skarbu Państwa — art. 52 ust. 3 (35%, a przy art. 54 do 100%). Kwity trustu (CATS, TIGRs) — sprawdź, kto jest zobowiązanym: emitentem jest trust, a obligacje skarbowe stanowią aktywa bazowe.</p></div>
<div class='rule'><h4>Wycena <span class='law'>zasady wyceny UCITS</span></h4><p>Wartość godziwa; amortyzacja tylko tam, gdzie przepisy i polityka wyceny na to pozwalają.</p></div>
<div class='rule'><h4>MMF <span class='law'>MMFR art. 24, 31–32</span></h4><p>W MMF tylko krótkie zerokuponówki (maks. 397 dni do wykupu w krótkoterminowym MMF); metoda zamortyzowanego kosztu — tylko w CNAV i (z ograniczeniami) LVNAV.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limity według statutu; wycena według polityki wyceny ZAFI (art. 19 AIFMD).</li>
<li>Długie zerokuponówki zwiększają ryzyko stopy procentowej raportowane w Annex IV.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>Brak raportów EMIR i SFTR (chyba że papier jest zabezpieczeniem w SFT).</li>
<li>SSR — dla stripów państw UE ewentualne pozycje krótkie w długu państwowym.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li><strong>ISIN</strong> (każdy strip ma własny), w USA <strong>CUSIP</strong>.</li>
<li><strong>CFI</strong> <code>DB Z…</code>.</li>
<li>Typ wyceny w systemie (mark-to-market vs amortyzacja) powinien być zgodny z polityką wyceny funduszu.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Emitent: Skarb Państwa (art. 52 ust. 3) czy trust/bank (5/10/40).</li>
<li>Wycena po wartości godziwej, nie amortyzacji (poza MMF z uprawnieniem).</li>
<li>Limity duration i ryzyka stopy procentowej z prospektu.</li>
<li>Dla MMF — maks. termin i WAM/WAL.</li>
</ul>`
        }
      ],
      glossary: [
        ["Pull to par", "Zbliżanie się ceny obligacji do nominału wraz z upływem czasu do wykupu."],
        ["STRIPS", "Program rozdzielania obligacji skarbowych USA na osobne zerokuponowe przepływy."],
        ["Amortised cost", "Wycena przez rozłożenie dyskonta w czasie, bez uwzględniania zmian cen rynkowych."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A zero-coupon bond pays no coupons: it is bought below par and the full nominal is paid at maturity. The whole return is the difference between price and nominal. Duration equals the time to maturity, so the price is very sensitive to rate changes. A variant is a strip — a single cash flow separated from a coupon bond.",
      keyFacts: [
        ["Coupon", "None; return comes from the discount."],
        ["Price", "nominal / (1 + y)<sup>T</sup>."],
        ["Duration", "Macaulay = T (time to maturity)."],
        ["Variants", "Zero-coupon issues, STRIPS (C-strip — coupon, P-strip — principal), historic CATS and TIGRs (bank-created strips)."],
        ["Accounting", "Market valuation (mark-to-market) or linear/effective accretion of the discount (amortisation)."],
        ["CFI code", "<code>DB</code> with interest attribute <code>Z</code> (zero)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Zero-Coupon Bond</em> has a single cash flow: payment of the nominal at maturity.</p>
<p class='formula'>Price = N / (1 + y)<sup>T</sup></p>
<p><strong>STRIPS</strong> (Separate Trading of Registered Interest and Principal of Securities) is a programme in which a US Treasury bond is split into separate securities: each coupon and the principal becomes a zero with its own CUSIP. France, Germany and the UK, among others, run similar programmes. In the 1980s banks created similar paper themselves — <em>CATS</em> (Certificates of Accrual on Treasury Securities) and <em>TIGRs</em> (Treasury Investment Growth Receipts): receipts of a trust holding Treasuries, not direct obligations of the US Treasury.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Purchase</strong> below par (e.g. 74.41 per 100 at 10 years and 3%).</li>
<li><strong>Accretion.</strong> No payments; the price moves towards 100 over time (pull to par).</li>
<li><strong>Redemption</strong> — 100% of nominal is paid.</li>
<li><strong>Stripping and reconstitution.</strong> A dealer can split a coupon bond into strips and put it back together.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>USD 1m nominal, 10 years to maturity, 3% yield (annual compounding).</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Price at 3%</td><td>1,000,000 / 1.03<sup>10</sup></td><td class='num'>744,093.91</td></tr>
<tr><td>Price at 4%</td><td>1,000,000 / 1.04<sup>10</sup></td><td class='num'>675,564.17</td></tr>
<tr><td>Change in value</td><td></td><td class='num'>−68,529.75 (−9.21%)</td></tr>
<tr><td>Modified duration approximation</td><td>10 / 1.03 × 1%</td><td class='num'>−9.71%</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>Linear amortisation (seen in systems as "zero coupon linear amortization") does not show this loss. UCITS limits and NAV use fair value — amortisation is allowed only in narrow cases (e.g. CNAV and LVNAV MMFs within MMFR limits).</li>
<li>A zero has the highest duration for a given maturity — check the prospectus duration limits.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> discounting the nominal on the issuer's zero curve.</p>
<ul>
<li><strong>Interest rate risk</strong> — the highest for a given maturity.</li>
<li><strong>Credit risk</strong> — the whole cash flow comes at the end (no coupons reducing exposure).</li>
<li><strong>Reinvestment risk</strong> — none (no coupons to reinvest).</li>
<li><strong>Liquidity risk</strong> — individual coupon strips can be illiquid.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Purchase, settlement (e.g. Fedwire for STRIPS).</li>
<li>No coupons; daily valuation or accretion of the discount.</li>
<li>Redemption.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Issuer limits <span class='law'>Art. 52(1)–(3)</span></h4><p>STRIPS and other sovereign strips are obligations of the Treasury — Art. 52(3) (35%, up to 100% under Art. 54). Trust receipts (CATS, TIGRs) — check who the obligor is: the issuer is the trust, with Treasuries as the underlying assets.</p></div>
<div class='rule'><h4>Valuation <span class='law'>UCITS valuation rules</span></h4><p>Fair value; amortisation only where rules and the valuation policy allow it.</p></div>
<div class='rule'><h4>MMFs <span class='law'>MMFR Art. 24, 31–32</span></h4><p>Only short zeros in an MMF (max 397 days to maturity in a short-term MMF); amortised cost only in CNAV and (with limits) LVNAV funds.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limits per the fund rules; valuation per the AIFM's valuation policy (AIFMD Art. 19).</li>
<li>Long zeros increase the interest rate risk reported in Annex IV.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>No EMIR or SFTR reports (unless the security is collateral in an SFT).</li>
<li>SSR — for EU sovereign strips, any short positions in sovereign debt.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li><strong>ISIN</strong> (each strip has its own), in the US a <strong>CUSIP</strong>.</li>
<li><strong>CFI</strong> <code>DB Z…</code>.</li>
<li>The valuation type in the system (mark-to-market vs amortisation) should match the fund's valuation policy.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Issuer: the Treasury (Art. 52(3)) or a trust/bank (5/10/40).</li>
<li>Fair value, not amortisation (except authorised MMFs).</li>
<li>Prospectus duration and interest rate risk limits.</li>
<li>For MMFs — maximum maturity and WAM/WAL.</li>
</ul>`
        }
      ],
      glossary: [
        ["Pull to par", "The bond price converging to nominal as maturity approaches."],
        ["STRIPS", "The programme splitting US Treasuries into separate zero-coupon cash flows."],
        ["Amortised cost", "Valuation spreading the discount over time, ignoring market price changes."]
      ]
    }
  }
});

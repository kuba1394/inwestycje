window.INSTRUMENTS.push({
  id: "asset-swap",
  name: "Asset Swap",
  aliases: ["ASW", "Par-Par Asset Swap", "Asset Swap Package", "swap aktywów"],
  market: "otc",
  asset: { pl: "Derywaty OTC — stopy", en: "OTC derivatives — rates" },
  sources: ["ucits", "cesr10788", "emir", "marginRts"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Pakiet dwóch transakcji: zakup obligacji stałokuponowej i jednoczesne zawarcie swapu procentowego, w którym inwestor płaci kupon obligacji, a otrzymuje stopę zmienną plus spread. W efekcie ma obligację zmiennokuponową z ryzykiem kredytowym emitenta, bez ryzyka stopy procentowej. Spread swapu (asset swap spread) to popularna miara ryzyka kredytowego.",
      keyFacts: [
        ["Składniki", "Obligacja + IRS (płaci stałą = kupon, otrzymuje zmienną + spread)."],
        ["Par-par", "Inwestor płaci 100 za pakiet niezależnie od ceny obligacji; różnicę wyrównuje spread."],
        ["Wynik", "Syntetyczna FRN: EURIBOR/€STR + ASW spread."],
        ["Ryzyko", "Kredytowe emitenta + kontrahenta swapu."],
        ["W systemie", "Czasem księgowany jako jeden pakiet, ale to dwa instrumenty."],
        ["Kod CFI", "Obligacja <code>DB</code> + swap <code>S</code>"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Asset Swap</em> zamienia przepływy obligacji stałokuponowej na przepływy zmienne. Inwestor zachowuje ryzyko kredytowe emitenta, a ryzyko stopy procentowej przenosi na bank przez <a href='#/i/interest-rate-swap'>swap procentowy</a>.</p>
<p class='formula'>ASW spread ≈ kupon obligacji − stopa swapowa + (100 − cena) / annuita</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zakup obligacji</strong> i zawarcie swapu z tym samym bankiem (pakiet).</li>
<li><strong>Kupony</strong> obligacji przechodzą do banku w nodze stałej swapu.</li>
<li><strong>Inwestor otrzymuje</strong> stopę zmienną + ASW spread.</li>
<li><strong>Niewypłacalność emitenta</strong> — swap trwa dalej; inwestor musi go zamknąć po wartości rynkowej.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Obligacja 5-letnia, kupon 4,00%, cena 100; 5-letnia stopa swapowa 3,20%; nominał 10 mln EUR.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>ASW spread</td><td>4,00% − 3,20%</td><td class='num'>0,80%</td></tr>
<tr><td>Kupon syntetyczny</td><td>EURIBOR + 0,80%</td><td class='num'>zmienny</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Limity liczy się osobno: obligacja — limit emitenta; swap — global exposure (nominał 10 mln) i kontrahent.</li>
<li>Swap w EUR na EURIBOR może podlegać obowiązkowi clearingu (dla kontrahentów powyżej progów).</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> obligacja — cena rynkowa; swap — krzywa swapowa.</p>
<ul>
<li><strong>Ryzyko kredytowe emitenta</strong>.</li>
<li><strong>Ryzyko swapu po niewypłacalności</strong> — swap zostaje bez obligacji.</li>
<li><strong>Ryzyko kontrahenta</strong> swapu.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zakup obligacji (DvP) i zawarcie swapu (EMIR).</li>
<li>Płatności kuponów i netto swapu.</li>
<li>Wykup obligacji i koniec swapu albo wcześniejsze rozwiązanie pakietu.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Obligacja <span class='law'>art. 52</span></h4><p>Limit emitenta jak dla zwykłej obligacji.</p></div>
<div class='rule'><h4>Swap <span class='law'>art. 51 ust. 3, art. 52 ust. 1</span></h4><p>Global exposure (nominał, możliwe kompensowanie jako hedging stopy procentowej obligacji); kontrahent 10%/5% NAV.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Swap wliczany do ekspozycji; przy hedgingu — kompensowanie w metodzie zaangażowania.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>EMIR</strong> — raport swapu do T+1; sprawdź obowiązek clearingu.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>ISIN obligacji; UTI i UPI swapu; powiązanie pakietu w systemie.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Pakiet rozbity na obligację i swap w kontrolach.</li>
<li>Limit emitenta, kontrahenta, global exposure.</li>
<li>Raport EMIR i clearing.</li>
</ul>`
        }
      ],
      glossary: [
        ["Asset swap spread", "Spread nad stopą zmienną, który inwestor otrzymuje w pakiecie."],
        ["Par-par", "Konwencja, w której pakiet kosztuje 100 niezależnie od ceny obligacji."],
        ["Annuity", "Suma zdyskontowanych płatności 1 pb rocznie do terminu swapu."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A package of two trades: buying a fixed-coupon bond and at the same time entering an interest rate swap in which the investor pays the bond coupon and receives a floating rate plus a spread. The result is a floating-rate bond with the issuer's credit risk but no interest rate risk. The asset swap spread is a popular measure of credit risk.",
      keyFacts: [
        ["Components", "Bond + IRS (pay fixed = coupon, receive floating + spread)."],
        ["Par-par", "The investor pays 100 for the package regardless of the bond price; the spread adjusts for the difference."],
        ["Result", "A synthetic FRN: EURIBOR/€STR + ASW spread."],
        ["Risk", "Issuer credit + swap counterparty."],
        ["In the system", "Sometimes booked as one package, but it is two instruments."],
        ["CFI code", "Bond <code>DB</code> + swap <code>S</code>"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>An <em>Asset Swap</em> turns a fixed-coupon bond's cash flows into floating ones. The investor keeps the issuer's credit risk and passes the interest rate risk to the bank through an <a href='#/i/interest-rate-swap'>interest rate swap</a>.</p>
<p class='formula'>ASW spread ≈ bond coupon − swap rate + (100 − price) / annuity</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Buying the bond</strong> and entering the swap with the same bank (a package).</li>
<li><strong>Bond coupons</strong> pass to the bank in the swap's fixed leg.</li>
<li><strong>The investor receives</strong> floating rate + ASW spread.</li>
<li><strong>Issuer default</strong> — the swap continues; the investor must close it at market value.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A 5-year bond, 4.00% coupon, price 100; 5-year swap rate 3.20%; nominal EUR 10m.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>ASW spread</td><td>4.00% − 3.20%</td><td class='num'>0.80%</td></tr>
<tr><td>Synthetic coupon</td><td>EURIBOR + 0.80%</td><td class='num'>floating</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>Limits are calculated separately: the bond — issuer limit; the swap — global exposure (EUR 10m nominal) and counterparty.</li>
<li>A EUR swap on EURIBOR may be subject to the clearing obligation (for counterparties above the thresholds).</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> bond — market price; swap — swap curve.</p>
<ul>
<li><strong>Issuer credit risk</strong>.</li>
<li><strong>Swap risk after default</strong> — the swap is left without the bond.</li>
<li><strong>Swap counterparty risk</strong>.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Bond purchase (DvP) and swap execution (EMIR).</li>
<li>Coupon payments and swap net payments.</li>
<li>Bond redemption and swap end, or early unwind of the package.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Bond <span class='law'>Art. 52</span></h4><p>Issuer limit as for any bond.</p></div>
<div class='rule'><h4>Swap <span class='law'>Art. 51(3), Art. 52(1)</span></h4><p>Global exposure (nominal, netting possible as a hedge of the bond's interest rate risk); counterparty 10%/5% of NAV.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>The swap is included in exposure; if hedging — netting under the commitment method.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li><strong>EMIR</strong> — swap report by T+1; check the clearing obligation.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>Bond ISIN; swap UTI and UPI; package link in the system.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Package split into bond and swap in controls.</li>
<li>Issuer limit, counterparty, global exposure.</li>
<li>EMIR report and clearing.</li>
</ul>`
        }
      ],
      glossary: [
        ["Asset swap spread", "The spread over the floating rate that the investor receives in the package."],
        ["Par-par", "The convention in which the package costs 100 regardless of the bond price."],
        ["Annuity", "The sum of discounted payments of 1 bp a year to swap maturity."]
      ]
    }
  }
});

window.INSTRUMENTS.push({
  id: "bond-option",
  name: "Bond Option",
  aliases: ["Interest Rate Call Option", "Interest Rate Put Option", "U.S. Treasury Call Option", "U.S. Treasury Put Option", "OTC Bond Option", "opcja na obligację"],
  market: "otc",
  asset: { pl: "Derywaty OTC", en: "OTC derivatives" },
  sources: ["ucits", "cesr10788", "emir", "marginRts"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Opcja OTC na kupno (call) lub sprzedaż (put) konkretnej obligacji, np. 10-letniego Bunda albo US Treasury, po ustalonej cenie. Call zyskuje, gdy stopy spadają (ceny obligacji rosną), put — gdy rosną. W systemach często nazywana „interest rate option”. Opcje na kontrakty na obligacje opisuje osobna karta Option on Futures.",
      keyFacts: [
        ["Instrument bazowy", "Konkretna obligacja (ISIN), najczęściej skarbowa."],
        ["Cena wykonania", "Cena obligacji (czysta) albo rentowność."],
        ["Styl", "Zwykle europejski."],
        ["Rozliczenie", "Dostawa obligacji lub gotówkowe."],
        ["Wycena", "Model Blacka na cenę terminową obligacji."],
        ["Kod CFI", "<code>O</code> — Options (baza: dłużny instrument)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Bond Option</em> daje prawo kupna lub sprzedaży obligacji po cenie wykonania w określonym dniu. To sposób na zajęcie pozycji na stopy procentowe z ograniczoną stratą (kupujący) albo na uzyskanie premii (wystawca).</p>
<p>Opcja na cenę obligacji jest blisko spokrewniona z <a href='#/i/swaption'>swaption</a> (opcją na swap) i z <a href='#/i/interest-rate-cap-floor'>cap/floor</a> (opcjami na stopę zmienną): call na obligację ≈ receiver swaption, put ≈ payer swaption.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zawarcie</strong> z bankiem (ISDA), premia płatna z góry.</li>
<li><strong>Wycena dzienna</strong> modelem — zależy od ceny terminowej obligacji i zmienności.</li>
<li><strong>Termin</strong> — wykonanie, jeśli opcja jest w pieniądzu: dostawa obligacji po strike albo zapłata różnicy.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>UCITS kupuje put na 10 mln EUR nominału Bunda: strike 98,00, cena 99,00, delta −0,40.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Wartość bazy</td><td>10 000 000 × 99,00%</td><td class='num'>9 900 000 EUR</td></tr>
<tr><td>Ekspozycja (delta, krótka)</td><td>9 900 000 × 0,40</td><td class='num'>3 960 000 EUR</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Put zmniejsza ekspozycję na obligacje — jeśli zabezpiecza posiadane Bundy, może być kompensowany w metodzie zaangażowania.</li>
<li>Ekspozycja na emitenta (Niemcy) — art. 52 ust. 3; kontrahent bankowy — 10% NAV.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> model Blacka; zmienność ceny obligacji maleje w miarę zbliżania się do wykupu.</p>
<ul>
<li><strong>Ryzyko stopy procentowej</strong> (delta, gamma).</li>
<li><strong>Ryzyko zmienności</strong> (vega).</li>
<li><strong>Ryzyko kontrahenta</strong> i modelu.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zawarcie, premia, raport EMIR.</li>
<li>Wycena i zabezpieczenia.</li>
<li>Wykonanie z dostawą obligacji (rozrachunek DvP) albo rozliczenie gotówkowe; wygaśnięcie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g</span></h4><p>Derywat OTC na dopuszczalny papier — warunki kontrahenta, wyceny i możliwości zamknięcia.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Nominał × cena obligacji × delta.</p></div>
<div class='rule'><h4>Limity <span class='law'>art. 52</span></h4><p>Look-through do emitenta obligacji; kontrahent 10%/5% NAV (bez CCP).</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Ekwiwalent delta w metodzie brutto i zaangażowania.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>EMIR</strong> — raport do T+1; brak obowiązku clearingu; variation margin.</li>
<li><strong>SSR</strong> — kupiony put na obligację państwa UE może tworzyć pozycję krótką w długu państwowym.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>UTI, UPI; ISIN obligacji bazowej.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Delta w global exposure, hedging.</li>
<li>Look-through do emitenta, limit kontrahenta.</li>
<li>Pokrycie wystawionych opcji.</li>
<li>SSR dla długu państw UE.</li>
</ul>`
        }
      ],
      glossary: [
        ["Forward price", "Cena obligacji na termin wygaśnięcia opcji, uwzględniająca kupony i koszt finansowania."],
        ["Pull to par", "Zbliżanie się ceny obligacji do 100 — obniża jej zmienność."],
        ["Receiver / payer", "Odpowiedniki call / put na obligację w świecie swapcji."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An OTC option to buy (call) or sell (put) a specific bond, e.g. a 10-year Bund or a US Treasury, at a set price. A call gains when rates fall (bond prices rise), a put — when they rise. Systems often call it an \"interest rate option\". Options on bond futures have their own Option on Futures card.",
      keyFacts: [
        ["Underlying", "A specific bond (ISIN), most often a government bond."],
        ["Strike", "A (clean) bond price or a yield."],
        ["Style", "Usually European."],
        ["Settlement", "Delivery of the bond or cash."],
        ["Valuation", "Black model on the bond's forward price."],
        ["CFI code", "<code>O</code> — Options (underlying: debt instrument)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Bond Option</em> gives the right to buy or sell a bond at the strike on a set date. It is a way to take an interest rate view with a limited loss (buyer) or to earn a premium (writer).</p>
<p>An option on a bond price is closely related to a <a href='#/i/swaption'>swaption</a> (an option on a swap) and to a <a href='#/i/interest-rate-cap-floor'>cap/floor</a> (options on a floating rate): a bond call ≈ receiver swaption, a put ≈ payer swaption.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Execution</strong> with a bank (ISDA), premium paid upfront.</li>
<li><strong>Daily model valuation</strong> — depends on the bond's forward price and volatility.</li>
<li><strong>Expiry</strong> — exercise if in the money: delivery of the bond at the strike or payment of the difference.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A UCITS buys a put on EUR 10m nominal of a Bund: strike 98.00, price 99.00, delta −0.40.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Underlying value</td><td>10,000,000 × 99.00%</td><td class='num'>EUR 9,900,000</td></tr>
<tr><td>Exposure (delta, short)</td><td>9,900,000 × 0.40</td><td class='num'>EUR 3,960,000</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>The put reduces bond exposure — if it hedges Bunds held, it can be netted under the commitment approach.</li>
<li>Issuer exposure (Germany) — Art. 52(3); bank counterparty — 10% of NAV.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> Black model; bond price volatility falls as maturity approaches.</p>
<ul>
<li><strong>Interest rate risk</strong> (delta, gamma).</li>
<li><strong>Volatility risk</strong> (vega).</li>
<li><strong>Counterparty and model risk</strong>.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Execution, premium, EMIR report.</li>
<li>Valuation and collateral.</li>
<li>Exercise with delivery of the bond (DvP settlement) or cash settlement; expiry.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g)</span></h4><p>An OTC derivative on an eligible security — counterparty, valuation and close-out conditions.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Nominal × bond price × delta.</p></div>
<div class='rule'><h4>Limits <span class='law'>Art. 52</span></h4><p>Look-through to the bond issuer; counterparty 10%/5% of NAV (no CCP).</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Delta equivalent under the gross and commitment methods.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li><strong>EMIR</strong> — report by T+1; no clearing obligation; variation margin.</li>
<li><strong>SSR</strong> — a bought put on an EU sovereign bond may create a short position in sovereign debt.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>UTI, UPI; ISIN of the underlying bond.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Delta in global exposure, hedging.</li>
<li>Look-through to the issuer, counterparty limit.</li>
<li>Cover for written options.</li>
<li>SSR for EU sovereign debt.</li>
</ul>`
        }
      ],
      glossary: [
        ["Forward price", "The bond price at the option's expiry, allowing for coupons and funding cost."],
        ["Pull to par", "The bond price converging to 100 — it lowers its volatility."],
        ["Receiver / payer", "The swaption equivalents of a bond call / put."]
      ]
    }
  }
});

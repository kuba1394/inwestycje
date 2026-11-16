window.INSTRUMENTS.push({
  id: "credit-default-swaption",
  name: "Credit Default Swaption",
  aliases: ["CDS Swaption", "CDSI Swaption", "Index Swaption", "Credit Option", "opcja na CDS"],
  market: "otc",
  asset: { pl: "Derywaty kredytowe", en: "Credit derivatives" },
  sources: ["ucits", "cesr10788", "emir", "marginRts"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Opcja na zawarcie kontraktu CDS — najczęściej na indeks (iTraxx, CDX) — po ustalonym spreadzie w przyszłym terminie. Payer swaption daje prawo kupna ochrony (zyskuje, gdy spready rosną), receiver — prawo sprzedaży ochrony (zyskuje, gdy spready spadają). Pozwala zabezpieczyć portfel kredytowy przed poszerzeniem spreadów za premię.",
      keyFacts: [
        ["Payer", "Prawo kupna ochrony po strike'u — zabezpieczenie przed wzrostem spreadów."],
        ["Receiver", "Prawo sprzedaży ochrony."],
        ["Baza", "Zwykle bieżąca seria indeksu CDS, termin opcji 1–6 miesięcy."],
        ["Front-end protection", "W payer na indeks straty z niewypłacalności przed wykonaniem należą do kupującego opcję."],
        ["Ekspozycja", "Ekwiwalent delta nominału CDS bazowego."],
        ["Kod CFI", "<code>H</code> — Non-listed and complex listed options (kredytowe)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Credit Default Swaption</em> łączy cechy <a href='#/i/swaption'>swaption</a> i <a href='#/i/credit-default-swap'>CDS</a>. Kupujący płaci premię i w dniu wygaśnięcia decyduje, czy zawrzeć CDS po spreadzie wykonania.</p>
<p>W opcjach na indeks niewypłacalności, które zdarzą się przed wygaśnięciem, nie wygaszają opcji — rozlicza się je przy wykonaniu (front-end protection).</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zakup</strong> — premia płatna z góry.</li>
<li><strong>Wycena dzienna</strong> modelem (Black na spread terminowy).</li>
<li><strong>Wygaśnięcie</strong> — wykonanie, jeśli spread rynkowy (dla payer) jest wyższy niż strike; powstaje pozycja w CDS indeksu (często rozliczanym przez CCP).</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Fundusz obligacji kupuje payer swaption na iTraxx Europe Main: nominał 50 mln EUR, strike 70 pb, delta 0,30.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Ekwiwalent delta (kupiona ochrona)</td><td>50 000 000 × 0,30</td><td class='num'>15 000 000 EUR</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Kupiona ochrona zmniejsza ryzyko kredytowe portfela — może być kompensowana w metodzie zaangażowania, jeśli spełnia warunki hedgingu.</li>
<li>Wykonanie tworzy pozycję w CDS indeksu — sprawdź obowiązek clearingu (iTraxx Main, Crossover) i raport EMIR.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> model Blacka na spread terminowy z korektą o front-end protection.</p>
<ul>
<li><strong>Ryzyko spreadu</strong> i zmienności spreadu.</li>
<li><strong>Ryzyko kontrahenta</strong> (dla kupującego).</li>
<li><strong>Ryzyko płynności</strong>.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zakup, raport EMIR.</li>
<li>Wycena i zabezpieczenia; zdarzenia kredytowe w indeksie.</li>
<li>Wykonanie (pozycja w CDS) lub wygaśnięcie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g</span></h4><p>Derywat kredytowy OTC na indeks — dopuszczalny przy spełnieniu warunków OTC.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Ekwiwalent delta przeliczonego CDS; sprzedana receiver — jak sprzedaż ochrony (pełna ekspozycja kredytowa po wykonaniu).</p></div>
<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1</span></h4><p>10%/5% NAV.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Ekwiwalent delta w metodach brutto i zaangażowania.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>EMIR</strong> — raport do T+1; sama opcja bez obowiązku clearingu.</li>
<li>SSR — opcje na CDS państw UE podlegają zasadom dla niekrytych CDS na dług państwowy.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>UTI, UPI, LEI; seria indeksu (RED code), strike, termin.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Ekspozycja delta i hedging.</li>
<li>Pozycja CDS po wykonaniu — clearing i limity.</li>
<li>Kontrahent i raport EMIR.</li>
</ul>`
        }
      ],
      glossary: [
        ["Payer swaption", "Prawo kupna ochrony kredytowej po ustalonym spreadzie."],
        ["Receiver swaption", "Prawo sprzedaży ochrony kredytowej po ustalonym spreadzie."],
        ["Front-end protection", "Pokrycie strat z niewypłacalności przed wygaśnięciem opcji na indeks."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An option to enter a CDS — most often on an index (iTraxx, CDX) — at a set spread on a future date. A payer swaption gives the right to buy protection (gains when spreads widen), a receiver — the right to sell protection (gains when spreads tighten). It lets a credit portfolio be hedged against spread widening for a premium.",
      keyFacts: [
        ["Payer", "Right to buy protection at the strike — a hedge against wider spreads."],
        ["Receiver", "Right to sell protection."],
        ["Underlying", "Usually the on-the-run CDS index series, option maturity 1–6 months."],
        ["Front-end protection", "In an index payer, default losses before exercise belong to the option buyer."],
        ["Exposure", "Delta equivalent of the underlying CDS notional."],
        ["CFI code", "<code>H</code> — Non-listed and complex listed options (credit)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Credit Default Swaption</em> combines features of a <a href='#/i/swaption'>swaption</a> and a <a href='#/i/credit-default-swap'>CDS</a>. The buyer pays a premium and at expiry decides whether to enter a CDS at the strike spread.</p>
<p>In index options, defaults that happen before expiry do not knock the option out — they are settled on exercise (front-end protection).</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Purchase</strong> — premium paid upfront.</li>
<li><strong>Daily model valuation</strong> (Black on the forward spread).</li>
<li><strong>Expiry</strong> — exercise if the market spread (for a payer) is above the strike; a position in the index CDS (often CCP-cleared) results.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A bond fund buys a payer swaption on iTraxx Europe Main: notional EUR 50m, strike 70 bp, delta 0.30.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Delta equivalent (protection bought)</td><td>50,000,000 × 0.30</td><td class='num'>EUR 15,000,000</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>Bought protection reduces the portfolio's credit risk — it may be netted under the commitment approach if it meets the hedging conditions.</li>
<li>Exercise creates an index CDS position — check the clearing obligation (iTraxx Main, Crossover) and the EMIR report.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> Black model on the forward spread, adjusted for front-end protection.</p>
<ul>
<li><strong>Spread and spread volatility risk</strong>.</li>
<li><strong>Counterparty risk</strong> (for the buyer).</li>
<li><strong>Liquidity risk</strong>.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Purchase, EMIR report.</li>
<li>Valuation and collateral; credit events in the index.</li>
<li>Exercise (CDS position) or expiry.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g)</span></h4><p>An OTC credit derivative on an index — eligible if the OTC conditions are met.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Delta equivalent of the converted CDS; a sold receiver — like selling protection (full credit exposure on exercise).</p></div>
<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1)</span></h4><p>10%/5% of NAV.</p></div>
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
<li><strong>EMIR</strong> — report by T+1; the option itself has no clearing obligation.</li>
<li>SSR — options on EU sovereign CDS are subject to the uncovered sovereign CDS rules.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>UTI, UPI, LEI; index series (RED code), strike, expiry.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Delta exposure and hedging.</li>
<li>CDS position after exercise — clearing and limits.</li>
<li>Counterparty and EMIR report.</li>
</ul>`
        }
      ],
      glossary: [
        ["Payer swaption", "The right to buy credit protection at a set spread."],
        ["Receiver swaption", "The right to sell credit protection at a set spread."],
        ["Front-end protection", "Coverage of default losses before an index option expires."]
      ]
    }
  }
});

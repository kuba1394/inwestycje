window.INSTRUMENTS.push({
  id: "otc-equity-option",
  name: "OTC Equity Option",
  aliases: ["OTC Equity Call Option", "OTC Equity Put Option", "Bilateral Equity Option", "opcja OTC na akcje"],
  market: "otc",
  asset: { pl: "Derywaty OTC", en: "OTC derivatives" },
  sources: ["ucits", "eligible", "cesr10788", "emir", "marginRts", "emir3dir"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Opcja na akcję, koszyk akcji lub indeks zawarta bilateralnie z bankiem, a nie na giełdzie. Warunki — cena wykonania, termin, styl, bariery — ustala się indywidualnie. Ekonomicznie działa jak opcja giełdowa, ale dochodzi ryzyko kontrahenta, wycena modelem i obowiązki EMIR dla derywatów OTC.",
      keyFacts: [
        ["Dokumentacja", "ISDA Master Agreement + CSA, definicje ISDA dla derywatów akcyjnych, konfirmacja."],
        ["Warunki", "Dowolne: strike (np. 95% kursu), termin, styl europejski/amerykański, bariery, uśrednianie."],
        ["Rozliczenie", "Gotówkowe lub dostawa akcji."],
        ["Wycena", "Model (Black-Scholes, powierzchnia zmienności), niezależna weryfikacja."],
        ["Ekspozycja", "Liczba akcji × kurs × delta."],
        ["Kod CFI", "<code>O</code> — Options; w EMIR identyfikowana UPI"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>OTC Equity Option</em> to opcja call lub put na akcje zawarta poza giełdą. Kupujący płaci premię i ma prawo kupić (call) lub sprzedać (put) akcje po cenie wykonania. Zasady opcji opisuje strona <a href='#/basics/options-greeks'>Opcje i greki</a>, a wersję giełdową — karta <a href='#/i/listed-equity-option'>Listed Equity Option</a>.</p>
<p>Fundusze używają opcji OTC, gdy potrzebują warunków niedostępnych na giełdzie: długiego terminu, niestandardowego strike'u, koszyka akcji lub struktury z barierą.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Negocjacja i zawarcie</strong> z bankiem, potwierdzenie (konfirmacja).</li>
<li><strong>Premia</strong> płatna zwykle T+2.</li>
<li><strong>Wycena dzienna</strong> i wymiana zabezpieczeń według CSA.</li>
<li><strong>Zdarzenia korporacyjne</strong> — korekty strike'u i liczby akcji według definicji ISDA.</li>
<li><strong>Wykonanie lub wygaśnięcie</strong> — rozliczenie gotówkowe albo dostawa akcji.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>UCITS (NAV 100 mln EUR) kupuje od banku roczną opcję put na 100 000 akcji spółki X: kurs 50 EUR, strike 47,50 (95%), delta −0,35, wycena opcji 2,10 EUR za akcję.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Ekspozycja delta (krótka)</td><td>100 000 × 50 × 0,35</td><td class='num'>1 750 000 EUR</td></tr>
<tr><td>Ekspozycja na kontrahenta (bez zabezpieczenia)</td><td>100 000 × 2,10</td><td class='num'>210 000 EUR = 0,21% NAV</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Do global exposure: 1,75 mln EUR (lub mniej, jeśli put zabezpiecza posiadane akcje X i spełnia warunki hedgingu).</li>
<li>Kontrahent: dodatnia wycena 0,21% NAV w limicie 10% (bank) — opcja OTC nierozliczana przez CCP.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> model z powierzchnią zmienności; UCITS wymaga wiarygodnej, weryfikowalnej wyceny dziennej.</p>
<ul>
<li><strong>Ryzyko rynkowe</strong> (delta, gamma, vega).</li>
<li><strong>Ryzyko kontrahenta</strong> — dla kupującego opcję; ograniczane przez CSA.</li>
<li><strong>Ryzyko modelu</strong> i płynności — zamknięcie tylko z tym samym bankiem.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zawarcie, konfirmacja, premia, raport EMIR.</li>
<li>Wycena i zabezpieczenia, zdarzenia korporacyjne.</li>
<li>Wykonanie, wygaśnięcie lub wcześniejsze zamknięcie (unwind).</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Warunki derywatu OTC <span class='law'>art. 50 ust. 1 lit. g</span></h4><p>Kontrahent podlegający nadzorowi ostrożnościowemu; wiarygodna i weryfikowalna wycena dzienna; możliwość zamknięcia w każdej chwili po wartości godziwej.</p></div>
<div class='rule'><h4>Limity <span class='law'>art. 51 ust. 3, art. 52 ust. 1</span></h4><p>Global exposure (delta); ekspozycja na akcje łączy się z limitami emitenta; kontrahent 10%/5% NAV.</p></div>
<div class='rule'><h4>Pokrycie</h4><p>Wystawiony call — posiadanie akcji (przy dostawie) lub płynnych aktywów (przy rozliczeniu gotówkowym).</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Ekspozycja delta w metodzie brutto i zaangażowania.</li>
<li>Ryzyko kontrahenta i wycena — polityki ZAFI.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>EMIR</strong> — raport do T+1; brak obowiązku clearingu; wymiana variation margin (rozp. 2016/2251).</li>
<li><strong>Znaczne pakiety</strong> — opcje na akcje są instrumentami z art. 13 dyrektywy o przejrzystości (przy rozliczeniu gotówkowym z deltą).</li>
<li><strong>SSR</strong> — kupiony put lub wystawiony call to pozycja krótka (delta).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>UTI, UPI, LEI stron; ISIN akcji bazowej.</li>
<li><strong>CFI</strong> <code>O…</code> (z UPI).</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Global exposure (delta) i look-through do emitenta.</li>
<li>Limit kontrahenta po zabezpieczeniach.</li>
<li>Pokrycie wystawionych opcji.</li>
<li>Niezależna wycena, raport EMIR, progi SSR i TD.</li>
</ul>`
        }
      ],
      glossary: [
        ["Confirmation", "Potwierdzenie warunków transakcji OTC w ramach ISDA."],
        ["Unwind", "Wcześniejsze zamknięcie transakcji OTC z kontrahentem."],
        ["Volatility surface", "Zmienność implikowana dla różnych strike'ów i terminów."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An option on a share, a basket of shares or an index traded bilaterally with a bank rather than on an exchange. The terms — strike, maturity, style, barriers — are set individually. Economically it works like a listed option, but adds counterparty risk, model valuation and EMIR obligations for OTC derivatives.",
      keyFacts: [
        ["Documentation", "ISDA Master Agreement + CSA, ISDA equity derivatives definitions, confirmation."],
        ["Terms", "Any: strike (e.g. 95% of spot), maturity, European/American style, barriers, averaging."],
        ["Settlement", "Cash or physical delivery of shares."],
        ["Valuation", "Model (Black-Scholes, volatility surface), independent verification."],
        ["Exposure", "Number of shares × price × delta."],
        ["CFI code", "<code>O</code> — Options; identified in EMIR by a UPI"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>An <em>OTC Equity Option</em> is a call or put on shares traded off-exchange. The buyer pays a premium and has the right to buy (call) or sell (put) the shares at the strike. Option basics are on the <a href='#/basics/options-greeks'>Options and greeks</a> page and the listed version on the <a href='#/i/listed-equity-option'>Listed Equity Option</a> card.</p>
<p>Funds use OTC options when they need terms not available on an exchange: long maturities, a non-standard strike, a basket of shares or a barrier structure.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Negotiation and execution</strong> with a bank, confirmation.</li>
<li><strong>Premium</strong> usually paid T+2.</li>
<li><strong>Daily valuation</strong> and collateral exchange under the CSA.</li>
<li><strong>Corporate actions</strong> — adjustments to strike and number of shares under the ISDA definitions.</li>
<li><strong>Exercise or expiry</strong> — cash settlement or delivery of shares.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A UCITS (NAV EUR 100m) buys from a bank a one-year put on 100,000 shares of company X: price EUR 50, strike 47.50 (95%), delta −0.35, option value EUR 2.10 per share.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Delta exposure (short)</td><td>100,000 × 50 × 0.35</td><td class='num'>EUR 1,750,000</td></tr>
<tr><td>Counterparty exposure (uncollateralised)</td><td>100,000 × 2.10</td><td class='num'>EUR 210,000 = 0.21% of NAV</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>Global exposure: EUR 1.75m (or less if the put hedges X shares held and meets the hedging conditions).</li>
<li>Counterparty: positive value of 0.21% of NAV within the 10% (bank) limit — an OTC option not cleared by a CCP.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> a model with a volatility surface; a UCITS needs reliable, verifiable daily valuation.</p>
<ul>
<li><strong>Market risk</strong> (delta, gamma, vega).</li>
<li><strong>Counterparty risk</strong> — for the option buyer; mitigated by the CSA.</li>
<li><strong>Model and liquidity risk</strong> — can be closed only with the same bank.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Execution, confirmation, premium, EMIR report.</li>
<li>Valuation and collateral, corporate actions.</li>
<li>Exercise, expiry or early close-out (unwind).</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>OTC derivative conditions <span class='law'>Art. 50(1)(g)</span></h4><p>A prudentially supervised counterparty; reliable and verifiable daily valuation; can be closed at any time at fair value.</p></div>
<div class='rule'><h4>Limits <span class='law'>Art. 51(3), Art. 52(1)</span></h4><p>Global exposure (delta); exposure to the shares is combined with issuer limits; counterparty 10%/5% of NAV.</p></div>
<div class='rule'><h4>Cover</h4><p>A written call — shares held (physical settlement) or liquid assets (cash settlement).</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Delta exposure under the gross and commitment methods.</li>
<li>Counterparty risk and valuation — AIFM policies.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li><strong>EMIR</strong> — report by T+1; no clearing obligation; variation margin exchange (Reg. 2016/2251).</li>
<li><strong>Major holdings</strong> — options on shares are Art. 13 Transparency Directive instruments (delta-adjusted when cash-settled).</li>
<li><strong>SSR</strong> — a bought put or a written call is a short position (delta).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>UTI, UPI, counterparty LEIs; ISIN of the underlying share.</li>
<li><strong>CFI</strong> <code>O…</code> (from the UPI).</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Global exposure (delta) and look-through to the issuer.</li>
<li>Counterparty limit after collateral.</li>
<li>Cover for written options.</li>
<li>Independent valuation, EMIR report, SSR and TD thresholds.</li>
</ul>`
        }
      ],
      glossary: [
        ["Confirmation", "Confirmation of an OTC trade's terms under the ISDA."],
        ["Unwind", "Early termination of an OTC trade with the counterparty."],
        ["Volatility surface", "Implied volatility across strikes and maturities."]
      ]
    }
  }
});

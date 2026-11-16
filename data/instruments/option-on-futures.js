window.INSTRUMENTS.push({
  id: "option-on-futures",
  name: "Option on Futures",
  aliases: ["Futures Option", "Bond Futures Option", "Treasury Option on Future", "OGBL", "Currency Option on Future", "Index Option on Future", "opcja na kontrakt terminowy"],
  market: "exchange",
  asset: { pl: "Derywaty giełdowe", en: "Listed derivatives" },
  sources: ["ucits", "cesr10788", "emir", "aifmdL2"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Opcja giełdowa, której instrumentem bazowym jest kontrakt futures, a nie sam papier czy indeks. Wykonanie call daje długą pozycję w futures po cenie wykonania, a wykonanie put — krótką. Najpopularniejsze są opcje na futures na obligacje skarbowe (Bund, Treasury), stopy procentowe, waluty, indeksy i towary.",
      keyFacts: [
        ["Instrument bazowy", "Konkretna seria futures (np. Euro-Bund z terminem grudniowym)."],
        ["Rozliczenie", "Wykonanie → pozycja w futures; często styl amerykański."],
        ["Premia", "Płatna z góry (np. CME) albo rozliczana jak futures, codziennym depozytem (np. opcje na futures obligacyjne na Eurex)."],
        ["Przykłady", "Opcje na Bund (OGBL), na US Treasury futures, na SOFR futures, na waluty CME, na towary."],
        ["Ekspozycja", "Liczba × wielkość kontraktu × cena futures × delta."],
        ["Kod CFI", "<code>O</code> — Options, z instrumentem bazowym typu futures (atrybut <code>F</code>)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Option on Futures</em> daje prawo, ale nie obowiązek, zajęcia pozycji w kontrakcie futures po cenie wykonania. Call na futures to prawo kupna kontraktu, put — prawo jego sprzedaży.</p>
<p>Wartość opcji zależy od ceny futures, a nie od ceny spot instrumentu. Do wyceny stosuje się zwykle model Blacka (wariant Blacka-Scholesa dla cen terminowych).</p>
<p>Ogólne zasady opcji — premia, delta, greki — opisuje strona <a href='#/basics/options-greeks'>Opcje i greki</a>; kontrakty bazowe — karty <a href='#/i/government-bond-future'>Government Bond Future</a>, <a href='#/i/stir-future'>STIR Future</a>, <a href='#/i/equity-index-future'>Equity Index Future</a>, <a href='#/i/currency-future'>Currency Future</a>, <a href='#/i/commodity-future'>Commodity Future</a>.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zakup lub wystawienie</strong> opcji na giełdzie, rozliczenie przez CCP.</li>
<li><strong>Premia i depozyt.</strong> Kupujący płaci premię (albo przy stylu futures — codzienny variation margin); wystawca wnosi depozyt.</li>
<li><strong>Wycena dzienna</strong> według kursu rozliczeniowego.</li>
<li><strong>Wykonanie</strong> — CCP otwiera pozycję w futures po cenie wykonania; różnica do ceny rynkowej futures od razu rozlicza się przez variation margin.</li>
<li><strong>Wygaśnięcie</strong> — zwykle przed terminem futures bazowego (seria miesięczna lub kwartalna).</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>UCITS kupuje 50 opcji call na Euro-Bund futures: cena wykonania 130,00, futures 131,20, delta 0,60, wielkość kontraktu 100 000 EUR nominału.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Wartość nominalna bazy</td><td>50 × 100 000 × 131,20%</td><td class='num'>6 560 000 EUR</td></tr>
<tr><td>Ekspozycja (metoda zaangażowania)</td><td>6 560 000 × 0,60</td><td class='num'>3 936 000 EUR</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Do global exposure wchodzi ekwiwalent delta, a nie premia.</li>
<li>Ekspozycja na emitenta obligacji CTD (Niemcy) — art. 52 ust. 3; dla opcji na futures indeksowe — brak łączenia z limitami emitentów (indeks finansowy).</li>
<li>Wystawiony call na futures wymaga pokrycia.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> kurs rozliczeniowy giełdy.</p>
<ul>
<li><strong>Ryzyko ceny futures</strong> (delta, gamma).</li>
<li><strong>Ryzyko zmienności</strong> (vega) i upływu czasu (theta).</li>
<li><strong>Ryzyko wykonania</strong> — po wykonaniu fundusz ma pozycję w futures z pełną ekspozycją.</li>
<li><strong>Ryzyko płynności</strong> serii dalekich od pieniądza.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Transakcja, rozliczenie przez CCP (T+1 dla premii).</li>
<li>Codzienna wycena i depozyty.</li>
<li>Wykonanie (przy stylu amerykańskim — w każdej chwili) lub wygaśnięcie.</li>
<li>Pozycja w futures po wykonaniu — dalsze rolowanie lub zamknięcie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g</span></h4><p>Derywat giełdowy na dopuszczalną bazę (futures na obligacje, stopy, waluty, indeksy finansowe). Opcje na futures na pojedyncze towary — niedopuszczalne.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Liczba × wielkość × cena futures × delta.</p></div>
<div class='rule'><h4>Pokrycie</h4><p>Wystawione opcje: pokrycie w instrumencie bazowym lub płynnych aktywach.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Ekspozycja w metodzie brutto i zaangażowania: ekwiwalent delta (rozp. 231/2013, załącznik II).</li>
<li>AIF może mieć opcje na futures towarowe — obowiązki MiFID II dotyczące limitów pozycji w towarowych instrumentach pochodnych.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>EMIR</strong> — raport do T+1 (derywat giełdowy).</li>
<li>Opcje na futures towarowe — raporty pozycji (MiFID II art. 58).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li><strong>ISIN</strong> serii opcji, kod giełdowy (np. OGBL), MIC.</li>
<li><strong>CFI</strong> <code>O…</code> z atrybutem instrumentu bazowego „futures”.</li>
<li>Powiązanie w danych z serią futures bazowego.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Ekspozycja delta w global exposure.</li>
<li>Look-through do CTD lub brak (indeks).</li>
<li>Pokrycie wystawionych opcji.</li>
<li>Pozycja futures po wykonaniu ujęta w systemie.</li>
</ul>`
        }
      ],
      glossary: [
        ["Black model", "Wariant modelu Blacka-Scholesa dla opcji na cenę terminową."],
        ["Futures-style premium", "Premia nieopłacana z góry, rozliczana codziennym variation margin."],
        ["Serial option", "Opcja z terminem miesięcznym na najbliższy kwartalny kontrakt futures."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A listed option whose underlying is a futures contract, not the security or index itself. Exercising a call gives a long futures position at the strike, exercising a put — a short one. The most popular are options on government bond futures (Bund, Treasury), interest rate, currency, index and commodity futures.",
      keyFacts: [
        ["Underlying", "A specific futures series (e.g. December Euro-Bund)."],
        ["Settlement", "Exercise → futures position; often American style."],
        ["Premium", "Paid upfront (e.g. CME) or futures-style with daily margining (e.g. Eurex bond futures options)."],
        ["Examples", "Bund options (OGBL), options on US Treasury futures, on SOFR futures, CME currency options, commodity options."],
        ["Exposure", "Number × contract size × futures price × delta."],
        ["CFI code", "<code>O</code> — Options, with a futures underlying (attribute <code>F</code>)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>An <em>Option on Futures</em> gives the right, but not the obligation, to take a futures position at the strike price. A call on futures is the right to buy the contract, a put — the right to sell it.</p>
<p>The option's value depends on the futures price, not the spot price of the instrument. It is usually priced with the Black model (the Black-Scholes variant for forward prices).</p>
<p>General option concepts — premium, delta, greeks — are on the <a href='#/basics/options-greeks'>Options and greeks</a> page; the underlying contracts on the <a href='#/i/government-bond-future'>Government Bond Future</a>, <a href='#/i/stir-future'>STIR Future</a>, <a href='#/i/equity-index-future'>Equity Index Future</a>, <a href='#/i/currency-future'>Currency Future</a> and <a href='#/i/commodity-future'>Commodity Future</a> cards.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Buying or writing</strong> the option on the exchange, cleared by the CCP.</li>
<li><strong>Premium and margin.</strong> The buyer pays the premium (or, futures-style, daily variation margin); the writer posts margin.</li>
<li><strong>Daily valuation</strong> at the settlement price.</li>
<li><strong>Exercise</strong> — the CCP opens a futures position at the strike; the difference to the market futures price is settled immediately via variation margin.</li>
<li><strong>Expiry</strong> — usually before the underlying futures (monthly or quarterly series).</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A UCITS buys 50 calls on Euro-Bund futures: strike 130.00, futures 131.20, delta 0.60, contract size EUR 100,000 nominal.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Underlying notional value</td><td>50 × 100,000 × 131.20%</td><td class='num'>EUR 6,560,000</td></tr>
<tr><td>Exposure (commitment approach)</td><td>6,560,000 × 0.60</td><td class='num'>EUR 3,936,000</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>Global exposure uses the delta equivalent, not the premium.</li>
<li>Exposure to the CTD issuer (Germany) — Art. 52(3); for options on index futures — not combined with issuer limits (financial index).</li>
<li>A written call on futures must be covered.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> exchange settlement price.</p>
<ul>
<li><strong>Futures price risk</strong> (delta, gamma).</li>
<li><strong>Volatility risk</strong> (vega) and time decay (theta).</li>
<li><strong>Exercise risk</strong> — after exercise the fund holds a futures position with full exposure.</li>
<li><strong>Liquidity risk</strong> of far out-of-the-money series.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Trade, CCP clearing (T+1 for the premium).</li>
<li>Daily valuation and margins.</li>
<li>Exercise (American style — at any time) or expiry.</li>
<li>Futures position after exercise — rolled or closed.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g)</span></h4><p>A listed derivative on an eligible underlying (bond, rate, currency, financial index futures). Options on single-commodity futures — not eligible.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Number × size × futures price × delta.</p></div>
<div class='rule'><h4>Cover</h4><p>Written options: cover in the underlying or in liquid assets.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Exposure under the gross and commitment methods: delta equivalent (Reg. 231/2013, Annex II).</li>
<li>An AIF may hold options on commodity futures — MiFID II position limit obligations for commodity derivatives.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li><strong>EMIR</strong> — report by T+1 (listed derivative).</li>
<li>Options on commodity futures — position reports (MiFID II Art. 58).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>Option series <strong>ISIN</strong>, exchange code (e.g. OGBL), MIC.</li>
<li><strong>CFI</strong> <code>O…</code> with the underlying attribute "futures".</li>
<li>Link in data to the underlying futures series.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Delta exposure in global exposure.</li>
<li>Look-through to the CTD, or none (index).</li>
<li>Cover for written options.</li>
<li>Futures position after exercise booked in the system.</li>
</ul>`
        }
      ],
      glossary: [
        ["Black model", "The Black-Scholes variant for options on a forward price."],
        ["Futures-style premium", "A premium not paid upfront but settled through daily variation margin."],
        ["Serial option", "A monthly-expiry option on the nearest quarterly futures contract."]
      ]
    }
  }
});

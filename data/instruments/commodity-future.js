window.INSTRUMENTS.push({
  id: "commodity-future",
  name: "Commodity Future",
  aliases: ["Brent Future", "WTI Future", "Gold Future", "Commodity Future Spread", "kontrakt terminowy na towar"],
  market: "exchange",
  asset: { pl: "Derywaty giełdowe", en: "Listed derivatives" },
  sources: ["ucits", "eligible", "esma2014", "mifid", "emir", "aifmdL2"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Giełdowy kontrakt na kupno lub sprzedaż określonej ilości towaru — ropy, gazu, metali, zbóż — w przyszłym terminie po cenie ustalonej dziś. Fundusze prawie zawsze zamykają lub rolują pozycję przed dostawą. UCITS nie może mieć bezpośrednich kontraktów na pojedyncze towary; ekspozycję na towary uzyskuje przez indeksy spełniające kryteria indeksu finansowego.",
      keyFacts: [
        ["Instrument bazowy", "Towar: energia, metale, rolne (np. Brent na ICE — 1 000 baryłek)."],
        ["Rozliczenie", "Dostawa fizyczna lub gotówkowe — zależnie od kontraktu."],
        ["Depozyty", "Initial i variation margin w CCP."],
        ["Krzywa terminowa", "Contango (dalsze terminy droższe) lub backwardation (tańsze)."],
        ["Spread", "Commodity Future Spread — jednoczesna pozycja w dwóch terminach (np. rolowanie)."],
        ["Kod CFI", "<code>FC</code> — Futures on commodities"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Commodity Future</em> działa jak każdy kontrakt futures (mechanika — karta <a href='#/i/equity-index-future'>Equity Index Future</a>), ale instrumentem bazowym jest towar. Cena terminowa wynika z ceny spot, kosztu finansowania, kosztów magazynowania i korzyści z posiadania towaru (convenience yield).</p>
<p>Inwestor utrzymujący ekspozycję musi rolować kontrakty przed wygaśnięciem. W contango rolowanie kosztuje (sprzedaje się tańszy kontrakt i kupuje droższy), w backwardation przynosi zysk — to <strong>roll yield</strong>.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Otwarcie pozycji</strong> na giełdzie (ICE, NYMEX/COMEX, LME, Euronext), rozliczenie przez CCP.</li>
<li><strong>Depozyty</strong> — initial margin i codzienny variation margin.</li>
<li><strong>Rolowanie</strong> przed okresem dostawy (first notice day) — zamknięcie bliższego, otwarcie dalszego kontraktu, często jako spread.</li>
<li><strong>Wygaśnięcie</strong> — dostawa fizyczna lub rozliczenie gotówkowe (np. Brent ICE rozliczany gotówkowo według indeksu).</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>AIF ma 10 kontraktów Brent (1 000 baryłek każdy) po 80,00 USD. Kolejny termin kosztuje 81,50 USD.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Wartość nominalna</td><td>10 × 1 000 × 80,00</td><td class='num'>800 000 USD</td></tr>
<tr><td>Koszt rolowania (contango)</td><td>(81,50 − 80,00) / 80,00</td><td class='num'>1,875%</td></tr>
<tr><td>Zmiana ceny o 1 USD</td><td>10 × 1 000 × 1</td><td class='num'>10 000 USD</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>W UCITS taka pozycja jest niedopuszczalna (pojedynczy towar). W AIF — ekspozycja 800 000 USD do dźwigni i limit pozycji z MiFID II.</li>
<li>Pozycja niezamknięta przed first notice day może skończyć się dostawą fizyczną — kontrola terminów.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> kurs rozliczeniowy giełdy.</p>
<ul>
<li><strong>Ryzyko ceny towaru</strong> — wysoka zmienność.</li>
<li><strong>Ryzyko rolowania</strong> (contango).</li>
<li><strong>Ryzyko dostawy</strong> przy kontraktach fizycznych.</li>
<li><strong>Ryzyko płynności</strong> dalszych terminów i limity dziennych wahań.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Otwarcie, depozyty, wycena dzienna.</li>
<li>Rolowanie przed first notice day / last trading day.</li>
<li>Zamknięcie lub dostawa / rozliczenie gotówkowe.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Niedopuszczalny bezpośrednio <span class='law'>art. 50 ust. 1 lit. g</span></h4><p>Towar nie jest dopuszczalną bazą derywatu UCITS.</p></div>
<div class='rule'><h4>Indeks towarowy <span class='law'>art. 9 dyr. 2007/16/WE, ESMA/2014/937</span></h4><p>Dopuszczalne są derywaty na indeksy towarowe spełniające kryteria indeksu finansowego (dywersyfikacja — np. maks. 20% jednego składnika, do 35% w wyjątkowych warunkach; reprezentatywność; publikacja). Kontrakty futures na indeks towarowy — patrz też <a href='#/i/commodity-index-swap'>Commodity Index Swap</a>.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Ekspozycja w metodzie brutto i zaangażowania: liczba × wielkość × cena.</li>
<li>MiFID II art. 57 — limity pozycji w towarowych instrumentach pochodnych (liczone na poziomie grupy); art. 58 — raporty pozycji.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>EMIR</strong> — raport do T+1.</li>
<li><strong>MiFID II</strong> — raporty pozycji przez członka giełdy (tygodniowe raporty Commitment of Traders i dzienne do nadzorcy).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>Kod kontraktu i terminu (np. ICE Brent, BZ…), <strong>ISIN</strong> serii, MIC.</li>
<li><strong>CFI</strong> <code>FC…</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>UCITS — brak pozycji na pojedyncze towary.</li>
<li>Terminy rolowania przed first notice day.</li>
<li>Limity pozycji MiFID II (AIF).</li>
<li>Ekspozycja do dźwigni.</li>
</ul>`
        }
      ],
      glossary: [
        ["Contango / backwardation", "Krzywa terminowa rosnąca / malejąca z terminem."],
        ["Roll yield", "Zysk lub strata z zastępowania wygasającego kontraktu kolejnym."],
        ["First notice day", "Pierwszy dzień, w którym posiadacz pozycji długiej może dostać zawiadomienie o dostawie."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A listed contract to buy or sell a set quantity of a commodity — oil, gas, metals, grains — at a future date at a price agreed today. Funds almost always close or roll positions before delivery. A UCITS cannot hold futures on single commodities directly; it gains commodity exposure through indices that meet the financial index criteria.",
      keyFacts: [
        ["Underlying", "A commodity: energy, metals, agriculture (e.g. ICE Brent — 1,000 barrels)."],
        ["Settlement", "Physical delivery or cash — depending on the contract."],
        ["Margins", "Initial and variation margin at the CCP."],
        ["Forward curve", "Contango (later dates dearer) or backwardation (cheaper)."],
        ["Spread", "Commodity Future Spread — simultaneous positions in two maturities (e.g. a roll)."],
        ["CFI code", "<code>FC</code> — Futures on commodities"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Commodity Future</em> works like any futures contract (mechanics on the <a href='#/i/equity-index-future'>Equity Index Future</a> card), but the underlying is a commodity. The futures price reflects the spot price, funding cost, storage costs and the benefit of holding the commodity (convenience yield).</p>
<p>An investor keeping exposure has to roll contracts before expiry. In contango rolling costs money (selling the cheaper contract and buying the dearer one), in backwardation it earns — this is the <strong>roll yield</strong>.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Opening a position</strong> on the exchange (ICE, NYMEX/COMEX, LME, Euronext), cleared by the CCP.</li>
<li><strong>Margins</strong> — initial margin and daily variation margin.</li>
<li><strong>Rolling</strong> before the delivery period (first notice day) — closing the near and opening the next contract, often as a spread.</li>
<li><strong>Expiry</strong> — physical delivery or cash settlement (e.g. ICE Brent is cash-settled against an index).</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>An AIF holds 10 Brent contracts (1,000 barrels each) at USD 80.00. The next maturity trades at USD 81.50.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Notional value</td><td>10 × 1,000 × 80.00</td><td class='num'>USD 800,000</td></tr>
<tr><td>Roll cost (contango)</td><td>(81.50 − 80.00) / 80.00</td><td class='num'>1.875%</td></tr>
<tr><td>USD 1 price move</td><td>10 × 1,000 × 1</td><td class='num'>USD 10,000</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>In a UCITS this position is not eligible (single commodity). In an AIF — USD 800,000 exposure in leverage and a MiFID II position limit.</li>
<li>A position not closed before first notice day can end in physical delivery — monitor the dates.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> exchange settlement price.</p>
<ul>
<li><strong>Commodity price risk</strong> — high volatility.</li>
<li><strong>Roll risk</strong> (contango).</li>
<li><strong>Delivery risk</strong> for physically settled contracts.</li>
<li><strong>Liquidity risk</strong> of later maturities and daily price limits.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Opening, margins, daily valuation.</li>
<li>Rolling before first notice day / last trading day.</li>
<li>Close-out or delivery / cash settlement.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Not eligible directly <span class='law'>Art. 50(1)(g)</span></h4><p>A commodity is not an eligible UCITS derivative underlying.</p></div>
<div class='rule'><h4>Commodity index <span class='law'>Art. 9 Dir. 2007/16/EC, ESMA/2014/937</span></h4><p>Derivatives on commodity indices meeting the financial index criteria are eligible (diversification — e.g. max 20% per component, up to 35% in exceptional conditions; representativeness; publication). Futures on a commodity index — see also <a href='#/i/commodity-index-swap'>Commodity Index Swap</a>.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Exposure under the gross and commitment methods: number × size × price.</li>
<li>MiFID II Art. 57 — position limits in commodity derivatives (at group level); Art. 58 — position reports.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li><strong>EMIR</strong> — report by T+1.</li>
<li><strong>MiFID II</strong> — position reports via the exchange member (weekly Commitment of Traders and daily to the supervisor).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>Contract and maturity code (e.g. ICE Brent, BZ…), series <strong>ISIN</strong>, MIC.</li>
<li><strong>CFI</strong> <code>FC…</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>UCITS — no single-commodity positions.</li>
<li>Roll dates before first notice day.</li>
<li>MiFID II position limits (AIF).</li>
<li>Exposure in leverage.</li>
</ul>`
        }
      ],
      glossary: [
        ["Contango / backwardation", "A forward curve rising / falling with maturity."],
        ["Roll yield", "Gain or loss from replacing an expiring contract with the next one."],
        ["First notice day", "The first day a long holder can receive a delivery notice."]
      ]
    }
  }
});

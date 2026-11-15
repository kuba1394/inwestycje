window.INSTRUMENTS.push({
  id: "equity-swap",
  name: "Equity Swap",
  aliases: ["Single-Stock Swap", "Portfolio Swap", "Price Return Swap", "swap akcyjny"],
  market: "otc",
  asset: { pl: "Derywaty akcyjne", en: "Equity derivatives" },
  sources: ["ucits", "eligible", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "marginRts", "sftr", "ssr", "td"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Equity Swap to umowa OTC, w której strony wymieniają zwrot z akcji lub koszyka akcji (zmiana ceny, zwykle także dywidendy) na płatności odsetkowe od nominału. Daje ekspozycję długą albo krótką na konkretne spółki bez kupowania akcji. To odmiana Total Return Swap skupiona na akcjach.",
      keyFacts: [
        ["Rynek", "OTC, bilateralnie z bankiem (prime broker); brak obowiązku clearingu."],
        ["Dokumentacja", "ISDA Master Agreement + CSA, ISDA Equity Derivatives Definitions."],
        ["Kierunki", "Long (otrzymuje zwrot z akcji, płaci odsetki) i short (płaci zwrot z akcji, otrzymuje odsetki pomniejszone o koszt pożyczki akcji)."],
        ["Rodzaje", "Single-stock, basket, portfolio swap (wiele pozycji pod jedną umową); price return lub total return."],
        ["Reset", "Okresowy (np. miesięczny) lub przy zamknięciu pozycji."],
        ["Kluczowe obowiązki", "Look-through do emitenta, SSR (pozycje krótkie), progi znacznych pakietów."],
        ["Kod CFI", "<code>SE****</code> (Swaps – Equity)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Equity Swap</em> działa jak <a href='#/i/total-return-swap'>Total Return Swap</a>, ale typowo na pojedyncze akcje lub koszyki, a nie na indeks. Pozycja długa w swapie ekonomicznie odpowiada kupnu akcji za pożyczone pieniądze, a pozycja krótka — krótkiej sprzedaży.</p>" +
            "<ul>" +
              "<li><strong>Noga akcyjna</strong> — zmiana ceny akcji × liczba akcji (plus dywidendy w wersji total return).</li>" +
              "<li><strong>Noga finansująca</strong> — stopa referencyjna (np. €STR) ± spread od nominału.</li>" +
            "</ul>" +
            "<p>Dla UCITS swap krótki to podstawowy sposób uzyskania ekspozycji krótkiej na konkretną spółkę, bo fizyczna krótka sprzedaż jest zakazana (art. 89).</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Akcje, liczba, cena początkowa, stopa finansowania, spread, częstotliwość resetu. Bank zabezpiecza się, kupując (lub pożyczając i sprzedając) akcje.</li>" +
              "<li><strong>W trakcie.</strong> Codzienna wycena i VM. Dywidendy przekazywane według umowy.</li>" +
              "<li><strong>Reset / zamknięcie.</strong> Rozliczenie: (cena bieżąca − cena początkowa) × liczba akcji ± odsetki. Pozycję można zmniejszać lub zwiększać (unwind częściowy).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy — limit emitenta i znaczne pakiety",
          html:
            "<p>Fundusz (NAV 200 mln EUR) ma 200 000 akcji spółki V (4 mln EUR) i zawiera long equity swap na kolejne 500 000 akcji V po 20 EUR. Spółka V ma 10 mln akcji.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Test</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Nominał swapu</td><td>500 000 × 20</td><td class='num'>10 000 000 EUR</td></tr>" +
              "<tr><td>Ekspozycja na spółkę V (akcje + swap)</td><td>(4 + 10) / 200</td><td class='num'>7,0% NAV</td></tr>" +
              "<tr><td>Udział w akcjach V (akcje + instrumenty)</td><td>(200 000 + 500 000) / 10 000 000</td><td class='num'>7,0%</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Look-through:</strong> swap na pojedynczą akcję daje ekspozycję na emitenta V. Razem 7% NAV — powyżej 5%, więc V wchodzi do koszyka 40%.</li>" +
              "<li><strong>Znaczne pakiety:</strong> dyrektywa o przejrzystości wlicza do progów także instrumenty rozliczane gotówkowo o podobnym skutku ekonomicznym. Akcje (2%) + swap (5%) = 7% → przekroczony próg 5% → zawiadomienie.</li>" +
              "<li><strong>Kontrahent:</strong> wycena swapu minus zabezpieczenie wobec limitu 10% NAV.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> narosły wynik nogi akcyjnej (kurs bieżący vs cena z resetu, dywidendy) minus narosłe odsetki.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko rynkowe</strong> akcji (dla krótkiej pozycji teoretycznie nieograniczone).</li>" +
              "<li><strong>Ryzyko kontrahenta</strong> i koncentracji u jednego prime brokera.</li>" +
              "<li><strong>Ryzyko kosztu pożyczki</strong> — przy pozycji krótkiej bank może podnieść koszt lub zamknąć pozycję (recall akcji).</li>" +
              "<li><strong>Ryzyko zdarzeń korporacyjnych</strong> — dostosowania według definicji ISDA.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie, potwierdzenie, raport EMIR.</li>" +
              "<li>Codzienna wycena, VM/IM, dywidendy, zdarzenia korporacyjne.</li>" +
              "<li>Resety, zwiększanie i zmniejszanie pozycji, zamknięcie.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywat OTC na dopuszczalne aktywa (akcje); warunki kontrahenta, wyceny i zamknięcia.</p></div>" +
              "<div class='rule'><h4>Look-through <span class='law'>art. 51 ust. 3 akapit 2; ESMA/2014/937</span></h4><p>Ekspozycja na akcje bazowe wlicza się do limitów emitenta z art. 52, łącznie z akcjami posiadanymi bezpośrednio.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>CESR/10-788</span></h4><p>Wartość rynkowa akcji bazowych (liczba × kurs). Długie i krótkie pozycje na tę samą akcję można kompensować.</p></div>" +
              "<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1–2</span></h4><p>10% / 5% NAV, limit łączny 20%, zabezpieczenia według wytycznych.</p></div>" +
              "<div class='rule'><h4>Portfolio swap <span class='law'>ESMA/2014/937</span></h4><p>Jeśli kontrahent ma swobodę co do składu portfela bazowego — zasady delegacji zarządzania.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: wartość rynkowa akcji bazowych; w metodzie brutto długie i krótkie sumuje się w wartościach bezwzględnych.</li>" +
              "<li>Swapy to typowe narzędzie dźwigni w AIF typu long/short — limit dźwigni z dokumentów.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR, SSR, przejrzystość",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>EMIR <span class='law'>art. 9, 11 EMIR</span></h4><p>Raport do T+1, potwierdzenie, uzgadnianie portfela, VM i IM (powyżej progu). Brak obowiązku clearingu.</p></div>" +
              "<div class='rule'><h4>SSR <span class='law'>rozp. 236/2012</span></h4><p>Short equity swap tworzy pozycję krótką netto: zgłoszenie do nadzorcy od 0,1% kapitału (i każde kolejne 0,1%), publikacja od 0,5%.</p></div>" +
              "<div class='rule'><h4>Znaczne pakiety <span class='law'>art. 13 dyr. 2004/109/WE</span></h4><p>Instrumenty rozliczane gotówkowo, odnoszące się do akcji, wlicza się do progów zawiadomień (łącznie z akcjami).</p></div>" +
              "<div class='rule'><h4>SFTR <span class='law'>art. 13–14 SFTR</span></h4><p>Jeśli swap ma charakter total return — ujawnienia w prospekcie i sprawozdaniach.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), LEI kontrahenta.</li>" +
              "<li><strong>ISIN/LEI akcji bazowych</strong> — do look-through, SSR i progów pakietów.</li>" +
              "<li><strong>CFI</strong> — <code>S</code> (Swaps), grupa <code>E</code> (Equity).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Look-through do emitenta i agregacja z akcjami posiadanymi.</li>" +
              "<li>Pozycje krótkie netto wobec progów SSR.</li>" +
              "<li>Progi zawiadomień (akcje + instrumenty).</li>" +
              "<li>Ekspozycja całkowita / dźwignia, limit kontrahenta, zabezpieczenia.</li>" +
              "<li>Raport EMIR do T+1.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Prime broker", "Bank obsługujący fundusz w zakresie finansowania, pożyczek akcji i swapów."],
        ["Price return / total return", "Swap tylko na zmianę ceny / także na dywidendy."],
        ["Portfolio swap", "Jedna umowa obejmująca wiele pozycji akcyjnych, zmienianych w czasie."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An equity swap is an OTC contract in which the parties exchange the return on a share or basket of shares (price change, usually also dividends) for interest payments on the notional. It gives long or short exposure to specific companies without buying shares. It is a variant of the Total Return Swap focused on equities.",
      keyFacts: [
        ["Market", "OTC, bilateral with a bank (prime broker); no clearing obligation."],
        ["Documentation", "ISDA Master Agreement + CSA, ISDA Equity Derivatives Definitions."],
        ["Directions", "Long (receives the share return, pays interest) and short (pays the share return, receives interest less the stock borrow cost)."],
        ["Types", "Single-stock, basket, portfolio swap (many positions under one agreement); price return or total return."],
        ["Reset", "Periodic (e.g. monthly) or when the position is closed."],
        ["Key obligations", "Issuer look-through, SSR (short positions), major holding thresholds."],
        ["CFI code", "<code>SE****</code> (Swaps – Equity)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>An Equity Swap works like a <a href='#/i/total-return-swap'>Total Return Swap</a>, but typically on single stocks or baskets rather than an index. A long swap is economically equivalent to buying the shares with borrowed money, and a short swap to short selling.</p>" +
            "<ul>" +
              "<li><strong>Equity leg</strong> — share price change × number of shares (plus dividends in the total return version).</li>" +
              "<li><strong>Funding leg</strong> — reference rate (e.g. €STR) ± spread on the notional.</li>" +
            "</ul>" +
            "<p>For a UCITS a short swap is the main way to obtain short exposure to a specific company, because physical short selling is prohibited (Art. 89).</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> Shares, quantity, initial price, funding rate, spread, reset frequency. The bank hedges by buying (or borrowing and selling) the shares.</li>" +
              "<li><strong>During the life.</strong> Daily valuation and VM. Dividends passed through per the agreement.</li>" +
              "<li><strong>Reset / close.</strong> Settlement: (current price − initial price) × shares ± interest. The position can be reduced or increased (partial unwind).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example — issuer limit and major holdings",
          html:
            "<p>A fund (NAV EUR 200m) holds 200,000 shares of company V (EUR 4m) and enters a long equity swap on another 500,000 V shares at EUR 20. Company V has 10m shares.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Test</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>Swap notional</td><td>500,000 × 20</td><td class='num'>EUR 10,000,000</td></tr>" +
              "<tr><td>Exposure to company V (shares + swap)</td><td>(4 + 10) / 200</td><td class='num'>7.0% of NAV</td></tr>" +
              "<tr><td>Holding of V shares (shares + instruments)</td><td>(200,000 + 500,000) / 10,000,000</td><td class='num'>7.0%</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Look-through:</strong> a single-stock swap gives exposure to issuer V. In total 7% of NAV — above 5%, so V enters the 40% bucket.</li>" +
              "<li><strong>Major holdings:</strong> the Transparency Directive also counts cash-settled instruments with a similar economic effect. Shares (2%) + swap (5%) = 7% → 5% threshold crossed → notification.</li>" +
              "<li><strong>Counterparty:</strong> swap value less collateral against the 10% of NAV limit.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> accrued result of the equity leg (current price vs reset price, dividends) less accrued interest.</p>" +
            "<ul>" +
              "<li><strong>Equity market risk</strong> (theoretically unlimited for a short position).</li>" +
              "<li><strong>Counterparty risk</strong> and concentration with a single prime broker.</li>" +
              "<li><strong>Borrow cost risk</strong> — for a short position the bank may raise the cost or close the position (share recall).</li>" +
              "<li><strong>Corporate action risk</strong> — adjustments under the ISDA definitions.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution, confirmation, EMIR report.</li>" +
              "<li>Daily valuation, VM/IM, dividends, corporate actions.</li>" +
              "<li>Resets, increases and decreases, close-out.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>OTC derivative on eligible assets (shares); counterparty, valuation and close-out conditions.</p></div>" +
              "<div class='rule'><h4>Look-through <span class='law'>Art. 51(3), second subpara.; ESMA/2014/937</span></h4><p>Exposure to the underlying shares counts towards the Art. 52 issuer limits, together with shares held directly.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Market value of the underlying shares (quantity × price). Long and short positions in the same share may be netted.</p></div>" +
              "<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1)–(2)</span></h4><p>10% / 5% of NAV, 20% combined limit, collateral per the guidelines.</p></div>" +
              "<div class='rule'><h4>Portfolio swap <span class='law'>ESMA/2014/937</span></h4><p>If the counterparty has discretion over the underlying portfolio — delegation rules apply.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: market value of the underlying shares; under the gross method long and short are added in absolute value.</li>" +
              "<li>Swaps are a typical leverage tool in long/short AIFs — leverage limit from the documents.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR, SSR, transparency",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>EMIR <span class='law'>Art. 9, 11 EMIR</span></h4><p>Report by T+1, confirmation, portfolio reconciliation, VM and IM (above the threshold). No clearing obligation.</p></div>" +
              "<div class='rule'><h4>SSR <span class='law'>Reg. 236/2012</span></h4><p>A short equity swap creates a net short position: notified to the regulator from 0.1% of share capital (and every further 0.1%), published from 0.5%.</p></div>" +
              "<div class='rule'><h4>Major holdings <span class='law'>Art. 13 Dir. 2004/109/EC</span></h4><p>Cash-settled instruments referencing shares count towards notification thresholds (aggregated with shares).</p></div>" +
              "<div class='rule'><h4>SFTR <span class='law'>Art. 13–14 SFTR</span></h4><p>If the swap is total return — prospectus and periodic report disclosures.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), counterparty LEI.</li>" +
              "<li><strong>Underlying share ISIN/LEI</strong> — for look-through, SSR and holding thresholds.</li>" +
              "<li><strong>CFI</strong> — <code>S</code> (Swaps), group <code>E</code> (Equity).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Issuer look-through and aggregation with shares held.</li>" +
              "<li>Net short positions against SSR thresholds.</li>" +
              "<li>Notification thresholds (shares + instruments).</li>" +
              "<li>Global exposure / leverage, counterparty limit, collateral.</li>" +
              "<li>EMIR report by T+1.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Prime broker", "Bank providing a fund with financing, stock lending and swaps."],
        ["Price return / total return", "Swap on price change only / also on dividends."],
        ["Portfolio swap", "One agreement covering many equity positions that change over time."]
      ]
    }
  }
});

window.INSTRUMENTS.push({
  id: "warrant",
  name: "Warrant",
  aliases: ["Covered Warrant", "Equity Warrant", "Subscription Warrant", "warrant subskrypcyjny"],
  market: "exchange",
  asset: { pl: "Papiery z wbudowanym derywatem", en: "Securities with embedded derivatives" },
  sources: ["ucits", "eligible", "cesr10788", "aifmd", "aifmdL2", "td"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Warrant to notowany papier wartościowy, który działa jak opcja: daje prawo kupna (call) lub sprzedaży (put) instrumentu bazowego po określonej cenie. W odróżnieniu od opcji giełdowej jest emitowany przez konkretny podmiot — bank albo spółkę — więc posiadacz ponosi ryzyko kredytowe emitenta.",
      keyFacts: [
        ["Rynek", "Giełda lub segment produktów strukturyzowanych (np. Börse Stuttgart, SIX, GPW); market maker emitenta."],
        ["Rodzaje", "Covered warrant (emituje bank, bazą są akcje, indeksy, waluty) i warrant korporacyjny (emituje spółka, prawo do nowych akcji)."],
        ["Parytet (ratio)", "Ile instrumentu bazowego przypada na 1 warrant, np. 0,1 = 10 warrantów na 1 akcję."],
        ["Rozliczenie warrantu", "Zakup jak akcji (T+2 w UE). Wykonanie: covered — zwykle gotówkowe; korporacyjny — wydanie nowych akcji."],
        ["Strata maksymalna", "Cena zakupu (kupujący nie może wystawić warrantu)."],
        ["Ryzyko emitenta", "Tak — warrant to zobowiązanie emitenta."],
        ["Kod CFI", "<code>RW****</code> (Entitlements – Warrants)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p>Warrant to <strong>papier wartościowy z wbudowanym derywatem</strong> (opcją). Inwestor może go tylko kupić lub sprzedać — nie może wystawić. Strona wystawiająca opcję to zawsze emitent warrantu.</p>" +
            "<ul>" +
              "<li><strong>Covered warrant</strong> — emituje bank. Bank zabezpiecza się na rynku, a przy wykonaniu płaci różnicę w gotówce. Na rynkach europejskich to typowy produkt dla inwestorów indywidualnych. Pokrewne są certyfikaty turbo i knock-out (osobna karta: Exchange-Traded Certificate).</li>" +
              "<li><strong>Warrant korporacyjny</strong> (<em>equity / subscription warrant</em>) — emituje spółka. Daje prawo objęcia <strong>nowych</strong> akcji po cenie emisyjnej, co rozwadnia dotychczasowych akcjonariuszy. Często przydzielany razem z akcjami lub obligacjami przy emisji, IPO albo restrukturyzacji.</li>" +
            "</ul>" +
            "<div class='callout'><strong>Polski kontekst</strong>Warranty subskrypcyjne w KSH są zwykle niezbywalne i służą do warunkowego podwyższenia kapitału (np. w programach motywacyjnych). Nie trafiają do obrotu giełdowego, w przeciwieństwie do warrantów omawianych na tej karcie.</div>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Emisja.</strong> Emitent ustala instrument bazowy, typ (call/put), strike, parytet, termin i styl wykonania, a następnie wprowadza warrant do obrotu.</li>" +
              "<li><strong>Obrót.</strong> Market maker emitenta kwotuje ceny kupna i sprzedaży. Cena wynika z modelu opcyjnego (instrument bazowy, zmienność, czas, stopy, dywidendy).</li>" +
              "<li><strong>Posiadanie.</strong> Warrant nie daje dywidend ani prawa głosu. Wartość czasowa maleje z upływem czasu.</li>" +
              "<li><strong>Wykonanie.</strong> Covered warrant in-the-money jest zwykle wykonywany automatycznie, a posiadacz dostaje gotówkę: (S − K) × parytet dla call. Warrant korporacyjny posiadacz wykonuje sam: płaci cenę emisyjną i otrzymuje nowe akcje.</li>" +
              "<li><strong>Wygaśnięcie</strong> bez wartości, jeśli warrant jest out-of-the-money.</li>" +
            "</ol>" +
            "<p class='formula'>Wartość wewnętrzna call = max(S − K, 0) × parytet</p>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz (NAV 100 mln EUR) kupuje 500 000 covered warrantów call na akcje spółki X wyemitowanych przez bank B. Strike 100 EUR, parytet 0,1, cena warrantu 1,20 EUR, cena akcji X 105 EUR, delta 0,6.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Wartość rynkowa pozycji (ryzyko wobec banku B)</td><td>500 000 × 1,20</td><td class='num'>600 000 EUR (0,6% NAV)</td></tr>" +
              "<tr><td>Liczba akcji bazowych</td><td>500 000 × 0,1</td><td class='num'>50 000 akcji</td></tr>" +
              "<tr><td>Ekspozycja na X w ekwiwalencie delta</td><td>50 000 × 105 × 0,6</td><td class='num'>3 150 000 EUR (3,15% NAV)</td></tr>" +
              "<tr><td>Wykonanie przy X = 120 EUR</td><td>(120 − 100) × 0,1 × 500 000</td><td class='num'>1 000 000 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance — dwie ekspozycje</h3>" +
            "<ul>" +
              "<li><strong>Na emitenta warrantu (bank B):</strong> 0,6% NAV wartości rynkowej — wlicza się do limitów emitenta B (5/10/40) i do limitu łącznego 20% razem z depozytami w B i derywatami OTC z B.</li>" +
              "<li><strong>Na instrument bazowy (spółka X):</strong> 3,15% NAV w ekwiwalencie delta — sumuje się z akcjami X posiadanymi bezpośrednio w teście limitów emitenta.</li>" +
              "<li><strong>Ekspozycja całkowita:</strong> wbudowany derywat liczy się do global exposure (3,15 mln EUR w metodzie zaangażowania).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> kurs giełdowy (zwykle cena kupna market makera). Jeśli obrót zanika — wartość teoretyczna z modelu opcyjnego.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko rynkowe z dźwignią</strong> — duża zmiana procentowa przy małym ruchu instrumentu bazowego.</li>" +
              "<li><strong>Ryzyko kredytowe emitenta</strong> — upadłość banku może oznaczać utratę wartości warrantu.</li>" +
              "<li><strong>Ryzyko utraty wartości czasowej</strong> (theta) i zmienności (vega).</li>" +
              "<li><strong>Ryzyko płynności</strong> — zależność od market makera emitenta i jego spreadu.</li>" +
              "<li><strong>Rozwodnienie</strong> — przy warrantach korporacyjnych wykonanie zwiększa liczbę akcji.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zakup na giełdzie, rozliczenie DvP (T+2 w UE).</li>" +
              "<li>Zdarzenia korporacyjne instrumentu bazowego — korekta strike'u i parytetu przez emitenta.</li>" +
              "<li>Wykonanie (automatyczne lub na żądanie), rozliczenie gotówkowe lub wydanie akcji.</li>" +
              "<li>Wygaśnięcie i wykreślenie z obrotu.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. a–d UCITS; art. 2 dyr. 2007/16/WE</span></h4><p>Notowany warrant jest zbywalnym papierem wartościowym, jeśli spełnia kryteria z art. 2 (m.in. strata ograniczona do zapłaconej kwoty — spełnione, bo inwestor tylko kupuje). Bazą muszą być dopuszczalne aktywa lub indeksy finansowe.</p></div>" +
              "<div class='rule'><h4>Wbudowany derywat <span class='law'>art. 51 ust. 3 akapit 4; art. 10 dyr. 2007/16/WE</span></h4><p>Gdy papier zawiera derywat, uwzględnia się go przy limitach ekspozycji z instrumentów pochodnych. Ekspozycja w metodzie zaangażowania: liczba akcji × wartość rynkowa instrumentu bazowego × delta (CESR/10-788).</p></div>" +
              "<div class='rule'><h4>Limity emitenta — podwójnie <span class='law'>art. 52</span></h4><p>Emitent warrantu: wartość rynkowa pozycji w limitach 5/10/40 i 20%. Instrument bazowy: look-through dla pojedynczych akcji (dla indeksów finansowych — bez look-through).</p></div>" +
              "<div class='rule'><h4>Warranty korporacyjne z zdarzeń</h4><p>Warranty otrzymane w wyniku emisji lub restrukturyzacji mogą być nienotowane — wtedy trafiają do limitu 10% „innych papierów” (art. 50 ust. 2 lit. a). Często są przekroczeniem pasywnym, które trzeba usunąć.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: konwersja w ekwiwalencie delta (liczba akcji × wartość instrumentu bazowego × delta).</li>" +
              "<li>Limity emitenta i instrumentów strukturyzowanych — według dokumentów AIF.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie",
          html:
            "<ul>" +
              "<li><strong>EMIR</strong> — warrant to papier wartościowy, a nie kontrakt derywatowy, więc nie raportuje się go w EMIR.</li>" +
              "<li><strong>MiFIR</strong> — raport transakcyjny po stronie firmy inwestycyjnej.</li>" +
              "<li><strong>Znaczne pakiety</strong> <span class='law'>dyr. 2004/109/WE</span> — instrumenty dające prawo nabycia akcji (warranty korporacyjne, warranty z dostawą akcji) wlicza się do progów zawiadomień o znacznych pakietach.</li>" +
              "<li><strong>SSR</strong> — warranty put na akcje tworzą pozycję krótką netto.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> warrantu (kraj emitenta), <strong>LEI emitenta</strong> warrantu.</li>" +
              "<li><strong>ISIN/LEI instrumentu bazowego</strong> — do look-through.</li>" +
              "<li><strong>CFI</strong> — kategoria <code>R</code> (Entitlements), grupa <code>W</code> (Warrants).</li>" +
              "<li><strong>Ticker, MIC</strong> giełdy.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Warrant notowany i spełnia kryteria zbywalnego papieru? Jeśli nie — limit 10%.</li>" +
              "<li>Ekspozycja na emitenta warrantu w limitach 5/10/40 i 20%.</li>" +
              "<li>Look-through do instrumentu bazowego (ekwiwalent delta).</li>" +
              "<li>Wbudowany derywat w ekspozycji całkowitej.</li>" +
              "<li>Progi zawiadomień o znacznych pakietach (prawo nabycia akcji).</li>" +
              "<li>Kalendarz wygaśnięć i wykonania.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Covered warrant", "Warrant emitowany przez bank, zwykle rozliczany gotówkowo."],
        ["Subscription warrant", "Warrant korporacyjny dający prawo objęcia nowych akcji spółki."],
        ["Ratio (parytet)", "Ilość instrumentu bazowego przypadająca na jeden warrant."],
        ["Embedded derivative", "Wbudowany derywat — element papieru wartościowego działający jak instrument pochodny."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A warrant is a listed security that works like an option: it gives the right to buy (call) or sell (put) an underlying at a set price. Unlike a listed option, it is issued by a specific entity — a bank or a company — so the holder bears the issuer's credit risk.",
      keyFacts: [
        ["Market", "Exchange or structured products segment (e.g. Börse Stuttgart, SIX, Warsaw Stock Exchange); issuer's market maker."],
        ["Types", "Covered warrant (issued by a bank on shares, indices, currencies) and corporate warrant (issued by a company, right to new shares)."],
        ["Ratio", "How much of the underlying one warrant represents, e.g. 0.1 = 10 warrants per share."],
        ["Settlement of the warrant", "Bought like a share (T+2 in the EU). Exercise: covered — usually cash; corporate — issue of new shares."],
        ["Maximum loss", "Purchase price (an investor cannot write a warrant)."],
        ["Issuer risk", "Yes — the warrant is the issuer's obligation."],
        ["CFI code", "<code>RW****</code> (Entitlements – Warrants)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A warrant is a <strong>security with an embedded derivative</strong> (an option). An investor can only buy or sell it — not write it. The option writer is always the warrant's issuer.</p>" +
            "<ul>" +
              "<li><strong>Covered warrant</strong> — issued by a bank. The bank hedges in the market and on exercise pays the difference in cash. In European markets it is a typical retail product. Turbo and knock-out certificates are related (separate card: Exchange-Traded Certificate).</li>" +
              "<li><strong>Corporate warrant</strong> (equity / subscription warrant) — issued by a company. It gives the right to subscribe for <strong>new</strong> shares at the issue price, diluting existing shareholders. Often granted alongside shares or bonds in an issue, IPO or restructuring.</li>" +
            "</ul>" +
            "<div class='callout'><strong>Polish context</strong>Subscription warrants under the Polish Commercial Companies Code are usually non-transferable and used for conditional capital increases (e.g. incentive schemes). They are not traded on the exchange, unlike the warrants covered on this card.</div>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Issuance.</strong> The issuer sets the underlying, type (call/put), strike, ratio, expiry and exercise style, then lists the warrant.</li>" +
              "<li><strong>Trading.</strong> The issuer's market maker quotes bid and offer prices. The price comes from an option model (underlying, volatility, time, rates, dividends).</li>" +
              "<li><strong>Holding.</strong> A warrant carries no dividends or voting rights. Time value decays.</li>" +
              "<li><strong>Exercise.</strong> An in-the-money covered warrant is usually exercised automatically and the holder receives cash: (S − K) × ratio for a call. A corporate warrant is exercised by the holder: it pays the issue price and receives new shares.</li>" +
              "<li><strong>Expiry</strong> worthless if the warrant is out-of-the-money.</li>" +
            "</ol>" +
            "<p class='formula'>Call intrinsic value = max(S − K, 0) × ratio</p>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A fund (NAV EUR 100m) buys 500,000 covered call warrants on company X shares issued by bank B. Strike EUR 100, ratio 0.1, warrant price EUR 1.20, X share price EUR 105, delta 0.6.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>Market value of the position (risk to bank B)</td><td>500,000 × 1.20</td><td class='num'>EUR 600,000 (0.6% of NAV)</td></tr>" +
              "<tr><td>Number of underlying shares</td><td>500,000 × 0.1</td><td class='num'>50,000 shares</td></tr>" +
              "<tr><td>Delta-equivalent exposure to X</td><td>50,000 × 105 × 0.6</td><td class='num'>EUR 3,150,000 (3.15% of NAV)</td></tr>" +
              "<tr><td>Exercise with X = EUR 120</td><td>(120 − 100) × 0.1 × 500,000</td><td class='num'>EUR 1,000,000</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance — two exposures</h3>" +
            "<ul>" +
              "<li><strong>To the warrant issuer (bank B):</strong> 0.6% of NAV at market value — counts towards B's issuer limits (5/10/40) and the 20% combined limit together with deposits with B and OTC derivatives with B.</li>" +
              "<li><strong>To the underlying (company X):</strong> 3.15% of NAV delta-equivalent — added to X shares held directly in the issuer limit test.</li>" +
              "<li><strong>Global exposure:</strong> the embedded derivative counts towards global exposure (EUR 3.15m under the commitment approach).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> exchange price (usually the market maker's bid). If trading dries up — theoretical value from an option model.</p>" +
            "<ul>" +
              "<li><strong>Leveraged market risk</strong> — a large percentage move for a small move in the underlying.</li>" +
              "<li><strong>Issuer credit risk</strong> — a bank failure can wipe out the warrant's value.</li>" +
              "<li><strong>Time decay</strong> (theta) and volatility (vega) risk.</li>" +
              "<li><strong>Liquidity risk</strong> — dependence on the issuer's market maker and its spread.</li>" +
              "<li><strong>Dilution</strong> — for corporate warrants, exercise increases the number of shares.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Purchase on the exchange, DvP settlement (T+2 in the EU).</li>" +
              "<li>Corporate actions on the underlying — strike and ratio adjusted by the issuer.</li>" +
              "<li>Exercise (automatic or on request), cash settlement or delivery of shares.</li>" +
              "<li>Expiry and delisting.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(a)–(d) UCITS; Art. 2 Dir. 2007/16/EC</span></h4><p>A listed warrant is a transferable security if it meets the Art. 2 criteria (including loss limited to the amount paid — met, because the investor only buys). The underlying must be eligible assets or financial indices.</p></div>" +
              "<div class='rule'><h4>Embedded derivative <span class='law'>Art. 51(3), fourth subpara.; Art. 10 Dir. 2007/16/EC</span></h4><p>When a security embeds a derivative, it is taken into account for derivative exposure limits. Commitment exposure: number of shares × market value of the underlying × delta (CESR/10-788).</p></div>" +
              "<div class='rule'><h4>Issuer limits — twice <span class='law'>Art. 52</span></h4><p>Warrant issuer: market value of the position within 5/10/40 and 20%. Underlying: look-through for single stocks (for financial indices — no look-through).</p></div>" +
              "<div class='rule'><h4>Corporate warrants from events</h4><p>Warrants received in an issue or restructuring may be unlisted — they then fall into the 10% \"other securities\" limit (Art. 50(2)(a)). They are often a passive breach that must be remedied.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: delta-equivalent conversion (number of shares × underlying value × delta).</li>" +
              "<li>Issuer and structured instrument limits — per the AIF's documents.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting",
          html:
            "<ul>" +
              "<li><strong>EMIR</strong> — a warrant is a security, not a derivative contract, so it is not reported under EMIR.</li>" +
              "<li><strong>MiFIR</strong> — transaction report by the investment firm.</li>" +
              "<li><strong>Major holdings</strong> <span class='law'>Dir. 2004/109/EC</span> — instruments giving a right to acquire shares (corporate warrants, physically settled warrants) count towards major holding notification thresholds.</li>" +
              "<li><strong>SSR</strong> — put warrants on shares create a net short position.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li>Warrant <strong>ISIN</strong> (issuer's country), warrant <strong>issuer LEI</strong>.</li>" +
              "<li><strong>Underlying ISIN/LEI</strong> — for look-through.</li>" +
              "<li><strong>CFI</strong> — category <code>R</code> (Entitlements), group <code>W</code> (Warrants).</li>" +
              "<li>Exchange <strong>ticker, MIC</strong>.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Is the warrant listed and does it meet the transferable security criteria? If not — 10% limit.</li>" +
              "<li>Exposure to the warrant issuer within 5/10/40 and 20%.</li>" +
              "<li>Look-through to the underlying (delta-equivalent).</li>" +
              "<li>Embedded derivative in global exposure.</li>" +
              "<li>Major holding notification thresholds (right to acquire shares).</li>" +
              "<li>Expiry and exercise calendar.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Covered warrant", "Warrant issued by a bank, usually cash-settled."],
        ["Subscription warrant", "Corporate warrant giving the right to subscribe for new shares in the company."],
        ["Ratio", "Amount of underlying per warrant."],
        ["Embedded derivative", "A component of a security that behaves like a derivative."]
      ]
    }
  }
});

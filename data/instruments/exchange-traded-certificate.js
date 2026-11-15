window.INSTRUMENTS.push({
  id: "exchange-traded-certificate",
  name: "Exchange-Traded Certificate",
  aliases: ["Structured Certificate", "Turbo Certificate", "Knock-Out Certificate", "Tracker Certificate", "Factor Certificate", "certyfikat strukturyzowany"],
  market: "exchange",
  asset: { pl: "Produkty strukturyzowane", en: "Structured products" },
  sources: ["ucits", "eligible", "cesr10788", "aifmd", "aifmdL2"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Certyfikat strukturyzowany to notowany papier dłużny banku, którego wypłata zależy od instrumentu bazowego według określonej formuły: 1:1 (tracker), z dźwignią i barierą (turbo, knock-out), z ochroną lub ograniczeniem zysku (bonus, discount). Tak jak warrant niesie ryzyko kredytowe emitenta, a wbudowany derywat trzeba ująć w kontroli.",
      keyFacts: [
        ["Emitent", "Bank (lub jego pojazd emisyjny z gwarancją)."],
        ["Rynek", "Giełdy produktów strukturyzowanych (np. Börse Stuttgart, Börse Frankfurt, SIX, GPW); market maker emitenta."],
        ["Rodzaje", "Tracker (1:1), bonus, discount, express, turbo / knock-out, factor (stała dźwignia), produkty z ochroną kapitału."],
        ["Termin", "Określony lub otwarty (open end); turbo wygasa natychmiast po przekroczeniu bariery."],
        ["Rozliczenie", "Zakup jak papier (UE T+2); wykup zwykle gotówkowy."],
        ["Ryzyko emitenta", "Tak — niezabezpieczone zobowiązanie banku."],
        ["Kod CFI", "Zależnie od produktu: np. <code>RF****</code> (mini-futures / certyfikaty o stałej dźwigni) albo kategoria <code>D</code> (strukturyzowane)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Exchange-Traded Certificate</em> to rodzina produktów, w których bank „pakuje” w papier wartościowy określony profil wypłaty. Najważniejsze typy:</p>" +
            "<ul>" +
              "<li><strong>Tracker</strong> — odwzorowuje bazę 1:1 (delta-one), podobnie jak <a href='#/i/exchange-traded-note'>ETN</a>.</li>" +
              "<li><strong>Bonus / discount / express</strong> — wypłata zależna od barier i poziomów; wbudowane opcje.</li>" +
              "<li><strong>Turbo / knock-out (mini-future)</strong> — dźwignia: cena ≈ (kurs bazy − poziom finansowania) × parytet. Gdy kurs dotknie bariery (knock-out), certyfikat wygasa, zwykle prawie bez wartości.</li>" +
              "<li><strong>Factor</strong> — stała dzienna dźwignia (np. 5×), codziennie rebalansowana.</li>" +
            "</ul>" +
            "<p class='formula'>Cena turbo long ≈ (kurs bazy − poziom finansowania) × parytet</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Emisja.</strong> Bank emituje serię certyfikatów i zabezpiecza ryzyko na rynku.</li>" +
              "<li><strong>Obrót.</strong> Market maker emitenta kwotuje ceny w godzinach giełdy.</li>" +
              "<li><strong>W trakcie.</strong> Wartość zmienia się z bazą według formuły; w turbo poziom finansowania i bariera są codziennie korygowane o koszt finansowania.</li>" +
              "<li><strong>Zdarzenie bariery.</strong> Dla turbo — natychmiastowe wygaśnięcie i ewentualna wypłata wartości resztkowej.</li>" +
              "<li><strong>Wykup</strong> w terminie lub wypowiedzenie przez emitenta (open end).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy — turbo long na indeks",
          html:
            "<p>Fundusz (NAV 200 mln EUR) kupuje 100 000 certyfikatów turbo long na indeks DAX: poziom finansowania i bariera 18 000 pkt, parytet 0,01, DAX = 19 000 pkt, cena certyfikatu 10,20 EUR.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Wartość wewnętrzna certyfikatu</td><td>(19 000 − 18 000) × 0,01</td><td class='num'>10,00 EUR</td></tr>" +
              "<tr><td>Wartość pozycji (zainwestowane)</td><td>100 000 × 10,20</td><td class='num'>1 020 000 EUR (0,51% NAV)</td></tr>" +
              "<tr><td>Ekspozycja na indeks</td><td>100 000 × 0,01 × 19 000</td><td class='num'>19 000 000 EUR (9,5% NAV)</td></tr>" +
              "<tr><td>Dźwignia</td><td>19 000 × 0,01 / 10,20</td><td class='num'>≈ 18,6×</td></tr>" +
              "<tr><td>DAX spada o 5,3% do 18 000</td><td>bariera — knock-out</td><td class='num'>strata ≈ 100%</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Pozycja „kosztuje” tylko 0,51% NAV, ale daje ekspozycję 9,5% NAV — wbudowany derywat trzeba wliczyć do <strong>ekspozycji całkowitej</strong>.</li>" +
              "<li>Emitent certyfikatu (bank): 0,51% NAV w limitach emitenta i w limicie łącznym 20%.</li>" +
              "<li>Bariera to element egzotyczny — przy istotnym udziale takich produktów metoda zaangażowania może nie wystarczać (VaR).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> kurs giełdowy (cena kupna market makera); kontrola zgodności z formułą i bazą.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko bazy z dźwignią</strong> — duże zmiany procentowe.</li>" +
              "<li><strong>Ryzyko bariery</strong> — natychmiastowa utrata wartości (także przy lukach cenowych).</li>" +
              "<li><strong>Ryzyko kredytowe emitenta</strong>.</li>" +
              "<li><strong>Koszt finansowania</strong> w turbo i <strong>efekt rebalansowania</strong> w factor.</li>" +
              "<li><strong>Ryzyko płynności</strong> — jeden market maker.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zakup na giełdzie, rozliczenie DvP.</li>" +
              "<li>Codzienne korekty parametrów (turbo, factor), zdarzenia barier.</li>" +
              "<li>Wykup, knock-out albo wypowiedzenie przez emitenta.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Zbywalny papier z wbudowanym derywatem <span class='law'>art. 2 i 10 dyr. 2007/16/WE; art. 51 ust. 3 akapit 4</span></h4><p>Certyfikaty notowane spełniające kryteria to zbywalne papiery. Jeśli wypłata nie jest liniowa (dźwignia, bariery, ochrona), zawierają derywat: baza musi być dopuszczalna, a ekspozycję liczy się do global exposure.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>CESR/10-788</span></h4><p>Ekwiwalent instrumentu bazowego (liczba jednostek bazy × kurs × delta). Produkty z barierą lub złożone — ocena, czy wymagana jest metoda VaR.</p></div>" +
              "<div class='rule'><h4>Limity emitenta i bazy <span class='law'>art. 52</span></h4><p>Emitent certyfikatu (bank) — 5/10/40 i 20%. Baza — look-through dla pojedynczych akcji; indeksy finansowe bez look-through.</p></div>" +
              "<div class='rule'><h4>Ograniczona strata</h4><p>Inwestor nie może stracić więcej niż zapłacił — warunek zbywalnego papieru jest spełniony.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik I i II rozp. 231/2013</span>: produkty z wbudowaną dźwignią przelicza się na ekwiwalent bazy.</li>" +
              "<li>Limity produktów strukturyzowanych — według dokumentów AIF.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — raporty transakcyjne po stronie firmy inwestycyjnej.</li>" +
              "<li>Brak raportowania EMIR (papier wartościowy).</li>" +
              "<li><strong>SSR</strong> — certyfikaty short na akcje tworzą pozycję krótką netto.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> (często <code>DE…</code>, <code>CH…</code>), w Niemczech także WKN; <strong>LEI emitenta</strong>.</li>" +
              "<li><strong>CFI</strong> — zależnie od produktu (np. <code>RF</code> dla mini-futures i certyfikatów o stałej dźwigni).</li>" +
              "<li>Identyfikator instrumentu bazowego — do look-through.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Rodzaj certyfikatu i czy zawiera wbudowany derywat.</li>" +
              "<li>Dopuszczalność bazy; look-through do emitentów bazowych.</li>" +
              "<li>Ekspozycja całkowita (ekwiwalent bazy), ocena metody przy barierach.</li>" +
              "<li>Limit emitenta certyfikatu i limit łączny z bankiem.</li>" +
              "<li>Monitoring barier i zdarzeń knock-out.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Financing level", "Poziom finansowania turbo — „cena wykonania” zwiększana o koszt finansowania."],
        ["Knock-out", "Natychmiastowe wygaśnięcie certyfikatu po osiągnięciu bariery."],
        ["Factor certificate", "Certyfikat o stałej dziennej dźwigni, codziennie rebalansowany."],
        ["WKN", "Wertpapierkennnummer — niemiecki numer identyfikacyjny papieru."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A structured certificate is a listed bank debt security whose payout depends on an underlying according to a set formula: 1:1 (tracker), with leverage and a barrier (turbo, knock-out), or with protection or a capped return (bonus, discount). Like a warrant it carries issuer credit risk, and the embedded derivative must be captured in controls.",
      keyFacts: [
        ["Issuer", "Bank (or its guaranteed issuance vehicle)."],
        ["Market", "Structured product exchanges (e.g. Börse Stuttgart, Börse Frankfurt, SIX, Warsaw Stock Exchange); issuer's market maker."],
        ["Types", "Tracker (1:1), bonus, discount, express, turbo / knock-out, factor (constant leverage), capital-protected products."],
        ["Maturity", "Fixed or open-ended; a turbo terminates immediately when the barrier is breached."],
        ["Settlement", "Bought like a security (EU T+2); redemption usually in cash."],
        ["Issuer risk", "Yes — an unsecured bank obligation."],
        ["CFI code", "Depending on product: e.g. <code>RF****</code> (mini-futures / constant leverage certificates) or category <code>D</code> (structured)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>An Exchange-Traded Certificate is a family of products in which a bank \"packages\" a specific payout profile into a security. Main types:</p>" +
            "<ul>" +
              "<li><strong>Tracker</strong> — tracks the underlying 1:1 (delta-one), similar to an <a href='#/i/exchange-traded-note'>ETN</a>.</li>" +
              "<li><strong>Bonus / discount / express</strong> — payout depends on barriers and levels; embedded options.</li>" +
              "<li><strong>Turbo / knock-out (mini-future)</strong> — leverage: price ≈ (underlying − financing level) × ratio. When the underlying touches the barrier (knock-out), the certificate terminates, usually nearly worthless.</li>" +
              "<li><strong>Factor</strong> — constant daily leverage (e.g. 5×), rebalanced daily.</li>" +
            "</ul>" +
            "<p class='formula'>Turbo long price ≈ (underlying − financing level) × ratio</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Issuance.</strong> The bank issues a series of certificates and hedges in the market.</li>" +
              "<li><strong>Trading.</strong> The issuer's market maker quotes prices during exchange hours.</li>" +
              "<li><strong>During the life.</strong> Value moves with the underlying per the formula; in a turbo the financing level and barrier are adjusted daily for the financing cost.</li>" +
              "<li><strong>Barrier event.</strong> For a turbo — immediate termination and payment of any residual value.</li>" +
              "<li><strong>Redemption</strong> at maturity or on issuer termination (open end).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example — index turbo long",
          html:
            "<p>A fund (NAV EUR 200m) buys 100,000 turbo long certificates on the DAX index: financing level and barrier 18,000 points, ratio 0.01, DAX = 19,000 points, certificate price EUR 10.20.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>Certificate intrinsic value</td><td>(19,000 − 18,000) × 0.01</td><td class='num'>EUR 10.00</td></tr>" +
              "<tr><td>Position value (invested)</td><td>100,000 × 10.20</td><td class='num'>EUR 1,020,000 (0.51% of NAV)</td></tr>" +
              "<tr><td>Index exposure</td><td>100,000 × 0.01 × 19,000</td><td class='num'>EUR 19,000,000 (9.5% of NAV)</td></tr>" +
              "<tr><td>Leverage</td><td>19,000 × 0.01 / 10.20</td><td class='num'>≈ 18.6×</td></tr>" +
              "<tr><td>DAX falls 5.3% to 18,000</td><td>barrier — knock-out</td><td class='num'>loss ≈ 100%</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>The position \"costs\" only 0.51% of NAV but gives 9.5% of NAV exposure — the embedded derivative must be included in <strong>global exposure</strong>.</li>" +
              "<li>Certificate issuer (bank): 0.51% of NAV within issuer limits and the 20% combined limit.</li>" +
              "<li>The barrier is an exotic feature — with a significant share of such products the commitment approach may not suffice (VaR).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> exchange price (market maker's bid); check consistency with the formula and the underlying.</p>" +
            "<ul>" +
              "<li><strong>Leveraged underlying risk</strong> — large percentage moves.</li>" +
              "<li><strong>Barrier risk</strong> — immediate loss of value (including on price gaps).</li>" +
              "<li><strong>Issuer credit risk</strong>.</li>" +
              "<li><strong>Financing cost</strong> in turbos and the <strong>rebalancing effect</strong> in factor certificates.</li>" +
              "<li><strong>Liquidity risk</strong> — a single market maker.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Purchase on the exchange, DvP settlement.</li>" +
              "<li>Daily parameter adjustments (turbo, factor), barrier events.</li>" +
              "<li>Redemption, knock-out or issuer termination.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Transferable security with an embedded derivative <span class='law'>Art. 2 and 10 Dir. 2007/16/EC; Art. 51(3), fourth subpara.</span></h4><p>Listed certificates meeting the criteria are transferable securities. If the payout is not linear (leverage, barriers, protection), they embed a derivative: the underlying must be eligible, and exposure counts towards global exposure.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Underlying equivalent (units of underlying × price × delta). Barrier or complex products — assess whether VaR is required.</p></div>" +
              "<div class='rule'><h4>Issuer and underlying limits <span class='law'>Art. 52</span></h4><p>Certificate issuer (bank) — 5/10/40 and 20%. Underlying — look-through for single stocks; financial indices not looked through.</p></div>" +
              "<div class='rule'><h4>Limited loss</h4><p>The investor cannot lose more than it paid — the transferable security condition is met.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annexes I and II Reg. 231/2013</span>: products with embedded leverage are converted into the underlying equivalent.</li>" +
              "<li>Structured product limits — per the AIF's documents.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — transaction reports by the investment firm.</li>" +
              "<li>No EMIR reporting (a security).</li>" +
              "<li><strong>SSR</strong> — short certificates on shares create a net short position.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> (often <code>DE…</code>, <code>CH…</code>), in Germany also WKN; <strong>issuer LEI</strong>.</li>" +
              "<li><strong>CFI</strong> — depending on product (e.g. <code>RF</code> for mini-futures and constant leverage certificates).</li>" +
              "<li>Underlying identifier — for look-through.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Certificate type and whether it embeds a derivative.</li>" +
              "<li>Underlying eligibility; look-through to underlying issuers.</li>" +
              "<li>Global exposure (underlying equivalent), method assessment for barriers.</li>" +
              "<li>Certificate issuer limit and combined limit with the bank.</li>" +
              "<li>Monitoring of barriers and knock-out events.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Financing level", "A turbo's financing level — the \"strike\" increased by the financing cost."],
        ["Knock-out", "Immediate termination of the certificate when the barrier is reached."],
        ["Factor certificate", "Certificate with constant daily leverage, rebalanced daily."],
        ["WKN", "Wertpapierkennnummer — German security identification number."]
      ]
    }
  }
});

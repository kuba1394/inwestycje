window.INSTRUMENTS.push({
  id: "exchange-traded-note",
  name: "Exchange-Traded Note (ETN)",
  aliases: ["ETN", "Exchange-Traded Product", "ETP"],
  market: "exchange",
  asset: { pl: "Dłużne / strukturyzowane", en: "Debt / structured" },
  sources: ["ucits", "eligible", "cesr10788", "aifmd", "csdrT1"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "ETN to notowana na giełdzie, zwykle niezabezpieczona obligacja banku, której wartość jest powiązana z wynikiem indeksu lub innego instrumentu bazowego (minus opłata). Zachowuje się jak ETF, ale nie jest funduszem: posiadacz nie ma żadnych aktywów na własność, tylko roszczenie wobec emitenta.",
      keyFacts: [
        ["Emitent", "Bank lub pojazd emisyjny banku (często z gwarancją banku)."],
        ["Zabezpieczenie", "Zwykle brak — pełne ryzyko kredytowe emitenta (istnieją wersje zabezpieczone)."],
        ["Instrument bazowy", "Indeksy akcji, towarów, zmienności, walut, strategii; także z dźwignią lub odwrotne."],
        ["Rynek", "Giełda (segment ETP), market maker emitenta."],
        ["Rozliczenie", "Jak papiery dłużne/akcje na danym rynku (UE: T+2, od 11.10.2027 T+1)."],
        ["Termin", "Zwykle długi lub nieokreślony; emitent może mieć prawo wcześniejszego wykupu."],
        ["Kod CFI", "Kategoria <code>D</code> (Debt); grupa zależna od struktury i dostawcy danych"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Exchange-Traded Note</em> to obligacja, której kwota wykupu i bieżąca wartość zależą od instrumentu bazowego, np.:</p>" +
            "<p class='formula'>Wartość ETN ≈ wartość początkowa × (indeks dziś / indeks na starcie) − narosłe opłaty</p>" +
            "<p>Różnica względem <a href='#/i/exchange-traded-fund'>ETF</a>:</p>" +
            "<ul>" +
              "<li>ETF to fundusz z wydzielonymi aktywami — upadłość zarządzającego nie dotyka portfela;</li>" +
              "<li>ETN to dług emitenta — upadłość emitenta oznacza, że posiadacz staje się jego wierzycielem.</li>" +
            "</ul>" +
            "<p>ETN dają dostęp do ekspozycji niedostępnych w ETF UCITS (np. pojedyncze towary, zmienność, dźwignia), dlatego dla UCITS kluczowe jest sprawdzenie dopuszczalności.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Emisja.</strong> Bank emituje ETN w ramach programu i wprowadza go do obrotu; sam zabezpiecza ryzyko indeksu na rynku.</li>" +
              "<li><strong>Obrót.</strong> Market maker emitenta kwotuje ceny blisko wartości wskaźnikowej (indicative value).</li>" +
              "<li><strong>Tworzenie i umarzanie</strong> — przez emitenta, zwykle tylko z uprawnionymi uczestnikami.</li>" +
              "<li><strong>Wykup.</strong> W terminie, na żądanie emitenta (call) lub posiadacza (w dużych blokach), według wartości indeksu.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz UCITS (NAV 200 mln EUR) kupuje ETN banku N śledzący indeks towarowy 1:1, za 4 mln EUR. Fundusz ma też w banku N lokatę 8 mln EUR i ekspozycję z derywatów OTC 2 mln EUR.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Test</th><th>Obliczenie</th><th class='num'>% NAV</th><th>Limit</th></tr></thead><tbody>" +
              "<tr><td>Papiery banku N (ETN)</td><td>4 / 200</td><td class='num'>2,0%</td><td>5/10/40</td></tr>" +
              "<tr><td>Łącznie z bankiem N</td><td>(4 + 8 + 2) / 200</td><td class='num'>7,0%</td><td>≤ 20% (art. 52 ust. 2)</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Emitentem jest <strong>bank N</strong> — ekspozycję sumuje się z depozytami i derywatami OTC z tym bankiem.</li>" +
              "<li>ETN 1:1 bez wbudowanego derywatu to zbywalny papier wartościowy (art. 2 ust. 2 dyr. 2007/16/WE) — dopuszczalny, nawet jeśli bazą są towary.</li>" +
              "<li>Gdyby to był <strong>ETN z dźwignią 2×</strong>, zawierałby wbudowany derywat: ekspozycja całkowita = 2 × 4 mln = 8 mln EUR, a instrument bazowy musiałby być dopuszczalny dla derywatów (np. indeks finansowy, nie pojedynczy towar).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> kurs giełdowy; kontrola odchylenia od wartości wskaźnikowej.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko kredytowe emitenta</strong> — kluczowe; wzrost spreadu banku może obniżyć cenę ETN.</li>" +
              "<li><strong>Ryzyko instrumentu bazowego</strong>.</li>" +
              "<li><strong>Ryzyko wcześniejszego wykupu</strong> przez emitenta (np. przy dużej stracie indeksu lub zmianie przepisów).</li>" +
              "<li><strong>Ryzyko płynności</strong> — zależność od market makera emitenta.</li>" +
              "<li><strong>Produkty z dźwignią</strong> — efekt codziennego rebalansowania (wynik w dłuższym okresie inny niż wielokrotność indeksu).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zakup na giełdzie, rozliczenie DvP.</li>" +
              "<li>Opłaty potrącane z wartości; zdarzenia: zmiana indeksu, call emitenta, zawieszenie emisji nowych jednostek.</li>" +
              "<li>Sprzedaż lub wykup.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Zbywalny papier <span class='law'>art. 2 ust. 2 dyr. 2007/16/WE</span></h4><p>Instrumenty powiązane z wynikiem innych aktywów (także spoza art. 50 ust. 1, np. towarów) mogą być zbywalnymi papierami wartościowymi, jeśli spełniają kryteria z art. 2 ust. 1 i nie zawierają wbudowanego derywatu.</p></div>" +
              "<div class='rule'><h4>Wbudowany derywat <span class='law'>art. 10 dyr. 2007/16/WE; art. 51 ust. 3</span></h4><p>ETN z dźwignią, ochroną kapitału lub inną nieliniowością zawiera derywat. Wtedy instrument bazowy musi być dopuszczalny dla derywatów, a ekspozycję liczy się do global exposure.</p></div>" +
              "<div class='rule'><h4>Brak dostawy fizycznej</h4><p>Instrument nie może prowadzić do dostawy aktywów niedopuszczalnych (np. towarów).</p></div>" +
              "<div class='rule'><h4>Limity emitenta <span class='law'>art. 52</span></h4><p>Emitent ETN (bank i jego grupa): 5/10/40 i 20% łącznie z depozytami i OTC.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Dźwignia: ETN z dźwignią przelicza się na ekwiwalent instrumentu bazowego.</li>" +
              "<li>Limity emitenta i klas aktywów według dokumentów AIF.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — raporty transakcyjne po stronie firmy inwestycyjnej.</li>" +
              "<li>Brak raportowania EMIR (papier wartościowy, nie kontrakt derywatowy).</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> ETN, <strong>LEI emitenta i gwaranta</strong>.</li>" +
              "<li><strong>CFI</strong> — kategoria <code>D</code> (Debt); grupa zależna od struktury.</li>" +
              "<li>Identyfikator instrumentu bazowego (indeks) — do oceny dopuszczalności.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>ETN vs ETF — poprawna klasyfikacja w systemie (dług, nie fundusz).</li>" +
              "<li>Czy jest wbudowany derywat (dźwignia, odwrotność, ochrona)? Jeśli tak — dopuszczalność bazy i global exposure.</li>" +
              "<li>Limity emitenta i limit łączny 20% z bankiem.</li>" +
              "<li>Brak możliwości dostawy fizycznej niedopuszczalnych aktywów.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["ETP", "Exchange-Traded Product — ogólna nazwa ETF, ETN i ETC."],
        ["Indicative value", "Bieżąca wartość wskaźnikowa ETN na podstawie instrumentu bazowego i opłat."],
        ["Delta-one", "Instrument odwzorowujący bazę 1:1, bez dźwigni i opcjonalności."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An ETN is an exchange-listed, usually unsecured bank bond whose value is linked to the performance of an index or other underlying (less a fee). It behaves like an ETF but is not a fund: the holder owns no assets, only a claim on the issuer.",
      keyFacts: [
        ["Issuer", "A bank or the bank's issuance vehicle (often with a bank guarantee)."],
        ["Collateral", "Usually none — full issuer credit risk (collateralised versions exist)."],
        ["Underlying", "Equity, commodity, volatility, currency, strategy indices; also leveraged or inverse."],
        ["Market", "Exchange (ETP segment), issuer's market maker."],
        ["Settlement", "As for debt securities/shares in that market (EU: T+2, T+1 from 11 Oct 2027)."],
        ["Maturity", "Usually long or open-ended; the issuer may have an early redemption right."],
        ["CFI code", "Category <code>D</code> (Debt); group depends on structure and data vendor"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>An Exchange-Traded Note is a bond whose redemption amount and current value depend on an underlying, for example:</p>" +
            "<p class='formula'>ETN value ≈ initial value × (index today / index at start) − accrued fees</p>" +
            "<p>Difference from an <a href='#/i/exchange-traded-fund'>ETF</a>:</p>" +
            "<ul>" +
              "<li>an ETF is a fund with segregated assets — the manager's insolvency does not touch the portfolio;</li>" +
              "<li>an ETN is the issuer's debt — if the issuer fails, the holder becomes its creditor.</li>" +
            "</ul>" +
            "<p>ETNs give access to exposures unavailable in UCITS ETFs (e.g. single commodities, volatility, leverage), so for UCITS the key step is checking eligibility.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Issuance.</strong> The bank issues the ETN under a programme and lists it; it hedges the index risk in the market itself.</li>" +
              "<li><strong>Trading.</strong> The issuer's market maker quotes prices close to the indicative value.</li>" +
              "<li><strong>Creation and redemption</strong> — through the issuer, usually only with authorised participants.</li>" +
              "<li><strong>Redemption.</strong> At maturity, at the issuer's option (call) or the holder's (in large blocks), at the index value.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A UCITS fund (NAV EUR 200m) buys EUR 4m of a bank N ETN tracking a commodity index 1:1. The fund also has an EUR 8m deposit with bank N and EUR 2m of OTC derivative exposure to it.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Test</th><th>Calculation</th><th class='num'>% of NAV</th><th>Limit</th></tr></thead><tbody>" +
              "<tr><td>Bank N securities (ETN)</td><td>4 / 200</td><td class='num'>2.0%</td><td>5/10/40</td></tr>" +
              "<tr><td>Total with bank N</td><td>(4 + 8 + 2) / 200</td><td class='num'>7.0%</td><td>≤ 20% (Art. 52(2))</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>The issuer is <strong>bank N</strong> — exposure is aggregated with deposits and OTC derivatives with that bank.</li>" +
              "<li>A 1:1 ETN without an embedded derivative is a transferable security (Art. 2(2) Dir. 2007/16/EC) — eligible even if the underlying is commodities.</li>" +
              "<li>A <strong>2× leveraged ETN</strong> would embed a derivative: global exposure = 2 × 4m = EUR 8m, and the underlying would have to be eligible for derivatives (e.g. a financial index, not a single commodity).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> exchange price; check deviations from the indicative value.</p>" +
            "<ul>" +
              "<li><strong>Issuer credit risk</strong> — key; a wider bank spread can lower the ETN price.</li>" +
              "<li><strong>Underlying risk</strong>.</li>" +
              "<li><strong>Early redemption risk</strong> by the issuer (e.g. after a large index loss or regulatory change).</li>" +
              "<li><strong>Liquidity risk</strong> — dependence on the issuer's market maker.</li>" +
              "<li><strong>Leveraged products</strong> — daily rebalancing effect (long-term result differs from a multiple of the index).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Purchase on the exchange, DvP settlement.</li>" +
              "<li>Fees deducted from value; events: index change, issuer call, suspension of new issuance.</li>" +
              "<li>Sale or redemption.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Transferable security <span class='law'>Art. 2(2) Dir. 2007/16/EC</span></h4><p>Instruments linked to the performance of other assets (including those outside Art. 50(1), e.g. commodities) may be transferable securities if they meet the Art. 2(1) criteria and do not embed a derivative.</p></div>" +
              "<div class='rule'><h4>Embedded derivative <span class='law'>Art. 10 Dir. 2007/16/EC; Art. 51(3)</span></h4><p>An ETN with leverage, capital protection or other non-linearity embeds a derivative. Its underlying must then be eligible for derivatives, and exposure counts towards global exposure.</p></div>" +
              "<div class='rule'><h4>No physical delivery</h4><p>The instrument must not lead to delivery of ineligible assets (e.g. commodities).</p></div>" +
              "<div class='rule'><h4>Issuer limits <span class='law'>Art. 52</span></h4><p>ETN issuer (bank and its group): 5/10/40 and 20% combined with deposits and OTC.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Leverage: a leveraged ETN is converted into the underlying equivalent.</li>" +
              "<li>Issuer and asset class limits per the AIF's documents.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — transaction reports by the investment firm.</li>" +
              "<li>No EMIR reporting (a security, not a derivative contract).</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li>ETN <strong>ISIN</strong>, <strong>issuer and guarantor LEI</strong>.</li>" +
              "<li><strong>CFI</strong> — category <code>D</code> (Debt); group depends on the structure.</li>" +
              "<li>Underlying (index) identifier — for eligibility assessment.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>ETN vs ETF — correct classification in the system (debt, not a fund).</li>" +
              "<li>Is there an embedded derivative (leverage, inverse, protection)? If so — underlying eligibility and global exposure.</li>" +
              "<li>Issuer limits and the 20% combined limit with the bank.</li>" +
              "<li>No possibility of physical delivery of ineligible assets.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["ETP", "Exchange-Traded Product — umbrella term for ETFs, ETNs and ETCs."],
        ["Indicative value", "Current ETN value based on the underlying and fees."],
        ["Delta-one", "Instrument tracking the underlying 1:1, without leverage or optionality."]
      ]
    }
  }
});

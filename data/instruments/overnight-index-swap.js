window.INSTRUMENTS.push({
  id: "overnight-index-swap",
  name: "Overnight Index Swap",
  aliases: ["OIS", "€STR swap", "SOFR swap", "SONIA swap"],
  market: "otc",
  asset: { pl: "Derywaty stopy procentowej", en: "Interest rate derivatives" },
  sources: ["ucits", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "marginRts", "bmr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Overnight Index Swap to swap procentowy, w którym noga zmienna opiera się na stopie overnight (np. €STR, SOFR, SONIA) składanej dzień po dniu przez cały okres odsetkowy. Strony wymieniają stałą stopę na faktycznie zrealizowany koszt pieniądza overnight.",
      keyFacts: [
        ["Rynek", "OTC — w dużej części rozliczane przez CCP (LCH, Eurex Clearing, CME)."],
        ["Dokumentacja", "ISDA Master Agreement + CSA; dla rozliczanych centralnie — regulamin CCP i umowa z clearing brokerem."],
        ["Noga zmienna", "Stopa overnight składana za okres (compounded in arrears) — znana dopiero na końcu okresu."],
        ["Płatności", "Do 1 roku zwykle jedna płatność przy zapadalności; dłuższe — zwykle rocznie."],
        ["Stopy referencyjne (RFR)", "€STR (EUR), SOFR (USD), SONIA (GBP), SARON (CHF), TONA (JPY)."],
        ["Wymiana nominału", "Nie."],
        ["Kod CFI", "<code>SR****</code> (Swaps – Rates)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Overnight Index Swap</em> (OIS) to odmiana <a href='#/i/interest-rate-swap'>Interest Rate Swap</a>. Noga stała wygląda tak samo, ale noga zmienna nie jest ustalana z góry (jak EURIBOR 6M). Odsetki liczy się ze <strong>stopy overnight</strong> obowiązującej każdego dnia okresu, składanej jak na lokacie odnawianej codziennie.</p>" +
            "<p>Stopy overnight (RFR — <em>risk-free rates</em>) opierają się na rzeczywistych transakcjach z jednego dnia i prawie nie zawierają premii za ryzyko kredytowe banków. Po reformie wskaźników (wygaszenie LIBOR) OIS stały się głównym instrumentem rynku stóp procentowych, a krzywa OIS — podstawową krzywą dyskontową dla zabezpieczonych derywatów.</p>" +
            "<p>Fundusze używają OIS do zabezpieczania lub zajmowania pozycji na krótkim końcu krzywej (oczekiwania co do decyzji banku centralnego) oraz jako tańszej i bardziej płynnej alternatywy dla IRS opartych na IBOR.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Strony ustalają nominał, okres, stałą stopę (OIS rate), stopę overnight i konwencje (np. ACT/360 dla €STR, przesunięcie płatności o 2 dni robocze).</li>" +
              "<li><strong>Codzienne obserwacje.</strong> Przez cały okres odsetkowy publikowana jest stopa overnight. W dni wolne obowiązuje stopa z ostatniego dnia roboczego, np. piątkowa stopa liczy się za 3 dni.</li>" +
              "<li><strong>Składanie.</strong> Na końcu okresu oblicza się skumulowaną stopę:" +
                "<p class='formula'>R = [ ∏ (1 + r<sub>i</sub> × n<sub>i</sub>/360) − 1 ] × 360/d</p>" +
                "r<sub>i</sub> — stopa z dnia i, n<sub>i</sub> — liczba dni kalendarzowych, przez które obowiązuje, d — długość okresu w dniach.</li>" +
              "<li><strong>Płatność netto.</strong> Nominał × (stopa stała − R) × d/360, płacona przez stronę, której noga jest wyższa. Płatność następuje zwykle 1–2 dni robocze po końcu okresu, żeby był czas na ustalenie kwoty.</li>" +
              "<li><strong>Wycena i zabezpieczenia.</strong> Codzienna wycena MtM; VM (i IM) z CCP lub według CSA.</li>" +
            "</ol>" +
            "<div class='callout'><strong>Różnica względem IRS na IBOR</strong>W IRS na EURIBOR kwotę odsetek zmiennych znasz na początku okresu. W OIS znasz ją dopiero na końcu, bo zależy od zrealizowanych stóp overnight.</div>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz (NAV 200 mln EUR) spodziewa się obniżek stóp przez EBC. Zawiera 3-miesięczny OIS (91 dni) na nominał 10 mln EUR: <strong>otrzymuje stałą 2,00%</strong>, <strong>płaci €STR składany</strong>.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Noga stała — fundusz otrzymuje</td><td>10 000 000 × 2,00% × 91/360</td><td class='num'>50 555,56 EUR</td></tr>" +
              "<tr><td>€STR składany zrealizowany za okres (po obniżce w trakcie okresu)</td><td>—</td><td class='num'>1,95%</td></tr>" +
              "<tr><td>Noga zmienna — fundusz płaci</td><td>10 000 000 × 1,95% × 91/360</td><td class='num'>49 291,67 EUR</td></tr>" +
              "<tr><td>Płatność netto na rzecz funduszu</td><td>50 555,56 − 49 291,67</td><td class='num'>+1 263,89 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<p>Fundusz zarobił, bo średni zrealizowany koszt pieniądza overnight okazał się niższy niż stopa zablokowana w dniu zawarcia.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<p>Ekspozycja w metodzie zaangażowania: nominał 10 mln EUR = 5% NAV (można stosować zasady kompensowania duration). Jeśli OIS rozliczono przez CCP autoryzowaną lub uznaną wg EMIR, nie wlicza się go do limitu kontrahenta UCITS (po zmianach EMIR 3). Zostaje jednak monitorowanie depozytów u brokera rozliczeniowego.</p>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> krzywa OIS danej waluty służy zarówno do prognozowania, jak i do dyskontowania. Dla bieżącego okresu część stawki jest już znana (zrealizowane dni), a reszta wynika z krzywej.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — szczególnie wrażliwość na decyzje banku centralnego (daty posiedzeń).</li>" +
              "<li><strong>Ryzyko kontrahenta</strong> — dla transakcji bilateralnych; w CCP ograniczone do brokera i izby.</li>" +
              "<li><strong>Ryzyko płynności</strong> — dopłaty VM w gotówce.</li>" +
              "<li><strong>Ryzyko operacyjne</strong> — poprawność obliczeń składania, dni wolnych i przesunięć płatności.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie (często na platformie), potwierdzenie, przekazanie do CCP, jeśli dotyczy.</li>" +
              "<li>Codzienne obserwacje stopy overnight i codzienna wycena, VM.</li>" +
              "<li>Na końcu okresu: obliczenie stawki składanej i płatność netto.</li>" +
              "<li>Zapadalność, unwind albo kompresja.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywat OTC na stopy procentowe. Kontrahent pod nadzorem, codzienna niezależna wycena, możliwość zamknięcia po wartości godziwej.</p></div>" +
              "<div class='rule'><h4>Limit kontrahenta <span class='law'>art. 52 ust. 1 (po dyr. 2024/2994)</span></h4><p>10% NAV (instytucja kredytowa) lub 5% NAV — tylko dla transakcji nierozliczanych przez CCP autoryzowaną lub uznaną wg EMIR.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>art. 51 ust. 3; CESR/10-788</span></h4><p>Zaangażowanie = nominał. Duration netting według wytycznych dla portfeli stopy procentowej.</p></div>" +
              "<div class='rule'><h4>Zabezpieczenia <span class='law'>ESMA/2014/937</span></h4><p>Zabezpieczenie otrzymane przy swapach bilateralnych musi spełniać kryteria wytycznych, żeby można je odjąć od ekspozycji.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>art. 7–8 rozp. 231/2013</span>: nominał w metodzie brutto; w metodzie zaangażowania możliwe kompensowanie i duration netting na warunkach rozporządzenia.</li>" +
              "<li>Limity kontrahenta i ekspozycji wynikają z dokumentów AIF; wycena zgodnie z art. 19 AIFMD.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, zabezpieczenia, raportowanie",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Obowiązek rozliczania <span class='law'>art. 4 EMIR</span></h4><p>OIS w głównych walutach (m.in. EUR, USD, GBP) w określonych tenorach podlegają obowiązkowi rozliczania przez CCP dla kontrahentów powyżej progów. Zakres klas był rozszerzany wraz z przejściem rynku na stopy RFR — sprawdzaj aktualny rejestr ESMA.</p></div>" +
              "<div class='rule'><h4>Nierozliczane centralnie <span class='law'>art. 11 EMIR; rozp. 2016/2251</span></h4><p>Potwierdzenie, uzgadnianie portfela, VM między FC, IM powyżej progu AANA 8 mld EUR.</p></div>" +
              "<div class='rule'><h4>Raportowanie <span class='law'>art. 9 EMIR</span></h4><p>Do T+1 (UTI, UPI, LEI, nominał, stopa stała, indeks zmienny, wycena, zabezpieczenia). Odpowiada spółka zarządzająca lub ZAFI.</p></div>" +
              "<div class='rule'><h4>Wskaźnik <span class='law'>BMR</span></h4><p>€STR jest administrowany przez EBC, a banki centralne są wyłączone z zakresu BMR. Pozostałe RFR — sprawdź status administratora.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), <strong>ISIN OTC</strong> dla instrumentów notowanych na platformach.</li>" +
              "<li><strong>CFI</strong> — <code>S</code> (Swaps), grupa <code>R</code> (Rates); atrybut instrumentu bazowego wskazuje OIS.</li>" +
              "<li><strong>LEI</strong> kontrahenta lub CCP.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Status clearingu i zgodność z obowiązkiem rozliczania.</li>" +
              "<li>Limit kontrahenta dla transakcji bilateralnych, limit łączny 20%.</li>" +
              "<li>Ekspozycja całkowita, dźwignia AIF.</li>" +
              "<li>Uzgodnienie płatności netto z kontrahentem lub CCP (obliczenie stawki składanej).</li>" +
              "<li>Raport EMIR do T+1.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["RFR (Risk-Free Rate)", "Stopa overnight oparta na rzeczywistych transakcjach, np. €STR, SOFR, SONIA."],
        ["Compounded in arrears", "Stopa składana z obserwacji dziennych, znana dopiero na koniec okresu."],
        ["Payment lag", "Przesunięcie płatności o kilka dni po końcu okresu, aby można było ją obliczyć."],
        ["OIS discounting", "Dyskontowanie przepływów zabezpieczonych derywatów krzywą OIS."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An Overnight Index Swap is an interest rate swap whose floating leg is an overnight rate (e.g. €STR, SOFR, SONIA) compounded day by day over the interest period. The parties exchange a fixed rate for the actual realised cost of overnight money.",
      keyFacts: [
        ["Market", "OTC — largely cleared through CCPs (LCH, Eurex Clearing, CME)."],
        ["Documentation", "ISDA Master Agreement + CSA; for cleared trades — CCP rulebook and clearing broker agreement."],
        ["Floating leg", "Overnight rate compounded over the period (compounded in arrears) — known only at period end."],
        ["Payments", "Up to 1 year usually a single payment at maturity; longer — usually annual."],
        ["Reference rates (RFR)", "€STR (EUR), SOFR (USD), SONIA (GBP), SARON (CHF), TONA (JPY)."],
        ["Notional exchange", "No."],
        ["CFI code", "<code>SR****</code> (Swaps – Rates)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>An Overnight Index Swap (OIS) is a variant of the <a href='#/i/interest-rate-swap'>Interest Rate Swap</a>. The fixed leg is the same, but the floating leg is not set in advance (like 6M EURIBOR). Interest is computed from the <strong>overnight rate</strong> for each day of the period, compounded as if on a deposit rolled daily.</p>" +
            "<p>Overnight rates (RFRs — risk-free rates) are based on actual one-day transactions and contain almost no bank credit risk premium. After benchmark reform (the end of LIBOR), OIS became the core instrument of the rates market, and the OIS curve the standard discount curve for collateralised derivatives.</p>" +
            "<p>Funds use OIS to hedge or take positions at the short end of the curve (central bank expectations), and as a cheaper, more liquid alternative to IBOR-based IRS.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> The parties agree the notional, term, fixed rate (OIS rate), overnight index and conventions (e.g. ACT/360 for €STR, 2-business-day payment lag).</li>" +
              "<li><strong>Daily observations.</strong> The overnight rate is published throughout the interest period. On non-business days the last business day's rate applies, so e.g. Friday's rate counts for 3 days.</li>" +
              "<li><strong>Compounding.</strong> At period end the compounded rate is computed:" +
                "<p class='formula'>R = [ ∏ (1 + r<sub>i</sub> × n<sub>i</sub>/360) − 1 ] × 360/d</p>" +
                "r<sub>i</sub> — rate for day i, n<sub>i</sub> — number of calendar days it applies, d — period length in days.</li>" +
              "<li><strong>Net payment.</strong> Notional × (fixed rate − R) × d/360, paid by the party whose leg is higher. Payment usually follows 1–2 business days after period end, to allow time to compute the amount.</li>" +
              "<li><strong>Valuation and collateral.</strong> Daily MtM; VM (and IM) with the CCP or under the CSA.</li>" +
            "</ol>" +
            "<div class='callout'><strong>Difference from an IBOR IRS</strong>In a EURIBOR IRS you know the floating interest amount at the start of the period. In an OIS you know it only at the end, because it depends on realised overnight rates.</div>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A fund (NAV EUR 200m) expects ECB rate cuts. It enters a 3-month OIS (91 days) on EUR 10m notional: <strong>receives fixed 2.00%</strong>, <strong>pays compounded €STR</strong>.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>Fixed leg — fund receives</td><td>10,000,000 × 2.00% × 91/360</td><td class='num'>EUR 50,555.56</td></tr>" +
              "<tr><td>Realised compounded €STR for the period (after a cut during the period)</td><td>—</td><td class='num'>1.95%</td></tr>" +
              "<tr><td>Floating leg — fund pays</td><td>10,000,000 × 1.95% × 91/360</td><td class='num'>EUR 49,291.67</td></tr>" +
              "<tr><td>Net payment to the fund</td><td>50,555.56 − 49,291.67</td><td class='num'>+EUR 1,263.89</td></tr>" +
            "</tbody></table></div>" +
            "<p>The fund gained because the average realised cost of overnight money turned out lower than the rate locked in on trade date.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<p>Commitment exposure: EUR 10m notional = 5% of NAV (duration-netting rules may apply). If the OIS is cleared through a CCP authorised or recognised under EMIR, it does not count towards the UCITS counterparty limit (after EMIR 3). Margin held with the clearing broker still needs monitoring.</p>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> the currency's OIS curve is used both to project and to discount. For the current period part of the rate is already known (realised days) and the rest comes from the curve.</p>" +
            "<ul>" +
              "<li><strong>Interest rate risk</strong> — especially sensitivity to central bank decisions (meeting dates).</li>" +
              "<li><strong>Counterparty risk</strong> — for bilateral trades; when cleared, limited to the broker and the CCP.</li>" +
              "<li><strong>Liquidity risk</strong> — cash VM calls.</li>" +
              "<li><strong>Operational risk</strong> — correct compounding, holiday and payment-lag calculations.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution (often on a platform), confirmation, submission to a CCP where applicable.</li>" +
              "<li>Daily overnight rate observations and daily valuation, VM.</li>" +
              "<li>At period end: compounded rate computed, net payment made.</li>" +
              "<li>Maturity, unwind or compression.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>OTC interest rate derivative. Supervised counterparty, daily independent valuation, ability to close out at fair value.</p></div>" +
              "<div class='rule'><h4>Counterparty limit <span class='law'>Art. 52(1) (after Dir. 2024/2994)</span></h4><p>10% of NAV (credit institution) or 5% of NAV — only for trades not cleared through a CCP authorised or recognised under EMIR.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>Art. 51(3); CESR/10-788</span></h4><p>Commitment = notional. Duration netting under the guidelines for interest rate portfolios.</p></div>" +
              "<div class='rule'><h4>Collateral <span class='law'>ESMA/2014/937</span></h4><p>Collateral received on bilateral swaps must meet the guidelines' criteria before it can be deducted from exposure.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Art. 7–8 Reg. 231/2013</span>: notional under the gross method; under the commitment method, netting and duration netting are allowed on the Regulation's conditions.</li>" +
              "<li>Counterparty and exposure limits come from the AIF's documents; valuation per Art. 19 AIFMD.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, margin, reporting",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Clearing obligation <span class='law'>Art. 4 EMIR</span></h4><p>OIS in the main currencies (including EUR, USD, GBP) in specified tenors are subject to the clearing obligation for counterparties above the thresholds. The scope has been extended as markets moved to RFRs — check the current ESMA register.</p></div>" +
              "<div class='rule'><h4>Non-centrally cleared <span class='law'>Art. 11 EMIR; Reg. 2016/2251</span></h4><p>Confirmation, portfolio reconciliation, VM between FCs, IM above the EUR 8bn AANA threshold.</p></div>" +
              "<div class='rule'><h4>Reporting <span class='law'>Art. 9 EMIR</span></h4><p>By T+1 (UTI, UPI, LEI, notional, fixed rate, floating index, valuation, collateral). The management company or AIFM is responsible.</p></div>" +
              "<div class='rule'><h4>Benchmark <span class='law'>BMR</span></h4><p>€STR is administered by the ECB, and central banks are outside the scope of the BMR. For other RFRs — check the administrator's status.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), <strong>OTC ISIN</strong> for venue-traded instruments.</li>" +
              "<li><strong>CFI</strong> — <code>S</code> (Swaps), group <code>R</code> (Rates); the underlying attribute identifies an OIS.</li>" +
              "<li>Counterparty or CCP <strong>LEI</strong>.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Clearing status and compliance with the clearing obligation.</li>" +
              "<li>Counterparty limit for bilateral trades, 20% combined limit.</li>" +
              "<li>Global exposure, AIF leverage.</li>" +
              "<li>Net payment reconciled with the counterparty or CCP (compounded rate calculation).</li>" +
              "<li>EMIR report by T+1.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["RFR (Risk-Free Rate)", "Overnight rate based on actual transactions, e.g. €STR, SOFR, SONIA."],
        ["Compounded in arrears", "Rate compounded from daily observations, known only at period end."],
        ["Payment lag", "Payment made a few days after period end so that it can be computed."],
        ["OIS discounting", "Discounting cash flows of collateralised derivatives on the OIS curve."]
      ]
    }
  }
});

window.INSTRUMENTS.push({
  id: "fx-forward",
  name: "FX Forward",
  aliases: ["Outright Forward", "Deliverable Forward", "Currency Forward", "forward walutowy"],
  market: "otc",
  asset: { pl: "Derywaty walutowe", en: "FX derivatives" },
  sources: ["ucits", "emir3dir", "cesr10788", "esma2014", "esmaShare", "aifmd", "aifmdL2", "emir", "marginRts", "mifidDR"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Forward walutowy to umowa OTC, w której strony uzgadniają dziś kurs, po jakim w określonym przyszłym dniu wymienią jedną walutę na drugą. W dniu rozliczenia obie waluty są faktycznie dostarczane. Fundusze używają forwardów głównie do zabezpieczania ryzyka walutowego portfela lub klas jednostek.",
      keyFacts: [
        ["Rynek", "OTC, bilateralnie z bankiem; obecnie bez obowiązku clearingu w UE."],
        ["Dokumentacja", "ISDA Master Agreement + CSA, potwierdzenie transakcji."],
        ["Termin", "Dłuższy niż standardowy termin spot (dla większości par T+2). Typowo od 1 tygodnia do 12 miesięcy."],
        ["Rozliczenie", "Fizyczna dostawa obu walut (brutto), często przez system CLS."],
        ["Przepływ przy zawarciu", "Brak."],
        ["Wariant gotówkowy", "Non-Deliverable Forward (NDF) — osobna karta."],
        ["Kod CFI", "<code>JF****</code> (Forwards – Foreign exchange)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>FX Forward</em> (<em>outright forward</em>) to zobowiązanie do kupna jednej waluty za drugą po kursie terminowym (<em>forward rate</em>) ustalonym w dniu zawarcia, z rozliczeniem w dacie waluty (<em>value date</em>) późniejszej niż termin spot.</p>" +
            "<p>Kurs terminowy nie jest prognozą kursu przyszłego. Wynika z <strong>parytetu stóp procentowych</strong> (covered interest parity): waluta z wyższą stopą jest w terminie tańsza, bo jej posiadacz dostaje wyższe odsetki.</p>" +
            "<p class='formula'>F = S × (1 + r<sub>kwot.</sub> × d/360) / (1 + r<sub>baz.</sub> × d/360)</p>" +
            "<p>S — kurs spot (waluta bazowa/kwotowana, np. USD/PLN), r<sub>kwot.</sub> — stopa waluty kwotowanej (PLN), r<sub>baz.</sub> — stopa waluty bazowej (USD), d — liczba dni. Różnica F − S to <strong>punkty terminowe</strong> (<em>forward points</em>). Konwencja liczby dni zależy od waluty (np. dla PLN i GBP stosuje się ACT/365). W przykładzie poniżej dla uproszczenia przyjęto 360.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Fundusz i bank uzgadniają parę walut, kierunek (kto sprzedaje którą walutę), kwotę, kurs terminowy i datę waluty. Żadne pieniądze nie przechodzą.</li>" +
              "<li><strong>Potwierdzenie.</strong> Elektroniczne potwierdzenie warunków (np. przez platformę lub SWIFT), uzgodnione przez middle office i depozytariusza funduszu.</li>" +
              "<li><strong>Wycena w trakcie.</strong> Wartość forwardu zmienia się z kursem spot i stopami. Dla strony sprzedającej USD: wartość ≈ nominał USD × (F<sub>umowny</sub> − F<sub>rynkowy</sub>) zdyskontowane do dziś.</li>" +
              "<li><strong>Zabezpieczenie.</strong> Jeśli strony mają CSA, codziennie wymieniają variation margin równy zmianie wyceny.</li>" +
              "<li><strong>Rozliczenie.</strong> W dacie waluty fundusz dostarcza jedną walutę i otrzymuje drugą (np. przekazuje 10 mln USD, otrzymuje PLN po kursie terminowym). System CLS rozlicza obie nogi jednocześnie (PvP), co eliminuje ryzyko, że jedna strona zapłaci, a druga nie (ryzyko Herstatt).</li>" +
              "<li><strong>Rolowanie.</strong> Zabezpieczenie zwykle jest odnawiane (np. co miesiąc lub kwartał) przez FX Swap: rozliczenie wygasającego forwardu i zawarcie nowego. Przy rolowaniu realizuje się gotówkowo zysk lub stratę.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz z walutą bazową PLN (NAV ok. 150 mln PLN) ma akcje amerykańskie warte 10 mln USD i chce zabezpieczyć ryzyko USD/PLN. Sprzedaje 10 mln USD w forwardzie 3-miesięcznym (90 dni).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Dane</th><th class='num'>Wartość</th></tr></thead><tbody>" +
              "<tr><td>Kurs spot USD/PLN</td><td class='num'>4,0000</td></tr>" +
              "<tr><td>Stopa PLN 3M / stopa USD 3M (hipotetyczne)</td><td class='num'>4,50% / 4,00%</td></tr>" +
              "<tr><td>Kurs terminowy: 4,0000 × (1 + 0,045 × 90/360) / (1 + 0,040 × 90/360)</td><td class='num'>4,00495</td></tr>" +
              "<tr><td>Punkty terminowe</td><td class='num'>+49,5 pipsa</td></tr>" +
              "<tr><td>Fundusz otrzyma w dacie waluty: 10 000 000 × 4,00495</td><td class='num'>40 049 500 PLN</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Dwa scenariusze w dacie rozliczenia</h3>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th></th><th class='num'>USD/PLN = 3,80</th><th class='num'>USD/PLN = 4,20</th></tr></thead><tbody>" +
              "<tr><td>Zmiana wartości akcji w PLN (przy stałej cenie w USD)</td><td class='num'>−2 000 000</td><td class='num'>+2 000 000</td></tr>" +
              "<tr><td>Wynik forwardu: 10 mln × (4,00495 − kurs spot)</td><td class='num'>+2 049 500</td><td class='num'>−1 950 500</td></tr>" +
              "<tr><td>Łącznie</td><td class='num'>+49 500</td><td class='num'>+49 500</td></tr>" +
            "</tbody></table></div>" +
            "<p>Ryzyko walutowe zostało zneutralizowane. Wynik łączny w obu scenariuszach równa się punktom terminowym, czyli różnicy stóp PLN i USD (<em>carry</em>). Gdyby stopa USD była wyższa niż PLN, zabezpieczenie by kosztowało.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Ekspozycja w metodzie zaangażowania:</strong> nominał przeliczony na walutę bazową — 10 mln × 4,00 = 40 mln PLN (ok. 26,7% NAV). Jeśli transakcja spełnia warunki zabezpieczenia (hedging), może być kompensowana z ekspozycją walutową akcji.</li>" +
              "<li><strong>Ekspozycja na kontrahenta:</strong> w scenariuszu 3,80, tuż przed rozliczeniem, wycena wynosi ok. +2,05 mln PLN, czyli ok. 1,37% NAV (limit 10% dla banku), pomniejszona o otrzymane zabezpieczenie.</li>" +
              "<li><strong>Płynność:</strong> w scenariuszu 4,20 fundusz musi mieć środki na pokrycie straty przy rozliczeniu lub rolowaniu (ok. 1,95 mln PLN).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> różnica między kursem umownym a bieżącym kursem terminowym na tę samą datę, zdyskontowana do dziś. Dane: kurs spot, punkty terminowe lub krzywe stóp obu walut.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko walutowe</strong> — pełne, jeśli forward nie zabezpiecza żadnej pozycji.</li>" +
              "<li><strong>Ryzyko kontrahenta</strong> — dodatnia wycena u banku; rośnie wraz z terminem i zmiennością kursu.</li>" +
              "<li><strong>Ryzyko rozrachunku (Herstatt)</strong> — brutto dostawa dwóch walut; ograniczane przez CLS.</li>" +
              "<li><strong>Ryzyko płynności</strong> — gotówka na rozliczenie straty przy zapadalności lub rolowaniu oraz na VM.</li>" +
              "<li><strong>Niedopasowanie zabezpieczenia</strong> — wartość aktywów się zmienia, a nominał forwardu nie. Powstaje nadmierne lub zbyt małe zabezpieczenie (over- / under-hedging).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie (telefonicznie lub na platformie FX), potwierdzenie do końca następnego dnia roboczego (EMIR).</li>" +
              "<li>Codzienna wycena, ewentualny VM wg CSA, raport EMIR.</li>" +
              "<li>Rolowanie przed datą waluty (FX Swap) albo rozliczenie fizyczne.</li>" +
              "<li>Rozliczenie w CLS lub bilateralnie: instrukcje rozliczeniowe (SSI) do depozytariusza, uzgodnienie przepływów.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywat OTC na kursy walut — baza dopuszczalna. Warunki jak dla każdego derywatu OTC: nadzorowany kontrahent, codzienna wiarygodna wycena, możliwość zamknięcia po wartości godziwej.</p></div>" +
              "<div class='rule'><h4>Limit kontrahenta i limit łączny <span class='law'>art. 52 ust. 1–2</span></h4><p>Ekspozycja (dodatnia wycena minus dopuszczalne zabezpieczenie): maks. 10% NAV wobec instytucji kredytowej i 5% wobec innych kontrahentów. Łącznie z depozytami i papierami tego samego podmiotu ≤ 20% NAV.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>art. 51 ust. 3; CESR/10-788</span></h4><p>Metoda zaangażowania: nominał przeliczony na walutę bazową funduszu. Transakcje zabezpieczające ryzyko walutowe aktywów można kompensować, jeśli spełniają kryteria hedgingu z wytycznych (zmniejszają ryzyko, dotyczą tej samej klasy aktywów i są skuteczne w warunkach stresu).</p></div>" +
              "<div class='rule'><h4>Zabezpieczone klasy jednostek <span class='law'>ESMA34-43-296</span></h4><p>Zabezpieczenie na poziomie klasy jest dopuszczalne tylko dla ryzyka walutowego. Pozycja nie może przekraczać 105% wartości aktywów netto klasy ani spadać poniżej 95%. Pozycje trzeba weryfikować co najmniej raz w miesiącu, a nadwyżki istotnie powyżej 100% nie mogą przechodzić na kolejny miesiąc. Koszty i wyniki zabezpieczenia przypisuje się wyłącznie danej klasie.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia — metoda brutto</strong> <span class='law'>art. 7 rozp. 231/2013</span>: nominał forwardu wchodzi w wartości bezwzględnej, bez kompensowania z zabezpieczanymi aktywami.</li>" +
              "<li><strong>Dźwignia — metoda zaangażowania</strong> <span class='law'>art. 8</span>: zabezpieczenia walutowe spełniające warunki rozporządzenia mogą być kompensowane. Dlatego fundusze z dużym hedgingiem walutowym mają wysoką dźwignię brutto przy niskiej dźwigni w metodzie zaangażowania.</li>" +
              "<li>Limity kontrahenta i zasady hedgingu klas wynikają z dokumentów AIF i polityki ryzyka ZAFI.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: kwalifikacja, zabezpieczenia, raportowanie",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Spot czy derywat? <span class='law'>art. 10 rozp. 2017/565</span></h4><p>Transakcja walutowa jest spotem (nie derywatem), jeśli rozlicza się w terminie T+2 dla głównych par walut albo w standardowym terminie rynkowym. Dłuższy termin oznacza forward, czyli derywat objęty EMIR. Wyjątkiem są transakcje rozliczane fizycznie w celu zapłaty za papiery wartościowe, które mieszczą się w terminie rozliczenia tych papierów (do 5 dni).</p></div>" +
              "<div class='rule'><h4>Clearing</h4><p>Dla FX forward nie ma obecnie w UE obowiązku rozliczania przez CCP.</p></div>" +
              "<div class='rule'><h4>Depozyty zabezpieczające <span class='law'>rozp. 2016/2251</span></h4><p>Fizycznie rozliczane FX forward są zwolnione z wymogu initial margin. Obowiązkowy variation margin dotyczy transakcji, w których obie strony są instytucjami (banki, firmy inwestycyjne). Z funduszami VM wymienia się zwykle na podstawie CSA, zgodnie z umową i polityką ryzyka.</p></div>" +
              "<div class='rule'><h4>Raportowanie <span class='law'>art. 9 EMIR</span></h4><p>Do repozytorium transakcji do T+1 (UTI, UPI, LEI, nominały obu walut, kurs, data waluty, wycena, zabezpieczenia). Odpowiada spółka zarządzająca lub ZAFI w imieniu funduszu.</p></div>" +
              "<div class='rule'><h4>Ograniczanie ryzyka <span class='law'>art. 11 EMIR</span></h4><p>Terminowe potwierdzenie, uzgadnianie portfela, procedura sporów.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI</strong> i <strong>UPI</strong> (ANNA DSB) — w raportach EMIR.</li>" +
              "<li><strong>CFI</strong> — kategoria <code>J</code> (Forwards), grupa <code>F</code> (Foreign exchange).</li>" +
              "<li><strong>Kody walut</strong> ISO 4217 (np. <code>USD</code>, <code>PLN</code>, <code>EUR</code>); para kwotowana jako waluta bazowa/kwotowana.</li>" +
              "<li><strong>LEI kontrahenta</strong> — do limitów kontrahenta.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Termin dłuższy niż spot? Jeśli tak, to derywat: raport EMIR do T+1 i potwierdzenie w terminie.</li>" +
              "<li>Kontrahent zatwierdzony, ISDA/CSA podpisane; limit 5% / 10% i limit łączny 20%.</li>" +
              "<li>Ekspozycja całkowita i dźwignia (brutto oraz zaangażowania), z poprawnie oznaczonym hedgingiem.</li>" +
              "<li>Zabezpieczone klasy jednostek: wskaźnik zabezpieczenia w przedziale 95–105%; brak przenoszenia nadwyżek.</li>" +
              "<li>Kalendarz dat waluty i rolowań; płynność na rozliczenie strat.</li>" +
              "<li>Czy forward faktycznie zabezpiecza pozycję (waluta, kwota, termin) zgodnie z celem w prospekcie?</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Forward points", "Różnica między kursem terminowym a spot, wynikająca z różnicy stóp procentowych dwóch walut."],
        ["Value date", "Data waluty — dzień faktycznej wymiany walut."],
        ["CLS (Continuous Linked Settlement)", "System rozliczeń walutowych na zasadzie płatność za płatność (PvP)."],
        ["Herstatt risk", "Ryzyko, że jedna strona przekaże swoją walutę, a druga nie dostarczy swojej."],
        ["FX Swap", "Jednoczesna transakcja spot (lub bliska) i forward w przeciwnym kierunku; używana m.in. do rolowania zabezpieczeń."],
        ["Hedge ratio", "Stosunek nominału zabezpieczenia do wartości zabezpieczanej pozycji lub klasy jednostek."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An FX forward is an OTC contract in which the parties agree today the rate at which they will exchange one currency for another on a set future date. On settlement both currencies are actually delivered. Funds use forwards mainly to hedge the currency risk of the portfolio or of share classes.",
      keyFacts: [
        ["Market", "OTC, bilateral with a bank; currently no clearing obligation in the EU."],
        ["Documentation", "ISDA Master Agreement + CSA, trade confirmation."],
        ["Tenor", "Longer than the standard spot date (T+2 for most pairs). Typically 1 week to 12 months."],
        ["Settlement", "Physical delivery of both currencies (gross), often through CLS."],
        ["Cash flow at inception", "None."],
        ["Cash-settled variant", "Non-Deliverable Forward (NDF) — separate card."],
        ["CFI code", "<code>JF****</code> (Forwards – Foreign exchange)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>An FX Forward (outright forward) is a commitment to buy one currency against another at a forward rate fixed on trade date, settling on a value date later than spot.</p>" +
            "<p>The forward rate is not a forecast of the future exchange rate. It follows from <strong>covered interest parity</strong>: the higher-yielding currency trades cheaper forward, because its holder earns more interest.</p>" +
            "<p class='formula'>F = S × (1 + r<sub>quote</sub> × d/360) / (1 + r<sub>base</sub> × d/360)</p>" +
            "<p>S — spot rate (base/quote, e.g. USD/PLN), r<sub>quote</sub> — quote currency rate (PLN), r<sub>base</sub> — base currency rate (USD), d — number of days. F − S is the <strong>forward points</strong>. Day-count conventions depend on the currency (e.g. PLN and GBP use ACT/365). The example below uses 360 for simplicity.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> The fund and the bank agree the currency pair, direction (who sells which currency), amount, forward rate and value date. No money moves.</li>" +
              "<li><strong>Confirmation.</strong> Electronic confirmation of terms (e.g. via a platform or SWIFT), matched by middle office and the fund's depositary.</li>" +
              "<li><strong>Valuation during the life.</strong> The forward's value moves with spot and interest rates. For the USD seller: value ≈ USD notional × (contract F − market F), discounted to today.</li>" +
              "<li><strong>Collateral.</strong> Where a CSA is in place, the parties exchange daily variation margin equal to the change in value.</li>" +
              "<li><strong>Settlement.</strong> On the value date the fund delivers one currency and receives the other (e.g. pays USD 10m, receives PLN at the forward rate). CLS settles both legs simultaneously (PvP), removing the risk that one side pays and the other does not (Herstatt risk).</li>" +
              "<li><strong>Rolling.</strong> Hedges are usually renewed (e.g. monthly or quarterly) via an FX Swap: settling the expiring forward and entering a new one. The roll realises the gain or loss in cash.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A PLN-based fund (NAV about PLN 150m) holds US equities worth USD 10m and wants to hedge USD/PLN risk. It sells USD 10m in a 3-month (90-day) forward.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Input</th><th class='num'>Value</th></tr></thead><tbody>" +
              "<tr><td>USD/PLN spot</td><td class='num'>4.0000</td></tr>" +
              "<tr><td>PLN 3M rate / USD 3M rate (hypothetical)</td><td class='num'>4.50% / 4.00%</td></tr>" +
              "<tr><td>Forward rate: 4.0000 × (1 + 0.045 × 90/360) / (1 + 0.040 × 90/360)</td><td class='num'>4.00495</td></tr>" +
              "<tr><td>Forward points</td><td class='num'>+49.5 pips</td></tr>" +
              "<tr><td>Fund receives on value date: 10,000,000 × 4.00495</td><td class='num'>PLN 40,049,500</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Two scenarios on the value date</h3>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th></th><th class='num'>USD/PLN = 3.80</th><th class='num'>USD/PLN = 4.20</th></tr></thead><tbody>" +
              "<tr><td>Change in equity value in PLN (USD price unchanged)</td><td class='num'>−2,000,000</td><td class='num'>+2,000,000</td></tr>" +
              "<tr><td>Forward result: 10m × (4.00495 − spot)</td><td class='num'>+2,049,500</td><td class='num'>−1,950,500</td></tr>" +
              "<tr><td>Total</td><td class='num'>+49,500</td><td class='num'>+49,500</td></tr>" +
            "</tbody></table></div>" +
            "<p>The currency risk has been neutralised. The combined result in both scenarios equals the forward points, i.e. the PLN–USD interest differential (carry). If USD rates were higher than PLN rates, the hedge would cost money.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Commitment exposure:</strong> notional converted into base currency — 10m × 4.00 = PLN 40m (about 26.7% of NAV). If the trade meets the hedging conditions, it may be netted against the equities' currency exposure.</li>" +
              "<li><strong>Counterparty exposure:</strong> in the 3.80 scenario, just before settlement, the value is about +PLN 2.05m, i.e. about 1.37% of NAV (10% limit for a bank), reduced by collateral received.</li>" +
              "<li><strong>Liquidity:</strong> in the 4.20 scenario the fund needs cash to cover the loss on settlement or roll (about PLN 1.95m).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> the difference between the contract rate and the current forward rate for the same date, discounted to today. Inputs: spot rate, forward points or both currencies' rate curves.</p>" +
            "<ul>" +
              "<li><strong>FX risk</strong> — full, if the forward does not hedge any position.</li>" +
              "<li><strong>Counterparty risk</strong> — positive value owed by the bank; grows with tenor and FX volatility.</li>" +
              "<li><strong>Settlement (Herstatt) risk</strong> — gross delivery of two currencies; mitigated by CLS.</li>" +
              "<li><strong>Liquidity risk</strong> — cash to settle losses at maturity or roll, and for VM.</li>" +
              "<li><strong>Hedge mismatch</strong> — asset values change but the forward notional does not, leading to over- or under-hedging.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution (voice or FX platform), confirmation by the end of the next business day (EMIR).</li>" +
              "<li>Daily valuation, VM under the CSA where applicable, EMIR report.</li>" +
              "<li>Roll before the value date (FX Swap) or physical settlement.</li>" +
              "<li>Settlement via CLS or bilaterally: standing settlement instructions (SSI) to the depositary, cash flow reconciliation.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>OTC derivative on exchange rates — eligible underlying. Same conditions as any OTC derivative: supervised counterparty, daily reliable valuation, ability to close out at fair value.</p></div>" +
              "<div class='rule'><h4>Counterparty and combined limits <span class='law'>Art. 52(1)–(2)</span></h4><p>Exposure (positive value less eligible collateral): max 10% of NAV to a credit institution and 5% to other counterparties. Together with deposits with and securities of the same body ≤ 20% of NAV.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>Art. 51(3); CESR/10-788</span></h4><p>Commitment approach: notional converted into the fund's base currency. Trades hedging the currency risk of assets may be netted if they meet the guidelines' hedging criteria (they reduce risk, relate to the same asset class and remain effective under stressed conditions).</p></div>" +
              "<div class='rule'><h4>Hedged share classes <span class='law'>ESMA34-43-296</span></h4><p>Share-class hedging is allowed only for currency risk. The position must not exceed 105% of the share class's net assets or fall below 95%. Positions must be reviewed at least monthly, and over-hedged positions materially above 100% must not be carried forward month to month. Hedging costs and results are allocated only to that class.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage — gross method</strong> <span class='law'>Art. 7 Reg. 231/2013</span>: forward notional is included in absolute value, with no netting against hedged assets.</li>" +
              "<li><strong>Leverage — commitment method</strong> <span class='law'>Art. 8</span>: currency hedges that meet the Regulation's conditions may be netted. This is why funds with heavy currency hedging show high gross leverage but low commitment leverage.</li>" +
              "<li>Counterparty limits and share-class hedging rules come from the AIF's documents and the AIFM's risk policy.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: classification, margin, reporting",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Spot or derivative? <span class='law'>Art. 10 Reg. 2017/565</span></h4><p>An FX trade is spot (not a derivative) if it settles within T+2 for major currency pairs, or within the standard market settlement period. A longer period makes it a forward, i.e. a derivative under EMIR. The exception is physically settled trades made to pay for securities that settle within those securities' settlement period (up to 5 days).</p></div>" +
              "<div class='rule'><h4>Clearing</h4><p>There is currently no EU clearing obligation for FX forwards.</p></div>" +
              "<div class='rule'><h4>Margin <span class='law'>Reg. 2016/2251</span></h4><p>Physically settled FX forwards are exempt from initial margin. Mandatory variation margin applies to trades where both parties are institutions (banks, investment firms). With funds, VM is usually exchanged under the CSA, in line with the agreement and risk policy.</p></div>" +
              "<div class='rule'><h4>Reporting <span class='law'>Art. 9 EMIR</span></h4><p>To a trade repository by T+1 (UTI, UPI, LEI, notionals in both currencies, rate, value date, valuation, collateral). The management company or AIFM is responsible on the fund's behalf.</p></div>" +
              "<div class='rule'><h4>Risk mitigation <span class='law'>Art. 11 EMIR</span></h4><p>Timely confirmation, portfolio reconciliation, dispute resolution.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI</strong> and <strong>UPI</strong> (ANNA DSB) — in EMIR reports.</li>" +
              "<li><strong>CFI</strong> — category <code>J</code> (Forwards), group <code>F</code> (Foreign exchange).</li>" +
              "<li><strong>Currency codes</strong> ISO 4217 (e.g. <code>USD</code>, <code>PLN</code>, <code>EUR</code>); pair quoted as base/quote.</li>" +
              "<li><strong>Counterparty LEI</strong> — for counterparty limits.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Longer than spot? If so, it is a derivative: EMIR report by T+1 and timely confirmation.</li>" +
              "<li>Approved counterparty, ISDA/CSA signed; 5% / 10% limit and 20% combined limit.</li>" +
              "<li>Global exposure and leverage (gross and commitment), with hedges correctly flagged.</li>" +
              "<li>Hedged share classes: hedge ratio within 95–105%; no carry-forward of over-hedges.</li>" +
              "<li>Value date and roll calendar; liquidity to settle losses.</li>" +
              "<li>Does the forward actually hedge the position (currency, amount, tenor) in line with the purpose stated in the prospectus?</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Forward points", "Difference between the forward and spot rates, driven by the interest rate differential between the two currencies."],
        ["Value date", "The date the currencies are actually exchanged."],
        ["CLS (Continuous Linked Settlement)", "FX settlement system on a payment-versus-payment (PvP) basis."],
        ["Herstatt risk", "Risk that one party delivers its currency and the other fails to deliver its own."],
        ["FX Swap", "Simultaneous spot (or near) and forward trades in opposite directions; used among other things to roll hedges."],
        ["Hedge ratio", "Ratio of hedge notional to the value of the hedged position or share class."]
      ]
    }
  }
});

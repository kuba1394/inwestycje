window.INSTRUMENTS.push({
  id: "stir-future",
  name: "Short-Term Interest Rate Future (STIR)",
  aliases: ["STIR", "Euribor Future", "€STR Future", "SOFR Future", "kontrakt na stopę krótkoterminową"],
  market: "exchange",
  asset: { pl: "Derywaty giełdowe — stopa procentowa", en: "Listed derivatives — interest rates" },
  sources: ["ucits", "emir3dir", "cesr10788", "aifmd", "aifmdL2", "emir", "bmr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Kontrakt na krótkoterminową stopę procentową to giełdowy kontrakt rozliczany gotówkowo, którego cena wynosi 100 minus oczekiwana stopa (np. 3-miesięczny EURIBOR) w przyszłym okresie. Pozwala zablokować lub obstawić poziom stóp na kilka kwartałów do przodu.",
      keyFacts: [
        ["Rynek", "Giełda (np. ICE Futures Europe, Eurex — EURIBOR i €STR; CME — SOFR); rozliczenie przez CCP."],
        ["Notowanie", "Cena = 100 − stopa. Stopa 2,20% → cena 97,80."],
        ["Przykładowa specyfikacja", "3M EURIBOR (ICE): nominał 1 000 000 EUR, tick 0,005 = 12,50 EUR, 1 pb = 25 EUR."],
        ["Terminy", "Kwartalne (marzec, czerwiec, wrzesień, grudzień) na kilka lat do przodu, plus serie miesięczne."],
        ["Rozliczenie", "Codzienny VM; rozliczenie końcowe gotówkowe: 100 − fixing stopy referencyjnej."],
        ["Zastosowanie", "Zabezpieczenie lub pozycja na oczekiwania co do decyzji banku centralnego."],
        ["Kod CFI", "<code>FF****</code> (Futures – Financial), bazowy: stopa procentowa"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p>STIR future to kontrakt na <strong>przyszłą stopę krótkoterminową</strong> dla okresu odsetkowego, który zaczyna się w dniu wygaśnięcia kontraktu (np. 3-miesięczny EURIBOR od czerwca do września).</p>" +
            "<p>Cena jest kwotowana jako <strong>100 − stopa</strong>, dzięki czemu działa jak cena obligacji:</p>" +
            "<ul>" +
              "<li>stopy spadają → cena rośnie → zarabia <strong>kupujący</strong>;</li>" +
              "<li>stopy rosną → cena spada → zarabia <strong>sprzedający</strong>.</li>" +
            "</ul>" +
            "<p>Wartość 1 punktu bazowego wynika z nominału i długości okresu:</p>" +
            "<p class='formula'>1 pb = nominał × 0,0001 × 90/360 = 1 000 000 × 0,0001 × 0,25 = 25 EUR</p>" +
            "<p>Seria kontraktów na kolejne kwartały (tzw. <em>strip</em>) pokazuje ścieżkę stóp oczekiwaną przez rynek.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Otwarcie pozycji.</strong> Kupno lub sprzedaż kontraktów na wybrany kwartał; CCP, depozyt początkowy.</li>" +
              "<li><strong>Codzienny VM.</strong> Zmiana ceny w pb × 25 EUR × liczba kontraktów.</li>" +
              "<li><strong>Ostatni dzień obrotu.</strong> Zwykle 2 dni robocze przed trzecią środą miesiąca wygaśnięcia.</li>" +
              "<li><strong>Rozliczenie końcowe.</strong> Cena = 100 − fixing stopy referencyjnej z ostatniego dnia (dla €STR i SOFR — stopa składana za okres). Rozlicza się tylko ostatnią różnicę, gotówką.</li>" +
            "</ol>" +
            "<div class='callout'><strong>Powiązanie z innymi instrumentami</strong>Strip STIR futures to giełdowy odpowiednik serii FRA lub krótkiego swapu. Dlatego STIR, <a href='#/i/overnight-index-swap'>OIS</a> i <a href='#/i/interest-rate-swap'>IRS</a> wyceniane są z tej samej krzywej.</div>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz (NAV 200 mln EUR) spodziewa się obniżek stóp przez EBC. Kupuje 50 kontraktów 3M EURIBOR na wrzesień po 97,80 (rynek oczekuje stopy 2,20%).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Wrażliwość pozycji</td><td>50 × 25 EUR</td><td class='num'>1 250 EUR na 1 pb</td></tr>" +
              "<tr><td>Fixing EURIBOR w dniu wygaśnięcia: 1,95% → cena 98,05</td><td>(98,05 − 97,80) = 25 pb</td><td class='num'>—</td></tr>" +
              "<tr><td>Łączny wynik (suma VM)</td><td>25 × 25 × 50</td><td class='num'>+31 250 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Ekspozycja w metodzie zaangażowania</strong> (CESR/10-788): liczba kontraktów × nominał = 50 × 1 000 000 = <strong>50 mln EUR = 25% NAV</strong>.</li>" +
              "<li>Rzeczywiste ryzyko jest małe (1 250 EUR na 1 pb), bo kontrakt dotyczy tylko 3-miesięcznego okresu. Zaangażowanie liczone od nominału mocno przeszacowuje ryzyko.</li>" +
              "<li>Dlatego przy portfelach stopy procentowej stosuje się <strong>duration netting</strong> z wytycznych CESR, a fundusze intensywnie używające STIR często przechodzą na metodę VaR.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> dzienna cena rozliczeniowa giełdy.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — zmiana oczekiwań co do polityki banku centralnego.</li>" +
              "<li><strong>Ryzyko bazy</strong> — różnica między stopą kontraktu (np. EURIBOR) a stopą zabezpieczanej pozycji (np. €STR).</li>" +
              "<li><strong>Ryzyko wskaźnika</strong> — zmiana metodologii lub zaprzestanie publikacji wskaźnika referencyjnego.</li>" +
              "<li><strong>Ryzyko płynności</strong> — VM; dalsze serie są mniej płynne.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie, CCP, depozyt.</li>" +
              "<li>Codzienny VM.</li>" +
              "<li>Rolowanie lub wygaśnięcie z rozliczeniem gotówkowym.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywat notowany na rynku regulowanym, którego bazą są stopy procentowe.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>art. 51 ust. 3; CESR/10-788</span></h4><p>Liczba kontraktów × nominał kontraktu. Duration netting i hedging na zasadach wytycznych.</p></div>" +
              "<div class='rule'><h4>Pokrycie</h4><p>Płynne aktywa na pokrycie zobowiązań z pozycji rozliczanej gotówką.</p></div>" +
              "<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1 (po dyr. 2024/2994)</span></h4><p>Rozliczane przez CCP autoryzowaną lub uznaną — poza limitem kontrahenta.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: liczba kontraktów × nominał. W metodzie brutto STIR szybko podnosi dźwignię, mimo małego ryzyka — warto to wyjaśniać w raportach Annex IV.</li>" +
              "<li>W metodzie zaangażowania — duration netting na warunkach rozporządzenia.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie (EMIR, BMR)",
          html:
            "<ul>" +
              "<li><strong>EMIR art. 9</strong> — raport do T+1. Raportuje spółka zarządzająca lub ZAFI.</li>" +
              "<li><strong>BMR</strong> — EURIBOR jest wskaźnikiem krytycznym, administrowanym przez EMMI. Fundusz musi mieć plan awaryjny na wypadek istotnej zmiany lub zaprzestania publikacji wskaźnika.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>Kod produktu</strong> giełdy i seria (miesiąc/rok), <strong>ISIN</strong> serii, <strong>MIC</strong>.</li>" +
              "<li><strong>CFI</strong> — <code>F</code> (Futures), grupa <code>F</code> (Financial), atrybut instrumentu bazowego: stopa procentowa.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Ekspozycja całkowita (nominał) i zastosowanie duration netting.</li>" +
              "<li>Dźwignia AIF w metodzie brutto vs limit z dokumentów.</li>" +
              "<li>Płynność na VM; raport EMIR.</li>" +
              "<li>Wskaźnik referencyjny w rejestrze BMR, plan awaryjny.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Strip", "Seria kontraktów STIR na kolejne kwartały; pokazuje oczekiwaną ścieżkę stóp."],
        ["EDSP", "Exchange Delivery Settlement Price — cena rozliczenia końcowego (100 − fixing)."],
        ["Duration netting", "Kompensowanie pozycji stopy procentowej o różnych terminach według wrażliwości, a nie nominału."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A short-term interest rate future is a cash-settled exchange-traded contract priced at 100 minus the expected rate (e.g. 3-month EURIBOR) for a future period. It lets you lock in or take a view on rates several quarters ahead.",
      keyFacts: [
        ["Market", "Exchange (e.g. ICE Futures Europe, Eurex — EURIBOR and €STR; CME — SOFR); cleared through a CCP."],
        ["Quotation", "Price = 100 − rate. Rate 2.20% → price 97.80."],
        ["Sample specification", "3M EURIBOR (ICE): EUR 1,000,000 notional, tick 0.005 = EUR 12.50, 1 bp = EUR 25."],
        ["Expiries", "Quarterly (March, June, September, December) several years out, plus monthly series."],
        ["Settlement", "Daily VM; cash final settlement: 100 − reference rate fixing."],
        ["Use", "Hedging or taking a view on central bank decisions."],
        ["CFI code", "<code>FF****</code> (Futures – Financial), underlying: interest rate"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A STIR future is a contract on a <strong>future short-term rate</strong> for an interest period that starts on the contract's expiry (e.g. 3-month EURIBOR from June to September).</p>" +
            "<p>The price is quoted as <strong>100 − rate</strong>, so it behaves like a bond price:</p>" +
            "<ul>" +
              "<li>rates fall → price rises → the <strong>buyer</strong> gains;</li>" +
              "<li>rates rise → price falls → the <strong>seller</strong> gains.</li>" +
            "</ul>" +
            "<p>The value of 1 basis point follows from the notional and the period length:</p>" +
            "<p class='formula'>1 bp = notional × 0.0001 × 90/360 = 1,000,000 × 0.0001 × 0.25 = EUR 25</p>" +
            "<p>A series of contracts for consecutive quarters (a strip) shows the rate path expected by the market.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Opening the position.</strong> Buy or sell contracts for the chosen quarter; CCP, initial margin.</li>" +
              "<li><strong>Daily VM.</strong> Price change in bp × EUR 25 × number of contracts.</li>" +
              "<li><strong>Last trading day.</strong> Usually 2 business days before the third Wednesday of the expiry month.</li>" +
              "<li><strong>Final settlement.</strong> Price = 100 − the reference rate fixing on the last day (for €STR and SOFR — the rate compounded over the period). Only the last difference is settled, in cash.</li>" +
            "</ol>" +
            "<div class='callout'><strong>Link to other instruments</strong>A strip of STIR futures is the exchange-traded equivalent of a series of FRAs or a short swap. That is why STIR, <a href='#/i/overnight-index-swap'>OIS</a> and <a href='#/i/interest-rate-swap'>IRS</a> are priced off the same curve.</div>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A fund (NAV EUR 200m) expects ECB rate cuts. It buys 50 September 3M EURIBOR contracts at 97.80 (the market expects a 2.20% rate).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>Position sensitivity</td><td>50 × EUR 25</td><td class='num'>EUR 1,250 per 1 bp</td></tr>" +
              "<tr><td>EURIBOR fixing at expiry: 1.95% → price 98.05</td><td>(98.05 − 97.80) = 25 bp</td><td class='num'>—</td></tr>" +
              "<tr><td>Total result (sum of VM)</td><td>25 × 25 × 50</td><td class='num'>+EUR 31,250</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Commitment exposure</strong> (CESR/10-788): number of contracts × notional = 50 × 1,000,000 = <strong>EUR 50m = 25% of NAV</strong>.</li>" +
              "<li>The actual risk is small (EUR 1,250 per bp), because the contract covers only a 3-month period. Notional-based commitment greatly overstates the risk.</li>" +
              "<li>That is why <strong>duration netting</strong> under the CESR guidelines is used for interest rate portfolios, and funds that use STIR heavily often move to the VaR approach.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> the exchange's daily settlement price.</p>" +
            "<ul>" +
              "<li><strong>Interest rate risk</strong> — changes in expectations of central bank policy.</li>" +
              "<li><strong>Basis risk</strong> — difference between the contract rate (e.g. EURIBOR) and the rate of the hedged position (e.g. €STR).</li>" +
              "<li><strong>Benchmark risk</strong> — methodology change or cessation of the reference rate.</li>" +
              "<li><strong>Liquidity risk</strong> — VM; deferred series are less liquid.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution, CCP, margin.</li>" +
              "<li>Daily VM.</li>" +
              "<li>Roll or expiry with cash settlement.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>Derivative dealt in on a regulated market with interest rates as the underlying.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>Art. 51(3); CESR/10-788</span></h4><p>Number of contracts × contract notional. Duration netting and hedging under the guidelines.</p></div>" +
              "<div class='rule'><h4>Cover</h4><p>Liquid assets to cover obligations from a cash-settled position.</p></div>" +
              "<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1) (after Dir. 2024/2994)</span></h4><p>Cleared through an authorised or recognised CCP — outside the counterparty limit.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: number of contracts × notional. Under the gross method STIR raises leverage quickly despite low risk — worth explaining in Annex IV reports.</li>" +
              "<li>Under the commitment method — duration netting on the Regulation's conditions.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting (EMIR, BMR)",
          html:
            "<ul>" +
              "<li><strong>EMIR Art. 9</strong> — report by T+1. Reported by the management company or AIFM.</li>" +
              "<li><strong>BMR</strong> — EURIBOR is a critical benchmark administered by EMMI. The fund must have a contingency plan in case the benchmark materially changes or ceases.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li>Exchange <strong>product code</strong> and series (month/year), series <strong>ISIN</strong>, <strong>MIC</strong>.</li>" +
              "<li><strong>CFI</strong> — <code>F</code> (Futures), group <code>F</code> (Financial), underlying attribute: interest rate.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Global exposure (notional) and use of duration netting.</li>" +
              "<li>AIF gross leverage vs the documented limit.</li>" +
              "<li>Liquidity for VM; EMIR report.</li>" +
              "<li>Reference rate in the BMR register, contingency plan.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Strip", "A series of STIR contracts for consecutive quarters; shows the expected rate path."],
        ["EDSP", "Exchange Delivery Settlement Price — the final settlement price (100 − fixing)."],
        ["Duration netting", "Offsetting interest rate positions of different maturities by sensitivity rather than notional."]
      ]
    }
  }
});

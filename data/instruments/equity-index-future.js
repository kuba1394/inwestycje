window.INSTRUMENTS.push({
  id: "equity-index-future",
  name: "Equity Index Future",
  aliases: ["Stock Index Future", "kontrakt terminowy na indeks", "FESX", "FW20"],
  market: "exchange",
  asset: { pl: "Derywaty giełdowe — akcyjne", en: "Listed derivatives — equity" },
  sources: ["ucits", "eligible", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Kontrakt terminowy na indeks akcji to giełdowa umowa, w której strony zobowiązują się rozliczyć wartość indeksu w przyszłym terminie po cenie ustalonej dziś. Nie kupuje się żadnych akcji, a zyski i straty są rozliczane w gotówce codziennie przez izbę rozliczeniową (CCP).",
      keyFacts: [
        ["Rynek", "Giełda instrumentów pochodnych (np. Eurex, CME, GPW)."],
        ["Kontrahent", "Izba rozliczeniowa (CCP) przez członka rozliczającego (clearing broker)."],
        ["Standaryzacja", "Mnożnik, tick, terminy wygaśnięcia (zwykle marzec, czerwiec, wrzesień, grudzień — trzeci piątek miesiąca)."],
        ["Przykładowe mnożniki", "Euro Stoxx 50 (FESX): 10 EUR za punkt. WIG20 (FW20): 20 PLN za punkt."],
        ["Rozliczenie", "Codzienne rozliczenie wyniku (variation margin) w gotówce, rozliczenie końcowe gotówkowe."],
        ["Dźwignia", "Tak — depozyt początkowy to ułamek wartości nominalnej."],
        ["Kod CFI", "<code>FF****</code> (Futures – Financial), np. <code>FFICSX</code>"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Equity Index Future</em> to standaryzowany kontrakt giełdowy. Kupujący (pozycja długa) zarabia, gdy indeks rośnie, a sprzedający (pozycja krótka) — gdy spada. Instrumentem bazowym jest <strong>wartość indeksu</strong> (np. Euro Stoxx 50, S&amp;P 500, WIG20), a nie koszyk akcji, dlatego rozliczenie jest zawsze <strong>gotówkowe</strong>.</p>" +
            "<p>Wartość nominalna (<em>notional</em>) jednego kontraktu:</p>" +
            "<p class='formula'>Notional = cena futures × mnożnik</p>" +
            "<p>Fundusze używają tych kontraktów do szybkiego zwiększenia lub zmniejszenia ekspozycji na rynek akcji (np. zainwestowanie napływów w dniu ich otrzymania — <em>equitisation of cash</em>), do zabezpieczenia portfela i do zmiany alokacji bez sprzedaży akcji.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Otwarcie pozycji.</strong> Fundusz składa zlecenie kupna (lub sprzedaży) określonej liczby kontraktów z danym terminem wygaśnięcia. Zlecenie trafia przez brokera do arkusza zleceń giełdy.</li>" +
              "<li><strong>Nowacja do CCP.</strong> Po zawarciu transakcji izba rozliczeniowa staje się kupującym dla każdego sprzedającego i sprzedającym dla każdego kupującego. Fundusz nie ma ryzyka wobec drugiej strony, tylko wobec CCP i swojego brokera rozliczeniowego.</li>" +
              "<li><strong>Depozyt początkowy (initial margin).</strong> Fundusz wnosi do brokera, a ten do CCP, zabezpieczenie (gotówkę lub papiery) wyliczone modelem ryzyka CCP. To zabezpieczenie, a nie cena kontraktu — przy zamknięciu pozycji wraca do funduszu.</li>" +
              "<li><strong>Codzienne rozliczenie (variation margin).</strong> Każdego dnia CCP wycenia pozycje po cenie rozliczeniowej. Zysk z dnia fundusz dostaje w gotówce, stratę musi dopłacić. Wynik jest więc realizowany codziennie, a nie dopiero na końcu.</li>" +
              "<li><strong>Rolowanie.</strong> Przed wygaśnięciem fundusz, który chce utrzymać ekspozycję, zamyka bieżącą serię i otwiera następną. Różnicę cen między seriami nazywa się kosztem rolowania.</li>" +
              "<li><strong>Wygaśnięcie.</strong> Niezamknięte pozycje rozlicza się po cenie rozliczenia końcowego, ustalanej według reguł giełdy (np. jako średnia wartości indeksu w określonym oknie czasowym w dniu wygaśnięcia). Rozliczana jest tylko ostatnia różnica — w gotówce.</li>" +
            "</ol>" +
            "<h3>Cena teoretyczna (cost of carry)</h3>" +
            "<p class='formula'>F = S × e<sup>(r − q) × T</sup></p>" +
            "<p>S — wartość indeksu, r — stopa wolna od ryzyka, q — stopa dywidendy z indeksu, T — czas do wygaśnięcia w latach. Kupujący futures nie musi płacić za akcje (zyskuje odsetki), ale nie dostaje dywidend. Przykład: S = 5 000, r = 2,0%, q = 3,0%, T = 0,25 → F ≈ 4 987,5. Futures jest tu tańszy od indeksu, bo dywidendy przewyższają odsetki. Różnicę F − S nazywa się bazą (<em>basis</em>).</p>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz UCITS (NAV 100 mln EUR) otrzymał napływy i chce od razu mieć ekspozycję na rynek. Kupuje 20 kontraktów na Euro Stoxx 50 po 5 000 pkt (mnożnik 10 EUR).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Krok</th><th class='num'>Cena</th><th>Obliczenie</th><th class='num'>Przepływ / wartość</th></tr></thead><tbody>" +
              "<tr><td>Wartość nominalna</td><td class='num'>5 000</td><td>20 × 5 000 × 10</td><td class='num'>1 000 000 EUR</td></tr>" +
              "<tr><td>Depozyt początkowy (hipotetycznie 8%)</td><td class='num'>—</td><td>8% × 1 000 000</td><td class='num'>80 000 EUR</td></tr>" +
              "<tr><td>Dzień 1 — rozliczenie</td><td class='num'>5 050</td><td>20 × (5 050 − 5 000) × 10</td><td class='num'>+10 000 EUR</td></tr>" +
              "<tr><td>Dzień 2 — rozliczenie</td><td class='num'>4 980</td><td>20 × (4 980 − 5 050) × 10</td><td class='num'>−14 000 EUR</td></tr>" +
              "<tr><td>Wynik narastająco</td><td class='num'>—</td><td>20 × (4 980 − 5 000) × 10</td><td class='num'>−4 000 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<p>Ekspozycja wynosi 1 mln EUR (1% NAV), choć zaangażowana gotówka to tylko depozyt 80 tys. EUR — na tym polega dźwignia. Ruch indeksu o 1% zmienia wynik o ok. 10 000 EUR.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<p>W metodzie zaangażowania ekspozycja na koniec dnia 2 wynosi 20 × 10 × 4 980 = <strong>996 000 EUR, czyli 0,996% NAV</strong>. Wlicza się ją do limitu ekspozycji całkowitej (100% NAV). Fundusz musi też mieć płynne środki na pokrycie zobowiązania i na codzienne dopłaty variation margin.</p>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> dzienna cena rozliczeniowa publikowana przez giełdę lub CCP. Wartość pozycji jest w praktyce bliska zeru po każdym rozliczeniu VM — w NAV widać zrealizowany wynik i depozyty.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko rynkowe z dźwignią</strong> — mały depozyt, pełna ekspozycja na ruch indeksu.</li>" +
              "<li><strong>Ryzyko płynności finansowania</strong> — przy spadkach CCP wzywa do dopłat w gotówce w tym samym dniu (<em>margin call</em>).</li>" +
              "<li><strong>Ryzyko bazy</strong> — futures nie porusza się idealnie tak jak portfel ani nawet tak jak indeks.</li>" +
              "<li><strong>Ryzyko rolowania</strong> — koszt i płynność przy przechodzeniu na kolejną serię.</li>" +
              "<li><strong>Ryzyko brokera rozliczeniowego</strong> — depozyty są u brokera; znaczenie ma segregacja rachunku (omnibus czy indywidualny).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie transakcji (często przez executing broker) i przekazanie do clearing brokera (<em>give-up</em>).</li>" +
              "<li>Rejestracja w CCP, wniesienie depozytu początkowego.</li>" +
              "<li>Codzienne rozliczanie VM i ewentualne zmiany wymaganego depozytu.</li>" +
              "<li>Rolowanie przed wygaśnięciem albo rozliczenie końcowe w gotówce.</li>" +
              "<li>Uzgadnianie pozycji i depozytów: broker ↔ księgi funduszu ↔ depozytariusz.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywaty, w tym rozliczane gotówkowo, notowane na rynku regulowanym są dopuszczalne, gdy bazą są m.in. indeksy finansowe, a inwestycja jest zgodna z celem inwestycyjnym funduszu.</p></div>" +
              "<div class='rule'><h4>Indeks finansowy <span class='law'>art. 9 dyr. 2007/16/WE; ESMA/2014/937</span></h4><p>Indeks musi być dostatecznie zdywersyfikowany, stanowić adekwatny benchmark dla rynku, którego dotyczy, i być publikowany w odpowiedni sposób. Wytyczne ESMA wymagają m.in. jawnej metodologii, rozsądnej częstotliwości rebalansowania i niezależności dostawcy indeksu.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>art. 51 ust. 3; CESR/10-788</span></h4><p>Metoda zaangażowania: liczba kontraktów × mnożnik × bieżąca cena futures; łącznie ≤ 100% NAV. Kompensowanie (netting) i zabezpieczenia (hedging) są dopuszczalne na zasadach wytycznych. Metoda VaR: absolutny VaR ≤ 20% NAV (99%, 20 dni) albo relatywny ≤ 2× VaR portfela referencyjnego.</p></div>" +
              "<div class='rule'><h4>Brak look-through do składników indeksu <span class='law'>art. 51 ust. 3 akapit 3</span></h4><p>Derywatów opartych na indeksie nie łączy się z limitami emitenta z art. 52. Kontrakt na Euro Stoxx 50 nie zwiększa ekspozycji na poszczególne spółki indeksu w teście 5/10/40. Futures na pojedynczą akcję — już tak.</p></div>" +
              "<div class='rule'><h4>Pokrycie zobowiązań</h4><p>Przy rozliczeniu gotówkowym fundusz musi w każdej chwili mieć wystarczające aktywa płynne na pokrycie zobowiązań z pozycji. Wynika to z wymogów dotyczących zarządzania ryzykiem i z wytycznych nadzorczych.</p></div>" +
              "<div class='rule'><h4>Ryzyko kontrahenta po EMIR 3 <span class='law'>art. 52 ust. 1 w brzmieniu dyr. 2024/2994</span></h4><p>Limity kontrahenta (5% / 10% NAV) dotyczą teraz derywatów <strong>nierozliczanych centralnie</strong> przez CCP autoryzowaną (art. 14 EMIR) lub uznaną (art. 25 EMIR), a nie tylko „OTC”. Kontrakty futures rozliczane przez taką CCP są z nich wyłączone. Termin transpozycji: 25.06.2026 — sprawdź stan wdrożenia w kraju funduszu.</p></div>" +
            "</div>" +
            "<div class='callout'><strong>Praktyka</strong>Środki przekazane brokerowi jako depozyt nadal są aktywem funduszu. Ekspozycję wobec brokera rozliczeniowego monitoruje się zgodnie z polityką ryzyka kontrahenta i warunkami segregacji rachunku.</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia — metoda brutto</strong> <span class='law'>art. 7 rozp. 231/2013</span>: suma wartości bezwzględnych wszystkich pozycji, bez kompensowania. Futures przelicza się na ekwiwalent w instrumencie bazowym (liczba × mnożnik × wartość indeksu).</li>" +
              "<li><strong>Dźwignia — metoda zaangażowania</strong> <span class='law'>art. 8</span>: ta sama konwersja, ale z kompensowaniem i zabezpieczeniami spełniającymi warunki rozporządzenia.</li>" +
              "<li><strong>Maksymalna dźwignia</strong> <span class='law'>art. 15 ust. 4, art. 23 AIFMD</span>: ZAFI ustala ją dla każdego AIF, ujawnia inwestorom i monitoruje. Przekroczenie poziomu z dokumentów jest naruszeniem.</li>" +
              "<li><strong>Dźwignia na znaczną skalę</strong> <span class='law'>art. 111 rozp. 231/2013</span>: gdy dźwignia w metodzie zaangażowania przekracza 3× wartość aktywów netto, obowiązują dodatkowe raporty (art. 24 ust. 4 AIFMD).</li>" +
              "<li>Raport Annex IV (art. 24) obejmuje ekspozycje z derywatów i poziomy dźwigni.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie (EMIR)",
          html:
            "<ul>" +
              "<li><strong>Obowiązek raportowania</strong> <span class='law'>art. 9 EMIR</span> obejmuje wszystkie derywaty, także giełdowe. Raport do repozytorium transakcji składa się najpóźniej w następnym dniu roboczym (T+1). Obejmuje on otwarcie, zmiany, codzienną wycenę i zabezpieczenia.</li>" +
              "<li><strong>Odpowiedzialność</strong>: za raport w imieniu UCITS odpowiada spółka zarządzająca, a w imieniu AIF — ZAFI (od EMIR Refit).</li>" +
              "<li><strong>Clearing obligation</strong> nie dotyczy ETD (dotyczy derywatów OTC), ale ETD i tak są rozliczane przez CCP.</li>" +
              "<li>Kluczowe pola: UTI, LEI stron, ISIN kontraktu, notional, cena, informacja o depozytach.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> — nadawany seriom kontraktów przez giełdę lub krajową agencję numerującą.</li>" +
              "<li><strong>Kod produktu giełdy</strong> — np. <code>FESX</code> (Eurex, Euro Stoxx 50), <code>FW20</code> (GPW, WIG20) plus oznaczenie serii.</li>" +
              "<li><strong>CFI</strong> — kategoria <code>F</code> (Futures), grupa <code>F</code> (Financial); dla indeksu z rozliczeniem gotówkowym np. <code>FFICSX</code>.</li>" +
              "<li><strong>MIC</strong> — np. <code>XEUR</code> (Eurex), <code>XWAR</code> (GPW).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Czy indeks bazowy spełnia kryteria indeksu finansowego i jest na liście zatwierdzonych indeksów?</li>" +
              "<li>Czy prospekt lub regulamin dopuszcza derywaty w tym celu (zabezpieczenie lub cel inwestycyjny)?</li>" +
              "<li>Ekspozycja całkowita (zaangażowanie lub VaR) po transakcji i na koniec dnia.</li>" +
              "<li>Pokrycie: aktywa płynne ≥ zobowiązania z pozycji; płynność na dopłaty VM.</li>" +
              "<li>Dźwignia AIF (brutto i zaangażowania) wobec limitu z dokumentów.</li>" +
              "<li>Raport EMIR wysłany i uzgodniony (UTI, LEI, notional).</li>" +
              "<li>Kalendarz wygaśnięć — czy pozycje są rolowane zgodnie z decyzją zarządzającego?</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Initial margin", "Depozyt zabezpieczający wnoszony przy otwarciu pozycji; pokrywa potencjalną stratę z kilku dni na wypadek niewypłacalności uczestnika."],
        ["Variation margin", "Codzienna płatność gotówkowa równa zmianie wartości pozycji."],
        ["Novation", "Zastąpienie pierwotnej umowy między stronami dwiema umowami z CCP."],
        ["Roll", "Zamknięcie wygasającej serii kontraktu i otwarcie kolejnej."],
        ["Basis", "Różnica między ceną futures a wartością indeksu bazowego."],
        ["Give-up", "Przekazanie transakcji zawartej u jednego brokera do rozliczenia innemu brokerowi (clearing broker)."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An equity index future is an exchange-traded contract in which the parties agree to settle the value of an equity index on a future date at a price fixed today. No shares change hands, and gains and losses are settled in cash every day through a central counterparty (CCP).",
      keyFacts: [
        ["Market", "Derivatives exchange (e.g. Eurex, CME, Warsaw Stock Exchange)."],
        ["Counterparty", "Central counterparty (CCP), accessed through a clearing member (clearing broker)."],
        ["Standardisation", "Multiplier, tick size, expiry dates (usually March, June, September, December — third Friday of the month)."],
        ["Sample multipliers", "Euro Stoxx 50 (FESX): EUR 10 per point. WIG20 (FW20): PLN 20 per point."],
        ["Settlement", "Daily cash settlement of P&amp;L (variation margin), cash final settlement."],
        ["Leverage", "Yes — initial margin is a fraction of notional."],
        ["CFI code", "<code>FF****</code> (Futures – Financial), e.g. <code>FFICSX</code>"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>An Equity Index Future is a standardised exchange-traded contract. The buyer (long) gains when the index rises and the seller (short) gains when it falls. The underlying is the <strong>index value</strong> (e.g. Euro Stoxx 50, S&amp;P 500, WIG20), not a basket of shares, so settlement is always in <strong>cash</strong>.</p>" +
            "<p>The notional value of one contract:</p>" +
            "<p class='formula'>Notional = futures price × multiplier</p>" +
            "<p>Funds use these contracts to add or remove equity market exposure quickly (e.g. investing inflows on the day they arrive — equitisation of cash), to hedge a portfolio and to shift allocation without selling shares.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Opening the position.</strong> The fund places an order to buy (or sell) a number of contracts for a given expiry. The order reaches the exchange order book through a broker.</li>" +
              "<li><strong>Novation to the CCP.</strong> Once the trade is matched, the clearing house becomes the buyer to every seller and the seller to every buyer. The fund has no exposure to the other trader, only to the CCP and its clearing broker.</li>" +
              "<li><strong>Initial margin.</strong> The fund posts collateral (cash or securities) to the broker, which passes it to the CCP. The amount comes from the CCP's risk model. It is collateral, not the price of the contract — it comes back to the fund when the position is closed.</li>" +
              "<li><strong>Daily settlement (variation margin).</strong> Every day the CCP marks positions to the settlement price. The fund receives the day's gain in cash or pays the day's loss. P&amp;L is therefore realised daily, not only at the end.</li>" +
              "<li><strong>Rolling.</strong> Before expiry, a fund that wants to keep the exposure closes the current series and opens the next. The price difference between the series is the roll cost.</li>" +
              "<li><strong>Expiry.</strong> Open positions are settled at the final settlement price set by exchange rules (e.g. an average of index values over a fixed window on expiry day). Only the last difference is settled, in cash.</li>" +
            "</ol>" +
            "<h3>Fair value (cost of carry)</h3>" +
            "<p class='formula'>F = S × e<sup>(r − q) × T</sup></p>" +
            "<p>S — index level, r — risk-free rate, q — index dividend yield, T — time to expiry in years. The futures buyer does not pay for the shares (earns interest) but does not receive dividends. Example: S = 5,000, r = 2.0%, q = 3.0%, T = 0.25 → F ≈ 4,987.5. Here the future is cheaper than the index because dividends exceed interest. The difference F − S is the basis.</p>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A UCITS fund (NAV EUR 100m) has received inflows and wants immediate market exposure. It buys 20 Euro Stoxx 50 futures at 5,000 points (multiplier EUR 10).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Step</th><th class='num'>Price</th><th>Calculation</th><th class='num'>Cash flow / value</th></tr></thead><tbody>" +
              "<tr><td>Notional</td><td class='num'>5,000</td><td>20 × 5,000 × 10</td><td class='num'>EUR 1,000,000</td></tr>" +
              "<tr><td>Initial margin (hypothetical 8%)</td><td class='num'>—</td><td>8% × 1,000,000</td><td class='num'>EUR 80,000</td></tr>" +
              "<tr><td>Day 1 — settlement</td><td class='num'>5,050</td><td>20 × (5,050 − 5,000) × 10</td><td class='num'>+EUR 10,000</td></tr>" +
              "<tr><td>Day 2 — settlement</td><td class='num'>4,980</td><td>20 × (4,980 − 5,050) × 10</td><td class='num'>−EUR 14,000</td></tr>" +
              "<tr><td>Cumulative P&amp;L</td><td class='num'>—</td><td>20 × (4,980 − 5,000) × 10</td><td class='num'>−EUR 4,000</td></tr>" +
            "</tbody></table></div>" +
            "<p>Exposure is EUR 1m (1% of NAV), while the cash committed is only the EUR 80k margin — that is leverage. A 1% index move changes P&amp;L by about EUR 10,000.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<p>Under the commitment approach, exposure at the end of day 2 is 20 × 10 × 4,980 = <strong>EUR 996,000, i.e. 0.996% of NAV</strong>. It counts towards the global exposure limit (100% of NAV). The fund must also hold liquid assets to cover the obligation and to meet daily variation margin calls.</p>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> the daily settlement price published by the exchange or CCP. After each VM settlement the position value is effectively close to zero — NAV shows realised P&amp;L and margin balances.</p>" +
            "<ul>" +
              "<li><strong>Leveraged market risk</strong> — small margin, full exposure to the index move.</li>" +
              "<li><strong>Funding liquidity risk</strong> — when markets fall, the CCP calls for cash the same day (margin call).</li>" +
              "<li><strong>Basis risk</strong> — the future does not move exactly like the portfolio, or even exactly like the index.</li>" +
              "<li><strong>Roll risk</strong> — cost and liquidity when moving to the next series.</li>" +
              "<li><strong>Clearing broker risk</strong> — margin sits with the broker; account segregation (omnibus vs individual) matters.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution (often via an executing broker) and give-up to the clearing broker.</li>" +
              "<li>Registration at the CCP, initial margin posted.</li>" +
              "<li>Daily VM settlement and changes to required margin.</li>" +
              "<li>Roll before expiry or cash final settlement.</li>" +
              "<li>Reconciliation of positions and margin: broker ↔ fund books ↔ depositary.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>Derivatives, including cash-settled ones, dealt in on a regulated market are eligible where the underlying is, among others, a financial index and the investment is consistent with the fund's objective.</p></div>" +
              "<div class='rule'><h4>Financial index <span class='law'>Art. 9 Dir. 2007/16/EC; ESMA/2014/937</span></h4><p>The index must be sufficiently diversified, be an adequate benchmark for the market it refers to and be published appropriately. ESMA guidelines also require a transparent methodology, reasonable rebalancing frequency and an independent index provider.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>Art. 51(3); CESR/10-788</span></h4><p>Commitment approach: number of contracts × multiplier × current futures price; total ≤ 100% of NAV. Netting and hedging are allowed under the guidelines. VaR approach: absolute VaR ≤ 20% of NAV (99%, 20 days) or relative VaR ≤ 2× the VaR of the reference portfolio.</p></div>" +
              "<div class='rule'><h4>No look-through to index constituents <span class='law'>Art. 51(3), third subpara.</span></h4><p>Index-based derivatives are not combined with the Art. 52 issuer limits. A Euro Stoxx 50 future does not add exposure to individual index companies in the 5/10/40 test. A single-stock future does.</p></div>" +
              "<div class='rule'><h4>Cover</h4><p>For cash-settled positions the fund must hold enough liquid assets at all times to cover its obligations. This follows from risk management requirements and supervisory guidance.</p></div>" +
              "<div class='rule'><h4>Counterparty risk after EMIR 3 <span class='law'>Art. 52(1) as amended by Dir. 2024/2994</span></h4><p>Counterparty limits (5% / 10% of NAV) now apply to derivatives that are <strong>not centrally cleared</strong> through a CCP authorised (Art. 14 EMIR) or recognised (Art. 25 EMIR), rather than to \"OTC\" derivatives only. Futures cleared through such a CCP are excluded. Transposition deadline: 25 June 2026 — check implementation status in the fund's home country.</p></div>" +
            "</div>" +
            "<div class='callout'><strong>In practice</strong>Cash passed to the broker as margin remains a fund asset. Exposure to the clearing broker is monitored under the counterparty risk policy and the account segregation terms.</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage — gross method</strong> <span class='law'>Art. 7 Reg. 231/2013</span>: sum of the absolute values of all positions, with no netting. Futures are converted into the equivalent underlying position (number × multiplier × index level).</li>" +
              "<li><strong>Leverage — commitment method</strong> <span class='law'>Art. 8</span>: same conversion, but netting and hedging that meet the Regulation's conditions are allowed.</li>" +
              "<li><strong>Maximum leverage</strong> <span class='law'>Art. 15(4), Art. 23 AIFMD</span>: the AIFM sets it for each AIF, discloses it to investors and monitors it. Exceeding the documented level is a breach.</li>" +
              "<li><strong>Leverage on a substantial basis</strong> <span class='law'>Art. 111 Reg. 231/2013</span>: when commitment leverage exceeds 3× net asset value, additional reporting applies (Art. 24(4) AIFMD).</li>" +
              "<li>The Annex IV report (Art. 24) covers derivative exposures and leverage levels.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting (EMIR)",
          html:
            "<ul>" +
              "<li><strong>Reporting obligation</strong> <span class='law'>Art. 9 EMIR</span> covers all derivatives, including exchange-traded ones. The report goes to a trade repository by the next working day (T+1). It covers the opening, modifications, daily valuation and collateral.</li>" +
              "<li><strong>Responsibility</strong>: the management company reports on behalf of a UCITS, and the AIFM on behalf of an AIF (since EMIR Refit).</li>" +
              "<li>The <strong>clearing obligation</strong> does not apply to ETDs (it covers OTC derivatives), but ETDs are cleared through a CCP anyway.</li>" +
              "<li>Key fields: UTI, counterparty LEIs, contract ISIN, notional, price, margin information.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> — assigned to contract series by the exchange or national numbering agency.</li>" +
              "<li><strong>Exchange product code</strong> — e.g. <code>FESX</code> (Eurex, Euro Stoxx 50), <code>FW20</code> (Warsaw, WIG20) plus series code.</li>" +
              "<li><strong>CFI</strong> — category <code>F</code> (Futures), group <code>F</code> (Financial); for a cash-settled index future e.g. <code>FFICSX</code>.</li>" +
              "<li><strong>MIC</strong> — e.g. <code>XEUR</code> (Eurex), <code>XWAR</code> (Warsaw Stock Exchange).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Does the underlying index meet the financial index criteria and is it on the approved index list?</li>" +
              "<li>Does the prospectus or fund rules allow derivatives for this purpose (hedging or investment)?</li>" +
              "<li>Global exposure (commitment or VaR) after the trade and at end of day.</li>" +
              "<li>Cover: liquid assets ≥ obligations from the position; liquidity for VM calls.</li>" +
              "<li>AIF leverage (gross and commitment) against the documented limit.</li>" +
              "<li>EMIR report sent and reconciled (UTI, LEI, notional).</li>" +
              "<li>Expiry calendar — are positions rolled in line with the portfolio manager's decision?</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Initial margin", "Collateral posted when a position is opened; it covers potential losses over several days if a participant defaults."],
        ["Variation margin", "Daily cash payment equal to the change in the position's value."],
        ["Novation", "Replacing the original contract between two parties with two contracts with the CCP."],
        ["Roll", "Closing the expiring contract series and opening the next one."],
        ["Basis", "Difference between the futures price and the underlying index level."],
        ["Give-up", "Passing a trade executed with one broker to another broker (the clearing broker) for clearing."]
      ]
    }
  }
});

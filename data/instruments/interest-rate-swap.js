window.INSTRUMENTS.push({
  id: "interest-rate-swap",
  name: "Interest Rate Swap",
  aliases: ["IRS", "Fixed-for-Floating Swap", "Plain Vanilla Swap", "swap procentowy"],
  market: "otc",
  asset: { pl: "Derywaty stopy procentowej", en: "Interest rate derivatives" },
  sources: ["ucits", "eligible", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "marginRts", "bmr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Swap procentowy to umowa OTC, w której dwie strony przez ustalony czas wymieniają się płatnościami odsetkowymi od tej samej kwoty nominalnej. Jedna płaci stałą stopę, druga zmienną (np. EURIBOR 6M). Samej kwoty nominalnej nikt nie przekazuje.",
      keyFacts: [
        ["Rynek", "OTC — bilateralnie albo z rozliczeniem przez CCP (np. LCH SwapClear, Eurex Clearing)."],
        ["Dokumentacja", "ISDA Master Agreement + Schedule, Credit Support Annex (CSA), potwierdzenie transakcji."],
        ["Wymiana nominału", "Nie — nominał służy tylko do liczenia odsetek."],
        ["Rozliczenie", "Gotówkowe: płatności odsetkowe, zwykle kompensowane, gdy przypadają w tym samym dniu."],
        ["Typowe tenory", "Od 1 roku do 30 lat i więcej."],
        ["Stopy referencyjne", "€STR, EURIBOR, SOFR, SONIA, WIBOR (w trakcie reformy wskaźników w Polsce)."],
        ["Kod CFI", "<code>SR****</code> (Swaps – Rates)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Interest Rate Swap</em> (IRS) to umowa, w której strony wymieniają strumienie odsetek naliczanych od tej samej kwoty nominalnej, w tej samej walucie:</p>" +
            "<ul>" +
              "<li><strong>noga stała</strong> (<em>fixed leg</em>) — odsetki według stopy ustalonej w dniu zawarcia (<em>swap rate</em>);</li>" +
              "<li><strong>noga zmienna</strong> (<em>floating leg</em>) — odsetki według stopy referencyjnej ustalanej okresowo (np. EURIBOR 6M) albo według stopy overnight składanej za okres (np. €STR — wtedy to <em>Overnight Index Swap</em>).</li>" +
            "</ul>" +
            "<p>Strona, która płaci stałą stopę, to <strong>payer</strong>. Zarabia, gdy stopy rosną, i jest to odpowiednik krótkiej pozycji w obligacji. Strona otrzymująca stałą stopę to <strong>receiver</strong>. Zarabia, gdy stopy spadają, i jest to odpowiednik długiej pozycji w obligacji.</p>" +
            "<p>Fundusze używają IRS głównie do <strong>zarządzania duration</strong>: skrócenia jej (zabezpieczenie portfela obligacji — payer) albo wydłużenia bez kupowania obligacji (receiver).</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Uzgodnienie warunków.</strong> Nominał, waluta, data startu i zapadalności, stała stopa, indeks zmienny, częstotliwość płatności i konwencje liczenia dni (np. stała 30/360 rocznie, zmienna ACT/360 półrocznie).</li>" +
              "<li><strong>Wartość na starcie ≈ 0.</strong> Stała stopa jest tak dobrana (par swap rate), że wartość bieżąca obu nóg jest równa. Żadna strona nic nie płaci przy zawarciu, poza ewentualnymi kosztami.</li>" +
              "<li><strong>Fixing.</strong> Na początku każdego okresu noga zmienna dostaje stawkę (dla IBOR — z góry; dla stóp overnight — składana na koniec okresu, <em>in arrears</em>).</li>" +
              "<li><strong>Płatności.</strong> W dniach płatności każda strona liczy swoje odsetki: nominał × stopa × ułamek roku. Gdy płatności przypadają w tym samym dniu, przekazuje się tylko różnicę (netting).</li>" +
              "<li><strong>Wycena (mark-to-market).</strong> Gdy rynkowe stopy swap się zmieniają, zmienia się wartość bieżąca nogi stałej względem zmiennej. Swap nabiera dodatniej wartości dla jednej strony i ujemnej dla drugiej.</li>" +
              "<li><strong>Zabezpieczenie.</strong> Codziennie strony wymieniają variation margin według CSA (albo z CCP, jeśli swap jest rozliczany centralnie). Ewentualnie wnoszą także initial margin.</li>" +
              "<li><strong>Zakończenie.</strong> Swap wygasa w dacie zapadalności. Można go też wcześniej zamknąć (zapłata wartości rynkowej — <em>unwind</em>), przenieść na inny podmiot (<em>novation</em>) albo zredukować w procesie kompresji portfela.</li>" +
            "</ol>" +
            "<h3>Wrażliwość na stopy</h3>" +
            "<p class='formula'>DV01 ≈ nominał × duration nogi stałej × 0,0001</p>" +
            "<p>DV01 to zmiana wartości swapu przy przesunięciu krzywej o 1 punkt bazowy (0,01%).</p>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz obligacji (NAV 200 mln EUR) chce skrócić duration portfela. Zawiera 5-letni IRS na nominał 10 mln EUR, w którym <strong>płaci stałą stopę 2,50%</strong> (rocznie, 30/360) i <strong>otrzymuje EURIBOR 6M</strong> (półrocznie, ACT/360).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Okres (rok 1)</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Półrocze 1: fixing EURIBOR 2,20%, 182 dni — fundusz otrzymuje</td><td>10 000 000 × 2,20% × 182/360</td><td class='num'>+111 222,22 EUR</td></tr>" +
              "<tr><td>Półrocze 2: fixing EURIBOR 2,40%, 183 dni — fundusz otrzymuje</td><td>10 000 000 × 2,40% × 183/360</td><td class='num'>+122 000,00 EUR</td></tr>" +
              "<tr><td>Koniec roku: noga stała — fundusz płaci</td><td>10 000 000 × 2,50% × 360/360</td><td class='num'>−250 000,00 EUR</td></tr>" +
              "<tr><td>Płatność netto na koniec roku (półrocze 2 + noga stała)</td><td>122 000,00 − 250 000,00</td><td class='num'>−128 000,00 EUR</td></tr>" +
              "<tr><td>Wynik gotówkowy za rok 1</td><td>111 222,22 + 122 000,00 − 250 000,00</td><td class='num'>−16 777,78 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<p>Ujemny przepływ w pierwszym roku nie oznacza straty na transakcji — tak wygląda koszt zabezpieczenia, gdy stopy zmienne są niższe od stałej. Ważniejsza jest zmiana wartości rynkowej.</p>" +
            "<h3>Zmiana stóp</h3>" +
            "<p>Przyjmijmy duration nogi stałej ok. 4,7. DV01 ≈ 10 000 000 × 4,7 × 0,0001 = <strong>4 700 EUR na 1 pb</strong>. Jeśli 5-letnie stopy swap wzrosną o 20 pb, wartość swapu dla funduszu (payer) rośnie o ok. 94 000 EUR. To kompensuje spadek wartości obligacji w portfelu.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<div class='table-scroll'><table class='calc'><tbody>" +
              "<tr><td>Ekspozycja w metodzie zaangażowania (plain vanilla IRS = nominał)</td><td class='num'>10 000 000 EUR = 5,00% NAV</td></tr>" +
              "<tr><td>Wartość rynkowa (MtM) swapu dla funduszu</td><td class='num'>+94 000 EUR</td></tr>" +
              "<tr><td>Zabezpieczenie otrzymane wg CSA (VM)</td><td class='num'>−90 000 EUR</td></tr>" +
              "<tr><td>Ekspozycja na kontrahenta (swap bilateralny)</td><td class='num'>4 000 EUR = 0,002% NAV</td></tr>" +
              "<tr><td>Limit kontrahenta UCITS (bank)</td><td class='num'>10% NAV</td></tr>" +
            "</tbody></table></div>" +
            "<p>Gdyby swap był rozliczany przez CCP autoryzowaną lub uznaną wg EMIR, limit kontrahenta UCITS by go nie obejmował (po zmianach EMIR 3).</p>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> zdyskontowane przepływy obu nóg. Przyszłe stopy zmienne prognozuje się z krzywej forward danego indeksu, a dyskontuje zwykle krzywą OIS (np. €STR), zgodną z oprocentowaniem zabezpieczeń w CSA. UCITS wymaga codziennej, niezależnej i weryfikowalnej wyceny.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — zmiana kształtu i poziomu krzywej (DV01, ryzyko na poszczególnych tenorach).</li>" +
              "<li><strong>Ryzyko kontrahenta</strong> — dla swapów bilateralnych; ograniczane przez CSA i nadzabezpieczenie (haircuty).</li>" +
              "<li><strong>Ryzyko płynności</strong> — wezwania do dopłaty VM w gotówce przy ruchu stóp.</li>" +
              "<li><strong>Ryzyko bazy</strong> — różnica między indeksem swapu a stopą, którą fundusz zabezpiecza.</li>" +
              "<li><strong>Ryzyko prawne i dokumentacyjne</strong> — netting w razie upadłości kontrahenta zależy od ISDA i opinii prawnych.</li>" +
              "<li><strong>Ryzyko wskaźnika referencyjnego</strong> — zastąpienie lub zaprzestanie publikacji indeksu (klauzule fallback).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li><strong>Onboarding:</strong> podpisane ISDA i CSA, kontrahent na liście zatwierdzonych, LEI.</li>" +
              "<li><strong>Zawarcie:</strong> telefonicznie albo na platformie (MTF/OTF). Dla klas z obowiązkiem obrotu (DTO) — na platformie.</li>" +
              "<li><strong>Potwierdzenie:</strong> elektroniczne (np. MarkitWire, DTCC). EMIR wymaga terminowego potwierdzenia (dla FC — do końca następnego dnia roboczego).</li>" +
              "<li><strong>Clearing:</strong> jeśli dotyczy go obowiązek rozliczania albo strony tak zdecydowały — przekazanie do CCP przez clearing brokera.</li>" +
              "<li><strong>W trakcie trwania:</strong> fixingi, płatności, codzienna wycena, VM i IM, uzgadnianie portfela (portfolio reconciliation), rozwiązywanie sporów.</li>" +
              "<li><strong>Zakończenie:</strong> zapadalność, unwind, nowacja lub kompresja.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność derywatu OTC <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Baza to stopy procentowe (dopuszczalna). Kontrahent podlega nadzorowi ostrożnościowemu i należy do kategorii zatwierdzonej przez nadzorcę. Derywat ma codzienną, wiarygodną i weryfikowalną wycenę i można go w każdej chwili sprzedać, zlikwidować albo zamknąć transakcją odwrotną po wartości godziwej z inicjatywy UCITS.</p></div>" +
              "<div class='rule'><h4>Limit kontrahenta <span class='law'>art. 52 ust. 1 akapit 2</span></h4><p>Ekspozycja na kontrahenta z derywatów nierozliczanych centralnie: maks. <strong>10% NAV</strong>, jeśli kontrahent jest instytucją kredytową z art. 50 ust. 1 lit. f, oraz <strong>5% NAV</strong> w pozostałych przypadkach. Po zmianach EMIR 3 (dyr. 2024/2994) limit nie dotyczy transakcji rozliczanych przez CCP autoryzowaną lub uznaną wg EMIR.</p></div>" +
              "<div class='rule'><h4>Pomiar ekspozycji na kontrahenta <span class='law'>ESMA/2014/937</span></h4><p>Dodatnia wartość MtM pomniejszona o otrzymane zabezpieczenie, jeśli spełnia ono kryteria wytycznych: płynność, codzienna wycena, jakość kredytowa emitenta, niska korelacja z kontrahentem, dywersyfikacja (co do zasady maks. 20% NAV w zabezpieczeniach jednego emitenta), brak reinwestycji zabezpieczenia niepieniężnego, stosowanie haircutów.</p></div>" +
              "<div class='rule'><h4>Limit łączny 20% <span class='law'>art. 52 ust. 2</span></h4><p>Ekspozycja z derywatów wobec banku sumuje się z depozytami w nim i papierami przez niego wyemitowanymi — łącznie ≤ 20% NAV.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>art. 51 ust. 3; CESR/10-788</span></h4><p>Metoda zaangażowania: plain vanilla IRS = wartość nominalna. Wytyczne dopuszczają zasady kompensowania duration (<em>duration netting</em>) dla portfeli stopy procentowej. Fundusze intensywnie korzystające z derywatów stosują metodę VaR.</p></div>" +
              "<div class='rule'><h4>Proces zarządzania ryzykiem <span class='law'>art. 51 ust. 1</span></h4><p>Spółka zarządzająca ma proces pozwalający dokładnie i niezależnie wyceniać derywaty OTC i regularnie informuje nadzorcę o rodzajach derywatów, ryzykach, limitach i metodach pomiaru.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>art. 7–8, załącznik II rozp. 231/2013</span>: IRS przelicza się według nominału. W metodzie brutto nie ma kompensowania. W metodzie zaangażowania można uwzględnić netting, hedging i kompensowanie duration na warunkach rozporządzenia.</li>" +
              "<li><strong>Maksymalna dźwignia</strong> ustalona w dokumentach AIF i ujawniona inwestorom; monitorowanie i raport Annex IV.</li>" +
              "<li><strong>Dobór kontrahentów i ryzyko kontrahenta</strong> — w ramach polityki zarządzania ryzykiem ZAFI. Dyrektywa nie ustala limitu procentowego; limity wynikają z dokumentów AIF.</li>" +
              "<li><strong>Wycena</strong> <span class='law'>art. 19 AIFMD</span> — rzetelna i niezależna wycena aktywów, w tym derywatów OTC.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, zabezpieczenia, raportowanie",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Status funduszu <span class='law'>art. 2 pkt 8 EMIR</span></h4><p>UCITS i AIF zarządzane przez ZAFI są kontrahentami finansowymi (FC). FC poniżej progów rozliczeniowych (m.in. 3 mld EUR wartości nominalnej brutto dla derywatów stopy procentowej) są zwolnione z obowiązku clearingu.</p></div>" +
              "<div class='rule'><h4>Obowiązek rozliczania przez CCP <span class='law'>art. 4 EMIR; rozp. 2015/2205, 2016/1178</span></h4><p>Obejmuje m.in. plain vanilla IRS (fixed-to-float), swapy bazowe, FRA i OIS w EUR, USD, GBP, JPY, a także IRS i FRA w PLN, NOK i SEK — w określonych tenorach i dla kontrahentów powyżej progów.</p></div>" +
              "<div class='rule'><h4>Swapy nierozliczane centralnie <span class='law'>art. 11 EMIR; rozp. 2016/2251</span></h4><p>Terminowe potwierdzenie, uzgadnianie portfela, kompresja, procedura sporów, codzienna wycena. Variation margin obowiązkowo między FC. Initial margin, jeśli średnia wartość nominalna (AANA) po obu stronach przekracza 8 mld EUR.</p></div>" +
              "<div class='rule'><h4>Raportowanie <span class='law'>art. 9 EMIR</span></h4><p>Do repozytorium transakcji do T+1: UTI, UPI, LEI stron, nominał, stopy, daty, codzienna wycena i zabezpieczenia. Odpowiada spółka zarządzająca lub ZAFI w imieniu funduszu.</p></div>" +
              "<div class='rule'><h4>Wskaźniki referencyjne <span class='law'>rozp. 2016/1011 (BMR)</span></h4><p>Podmioty nadzorowane mogą stosować wskaźniki administratorów wpisanych do rejestru ESMA i muszą mieć plany awaryjne na wypadek zmiany lub zaprzestania publikacji wskaźnika.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI</strong> (Unique Transaction Identifier) — identyfikator transakcji uzgodniony przez strony.</li>" +
              "<li><strong>UPI</strong> (Unique Product Identifier, ANNA DSB) — identyfikator produktu wymagany w raportach EMIR.</li>" +
              "<li><strong>ISIN OTC</strong> (ANNA DSB) — dla derywatów będących przedmiotem obrotu na platformach (MiFIR).</li>" +
              "<li><strong>CFI</strong> — kategoria <code>S</code> (Swaps), grupa <code>R</code> (Rates).</li>" +
              "<li><strong>LEI kontrahenta</strong> — do agregacji limitów kontrahenta i limitu łącznego 20%.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Czy przed transakcją podpisano ISDA/CSA i czy kontrahent jest na liście zatwierdzonych?</li>" +
              "<li>Status clearingu: czy transakcja podlega obowiązkowi rozliczenia i czy została rozliczona przez CCP?</li>" +
              "<li>Limit kontrahenta 5% / 10% (swapy bilateralne) i limit łączny 20% wobec grupy kontrahenta.</li>" +
              "<li>Zabezpieczenia: czy otrzymane aktywa są dopuszczalne, zdywersyfikowane i wycenione z haircutem?</li>" +
              "<li>Ekspozycja całkowita (zaangażowanie lub VaR) i dźwignia AIF.</li>" +
              "<li>Niezależna wycena i uzgodnienie MtM z kontrahentem (spory o wycenę).</li>" +
              "<li>Raport EMIR wysłany do T+1; potwierdzenie w terminie.</li>" +
              "<li>Wskaźnik referencyjny w rejestrze BMR; zapisy fallback w dokumentacji.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Swap rate", "Stała stopa, przy której wartość swapu na starcie wynosi zero."],
        ["Payer / Receiver", "Strona płacąca stałą stopę / strona otrzymująca stałą stopę."],
        ["DV01 / PV01", "Zmiana wartości pozycji przy zmianie stóp o 1 punkt bazowy."],
        ["CSA (Credit Support Annex)", "Załącznik do ISDA regulujący wymianę zabezpieczeń: dopuszczalne aktywa, haircuty, progi, minimalną kwotę transferu."],
        ["Fixing", "Ustalenie wartości stopy referencyjnej dla danego okresu odsetkowego."],
        ["Compression", "Redukcja liczby i nominału offsetujących się transakcji bez zmiany ryzyka rynkowego netto."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An interest rate swap is an OTC contract in which two parties exchange interest payments on the same notional amount for an agreed term. One pays a fixed rate, the other a floating rate (e.g. 6M EURIBOR). The notional itself never changes hands.",
      keyFacts: [
        ["Market", "OTC — bilateral or cleared through a CCP (e.g. LCH SwapClear, Eurex Clearing)."],
        ["Documentation", "ISDA Master Agreement + Schedule, Credit Support Annex (CSA), trade confirmation."],
        ["Notional exchange", "No — the notional is only used to compute interest."],
        ["Settlement", "Cash: interest payments, usually netted when they fall on the same date."],
        ["Typical tenors", "From 1 year to 30 years and longer."],
        ["Reference rates", "€STR, EURIBOR, SOFR, SONIA, WIBOR (Polish benchmark reform under way)."],
        ["CFI code", "<code>SR****</code> (Swaps – Rates)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>An Interest Rate Swap (IRS) is an agreement in which the parties exchange streams of interest calculated on the same notional, in the same currency:</p>" +
            "<ul>" +
              "<li><strong>fixed leg</strong> — interest at a rate set on trade date (the swap rate);</li>" +
              "<li><strong>floating leg</strong> — interest at a reference rate reset periodically (e.g. 6M EURIBOR) or an overnight rate compounded over the period (e.g. €STR — then it is an Overnight Index Swap).</li>" +
            "</ul>" +
            "<p>The party paying fixed is the <strong>payer</strong>. It gains when rates rise, which is equivalent to a short bond position. The party receiving fixed is the <strong>receiver</strong>. It gains when rates fall, which is equivalent to a long bond position.</p>" +
            "<p>Funds use IRS mainly for <strong>duration management</strong>: shortening it (hedging a bond portfolio — payer) or extending it without buying bonds (receiver).</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Agreeing terms.</strong> Notional, currency, start and maturity dates, fixed rate, floating index, payment frequencies and day-count conventions (e.g. fixed 30/360 annual, floating ACT/360 semi-annual).</li>" +
              "<li><strong>Value at inception ≈ 0.</strong> The fixed rate is set (par swap rate) so that the present values of both legs are equal. Neither party pays anything at inception, apart from any costs.</li>" +
              "<li><strong>Fixing.</strong> At the start of each period the floating leg gets its rate (IBOR — set in advance; overnight rates — compounded in arrears).</li>" +
              "<li><strong>Payments.</strong> On payment dates each party computes its interest: notional × rate × year fraction. When payments fall on the same day, only the difference is paid (netting).</li>" +
              "<li><strong>Valuation (mark-to-market).</strong> As market swap rates move, the present value of the fixed leg changes relative to the floating leg. The swap takes on positive value for one side and negative value for the other.</li>" +
              "<li><strong>Collateral.</strong> The parties exchange variation margin daily under the CSA (or with the CCP if cleared) and, where applicable, initial margin.</li>" +
              "<li><strong>Termination.</strong> The swap ends at maturity. It can also be closed early (paying market value — unwind), transferred to another party (novation) or reduced through portfolio compression.</li>" +
            "</ol>" +
            "<h3>Rate sensitivity</h3>" +
            "<p class='formula'>DV01 ≈ notional × fixed-leg duration × 0.0001</p>" +
            "<p>DV01 is the change in the swap's value for a 1 basis point (0.01%) shift in the curve.</p>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A bond fund (NAV EUR 200m) wants to shorten its portfolio duration. It enters a 5-year IRS on EUR 10m notional, <strong>paying fixed 2.50%</strong> (annual, 30/360) and <strong>receiving 6M EURIBOR</strong> (semi-annual, ACT/360).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Period (year 1)</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>Half-year 1: EURIBOR fixing 2.20%, 182 days — fund receives</td><td>10,000,000 × 2.20% × 182/360</td><td class='num'>+EUR 111,222.22</td></tr>" +
              "<tr><td>Half-year 2: EURIBOR fixing 2.40%, 183 days — fund receives</td><td>10,000,000 × 2.40% × 183/360</td><td class='num'>+EUR 122,000.00</td></tr>" +
              "<tr><td>Year end: fixed leg — fund pays</td><td>10,000,000 × 2.50% × 360/360</td><td class='num'>−EUR 250,000.00</td></tr>" +
              "<tr><td>Net payment at year end (half-year 2 + fixed leg)</td><td>122,000.00 − 250,000.00</td><td class='num'>−EUR 128,000.00</td></tr>" +
              "<tr><td>Year 1 cash result</td><td>111,222.22 + 122,000.00 − 250,000.00</td><td class='num'>−EUR 16,777.78</td></tr>" +
            "</tbody></table></div>" +
            "<p>A negative first-year cash flow is not a loss on the trade — it is the cost of the hedge when floating rates are below the fixed rate. The change in market value matters more.</p>" +
            "<h3>A rate move</h3>" +
            "<p>Assume a fixed-leg duration of about 4.7. DV01 ≈ 10,000,000 × 4.7 × 0.0001 = <strong>EUR 4,700 per bp</strong>. If 5-year swap rates rise by 20 bp, the swap's value to the fund (payer) rises by about EUR 94,000. This offsets the fall in the value of the bonds in the portfolio.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<div class='table-scroll'><table class='calc'><tbody>" +
              "<tr><td>Commitment exposure (plain vanilla IRS = notional)</td><td class='num'>EUR 10,000,000 = 5.00% of NAV</td></tr>" +
              "<tr><td>Swap market value (MtM) to the fund</td><td class='num'>+EUR 94,000</td></tr>" +
              "<tr><td>Collateral received under the CSA (VM)</td><td class='num'>−EUR 90,000</td></tr>" +
              "<tr><td>Counterparty exposure (bilateral swap)</td><td class='num'>EUR 4,000 = 0.002% of NAV</td></tr>" +
              "<tr><td>UCITS counterparty limit (bank)</td><td class='num'>10% of NAV</td></tr>" +
            "</tbody></table></div>" +
            "<p>If the swap were cleared through a CCP authorised or recognised under EMIR, the UCITS counterparty limit would not apply to it (after the EMIR 3 amendments).</p>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> discounted cash flows of both legs. Future floating rates are projected from the index's forward curve and usually discounted on the OIS curve (e.g. €STR), consistent with the interest paid on CSA collateral. UCITS requires a daily, independent and verifiable valuation.</p>" +
            "<ul>" +
              "<li><strong>Interest rate risk</strong> — shifts in the level and shape of the curve (DV01, bucketed tenor risk).</li>" +
              "<li><strong>Counterparty risk</strong> — for bilateral swaps; reduced by the CSA and haircuts.</li>" +
              "<li><strong>Liquidity risk</strong> — cash VM calls when rates move.</li>" +
              "<li><strong>Basis risk</strong> — mismatch between the swap index and the rate the fund is hedging.</li>" +
              "<li><strong>Legal and documentation risk</strong> — close-out netting on a counterparty's default depends on the ISDA and legal opinions.</li>" +
              "<li><strong>Benchmark risk</strong> — replacement or cessation of the index (fallback clauses).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li><strong>Onboarding:</strong> ISDA and CSA signed, counterparty on the approved list, LEI.</li>" +
              "<li><strong>Execution:</strong> by voice or on a platform (MTF/OTF). For classes under the derivatives trading obligation (DTO) — on a platform.</li>" +
              "<li><strong>Confirmation:</strong> electronic (e.g. MarkitWire, DTCC). EMIR requires timely confirmation (for FCs — by the end of the next business day).</li>" +
              "<li><strong>Clearing:</strong> where the clearing obligation applies or the parties choose it — submission to a CCP through a clearing broker.</li>" +
              "<li><strong>During the life:</strong> fixings, payments, daily valuation, VM and IM, portfolio reconciliation, dispute resolution.</li>" +
              "<li><strong>Termination:</strong> maturity, unwind, novation or compression.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>OTC derivative eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>The underlying is interest rates (eligible). The counterparty is subject to prudential supervision and belongs to a category approved by the regulator. The derivative has a daily, reliable and verifiable valuation and can be sold, liquidated or closed by an offsetting transaction at fair value at any time at the UCITS's initiative.</p></div>" +
              "<div class='rule'><h4>Counterparty limit <span class='law'>Art. 52(1), second subpara.</span></h4><p>Counterparty exposure from derivatives that are not centrally cleared: max <strong>10% of NAV</strong> where the counterparty is a credit institution under Art. 50(1)(f), and <strong>5% of NAV</strong> otherwise. After EMIR 3 (Dir. 2024/2994) the limit does not apply to trades cleared through a CCP authorised or recognised under EMIR.</p></div>" +
              "<div class='rule'><h4>Measuring counterparty exposure <span class='law'>ESMA/2014/937</span></h4><p>Positive MtM less collateral received, provided the collateral meets the guidelines: liquidity, daily valuation, issuer credit quality, low correlation with the counterparty, diversification (as a rule max 20% of NAV in collateral from one issuer), no reinvestment of non-cash collateral, haircuts applied.</p></div>" +
              "<div class='rule'><h4>20% combined limit <span class='law'>Art. 52(2)</span></h4><p>Derivative exposure to a bank is added to deposits with it and securities it has issued — in total ≤ 20% of NAV.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>Art. 51(3); CESR/10-788</span></h4><p>Commitment approach: plain vanilla IRS = notional. The guidelines allow duration-netting rules for interest rate portfolios. Funds that use derivatives extensively apply the VaR approach.</p></div>" +
              "<div class='rule'><h4>Risk management process <span class='law'>Art. 51(1)</span></h4><p>The management company has a process for accurate and independent valuation of OTC derivatives and regularly informs the regulator of derivative types, risks, limits and measurement methods.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Art. 7–8, Annex II Reg. 231/2013</span>: IRS is converted at notional. The gross method allows no netting. The commitment method allows netting, hedging and duration netting under the Regulation's conditions.</li>" +
              "<li><strong>Maximum leverage</strong> set in the AIF's documents and disclosed to investors; monitoring and Annex IV reporting.</li>" +
              "<li><strong>Counterparty selection and counterparty risk</strong> — under the AIFM's risk management policy. The Directive sets no percentage limit; limits come from the AIF's documents.</li>" +
              "<li><strong>Valuation</strong> <span class='law'>Art. 19 AIFMD</span> — proper and independent valuation of assets, including OTC derivatives.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, margin, reporting",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Fund status <span class='law'>Art. 2(8) EMIR</span></h4><p>UCITS and AIFs managed by an AIFM are financial counterparties (FCs). FCs below the clearing thresholds (including EUR 3bn gross notional for interest rate derivatives) are exempt from the clearing obligation.</p></div>" +
              "<div class='rule'><h4>Clearing obligation <span class='law'>Art. 4 EMIR; Reg. 2015/2205, 2016/1178</span></h4><p>Covers, among others, plain vanilla IRS (fixed-to-float), basis swaps, FRAs and OIS in EUR, USD, GBP and JPY, as well as IRS and FRAs in PLN, NOK and SEK — for specified tenors and for counterparties above the thresholds.</p></div>" +
              "<div class='rule'><h4>Non-centrally cleared swaps <span class='law'>Art. 11 EMIR; Reg. 2016/2251</span></h4><p>Timely confirmation, portfolio reconciliation, compression, dispute resolution, daily valuation. Variation margin is mandatory between FCs. Initial margin applies where the average aggregate notional amount (AANA) of both parties exceeds EUR 8bn.</p></div>" +
              "<div class='rule'><h4>Reporting <span class='law'>Art. 9 EMIR</span></h4><p>To a trade repository by T+1: UTI, UPI, counterparty LEIs, notional, rates, dates, daily valuation and collateral. The management company or AIFM is responsible on the fund's behalf.</p></div>" +
              "<div class='rule'><h4>Benchmarks <span class='law'>Reg. 2016/1011 (BMR)</span></h4><p>Supervised entities may only use benchmarks from administrators in the ESMA register and must have contingency plans in case a benchmark changes or ceases.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI</strong> (Unique Transaction Identifier) — trade identifier agreed between the parties.</li>" +
              "<li><strong>UPI</strong> (Unique Product Identifier, ANNA DSB) — product identifier required in EMIR reports.</li>" +
              "<li><strong>OTC ISIN</strong> (ANNA DSB) — for derivatives traded on venues (MiFIR).</li>" +
              "<li><strong>CFI</strong> — category <code>S</code> (Swaps), group <code>R</code> (Rates).</li>" +
              "<li><strong>Counterparty LEI</strong> — to aggregate counterparty limits and the 20% combined limit.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Were the ISDA/CSA signed before the trade, and is the counterparty on the approved list?</li>" +
              "<li>Clearing status: is the trade subject to the clearing obligation and has it been cleared through a CCP?</li>" +
              "<li>5% / 10% counterparty limit (bilateral swaps) and 20% combined limit against the counterparty group.</li>" +
              "<li>Collateral: are assets received eligible, diversified and valued with haircuts?</li>" +
              "<li>Global exposure (commitment or VaR) and AIF leverage.</li>" +
              "<li>Independent valuation and MtM reconciliation with the counterparty (valuation disputes).</li>" +
              "<li>EMIR report sent by T+1; confirmation on time.</li>" +
              "<li>Benchmark in the BMR register; fallback provisions in the documentation.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Swap rate", "The fixed rate at which the swap's value at inception is zero."],
        ["Payer / Receiver", "The party paying fixed / the party receiving fixed."],
        ["DV01 / PV01", "Change in a position's value for a 1 basis point change in rates."],
        ["CSA (Credit Support Annex)", "Annex to the ISDA governing collateral exchange: eligible assets, haircuts, thresholds, minimum transfer amount."],
        ["Fixing", "Setting the reference rate for a given interest period."],
        ["Compression", "Reducing the number and notional of offsetting trades without changing net market risk."]
      ]
    }
  }
});

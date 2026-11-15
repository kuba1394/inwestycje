window.INSTRUMENTS.push({
  id: "common-stock",
  name: "Common Stock",
  aliases: ["Ordinary Share", "Equity Share", "akcja zwykła"],
  market: "exchange",
  asset: { pl: "Akcje", en: "Equity" },
  sources: ["ucits", "eligible", "aifmd", "csdrT1", "td", "ssr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Akcja zwykła to papier wartościowy reprezentujący udział we własności spółki. Daje prawo do części zysku (dywidendy), głosu na walnym zgromadzeniu i do majątku spółki w razie likwidacji, ale dopiero po zaspokojeniu wszystkich wierzycieli.",
      keyFacts: [
        ["Rynek", "Giełda (rynek regulowany, MTF). Duże pakiety bywają też zawierane poza arkuszem (transakcje pakietowe, OTC)."],
        ["Rozliczenie", "UE: T+2, od 11.10.2027 T+1. USA: T+1 (od maja 2024)."],
        ["Dostawa", "Zapis na rachunku w depozycie (CSD), dostawa za płatność (DvP)."],
        ["Dźwignia", "Brak — pozycja jest w pełni opłacona."],
        ["Maksymalna strata (pozycja długa)", "100% zainwestowanej kwoty."],
        ["Przepływy dla posiadacza", "Dywidendy (niegwarantowane), zmiana kursu, zdarzenia korporacyjne."],
        ["Kod CFI", "<code>ES****</code> (Equities – Shares), np. <code>ESVUFR</code>"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p>Akcja zwykła (<em>Common Stock</em>) to tytuł własności części kapitału spółki akcyjnej. Akcjonariusz jest <strong>właścicielem rezydualnym</strong>: zarabia dopiero wtedy, gdy spółka zaspokoi pracowników, dostawców, banki i obligatariuszy. Ma też <strong>ograniczoną odpowiedzialność</strong> — może stracić najwyżej to, co zapłacił za akcje.</p>" +
            "<p>Z akcją zwykłą wiążą się zazwyczaj trzy grupy praw:</p>" +
            "<ul>" +
              "<li><strong>majątkowe</strong> — prawo do dywidendy, prawo poboru nowych akcji, udział w majątku likwidacyjnym;</li>" +
              "<li><strong>korporacyjne</strong> — prawo głosu na walnym zgromadzeniu (zwykle 1 akcja = 1 głos), prawo do informacji;</li>" +
              "<li><strong>zbywalność</strong> — akcję notowaną można w każdej chwili sprzedać na giełdzie.</li>" +
            "</ul>" +
            "<p>Od akcji uprzywilejowanych (<em>Preferred Stock</em>) różni się tym, że nie daje pierwszeństwa do dywidendy ani do majątku przy likwidacji, za to zwykle daje pełne prawo głosu.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Emisja (rynek pierwotny).</strong> Spółka sprzedaje nowe akcje w ofercie publicznej (IPO) lub w kolejnej emisji (SPO) i dostaje za nie pieniądze. To jedyny moment, w którym pieniądze inwestorów trafiają do spółki.</li>" +
              "<li><strong>Dopuszczenie do obrotu.</strong> Akcje dostają kod ISIN, są rejestrowane w centralnym depozycie (CSD, np. KDPW, Euroclear, Clearstream) i dopuszczane do obrotu na giełdzie.</li>" +
              "<li><strong>Handel (rynek wtórny).</strong> Fundusz składa zlecenie przez brokera. Giełda kojarzy zlecenia kupna i sprzedaży w arkuszu zleceń (<em>order book</em>). Cena wynika wyłącznie z podaży i popytu. Spółka na tym obrocie nic nie zarabia.</li>" +
              "<li><strong>Potwierdzenie i clearing.</strong> W dniu transakcji (T) broker i depozytariusz funduszu uzgadniają szczegóły (cena, liczba, data rozliczenia). Na wielu rynkach transakcję przejmuje izba rozliczeniowa (CCP) i staje się stroną dla obu uczestników.</li>" +
              "<li><strong>Rozrachunek.</strong> W T+2 (w UE; od 11.10.2027 T+1) CSD jednocześnie przenosi akcje na rachunek depozytariusza funduszu i gotówkę do sprzedającego — to zasada <em>Delivery versus Payment</em> (DvP).</li>" +
              "<li><strong>Posiadanie.</strong> Fundusz dostaje dywidendy, może głosować na walnych i uczestniczy w zdarzeniach korporacyjnych (split, prawa poboru, wezwania).</li>" +
              "<li><strong>Wynik.</strong> Zysk albo strata to zmiana kursu plus otrzymane dywidendy, minus koszty transakcyjne i podatek u źródła.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz UCITS o aktywach netto (NAV) 200 mln PLN kupuje 100 000 akcji spółki X po 85,00 PLN.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th class='num'>Wartość</th></tr></thead><tbody>" +
              "<tr><td>Wartość transakcji: 100 000 × 85,00</td><td class='num'>8 500 000 PLN</td></tr>" +
              "<tr><td>Prowizja brokera 0,05%</td><td class='num'>4 250 PLN</td></tr>" +
              "<tr><td>Udział w NAV: 8,5 mln / 200 mln</td><td class='num'>4,25%</td></tr>" +
              "<tr><td>Dywidenda 3,00 PLN na akcję (brutto)</td><td class='num'>300 000 PLN</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Daty dywidendy</h3>" +
            "<p>Akcję trzeba kupić <strong>przed dniem ex-dividend</strong>. Kto kupi w dniu ex-date lub później, nie dostanie dywidendy, bo przy rozliczeniu T+2 nie będzie akcjonariuszem w dniu ustalenia prawa (<em>record date</em>). W dniu ex-date kurs zwykle spada mniej więcej o wartość dywidendy.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<p>Po pół roku kurs rośnie do 105,00 PLN, a NAV do 206 mln PLN. Pozycja jest warta 10,5 mln PLN, czyli <strong>5,10% NAV</strong>. Przekroczenie progu 5% nie oznacza jeszcze naruszenia limitu. Pozycja trafia jednak do „koszyka 40%” (zasada 5/10/40, niżej) i trzeba sprawdzić, czy suma wszystkich pozycji powyżej 5% nie przekracza 40% NAV. Przekroczenie spowodowane wyłącznie wzrostem kursu jest przekroczeniem <strong>pasywnym</strong>.</p>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> zwykle kurs zamknięcia z rynku głównego (lub z rynku wskazanego w polityce wyceny). Gdy notowania są zawieszone albo obrót jest bardzo mały, stosuje się wartość godziwą według polityki wyceny funduszu.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko rynkowe</strong> — zmiana kursu, w tym ryzyko całego rynku (beta).</li>" +
              "<li><strong>Ryzyko specyficzne emitenta</strong> — wyniki, zadłużenie, ład korporacyjny, w skrajnym przypadku upadłość.</li>" +
              "<li><strong>Ryzyko płynności</strong> — szeroki spread i mały średni dzienny obrót (ADV). Miarą jest liczba dni potrzebnych do upłynnienia pozycji.</li>" +
              "<li><strong>Ryzyko walutowe</strong> — akcje notowane w innej walucie niż waluta bazowa funduszu.</li>" +
              "<li><strong>Ryzyko rozrachunku</strong> — niedostarczenie akcji w terminie (kary CSDR za nieudane rozrachunki).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia korporacyjne",
          html:
            "<ul>" +
              "<li><strong>Dywidenda</strong> gotówkowa, w akcjach lub do wyboru (<em>scrip</em>).</li>" +
              "<li><strong>Split / reverse split</strong> — zmienia się liczba akcji i kurs, a wartość pozycji zostaje ta sama. Trzeba zaktualizować dane w systemie kontroli.</li>" +
              "<li><strong>Prawa poboru</strong> (<em>rights issue</em>) — w portfelu pojawia się nowy instrument z osobnym ISIN. Trzeba sprawdzić jego dopuszczalność i limity.</li>" +
              "<li><strong>Spin-off</strong> — fundusz dostaje akcje nowej spółki, czasem nienotowanej.</li>" +
              "<li><strong>Wezwanie / fuzja</strong> — zamiana akcji na gotówkę lub na akcje innego emitenta.</li>" +
              "<li><strong>Delisting</strong> — akcja przestaje spełniać warunki „notowanego” papieru i trafia do limitu 10% na inne papiery (patrz UCITS niżej).</li>" +
            "</ul>" +
            "<div class='callout warn'><strong>Uwaga kontrolna</strong>Zdarzenia korporacyjne są częstą przyczyną pasywnych przekroczeń limitów i pojawienia się w portfelu instrumentów niedopuszczalnych. Warto codziennie zestawiać kalendarz zdarzeń korporacyjnych z portfelami.</div>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. a–d UCITS</span></h4><p>Zbywalne papiery wartościowe dopuszczone do obrotu na rynku regulowanym lub notowane na innym rynku regulowanym, regularnie działającym, uznanym i otwartym dla publiczności (zgodnie z prospektem lub regulaminem). Nowe emisje są dopuszczalne, jeśli warunki emisji przewidują wniosek o dopuszczenie do obrotu, a dopuszczenie nastąpi w ciągu roku.</p></div>" +
              "<div class='rule'><h4>Kryteria zbywalnego papieru <span class='law'>art. 2 dyr. 2007/16/WE</span></h4><p>Potencjalna strata ograniczona do zapłaconej kwoty, płynność nie zagraża zdolności funduszu do umarzania jednostek, wiarygodna wycena, dostępna informacja, zbywalność, zgodność z celem inwestycyjnym, ryzyko ujęte w procesie zarządzania ryzykiem.</p></div>" +
              "<div class='rule'><h4>Inne papiery — limit 10% <span class='law'>art. 50 ust. 2 lit. a</span></h4><p>Do 10% NAV w zbywalne papiery i instrumenty rynku pieniężnego, które nie spełniają warunków z ust. 1 (np. akcje nienotowane, po delistingu).</p></div>" +
              "<div class='rule'><h4>Zasada 5/10/40 <span class='law'>art. 52 ust. 1–2</span></h4><p>Najwyżej 5% NAV w papiery jednego emitenta. Limit można podnieść do 10%, jeśli suma wszystkich pozycji przekraczających 5% nie przekracza 40% NAV.</p></div>" +
              "<div class='rule'><h4>Limit łączny 20% <span class='law'>art. 52 ust. 2</span></h4><p>Papiery wartościowe i instrumenty rynku pieniężnego wyemitowane przez jeden podmiot, depozyty w nim i ekspozycja na niego z derywatów łącznie nie mogą przekroczyć 20% NAV.</p></div>" +
              "<div class='rule'><h4>Grupa kapitałowa <span class='law'>art. 52 ust. 5</span></h4><p>Spółki z jednej grupy traktuje się jak jednego emitenta. Łącznie do 20% NAV w papiery i instrumenty rynku pieniężnego tej samej grupy.</p></div>" +
              "<div class='rule'><h4>Fundusze indeksowe <span class='law'>art. 53</span></h4><p>Fundusz odwzorowujący indeks akcji może mieć do 20% NAV w jednym emitencie, a wyjątkowo do 35% (tylko dla jednego emitenta, gdy uzasadniają to warunki rynkowe).</p></div>" +
              "<div class='rule'><h4>Limity nabycia (kontroli) <span class='law'>art. 56</span></h4><p>Spółka zarządzająca, dla wszystkich swoich UCITS łącznie, nie może nabyć akcji z prawem głosu, które dałyby jej znaczący wpływ na zarządzanie emitentem. Pojedynczy UCITS może mieć najwyżej 10% akcji bez prawa głosu jednego emitenta.</p></div>" +
              "<div class='rule'><h4>Przekroczenia <span class='law'>art. 57</span></h4><p>Przekroczenie z przyczyn niezależnych od funduszu (zmiana kursu, umorzenia, zdarzenie korporacyjne) trzeba usunąć w pierwszej kolejności, uwzględniając interes uczestników. Przekroczenie aktywne (wynikające z transakcji) koryguje się niezwłocznie; ewentualną stratę funduszu rekompensuje się zgodnie z polityką i praktyką nadzorcy.</p></div>" +
              "<div class='rule'><h4>Krótka sprzedaż <span class='law'>art. 89</span></h4><p>UCITS nie może sprzedawać niekrytych (nieposiadanych) papierów. Ekspozycję krótką można uzyskać tylko przez instrumenty pochodne.</p></div>" +
            "</div>" +
            "<p>Akcja bez wbudowanego instrumentu pochodnego nie zwiększa ekspozycji całkowitej (<em>global exposure</em>) z instrumentów pochodnych.</p>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Brak limitów inwestycyjnych w dyrektywie.</strong> Limity AIF wynikają z jego dokumentów (regulamin, prospekt, LPA) i z prawa krajowego. Kontrola compliance sprawdza zgodność z tymi dokumentami.</li>" +
              "<li><strong>Dźwignia</strong> <span class='law'>art. 7–8 rozp. 231/2013</span> — akcja opłacona gotówką wchodzi do ekspozycji według wartości rynkowej i sama nie podnosi dźwigni ponad 1×. Dźwignię zwiększa dopiero finansowanie zakupu (kredyt, repo).</li>" +
              "<li><strong>Kontrola spółek nienotowanych</strong> <span class='law'>art. 26–30 AIFMD</span> — zawiadomienie nadzorcy o przekroczeniu progów 10%, 20%, 30%, 50% i 75% praw głosu w spółce nienotowanej. Po przejęciu kontroli (powyżej 50%) obowiązują dodatkowe ujawnienia i ograniczenia wypłat z kapitału (<em>asset stripping</em>) przez 24 miesiące.</li>" +
              "<li><strong>Płynność</strong> <span class='law'>art. 16</span> — profil płynności portfela musi odpowiadać polityce umorzeń AIF.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html:
            "<ul>" +
              "<li><strong>Znaczne pakiety akcji</strong> <span class='law'>dyr. 2004/109/WE</span> — zawiadomienie przy osiągnięciu lub przekroczeniu progów praw głosu w spółce notowanej. W dyrektywie progi to 5, 10, 15, 20, 25, 30, 50 i 75%, a prawo krajowe może dodawać niższe. Zwykle liczy się je na poziomie spółki zarządzającej, sumując wszystkie zarządzane fundusze.</li>" +
              "<li><strong>Krótka sprzedaż</strong> <span class='law'>rozp. 236/2012 (SSR)</span> — pozycję krótką netto (także powstałą przez derywaty) zgłasza się nadzorcy od 0,1% kapitału zakładowego, a publikuje od 0,5%.</li>" +
              "<li><strong>Raportowanie transakcji MiFIR</strong> (art. 26) — po stronie firmy inwestycyjnej, która wykonuje zlecenie.</li>" +
              "<li><strong>EMIR / SFTR</strong> — nie dotyczy samej akcji. Dotyczy jej pożyczki (SFTR) lub derywatu na akcję (EMIR).</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> — 12 znaków, prefiks kraju emitenta (np. <code>PL…</code>, <code>US…</code>).</li>" +
              "<li><strong>CFI</strong> (ISO 10962) — kategoria <code>E</code> (Equities), grupa <code>S</code> (Shares). Przykład <code>ESVUFR</code>: prawo głosu, bez ograniczeń zbywalności, w pełni opłacona, imienna.</li>" +
              "<li><strong>Ticker i MIC</strong> — symbol na giełdzie oraz kod rynku (np. <code>XWAR</code> — GPW, <code>XETR</code> — Xetra).</li>" +
              "<li><strong>LEI emitenta</strong> — potrzebny do agregacji limitów emitenta i grupy.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Czy papier jest dopuszczony do obrotu na rynku uznanym w prospekcie lub regulaminie? Jeśli nie — czy mieści się w limicie 10%?</li>" +
              "<li>Test 5/10/40 i limitu łącznego 20% na emitenta oraz grupę kapitałową (wg LEI emitenta i jednostki dominującej).</li>" +
              "<li>Udział w akcjach emitenta w skali wszystkich funduszy spółki zarządzającej (art. 56) i progi zawiadomień o znacznych pakietach.</li>" +
              "<li>Zdarzenia korporacyjne z dnia: czy w portfelu pojawiły się nowe instrumenty (prawa poboru, spin-off) i czy są dopuszczalne?</li>" +
              "<li>Pasywne przekroczenia: rejestr, termin i plan usunięcia.</li>" +
              "<li>Płynność: liczba dni upłynnienia pozycji w porównaniu z polityką funduszu.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["DvP (Delivery versus Payment)", "Rozrachunek, w którym papiery i gotówka przechodzą jednocześnie, więc żadna strona nie ryzykuje, że odda swoje i nic nie dostanie."],
        ["CSD (Central Securities Depository)", "Centralny depozyt papierów wartościowych, który prowadzi rejestr własności i rozlicza transakcje."],
        ["Ex-dividend date", "Pierwszy dzień notowań bez prawa do bieżącej dywidendy."],
        ["Record date", "Dzień, w którym ustala się listę akcjonariuszy uprawnionych do dywidendy."],
        ["Free float", "Akcje w wolnym obrocie, bez pakietów strategicznych."],
        ["ADV (Average Daily Volume)", "Średni dzienny wolumen obrotu, podstawowa miara płynności akcji."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A common stock is a security that represents a share of ownership in a company. It gives the holder a right to part of the profits (dividends), a vote at the general meeting and a claim on the company's assets in liquidation, but only after all creditors have been paid.",
      keyFacts: [
        ["Market", "Exchange (regulated market, MTF). Large blocks may also be traded off-book (block trades, OTC)."],
        ["Settlement", "EU: T+2, T+1 from 11 Oct 2027. US: T+1 (since May 2024)."],
        ["Delivery", "Book-entry transfer at the CSD, delivery versus payment (DvP)."],
        ["Leverage", "None — the position is fully paid."],
        ["Maximum loss (long position)", "100% of the amount invested."],
        ["Cash flows to holder", "Dividends (not guaranteed), price change, corporate actions."],
        ["CFI code", "<code>ES****</code> (Equities – Shares), e.g. <code>ESVUFR</code>"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A common stock is an ownership claim on part of a company's share capital. The shareholder is the <strong>residual claimant</strong>: they earn only after the company has paid employees, suppliers, banks and bondholders. Their <strong>liability is limited</strong> — the most they can lose is what they paid for the shares.</p>" +
            "<p>A common stock usually carries three groups of rights:</p>" +
            "<ul>" +
              "<li><strong>economic</strong> — right to dividends, pre-emption rights on new shares, share of liquidation proceeds;</li>" +
              "<li><strong>corporate</strong> — voting at the general meeting (usually one share, one vote), right to information;</li>" +
              "<li><strong>transferability</strong> — a listed share can be sold on the exchange at any time.</li>" +
            "</ul>" +
            "<p>Unlike Preferred Stock, it has no priority for dividends or liquidation proceeds, but it normally carries full voting rights.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Issuance (primary market).</strong> The company sells new shares in an initial public offering (IPO) or a secondary offering (SPO) and receives cash. This is the only moment investors' money reaches the company.</li>" +
              "<li><strong>Admission to trading.</strong> The shares get an ISIN, are registered at a central securities depository (CSD, e.g. KDPW, Euroclear, Clearstream) and admitted to trading on an exchange.</li>" +
              "<li><strong>Trading (secondary market).</strong> The fund places an order through a broker. The exchange matches buy and sell orders in the order book. The price is set purely by supply and demand. The company earns nothing from this trading.</li>" +
              "<li><strong>Confirmation and clearing.</strong> On trade date (T) the broker and the fund's depositary agree the details (price, quantity, settlement date). In many markets a central counterparty (CCP) steps in and becomes the counterparty to both sides.</li>" +
              "<li><strong>Settlement.</strong> On T+2 (EU; T+1 from 11 Oct 2027) the CSD moves the shares to the depositary's account and the cash to the seller at the same moment — Delivery versus Payment (DvP).</li>" +
              "<li><strong>Holding.</strong> The fund receives dividends, can vote at general meetings and takes part in corporate actions (splits, rights issues, tender offers).</li>" +
              "<li><strong>Result.</strong> Profit or loss equals the price change plus dividends received, minus transaction costs and withholding tax.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A UCITS fund with net asset value (NAV) of PLN 200m buys 100,000 shares of company X at PLN 85.00.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th class='num'>Value</th></tr></thead><tbody>" +
              "<tr><td>Trade value: 100,000 × 85.00</td><td class='num'>PLN 8,500,000</td></tr>" +
              "<tr><td>Broker commission 0.05%</td><td class='num'>PLN 4,250</td></tr>" +
              "<tr><td>Share of NAV: 8.5m / 200m</td><td class='num'>4.25%</td></tr>" +
              "<tr><td>Dividend PLN 3.00 per share (gross)</td><td class='num'>PLN 300,000</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Dividend dates</h3>" +
            "<p>The share must be bought <strong>before the ex-dividend date</strong>. A buyer on or after the ex-date gets no dividend, because with T+2 settlement they will not be a shareholder on the record date. On the ex-date the price usually falls by roughly the dividend amount.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<p>Six months later the price is PLN 105.00 and NAV is PLN 206m. The position is worth PLN 10.5m, i.e. <strong>5.10% of NAV</strong>. Going above 5% is not yet a breach. The position does, however, move into the \"40% bucket\" (5/10/40 rule, below), so you must check that all positions above 5% together stay within 40% of NAV. A breach caused purely by price movement is a <strong>passive</strong> breach.</p>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> normally the closing price on the main market (or the market named in the valuation policy). If trading is suspended or very thin, fair value is applied under the fund's valuation policy.</p>" +
            "<ul>" +
              "<li><strong>Market risk</strong> — price changes, including broad market (beta) risk.</li>" +
              "<li><strong>Issuer-specific risk</strong> — earnings, leverage, governance and, at worst, insolvency.</li>" +
              "<li><strong>Liquidity risk</strong> — wide spreads and low average daily volume (ADV). It is measured as the number of days needed to liquidate the position.</li>" +
              "<li><strong>FX risk</strong> — shares listed in a currency other than the fund's base currency.</li>" +
              "<li><strong>Settlement risk</strong> — failure to deliver on time (CSDR cash penalties for settlement fails).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and corporate actions",
          html:
            "<ul>" +
              "<li><strong>Dividend</strong> in cash, in shares or at the holder's election (scrip).</li>" +
              "<li><strong>Split / reverse split</strong> — the number of shares and the price change, but the position value stays the same. Static data in the compliance system must be updated.</li>" +
              "<li><strong>Rights issue</strong> — a new instrument with its own ISIN appears in the portfolio. Its eligibility and limits must be checked.</li>" +
              "<li><strong>Spin-off</strong> — the fund receives shares of a new company, sometimes unlisted.</li>" +
              "<li><strong>Tender offer / merger</strong> — shares are exchanged for cash or for shares of another issuer.</li>" +
              "<li><strong>Delisting</strong> — the share no longer qualifies as a \"listed\" security and falls into the 10% limit for other securities (see UCITS below).</li>" +
            "</ul>" +
            "<div class='callout warn'><strong>Control note</strong>Corporate actions often cause passive limit breaches and bring ineligible instruments into the portfolio. It is worth matching the corporate actions calendar against portfolios every day.</div>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(a)–(d) UCITS</span></h4><p>Transferable securities admitted to a regulated market, or dealt in on another regulated market that operates regularly, is recognised and open to the public (as set out in the prospectus or fund rules). Recent issues qualify if their terms include an undertaking to apply for admission and admission is obtained within one year.</p></div>" +
              "<div class='rule'><h4>Transferable security criteria <span class='law'>Art. 2 Dir. 2007/16/EC</span></h4><p>Potential loss limited to the amount paid, liquidity does not compromise the fund's ability to meet redemptions, reliable valuation, appropriate information available, negotiable, consistent with the investment objective, risk captured by the risk management process.</p></div>" +
              "<div class='rule'><h4>Other securities — 10% limit <span class='law'>Art. 50(2)(a)</span></h4><p>Up to 10% of NAV in transferable securities and money market instruments that do not meet the conditions of para. 1 (e.g. unlisted or delisted shares).</p></div>" +
              "<div class='rule'><h4>5/10/40 rule <span class='law'>Art. 52(1)–(2)</span></h4><p>At most 5% of NAV in securities of a single issuer. This can be raised to 10%, provided that all positions above 5% together do not exceed 40% of NAV.</p></div>" +
              "<div class='rule'><h4>20% combined limit <span class='law'>Art. 52(2)</span></h4><p>Securities and money market instruments issued by a single body, deposits with it and derivative exposure to it together must not exceed 20% of NAV.</p></div>" +
              "<div class='rule'><h4>Group of companies <span class='law'>Art. 52(5)</span></h4><p>Companies in the same group are treated as a single issuer. Up to 20% of NAV in total in securities and money market instruments of the same group.</p></div>" +
              "<div class='rule'><h4>Index-tracking funds <span class='law'>Art. 53</span></h4><p>A fund replicating an equity index may hold up to 20% of NAV in a single issuer, and exceptionally up to 35% (for one issuer only, where market conditions justify it).</p></div>" +
              "<div class='rule'><h4>Acquisition (control) limits <span class='law'>Art. 56</span></h4><p>The management company, across all its UCITS, may not acquire voting shares that would let it exercise significant influence over the issuer's management. A single UCITS may hold at most 10% of an issuer's non-voting shares.</p></div>" +
              "<div class='rule'><h4>Breaches <span class='law'>Art. 57</span></h4><p>A breach for reasons beyond the fund's control (price moves, redemptions, a corporate action) must be remedied as a priority, taking account of unitholders' interests. An active breach (caused by a trade) is corrected without delay; any loss to the fund is compensated in line with policy and supervisory practice.</p></div>" +
              "<div class='rule'><h4>Short selling <span class='law'>Art. 89</span></h4><p>A UCITS may not carry out uncovered sales of securities. Short exposure can only be obtained through derivatives.</p></div>" +
            "</div>" +
            "<p>A share without an embedded derivative does not add to derivative global exposure.</p>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>No investment limits in the Directive.</strong> AIF limits come from its documents (rules, prospectus, LPA) and from national law. Compliance monitoring checks adherence to those documents.</li>" +
              "<li><strong>Leverage</strong> <span class='law'>Art. 7–8 Reg. 231/2013</span> — a share paid in cash enters exposure at market value and on its own does not raise leverage above 1×. Leverage increases only when the purchase is financed (borrowing, repo).</li>" +
              "<li><strong>Control of unlisted companies</strong> <span class='law'>Art. 26–30 AIFMD</span> — notify the regulator when crossing 10%, 20%, 30%, 50% and 75% of voting rights in an unlisted company. After acquiring control (above 50%) additional disclosures apply, as do restrictions on distributions from capital (asset stripping) for 24 months.</li>" +
              "<li><strong>Liquidity</strong> <span class='law'>Art. 16</span> — the portfolio's liquidity profile must match the AIF's redemption policy.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html:
            "<ul>" +
              "<li><strong>Major holdings</strong> <span class='law'>Dir. 2004/109/EC</span> — notification when reaching or crossing voting-right thresholds in a listed company. The Directive sets 5, 10, 15, 20, 25, 30, 50 and 75%, and national law may add lower ones. They are usually calculated at management company level, aggregating all managed funds.</li>" +
              "<li><strong>Short selling</strong> <span class='law'>Reg. 236/2012 (SSR)</span> — a net short position (including one created through derivatives) is notified to the regulator from 0.1% of issued share capital and published from 0.5%.</li>" +
              "<li><strong>MiFIR transaction reporting</strong> (Art. 26) — done by the investment firm executing the order.</li>" +
              "<li><strong>EMIR / SFTR</strong> — do not apply to the share itself. They apply to lending it (SFTR) or to a derivative on it (EMIR).</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> — 12 characters, prefixed with the issuer's country code (e.g. <code>PL…</code>, <code>US…</code>).</li>" +
              "<li><strong>CFI</strong> (ISO 10962) — category <code>E</code> (Equities), group <code>S</code> (Shares). Example <code>ESVUFR</code>: voting, free transfer, fully paid, registered.</li>" +
              "<li><strong>Ticker and MIC</strong> — exchange symbol and market code (e.g. <code>XWAR</code> — Warsaw Stock Exchange, <code>XETR</code> — Xetra).</li>" +
              "<li><strong>Issuer LEI</strong> — needed to aggregate issuer and group limits.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Is the security admitted to a market recognised in the prospectus or fund rules? If not, does it fit within the 10% limit?</li>" +
              "<li>5/10/40 test and 20% combined limit per issuer and per group (using the issuer's and parent's LEI).</li>" +
              "<li>Holding of the issuer's shares across all funds of the management company (Art. 56) and major-holding notification thresholds.</li>" +
              "<li>Today's corporate actions: have new instruments appeared (rights, spin-offs) and are they eligible?</li>" +
              "<li>Passive breaches: log, deadline and remediation plan.</li>" +
              "<li>Liquidity: days to liquidate compared with the fund's policy.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["DvP (Delivery versus Payment)", "Settlement in which securities and cash move at the same moment, so neither side risks handing over its part and getting nothing back."],
        ["CSD (Central Securities Depository)", "The institution that keeps the register of ownership and settles transactions."],
        ["Ex-dividend date", "The first trading day without the right to the current dividend."],
        ["Record date", "The date on which the list of shareholders entitled to the dividend is fixed."],
        ["Free float", "Shares available for trading, excluding strategic holdings."],
        ["ADV (Average Daily Volume)", "Average number of shares traded per day; the basic measure of a stock's liquidity."]
      ]
    }
  }
});

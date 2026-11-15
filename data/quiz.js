/*
 * Quizy. Każdy zestaw: { id, title, kind: "topic" | "card", questions: [{ q, o: [opcje], a: indeks poprawnej, e: wyjaśnienie }] }
 * Zestawy "card" mają id równe id karty instrumentu (link „Sprawdź się” na karcie).
 */
window.QUIZ = [
  /* ===================== TEMATY ===================== */
  { id: "topic-basics", title: "Podstawy: fundusz, rynek, pieniądz w czasie", kind: "topic", questions: [
    { q: "Który podmiot przechowuje aktywa funduszu i kontroluje zgodność jego operacji?", o: ["Agent transferowy", "Depozytariusz", "Clearing broker", "Repozytorium transakcji"], a: 1, e: "Depozytariusz przechowuje aktywa i sprawuje nadzór nad operacjami funduszu (druga linia kontroli z zewnątrz)." },
    { q: "Limit przekroczony wyłącznie przez wzrost kursu akcji to przekroczenie:", o: ["aktywne", "pasywne", "operacyjne", "nie jest to przekroczenie"], a: 1, e: "Przekroczenie bez transakcji (zmiana cen, umorzenia, zdarzenia korporacyjne) to przekroczenie pasywne — usuwa się je w pierwszej kolejności z uwzględnieniem interesu uczestników (art. 57 UCITS)." },
    { q: "Ile jest dziś warte 1 050 zł otrzymane za rok przy stopie 5%?", o: ["1 050 zł", "1 002,50 zł", "1 000 zł", "997,50 zł"], a: 2, e: "PV = 1 050 / 1,05 = 1 000 zł." },
    { q: "Gdy rynkowe stopy procentowe rosną, ceny istniejących obligacji stałokuponowych:", o: ["rosną", "spadają", "nie zmieniają się", "rosną tylko dla krótkich obligacji"], a: 1, e: "Przyszłe kupony są dyskontowane wyższą stopą, więc wartość bieżąca (cena) spada." },
    { q: "W UE od 11 października 2027 standardowy cykl rozrachunku transakcji na papierach to:", o: ["T+0", "T+1", "T+2", "T+3"], a: 1, e: "Rozporządzenie 2025/2075 skraca cykl z T+2 do T+1 od 11.10.2027." },
    { q: "DvP oznacza, że:", o: ["papiery dostarcza się przed zapłatą", "płatność następuje przed dostawą", "papiery i gotówka przechodzą jednocześnie", "rozliczenie odbywa się bez CSD"], a: 2, e: "Delivery versus Payment chroni obie strony — żadna nie odda swojego bez otrzymania drugiej części." },
    { q: "Obligacja z kuponem równym rynkowej stopie jest warta:", o: ["mniej niż nominał", "dokładnie nominał", "więcej niż nominał", "zależy od terminu"], a: 1, e: "Gdy kupon = stopa dyskontowa, wartość bieżąca przepływów równa się nominałowi (par)." },
    { q: "Która stopa jest stopą overnight (RFR)?", o: ["EURIBOR 3M", "WIBOR 6M", "€STR", "Stopa swapowa 10Y"], a: 2, e: "€STR to stopa overnight oparta na transakcjach jednodniowych. EURIBOR i WIBOR to stopy terminowe." }
  ]},
  { id: "topic-limits", title: "Limity UCITS (art. 50–56)", kind: "topic", questions: [
    { q: "Zasada 5/10/40 oznacza, że:", o: ["maks. 5% w jednym emitencie, bez wyjątków", "do 10% w emitencie, jeśli suma pozycji > 5% nie przekracza 40% NAV", "maks. 40% w jednym emitencie", "maks. 10 emitentów powyżej 5%"], a: 1, e: "Art. 52 ust. 1–2: 5% na emitenta, można do 10%, o ile łączna wartość pozycji powyżej 5% ≤ 40% NAV." },
    { q: "Ile maksymalnie UCITS może mieć w papierach nienotowanych (niespełniających art. 50 ust. 1)?", o: ["5%", "10%", "20%", "Nie może wcale"], a: 1, e: "Art. 50 ust. 2 lit. a — do 10% NAV w innych papierach i MMI." },
    { q: "Limit łączny wobec jednego podmiotu (papiery + depozyty + derywaty OTC) wynosi:", o: ["10%", "20%", "35%", "40%"], a: 1, e: "Art. 52 ust. 2 — łącznie maks. 20% NAV." },
    { q: "Obligacje skarbowe państwa członkowskiego UE — limit na emitenta:", o: ["5/10/40", "20%", "do 35% (a za zgodą i przy ≥ 6 emisjach do 100%)", "25%"], a: 2, e: "Art. 52 ust. 3 (35%) i art. 54 (do 100% przy ≥ 6 emisjach, maks. 30% w jednej)." },
    { q: "Covered bonds jednego emitenta mogą stanowić do:", o: ["10% NAV", "20% NAV", "25% NAV", "35% NAV"], a: 2, e: "Art. 52 ust. 4 — do 25%; jeśli > 5%, łącznie takie pozycje ≤ 80% NAV." },
    { q: "Limit kontrahenta dla derywatu OTC nierozliczanego centralnie, gdy kontrahentem jest bank:", o: ["5% NAV", "10% NAV", "20% NAV", "brak limitu"], a: 1, e: "Art. 52 ust. 1 — 10% NAV dla instytucji kredytowej, 5% dla pozostałych." },
    { q: "Maksymalnie w jednym funduszu docelowym (UCITS lub innym CIU) UCITS może zainwestować:", o: ["10%", "20%", "25%", "30%"], a: 1, e: "Art. 55 ust. 1 — 20% NAV w jednym funduszu; łącznie w fundusze nie-UCITS maks. 30%." },
    { q: "Limit nabycia jednostek jednego funduszu docelowego (art. 56) to:", o: ["10% jednostek", "20% jednostek", "25% jednostek", "50% jednostek"], a: 2, e: "Art. 56 ust. 2 lit. c — maks. 25% jednostek jednego funduszu." },
    { q: "Spółki z jednej grupy kapitałowej w limitach art. 52 traktuje się:", o: ["osobno", "jak jednego emitenta", "tylko powyżej 10%", "zależnie od ratingu"], a: 1, e: "Art. 52 ust. 5 — grupa kapitałowa = jeden podmiot; łącznie do 20% w papierach i MMI grupy." },
    { q: "Czy UCITS może kupić ETC zabezpieczony fizycznym złotem?", o: ["Tak, zawsze", "Nie, nigdy", "Wymaga oceny prawnej — art. 50 ust. 2 lit. b zakazuje certyfikatów reprezentujących metale szlachetne, a praktyka nadzorców się różni", "Tak, do 5%"], a: 2, e: "To kwestia interpretacyjna; potrzebna ocena zgodna z praktyką nadzorcy kraju funduszu." }
  ]},
  { id: "topic-derivatives", title: "Derywaty, dźwignia i ekspozycja", kind: "topic", questions: [
    { q: "Ekspozycja z derywatów w metodzie zaangażowania UCITS nie może przekroczyć:", o: ["50% NAV", "100% NAV", "200% NAV", "20% NAV"], a: 1, e: "Art. 51 ust. 3 — global exposure ≤ 100% NAV." },
    { q: "Limit VaR absolutnego dla UCITS (99%, 20 dni) to:", o: ["10% NAV", "20% NAV", "2 × VaR referencyjny", "100% NAV"], a: 1, e: "VaR absolutny ≤ 20% NAV; relatywny ≤ 2 × VaR portfela referencyjnego." },
    { q: "Jak przelicza się opcję na ekspozycję w metodzie zaangażowania?", o: ["Premia", "Nominał", "Liczba × wielkość × cena bazy × delta", "Wartość rynkowa opcji"], a: 2, e: "Ekwiwalent delta (CESR/10-788)." },
    { q: "Variation margin to:", o: ["depozyt zwracany przy zamknięciu pozycji", "codzienne rozliczenie zmiany wartości pozycji", "opłata dla CCP", "zabezpieczenie w papierach"], a: 1, e: "VM rozlicza bieżący zysk lub stratę; IM to depozyt na przyszłą możliwą stratę." },
    { q: "Po zmianach EMIR 3 limit kontrahenta UCITS nie obejmuje derywatów:", o: ["giełdowych notowanych w USA", "rozliczanych przez CCP autoryzowaną lub uznaną według EMIR", "zawartych z bankami z UE", "z zabezpieczeniem gotówkowym"], a: 1, e: "Dyrektywa 2024/2994 zmieniła art. 52 ust. 1 — liczy się, czy transakcja jest rozliczana centralnie." },
    { q: "Kontrakt futures na indeks Euro Stoxx 50 a limit emitenta spółek z indeksu:", o: ["Trzeba doliczyć ekspozycję do każdej spółki", "Nie łączy się z limitami art. 52 (indeks finansowy)", "Liczy się tylko 10 największych spółek", "Liczy się połowę"], a: 1, e: "Art. 51 ust. 3 — derywaty na indeksy finansowe nie są łączone z limitami emitenta." },
    { q: "Fundusz z dźwignią 5× traci cały kapitał przy spadku rynku o:", o: ["5%", "10%", "20%", "50%"], a: 2, e: "5 × 20% = 100% kapitału." },
    { q: "STIR futures: 50 kontraktów po 1 mln EUR. Ekspozycja w metodzie zaangażowania (bez duration netting):", o: ["1 250 EUR", "50 mln EUR", "5 mln EUR", "0"], a: 1, e: "Liczba × nominał = 50 mln EUR, choć ryzyko to ok. 1 250 EUR na 1 pb — stąd duration netting." }
  ]},
  { id: "topic-reporting", title: "Obowiązki: EMIR, SFTR, SSR, znaczne pakiety", kind: "topic", questions: [
    { q: "Termin raportowania derywatów do repozytorium transakcji (EMIR):", o: ["T", "T+1", "T+5", "raz w miesiącu"], a: 1, e: "Art. 9 EMIR — najpóźniej w następnym dniu roboczym." },
    { q: "Kto odpowiada za raport EMIR w imieniu UCITS?", o: ["Depozytariusz", "Kontrahent bankowy", "Spółka zarządzająca", "Nikt — UCITS nie raportuje"], a: 2, e: "Od EMIR Refit odpowiada spółka zarządzająca (dla AIF — ZAFI)." },
    { q: "Total Return Swap — gdzie się go raportuje?", o: ["W SFTR", "W EMIR (a w SFTR są tylko obowiązki ujawnień art. 13–14)", "Nigdzie", "W MiFIR jako akcję"], a: 1, e: "TRS to derywat raportowany w EMIR; SFTR wymaga ujawnień w prospekcie i sprawozdaniach." },
    { q: "Repo zawarte przez fundusz raportuje się:", o: ["w EMIR", "w SFTR", "nie raportuje się", "tylko w sprawozdaniu rocznym"], a: 1, e: "Repo to SFT — art. 4 SFTR, do T+1." },
    { q: "Próg zgłoszenia pozycji krótkiej netto w akcjach do nadzorcy (SSR) to:", o: ["0,1% kapitału", "0,5% kapitału", "1% kapitału", "5% kapitału"], a: 0, e: "Zgłoszenie od 0,1% (i co kolejne 0,1%), publikacja od 0,5%." },
    { q: "Czy swap na akcje rozliczany gotówkowo wlicza się do progów zawiadomień o znacznych pakietach?", o: ["Nie, tylko akcje", "Tak, instrumenty o podobnym skutku ekonomicznym też się liczą", "Tylko powyżej 10%", "Tylko w USA"], a: 1, e: "Dyrektywa o przejrzystości (art. 13) obejmuje także instrumenty rozliczane gotówkowo." },
    { q: "Który derywat podlega obowiązkowi clearingu w UE (dla kontrahentów powyżej progów)?", o: ["FX forward", "Plain vanilla IRS w EUR", "Single-name CDS", "Equity swap"], a: 1, e: "M.in. IRS, OIS, FRA w głównych walutach i w PLN oraz indeksy iTraxx." },
    { q: "Niekryte CDS na dług państwa UE:", o: ["są dozwolone", "są zakazane (art. 14 SSR)", "wymagają zgody KNF", "są dozwolone do 0,5%"], a: 1, e: "Kupno ochrony wymaga posiadania odpowiadającej ekspozycji na dane państwo." }
  ]},

  /* ===================== KARTY INSTRUMENTÓW ===================== */
  { id: "common-stock", title: "Common Stock", kind: "card", questions: [
    { q: "Fundusz kupuje akcje w dniu ex-dividend. Czy dostanie bieżącą dywidendę?", o: ["Tak", "Nie", "Tylko połowę", "Zależy od brokera"], a: 1, e: "Kupujący w dniu ex-date lub później nie będzie akcjonariuszem w record date." },
    { q: "Akcja po delistingu w portfelu UCITS:", o: ["musi być sprzedana tego samego dnia", "trafia do limitu 10% „innych papierów”", "jest nadal traktowana jak notowana", "staje się depozytem"], a: 1, e: "Przestaje spełniać art. 50 ust. 1 — wchodzi do limitu 10% (art. 50 ust. 2 lit. a)." }
  ]},
  { id: "preferred-stock", title: "Preferred Stock", kind: "card", questions: [
    { q: "Non-cumulative preferred: pominięta dywidenda…", o: ["kumuluje się", "przepada", "zamienia się na akcje", "jest wypłacana w terminie wykupu"], a: 1, e: "W wersji non-cumulative pominięta dywidenda nie jest później dopłacana." },
    { q: "Akcje uprzywilejowane bez prawa głosu — limit nabycia UCITS:", o: ["5% akcji", "10% akcji bez prawa głosu emitenta", "25%", "brak limitu"], a: 1, e: "Art. 56 ust. 2 lit. a." }
  ]},
  { id: "depositary-receipt", title: "Depositary Receipt (ADR / GDR)", kind: "card", questions: [
    { q: "Dla limitu emitenta ADR liczy się jako ekspozycja na:", o: ["bank depozytariusza", "spółkę bazową", "giełdę notowania", "custodiana"], a: 1, e: "Kwit to forma posiadania akcji spółki bazowej — agreguje się go z jej akcjami lokalnymi." },
    { q: "ADR Level I (obrót OTC) w UCITS:", o: ["jest jak akcja notowana", "trafia do limitu 10%", "jest niedopuszczalny", "jest derywatem"], a: 1, e: "Nie jest dopuszczony do obrotu na rynku regulowanym — limit „innych papierów”." }
  ]},
  { id: "exchange-traded-fund", title: "Exchange-Traded Fund (ETF)", kind: "card", questions: [
    { q: "Kto może tworzyć i umarzać jednostki ETF bezpośrednio w funduszu?", o: ["Każdy inwestor", "Uczestnicy autoryzowani (AP)", "Tylko market maker giełdy", "Depozytariusz"], a: 1, e: "Rynek pierwotny jest dostępny dla AP; pozostali handlują na giełdzie." },
    { q: "UCITS ma 5% NAV w ETF. Jaki limit z art. 55 sprawdzasz?", o: ["5/10/40", "20% w jednym funduszu", "35%", "10% innych papierów"], a: 1, e: "ETF to fundusz — maks. 20% NAV w jednym funduszu docelowym." }
  ]},
  { id: "exchange-traded-note", title: "Exchange-Traded Note (ETN)", kind: "card", questions: [
    { q: "Główne ryzyko odróżniające ETN od ETF to:", o: ["ryzyko kursowe", "ryzyko kredytowe emitenta", "ryzyko płynności giełdy", "brak dywidend"], a: 1, e: "ETN to dług banku — przy jego upadłości posiadacz jest wierzycielem." },
    { q: "ETN z dźwignią 2× w UCITS:", o: ["nie ma wbudowanego derywatu", "zawiera wbudowany derywat — liczy się do global exposure", "jest funduszem", "jest zawsze zakazany"], a: 1, e: "Dźwignia oznacza wbudowany derywat; baza musi być dopuszczalna dla derywatów." }
  ]},
  { id: "exchange-traded-commodity", title: "Exchange-Traded Commodity (ETC)", kind: "card", questions: [
    { q: "Który przepis UCITS jest kluczowy przy ETC na złoto?", o: ["Art. 52 ust. 4", "Art. 50 ust. 2 lit. b (zakaz metali szlachetnych i certyfikatów je reprezentujących)", "Art. 89", "Art. 83"], a: 1, e: "Dlatego dopuszczalność wymaga oceny prawnej." },
    { q: "Emitentem ETC do limitu 5/10/40 jest zwykle:", o: ["kopalnia złota", "spółka celowa (SPV) emitująca ETC", "custodian skarbca", "LBMA"], a: 1, e: "Limit emitenta liczy się na SPV." }
  ]},
  { id: "real-estate-investment-trust", title: "Real Estate Investment Trust (REIT)", kind: "card", questions: [
    { q: "Notowany REIT w formie spółki w UCITS to:", o: ["fundusz (art. 55)", "zbywalny papier wartościowy", "nieruchomość", "derywat"], a: 1, e: "Zamknięta spółka notowana — standardowe limity emitenta." },
    { q: "Amerykański REIT musi wypłacać co najmniej:", o: ["50% dochodu", "75% dochodu", "90% dochodu podlegającego opodatkowaniu", "100% zysku"], a: 2, e: "Warunek statusu REIT w USA." }
  ]},
  { id: "closed-end-fund", title: "Closed-End Fund", kind: "card", questions: [
    { q: "Fundusz zamknięty spełniający warunki dyr. 2007/16/WE jest w UCITS kontrolowany limitami:", o: ["art. 55 (fundusze)", "art. 52 (papiery wartościowe)", "art. 53", "nie jest dopuszczalny"], a: 1, e: "Traktuje się go jak zbywalny papier wartościowy." },
    { q: "NAV na akcję 500, cena 450. Dyskonto wynosi:", o: ["−5%", "−10%", "−11,1%", "+10%"], a: 1, e: "450/500 − 1 = −10%." }
  ]},
  { id: "warrant", title: "Warrant", kind: "card", questions: [
    { q: "Covered warrant daje funduszowi ekspozycję na:", o: ["tylko instrument bazowy", "tylko emitenta", "emitenta warrantu i instrument bazowy", "giełdę"], a: 2, e: "Dwie ekspozycje: kredytowa na bank i rynkowa (delta) na bazę." },
    { q: "Maksymalna strata kupującego warrant to:", o: ["nieograniczona", "cena zakupu", "nominał bazy", "strike"], a: 1, e: "Inwestor tylko kupuje — może stracić to, co zapłacił." }
  ]},
  { id: "exchange-traded-certificate", title: "Exchange-Traded Certificate", kind: "card", questions: [
    { q: "Turbo long: indeks 19 000, bariera 18 000. Co się stanie przy spadku do 18 000?", o: ["Nic", "Knock-out — certyfikat wygasa prawie bez wartości", "Zamieni się na akcje", "Dźwignia spadnie do 1"], a: 1, e: "Osiągnięcie bariery kończy certyfikat." },
    { q: "Certyfikat turbo: wartość pozycji 0,51% NAV, ekspozycja na indeks 9,5% NAV. Do global exposure wchodzi:", o: ["0,51%", "9,5%", "0", "5%"], a: 1, e: "Wbudowany derywat liczy się w ekwiwalencie bazy." }
  ]},
  { id: "listed-equity-option", title: "Listed Equity Option", kind: "card", questions: [
    { q: "100 opcji put na indeks, mnożnik 10, indeks 5 000, delta −0,30. Ekspozycja (wartość bezwzględna):", o: ["60 000", "1 500 000", "5 000 000", "300 000"], a: 1, e: "100 × 10 × 5 000 × 0,30 = 1,5 mln." },
    { q: "Wystawienie opcji call z dostawą wymaga w UCITS:", o: ["niczego", "pokrycia — posiadania instrumentu bazowego", "zgody KNF", "clearingu OTC"], a: 1, e: "Niekryta sprzedaż jest zakazana; wystawiony call musi mieć pokrycie." }
  ]},
  { id: "equity-index-future", title: "Equity Index Future", kind: "card", questions: [
    { q: "20 kontraktów, cena 5 000, mnożnik 10 EUR. Wartość nominalna:", o: ["100 000 EUR", "1 000 000 EUR", "10 000 000 EUR", "80 000 EUR"], a: 1, e: "20 × 5 000 × 10 = 1 mln EUR." },
    { q: "Wynik na futures jest rozliczany:", o: ["dopiero w dniu wygaśnięcia", "codziennie przez variation margin", "raz w miesiącu", "przy rolowaniu"], a: 1, e: "CCP rozlicza zysk i stratę codziennie." }
  ]},
  { id: "government-bond-future", title: "Government Bond Future", kind: "card", questions: [
    { q: "Co wyznacza zachowanie kontraktu na obligacje?", o: ["Obligacja syntetyczna z kuponem 6%", "Obligacja cheapest-to-deliver (CTD)", "Najdłuższa obligacja z koszyka", "Stopa EBC"], a: 1, e: "Sprzedający dostarcza najtańszą obligację — to ona wyznacza cenę i duration kontraktu." },
    { q: "Sprzedaż kontraktów na obligacje powoduje, że duration portfela:", o: ["rośnie", "spada", "się nie zmienia", "staje się ujemna zawsze"], a: 1, e: "Krótka pozycja w kontraktach zmniejsza wrażliwość portfela na stopy." }
  ]},
  { id: "stir-future", title: "Short-Term Interest Rate Future (STIR)", kind: "card", questions: [
    { q: "Kontrakt notowany po 97,80 implikuje stopę:", o: ["97,80%", "2,20%", "0,978%", "2,80%"], a: 1, e: "Cena = 100 − stopa." },
    { q: "Kto zarabia na spadku stóp procentowych?", o: ["Kupujący STIR", "Sprzedający STIR", "Obie strony", "Nikt"], a: 0, e: "Spadek stóp → wzrost ceny (100 − stopa) → zysk kupującego." }
  ]},
  { id: "government-bond", title: "Government Bond", kind: "card", questions: [
    { q: "Dirty price to:", o: ["cena bez odsetek", "cena czysta plus narosłe odsetki", "cena z prowizją", "cena po podatku"], a: 1, e: "Faktycznie płacona cena zawiera narosłe odsetki od ostatniego kuponu." },
    { q: "Czy obligacje skarbowe Polski wchodzą do koszyka 40% w UCITS?", o: ["Tak", "Nie — papiery z art. 52 ust. 3 są z niego wyłączone", "Tylko powyżej 10%", "Tylko w funduszach dłużnych"], a: 1, e: "Art. 52 ust. 5 akapit 1." }
  ]},
  { id: "corporate-bond", title: "Corporate Bond", kind: "card", questions: [
    { q: "Fundusz ma obligacje spółki A (2,5% NAV), obligacje jej spółki matki (2%) i akcje matki (1%). Limit emitenta liczy się:", o: ["osobno dla każdej spółki", "dla całej grupy łącznie — 5,5%", "tylko dla obligacji", "tylko dla akcji"], a: 1, e: "Grupa kapitałowa = jeden emitent (art. 52 ust. 5)." },
    { q: "Obniżenie ratingu emisji poniżej BBB− w funduszu, którego prospekt wymaga investment grade, to:", o: ["przekroczenie aktywne", "przekroczenie pasywne do usunięcia w interesie uczestników", "nie ma znaczenia", "zawsze wymusza natychmiastową sprzedaż"], a: 1, e: "Zdarzenie niezależne od zarządzającego; trzeba też unikać mechanicznego polegania na ratingach." }
  ]},
  { id: "covered-bond", title: "Covered Bond", kind: "card", questions: [
    { q: "„Dual recourse” w covered bond oznacza roszczenie wobec:", o: ["dwóch banków", "emitenta i puli pokrycia", "emitenta i państwa", "dwóch gwarantów"], a: 1, e: "Najpierw emitent, potem pierwszeństwo do wydzielonej puli." },
    { q: "Covered bonds banku H (15% NAV) i jego obligacje senior (1,5%). Limit 35% dotyczy:", o: ["tylko covered", "łącznie wszystkich ekspozycji na bank H", "tylko senior", "nie ma takiego limitu"], a: 1, e: "Art. 52 ust. 5 — łącznie wobec jednego podmiotu maks. 35%." }
  ]},
  { id: "convertible-bond", title: "Convertible Bond", kind: "card", questions: [
    { q: "Nominał 100 000, cena konwersji 50, akcja 45. Parytet wynosi:", o: ["90 000", "100 000", "45 000", "2 000"], a: 0, e: "2 000 akcji × 45 = 90 000." },
    { q: "Ekspozycja z wbudowanej opcji w metodzie zaangażowania:", o: ["nominał obligacji", "liczba akcji × cena × delta", "premia konwersyjna", "0"], a: 1, e: "CESR/10-788 — ekwiwalent delta." }
  ]},
  { id: "treasury-bill", title: "Treasury Bill", kind: "card", questions: [
    { q: "Bon skarbowy przynosi dochód dzięki:", o: ["kuponom", "kupnu poniżej nominału", "dywidendzie", "opcji"], a: 1, e: "To instrument dyskontowy." },
    { q: "Maksymalny pozostały termin MMI w krótkoterminowym MMF:", o: ["90 dni", "397 dni", "2 lata", "5 lat"], a: 1, e: "Art. 10 MMFR." }
  ]},
  { id: "commercial-paper", title: "Commercial Paper", kind: "card", questions: [
    { q: "Nienotowany CP jest dopuszczalny dla UCITS, jeśli m.in.:", o: ["ma rating AAA", "spełnia warunki art. 50 ust. 1 lit. h (kategoria emitenta)", "termin < 30 dni", "jest w EUR"], a: 1, e: "Np. emitent ma papiery notowane, jest bankiem lub spółką z kapitałem ≥ 10 mln EUR publikującą sprawozdania." },
    { q: "Największe ryzyko CP w kryzysie to:", o: ["ryzyko walutowe", "ryzyko rolowania emisji przez emitenta", "ryzyko stopy procentowej", "ryzyko inflacji"], a: 1, e: "Emitent spłaca stare CP z nowych; gdy rynek zamarza, może nie mieć z czego." }
  ]},
  { id: "certificate-of-deposit", title: "Certificate of Deposit", kind: "card", questions: [
    { q: "Do limitu 20% depozytów w jednym banku (art. 52 ust. 1) wlicza się:", o: ["certyfikaty depozytowe", "lokaty", "obligacje banku", "akcje banku"], a: 1, e: "CD to MMI — podlega 5/10/40, nie limitowi depozytów." },
    { q: "CD banku 5%, lokata 12,5%, swap z dodatnią wyceną 3% z tym samym bankiem. Limit łączny 20%:", o: ["nie jest przekroczony", "jest przekroczony (20,5%)", "nie dotyczy CD", "nie dotyczy swapów"], a: 1, e: "5 + 12,5 + 3 = 20,5% > 20%." }
  ]},
  { id: "interest-rate-swap", title: "Interest Rate Swap", kind: "card", questions: [
    { q: "Payer IRS zarabia, gdy stopy:", o: ["spadają", "rosną", "są stałe", "nigdy"], a: 1, e: "Płaci stałą, otrzymuje zmienną — wzrost stóp zwiększa wartość." },
    { q: "Swap bilateralny: wycena +94 000, otrzymane zabezpieczenie 90 000. Ekspozycja na kontrahenta:", o: ["94 000", "4 000", "184 000", "0"], a: 1, e: "Dodatnia wycena minus dopuszczalne zabezpieczenie." }
  ]},
  { id: "overnight-index-swap", title: "Overnight Index Swap", kind: "card", questions: [
    { q: "W OIS kwota odsetek zmiennych jest znana:", o: ["na początku okresu", "na końcu okresu", "w dniu zawarcia", "nigdy"], a: 1, e: "Stopa overnight jest składana z dziennych obserwacji (in arrears)." },
    { q: "Piątkowa stopa €STR w składaniu liczy się za:", o: ["1 dzień", "3 dni", "5 dni", "0 dni"], a: 1, e: "Obowiązuje także w weekend." }
  ]},
  { id: "forward-rate-agreement", title: "Forward Rate Agreement (FRA)", kind: "card", questions: [
    { q: "FRA 3x6 to umowa na stopę:", o: ["na 3 miesiące od dziś", "na okres od 3. do 6. miesiąca", "na 9 miesięcy", "na 3 lata"], a: 1, e: "Okres zaczyna się za 3 i kończy za 6 miesięcy." },
    { q: "Rozliczenie FRA następuje:", o: ["na końcu okresu", "na początku okresu, zdyskontowane", "codziennie", "w dniu zawarcia"], a: 1, e: "Dlatego dzieli się przez (1 + L × d/360)." }
  ]},
  { id: "swaption", title: "Swaption", kind: "card", questions: [
    { q: "Payer swaption chroni przed:", o: ["spadkiem stóp", "wzrostem stóp", "zmianą kursu walut", "niewypłacalnością emitenta"], a: 1, e: "Daje prawo płacenia stałej stopy niższej niż rynek, gdy stopy wzrosną." },
    { q: "1y×10y oznacza:", o: ["10-letnią opcję na roczny swap", "opcję wygasającą za rok na 10-letni swap", "swap 11-letni", "dwie opcje"], a: 1, e: "Termin opcji × tenor swapu." }
  ]},
  { id: "interest-rate-cap-floor", title: "Interest Rate Cap / Floor", kind: "card", questions: [
    { q: "Inwestor w obligacje zmiennokuponowe zabezpieczy dochód przed spadkiem stóp, kupując:", o: ["cap", "floor", "payer swap", "FRA"], a: 1, e: "Floor wypłaca, gdy stopa spada poniżej poziomu." },
    { q: "Collar zawiera:", o: ["dwie kupione opcje", "kupioną i sprzedaną opcję", "swap i forward", "tylko cap"], a: 1, e: "Sprzedana opcja wymaga pokrycia." }
  ]},
  { id: "fx-forward", title: "FX Forward", kind: "card", questions: [
    { q: "Kurs terminowy wynika głównie z:", o: ["prognozy analityków", "różnicy stóp procentowych dwóch walut", "inflacji", "kursu z ubiegłego roku"], a: 1, e: "Parytet stóp procentowych (covered interest parity)." },
    { q: "Zabezpieczona klasa jednostek UCITS — wskaźnik zabezpieczenia powinien mieścić się w:", o: ["50–150%", "95–105%", "100% dokładnie", "90–110%"], a: 1, e: "Opinia ESMA34-43-296." }
  ]},
  { id: "fx-swap", title: "FX Swap", kind: "card", questions: [
    { q: "FX Swap służy w funduszach głównie do:", o: ["spekulacji kursowej", "rolowania zabezpieczeń walutowych", "płacenia dywidend", "clearingu"], a: 1, e: "Noga bliska zamyka stary forward, daleka otwiera nowy." },
    { q: "Która noga FX Swapu jest derywatem w rozumieniu EMIR?", o: ["Bliska (spot)", "Daleka (forward)", "Obie zawsze", "Żadna"], a: 1, e: "Noga rozliczana w terminie spot sama nie jest derywatem." }
  ]},
  { id: "non-deliverable-forward", title: "Non-Deliverable Forward (NDF)", kind: "card", questions: [
    { q: "NDF rozlicza się:", o: ["dostawą obu walut", "gotówkowo różnicą w walucie wymienialnej", "papierami", "nie rozlicza się"], a: 1, e: "Zwykle w USD." },
    { q: "Czy NDF podlega zwolnieniu z initial margin jak fizyczny FX forward?", o: ["Tak", "Nie — zwolnienie dotyczy tylko fizycznie rozliczanych forwardów i swapów", "Tylko do roku", "Tylko w PLN"], a: 1, e: "Rozp. 2016/2251." }
  ]},
  { id: "fx-option", title: "FX Option", kind: "card", questions: [
    { q: "Opcja EUR call / USD put to prawo:", o: ["sprzedaży EUR za USD", "kupna EUR za USD", "kupna USD za EUR", "wymiany na złoto"], a: 1, e: "Call na jedną walutę = put na drugą." },
    { q: "Opcje barierowe w UCITS:", o: ["są zakazane", "mogą wymagać metody VaR, bo zaangażowanie nie oddaje ryzyka", "nie są derywatami", "nie wymagają wyceny"], a: 1, e: "Nieliniowe, egzotyczne ryzyko." }
  ]},
  { id: "cross-currency-swap", title: "Cross-Currency Swap", kind: "card", questions: [
    { q: "Dlaczego ekspozycja na kontrahenta w CCS szybko rośnie?", o: ["Przez wysokie kupony", "Przez wymianę kapitału po starym kursie przy zmianie kursu rynkowego", "Przez opłaty", "Przez clearing"], a: 1, e: "Na końcu zwraca się kapitał po kursie z dnia zawarcia." },
    { q: "Czy CCS podlegają obowiązkowi clearingu w UE?", o: ["Tak", "Nie", "Tylko w PLN", "Tylko powyżej 5 lat"], a: 1, e: "Obecnie brak obowiązku." }
  ]},
  { id: "credit-default-swap", title: "Credit Default Swap", kind: "card", questions: [
    { q: "Fundusz sprzedaje ochronę CDS na spółkę X. Ekonomicznie to:", o: ["pozycja krótka w X", "pozycja długa w ryzyku kredytowym X — liczy się do limitów emitenta", "zabezpieczenie", "depozyt"], a: 1, e: "Sprzedający ochronę zarabia, gdy X się nie pogarsza." },
    { q: "Nominał 5 mln, recovery 40%. Wypłata po zdarzeniu kredytowym:", o: ["2 mln", "3 mln", "5 mln", "0,4 mln"], a: 1, e: "5 mln × (1 − 40%) = 3 mln." }
  ]},
  { id: "total-return-swap", title: "Total Return Swap", kind: "card", questions: [
    { q: "Kontrahent TRS ma swobodę zmiany składu portfela bazowego. Co to oznacza?", o: ["Nic", "Umowa jest traktowana jak powierzenie zarządzania (zasady delegacji)", "Swap jest niedopuszczalny zawsze", "Brak look-through"], a: 1, e: "Wytyczne ESMA/2014/937." },
    { q: "Koszyk akcji w TRS zawiera akcję Y (15% z 20 mln). Ekspozycja na Y do limitu emitenta:", o: ["0", "3 mln", "20 mln", "1,5 mln"], a: 1, e: "Look-through: 15% × 20 mln." }
  ]},
  { id: "equity-swap", title: "Equity Swap", kind: "card", questions: [
    { q: "Dla UCITS swap krótki na akcje to:", o: ["zakazana krótka sprzedaż", "dozwolony sposób uzyskania ekspozycji krótkiej", "pożyczka papierów", "depozyt"], a: 1, e: "Zakazana jest fizyczna niekryta sprzedaż (art. 89), nie derywaty." },
    { q: "Akcje 2% kapitału spółki + long equity swap 5%. Próg zawiadomienia 5%:", o: ["nie jest przekroczony", "jest przekroczony (7%)", "liczy się tylko swap", "dotyczy tylko USA"], a: 1, e: "Instrumenty rozliczane gotówkowo wlicza się do progów." }
  ]},
  { id: "contract-for-difference", title: "Contract for Difference (CFD)", kind: "card", questions: [
    { q: "CFD różni się od futures m.in. tym, że:", o: ["jest notowany na giełdzie", "nie ma terminu wygaśnięcia", "nie ma dźwigni", "nie ma ryzyka kontrahenta"], a: 1, e: "Pozycja trwa do zamknięcia, z codziennym finansowaniem." },
    { q: "Krótki CFD na 100 000 akcji z 40 mln. Pozycja krótka netto:", o: ["0,025%", "0,25%", "2,5%", "25%"], a: 1, e: "100 000 / 40 000 000 = 0,25% — powyżej progu zgłoszenia 0,1%." }
  ]},
  { id: "repurchase-agreement", title: "Repurchase Agreement (Repo)", kind: "card", questions: [
    { q: "Fundusz w reverse repo:", o: ["pożycza gotówkę", "pożycza papiery", "lokuje gotówkę, otrzymując papiery jako zabezpieczenie", "sprzedaje papiery na zawsze"], a: 2, e: "Reverse repo = kupno z obowiązkiem odsprzedaży." },
    { q: "Transakcje repo terminowe uznaje się za możliwe do zakończenia w każdej chwili, jeśli trwają nie dłużej niż:", o: ["1 dzień", "7 dni", "30 dni", "1 rok"], a: 1, e: "Wytyczne ESMA/2014/937." }
  ]},
  { id: "securities-lending", title: "Securities Lending", kind: "card", questions: [
    { q: "W czasie pożyczki prawo głosu z akcji ma:", o: ["fundusz pożyczkodawca", "pożyczkobiorca", "agent", "nikt"], a: 1, e: "Aby głosować, fundusz musi odwołać akcje przed record date." },
    { q: "Pożyczone akcje a limity inwestycyjne funduszu:", o: ["nie liczą się", "nadal liczą się do limitów funduszu", "liczą się podwójnie", "liczą się jako depozyt"], a: 1, e: "Ekonomicznie pozostają w portfelu." }
  ]}
];

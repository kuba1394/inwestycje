/*
 * Drzewo decyzyjne „Nowy instrument w portfelu”.
 * Węzeł pytania: { q, help, opts: [{ label, next, add: [klucze w DECISION_TAGS] }] }
 * Węzeł wyniku:  { result: tytuł, verdict: "ok" | "warn" | "bad", rules: [teksty], cards: [id] }
 * Wynik końcowy = reguły wyniku + reguły zebrane po drodze (add).
 */
window.DECISION_TAGS = {
  exch: "Derywat giełdowy: rozliczany przez CCP, bez limitu kontrahenta z art. 52 ust. 1. Raport EMIR do T+1 (także dla derywatów giełdowych).",
  ccp: "Derywat OTC rozliczany przez CCP autoryzowaną lub uznaną według EMIR — po zmianie art. 52 ust. 1 dyrektywą 2024/2994 nie liczy się do limitu kontrahenta. Sprawdź ekspozycję wobec clearing brokera.",
  bilateral: "Derywat OTC rozliczany bilateralnie: limit kontrahenta 10% NAV (instytucja kredytowa) lub 5% NAV (inny podmiot) od dodatniej wyceny pomniejszonej o dopuszczalne zabezpieczenie; umowa ISDA/CSA, wymiana variation margin (rozp. 2016/2251), kontrahent podlegający nadzorowi ostrożnościowemu; wycena niezależna i codzienna.",
  hedge: "Cel: zabezpieczenie. Udokumentuj relację zabezpieczającą — w metodzie zaangażowania kompensowanie jest możliwe tylko przy spełnieniu warunków CESR/10-788.",
  invest: "Cel: inwestycyjny. Sprawdź, czy prospekt dopuszcza derywaty w celach inwestycyjnych, i ujawnij to w prospekcie.",
  cmdtyIdx: "Indeks towarowy musi spełniać kryteria indeksu finansowego (art. 9 dyr. 2007/16/WE, wytyczne ESMA/2014/937): wystarczająca dywersyfikacja, reprezentatywność, publikacja.",
  single: "Instrument bazowy to pojedynczy papier: ekspozycja z derywatu łączy się z limitami emitenta z art. 52 (look-through).",
  index: "Derywat na indeks finansowy: ekspozycji na składniki indeksu nie łączy się z limitami art. 52 (art. 51 ust. 3).",
  fx: "Waluta lub stopa procentowa jako baza: brak limitów emitenta; sprawdź tylko global exposure i kontrahenta.",
  aifLev: "AIF: ekspozycja z instrumentu wchodzi do dźwigni liczonej metodą brutto i metodą zaangażowania (rozp. 231/2013 art. 7–8); limit dźwigni określa ZAFI i ujawnia inwestorom.",
  aifLoan: "AIFMD II (stosowanie od 16.04.2026): AIF udzielający pożyczek — limit dźwigni 175% (otwarty) lub 300% (zamknięty) w metodzie zaangażowania, limit 20% kapitału na jednego kredytobiorcę będącego instytucją finansową, AIF lub UCITS, obowiązek zatrzymania 5% wartości pożyczki przy jej zbyciu."
};

window.DECISION = {
  start: {
    q: "Jaki to fundusz?",
    help: "Zasady dopuszczalności są najbardziej szczegółowe dla UCITS. Dla AIF podstawą jest statut i prawo krajowe, a AIFMD dodaje zasady dźwigni, płynności i raportowania.",
    opts: [
      { label: "UCITS (w Polsce FIO)", next: "u_type" },
      { label: "AIF (np. SFIO, FIZ)", next: "a_type" }
    ]
  },

  /* ---------- UCITS ---------- */
  u_type: {
    q: "Czym jest instrument?",
    help: "Patrz na formę prawną, nie na nazwę handlową. „ETF” na złoto bywa w rzeczywistości ETC (papierem dłużnym).",
    opts: [
      { label: "Akcja, obligacja lub inny zbywalny papier wartościowy (także ETN, ETC, certyfikat, warrant)", next: "u_ts_listed" },
      { label: "Instrument rynku pieniężnego (bon skarbowy, CP, CD)", next: "u_mmi" },
      { label: "Jednostka lub tytuł uczestnictwa funduszu", next: "u_fund" },
      { label: "Depozyt bankowy", next: "r_deposit" },
      { label: "Instrument pochodny (futures, opcja, swap, forward)", next: "u_der_venue" },
      { label: "Repo, reverse repo, pożyczka papierów", next: "r_sft" },
      { label: "Metal szlachetny, towar fizyczny, nieruchomość, kryptoaktywo bezpośrednio", next: "r_not_eligible" }
    ]
  },
  u_ts_listed: {
    q: "Czy papier jest dopuszczony do obrotu na rynku regulowanym (lub innym rynku regulowanym z art. 50 ust. 1 lit. a–c) albo warunki emisji przewidują dopuszczenie w ciągu roku?",
    help: "Obrót w ASO, na platformie MTF czy OTC nie wystarcza, chyba że regulacje krajowe i prospekt uznają dany rynek za rynek regulowany w rozumieniu art. 50 ust. 1 lit. b–c.",
    opts: [
      { label: "Tak", next: "u_ts_closed" },
      { label: "Nie", next: "r_other10" }
    ]
  },
  u_ts_closed: {
    q: "Czy to tytuł funduszu zamkniętego (closed-end fund, notowany REIT w formie funduszu)?",
    help: "Fundusz zamknięty spełniający warunki art. 2 ust. 2 dyr. 2007/16/WE traktuje się jak zbywalny papier wartościowy (limity art. 52, nie art. 55).",
    opts: [
      { label: "Tak", next: "r_cef" },
      { label: "Nie", next: "u_ts_embedded" }
    ]
  },
  u_ts_embedded: {
    q: "Czy papier zawiera wbudowany derywat?",
    help: "Np. dźwignia, wypłata zależna od innego aktywa (ETN, certyfikat, warrant), opcja konwersji (obligacja zamienna), wypłata zależna od zdarzenia kredytowego (CLN). Zwykła opcja wcześniejszego wykupu przez emitenta zwykle nie wymaga osobnego traktowania.",
    opts: [
      { label: "Tak", next: "u_ts_embedded_base" },
      { label: "Nie", next: "u_ts_issuer" }
    ]
  },
  u_ts_embedded_base: {
    q: "Na co jest wbudowany derywat?",
    help: "Baza wbudowanego derywatu musi być dopuszczalna jak dla zwykłego derywatu (art. 50 ust. 1 lit. g).",
    opts: [
      { label: "Pojedyncza akcja lub obligacja", next: "r_embedded", add: ["single"] },
      { label: "Indeks finansowy (akcyjny, obligacyjny)", next: "r_embedded", add: ["index"] },
      { label: "Indeks towarowy", next: "r_embedded", add: ["cmdtyIdx", "index"] },
      { label: "Pojedynczy towar lub metal szlachetny (bez dostawy)", next: "r_embedded_cmdty" }
    ]
  },
  u_ts_issuer: {
    q: "Kto jest emitentem?",
    opts: [
      { label: "Państwo członkowskie UE, jego władze lokalne, państwo trzecie lub organizacja międzynarodowa z udziałem państw UE", next: "r_gov" },
      { label: "Bank emitujący obligacje zabezpieczone (covered bonds)", next: "r_covered" },
      { label: "Inny emitent (spółka, bank, SPV)", next: "r_ts" }
    ]
  },
  u_mmi: {
    q: "Czy instrument jest notowany albo spełnia warunki art. 50 ust. 1 lit. h?",
    help: "Lit. h: emisja lub emitent podlegają regulacji ochrony inwestorów i oszczędności, a emitentem jest m.in. państwo lub bank centralny, spółka z papierami notowanymi, instytucja pod nadzorem ostrożnościowym albo spółka z kapitałem ≥ 10 mln EUR publikująca sprawozdania. Plus wymogi płynności i wyceny z art. 3–5 dyr. 2007/16/WE.",
    opts: [
      { label: "Tak — emitent to państwo/bank centralny", next: "r_gov" },
      { label: "Tak — inny emitent", next: "r_mmi" },
      { label: "Nie", next: "r_other10" }
    ]
  },
  u_fund: {
    q: "Jaki to fundusz docelowy?",
    opts: [
      { label: "UCITS (w tym ETF UCITS)", next: "r_fund_ucits" },
      { label: "Inny fundusz otwarty spełniający art. 50 ust. 1 lit. e (nadzór równoważny, ochrona jak w UCITS, sprawozdania, ≤ 10% w inne fundusze)", next: "r_fund_aif" },
      { label: "Fundusz zamknięty notowany", next: "r_cef" },
      { label: "Fundusz otwarty niespełniający lit. e (np. hedge fund)", next: "r_not_eligible" }
    ]
  },
  u_der_venue: {
    q: "Gdzie zawierany jest derywat?",
    opts: [
      { label: "Na giełdzie (rynek regulowany)", next: "u_der_base", add: ["exch"] },
      { label: "OTC, rozliczany przez CCP", next: "u_der_base", add: ["ccp"] },
      { label: "OTC, rozliczany bilateralnie", next: "u_der_base", add: ["bilateral"] }
    ]
  },
  u_der_base: {
    q: "Jaki jest instrument bazowy?",
    help: "Art. 50 ust. 1 lit. g: dopuszczalne aktywa z art. 50 ust. 1, indeksy finansowe, stopy procentowe, kursy walut i waluty.",
    opts: [
      { label: "Pojedyncza akcja lub obligacja (także CDS na emitenta, TRS, equity swap, CFD na akcję)", next: "u_der_purpose", add: ["single"] },
      { label: "Indeks finansowy (np. Euro Stoxx 50, iTraxx)", next: "u_der_purpose", add: ["index"] },
      { label: "Stopa procentowa lub waluta", next: "u_der_purpose", add: ["fx"] },
      { label: "Indeks towarowy", next: "u_der_purpose", add: ["cmdtyIdx", "index"] },
      { label: "Pojedynczy towar, metal szlachetny, kryptoaktywo", next: "r_der_noteligible" }
    ]
  },
  u_der_purpose: {
    q: "W jakim celu fundusz zawiera derywat?",
    opts: [
      { label: "Zabezpieczenie ryzyka portfela", next: "r_der", add: ["hedge"] },
      { label: "Cel inwestycyjny lub efektywne zarządzanie portfelem", next: "r_der", add: ["invest"] }
    ]
  },

  /* ---------- AIF ---------- */
  a_type: {
    q: "Czym jest instrument?",
    help: "Katalog dopuszczalnych lokat AIF wyznacza przede wszystkim statut i prawo krajowe (w Polsce ustawa o funduszach inwestycyjnych dla SFIO i FIZ).",
    opts: [
      { label: "Papier wartościowy lub instrument rynku pieniężnego", next: "r_aif_basic" },
      { label: "Derywat, repo lub pożyczka papierów", next: "r_aif_lev", add: ["aifLev"] },
      { label: "Pożyczka udzielana przez fundusz (loan origination)", next: "r_aif_loan", add: ["aifLoan"] },
      { label: "Aktywo niefinansowe (nieruchomość, towar)", next: "r_aif_real" }
    ]
  },

  /* ---------- WYNIKI ---------- */
  r_ts: { result: "Zbywalny papier wartościowy — dopuszczalny", verdict: "ok", rules: [
    "Limit emitenta 5/10/40 (art. 52 ust. 1–2) — licz łącznie z innymi papierami, depozytami i ekspozycją OTC wobec tego podmiotu (łącznie maks. 20%).",
    "Spółki z jednej grupy kapitałowej = jeden emitent (art. 52 ust. 5).",
    "Akcje: maks. 10% akcji bez prawa głosu i brak znaczącego wpływu na emitenta (art. 56); obligacje: maks. 10% długu emitenta.",
    "Akcje i instrumenty na akcje: progi znacznych pakietów (dyrektywa o przejrzystości) i pozycje krótkie (SSR).",
    "Sprawdź limity z prospektu i politykę inwestycyjną (np. rating, waluta, region)."
  ], cards: ["common-stock", "corporate-bond", "depositary-receipt"] },
  r_gov: { result: "Papier skarbowy lub równoważny — dopuszczalny, limity podwyższone", verdict: "ok", rules: [
    "Do 35% NAV na emitenta (art. 52 ust. 3); poza koszykiem 40%.",
    "Do 100% NAV, jeśli prospekt to przewiduje i zezwolił na to nadzorca: co najmniej 6 różnych emisji, maks. 30% w jednej emisji (art. 54).",
    "Nie wlicza się do limitu łącznego 20% wobec jednego podmiotu, ale liczy się do 35% łącznie wobec tego emitenta.",
    "Przy MMF: limity MMFR (art. 17 ust. 7 — do 100% przy spełnieniu warunków)."
  ], cards: ["government-bond", "treasury-bill"] },
  r_covered: { result: "Covered bond — dopuszczalny, limit podwyższony", verdict: "ok", rules: [
    "Do 25% NAV w obligacjach zabezpieczonych jednego emitenta spełniających dyrektywę 2019/2162 (art. 52 ust. 4).",
    "Jeżeli pozycje > 5% NAV, łącznie maks. 80% NAV.",
    "Łącznie z innymi ekspozycjami na ten bank maks. 35% (art. 52 ust. 5).",
    "Inne papiery tego banku (obligacje senior, akcje) — zwykły limit 5/10/40."
  ], cards: ["covered-bond"] },
  r_mmi: { result: "Instrument rynku pieniężnego — dopuszczalny", verdict: "ok", rules: [
    "Limit emitenta 5/10/40 jak dla papierów wartościowych.",
    "Certyfikat depozytowy to MMI — nie wlicza się do limitu 20% depozytów, ale wchodzi do limitu łącznego 20% wobec banku.",
    "Sprawdź płynność i możliwość dokładnej wyceny (art. 3–5 dyr. 2007/16/WE).",
    "Maks. 10% instrumentów rynku pieniężnego jednego emitenta (art. 56 ust. 2 lit. d)."
  ], cards: ["commercial-paper", "certificate-of-deposit"] },
  r_other10: { result: "Dopuszczalny tylko w limicie 10% „innych lokat”", verdict: "warn", rules: [
    "Art. 50 ust. 2 lit. a: łącznie maks. 10% NAV w papierach i MMI niespełniających art. 50 ust. 1.",
    "Nadal obowiązują limity emitenta z art. 52.",
    "Zwróć uwagę na płynność — fundusz musi móc zrealizować umorzenia.",
    "Jeżeli papier ma trafić do obrotu na rynku regulowanym, ale tak się nie stanie w ciągu roku — wtedy przechodzi do tego limitu."
  ], cards: ["depositary-receipt", "commercial-paper"] },
  r_cef: { result: "Fundusz zamknięty — traktowany jak zbywalny papier wartościowy", verdict: "ok", rules: [
    "Warunki: dyr. 2007/16/WE art. 2 ust. 2 (ład korporacyjny, zarządzanie przez podmiot nadzorowany).",
    "Limity emitenta 5/10/40, nie limity funduszy z art. 55.",
    "Zwykle kupuje się po cenie rynkowej różnej od NAV (premia lub dyskonto)."
  ], cards: ["closed-end-fund", "real-estate-investment-trust"] },
  r_embedded: { result: "Papier z wbudowanym derywatem — dopuszczalny, z dodatkowymi obowiązkami", verdict: "ok", rules: [
    "Limit emitenta 5/10/40 na emitenta papieru (bank, SPV).",
    "Wbudowany derywat wlicza się do global exposure (art. 51 ust. 3; ekwiwalent delta lub wartość bazy).",
    "Przy dźwigni ETN/certyfikatu możliwa strata całej inwestycji — sprawdź profil ryzyka funduszu."
  ], cards: ["exchange-traded-note", "exchange-traded-certificate", "convertible-bond", "warrant"] },
  r_embedded_cmdty: { result: "Wymaga oceny prawnej", verdict: "warn", rules: [
    "Art. 50 ust. 2 lit. b zakazuje nabywania metali szlachetnych i certyfikatów, które je reprezentują.",
    "Papier z ekspozycją 1:1 na pojedynczy towar (ETC) bywa dopuszczany, jeżeli nie zawiera wbudowanego derywatu i nie przewiduje dostawy — praktyka nadzorców różni się. Potrzebna opinia działu prawnego i zgodność z praktyką nadzorcy kraju funduszu.",
    "Jeżeli zawiera dźwignię lub derywat na pojedynczy towar — zwykle niedopuszczalny (baza derywatu musi być dopuszczalna)."
  ], cards: ["exchange-traded-commodity"] },
  r_fund_ucits: { result: "Jednostki UCITS — dopuszczalne", verdict: "ok", rules: [
    "Maks. 20% NAV w jednym funduszu docelowym (art. 55 ust. 1).",
    "Maks. 25% jednostek jednego funduszu docelowego (art. 56 ust. 2 lit. c).",
    "Fundusz docelowy może inwestować maks. 10% w inne fundusze (art. 50 ust. 1 lit. e) — sprawdź jego prospekt.",
    "Fundusze z tej samej grupy: brak opłat za nabycie i odkupienie (art. 55 ust. 3)."
  ], cards: ["exchange-traded-fund"] },
  r_fund_aif: { result: "Jednostki innego funduszu — dopuszczalne z limitem łącznym", verdict: "warn", rules: [
    "Maks. 20% w jednym funduszu i łącznie maks. 30% NAV w fundusze inne niż UCITS (art. 55 ust. 1–2).",
    "Udokumentuj spełnienie warunków art. 50 ust. 1 lit. e (nadzór, ochrona uczestników, sprawozdawczość, maks. 10% w inne fundusze).",
    "Maks. 25% jednostek funduszu docelowego (art. 56)."
  ], cards: ["exchange-traded-fund"] },
  r_deposit: { result: "Depozyt — dopuszczalny", verdict: "ok", rules: [
    "Bank z siedzibą w UE lub podlegający równoważnemu nadzorowi; depozyt płatny na żądanie lub z możliwością wycofania, termin ≤ 12 miesięcy (art. 50 ust. 1 lit. f).",
    "Maks. 20% NAV w depozytach w jednym banku (art. 52 ust. 1).",
    "Łącznie z papierami i ekspozycją OTC wobec banku maks. 20% (art. 52 ust. 2).",
    "Rachunek bieżący (cash at bank) — zgodnie z praktyką nadzorcy zwykle też liczony do limitu wobec banku."
  ], cards: ["certificate-of-deposit"] },
  r_sft: { result: "Transakcja finansująca — dopuszczalna jako technika efektywnego zarządzania portfelem", verdict: "ok", rules: [
    "Wytyczne ESMA/2014/937: możliwość zakończenia w każdej chwili (repo i reverse repo terminowe ≤ 7 dni uznaje się za takie), odwołanie pożyczonych papierów w każdej chwili.",
    "Ryzyko kontrahenta łączy się z ekspozycją z derywatów OTC w limicie 10%/5% (art. 52 ust. 1).",
    "Zabezpieczenie: płynne, wyceniane codziennie, wysokiej jakości, zdywersyfikowane (maks. 20% NAV na emitenta), polityka haircutów.",
    "Reinwestycja gotówki tylko w depozyty, wysokiej jakości obligacje skarbowe, reverse repo z bankami, krótkoterminowe MMF.",
    "SFTR: raport do repozytorium do T+1 (art. 4) oraz ujawnienia w prospekcie i sprawozdaniach (art. 13–14).",
    "Cały dochód netto należy do funduszu; koszty agenta ujawnia się w sprawozdaniu."
  ], cards: ["repurchase-agreement", "securities-lending"] },
  r_der: { result: "Derywat — dopuszczalny przy spełnieniu warunków", verdict: "ok", rules: [
    "Prospekt musi przewidywać stosowanie derywatów; proces zarządzania ryzykiem musi obejmować ten instrument (art. 51 ust. 1).",
    "Global exposure: metoda zaangażowania (≤ 100% NAV) albo VaR (absolutny ≤ 20%, relatywny ≤ 2 × portfel referencyjny).",
    "Brak niekrytej sprzedaży: sprzedana opcja lub krótka pozycja z dostawą fizyczną musi mieć pokrycie w aktywach (CESR/10-788, art. 89 dla papierów).",
    "EMIR: raport do repozytorium do T+1 (spółka zarządzająca odpowiada za raport w imieniu UCITS). Sprawdź obowiązek clearingu (IRS, OIS, FRA w głównych walutach i PLN, indeksy iTraxx) i — dla klas objętych EMIR 3 — wymóg aktywnego rachunku w CCP z UE."
  ], cards: ["interest-rate-swap", "equity-index-future", "listed-equity-option", "fx-forward", "credit-default-swap"] },
  r_der_noteligible: { result: "Niedopuszczalny w UCITS", verdict: "bad", rules: [
    "Baza derywatu musi być dopuszczalnym aktywem, indeksem finansowym, stopą procentową lub walutą (art. 50 ust. 1 lit. g).",
    "Pojedynczy towar lub metal szlachetny może być bazą tylko pośrednio — przez indeks towarowy spełniający kryteria indeksu finansowego.",
    "Kryptoaktywa: ESMA i nadzorcy krajowi traktują bezpośrednią ekspozycję jako niedopuszczalną; ekspozycja przez instrumenty wymaga indywidualnej oceny."
  ], cards: [] },
  r_not_eligible: { result: "Niedopuszczalny w UCITS", verdict: "bad", rules: [
    "Art. 50 ust. 2 lit. b: zakaz nabywania metali szlachetnych i certyfikatów, które je reprezentują.",
    "UCITS nie może inwestować bezpośrednio w towary ani nieruchomości (może w spółki i notowane REIT-y).",
    "Fundusz otwarty niespełniający art. 50 ust. 1 lit. e nie jest dopuszczalnym funduszem docelowym."
  ], cards: ["exchange-traded-commodity", "real-estate-investment-trust"] },
  r_aif_basic: { result: "AIF — zgodnie ze statutem", verdict: "ok", rules: [
    "Sprawdź katalog lokat i limity w statucie oraz w prawie krajowym (w Polsce przepisy ustawy o funduszach inwestycyjnych właściwe dla SFIO lub FIZ).",
    "AIFMD: obowiązek należytej staranności przy wyborze lokat, zarządzanie płynnością i ryzykiem (rozp. 231/2013), wycena (art. 19 AIFMD).",
    "Raportowanie do nadzorcy (Annex IV) obejmuje główne instrumenty i ekspozycje."
  ], cards: ["corporate-bond", "commercial-paper"] },
  r_aif_lev: { result: "AIF — instrument zwiększający dźwignię", verdict: "warn", rules: [
    "Raportuj dźwignię w obu metodach; jeżeli w metodzie zaangażowania przekracza 3× wartości aktywów netto, AIF stosuje dźwignię „na znaczną skalę” (art. 111 rozp. 231/2013) — dodatkowe raporty.",
    "Nadzorca może nałożyć limit dźwigni (art. 25 AIFMD).",
    "Derywaty: obowiązki EMIR (raport, clearing, margin) jak dla innych kontrahentów finansowych. SFT: SFTR."
  ], cards: ["interest-rate-swap", "repurchase-agreement", "total-return-swap"] },
  r_aif_loan: { result: "AIF udzielający pożyczek — AIFMD II", verdict: "warn", rules: [
    "Polityka i procedury udzielania pożyczek, ocena ryzyka kredytowego, monitorowanie portfela.",
    "Zakaz pożyczek dla ZAFI, jego pracowników i podmiotów powiązanych; zakaz strategii „originate to distribute”.",
    "AIF, którego pożyczki stanowią ≥ 50% NAV, co do zasady musi być zamknięty (wyjątki przy spełnieniu warunków płynności).",
    "Okres przejściowy dla AIF utworzonych przed 15.04.2024 — do 16.04.2029 w zakresie limitów."
  ], cards: [] },
  r_aif_real: { result: "AIF — aktywo niefinansowe", verdict: "ok", rules: [
    "Dopuszczalność według statutu i prawa krajowego (np. fundusze nieruchomości).",
    "Depozytariusz weryfikuje tytuł własności i prowadzi rejestr (art. 21 ust. 8 lit. b AIFMD).",
    "Wycena co najmniej raz w roku i przy zmianach kapitału; niezależny wyceniający lub funkcja wyceny oddzielona od zarządzania."
  ], cards: [] }
};

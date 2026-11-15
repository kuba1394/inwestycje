/*
 * Tabela limitów. Grupy: { title, intro, rows: [[przepis, limit, czego dotyczy, uwagi]] }
 */
window.LIMITS = [
  {
    title: "UCITS — dopuszczalność (art. 50)",
    intro: "Dyrektywa 2009/65/WE. W Polsce przepisy przeniesione do ustawy o funduszach inwestycyjnych (FIO).",
    rows: [
      ["Art. 50 ust. 1", "Katalog zamknięty", "Papiery i MMI notowane, nowe emisje, jednostki funduszy, depozyty, derywaty, MMI nienotowane z lit. h", "Wszystko poza katalogiem jest niedopuszczalne lub trafia do limitu 10%."],
      ["Art. 50 ust. 2 lit. a", "maks. 10% NAV", "Inne papiery wartościowe i MMI niż z ust. 1", "Tzw. trash ratio; nie obejmuje jednostek funduszy otwartych."],
      ["Art. 50 ust. 2 lit. b", "0%", "Metale szlachetne i certyfikaty je reprezentujące", "ETC na złoto wymaga oceny prawnej."],
      ["Art. 50 ust. 2", "Dopuszczalne", "Płynne aktywa pomocnicze (ancillary liquid assets)", "Według ESMA — depozyty bieżące; praktyka do 20% NAV w zwykłych warunkach rynkowych."]
    ]
  },
  {
    title: "UCITS — limity koncentracji (art. 52)",
    intro: "Liczone od wartości aktywów netto (NAV). Grupa kapitałowa w rozumieniu dyrektywy 2013/34/UE = jeden podmiot.",
    rows: [
      ["Art. 52 ust. 1", "maks. 5% NAV (do 10%)", "Papiery i MMI jednego emitenta", "Zasada 5/10/40 razem z ust. 2."],
      ["Art. 52 ust. 2", "łącznie maks. 40% NAV", "Suma pozycji w emitentach, w których fundusz ma > 5%", "Nie obejmuje depozytów, OTC z instytucjami nadzorowanymi i papierów z ust. 3 i 4."],
      ["Art. 52 ust. 1", "maks. 20% NAV", "Depozyty w jednym banku", "CD nie jest depozytem (to MMI)."],
      ["Art. 52 ust. 1", "maks. 10% / 5% NAV", "Ryzyko kontrahenta derywatów OTC nierozliczanych centralnie: bank / inny podmiot", "Po dyr. 2024/2994 (transpozycja do 25.06.2026) derywaty rozliczane przez CCP autoryzowaną lub uznaną według EMIR nie liczą się do limitu."],
      ["Art. 52 ust. 2", "łącznie maks. 20% NAV", "Papiery + MMI + depozyty + ekspozycja OTC wobec jednego podmiotu", "Najczęściej pomijany limit przy bankach."],
      ["Art. 52 ust. 3", "maks. 35% NAV", "Papiery emitowane lub gwarantowane przez państwo UE, władze lokalne, państwo trzecie, organizację międzynarodową", "Poza koszykiem 40%."],
      ["Art. 52 ust. 4", "maks. 25% NAV", "Obligacje zabezpieczone (dyr. 2019/2162) jednego emitenta", "Pozycje > 5% łącznie maks. 80% NAV."],
      ["Art. 52 ust. 5", "maks. 35% NAV", "Łącznie wobec jednego podmiotu przy limitach z ust. 1–4", "Papiery jednej grupy kapitałowej łącznie maks. 20%."]
    ]
  },
  {
    title: "UCITS — limity podwyższone (art. 53–55)",
    intro: "",
    rows: [
      ["Art. 53", "do 20% (wyjątkowo 35%) NAV", "Fundusz indeksowy — papiery jednego emitenta", "Indeks wystarczająco zdywersyfikowany, reprezentatywny, publikowany. 35% tylko przy wyjątkowych warunkach rynkowych i dla jednego emitenta."],
      ["Art. 54", "do 100% NAV", "Papiery skarbowe i gwarantowane (art. 52 ust. 3)", "Zgoda nadzorcy, ujawnienie w prospekcie, co najmniej 6 emisji, maks. 30% NAV w jednej emisji."],
      ["Art. 55 ust. 1", "maks. 20% NAV", "Jednostki jednego funduszu (UCITS lub innego)", "Subfundusz funduszu z wydzielonymi subfunduszami liczy się osobno."],
      ["Art. 55 ust. 2", "łącznie maks. 30% NAV", "Fundusze inne niż UCITS", ""],
      ["Art. 58–60", "min. 85% NAV", "Fundusz podstawowy (feeder) w funduszu głównym (master)", "Pozostałe 15%: płynne aktywa pomocnicze, derywaty zabezpieczające."]
    ]
  },
  {
    title: "UCITS — limity nabycia (art. 56) i inne zakazy",
    intro: "Limity liczone od wielkości emitenta lub emisji, a nie od NAV funduszu.",
    rows: [
      ["Art. 56 ust. 1", "Zakaz znaczącego wpływu", "Akcje z prawem głosu dające znaczący wpływ na zarząd emitenta", "Liczone na poziomie spółki zarządzającej (wszystkie zarządzane UCITS)."],
      ["Art. 56 ust. 2 lit. a", "maks. 10%", "Akcji bez prawa głosu jednego emitenta", ""],
      ["Art. 56 ust. 2 lit. b", "maks. 10%", "Dłużnych papierów wartościowych jednego emitenta", "Można pominąć przy nabyciu, jeśli nie da się ustalić wartości brutto emisji."],
      ["Art. 56 ust. 2 lit. c", "maks. 25%", "Jednostek jednego funduszu", ""],
      ["Art. 56 ust. 2 lit. d", "maks. 10%", "Instrumentów rynku pieniężnego jednego emitenta", ""],
      ["Art. 83", "maks. 10% NAV", "Pożyczki zaciągane przez UCITS", "Tylko czasowo; kredyt back-to-back w walucie nie jest pożyczką."],
      ["Art. 88", "Zakaz", "Udzielanie pożyczek i gwarancji przez UCITS", "Nie dotyczy nabywania nieopłaconych papierów."],
      ["Art. 89", "Zakaz", "Niekryta sprzedaż papierów, MMI, jednostek, derywatów", "Ekspozycję krótką uzyskuje się derywatami z pokryciem."]
    ]
  },
  {
    title: "UCITS — ekspozycja z derywatów (art. 51)",
    intro: "Szczegóły: wytyczne CESR/10-788 (metody), ESMA/2014/937 (indeksy finansowe, TRS, EPM, zabezpieczenia).",
    rows: [
      ["Art. 51 ust. 3", "maks. 100% NAV", "Global exposure w metodzie zaangażowania", "Łączna dźwignia brutto funduszu do 200% NAV (plus 10% pożyczek)."],
      ["CESR/10-788", "maks. 20% NAV", "VaR absolutny (99%, 20 dni)", "Fundusze bez portfela referencyjnego."],
      ["CESR/10-788", "maks. 2 × VaR referencyjny", "VaR relatywny", "Portfel referencyjny bez derywatów, spójny z polityką funduszu."],
      ["Art. 51 ust. 3", "Look-through", "Ekspozycja na bazę derywatu wlicza się do limitów art. 52", "Z wyjątkiem derywatów na indeksy finansowe."],
      ["ESMA/2014/937", "maks. 20% NAV", "Zabezpieczenie od jednego emitenta (dywersyfikacja)", "Wyjątek: do 100% w papierach skarbowych przy ≥ 6 emisjach, maks. 30% w jednej."]
    ]
  },
  {
    title: "AIFMD",
    intro: "Dyrektywa 2011/61/UE i rozporządzenie 231/2013; zmiany AIFMD II (dyr. 2024/927) stosowane od 16.04.2026. Katalog lokat i limity dywersyfikacji wynikają ze statutu i prawa krajowego.",
    rows: [
      ["Rozp. 231/2013 art. 7–8", "Dwie metody", "Dźwignia: metoda brutto i metoda zaangażowania", "Wynik w procentach wartości aktywów netto (100% = brak dźwigni)."],
      ["Rozp. 231/2013 art. 111", "> 300%", "Dźwignia na znaczną skalę (metoda zaangażowania)", "Dodatkowe raporty do nadzorcy (art. 24 ust. 4 AIFMD)."],
      ["AIFMD art. 25", "Limit nadzorcy", "Nadzorca może ograniczyć dźwignię AIF", "Ze względu na ryzyko systemowe."],
      ["AIFMD II art. 15", "maks. 175% / 300%", "Dźwignia AIF udzielającego pożyczek (otwarty / zamknięty), metoda zaangażowania", "Okres przejściowy do 16.04.2029 dla AIF utworzonych przed 15.04.2024."],
      ["AIFMD II art. 15", "maks. 20% kapitału", "Pożyczki dla jednego kredytobiorcy będącego instytucją finansową, AIF lub UCITS", ""],
      ["AIFMD II art. 15", "min. 5%", "Zatrzymanie wartości nominalnej pożyczki przy jej zbyciu", ""],
      ["AIFMD II art. 16", "min. 2 narzędzia", "Narzędzia zarządzania płynnością w otwartych AIF (z załącznika V)", "Np. swing pricing, gates, okres wypowiedzenia."]
    ]
  },
  {
    title: "Fundusze rynku pieniężnego (MMFR 2017/1131)",
    intro: "Dla MMF limity MMFR zastępują limity art. 52 UCITS.",
    rows: [
      ["Art. 17 ust. 1", "maks. 5% (10% dla VNAV)", "MMI, sekurytyzacje i ABCP jednego emitenta", "VNAV może do 10%, jeśli łącznie takie pozycje ≤ 40%."],
      ["Art. 17 ust. 1 lit. b", "maks. 10%", "Depozyty w jednym banku", ""],
      ["Art. 17 ust. 7", "do 100%", "Instrumenty emitowane lub gwarantowane przez państwa i instytucje publiczne", "Co najmniej 6 emisji, maks. 30% w jednej."],
      ["Art. 24 (krótkoterminowe)", "WAM ≤ 60 dni, WAL ≤ 120 dni", "Średni ważony termin zapadalności i życia portfela", "Aktywa zapadające w ciągu dnia ≥ 10%, w ciągu tygodnia ≥ 30% (CNAV i LVNAV mogą wliczyć do 17,5% w papierach skarbowych)."],
      ["Art. 25 (standardowe)", "WAM ≤ 6 mies., WAL ≤ 12 mies.", "Standardowy MMF (tylko VNAV)", "Aktywa zapadające w ciągu dnia ≥ 7,5%, w ciągu tygodnia ≥ 15%."],
      ["Art. 33 ust. 2", "20 pb", "Maksymalna różnica wyceny LVNAV od stałej ceny jednostki", "Po przekroczeniu fundusz wycenia jednostki zmienną ceną."]
    ]
  }
];

/*
 * Ścieżka nauki. Elementy: { t: "basic" | "card" | "quiz" | "page", id, label? }
 * Postęp: przeczytane karty i podstawy (KB.read) oraz wyniki quizów.
 */
window.PATH = [
  {
    title: "Fundamenty: fundusz, rynek i pieniądz w czasie",
    time: "ok. 2 godziny",
    intro: "Kto jest kim na rynku, jak działa fundusz i co robi compliance. Do tego dwa pojęcia, bez których nie da się zrozumieć wyceny: wartość pieniądza w czasie i rentowność.",
    items: [
      { t: "basic", id: "fund-types" },
      { t: "basic", id: "market-participants" },
      { t: "basic", id: "settlement" },
      { t: "basic", id: "time-value" },
      { t: "basic", id: "yield-curve" },
      { t: "quiz", id: "topic-basics" }
    ],
    goals: "Wyjaśnisz różnicę między UCITS a AIF, opiszesz drogę transakcji od zlecenia do rozrachunku i policzysz wartość bieżącą prostego przepływu."
  },
  {
    title: "Akcje i fundusze notowane",
    time: "ok. 2–3 godziny",
    intro: "Najprostsze instrumenty i najważniejsze limity UCITS: 5/10/40, grupa kapitałowa, limity dla funduszy docelowych.",
    items: [
      { t: "card", id: "common-stock" },
      { t: "card", id: "preferred-stock" },
      { t: "card", id: "depositary-receipt" },
      { t: "card", id: "real-estate-investment-trust" },
      { t: "card", id: "exchange-traded-fund" },
      { t: "card", id: "closed-end-fund" },
      { t: "page", id: "#/compliance/limits", label: "Tabela limitów UCITS" },
      { t: "quiz", id: "topic-limits" }
    ],
    goals: "Przeprowadzisz test 5/10/40 dla portfela akcji, rozpoznasz przekroczenie pasywne i odróżnisz fundusz otwarty od zamkniętego w kontroli limitów."
  },
  {
    title: "Dług i rynek pieniężny",
    time: "ok. 3 godziny",
    intro: "Obligacje skarbowe i korporacyjne, covered bonds oraz instrumenty rynku pieniężnego. Duration — najważniejsza miara ryzyka stopy procentowej.",
    items: [
      { t: "basic", id: "duration" },
      { t: "card", id: "government-bond" },
      { t: "card", id: "corporate-bond" },
      { t: "card", id: "covered-bond" },
      { t: "card", id: "treasury-bill" },
      { t: "card", id: "commercial-paper" },
      { t: "card", id: "certificate-of-deposit" },
      { t: "card", id: "convertible-bond" }
    ],
    goals: "Policzysz cenę z narosłymi odsetkami i DV01, zastosujesz limity 35% / 25% / 100% i odróżnisz certyfikat depozytowy od lokaty."
  },
  {
    title: "Derywaty giełdowe",
    time: "ok. 3 godziny",
    intro: "Jak działają derywaty, depozyty i izba rozliczeniowa. Kontrakty terminowe i opcje notowane, dźwignia i ekspozycja całkowita.",
    items: [
      { t: "basic", id: "derivatives" },
      { t: "basic", id: "leverage" },
      { t: "basic", id: "clearing-ccp" },
      { t: "basic", id: "options-greeks" },
      { t: "basic", id: "global-exposure" },
      { t: "card", id: "equity-index-future" },
      { t: "card", id: "government-bond-future" },
      { t: "card", id: "stir-future" },
      { t: "card", id: "listed-equity-option" },
      { t: "quiz", id: "topic-derivatives" }
    ],
    goals: "Przeliczysz futures i opcje na ekspozycję w metodzie zaangażowania i wyjaśnisz, dlaczego nominał nie równa się ryzyku."
  },
  {
    title: "Derywaty OTC",
    time: "ok. 4 godziny",
    intro: "Swapy, forwardy i opcje pozagiełdowe. Ryzyko kontrahenta, zabezpieczenia i obowiązki EMIR.",
    items: [
      { t: "basic", id: "counterparty-risk" },
      { t: "basic", id: "collateral" },
      { t: "card", id: "fx-forward" },
      { t: "card", id: "fx-swap" },
      { t: "card", id: "non-deliverable-forward" },
      { t: "card", id: "interest-rate-swap" },
      { t: "card", id: "overnight-index-swap" },
      { t: "card", id: "forward-rate-agreement" },
      { t: "card", id: "cross-currency-swap" },
      { t: "card", id: "credit-default-swap" },
      { t: "card", id: "total-return-swap" },
      { t: "card", id: "equity-swap" },
      { t: "card", id: "contract-for-difference" },
      { t: "card", id: "swaption" },
      { t: "card", id: "interest-rate-cap-floor" },
      { t: "card", id: "fx-option" },
      { t: "quiz", id: "topic-reporting" }
    ],
    goals: "Policzysz ekspozycję na kontrahenta z uwzględnieniem zabezpieczeń, wskażesz, które derywaty podlegają obowiązkowi clearingu, i zastosujesz look-through przy swapach na akcje."
  },
  {
    title: "Finansowanie papierami i produkty strukturyzowane",
    time: "ok. 2–3 godziny",
    intro: "Repo i pożyczki papierów (SFTR), a także ETN, ETC, warranty i certyfikaty — instrumenty, przy których najczęściej pojawiają się pytania o dopuszczalność.",
    items: [
      { t: "card", id: "repurchase-agreement" },
      { t: "card", id: "securities-lending" },
      { t: "card", id: "exchange-traded-note" },
      { t: "card", id: "exchange-traded-commodity" },
      { t: "card", id: "warrant" },
      { t: "card", id: "exchange-traded-certificate" },
      { t: "page", id: "#/compliance/decision", label: "Drzewo decyzyjne: nowy instrument w portfelu" },
      { t: "page", id: "#/compliance/cases", label: "Studia przypadków" }
    ],
    goals: "Ocenisz dopuszczalność produktu strukturyzowanego dla UCITS, zastosujesz zasady EPM i rozpoznasz wbudowany derywat."
  }
];

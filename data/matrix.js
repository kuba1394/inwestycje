/*
 * Matryca obowiązków. Kolumny w MATRIX_COLS; wiersze: [id instrumentu, ...wartości].
 * Wartość zaczynająca się od "Tak" lub "Nie" dostaje kolor; tekst po " — " to komentarz.
 */
window.MATRIX_COLS = [
  { k: "ucits", t: "Kwalifikacja w UCITS" },
  { k: "issuer", t: "Limit emitenta / look-through" },
  { k: "ge", t: "Global exposure (metoda zaangażowania)" },
  { k: "cpty", t: "Limit kontrahenta art. 52(1)" },
  { k: "emir", t: "Raport EMIR" },
  { k: "clr", t: "Obowiązek clearingu" },
  { k: "sftr", t: "SFTR" },
  { k: "ssr", t: "SSR (pozycja krótka)" },
  { k: "td", t: "Znaczne pakiety (TD)" }
];

window.MATRIX = [
  ["common-stock", "Zbywalny papier wartościowy", "Tak — 5/10/40, grupa = jeden emitent; art. 56", "Nie", "Nie", "Nie", "Nie", "Nie", "Tak — pozycja długa kompensuje krótką", "Tak — 5% … 90%"],
  ["preferred-stock", "Zbywalny papier wartościowy", "Tak — 5/10/40; art. 56 (10% akcji bez prawa głosu)", "Nie", "Nie", "Nie", "Nie", "Nie", "Tak — jeśli to akcje w rozumieniu SSR", "Tylko akcje z prawem głosu"],
  ["depositary-receipt", "Zbywalny papier (lub 10%, jeśli nienotowany)", "Tak — na spółkę bazową, łącznie z jej akcjami", "Nie", "Nie", "Nie", "Nie", "Nie", "Tak — jak akcje bazowe", "Tak — posiadacz kwitu = akcjonariusz"],
  ["exchange-traded-fund", "Fundusz (art. 55)", "Nie — 20% w jednym funduszu, 25% jednostek", "Nie — chyba że ETF z dźwignią (wtedy ocena)", "Nie", "Nie", "Nie", "Nie", "Nie", "Nie"],
  ["exchange-traded-note", "Zbywalny papier wartościowy", "Tak — na bank emitenta", "Tak, jeśli dźwignia lub wbudowany derywat", "Nie", "Nie", "Nie", "Nie", "Tak — jeśli odwrócony ETN na akcje", "Tak — jeśli odnosi się do akcji"],
  ["exchange-traded-commodity", "Zbywalny papier — ocena art. 50(2)(b) dla metali", "Tak — na SPV emitenta", "Tak, jeśli dźwignia", "Nie", "Nie", "Nie", "Nie", "Nie", "Nie"],
  ["real-estate-investment-trust", "Zbywalny papier (spółka) lub fundusz zamknięty", "Tak — 5/10/40", "Nie", "Nie", "Nie", "Nie", "Nie", "Tak", "Tak"],
  ["closed-end-fund", "Zbywalny papier (dyr. 2007/16 art. 2(2))", "Tak — 5/10/40, nie art. 55", "Nie", "Nie", "Nie", "Nie", "Nie", "Tak, jeśli to akcje", "Tak — fundusze zamknięte nie są wyłączone"],
  ["warrant", "Zbywalny papier z wbudowanym derywatem", "Tak — emitent warrantu + baza (look-through)", "Tak — liczba × cena bazy × delta", "Nie — w EMIR to papier wartościowy", "Nie", "Nie", "Nie", "Tak — put na akcje = pozycja krótka", "Tak — instrument finansowy art. 13"],
  ["exchange-traded-certificate", "Zbywalny papier z wbudowanym derywatem", "Tak — emitent + baza, chyba że indeks finansowy", "Tak — ekwiwalent bazy", "Nie", "Nie", "Nie", "Nie", "Tak — jeśli short na akcję", "Tak — jeśli odnosi się do akcji"],
  ["listed-equity-option", "Derywat giełdowy", "Tak, opcja na akcję; nie, na indeks finansowy", "Tak — liczba × mnożnik × cena bazy × delta", "Nie — rozliczana przez CCP", "Tak, T+1", "— rozliczana z natury", "Nie", "Tak — delta pozycji", "Tak — opcje na akcje"],
  ["equity-index-future", "Derywat giełdowy", "Nie — indeks finansowy (art. 51(3))", "Tak — liczba × cena × mnożnik", "Nie", "Tak, T+1", "— rozliczany z natury", "Nie", "Tak — wkład proporcjonalny do wagi spółki", "Tylko przy progach koszyka (rozp. 2015/761 art. 4)"],
  ["government-bond-future", "Derywat giełdowy", "Tak — ekspozycja na emitenta CTD (35%/100%)", "Tak — liczba × nominał × cena CTD", "Nie", "Tak, T+1", "— rozliczany z natury", "Nie", "Tak — dług państwowy", "Nie"],
  ["stir-future", "Derywat giełdowy", "Nie — stopa procentowa", "Tak — nominał; dozwolony duration netting", "Nie", "Tak, T+1", "— rozliczany z natury", "Nie", "Nie", "Nie"],
  ["government-bond", "Zbywalny papier (art. 52(3), art. 54)", "Tak — do 35% / 100% przy ≥ 6 emisjach", "Nie", "Nie", "Nie", "Nie", "Nie", "Tak — dług państwowy", "Nie"],
  ["corporate-bond", "Zbywalny papier wartościowy", "Tak — 5/10/40; art. 56 (10% długu emitenta)", "Nie", "Nie", "Nie", "Nie", "Nie", "Nie", "Nie"],
  ["covered-bond", "Zbywalny papier (art. 52(4))", "Tak — do 25%, łącznie > 5% maks. 80%", "Nie", "Nie", "Nie", "Nie", "Nie", "Nie", "Nie"],
  ["convertible-bond", "Zbywalny papier z wbudowanym derywatem", "Tak — emitent obligacji + akcje (delta)", "Tak — liczba akcji × cena × delta", "Nie", "Nie", "Nie", "Nie", "Tak — delta wobec akcji", "Tak — instrument finansowy art. 13"],
  ["treasury-bill", "Instrument rynku pieniężnego", "Tak — jak obligacje skarbowe (art. 52(3))", "Nie", "Nie", "Nie", "Nie", "Nie", "Tak — dług państwowy", "Nie"],
  ["commercial-paper", "Instrument rynku pieniężnego (art. 50(1)(h))", "Tak — 5/10/40; 10% MMI emitenta", "Nie", "Nie", "Nie", "Nie", "Nie", "Nie", "Nie"],
  ["certificate-of-deposit", "Instrument rynku pieniężnego", "Tak — 5/10/40 (nie limit 20% depozytów)", "Nie", "Nie", "Nie", "Nie", "Nie", "Nie", "Nie"],
  ["interest-rate-swap", "Derywat OTC", "Nie — stopa procentowa", "Tak — nominał (lub wartość rynkowa nogi stałej)", "Tak, jeśli bilateralny — 10%/5%", "Tak, T+1", "Tak — fix-float EUR, PLN, NOK, SEK (po końcu LIBOR klasy USD/GBP/JPY przeszły na OIS); dla FC powyżej progu", "Nie", "Nie", "Nie"],
  ["overnight-index-swap", "Derywat OTC", "Nie", "Tak — nominał", "Tak, jeśli bilateralny", "Tak, T+1", "Tak — OIS w EUR, GBP, USD (określone terminy)", "Nie", "Nie", "Nie"],
  ["forward-rate-agreement", "Derywat OTC", "Nie", "Tak — nominał", "Tak, jeśli bilateralny", "Tak, T+1", "Tak — FRA w EUR, PLN, NOK, SEK", "Nie", "Nie", "Nie"],
  ["swaption", "Derywat OTC", "Nie", "Tak — nominał swapu × delta", "Tak", "Tak, T+1", "Nie", "Nie", "Nie", "Nie"],
  ["interest-rate-cap-floor", "Derywat OTC", "Nie", "Tak — nominał × delta", "Tak", "Tak, T+1", "Nie", "Nie", "Nie", "Nie"],
  ["fx-forward", "Derywat OTC", "Nie — waluta", "Tak — nominał nogi walutowej; netting zabezpieczeń", "Tak", "Tak, T+1", "Nie — zwolnienie z IM dla fizycznych forwardów", "Nie", "Nie", "Nie"],
  ["fx-swap", "Derywat OTC (noga daleka)", "Nie", "Tak — tylko noga terminowa", "Tak", "Tak, T+1 — jedna transakcja", "Nie", "Nie", "Nie", "Nie"],
  ["non-deliverable-forward", "Derywat OTC", "Nie", "Tak — nominał", "Tak", "Tak, T+1", "Nie — ale IM obowiązuje (brak zwolnienia)", "Nie", "Nie", "Nie"],
  ["fx-option", "Derywat OTC (lub giełdowy)", "Nie", "Tak — nominał × delta", "Tak, jeśli OTC", "Tak, T+1", "Nie", "Nie", "Nie", "Nie"],
  ["cross-currency-swap", "Derywat OTC", "Nie", "Tak — nominał nogi walutowej", "Tak — szybko rośnie przez wymianę kapitału", "Tak, T+1", "Nie", "Nie", "Nie", "Nie"],
  ["credit-default-swap", "Derywat OTC", "Tak — sprzedaż ochrony = ekspozycja na emitenta referencyjnego; indeks — nie", "Tak — sprzedający: wyższa z nominału i wartości aktywa; kupujący: wartość aktywa referencyjnego", "Tak, jeśli bilateralny", "Tak, T+1", "Tak — indeksy iTraxx Europe Main i Crossover", "Nie", "Tak — zakaz niekrytych CDS na dług państw UE", "Nie"],
  ["total-return-swap", "Derywat OTC", "Tak — look-through do składników koszyka", "Tak — wartość rynkowa instrumentu bazowego", "Tak", "Tak, T+1", "Nie", "Ujawnienia (art. 13–14), bez raportu", "Tak — strona płacąca zwrot z akcji", "Tak — jeśli baza to akcje"],
  ["equity-swap", "Derywat OTC", "Tak — look-through", "Tak — wartość rynkowa akcji bazowych", "Tak", "Tak, T+1", "Nie", "Ujawnienia, jeśli spełnia definicję TRS", "Tak", "Tak"],
  ["contract-for-difference", "Derywat OTC", "Tak — look-through", "Tak — wartość rynkowa bazy", "Tak", "Tak, T+1", "Nie", "Ujawnienia, jeśli spełnia definicję TRS", "Tak", "Tak"],
  ["repurchase-agreement", "Technika EPM (ESMA/2014/937)", "Zabezpieczenie: maks. 20% NAV na emitenta", "Nie — chyba że reinwestycja tworzy dźwignię", "Tak — łącznie z OTC", "Nie", "Nie", "Tak — raport T+1 i ujawnienia", "Nie (repo nie jest krótką sprzedażą)", "Nie — prawa głosu przechodzą tylko przy pożyczce akcji"],
  ["securities-lending", "Technika EPM", "Pożyczone papiery dalej w limitach funduszu", "Nie — chyba że reinwestycja tworzy dźwignię", "Tak — łącznie z OTC", "Nie", "Nie", "Tak — raport T+1 i ujawnienia", "Pożyczkobiorca — tak; pożyczkodawca — nie", "Tak — prawa głosu przechodzą na pożyczkobiorcę"]
];

/*
 * Tabele porównawcze. Każda: { id, title, intro, cols: [id instrumentów lub nazwy], rows: [[cecha, wartość1, wartość2, ...]], note }
 * Jeżeli kolumna jest id karty instrumentu, nagłówek staje się linkiem.
 */
window.COMPARE = [
  {
    id: "etp", title: "ETF vs ETN vs ETC",
    intro: "Trzy produkty notowane na giełdzie, które wyglądają tak samo w zleceniu, a prawnie są czymś zupełnie innym.",
    cols: ["exchange-traded-fund", "exchange-traded-note", "exchange-traded-commodity"],
    rows: [
      ["Czym jest prawnie", "Jednostka funduszu (zwykle UCITS)", "Dłużny papier wartościowy banku", "Dłużny papier wartościowy spółki celowej (SPV)"],
      ["Aktywa wydzielone", "Tak — majątek funduszu u depozytariusza", "Nie — inwestor jest wierzycielem banku", "Zwykle tak — zabezpieczenie (np. złoto w skarbcu)"],
      ["Główne ryzyko poza rynkiem", "Tracking error, ryzyko kontrahenta swapu (ETF syntetyczny)", "Ryzyko kredytowe emitenta", "Ryzyko SPV i struktury zabezpieczenia"],
      ["Klasyfikacja w UCITS", "Fundusz — art. 55 (20% w jednym, 30% łącznie nie-UCITS)", "Zbywalny papier wartościowy — art. 52 (5/10/40)", "Zbywalny papier wartościowy; ETC na metale szlachetne wymaga oceny (art. 50 ust. 2 lit. b)"],
      ["Wbudowany derywat", "Nie (sam ETF); ETF może używać derywatów", "Możliwy (dźwignia, odwrócenie)", "Możliwy (dźwignia, ekspozycja na futures)"],
      ["Limit emitenta liczony na", "Nie dotyczy (limit funduszu)", "Bank emitent", "SPV emitent"]
    ],
    note: "Sprawdzaj zawsze prospekt produktu, nie tylko nazwę. „ETF” na metal szlachetny w Europie bywa w rzeczywistości ETC."
  },
  {
    id: "derivs", title: "Forward vs Futures vs Swap vs Option",
    intro: "Cztery podstawowe typy derywatów — czym różnią się zobowiązania stron, rozliczenie i ryzyko kontrahenta.",
    cols: ["Forward", "Futures", "Swap", "Option"],
    rows: [
      ["Prawo czy obowiązek", "Obowiązek obu stron", "Obowiązek obu stron", "Obowiązek obu stron (seria płatności)", "Prawo kupującego, obowiązek wystawcy"],
      ["Gdzie zawierany", "OTC", "Giełda", "OTC (często rozliczany przez CCP)", "Giełda lub OTC"],
      ["Standaryzacja", "Indywidualne warunki", "Pełna (wielkość, terminy)", "Dokumentacja ISDA, warunki elastyczne", "Giełda: pełna; OTC: indywidualna"],
      ["Przepływy pieniężne", "Jedna płatność na końcu", "Codzienny variation margin", "Okresowe płatności netto", "Premia na początku, wypłata przy wykonaniu"],
      ["Ryzyko kontrahenta", "Bilateralne (ogranicza CSA)", "Wobec CCP — minimalne", "Bilateralne lub wobec CCP", "Kupujący OTC — na wystawcę; giełda — CCP"],
      ["Ekspozycja w metodzie zaangażowania", "Nominał (wartość bazy)", "Liczba × wielkość × cena", "Nominał lub wartość bazy", "Ekwiwalent delta"],
      ["Przykłady na stronie", "fx-forward, forward-rate-agreement", "equity-index-future, government-bond-future", "interest-rate-swap, total-return-swap", "listed-equity-option, fx-option, swaption"]
    ],
    note: "Profil wypłaty: forward, futures i swap są liniowe (zysk rośnie proporcjonalnie). Opcja jest nieliniowa — dlatego liczy się ją przez deltę."
  },
  {
    id: "sft", title: "Repo vs Securities Lending vs Buy/Sell-Back",
    intro: "Trzy transakcje finansowania papierami wartościowymi (SFT) — wszystkie raportuje się w SFTR.",
    cols: ["repurchase-agreement", "securities-lending", "Buy/Sell-Back"],
    rows: [
      ["Cel ekonomiczny", "Pożyczka gotówki pod zastaw papierów", "Pożyczka konkretnych papierów (np. do krótkiej sprzedaży)", "Jak repo, ale jako dwie osobne transakcje"],
      ["Co przenosi się na własność", "Papiery (sprzedaż z odkupem)", "Papiery; pożyczkobiorca daje zabezpieczenie", "Papiery"],
      ["Kto otrzymuje kupony/dywidendy", "Przekazuje się je sprzedającemu (manufactured payment)", "Pożyczkobiorca płaci równowartość (manufactured)", "Uwzględnione w cenie odkupu"],
      ["Dokumentacja", "GMRA", "GMSLA", "GMRA (aneks) lub brak umowy ramowej"],
      ["Wynagrodzenie", "Stopa repo", "Opłata za pożyczkę (fee)", "Różnica cen"],
      ["UCITS — szczególne zasady", "Zwrot gotówki na żądanie; repo do 7 dni uznaje się za możliwe do zakończenia", "Możliwość odwołania papierów w każdej chwili; dochód netto należy do funduszu", "Jak repo"],
      ["Raport SFTR", "Tak, T+1", "Tak, T+1", "Tak, T+1"]
    ],
    note: "Dla UCITS: zabezpieczenie otrzymane gotówką można reinwestować tylko w depozyty, wysokiej jakości obligacje skarbowe, reverse repo z bankami i krótkoterminowe MMF (ESMA/2014/937)."
  },
  {
    id: "secured", title: "Covered Bond vs ABS vs Senior Bank Bond",
    intro: "Trzy sposoby finansowania się banku na rynku długu — i trzy różne poziomy ochrony inwestora.",
    cols: ["covered-bond", "ABS", "Senior bank bond"],
    rows: [
      ["Emitent", "Bank", "Spółka celowa (SPV)", "Bank"],
      ["Na czym oparta spłata", "Emitent + pula pokrycia (dual recourse)", "Tylko pula aktywów (przepływy z kredytów)", "Ogólny majątek banku"],
      ["Aktywa na bilansie banku", "Tak", "Nie — sprzedane do SPV", "—"],
      ["Bail-in", "Wyłączone (do wartości puli)", "Nie dotyczy", "Podlega"],
      ["Limit UCITS na emitenta", "Do 25% (art. 52 ust. 4), łącznie > 5% maks. 80%", "5/10/40; uwaga na wymogi sekurytyzacyjne (rozp. 2017/2402)", "5/10/40"],
      ["Typowy rating", "AAA–AA", "Zależny od transzy", "Rating banku"]
    ],
    note: "ABS nie ma osobnej karty — fundusz inwestujący w sekurytyzacje musi dodatkowo spełnić obowiązki należytej staranności z rozporządzenia o sekurytyzacji."
  },
  {
    id: "money", title: "Deposit vs Certificate of Deposit vs Treasury Bill vs Commercial Paper",
    intro: "Gdzie fundusz parkuje gotówkę i które limity to uruchamia.",
    cols: ["Deposit", "certificate-of-deposit", "treasury-bill", "commercial-paper"],
    rows: [
      ["Forma", "Umowa z bankiem", "Zbywalny instrument dłużny banku", "Papier skarbowy dyskontowy", "Papier dłużny przedsiębiorstwa"],
      ["Zbywalność", "Nie (wypłata u banku)", "Tak", "Tak, bardzo płynny", "Tak, rynek wtórny płytki"],
      ["Limit UCITS", "20% w jednym banku (art. 52 ust. 1)", "5/10/40", "Do 35%/100% (art. 52 ust. 3, art. 54)", "5/10/40"],
      ["Warunek dopuszczalności", "Bank z UE lub z równoważnym nadzorem, wypłata na żądanie lub ≤ 12 mies.", "MMI — art. 50 ust. 1 lit. h", "MMI notowany lub art. 50 ust. 1 lit. h", "MMI — art. 50 ust. 1 lit. h (kategoria emitenta)"],
      ["Liczy się do limitu łącznego 20%", "Tak", "Tak", "Nie (art. 52 ust. 3 wyłączony)", "Tak"],
      ["Ryzyko", "Kredytowe banku", "Kredytowe banku", "Państwa", "Kredytowe spółki i rolowania"]
    ],
    note: "Częsty błąd: wliczanie CD do limitu 20% depozytów. CD to MMI, a nie depozyt."
  },
  {
    id: "equity-otc", title: "Total Return Swap vs Equity Swap vs CFD",
    intro: "Trzy sposoby uzyskania syntetycznej ekspozycji na akcje bez kupowania ich.",
    cols: ["total-return-swap", "equity-swap", "contract-for-difference"],
    rows: [
      ["Instrument bazowy", "Dowolne aktywo lub koszyk (akcje, obligacje, indeks)", "Akcja, koszyk lub indeks akcji", "Akcja, indeks, waluta, towar"],
      ["Termin", "Stały, często 1–2 lata", "Stały, z możliwością resetu", "Bez terminu"],
      ["Typowy kontrahent", "Bank inwestycyjny (prime broker)", "Bank inwestycyjny", "Broker CFD"],
      ["SFTR", "Ujawnienia w prospekcie i sprawozdaniach (art. 13–14)", "Ujawnienia, jeśli spełnia definicję TRS", "Ujawnienia, jeśli spełnia definicję TRS"],
      ["Raport EMIR", "Tak", "Tak", "Tak"],
      ["Znaczne pakiety", "Wlicza się (instrument rozliczany gotówkowo)", "Wlicza się", "Wlicza się"],
      ["SSR (pozycja krótka)", "Strona płacąca stopę zwrotu — wlicza się", "Wlicza się", "Wlicza się"]
    ],
    note: "W praktyce różnice są głównie dokumentacyjne. Dla compliance liczy się wspólne: look-through do limitów emitenta, ekspozycja na kontrahenta i raportowanie."
  }
];

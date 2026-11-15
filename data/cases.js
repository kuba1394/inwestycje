/*
 * Studia przypadków. { id, title, level, situation (HTML), question, solution (HTML), cards[] }
 * Dane są hipotetyczne; obliczenia sprawdzone.
 */
window.CASES = [
  {
    id: "passive-51040", title: "Wzrost kursu i limit 10%", level: 1,
    situation: "<p>UCITS akcyjny, NAV 100 mln zł. Pozycje powyżej 5% NAV: spółka A 9%, B 8%, C 8%, D 7,5%, E 6% (łącznie 38,5%). W ciągu jednego dnia kurs A rośnie o 20% (z 9 mln do 10,8 mln zł), pozostałe ceny się nie zmieniają. Zarządzający nie zawierał transakcji.</p>",
    question: "Czy limit jest przekroczony? Jakie to przekroczenie i co zrobić?",
    solution: "<p>NAV rośnie do 101,8 mln zł. Udział A: 10,8 / 101,8 = <strong>10,61%</strong> — powyżej 10% (art. 52 ust. 1). Suma pozycji powyżej 5%: 40,3 / 101,8 = 39,59% — koszyk 40% jest w normie, ale z niewielkim zapasem.</p><p>To <strong>przekroczenie pasywne</strong> (bez transakcji). Art. 57 UCITS: fundusz usuwa je priorytetowo w ramach transakcji sprzedaży, z uwzględnieniem interesu uczestników — nie musi sprzedawać natychmiast po złej cenie. Aby wrócić do 10%, trzeba sprzedać ok. 0,62 mln zł akcji A (10,8 − 0,1 × 101,8).</p><ul><li>Zarejestruj przekroczenie, poinformuj zarządzającego i depozytariusza zgodnie z procedurą.</li><li>Zablokuj kolejne zakupy A w systemie pre-trade.</li><li>Nie ma obowiązku rekompensaty — przekroczenie nie wynika z błędu.</li><li>Zwróć uwagę na koszyk 40% — kolejny wzrost może przekroczyć i ten limit.</li></ul>",
    cards: ["common-stock"]
  },
  {
    id: "group-20", title: "Bank, jego spółki i limit łączny 20%", level: 2,
    situation: "<p>UCITS, NAV 500 mln zł. Ekspozycje na grupę bankową X: akcje spółki matki X 3% NAV, obligacje spółki leasingowej z grupy X 2%, certyfikat depozytowy banku X 3%, depozyt w banku X 8,5%, swap procentowy z bankiem X: wycena +2,5%, otrzymane zabezpieczenie gotówkowe 0,5%. Zarządzający chce kupić obligacje banku X za 2% NAV.</p>",
    question: "Czy transakcja jest dopuszczalna?",
    solution: "<p>Grupa kapitałowa = jeden podmiot (art. 52 ust. 5). Liczymy:</p><ul><li>Papiery i MMI grupy: 3 + 2 + 3 = 8% → po zakupie 10% (limit 10% spełniony; pozycja wchodzi do koszyka 40%).</li><li>Depozyty: 8,5% ≤ 20%.</li><li>Ekspozycja na kontrahenta swapu: 2,5 − 0,5 = 2% ≤ 10%.</li><li><strong>Limit łączny</strong> (art. 52 ust. 2): 8 + 8,5 + 2 = 18,5% → po zakupie <strong>20,5%</strong> &gt; 20%.</li></ul><p>Transakcja w tej wielkości spowodowałaby <strong>przekroczenie aktywne</strong>. Maksymalnie można kupić 1,5% NAV. Częsty błąd: liczenie limitów osobno dla każdej spółki i pomijanie depozytów oraz swapów.</p>",
    cards: ["corporate-bond", "certificate-of-deposit", "interest-rate-swap"]
  },
  {
    id: "cpty-otc", title: "Kontrahent bankowy i niebankowy", level: 2,
    situation: "<p>UCITS, NAV 200 mln EUR. Z bankiem Y (instytucja kredytowa) fundusz ma swapy procentowe z wyceną +26 mln oraz forwardy walutowe z wyceną −4 mln, wszystkie w jednej umowie ISDA z prawnie skutecznym nettingiem. Otrzymał od Y 8 mln EUR zabezpieczenia gotówkowego. Z firmą inwestycyjną Z (nie jest bankiem) fundusz ma opcje OTC z wyceną +11,5 mln, bez zabezpieczenia. Żadna transakcja nie jest rozliczana przez CCP.</p>",
    question: "Czy limity kontrahenta są spełnione?",
    solution: "<p>Bank Y: netting w jednej umowie: 26 − 4 = 22 mln; minus zabezpieczenie 8 mln = 14 mln = <strong>7% NAV</strong> ≤ 10% — limit spełniony.</p><p>Firma Z: limit dla podmiotu niebędącego instytucją kredytową to 5%. 11,5 / 200 = <strong>5,75%</strong> — przekroczenie. Jeżeli wynika ze zmiany wyceny, jest pasywne.</p><ul><li>Możliwe działania: wezwanie Z do zabezpieczenia (jeśli CSA na to pozwala), częściowe zamknięcie opcji, przeniesienie do kontrahenta bankowego.</li><li>Zabezpieczenie zmniejsza ekspozycję tylko, jeśli spełnia kryteria ESMA/2014/937 (płynność, wycena, jakość, dywersyfikacja, możliwość realizacji bez zgody kontrahenta).</li><li>Po zmianie dyrektywą 2024/2994 transakcje rozliczane przez autoryzowaną lub uznaną CCP nie liczyłyby się do tego limitu.</li></ul>",
    cards: ["interest-rate-swap", "fx-forward", "fx-option"]
  },
  {
    id: "major-holding", title: "Akcje plus swap — zawiadomienie o znacznym pakiecie", level: 2,
    situation: "<p>Spółka notowana na GPW ma 50 mln akcji (1 akcja = 1 głos). Fundusze zarządzane przez TFI łącznie mają 1,8 mln akcji. Jeden z funduszy zawiera właśnie long equity swap rozliczany gotówkowo na 1,0 mln akcji tej spółki.</p>",
    question: "Czy powstaje obowiązek zawiadomienia?",
    solution: "<p>Akcje: 1,8 / 50 = 3,6%. Swap rozliczany gotówkowo to instrument o podobnym skutku ekonomicznym (art. 13 dyrektywy o przejrzystości) — liczy się z deltą, tu 1: 1,0 / 50 = 2%. Razem <strong>5,6%</strong> — przekroczony próg 5%.</p><ul><li>Pozycje liczy się łącznie dla wszystkich funduszy zarządzanych przez TFI.</li><li>W Polsce zawiadomienie składa się do KNF i spółki w ciągu 4 dni roboczych (ustawa o ofercie publicznej, art. 69 i 69b).</li><li>W zawiadomieniu wykazuje się osobno akcje i instrumenty finansowe.</li><li>Gdyby swap był krótki, sprawdzić trzeba też SSR (pozycja krótka netto).</li></ul>",
    cards: ["equity-swap", "common-stock", "total-return-swap"]
  },
  {
    id: "hedged-class", title: "Zabezpieczona klasa jednostek — nadmierne zabezpieczenie", level: 2,
    situation: "<p>Fundusz w PLN ma klasę jednostek w EUR zabezpieczoną walutowo. Wartość aktywów netto klasy: równowartość 50 mln EUR. Po dużych umorzeniach w klasie łączny nominał forwardów zabezpieczających (sprzedaż PLN, kupno EUR) wynosi 54 mln EUR.</p>",
    question: "Czy zabezpieczenie jest prawidłowe?",
    solution: "<p>Wskaźnik zabezpieczenia: 54 / 50 = <strong>108%</strong>. Według opinii ESMA34-43-296 pozycja nadmiernie zabezpieczona nie może przekraczać 105% wartości klasy, a niedostatecznie zabezpieczona nie może spaść poniżej 95%. Pozycje powyżej 100% nie mogą być przenoszone z miesiąca na miesiąc.</p><ul><li>Trzeba zmniejszyć nominał forwardów co najmniej o 1,5 mln EUR (do 52,5 mln), w praktyce do ok. 50 mln (100%).</li><li>Wynik zabezpieczenia przypisuje się wyłącznie tej klasie.</li><li>Ryzyko kontrahenta forwardów liczy się na poziomie całego funduszu.</li><li>Kontrola wskaźnika powinna być co najmniej dzienna przy dużych przepływach.</li></ul>",
    cards: ["fx-forward", "fx-swap"]
  },
  {
    id: "global-exposure", title: "Ile jeszcze kontraktów futures?", level: 3,
    situation: "<p>UCITS, NAV 50 mln EUR, metoda zaangażowania. Pozycje: 120 kontraktów futures na Euro Stoxx 50 (indeks 5 000, mnożnik 10 EUR); 200 kupionych opcji call na akcję (wielkość kontraktu 100 akcji, kurs 80 EUR, delta 0,6); payer IRS o nominale 20 mln EUR (nie zabezpiecza portfela); 150 kontraktów na Bund (nominał 100 000 EUR, cena CTD 98%); forwardy walutowe zabezpieczające aktywa w USD (spełniają warunki hedgingu). Zarządzający chce dokupić futures na Euro Stoxx 50.</p>",
    question: "Jaka jest obecna ekspozycja i ile kontraktów można dokupić?",
    solution: "<ul><li>Futures na indeks: 120 × 5 000 × 10 = 6,00 mln.</li><li>Opcje: 200 × 100 × 80 × 0,6 = 0,96 mln.</li><li>IRS: nominał 20,00 mln.</li><li>Bund: 150 × 100 000 × 0,98 = 14,70 mln.</li><li>Forwardy zabezpieczające: kompensowane z zabezpieczanymi aktywami — 0.</li></ul><p>Razem <strong>41,66 mln = 83,3% NAV</strong>. Jeden dodatkowy kontrakt to 50 000 EUR, a zapas do 100% to 8,34 mln, więc można dokupić maksymalnie <strong>166 kontraktów</strong> (167 dałoby 100,02%).</p><p>W praktyce zostawia się bufor na zmiany cen i delty. Payer IRS i długa pozycja w Bundach mają przeciwne ryzyko stopy procentowej — przy spełnieniu warunków CESR/10-788 można zastosować duration netting i obniżyć ekspozycję.</p>",
    cards: ["equity-index-future", "listed-equity-option", "interest-rate-swap", "government-bond-future"]
  },
  {
    id: "collateral-reinvest", title: "Reinwestycja zabezpieczenia z pożyczki papierów", level: 3,
    situation: "<p>UCITS pożycza akcje przez agenta. Otrzymał 10 mln EUR zabezpieczenia gotówkowego. Kontrola post-trade wykazuje, że agent zainwestował 3 mln EUR tej gotówki w obligacje senior banku z ratingiem A.</p>",
    question: "Czy to dopuszczalne?",
    solution: "<p><strong>Nie.</strong> Według wytycznych ESMA/2014/937 gotówkę z zabezpieczenia można lokować tylko w: depozyty w instytucjach kredytowych spełniających art. 50 ust. 1 lit. f, wysokiej jakości obligacje skarbowe, reverse repo z instytucjami kredytowymi pod nadzorem ostrożnościowym (z możliwością odzyskania gotówki w każdej chwili) oraz krótkoterminowe fundusze rynku pieniężnego. Obligacje korporacyjne banku nie mieszczą się w katalogu.</p><ul><li>To <strong>przekroczenie aktywne</strong> — wynika z decyzji agenta działającego w imieniu funduszu.</li><li>Pozycję trzeba zamknąć; ewentualną stratę pokrywa agent lub spółka zarządzająca zgodnie z umową.</li><li>Sprawdź też dywersyfikację zabezpieczenia (maks. 20% NAV od jednego emitenta) i to, czy reinwestycja nie tworzy dźwigni.</li><li>Poinformuj depozytariusza; rozważ zgłoszenie do nadzorcy według procedury i prawa krajowego.</li></ul>",
    cards: ["securities-lending", "repurchase-agreement"]
  }
];

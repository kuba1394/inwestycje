/*
 * Lekcje z historii. { id, date, title, what, how (mechanizm), lesson (czego to uczy compliance), changed (co zmieniło się w przepisach), cards[], basics[] }
 */
window.HISTORY = [
  {
    id: "herstatt", date: "26 czerwca 1974", title: "Bankhaus Herstatt — ryzyko rozrachunku",
    what: "Niemiecki nadzór odebrał licencję bankowi Herstatt po zamknięciu dnia w Niemczech, ale w trakcie dnia pracy w Nowym Jorku. Kontrahenci, którzy w transakcjach walutowych już zapłacili bankowi marki, nie otrzymali należnych im dolarów.",
    how: "Transakcja walutowa ma dwie nogi rozliczane w różnych strefach czasowych i różnych systemach płatności. Gdy jedna strona zapłaci swoją walutę wcześniej, przez kilka godzin jest narażona na pełną kwotę transakcji, a nie tylko na zmianę kursu.",
    lesson: "Ryzyko rozrachunku (nazywane dziś ryzykiem Herstatt) to ryzyko utraty całego kapitału, nie tylko wartości rynkowej. Dlatego kontrola ekspozycji na kontrahenta musi uwzględniać także płatności w drodze.",
    changed: "Pod koniec 1974 r. banki centralne G10 powołały Bazylejski Komitet Nadzoru Bankowego. W 2002 r. ruszył system CLS, który rozlicza transakcje walutowe na zasadzie płatność za płatność (PvP).",
    cards: ["fx-forward", "fx-swap"], basics: ["settlement", "counterparty-risk"]
  },
  {
    id: "ltcm", date: "sierpień–wrzesień 1998", title: "Long-Term Capital Management — dźwignia i zatłoczone transakcje",
    what: "Fundusz hedgingowy założony przez wybitnych traderów i noblistów stracił większość kapitału w kilka tygodni po niewypłacalności Rosji. Nowojorski Fed zorganizował dokapitalizowanie przez konsorcjum kilkunastu banków (ok. 3,6 mld USD), aby uniknąć chaotycznej likwidacji pozycji.",
    how: "Strategie polegały na zarabianiu na małych różnicach cen (np. między podobnymi obligacjami) przy bardzo dużej dźwigni — bilansowej rzędu kilkudziesięciu razy i ogromnym nominale derywatów. W kryzysie inwestorzy uciekli do najbezpieczniejszych aktywów, różnice cen zamiast maleć gwałtownie wzrosły, a wiele banków miało te same pozycje.",
    lesson: "Modele oparte na historycznych korelacjach zawodzą w kryzysie. Ekspozycja z derywatów może wielokrotnie przekraczać kapitał. Ryzyko płynności i koncentracji wobec kontrahentów jest równie ważne jak ryzyko rynkowe.",
    changed: "Wzmocnienie zarządzania ryzykiem kontrahenta w bankach i stress testów. W regulacji funduszy idea limitów dźwigni wróciła w AIFMD (metody brutto i zaangażowania, raportowanie dźwigni > 3×).",
    cards: ["interest-rate-swap", "repurchase-agreement", "government-bond-future"], basics: ["leverage", "global-exposure"]
  },
  {
    id: "reserve-primary", date: "16 września 2008", title: "Reserve Primary Fund — fundusz rynku pieniężnego „łamie dolara”",
    what: "Dzień po upadłości Lehman Brothers najstarszy amerykański fundusz rynku pieniężnego ogłosił wartość jednostki 0,97 USD zamiast stałego 1 USD. Miał w portfelu commercial paper Lehmana. Inwestorzy masowo umarzali jednostki w całej branży, a rynek CP zamarł.",
    how: "Fundusz o stałej wartości jednostki obiecuje praktycznie gotówkę. Gdy jeden emitent upada, strata, nawet niewielka, łamie tę obietnicę. Kto umorzy pierwszy, odzyskuje 1 USD — to zachęca do runu.",
    lesson: "Limity emitenta i jakość kredytowa w funduszach pieniężnych są kluczowe. Płynność portfela musi wystarczyć na nagłe umorzenia. Instrumenty uważane za „prawie gotówkę” mogą w kryzysie stracić płynność.",
    changed: "Rząd USA wprowadził tymczasowe gwarancje dla MMF. Później przyszły reformy SEC (2010, 2014), a w UE rozporządzenie MMFR 2017/1131 z wymogami płynności dziennej i tygodniowej oraz typami CNAV, LVNAV i VNAV.",
    cards: ["commercial-paper", "treasury-bill", "certificate-of-deposit"], basics: ["fund-types"]
  },
  {
    id: "aig", date: "wrzesień 2008", title: "AIG — sprzedaż ochrony CDS bez zabezpieczeń",
    what: "Ubezpieczyciel AIG przez spółkę AIG Financial Products sprzedał ochronę CDS na setki miliardów dolarów, głównie na najwyżej oceniane transze sekurytyzacji kredytów hipotecznych. Po obniżeniu ratingu AIG kontrahenci zażądali zabezpieczeń, których nie miał. Rząd USA ratował firmę kwotą sięgającą ostatecznie ok. 180 mld USD.",
    how: "Sprzedający ochronę otrzymuje regularną premię i przez lata wygląda na zyskownego. Ryzyko jest ukryte: gdy rośnie prawdopodobieństwo niewypłacalności, wartość ochrony gwałtownie rośnie, a umowy CSA wymagają wpłat zabezpieczeń, szczególnie po obniżeniu ratingu sprzedającego.",
    lesson: "Sprzedaż ochrony CDS to pozycja długa w ryzyku kredytowym i trzeba ją liczyć do limitów emitenta. Klauzule ratingowe w CSA mogą wywołać nagłe zapotrzebowanie na gotówkę. Brak przejrzystości rynku OTC uniemożliwił nadzorcom ocenę skali ryzyka.",
    changed: "Na szczycie G20 w Pittsburghu (2009) uzgodniono reformę rynku derywatów OTC: obowiązkowy clearing, raportowanie do repozytoriów i depozyty zabezpieczające. W UE wdrożyło to EMIR (2012), w USA Dodd-Frank Act.",
    cards: ["credit-default-swap"], basics: ["clearing-ccp", "collateral", "counterparty-risk"]
  },
  {
    id: "libor", date: "2012", title: "Manipulacje LIBOR — wiarygodność wskaźników",
    what: "Śledztwa ujawniły, że banki zgłaszające stawki do LIBOR i EURIBOR zaniżały je lub ustawiały pod pozycje swoich traderów. Banki zapłaciły miliardowe kary.",
    how: "LIBOR był oparty na deklaracjach banków, a nie na rzeczywistych transakcjach. Od tej stawki zależała wycena derywatów i kredytów wartych setki bilionów dolarów, więc nawet niewielkie przesunięcie dawało duże zyski.",
    lesson: "Wycena i rozliczenie derywatu są tak dobre, jak wskaźnik, na którym się opiera. Compliance musi wiedzieć, z jakiego wskaźnika korzysta instrument i czy jest on zarejestrowany.",
    changed: "Rozporządzenie BMR 2016/1011 o wskaźnikach referencyjnych. Przejście na stopy overnight (RFR): €STR, SOFR, SONIA. Zakończenie publikacji większości stawek LIBOR (2021–2023). W Polsce trwa reforma zastępująca WIBOR nowym wskaźnikiem.",
    cards: ["overnight-index-swap", "interest-rate-swap", "forward-rate-agreement"], basics: ["yield-curve"]
  },
  {
    id: "march-2020", date: "marzec 2020", title: "„Dash for cash” — zamarznięcie rynku pieniężnego w pandemii",
    what: "Na początku pandemii inwestorzy na całym świecie jednocześnie sprzedawali aktywa, żeby mieć gotówkę. Fundusze rynku pieniężnego w EUR, USD i GBP (szczególnie typu LVNAV i prime) notowały duże umorzenia, a rynek commercial paper i certyfikatów depozytowych praktycznie przestał działać. Nawet rynek amerykańskich obligacji skarbowych miał problemy z płynnością.",
    how: "Fundusze, aby wypłacić umorzenia, muszą sprzedać papiery. Gdy wszyscy sprzedają naraz, a dealerzy nie mają miejsca w bilansach, ceny spadają, co zachęca do kolejnych umorzeń. W LVNAV zbliżenie się do progów płynności wywołuje ucieczkę przed możliwymi opłatami lub blokadą umorzeń.",
    lesson: "Bufory płynności dziennej i tygodniowej muszą być realnie dostępne. Ten sam instrument może mieć dobrą płynność w normalnych warunkach i zerową w kryzysie — dlatego stress testy płynności są obowiązkowe (MMFR art. 28, wytyczne ESMA dla UCITS i AIF).",
    changed: "Banki centralne uruchomiły programy skupu (Fed CPFF i MMLF, EBC PEPP). ESMA i FSB zarekomendowały reformę MMF; w UE dyskusja o zmianie MMFR trwa. Wzmocniono nadzór nad narzędziami płynności w funduszach (AIFMD II i zmiany UCITS z dyr. 2024/927).",
    cards: ["commercial-paper", "certificate-of-deposit", "treasury-bill"], basics: ["fund-types", "time-value"]
  },
  {
    id: "archegos", date: "marzec 2021", title: "Archegos Capital — ukryta koncentracja w swapach",
    what: "Family office Archegos budował ogromne pozycje w kilku spółkach przez total return swapy z wieloma bankami jednocześnie. Gdy kurs jednej ze spółek spadł, banki zażądały depozytów. Archegos nie zapłacił, a banki wyprzedały akcje zabezpieczające. Credit Suisse stracił ok. 5,5 mld USD, Nomura ok. 2,9 mld USD.",
    how: "Swap daje ekonomiczną ekspozycję bez posiadania akcji. Bank kupuje akcje jako zabezpieczenie, ale nie wie, ile podobnych swapów klient ma w innych bankach. W USA swapy rozliczane gotówkowo nie podlegały wtedy zgłoszeniom znacznych pakietów, więc rynek nie widział koncentracji.",
    lesson: "Instrumenty pochodne mogą ukryć koncentrację i znaczne pakiety. Dlatego w UE do progów zawiadomień (dyrektywa o przejrzystości) i pozycji krótkich (SSR) wlicza się instrumenty o podobnym skutku ekonomicznym. Ryzyko kontrahenta trzeba oceniać razem z ryzykiem koncentracji.",
    changed: "SEC zaproponowała obowiązek ujawniania dużych pozycji w swapach na papiery (projekt reguły 10B-1). Banki zaostrzyły zasady depozytów dla prime brokerage. Bazylejski Komitet wydał wytyczne o zarządzaniu ryzykiem kontrahenta (2024).",
    cards: ["total-return-swap", "equity-swap", "contract-for-difference"], basics: ["counterparty-risk", "leverage"]
  },
  {
    id: "uk-ldi", date: "wrzesień 2022", title: "Fundusze LDI w Wielkiej Brytanii — wezwania do zabezpieczeń",
    what: "Po ogłoszeniu tzw. mini-budżetu 23 września 2022 r. rentowności długich brytyjskich obligacji skarbowych wzrosły w kilka dni o ponad 1 punkt procentowy. Fundusze LDI używane przez fundusze emerytalne dostały wezwania do wpłat zabezpieczeń i musiały sprzedawać obligacje, co jeszcze bardziej obniżało ich ceny. 28 września Bank Anglii rozpoczął tymczasowy skup obligacji.",
    how: "Fundusze LDI zabezpieczały zobowiązania emerytalne przez dźwignię: repo i swapy procentowe (receivery). Wzrost stóp powodował straty na swapach i spadek wartości obligacji używanych jako zabezpieczenie. Wymagane wpłaty variation margin przekroczyły bufory gotówkowe.",
    lesson: "Nawet „bezpieczna” strategia oparta na obligacjach skarbowych z dźwignią może wywołać kryzys płynności. Variation margin trzeba płacić gotówką szybko — bufory płynności muszą uwzględniać skrajne ruchy stóp, a nie tylko historyczne.",
    changed: "Bank Anglii zalecił, aby fundusze LDI wytrzymywały wzrost rentowności o co najmniej 250 pb; nadzorcy w Irlandii i Luksemburgu (CBI, CSSF) wprowadzili dla funduszy LDI w GBP wymóg odporności na ok. 300 pb.",
    cards: ["interest-rate-swap", "repurchase-agreement", "government-bond"], basics: ["collateral", "duration", "leverage"]
  }
];

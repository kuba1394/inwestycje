window.BASICS.push({
  id: "settlement",
  title: { pl: "Rozrachunek: DvP, CSD i cykl T+n", en: "Settlement: DvP, CSDs and the T+n cycle" },
  level: 1,
  prereq: ["market-participants"],
  sources: ["csdr", "csdrT1"],
  related: ["common-stock", "government-bond", "repurchase-agreement"],
  content: {
    pl: {
      summary: "Zawarcie transakcji to dopiero umowa. Faktyczna wymiana papierów i pieniędzy — rozrachunek — następuje kilka dni później w centralnym depozycie papierów (CSD). W UE standardem jest T+2, a od 11 października 2027 będzie T+1. Zasada „dostawa za płatność” (DvP) chroni obie strony przed sytuacją, w której jedna odda swoje i nic nie dostanie.",
      keyFacts: [
        ["Trade date (T)", "Dzień zawarcia transakcji."],
        ["Settlement date", "Dzień rozrachunku: UE T+2 (od 11.10.2027 T+1), USA T+1."],
        ["DvP", "Papiery i gotówka przechodzą jednocześnie."],
        ["CSDR", "Kary pieniężne za nieudane rozrachunki; dyscyplina rozrachunku."]
      ],
      sections: [
        { id: "steps", title: "Od transakcji do rozrachunku",
          html: "<ol class='steps'>" +
                "<li><strong>T — zawarcie.</strong> Uzgodniona cena i ilość. Od tego dnia fundusz ma ryzyko rynkowe pozycji (księgowanie według daty transakcji).</li>" +
                "<li><strong>T — potwierdzenie i alokacja.</strong> Broker i zarządzający potwierdzają szczegóły; transakcja jest przypisana do funduszy.</li>" +
                "<li><strong>T — instrukcje rozrachunkowe.</strong> Depozytariusz funduszu i druga strona wysyłają do CSD dopasowujące się instrukcje (SSI). Przy T+1 instrukcje trzeba wysłać jeszcze w dniu T.</li>" +
                "<li><strong>Dopasowanie (matching).</strong> CSD porównuje instrukcje obu stron.</li>" +
                "<li><strong>T+n — rozrachunek DvP.</strong> CSD jednocześnie przenosi papiery i gotówkę.</li>" +
                "</ol>" },
        { id: "csd", title: "CSD i ICSD",
          html: "<p><strong>CSD</strong> (centralny depozyt papierów wartościowych) prowadzi rejestr papierów i rozlicza transakcje na danym rynku, np. KDPW w Polsce. <strong>ICSD</strong> (Euroclear Bank, Clearstream Banking Luxembourg) rozliczają papiery międzynarodowe, m.in. euroobligacje (ISIN z prefiksem XS) i wiele ETF.</p>" +
                "<p>Fundusz zwykle nie jest uczestnikiem CSD bezpośrednio — robi to jego depozytariusz lub custodian.</p>" },
        { id: "fails", title: "Nieudane rozrachunki",
          html: "<p>Rozrachunek może się nie udać, gdy sprzedający nie ma papierów (np. nie wróciły z pożyczki) lub kupujący gotówki, albo instrukcje się nie zgadzają.</p>" +
                "<ul>" +
                "<li><strong>Kary CSDR</strong> — dzienne kary pieniężne dla strony powodującej nieudany rozrachunek, naliczane przez CSD.</li>" +
                "<li><strong>Przymusowy odkup (buy-in)</strong> — po zmianach CSDR Refit to narzędzie ostateczne, które może zostać uruchomione, jeśli kary nie poprawią dyscypliny.</li>" +
                "<li>Dla compliance: pozycja wg daty transakcji ≠ pozycja rozliczona. Limity zwykle liczy się według daty transakcji, ale np. przy pożyczce papierów liczy się, co faktycznie jest na rachunku.</li>" +
                "</ul>" },
        { id: "t1", title: "Przejście na T+1",
          html: "<p>USA i Kanada przeszły na T+1 w maju 2024. UE, Wielka Brytania i Szwajcaria przechodzą na T+1 jednocześnie <strong>11 października 2027</strong>. Mniej czasu oznacza:</p>" +
                "<ul><li>potwierdzenia i alokacje jeszcze w dniu T;</li><li>krótszy czas na transakcje walutowe finansujące zakup (ryzyko przy zakupach w innej walucie);</li><li>szybsze odwoływanie pożyczonych papierów;</li><li>więcej ryzyka nieudanych rozrachunków w okresie przejściowym.</li></ul>" }
      ],
      glossary: [
        ["Trade date / settlement date", "Data zawarcia transakcji / data rozrachunku."],
        ["SSI (Standing Settlement Instructions)", "Stałe instrukcje rozrachunkowe — gdzie i na jaki rachunek dostarczyć papiery i gotówkę."],
        ["Settlement fail", "Nieudany rozrachunek — brak dostawy papierów lub gotówki w terminie."],
        ["ICSD", "Międzynarodowy centralny depozyt papierów (Euroclear Bank, Clearstream Banking Luxembourg)."]
      ]
    },
    en: {
      summary: "Executing a trade is only an agreement. The actual exchange of securities and money — settlement — happens a few days later at a central securities depository (CSD). The EU standard is T+2, moving to T+1 on 11 October 2027. Delivery versus payment (DvP) protects both sides from handing over their part and getting nothing back.",
      keyFacts: [
        ["Trade date (T)", "The day the trade is executed."],
        ["Settlement date", "The day of settlement: EU T+2 (T+1 from 11 Oct 2027), US T+1."],
        ["DvP", "Securities and cash move at the same moment."],
        ["CSDR", "Cash penalties for settlement fails; settlement discipline."]
      ],
      sections: [
        { id: "steps", title: "From trade to settlement",
          html: "<ol class='steps'>" +
                "<li><strong>T — execution.</strong> Price and quantity agreed. From this day the fund bears the position's market risk (trade-date accounting).</li>" +
                "<li><strong>T — confirmation and allocation.</strong> The broker and the manager confirm details; the trade is allocated to funds.</li>" +
                "<li><strong>T — settlement instructions.</strong> The fund's depositary and the counterparty send matching instructions (SSIs) to the CSD. Under T+1 they must go out on day T.</li>" +
                "<li><strong>Matching.</strong> The CSD compares both sides' instructions.</li>" +
                "<li><strong>T+n — DvP settlement.</strong> The CSD moves the securities and cash simultaneously.</li>" +
                "</ol>" },
        { id: "csd", title: "CSDs and ICSDs",
          html: "<p>A <strong>CSD</strong> (central securities depository) keeps the securities register and settles trades in a market, e.g. KDPW in Poland. <strong>ICSDs</strong> (Euroclear Bank, Clearstream Banking Luxembourg) settle international securities, including Eurobonds (ISINs starting XS) and many ETFs.</p>" +
                "<p>A fund is usually not a CSD participant itself — its depositary or custodian is.</p>" },
        { id: "fails", title: "Settlement fails",
          html: "<p>Settlement can fail when the seller lacks the securities (e.g. not yet returned from a loan) or the buyer lacks cash, or the instructions do not match.</p>" +
                "<ul>" +
                "<li><strong>CSDR penalties</strong> — daily cash penalties on the party causing the fail, charged by the CSD.</li>" +
                "<li><strong>Mandatory buy-in</strong> — after CSDR Refit, a last-resort tool that may be activated if penalties do not improve discipline.</li>" +
                "<li>For compliance: the trade-date position ≠ the settled position. Limits are usually computed on trade date, but for securities lending, for example, what matters is what is actually on the account.</li>" +
                "</ul>" },
        { id: "t1", title: "The move to T+1",
          html: "<p>The US and Canada moved to T+1 in May 2024. The EU, the UK and Switzerland move to T+1 together on <strong>11 October 2027</strong>. Less time means:</p>" +
                "<ul><li>confirmations and allocations on day T;</li><li>less time for FX trades funding a purchase (a risk when buying in another currency);</li><li>faster recalls of securities on loan;</li><li>more settlement-fail risk during the transition.</li></ul>" }
      ],
      glossary: [
        ["Trade date / settlement date", "The date a trade is executed / the date it settles."],
        ["SSI (Standing Settlement Instructions)", "Standing instructions on where and to which account securities and cash are delivered."],
        ["Settlement fail", "Failure to deliver securities or cash on time."],
        ["ICSD", "International central securities depository (Euroclear Bank, Clearstream Banking Luxembourg)."]
      ]
    }
  }
});

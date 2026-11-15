window.BASICS.push({
  id: "fund-types",
  title: { pl: "Fundusze: UCITS, AIF i rola compliance", en: "Funds: UCITS, AIF and the role of compliance" },
  level: 1,
  sources: ["ucits", "aifmd", "aifmd2"],
  related: ["exchange-traded-fund", "closed-end-fund"],
  content: {
    pl: {
      summary: "Fundusz inwestycyjny zbiera pieniądze wielu inwestorów i inwestuje je według określonej polityki. W UE są dwa główne reżimy: UCITS (fundusze dla szerokiego grona, z twardymi limitami) i AIF (wszystkie pozostałe, z limitami zapisanymi głównie w dokumentach funduszu). Post-trade compliance sprawdza, czy portfel po każdej transakcji i każdego dnia spełnia te zasady.",
      keyFacts: [
        ["UCITS", "Dyrektywa 2009/65/WE — fundusze otwarte z ścisłymi limitami inwestycyjnymi, „paszport” na całą UE."],
        ["AIF", "Dyrektywa 2011/61/UE (AIFMD) — reguluje zarządzającego (ZAFI), limity inwestycyjne wynikają głównie z dokumentów funduszu."],
        ["Kluczowe podmioty", "Spółka zarządzająca / ZAFI, depozytariusz, agent transferowy, audytor, nadzorca."],
        ["NAV", "Wartość aktywów netto: aktywa − zobowiązania; NAV na jednostkę = NAV / liczba jednostek."]
      ],
      sections: [
        { id: "what", title: "Czym jest fundusz",
          html: "<p>Fundusz to <strong>wspólny portfel</strong>. Inwestorzy wpłacają pieniądze i dostają jednostki uczestnictwa (lub akcje funduszu). Zarządzający inwestuje te pieniądze według polityki z prospektu. Wartość jednostki zmienia się razem z wartością portfela.</p>" +
                "<p class='formula'>NAV na jednostkę = (aktywa − zobowiązania) / liczba jednostek</p>" +
                "<ul><li><strong>Fundusz otwarty</strong> — inwestor może wpłacić lub umorzyć jednostki w każdym dniu wyceny; fundusz musi więc utrzymywać płynność.</li>" +
                "<li><strong>Fundusz zamknięty</strong> — stała liczba jednostek; wyjście tylko przez sprzedaż na rynku (zob. <a href='#/i/closed-end-fund'>Closed-End Fund</a>).</li></ul>" },
        { id: "ucits-aif", title: "UCITS a AIF",
          html: "<table class='calc'><thead><tr><th></th><th>UCITS</th><th>AIF</th></tr></thead><tbody>" +
                "<tr><td>Kogo reguluje</td><td>Fundusz i spółkę zarządzającą</td><td>Głównie zarządzającego (ZAFI)</td></tr>" +
                "<tr><td>Limity inwestycyjne</td><td>Twarde, w dyrektywie (art. 50–57)</td><td>Z dokumentów funduszu i prawa krajowego</td></tr>" +
                "<tr><td>Dopuszczalne aktywa</td><td>Zamknięta lista (papiery, MMI, fundusze, depozyty, derywaty)</td><td>Szerokie (nieruchomości, private equity, kredyty, towary)</td></tr>" +
                "<tr><td>Dźwignia</td><td>Ekspozycja z derywatów ≤ 100% NAV (zaangażowanie) lub limity VaR</td><td>Limit ustala ZAFI i ujawnia; pułapy dla funduszy udzielających pożyczek (AIFMD II)</td></tr>" +
                "<tr><td>Inwestorzy</td><td>Także detaliczni</td><td>Głównie profesjonalni (zależnie od kraju)</td></tr>" +
                "</tbody></table>" +
                "<p>W Polsce UCITS to fundusze otwarte (FIO), a AIF to m.in. specjalistyczne fundusze otwarte (SFIO) i fundusze zamknięte (FIZ).</p>" },
        { id: "roles", title: "Kto jest kim",
          html: "<ul><li><strong>Spółka zarządzająca (UCITS) / ZAFI (AIF)</strong> — podejmuje decyzje inwestycyjne, zarządza ryzykiem, prowadzi compliance.</li>" +
                "<li><strong>Depozytariusz</strong> — przechowuje aktywa, kontroluje przepływy pieniężne i zgodność operacji funduszu z prawem i regulaminem (druga linia kontroli „z zewnątrz”).</li>" +
                "<li><strong>Agent transferowy</strong> — prowadzi rejestr uczestników, obsługuje wpłaty i umorzenia.</li>" +
                "<li><strong>Wycena (fund accounting)</strong> — liczy NAV codziennie lub w dni wyceny.</li>" +
                "<li><strong>Nadzorca</strong> — w Polsce KNF; zatwierdza fundusze i kontroluje zgodność.</li></ul>" },
        { id: "compliance", title: "Co robi post-trade compliance",
          html: "<ol class='steps'>" +
                "<li><strong>Kontrola po transakcji.</strong> Każda zawarta transakcja jest sprawdzana pod kątem dopuszczalności instrumentu i limitów (najczęściej automatycznie w systemie, w dniu T lub T+1).</li>" +
                "<li><strong>Codzienny monitoring portfela.</strong> Limity mogą zostać przekroczone bez żadnej transakcji — przez zmianę cen, umorzenia, zdarzenia korporacyjne. To <em>przekroczenia pasywne</em>.</li>" +
                "<li><strong>Klasyfikacja przekroczenia.</strong> Aktywne (wynikające z decyzji zarządzającego) → niezwłoczna korekta i ocena szkody dla funduszu. Pasywne → usunięcie w pierwszej kolejności, z uwzględnieniem interesu uczestników (art. 57 UCITS).</li>" +
                "<li><strong>Eskalacja i rejestr.</strong> Zgłoszenie do zarządzającego, rejestr naruszeń, raport dla zarządu, depozytariusza i — gdy wymagane — nadzorcy.</li>" +
                "<li><strong>Dane i mapowanie.</strong> Poprawne dane instrumentów (emitent, grupa, typ, rynek) to podstawa — większość „fałszywych” alertów i przeoczeń wynika ze złego mapowania.</li>" +
                "</ol>" }
      ],
      glossary: [
        ["NAV (Net Asset Value)", "Wartość aktywów netto funduszu: aktywa minus zobowiązania."],
        ["Passive breach", "Przekroczenie limitu bez transakcji — np. przez zmianę cen lub umorzenia."],
        ["Active breach", "Przekroczenie limitu wywołane transakcją zawartą przez zarządzającego."],
        ["Depositary", "Depozytariusz — przechowuje aktywa funduszu i kontroluje zgodność jego operacji."]
      ]
    },
    en: {
      summary: "An investment fund pools money from many investors and invests it under a defined policy. The EU has two main regimes: UCITS (funds for a broad public, with hard limits) and AIFs (everything else, with limits set mainly in the fund documents). Post-trade compliance checks that the portfolio meets those rules after every trade and every day.",
      keyFacts: [
        ["UCITS", "Directive 2009/65/EC — open-ended funds with strict investment limits, EU-wide passport."],
        ["AIF", "Directive 2011/61/EU (AIFMD) — regulates the manager (AIFM); investment limits come mainly from the fund documents."],
        ["Key parties", "Management company / AIFM, depositary, transfer agent, auditor, regulator."],
        ["NAV", "Net asset value: assets − liabilities; NAV per unit = NAV / units in issue."]
      ],
      sections: [
        { id: "what", title: "What a fund is",
          html: "<p>A fund is a <strong>shared portfolio</strong>. Investors pay in money and receive units (or fund shares). The manager invests the money under the prospectus policy. The unit value moves with the portfolio value.</p>" +
                "<p class='formula'>NAV per unit = (assets − liabilities) / units in issue</p>" +
                "<ul><li><strong>Open-ended fund</strong> — investors can subscribe or redeem on every dealing day, so the fund must stay liquid.</li>" +
                "<li><strong>Closed-ended fund</strong> — fixed number of units; exit only by selling in the market (see <a href='#/i/closed-end-fund'>Closed-End Fund</a>).</li></ul>" },
        { id: "ucits-aif", title: "UCITS vs AIF",
          html: "<table class='calc'><thead><tr><th></th><th>UCITS</th><th>AIF</th></tr></thead><tbody>" +
                "<tr><td>Who is regulated</td><td>The fund and its management company</td><td>Mainly the manager (AIFM)</td></tr>" +
                "<tr><td>Investment limits</td><td>Hard, in the Directive (Art. 50–57)</td><td>From the fund documents and national law</td></tr>" +
                "<tr><td>Eligible assets</td><td>Closed list (securities, MMIs, funds, deposits, derivatives)</td><td>Broad (property, private equity, loans, commodities)</td></tr>" +
                "<tr><td>Leverage</td><td>Derivative exposure ≤ 100% of NAV (commitment) or VaR limits</td><td>Set and disclosed by the AIFM; caps for loan-originating funds (AIFMD II)</td></tr>" +
                "<tr><td>Investors</td><td>Including retail</td><td>Mainly professional (varies by country)</td></tr>" +
                "</tbody></table>" +
                "<p>In Poland UCITS are open-ended funds (FIO), while AIFs include specialised open-ended funds (SFIO) and closed-ended funds (FIZ).</p>" },
        { id: "roles", title: "Who does what",
          html: "<ul><li><strong>Management company (UCITS) / AIFM (AIF)</strong> — makes investment decisions, manages risk, runs compliance.</li>" +
                "<li><strong>Depositary</strong> — safekeeps assets, monitors cash flows and checks that fund operations comply with law and fund rules (an external second line of control).</li>" +
                "<li><strong>Transfer agent</strong> — keeps the register of investors, processes subscriptions and redemptions.</li>" +
                "<li><strong>Fund accounting</strong> — calculates NAV daily or on dealing days.</li>" +
                "<li><strong>Regulator</strong> — in Poland the KNF; authorises funds and supervises compliance.</li></ul>" },
        { id: "compliance", title: "What post-trade compliance does",
          html: "<ol class='steps'>" +
                "<li><strong>Post-trade check.</strong> Every executed trade is checked for instrument eligibility and limits (usually automatically, on T or T+1).</li>" +
                "<li><strong>Daily portfolio monitoring.</strong> Limits can be breached without any trade — through price moves, redemptions, corporate actions. These are <em>passive breaches</em>.</li>" +
                "<li><strong>Breach classification.</strong> Active (caused by a manager's decision) → corrected without delay and loss to the fund assessed. Passive → remedied as a priority, taking unitholders' interests into account (Art. 57 UCITS).</li>" +
                "<li><strong>Escalation and log.</strong> Notification to the manager, breach register, reports to the board, the depositary and — where required — the regulator.</li>" +
                "<li><strong>Data and mapping.</strong> Correct instrument data (issuer, group, type, market) is the foundation — most false alerts and misses come from bad mapping.</li>" +
                "</ol>" }
      ],
      glossary: [
        ["NAV (Net Asset Value)", "The fund's net asset value: assets minus liabilities."],
        ["Passive breach", "A limit breach without a trade — e.g. from price moves or redemptions."],
        ["Active breach", "A limit breach caused by a trade executed by the manager."],
        ["Depositary", "Safekeeps the fund's assets and checks that its operations comply."]
      ]
    }
  }
});

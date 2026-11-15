window.BASICS.push({
  id: "clearing-ccp",
  title: { pl: "CCP, clearing i depozyty zabezpieczające", en: "CCPs, clearing and margin" },
  level: 2,
  prereq: ["derivatives", "market-participants"],
  sources: ["emir", "emir3dir"],
  related: ["equity-index-future", "interest-rate-swap", "credit-default-swap"],
  content: {
    pl: {
      summary: "Izba rozliczeniowa (CCP) wchodzi pomiędzy strony transakcji: staje się kupującym dla każdego sprzedającego i sprzedającym dla każdego kupującego. Dzięki temu uczestnicy nie muszą się martwić niewypłacalnością drugiej strony — ryzyko przejmuje CCP, chroniona depozytami i funduszem gwarancyjnym. Kontrakty giełdowe są zawsze rozliczane przez CCP, a część derywatów OTC musi być rozliczana z mocy EMIR.",
      keyFacts: [
        ["Nowacja", "Jedna umowa A–B zamienia się w dwie: A–CCP i CCP–B."],
        ["Initial margin (IM)", "Depozyt początkowy — pokrywa możliwą stratę na kilka dni na wypadek niewypłacalności."],
        ["Variation margin (VM)", "Codzienne rozliczenie zmiany wartości pozycji."],
        ["Przykłady CCP", "Eurex Clearing, LCH, ICE Clear, CME Clearing, KDPW_CCP."]
      ],
      sections: [
        { id: "how", title: "Jak działa CCP",
          html: "<ol class='steps'>" +
                "<li><strong>Nowacja.</strong> Po zawarciu transakcji CCP staje się stroną dla obu uczestników.</li>" +
                "<li><strong>Członkowie rozliczający.</strong> Do CCP mają dostęp tylko członkowie (zwykle duże banki). Fundusz korzysta z pośrednika — <em>clearing brokera</em>.</li>" +
                "<li><strong>Depozyty.</strong> CCP pobiera IM przy otwarciu i codziennie (lub częściej) VM.</li>" +
                "<li><strong>Kompensowanie.</strong> Pozycje przeciwne u tego samego członka się znoszą — mniej depozytów i płatności.</li>" +
                "<li><strong>Niewypłacalność członka.</strong> CCP zamyka lub przenosi jego pozycje i pokrywa straty według kaskady (<em>default waterfall</em>): depozyty upadłego → jego wkład do funduszu gwarancyjnego → kapitał CCP → wkłady pozostałych członków.</li>" +
                "</ol>" },
        { id: "margin", title: "IM i VM na przykładzie",
          html: "<p>Fundusz kupuje kontrakty o wartości 1 mln EUR; CCP wymaga 8% IM.</p>" +
                "<div class='table-scroll'><table class='calc'><tbody>" +
                "<tr><td>Depozyt początkowy (IM)</td><td class='num'>80 000 EUR — zwracany przy zamknięciu</td></tr>" +
                "<tr><td>Dzień 1: wartość +1%</td><td class='num'>VM +10 000 EUR (fundusz otrzymuje)</td></tr>" +
                "<tr><td>Dzień 2: wartość −1,4%</td><td class='num'>VM −14 000 EUR (fundusz dopłaca)</td></tr>" +
                "</tbody></table></div>" +
                "<p>VM to nie „depozyt” w sensie zabezpieczenia, tylko rzeczywiste rozliczenie zysku lub straty. Brak gotówki na dopłatę VM to jedno z głównych ryzyk płynności funduszy (zob. kryzys funduszy LDI w <a href='#/learn/history'>lekcjach z historii</a>).</p>" },
        { id: "segregation", title: "Segregacja rachunków",
          html: "<ul>" +
                "<li><strong>Rachunek zbiorczy (omnibus)</strong> — depozyty wielu klientów brokera razem; tańszy, ale w razie upadku brokera zwrot może być trudniejszy.</li>" +
                "<li><strong>Rachunek indywidualny (individual segregation)</strong> — depozyty funduszu wydzielone; łatwiej je przenieść do innego brokera (<em>porting</em>).</li>" +
                "</ul>" +
                "<p>Wybór rodzaju rachunku wpływa na ocenę ryzyka kontrahenta wobec clearing brokera.</p>" },
        { id: "emir", title: "EMIR i UCITS",
          html: "<ul>" +
                "<li><strong>Obowiązek rozliczania (art. 4 EMIR)</strong> — wybrane klasy derywatów OTC (m.in. IRS, OIS, FRA w głównych walutach i w PLN, indeksy CDS iTraxx) muszą być rozliczane przez CCP, jeśli obie strony przekraczają progi.</li>" +
                "<li><strong>Derywaty nierozliczane centralnie</strong> — obowiązek wymiany VM i (powyżej progu) IM między stronami.</li>" +
                "<li><strong>UCITS po EMIR 3</strong> — limity kontrahenta (5% / 10% NAV) dotyczą tylko derywatów nierozliczanych przez CCP autoryzowaną lub uznaną wg EMIR. Rozliczenie przez CCP zdejmuje transakcję z tego limitu.</li>" +
                "</ul>" }
      ],
      glossary: [
        ["CCP (Central Counterparty)", "Izba rozliczeniowa stająca się stroną transakcji dla obu uczestników."],
        ["Novation", "Zastąpienie umowy między stronami dwiema umowami z CCP."],
        ["Clearing member", "Członek rozliczający — bank mający bezpośredni dostęp do CCP."],
        ["Default waterfall", "Kolejność pokrywania strat CCP po niewypłacalności członka."],
        ["Porting", "Przeniesienie pozycji i depozytów klienta do innego członka rozliczającego."]
      ]
    },
    en: {
      summary: "A central counterparty (CCP) steps between the parties to a trade: it becomes the buyer to every seller and the seller to every buyer. Participants then need not worry about the other side defaulting — the CCP takes on the risk, protected by margin and a default fund. Exchange-traded contracts are always CCP-cleared, and some OTC derivatives must be cleared under EMIR.",
      keyFacts: [
        ["Novation", "One A–B contract becomes two: A–CCP and CCP–B."],
        ["Initial margin (IM)", "Covers the potential loss over several days in case of default."],
        ["Variation margin (VM)", "Daily settlement of the change in position value."],
        ["Example CCPs", "Eurex Clearing, LCH, ICE Clear, CME Clearing, KDPW_CCP."]
      ],
      sections: [
        { id: "how", title: "How a CCP works",
          html: "<ol class='steps'>" +
                "<li><strong>Novation.</strong> Once a trade is executed, the CCP becomes the counterparty to both sides.</li>" +
                "<li><strong>Clearing members.</strong> Only members (usually large banks) access the CCP directly. A fund uses an intermediary — a <em>clearing broker</em>.</li>" +
                "<li><strong>Margin.</strong> The CCP collects IM on opening and VM daily (or more often).</li>" +
                "<li><strong>Netting.</strong> Opposite positions of the same member offset — less margin and fewer payments.</li>" +
                "<li><strong>Member default.</strong> The CCP closes out or ports the positions and covers losses via the <em>default waterfall</em>: the defaulter's margin → its default fund contribution → CCP capital → other members' contributions.</li>" +
                "</ol>" },
        { id: "margin", title: "IM and VM by example",
          html: "<p>A fund buys contracts worth EUR 1m; the CCP requires 8% IM.</p>" +
                "<div class='table-scroll'><table class='calc'><tbody>" +
                "<tr><td>Initial margin (IM)</td><td class='num'>EUR 80,000 — returned on close</td></tr>" +
                "<tr><td>Day 1: value +1%</td><td class='num'>VM +EUR 10,000 (fund receives)</td></tr>" +
                "<tr><td>Day 2: value −1.4%</td><td class='num'>VM −EUR 14,000 (fund pays)</td></tr>" +
                "</tbody></table></div>" +
                "<p>VM is not \"collateral\" in the protective sense — it is actual settlement of profit or loss. Lacking cash to pay VM is one of the main liquidity risks for funds (see the LDI crisis in the <a href='#/learn/history'>history lessons</a>).</p>" },
        { id: "segregation", title: "Account segregation",
          html: "<ul>" +
                "<li><strong>Omnibus account</strong> — margin of many of the broker's clients together; cheaper, but recovery may be harder if the broker fails.</li>" +
                "<li><strong>Individual segregation</strong> — the fund's margin is ring-fenced; easier to move to another broker (<em>porting</em>).</li>" +
                "</ul>" +
                "<p>The account type affects the assessment of counterparty risk to the clearing broker.</p>" },
        { id: "emir", title: "EMIR and UCITS",
          html: "<ul>" +
                "<li><strong>Clearing obligation (Art. 4 EMIR)</strong> — certain OTC derivative classes (including IRS, OIS, FRAs in major currencies and PLN, iTraxx CDS indices) must be CCP-cleared if both parties exceed the thresholds.</li>" +
                "<li><strong>Non-centrally cleared derivatives</strong> — mandatory exchange of VM and (above the threshold) IM between the parties.</li>" +
                "<li><strong>UCITS after EMIR 3</strong> — counterparty limits (5% / 10% of NAV) apply only to derivatives not cleared through a CCP authorised or recognised under EMIR. CCP clearing takes the trade out of that limit.</li>" +
                "</ul>" }
      ],
      glossary: [
        ["CCP (Central Counterparty)", "A clearing house that becomes the counterparty to both sides of a trade."],
        ["Novation", "Replacing a contract between parties with two contracts with the CCP."],
        ["Clearing member", "A bank with direct access to the CCP."],
        ["Default waterfall", "The order in which a CCP's losses are covered after a member defaults."],
        ["Porting", "Moving a client's positions and margin to another clearing member."]
      ]
    }
  }
});

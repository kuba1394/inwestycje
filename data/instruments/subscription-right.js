window.INSTRUMENTS.push({
  id: "subscription-right",
  name: "Subscription Right",
  aliases: ["Rights", "Rights Issue", "Pre-emptive Right", "Nil-paid Rights", "Prawo poboru", "PP", "PDA"],
  market: "exchange",
  asset: { pl: "Akcje", en: "Equity" },
  sources: ["ucits", "eligible", "td", "csdr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Prawo poboru daje dotychczasowemu akcjonariuszowi pierwszeństwo objęcia nowych akcji w emisji po cenie emisyjnej, zwykle niższej niż kurs rynkowy. Fundusz dostaje prawa automatycznie, bez transakcji, i musi zdecydować: wykonać je, sprzedać na giełdzie albo pozwolić im wygasnąć. Niewykonane prawa tracą wartość.",
      keyFacts: [
        ["Źródło", "Zdarzenie korporacyjne — emisja akcji z prawem poboru (rights issue)."],
        ["Cena emisyjna", "Zwykle z dyskontem do kursu."],
        ["Obrót", "Prawa zbywalne (renounceable) notowane przez kilka dni; niezbywalne — tylko wykonanie."],
        ["Termin", "Okres subskrypcji; po nim prawa wygasają."],
        ["W UCITS", "Zbywalny papier wartościowy (prawo do nabycia papierów); art. 57 ust. 1 — przekroczenia przy wykonaniu."],
        ["Kod CFI", "<code>R</code> — Entitlements (rights), np. <code>RS</code> (subscription rights)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Subscription Right</em> (prawo poboru) to prawo do objęcia określonej liczby nowych akcji po cenie emisyjnej. Zwykle za każdą posiadaną akcję przysługuje jedno prawo, a określona liczba praw uprawnia do jednej nowej akcji.</p>
<p class='formula'>TERP = (N × kurs przed odcięciem + n × cena emisyjna) / (N + n)</p>
<p>TERP (theoretical ex-rights price) to teoretyczny kurs po odcięciu prawa. Wartość jednego prawa ≈ (TERP − cena emisyjna) / liczba praw na jedną nową akcję.</p>
<p>W Polsce rozróżnia się <strong>PP</strong> (prawo poboru, notowane w okresie obrotu) i <strong>PDA</strong> (prawo do akcji — po złożeniu zapisu, do czasu rejestracji nowych akcji).</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Ogłoszenie</strong> emisji: proporcja, cena emisyjna, harmonogram.</li>
<li><strong>Dzień ex.</strong> Akcje notowane bez prawa; prawa pojawiają się na rachunku funduszu (record date).</li>
<li><strong>Obrót prawami</strong> przez kilka dni (dla praw zbywalnych).</li>
<li><strong>Zapisy.</strong> Wykonanie praw z zapłatą ceny emisyjnej.</li>
<li><strong>Wygaśnięcie</strong> niewykonanych praw (czasem sprzedawane przez emitenta w rump placement).</li>
<li><strong>Przydział i rejestracja</strong> nowych akcji.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Emisja 1 nowa akcja za 4 posiadane, cena emisyjna 8 zł, kurs przed dniem ex 12 zł.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>TERP</td><td>(4 × 12 + 1 × 8) / 5</td><td class='num'>11,20 zł</td></tr>
<tr><td>Wartość jednego prawa</td><td>(11,20 − 8) / 4</td><td class='num'>0,80 zł</td></tr>
<tr><td>Kontrola: kurs przed − TERP</td><td>12 − 11,20</td><td class='num'>0,80 zł</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Fundusz z 9,6% NAV w spółce po wykonaniu praw (i dopłacie gotówki) może przekroczyć 10%. Art. 57 ust. 1 UCITS pozwala nie przestrzegać limitów przy wykonywaniu praw poboru, ale przekroczenie trzeba usunąć priorytetowo, z uwzględnieniem interesu uczestników.</li>
<li>Przeoczony termin zapisów oznacza utratę wartości praw — monitoruj zdarzenia korporacyjne.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> kurs giełdowy praw; bez notowań — wartość teoretyczna z TERP.</p>
<ul>
<li><strong>Ryzyko kursu akcji</strong> z dźwignią — prawo zachowuje się jak krótkoterminowa opcja call.</li>
<li><strong>Ryzyko operacyjne</strong> — przeoczenie terminu, błędna instrukcja do custodiana.</li>
<li><strong>Ryzyko płynności</strong> — krótki okres obrotu.</li>
<li><strong>Ryzyko rozwodnienia</strong> przy niewykonaniu praw.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Ogłoszenie, dzień ex, zapis praw na rachunku.</li>
<li>Decyzja: wykonanie, sprzedaż, wygaśnięcie — instrukcja do custodiana przed jego terminem (wcześniejszym niż termin emitenta).</li>
<li>Zapłata ceny emisyjnej, przydział, rejestracja akcji.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 2 ust. 1 lit. n UCITS</span></h4><p>Zbywalne papiery wartościowe obejmują papiery uprawniające do nabycia innych papierów w drodze zapisu lub wymiany.</p></div>
<div class='rule'><h4>Wykonanie praw <span class='law'>art. 57 ust. 1</span></h4><p>UCITS nie musi przestrzegać limitów z rozdziału VII przy wykonywaniu praw poboru związanych z posiadanymi papierami; przekroczenie usuwa się priorytetowo.</p></div>
<div class='rule'><h4>Ekspozycja</h4><p>Prawo działa jak krótkoterminowy warrant — w praktyce często ujmowane w global exposure z deltą; sprawdź politykę funduszu.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limity według statutu; zasady wykonywania praw — w polityce zdarzeń korporacyjnych ZAFI.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>Znaczne pakiety</strong> — po rejestracji nowych akcji zmienia się liczba głosów; prawa do nabycia akcji mogą być instrumentem finansowym z art. 13 dyrektywy o przejrzystości — sprawdź praktykę.</li>
<li>CSDR — nieudany rozrachunek praw lub nowych akcji podlega karom.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>Osobny <strong>ISIN</strong> praw (i PDA), powiązany z ISIN akcji.</li>
<li><strong>CFI</strong> <code>RS…</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Prawa zaksięgowane po dniu ex i wycenione.</li>
<li>Decyzja i instrukcja przed terminem custodiana.</li>
<li>Limity emitenta po wykonaniu — art. 57 ust. 1 i plan usunięcia przekroczenia.</li>
<li>Gotówka na zapłatę ceny emisyjnej.</li>
</ul>`
        }
      ],
      glossary: [
        ["TERP", "Teoretyczny kurs akcji po odcięciu prawa poboru."],
        ["Renounceable", "Prawa zbywalne — można je sprzedać na rynku."],
        ["Rump placement", "Sprzedaż przez emitenta akcji z niewykonanych praw."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A subscription right gives an existing shareholder priority to subscribe for new shares in an issue at a subscription price, usually below the market price. The fund receives the rights automatically, without a trade, and has to decide: exercise them, sell them on the exchange or let them lapse. Unexercised rights lose their value.",
      keyFacts: [
        ["Source", "A corporate action — a rights issue."],
        ["Subscription price", "Usually at a discount to the market price."],
        ["Trading", "Renounceable rights trade for a few days; non-renounceable — exercise only."],
        ["Deadline", "Subscription period; afterwards the rights lapse."],
        ["In a UCITS", "A transferable security (a right to acquire securities); Art. 57(1) — breaches on exercise."],
        ["CFI code", "<code>R</code> — Entitlements (rights), e.g. <code>RS</code> (subscription rights)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Subscription Right</em> is the right to subscribe for a set number of new shares at the subscription price. Usually each share held gives one right, and a set number of rights entitles the holder to one new share.</p>
<p class='formula'>TERP = (N × cum-rights price + n × subscription price) / (N + n)</p>
<p>TERP (theoretical ex-rights price) is the theoretical price after the rights are detached. Value of one right ≈ (TERP − subscription price) / number of rights per new share.</p>
<p>In Poland there are <strong>PP</strong> (prawo poboru — the right, traded during the trading period) and <strong>PDA</strong> (prawo do akcji — after subscription, until the new shares are registered).</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Announcement</strong> of the issue: ratio, subscription price, timetable.</li>
<li><strong>Ex-date.</strong> Shares trade without the right; the rights appear in the fund's account (record date).</li>
<li><strong>Rights trading</strong> for a few days (renounceable rights).</li>
<li><strong>Subscription.</strong> Exercise of the rights with payment of the subscription price.</li>
<li><strong>Lapse</strong> of unexercised rights (sometimes sold by the issuer in a rump placement).</li>
<li><strong>Allotment and registration</strong> of the new shares.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>An issue of 1 new share for every 4 held, subscription price PLN 8, price before the ex-date PLN 12.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>TERP</td><td>(4 × 12 + 1 × 8) / 5</td><td class='num'>PLN 11.20</td></tr>
<tr><td>Value of one right</td><td>(11.20 − 8) / 4</td><td class='num'>PLN 0.80</td></tr>
<tr><td>Check: cum price − TERP</td><td>12 − 11.20</td><td class='num'>PLN 0.80</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>A fund with 9.6% of NAV in the company may exceed 10% after exercising (and paying in cash). UCITS Art. 57(1) allows the limits to be disregarded when exercising subscription rights, but the breach must be remedied as a priority, taking account of investors' interests.</li>
<li>A missed subscription deadline means the rights' value is lost — monitor corporate actions.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> exchange price of the rights; without a quote — theoretical value from TERP.</p>
<ul>
<li><strong>Share price risk</strong> with leverage — a right behaves like a short-dated call option.</li>
<li><strong>Operational risk</strong> — missed deadline, wrong instruction to the custodian.</li>
<li><strong>Liquidity risk</strong> — a short trading period.</li>
<li><strong>Dilution risk</strong> if the rights are not exercised.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Announcement, ex-date, rights credited to the account.</li>
<li>Decision: exercise, sell, lapse — instruction to the custodian before its deadline (earlier than the issuer's).</li>
<li>Payment of the subscription price, allotment, registration of shares.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>UCITS Art. 2(1)(n)</span></h4><p>Transferable securities include securities giving the right to acquire other securities by subscription or exchange.</p></div>
<div class='rule'><h4>Exercising rights <span class='law'>Art. 57(1)</span></h4><p>A UCITS need not comply with the Chapter VII limits when exercising subscription rights attaching to securities it holds; the breach is remedied as a priority.</p></div>
<div class='rule'><h4>Exposure</h4><p>A right works like a short-dated warrant — in practice often included in global exposure with its delta; check the fund's policy.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limits per the fund rules; how rights are exercised — in the AIFM's corporate actions policy.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li><strong>Major holdings</strong> — after the new shares are registered the number of votes changes; rights to acquire shares may be a financial instrument under Art. 13 of the Transparency Directive — check practice.</li>
<li>CSDR — failed settlement of rights or new shares is subject to penalties.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>A separate <strong>ISIN</strong> for the rights (and PDA), linked to the share ISIN.</li>
<li><strong>CFI</strong> <code>RS…</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Rights booked after the ex-date and valued.</li>
<li>Decision and instruction before the custodian's deadline.</li>
<li>Issuer limits after exercise — Art. 57(1) and a remediation plan.</li>
<li>Cash to pay the subscription price.</li>
</ul>`
        }
      ],
      glossary: [
        ["TERP", "Theoretical share price after the rights are detached."],
        ["Renounceable", "Transferable rights — they can be sold in the market."],
        ["Rump placement", "The issuer's sale of shares from unexercised rights."]
      ]
    }
  }
});

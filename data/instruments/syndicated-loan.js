window.INSTRUMENTS.push({
  id: "syndicated-loan",
  name: "Syndicated Loan",
  aliases: ["Bank Loan", "Leveraged Loan", "Term Loan B", "Loan Assignment", "Loan Participation", "Private Credit", "Direct Lending", "kredyt konsorcjalny"],
  market: "otc",
  asset: { pl: "Kredyty i rynki prywatne", en: "Loans and private markets" },
  sources: ["aifmd", "aifmd2", "ucits", "eligible"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Kredyt udzielony spółce przez grupę kredytodawców (konsorcjum) na podstawie jednej umowy. Fundusze kupują udziały w takich kredytach na rynku wtórnym (przez cesję lub subpartycypację) albo — jako fundusze private credit — same udzielają pożyczek. To nie są papiery wartościowe: nie mają ISIN, a rozliczenie trwa dni lub tygodnie.",
      keyFacts: [
        ["Strony", "Kredytobiorca, arranger, agent kredytu, kredytodawcy."],
        ["Oprocentowanie", "Zwykle zmienne: SOFR/EURIBOR + marża, często z floorem."],
        ["Zabezpieczenie", "Kredyty lewarowane — zwykle zabezpieczone (senior secured)."],
        ["Przeniesienie", "Cesja (assignment — fundusz staje się kredytodawcą) lub subpartycypacja (participation — ryzyko też na banku sprzedającym)."],
        ["Dokumentacja", "LMA (Europa), LSTA (USA)."],
        ["Identyfikacja", "Brak ISIN; identyfikatory rynkowe (np. LoanX ID, LIN), CUSIP dla części kredytów w USA."]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Syndicated Loan</em> to kredyt, w którym kilku kredytodawców finansuje jednego kredytobiorcę na wspólnych warunkach. Rodzaje: kredyt odnawialny (revolver), kredyt terminowy amortyzowany (Term Loan A) i spłacany na końcu (Term Loan B — typowy dla funduszy).</p>
<p>W aplikacjach funduszy pojawiają się różne formy tej samej ekspozycji:</p>
<ul>
<li><strong>Loan / Bank Loan / Loan Contract / Loan Deal</strong> — pozycja w kredycie lub umowa kredytowa.</li>
<li><strong>Loan Assignment</strong> — nabycie udziału przez cesję; fundusz ma bezpośrednie roszczenie wobec kredytobiorcy.</li>
<li><strong>Loan Participation</strong> — subpartycypacja: bank pozostaje kredytodawcą, a fundusz ma roszczenie wobec banku.</li>
<li><strong>Private Credit</strong> — pożyczki udzielane bezpośrednio przez fundusz (direct lending), objęte AIFMD II.</li>
</ul>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Udzielenie</strong> — arranger organizuje konsorcjum, agent prowadzi obsługę.</li>
<li><strong>Transakcja na rynku wtórnym</strong> — uzgodnienie ceny (np. 98,50 za 100), potwierdzenie na formularzu LMA/LSTA.</li>
<li><strong>Zgody</strong> agenta i często kredytobiorcy na cesję.</li>
<li><strong>Rozrachunek</strong> przez agenta lub platformę — zwykle od kilku dni do kilku tygodni; przy opóźnieniu płaci się rekompensatę (delayed compensation).</li>
<li><strong>Odsetki</strong> w okresach 1–6 miesięcy, zmiana stopy przy każdym okresie.</li>
<li><strong>Spłata</strong> — w terminie lub wcześniej (kredyty zwykle można spłacić bez kary).</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Fundusz kupuje 5 mln EUR nominału Term Loan B po 98,50; oprocentowanie EURIBOR + 4,00% z floorem 0%; EURIBOR = 2,00%.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Cena zakupu</td><td>5 000 000 × 98,50%</td><td class='num'>4 925 000 EUR</td></tr>
<tr><td>Oprocentowanie</td><td>max(2,00%; 0%) + 4,00%</td><td class='num'>6,00%</td></tr>
<tr><td>Odsetki za kwartał (90 dni, ACT/360)</td><td>5 000 000 × 6% × 90 / 360</td><td class='num'>75 000 EUR</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Do czasu rozrachunku pozycja jest zobowiązaniem (trade pending) — w kontrolach płynności i limitów uwzględnia się transakcje zawarte, ale nierozliczone.</li>
<li>Przy subpartycypacji fundusz ma dwie ekspozycje kredytowe: na kredytobiorcę i na bank.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> kwotowania dealerów (serwisy wyceny kredytów) albo model; dla private credit — wycena okresowa przez niezależnego wyceniającego.</p>
<ul>
<li><strong>Ryzyko kredytowe</strong> kredytobiorcy (często lewarowanego).</li>
<li><strong>Ryzyko płynności i rozrachunku</strong> — długi rozrachunek, niedopasowanie do umorzeń funduszu.</li>
<li><strong>Ryzyko prawne</strong> — kowenanty, zgody, pierwszeństwo zabezpieczeń.</li>
<li><strong>Ryzyko pośrednika</strong> — przy subpartycypacji.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zakup, zgody, rozrachunek przez agenta.</li>
<li>Okresowe ustalenie stopy i odsetki; częściowe spłaty.</li>
<li>Zmiany umowy (amend & extend), głosowania kredytodawców, restrukturyzacja.</li>
<li>Spłata lub windykacja zabezpieczeń.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50</span></h4><p>Udział w kredycie nie jest zbywalnym papierem wartościowym ani instrumentem rynku pieniężnego — co do zasady niedopuszczalny w UCITS, także w limicie 10%. Ekspozycja na kredyty jest możliwa przez notowane papiery (np. CLO, fundusze zamknięte) lub fundusze spełniające art. 50 ust. 1 lit. e.</p></div>
<div class='rule'><h4>Zakaz udzielania pożyczek <span class='law'>art. 88</span></h4><p>UCITS nie może udzielać pożyczek.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li><strong>AIFMD II</strong> (stosowanie od 16.04.2026) — dla pożyczek udzielanych przez AIF: polityka i procedury, limit 20% kapitału na jednego kredytobiorcę będącego instytucją finansową, AIF lub UCITS, zatrzymanie 5% przy zbyciu pożyczki, limity dźwigni 175%/300% dla AIF udzielających pożyczek, zakaz pożyczek dla podmiotów powiązanych z ZAFI.</li>
<li>Nabycie kredytu na rynku wtórnym — oceń, czy wchodzi w zakres przepisów o udzielaniu pożyczek (zgodnie z wytycznymi nadzorcy).</li>
<li>Depozytariusz prowadzi rejestr (art. 21 ust. 8 lit. b AIFMD); wycena — art. 19.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>Brak EMIR i SFTR.</li>
<li>Annex IV — ekspozycje kredytowe; AIFMD II rozszerza raportowanie pożyczek.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>Brak ISIN; LEI kredytobiorcy, identyfikatory rynkowe (LoanX ID), wewnętrzny identyfikator transzy kredytu.</li>
<li>W danych: forma nabycia (cesja/subpartycypacja), agent, stopa, marża, floor, termin.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Typ funduszu: UCITS — brak dopuszczalności; AIF — zgodność ze statutem i AIFMD II.</li>
<li>Limit koncentracji na kredytobiorcę.</li>
<li>Transakcje nierozliczone w płynności.</li>
<li>Ekspozycja na pośrednika przy subpartycypacji.</li>
<li>Wycena niezależna.</li>
</ul>`
        }
      ],
      glossary: [
        ["Assignment", "Cesja — przeniesienie praw i obowiązków kredytodawcy na nabywcę."],
        ["Participation", "Subpartycypacja — przeniesienie ekonomicznego ryzyka bez zmiany kredytodawcy."],
        ["Delayed compensation", "Rekompensata dla kupującego za opóźniony rozrachunek kredytu."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A loan made to a company by a group of lenders (a syndicate) under one agreement. Funds buy shares of such loans in the secondary market (by assignment or participation) or — as private credit funds — lend directly. These are not securities: they have no ISIN, and settlement takes days or weeks.",
      keyFacts: [
        ["Parties", "Borrower, arranger, facility agent, lenders."],
        ["Interest", "Usually floating: SOFR/EURIBOR + margin, often with a floor."],
        ["Security", "Leveraged loans — usually secured (senior secured)."],
        ["Transfer", "Assignment (the fund becomes a lender) or participation (risk also on the selling bank)."],
        ["Documentation", "LMA (Europe), LSTA (US)."],
        ["Identification", "No ISIN; market identifiers (e.g. LoanX ID, LIN), CUSIP for some US loans."]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Syndicated Loan</em> is a loan in which several lenders fund one borrower on common terms. Types: revolving facility (revolver), amortising term loan (Term Loan A) and bullet term loan (Term Loan B — typical for funds).</p>
<p>Fund applications show different forms of the same exposure:</p>
<ul>
<li><strong>Loan / Bank Loan / Loan Contract / Loan Deal</strong> — a position in a loan or a loan agreement.</li>
<li><strong>Loan Assignment</strong> — a share acquired by assignment; the fund has a direct claim on the borrower.</li>
<li><strong>Loan Participation</strong> — the bank remains the lender, and the fund's claim is on the bank.</li>
<li><strong>Private Credit</strong> — loans made directly by the fund (direct lending), covered by AIFMD II.</li>
</ul>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Origination</strong> — the arranger forms the syndicate, the agent services the loan.</li>
<li><strong>Secondary trade</strong> — price agreed (e.g. 98.50 per 100), confirmed on LMA/LSTA forms.</li>
<li><strong>Consents</strong> of the agent and often the borrower to the assignment.</li>
<li><strong>Settlement</strong> via the agent or a platform — usually from a few days to a few weeks; delays trigger delayed compensation.</li>
<li><strong>Interest</strong> for 1–6 month periods, rate reset each period.</li>
<li><strong>Repayment</strong> — at maturity or earlier (loans can usually be prepaid without penalty).</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A fund buys EUR 5m nominal of a Term Loan B at 98.50; interest EURIBOR + 4.00% with a 0% floor; EURIBOR = 2.00%.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Purchase price</td><td>5,000,000 × 98.50%</td><td class='num'>EUR 4,925,000</td></tr>
<tr><td>Interest rate</td><td>max(2.00%; 0%) + 4.00%</td><td class='num'>6.00%</td></tr>
<tr><td>Quarterly interest (90 days, ACT/360)</td><td>5,000,000 × 6% × 90 / 360</td><td class='num'>EUR 75,000</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>Until settlement the position is a commitment (trade pending) — liquidity and limit checks include trades executed but not settled.</li>
<li>Under a participation the fund has two credit exposures: to the borrower and to the bank.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> dealer quotes (loan pricing services) or a model; for private credit — periodic valuation by an independent valuer.</p>
<ul>
<li><strong>Credit risk</strong> of the (often leveraged) borrower.</li>
<li><strong>Liquidity and settlement risk</strong> — long settlement, mismatch with fund redemptions.</li>
<li><strong>Legal risk</strong> — covenants, consents, ranking of security.</li>
<li><strong>Intermediary risk</strong> — under participations.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Purchase, consents, settlement via the agent.</li>
<li>Periodic rate fixing and interest; partial repayments.</li>
<li>Amendments (amend & extend), lender votes, restructuring.</li>
<li>Repayment or enforcement of security.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50</span></h4><p>A loan participation is neither a transferable security nor a money market instrument — in principle not eligible for a UCITS, not even in the 10% bucket. Loan exposure is possible via listed securities (e.g. CLOs, closed-end funds) or funds meeting Art. 50(1)(e).</p></div>
<div class='rule'><h4>Ban on lending <span class='law'>Art. 88</span></h4><p>A UCITS may not grant loans.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li><strong>AIFMD II</strong> (applies from 16.04.2026) — for loans originated by an AIF: policies and procedures, 20% of capital per borrower that is a financial undertaking, AIF or UCITS, 5% retention when a loan is sold, 175%/300% leverage limits for loan-originating AIFs, ban on loans to entities related to the AIFM.</li>
<li>Buying a loan in the secondary market — assess whether the loan-origination rules apply (per supervisory guidance).</li>
<li>The depositary keeps a record (AIFMD Art. 21(8)(b)); valuation — Art. 19.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>No EMIR or SFTR.</li>
<li>Annex IV — credit exposures; AIFMD II extends loan reporting.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>No ISIN; borrower LEI, market identifiers (LoanX ID), internal facility identifier.</li>
<li>In data: form of acquisition (assignment/participation), agent, rate, margin, floor, maturity.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Fund type: UCITS — not eligible; AIF — compliance with its rules and AIFMD II.</li>
<li>Borrower concentration limit.</li>
<li>Unsettled trades in liquidity.</li>
<li>Intermediary exposure under participations.</li>
<li>Independent valuation.</li>
</ul>`
        }
      ],
      glossary: [
        ["Assignment", "Transfer of the lender's rights and obligations to the buyer."],
        ["Participation", "Transfer of economic risk without changing the lender of record."],
        ["Delayed compensation", "Compensation to the buyer for late settlement of a loan trade."]
      ]
    }
  }
});

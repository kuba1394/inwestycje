window.INSTRUMENTS.push({
  id: "bank-deposit",
  name: "Bank Deposit",
  aliases: ["Time Deposit", "Term Deposit", "Call Deposit", "Non-maturing Deposit", "Cash at Bank", "lokata", "depozyt bankowy"],
  market: "otc",
  asset: { pl: "Rynek pieniężny i depozyty", en: "Money market and deposits" },
  sources: ["ucits", "mmfr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Środki funduszu złożone w banku: na rachunku bieżącym (depozyt bez terminu, płatny na żądanie) albo jako lokata terminowa. Depozyt nie jest papierem wartościowym — nie można go sprzedać, tylko wycofać w banku. W UCITS ma własny limit: maks. 20% NAV w jednym banku.",
      keyFacts: [
        ["Rodzaje", "Lokata terminowa (time deposit), depozyt na żądanie (call), rachunek bieżący (non-maturing deposit)."],
        ["Oprocentowanie", "Stałe na okres lokaty lub zmienne (rachunki)."],
        ["Wycofanie", "Na żądanie lub w terminie; wcześniejsze — często z utratą odsetek."],
        ["W UCITS", "Art. 50 ust. 1 lit. f — termin maks. 12 miesięcy, możliwość wycofania."],
        ["Gwarancje", "Systemy gwarantowania depozytów nie obejmują funduszy inwestycyjnych."],
        ["Identyfikacja", "Brak ISIN — numer umowy/lokaty w systemie."]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Bank Deposit</em> to wierzytelność funduszu wobec banku. Fundusz jest niezabezpieczonym wierzycielem banku — przy upadłości banku może odzyskać tylko część środków, bo dyrektywa o systemach gwarancji depozytów wyłącza z ochrony instytucje finansowe i przedsiębiorstwa zbiorowego inwestowania.</p>
<p>Odróżnij depozyt od <a href='#/i/certificate-of-deposit'>certyfikatu depozytowego</a> (zbywalny instrument rynku pieniężnego) — inaczej liczy się limity.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Złożenie lokaty</strong> — uzgodnienie kwoty, terminu i stopy z bankiem (telefonicznie lub przez platformę).</li>
<li><strong>Naliczanie odsetek</strong> (ACT/360 w EUR, ACT/365 w PLN).</li>
<li><strong>Zwrot</strong> kapitału z odsetkami w terminie albo odnowienie (rollover).</li>
<li><strong>Rachunek bieżący</strong> — saldo zmienia się codziennie z rozrachunkami transakcji.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>UCITS (NAV 50 mln PLN) ma lokatę 9 mln PLN w banku B (3,20%, 91 dni) i 2 mln PLN na rachunku bieżącym w tym samym banku.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Odsetki z lokaty</td><td>9 000 000 × 3,20% × 91 / 365</td><td class='num'>71 802 PLN</td></tr>
<tr><td>Depozyty w banku B</td><td>(9 + 2) / 50</td><td class='num'>22% &gt; 20%</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Limit 20% obejmuje wszystkie depozyty w banku, w praktyce także saldo rachunku bieżącego.</li>
<li>Ten sam bank jest też często depozytariuszem i kontrahentem derywatów — sprawdź limit łączny 20% z art. 52 ust. 2.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> nominał plus narosłe odsetki.</p>
<ul>
<li><strong>Ryzyko kredytowe banku</strong> (brak gwarancji dla funduszu).</li>
<li><strong>Ryzyko płynności</strong> — lokata terminowa bez prawa wcześniejszego wycofania nie spełnia warunków UCITS.</li>
<li><strong>Ryzyko koncentracji</strong> na banku depozytariuszu.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Złożenie, potwierdzenie banku.</li>
<li>Naliczanie odsetek.</li>
<li>Zwrot, odnowienie lub wcześniejsze zerwanie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. f</span></h4><p>Depozyt płatny na żądanie lub z prawem wycofania, termin maks. 12 miesięcy, w instytucji kredytowej z UE lub podlegającej równoważnym zasadom ostrożnościowym.</p></div>
<div class='rule'><h4>Limity <span class='law'>art. 52 ust. 1–2</span></h4><p>Maks. 20% NAV depozytów w jednym banku; łącznie z papierami banku i ekspozycją OTC maks. 20%.</p></div>
<div class='rule'><h4>Płynne aktywa pomocnicze <span class='law'>art. 50 ust. 2</span></h4><p>Rachunki bieżące na potrzeby bieżących płatności — według ESMA w normalnych warunkach do 20% NAV.</p></div>
<div class='rule'><h4>MMF <span class='law'>MMFR art. 12, 17</span></h4><p>W MMF maks. 10% aktywów w depozytach w jednym banku.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limity według statutu; depozytariusz monitoruje przepływy pieniężne (art. 21 ust. 7 AIFMD).</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>Brak EMIR i SFTR.</li>
<li>W sprawozdaniu — gotówka i depozyty według banków.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>Brak ISIN; LEI banku, numer lokaty, waluta, termin.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Bank dopuszczalny, termin ≤ 12 miesięcy, prawo wycofania.</li>
<li>Limit 20% depozytów w banku (z rachunkiem bieżącym).</li>
<li>Limit łączny 20% wobec banku.</li>
<li>Lokata vs CD — poprawna klasyfikacja.</li>
</ul>`
        }
      ],
      glossary: [
        ["Time deposit", "Lokata na określony termin ze stałą stopą."],
        ["Call deposit", "Depozyt wypłacany na żądanie, zwykle z krótkim okresem wypowiedzenia."],
        ["Ancillary liquid assets", "Płynne aktywa pomocnicze — gotówka na bieżące płatności funduszu."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "Fund money placed with a bank: on a current account (a non-maturing deposit, repayable on demand) or as a time deposit. A deposit is not a security — it cannot be sold, only withdrawn from the bank. In a UCITS it has its own limit: max 20% of NAV with one bank.",
      keyFacts: [
        ["Types", "Time deposit, call deposit, current account (non-maturing deposit)."],
        ["Interest", "Fixed for the deposit term or variable (accounts)."],
        ["Withdrawal", "On demand or at maturity; early — often with loss of interest."],
        ["In a UCITS", "Art. 50(1)(f) — max 12 months, right to withdraw."],
        ["Guarantees", "Deposit guarantee schemes do not cover investment funds."],
        ["Identification", "No ISIN — deposit/contract number in the system."]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Bank Deposit</em> is the fund's claim on a bank. The fund is an unsecured creditor of the bank — if the bank fails it may recover only part of the money, because the deposit guarantee schemes directive excludes financial institutions and collective investment undertakings from protection.</p>
<p>Distinguish a deposit from a <a href='#/i/certificate-of-deposit'>certificate of deposit</a> (a negotiable money market instrument) — the limits are calculated differently.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Placing a deposit</strong> — agree amount, term and rate with the bank (by phone or via a platform).</li>
<li><strong>Interest accrual</strong> (ACT/360 in EUR, ACT/365 in PLN).</li>
<li><strong>Repayment</strong> of principal with interest at maturity, or rollover.</li>
<li><strong>Current account</strong> — the balance changes daily with trade settlements.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A UCITS (NAV PLN 50m) has a PLN 9m deposit with bank B (3.20%, 91 days) and PLN 2m on a current account at the same bank.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Deposit interest</td><td>9,000,000 × 3.20% × 91 / 365</td><td class='num'>PLN 71,802</td></tr>
<tr><td>Deposits with bank B</td><td>(9 + 2) / 50</td><td class='num'>22% &gt; 20%</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>The 20% limit covers all deposits with the bank, in practice also the current account balance.</li>
<li>The same bank is often also the depositary and a derivative counterparty — check the 20% combined limit in Art. 52(2).</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> nominal plus accrued interest.</p>
<ul>
<li><strong>Bank credit risk</strong> (no guarantee for the fund).</li>
<li><strong>Liquidity risk</strong> — a time deposit without an early withdrawal right does not meet UCITS conditions.</li>
<li><strong>Concentration risk</strong> on the depositary bank.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Placement, bank confirmation.</li>
<li>Interest accrual.</li>
<li>Repayment, rollover or early break.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(f)</span></h4><p>A deposit repayable on demand or with a right to withdraw, maturing in max 12 months, with an EU credit institution or one subject to equivalent prudential rules.</p></div>
<div class='rule'><h4>Limits <span class='law'>Art. 52(1)–(2)</span></h4><p>Max 20% of NAV in deposits with one bank; combined with the bank's securities and OTC exposure max 20%.</p></div>
<div class='rule'><h4>Ancillary liquid assets <span class='law'>Art. 50(2)</span></h4><p>Current accounts for day-to-day payments — per ESMA up to 20% of NAV in normal conditions.</p></div>
<div class='rule'><h4>MMFs <span class='law'>MMFR Art. 12, 17</span></h4><p>In an MMF max 10% of assets in deposits with one bank.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limits per the fund rules; the depositary monitors cash flows (AIFMD Art. 21(7)).</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>No EMIR or SFTR.</li>
<li>In the annual report — cash and deposits by bank.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>No ISIN; bank LEI, deposit number, currency, maturity.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Eligible bank, term ≤ 12 months, right to withdraw.</li>
<li>20% deposit limit per bank (including the current account).</li>
<li>20% combined limit on the bank.</li>
<li>Deposit vs CD — correct classification.</li>
</ul>`
        }
      ],
      glossary: [
        ["Time deposit", "A deposit for a fixed term at a fixed rate."],
        ["Call deposit", "A deposit repayable on demand, usually with a short notice period."],
        ["Ancillary liquid assets", "Cash held for the fund's day-to-day payments."]
      ]
    }
  }
});

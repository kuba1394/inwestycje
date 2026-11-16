window.INSTRUMENTS.push({
  id: "guaranteed-investment-contract",
  name: "Guaranteed Investment Contract",
  aliases: ["GIC", "Guaranteed Income Contract", "Synthetic GIC", "Stable Value Wrap", "umowa z gwarantowanym oprocentowaniem"],
  market: "otc",
  asset: { pl: "Kredyty i rynki prywatne", en: "Loans and private markets" },
  sources: ["aifmd", "ucits"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Umowa z zakładem ubezpieczeń, który gwarantuje zwrot wpłaconego kapitału i stałe oprocentowanie przez określony czas. Typowa dla amerykańskich funduszy stable value w planach emerytalnych 401(k). Nie jest papierem wartościowym i nie ma rynku wtórnego — inwestor ma wierzytelność wobec ubezpieczyciela.",
      keyFacts: [
        ["Druga strona", "Ubezpieczyciel (lub bank)."],
        ["Oprocentowanie", "Stałe przez cały okres (np. 3–5 lat)."],
        ["Wycena", "Book value (kapitał + odsetki), nie wartość rynkowa."],
        ["Synthetic GIC", "Portfel obligacji funduszu + umowa wrap gwarantująca wycenę book value."],
        ["Rynek", "Głównie USA; w UE rzadkość."],
        ["Identyfikacja", "Brak ISIN; numer umowy."]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Guaranteed Investment Contract</em> działa jak lokata u ubezpieczyciela. Wersja tradycyjna to ogólne zobowiązanie ubezpieczyciela; wersja syntetyczna (wrap) zostawia obligacje w portfelu funduszu, a ubezpieczyciel gwarantuje tylko, że uczestnicy mogą wypłacić środki po wartości księgowej.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Wpłata</strong> kwoty do ubezpieczyciela.</li>
<li><strong>Naliczanie</strong> stałego oprocentowania.</li>
<li><strong>Wypłaty</strong> uczestników planu po book value (według warunków).</li>
<li><strong>Termin</strong> — zwrot kapitału z odsetkami.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>GIC na 10 mln USD, 4% rocznie, 3 lata, kapitalizacja roczna.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Wartość w terminie</td><td>10 000 000 × 1,04<sup>3</sup></td><td class='num'>11 248 640 USD</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Cała kwota to ekspozycja kredytowa na jednego ubezpieczyciela — limity koncentracji według statutu.</li>
<li>Wycena book value nie odzwierciedla zmian stóp ani ryzyka kredytowego.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> book value; dla celów ryzyka — wartość godziwa przez dyskontowanie.</p>
<ul>
<li><strong>Ryzyko kredytowe ubezpieczyciela</strong>.</li>
<li><strong>Ryzyko płynności</strong> — brak rynku wtórnego, ograniczenia wypłat.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zawarcie umowy, wpłata.</li>
<li>Naliczanie odsetek, wypłaty.</li>
<li>Zakończenie w terminie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Niedopuszczalny <span class='law'>art. 50</span></h4><p>Umowa z ubezpieczycielem nie jest papierem wartościowym, MMI ani depozytem w instytucji kredytowej.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Możliwy w AIF zgodnie ze statutem; depozytariusz prowadzi rejestr (art. 21 ust. 8 lit. b); wycena według polityki ZAFI.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>Brak EMIR i SFTR.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>Numer umowy, LEI ubezpieczyciela.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Typ funduszu (UCITS — niedopuszczalny).</li>
<li>Koncentracja na ubezpieczycielu.</li>
<li>Metoda wyceny zgodna z polityką.</li>
</ul>`
        }
      ],
      glossary: [
        ["Stable value fund", "Amerykański fundusz w planach emerytalnych wyceniany po wartości księgowej."],
        ["Book value", "Wartość księgowa — kapitał plus narosłe odsetki."],
        ["Wrap contract", "Umowa gwarantująca wypłaty po wartości księgowej dla portfela obligacji."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A contract with an insurance company that guarantees return of the capital paid in and a fixed rate of interest for a set period. Typical of US stable value funds in 401(k) retirement plans. It is not a security and has no secondary market — the investor holds a claim on the insurer.",
      keyFacts: [
        ["Counterparty", "An insurer (or a bank)."],
        ["Interest", "Fixed for the whole term (e.g. 3–5 years)."],
        ["Valuation", "Book value (capital + interest), not market value."],
        ["Synthetic GIC", "The fund's bond portfolio + a wrap contract guaranteeing book-value withdrawals."],
        ["Market", "Mainly the US; rare in the EU."],
        ["Identification", "No ISIN; contract number."]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Guaranteed Investment Contract</em> works like a deposit with an insurer. The traditional version is a general obligation of the insurer; the synthetic (wrap) version leaves the bonds in the fund's portfolio, and the insurer only guarantees that participants can withdraw at book value.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Payment</strong> of the amount to the insurer.</li>
<li><strong>Accrual</strong> of a fixed rate.</li>
<li><strong>Plan participant withdrawals</strong> at book value (per the terms).</li>
<li><strong>Maturity</strong> — return of capital with interest.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A USD 10m GIC at 4% a year, 3 years, annual compounding.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Value at maturity</td><td>10,000,000 × 1.04<sup>3</sup></td><td class='num'>USD 11,248,640</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>The whole amount is credit exposure to one insurer — concentration limits per the fund rules.</li>
<li>Book-value valuation does not reflect changes in rates or credit risk.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> book value; for risk purposes — fair value by discounting.</p>
<ul>
<li><strong>Insurer credit risk</strong>.</li>
<li><strong>Liquidity risk</strong> — no secondary market, withdrawal restrictions.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Contract signed, payment made.</li>
<li>Interest accrual, withdrawals.</li>
<li>Termination at maturity.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Not eligible <span class='law'>Art. 50</span></h4><p>A contract with an insurer is not a security, an MMI or a deposit with a credit institution.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Possible in an AIF per its rules; the depositary keeps a record (Art. 21(8)(b)); valuation per the AIFM's policy.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>No EMIR or SFTR.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>Contract number, insurer LEI.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Fund type (UCITS — not eligible).</li>
<li>Concentration on the insurer.</li>
<li>Valuation method in line with policy.</li>
</ul>`
        }
      ],
      glossary: [
        ["Stable value fund", "A US retirement plan fund valued at book value."],
        ["Book value", "Capital plus accrued interest."],
        ["Wrap contract", "A contract guaranteeing book-value withdrawals for a bond portfolio."]
      ]
    }
  }
});

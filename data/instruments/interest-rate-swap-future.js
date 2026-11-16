window.INSTRUMENTS.push({
  id: "interest-rate-swap-future",
  name: "Interest Rate Swap Future",
  aliases: ["Swap Future", "Swap Futures", "Deliverable Swap Future", "kontrakt terminowy na swap"],
  market: "exchange",
  asset: { pl: "Derywaty giełdowe", en: "Listed derivatives" },
  sources: ["ucits", "cesr10788", "emir"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Kontrakt futures, którego wartość odpowiada swapowi procentowemu o określonym terminie i stopie (np. 5- lub 10-letni swap na SOFR). Daje ekspozycję jak IRS, ale z giełdowym rozliczeniem przez CCP i codziennym depozytem. Rynek jest niszowy w porównaniu z kontraktami na obligacje.",
      keyFacts: [
        ["Baza", "Swap procentowy o standardowym terminie i stopie."],
        ["Rozliczenie", "Gotówkowe lub dostawa w swap rozliczany przez CCP (zależnie od giełdy)."],
        ["Kwotowanie", "Cena (np. 100 + NPV) lub stopa."],
        ["Uczestnicy", "Fundusze, które chcą ekspozycji swapowej bez umowy ISDA."],
        ["Ekspozycja", "Nominał swapu bazowego."],
        ["Kod CFI", "<code>FF</code> — Financial futures (baza: swap)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Interest Rate Swap Future</em> odtwarza ekonomię <a href='#/i/interest-rate-swap'>swapu procentowego</a> w formie kontraktu giełdowego. Zmiana ceny kontraktu odpowiada zmianie wartości swapu o danym terminie i stopie stałej.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Otwarcie</strong> pozycji na giełdzie.</li>
<li><strong>Codzienny variation margin</strong>.</li>
<li><strong>Termin</strong> — rozliczenie gotówkowe lub dostawa w swap rozliczany przez CCP.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Fundusz kupuje 20 kontraktów na 10-letni swap, nominał 100 000 USD każdy; DV01 kontraktu ok. 87 USD.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Nominał (ekspozycja)</td><td>20 × 100 000</td><td class='num'>2 000 000 USD</td></tr>
<tr><td>Wrażliwość na 1 pb</td><td>20 × 87</td><td class='num'>1 740 USD</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Derywat giełdowy — brak limitu kontrahenta z art. 52 ust. 1; global exposure = nominał (możliwy duration netting).</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> kurs rozliczeniowy giełdy.</p>
<ul>
<li><strong>Ryzyko stopy procentowej</strong>.</li>
<li><strong>Ryzyko płynności</strong> — niewielki obrót.</li>
<li><strong>Ryzyko bazy</strong> względem swapów OTC.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Otwarcie, depozyty.</li>
<li>Rolowanie lub rozliczenie w terminie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność i ekspozycja <span class='law'>art. 50 ust. 1 lit. g, CESR/10-788</span></h4><p>Derywat na stopę procentową; ekspozycja = nominał; duration netting przy spełnieniu warunków.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Nominał w metodach brutto i zaangażowania.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>EMIR</strong> — raport do T+1 (derywat giełdowy).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>Kod kontraktu i terminu, MIC; <strong>CFI</strong> <code>FF…</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Global exposure (nominał).</li>
<li>Płynność pozycji.</li>
<li>Raport EMIR.</li>
</ul>`
        }
      ],
      glossary: [
        ["DV01", "Zmiana wartości przy zmianie stopy o 1 punkt bazowy."],
        ["NPV", "Wartość bieżąca netto swapu bazowego."],
        ["Duration netting", "Kompensowanie pozycji o przeciwnym ryzyku stopy procentowej według CESR/10-788."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A futures contract whose value mirrors an interest rate swap of a set maturity and rate (e.g. a 5- or 10-year SOFR swap). It gives IRS-like exposure but with exchange clearing through a CCP and daily margining. The market is niche compared with bond futures.",
      keyFacts: [
        ["Underlying", "An interest rate swap of a standard maturity and rate."],
        ["Settlement", "Cash or delivery into a CCP-cleared swap (depending on the exchange)."],
        ["Quotation", "A price (e.g. 100 + NPV) or a rate."],
        ["Users", "Funds wanting swap exposure without an ISDA agreement."],
        ["Exposure", "Notional of the underlying swap."],
        ["CFI code", "<code>FF</code> — Financial futures (underlying: swap)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>An <em>Interest Rate Swap Future</em> replicates the economics of an <a href='#/i/interest-rate-swap'>interest rate swap</a> as a listed contract. The change in the contract price matches the change in value of a swap of the given maturity and fixed rate.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Opening</strong> a position on the exchange.</li>
<li><strong>Daily variation margin</strong>.</li>
<li><strong>Expiry</strong> — cash settlement or delivery into a CCP-cleared swap.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A fund buys 20 contracts on a 10-year swap, USD 100,000 notional each; contract DV01 about USD 87.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Notional (exposure)</td><td>20 × 100,000</td><td class='num'>USD 2,000,000</td></tr>
<tr><td>Sensitivity per 1 bp</td><td>20 × 87</td><td class='num'>USD 1,740</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>A listed derivative — no Art. 52(1) counterparty limit; global exposure = notional (duration netting possible).</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> exchange settlement price.</p>
<ul>
<li><strong>Interest rate risk</strong>.</li>
<li><strong>Liquidity risk</strong> — low turnover.</li>
<li><strong>Basis risk</strong> against OTC swaps.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Opening, margins.</li>
<li>Roll or settlement at expiry.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility and exposure <span class='law'>Art. 50(1)(g), CESR/10-788</span></h4><p>A derivative on an interest rate; exposure = notional; duration netting where the conditions are met.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Notional under the gross and commitment methods.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li><strong>EMIR</strong> — report by T+1 (listed derivative).</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>Contract and maturity code, MIC; <strong>CFI</strong> <code>FF…</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Global exposure (notional).</li>
<li>Position liquidity.</li>
<li>EMIR report.</li>
</ul>`
        }
      ],
      glossary: [
        ["DV01", "The change in value for a 1 basis point move in rates."],
        ["NPV", "Net present value of the underlying swap."],
        ["Duration netting", "Offsetting positions with opposite interest rate risk under CESR/10-788."]
      ]
    }
  }
});

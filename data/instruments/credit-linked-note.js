window.INSTRUMENTS.push({
  id: "credit-linked-note",
  name: "Credit-Linked Note",
  aliases: ["CLN", "Funded CDS", "nota powiązana z ryzykiem kredytowym"],
  market: "otc",
  asset: { pl: "Dłużne — strukturyzowane", en: "Debt — structured" },
  sources: ["ucits", "eligible", "cesr10788", "secReg"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Papier dłużny z wbudowanym CDS: inwestor kupuje notę banku lub SPV i w zamian za wyższy kupon przejmuje ryzyko kredytowe innego podmiotu (podmiotu referencyjnego). Jeśli podmiot referencyjny zbankrutuje, nota zostaje spłacona tylko w wysokości odzysku. Inwestor ma więc dwie ekspozycje: na emitenta noty i na podmiot referencyjny.",
      keyFacts: [
        ["Konstrukcja", "Obligacja + sprzedana ochrona CDS (funded — inwestor płaci nominał z góry)."],
        ["Kupon", "Stopa bazowa + spread zbliżony do spreadu CDS podmiotu referencyjnego."],
        ["Zdarzenie kredytowe", "Wcześniejszy wykup po wartości odzysku."],
        ["Emitent", "Bank (CLN bankowa) lub SPV z zabezpieczeniem (np. obligacjami)."],
        ["W UCITS", "Zbywalny papier z wbudowanym derywatem — wprost wymieniony w CESR/10-788."],
        ["Kod CFI", "<code>DE</code> lub <code>DS</code> — Structured instruments"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Credit-Linked Note</em> łączy obligację z <a href='#/i/credit-default-swap'>CDS</a>. Emitent sprzedaje notę za nominał, a jednocześnie kupuje od inwestora (w strukturze noty) ochronę na podmiot referencyjny. Kupon noty zawiera premię za tę ochronę.</p>
<p>Jeśli nastąpi zdarzenie kredytowe, nota jest wykupywana wcześniej po wartości odzysku z obligacji podmiotu referencyjnego. W CLN emitowanej przez SPV wpływy z emisji inwestuje się w zabezpieczenie — wtedy liczy się też jakość tego zabezpieczenia.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zakup noty</strong> za nominał.</li>
<li><strong>Kupony</strong> do terminu, jeśli nie ma zdarzenia kredytowego.</li>
<li><strong>Zdarzenie kredytowe</strong> — ustalenie odzysku (aukcja ISDA), wykup noty po odzysku.</li>
<li><strong>Termin</strong> — wykup po nominale, jeśli zdarzenia nie było.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Fundusz kupuje CLN banku A za 10 mln EUR z ekspozycją na spółkę X; odzysk po upadłości X wynosi 40%.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Wykup po zdarzeniu kredytowym</td><td>10 000 000 × 40%</td><td class='num'>4 000 000 EUR</td></tr>
<tr><td>Strata</td><td>10 000 000 − 4 000 000</td><td class='num'>6 000 000 EUR</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Limit emitenta liczy się na bank A <strong>i</strong> na spółkę X (look-through wbudowanego CDS) — obie ekspozycje po 10 mln EUR.</li>
<li>Wbudowany derywat wchodzi do global exposure: sprzedana ochrona — wyższa z wartości nominalnej i rynkowej aktywa referencyjnego.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> cena dealera lub model: obligacja emitenta + wartość CDS.</p>
<ul>
<li><strong>Ryzyko kredytowe podmiotu referencyjnego</strong> i emitenta (podwójne).</li>
<li><strong>Ryzyko korelacji</strong> — gdy emitent i podmiot referencyjny są ze sobą powiązani.</li>
<li><strong>Ryzyko płynności</strong> — rynek wtórny ograniczony, zwykle tylko emitent.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Emisja, rozliczenie DvP.</li>
<li>Kupony; monitorowanie podmiotu referencyjnego.</li>
<li>Zdarzenie kredytowe → aukcja ISDA → wcześniejszy wykup; albo wykup w terminie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Wbudowany derywat <span class='law'>art. 10 dyr. 2007/16/WE, CESR/10-788</span></h4><p>CLN to papier z wbudowanym derywatem kredytowym — ujęcie w global exposure i w limitach emitenta.</p></div>
<div class='rule'><h4>Limity <span class='law'>art. 52</span></h4><p>Emitent noty i podmiot referencyjny; przy SPV — także zabezpieczenie.</p></div>
<div class='rule'><h4>Sekurytyzacja <span class='law'>rozp. 2017/2402</span></h4><p>CLN na jeden podmiot nie jest sekurytyzacją; CLN odnosząca się do transzy portfela (synthetic securitisation) — tak, z obowiązkiem należytej staranności.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Wbudowany CDS wliczany do ekspozycji i dźwigni.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>Nota to papier wartościowy — brak raportu EMIR po stronie funduszu.</li>
<li>SSR — CLN na państwo UE może być kwestią przy zasadach dotyczących CDS na dług państwowy.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li><strong>ISIN</strong> noty, LEI emitenta i podmiotu referencyjnego.</li>
<li><strong>CFI</strong> <code>DE</code>/<code>DS</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Dwie ekspozycje emitenta: nota i podmiot referencyjny.</li>
<li>Global exposure wbudowanego CDS.</li>
<li>Struktura: single-name czy transza portfela (sekurytyzacja).</li>
<li>Płynność i wycena niezależna.</li>
</ul>`
        }
      ],
      glossary: [
        ["Reference entity", "Podmiot, którego ryzyko kredytowe przenosi nota."],
        ["Funded protection", "Ochrona kredytowa, za którą sprzedający płaci z góry (kupując notę)."],
        ["Recovery", "Odsetek nominału odzyskany po zdarzeniu kredytowym."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A debt security with an embedded CDS: the investor buys a note from a bank or SPV and, in exchange for a higher coupon, takes on the credit risk of another entity (the reference entity). If the reference entity defaults, the note is repaid only at the recovery value. The investor therefore has two exposures: to the note issuer and to the reference entity.",
      keyFacts: [
        ["Structure", "Bond + sold CDS protection (funded — the investor pays the nominal upfront)."],
        ["Coupon", "Base rate + a spread close to the reference entity's CDS spread."],
        ["Credit event", "Early redemption at recovery value."],
        ["Issuer", "A bank (bank CLN) or an SPV with collateral (e.g. bonds)."],
        ["In a UCITS", "A transferable security with an embedded derivative — named explicitly in CESR/10-788."],
        ["CFI code", "<code>DE</code> or <code>DS</code> — Structured instruments"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Credit-Linked Note</em> combines a bond with a <a href='#/i/credit-default-swap'>CDS</a>. The issuer sells the note at par and at the same time buys protection on the reference entity from the investor (inside the note). The note's coupon includes the premium for that protection.</p>
<p>If a credit event occurs, the note is redeemed early at the recovery value of the reference entity's bonds. In an SPV-issued CLN, the issue proceeds are invested in collateral — the quality of that collateral then matters too.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Purchase of the note</strong> at par.</li>
<li><strong>Coupons</strong> until maturity if there is no credit event.</li>
<li><strong>Credit event</strong> — recovery determined (ISDA auction), note redeemed at recovery.</li>
<li><strong>Maturity</strong> — redemption at par if there was no event.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A fund buys a EUR 10m CLN issued by bank A with exposure to company X; recovery after X's default is 40%.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Redemption after a credit event</td><td>10,000,000 × 40%</td><td class='num'>EUR 4,000,000</td></tr>
<tr><td>Loss</td><td>10,000,000 − 4,000,000</td><td class='num'>EUR 6,000,000</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>Issuer limits apply to bank A <strong>and</strong> to company X (look-through of the embedded CDS) — EUR 10m exposure each.</li>
<li>The embedded derivative goes into global exposure: sold protection — the higher of the notional and the market value of the reference asset.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> dealer price or a model: issuer bond + CDS value.</p>
<ul>
<li><strong>Credit risk of the reference entity</strong> and of the issuer (double).</li>
<li><strong>Correlation risk</strong> — when the issuer and the reference entity are linked.</li>
<li><strong>Liquidity risk</strong> — limited secondary market, usually only the issuer.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Issue, DvP settlement.</li>
<li>Coupons; monitoring of the reference entity.</li>
<li>Credit event → ISDA auction → early redemption; or redemption at maturity.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Embedded derivative <span class='law'>Art. 10 Dir. 2007/16/EC, CESR/10-788</span></h4><p>A CLN is a security with an embedded credit derivative — included in global exposure and issuer limits.</p></div>
<div class='rule'><h4>Limits <span class='law'>Art. 52</span></h4><p>Note issuer and reference entity; with an SPV — the collateral too.</p></div>
<div class='rule'><h4>Securitisation <span class='law'>Reg. 2017/2402</span></h4><p>A single-name CLN is not a securitisation; a CLN referencing a tranche of a portfolio (synthetic securitisation) is, with due diligence obligations.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>The embedded CDS is included in exposure and leverage.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>The note is a security — no EMIR report by the fund.</li>
<li>SSR — a CLN on an EU sovereign may be relevant under the sovereign CDS rules.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>Note <strong>ISIN</strong>, LEIs of the issuer and the reference entity.</li>
<li><strong>CFI</strong> <code>DE</code>/<code>DS</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Two issuer exposures: the note and the reference entity.</li>
<li>Global exposure of the embedded CDS.</li>
<li>Structure: single-name or portfolio tranche (securitisation).</li>
<li>Liquidity and independent valuation.</li>
</ul>`
        }
      ],
      glossary: [
        ["Reference entity", "The entity whose credit risk the note transfers."],
        ["Funded protection", "Credit protection paid for upfront by the seller (by buying the note)."],
        ["Recovery", "The share of nominal recovered after a credit event."]
      ]
    }
  }
});

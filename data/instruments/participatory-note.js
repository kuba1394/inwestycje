window.INSTRUMENTS.push({
  id: "participatory-note",
  name: "Participatory Note",
  aliases: ["P-Note", "Participatory Notes - Custom", "Offshore Derivative Instrument", "ODI", "Low Exercise Price Warrant", "LEPW"],
  market: "otc",
  asset: { pl: "Dłużne — strukturyzowane", en: "Debt — structured" },
  sources: ["ucits", "eligible", "cesr10788", "td"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Nota emitowana przez bank inwestycyjny, która odzwierciedla 1:1 kurs akcji z rynku o ograniczonym dostępie dla zagranicznych inwestorów — klasycznie Indii (w regulacjach SEBI: offshore derivative instrument), wcześniej też np. Arabii Saudyjskiej. Bank trzyma akcje lokalnie, a inwestor ma ekspozycję ekonomiczną na akcje i ryzyko kredytowe banku.",
      keyFacts: [
        ["Emitent", "Bank zarejestrowany lokalnie jako inwestor zagraniczny (np. FPI w Indiach)."],
        ["Wypłata", "Zwykle 1:1 kurs akcji plus dywidendy netto, minus opłaty."],
        ["Forma", "Nota lub warrant z niską ceną wykonania (LEPW), często w programie EMTN."],
        ["Prawa", "Brak praw głosu — należą do banku jako posiadacza akcji."],
        ["Regulacja lokalna", "SEBI: obowiązki identyfikacji i raportowania posiadaczy ODI."],
        ["Kod CFI", "<code>DE</code>/<code>RW</code> — zależnie od formy"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Participatory Note</em> to papier o profilu „delta one”: zmienia wartość tak jak akcja bazowa, bez dźwigni. Emitent zabezpiecza się, kupując akcję na rynku lokalnym. Konstrukcja jest bliska <a href='#/i/exchange-traded-certificate'>certyfikatowi</a> lub <a href='#/i/warrant'>warrantowi</a> z ceną wykonania bliską zeru.</p>
<p>W aplikacji „Participatory Notes — Custom” oznacza noty emitowane na indywidualne zamówienie (custom) przez konkretny bank.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zamówienie</strong> — fundusz zleca bankowi ekspozycję na akcje.</li>
<li><strong>Emisja noty</strong> i zakup akcji przez bank lokalnie.</li>
<li><strong>Zdarzenia korporacyjne</strong> przenoszone na notę (dywidendy netto podatku).</li>
<li><strong>Wykup</strong> na żądanie lub w terminie — według bieżącego kursu akcji.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>UCITS ma P-note banku C na akcje spółki Y (2% NAV) i obligacje banku C (6% NAV).</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Ekspozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Emitent: bank C</td><td>2% + 6%</td><td class='num'>8% (koszyk 40%)</td></tr>
<tr><td>Look-through: spółka Y</td><td>wartość noty</td><td class='num'>2%</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Limit emitenta liczy się na bank C — z innymi papierami banku. Ekspozycję na Y łączy się z bezpośrednimi akcjami Y (look-through).</li>
<li>Sprawdź notowanie noty — nienotowana nota trafia do limitu 10%.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> kurs akcji bazowej × kurs walutowy, skorygowany o opłaty; kwotowanie emitenta.</p>
<ul>
<li><strong>Ryzyko akcji</strong> i walutowe.</li>
<li><strong>Ryzyko kredytowe emitenta</strong>.</li>
<li><strong>Ryzyko regulacyjne</strong> rynku lokalnego (zmiany zasad dla inwestorów zagranicznych).</li>
<li><strong>Ryzyko płynności</strong> — wykup tylko przez emitenta.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Emisja, rozliczenie (Euroclear/Clearstream).</li>
<li>Zdarzenia korporacyjne akcji bazowej.</li>
<li>Wykup.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Klasyfikacja <span class='law'>art. 2 i 10 dyr. 2007/16/WE</span></h4><p>Zbywalny papier wartościowy; w praktyce traktowany jako papier z wbudowanym derywatem na akcję — look-through do spółki bazowej.</p></div>
<div class='rule'><h4>Limity <span class='law'>art. 50 ust. 2 lit. a, art. 52</span></h4><p>Emitent noty (5/10/40) + spółka bazowa; nienotowana — limit 10%.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Ekspozycja na akcje bazowe w metodach dźwigni.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>Lokalne raporty (np. SEBI — przez emitenta, z danymi o posiadaczach).</li>
<li>Znaczne pakiety — w Indiach i innych krajach według przepisów lokalnych; w UE dla spółek z UE instrumenty z art. 13 TD.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>ISIN noty; ISIN akcji bazowej w danych referencyjnych.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Limit emitenta noty łącznie z innymi papierami banku.</li>
<li>Look-through do akcji bazowej.</li>
<li>Notowanie (limit 10%).</li>
<li>Wymogi lokalne dotyczące posiadaczy.</li>
</ul>`
        }
      ],
      glossary: [
        ["Delta one", "Instrument zmieniający wartość 1:1 z instrumentem bazowym."],
        ["ODI", "Offshore Derivative Instrument — nazwa P-note w regulacjach SEBI."],
        ["LEPW", "Low Exercise Price Warrant — warrant z ceną wykonania bliską zeru."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A note issued by an investment bank that tracks 1:1 the price of a share from a market with restricted foreign access — classically India (in SEBI rules: an offshore derivative instrument), earlier also e.g. Saudi Arabia. The bank holds the shares locally, and the investor has economic exposure to the shares and credit risk on the bank.",
      keyFacts: [
        ["Issuer", "A bank registered locally as a foreign investor (e.g. an FPI in India)."],
        ["Payoff", "Usually 1:1 the share price plus net dividends, minus fees."],
        ["Form", "A note or low exercise price warrant (LEPW), often under an EMTN programme."],
        ["Rights", "No voting rights — they belong to the bank as shareholder."],
        ["Local regulation", "SEBI: obligations to identify and report ODI holders."],
        ["CFI code", "<code>DE</code>/<code>RW</code> — depending on form"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Participatory Note</em> is a "delta one" security: it moves in value like the underlying share, without leverage. The issuer hedges by buying the share in the local market. The structure is close to a <a href='#/i/exchange-traded-certificate'>certificate</a> or a <a href='#/i/warrant'>warrant</a> with a near-zero strike.</p>
<p>In the application "Participatory Notes — Custom" means notes issued to order (custom) by a particular bank.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Request</strong> — the fund asks the bank for exposure to the shares.</li>
<li><strong>Note issue</strong> and local purchase of the shares by the bank.</li>
<li><strong>Corporate actions</strong> passed through to the note (dividends net of tax).</li>
<li><strong>Redemption</strong> on request or at maturity — at the current share price.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A UCITS holds a bank C P-note on company Y shares (2% of NAV) and bank C bonds (6% of NAV).</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Exposure</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Issuer: bank C</td><td>2% + 6%</td><td class='num'>8% (40% bucket)</td></tr>
<tr><td>Look-through: company Y</td><td>note value</td><td class='num'>2%</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>The issuer limit applies to bank C — together with the bank's other securities. Exposure to Y is combined with direct Y shares (look-through).</li>
<li>Check whether the note is listed — an unlisted note goes into the 10% limit.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> underlying share price × FX rate, adjusted for fees; issuer quote.</p>
<ul>
<li><strong>Equity and FX risk</strong>.</li>
<li><strong>Issuer credit risk</strong>.</li>
<li><strong>Local regulatory risk</strong> (changes in rules for foreign investors).</li>
<li><strong>Liquidity risk</strong> — redemption only through the issuer.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Issue, settlement (Euroclear/Clearstream).</li>
<li>Corporate actions on the underlying share.</li>
<li>Redemption.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Classification <span class='law'>Art. 2 and 10 Dir. 2007/16/EC</span></h4><p>A transferable security; in practice treated as a security with an embedded derivative on a share — look-through to the underlying company.</p></div>
<div class='rule'><h4>Limits <span class='law'>Art. 50(2)(a), Art. 52</span></h4><p>Note issuer (5/10/40) + underlying company; unlisted — the 10% limit.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Exposure to the underlying shares in the leverage methods.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>Local reports (e.g. SEBI — via the issuer, with holder data).</li>
<li>Major holdings — in India and other markets under local rules; in the EU for EU companies, Art. 13 TD instruments.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>Note ISIN; underlying share ISIN in reference data.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Note issuer limit together with the bank's other securities.</li>
<li>Look-through to the underlying share.</li>
<li>Listing (10% limit).</li>
<li>Local holder requirements.</li>
</ul>`
        }
      ],
      glossary: [
        ["Delta one", "An instrument whose value moves 1:1 with its underlying."],
        ["ODI", "Offshore Derivative Instrument — the SEBI term for a P-note."],
        ["LEPW", "Low Exercise Price Warrant — a warrant with a near-zero strike."]
      ]
    }
  }
});

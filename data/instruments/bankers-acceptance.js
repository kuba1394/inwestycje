window.INSTRUMENTS.push({
  id: "bankers-acceptance",
  name: "Banker's Acceptance",
  aliases: ["BA", "Bankers' Acceptance", "Bank Bill", "akcept bankowy"],
  market: "otc",
  asset: { pl: "Rynek pieniężny", en: "Money market" },
  sources: ["ucits", "eligible", "mmfr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Krótkoterminowy weksel (trata) wystawiony zwykle przez przedsiębiorstwo i zaakceptowany przez bank, który przez akcept zobowiązuje się go zapłacić w terminie. Sprzedawany z dyskontem, z terminem zwykle do 180 dni. Historycznie służył finansowaniu handlu; duży rynek kanadyjski zakończył się wraz z wygaszeniem stawki CDOR w czerwcu 2024 r.",
      keyFacts: [
        ["Zobowiązany", "Bank akceptujący (bezwarunkowo) i wystawca weksla."],
        ["Termin", "Zwykle 30–180 dni."],
        ["Cena", "Dyskonto: N × (1 − d × dni / 360)."],
        ["Rynek", "Dziś niewielki (USA, Azja); w Kanadzie wygaszony po zakończeniu CDOR."],
        ["W UCITS", "Instrument rynku pieniężnego — art. 50 ust. 1 lit. h."],
        ["Kod CFI", "<code>DY</code> — Money market instruments"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Banker's Acceptance</em> to papier „dwóch podpisów”: płatność gwarantuje bank, a za nim stoi wystawca, który musi oddać bankowi środki. Dla inwestora ekonomicznie to krótkoterminowa ekspozycja na bank — podobna do <a href='#/i/certificate-of-deposit'>certyfikatu depozytowego</a> lub <a href='#/i/commercial-paper'>commercial paper</a>.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Wystawienie trat</strong> przez przedsiębiorstwo (np. importera).</li>
<li><strong>Akcept banku</strong> — bank przyjmuje zobowiązanie zapłaty.</li>
<li><strong>Sprzedaż</strong> inwestorom z dyskontem.</li>
<li><strong>Wykup</strong> przez bank w terminie — 100% nominału.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>BA o nominale 1 mln USD, 90 dni, stopa dyskonta 4,00%.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Cena</td><td>1 000 000 × (1 − 4,00% × 90 / 360)</td><td class='num'>990 000 USD</td></tr>
<tr><td>Rentowność (od ceny)</td><td>10 000 / 990 000 × 360 / 90</td><td class='num'>4,04%</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Limit emitenta liczy się na bank akceptujący (zobowiązanego głównego), łącznie z jego innymi papierami i depozytami w limicie 20%.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> dyskontowanie krzywą rynku pieniężnego dla banku.</p>
<ul>
<li><strong>Ryzyko kredytowe banku</strong>.</li>
<li><strong>Ryzyko płynności</strong> — mały rynek wtórny.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zakup, rozliczenie.</li>
<li>Wykup w terminie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. h</span></h4><p>MMI gwarantowany przez instytucję kredytową podlegającą nadzorowi ostrożnościowemu.</p></div>
<div class='rule'><h4>Limity <span class='law'>art. 52, 56</span></h4><p>5/10/40 na bank; limit łączny 20%; maks. 10% MMI jednego emitenta.</p></div>
<div class='rule'><h4>MMF <span class='law'>MMFR art. 10</span></h4><p>Dopuszczalne MMI przy spełnieniu warunków jakości i terminu.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limity według statutu; ekwiwalent gotówki tylko przy spełnieniu kryteriów rozp. 231/2013.</li>
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
<li>ISIN lub CUSIP (nie zawsze), LEI banku.</li>
<li><strong>CFI</strong> <code>DY</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Emitent = bank akceptujący.</li>
<li>Limit łączny 20% wobec banku.</li>
<li>Termin i jakość (MMF).</li>
</ul>`
        }
      ],
      glossary: [
        ["Acceptance", "Akcept — przyjęcie przez bank zobowiązania do zapłaty weksla."],
        ["Discount rate", "Stopa dyskonta liczona od nominału."],
        ["CDOR", "Kanadyjska stawka referencyjna oparta na BA, wygaszona w czerwcu 2024 r."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A short-term bill of exchange (draft) usually drawn by a company and accepted by a bank, which by accepting it undertakes to pay it at maturity. Sold at a discount, usually up to 180 days. It was historically used for trade finance; the large Canadian market ended with the cessation of CDOR in June 2024.",
      keyFacts: [
        ["Obligor", "The accepting bank (unconditionally) and the drawer."],
        ["Term", "Usually 30–180 days."],
        ["Price", "Discount: N × (1 − d × days / 360)."],
        ["Market", "Small today (US, Asia); wound down in Canada after CDOR ended."],
        ["In a UCITS", "A money market instrument — Art. 50(1)(h)."],
        ["CFI code", "<code>DY</code> — Money market instruments"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Banker's Acceptance</em> is "two-name paper": the bank guarantees payment, backed by the drawer, who has to reimburse the bank. For the investor it is economically a short-term exposure to the bank — similar to a <a href='#/i/certificate-of-deposit'>certificate of deposit</a> or <a href='#/i/commercial-paper'>commercial paper</a>.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Draft drawn</strong> by a company (e.g. an importer).</li>
<li><strong>Bank acceptance</strong> — the bank takes on the payment obligation.</li>
<li><strong>Sale</strong> to investors at a discount.</li>
<li><strong>Redemption</strong> by the bank at maturity — 100% of nominal.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A USD 1m BA, 90 days, 4.00% discount rate.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Price</td><td>1,000,000 × (1 − 4.00% × 90 / 360)</td><td class='num'>USD 990,000</td></tr>
<tr><td>Yield (on price)</td><td>10,000 / 990,000 × 360 / 90</td><td class='num'>4.04%</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>The issuer limit applies to the accepting bank (the primary obligor), together with its other securities and deposits in the 20% combined limit.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> discounting on the bank's money market curve.</p>
<ul>
<li><strong>Bank credit risk</strong>.</li>
<li><strong>Liquidity risk</strong> — a small secondary market.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Purchase, settlement.</li>
<li>Redemption at maturity.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(h)</span></h4><p>An MMI guaranteed by a prudentially supervised credit institution.</p></div>
<div class='rule'><h4>Limits <span class='law'>Art. 52, 56</span></h4><p>5/10/40 on the bank; 20% combined limit; max 10% of one issuer's MMIs.</p></div>
<div class='rule'><h4>MMFs <span class='law'>MMFR Art. 10</span></h4><p>An eligible MMI if the quality and maturity conditions are met.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limits per the fund rules; a cash equivalent only if it meets the Reg. 231/2013 criteria.</li>
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
<li>ISIN or CUSIP (not always), bank LEI.</li>
<li><strong>CFI</strong> <code>DY</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Issuer = accepting bank.</li>
<li>20% combined limit on the bank.</li>
<li>Maturity and quality (MMFs).</li>
</ul>`
        }
      ],
      glossary: [
        ["Acceptance", "The bank's undertaking to pay the bill."],
        ["Discount rate", "A discount rate measured on the nominal."],
        ["CDOR", "The Canadian reference rate based on BAs, discontinued in June 2024."]
      ]
    }
  }
});

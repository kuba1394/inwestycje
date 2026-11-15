window.INSTRUMENTS.push({
  id: "depositary-receipt",
  name: "Depositary Receipt (ADR / GDR)",
  aliases: ["ADR", "GDR", "American Depositary Receipt", "Global Depositary Receipt", "kwit depozytowy"],
  market: "exchange",
  asset: { pl: "Akcje", en: "Equity" },
  sources: ["ucits", "eligible", "aifmd", "csdrT1", "td"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Kwit depozytowy to papier wystawiony przez bank depozytariusza, który reprezentuje określoną liczbę akcji spółki zagranicznej przechowywanych w kraju jej siedziby. Pozwala kupować akcje np. indyjskiej czy brazylijskiej spółki na giełdzie w Nowym Jorku lub Londynie, w USD i w lokalnym systemie rozliczeń.",
      keyFacts: [
        ["Emitent kwitu", "Bank depozytariusz (np. BNY, JPMorgan, Citi, Deutsche Bank)."],
        ["Rodzaje", "ADR — notowane w USA (Level I: OTC; Level II i III: NYSE/Nasdaq). GDR — zwykle Londyn lub Luksemburg."],
        ["Parytet", "Ile akcji przypada na jeden kwit, np. 1 ADR = 5 akcji."],
        ["Prawa", "Dywidendy przekazywane przez depozytariusza (po przewalutowaniu i opłatach); głosowanie przez depozytariusza."],
        ["Rozliczenie", "Według rynku notowania kwitu (USA T+1, UE T+2 / od 11.10.2027 T+1)."],
        ["Konwersja", "Kwity można zamieniać na akcje lokalne i odwrotnie (arbitraż utrzymuje ceny blisko siebie)."],
        ["Kod CFI", "<code>ED****</code> (Equities – Depositary receipts)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Depositary Receipt</em> to „opakowanie” na akcje zagraniczne. Bank depozytariusz kupuje akcje spółki na rynku lokalnym, przechowuje je u lokalnego custodiana i emituje kwity, każdy reprezentujący określoną liczbę tych akcji.</p>" +
            "<p>Ekonomicznie posiadacz kwitu ma ekspozycję na <strong>spółkę bazową</strong>, a nie na bank depozytariusza. Kwit to tylko inna forma posiadania akcji.</p>" +
            "<ul>" +
              "<li><strong>Sponsored</strong> — utworzony we współpracy ze spółką (umowa depozytowa), z obowiązkami informacyjnymi.</li>" +
              "<li><strong>Unsponsored</strong> — utworzony przez bank bez udziału spółki (zwykle obrót OTC).</li>" +
            "</ul>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Utworzenie.</strong> Broker dostarcza akcje lokalne do custodiana depozytariusza; depozytariusz emituje odpowiednią liczbę kwitów.</li>" +
              "<li><strong>Obrót.</strong> Kwity są notowane i rozliczane jak akcje na rynku notowania (np. w USD przez DTC).</li>" +
              "<li><strong>Dywidendy.</strong> Spółka płaci w walucie lokalnej; depozytariusz przewalutowuje, potrąca opłaty i podatek u źródła, a następnie wypłaca posiadaczom kwitów.</li>" +
              "<li><strong>Głosowanie.</strong> Posiadacz daje instrukcję depozytariuszowi, który głosuje akcjami.</li>" +
              "<li><strong>Umorzenie.</strong> Kwity można oddać i odebrać akcje lokalne (jeśli przepisy kraju na to pozwalają).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy — agregacja z akcjami lokalnymi",
          html:
            "<p>Fundusz (NAV równowartość 300 mln USD) ma 300 000 ADR spółki T po 40 USD (1 ADR = 5 akcji) oraz akcje lokalne tej samej spółki warte 4 mln USD.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Wartość ADR</td><td>300 000 × 40</td><td class='num'>12 000 000 USD</td></tr>" +
              "<tr><td>Liczba akcji bazowych</td><td>300 000 × 5</td><td class='num'>1 500 000 akcji</td></tr>" +
              "<tr><td>Łączna ekspozycja na spółkę T</td><td>(12 + 4) / 300</td><td class='num'>5,33% NAV</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Emitentem do limitów jest <strong>spółka T</strong>, nie bank depozytariusz. Pozycje w ADR i akcjach lokalnych sumuje się — razem 5,33%, więc spółka trafia do koszyka 40%.</li>" +
              "<li>System musi mapować ISIN kwitu na LEI spółki bazowej. Bez tego limit emitenta jest zaniżony.</li>" +
              "<li>Progi znacznych pakietów i limit z art. 56 liczy się od liczby <strong>akcji bazowych</strong> (1,5 mln), nie kwitów.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> kurs kwitu z rynku notowania; przy zawieszeniu lub różnicy godzin handlu — możliwa korekta do wartości godziwej (fair value pricing) na podstawie rynku lokalnego.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko spółki i rynku lokalnego</strong>, w tym ryzyko polityczne i kontroli kapitału.</li>" +
              "<li><strong>Ryzyko walutowe</strong> — kwit w USD, ale wartość wynika z akcji w walucie lokalnej.</li>" +
              "<li><strong>Ryzyko programu</strong> — depozytariusz może zakończyć program; wtedy kwity zamienia się na akcje lub gotówkę.</li>" +
              "<li><strong>Opłaty depozytariusza</strong> potrącane z dywidend.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html:
            "<ol>" +
              "<li>Zakup na giełdzie, rozliczenie w CSD rynku notowania.</li>" +
              "<li>Dywidendy, zdarzenia korporacyjne spółki (z opóźnieniem przez depozytariusza), zmiany parytetu.</li>" +
              "<li>Zakończenie programu lub delisting kwitu (np. przy sankcjach) — konwersja na akcje lokalne, które mogą być trudne do zbycia.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. a–d UCITS</span></h4><p>Kwity notowane na rynku regulowanym (lub uznanym w prospekcie) to zbywalne papiery wartościowe. ADR Level I (obrót OTC) — limit 10% „innych papierów” (art. 50 ust. 2 lit. a).</p></div>" +
              "<div class='rule'><h4>Limity emitenta <span class='law'>art. 52</span></h4><p>Look-through do spółki bazowej; sumowanie z akcjami lokalnymi i innymi papierami spółki oraz jej grupy.</p></div>" +
              "<div class='rule'><h4>Limity nabycia <span class='law'>art. 56</span></h4><p>Liczone od akcji bazowych, na poziomie spółki zarządzającej (akcje z prawem głosu).</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Limity emitenta i kraju według dokumentów AIF — z look-through do spółki i kraju bazowego (np. ADR spółki brazylijskiej to ekspozycja na Brazylię, nie USA).</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html:
            "<ul>" +
              "<li><strong>Znaczne pakiety</strong> <span class='law'>dyr. 2004/109/WE</span> — kwity liczy się jak akcje bazowe; dla spółek spoza UE obowiązują przepisy kraju spółki lub rynku notowania.</li>" +
              "<li><strong>MiFIR</strong> — raporty transakcyjne po stronie firmy inwestycyjnej.</li>" +
              "<li><strong>Sankcje</strong> — kontrola listy sankcyjnej spółki bazowej i kraju.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN kwitu</strong> (np. <code>US…</code> dla ADR) — inny niż ISIN akcji lokalnej.</li>" +
              "<li><strong>ISIN akcji bazowej i LEI spółki</strong> — do agregacji limitów.</li>" +
              "<li><strong>CFI</strong> — <code>E</code> (Equities), grupa <code>D</code> (Depositary receipts).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Mapowanie kwitu na spółkę bazową (LEI) i kraj ryzyka.</li>" +
              "<li>Agregacja z akcjami lokalnymi i innymi kwitami tej samej spółki.</li>" +
              "<li>Notowanie: rynek regulowany/uznany czy OTC (limit 10%)?</li>" +
              "<li>Progi zawiadomień i art. 56 liczone od akcji bazowych (parytet).</li>" +
              "<li>Sankcje i ryzyko zakończenia programu.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Depositary bank", "Bank emitujący kwity i przechowujący akcje bazowe przez lokalnego custodiana."],
        ["Ratio (parytet)", "Liczba akcji bazowych na jeden kwit."],
        ["Sponsored / unsponsored", "Program z udziałem spółki / bez jej udziału."],
        ["Level I / II / III", "Poziomy programów ADR: od obrotu OTC do notowania z emisją nowych akcji."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A depositary receipt is a security issued by a depositary bank that represents a set number of shares of a foreign company held in the company's home market. It lets investors buy shares of, say, an Indian or Brazilian company on an exchange in New York or London, in USD and in the local settlement system.",
      keyFacts: [
        ["Receipt issuer", "Depositary bank (e.g. BNY, JPMorgan, Citi, Deutsche Bank)."],
        ["Types", "ADR — US-traded (Level I: OTC; Level II and III: NYSE/Nasdaq). GDR — usually London or Luxembourg."],
        ["Ratio", "How many shares one receipt represents, e.g. 1 ADR = 5 shares."],
        ["Rights", "Dividends passed through by the depositary (after FX conversion and fees); voting via the depositary."],
        ["Settlement", "Per the receipt's trading market (US T+1, EU T+2 / T+1 from 11 Oct 2027)."],
        ["Conversion", "Receipts can be converted into local shares and back (arbitrage keeps prices close)."],
        ["CFI code", "<code>ED****</code> (Equities – Depositary receipts)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Depositary Receipt is a \"wrapper\" for foreign shares. The depositary bank buys the company's shares in the local market, holds them with a local custodian and issues receipts, each representing a set number of those shares.</p>" +
            "<p>Economically the receipt holder is exposed to the <strong>underlying company</strong>, not to the depositary bank. The receipt is just another way of holding the shares.</p>" +
            "<ul>" +
              "<li><strong>Sponsored</strong> — set up with the company (deposit agreement), with disclosure obligations.</li>" +
              "<li><strong>Unsponsored</strong> — set up by a bank without the company's involvement (usually OTC-traded).</li>" +
            "</ul>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Creation.</strong> A broker delivers local shares to the depositary's custodian; the depositary issues the corresponding number of receipts.</li>" +
              "<li><strong>Trading.</strong> Receipts are listed and settled like shares in their market (e.g. in USD through DTC).</li>" +
              "<li><strong>Dividends.</strong> The company pays in local currency; the depositary converts, deducts fees and withholding tax, and pays receipt holders.</li>" +
              "<li><strong>Voting.</strong> The holder instructs the depositary, which votes the shares.</li>" +
              "<li><strong>Cancellation.</strong> Receipts can be surrendered for local shares (if local rules allow).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example — aggregation with local shares",
          html:
            "<p>A fund (NAV equivalent to USD 300m) holds 300,000 ADRs of company T at USD 40 (1 ADR = 5 shares) and local shares of the same company worth USD 4m.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>ADR value</td><td>300,000 × 40</td><td class='num'>USD 12,000,000</td></tr>" +
              "<tr><td>Number of underlying shares</td><td>300,000 × 5</td><td class='num'>1,500,000 shares</td></tr>" +
              "<tr><td>Total exposure to company T</td><td>(12 + 4) / 300</td><td class='num'>5.33% of NAV</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>The issuer for limit purposes is <strong>company T</strong>, not the depositary bank. ADRs and local shares are aggregated — 5.33% in total, so the company enters the 40% bucket.</li>" +
              "<li>The system must map the receipt's ISIN to the underlying company's LEI. Without this the issuer limit is understated.</li>" +
              "<li>Major holding thresholds and the Art. 56 limit are computed on the number of <strong>underlying shares</strong> (1.5m), not receipts.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> the receipt's price in its trading market; where trading is suspended or hours differ, fair value adjustment based on the local market may apply.</p>" +
            "<ul>" +
              "<li><strong>Company and local market risk</strong>, including political risk and capital controls.</li>" +
              "<li><strong>FX risk</strong> — the receipt is in USD, but its value comes from shares in local currency.</li>" +
              "<li><strong>Programme risk</strong> — the depositary may terminate the programme; receipts are then exchanged for shares or cash.</li>" +
              "<li><strong>Depositary fees</strong> deducted from dividends.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html:
            "<ol>" +
              "<li>Purchase on the exchange, settlement at the trading market's CSD.</li>" +
              "<li>Dividends, company corporate actions (with a lag via the depositary), ratio changes.</li>" +
              "<li>Programme termination or receipt delisting (e.g. under sanctions) — conversion into local shares, which may be hard to sell.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(a)–(d) UCITS</span></h4><p>Receipts listed on a regulated market (or one recognised in the prospectus) are transferable securities. Level I ADRs (OTC-traded) — within the 10% \"other securities\" limit (Art. 50(2)(a)).</p></div>" +
              "<div class='rule'><h4>Issuer limits <span class='law'>Art. 52</span></h4><p>Look-through to the underlying company; aggregation with local shares and other securities of the company and its group.</p></div>" +
              "<div class='rule'><h4>Acquisition limits <span class='law'>Art. 56</span></h4><p>Computed on underlying shares, at management company level (voting shares).</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Issuer and country limits per the AIF's documents — with look-through to the underlying company and country (e.g. an ADR of a Brazilian company is exposure to Brazil, not the US).</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html:
            "<ul>" +
              "<li><strong>Major holdings</strong> <span class='law'>Dir. 2004/109/EC</span> — receipts count like the underlying shares; for non-EU companies the rules of the company's home market or trading market apply.</li>" +
              "<li><strong>MiFIR</strong> — transaction reports by the investment firm.</li>" +
              "<li><strong>Sanctions</strong> — screening of the underlying company and country.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>Receipt ISIN</strong> (e.g. <code>US…</code> for ADRs) — different from the local share ISIN.</li>" +
              "<li><strong>Underlying share ISIN and company LEI</strong> — for limit aggregation.</li>" +
              "<li><strong>CFI</strong> — <code>E</code> (Equities), group <code>D</code> (Depositary receipts).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Receipt mapped to the underlying company (LEI) and country of risk.</li>" +
              "<li>Aggregation with local shares and other receipts of the same company.</li>" +
              "<li>Listing: regulated/recognised market or OTC (10% limit)?</li>" +
              "<li>Notification thresholds and Art. 56 computed on underlying shares (ratio).</li>" +
              "<li>Sanctions and programme termination risk.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Depositary bank", "Bank issuing the receipts and holding the underlying shares via a local custodian."],
        ["Ratio", "Number of underlying shares per receipt."],
        ["Sponsored / unsponsored", "Programme with / without the company's involvement."],
        ["Level I / II / III", "ADR programme levels: from OTC trading to listing with a new share issue."]
      ]
    }
  }
});

window.INSTRUMENTS.push({
  id: "real-estate-investment-trust",
  name: "Real Estate Investment Trust (REIT)",
  aliases: ["REIT", "SIIC", "REIT-AG", "G-REIT", "J-REIT"],
  market: "exchange",
  asset: { pl: "Akcje (nieruchomości)", en: "Equity (real estate)" },
  sources: ["ucits", "eligible", "aifmd", "csdrT1", "td"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "REIT to spółka (zwykle notowana), która posiada i zarządza nieruchomościami przynoszącymi dochód, a w zamian za zwolnienie z podatku dochodowego na poziomie spółki musi wypłacać większość zysków jako dywidendy. Dla inwestora to płynny sposób na ekspozycję na nieruchomości przez akcje.",
      keyFacts: [
        ["Forma", "Spółka akcyjna lub trust ze specjalnym statusem podatkowym (USA — REIT, Francja — SIIC, Niemcy — REIT-AG, Japonia — J-REIT)."],
        ["Warunki statusu (USA)", "Min. 75% aktywów i dochodów z nieruchomości; wypłata co najmniej 90% dochodu podlegającego opodatkowaniu."],
        ["Rodzaje", "Equity REIT (posiadają nieruchomości) i mortgage REIT (finansują nieruchomości — kredyty, MBS)."],
        ["Rynek", "Giełda; obrót jak akcje."],
        ["Rozliczenie", "USA T+1; UE T+2 (od 11.10.2027 T+1)."],
        ["Dochód", "Wysokie dywidendy; opodatkowanie u źródła zależne od kraju i umów podatkowych."],
        ["Kod CFI", "Zwykle <code>ES****</code> (akcje); dla REIT w formie trustu — kategoria <code>C</code>"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Real Estate Investment Trust</em> to wehikuł inwestujący w nieruchomości komercyjne (biura, magazyny, centra handlowe, mieszkania na wynajem, centra danych) lub w finansowanie nieruchomości.</p>" +
            "<p>Kluczowa cecha to <strong>przejrzystość podatkowa</strong>: REIT nie płaci podatku dochodowego od zysków, które wypłaca akcjonariuszom, pod warunkiem spełnienia wymogów co do struktury aktywów, dochodów i wypłat. Podatek płaci inwestor (często jako podatek u źródła).</p>" +
            "<p>Z punktu widzenia funduszu REIT to najczęściej po prostu <a href='#/i/common-stock'>akcja</a> notowanej spółki. Wyjątkiem są REIT w formie otwartego funduszu lub trustu — wtedy trzeba ocenić, czy to fundusz (CIU).</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>REIT pozyskuje kapitał</strong> z emisji akcji i długu, kupuje lub buduje nieruchomości.</li>" +
              "<li><strong>Nieruchomości generują czynsze</strong>; REIT pokrywa koszty, obsługuje dług.</li>" +
              "<li><strong>Wypłata dywidend</strong> — wymagana większość dochodu (np. 90% w USA), zwykle kwartalnie.</li>" +
              "<li><strong>Wycena giełdowa</strong> odbiega od wartości aktywów netto (NAV nieruchomości) — REIT bywają notowane z dyskontem lub premią.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz globalnych akcji (NAV równowartość 300 mln USD) kupuje akcje amerykańskiego REIT za 6 mln USD. Stopa dywidendy 5%.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Udział w NAV</td><td>6 / 300</td><td class='num'>2,0%</td></tr>" +
              "<tr><td>Dywidenda roczna brutto</td><td>6 000 000 × 5%</td><td class='num'>300 000 USD</td></tr>" +
              "<tr><td>Po podatku u źródła 15% (stawka zależna od umowy podatkowej i statusu funduszu)</td><td>300 000 × 85%</td><td class='num'>255 000 USD</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Notowany REIT w formie spółki to zbywalny papier wartościowy — standardowe limity emitenta (5/10/40).</li>" +
              "<li>Fundusz <strong>nie inwestuje w nieruchomości bezpośrednio</strong> (UCITS tego nie może), tylko w akcje.</li>" +
              "<li>Jeśli prospekt ogranicza ekspozycję na sektor nieruchomości, REIT trzeba poprawnie sklasyfikować sektorowo.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> kurs giełdowy jak akcje.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko rynku nieruchomości</strong> — pustostany, czynsze, wartości nieruchomości.</li>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — REIT są wrażliwe na stopy (wycena i koszt długu).</li>" +
              "<li><strong>Ryzyko dźwigni</strong> spółki.</li>" +
              "<li><strong>Ryzyko podatkowe i regulacyjne</strong> — utrata statusu REIT, zmiana stawek podatku u źródła.</li>" +
              "<li>Mortgage REIT — dodatkowo ryzyko kredytowe i przedpłat.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html:
            "<ol>" +
              "<li>Zakup na giełdzie, rozliczenie DvP.</li>" +
              "<li>Dywidendy (często częściowo jako zwrot kapitału), emisje akcji, przejęcia.</li>" +
              "<li>Zdarzenia korporacyjne jak przy akcjach.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. a–d UCITS; art. 2 dyr. 2007/16/WE</span></h4><p>Notowane REIT o formie zamkniętej (spółka) to zbywalne papiery wartościowe. REIT w formie otwartej (z prawem umorzenia) to fundusze — wtedy obowiązują warunki art. 50 ust. 1 lit. e i limity art. 55.</p></div>" +
              "<div class='rule'><h4>Zakaz nieruchomości bezpośrednich</h4><p>UCITS nie może nabywać nieruchomości; ekspozycja możliwa tylko przez dopuszczalne papiery.</p></div>" +
              "<div class='rule'><h4>Limity emitenta i nabycia <span class='law'>art. 52, 56</span></h4><p>Jak przy akcjach zwykłych.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Czy sam REIT jest AIF? Notowane spółki operacyjne zwykle nie są AIF, ale ocena zależy od struktury i prawa krajowego.</li>" +
              "<li>W portfelu AIF — limity według dokumentów; raport Annex IV (ekspozycja na nieruchomości).</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html:
            "<ul>" +
              "<li><strong>Znaczne pakiety</strong> — jak przy akcjach (dla spółek z UE: dyr. 2004/109/WE; dla USA — przepisy SEC).</li>" +
              "<li><strong>MiFIR</strong> — raporty transakcyjne po stronie firmy inwestycyjnej.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong>, <strong>LEI</strong> spółki, ticker i MIC.</li>" +
              "<li><strong>CFI</strong> — zwykle <code>E</code> (Equities), grupa <code>S</code>; REIT jako trust/fundusz — <code>C</code>.</li>" +
              "<li>Klasyfikacja sektorowa (np. GICS Real Estate) — do limitów sektorowych.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Forma prawna: spółka zamknięta (papier) czy fundusz otwarty (CIU)?</li>" +
              "<li>Limity emitenta, art. 56.</li>" +
              "<li>Klasyfikacja sektorowa i limity z prospektu.</li>" +
              "<li>Podatek u źródła od dywidend — poprawne rozliczenie.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Equity REIT / mortgage REIT", "REIT posiadający nieruchomości / finansujący nieruchomości."],
        ["FFO", "Funds From Operations — miara przepływów REIT (zysk bez amortyzacji nieruchomości i zysków ze sprzedaży)."],
        ["Pass-through taxation", "Opodatkowanie na poziomie inwestora zamiast spółki."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A REIT is a company (usually listed) that owns and manages income-producing real estate and, in exchange for exemption from corporate income tax, must pay out most of its profits as dividends. For investors it is a liquid way to gain real estate exposure through shares.",
      keyFacts: [
        ["Form", "Company or trust with special tax status (US — REIT, France — SIIC, Germany — REIT-AG, Japan — J-REIT)."],
        ["Status conditions (US)", "At least 75% of assets and income from real estate; distribution of at least 90% of taxable income."],
        ["Types", "Equity REITs (own property) and mortgage REITs (finance property — loans, MBS)."],
        ["Market", "Exchange; traded like shares."],
        ["Settlement", "US T+1; EU T+2 (T+1 from 11 Oct 2027)."],
        ["Income", "High dividends; withholding tax depends on country and tax treaties."],
        ["CFI code", "Usually <code>ES****</code> (shares); for trust-form REITs — category <code>C</code>"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Real Estate Investment Trust is a vehicle investing in commercial property (offices, warehouses, shopping centres, rental housing, data centres) or in property financing.</p>" +
            "<p>The key feature is <strong>tax transparency</strong>: the REIT pays no income tax on profits it distributes, provided it meets requirements on asset composition, income and distributions. Tax is paid by the investor (often as withholding tax).</p>" +
            "<p>From a fund's perspective a REIT is usually simply a listed company's <a href='#/i/common-stock'>share</a>. The exception is REITs structured as open-ended funds or trusts — then you must assess whether it is a fund (CIU).</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>The REIT raises capital</strong> from share and debt issues, and buys or develops property.</li>" +
              "<li><strong>The property generates rent</strong>; the REIT covers costs and services debt.</li>" +
              "<li><strong>Dividends are paid</strong> — the required majority of income (e.g. 90% in the US), usually quarterly.</li>" +
              "<li><strong>The market price</strong> deviates from the net asset value of the property — REITs can trade at a discount or premium.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A global equity fund (NAV equivalent to USD 300m) buys USD 6m of shares in a US REIT. Dividend yield 5%.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>Share of NAV</td><td>6 / 300</td><td class='num'>2.0%</td></tr>" +
              "<tr><td>Gross annual dividend</td><td>6,000,000 × 5%</td><td class='num'>USD 300,000</td></tr>" +
              "<tr><td>After 15% withholding tax (rate depends on the tax treaty and the fund's status)</td><td>300,000 × 85%</td><td class='num'>USD 255,000</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>A listed REIT in company form is a transferable security — standard issuer limits (5/10/40).</li>" +
              "<li>The fund <strong>does not invest in property directly</strong> (a UCITS cannot), only in shares.</li>" +
              "<li>If the prospectus limits real estate sector exposure, REITs must be classified correctly by sector.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> exchange price, as for shares.</p>" +
            "<ul>" +
              "<li><strong>Property market risk</strong> — vacancies, rents, property values.</li>" +
              "<li><strong>Interest rate risk</strong> — REITs are rate-sensitive (valuation and cost of debt).</li>" +
              "<li><strong>Leverage risk</strong> at company level.</li>" +
              "<li><strong>Tax and regulatory risk</strong> — loss of REIT status, changes in withholding rates.</li>" +
              "<li>Mortgage REITs — also credit and prepayment risk.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html:
            "<ol>" +
              "<li>Purchase on the exchange, DvP settlement.</li>" +
              "<li>Dividends (often partly a return of capital), share issues, acquisitions.</li>" +
              "<li>Corporate actions as for shares.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(a)–(d) UCITS; Art. 2 Dir. 2007/16/EC</span></h4><p>Listed closed-ended REITs (companies) are transferable securities. Open-ended REITs (with redemption rights) are funds — then the Art. 50(1)(e) conditions and Art. 55 limits apply.</p></div>" +
              "<div class='rule'><h4>No direct property</h4><p>A UCITS may not acquire real estate; exposure only through eligible securities.</p></div>" +
              "<div class='rule'><h4>Issuer and acquisition limits <span class='law'>Art. 52, 56</span></h4><p>As for common stock.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Is the REIT itself an AIF? Listed operating companies usually are not, but the assessment depends on structure and national law.</li>" +
              "<li>In an AIF portfolio — limits per the documents; Annex IV report (real estate exposure).</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html:
            "<ul>" +
              "<li><strong>Major holdings</strong> — as for shares (EU companies: Dir. 2004/109/EC; US — SEC rules).</li>" +
              "<li><strong>MiFIR</strong> — transaction reports by the investment firm.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong>, company <strong>LEI</strong>, ticker and MIC.</li>" +
              "<li><strong>CFI</strong> — usually <code>E</code> (Equities), group <code>S</code>; REIT as trust/fund — <code>C</code>.</li>" +
              "<li>Sector classification (e.g. GICS Real Estate) — for sector limits.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Legal form: closed-ended company (security) or open-ended fund (CIU)?</li>" +
              "<li>Issuer limits, Art. 56.</li>" +
              "<li>Sector classification and prospectus limits.</li>" +
              "<li>Dividend withholding tax — correctly processed.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Equity REIT / mortgage REIT", "REIT owning property / financing property."],
        ["FFO", "Funds From Operations — REIT cash flow measure (earnings excluding property depreciation and gains on sale)."],
        ["Pass-through taxation", "Taxation at investor level instead of company level."]
      ]
    }
  }
});

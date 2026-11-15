window.INSTRUMENTS.push({
  id: "closed-end-fund",
  name: "Closed-End Fund",
  aliases: ["Investment Trust", "Listed Investment Company", "CEF", "fundusz zamknięty notowany"],
  market: "exchange",
  asset: { pl: "Fundusze", en: "Funds" },
  sources: ["ucits", "eligible", "aifmd", "csdrT1"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Fundusz zamknięty ma stałą liczbę akcji lub certyfikatów, które nie są umarzane na żądanie inwestora — można je tylko sprzedać na giełdzie. Dlatego cena rynkowa może istotnie odbiegać od wartości aktywów netto (dyskonto lub premia). Przykłady: brytyjskie investment trusts, amerykańskie closed-end funds.",
      keyFacts: [
        ["Forma", "Spółka inwestycyjna (np. UK investment trust — spółka publiczna) lub fundusz kontraktowy."],
        ["Kapitał", "Stały; zmienia się tylko przez nowe emisje lub skup akcji (buyback)."],
        ["Cena vs NAV", "Cena giełdowa ≠ NAV; typowe dyskonto lub premia."],
        ["Dźwignia", "Często dozwolona (gearing) — kredyt lub dług na poziomie funduszu."],
        ["Rynek", "Giełda; rozliczenie jak akcje."],
        ["Status w UE", "Zwykle AIF (zarządzany przez ZAFI)."],
        ["Kod CFI", "Zależnie od formy: <code>E</code> (akcje spółki) lub <code>C</code> (Collective investment vehicles)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Closed-End Fund</em> zbiera kapitał raz (w IPO) i inwestuje go zgodnie z polityką. Inwestor, który chce wyjść, sprzedaje akcje innemu inwestorowi na giełdzie — fundusz nie musi utrzymywać płynności na umorzenia.</p>" +
            "<p>Dzięki temu może inwestować w aktywa mało płynne (private equity, infrastruktura, nieruchomości, kredyty) i stosować dźwignię.</p>" +
            "<p class='formula'>Dyskonto / premia = cena akcji / NAV na akcję − 1</p>" +
            "<p>Różnica względem <a href='#/i/exchange-traded-fund'>ETF</a>: w ETF mechanizm tworzenia i umarzania jednostek utrzymuje cenę blisko NAV, a w funduszu zamkniętym takiego mechanizmu nie ma.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>IPO.</strong> Fundusz emituje akcje i inwestuje pozyskane środki.</li>" +
              "<li><strong>Obrót.</strong> Akcje notowane na giełdzie; cena wynika z popytu i podaży.</li>" +
              "<li><strong>NAV</strong> publikowany okresowo (dziennie, tygodniowo lub rzadziej przy aktywach niepłynnych).</li>" +
              "<li><strong>Zarządzanie dyskontem.</strong> Zarząd może skupować akcje, przeprowadzać oferty przetargowe lub głosowania o kontynuacji.</li>" +
              "<li><strong>Koniec życia</strong> — część funduszy ma termin likwidacji, inne działają bezterminowo.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz UCITS (NAV 200 mln EUR) kupuje akcje brytyjskiego investment trust za 6 mln EUR. NAV na akcję 500 pensów, cena 450 pensów.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Dyskonto do NAV</td><td>450 / 500 − 1</td><td class='num'>−10,0%</td></tr>" +
              "<tr><td>Udział w NAV funduszu</td><td>6 / 200</td><td class='num'>3,0%</td></tr>" +
            "</tbody></table></div>" +
            "<p>Zwrot funduszu zależy od NAV trustu <strong>i</strong> od zmiany dyskonta — gdyby dyskonto spadło do 5%, cena wzrosłaby o ok. 5,6% przy niezmienionym NAV.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Akcje funduszu zamkniętego spełniające warunki dyr. 2007/16/WE to <strong>zbywalne papiery wartościowe</strong> — stosuje się limity art. 52 (5/10/40), a <strong>nie</strong> limity dla funduszy z art. 55.</li>" +
              "<li>To ważne rozróżnienie w systemie: fundusz zamknięty ≠ fundusz otwarty (CIU).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> kurs giełdowy (nie NAV).</p>" +
            "<ul>" +
              "<li><strong>Ryzyko aktywów bazowych</strong>.</li>" +
              "<li><strong>Ryzyko dyskonta</strong> — może się poszerzyć w stresie rynkowym.</li>" +
              "<li><strong>Ryzyko dźwigni</strong> na poziomie funduszu.</li>" +
              "<li><strong>Ryzyko wyceny NAV</strong> — dla aktywów niepłynnych NAV bywa nieaktualny.</li>" +
              "<li><strong>Ryzyko płynności</strong> akcji funduszu.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html:
            "<ol>" +
              "<li>Zakup na giełdzie, rozliczenie DvP.</li>" +
              "<li>Dywidendy, emisje praw, skupy, oferty przetargowe, głosowania o kontynuacji.</li>" +
              "<li>Łączenie lub likwidacja funduszu.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Fundusz zamknięty jako zbywalny papier <span class='law'>art. 2 ust. 2 lit. a–b dyr. 2007/16/WE</span></h4><p>Jednostki funduszy zamkniętych są zbywalnymi papierami, jeśli: spełniają ogólne kryteria z art. 2 ust. 1, podlegają mechanizmom ładu korporacyjnego (dla spółek) lub równoważnym (dla funduszy kontraktowych), a podmiot zarządzający aktywami podlega regulacjom chroniącym inwestorów.</p></div>" +
              "<div class='rule'><h4>Limity <span class='law'>art. 52, 56</span></h4><p>Jak dla papierów wartościowych: 5/10/40 i limity nabycia. Nie wlicza się do limitów 20%/30% dla funduszy z art. 55.</p></div>" +
              "<div class='rule'><h4>Notowanie <span class='law'>art. 50 ust. 1 lit. a–d</span></h4><p>Akcje funduszu notowane na rynku regulowanym lub uznanym; w przeciwnym razie limit 10%.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Sam fundusz zamknięty w UE jest zwykle AIF. Dla AIF inwestującego w inny AIF — limity według dokumentów.</li>" +
              "<li>Dźwigni funduszu docelowego zwykle nie dolicza się do dźwigni AIF inwestora, chyba że inwestor go kontroluje.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html:
            "<ul>" +
              "<li><strong>Znaczne pakiety</strong> — akcje funduszu w formie spółki publicznej podlegają progom zawiadomień jak zwykłe akcje.</li>" +
              "<li><strong>MiFIR</strong> — raporty transakcyjne po stronie firmy inwestycyjnej.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong>, <strong>LEI</strong> funduszu, ticker i MIC.</li>" +
              "<li><strong>CFI</strong> — zależnie od formy: <code>E</code> lub <code>C</code>; sprawdzaj formę prawną, a nie tylko kod.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Fundusz zamknięty czy otwarty? Poprawna klasyfikacja (art. 52 vs art. 55).</li>" +
              "<li>Spełnienie warunków art. 2 ust. 2 dyr. 2007/16/WE (udokumentowane).</li>" +
              "<li>Notowanie na rynku regulowanym/uznanym.</li>" +
              "<li>Limity emitenta i nabycia.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Discount / premium to NAV", "Procentowa różnica między ceną akcji a NAV na akcję."],
        ["Gearing", "Dźwignia funduszu zamkniętego (kredyt, obligacje)."],
        ["Continuation vote", "Głosowanie akcjonariuszy o dalszym istnieniu funduszu."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A closed-end fund has a fixed number of shares or units that are not redeemed at the investor's request — they can only be sold on the exchange. So the market price can deviate significantly from net asset value (a discount or premium). Examples: UK investment trusts, US closed-end funds.",
      keyFacts: [
        ["Form", "Investment company (e.g. UK investment trust — a public company) or contractual fund."],
        ["Capital", "Fixed; changes only through new issues or buybacks."],
        ["Price vs NAV", "Market price ≠ NAV; discounts or premiums are typical."],
        ["Leverage", "Often allowed (gearing) — borrowing or debt at fund level."],
        ["Market", "Exchange; settlement as for shares."],
        ["EU status", "Usually an AIF (managed by an AIFM)."],
        ["CFI code", "Depending on form: <code>E</code> (company shares) or <code>C</code> (Collective investment vehicles)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Closed-End Fund raises capital once (at IPO) and invests it per its policy. An investor who wants out sells shares to another investor on the exchange — the fund does not need to hold liquidity for redemptions.</p>" +
            "<p>This lets it invest in illiquid assets (private equity, infrastructure, property, credit) and use leverage.</p>" +
            "<p class='formula'>Discount / premium = share price / NAV per share − 1</p>" +
            "<p>Difference from an <a href='#/i/exchange-traded-fund'>ETF</a>: in an ETF the creation and redemption mechanism keeps the price close to NAV; a closed-end fund has no such mechanism.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>IPO.</strong> The fund issues shares and invests the proceeds.</li>" +
              "<li><strong>Trading.</strong> Shares are listed; the price comes from supply and demand.</li>" +
              "<li><strong>NAV</strong> published periodically (daily, weekly or less often for illiquid assets).</li>" +
              "<li><strong>Discount management.</strong> The board may buy back shares, run tender offers or hold continuation votes.</li>" +
              "<li><strong>End of life</strong> — some funds have a wind-up date, others are perpetual.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A UCITS fund (NAV EUR 200m) buys EUR 6m of shares in a UK investment trust. NAV per share 500p, price 450p.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>Discount to NAV</td><td>450 / 500 − 1</td><td class='num'>−10.0%</td></tr>" +
              "<tr><td>Share of the fund's NAV</td><td>6 / 200</td><td class='num'>3.0%</td></tr>" +
            "</tbody></table></div>" +
            "<p>The fund's return depends on the trust's NAV <strong>and</strong> on changes in the discount — if the discount narrowed to 5%, the price would rise by about 5.6% with NAV unchanged.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>Closed-end fund shares meeting the Dir. 2007/16/EC conditions are <strong>transferable securities</strong> — Art. 52 limits (5/10/40) apply, <strong>not</strong> the Art. 55 fund limits.</li>" +
              "<li>This is an important distinction in the system: closed-end fund ≠ open-ended fund (CIU).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> exchange price (not NAV).</p>" +
            "<ul>" +
              "<li><strong>Underlying asset risk</strong>.</li>" +
              "<li><strong>Discount risk</strong> — it can widen under market stress.</li>" +
              "<li><strong>Leverage risk</strong> at fund level.</li>" +
              "<li><strong>NAV valuation risk</strong> — for illiquid assets the NAV may be stale.</li>" +
              "<li><strong>Liquidity risk</strong> of the fund's shares.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html:
            "<ol>" +
              "<li>Purchase on the exchange, DvP settlement.</li>" +
              "<li>Dividends, rights issues, buybacks, tender offers, continuation votes.</li>" +
              "<li>Fund merger or liquidation.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Closed-end fund as a transferable security <span class='law'>Art. 2(2)(a)–(b) Dir. 2007/16/EC</span></h4><p>Units in closed-end funds are transferable securities if they meet the general Art. 2(1) criteria, are subject to corporate governance mechanisms (for companies) or equivalent ones (for contractual funds), and the asset manager is subject to investor-protection regulation.</p></div>" +
              "<div class='rule'><h4>Limits <span class='law'>Art. 52, 56</span></h4><p>As for securities: 5/10/40 and acquisition limits. Not counted towards the Art. 55 20%/30% fund limits.</p></div>" +
              "<div class='rule'><h4>Listing <span class='law'>Art. 50(1)(a)–(d)</span></h4><p>Fund shares listed on a regulated or recognised market; otherwise the 10% limit.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>An EU closed-end fund is usually itself an AIF. For an AIF investing in another AIF — limits per its documents.</li>" +
              "<li>The target fund's leverage is usually not added to the investing AIF's leverage, unless the investor controls it.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html:
            "<ul>" +
              "<li><strong>Major holdings</strong> — shares of a fund structured as a public company are subject to notification thresholds like ordinary shares.</li>" +
              "<li><strong>MiFIR</strong> — transaction reports by the investment firm.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong>, fund <strong>LEI</strong>, ticker and MIC.</li>" +
              "<li><strong>CFI</strong> — depending on form: <code>E</code> or <code>C</code>; check the legal form, not just the code.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Closed-end or open-ended? Correct classification (Art. 52 vs Art. 55).</li>" +
              "<li>Art. 2(2) Dir. 2007/16/EC conditions met (documented).</li>" +
              "<li>Listed on a regulated/recognised market.</li>" +
              "<li>Issuer and acquisition limits.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Discount / premium to NAV", "Percentage difference between the share price and NAV per share."],
        ["Gearing", "Leverage of a closed-end fund (borrowing, bonds)."],
        ["Continuation vote", "Shareholder vote on whether the fund continues."]
      ]
    }
  }
});

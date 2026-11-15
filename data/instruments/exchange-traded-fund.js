window.INSTRUMENTS.push({
  id: "exchange-traded-fund",
  name: "Exchange-Traded Fund (ETF)",
  aliases: ["ETF", "UCITS ETF", "fundusz notowany"],
  market: "exchange",
  asset: { pl: "Fundusze", en: "Funds" },
  sources: ["ucits", "eligible", "esma2014", "aifmd", "csdrT1", "sftr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "ETF to fundusz otwarty, którego jednostki są notowane na giełdzie i można je kupować i sprzedawać w ciągu sesji jak akcje. Zwykle odwzorowuje indeks. Cena giełdowa trzyma się blisko wartości aktywów netto dzięki mechanizmowi tworzenia i umarzania jednostek przez uczestników autoryzowanych (AP).",
      keyFacts: [
        ["Rynek", "Giełda (rynek wtórny) + rynek pierwotny tylko dla uczestników autoryzowanych."],
        ["Forma prawna w UE", "Najczęściej UCITS (oznaczenie „UCITS ETF” w nazwie)."],
        ["Replikacja", "Fizyczna (pełna lub próbkowanie) albo syntetyczna (przez Total Return Swap)."],
        ["Rozliczenie", "Jak akcje: T+2 w UE (T+1 od 11.10.2027); dla wielu ETF europejskich w międzynarodowym CSD."],
        ["Cena", "Kurs giełdowy + orientacyjna wartość aktywów netto w ciągu dnia (iNAV); NAV ustalana raz dziennie."],
        ["Koszty", "Opłata roczna (TER) pobierana w funduszu, spread i prowizje przy obrocie."],
        ["Kod CFI", "<code>CE****</code> (Collective investment vehicles – ETF)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Exchange-Traded Fund</em> łączy cechy funduszu i akcji. Jak fundusz ma portfel aktywów, NAV, prospekt i depozytariusza. Jak akcja jest notowany na giełdzie z bieżącą ceną.</p>" +
            "<p>Kluczowe jest istnienie <strong>dwóch rynków</strong>:</p>" +
            "<ul>" +
              "<li><strong>wtórny</strong> — inwestorzy (w tym fundusze) kupują i sprzedają jednostki między sobą na giełdzie, a <em>market makerzy</em> zapewniają płynność;</li>" +
              "<li><strong>pierwotny</strong> — tylko <em>uczestnicy autoryzowani</em> (AP, zwykle banki) tworzą nowe jednostki (<em>creation</em>) lub je umarzają (<em>redemption</em>) bezpośrednio w funduszu, zwykle dużymi blokami (<em>creation units</em>).</li>" +
            "</ul>" +
            "<p>Gdy cena giełdowa jest wyższa od wartości aktywów, AP tworzy jednostki i sprzedaje je na giełdzie. Gdy jest niższa — kupuje je na giełdzie i umarza. Ten arbitraż utrzymuje cenę blisko NAV.</p>" +
            "<p>Nie mylić z <em>ETN</em> i <em>ETC</em> — to papiery dłużne emitenta, a nie jednostki funduszu (osobne karty).</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Tworzenie jednostek.</strong> AP dostarcza do ETF koszyk papierów odpowiadający portfelowi (<em>in kind</em>) lub gotówkę (<em>in cash</em>) i otrzymuje nowe jednostki — np. blok 50 000 sztuk.</li>" +
              "<li><strong>Obrót na giełdzie.</strong> Fundusz kupuje jednostki przez brokera jak akcje. Market maker kwotuje ceny kupna i sprzedaży blisko iNAV.</li>" +
              "<li><strong>Rozliczenie.</strong> DvP w CSD (dla wielu ETF europejskich — Euroclear lub Clearstream jako międzynarodowy CSD).</li>" +
              "<li><strong>Posiadanie.</strong> ETF dystrybucyjny wypłaca dywidendy, a akumulujący je reinwestuje. Koszty (TER) pomniejszają NAV codziennie.</li>" +
              "<li><strong>Wyjście.</strong> Sprzedaż na giełdzie. Inwestor rynku wtórnego zwykle nie może umorzyć jednostek bezpośrednio w funduszu — z wyjątkiem sytuacji zakłóceń rynku (wytyczne ESMA).</li>" +
            "</ol>" +
            "<div class='callout'><strong>Replikacja syntetyczna</strong>ETF syntetyczny trzyma portfel zabezpieczający i zawiera z bankiem <a href='#/i/total-return-swap'>Total Return Swap</a>, który oddaje zwrot z indeksu. Ryzyko kontrahenta swapu jest ograniczone limitami UCITS i zabezpieczeniami.</div>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz UCITS (NAV 200 mln EUR) chce szybko uzyskać ekspozycję na akcje rynków wschodzących. Kupuje 200 000 jednostek UCITS ETF po 50,05 EUR. iNAV w chwili transakcji: 50,00 EUR. Aktywa ETF: 2 mld EUR.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Wartość transakcji</td><td>200 000 × 50,05</td><td class='num'>10 010 000 EUR</td></tr>" +
              "<tr><td>Premia do iNAV</td><td>(50,05 − 50,00) / 50,00</td><td class='num'>0,10%</td></tr>" +
              "<tr><td>Udział w NAV funduszu</td><td>10,01 mln / 200 mln</td><td class='num'>5,0%</td></tr>" +
              "<tr><td>Udział w jednostkach ETF</td><td>(200 000 × 50) / 2 mld</td><td class='num'>0,5%</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Limit na jeden fundusz docelowy: 5,0% NAV wobec maks. <strong>20%</strong> (art. 55 ust. 1) — OK.</li>" +
              "<li>Limit nabycia: 0,5% jednostek ETF wobec maks. <strong>25%</strong> jednostek jednego funduszu (art. 56 ust. 2 lit. c) — OK.</li>" +
              "<li>Czy ETF może sam inwestować najwyżej 10% w inne fundusze (warunek z art. 50 ust. 1 lit. e)? Sprawdza się w prospekcie ETF.</li>" +
              "<li>Czy prospekt funduszu pozwala inwestować łącznie więcej niż 10% NAV w inne fundusze?</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena w funduszu:</strong> zgodnie z polityką wyceny — zwykle kurs zamknięcia z giełdy głównej albo opublikowana NAV ETF.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko rynkowe</strong> indeksu bazowego.</li>" +
              "<li><strong>Tracking error / difference</strong> — różnica między wynikiem ETF a indeksu (koszty, próbkowanie, podatki).</li>" +
              "<li><strong>Premia / dyskonto</strong> — cena giełdowa może odbiegać od NAV, zwłaszcza przy stresie lub gdy rynek bazowy jest zamknięty.</li>" +
              "<li><strong>Płynność</strong> — zależy od płynności aktywów bazowych i market makerów, a nie tylko od obrotu jednostkami.</li>" +
              "<li><strong>Ryzyko kontrahenta</strong> — przy replikacji syntetycznej i pożyczaniu papierów przez ETF.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zakup na giełdzie, rozliczenie T+2 (od 11.10.2027 T+1).</li>" +
              "<li>Dywidendy (ETF dystrybucyjny), zmiany indeksu, zmiany prospektu, łączenie lub likwidacja ETF.</li>" +
              "<li>Sprzedaż na giełdzie; wyjątkowo — umorzenie w funduszu przy zakłóceniach rynku wtórnego.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. e UCITS</span></h4><p>Jednostki UCITS są dopuszczalne. Inne fundusze — tylko jeśli podlegają równoważnemu nadzorowi, chronią inwestorów na poziomie zbliżonym do UCITS, publikują sprawozdania półroczne i roczne, a ich dokumenty pozwalają inwestować najwyżej 10% aktywów w inne fundusze. ETF spoza UE (np. amerykańskie) często nie spełniają tych warunków — wymagają indywidualnej oceny.</p></div>" +
              "<div class='rule'><h4>Limity <span class='law'>art. 55</span></h4><p>Maks. 20% NAV w jednym funduszu docelowym; łącznie maks. 30% NAV w funduszach innych niż UCITS. Aktywów funduszu docelowego nie łączy się z limitami emitenta z art. 52.</p></div>" +
              "<div class='rule'><h4>Limit nabycia <span class='law'>art. 56 ust. 2 lit. c</span></h4><p>Maks. 25% jednostek jednego funduszu docelowego.</p></div>" +
              "<div class='rule'><h4>Fundusze tej samej grupy <span class='law'>art. 55 ust. 3</span></h4><p>Przy inwestycji w fundusze zarządzane przez tę samą spółkę lub grupę nie pobiera się opłat za nabycie i umorzenie. Prospekt ujawnia maksymalne opłaty za zarządzanie funduszy docelowych.</p></div>" +
              "<div class='rule'><h4>UCITS ETF <span class='law'>ESMA/2014/937</span></h4><p>Oznaczenie „UCITS ETF” w nazwie, ujawnienie polityki przejrzystości portfela i sposobu publikacji iNAV, opis tracking error. Gdy cena giełdowa istotnie odbiega od NAV, inwestorzy rynku wtórnego mogą umarzać jednostki bezpośrednio w ETF.</p></div>" +
              "<div class='rule'><h4>Fundusz docelowy w portfelu</h4><p>Domyślny limit 10% NAV łącznie w inne fundusze obowiązuje, jeśli prospekt nie przewiduje więcej. Większe zaangażowanie wymaga ujawnienia w polityce inwestycyjnej.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Dyrektywa nie ustala limitów inwestycji w fundusze — wynikają z dokumentów AIF i prawa krajowego.</li>" +
              "<li>ETF opłacony gotówką nie zwiększa dźwigni AIF (wartość rynkowa w ekspozycji). AIFM zwykle nie musi liczyć dźwigni wewnątrz ETF, chyba że kontroluje fundusz docelowy lub jego dokumenty tego wymagają.</li>" +
              "<li>Raport Annex IV: ekspozycje na fundusze.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie i przejrzystość",
          html:
            "<ul>" +
              "<li><strong>Brak raportowania EMIR</strong> — jednostki ETF nie są derywatem.</li>" +
              "<li><strong>MiFIR</strong> — raporty transakcyjne po stronie firmy inwestycyjnej wykonującej zlecenie.</li>" +
              "<li><strong>SFTR</strong> — jeśli fundusz pożycza jednostki ETF (securities lending), transakcja podlega raportowaniu.</li>" +
              "<li>Sprawozdania funduszu: ujawnienie inwestycji w inne fundusze i ich opłat.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> — jeden dla klasy jednostek, niezależnie od liczby giełd.</li>" +
              "<li><strong>Ticker i MIC</strong> — różne dla każdej giełdy i waluty notowania.</li>" +
              "<li><strong>CFI</strong> — kategoria <code>C</code> (Collective investment vehicles), grupa <code>E</code> (Exchange-traded funds).</li>" +
              "<li><strong>LEI</strong> ETF (lub jego subfunduszu) — do limitów art. 55–56.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>ETF to UCITS lub fundusz spełniający warunki art. 50 ust. 1 lit. e?</li>" +
              "<li>Fundusz docelowy inwestuje najwyżej 10% w inne fundusze?</li>" +
              "<li>Limit 20% na jeden fundusz, 30% na fundusze nie-UCITS, łączny limit z prospektu.</li>" +
              "<li>Limit nabycia 25% jednostek jednego funduszu (na poziomie spółki zarządzającej, wszystkie fundusze).</li>" +
              "<li>Opłaty przy funduszach z tej samej grupy.</li>" +
              "<li>Klasyfikacja: ETF vs ETN/ETC (papier dłużny) — inne limity.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Authorised Participant (AP)", "Instytucja uprawniona do tworzenia i umarzania jednostek ETF na rynku pierwotnym."],
        ["Creation unit", "Minimalny blok jednostek tworzonych lub umarzanych na rynku pierwotnym."],
        ["iNAV", "Indicative NAV — szacunkowa wartość aktywów netto na jednostkę, publikowana w ciągu sesji."],
        ["Tracking difference / error", "Różnica wyniku ETF i indeksu / zmienność tej różnicy."],
        ["Physical vs synthetic replication", "Posiadanie składników indeksu vs uzyskanie zwrotu przez swap."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An ETF is an open-ended fund whose units are listed on an exchange and can be bought and sold during the trading day like shares. It usually tracks an index. The market price stays close to net asset value through the creation and redemption of units by authorised participants (APs).",
      keyFacts: [
        ["Market", "Exchange (secondary market) + primary market for authorised participants only."],
        ["Legal form in the EU", "Most often UCITS (\"UCITS ETF\" in the name)."],
        ["Replication", "Physical (full or sampling) or synthetic (via a Total Return Swap)."],
        ["Settlement", "Like shares: T+2 in the EU (T+1 from 11 Oct 2027); many European ETFs settle in an international CSD."],
        ["Price", "Exchange price + intraday indicative NAV (iNAV); NAV struck once a day."],
        ["Costs", "Annual fee (TER) charged inside the fund, spread and commissions when trading."],
        ["CFI code", "<code>CE****</code> (Collective investment vehicles – ETF)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>An Exchange-Traded Fund combines features of a fund and a share. Like a fund, it has a portfolio, a NAV, a prospectus and a depositary. Like a share, it is listed on an exchange with a live price.</p>" +
            "<p>The key is that there are <strong>two markets</strong>:</p>" +
            "<ul>" +
              "<li><strong>secondary</strong> — investors (including funds) buy and sell units among themselves on the exchange, with market makers providing liquidity;</li>" +
              "<li><strong>primary</strong> — only authorised participants (APs, usually banks) create new units or redeem them directly with the fund, usually in large blocks (creation units).</li>" +
            "</ul>" +
            "<p>When the exchange price is above asset value, an AP creates units and sells them on the exchange. When it is below, it buys them on the exchange and redeems them. This arbitrage keeps the price close to NAV.</p>" +
            "<p>Not to be confused with ETNs and ETCs — those are an issuer's debt securities, not fund units (separate cards).</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Creation.</strong> The AP delivers to the ETF a basket of securities matching the portfolio (in kind) or cash (in cash) and receives new units — e.g. a block of 50,000.</li>" +
              "<li><strong>Exchange trading.</strong> The fund buys units through a broker like shares. A market maker quotes bid and offer prices close to iNAV.</li>" +
              "<li><strong>Settlement.</strong> DvP at the CSD (for many European ETFs — Euroclear or Clearstream as international CSD).</li>" +
              "<li><strong>Holding.</strong> A distributing ETF pays out dividends; an accumulating one reinvests them. Costs (TER) are deducted from NAV daily.</li>" +
              "<li><strong>Exit.</strong> Sale on the exchange. A secondary-market investor usually cannot redeem directly with the fund — except when the market is disrupted (ESMA guidelines).</li>" +
            "</ol>" +
            "<div class='callout'><strong>Synthetic replication</strong>A synthetic ETF holds a collateral portfolio and enters a <a href='#/i/total-return-swap'>Total Return Swap</a> with a bank that pays the index return. The swap counterparty risk is capped by UCITS limits and collateral.</div>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A UCITS fund (NAV EUR 200m) wants quick exposure to emerging market equities. It buys 200,000 units of a UCITS ETF at EUR 50.05. iNAV at the time of the trade: EUR 50.00. ETF assets: EUR 2bn.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>Trade value</td><td>200,000 × 50.05</td><td class='num'>EUR 10,010,000</td></tr>" +
              "<tr><td>Premium to iNAV</td><td>(50.05 − 50.00) / 50.00</td><td class='num'>0.10%</td></tr>" +
              "<tr><td>Share of the fund's NAV</td><td>10.01m / 200m</td><td class='num'>5.0%</td></tr>" +
              "<tr><td>Share of the ETF's units</td><td>(200,000 × 50) / 2bn</td><td class='num'>0.5%</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>Single target fund limit: 5.0% of NAV vs a maximum of <strong>20%</strong> (Art. 55(1)) — OK.</li>" +
              "<li>Acquisition limit: 0.5% of the ETF's units vs a maximum of <strong>25%</strong> of a single fund's units (Art. 56(2)(c)) — OK.</li>" +
              "<li>Can the ETF itself invest at most 10% in other funds (the Art. 50(1)(e) condition)? Checked in the ETF's prospectus.</li>" +
              "<li>Does the fund's prospectus allow more than 10% of NAV in other funds in total?</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation in the fund:</strong> per the valuation policy — usually the closing price on the main exchange or the ETF's published NAV.</p>" +
            "<ul>" +
              "<li><strong>Market risk</strong> of the underlying index.</li>" +
              "<li><strong>Tracking error / difference</strong> — difference between ETF and index performance (costs, sampling, taxes).</li>" +
              "<li><strong>Premium / discount</strong> — the exchange price may deviate from NAV, especially under stress or when the underlying market is closed.</li>" +
              "<li><strong>Liquidity</strong> — depends on the liquidity of the underlying assets and the market makers, not only on unit trading volume.</li>" +
              "<li><strong>Counterparty risk</strong> — in synthetic replication and when the ETF lends securities.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Purchase on the exchange, T+2 settlement (T+1 from 11 Oct 2027).</li>" +
              "<li>Dividends (distributing ETF), index changes, prospectus changes, ETF mergers or liquidation.</li>" +
              "<li>Sale on the exchange; exceptionally — redemption with the fund when the secondary market is disrupted.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(e) UCITS</span></h4><p>UCITS units are eligible. Other funds only if they are subject to equivalent supervision, protect investors at a level similar to UCITS, publish half-yearly and annual reports, and their documents allow at most 10% of assets in other funds. Non-EU ETFs (e.g. US ones) often fail these conditions — they need a case-by-case assessment.</p></div>" +
              "<div class='rule'><h4>Limits <span class='law'>Art. 55</span></h4><p>Max 20% of NAV in a single target fund; in total max 30% of NAV in non-UCITS funds. The target fund's assets are not combined with the Art. 52 issuer limits.</p></div>" +
              "<div class='rule'><h4>Acquisition limit <span class='law'>Art. 56(2)(c)</span></h4><p>Max 25% of the units of a single target fund.</p></div>" +
              "<div class='rule'><h4>Funds of the same group <span class='law'>Art. 55(3)</span></h4><p>When investing in funds managed by the same company or group, no subscription or redemption fees may be charged. The prospectus discloses the maximum management fees of target funds.</p></div>" +
              "<div class='rule'><h4>UCITS ETF <span class='law'>ESMA/2014/937</span></h4><p>\"UCITS ETF\" identifier in the name, disclosure of the portfolio transparency policy and how iNAV is published, description of tracking error. When the exchange price deviates significantly from NAV, secondary-market investors may redeem units directly with the ETF.</p></div>" +
              "<div class='rule'><h4>Target fund in the portfolio</h4><p>The default limit of 10% of NAV in other funds in total applies unless the prospectus allows more. Higher exposure must be disclosed in the investment policy.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>The Directive sets no limits on investing in funds — they come from the AIF's documents and national law.</li>" +
              "<li>An ETF paid in cash does not increase AIF leverage (market value enters exposure). The AIFM usually need not compute leverage inside the ETF unless it controls the target fund or its documents require it.</li>" +
              "<li>Annex IV report: fund exposures.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting and transparency",
          html:
            "<ul>" +
              "<li><strong>No EMIR reporting</strong> — ETF units are not a derivative.</li>" +
              "<li><strong>MiFIR</strong> — transaction reports by the investment firm executing the order.</li>" +
              "<li><strong>SFTR</strong> — if the fund lends ETF units (securities lending), the trade is reportable.</li>" +
              "<li>Fund reports: disclosure of investments in other funds and their fees.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> — one per share class, regardless of the number of listings.</li>" +
              "<li><strong>Ticker and MIC</strong> — different for each exchange and trading currency.</li>" +
              "<li><strong>CFI</strong> — category <code>C</code> (Collective investment vehicles), group <code>E</code> (Exchange-traded funds).</li>" +
              "<li>ETF (or sub-fund) <strong>LEI</strong> — for the Art. 55–56 limits.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Is the ETF a UCITS or a fund meeting Art. 50(1)(e)?</li>" +
              "<li>Does the target fund invest at most 10% in other funds?</li>" +
              "<li>20% single fund limit, 30% non-UCITS limit, overall limit from the prospectus.</li>" +
              "<li>25% acquisition limit per fund (at management company level, all funds).</li>" +
              "<li>Fees for funds of the same group.</li>" +
              "<li>Classification: ETF vs ETN/ETC (debt security) — different limits.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Authorised Participant (AP)", "Institution allowed to create and redeem ETF units on the primary market."],
        ["Creation unit", "Minimum block of units created or redeemed on the primary market."],
        ["iNAV", "Indicative NAV — estimated net asset value per unit, published during the trading day."],
        ["Tracking difference / error", "Difference between ETF and index performance / volatility of that difference."],
        ["Physical vs synthetic replication", "Holding the index constituents vs obtaining the return via a swap."]
      ]
    }
  }
});

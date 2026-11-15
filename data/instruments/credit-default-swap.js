window.INSTRUMENTS.push({
  id: "credit-default-swap",
  name: "Credit Default Swap",
  aliases: ["CDS", "Single-Name CDS", "Index CDS", "iTraxx", "CDX"],
  market: "otc",
  asset: { pl: "Derywaty kredytowe", en: "Credit derivatives" },
  sources: ["ucits", "eligible", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "marginRts", "ssr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Credit Default Swap to umowa OTC przypominająca ubezpieczenie od niewypłacalności emitenta. Kupujący ochronę płaci okresową premię, a sprzedający ochronę wypłaca odszkodowanie, jeśli wobec wskazanego podmiotu (reference entity) wystąpi zdarzenie kredytowe, np. upadłość lub brak płatności.",
      keyFacts: [
        ["Rynek", "OTC — single-name bilateralnie, indeksy CDS w dużej części przez CCP (ICE Clear Credit, LCH CDSClear)."],
        ["Dokumentacja", "ISDA Master Agreement + CSA, ISDA 2014 Credit Derivatives Definitions."],
        ["Strony", "Protection buyer (płaci premię) i protection seller (wypłaca przy zdarzeniu kredytowym)."],
        ["Premia", "Standardowy kupon (w Europie zwykle 100 lub 500 pb rocznie, płatny kwartalnie) plus płatność upfront wyrównująca do spreadu rynkowego."],
        ["Daty", "Standardowe daty zapadalności i płatności: 20 marca, czerwca, września, grudnia."],
        ["Rozliczenie zdarzenia", "Zwykle gotówkowe, na podstawie aukcji ISDA: nominał × (1 − recovery rate)."],
        ["Kod CFI", "<code>SC****</code> (Swaps – Credit)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p>W <em>Credit Default Swap</em> strony przenoszą między sobą <strong>ryzyko kredytowe</strong> konkretnego podmiotu (spółki, państwa) albo koszyka podmiotów (indeks CDS, np. iTraxx Europe, CDX), bez przenoszenia samych obligacji.</p>" +
            "<ul>" +
              "<li><strong>Kupujący ochronę</strong> płaci premię. Ekonomicznie ma pozycję <strong>krótką</strong> w ryzyku kredytowym — zarabia, gdy sytuacja emitenta się pogarsza. Może tak zabezpieczać posiadane obligacje.</li>" +
              "<li><strong>Sprzedający ochronę</strong> dostaje premię i przejmuje ryzyko. Ekonomicznie ma pozycję <strong>długą</strong>, podobną do posiadania obligacji emitenta, ale bez jej kupowania.</li>" +
            "</ul>" +
            "<p><strong>Zdarzenia kredytowe</strong> (credit events) określają definicje ISDA: upadłość, brak płatności, restrukturyzacja zadłużenia (zależnie od rynku i typu podmiotu), a dla państw także odrzucenie długu lub moratorium. O wystąpieniu zdarzenia rozstrzyga <em>Credit Derivatives Determinations Committee</em>, a nie strony umowy.</p>" +
            "<p>CDS nie wymaga posiadania obligacji. CDS kupiony bez ekspozycji na emitenta to tzw. <em>naked CDS</em>, czyli spekulacja na pogorszenie kredytu.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Podmiot referencyjny, seniority długu (np. senior unsecured), nominał, termin (najczęściej 5 lat), standardowy kupon. Rynek kwotuje <strong>spread</strong> — premię, przy której CDS byłby wart zero.</li>" +
              "<li><strong>Upfront.</strong> Ponieważ kupon jest standardowy, różnicę między spreadem rynkowym a kuponem wyrównuje się jednorazową płatnością:" +
                "<p class='formula'>Upfront ≈ (spread − kupon) × RPV01 × nominał</p>" +
                "RPV01 to wartość bieżąca 1 pb rocznej premii przez cały okres, uwzględniająca prawdopodobieństwo niewypłacalności (dla 5 lat zwykle ok. 4–4,7).</li>" +
              "<li><strong>Premie kwartalne.</strong> Kupujący płaci kupon kwartalnie (ACT/360) w standardowych datach.</li>" +
              "<li><strong>Wycena.</strong> Gdy spread rośnie, CDS zyskuje dla kupującego ochronę. Strony wymieniają VM według CSA lub z CCP.</li>" +
              "<li><strong>Zdarzenie kredytowe.</strong> Determinations Committee potwierdza zdarzenie, ISDA organizuje <strong>aukcję</strong>, która ustala cenę długu po niewypłacalności (recovery rate, R). Sprzedający płaci kupującemu nominał × (1 − R), a kupujący dopłaca narosłą premię. CDS wygasa (dla indeksu — dla tej nazwy, reszta trwa ze zmniejszonym nominałem).</li>" +
              "<li><strong>Brak zdarzenia.</strong> CDS wygasa w terminie; sprzedający zatrzymuje premie.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz obligacji (NAV 100 mln EUR) ma obligacje spółki X o nominale 5 mln EUR i obawia się pogorszenia jej kondycji. Kupuje 5-letnią ochronę: nominał 5 mln EUR, kupon 100 pb, spread rynkowy 150 pb, RPV01 ≈ 4,5.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Upfront płacony przez fundusz</td><td>(1,50% − 1,00%) × 4,5 × 5 000 000</td><td class='num'>≈ 112 500 EUR</td></tr>" +
              "<tr><td>Premia kwartalna (91 dni)</td><td>5 000 000 × 1,00% × 91/360</td><td class='num'>12 638,89 EUR</td></tr>" +
              "<tr><td>Zdarzenie kredytowe, aukcja: recovery 40%</td><td>5 000 000 × (1 − 40%)</td><td class='num'>3 000 000 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<p>Obligacje spółki X po niewypłacalności są warte ok. 40% nominału, czyli 2 mln EUR (strata 3 mln). Wypłata z CDS (3 mln EUR, minus narosła premia) kompensuje tę stratę.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja funduszu</th><th>Ekspozycja w metodzie zaangażowania (CESR/10-788)</th></tr></thead><tbody>" +
              "<tr><td>Kupujący ochronę (jak w przykładzie)</td><td>Wartość rynkowa referencyjnego aktywa bazowego</td></tr>" +
              "<tr><td>Sprzedający ochronę</td><td>Wyższa z: wartość rynkowa aktywa bazowego albo nominał CDS</td></tr>" +
            "</tbody></table></div>" +
            "<p>Gdyby fundusz <strong>sprzedał</strong> ochronę na 5 mln EUR na spółkę X, miałby syntetyczną ekspozycję na X w wysokości co najmniej 5% NAV. Taka ekspozycja <strong>wlicza się do limitów emitenta</strong> (5/10/40 i 20%) razem z obligacjami X w portfelu.</p>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> standardowy model ISDA (CDS Standard Model) na podstawie spreadu rynkowego i założonego recovery (zwykle 40% dla senior unsecured).</p>" +
            "<ul>" +
              "<li><strong>Ryzyko kredytowe podmiotu referencyjnego</strong> — dla sprzedającego: strata do nominał × (1 − R).</li>" +
              "<li><strong>Ryzyko spreadu</strong> — zmiana wyceny przy zmianie postrzeganego ryzyka, bez zdarzenia kredytowego.</li>" +
              "<li><strong>Ryzyko kontrahenta</strong> — dla kupującego ochronę szczególnie groźne, gdy kontrahent jest skorelowany z podmiotem referencyjnym (<em>wrong-way risk</em>).</li>" +
              "<li><strong>Ryzyko bazy</strong> — różnica między spreadem CDS a spreadem obligacji; niedopasowanie seniority lub terminu.</li>" +
              "<li><strong>Ryzyko prawne</strong> — czy dane zdarzenie (np. restrukturyzacja) zostanie uznane za zdarzenie kredytowe.</li>" +
              "<li><strong>Ryzyko płynności</strong> — single-name CDS na mniejsze podmioty bywają mało płynne.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie, potwierdzenie (DTCC), clearing indeksów objętych obowiązkiem.</li>" +
              "<li>Rozliczenie upfront (zwykle T+3 dla standardowych CDS).</li>" +
              "<li>Kwartalne premie, codzienna wycena, VM i IM.</li>" +
              "<li>Zdarzenia: ogłoszenie przez Determinations Committee, aukcja, rozliczenie gotówkowe; dla indeksów — redukcja nominału.</li>" +
              "<li>Dla indeksów: co pół roku nowa seria (<em>roll</em>), stare serie nadal istnieją.</li>" +
              "<li>Zapadalność albo wcześniejsze zamknięcie.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność derywatów kredytowych <span class='law'>art. 50 ust. 1 lit. g UCITS; art. 8 dyr. 2007/16/WE</span></h4><p>Dopuszczalne, jeśli pozwalają przenieść ryzyko kredytowe aktywa niezależnie od innych ryzyk, nie prowadzą do dostawy lub przeniesienia aktywów niedopuszczalnych, spełniają kryteria dla derywatów OTC, a ich ryzyka są ujęte w procesie zarządzania ryzykiem.</p></div>" +
              "<div class='rule'><h4>Look-through do emitenta <span class='law'>art. 51 ust. 3 akapit 2</span></h4><p>Ekspozycja na aktywa bazowe derywatów nie może łącznie przekroczyć limitów z art. 52. Sprzedana ochrona na spółkę X jest ekspozycją na X. Dla indeksów CDS spełniających kryteria indeksu finansowego nie stosuje się look-through.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>CESR/10-788</span></h4><p>Sprzedający: wyższa z wartości rynkowej aktywa referencyjnego i nominału. Kupujący: wartość rynkowa aktywa referencyjnego. Kupno ochrony na posiadane obligacje można kompensować jako hedging na warunkach wytycznych.</p></div>" +
              "<div class='rule'><h4>Limit kontrahenta <span class='law'>art. 52 ust. 1–2</span></h4><p>10% / 5% NAV dla CDS nierozliczanych przez CCP autoryzowaną lub uznaną; limit łączny 20%.</p></div>" +
              "<div class='rule'><h4>Pokrycie</h4><p>Sprzedający ochronę musi mieć aktywa płynne na pokrycie potencjalnej wypłaty.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: konwersja jak w UCITS — sprzedający: wyższa z wartości rynkowej aktywa referencyjnego i nominału; kupujący: wartość rynkowa aktywa referencyjnego.</li>" +
              "<li>Limity koncentracji na emitenta i kontrahenta — według dokumentów AIF.</li>" +
              "<li>Raport Annex IV obejmuje ekspozycje z CDS (single-name, indeksy, sovereign).</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR, SSR i raportowanie",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Obowiązek rozliczania <span class='law'>art. 4 EMIR; rozp. 2016/592</span></h4><p>Obejmuje indeksy iTraxx Europe Main i iTraxx Europe Crossover (5 lat, EUR) — dla kontrahentów powyżej progów. Single-name CDS nie podlegają obowiązkowi.</p></div>" +
              "<div class='rule'><h4>Depozyty <span class='law'>rozp. 2016/2251</span></h4><p>Dla CDS nierozliczanych centralnie: VM między FC, IM powyżej progu AANA.</p></div>" +
              "<div class='rule'><h4>Zakaz niekrytych CDS na dług państw <span class='law'>art. 14 SSR</span></h4><p>Nie wolno zawierać CDS na dług państwa członkowskiego UE, jeśli kupujący ochronę nie ma odpowiadającej ekspozycji (obligacje tego państwa lub aktywa z nim skorelowane). Pozycje netto w sovereign CDS podlegają też zgłoszeniu.</p></div>" +
              "<div class='rule'><h4>Raportowanie <span class='law'>art. 9 EMIR</span></h4><p>Do T+1: UTI, UPI, LEI, podmiot referencyjny, nominał, kupon, upfront, wycena, zabezpieczenia.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>RED code</strong> — kod podmiotu i obligacji referencyjnej używany w rynku CDS.</li>" +
              "<li><strong>LEI</strong> podmiotu referencyjnego (do limitów emitenta) i kontrahenta.</li>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB); <strong>ISIN OTC</strong> dla instrumentów notowanych na platformach.</li>" +
              "<li><strong>CFI</strong> — <code>S</code> (Swaps), grupa <code>C</code> (Credit).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Kierunek pozycji (kupno / sprzedaż ochrony) poprawnie zmapowany w systemie limitów.</li>" +
              "<li>Sprzedana ochrona wliczona do limitów emitenta (5/10/40, 20%) i grupy.</li>" +
              "<li>Ekspozycja całkowita według konwersji CESR; pokrycie dla sprzedanej ochrony.</li>" +
              "<li>Sovereign CDS: czy kupno ochrony jest pokryte (SSR art. 14)?</li>" +
              "<li>Status clearingu indeksów, limit kontrahenta dla bilateralnych.</li>" +
              "<li>Raport EMIR do T+1; monitoring zdarzeń kredytowych i aukcji.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Reference entity", "Podmiot, którego ryzyko kredytowe jest przedmiotem CDS."],
        ["Credit event", "Zdarzenie kredytowe uruchamiające wypłatę (upadłość, brak płatności, restrukturyzacja itd.)."],
        ["Recovery rate", "Odzysk — cena długu po niewypłacalności, ustalona na aukcji ISDA."],
        ["Upfront", "Jednorazowa płatność wyrównująca różnicę między standardowym kuponem a spreadem rynkowym."],
        ["Wrong-way risk", "Sytuacja, gdy ryzyko kontrahenta rośnie razem z ryzykiem, przed którym ma chronić transakcja."],
        ["Naked CDS", "Kupno ochrony bez posiadania ekspozycji na podmiot referencyjny."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A credit default swap is an OTC contract that works like insurance against an issuer's default. The protection buyer pays a periodic premium, and the protection seller pays out if a credit event, such as bankruptcy or failure to pay, occurs for the named reference entity.",
      keyFacts: [
        ["Market", "OTC — single names bilateral, index CDS largely cleared through CCPs (ICE Clear Credit, LCH CDSClear)."],
        ["Documentation", "ISDA Master Agreement + CSA, 2014 ISDA Credit Derivatives Definitions."],
        ["Parties", "Protection buyer (pays premium) and protection seller (pays on a credit event)."],
        ["Premium", "Standard coupon (in Europe usually 100 or 500 bp a year, paid quarterly) plus an upfront payment to match the market spread."],
        ["Dates", "Standard maturity and payment dates: 20 March, June, September, December."],
        ["Credit event settlement", "Usually cash, based on the ISDA auction: notional × (1 − recovery rate)."],
        ["CFI code", "<code>SC****</code> (Swaps – Credit)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>In a Credit Default Swap the parties transfer the <strong>credit risk</strong> of a specific entity (company, sovereign) or a basket of entities (index CDS, e.g. iTraxx Europe, CDX) without transferring the bonds themselves.</p>" +
            "<ul>" +
              "<li><strong>The protection buyer</strong> pays the premium. Economically it is <strong>short</strong> credit risk — it gains when the issuer deteriorates. It can use this to hedge bonds it holds.</li>" +
              "<li><strong>The protection seller</strong> receives the premium and takes on the risk. Economically it is <strong>long</strong>, similar to holding the issuer's bonds without buying them.</li>" +
            "</ul>" +
            "<p><strong>Credit events</strong> are set by the ISDA definitions: bankruptcy, failure to pay, debt restructuring (depending on market and entity type), and for sovereigns also repudiation or moratorium. Whether an event has occurred is decided by the Credit Derivatives Determinations Committee, not by the parties.</p>" +
            "<p>A CDS does not require holding the bonds. A CDS bought without exposure to the issuer is a naked CDS — a bet on credit deterioration.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> Reference entity, seniority (e.g. senior unsecured), notional, maturity (most often 5 years), standard coupon. The market quotes a <strong>spread</strong> — the premium at which the CDS would be worth zero.</li>" +
              "<li><strong>Upfront.</strong> Because the coupon is standard, the difference between the market spread and the coupon is settled with a one-off payment:" +
                "<p class='formula'>Upfront ≈ (spread − coupon) × RPV01 × notional</p>" +
                "RPV01 is the present value of 1 bp of annual premium over the life, allowing for default probability (for 5 years typically about 4–4.7).</li>" +
              "<li><strong>Quarterly premiums.</strong> The buyer pays the coupon quarterly (ACT/360) on the standard dates.</li>" +
              "<li><strong>Valuation.</strong> When the spread widens, the CDS gains value for the protection buyer. The parties exchange VM under the CSA or with the CCP.</li>" +
              "<li><strong>Credit event.</strong> The Determinations Committee confirms the event and ISDA runs an <strong>auction</strong> that sets the post-default price of the debt (recovery rate, R). The seller pays the buyer notional × (1 − R), and the buyer pays accrued premium. The CDS terminates (for an index — for that name only; the rest continues with a reduced notional).</li>" +
              "<li><strong>No event.</strong> The CDS expires at maturity; the seller keeps the premiums.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A bond fund (NAV EUR 100m) holds EUR 5m nominal of company X bonds and is worried about X's credit. It buys 5-year protection: EUR 5m notional, 100 bp coupon, 150 bp market spread, RPV01 ≈ 4.5.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>Upfront paid by the fund</td><td>(1.50% − 1.00%) × 4.5 × 5,000,000</td><td class='num'>≈ EUR 112,500</td></tr>" +
              "<tr><td>Quarterly premium (91 days)</td><td>5,000,000 × 1.00% × 91/360</td><td class='num'>EUR 12,638.89</td></tr>" +
              "<tr><td>Credit event, auction: 40% recovery</td><td>5,000,000 × (1 − 40%)</td><td class='num'>EUR 3,000,000</td></tr>" +
            "</tbody></table></div>" +
            "<p>After default, X's bonds are worth about 40% of nominal, i.e. EUR 2m (a EUR 3m loss). The CDS payout (EUR 3m, less accrued premium) offsets that loss.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Fund position</th><th>Commitment exposure (CESR/10-788)</th></tr></thead><tbody>" +
              "<tr><td>Protection buyer (as in the example)</td><td>Market value of the underlying reference asset</td></tr>" +
              "<tr><td>Protection seller</td><td>Higher of: market value of the underlying asset or CDS notional</td></tr>" +
            "</tbody></table></div>" +
            "<p>Had the fund <strong>sold</strong> EUR 5m of protection on company X, it would have synthetic exposure to X of at least 5% of NAV. That exposure <strong>counts towards the issuer limits</strong> (5/10/40 and 20%) together with any X bonds in the portfolio.</p>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> the ISDA CDS Standard Model, using the market spread and an assumed recovery (usually 40% for senior unsecured).</p>" +
            "<ul>" +
              "<li><strong>Reference entity credit risk</strong> — for the seller: loss up to notional × (1 − R).</li>" +
              "<li><strong>Spread risk</strong> — value changes as perceived risk changes, without any credit event.</li>" +
              "<li><strong>Counterparty risk</strong> — especially dangerous for the protection buyer when the counterparty is correlated with the reference entity (wrong-way risk).</li>" +
              "<li><strong>Basis risk</strong> — difference between CDS and bond spreads; seniority or maturity mismatch.</li>" +
              "<li><strong>Legal risk</strong> — whether a given event (e.g. a restructuring) will count as a credit event.</li>" +
              "<li><strong>Liquidity risk</strong> — single-name CDS on smaller names can be illiquid.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution, confirmation (DTCC), clearing for indices under the obligation.</li>" +
              "<li>Upfront settlement (usually T+3 for standard CDS).</li>" +
              "<li>Quarterly premiums, daily valuation, VM and IM.</li>" +
              "<li>Events: Determinations Committee announcement, auction, cash settlement; for indices — notional reduction.</li>" +
              "<li>For indices: a new series every six months (roll); old series continue to exist.</li>" +
              "<li>Maturity or early termination.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility of credit derivatives <span class='law'>Art. 50(1)(g) UCITS; Art. 8 Dir. 2007/16/EC</span></h4><p>Eligible if they allow the credit risk of an asset to be transferred independently of other risks, do not result in delivery or transfer of ineligible assets, meet the OTC derivative criteria, and their risks are captured by the risk management process.</p></div>" +
              "<div class='rule'><h4>Look-through to the issuer <span class='law'>Art. 51(3), second subpara.</span></h4><p>Exposure to the underlying assets of derivatives must not exceed, in aggregate, the Art. 52 limits. Protection sold on company X is exposure to X. Index CDS that meet the financial index criteria are not looked through.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Seller: higher of the market value of the reference asset and the notional. Buyer: market value of the reference asset. Protection bought on bonds held may be netted as a hedge under the guidelines.</p></div>" +
              "<div class='rule'><h4>Counterparty limit <span class='law'>Art. 52(1)–(2)</span></h4><p>10% / 5% of NAV for CDS not cleared through an authorised or recognised CCP; 20% combined limit.</p></div>" +
              "<div class='rule'><h4>Cover</h4><p>A protection seller must hold liquid assets to cover the potential payout.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: conversion as in UCITS — seller: higher of the reference asset's market value and the notional; buyer: market value of the reference asset.</li>" +
              "<li>Issuer and counterparty concentration limits — per the AIF's documents.</li>" +
              "<li>The Annex IV report covers CDS exposures (single-name, index, sovereign).</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR, SSR and reporting",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Clearing obligation <span class='law'>Art. 4 EMIR; Reg. 2016/592</span></h4><p>Covers the iTraxx Europe Main and iTraxx Europe Crossover indices (5-year, EUR) — for counterparties above the thresholds. Single-name CDS are not subject to the obligation.</p></div>" +
              "<div class='rule'><h4>Margin <span class='law'>Reg. 2016/2251</span></h4><p>For non-centrally cleared CDS: VM between FCs, IM above the AANA threshold.</p></div>" +
              "<div class='rule'><h4>Ban on uncovered sovereign CDS <span class='law'>Art. 14 SSR</span></h4><p>A CDS on an EU Member State's debt may not be entered into unless the protection buyer has a corresponding exposure (that state's bonds or assets correlated with it). Net positions in sovereign CDS are also subject to notification.</p></div>" +
              "<div class='rule'><h4>Reporting <span class='law'>Art. 9 EMIR</span></h4><p>By T+1: UTI, UPI, LEI, reference entity, notional, coupon, upfront, valuation, collateral.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>RED code</strong> — reference entity and obligation code used in the CDS market.</li>" +
              "<li><strong>LEI</strong> of the reference entity (for issuer limits) and of the counterparty.</li>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB); <strong>OTC ISIN</strong> for venue-traded instruments.</li>" +
              "<li><strong>CFI</strong> — <code>S</code> (Swaps), group <code>C</code> (Credit).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Position direction (buy / sell protection) correctly mapped in the limit system.</li>" +
              "<li>Protection sold included in issuer limits (5/10/40, 20%) and group limits.</li>" +
              "<li>Global exposure per the CESR conversion; cover for protection sold.</li>" +
              "<li>Sovereign CDS: is the protection bought covered (SSR Art. 14)?</li>" +
              "<li>Clearing status for indices, counterparty limit for bilateral trades.</li>" +
              "<li>EMIR report by T+1; monitoring of credit events and auctions.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Reference entity", "The entity whose credit risk the CDS covers."],
        ["Credit event", "The event that triggers payout (bankruptcy, failure to pay, restructuring, etc.)."],
        ["Recovery rate", "Post-default price of the debt, set in the ISDA auction."],
        ["Upfront", "One-off payment bridging the standard coupon and the market spread."],
        ["Wrong-way risk", "When counterparty risk rises together with the risk the trade is meant to protect against."],
        ["Naked CDS", "Buying protection without exposure to the reference entity."]
      ]
    }
  }
});

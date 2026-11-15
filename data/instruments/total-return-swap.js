window.INSTRUMENTS.push({
  id: "total-return-swap",
  name: "Total Return Swap",
  aliases: ["TRS", "Total Rate of Return Swap", "Funded / Unfunded Swap"],
  market: "otc",
  asset: { pl: "Derywaty (akcyjne, dłużne, indeksowe)", en: "Derivatives (equity, credit, index)" },
  sources: ["ucits", "eligible", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "marginRts", "sftr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Total Return Swap to umowa OTC, w której jedna strona przekazuje drugiej całkowity zwrot z aktywa referencyjnego (zmiana ceny plus dywidendy lub kupony), a w zamian otrzymuje oprocentowanie od nominału (np. €STR + spread). Daje pełną ekspozycję ekonomiczną bez kupowania aktywa.",
      keyFacts: [
        ["Rynek", "OTC, bilateralnie z bankiem; brak obowiązku clearingu."],
        ["Dokumentacja", "ISDA Master Agreement + CSA, potwierdzenie (często według ISDA Equity Derivatives Definitions)."],
        ["Strony", "Total return receiver (dostaje zwrot z aktywa, płaci finansowanie) i total return payer."],
        ["Aktywo referencyjne", "Akcja, koszyk akcji, indeks, obligacja, pożyczka, koszyk kredytów."],
        ["Reset", "Okresowe (np. co miesiąc lub kwartał) rozliczenie wyniku i ustalenie nowej ceny bazowej."],
        ["Szczególne wymogi", "SFTR art. 13–14 (ujawnienia w prospekcie i sprawozdaniach), wytyczne ESMA o TRS."],
        ["Kod CFI", "<code>SE****</code> dla TRS akcyjnych (Swaps – Equity)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p>W <em>Total Return Swap</em> (TRS) strony wymieniają dwa strumienie:</p>" +
            "<ul>" +
              "<li><strong>noga total return</strong> — wzrost wartości aktywa plus dochody (dywidendy, kupony). Spadek wartości płaci <em>receiver</em> do <em>payera</em>;</li>" +
              "<li><strong>noga finansująca</strong> — odsetki od nominału według stopy referencyjnej plus spread, płacone przez receivera.</li>" +
            "</ul>" +
            "<p>Receiver ma ekonomicznie taką samą pozycję, jakby kupił aktywo za pożyczone pieniądze. Payer (zwykle bank) zabezpiecza się, trzymając aktywo u siebie.</p>" +
            "<p>Zastosowania w funduszach:</p>" +
            "<ul>" +
              "<li><strong>replikacja syntetyczna</strong> — fundusz indeksowy otrzymuje zwrot z indeksu przez TRS (tzw. synthetic ETF);</li>" +
              "<li><strong>dostęp do rynków</strong> trudnych do bezpośredniej inwestycji;</li>" +
              "<li><strong>pozycje krótkie</strong> — fundusz jako payer zarabia na spadku aktywa (UCITS nie może sprzedawać na krótko fizycznie);</li>" +
              "<li><strong>finansowanie</strong> — w AIF jako sposób uzyskania dźwigni.</li>" +
            "</ul>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Aktywo referencyjne, nominał i cena początkowa, stopa finansowania i spread, daty resetów, sposób traktowania dywidend (np. 100% netto po podatku).</li>" +
              "<li><strong>W trakcie okresu.</strong> Dywidendy z aktywa są przekazywane receiverowi (w dniu wypłaty lub przy resecie). Codzienna wycena i VM według CSA.</li>" +
              "<li><strong>Reset.</strong> Na koniec okresu liczy się wynik: (cena końcowa − cena początkowa) × liczba jednostek, minus odsetki finansujące. Strona, która jest winna, płaci różnicę. Nowa cena bazowa = cena z dnia resetu.</li>" +
              "<li><strong>Zakończenie.</strong> W terminie zapadalności albo wcześniej (częściowe lub całkowite zamknięcie — <em>unwind</em>) następuje ostatnie rozliczenie.</li>" +
            "</ol>" +
            "<div class='callout'><strong>Funded vs unfunded</strong>W TRS <em>unfunded</em> receiver nie płaci nic na starcie (typowe dla funduszy). W TRS <em>funded</em> płaci z góry nominał, a jego gotówka jest inwestowana w aktywa zabezpieczające.</div>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz UCITS (NAV 100 mln EUR) chce mieć ekspozycję na koszyk 10 akcji europejskich bez ich kupowania. Zawiera z bankiem 1-letni TRS z kwartalnym resetem: <strong>otrzymuje total return</strong> koszyka, nominał 20 mln EUR, <strong>płaci €STR + 0,30%</strong> (przyjmijmy €STR = 2,00%).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Kwartał (91 dni)</th><th class='num'>Scenariusz A: koszyk +3%</th><th class='num'>Scenariusz B: koszyk −2%</th></tr></thead><tbody>" +
              "<tr><td>Noga total return: 20 mln × zmiana koszyka</td><td class='num'>+600 000</td><td class='num'>−400 000</td></tr>" +
              "<tr><td>Noga finansująca: 20 mln × 2,30% × 91/360</td><td class='num'>−116 277,78</td><td class='num'>−116 277,78</td></tr>" +
              "<tr><td>Rozliczenie przy resecie (dla funduszu)</td><td class='num'>+483 722,22</td><td class='num'>−516 277,78</td></tr>" +
            "</tbody></table></div>" +
            "<p>Dywidendy z akcji koszyka (netto) bank przekazuje funduszowi niezależnie od tego rozliczenia.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Ekspozycja całkowita:</strong> wartość rynkowa aktywów referencyjnych = 20 mln EUR = 20% NAV.</li>" +
              "<li><strong>Look-through do emitentów:</strong> jeśli akcja Y stanowi 15% koszyka, TRS daje ekspozycję na Y w wysokości 3 mln EUR (3% NAV). Sumuje się ją z akcjami Y posiadanymi bezpośrednio w teście 5/10/40.</li>" +
              "<li><strong>Kontrahent:</strong> w scenariuszu A, tuż przed resetem, bank jest winien funduszowi ok. 0,48 mln EUR (0,48% NAV) minus zabezpieczenie — wobec limitu 10% NAV.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> narosły wynik nogi total return (bieżąca cena aktywa vs cena z ostatniego resetu, plus należne dochody) minus narosłe odsetki nogi finansującej. Przy dłuższych okresach — dyskontowanie.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko rynkowe aktywa referencyjnego</strong> — w pełnej wysokości nominału.</li>" +
              "<li><strong>Ryzyko kontrahenta</strong> — narasta między resetami; ograniczane przez częste resety i CSA.</li>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — noga finansująca.</li>" +
              "<li><strong>Ryzyko przerwania</strong> — bank może mieć prawo zamknąć TRS przy zdarzeniach rynkowych lub zmianach regulacyjnych (<em>hedging disruption</em>).</li>" +
              "<li><strong>Ryzyko podatkowe</strong> — traktowanie dywidend (podatek u źródła).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Onboarding, zawarcie, potwierdzenie.</li>" +
              "<li>Codzienna wycena, VM; przekazywanie dywidend i kuponów.</li>" +
              "<li>Okresowe resety i płatności netto.</li>" +
              "<li>Zmiany składu koszyka (jeśli przewidziane) — nowe ekspozycje na emitentów.</li>" +
              "<li>Unwind częściowy lub całkowity, zapadalność.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Aktywo referencyjne musi być dopuszczalne dla UCITS (zbywalne papiery, indeks finansowy itd.). Kontrahent nadzorowany, codzienna wycena, możliwość zamknięcia.</p></div>" +
              "<div class='rule'><h4>Brak uznaniowości kontrahenta <span class='law'>ESMA/2014/937</span></h4><p>Kontrahent TRS nie może mieć swobody w ustalaniu składu lub zarządzaniu portfelem bazowym. Jeśli ją ma, umowa jest traktowana jak powierzenie zarządzania i podlega zasadom delegacji.</p></div>" +
              "<div class='rule'><h4>Look-through i dywersyfikacja <span class='law'>art. 51 ust. 3 akapit 2; ESMA/2014/937</span></h4><p>Ekspozycje bazowe TRS wlicza się do limitów emitenta (art. 52). Dla indeksów finansowych spełniających kryteria — bez look-through.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>CESR/10-788</span></h4><p>Prosty TRS: wartość rynkowa aktywów referencyjnych. Złożony TRS (wymiana zwrotów z dwóch aktywów): łączna wartość rynkowa aktywów bazowych obu nóg.</p></div>" +
              "<div class='rule'><h4>Kontrahent i zabezpieczenia <span class='law'>art. 52; ESMA/2014/937</span></h4><p>Limit 10% / 5% NAV, limit łączny 20%. Zabezpieczenia otrzymane muszą spełniać kryteria wytycznych.</p></div>" +
              "<div class='rule'><h4>Ujawnienia <span class='law'>art. 13–14 SFTR</span></h4><p>Prospekt musi opisywać stosowanie TRS (rodzaje aktywów, maksymalny i oczekiwany udział w aktywach, kryteria doboru kontrahentów, zabezpieczenia, ryzyka). Sprawozdania okresowe — dane o wykorzystaniu TRS.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: wartość rynkowa aktywów referencyjnych (w TRS złożonych — obu nóg). TRS jako receiver to klasyczny sposób uzyskania dźwigni przez AIF.</li>" +
              "<li><strong>Ujawnienia</strong> <span class='law'>art. 13–14 SFTR</span>: dokumenty dla inwestorów (art. 23 AIFMD) i raporty roczne.</li>" +
              "<li>Limity koncentracji i kontrahenta — według dokumentów AIF.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR, SFTR i raportowanie",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>EMIR <span class='law'>art. 4, 9, 11 EMIR</span></h4><p>TRS to derywat: raport do repozytorium do T+1, potwierdzenie, uzgadnianie portfela, VM i (powyżej progu AANA) IM. Brak obowiązku clearingu.</p></div>" +
              "<div class='rule'><h4>SFTR — tylko ujawnienia <span class='law'>art. 13–14 SFTR</span></h4><p>TRS nie raportuje się w SFTR (raport idzie przez EMIR), ale podlega obowiązkom przejrzystości wobec inwestorów.</p></div>" +
              "<div class='rule'><h4>Pozycje krótkie <span class='law'>SSR</span></h4><p>Fundusz jako payer TRS na akcje ma pozycję krótką netto, która podlega progom zgłoszeń (od 0,1% kapitału).</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB).</li>" +
              "<li><strong>ISIN / LEI</strong> aktywów referencyjnych — do look-through emitentów.</li>" +
              "<li><strong>CFI</strong> — <code>S</code> (Swaps), grupa zależna od aktywa: <code>E</code> (Equity), <code>C</code> (Credit).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Czy aktywa referencyjne są dopuszczalne dla funduszu?</li>" +
              "<li>Look-through do emitentów koszyka i sumowanie z pozycjami bezpośrednimi.</li>" +
              "<li>Kontrahent bez uznaniowości co do portfela bazowego (lub zgodność z zasadami delegacji).</li>" +
              "<li>Ekspozycja całkowita / dźwignia, limit kontrahenta, zabezpieczenia.</li>" +
              "<li>Udział TRS w aktywach w granicach ujawnionych w prospekcie (SFTR art. 14).</li>" +
              "<li>Raport EMIR do T+1; pozycje krótkie netto wobec progów SSR.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Total return receiver / payer", "Strona otrzymująca całkowity zwrot z aktywa / strona go przekazująca."],
        ["Reset", "Okresowe rozliczenie wyniku TRS i ustalenie nowej ceny bazowej."],
        ["Funded / unfunded TRS", "TRS z zapłatą nominału na starcie / bez płatności na starcie."],
        ["Synthetic replication", "Odwzorowanie indeksu przez derywaty (zwykle TRS) zamiast kupowania składników."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A total return swap is an OTC contract in which one party passes the total return of a reference asset (price change plus dividends or coupons) to the other, and in return receives interest on the notional (e.g. €STR + spread). It gives full economic exposure without buying the asset.",
      keyFacts: [
        ["Market", "OTC, bilateral with a bank; no clearing obligation."],
        ["Documentation", "ISDA Master Agreement + CSA, confirmation (often under the ISDA Equity Derivatives Definitions)."],
        ["Parties", "Total return receiver (gets the asset's return, pays funding) and total return payer."],
        ["Reference asset", "Share, basket of shares, index, bond, loan, credit basket."],
        ["Reset", "Periodic (e.g. monthly or quarterly) settlement of P&amp;L and setting of a new base price."],
        ["Specific requirements", "SFTR Art. 13–14 (prospectus and periodic report disclosures), ESMA guidelines on TRS."],
        ["CFI code", "<code>SE****</code> for equity TRS (Swaps – Equity)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>In a Total Return Swap (TRS) the parties exchange two streams:</p>" +
            "<ul>" +
              "<li><strong>total return leg</strong> — the asset's price increase plus income (dividends, coupons). A price fall is paid by the receiver to the payer;</li>" +
              "<li><strong>funding leg</strong> — interest on the notional at a reference rate plus a spread, paid by the receiver.</li>" +
            "</ul>" +
            "<p>Economically the receiver is in the same position as if it had bought the asset with borrowed money. The payer (usually a bank) hedges by holding the asset itself.</p>" +
            "<p>Uses in funds:</p>" +
            "<ul>" +
              "<li><strong>synthetic replication</strong> — an index fund receives the index return through a TRS (a so-called synthetic ETF);</li>" +
              "<li><strong>market access</strong> to markets that are hard to invest in directly;</li>" +
              "<li><strong>short positions</strong> — the fund as payer gains when the asset falls (a UCITS cannot short-sell physically);</li>" +
              "<li><strong>financing</strong> — in AIFs, as a way to obtain leverage.</li>" +
            "</ul>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> Reference asset, notional and initial price, funding rate and spread, reset dates, dividend treatment (e.g. 100% net of tax).</li>" +
              "<li><strong>During the period.</strong> Dividends on the asset are passed to the receiver (on payment date or at reset). Daily valuation and VM under the CSA.</li>" +
              "<li><strong>Reset.</strong> At period end the result is computed: (final price − initial price) × units, minus funding interest. The party that owes pays the difference. New base price = price on the reset date.</li>" +
              "<li><strong>Termination.</strong> At maturity or earlier (partial or full unwind) the final settlement takes place.</li>" +
            "</ol>" +
            "<div class='callout'><strong>Funded vs unfunded</strong>In an <em>unfunded</em> TRS the receiver pays nothing upfront (typical for funds). In a <em>funded</em> TRS it pays the notional upfront, and that cash is invested in collateral assets.</div>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A UCITS fund (NAV EUR 100m) wants exposure to a basket of 10 European shares without buying them. It enters a 1-year TRS with quarterly resets with a bank: <strong>receives the total return</strong> of the basket on EUR 20m notional, <strong>pays €STR + 0.30%</strong> (assume €STR = 2.00%).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Quarter (91 days)</th><th class='num'>Scenario A: basket +3%</th><th class='num'>Scenario B: basket −2%</th></tr></thead><tbody>" +
              "<tr><td>Total return leg: 20m × basket change</td><td class='num'>+600,000</td><td class='num'>−400,000</td></tr>" +
              "<tr><td>Funding leg: 20m × 2.30% × 91/360</td><td class='num'>−116,277.78</td><td class='num'>−116,277.78</td></tr>" +
              "<tr><td>Reset settlement (for the fund)</td><td class='num'>+483,722.22</td><td class='num'>−516,277.78</td></tr>" +
            "</tbody></table></div>" +
            "<p>Dividends on the basket shares (net) are passed by the bank to the fund separately from this settlement.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Global exposure:</strong> market value of the reference assets = EUR 20m = 20% of NAV.</li>" +
              "<li><strong>Look-through to issuers:</strong> if share Y is 15% of the basket, the TRS gives EUR 3m (3% of NAV) exposure to Y. This is added to Y shares held directly in the 5/10/40 test.</li>" +
              "<li><strong>Counterparty:</strong> in scenario A, just before the reset, the bank owes the fund about EUR 0.48m (0.48% of NAV) less collateral — against the 10% of NAV limit.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> accrued result of the total return leg (current asset price vs last reset price, plus income due) minus accrued interest on the funding leg. For longer periods — discounting.</p>" +
            "<ul>" +
              "<li><strong>Market risk of the reference asset</strong> — on the full notional.</li>" +
              "<li><strong>Counterparty risk</strong> — builds up between resets; reduced by frequent resets and the CSA.</li>" +
              "<li><strong>Interest rate risk</strong> — funding leg.</li>" +
              "<li><strong>Disruption risk</strong> — the bank may have the right to terminate on market events or regulatory change (hedging disruption).</li>" +
              "<li><strong>Tax risk</strong> — dividend treatment (withholding tax).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Onboarding, execution, confirmation.</li>" +
              "<li>Daily valuation, VM; pass-through of dividends and coupons.</li>" +
              "<li>Periodic resets and net payments.</li>" +
              "<li>Basket rebalancing (where provided for) — new issuer exposures.</li>" +
              "<li>Partial or full unwind, maturity.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>The reference asset must be UCITS-eligible (transferable securities, a financial index, etc.). Supervised counterparty, daily valuation, ability to close out.</p></div>" +
              "<div class='rule'><h4>No counterparty discretion <span class='law'>ESMA/2014/937</span></h4><p>The TRS counterparty must have no discretion over the composition or management of the underlying portfolio. If it does, the arrangement is treated as delegated investment management and the delegation rules apply.</p></div>" +
              "<div class='rule'><h4>Look-through and diversification <span class='law'>Art. 51(3), second subpara.; ESMA/2014/937</span></h4><p>TRS underlying exposures count towards the issuer limits (Art. 52). Financial indices that meet the criteria are not looked through.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Basic TRS: market value of the reference assets. Complex TRS (exchanging returns of two assets): cumulative market value of the underlyings of both legs.</p></div>" +
              "<div class='rule'><h4>Counterparty and collateral <span class='law'>Art. 52; ESMA/2014/937</span></h4><p>10% / 5% of NAV limit, 20% combined limit. Collateral received must meet the guidelines' criteria.</p></div>" +
              "<div class='rule'><h4>Disclosures <span class='law'>Art. 13–14 SFTR</span></h4><p>The prospectus must describe the use of TRS (asset types, maximum and expected proportion of assets, counterparty selection criteria, collateral, risks). Periodic reports — data on TRS usage.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: market value of the reference assets (for complex TRS — both legs). Receiving a TRS is a classic way for an AIF to obtain leverage.</li>" +
              "<li><strong>Disclosures</strong> <span class='law'>Art. 13–14 SFTR</span>: investor disclosures (Art. 23 AIFMD) and annual reports.</li>" +
              "<li>Concentration and counterparty limits — per the AIF's documents.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR, SFTR and reporting",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>EMIR <span class='law'>Art. 4, 9, 11 EMIR</span></h4><p>A TRS is a derivative: trade repository report by T+1, confirmation, portfolio reconciliation, VM and (above the AANA threshold) IM. No clearing obligation.</p></div>" +
              "<div class='rule'><h4>SFTR — disclosures only <span class='law'>Art. 13–14 SFTR</span></h4><p>TRS are not reported under SFTR (the report goes through EMIR), but they are subject to the investor transparency requirements.</p></div>" +
              "<div class='rule'><h4>Short positions <span class='law'>SSR</span></h4><p>A fund that is payer on an equity TRS has a net short position, subject to the notification thresholds (from 0.1% of share capital).</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB).</li>" +
              "<li><strong>ISIN / LEI</strong> of reference assets — for issuer look-through.</li>" +
              "<li><strong>CFI</strong> — <code>S</code> (Swaps), group depending on the asset: <code>E</code> (Equity), <code>C</code> (Credit).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Are the reference assets eligible for the fund?</li>" +
              "<li>Look-through to basket issuers and aggregation with direct holdings.</li>" +
              "<li>Counterparty has no discretion over the underlying portfolio (or delegation rules are met).</li>" +
              "<li>Global exposure / leverage, counterparty limit, collateral.</li>" +
              "<li>Share of assets in TRS within the levels disclosed in the prospectus (SFTR Art. 14).</li>" +
              "<li>EMIR report by T+1; net short positions against SSR thresholds.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Total return receiver / payer", "The party receiving the asset's total return / the party paying it."],
        ["Reset", "Periodic settlement of the TRS result and setting of a new base price."],
        ["Funded / unfunded TRS", "TRS with the notional paid upfront / with no upfront payment."],
        ["Synthetic replication", "Tracking an index through derivatives (usually a TRS) instead of buying the constituents."]
      ]
    }
  }
});

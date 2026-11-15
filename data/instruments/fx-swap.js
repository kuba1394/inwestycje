window.INSTRUMENTS.push({
  id: "fx-swap",
  name: "FX Swap",
  aliases: ["Foreign Exchange Swap", "Spot-Forward Swap", "swap walutowy"],
  market: "otc",
  asset: { pl: "Derywaty walutowe", en: "FX derivatives" },
  sources: ["ucits", "emir3dir", "cesr10788", "esma2014", "esmaShare", "aifmd", "aifmdL2", "emir", "marginRts", "mifidDR"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "FX Swap to dwie transakcje walutowe zawarte jednocześnie z tym samym kontrahentem: wymiana waluty dziś (noga bliska) i wymiana odwrotna w przyszłości (noga daleka) po kursie ustalonym dziś. Służy do rolowania zabezpieczeń walutowych i do czasowego pozyskania waluty.",
      keyFacts: [
        ["Rynek", "OTC, bilateralnie z bankiem; najbardziej obrotny instrument rynku walutowego."],
        ["Budowa", "Noga bliska (zwykle spot) + noga daleka (forward) w przeciwnym kierunku, ta sama kwota waluty bazowej."],
        ["Cena", "Punkty terminowe (różnica kursów nóg), wynikające z różnicy stóp procentowych."],
        ["Rozliczenie", "Fizyczna dostawa obu walut w obu nogach, często przez CLS."],
        ["Typowe tenory", "Overnight / tom-next, 1 tydzień do 12 miesięcy."],
        ["Kod CFI", "Noga terminowa: <code>JF****</code> (Forwards – Foreign exchange)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>FX Swap</em> to para przeciwstawnych transakcji walutowych na tę samą kwotę waluty bazowej:</p>" +
            "<ul>" +
              "<li><strong>noga bliska</strong> (<em>near leg</em>) — np. kupno 10 mln USD za PLN po kursie spot;</li>" +
              "<li><strong>noga daleka</strong> (<em>far leg</em>) — sprzedaż tych samych 10 mln USD za PLN w ustalonej dacie, po kursie = spot + punkty terminowe.</li>" +
            "</ul>" +
            "<p>Ekonomicznie to <strong>zabezpieczona pożyczka w jednej walucie w zamian za depozyt w drugiej</strong>. Ryzyko walutowe obu nóg się znosi, a zostaje ryzyko różnicy stóp procentowych (punktów terminowych).</p>" +
            "<p>W funduszach FX Swap służy głównie do <strong>rolowania zabezpieczeń walutowych</strong>: noga bliska zamyka wygasającą pozycję, noga daleka otwiera nową. Używa się go też do zarządzania płynnością, np. czasowego pozyskania USD na rozliczenie zakupu akcji.</p>" +
            "<p>Różni się od <a href='#/i/cross-currency-swap'>Cross-Currency Swap</a> tym, że nie ma okresowych płatności odsetek — koszt odsetek jest „wbudowany” w różnicę kursów obu nóg.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Uzgodnienie pary walut, kwoty, kierunku, daty obu nóg. Kwotowane są punkty terminowe; kurs nogi bliskiej to zwykle bieżący spot.</li>" +
              "<li><strong>Rozliczenie nogi bliskiej.</strong> Wymiana obu walut w dacie bliskiej (np. T+2).</li>" +
              "<li><strong>Okres trwania.</strong> Wycena zależy głównie od zmiany różnicy stóp; zmiana kursu spot wpływa tylko w niewielkim stopniu (przez dyskontowanie). Ewentualny VM według CSA.</li>" +
              "<li><strong>Rozliczenie nogi dalekiej.</strong> Wymiana odwrotna po kursie ustalonym w dniu zawarcia.</li>" +
            "</ol>" +
            "<p class='formula'>Kurs nogi dalekiej = kurs nogi bliskiej + punkty terminowe</p>"
        },
        {
          id: "example", title: "Przykład liczbowy — rolowanie zabezpieczenia",
          html:
            "<p>Kontynuacja przykładu z karty <a href='#/i/fx-forward'>FX Forward</a>. Fundusz (waluta PLN, NAV ok. 150 mln PLN) sprzedał 3 miesiące temu 10 mln USD po 4,00495. Dziś forward wygasa, kurs spot to 3,8000. Fundusz chce utrzymać zabezpieczenie na kolejne 3 miesiące, więc zawiera FX Swap: <strong>kupuje 10 mln USD spot i sprzedaje 10 mln USD za 3 miesiące</strong>.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Przepływ w dacie bliskiej</th><th class='num'>USD</th><th class='num'>PLN</th></tr></thead><tbody>" +
              "<tr><td>Wygasający forward: fundusz dostarcza USD, otrzymuje PLN po 4,00495</td><td class='num'>−10 000 000</td><td class='num'>+40 049 500</td></tr>" +
              "<tr><td>Noga bliska FX Swap: fundusz kupuje USD po 3,8000</td><td class='num'>+10 000 000</td><td class='num'>−38 000 000</td></tr>" +
              "<tr><td>Saldo netto</td><td class='num'>0</td><td class='num'>+2 049 500</td></tr>" +
            "</tbody></table></div>" +
            "<p>Zysk z zabezpieczenia (2 049 500 PLN) zostaje zrealizowany w gotówce. Pozycja w USD się nie zmienia.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Noga daleka (za 90 dni)</th><th class='num'>Wartość</th></tr></thead><tbody>" +
              "<tr><td>Kurs: 3,8000 × (1 + 4,50% × 90/360) / (1 + 4,00% × 90/360)</td><td class='num'>3,80470</td></tr>" +
              "<tr><td>Punkty terminowe</td><td class='num'>+47,0 pipsa</td></tr>" +
              "<tr><td>Fundusz sprzeda 10 mln USD i otrzyma</td><td class='num'>38 047 000 PLN</td></tr>" +
            "</tbody></table></div>" +
            "<p>Gdyby wynik zabezpieczenia był ujemny (dolar by się umocnił), w dacie bliskiej fundusz musiałby dopłacić PLN. Dlatego rolowanie wymaga planowania płynności.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Po rolowaniu ekspozycja z nowej nogi terminowej: 10 mln USD × 3,80 = 38 mln PLN (zaangażowanie, z możliwością kompensowania jako hedging).</li>" +
              "<li>Noga bliska rozliczana spot nie generuje ekspozycji po rozrachunku.</li>" +
              "<li>Przy zabezpieczonych klasach jednostek rolowanie to moment ponownego ustawienia wskaźnika zabezpieczenia w przedziale 95–105%.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> nogi niezapadłe wyceniane jak forwardy, czyli różnica kursu umownego i bieżącego kursu terminowego, zdyskontowana.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — zmiana różnicy stóp (punktów terminowych).</li>" +
              "<li><strong>Ryzyko kontrahenta</strong> — po rozliczeniu nogi bliskiej zostaje forward z kontrahentem.</li>" +
              "<li><strong>Ryzyko rozrachunku</strong> — dwie brutto wymiany walut; CLS ogranicza ryzyko Herstatt.</li>" +
              "<li><strong>Ryzyko płynności</strong> — realizacja wyniku zabezpieczenia w gotówce przy każdym rolowaniu.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie i potwierdzenie obu nóg.</li>" +
              "<li>Rozrachunek nogi bliskiej (często razem z wygasającym forwardem — netting rozliczeniowy, jeśli przewiduje go umowa).</li>" +
              "<li>Wycena nogi dalekiej, raport EMIR, ewentualny VM.</li>" +
              "<li>Rozrachunek nogi dalekiej albo kolejne rolowanie.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Noga daleka jest derywatem OTC na kurs walutowy — dopuszczalna baza.</p></div>" +
              "<div class='rule'><h4>Limit kontrahenta <span class='law'>art. 52 ust. 1–2</span></h4><p>Ekspozycja z nogi dalekiej (dodatnia wycena minus zabezpieczenie): 10% / 5% NAV i limit łączny 20%.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>art. 51 ust. 3; CESR/10-788</span></h4><p>Zaangażowanie liczone od nominału nogi terminowej w walucie bazowej. Zabezpieczenia walutowe kompensowane na zasadach hedgingu.</p></div>" +
              "<div class='rule'><h4>Zabezpieczone klasy jednostek <span class='law'>ESMA34-43-296</span></h4><p>Wskaźnik zabezpieczenia 95–105% wartości aktywów netto klasy, przegląd co najmniej raz w miesiącu.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>art. 7–8 rozp. 231/2013</span>: noga terminowa w metodzie brutto bez kompensowania; w metodzie zaangażowania — kompensowanie zabezpieczeń walutowych.</li>" +
              "<li>Limity kontrahenta według dokumentów AIF.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: kwalifikacja, zabezpieczenia, raportowanie",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Kwalifikacja <span class='law'>art. 10 rozp. 2017/565</span></h4><p>Noga daleka rozliczana później niż spot jest derywatem (forward). Noga bliska w terminie spot sama w sobie nie jest derywatem.</p></div>" +
              "<div class='rule'><h4>Clearing i depozyty <span class='law'>rozp. 2016/2251</span></h4><p>Brak obowiązku clearingu. Fizycznie rozliczane FX swapy są zwolnione z IM. Obowiązkowy VM dotyczy transakcji między instytucjami; z funduszami VM zwykle według CSA.</p></div>" +
              "<div class='rule'><h4>Raportowanie <span class='law'>art. 9 EMIR</span></h4><p>Do T+1. Sposób raportowania nóg (jako jedna transakcja czy osobne) wynika z technicznych standardów i wytycznych ESMA do EMIR Refit — uzgodnij z dostawcą usługi raportowania.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB).</li>" +
              "<li><strong>CFI</strong> nogi terminowej — <code>J</code> (Forwards), grupa <code>F</code> (Foreign exchange).</li>" +
              "<li>Kody walut ISO 4217, <strong>LEI</strong> kontrahenta.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Czy rolowanie zachowuje zamierzony wskaźnik zabezpieczenia (portfel lub klasa jednostek)?</li>" +
              "<li>Płynność na realizację ujemnego wyniku w dacie bliskiej.</li>" +
              "<li>Limit kontrahenta i limit łączny dla nogi dalekiej.</li>" +
              "<li>Rozrachunek obu nóg (CLS / SSI), raport EMIR do T+1.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Near leg / far leg", "Noga bliska (wcześniejsza) i daleka (późniejsza) FX Swapu."],
        ["Tom-next (T/N)", "FX Swap z nogą bliską jutro i daleką pojutrze; służy do przesunięcia pozycji o jeden dzień."],
        ["Roll", "Przedłużenie zabezpieczenia: zamknięcie wygasającego forwardu i otwarcie nowego."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An FX swap is two currency trades done at the same time with the same counterparty: an exchange of currencies today (near leg) and the reverse exchange in the future (far leg) at a rate fixed today. It is used to roll currency hedges and to obtain a currency temporarily.",
      keyFacts: [
        ["Market", "OTC, bilateral with a bank; the most traded FX instrument."],
        ["Structure", "Near leg (usually spot) + far leg (forward) in the opposite direction, same base-currency amount."],
        ["Price", "Forward points (difference between the legs' rates), driven by the interest rate differential."],
        ["Settlement", "Physical delivery of both currencies on both legs, often via CLS."],
        ["Typical tenors", "Overnight / tom-next, 1 week to 12 months."],
        ["CFI code", "Forward leg: <code>JF****</code> (Forwards – Foreign exchange)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>An FX Swap is a pair of opposite currency trades for the same base-currency amount:</p>" +
            "<ul>" +
              "<li><strong>near leg</strong> — e.g. buying USD 10m against PLN at spot;</li>" +
              "<li><strong>far leg</strong> — selling the same USD 10m against PLN on a set date, at spot + forward points.</li>" +
            "</ul>" +
            "<p>Economically it is a <strong>collateralised loan in one currency against a deposit in another</strong>. The FX risk of the two legs offsets, leaving interest rate differential (forward points) risk.</p>" +
            "<p>In funds the FX Swap is used mainly to <strong>roll currency hedges</strong>: the near leg closes the expiring position, the far leg opens the new one. It is also used for liquidity management, e.g. obtaining USD temporarily to settle an equity purchase.</p>" +
            "<p>Unlike a <a href='#/i/cross-currency-swap'>Cross-Currency Swap</a>, there are no periodic interest payments — the interest cost is built into the difference between the two legs' rates.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> Agree the currency pair, amount, direction and both leg dates. Forward points are quoted; the near-leg rate is usually current spot.</li>" +
              "<li><strong>Near-leg settlement.</strong> Both currencies exchanged on the near date (e.g. T+2).</li>" +
              "<li><strong>During the life.</strong> Value depends mainly on changes in the rate differential; spot moves have only a small effect (through discounting). VM under the CSA where applicable.</li>" +
              "<li><strong>Far-leg settlement.</strong> Reverse exchange at the rate fixed on trade date.</li>" +
            "</ol>" +
            "<p class='formula'>Far-leg rate = near-leg rate + forward points</p>"
        },
        {
          id: "example", title: "Worked example — rolling a hedge",
          html:
            "<p>Continuing the example from the <a href='#/i/fx-forward'>FX Forward</a> card. A PLN-based fund (NAV about PLN 150m) sold USD 10m forward at 4.00495 three months ago. Today the forward expires and spot is 3.8000. The fund wants to keep the hedge for another 3 months, so it enters an FX Swap: <strong>buys USD 10m spot and sells USD 10m 3 months forward</strong>.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Cash flow on the near date</th><th class='num'>USD</th><th class='num'>PLN</th></tr></thead><tbody>" +
              "<tr><td>Expiring forward: fund delivers USD, receives PLN at 4.00495</td><td class='num'>−10,000,000</td><td class='num'>+40,049,500</td></tr>" +
              "<tr><td>FX Swap near leg: fund buys USD at 3.8000</td><td class='num'>+10,000,000</td><td class='num'>−38,000,000</td></tr>" +
              "<tr><td>Net</td><td class='num'>0</td><td class='num'>+2,049,500</td></tr>" +
            "</tbody></table></div>" +
            "<p>The hedge gain (PLN 2,049,500) is realised in cash. The USD position is unchanged.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Far leg (in 90 days)</th><th class='num'>Value</th></tr></thead><tbody>" +
              "<tr><td>Rate: 3.8000 × (1 + 4.50% × 90/360) / (1 + 4.00% × 90/360)</td><td class='num'>3.80470</td></tr>" +
              "<tr><td>Forward points</td><td class='num'>+47.0 pips</td></tr>" +
              "<tr><td>Fund will sell USD 10m and receive</td><td class='num'>PLN 38,047,000</td></tr>" +
            "</tbody></table></div>" +
            "<p>Had the hedge result been negative (stronger dollar), the fund would have had to pay PLN on the near date. That is why rolling requires liquidity planning.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>After the roll, exposure from the new forward leg: USD 10m × 3.80 = PLN 38m (commitment, nettable as a hedge).</li>" +
              "<li>The spot-settled near leg creates no exposure once settled.</li>" +
              "<li>For hedged share classes, the roll is when the hedge ratio is reset within the 95–105% range.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> unsettled legs are valued like forwards — the difference between the contract rate and the current forward rate, discounted.</p>" +
            "<ul>" +
              "<li><strong>Interest rate risk</strong> — changes in the rate differential (forward points).</li>" +
              "<li><strong>Counterparty risk</strong> — after the near leg settles, a forward with the counterparty remains.</li>" +
              "<li><strong>Settlement risk</strong> — two gross currency exchanges; CLS mitigates Herstatt risk.</li>" +
              "<li><strong>Liquidity risk</strong> — the hedge result is realised in cash at every roll.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution and confirmation of both legs.</li>" +
              "<li>Near-leg settlement (often together with the expiring forward — settlement netting, if the agreement allows).</li>" +
              "<li>Far-leg valuation, EMIR report, VM where applicable.</li>" +
              "<li>Far-leg settlement or another roll.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>The far leg is an OTC derivative on an exchange rate — eligible underlying.</p></div>" +
              "<div class='rule'><h4>Counterparty limit <span class='law'>Art. 52(1)–(2)</span></h4><p>Exposure from the far leg (positive value less collateral): 10% / 5% of NAV and the 20% combined limit.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>Art. 51(3); CESR/10-788</span></h4><p>Commitment based on the forward leg's notional in base currency. Currency hedges netted under the hedging rules.</p></div>" +
              "<div class='rule'><h4>Hedged share classes <span class='law'>ESMA34-43-296</span></h4><p>Hedge ratio 95–105% of the class's net assets, reviewed at least monthly.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Art. 7–8 Reg. 231/2013</span>: forward leg in the gross method without netting; in the commitment method currency hedges are netted.</li>" +
              "<li>Counterparty limits per the AIF's documents.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: classification, margin, reporting",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Classification <span class='law'>Art. 10 Reg. 2017/565</span></h4><p>A far leg settling later than spot is a derivative (forward). A spot-dated near leg is not a derivative in itself.</p></div>" +
              "<div class='rule'><h4>Clearing and margin <span class='law'>Reg. 2016/2251</span></h4><p>No clearing obligation. Physically settled FX swaps are exempt from IM. Mandatory VM applies between institutions; with funds VM is usually exchanged under the CSA.</p></div>" +
              "<div class='rule'><h4>Reporting <span class='law'>Art. 9 EMIR</span></h4><p>By T+1. How the legs are reported (as one trade or separately) follows the technical standards and ESMA guidelines under EMIR Refit — agree this with your reporting service provider.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB).</li>" +
              "<li>Forward leg <strong>CFI</strong> — <code>J</code> (Forwards), group <code>F</code> (Foreign exchange).</li>" +
              "<li>ISO 4217 currency codes, counterparty <strong>LEI</strong>.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Does the roll keep the intended hedge ratio (portfolio or share class)?</li>" +
              "<li>Liquidity to settle a negative result on the near date.</li>" +
              "<li>Counterparty limit and combined limit for the far leg.</li>" +
              "<li>Settlement of both legs (CLS / SSI), EMIR report by T+1.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Near leg / far leg", "The earlier and later legs of an FX Swap."],
        ["Tom-next (T/N)", "FX Swap with the near leg tomorrow and the far leg the day after; used to move a position by one day."],
        ["Roll", "Extending a hedge: closing the expiring forward and opening a new one."]
      ]
    }
  }
});

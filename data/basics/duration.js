window.BASICS.push({
  id: "duration",
  title: { pl: "Duration, DV01 i wypukłość", en: "Duration, DV01 and convexity" },
  level: 2,
  prereq: ["time-value", "yield-curve"],
  sources: ["cesr10788"],
  related: ["government-bond", "government-bond-future", "interest-rate-swap"],
  content: {
    pl: {
      summary: "Duration mówi, jak mocno cena obligacji (lub portfela) reaguje na zmianę stóp procentowych. Modified duration 4,3 oznacza, że wzrost rentowności o 1 punkt procentowy obniża cenę o ok. 4,3%. DV01 to ta sama wrażliwość wyrażona w pieniądzu na 1 punkt bazowy. To najczęściej używana miara ryzyka stopy procentowej — także przy zabezpieczaniu kontraktami i swapami.",
      keyFacts: [
        ["Macaulay duration", "Średni ważony czas otrzymania przepływów (w latach)."],
        ["Modified duration", "Macaulay / (1 + y); % zmiana ceny na 1 pp zmiany rentowności."],
        ["DV01 / PV01", "Zmiana wartości w pieniądzu przy zmianie rentowności o 1 pb."],
        ["Wypukłość", "Korekta drugiego rzędu — zależność ceny od stóp nie jest liniowa."]
      ],
      sections: [
        { id: "idea", title: "Intuicja",
          html: "<p>Obligacja to seria przepływów w przyszłości. Im później przychodzą pieniądze, tym mocniej ich wartość dziś reaguje na zmianę stopy dyskontowej. Duration łączy to w jedną liczbę.</p>" +
                "<ul><li>Dłuższy termin → wyższa duration.</li><li>Wyższy kupon → niższa duration (więcej pieniędzy wraca wcześniej).</li><li>Obligacja zerokuponowa: duration ≈ termin do wykupu.</li></ul>" },
        { id: "formulas", title: "Wzory",
          html: "<p class='formula'>Macaulay D = Σ t × PV(CF<sub>t</sub>) / cena</p>" +
                "<p class='formula'>Modified D = Macaulay D / (1 + y)</p>" +
                "<p class='formula'>Δcena ≈ − Modified D × Δy × cena</p>" +
                "<p class='formula'>DV01 ≈ Modified D × wartość × 0,0001</p>" },
        { id: "example", title: "Przykład",
          html: "<p>5-letnia obligacja, kupon 5% rocznie, rentowność 5%, cena 100. Pozycja 10 mln zł.</p>" +
                "<div class='table-scroll'><table class='calc'><tbody>" +
                "<tr><td>Macaulay duration</td><td class='num'>4,55 roku</td></tr>" +
                "<tr><td>Modified duration</td><td class='num'>4,33</td></tr>" +
                "<tr><td>DV01 pozycji: 10 000 000 × 4,33 × 0,0001</td><td class='num'>≈ 4 329 zł na 1 pb</td></tr>" +
                "<tr><td>Rentowność +1 pp: przybliżenie duration</td><td class='num'>−4,33%</td></tr>" +
                "<tr><td>Rentowność +1 pp: dokładna nowa cena (95,79)</td><td class='num'>−4,21%</td></tr>" +
                "<tr><td>Rentowność −1 pp: dokładna nowa cena (104,45)</td><td class='num'>+4,45%</td></tr>" +
                "</tbody></table></div>" +
                "<p>Przybliżenie z duration przeszacowuje spadek i niedoszacowuje wzrost — to efekt <strong>wypukłości</strong>: cena rośnie bardziej, niż spada, przy takiej samej zmianie stóp.</p>" },
        { id: "portfolio", title: "Duration portfela i zabezpieczenia",
          html: "<p>Duration portfela to średnia ważona duration pozycji. Zarządzający zmieniają ją bez handlu obligacjami za pomocą derywatów:</p>" +
                "<ul>" +
                "<li>sprzedaż <a href='#/i/government-bond-future'>kontraktów na obligacje</a> lub payer <a href='#/i/interest-rate-swap'>IRS</a> → niższa duration;</li>" +
                "<li>kupno kontraktów lub receiver IRS → wyższa duration.</li>" +
                "</ul>" +
                "<p class='formula'>Liczba kontraktów ≈ (DV01 docelowe − DV01 obecne) / DV01 kontraktu</p>" },
        { id: "compliance", title: "Znaczenie dla compliance",
          html: "<ul>" +
                "<li>Prospekty funduszy dłużnych często ograniczają duration portfela (np. 0–3 lata) — to limit do monitorowania.</li>" +
                "<li>W metodzie zaangażowania UCITS wytyczne CESR/10-788 pozwalają na <strong>duration netting</strong>: kompensowanie pozycji stopy procentowej według wrażliwości w przedziałach terminów, a nie według nominału.</li>" +
                "<li>To wyjaśnia, dlaczego STIR i FRA o dużym nominale nie muszą „zjadać” limitu ekspozycji całkowitej.</li>" +
                "</ul>" }
      ],
      glossary: [
        ["Modified duration", "Procentowa zmiana ceny przy zmianie rentowności o 1 punkt procentowy."],
        ["DV01 / PV01", "Zmiana wartości pozycji przy zmianie rentowności o 1 punkt bazowy."],
        ["Convexity", "Wypukłość — miara nieliniowości zależności ceny od rentowności."],
        ["Duration netting", "Kompensowanie pozycji stopy procentowej według wrażliwości (wytyczne CESR)."]
      ]
    },
    en: {
      summary: "Duration tells you how strongly a bond's (or portfolio's) price reacts to a change in interest rates. A modified duration of 4.3 means a 1 percentage point rise in yield lowers the price by about 4.3%. DV01 is the same sensitivity in money terms per basis point. It is the most widely used measure of interest rate risk — also when hedging with futures and swaps.",
      keyFacts: [
        ["Macaulay duration", "Weighted average time to receive the cash flows (in years)."],
        ["Modified duration", "Macaulay / (1 + y); % price change per 1 pp change in yield."],
        ["DV01 / PV01", "Change in value in money for a 1 bp change in yield."],
        ["Convexity", "Second-order correction — price does not depend on rates linearly."]
      ],
      sections: [
        { id: "idea", title: "Intuition",
          html: "<p>A bond is a series of future cash flows. The later the money arrives, the more its present value reacts to a change in the discount rate. Duration sums this up in one number.</p>" +
                "<ul><li>Longer maturity → higher duration.</li><li>Higher coupon → lower duration (more money comes back earlier).</li><li>Zero-coupon bond: duration ≈ time to maturity.</li></ul>" },
        { id: "formulas", title: "Formulas",
          html: "<p class='formula'>Macaulay D = Σ t × PV(CF<sub>t</sub>) / price</p>" +
                "<p class='formula'>Modified D = Macaulay D / (1 + y)</p>" +
                "<p class='formula'>Δprice ≈ − Modified D × Δy × price</p>" +
                "<p class='formula'>DV01 ≈ Modified D × value × 0.0001</p>" },
        { id: "example", title: "Example",
          html: "<p>5-year bond, 5% annual coupon, 5% yield, price 100. Position PLN 10m.</p>" +
                "<div class='table-scroll'><table class='calc'><tbody>" +
                "<tr><td>Macaulay duration</td><td class='num'>4.55 years</td></tr>" +
                "<tr><td>Modified duration</td><td class='num'>4.33</td></tr>" +
                "<tr><td>Position DV01: 10,000,000 × 4.33 × 0.0001</td><td class='num'>≈ PLN 4,329 per bp</td></tr>" +
                "<tr><td>Yield +1 pp: duration approximation</td><td class='num'>−4.33%</td></tr>" +
                "<tr><td>Yield +1 pp: exact new price (95.79)</td><td class='num'>−4.21%</td></tr>" +
                "<tr><td>Yield −1 pp: exact new price (104.45)</td><td class='num'>+4.45%</td></tr>" +
                "</tbody></table></div>" +
                "<p>The duration approximation overstates the fall and understates the rise — the effect of <strong>convexity</strong>: the price rises more than it falls for the same rate change.</p>" },
        { id: "portfolio", title: "Portfolio duration and hedging",
          html: "<p>Portfolio duration is the weighted average of position durations. Managers change it without trading bonds, using derivatives:</p>" +
                "<ul>" +
                "<li>selling <a href='#/i/government-bond-future'>bond futures</a> or a payer <a href='#/i/interest-rate-swap'>IRS</a> → lower duration;</li>" +
                "<li>buying futures or a receiver IRS → higher duration.</li>" +
                "</ul>" +
                "<p class='formula'>Number of contracts ≈ (target DV01 − current DV01) / contract DV01</p>" },
        { id: "compliance", title: "Why it matters for compliance",
          html: "<ul>" +
                "<li>Bond fund prospectuses often limit portfolio duration (e.g. 0–3 years) — a limit to monitor.</li>" +
                "<li>Under the UCITS commitment approach, CESR/10-788 allows <strong>duration netting</strong>: offsetting interest rate positions by sensitivity within maturity buckets rather than by notional.</li>" +
                "<li>This explains why STIR futures and FRAs with large notionals need not \"eat up\" the global exposure limit.</li>" +
                "</ul>" }
      ],
      glossary: [
        ["Modified duration", "Percentage price change for a 1 percentage point change in yield."],
        ["DV01 / PV01", "Change in a position's value for a 1 basis point change in yield."],
        ["Convexity", "A measure of the non-linearity of price versus yield."],
        ["Duration netting", "Offsetting interest rate positions by sensitivity (CESR guidelines)."]
      ]
    }
  }
});

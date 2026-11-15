window.BASICS.push({
  id: "options-greeks",
  title: { pl: "Opcje i greki", en: "Options and the Greeks" },
  level: 2,
  prereq: ["derivatives", "time-value"],
  sources: ["cesr10788"],
  related: ["listed-equity-option", "warrant", "swaption", "fx-option", "convertible-bond"],
  content: {
    pl: {
      summary: "Opcja daje prawo kupna (call) lub sprzedaży (put) po ustalonej cenie. Jej cena składa się z wartości wewnętrznej i wartości czasowej. Greki mierzą, jak cena opcji reaguje na zmiany rynku: delta (cena bazy), gamma (zmiana delty), vega (zmienność), theta (upływ czasu). Dla compliance najważniejsza jest delta, bo w niej liczy się ekspozycję opcji.",
      keyFacts: [
        ["Call / put", "Prawo kupna / prawo sprzedaży instrumentu bazowego po cenie wykonania (strike)."],
        ["Premia", "Cena opcji = wartość wewnętrzna + wartość czasowa."],
        ["Model", "Black-Scholes (akcje, indeksy), Garman-Kohlhagen (waluty), Black/Bachelier (stopy)."],
        ["Ekspozycja UCITS", "Liczba × wielkość kontraktu × cena bazy × delta."]
      ],
      sections: [
        { id: "payoff", title: "Wypłata i wartość",
          html: "<p class='formula'>Call: max(S − K, 0)   ·   Put: max(K − S, 0)</p>" +
                "<ul>" +
                "<li><strong>Wartość wewnętrzna</strong> — ile opcja dałaby, gdyby wykonać ją teraz.</li>" +
                "<li><strong>Wartość czasowa</strong> — dopłata za szansę, że do wygaśnięcia opcja zyska; maleje z czasem do zera.</li>" +
                "</ul>" +
                "<p>Cena opcji rośnie wraz z: odległością do wygaśnięcia, zmiennością rynku i (dla call) ceną bazy.</p>" },
        { id: "example", title: "Przykład wyceny",
          html: "<p>Akcja = 100, strike = 100, 6 miesięcy, stopa 3%, zmienność 20% rocznie (model Blacka-Scholesa):</p>" +
                "<div class='table-scroll'><table class='calc'><thead><tr><th>Wielkość</th><th class='num'>Call</th><th class='num'>Put</th></tr></thead><tbody>" +
                "<tr><td>Cena opcji</td><td class='num'>6,37</td><td class='num'>4,88</td></tr>" +
                "<tr><td>Wartość wewnętrzna</td><td class='num'>0</td><td class='num'>0</td></tr>" +
                "<tr><td>Delta</td><td class='num'>0,57</td><td class='num'>−0,43</td></tr>" +
                "<tr><td>Gamma</td><td class='num'>0,028</td><td class='num'>0,028</td></tr>" +
                "<tr><td>Vega (na 1 pp zmienności)</td><td class='num'>0,28</td><td class='num'>0,28</td></tr>" +
                "</tbody></table></div>" +
                "<p>Opcje „at-the-money” mają tylko wartość czasową. Delta call 0,57 oznacza, że wzrost akcji o 1 zł podnosi cenę opcji o ok. 0,57 zł. Możesz sprawdzić inne parametry w <a href='#/tools'>kalkulatorze opcji</a>.</p>" },
        { id: "greeks", title: "Greki",
          html: "<ul>" +
                "<li><strong>Delta</strong> — wrażliwość na cenę bazy. Call: 0 → 1, put: −1 → 0. Mówi też, ilu „akcjom” odpowiada opcja.</li>" +
                "<li><strong>Gamma</strong> — jak szybko zmienia się delta. Duża przy opcjach at-the-money tuż przed wygaśnięciem — wtedy ekspozycja skacze.</li>" +
                "<li><strong>Vega</strong> — wrażliwość na zmienność. Kupujący opcje zyskują na wzroście zmienności.</li>" +
                "<li><strong>Theta</strong> — utrata wartości z każdym dniem (dla kupującego koszt, dla wystawcy dochód).</li>" +
                "<li><strong>Rho</strong> — wrażliwość na stopę procentową (zwykle mniej ważna).</li>" +
                "</ul>" },
        { id: "positions", title: "Kupno a wystawienie",
          html: "<table class='calc'><thead><tr><th>Pozycja</th><th>Maks. strata</th><th>Maks. zysk</th><th>Dla compliance</th></tr></thead><tbody>" +
                "<tr><td>Long call</td><td>Premia</td><td>Nieograniczony</td><td>Ekspozycja = delta-ekwiwalent</td></tr>" +
                "<tr><td>Long put</td><td>Premia</td><td>Strike − premia</td><td>Często hedging</td></tr>" +
                "<tr><td>Short call</td><td>Nieograniczona</td><td>Premia</td><td>Wymaga pokrycia (instrument bazowy)</td></tr>" +
                "<tr><td>Short put</td><td>Strike − premia</td><td>Premia</td><td>Wymaga pokrycia (gotówka)</td></tr>" +
                "</tbody></table>" },
        { id: "compliance", title: "Znaczenie dla compliance",
          html: "<ul>" +
                "<li>Ekspozycja opcji w metodzie zaangażowania = ekwiwalent delta. Zmienia się codziennie bez żadnej transakcji — limit ekspozycji może zostać przekroczony pasywnie.</li>" +
                "<li>Metoda zaangażowania nie oddaje ryzyka gamma i vega. Przy istotnym użyciu opcji (szczególnie wystawianych i egzotycznych) nadzorcy oczekują metody VaR.</li>" +
                "<li>Opcje wbudowane w papiery (warranty, obligacje zamienne, certyfikaty) też liczą się do ekspozycji.</li>" +
                "</ul>" }
      ],
      glossary: [
        ["Intrinsic value", "Wartość wewnętrzna — wypłata opcji przy natychmiastowym wykonaniu."],
        ["Time value", "Wartość czasowa — część ceny opcji ponad wartość wewnętrzną."],
        ["Gamma", "Tempo zmiany delty opcji przy ruchu ceny instrumentu bazowego."],
        ["Vega", "Wrażliwość ceny opcji na zmianę zmienności."],
        ["Theta", "Utrata wartości opcji z upływem czasu."]
      ]
    },
    en: {
      summary: "An option gives the right to buy (call) or sell (put) at a set price. Its price is made up of intrinsic value and time value. The Greeks measure how the option price reacts to market changes: delta (underlying price), gamma (change in delta), vega (volatility), theta (passage of time). For compliance delta matters most, because option exposure is measured in delta terms.",
      keyFacts: [
        ["Call / put", "Right to buy / right to sell the underlying at the strike."],
        ["Premium", "Option price = intrinsic value + time value."],
        ["Model", "Black-Scholes (equities, indices), Garman-Kohlhagen (FX), Black/Bachelier (rates)."],
        ["UCITS exposure", "Quantity × contract size × underlying price × delta."]
      ],
      sections: [
        { id: "payoff", title: "Payoff and value",
          html: "<p class='formula'>Call: max(S − K, 0)   ·   Put: max(K − S, 0)</p>" +
                "<ul>" +
                "<li><strong>Intrinsic value</strong> — what the option would pay if exercised now.</li>" +
                "<li><strong>Time value</strong> — the extra paid for the chance the option gains before expiry; it decays to zero over time.</li>" +
                "</ul>" +
                "<p>The option price rises with: time to expiry, market volatility and (for a call) the underlying price.</p>" },
        { id: "example", title: "Pricing example",
          html: "<p>Share = 100, strike = 100, 6 months, rate 3%, volatility 20% a year (Black-Scholes):</p>" +
                "<div class='table-scroll'><table class='calc'><thead><tr><th>Measure</th><th class='num'>Call</th><th class='num'>Put</th></tr></thead><tbody>" +
                "<tr><td>Option price</td><td class='num'>6.37</td><td class='num'>4.88</td></tr>" +
                "<tr><td>Intrinsic value</td><td class='num'>0</td><td class='num'>0</td></tr>" +
                "<tr><td>Delta</td><td class='num'>0.57</td><td class='num'>−0.43</td></tr>" +
                "<tr><td>Gamma</td><td class='num'>0.028</td><td class='num'>0.028</td></tr>" +
                "<tr><td>Vega (per 1 pp of volatility)</td><td class='num'>0.28</td><td class='num'>0.28</td></tr>" +
                "</tbody></table></div>" +
                "<p>At-the-money options have only time value. A call delta of 0.57 means a PLN 1 rise in the share lifts the option by about PLN 0.57. Try other inputs in the <a href='#/tools'>option calculator</a>.</p>" },
        { id: "greeks", title: "The Greeks",
          html: "<ul>" +
                "<li><strong>Delta</strong> — sensitivity to the underlying price. Call: 0 → 1, put: −1 → 0. It also tells you how many \"shares\" the option is equivalent to.</li>" +
                "<li><strong>Gamma</strong> — how fast delta changes. High for at-the-money options near expiry — exposure then jumps.</li>" +
                "<li><strong>Vega</strong> — sensitivity to volatility. Option buyers gain when volatility rises.</li>" +
                "<li><strong>Theta</strong> — value lost each day (a cost for the buyer, income for the writer).</li>" +
                "<li><strong>Rho</strong> — sensitivity to the interest rate (usually less important).</li>" +
                "</ul>" },
        { id: "positions", title: "Buying vs writing",
          html: "<table class='calc'><thead><tr><th>Position</th><th>Max loss</th><th>Max gain</th><th>For compliance</th></tr></thead><tbody>" +
                "<tr><td>Long call</td><td>Premium</td><td>Unlimited</td><td>Exposure = delta-equivalent</td></tr>" +
                "<tr><td>Long put</td><td>Premium</td><td>Strike − premium</td><td>Often a hedge</td></tr>" +
                "<tr><td>Short call</td><td>Unlimited</td><td>Premium</td><td>Requires cover (the underlying)</td></tr>" +
                "<tr><td>Short put</td><td>Strike − premium</td><td>Premium</td><td>Requires cover (cash)</td></tr>" +
                "</tbody></table>" },
        { id: "compliance", title: "Why it matters for compliance",
          html: "<ul>" +
                "<li>Option exposure under the commitment approach = delta-equivalent. It changes daily without any trade — the exposure limit can be breached passively.</li>" +
                "<li>The commitment approach does not capture gamma and vega risk. With significant option use (especially written and exotic options) regulators expect the VaR approach.</li>" +
                "<li>Options embedded in securities (warrants, convertibles, certificates) also count towards exposure.</li>" +
                "</ul>" }
      ],
      glossary: [
        ["Intrinsic value", "The option's payout if exercised immediately."],
        ["Time value", "The part of the option price above intrinsic value."],
        ["Gamma", "The rate of change of an option's delta as the underlying moves."],
        ["Vega", "Sensitivity of the option price to a change in volatility."],
        ["Theta", "Loss of option value over time."]
      ]
    }
  }
});

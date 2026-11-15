window.INSTRUMENTS.push({
  id: "listed-equity-option",
  name: "Listed Equity Option",
  aliases: ["Equity Index Option", "Stock Option", "Call", "Put", "OESX", "opcja giełdowa"],
  market: "exchange",
  asset: { pl: "Derywaty giełdowe — akcyjne", en: "Listed derivatives — equity" },
  sources: ["ucits", "eligible", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "ssr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Opcja giełdowa daje kupującemu prawo, ale nie obowiązek, kupna (call) lub sprzedaży (put) akcji albo wartości indeksu po z góry ustalonej cenie (strike) do określonej daty. Kupujący płaci za to prawo premię, a wystawca przyjmuje obowiązek i musi wnosić depozyt.",
      keyFacts: [
        ["Rynek", "Giełda instrumentów pochodnych (np. Eurex, CBOE, GPW); rozliczenie przez CCP."],
        ["Typy", "Call (prawo kupna) i put (prawo sprzedaży)."],
        ["Styl wykonania", "Europejski (tylko w dniu wygaśnięcia — typowe dla opcji na indeks) lub amerykański (w dowolnym dniu — typowe dla opcji na akcje)."],
        ["Wielkość kontraktu", "Opcje na akcje zwykle 100 akcji. Euro Stoxx 50 (OESX): 10 EUR za punkt."],
        ["Rozliczenie", "Opcje na indeks: gotówkowe. Opcje na akcje: zwykle fizyczna dostawa akcji."],
        ["Przepływ na starcie", "Kupujący płaci premię. Wystawca ją dostaje i wnosi depozyt (margin)."],
        ["Kod CFI", "<code>OC****</code> (Options – Call), <code>OP****</code> (Options – Put)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p>Opcja to asymetryczny kontrakt. Kupujący (<em>holder</em>, pozycja długa) ma prawo, wystawca (<em>writer</em>, pozycja krótka) ma obowiązek.</p>" +
            "<ul>" +
              "<li><strong>Long call</strong> — zyskuje, gdy cena rośnie powyżej strike'u. Maksymalna strata = premia.</li>" +
              "<li><strong>Long put</strong> — zyskuje, gdy cena spada poniżej strike'u. Klasyczne zabezpieczenie portfela.</li>" +
              "<li><strong>Short call</strong> — dostaje premię. Strata teoretycznie nieograniczona, chyba że wystawca ma akcje (<em>covered call</em>).</li>" +
              "<li><strong>Short put</strong> — dostaje premię, a w zamian zobowiązuje się kupić akcje po strike'u, jeśli kupujący wykona opcję.</li>" +
            "</ul>" +
            "<p class='formula'>Wypłata call = max(S − K, 0); wypłata put = max(K − S, 0)</p>" +
            "<p>S — cena instrumentu bazowego w chwili wykonania, K — cena wykonania (strike). Opcja jest <em>in-the-money</em>, gdy wykonanie dałoby dodatnią wypłatę, <em>at-the-money</em> przy S ≈ K i <em>out-of-the-money</em> w pozostałych przypadkach.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Wybór serii.</strong> Instrument bazowy, typ (call/put), strike, termin wygaśnięcia. Giełda notuje wiele serii jednocześnie.</li>" +
              "<li><strong>Zawarcie i premia.</strong> Kupujący płaci premię (cena opcji × wielkość kontraktu) w dniu rozliczenia transakcji. Na niektórych giełdach część opcji jest rozliczana w stylu futures (bez zapłaty premii z góry, z codziennym VM).</li>" +
              "<li><strong>Depozyt wystawcy.</strong> CCP wymaga od wystawcy depozytu zależnego od ryzyka pozycji. Depozyt zmienia się codziennie razem z wyceną.</li>" +
              "<li><strong>W trakcie.</strong> Cena opcji zmienia się z ceną instrumentu bazowego, zmiennością, czasem do wygaśnięcia i stopami (model Blacka-Scholesa i pochodne).</li>" +
              "<li><strong>Wykonanie lub wygaśnięcie.</strong> Opcje in-the-money są zwykle wykonywane automatycznie w dniu wygaśnięcia. Opcja na indeks rozliczana jest gotówką, a opcja na akcje — dostawą akcji przez CSD. Opcje out-of-the-money wygasają bez wartości.</li>" +
              "<li><strong>Zamknięcie przed terminem.</strong> Najczęściej pozycję zamyka się transakcją odwrotną na giełdzie.</li>" +
            "</ol>" +
            "<h3>Greki — wrażliwości</h3>" +
            "<ul>" +
              "<li><strong>Delta</strong> — o ile zmieni się cena opcji przy zmianie ceny instrumentu bazowego o 1 (call: 0 do 1, put: −1 do 0). Kluczowa dla compliance, bo ekspozycję opcji liczy się w ekwiwalencie delta.</li>" +
              "<li><strong>Gamma</strong> — jak szybko zmienia się delta.</li>" +
              "<li><strong>Vega</strong> — wrażliwość na zmienność.</li>" +
              "<li><strong>Theta</strong> — utrata wartości z upływem czasu.</li>" +
            "</ul>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz akcyjny (NAV 100 mln EUR) chce zabezpieczyć się przed spadkiem rynku. Euro Stoxx 50 = 5 000. Kupuje 100 opcji put OESX ze strike'iem 4 800, premia 60 pkt, delta −0,30.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Premia zapłacona</td><td>100 × 60 × 10</td><td class='num'>60 000 EUR</td></tr>" +
              "<tr><td>Ekspozycja w metodzie zaangażowania</td><td>100 × 10 × 5 000 × 0,30</td><td class='num'>1 500 000 EUR (1,5% NAV)</td></tr>" +
              "<tr><td>Wygaśnięcie: indeks 4 500 — wypłata</td><td>100 × (4 800 − 4 500) × 10</td><td class='num'>+300 000 EUR</td></tr>" +
              "<tr><td>Wynik netto przy indeksie 4 500</td><td>300 000 − 60 000</td><td class='num'>+240 000 EUR</td></tr>" +
              "<tr><td>Wygaśnięcie: indeks ≥ 4 800</td><td>opcje bez wartości</td><td class='num'>−60 000 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<p>Opcja działa jak ubezpieczenie: koszt jest znany z góry (premia), a ochrona zaczyna działać poniżej 4 800.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Ekspozycja całkowita:</strong> opcje przelicza się w ekwiwalencie delta. Ekspozycja zmienia się codziennie razem z deltą, nawet bez nowych transakcji.</li>" +
              "<li><strong>Kupione opcje put</strong> na indeks, który odpowiada portfelowi, mogą spełniać warunki hedgingu i być kompensowane.</li>" +
              "<li><strong>Gdyby fundusz wystawił opcje</strong>, musiałby mieć pokrycie: akcje (dla short call z dostawą) lub płynne aktywa (dla opcji rozliczanych gotówką i short put).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> cena rozliczeniowa giełdy. Przy braku obrotu w danej serii — cena teoretyczna z modelu z bieżącą zmiennością implikowaną.</p>" +
            "<ul>" +
              "<li><strong>Kupujący:</strong> ryzyko utraty całej premii; theta działa na niekorzyść.</li>" +
              "<li><strong>Wystawca:</strong> ryzyko dużych strat (short call — nieograniczone), wzrost depozytu przy ruchu rynku.</li>" +
              "<li><strong>Ryzyko zmienności</strong> (vega) — wycena zmienia się bez ruchu ceny instrumentu bazowego.</li>" +
              "<li><strong>Ryzyko przydziału</strong> — wystawca opcji amerykańskiej może zostać wezwany do dostawy lub odbioru akcji przed terminem.</li>" +
              "<li><strong>Ryzyko płynności</strong> — dalekie serie bywają mało płynne.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie, give-up do clearing brokera, rejestracja w CCP.</li>" +
              "<li>Rozliczenie premii (zwykle T+1), depozyt wystawcy.</li>" +
              "<li>Codzienna wycena, zmiany depozytu, zdarzenia korporacyjne (korekta strike'u i wielkości kontraktu przy splitach, dywidendach nadzwyczajnych).</li>" +
              "<li>Wykonanie, przydział, wygaśnięcie; przy opcjach na akcje — rozliczenie dostawy akcji.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Opcje notowane na rynku regulowanym na dopuszczalne aktywa (akcje) lub indeksy finansowe.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>art. 51 ust. 3; CESR/10-788</span></h4><p>Liczba kontraktów × wielkość kontraktu × wartość rynkowa instrumentu bazowego × delta.</p></div>" +
              "<div class='rule'><h4>Look-through <span class='law'>art. 51 ust. 3</span></h4><p>Opcja na pojedynczą akcję daje ekspozycję na jej emitenta, wliczaną do limitów art. 52 (w praktyce w ekwiwalencie delta, zgodnie z polityką). Opcje na indeks finansowy — bez look-through.</p></div>" +
              "<div class='rule'><h4>Pokrycie</h4><p>Wystawiona opcja z dostawą fizyczną: fundusz ma instrument bazowy (short call) lub płynne środki (short put). Opcja rozliczana gotówką: płynne aktywa wystarczające na zobowiązanie. Niekryta sprzedaż papierów jest zakazana (art. 89).</p></div>" +
              "<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1 (po dyr. 2024/2994)</span></h4><p>Opcje rozliczane przez CCP autoryzowaną lub uznaną wg EMIR są wyłączone z limitów kontrahenta. Monitoruje się depozyty u brokera.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: konwersja w ekwiwalencie delta (liczba kontraktów × wielkość kontraktu × wartość instrumentu bazowego × delta).</li>" +
              "<li>Limity strategii opcyjnych (np. maksymalny nominał wystawionych opcji) — według dokumentów AIF.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie (EMIR, SSR)",
          html:
            "<ul>" +
              "<li><strong>EMIR art. 9</strong> — raport do repozytorium do T+1, jak dla każdego derywatu giełdowego. Raportuje spółka zarządzająca lub ZAFI.</li>" +
              "<li><strong>SSR</strong> — long put i short call na akcje tworzą pozycję krótką netto (w ekwiwalencie delta), która wlicza się do progów zgłoszeń (od 0,1% kapitału).</li>" +
              "<li><strong>Znaczne pakiety</strong> — instrumenty dające prawo nabycia akcji (long call z dostawą) mogą wliczać się do progów zawiadomień według dyrektywy o przejrzystości.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> serii, <strong>kod produktu</strong> giełdy (np. <code>OESX</code> na Eurex) plus strike i termin.</li>" +
              "<li><strong>CFI</strong> — kategoria <code>O</code> (Options), grupa <code>C</code> (Call) lub <code>P</code> (Put).</li>" +
              "<li><strong>MIC</strong> giełdy, <strong>ISIN/LEI</strong> instrumentu bazowego.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Kierunek (kupno/wystawienie) i typ (call/put) poprawnie zmapowane.</li>" +
              "<li>Ekspozycja całkowita w ekwiwalencie delta, codziennie aktualizowana.</li>" +
              "<li>Pokrycie dla wystawionych opcji.</li>" +
              "<li>Look-through do emitenta dla opcji na pojedyncze akcje.</li>" +
              "<li>Kalendarz wygaśnięć i ryzyko dostawy (czy fundusz może przyjąć lub dostarczyć akcje?).</li>" +
              "<li>Raport EMIR, pozycje krótkie netto wg SSR.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Strike (cena wykonania)", "Cena, po której można kupić lub sprzedać instrument bazowy."],
        ["Premium", "Cena opcji płacona przez kupującego."],
        ["Delta-equivalent", "Ekspozycja opcji przeliczona na instrument bazowy przez pomnożenie przez deltę."],
        ["Assignment", "Przydział — wskazanie wystawcy, który musi zrealizować wykonaną opcję."],
        ["Implied volatility", "Zmienność implikowana — zmienność, przy której model daje bieżącą cenę rynkową opcji."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A listed option gives the buyer the right, but not the obligation, to buy (call) or sell (put) a share or an index value at a pre-agreed price (strike) up to a set date. The buyer pays a premium for this right, while the writer takes on the obligation and must post margin.",
      keyFacts: [
        ["Market", "Derivatives exchange (e.g. Eurex, CBOE, Warsaw Stock Exchange); cleared through a CCP."],
        ["Types", "Call (right to buy) and put (right to sell)."],
        ["Exercise style", "European (on expiry only — typical for index options) or American (any day — typical for stock options)."],
        ["Contract size", "Stock options usually 100 shares. Euro Stoxx 50 (OESX): EUR 10 per point."],
        ["Settlement", "Index options: cash. Stock options: usually physical delivery of shares."],
        ["Cash flow at inception", "Buyer pays the premium. Writer receives it and posts margin."],
        ["CFI code", "<code>OC****</code> (Options – Call), <code>OP****</code> (Options – Put)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>An option is an asymmetric contract. The buyer (holder, long) has a right; the writer (short) has an obligation.</p>" +
            "<ul>" +
              "<li><strong>Long call</strong> — gains when the price rises above the strike. Maximum loss = premium.</li>" +
              "<li><strong>Long put</strong> — gains when the price falls below the strike. The classic portfolio hedge.</li>" +
              "<li><strong>Short call</strong> — receives the premium. Loss is theoretically unlimited unless the writer holds the shares (covered call).</li>" +
              "<li><strong>Short put</strong> — receives the premium in exchange for committing to buy the shares at the strike if the buyer exercises.</li>" +
            "</ul>" +
            "<p class='formula'>Call payoff = max(S − K, 0); put payoff = max(K − S, 0)</p>" +
            "<p>S — underlying price at exercise, K — strike. An option is in-the-money when exercise would pay out, at-the-money when S ≈ K, and out-of-the-money otherwise.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Choosing the series.</strong> Underlying, type (call/put), strike, expiry. The exchange lists many series at once.</li>" +
              "<li><strong>Execution and premium.</strong> The buyer pays the premium (option price × contract size) on the trade's settlement date. On some exchanges certain options are futures-style (no upfront premium, daily VM).</li>" +
              "<li><strong>Writer's margin.</strong> The CCP requires the writer to post margin based on the position's risk. Margin changes daily with valuation.</li>" +
              "<li><strong>During the life.</strong> The option price moves with the underlying price, volatility, time to expiry and interest rates (Black-Scholes and related models).</li>" +
              "<li><strong>Exercise or expiry.</strong> In-the-money options are usually exercised automatically at expiry. An index option settles in cash, and a stock option by delivery of shares through the CSD. Out-of-the-money options expire worthless.</li>" +
              "<li><strong>Closing early.</strong> Most positions are closed with an offsetting trade on the exchange.</li>" +
            "</ol>" +
            "<h3>The Greeks — sensitivities</h3>" +
            "<ul>" +
              "<li><strong>Delta</strong> — how much the option price changes for a 1-unit change in the underlying (call: 0 to 1, put: −1 to 0). Key for compliance, because option exposure is measured on a delta-equivalent basis.</li>" +
              "<li><strong>Gamma</strong> — how fast delta changes.</li>" +
              "<li><strong>Vega</strong> — sensitivity to volatility.</li>" +
              "<li><strong>Theta</strong> — loss of value as time passes.</li>" +
            "</ul>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>An equity fund (NAV EUR 100m) wants to protect against a market fall. Euro Stoxx 50 = 5,000. It buys 100 OESX puts with a 4,800 strike, premium 60 points, delta −0.30.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>Premium paid</td><td>100 × 60 × 10</td><td class='num'>EUR 60,000</td></tr>" +
              "<tr><td>Commitment exposure</td><td>100 × 10 × 5,000 × 0.30</td><td class='num'>EUR 1,500,000 (1.5% of NAV)</td></tr>" +
              "<tr><td>Expiry: index 4,500 — payout</td><td>100 × (4,800 − 4,500) × 10</td><td class='num'>+EUR 300,000</td></tr>" +
              "<tr><td>Net result with index at 4,500</td><td>300,000 − 60,000</td><td class='num'>+EUR 240,000</td></tr>" +
              "<tr><td>Expiry: index ≥ 4,800</td><td>options worthless</td><td class='num'>−EUR 60,000</td></tr>" +
            "</tbody></table></div>" +
            "<p>The option works like insurance: the cost is known upfront (the premium), and protection kicks in below 4,800.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Global exposure:</strong> options are converted on a delta-equivalent basis. Exposure changes daily with delta, even without new trades.</li>" +
              "<li><strong>Puts bought</strong> on an index matching the portfolio may meet the hedging conditions and be netted.</li>" +
              "<li><strong>Had the fund written options</strong>, it would need cover: shares (for a physically settled short call) or liquid assets (for cash-settled options and short puts).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> the exchange settlement price. Where a series has not traded — theoretical model price using current implied volatility.</p>" +
            "<ul>" +
              "<li><strong>Buyer:</strong> risk of losing the whole premium; theta works against it.</li>" +
              "<li><strong>Writer:</strong> risk of large losses (short call — unlimited), rising margin as the market moves.</li>" +
              "<li><strong>Volatility risk</strong> (vega) — value changes without any move in the underlying.</li>" +
              "<li><strong>Assignment risk</strong> — the writer of an American option may be called on to deliver or take shares before expiry.</li>" +
              "<li><strong>Liquidity risk</strong> — far-from-the-money or long-dated series can be illiquid.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution, give-up to the clearing broker, CCP registration.</li>" +
              "<li>Premium settlement (usually T+1), writer's margin.</li>" +
              "<li>Daily valuation, margin changes, corporate actions (strike and contract size adjusted for splits and special dividends).</li>" +
              "<li>Exercise, assignment, expiry; for stock options — settlement of share delivery.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>Options listed on a regulated market on eligible assets (shares) or financial indices.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>Art. 51(3); CESR/10-788</span></h4><p>Number of contracts × contract size × market value of the underlying × delta.</p></div>" +
              "<div class='rule'><h4>Look-through <span class='law'>Art. 51(3)</span></h4><p>A single-stock option gives exposure to that issuer, which counts towards the Art. 52 limits (in practice on a delta-equivalent basis, per policy). Options on financial indices — no look-through.</p></div>" +
              "<div class='rule'><h4>Cover</h4><p>Written physically settled option: the fund holds the underlying (short call) or liquid assets (short put). Cash-settled option: liquid assets sufficient to meet the obligation. Uncovered sales of securities are prohibited (Art. 89).</p></div>" +
              "<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1) (after Dir. 2024/2994)</span></h4><p>Options cleared through a CCP authorised or recognised under EMIR are excluded from counterparty limits. Margin held with the broker is monitored.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: delta-equivalent conversion (number of contracts × contract size × underlying value × delta).</li>" +
              "<li>Limits on option strategies (e.g. maximum notional of options written) — per the AIF's documents.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting (EMIR, SSR)",
          html:
            "<ul>" +
              "<li><strong>EMIR Art. 9</strong> — trade repository report by T+1, as for any exchange-traded derivative. Reported by the management company or AIFM.</li>" +
              "<li><strong>SSR</strong> — long puts and short calls on shares create a net short position (delta-equivalent) that counts towards the notification thresholds (from 0.1% of share capital).</li>" +
              "<li><strong>Major holdings</strong> — instruments giving a right to acquire shares (physically settled long calls) may count towards the Transparency Directive notification thresholds.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li>Series <strong>ISIN</strong>, exchange <strong>product code</strong> (e.g. <code>OESX</code> on Eurex) plus strike and expiry.</li>" +
              "<li><strong>CFI</strong> — category <code>O</code> (Options), group <code>C</code> (Call) or <code>P</code> (Put).</li>" +
              "<li>Exchange <strong>MIC</strong>, underlying <strong>ISIN/LEI</strong>.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Direction (bought/written) and type (call/put) correctly mapped.</li>" +
              "<li>Global exposure on a delta-equivalent basis, updated daily.</li>" +
              "<li>Cover for written options.</li>" +
              "<li>Issuer look-through for single-stock options.</li>" +
              "<li>Expiry calendar and delivery risk (can the fund take or deliver the shares?).</li>" +
              "<li>EMIR report, SSR net short positions.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Strike", "The price at which the underlying can be bought or sold."],
        ["Premium", "The option price paid by the buyer."],
        ["Delta-equivalent", "Option exposure converted into the underlying by multiplying by delta."],
        ["Assignment", "Designation of the writer who must fulfil an exercised option."],
        ["Implied volatility", "The volatility at which the model gives the current market price of the option."]
      ]
    }
  }
});

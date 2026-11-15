window.BASICS.push({
  id: "global-exposure",
  title: { pl: "Ekspozycja całkowita: metoda zaangażowania i VaR", en: "Global exposure: commitment approach and VaR" },
  level: 2,
  prereq: ["derivatives", "leverage"],
  sources: ["ucits", "cesr10788", "aifmdL2"],
  related: ["equity-index-future", "listed-equity-option", "stir-future", "fx-forward"],
  content: {
    pl: {
      summary: "UCITS musi codziennie liczyć ekspozycję całkowitą (global exposure) z instrumentów pochodnych. Prostsze fundusze stosują metodę zaangażowania: każdy derywat przelicza się na ekwiwalent instrumentu bazowego, a suma nie może przekroczyć 100% NAV. Fundusze o złożonych strategiach stosują VaR — miarę możliwej straty. W AIF podobną rolę pełni dźwignia liczona metodą brutto i zaangażowania.",
      keyFacts: [
        ["Podstawa", "Art. 51 ust. 3 UCITS; wytyczne CESR/10-788."],
        ["Metoda zaangażowania", "Ekspozycja z derywatów ≤ 100% NAV."],
        ["VaR absolutny", "≤ 20% NAV (99%, 20 dni roboczych)."],
        ["VaR relatywny", "≤ 2 × VaR portfela referencyjnego."]
      ],
      sections: [
        { id: "commitment", title: "Metoda zaangażowania krok po kroku",
          html: "<ol class='steps'>" +
                "<li><strong>Konwersja.</strong> Każdy derywat → ekwiwalent instrumentu bazowego, w walucie bazowej funduszu (tabela konwersji w CESR/10-788, przykłady poniżej).</li>" +
                "<li><strong>Kompensowanie (netting).</strong> Pozycje przeciwne na ten sam instrument bazowy (np. long i short futures na ten sam indeks) można odjąć.</li>" +
                "<li><strong>Hedging.</strong> Derywaty zabezpieczające ryzyko posiadanych aktywów można odjąć, jeśli spełniają kryteria wytycznych (ta sama klasa aktywów, rzeczywiste ograniczenie ryzyka, skuteczność także w warunkach stresu).</li>" +
                "<li><strong>Duration netting</strong> dla portfeli stopy procentowej — według przedziałów terminów i wrażliwości.</li>" +
                "<li><strong>Suma ≤ 100% NAV.</strong></li>" +
                "</ol>" +
                "<p>Niektóre derywaty nie generują ekspozycji (np. swap zamieniający zwrot z posiadanych aktywów na zwrot z innych, gdy nie powstaje dodatkowe ryzyko).</p>" },
        { id: "conversion", title: "Najważniejsze konwersje (CESR/10-788)",
          html: "<table class='calc'><thead><tr><th>Instrument</th><th>Ekspozycja</th></tr></thead><tbody>" +
                "<tr><td>Futures na indeks / akcje</td><td>Liczba kontraktów × wielkość kontraktu × cena (bazy lub futures)</td></tr>" +
                "<tr><td>Futures na obligacje</td><td>Liczba × nominał kontraktu × cena obligacji CTD</td></tr>" +
                "<tr><td>Futures na stopę (STIR)</td><td>Liczba × nominał kontraktu</td></tr>" +
                "<tr><td>Opcje</td><td>Liczba × wielkość × cena bazy × delta</td></tr>" +
                "<tr><td>IRS plain vanilla</td><td>Wartość rynkowa bazy (lub nominał nogi stałej)</td></tr>" +
                "<tr><td>Swapy walutowe, CCS, FX forward</td><td>Nominał nogi (nóg) walutowej</td></tr>" +
                "<tr><td>TRS</td><td>Wartość rynkowa aktywów referencyjnych</td></tr>" +
                "<tr><td>CDS — sprzedający / kupujący</td><td>Wyższa z: wartość bazy, nominał / wartość bazy</td></tr>" +
                "<tr><td>Warranty, obligacje zamienne</td><td>Liczba akcji × cena × delta</td></tr>" +
                "</tbody></table>" },
        { id: "example", title: "Przykład",
          html: "<p>Fundusz (NAV 100 mln EUR):</p>" +
                "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th class='num'>Ekspozycja</th></tr></thead><tbody>" +
                "<tr><td>Long futures na Euro Stoxx 50</td><td class='num'>30 mln</td></tr>" +
                "<tr><td>IRS receiver, nominał</td><td class='num'>20 mln</td></tr>" +
                "<tr><td>FX forward zabezpieczający aktywa w USD (hedging)</td><td class='num'>15 mln → 0 po hedgingu</td></tr>" +
                "<tr><td>Long put na indeks, delta −0,3 na 10 mln</td><td class='num'>3 mln (może być hedgingiem)</td></tr>" +
                "<tr><td><strong>Razem (bez puta jako hedge)</strong></td><td class='num'><strong>53 mln = 53% NAV</strong></td></tr>" +
                "</tbody></table></div>" +
                "<p>Ten sam portfel można sprawdzić w <a href='#/tools'>kalkulatorze ekspozycji</a>.</p>" },
        { id: "var", title: "Metoda VaR",
          html: "<p><strong>Value at Risk</strong> to strata, której z określonym prawdopodobieństwem nie przekroczy portfel w danym czasie. UCITS: przedział ufności 99%, horyzont 20 dni roboczych, co najmniej rok danych historycznych.</p>" +
                "<ul>" +
                "<li><strong>VaR absolutny</strong> ≤ 20% NAV — dla funduszy bez sensownego benchmarku (np. absolute return).</li>" +
                "<li><strong>VaR relatywny</strong> ≤ 2 × VaR portfela referencyjnego bez derywatów — dla funduszy z benchmarkiem.</li>" +
                "<li>Obowiązkowe: backtesting, stress testy, a dla funduszy VaR — ujawnienie oczekiwanej dźwigni brutto w prospekcie.</li>" +
                "</ul>" +
                "<p>VaR jest wymagany, gdy fundusz stosuje złożone strategie, ma istotną ekspozycję na derywaty egzotyczne albo gdy metoda zaangażowania nie oddaje ryzyka.</p>" },
        { id: "aifmd", title: "AIFMD — dźwignia",
          html: "<p>W AIF liczy się dźwignię w dwóch metodach (rozp. 231/2013): <strong>brutto</strong> (bez kompensowania, bez gotówki) i <strong>zaangażowania</strong> (z nettingiem i hedgingiem). Zasady konwersji derywatów są bardzo podobne do UCITS (załącznik II). Zob. <a href='#/basics/leverage'>Dźwignia</a>.</p>" }
      ],
      glossary: [
        ["Global exposure", "Ekspozycja całkowita UCITS z instrumentów pochodnych."],
        ["Commitment approach", "Metoda zaangażowania — przeliczenie derywatów na ekwiwalent bazy."],
        ["Value at Risk (VaR)", "Strata, której portfel nie przekroczy z danym prawdopodobieństwem w danym horyzoncie."],
        ["Reference portfolio", "Portfel referencyjny bez derywatów, używany w VaR relatywnym."],
        ["Backtesting", "Porównanie prognoz VaR z rzeczywistymi wynikami."]
      ]
    },
    en: {
      summary: "A UCITS must compute its global exposure from derivatives every day. Simpler funds use the commitment approach: each derivative is converted into the underlying equivalent, and the total may not exceed 100% of NAV. Funds with complex strategies use VaR — a measure of potential loss. In AIFs a similar role is played by leverage on the gross and commitment methods.",
      keyFacts: [
        ["Basis", "Art. 51(3) UCITS; CESR/10-788 guidelines."],
        ["Commitment approach", "Derivative exposure ≤ 100% of NAV."],
        ["Absolute VaR", "≤ 20% of NAV (99%, 20 business days)."],
        ["Relative VaR", "≤ 2 × the reference portfolio's VaR."]
      ],
      sections: [
        { id: "commitment", title: "The commitment approach, step by step",
          html: "<ol class='steps'>" +
                "<li><strong>Conversion.</strong> Each derivative → underlying equivalent, in the fund's base currency (conversion table in CESR/10-788, examples below).</li>" +
                "<li><strong>Netting.</strong> Opposite positions on the same underlying (e.g. long and short futures on the same index) may be offset.</li>" +
                "<li><strong>Hedging.</strong> Derivatives hedging the risk of assets held may be offset if they meet the guidelines' criteria (same asset class, genuine risk reduction, effective also under stress).</li>" +
                "<li><strong>Duration netting</strong> for interest rate portfolios — by maturity buckets and sensitivity.</li>" +
                "<li><strong>Total ≤ 100% of NAV.</strong></li>" +
                "</ol>" +
                "<p>Some derivatives create no exposure (e.g. a swap exchanging the return of assets held for the return of other assets, where no additional risk arises).</p>" },
        { id: "conversion", title: "Key conversions (CESR/10-788)",
          html: "<table class='calc'><thead><tr><th>Instrument</th><th>Exposure</th></tr></thead><tbody>" +
                "<tr><td>Index / equity futures</td><td>Contracts × contract size × price (underlying or futures)</td></tr>" +
                "<tr><td>Bond futures</td><td>Contracts × contract nominal × CTD bond price</td></tr>" +
                "<tr><td>Interest rate futures (STIR)</td><td>Contracts × contract nominal</td></tr>" +
                "<tr><td>Options</td><td>Contracts × size × underlying price × delta</td></tr>" +
                "<tr><td>Plain vanilla IRS</td><td>Underlying market value (or fixed-leg notional)</td></tr>" +
                "<tr><td>Currency swaps, CCS, FX forwards</td><td>Notional of the currency leg(s)</td></tr>" +
                "<tr><td>TRS</td><td>Market value of the reference assets</td></tr>" +
                "<tr><td>CDS — seller / buyer</td><td>Higher of underlying value and notional / underlying value</td></tr>" +
                "<tr><td>Warrants, convertibles</td><td>Shares × price × delta</td></tr>" +
                "</tbody></table>" },
        { id: "example", title: "Example",
          html: "<p>A fund (NAV EUR 100m):</p>" +
                "<div class='table-scroll'><table class='calc'><thead><tr><th>Position</th><th class='num'>Exposure</th></tr></thead><tbody>" +
                "<tr><td>Long Euro Stoxx 50 futures</td><td class='num'>30m</td></tr>" +
                "<tr><td>Receiver IRS, notional</td><td class='num'>20m</td></tr>" +
                "<tr><td>FX forward hedging USD assets (hedge)</td><td class='num'>15m → 0 after hedging</td></tr>" +
                "<tr><td>Long index put, delta −0.3 on 10m</td><td class='num'>3m (may be a hedge)</td></tr>" +
                "<tr><td><strong>Total (put not treated as hedge)</strong></td><td class='num'><strong>53m = 53% of NAV</strong></td></tr>" +
                "</tbody></table></div>" +
                "<p>You can test the same portfolio in the <a href='#/tools'>exposure calculator</a>.</p>" },
        { id: "var", title: "The VaR approach",
          html: "<p><strong>Value at Risk</strong> is the loss the portfolio will not exceed with a given probability over a given period. UCITS: 99% confidence, 20 business days, at least one year of history.</p>" +
                "<ul>" +
                "<li><strong>Absolute VaR</strong> ≤ 20% of NAV — for funds without a meaningful benchmark (e.g. absolute return).</li>" +
                "<li><strong>Relative VaR</strong> ≤ 2 × the VaR of a derivative-free reference portfolio — for benchmarked funds.</li>" +
                "<li>Mandatory: backtesting, stress tests, and for VaR funds — disclosure of expected gross leverage in the prospectus.</li>" +
                "</ul>" +
                "<p>VaR is required when a fund uses complex strategies, has significant exposure to exotic derivatives, or when the commitment approach does not capture the risk.</p>" },
        { id: "aifmd", title: "AIFMD — leverage",
          html: "<p>AIFs compute leverage on two methods (Reg. 231/2013): <strong>gross</strong> (no netting, excluding cash) and <strong>commitment</strong> (with netting and hedging). Derivative conversion rules are very similar to UCITS (Annex II). See <a href='#/basics/leverage'>Leverage</a>.</p>" }
      ],
      glossary: [
        ["Global exposure", "A UCITS's total exposure from derivatives."],
        ["Commitment approach", "Converting derivatives into the underlying equivalent."],
        ["Value at Risk (VaR)", "The loss a portfolio will not exceed with a given probability over a given horizon."],
        ["Reference portfolio", "A derivative-free portfolio used for relative VaR."],
        ["Backtesting", "Comparing VaR forecasts with actual results."]
      ]
    }
  }
});

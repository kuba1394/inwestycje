window.BASICS.push({
  id: "derivatives",
  title: { pl: "Derywaty: forward, futures, swap, opcja", en: "Derivatives: forward, future, swap, option" },
  level: 1,
  prereq: ["time-value"],
  sources: ["ucits", "eligible", "emir"],
  related: ["fx-forward", "equity-index-future", "interest-rate-swap", "listed-equity-option"],
  content: {
    pl: {
      summary: "Derywat (instrument pochodny) to umowa, której wartość zależy od czegoś innego — instrumentu bazowego: kursu akcji, indeksu, stopy procentowej, kursu walutowego, ryzyka kredytowego. Wszystkie derywaty da się złożyć z czterech klocków: forward, futures, swap i opcja. Pierwsze trzy są liniowe, opcja — nieliniowa.",
      keyFacts: [
        ["Instrument bazowy", "To, od czego zależy wartość derywatu (akcja, indeks, stopa, kurs, kredyt, towar)."],
        ["Nominał (notional)", "Kwota, od której liczy się przepływy; zwykle nie przechodzi między stronami."],
        ["Wartość rynkowa (MtM)", "Ile derywat jest wart dziś — zwykle dużo mniej niż nominał."],
        ["Giełdowe vs OTC", "Standaryzowane i rozliczane przez CCP vs negocjowane bilateralnie."]
      ],
      sections: [
        { id: "blocks", title: "Cztery podstawowe klocki",
          html: "<table class='calc'><thead><tr><th>Klocek</th><th>Na czym polega</th><th>Profil</th><th>Przykłady w katalogu</th></tr></thead><tbody>" +
                "<tr><td><strong>Forward</strong></td><td>Umowa dziś na transakcję w przyszłości po cenie ustalonej dziś; bilateralna (OTC).</td><td>Liniowy, symetryczny</td><td><a href='#/i/fx-forward'>FX Forward</a>, <a href='#/i/forward-rate-agreement'>FRA</a>, <a href='#/i/non-deliverable-forward'>NDF</a></td></tr>" +
                "<tr><td><strong>Futures</strong></td><td>Standaryzowany forward na giełdzie; CCP i codzienne rozliczenie wyniku.</td><td>Liniowy, symetryczny</td><td><a href='#/i/equity-index-future'>Equity Index Future</a>, <a href='#/i/government-bond-future'>Bond Future</a>, <a href='#/i/stir-future'>STIR</a></td></tr>" +
                "<tr><td><strong>Swap</strong></td><td>Wymiana strumieni płatności przez dłuższy czas — jak seria forwardów.</td><td>Liniowy, symetryczny</td><td><a href='#/i/interest-rate-swap'>IRS</a>, <a href='#/i/total-return-swap'>TRS</a>, <a href='#/i/credit-default-swap'>CDS</a>*</td></tr>" +
                "<tr><td><strong>Opcja</strong></td><td>Prawo, nie obowiązek; kupujący płaci premię.</td><td>Nieliniowy, asymetryczny</td><td><a href='#/i/listed-equity-option'>Equity Option</a>, <a href='#/i/swaption'>Swaption</a>, <a href='#/i/fx-option'>FX Option</a></td></tr>" +
                "</tbody></table>" +
                "<p class='cell-note'>* CDS ma cechy opcji (wypłata tylko przy zdarzeniu kredytowym), choć nazywa się swapem.</p>" },
        { id: "linear", title: "Liniowe i nieliniowe",
          html: "<p><strong>Liniowe</strong> (forward, futures, swap): zysk i strata rosną proporcjonalnie do ruchu bazy, w obie strony. Wartość na start ≈ 0.</p>" +
                "<p><strong>Nieliniowe</strong> (opcje): kupujący ma ograniczoną stratę (premia) i nieograniczony lub duży potencjał zysku; wystawca — odwrotnie. Wrażliwość zmienia się wraz z rynkiem (delta, gamma — zob. <a href='#/basics/options-greeks'>Opcje i greki</a>).</p>" },
        { id: "notional", title: "Nominał to nie ryzyko",
          html: "<p>Swap na 100 mln EUR nie oznacza ryzyka 100 mln. Nominał służy do liczenia płatności. Ryzyko pokazują:</p>" +
                "<ul><li><strong>wartość rynkowa (MtM)</strong> — ile kontrahent jest nam winien dziś (ryzyko kontrahenta);</li>" +
                "<li><strong>wrażliwość</strong> — o ile zmieni się wartość przy ruchu rynku (DV01, delta);</li>" +
                "<li><strong>ekspozycja w metodzie zaangażowania</strong> — przeliczenie na ekwiwalent bazy, wymagane w UCITS.</li></ul>" },
        { id: "uses", title: "Do czego fundusze używają derywatów",
          html: "<ul>" +
                "<li><strong>Zabezpieczenie (hedging)</strong> — ograniczenie ryzyka walutowego, stopy procentowej, rynku akcji.</li>" +
                "<li><strong>Efektywne zarządzanie portfelem</strong> — szybka i tania zmiana ekspozycji (np. inwestowanie napływów futures).</li>" +
                "<li><strong>Cel inwestycyjny</strong> — zajmowanie pozycji, w tym krótkich (UCITS nie może sprzedawać fizycznie bez pokrycia).</li>" +
                "</ul>" },
        { id: "compliance", title: "Pięć pytań compliance przy każdym derywacie",
          html: "<ol>" +
                "<li>Czy instrument bazowy jest dopuszczalny (art. 50 ust. 1 lit. g UCITS)?</li>" +
                "<li>Giełdowy czy OTC? Rozliczany przez CCP? (limit kontrahenta po EMIR 3)</li>" +
                "<li>Jak przeliczyć go na ekspozycję (nominał, wartość bazy, delta)?</li>" +
                "<li>Czy trzeba zajrzeć do bazy (look-through do limitów emitenta)?</li>" +
                "<li>Jakie obowiązki: raport EMIR, clearing, depozyty, SSR?</li>" +
                "</ol>" +
                "<p>Odpowiedzi dla konkretnego instrumentu znajdziesz w <a href='#/compliance/matrix'>matrycy obowiązków</a> i <a href='#/compliance/decision'>drzewie decyzyjnym</a>.</p>" }
      ],
      glossary: [
        ["Derivative", "Instrument pochodny — umowa, której wartość zależy od instrumentu bazowego."],
        ["Underlying", "Instrument bazowy derywatu."],
        ["Notional", "Nominał — kwota, od której liczy się płatności derywatu."],
        ["Mark-to-market (MtM)", "Wycena według bieżących cen rynkowych."],
        ["Hedging", "Zabezpieczenie — transakcja ograniczająca istniejące ryzyko."]
      ]
    },
    en: {
      summary: "A derivative is a contract whose value depends on something else — the underlying: a share price, an index, an interest rate, an exchange rate, credit risk. All derivatives can be built from four blocks: forward, future, swap and option. The first three are linear; the option is non-linear.",
      keyFacts: [
        ["Underlying", "What the derivative's value depends on (share, index, rate, FX, credit, commodity)."],
        ["Notional", "The amount on which payments are computed; usually not exchanged."],
        ["Market value (MtM)", "What the derivative is worth today — usually much less than notional."],
        ["Listed vs OTC", "Standardised and CCP-cleared vs negotiated bilaterally."]
      ],
      sections: [
        { id: "blocks", title: "The four building blocks",
          html: "<table class='calc'><thead><tr><th>Block</th><th>What it is</th><th>Profile</th><th>Examples in the catalogue</th></tr></thead><tbody>" +
                "<tr><td><strong>Forward</strong></td><td>An agreement today on a future trade at a price fixed today; bilateral (OTC).</td><td>Linear, symmetric</td><td><a href='#/i/fx-forward'>FX Forward</a>, <a href='#/i/forward-rate-agreement'>FRA</a>, <a href='#/i/non-deliverable-forward'>NDF</a></td></tr>" +
                "<tr><td><strong>Future</strong></td><td>A standardised exchange-traded forward; CCP and daily settlement of P&amp;L.</td><td>Linear, symmetric</td><td><a href='#/i/equity-index-future'>Equity Index Future</a>, <a href='#/i/government-bond-future'>Bond Future</a>, <a href='#/i/stir-future'>STIR</a></td></tr>" +
                "<tr><td><strong>Swap</strong></td><td>An exchange of payment streams over time — like a series of forwards.</td><td>Linear, symmetric</td><td><a href='#/i/interest-rate-swap'>IRS</a>, <a href='#/i/total-return-swap'>TRS</a>, <a href='#/i/credit-default-swap'>CDS</a>*</td></tr>" +
                "<tr><td><strong>Option</strong></td><td>A right, not an obligation; the buyer pays a premium.</td><td>Non-linear, asymmetric</td><td><a href='#/i/listed-equity-option'>Equity Option</a>, <a href='#/i/swaption'>Swaption</a>, <a href='#/i/fx-option'>FX Option</a></td></tr>" +
                "</tbody></table>" +
                "<p class='cell-note'>* A CDS has option-like features (it pays only on a credit event), despite its name.</p>" },
        { id: "linear", title: "Linear and non-linear",
          html: "<p><strong>Linear</strong> (forward, future, swap): profit and loss grow in proportion to the underlying's move, in both directions. Value at inception ≈ 0.</p>" +
                "<p><strong>Non-linear</strong> (options): the buyer has limited loss (the premium) and unlimited or large upside; the writer the reverse. Sensitivity changes with the market (delta, gamma — see <a href='#/basics/options-greeks'>Options and Greeks</a>).</p>" },
        { id: "notional", title: "Notional is not risk",
          html: "<p>A EUR 100m swap does not mean EUR 100m of risk. Notional is used to compute payments. Risk is shown by:</p>" +
                "<ul><li><strong>market value (MtM)</strong> — what the counterparty owes us today (counterparty risk);</li>" +
                "<li><strong>sensitivity</strong> — how much value changes when the market moves (DV01, delta);</li>" +
                "<li><strong>commitment exposure</strong> — conversion into the underlying equivalent, required under UCITS.</li></ul>" },
        { id: "uses", title: "What funds use derivatives for",
          html: "<ul>" +
                "<li><strong>Hedging</strong> — reducing currency, interest rate or equity market risk.</li>" +
                "<li><strong>Efficient portfolio management</strong> — fast, cheap changes in exposure (e.g. investing inflows via futures).</li>" +
                "<li><strong>Investment purposes</strong> — taking positions, including short ones (a UCITS cannot short-sell physically).</li>" +
                "</ul>" },
        { id: "compliance", title: "Five compliance questions for every derivative",
          html: "<ol>" +
                "<li>Is the underlying eligible (Art. 50(1)(g) UCITS)?</li>" +
                "<li>Listed or OTC? Cleared through a CCP? (counterparty limit after EMIR 3)</li>" +
                "<li>How is it converted into exposure (notional, underlying value, delta)?</li>" +
                "<li>Do you need to look through to the underlying (issuer limits)?</li>" +
                "<li>Which obligations: EMIR reporting, clearing, margin, SSR?</li>" +
                "</ol>" +
                "<p>Answers for a specific instrument are in the <a href='#/compliance/matrix'>obligations matrix</a> and the <a href='#/compliance/decision'>decision tree</a>.</p>" }
      ],
      glossary: [
        ["Derivative", "A contract whose value depends on an underlying."],
        ["Underlying", "The asset or rate a derivative is based on."],
        ["Notional", "The amount on which a derivative's payments are computed."],
        ["Mark-to-market (MtM)", "Valuation at current market prices."],
        ["Hedging", "A trade that reduces an existing risk."]
      ]
    }
  }
});

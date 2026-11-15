window.INSTRUMENTS.push({
  id: "fx-option",
  name: "FX Option",
  aliases: ["Currency Option", "Vanilla FX Option", "Barrier Option", "opcja walutowa"],
  market: "otc",
  asset: { pl: "Derywaty walutowe", en: "FX derivatives" },
  sources: ["ucits", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "marginRts"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Opcja walutowa daje prawo (ale nie obowiązek) wymiany jednej waluty na drugą po kursie ustalonym dziś (strike) w określonym dniu. Kupujący płaci premię, w zamian ogranicza ryzyko niekorzystnego ruchu kursu i zachowuje korzyść z ruchu korzystnego — w odróżnieniu od forwardu.",
      keyFacts: [
        ["Rynek", "OTC (bilateralnie z bankiem); istnieją też notowane opcje walutowe, ale fundusze używają głównie OTC."],
        ["Nazewnictwo", "Opcja jest zawsze call na jedną walutę i put na drugą, np. EUR call / USD put."],
        ["Styl", "Zwykle europejski; częste opcje egzotyczne (barierowe: knock-in, knock-out; cyfrowe)."],
        ["Rozliczenie", "Fizyczna dostawa walut albo gotówkowe (dla walut niewymienialnych — non-deliverable option)."],
        ["Premia", "Płatna z góry, zwykle T+2, wyrażona w % nominału lub w pipsach."],
        ["Dokumentacja", "ISDA Master Agreement + CSA, definicje ISDA/EMTA dla FX."],
        ["Kod CFI", "<code>HF****</code> (Non-listed options – Foreign exchange)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>FX Option</em> to opcja na kurs walutowy. Ponieważ wymiana dotyczy zawsze dwóch walut, prawo kupna jednej waluty jest jednocześnie prawem sprzedaży drugiej. EUR call / USD put to prawo kupna EUR i oddania USD po kursie strike.</p>" +
            "<p>W porównaniu z <a href='#/i/fx-forward'>FX Forward</a>:</p>" +
            "<ul>" +
              "<li>forward blokuje kurs w obie strony i nie kosztuje nic na starcie;</li>" +
              "<li>opcja chroni przed jednym kierunkiem ruchu i kosztuje premię.</li>" +
            "</ul>" +
            "<p><strong>Opcje barierowe</strong> powstają lub wygasają, gdy kurs dotknie określonego poziomu (np. knock-out przy 1,15). Są tańsze, ale ich ryzyko jest nieliniowe i trudniej je zmierzyć.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Para walut, kierunek (call/put), nominał, strike, data wygaśnięcia i dostawy, styl, premia.</li>" +
              "<li><strong>Premia.</strong> Kupujący płaci premię (zwykle T+2).</li>" +
              "<li><strong>W trakcie.</strong> Wycena z modelu Garmana-Kohlhagena (wariant Blacka-Scholesa dla walut) z powierzchni zmienności. Delta zmienia się z kursem. VM według CSA.</li>" +
              "<li><strong>Wygaśnięcie.</strong> W określonej godzinie (cut, np. 10:00 Nowy Jork) opcja in-the-money jest wykonywana. Przy dostawie fizycznej strony wymieniają waluty po strike'u w dacie dostawy. Przy rozliczeniu gotówkowym płacona jest tylko różnica.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz z walutą bazową EUR (NAV 200 mln EUR) ma aktywa w USD warte 20 mln USD. EUR/USD = 1,0800. Fundusz boi się osłabienia dolara (wzrostu EUR/USD), ale chce skorzystać, jeśli dolar się umocni. Kupuje 3-miesięczną opcję EUR call / USD put: nominał 20 mln USD, strike 1,1000, premia 160 000 USD (≈ 148 148 EUR), delta 0,35.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Wygaśnięcie przy EUR/USD = 1,1500</th><th>Obliczenie</th><th class='num'>EUR</th></tr></thead><tbody>" +
              "<tr><td>Spadek wartości aktywów w EUR</td><td>20 mln / 1,08 − 20 mln / 1,15</td><td class='num'>−1 127 214</td></tr>" +
              "<tr><td>Wypłata opcji (wymiana 20 mln USD po 1,10 zamiast 1,15)</td><td>20 mln / 1,10 − 20 mln / 1,15</td><td class='num'>+790 514</td></tr>" +
              "<tr><td>Premia</td><td>160 000 / 1,08</td><td class='num'>−148 148</td></tr>" +
              "<tr><td>Wynik łączny</td><td>strata do poziomu strike'u + premia</td><td class='num'>−484 848</td></tr>" +
            "</tbody></table></div>" +
            "<p>Strata jest ograniczona do ruchu od 1,08 do 1,10 plus premia, niezależnie od tego, jak bardzo dolar się osłabi. Gdyby dolar się umocnił, fundusz zyskałby na aktywach, tracąc tylko premię.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Ekspozycja w metodzie zaangażowania:</strong> nominał × delta = 20 mln USD × 0,35 = 7 mln USD ≈ <strong>6,48 mln EUR (3,2% NAV)</strong>. Może być kompensowana jako hedging walutowy.</li>" +
              "<li><strong>Kontrahent:</strong> wycena opcji to należność od banku (limit 10% NAV).</li>" +
              "<li><strong>Opcje barierowe:</strong> metoda zaangażowania może nie oddawać ryzyka. Wymagają metody alternatywnej lub VaR, jeśli ich udział nie jest pomijalny.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> model Garmana-Kohlhagena z powierzchnią zmienności (ATM, risk reversals, butterflies); egzotyki — modele lokalnej lub stochastycznej zmienności. Niezależna weryfikacja wycen.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko kursowe</strong> (delta, gamma) i <strong>zmienności</strong> (vega).</li>" +
              "<li><strong>Ryzyko kontrahenta</strong> dla kupującego.</li>" +
              "<li><strong>Ryzyko bariery</strong> — skokowa zmiana wartości przy poziomie bariery.</li>" +
              "<li><strong>Ryzyko rozrachunku</strong> — przy dostawie fizycznej (CLS).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie, potwierdzenie, premia.</li>" +
              "<li>Wycena, VM/IM; monitoring barier (zdarzenia knock-in/out).</li>" +
              "<li>Wygaśnięcie: wykonanie i dostawa walut albo rozliczenie gotówkowe.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywat OTC na kurs walutowy; warunki kontrahenta, wyceny i zamknięcia.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>CESR/10-788</span></h4><p>Nominał × delta, w walucie bazowej. Opcje egzotyczne o istotnym udziale — VaR.</p></div>" +
              "<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1–2</span></h4><p>10% / 5% NAV, limit łączny 20%.</p></div>" +
              "<div class='rule'><h4>Wystawione opcje</h4><p>Wymagają pokrycia: walutą do dostawy lub płynnymi aktywami.</p></div>" +
              "<div class='rule'><h4>Zabezpieczone klasy jednostek <span class='law'>ESMA34-43-296</span></h4><p>Hedging klasy ma ograniczać ryzyko walutowe; struktury opcyjne dające ekspozycję lub dźwignię w klasie są niedopuszczalne.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik II rozp. 231/2013</span>: nominał × delta; w metodzie zaangażowania kompensowanie zabezpieczeń walutowych.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, zabezpieczenia, raportowanie",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Clearing</h4><p>Opcje walutowe nie podlegają obowiązkowi rozliczania przez CCP.</p></div>" +
              "<div class='rule'><h4>Depozyty <span class='law'>rozp. 2016/2251</span></h4><p>Zwolnienie z IM dla fizycznie rozliczanych FX forward i swapów nie obejmuje opcji. VM między FC, IM powyżej progu AANA.</p></div>" +
              "<div class='rule'><h4>Raportowanie <span class='law'>art. 9 EMIR</span></h4><p>Do T+1; zdarzenia barier i wykonanie jako zdarzenia cyklu życia.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), LEI kontrahenta.</li>" +
              "<li><strong>CFI</strong> — <code>H</code> (Non-listed options), grupa <code>F</code> (Foreign exchange).</li>" +
              "<li>Kody walut ISO 4217.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Kierunek (kupno/wystawienie) i para walut (call na którą walutę).</li>" +
              "<li>Ekspozycja w ekwiwalencie delta; egzotyki — ocena metody pomiaru.</li>" +
              "<li>Pokrycie opcji wystawionych.</li>" +
              "<li>Limit kontrahenta, zabezpieczenia.</li>" +
              "<li>Raport EMIR; monitoring barier i wygaśnięć.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["EUR call / USD put", "Prawo kupna EUR za USD po kursie strike."],
        ["Barrier option", "Opcja, która powstaje (knock-in) lub wygasa (knock-out) po osiągnięciu przez kurs bariery."],
        ["Cut", "Godzina wygaśnięcia opcji (np. NY 10:00, Tokyo 15:00)."],
        ["Risk reversal", "Różnica zmienności implikowanej opcji call i put o tej samej delcie — miara skośności."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An FX option gives the right (but not the obligation) to exchange one currency for another at a rate set today (the strike) on a set date. The buyer pays a premium and in return limits the risk of an adverse FX move while keeping the benefit of a favourable one — unlike a forward.",
      keyFacts: [
        ["Market", "OTC (bilateral with a bank); listed FX options exist, but funds mainly use OTC."],
        ["Naming", "An option is always a call on one currency and a put on the other, e.g. EUR call / USD put."],
        ["Style", "Usually European; exotic options are common (barriers: knock-in, knock-out; digitals)."],
        ["Settlement", "Physical delivery of currencies or cash (for non-convertible currencies — non-deliverable option)."],
        ["Premium", "Paid upfront, usually T+2, quoted in % of notional or in pips."],
        ["Documentation", "ISDA Master Agreement + CSA, ISDA/EMTA FX definitions."],
        ["CFI code", "<code>HF****</code> (Non-listed options – Foreign exchange)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>An FX Option is an option on an exchange rate. Because every exchange involves two currencies, the right to buy one currency is also the right to sell the other. A EUR call / USD put is the right to buy EUR and pay USD at the strike.</p>" +
            "<p>Compared with an <a href='#/i/fx-forward'>FX Forward</a>:</p>" +
            "<ul>" +
              "<li>a forward locks the rate in both directions and costs nothing upfront;</li>" +
              "<li>an option protects against one direction and costs a premium.</li>" +
            "</ul>" +
            "<p><strong>Barrier options</strong> come into existence or terminate when the rate touches a set level (e.g. knock-out at 1.15). They are cheaper, but their risk is non-linear and harder to measure.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> Currency pair, direction (call/put), notional, strike, expiry and delivery dates, style, premium.</li>" +
              "<li><strong>Premium.</strong> The buyer pays the premium (usually T+2).</li>" +
              "<li><strong>During the life.</strong> Valued with the Garman-Kohlhagen model (Black-Scholes for FX) from the volatility surface. Delta moves with the rate. VM under the CSA.</li>" +
              "<li><strong>Expiry.</strong> At a set time (the cut, e.g. 10:00 New York) an in-the-money option is exercised. With physical delivery the parties exchange currencies at the strike on the delivery date. With cash settlement only the difference is paid.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A EUR-based fund (NAV EUR 200m) holds USD assets worth USD 20m. EUR/USD = 1.0800. The fund fears a weaker dollar (higher EUR/USD) but wants to benefit if the dollar strengthens. It buys a 3-month EUR call / USD put: USD 20m notional, strike 1.1000, premium USD 160,000 (≈ EUR 148,148), delta 0.35.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Expiry at EUR/USD = 1.1500</th><th>Calculation</th><th class='num'>EUR</th></tr></thead><tbody>" +
              "<tr><td>Fall in asset value in EUR</td><td>20m / 1.08 − 20m / 1.15</td><td class='num'>−1,127,214</td></tr>" +
              "<tr><td>Option payout (exchanging USD 20m at 1.10 instead of 1.15)</td><td>20m / 1.10 − 20m / 1.15</td><td class='num'>+790,514</td></tr>" +
              "<tr><td>Premium</td><td>160,000 / 1.08</td><td class='num'>−148,148</td></tr>" +
              "<tr><td>Combined result</td><td>loss up to the strike + premium</td><td class='num'>−484,848</td></tr>" +
            "</tbody></table></div>" +
            "<p>The loss is capped at the move from 1.08 to 1.10 plus the premium, however far the dollar falls. Had the dollar strengthened, the fund would have gained on the assets, losing only the premium.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Commitment exposure:</strong> notional × delta = USD 20m × 0.35 = USD 7m ≈ <strong>EUR 6.48m (3.2% of NAV)</strong>. It may be netted as a currency hedge.</li>" +
              "<li><strong>Counterparty:</strong> the option value is a receivable from the bank (10% of NAV limit).</li>" +
              "<li><strong>Barrier options:</strong> the commitment approach may not capture the risk. They require an alternative method or VaR if their share is not negligible.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> Garman-Kohlhagen with the volatility surface (ATM, risk reversals, butterflies); exotics — local or stochastic volatility models. Independent price verification.</p>" +
            "<ul>" +
              "<li><strong>FX risk</strong> (delta, gamma) and <strong>volatility risk</strong> (vega).</li>" +
              "<li><strong>Counterparty risk</strong> for the buyer.</li>" +
              "<li><strong>Barrier risk</strong> — jump in value at the barrier level.</li>" +
              "<li><strong>Settlement risk</strong> — with physical delivery (CLS).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution, confirmation, premium.</li>" +
              "<li>Valuation, VM/IM; barrier monitoring (knock-in/out events).</li>" +
              "<li>Expiry: exercise and currency delivery or cash settlement.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>OTC derivative on an exchange rate; counterparty, valuation and close-out conditions.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Notional × delta, in base currency. Exotics with a significant share — VaR.</p></div>" +
              "<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1)–(2)</span></h4><p>10% / 5% of NAV, 20% combined limit.</p></div>" +
              "<div class='rule'><h4>Written options</h4><p>Require cover: the currency to deliver or liquid assets.</p></div>" +
              "<div class='rule'><h4>Hedged share classes <span class='law'>ESMA34-43-296</span></h4><p>Share-class hedging must reduce currency risk; option structures that create exposure or leverage within the class are not allowed.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex II Reg. 231/2013</span>: notional × delta; currency hedges netted under the commitment method.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, margin, reporting",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Clearing</h4><p>FX options are not subject to the clearing obligation.</p></div>" +
              "<div class='rule'><h4>Margin <span class='law'>Reg. 2016/2251</span></h4><p>The IM exemption for physically settled FX forwards and swaps does not cover options. VM between FCs, IM above the AANA threshold.</p></div>" +
              "<div class='rule'><h4>Reporting <span class='law'>Art. 9 EMIR</span></h4><p>By T+1; barrier events and exercise reported as lifecycle events.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), counterparty LEI.</li>" +
              "<li><strong>CFI</strong> — <code>H</code> (Non-listed options), group <code>F</code> (Foreign exchange).</li>" +
              "<li>ISO 4217 currency codes.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Direction (bought/written) and currency pair (call on which currency).</li>" +
              "<li>Delta-equivalent exposure; exotics — measurement method assessed.</li>" +
              "<li>Cover for written options.</li>" +
              "<li>Counterparty limit, collateral.</li>" +
              "<li>EMIR report; barrier and expiry monitoring.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["EUR call / USD put", "The right to buy EUR against USD at the strike."],
        ["Barrier option", "An option that comes into existence (knock-in) or terminates (knock-out) when the rate reaches a barrier."],
        ["Cut", "The option's expiry time (e.g. NY 10:00, Tokyo 15:00)."],
        ["Risk reversal", "Difference in implied volatility between a call and a put with the same delta — a measure of skew."]
      ]
    }
  }
});

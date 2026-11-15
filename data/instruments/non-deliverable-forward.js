window.INSTRUMENTS.push({
  id: "non-deliverable-forward",
  name: "Non-Deliverable Forward (NDF)",
  aliases: ["NDF", "forward bez dostawy"],
  market: "otc",
  asset: { pl: "Derywaty walutowe", en: "FX derivatives" },
  sources: ["ucits", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "marginRts", "mifidDR"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "NDF to forward walutowy rozliczany wyłącznie gotówkowo, w walucie wymienialnej (zwykle USD). Służy do zabezpieczania lub zajmowania pozycji w walutach, których nie można swobodnie dostarczyć za granicą (np. INR, KRW, TWD, BRL). W dniu rozliczenia wypłacana jest tylko różnica między kursem umownym a oficjalnym fixingiem.",
      keyFacts: [
        ["Rynek", "OTC, bilateralnie z bankiem; brak obowiązku clearingu (dobrowolny clearing dostępny w niektórych CCP)."],
        ["Waluty", "Ograniczona wymienialność: m.in. INR, KRW, TWD, IDR, PHP, BRL, CLP, COP (CNY onshore — dostępny także rynek CNH)."],
        ["Rozliczenie", "Gotówkowe w USD (lub innej walucie wymienialnej), bez wymiany nominałów."],
        ["Fixing", "Oficjalny kurs referencyjny (np. kurs publikowany przez bank centralny lub agencję), zwykle 1–2 dni przed rozliczeniem."],
        ["Dokumentacja", "ISDA Master Agreement + CSA, szablony EMTA dla danej waluty."],
        ["Klasyfikacja", "Derywat (rozliczany gotówkowo) — zawsze, niezależnie od terminu."],
        ["Kod CFI", "<code>JF****</code> (Forwards – Foreign exchange), rozliczenie gotówkowe"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Non-Deliverable Forward</em> działa ekonomicznie jak <a href='#/i/fx-forward'>FX Forward</a>, ale <strong>żadna z walut nie jest dostarczana</strong>. Strony uzgadniają nominał, kurs NDF i źródło fixingu. W dniu rozliczenia płacą sobie różnicę w walucie wymienialnej:</p>" +
            "<p class='formula'>Rozliczenie (USD) = nominał USD × (kurs NDF − fixing) / fixing</p>" +
            "<p>Wzór dla pary kwotowanej jako USD/waluta lokalna (np. USD/INR) z punktu widzenia kupującego waluty lokalnej. Dla kupującego USD znak jest odwrotny.</p>" +
            "<p>Zastosowanie: zagraniczny inwestor ma akcje lub obligacje w Indiach i chce zabezpieczyć ryzyko INR, ale nie może trzymać ani dostarczać rupii poza krajem.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Para walut, kierunek, nominał (w USD lub walucie lokalnej), kurs NDF, data fixingu, data rozliczenia, źródło fixingu (według szablonu EMTA).</li>" +
              "<li><strong>W trakcie.</strong> Wycena jak forward; VM według CSA.</li>" +
              "<li><strong>Fixing.</strong> W dniu fixingu publikowany jest oficjalny kurs. Ustala się kwotę rozliczenia.</li>" +
              "<li><strong>Rozliczenie.</strong> Płatność netto w USD w dacie rozliczenia.</li>" +
              "<li><strong>Zakłócenia.</strong> Jeśli fixing nie zostanie opublikowany (zakłócenie rynku), dokumentacja EMTA wskazuje źródła zapasowe (fallback).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz (waluta bazowa USD, NAV 300 mln USD) ma indyjskie akcje i chce zabezpieczyć ryzyko osłabienia rupii. Zawiera 3-miesięczny NDF: <strong>kupuje USD / sprzedaje INR</strong>, nominał 10 mln USD, kurs NDF 85,00 (hipotetyczny).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>USD</th></tr></thead><tbody>" +
              "<tr><td>Fixing USD/INR w dniu fixingu (rupia się osłabiła)</td><td>—</td><td class='num'>88,00</td></tr>" +
              "<tr><td>Rozliczenie na rzecz funduszu (kupującego USD)</td><td>10 000 000 × (88,00 − 85,00) / 88,00</td><td class='num'>+340 909,09</td></tr>" +
            "</tbody></table></div>" +
            "<p>Wypłata kompensuje spadek wartości akcji indyjskich w USD wynikający z osłabienia rupii. Gdyby rupia się umocniła (fixing poniżej 85,00), fundusz by dopłacił.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Ekspozycja w metodzie zaangażowania:</strong> nominał w walucie bazowej = 10 mln USD (3,3% NAV), z możliwością kompensowania jako hedging.</li>" +
              "<li><strong>Kontrahent:</strong> limit 10% / 5% NAV; zabezpieczenie według CSA.</li>" +
              "<li>Niewymienialność waluty nie wyklucza dopuszczalności — instrumentem bazowym jest kurs walutowy.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> krzywa punktów terminowych NDF (offshore), która może się różnić od rynku onshore.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko kursowe</strong> waluty rynku wschodzącego.</li>" +
              "<li><strong>Ryzyko bazy onshore/offshore</strong> — kurs NDF może odbiegać od kursu krajowego, szczególnie przy kontroli kapitału.</li>" +
              "<li><strong>Ryzyko fixingu</strong> — zakłócenie, zmiana metodologii lub zawieszenie publikacji.</li>" +
              "<li><strong>Ryzyko kontrahenta i płynności</strong> — dla mniej płynnych walut spready są szerokie.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zawarcie, potwierdzenie (często na platformie), raport EMIR.</li>" +
              "<li>Wycena, VM.</li>" +
              "<li>Fixing, rozliczenie netto w USD; rolowanie przez nowy NDF.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywat OTC na kurs walutowy; warunki kontrahenta, wyceny i zamknięcia.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>CESR/10-788</span></h4><p>Nominał w walucie bazowej; hedging według wytycznych.</p></div>" +
              "<div class='rule'><h4>Kontrahent <span class='law'>art. 52 ust. 1–2</span></h4><p>10% / 5% NAV, limit łączny 20%.</p></div>" +
              "<div class='rule'><h4>Pokrycie</h4><p>Płynne aktywa na pokrycie ewentualnej płatności w USD.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>art. 7–8 rozp. 231/2013</span>: nominał; w metodzie zaangażowania kompensowanie zabezpieczeń walutowych.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, zabezpieczenia, raportowanie",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Klasyfikacja <span class='law'>art. 10 rozp. 2017/565</span></h4><p>Zwolnienie dla transakcji spot dotyczy tylko wymiany walut z dostawą. NDF rozliczany gotówkowo jest derywatem niezależnie od terminu.</p></div>" +
              "<div class='rule'><h4>Clearing</h4><p>NDF nie podlegają obowiązkowi rozliczania przez CCP w UE.</p></div>" +
              "<div class='rule'><h4>Depozyty <span class='law'>rozp. 2016/2251</span></h4><p>Zwolnienie z IM obejmuje tylko fizycznie rozliczane FX forward i swapy — nie NDF. VM między FC, IM powyżej progu AANA.</p></div>" +
              "<div class='rule'><h4>Raportowanie <span class='law'>art. 9 EMIR</span></h4><p>Do T+1. Odpowiada spółka zarządzająca lub ZAFI.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), LEI kontrahenta.</li>" +
              "<li><strong>CFI</strong> — <code>J</code> (Forwards), grupa <code>F</code> (Foreign exchange), atrybut dostawy: gotówkowa.</li>" +
              "<li>Kody walut ISO 4217; źródło fixingu według szablonu EMTA.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Poprawny kierunek (kupno/sprzedaż waluty lokalnej) i źródło fixingu.</li>" +
              "<li>Ekspozycja całkowita, oznaczenie hedgingu.</li>" +
              "<li>Limit kontrahenta, zabezpieczenia (VM i ewentualnie IM).</li>" +
              "<li>Uzgodnienie kwoty rozliczenia po fixingu; raport EMIR.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Fixing date", "Dzień ustalenia oficjalnego kursu, od którego liczy się rozliczenie NDF."],
        ["EMTA", "Stowarzyszenie rynków wschodzących publikujące szablony dokumentacji NDF i źródła fixingu."],
        ["Onshore / offshore", "Rynek krajowy waluty / rynek zagraniczny (np. CNY vs CNH)."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An NDF is an FX forward settled only in cash, in a convertible currency (usually USD). It is used to hedge or take positions in currencies that cannot be freely delivered offshore (e.g. INR, KRW, TWD, BRL). On the settlement date only the difference between the contract rate and the official fixing is paid.",
      keyFacts: [
        ["Market", "OTC, bilateral with a bank; no clearing obligation (voluntary clearing available at some CCPs)."],
        ["Currencies", "Restricted convertibility: including INR, KRW, TWD, IDR, PHP, BRL, CLP, COP (onshore CNY — the CNH market also exists)."],
        ["Settlement", "Cash in USD (or another convertible currency), no exchange of notionals."],
        ["Fixing", "Official reference rate (e.g. published by the central bank or an agency), usually 1–2 days before settlement."],
        ["Documentation", "ISDA Master Agreement + CSA, EMTA templates for the currency."],
        ["Classification", "Derivative (cash-settled) — always, regardless of tenor."],
        ["CFI code", "<code>JF****</code> (Forwards – Foreign exchange), cash settlement"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Non-Deliverable Forward works economically like an <a href='#/i/fx-forward'>FX Forward</a>, but <strong>neither currency is delivered</strong>. The parties agree a notional, an NDF rate and the fixing source. On the settlement date they pay each other the difference in a convertible currency:</p>" +
            "<p class='formula'>Settlement (USD) = USD notional × (NDF rate − fixing) / fixing</p>" +
            "<p>Formula for a pair quoted as USD/local currency (e.g. USD/INR), from the perspective of the local currency buyer. For the USD buyer the sign is reversed.</p>" +
            "<p>Use: a foreign investor holds Indian shares or bonds and wants to hedge INR risk, but cannot hold or deliver rupees offshore.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> Currency pair, direction, notional (in USD or local currency), NDF rate, fixing date, settlement date, fixing source (per the EMTA template).</li>" +
              "<li><strong>During the life.</strong> Valued like a forward; VM under the CSA.</li>" +
              "<li><strong>Fixing.</strong> On the fixing date the official rate is published and the settlement amount is set.</li>" +
              "<li><strong>Settlement.</strong> Net payment in USD on the settlement date.</li>" +
              "<li><strong>Disruption.</strong> If the fixing is not published (market disruption), the EMTA documentation sets fallback sources.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A fund (USD base currency, NAV USD 300m) holds Indian equities and wants to hedge against rupee weakness. It enters a 3-month NDF: <strong>buys USD / sells INR</strong>, USD 10m notional, NDF rate 85.00 (hypothetical).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>USD</th></tr></thead><tbody>" +
              "<tr><td>USD/INR fixing on the fixing date (the rupee weakened)</td><td>—</td><td class='num'>88.00</td></tr>" +
              "<tr><td>Settlement to the fund (USD buyer)</td><td>10,000,000 × (88.00 − 85.00) / 88.00</td><td class='num'>+340,909.09</td></tr>" +
            "</tbody></table></div>" +
            "<p>The payout offsets the fall in the USD value of the Indian equities caused by the weaker rupee. Had the rupee strengthened (fixing below 85.00), the fund would have paid.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Commitment exposure:</strong> notional in base currency = USD 10m (3.3% of NAV), nettable as a hedge.</li>" +
              "<li><strong>Counterparty:</strong> 10% / 5% of NAV limit; collateral under the CSA.</li>" +
              "<li>The currency's non-convertibility does not affect eligibility — the underlying is an exchange rate.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> NDF (offshore) forward points curve, which may differ from the onshore market.</p>" +
            "<ul>" +
              "<li><strong>FX risk</strong> of the emerging market currency.</li>" +
              "<li><strong>Onshore/offshore basis risk</strong> — the NDF rate may diverge from the domestic rate, especially under capital controls.</li>" +
              "<li><strong>Fixing risk</strong> — disruption, methodology change or suspension of publication.</li>" +
              "<li><strong>Counterparty and liquidity risk</strong> — wide spreads for less liquid currencies.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Execution, confirmation (often on a platform), EMIR report.</li>" +
              "<li>Valuation, VM.</li>" +
              "<li>Fixing, net settlement in USD; roll via a new NDF.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>OTC derivative on an exchange rate; counterparty, valuation and close-out conditions.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Notional in base currency; hedging per the guidelines.</p></div>" +
              "<div class='rule'><h4>Counterparty <span class='law'>Art. 52(1)–(2)</span></h4><p>10% / 5% of NAV, 20% combined limit.</p></div>" +
              "<div class='rule'><h4>Cover</h4><p>Liquid assets to cover any USD payment.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Art. 7–8 Reg. 231/2013</span>: notional; currency hedges netted under the commitment method.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, margin, reporting",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Classification <span class='law'>Art. 10 Reg. 2017/565</span></h4><p>The spot exemption covers only physically delivered currency exchanges. A cash-settled NDF is a derivative regardless of tenor.</p></div>" +
              "<div class='rule'><h4>Clearing</h4><p>NDFs are not subject to the EU clearing obligation.</p></div>" +
              "<div class='rule'><h4>Margin <span class='law'>Reg. 2016/2251</span></h4><p>The IM exemption covers only physically settled FX forwards and swaps — not NDFs. VM between FCs, IM above the AANA threshold.</p></div>" +
              "<div class='rule'><h4>Reporting <span class='law'>Art. 9 EMIR</span></h4><p>By T+1. The management company or AIFM is responsible.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB), counterparty LEI.</li>" +
              "<li><strong>CFI</strong> — <code>J</code> (Forwards), group <code>F</code> (Foreign exchange), delivery attribute: cash.</li>" +
              "<li>ISO 4217 currency codes; fixing source per the EMTA template.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Correct direction (buying/selling the local currency) and fixing source.</li>" +
              "<li>Global exposure, hedge flag.</li>" +
              "<li>Counterparty limit, collateral (VM and IM where applicable).</li>" +
              "<li>Settlement amount reconciled after fixing; EMIR report.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Fixing date", "Date the official rate used for the NDF settlement is set."],
        ["EMTA", "Emerging markets trade association that publishes NDF documentation templates and fixing sources."],
        ["Onshore / offshore", "The currency's domestic market / the foreign market (e.g. CNY vs CNH)."]
      ]
    }
  }
});

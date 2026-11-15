window.INSTRUMENTS.push({
  id: "cross-currency-swap",
  name: "Cross-Currency Swap",
  aliases: ["CCS", "CCIRS", "Cross-Currency Interest Rate Swap", "Currency Swap"],
  market: "otc",
  asset: { pl: "Derywaty stopy procentowej / walutowe", en: "Rates / FX derivatives" },
  sources: ["ucits", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "emir", "marginRts"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Cross-Currency Swap to umowa OTC, w której strony wymieniają kapitał w dwóch walutach na początku i zwracają go na końcu po tym samym kursie, a w trakcie płacą sobie odsetki — każda w innej walucie. Zamienia aktywo lub dług w jednej walucie na syntetyczne aktywo lub dług w drugiej.",
      keyFacts: [
        ["Rynek", "OTC, bilateralnie z bankiem; obecnie bez obowiązku clearingu w UE."],
        ["Dokumentacja", "ISDA Master Agreement + CSA, potwierdzenie."],
        ["Wymiana kapitału", "Tak — na starcie i przy zapadalności, po kursie z dnia zawarcia (zwykle)."],
        ["Odsetki", "Stała–stała, stała–zmienna lub zmienna–zmienna (np. €STR vs SOFR + spread bazowy)."],
        ["Typowe tenory", "Od 1 roku do 30 lat."],
        ["Kluczowe ryzyko", "Duża ekspozycja na kontrahenta z powodu wymiany kapitału przy zmianie kursu."],
        ["Kod CFI", "<code>S*****</code> (Swaps); zwykle grupa <code>R</code> z atrybutem cross-currency"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Cross-Currency Swap</em> (CCS) łączy dwie rzeczy: wymianę walut (jak <a href='#/i/fx-swap'>FX Swap</a>) i wymianę odsetek (jak <a href='#/i/interest-rate-swap'>Interest Rate Swap</a>), ale w dwóch różnych walutach i zwykle na wiele lat.</p>" +
            "<p>Trzy etapy przepływów:</p>" +
            "<ul>" +
              "<li><strong>wymiana początkowa</strong> — strona A daje kapitał w walucie 1, strona B w walucie 2, po kursie spot;</li>" +
              "<li><strong>odsetki okresowe</strong> — każda strona płaci odsetki od kapitału, który otrzymała, w jego walucie;</li>" +
              "<li><strong>wymiana końcowa</strong> — zwrot kapitału <strong>po tym samym kursie</strong> co na starcie, niezależnie od kursu rynkowego w dniu zapadalności.</li>" +
            "</ul>" +
            "<p>W wariancie zmienna–zmienna jedna noga zawiera <strong>spread bazowy</strong> (<em>cross-currency basis</em>). Pokazuje on, ile rynek dopłaca lub odejmuje za pozyskanie danej waluty w swapie, ponad to, co wynika z samych stóp.</p>" +
            "<p>Fundusze używają CCS do zabezpieczania walutowego długoterminowych obligacji w obcej walucie — z dopasowaniem do kuponów i terminu wykupu.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Waluty, nominały (powiązane kursem spot), stopy obu nóg, częstotliwość płatności, daty wymiany kapitału.</li>" +
              "<li><strong>Wymiana początkowa.</strong> Fundusz przekazuje walutę 1 i dostaje walutę 2, np. żeby kupić obligację w tej walucie.</li>" +
              "<li><strong>Płatności odsetek.</strong> W każdym okresie fundusz płaci odsetki w walucie 2 (pokrywa je z kuponów obligacji), a otrzymuje odsetki w walucie 1. Płatności w dwóch walutach nie są kompensowane.</li>" +
              "<li><strong>Wycena w trakcie.</strong> Wartość zależy od stóp w obu walutach i od kursu walutowego. Ponieważ na końcu zwraca się cały kapitał po starym kursie, zmiana kursu daje duży zysk lub stratę na swapie (kompensowaną zmianą wartości zabezpieczanej obligacji).</li>" +
              "<li><strong>Zabezpieczenie.</strong> Codzienny VM według CSA. Przy dużym ruchu kursu kwoty bywają znaczne.</li>" +
              "<li><strong>Wymiana końcowa.</strong> Fundusz oddaje walutę 2 (np. z wykupu obligacji) i odbiera walutę 1 w kwocie z dnia zawarcia.</li>" +
            "</ol>" +
            "<div class='callout'><strong>Wariant MtM (resettable)</strong>W części CCS nominał jednej nogi jest okresowo dostosowywany do bieżącego kursu (mark-to-market CCS). Ogranicza to narastanie ekspozycji na kontrahenta. Standardem w rynku międzybankowym są właśnie takie swapy.</div>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz z walutą bazową EUR (NAV 100 mln EUR) kupuje 3-letnią obligację korporacyjną w USD: nominał 10,8 mln USD, kupon 5,00%. Kurs EUR/USD = 1,0800. Żeby wyeliminować ryzyko walutowe, zawiera stały–stały CCS na 3 lata.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Moment</th><th>Fundusz płaci</th><th>Fundusz otrzymuje</th></tr></thead><tbody>" +
              "<tr><td>Start</td><td>10 000 000 EUR</td><td>10 800 000 USD (na zakup obligacji)</td></tr>" +
              "<tr><td>Co roku (×3)</td><td>4,50% × 10,8 mln = 486 000 USD</td><td>2,60% × 10 mln = 260 000 EUR</td></tr>" +
              "<tr><td>Kupon obligacji (co roku)</td><td>—</td><td>5,00% × 10,8 mln = 540 000 USD</td></tr>" +
              "<tr><td>Zapadalność</td><td>10 800 000 USD (z wykupu obligacji)</td><td>10 000 000 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<p>Efekt: fundusz ma w praktyce obligację w EUR z kuponem 2,60% oraz dodatkowe 54 000 USD rocznie (540 000 − 486 000). Kurs EUR/USD nie wpływa na zwrot kapitału.</p>" +
            "<h3>Ekspozycja na kontrahenta przy ruchu kursu</h3>" +
            "<p>Po roku EUR/USD = 1,2000 (dolar osłabł). Pomijając zmiany stóp:</p>" +
            "<div class='table-scroll'><table class='calc'><tbody>" +
              "<tr><td>Wartość nogi USD, którą fundusz odda: 10,8 mln / 1,20</td><td class='num'>9 000 000 EUR</td></tr>" +
              "<tr><td>Wartość nogi EUR, którą fundusz otrzyma</td><td class='num'>10 000 000 EUR</td></tr>" +
              "<tr><td>Przybliżona wartość swapu dla funduszu</td><td class='num'>+1 000 000 EUR</td></tr>" +
              "<tr><td>Jako % NAV (bez zabezpieczenia)</td><td class='num'>≈ 1,0%</td></tr>" +
            "</tbody></table></div>" +
            "<p>Obligacja straciła w EUR ok. 1 mln, a swap zyskał tyle samo — zabezpieczenie działa. Ale fundusz ma teraz należność od banku. Przy kilku dużych CCS z tym samym bankiem i bez CSA <strong>limit kontrahenta 10% NAV może zostać przekroczony pasywnie</strong>.</p>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> obie nogi dyskontowane krzywymi swojej waluty (z uwzględnieniem spreadu bazowego), noga obca przeliczana po bieżącym kursie spot.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko kontrahenta</strong> — największe spośród standardowych swapów, z powodu wymiany kapitału.</li>" +
              "<li><strong>Ryzyko walutowe i stopy procentowej</strong> w dwóch walutach; ryzyko spreadu bazowego.</li>" +
              "<li><strong>Ryzyko płynności</strong> — duże dopłaty VM przy silnym ruchu kursu.</li>" +
              "<li><strong>Ryzyko rozrachunku</strong> — brutto wymiana kapitału na starcie i na końcu (Herstatt).</li>" +
              "<li><strong>Niedopasowanie</strong> — gdy obligacja zostanie sprzedana lub wykupiona przed terminem swapu.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Onboarding (ISDA/CSA), zawarcie, potwierdzenie (EMIR: do końca następnego dnia roboczego dla FC).</li>" +
              "<li>Rozrachunek wymiany początkowej (brutto, dwie waluty).</li>" +
              "<li>Okresowe płatności odsetek w dwóch walutach, codzienna wycena, VM.</li>" +
              "<li>Ewentualne korekty nominału (MtM CCS).</li>" +
              "<li>Wymiana końcowa albo wcześniejsze zamknięcie (unwind).</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g UCITS</span></h4><p>Derywat OTC na stopy procentowe i kursy walut — dopuszczalne instrumenty bazowe.</p></div>" +
              "<div class='rule'><h4>Limit kontrahenta i limit łączny <span class='law'>art. 52 ust. 1–2</span></h4><p>10% / 5% NAV oraz 20% łącznie z depozytami i papierami tego samego banku. Przy CCS ekspozycja szybko rośnie z kursem — potrzebny CSA i codzienne monitorowanie.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>art. 51 ust. 3; CESR/10-788</span></h4><p>Metoda zaangażowania: wartość nominalna nogi (nóg) walutowej przeliczona na walutę bazową. Gdy CCS zabezpiecza ryzyko walutowe obligacji, może być kompensowany na zasadach hedgingu z wytycznych.</p></div>" +
              "<div class='rule'><h4>Zabezpieczenia <span class='law'>ESMA/2014/937</span></h4><p>Kryteria jakości, dywersyfikacji i haircutów dla zabezpieczeń otrzymanych.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>art. 7–8 rozp. 231/2013</span>: w metodzie brutto nominał nóg w wartości bezwzględnej; w metodzie zaangażowania możliwe kompensowanie z zabezpieczaną pozycją walutową.</li>" +
              "<li>Limity kontrahenta według dokumentów AIF i polityki ryzyka ZAFI.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, zabezpieczenia, raportowanie",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Clearing</h4><p>CCS nie podlegają obecnie obowiązkowi rozliczania przez CCP w UE.</p></div>" +
              "<div class='rule'><h4>Depozyty zabezpieczające <span class='law'>rozp. 2016/2251</span></h4><p>Przy IM nie uwzględnia się stałej, fizycznie rozliczanej wymiany kapitału — IM liczy się od pozostałej części (odsetkowej). VM obejmuje całą wartość transakcji.</p></div>" +
              "<div class='rule'><h4>Raportowanie <span class='law'>art. 9 EMIR</span></h4><p>Do T+1: UTI, UPI, LEI, nominały i stopy obu nóg, kurs, daty wymiany, wycena, zabezpieczenia.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB).</li>" +
              "<li><strong>CFI</strong> — kategoria <code>S</code> (Swaps); w praktyce zwykle grupa <code>R</code> (Rates) z atrybutem cross-currency.</li>" +
              "<li>Kody walut ISO 4217, <strong>LEI</strong> kontrahenta.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>ISDA/CSA, zatwierdzony kontrahent.</li>" +
              "<li>Limit kontrahenta 5% / 10% i limit łączny 20% — z codzienną aktualizacją przy ruchu kursu.</li>" +
              "<li>Dopasowanie swapu do zabezpieczanej obligacji (waluta, nominał, kupony, termin).</li>" +
              "<li>Ekspozycja całkowita i dźwignia z poprawnym oznaczeniem hedgingu.</li>" +
              "<li>Rozrachunek wymiany kapitału (start, koniec), raport EMIR do T+1.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Cross-currency basis", "Spread dodawany do jednej z nóg zmiennych; odzwierciedla popyt i podaż na daną walutę w swapach."],
        ["MtM CCS (resettable)", "CCS, w którym nominał nogi jest okresowo korygowany do bieżącego kursu, co ogranicza ekspozycję."],
        ["Principal exchange", "Wymiana kapitału na starcie i przy zapadalności."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A cross-currency swap is an OTC contract in which the parties exchange principal in two currencies at the start and return it at maturity at the same rate, paying each other interest in between — each in a different currency. It turns an asset or liability in one currency into a synthetic asset or liability in another.",
      keyFacts: [
        ["Market", "OTC, bilateral with a bank; currently no EU clearing obligation."],
        ["Documentation", "ISDA Master Agreement + CSA, confirmation."],
        ["Principal exchange", "Yes — at the start and at maturity, at the trade-date rate (usually)."],
        ["Interest", "Fixed–fixed, fixed–floating or floating–floating (e.g. €STR vs SOFR + basis spread)."],
        ["Typical tenors", "1 to 30 years."],
        ["Key risk", "Large counterparty exposure because of the principal exchange when FX rates move."],
        ["CFI code", "<code>S*****</code> (Swaps); usually group <code>R</code> with the cross-currency attribute"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Cross-Currency Swap (CCS) combines two things: an exchange of currencies (like an <a href='#/i/fx-swap'>FX Swap</a>) and an exchange of interest (like an <a href='#/i/interest-rate-swap'>Interest Rate Swap</a>), but in two different currencies and usually over many years.</p>" +
            "<p>Three stages of cash flows:</p>" +
            "<ul>" +
              "<li><strong>initial exchange</strong> — party A gives principal in currency 1, party B in currency 2, at the spot rate;</li>" +
              "<li><strong>periodic interest</strong> — each party pays interest on the principal it received, in that currency;</li>" +
              "<li><strong>final exchange</strong> — principal returned <strong>at the same rate</strong> as at the start, regardless of the market rate at maturity.</li>" +
            "</ul>" +
            "<p>In floating–floating swaps one leg carries a <strong>basis spread</strong> (cross-currency basis). It shows how much the market adds or subtracts for obtaining a currency through a swap, over and above what interest rates alone imply.</p>" +
            "<p>Funds use CCS to hedge the currency risk of long-dated foreign-currency bonds — matched to the coupons and the maturity.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> Currencies, notionals (linked by the spot rate), rates on both legs, payment frequencies, principal exchange dates.</li>" +
              "<li><strong>Initial exchange.</strong> The fund pays currency 1 and receives currency 2, e.g. to buy a bond in that currency.</li>" +
              "<li><strong>Interest payments.</strong> Each period the fund pays interest in currency 2 (funded from the bond coupons) and receives interest in currency 1. Payments in two currencies are not netted.</li>" +
              "<li><strong>Valuation during the life.</strong> Value depends on rates in both currencies and on the FX rate. Because the full principal is returned at the old rate, an FX move creates a large gain or loss on the swap (offset by the change in value of the hedged bond).</li>" +
              "<li><strong>Collateral.</strong> Daily VM under the CSA. Large FX moves can mean large amounts.</li>" +
              "<li><strong>Final exchange.</strong> The fund returns currency 2 (e.g. from the bond redemption) and receives currency 1 in the trade-date amount.</li>" +
            "</ol>" +
            "<div class='callout'><strong>MtM (resettable) variant</strong>In some CCS the notional of one leg is periodically reset to the current FX rate (mark-to-market CCS). This limits the build-up of counterparty exposure. Such swaps are the interbank market standard.</div>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A EUR-based fund (NAV EUR 100m) buys a 3-year USD corporate bond: USD 10.8m nominal, 5.00% coupon. EUR/USD = 1.0800. To remove FX risk it enters a 3-year fixed–fixed CCS.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>When</th><th>Fund pays</th><th>Fund receives</th></tr></thead><tbody>" +
              "<tr><td>Start</td><td>EUR 10,000,000</td><td>USD 10,800,000 (to buy the bond)</td></tr>" +
              "<tr><td>Each year (×3)</td><td>4.50% × 10.8m = USD 486,000</td><td>2.60% × 10m = EUR 260,000</td></tr>" +
              "<tr><td>Bond coupon (each year)</td><td>—</td><td>5.00% × 10.8m = USD 540,000</td></tr>" +
              "<tr><td>Maturity</td><td>USD 10,800,000 (from the bond redemption)</td><td>EUR 10,000,000</td></tr>" +
            "</tbody></table></div>" +
            "<p>Result: the fund effectively holds a EUR bond with a 2.60% coupon plus an extra USD 54,000 a year (540,000 − 486,000). EUR/USD does not affect the return of principal.</p>" +
            "<h3>Counterparty exposure when FX moves</h3>" +
            "<p>After a year EUR/USD = 1.2000 (the dollar has weakened). Ignoring rate changes:</p>" +
            "<div class='table-scroll'><table class='calc'><tbody>" +
              "<tr><td>Value of the USD leg the fund will deliver: 10.8m / 1.20</td><td class='num'>EUR 9,000,000</td></tr>" +
              "<tr><td>Value of the EUR leg the fund will receive</td><td class='num'>EUR 10,000,000</td></tr>" +
              "<tr><td>Approximate swap value to the fund</td><td class='num'>+EUR 1,000,000</td></tr>" +
              "<tr><td>As % of NAV (uncollateralised)</td><td class='num'>≈ 1.0%</td></tr>" +
            "</tbody></table></div>" +
            "<p>The bond lost about EUR 1m and the swap gained the same — the hedge works. But the fund now has a receivable from the bank. With several large CCS with the same bank and no CSA, <strong>the 10% of NAV counterparty limit can be breached passively</strong>.</p>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> each leg discounted on its own currency curve (including the basis spread), the foreign leg converted at the current spot rate.</p>" +
            "<ul>" +
              "<li><strong>Counterparty risk</strong> — the highest of the standard swaps, because of the principal exchange.</li>" +
              "<li><strong>FX and interest rate risk</strong> in two currencies; basis spread risk.</li>" +
              "<li><strong>Liquidity risk</strong> — large VM calls on sharp FX moves.</li>" +
              "<li><strong>Settlement risk</strong> — gross principal exchange at start and end (Herstatt).</li>" +
              "<li><strong>Mismatch</strong> — when the bond is sold or redeemed before the swap matures.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Onboarding (ISDA/CSA), execution, confirmation (EMIR: by end of next business day for FCs).</li>" +
              "<li>Settlement of the initial exchange (gross, two currencies).</li>" +
              "<li>Periodic interest in two currencies, daily valuation, VM.</li>" +
              "<li>Notional resets where applicable (MtM CCS).</li>" +
              "<li>Final exchange or early termination (unwind).</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g) UCITS</span></h4><p>OTC derivative on interest rates and exchange rates — eligible underlyings.</p></div>" +
              "<div class='rule'><h4>Counterparty and combined limits <span class='law'>Art. 52(1)–(2)</span></h4><p>10% / 5% of NAV and 20% combined with deposits and securities of the same bank. With CCS exposure grows quickly with FX moves — a CSA and daily monitoring are needed.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>Art. 51(3); CESR/10-788</span></h4><p>Commitment approach: notional value of the currency leg(s) converted into base currency. Where the CCS hedges a bond's FX risk, it may be netted under the guidelines' hedging rules.</p></div>" +
              "<div class='rule'><h4>Collateral <span class='law'>ESMA/2014/937</span></h4><p>Quality, diversification and haircut criteria for collateral received.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Art. 7–8 Reg. 231/2013</span>: gross method — leg notionals in absolute value; commitment method — netting against the hedged currency position allowed.</li>" +
              "<li>Counterparty limits per the AIF's documents and the AIFM's risk policy.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "EMIR: clearing, margin, reporting",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Clearing</h4><p>CCS are currently not subject to the EU clearing obligation.</p></div>" +
              "<div class='rule'><h4>Margin <span class='law'>Reg. 2016/2251</span></h4><p>The fixed, physically settled principal exchange is excluded from IM — IM is computed on the remaining (interest) part. VM covers the full value of the trade.</p></div>" +
              "<div class='rule'><h4>Reporting <span class='law'>Art. 9 EMIR</span></h4><p>By T+1: UTI, UPI, LEI, notionals and rates of both legs, FX rate, exchange dates, valuation, collateral.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>UTI, UPI</strong> (ANNA DSB).</li>" +
              "<li><strong>CFI</strong> — category <code>S</code> (Swaps); in practice usually group <code>R</code> (Rates) with the cross-currency attribute.</li>" +
              "<li>ISO 4217 currency codes, counterparty <strong>LEI</strong>.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>ISDA/CSA, approved counterparty.</li>" +
              "<li>5% / 10% counterparty limit and 20% combined limit — updated daily as FX moves.</li>" +
              "<li>Swap matched to the hedged bond (currency, notional, coupons, maturity).</li>" +
              "<li>Global exposure and leverage with hedges correctly flagged.</li>" +
              "<li>Principal exchange settlement (start, end), EMIR report by T+1.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Cross-currency basis", "Spread added to one floating leg; reflects demand and supply for a currency in swaps."],
        ["MtM CCS (resettable)", "CCS in which a leg's notional is periodically reset to the current FX rate, limiting exposure."],
        ["Principal exchange", "Exchange of principal at the start and at maturity."]
      ]
    }
  }
});

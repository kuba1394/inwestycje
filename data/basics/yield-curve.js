window.BASICS.push({
  id: "yield-curve",
  title: { pl: "Stopy procentowe, rentowność i krzywa dochodowości", en: "Interest rates, yield and the yield curve" },
  level: 1,
  prereq: ["time-value"],
  sources: ["bmr"],
  related: ["government-bond", "overnight-index-swap", "stir-future", "interest-rate-swap"],
  content: {
    pl: {
      summary: "Stopa procentowa to cena pieniądza w czasie. Na rynku istnieje wiele stóp: ustalana przez bank centralny, stopy overnight (np. €STR), stopy międzybankowe (EURIBOR, WIBOR) i rentowności obligacji o różnych terminach. Zestawienie rentowności według terminu daje krzywą dochodowości — podstawowe narzędzie wyceny instrumentów dłużnych i derywatów stopy procentowej.",
      keyFacts: [
        ["Stopa banku centralnego", "Wyznacza koszt pieniądza na najkrótszym końcu krzywej (np. stopa depozytowa EBC, stopa referencyjna NBP)."],
        ["Stopy overnight (RFR)", "€STR, SOFR, SONIA — oparte na rzeczywistych transakcjach jednodniowych."],
        ["Stopy IBOR", "EURIBOR, WIBOR — stopy terminowe (np. 3M, 6M), ustalane z góry na okres."],
        ["Rentowność (YTM)", "Stopa, przy której wartość bieżąca przepływów obligacji równa się jej cenie."]
      ],
      sections: [
        { id: "rates", title: "Rodzaje stóp",
          html: "<ul>" +
                "<li><strong>Stopy banku centralnego</strong> — narzędzie polityki pieniężnej. Gdy bank centralny podnosi stopy, rosną koszty finansowania w całej gospodarce.</li>" +
                "<li><strong>Stopy overnight</strong> (RFR — <em>risk-free rates</em>) — €STR (EUR), SOFR (USD), SONIA (GBP). Liczone z rzeczywistych transakcji, prawie bez premii za ryzyko banków. Podstawa <a href='#/i/overnight-index-swap'>OIS</a>.</li>" +
                "<li><strong>Stopy międzybankowe (IBOR)</strong> — EURIBOR, WIBOR: stopa dla okresu (1M, 3M, 6M), znana z góry. Zawierają premię za ryzyko banków. Używane w kredytach, obligacjach zmiennokuponowych, <a href='#/i/forward-rate-agreement'>FRA</a> i swapach.</li>" +
                "<li><strong>Rentowności obligacji</strong> — wynikają z cen obligacji na rynku.</li>" +
                "<li><strong>Stopy swapowe</strong> — stałe stopy w <a href='#/i/interest-rate-swap'>IRS</a> na różne terminy; często punkt odniesienia dla obligacji korporacyjnych i covered bonds.</li>" +
                "</ul>" },
        { id: "ytm", title: "Rentowność do wykupu",
          html: "<p>Rentowność do wykupu (YTM) to jedna stopa, która „wyjaśnia” cenę obligacji:</p>" +
                "<p class='formula'>Cena = Σ kupon / (1 + y)<sup>t</sup> + nominał / (1 + y)<sup>n</sup></p>" +
                "<ul><li>Cena &lt; 100 → rentowność &gt; kupon (obligacja „z dyskontem”).</li><li>Cena &gt; 100 → rentowność &lt; kupon (obligacja „z premią”).</li></ul>" +
                "<p>Rentowność to nie gwarantowany zwrot: zakłada trzymanie do wykupu, brak niewypłacalności i reinwestowanie kuponów po tej samej stopie.</p>" },
        { id: "curve", title: "Krzywa dochodowości",
          html: "<p>Krzywa dochodowości to rentowności (lub stopy swapowe) dla kolejnych terminów: 3 miesiące, 1, 2, 5, 10, 30 lat.</p>" +
                "<ul>" +
                "<li><strong>Normalna (rosnąca)</strong> — dłuższe terminy mają wyższe rentowności (premia za czas i niepewność).</li>" +
                "<li><strong>Odwrócona</strong> — krótkie stopy wyższe od długich; rynek spodziewa się obniżek stóp, często przed spowolnieniem gospodarczym.</li>" +
                "<li><strong>Płaska</strong> — podobne rentowności dla wszystkich terminów.</li>" +
                "</ul>" +
                "<p>Z krzywej wylicza się <strong>stopy forward</strong> — rynkową „prognozę” przyszłych stóp, używaną do wyceny FRA, kontraktów STIR i nóg zmiennych swapów.</p>" },
        { id: "spreads", title: "Spready",
          html: "<p>Spread to różnica rentowności między dwoma instrumentami, wyrażana w punktach bazowych (1 pb = 0,01%).</p>" +
                "<ul>" +
                "<li><strong>Spread kredytowy</strong> — obligacja korporacyjna vs skarbowa (lub swap): premia za ryzyko emitenta.</li>" +
                "<li><strong>Spread państwa</strong> — np. obligacje włoskie vs niemieckie.</li>" +
                "<li><strong>Spread bazowy</strong> — między różnymi indeksami (np. EURIBOR vs €STR) albo walutami (cross-currency basis).</li>" +
                "</ul>" },
        { id: "benchmarks", title: "Wskaźniki referencyjne i compliance",
          html: "<p>Rozporządzenie BMR wymaga, aby podmioty nadzorowane używały wskaźników od administratorów z rejestru ESMA i miały plany awaryjne na wypadek zmiany lub zaprzestania publikacji wskaźnika. Wygaszenie LIBOR (2021–2024) pokazało, że kontrakty muszą mieć zapisy zastępcze (<em>fallback</em>). W Polsce trwa reforma wskaźników, która zastąpi WIBOR — warto śledzić komunikaty o harmonogramie.</p>" }
      ],
      glossary: [
        ["Basis point (bp)", "Punkt bazowy — 0,01 punktu procentowego."],
        ["Yield to maturity (YTM)", "Rentowność do wykupu — stopa zrównująca wartość bieżącą przepływów obligacji z jej ceną."],
        ["Yield curve", "Krzywa dochodowości — rentowności dla kolejnych terminów."],
        ["Forward rate", "Stopa terminowa — implikowana przez krzywą stopa dla przyszłego okresu."],
        ["Spread", "Różnica rentowności między dwoma instrumentami."]
      ]
    },
    en: {
      summary: "An interest rate is the price of money over time. The market has many rates: the central bank rate, overnight rates (e.g. €STR), interbank rates (EURIBOR, WIBOR) and bond yields for different maturities. Plotting yields by maturity gives the yield curve — the core tool for pricing debt instruments and interest rate derivatives.",
      keyFacts: [
        ["Central bank rate", "Sets the cost of money at the shortest end of the curve (e.g. the ECB deposit rate, the NBP reference rate)."],
        ["Overnight rates (RFR)", "€STR, SOFR, SONIA — based on actual one-day transactions."],
        ["IBOR rates", "EURIBOR, WIBOR — term rates (e.g. 3M, 6M), set in advance for the period."],
        ["Yield (YTM)", "The rate at which the present value of a bond's cash flows equals its price."]
      ],
      sections: [
        { id: "rates", title: "Types of rates",
          html: "<ul>" +
                "<li><strong>Central bank rates</strong> — a monetary policy tool. When the central bank raises rates, funding costs rise across the economy.</li>" +
                "<li><strong>Overnight rates</strong> (RFRs — risk-free rates) — €STR (EUR), SOFR (USD), SONIA (GBP). Computed from actual transactions, with almost no bank risk premium. The basis of <a href='#/i/overnight-index-swap'>OIS</a>.</li>" +
                "<li><strong>Interbank rates (IBORs)</strong> — EURIBOR, WIBOR: a rate for a period (1M, 3M, 6M), known in advance. They include a bank risk premium. Used in loans, floating-rate notes, <a href='#/i/forward-rate-agreement'>FRAs</a> and swaps.</li>" +
                "<li><strong>Bond yields</strong> — implied by market bond prices.</li>" +
                "<li><strong>Swap rates</strong> — fixed rates in <a href='#/i/interest-rate-swap'>IRS</a> for various maturities; often the reference for corporate and covered bonds.</li>" +
                "</ul>" },
        { id: "ytm", title: "Yield to maturity",
          html: "<p>Yield to maturity (YTM) is a single rate that \"explains\" a bond's price:</p>" +
                "<p class='formula'>Price = Σ coupon / (1 + y)<sup>t</sup> + nominal / (1 + y)<sup>n</sup></p>" +
                "<ul><li>Price &lt; 100 → yield &gt; coupon (a \"discount\" bond).</li><li>Price &gt; 100 → yield &lt; coupon (a \"premium\" bond).</li></ul>" +
                "<p>Yield is not a guaranteed return: it assumes holding to maturity, no default and reinvesting coupons at the same rate.</p>" },
        { id: "curve", title: "The yield curve",
          html: "<p>The yield curve shows yields (or swap rates) for successive maturities: 3 months, 1, 2, 5, 10, 30 years.</p>" +
                "<ul>" +
                "<li><strong>Normal (upward-sloping)</strong> — longer maturities have higher yields (a premium for time and uncertainty).</li>" +
                "<li><strong>Inverted</strong> — short rates above long ones; the market expects rate cuts, often ahead of an economic slowdown.</li>" +
                "<li><strong>Flat</strong> — similar yields across maturities.</li>" +
                "</ul>" +
                "<p>From the curve you derive <strong>forward rates</strong> — the market's \"forecast\" of future rates, used to price FRAs, STIR futures and floating swap legs.</p>" },
        { id: "spreads", title: "Spreads",
          html: "<p>A spread is the yield difference between two instruments, expressed in basis points (1 bp = 0.01%).</p>" +
                "<ul>" +
                "<li><strong>Credit spread</strong> — corporate vs government bond (or swap): the issuer risk premium.</li>" +
                "<li><strong>Sovereign spread</strong> — e.g. Italian vs German bonds.</li>" +
                "<li><strong>Basis spread</strong> — between different indices (e.g. EURIBOR vs €STR) or currencies (cross-currency basis).</li>" +
                "</ul>" },
        { id: "benchmarks", title: "Benchmarks and compliance",
          html: "<p>The Benchmarks Regulation requires supervised entities to use benchmarks from administrators in the ESMA register and to have contingency plans in case a benchmark changes or ceases. The end of LIBOR (2021–2024) showed that contracts need fallback provisions. In Poland a benchmark reform is under way that will replace WIBOR — keep an eye on announcements about the timetable.</p>" }
      ],
      glossary: [
        ["Basis point (bp)", "One hundredth of a percentage point (0.01%)."],
        ["Yield to maturity (YTM)", "The rate equating the present value of a bond's cash flows with its price."],
        ["Yield curve", "Yields for successive maturities."],
        ["Forward rate", "The curve-implied rate for a future period."],
        ["Spread", "The yield difference between two instruments."]
      ]
    }
  }
});

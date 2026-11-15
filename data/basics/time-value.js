window.BASICS.push({
  id: "time-value",
  title: { pl: "Wartość pieniądza w czasie i dyskontowanie", en: "Time value of money and discounting" },
  level: 1,
  sources: [],
  related: ["treasury-bill", "government-bond", "fx-forward"],
  content: {
    pl: {
      summary: "Złotówka dziś jest warta więcej niż złotówka za rok, bo dzisiejszą można zainwestować i zarobić odsetki. Na tej prostej zasadzie opiera się wycena prawie każdego instrumentu: obligacji, bonów, swapów i forwardów. Wartość bieżąca to przyszłe przepływy pieniężne „sprowadzone” do dzisiaj za pomocą stopy procentowej.",
      keyFacts: [
        ["Wartość przyszła (FV)", "FV = PV × (1 + r)<sup>n</sup>"],
        ["Wartość bieżąca (PV)", "PV = FV / (1 + r)<sup>n</sup>"],
        ["Rynek pieniężny (do roku)", "PV = FV / (1 + r × dni/360)"],
        ["Konwencje dni", "ACT/360, ACT/365, 30/360, ACT/ACT"]
      ],
      sections: [
        { id: "idea", title: "Idea",
          html: "<p>Jeśli bank płaci 5% rocznie, to 1 000 zł dziś zamieni się w 1 050 zł za rok. Odwrotnie: 1 050 zł za rok jest dziś warte 1 000 zł. To przeliczenie przyszłej kwoty na dzisiejszą nazywamy <strong>dyskontowaniem</strong>, a stopę — <strong>stopą dyskontową</strong>.</p>" +
                "<p class='formula'>PV = FV / (1 + r)<sup>n</sup></p>" +
                "<p>Im wyższa stopa i im dalej w przyszłości jest przepływ, tym mniej jest wart dziś. Dlatego <strong>gdy stopy rosną, ceny obligacji spadają</strong> — ich przyszłe kupony są dyskontowane wyższą stopą.</p>" },
        { id: "example", title: "Przykład",
          html: "<div class='table-scroll'><table class='calc'><thead><tr><th>Przepływ</th><th>Obliczenie (r = 5%)</th><th class='num'>Wartość dziś</th></tr></thead><tbody>" +
                "<tr><td>1 050 zł za rok</td><td>1 050 / 1,05</td><td class='num'>1 000,00 zł</td></tr>" +
                "<tr><td>1 102,50 zł za 2 lata</td><td>1 102,50 / 1,05²</td><td class='num'>1 000,00 zł</td></tr>" +
                "<tr><td>Obligacja: kupon 50 zł przez 3 lata + 1 000 zł na końcu</td><td>50/1,05 + 50/1,05² + 1 050/1,05³</td><td class='num'>1 000,00 zł</td></tr>" +
                "</tbody></table></div>" +
                "<p>Ostatni wiersz pokazuje ważną zasadę: obligacja z kuponem równym rynkowej stopie jest warta dokładnie nominał (<em>par</em>). Gdyby rynkowa stopa wzrosła do 6%, ta sama obligacja byłaby warta ok. 973,27 zł.</p>" },
        { id: "simple", title: "Odsetki proste na rynku pieniężnym",
          html: "<p>Dla terminów do roku (bony, lokaty, repo, papiery komercyjne) stosuje się odsetki proste i liczbę dni:</p>" +
                "<p class='formula'>Odsetki = kwota × stopa × dni / podstawa roku</p>" +
                "<p>Przykład: 1 000 000 EUR na 91 dni przy 2,40% (ACT/360) → 1 000 000 × 2,40% × 91/360 = 6 066,67 EUR.</p>" },
        { id: "daycount", title: "Konwencje liczenia dni",
          html: "<ul>" +
                "<li><strong>ACT/360</strong> — faktyczna liczba dni / 360; rynek pieniężny EUR i USD, większość nóg zmiennych swapów.</li>" +
                "<li><strong>ACT/365</strong> — faktyczna liczba dni / 365; m.in. PLN i GBP na rynku pieniężnym.</li>" +
                "<li><strong>30/360</strong> — każdy miesiąc ma 30 dni; nogi stałe swapów, część obligacji korporacyjnych (USD).</li>" +
                "<li><strong>ACT/ACT</strong> — faktyczna liczba dni w okresie kuponowym; obligacje skarbowe EUR.</li>" +
                "</ul>" +
                "<p>Konwencja zmienia wynik o ułamki procenta, ale przy dużych nominałach to realne pieniądze — i częste źródło rozbieżności przy uzgadnianiu wycen.</p>" },
        { id: "compounding", title: "Kapitalizacja",
          html: "<p>Odsetki mogą być doliczane raz w roku, częściej albo w sposób ciągły. Ta sama stopa nominalna daje różne wyniki:</p>" +
                "<p class='formula'>Roczna: (1 + r)  ·  Kwartalna: (1 + r/4)<sup>4</sup>  ·  Ciągła: e<sup>r</sup></p>" +
                "<p>Przy r = 5%: 1,0500 / 1,0509 / 1,0513. Formuła ciągła pojawia się m.in. w wycenie kontraktów terminowych na indeksy i opcji.</p>" }
      ],
      glossary: [
        ["Present value (PV)", "Wartość bieżąca — dzisiejsza wartość przyszłego przepływu pieniężnego."],
        ["Discount rate", "Stopa dyskontowa używana do przeliczenia przyszłych kwot na dzisiejsze."],
        ["Day count convention", "Konwencja liczenia dni określająca ułamek roku dla odsetek."],
        ["Par", "Cena równa nominałowi (100%)."]
      ]
    },
    en: {
      summary: "A zloty today is worth more than a zloty in a year, because today's can be invested to earn interest. Almost every instrument is priced on this simple principle: bonds, bills, swaps and forwards. Present value is future cash flows \"brought back\" to today using an interest rate.",
      keyFacts: [
        ["Future value (FV)", "FV = PV × (1 + r)<sup>n</sup>"],
        ["Present value (PV)", "PV = FV / (1 + r)<sup>n</sup>"],
        ["Money market (up to a year)", "PV = FV / (1 + r × days/360)"],
        ["Day counts", "ACT/360, ACT/365, 30/360, ACT/ACT"]
      ],
      sections: [
        { id: "idea", title: "The idea",
          html: "<p>If a bank pays 5% a year, PLN 1,000 today becomes PLN 1,050 in a year. Conversely, PLN 1,050 in a year is worth PLN 1,000 today. Converting a future amount into today's money is called <strong>discounting</strong>, and the rate is the <strong>discount rate</strong>.</p>" +
                "<p class='formula'>PV = FV / (1 + r)<sup>n</sup></p>" +
                "<p>The higher the rate and the further in the future the cash flow, the less it is worth today. That is why <strong>when rates rise, bond prices fall</strong> — their future coupons are discounted at a higher rate.</p>" },
        { id: "example", title: "Example",
          html: "<div class='table-scroll'><table class='calc'><thead><tr><th>Cash flow</th><th>Calculation (r = 5%)</th><th class='num'>Value today</th></tr></thead><tbody>" +
                "<tr><td>PLN 1,050 in a year</td><td>1,050 / 1.05</td><td class='num'>PLN 1,000.00</td></tr>" +
                "<tr><td>PLN 1,102.50 in 2 years</td><td>1,102.50 / 1.05²</td><td class='num'>PLN 1,000.00</td></tr>" +
                "<tr><td>Bond: PLN 50 coupon for 3 years + PLN 1,000 at the end</td><td>50/1.05 + 50/1.05² + 1,050/1.05³</td><td class='num'>PLN 1,000.00</td></tr>" +
                "</tbody></table></div>" +
                "<p>The last row shows an important rule: a bond whose coupon equals the market rate is worth exactly its nominal (<em>par</em>). If the market rate rose to 6%, the same bond would be worth about PLN 973.27.</p>" },
        { id: "simple", title: "Simple interest in the money market",
          html: "<p>For terms up to a year (bills, deposits, repo, commercial paper) simple interest and a day count are used:</p>" +
                "<p class='formula'>Interest = amount × rate × days / year basis</p>" +
                "<p>Example: EUR 1,000,000 for 91 days at 2.40% (ACT/360) → 1,000,000 × 2.40% × 91/360 = EUR 6,066.67.</p>" },
        { id: "daycount", title: "Day count conventions",
          html: "<ul>" +
                "<li><strong>ACT/360</strong> — actual days / 360; EUR and USD money markets, most floating swap legs.</li>" +
                "<li><strong>ACT/365</strong> — actual days / 365; including PLN and GBP money markets.</li>" +
                "<li><strong>30/360</strong> — every month has 30 days; fixed swap legs, some (USD) corporate bonds.</li>" +
                "<li><strong>ACT/ACT</strong> — actual days in the coupon period; EUR government bonds.</li>" +
                "</ul>" +
                "<p>The convention changes the result by fractions of a percent, but on large notionals that is real money — and a frequent source of differences when reconciling valuations.</p>" },
        { id: "compounding", title: "Compounding",
          html: "<p>Interest can be added once a year, more often, or continuously. The same nominal rate gives different results:</p>" +
                "<p class='formula'>Annual: (1 + r)  ·  Quarterly: (1 + r/4)<sup>4</sup>  ·  Continuous: e<sup>r</sup></p>" +
                "<p>At r = 5%: 1.0500 / 1.0509 / 1.0513. The continuous formula appears, for example, in index futures and option pricing.</p>" }
      ],
      glossary: [
        ["Present value (PV)", "Today's value of a future cash flow."],
        ["Discount rate", "The rate used to convert future amounts into today's money."],
        ["Day count convention", "Convention setting the year fraction for interest."],
        ["Par", "A price equal to nominal (100%)."]
      ]
    }
  }
});

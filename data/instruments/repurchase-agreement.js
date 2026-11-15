window.INSTRUMENTS.push({
  id: "repurchase-agreement",
  name: "Repurchase Agreement (Repo)",
  aliases: ["Repo", "Reverse Repo", "Sell/Buy-Back", "Tri-Party Repo", "transakcja odkupu"],
  market: "otc",
  asset: { pl: "Finansowanie papierami (SFT)", en: "Securities financing (SFT)" },
  sources: ["ucits", "eligible", "emir3dir", "cesr10788", "esma2014", "aifmd", "aifmdL2", "sftr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Repo to sprzedaż papierów wartościowych z jednoczesnym zobowiązaniem do ich odkupu w ustalonym terminie po wyższej cenie. Ekonomicznie to pożyczka gotówki zabezpieczona papierami: strona sprzedająca papiery pożycza gotówkę (repo), a strona kupująca je pożycza (reverse repo).",
      keyFacts: [
        ["Rynek", "OTC — bilateralnie, przez agenta trójstronnego (tri-party) lub przez CCP."],
        ["Dokumentacja", "GMRA (ICMA Global Master Repurchase Agreement); umowa z agentem tri-party."],
        ["Kierunki", "Repo — fundusz oddaje papiery, dostaje gotówkę. Reverse repo — fundusz daje gotówkę, dostaje papiery."],
        ["Termin", "Overnight do kilku miesięcy; także open (bez terminu, wypowiadane)."],
        ["Zabezpieczenie", "Zwykle obligacje skarbowe; haircut i codzienne uzupełnianie (margin calls)."],
        ["Rozliczenie", "DvP na starcie i przy odkupie (CSD lub agent tri-party)."],
        ["Regulacja szczególna", "SFTR — raportowanie T+1 i ujawnienia; wytyczne ESMA/2014/937 dla UCITS."],
        ["Kod CFI", "<code>LR****</code> (Financing – Repurchase agreements)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Repurchase Agreement</em> składa się z dwóch nóg:</p>" +
            "<ul>" +
              "<li><strong>noga początkowa</strong> — strona A sprzedaje stronie B papiery za gotówkę;</li>" +
              "<li><strong>noga końcowa</strong> — strona A odkupuje te same (lub równoważne) papiery po cenie wyższej o odsetki (<em>repo rate</em>).</li>" +
            "</ul>" +
            "<p>Prawnie własność papierów przechodzi na kupującego, ale <strong>ryzyko i korzyści ekonomiczne</strong> (zmiana ceny, kupony) zostają u sprzedającego. Kupony wypłacone w trakcie są mu przekazywane (<em>manufactured payment</em>).</p>" +
            "<p>W funduszach:</p>" +
            "<ul>" +
              "<li><strong>reverse repo</strong> — lokowanie nadwyżek gotówki z zabezpieczeniem (fundusze pieniężne, płynność UCITS);</li>" +
              "<li><strong>repo</strong> — pozyskanie gotówki pod zastaw obligacji, w AIF także do budowania dźwigni.</li>" +
            "</ul>" +
            "<p>Pokrewne: <em>Sell/Buy-Back</em> (dwie oddzielne transakcje kasowe, często bez umowy ramowej) i <em>Securities Lending</em> (pożyczka papierów za opłatą — osobna karta).</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zawarcie.</strong> Papiery (lub koszyk dopuszczalnych papierów w tri-party), kwota gotówki, stopa repo, termin, haircut.</li>" +
              "<li><strong>Haircut.</strong> Pożyczkodawca gotówki dostaje papiery o wartości wyższej niż pożyczona kwota:" +
                "<p class='formula'>Gotówka = wartość rynkowa papierów × (1 − haircut)</p></li>" +
              "<li><strong>Rozliczenie początkowe.</strong> DvP: papiery do kupującego, gotówka do sprzedającego.</li>" +
              "<li><strong>W trakcie.</strong> Codzienna wycena papierów. Gdy ich wartość spadnie poniżej wymaganej, pożyczkodawca wzywa do uzupełnienia (<em>margin call</em>). W tri-party robi to agent automatycznie.</li>" +
              "<li><strong>Odkup.</strong> W dniu zapadalności papiery wracają, a gotówka wraca z odsetkami:" +
                "<p class='formula'>Cena odkupu = gotówka × (1 + stopa repo × dni/360)</p></li>" +
              "<li><strong>Niewypłacalność.</strong> Jeśli strona nie wykona odkupu, druga strona sprzedaje papiery lub zatrzymuje gotówkę i rozlicza saldo (close-out netting według GMRA).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy — reverse repo",
          html:
            "<p>Fundusz UCITS (NAV 200 mln EUR) ma nadwyżkę gotówki i lokuje ją w 7-dniowym reverse repo z bankiem. Zabezpieczenie: obligacje skarbowe o wartości rynkowej 10 mln EUR, haircut 2%, stopa repo 2,10%.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Gotówka przekazana przez fundusz</td><td>10 000 000 × (1 − 2%)</td><td class='num'>9 800 000,00 EUR</td></tr>" +
              "<tr><td>Odsetki za 7 dni</td><td>9 800 000 × 2,10% × 7/360</td><td class='num'>4 001,67 EUR</td></tr>" +
              "<tr><td>Cena odkupu (fundusz otrzyma)</td><td>9 800 000 + 4 001,67</td><td class='num'>9 804 001,67 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li><strong>Ekspozycja na kontrahenta:</strong> gotówka pożyczona (9,8 mln) minus wartość otrzymanego zabezpieczenia (10 mln) &lt; 0 — fundusz jest nadzabezpieczony, ekspozycja netto 0. Gdyby obligacje straciły 3% wartości (9,7 mln), ekspozycja wyniosłaby 0,1 mln, a fundusz powinien wezwać do uzupełnienia.</li>" +
              "<li><strong>Możliwość odwołania:</strong> termin 7 dni mieści się w limicie, przy którym repo uznaje się za możliwe do zakończenia w każdej chwili (wytyczne ESMA).</li>" +
              "<li><strong>Zabezpieczenie:</strong> obligacje muszą spełniać kryteria jakości, płynności i dywersyfikacji (co do zasady maks. 20% NAV na jednego emitenta zabezpieczeń).</li>" +
              "<li><strong>SFTR:</strong> raport do repozytorium transakcji do T+1.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> reverse repo — należność = gotówka + narosłe odsetki; repo — zobowiązanie w tej samej wysokości. Papiery przekazane w repo zostają w portfelu funduszu (ryzyko rynkowe zostaje u niego).</p>" +
            "<ul>" +
              "<li><strong>Ryzyko kontrahenta</strong> — ograniczone zabezpieczeniem; rośnie, gdy wartość zabezpieczenia spada (<em>wrong-way risk</em>, jeśli papiery są skorelowane z kontrahentem).</li>" +
              "<li><strong>Ryzyko płynności</strong> — przy repo: konieczność oddania gotówki w terminie; przy reverse repo: dostęp do gotówki przed terminem.</li>" +
              "<li><strong>Ryzyko reinwestycji</strong> — gdy gotówka z repo jest reinwestowana, fundusz ponosi ryzyko tej inwestycji.</li>" +
              "<li><strong>Ryzyko operacyjne i prawne</strong> — rozrachunek, margin calls, skuteczność close-out netting.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>GMRA podpisane, kontrahent zatwierdzony; ewentualnie umowa tri-party z listą dopuszczalnych zabezpieczeń.</li>" +
              "<li>Zawarcie, potwierdzenie, raport SFTR do T+1.</li>" +
              "<li>Rozliczenie DvP nogi początkowej.</li>" +
              "<li>Codzienna wycena, margin calls, ewentualna zamiana zabezpieczeń (substitution).</li>" +
              "<li>Przekazanie kuponów (manufactured payments).</li>" +
              "<li>Rozliczenie odkupu, raport o zakończeniu.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Podstawa <span class='law'>art. 51 ust. 2 UCITS; art. 11 dyr. 2007/16/WE</span></h4><p>Repo i reverse repo to techniki efektywnego zarządzania portfelem (EPM). Muszą być ekonomicznie uzasadnione, służyć ograniczeniu ryzyka, kosztów lub generowaniu dodatkowego dochodu przy akceptowalnym ryzyku, a ich ryzyka muszą być ujęte w procesie zarządzania ryzykiem.</p></div>" +
              "<div class='rule'><h4>Możliwość zakończenia w każdej chwili <span class='law'>ESMA/2014/937</span></h4><p>Reverse repo: fundusz musi móc w każdej chwili odzyskać całą gotówkę albo zakończyć transakcję. Repo: musi móc odzyskać papiery albo zakończyć transakcję. Transakcje terminowe do 7 dni uznaje się za spełniające ten warunek.</p></div>" +
              "<div class='rule'><h4>Zabezpieczenia <span class='law'>ESMA/2014/937</span></h4><p>Płynność, codzienna wycena, wysoka jakość kredytowa, niska korelacja z kontrahentem, dywersyfikacja (maks. 20% NAV w jednym emitencie, z wyjątkiem dla papierów skarbowych UE, jeśli przewiduje to prospekt), haircuty według polityki.</p></div>" +
              "<div class='rule'><h4>Reinwestycja gotówki <span class='law'>ESMA/2014/937</span></h4><p>Gotówka otrzymana jako zabezpieczenie może być tylko: zdeponowana w instytucjach kredytowych, zainwestowana w obligacje skarbowe wysokiej jakości, w reverse repo z nadzorowanymi instytucjami kredytowymi (z możliwością odwołania) lub w krótkoterminowe fundusze rynku pieniężnego. Zabezpieczenia niepieniężnego nie wolno sprzedawać, reinwestować ani zastawiać.</p></div>" +
              "<div class='rule'><h4>Limity kontrahenta <span class='law'>art. 52; ESMA/2014/937</span></h4><p>Ekspozycje z technik EPM sumuje się z ekspozycjami z derywatów OTC wobec tego samego kontrahenta przy stosowaniu limitów z art. 52.</p></div>" +
              "<div class='rule'><h4>Dochody <span class='law'>ESMA/2014/937</span></h4><p>Wszystkie dochody z EPM, po odliczeniu kosztów bezpośrednich i pośrednich, muszą wracać do funduszu. Koszty i podmioty, które je otrzymują, ujawnia się w sprawozdaniu.</p></div>" +
              "<div class='rule'><h4>Ekspozycja całkowita <span class='law'>CESR/10-788</span></h4><p>Reinwestycja gotówki z repo w sposób generujący dźwignię zwiększa ekspozycję całkowitą.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>art. 7–8, załącznik I rozp. 231/2013</span>: gotówka otrzymana w repo i reinwestowana zwiększa ekspozycję AIF (to klasyczna dźwignia finansowa). Przy reverse repo istotne jest, która strona ponosi ryzyko i korzyści z papierów.</li>" +
              "<li><strong>Ujawnienia</strong> <span class='law'>art. 13–14 SFTR</span> w dokumentach dla inwestorów i raportach rocznych.</li>" +
              "<li><strong>Ponowne wykorzystanie zabezpieczeń</strong> <span class='law'>art. 15 SFTR</span>: wymaga pisemnej informacji o ryzykach i uprzedniej zgody strony, która przekazała zabezpieczenie.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "SFTR: raportowanie i przejrzystość",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Raportowanie transakcji <span class='law'>art. 4 SFTR</span></h4><p>Zawarcie, zmiana i zakończenie SFT raportuje się do repozytorium transakcji do T+1, wraz z danymi o zabezpieczeniach i ich ponownym wykorzystaniu. W imieniu UCITS raportuje spółka zarządzająca, w imieniu AIF — ZAFI.</p></div>" +
              "<div class='rule'><h4>Przejrzystość wobec inwestorów <span class='law'>art. 13–14 SFTR</span></h4><p>Prospekt: rodzaje SFT, dopuszczalne aktywa, maksymalny i oczekiwany udział w aktywach, kryteria doboru kontrahentów, zabezpieczenia, polityka podziału dochodów. Sprawozdania okresowe: dane o wykorzystaniu SFT.</p></div>" +
              "<div class='rule'><h4>EMIR</h4><p>Repo nie jest derywatem — nie raportuje się go w EMIR. Repo rozliczane przez CCP podlega regulaminowi izby.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI</strong> transakcji SFT, <strong>LEI</strong> stron i agenta tri-party.</li>" +
              "<li><strong>ISIN</strong> papierów stanowiących zabezpieczenie (raportowane w SFTR).</li>" +
              "<li><strong>CFI</strong> — kategoria <code>L</code> (Financing), grupa <code>R</code> (Repurchase agreements).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>GMRA, zatwierdzony kontrahent, transakcje zgodne z zakresem ujawnionym w prospekcie (SFTR art. 14).</li>" +
              "<li>Możliwość odwołania (termin do 7 dni albo prawo wypowiedzenia).</li>" +
              "<li>Jakość, dywersyfikacja i haircuty zabezpieczeń; codzienne margin calls.</li>" +
              "<li>Reinwestycja gotówki tylko w dopuszczalne aktywa; brak reużycia zabezpieczeń niepieniężnych.</li>" +
              "<li>Ekspozycja na kontrahenta łącznie z derywatami OTC (art. 52).</li>" +
              "<li>Raport SFTR do T+1 i uzgodnienie z repozytorium.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Repo rate", "Stopa procentowa transakcji repo — koszt pożyczenia gotówki."],
        ["Haircut", "Procentowe obniżenie wartości zabezpieczenia; chroni pożyczkodawcę gotówki przed spadkiem ceny papierów."],
        ["Tri-party repo", "Repo, w którym agent (np. Euroclear, Clearstream, BNY) zarządza zabezpieczeniami, wyceną i margin calls."],
        ["GC / special", "General collateral — dowolne papiery z koszyka; special — konkretny, poszukiwany papier (zwykle niższa stopa repo)."],
        ["Manufactured payment", "Kupon lub dywidenda przekazywana pierwotnemu właścicielowi papieru w trakcie repo."],
        ["EPM", "Efficient Portfolio Management — techniki efektywnego zarządzania portfelem UCITS."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A repo is a sale of securities combined with a commitment to buy them back on a set date at a higher price. Economically it is a cash loan secured on securities: the party selling the securities borrows cash (repo), and the party buying them lends cash (reverse repo).",
      keyFacts: [
        ["Market", "OTC — bilateral, via a tri-party agent, or through a CCP."],
        ["Documentation", "GMRA (ICMA Global Master Repurchase Agreement); tri-party agent agreement."],
        ["Directions", "Repo — the fund delivers securities, receives cash. Reverse repo — the fund gives cash, receives securities."],
        ["Term", "Overnight to several months; also open (no fixed term, callable)."],
        ["Collateral", "Usually government bonds; haircut and daily top-ups (margin calls)."],
        ["Settlement", "DvP at the start and on repurchase (CSD or tri-party agent)."],
        ["Specific regulation", "SFTR — T+1 reporting and disclosures; ESMA/2014/937 guidelines for UCITS."],
        ["CFI code", "<code>LR****</code> (Financing – Repurchase agreements)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Repurchase Agreement has two legs:</p>" +
            "<ul>" +
              "<li><strong>opening leg</strong> — party A sells securities to party B for cash;</li>" +
              "<li><strong>closing leg</strong> — party A buys back the same (or equivalent) securities at a price higher by the interest (repo rate).</li>" +
            "</ul>" +
            "<p>Legally, title passes to the buyer, but the <strong>economic risk and reward</strong> (price changes, coupons) stay with the seller. Coupons paid during the term are passed back to it (manufactured payment).</p>" +
            "<p>In funds:</p>" +
            "<ul>" +
              "<li><strong>reverse repo</strong> — placing surplus cash on a secured basis (money market funds, UCITS liquidity);</li>" +
              "<li><strong>repo</strong> — raising cash against bonds, and in AIFs also to build leverage.</li>" +
            "</ul>" +
            "<p>Related: Sell/Buy-Back (two separate cash trades, often without a master agreement) and Securities Lending (lending securities for a fee — separate card).</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Execution.</strong> Securities (or a basket of eligible securities in tri-party), cash amount, repo rate, term, haircut.</li>" +
              "<li><strong>Haircut.</strong> The cash lender receives securities worth more than the cash lent:" +
                "<p class='formula'>Cash = market value of securities × (1 − haircut)</p></li>" +
              "<li><strong>Opening settlement.</strong> DvP: securities to the buyer, cash to the seller.</li>" +
              "<li><strong>During the term.</strong> Securities are valued daily. When their value falls below the required level, the cash lender makes a margin call. In tri-party the agent does this automatically.</li>" +
              "<li><strong>Repurchase.</strong> On maturity the securities come back and the cash is returned with interest:" +
                "<p class='formula'>Repurchase price = cash × (1 + repo rate × days/360)</p></li>" +
              "<li><strong>Default.</strong> If a party fails to repurchase, the other sells the securities or keeps the cash and settles the balance (close-out netting under the GMRA).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example — reverse repo",
          html:
            "<p>A UCITS fund (NAV EUR 200m) has surplus cash and places it in a 7-day reverse repo with a bank. Collateral: government bonds with a market value of EUR 10m, 2% haircut, 2.10% repo rate.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>Cash paid by the fund</td><td>10,000,000 × (1 − 2%)</td><td class='num'>EUR 9,800,000.00</td></tr>" +
              "<tr><td>Interest for 7 days</td><td>9,800,000 × 2.10% × 7/360</td><td class='num'>EUR 4,001.67</td></tr>" +
              "<tr><td>Repurchase price (fund receives)</td><td>9,800,000 + 4,001.67</td><td class='num'>EUR 9,804,001.67</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li><strong>Counterparty exposure:</strong> cash lent (9.8m) less collateral value (10m) &lt; 0 — the fund is over-collateralised, net exposure 0. If the bonds lost 3% (to 9.7m), exposure would be 0.1m and the fund should make a margin call.</li>" +
              "<li><strong>Recallability:</strong> a 7-day term is within the limit at which a repo is treated as terminable at any time (ESMA guidelines).</li>" +
              "<li><strong>Collateral:</strong> the bonds must meet quality, liquidity and diversification criteria (as a rule max 20% of NAV per collateral issuer).</li>" +
              "<li><strong>SFTR:</strong> trade repository report by T+1.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> reverse repo — receivable = cash + accrued interest; repo — liability of the same amount. Securities delivered under a repo stay in the fund's portfolio (market risk stays with the fund).</p>" +
            "<ul>" +
              "<li><strong>Counterparty risk</strong> — reduced by collateral; rises when collateral value falls (wrong-way risk if the securities are correlated with the counterparty).</li>" +
              "<li><strong>Liquidity risk</strong> — for repo: cash must be returned on time; for reverse repo: access to cash before maturity.</li>" +
              "<li><strong>Reinvestment risk</strong> — when repo cash is reinvested, the fund bears the risk of that investment.</li>" +
              "<li><strong>Operational and legal risk</strong> — settlement, margin calls, enforceability of close-out netting.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>GMRA signed, counterparty approved; where applicable, tri-party agreement with an eligible collateral schedule.</li>" +
              "<li>Execution, confirmation, SFTR report by T+1.</li>" +
              "<li>DvP settlement of the opening leg.</li>" +
              "<li>Daily valuation, margin calls, collateral substitution where applicable.</li>" +
              "<li>Pass-through of coupons (manufactured payments).</li>" +
              "<li>Repurchase settlement, termination report.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Basis <span class='law'>Art. 51(2) UCITS; Art. 11 Dir. 2007/16/EC</span></h4><p>Repo and reverse repo are efficient portfolio management (EPM) techniques. They must be economically appropriate, aimed at reducing risk or cost or generating additional income at an acceptable level of risk, and their risks must be captured by the risk management process.</p></div>" +
              "<div class='rule'><h4>Terminable at any time <span class='law'>ESMA/2014/937</span></h4><p>Reverse repo: the fund must be able at any time to recall the full amount of cash or terminate the trade. Repo: it must be able to recall the securities or terminate. Fixed-term trades of up to 7 days are treated as meeting this condition.</p></div>" +
              "<div class='rule'><h4>Collateral <span class='law'>ESMA/2014/937</span></h4><p>Liquidity, daily valuation, high credit quality, low correlation with the counterparty, diversification (max 20% of NAV per issuer, with an exception for EU government securities where the prospectus allows), haircuts per policy.</p></div>" +
              "<div class='rule'><h4>Cash reinvestment <span class='law'>ESMA/2014/937</span></h4><p>Cash received as collateral may only be: deposited with credit institutions, invested in high-quality government bonds, used for reverse repo with supervised credit institutions (recallable), or invested in short-term money market funds. Non-cash collateral may not be sold, reinvested or pledged.</p></div>" +
              "<div class='rule'><h4>Counterparty limits <span class='law'>Art. 52; ESMA/2014/937</span></h4><p>Exposures from EPM techniques are combined with OTC derivative exposures to the same counterparty when applying the Art. 52 limits.</p></div>" +
              "<div class='rule'><h4>Revenues <span class='law'>ESMA/2014/937</span></h4><p>All revenues from EPM, net of direct and indirect costs, must be returned to the fund. Costs and the entities receiving them are disclosed in the annual report.</p></div>" +
              "<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Reinvesting repo cash in a way that creates leverage increases global exposure.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Art. 7–8, Annex I Reg. 231/2013</span>: cash received under a repo and reinvested increases the AIF's exposure (classic financial leverage). For reverse repo, what matters is which party bears the risk and reward of the securities.</li>" +
              "<li><strong>Disclosures</strong> <span class='law'>Art. 13–14 SFTR</span> in investor documents and annual reports.</li>" +
              "<li><strong>Reuse of collateral</strong> <span class='law'>Art. 15 SFTR</span>: requires written risk disclosure and prior consent from the party that provided the collateral.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "SFTR: reporting and transparency",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Transaction reporting <span class='law'>Art. 4 SFTR</span></h4><p>Conclusion, modification and termination of an SFT are reported to a trade repository by T+1, with collateral and reuse data. The management company reports on behalf of a UCITS, and the AIFM on behalf of an AIF.</p></div>" +
              "<div class='rule'><h4>Investor transparency <span class='law'>Art. 13–14 SFTR</span></h4><p>Prospectus: types of SFT, eligible assets, maximum and expected proportion of assets, counterparty selection criteria, collateral, revenue-sharing policy. Periodic reports: data on SFT usage.</p></div>" +
              "<div class='rule'><h4>EMIR</h4><p>A repo is not a derivative — it is not reported under EMIR. CCP-cleared repo is subject to the CCP rulebook.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li>SFT <strong>UTI</strong>, <strong>LEI</strong> of the parties and the tri-party agent.</li>" +
              "<li><strong>ISIN</strong> of the collateral securities (reported under SFTR).</li>" +
              "<li><strong>CFI</strong> — category <code>L</code> (Financing), group <code>R</code> (Repurchase agreements).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>GMRA, approved counterparty, trades within the scope disclosed in the prospectus (SFTR Art. 14).</li>" +
              "<li>Recallability (term of up to 7 days or a termination right).</li>" +
              "<li>Collateral quality, diversification and haircuts; daily margin calls.</li>" +
              "<li>Cash reinvested only in eligible assets; no reuse of non-cash collateral.</li>" +
              "<li>Counterparty exposure combined with OTC derivatives (Art. 52).</li>" +
              "<li>SFTR report by T+1 and reconciliation with the trade repository.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Repo rate", "Interest rate on a repo — the cost of borrowing cash."],
        ["Haircut", "Percentage reduction in collateral value; protects the cash lender against a fall in the securities' price."],
        ["Tri-party repo", "Repo in which an agent (e.g. Euroclear, Clearstream, BNY) manages collateral, valuation and margin calls."],
        ["GC / special", "General collateral — any securities from a basket; special — a specific, sought-after security (usually a lower repo rate)."],
        ["Manufactured payment", "Coupon or dividend passed to the original owner of the security during the repo."],
        ["EPM", "Efficient Portfolio Management — UCITS techniques for efficient portfolio management."]
      ]
    }
  }
});

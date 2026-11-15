window.INSTRUMENTS.push({
  id: "securities-lending",
  name: "Securities Lending",
  aliases: ["Stock Lending", "Securities Loan", "Agency Lending", "pożyczka papierów wartościowych"],
  market: "otc",
  asset: { pl: "Finansowanie papierami (SFT)", en: "Securities financing (SFT)" },
  sources: ["ucits", "eligible", "esma2014", "cesr10788", "aifmd", "aifmdL2", "sftr", "ssr", "td"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Pożyczka papierów wartościowych polega na czasowym przekazaniu papierów (akcji, obligacji) pożyczkobiorcy w zamian za zabezpieczenie i opłatę. Pożyczkobiorca musi oddać takie same papiery na żądanie lub w terminie. Fundusze pożyczają papiery, żeby zarobić dodatkowy dochód — zwykle przez agenta, najczęściej depozytariusza.",
      keyFacts: [
        ["Rynek", "OTC; zwykle przez agenta pożyczkowego (agent lender) w imieniu funduszu."],
        ["Dokumentacja", "GMSLA (Global Master Securities Lending Agreement) + umowa z agentem."],
        ["Zabezpieczenie", "Gotówka lub papiery (np. obligacje skarbowe, akcje z indeksów), zwykle 102–105% wartości pożyczki."],
        ["Termin", "Najczęściej otwarty (open) — odwoływalny w każdej chwili."],
        ["Dochód", "Opłata pożyczkowa (% rocznie), dzielona między fundusz i agenta."],
        ["Prawa z papierów", "Dywidendy i kupony wracają do pożyczkodawcy (manufactured payments); prawo głosu przechodzi na pożyczkobiorcę."],
        ["Kod CFI", "<code>LS****</code> (Financing – Securities lending)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Securities Lending</em> to prawnie przeniesienie własności papierów na pożyczkobiorcę ze zobowiązaniem do zwrotu <strong>papierów równoważnych</strong> (ten sam ISIN i ilość). Ekonomicznie ryzyko i korzyści z papierów zostają u pożyczkodawcy — zmiana ceny wpływa na NAV funduszu, a dywidendy i kupony wracają do niego.</p>" +
            "<p>Po co pożyczkobiorcy papiery?</p>" +
            "<ul>" +
              "<li>krótka sprzedaż (hedge fundy, market makerzy);</li>" +
              "<li>pokrycie nieudanych rozliczeń;</li>" +
              "<li>strategie arbitrażowe i zabezpieczające.</li>" +
            "</ul>" +
            "<p>Różni się od <a href='#/i/repurchase-agreement'>Repo</a> motywacją: w repo chodzi o gotówkę (papiery to zabezpieczenie), a w pożyczce o konkretne papiery (gotówka lub inne papiery to zabezpieczenie).</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Program.</strong> Fundusz podpisuje umowę z agentem (np. depozytariuszem): lista zatwierdzonych pożyczkobiorców, dopuszczalne zabezpieczenia, haircuty, limity, podział dochodu.</li>" +
              "<li><strong>Pożyczka.</strong> Agent pożycza papiery z portfela funduszu. Papiery przechodzą na pożyczkobiorcę, a zabezpieczenie na rachunek funduszu (często przez agenta trójstronnego).</li>" +
              "<li><strong>Codzienna wycena.</strong> Wartość pożyczonych papierów i zabezpieczenia jest porównywana codziennie. Niedobór pokrywa się wezwaniem do uzupełnienia (margin call).</li>" +
              "<li><strong>Zdarzenia.</strong> Dywidendy i kupony pożyczkobiorca przekazuje funduszowi. Przed walnym zgromadzeniem fundusz może odwołać papiery, żeby zagłosować.</li>" +
              "<li><strong>Zwrot.</strong> Na żądanie (recall) lub w terminie pożyczkobiorca oddaje papiery, a fundusz zwraca zabezpieczenie.</li>" +
              "<li><strong>Niewypłacalność pożyczkobiorcy.</strong> Agent sprzedaje zabezpieczenie i odkupuje papiery. Wielu agentów daje gwarancję pokrycia niedoboru (indemnification).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz akcyjny UCITS (NAV 200 mln EUR) pożycza akcje warte 20 mln EUR na 30 dni. Zabezpieczenie: obligacje skarbowe o wartości 21 mln EUR (105%), haircut 2%. Opłata 0,30% rocznie, podział 80/20 (fundusz/agent).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Opłata za 30 dni</td><td>20 000 000 × 0,30% × 30/360</td><td class='num'>5 000 EUR</td></tr>" +
              "<tr><td>Dla funduszu (80%)</td><td>5 000 × 80%</td><td class='num'>4 000 EUR</td></tr>" +
              "<tr><td>Wartość zabezpieczenia po haircut</td><td>21 000 000 × 98%</td><td class='num'>20 580 000 EUR</td></tr>" +
              "<tr><td>Ekspozycja na pożyczkobiorcę dziś</td><td>20 000 000 − 20 580 000 &lt; 0</td><td class='num'>0</td></tr>" +
              "<tr><td>Akcje drożeją o 5% → wartość pożyczki 21 mln</td><td>21 000 000 − 20 580 000</td><td class='num'>420 000 EUR (0,21% NAV)</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Po wzroście cen agent musi wezwać do uzupełnienia zabezpieczenia. Do tego czasu ekspozycja wlicza się do limitu kontrahenta <strong>razem z derywatami OTC</strong> z tym podmiotem.</li>" +
              "<li>Pożyczone akcje nadal są w portfelu funduszu i wliczają się do jego limitów inwestycyjnych.</li>" +
              "<li>Dochód netto (po kosztach agenta) musi trafiać do funduszu, a podział ujawnia się w sprawozdaniu.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> pożyczone papiery wyceniane jak zwykle w portfelu; należna opłata narasta.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko kontrahenta</strong> — niewypłacalność pożyczkobiorcy połączona ze spadkiem wartości zabezpieczenia.</li>" +
              "<li><strong>Ryzyko reinwestycji gotówki</strong> — jeśli zabezpieczenie gotówkowe jest reinwestowane, strata z reinwestycji obciąża fundusz.</li>" +
              "<li><strong>Ryzyko operacyjne</strong> — zwrot papierów na czas (np. przy sprzedaży przez zarządzającego), manufactured payments, zdarzenia korporacyjne.</li>" +
              "<li><strong>Utrata prawa głosu</strong> — jeśli papiery nie zostaną odwołane przed walnym.</li>" +
              "<li><strong>Ryzyko prawne</strong> — skuteczność close-out netting, ryzyko agenta.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Umowa z agentem, zatwierdzenie pożyczkobiorców i zabezpieczeń.</li>" +
              "<li>Pożyczka: dostawa papierów i zabezpieczenia (DvD lub przez agenta tri-party), raport SFTR do T+1.</li>" +
              "<li>Codzienna wycena, margin calls, zmiany zabezpieczeń.</li>" +
              "<li>Manufactured payments, odwołania przed walnymi i przy sprzedaży papierów.</li>" +
              "<li>Zwrot, rozliczenie opłat, raport o zakończeniu.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Podstawa <span class='law'>art. 51 ust. 2 UCITS; art. 11 dyr. 2007/16/WE</span></h4><p>Technika efektywnego zarządzania portfelem (EPM) — musi być ekonomicznie uzasadniona, a jej ryzyka ujęte w procesie zarządzania ryzykiem.</p></div>" +
              "<div class='rule'><h4>Odwołanie w każdej chwili <span class='law'>ESMA/2014/937</span></h4><p>Fundusz musi móc w każdej chwili odwołać każdy pożyczony papier albo zakończyć umowę.</p></div>" +
              "<div class='rule'><h4>Zabezpieczenia <span class='law'>ESMA/2014/937</span></h4><p>Płynność, codzienna wycena, jakość kredytowa emitenta, niska korelacja z pożyczkobiorcą, dywersyfikacja (maks. 20% NAV w jednym emitencie, z wyjątkiem dla papierów skarbowych), polityka haircutów. Zabezpieczenia niepieniężnego nie wolno sprzedawać, reinwestować ani zastawiać.</p></div>" +
              "<div class='rule'><h4>Reinwestycja gotówki <span class='law'>ESMA/2014/937</span></h4><p>Tylko depozyty w instytucjach kredytowych, obligacje skarbowe wysokiej jakości, reverse repo z nadzorowanymi instytucjami lub krótkoterminowe MMF.</p></div>" +
              "<div class='rule'><h4>Limity kontrahenta <span class='law'>art. 52; ESMA/2014/937</span></h4><p>Ekspozycja z EPM sumowana z derywatami OTC wobec tego samego kontrahenta.</p></div>" +
              "<div class='rule'><h4>Dochody i ujawnienia <span class='law'>ESMA/2014/937; art. 13–14 SFTR</span></h4><p>Cały dochód netto dla funduszu; w prospekcie — polityka pożyczek, maksymalny i oczekiwany udział aktywów, podział opłat. W sprawozdaniu — koszty, agent i jego powiązania ze spółką zarządzającą lub depozytariuszem.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Dźwignia</strong> <span class='law'>załącznik I rozp. 231/2013</span>: reinwestycja zabezpieczenia gotówkowego zwiększa ekspozycję AIF.</li>" +
              "<li><strong>Ponowne wykorzystanie zabezpieczeń</strong> <span class='law'>art. 15 SFTR</span>: wymaga informacji o ryzyku i uprzedniej zgody.</li>" +
              "<li>Polityka pożyczek i ujawnienia — dokumenty AIF, art. 13–14 SFTR.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "SFTR i obowiązki rynkowe",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Raportowanie <span class='law'>art. 4 SFTR</span></h4><p>Zawarcie, zmiana, zakończenie, zabezpieczenie i jego ponowne wykorzystanie — do repozytorium do T+1. Raportuje spółka zarządzająca lub ZAFI (często deleguje to agentowi).</p></div>" +
              "<div class='rule'><h4>Prawo głosu i znaczne pakiety <span class='law'>dyr. 2004/109/WE</span></h4><p>Pożyczone akcje dają prawo głosu pożyczkobiorcy. Wpływa to na wyliczenie progów zawiadomień po obu stronach. Polityka głosowania funduszu powinna określać, kiedy papiery są odwoływane.</p></div>" +
              "<div class='rule'><h4>SSR</h4><p>Pożyczki są podstawą krótkiej sprzedaży przez pożyczkobiorców. Pożyczkodawcy nie dotyczą obowiązki zgłoszeń SSR z tytułu samej pożyczki.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>UTI</strong> transakcji SFT; <strong>LEI</strong> funduszu, pożyczkobiorcy i agenta.</li>" +
              "<li><strong>ISIN</strong> pożyczonych papierów i papierów zabezpieczenia.</li>" +
              "<li><strong>CFI</strong> — kategoria <code>L</code> (Financing), grupa <code>S</code> (Securities lending).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Pożyczkobiorcy zatwierdzeni; prawo odwołania w każdej chwili.</li>" +
              "<li>Zabezpieczenia: dopuszczalność, haircuty, dywersyfikacja, codzienne margin calls.</li>" +
              "<li>Reinwestycja gotówki tylko w dopuszczalne aktywa.</li>" +
              "<li>Ekspozycja na pożyczkobiorcę razem z derywatami OTC (art. 52).</li>" +
              "<li>Udział pożyczonych aktywów w granicach z prospektu (SFTR art. 14).</li>" +
              "<li>Podział dochodu zgodny z umową; raport SFTR do T+1.</li>" +
              "<li>Odwołania przed walnymi zgodnie z polityką głosowania.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Agent lender", "Podmiot (zwykle depozytariusz) prowadzący program pożyczek w imieniu funduszu."],
        ["GMSLA", "Global Master Securities Lending Agreement — standardowa umowa ramowa."],
        ["Recall", "Odwołanie pożyczonych papierów przez pożyczkodawcę."],
        ["Indemnification", "Gwarancja agenta pokrycia niedoboru, gdy pożyczkobiorca nie odda papierów."],
        ["Manufactured payment", "Równowartość dywidendy lub kuponu przekazywana pożyczkodawcy."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "Securities lending is the temporary transfer of securities (shares, bonds) to a borrower in exchange for collateral and a fee. The borrower must return the same securities on demand or at term. Funds lend securities to earn extra income — usually through an agent, most often the depositary.",
      keyFacts: [
        ["Market", "OTC; usually via an agent lender acting for the fund."],
        ["Documentation", "GMSLA (Global Master Securities Lending Agreement) + agency agreement."],
        ["Collateral", "Cash or securities (e.g. government bonds, index equities), usually 102–105% of the loan value."],
        ["Term", "Most often open — recallable at any time."],
        ["Income", "Lending fee (% a year), split between the fund and the agent."],
        ["Rights attached", "Dividends and coupons return to the lender (manufactured payments); voting rights pass to the borrower."],
        ["CFI code", "<code>LS****</code> (Financing – Securities lending)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>Securities Lending legally transfers title to the borrower with an obligation to return <strong>equivalent securities</strong> (same ISIN and quantity). Economically the risk and reward stay with the lender — price changes affect the fund's NAV, and dividends and coupons are passed back to it.</p>" +
            "<p>Why does the borrower need the securities?</p>" +
            "<ul>" +
              "<li>short selling (hedge funds, market makers);</li>" +
              "<li>covering settlement fails;</li>" +
              "<li>arbitrage and hedging strategies.</li>" +
            "</ul>" +
            "<p>It differs from a <a href='#/i/repurchase-agreement'>Repo</a> in motivation: a repo is about cash (securities are the collateral), whereas a loan is about specific securities (cash or other securities are the collateral).</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Programme.</strong> The fund signs an agreement with an agent (e.g. the depositary): approved borrowers, eligible collateral, haircuts, limits, fee split.</li>" +
              "<li><strong>Loan.</strong> The agent lends securities from the fund's portfolio. The securities go to the borrower, and the collateral to the fund's account (often via a tri-party agent).</li>" +
              "<li><strong>Daily valuation.</strong> The value of the securities lent and the collateral is compared daily. Any shortfall is covered by a margin call.</li>" +
              "<li><strong>Events.</strong> The borrower passes dividends and coupons to the fund. Before a general meeting the fund may recall the securities in order to vote.</li>" +
              "<li><strong>Return.</strong> On recall or at term the borrower returns the securities and the fund returns the collateral.</li>" +
              "<li><strong>Borrower default.</strong> The agent sells the collateral and buys back the securities. Many agents provide indemnification against any shortfall.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A UCITS equity fund (NAV EUR 200m) lends shares worth EUR 20m for 30 days. Collateral: government bonds worth EUR 21m (105%), 2% haircut. Fee 0.30% a year, split 80/20 (fund/agent).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>Fee for 30 days</td><td>20,000,000 × 0.30% × 30/360</td><td class='num'>EUR 5,000</td></tr>" +
              "<tr><td>Fund share (80%)</td><td>5,000 × 80%</td><td class='num'>EUR 4,000</td></tr>" +
              "<tr><td>Collateral value after haircut</td><td>21,000,000 × 98%</td><td class='num'>EUR 20,580,000</td></tr>" +
              "<tr><td>Exposure to the borrower today</td><td>20,000,000 − 20,580,000 &lt; 0</td><td class='num'>0</td></tr>" +
              "<tr><td>Shares rise 5% → loan value EUR 21m</td><td>21,000,000 − 20,580,000</td><td class='num'>EUR 420,000 (0.21% of NAV)</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>After the price rise the agent must make a margin call. Until then, the exposure counts towards the counterparty limit <strong>together with OTC derivatives</strong> with that entity.</li>" +
              "<li>The shares lent remain in the fund's portfolio and count towards its investment limits.</li>" +
              "<li>Net revenue (after agent costs) must go to the fund, and the split is disclosed in the annual report.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> securities lent are valued as usual in the portfolio; the fee receivable accrues.</p>" +
            "<ul>" +
              "<li><strong>Counterparty risk</strong> — borrower default combined with a fall in collateral value.</li>" +
              "<li><strong>Cash reinvestment risk</strong> — if cash collateral is reinvested, any reinvestment loss falls on the fund.</li>" +
              "<li><strong>Operational risk</strong> — timely return of securities (e.g. when the manager sells), manufactured payments, corporate actions.</li>" +
              "<li><strong>Loss of voting</strong> — if securities are not recalled before a general meeting.</li>" +
              "<li><strong>Legal risk</strong> — enforceability of close-out netting, agent risk.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Agency agreement, approval of borrowers and collateral.</li>" +
              "<li>Loan: delivery of securities and collateral (DvD or via a tri-party agent), SFTR report by T+1.</li>" +
              "<li>Daily valuation, margin calls, collateral substitutions.</li>" +
              "<li>Manufactured payments, recalls before general meetings and on sales.</li>" +
              "<li>Return, fee settlement, termination report.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Basis <span class='law'>Art. 51(2) UCITS; Art. 11 Dir. 2007/16/EC</span></h4><p>An efficient portfolio management (EPM) technique — it must be economically appropriate, and its risks captured by the risk management process.</p></div>" +
              "<div class='rule'><h4>Recallable at any time <span class='law'>ESMA/2014/937</span></h4><p>The fund must be able at any time to recall any security lent or terminate the agreement.</p></div>" +
              "<div class='rule'><h4>Collateral <span class='law'>ESMA/2014/937</span></h4><p>Liquidity, daily valuation, issuer credit quality, low correlation with the borrower, diversification (max 20% of NAV per issuer, with an exception for government securities), haircut policy. Non-cash collateral may not be sold, reinvested or pledged.</p></div>" +
              "<div class='rule'><h4>Cash reinvestment <span class='law'>ESMA/2014/937</span></h4><p>Only deposits with credit institutions, high-quality government bonds, reverse repo with supervised institutions, or short-term MMFs.</p></div>" +
              "<div class='rule'><h4>Counterparty limits <span class='law'>Art. 52; ESMA/2014/937</span></h4><p>EPM exposure combined with OTC derivatives to the same counterparty.</p></div>" +
              "<div class='rule'><h4>Revenues and disclosures <span class='law'>ESMA/2014/937; Art. 13–14 SFTR</span></h4><p>All net revenue to the fund; in the prospectus — lending policy, maximum and expected share of assets, fee split. In the annual report — costs, the agent and its links to the management company or depositary.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li><strong>Leverage</strong> <span class='law'>Annex I Reg. 231/2013</span>: reinvesting cash collateral increases the AIF's exposure.</li>" +
              "<li><strong>Reuse of collateral</strong> <span class='law'>Art. 15 SFTR</span>: requires risk disclosure and prior consent.</li>" +
              "<li>Lending policy and disclosures — AIF documents, Art. 13–14 SFTR.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "SFTR and market obligations",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Reporting <span class='law'>Art. 4 SFTR</span></h4><p>Conclusion, modification, termination, collateral and its reuse — to a trade repository by T+1. Reported by the management company or AIFM (often delegated to the agent).</p></div>" +
              "<div class='rule'><h4>Voting rights and major holdings <span class='law'>Dir. 2004/109/EC</span></h4><p>Shares lent give the borrower the voting rights. This affects notification threshold calculations on both sides. The fund's voting policy should set out when securities are recalled.</p></div>" +
              "<div class='rule'><h4>SSR</h4><p>Loans underpin short selling by borrowers. The lender has no SSR notification obligations from the loan itself.</p></div>" +
            "</div>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li>SFT <strong>UTI</strong>; <strong>LEI</strong> of the fund, borrower and agent.</li>" +
              "<li><strong>ISIN</strong> of securities lent and collateral securities.</li>" +
              "<li><strong>CFI</strong> — category <code>L</code> (Financing), group <code>S</code> (Securities lending).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Approved borrowers; right to recall at any time.</li>" +
              "<li>Collateral: eligibility, haircuts, diversification, daily margin calls.</li>" +
              "<li>Cash reinvested only in eligible assets.</li>" +
              "<li>Borrower exposure combined with OTC derivatives (Art. 52).</li>" +
              "<li>Share of assets on loan within prospectus levels (SFTR Art. 14).</li>" +
              "<li>Revenue split per the agreement; SFTR report by T+1.</li>" +
              "<li>Recalls before general meetings per the voting policy.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Agent lender", "Entity (usually the depositary) running the lending programme on the fund's behalf."],
        ["GMSLA", "Global Master Securities Lending Agreement — the standard master agreement."],
        ["Recall", "The lender calling back securities on loan."],
        ["Indemnification", "Agent's guarantee to cover a shortfall if the borrower fails to return securities."],
        ["Manufactured payment", "Equivalent of a dividend or coupon passed to the lender."]
      ]
    }
  }
});

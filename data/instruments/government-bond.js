window.INSTRUMENTS.push({
  id: "government-bond",
  name: "Government Bond",
  aliases: ["Sovereign Bond", "Treasury Bond", "Bund", "OAT", "BTP", "obligacja skarbowa"],
  market: "otc",
  asset: { pl: "Dłużne", en: "Fixed income" },
  sources: ["ucits", "eligible", "aifmd", "csdrT1", "sftr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Obligacja skarbowa to papier dłużny emitowany przez państwo. Emitent zobowiązuje się płacić odsetki (kupony) w ustalonych terminach i zwrócić nominał w dniu wykupu. To podstawowy instrument rynku stopy procentowej i punkt odniesienia dla wyceny innych papierów dłużnych.",
      keyFacts: [
        ["Rynek", "Pierwotny: aukcje ministerstwa finansów lub agencji długu (dealerzy skarbowi). Wtórny: głównie OTC między dealerami i na platformach (MTF), często też notowane na giełdzie."],
        ["Kupon", "Stały, zmienny, zerokuponowy albo indeksowany inflacją; zwykle płatny rocznie (EUR) lub półrocznie (USD, GBP)."],
        ["Cena", "Kwotowana jako % nominału, bez narosłych odsetek (clean price). Płaci się cenę z odsetkami (dirty price)."],
        ["Rozliczenie", "UE: T+2 (od 11.10.2027 T+1), DvP w krajowym lub międzynarodowym CSD."],
        ["Kluczowe miary", "Rentowność do wykupu (YTM), duration, spread do swapów lub do Bundów."],
        ["Ryzyko kredytowe", "Ryzyko państwa (sovereign); dla obligacji we własnej walucie zwykle najniższe na danym rynku."],
        ["Kod CFI", "<code>DB****</code> (Debt – Bonds)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Government Bond</em> to pożyczka udzielona państwu przez inwestora w formie zbywalnego papieru. Posiadacz dostaje:</p>" +
            "<ul>" +
              "<li><strong>kupony</strong> — odsetki od nominału według stopy kuponu;</li>" +
              "<li><strong>nominał</strong> — w dniu wykupu.</li>" +
            "</ul>" +
            "<p>Cena obligacji porusza się w <strong>przeciwnym kierunku niż rentowności</strong>: gdy rynkowe stopy rosną, istniejące obligacje z niższym kuponem tanieją, i odwrotnie. Siłę tej reakcji mierzy <strong>duration</strong>.</p>" +
            "<p>Odmiany: obligacje stałokuponowe (np. polskie DS, niemieckie Bund), zmiennokuponowe (np. polskie WZ), zerokuponowe (np. OK), indeksowane inflacją (np. BTP€i, OAT€i), bony skarbowe (krótkie — osobna karta: Treasury Bill).</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Emisja.</strong> Państwo ogłasza aukcję. Dealerzy skarbowi składają oferty, a emitent ustala cenę odcięcia. Kolejne aukcje często „dolewają” do tej samej serii (ten sam ISIN).</li>" +
              "<li><strong>Obrót wtórny.</strong> Fundusz kupuje od dealera (telefon, platforma MTF) lub na giełdzie. Kwotowana jest cena czysta albo rentowność.</li>" +
              "<li><strong>Rozliczenie.</strong> Kupujący płaci cenę czystą plus narosłe odsetki od ostatniego kuponu:" +
                "<p class='formula'>Dirty price = clean price + narosłe odsetki</p>" +
                "Narosłe odsetki = nominał × kupon × (dni od ostatniego kuponu / dni w okresie), według konwencji (dla obligacji skarbowych w EUR — ACT/ACT).</li>" +
              "<li><strong>Kupony.</strong> W dniu płatności posiadacz z dnia ustalenia uprawnionych (record date) dostaje odsetki przez CSD i depozytariusza.</li>" +
              "<li><strong>Wykup.</strong> W dniu zapadalności emitent zwraca nominał wraz z ostatnim kuponem.</li>" +
            "</ol>" +
            "<p class='formula'>Δcena ≈ − modified duration × Δrentowność × cena</p>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz (NAV 200 mln PLN) kupuje obligacje skarbowe o nominale 10 mln PLN: kupon 5% rocznie, termin 5 lat, cena czysta 101,20, 120 dni od ostatniego kuponu, modified duration 4,3.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Cena czysta</td><td>10 000 000 × 101,20%</td><td class='num'>10 120 000,00 PLN</td></tr>" +
              "<tr><td>Narosłe odsetki (ACT/ACT, uproszczone 120/365)</td><td>10 000 000 × 5% × 120/365</td><td class='num'>164 383,56 PLN</td></tr>" +
              "<tr><td>Do zapłaty (dirty)</td><td>10 120 000 + 164 383,56</td><td class='num'>10 284 383,56 PLN</td></tr>" +
              "<tr><td>Rentowności +50 pb — zmiana wartości</td><td>10 120 000 × 4,3 × 0,005</td><td class='num'>≈ −217 580 PLN</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Pozycja to ok. 5,1% NAV. Gdyby była to obligacja korporacyjna, trafiłaby do „koszyka 40%”. Dla obligacji skarbowych państwa UE obowiązuje <strong>podwyższony limit 35%</strong> (art. 52 ust. 3) i <strong>nie wlicza się ich do koszyka 40%</strong>.</li>" +
              "<li>Jeśli prospekt i nadzorca na to pozwalają, fundusz może mieć do 100% NAV w obligacjach jednego państwa, pod warunkiem co najmniej 6 różnych emisji i maks. 30% w jednej emisji (art. 54).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> cena z rynku (fixing, kwotowania dealerów, serwis cenowy, np. BVAL/CBBT) według polityki wyceny; przy braku obrotu — model z krzywej rentowności.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — główne ryzyko; rośnie z duration.</li>" +
              "<li><strong>Ryzyko kredytowe państwa</strong> — spread do „bezpiecznych” obligacji (np. BTP vs Bund).</li>" +
              "<li><strong>Ryzyko walutowe</strong> — obligacje w walucie innej niż bazowa funduszu.</li>" +
              "<li><strong>Ryzyko inflacji</strong> — dla obligacji stałokuponowych.</li>" +
              "<li><strong>Ryzyko płynności</strong> — zwykle niskie dla benchmarków, wyższe dla starych, małych serii (off-the-run).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zakup (aukcja lub rynek wtórny), rozliczenie DvP.</li>" +
              "<li>Płatności kuponów, ewentualnie podatek u źródła dla obligacji zagranicznych.</li>" +
              "<li>Użycie w repo lub pożyczkach papierów (SFT) — obligacja nadal jest w portfelu funduszu.</li>" +
              "<li>Przedterminowy wykup lub zamiana (switch auction) — zdarzenia emitenta.</li>" +
              "<li>Wykup w terminie.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. a–d UCITS</span></h4><p>Obligacje dopuszczone do obrotu na rynku regulowanym (lub innym uznanym rynku z prospektu) to zbywalne papiery wartościowe. Obligacje nienotowane — do limitu 10% (art. 50 ust. 2 lit. a), chyba że kwalifikują się jako instrumenty rynku pieniężnego.</p></div>" +
              "<div class='rule'><h4>Limit 35% <span class='law'>art. 52 ust. 3</span></h4><p>Do 35% NAV w papierach jednego emitenta, jeśli emituje je lub gwarantuje państwo członkowskie, jego władze lokalne, państwo trzecie albo międzynarodowa instytucja publiczna z udziałem państwa członkowskiego.</p></div>" +
              "<div class='rule'><h4>Bez koszyka 40% <span class='law'>art. 52 ust. 5 akapit 1</span></h4><p>Papiery z art. 52 ust. 3 nie liczą się do łącznego limitu 40% dla pozycji powyżej 5%.</p></div>" +
              "<div class='rule'><h4>Do 100% NAV <span class='law'>art. 54</span></h4><p>Za zgodą nadzorcy i przy ujawnieniu w prospekcie: do 100% NAV w papierach jednego emitenta publicznego, pod warunkiem co najmniej 6 emisji i maks. 30% NAV w jednej emisji.</p></div>" +
              "<div class='rule'><h4>Limit nabycia <span class='law'>art. 56 ust. 2 lit. b i ust. 3</span></h4><p>Limit 10% dłużnych papierów jednego emitenta nie dotyczy papierów emitowanych lub gwarantowanych przez państwa członkowskie, ich władze lokalne, państwa trzecie i międzynarodowe instytucje publiczne.</p></div>" +
              "<div class='rule'><h4>Ratingi <span class='law'>art. 51 ust. 3 UCITS (po dyr. 2013/14/UE)</span></h4><p>Spółka zarządzająca nie może wyłącznie ani mechanicznie opierać oceny ryzyka kredytowego na ratingach agencji.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Limity emitenta, ratingu, duration — według dokumentów AIF i prawa krajowego.</li>" +
              "<li>Dźwignia: pozycja opłacona gotówką = wartość rynkowa; finansowanie zakupu przez repo zwiększa dźwignię.</li>" +
              "<li>Raport Annex IV: ekspozycje na dług państw (według kraju i terminu).</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — raport transakcyjny po stronie firmy inwestycyjnej; obowiązki przejrzystości dla obrotu obligacjami.</li>" +
              "<li><strong>SSR</strong> — pozycje krótkie netto w długu państw UE podlegają zgłoszeniu; zakaz niekrytej krótkiej sprzedaży długu państw.</li>" +
              "<li><strong>SFTR</strong> — przy użyciu obligacji w repo lub pożyczkach papierów.</li>" +
              "<li><strong>CSDR</strong> — kary za nieudane rozrachunki.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> serii (np. <code>PL0000…</code>, <code>DE000…</code>); nazwa serii (np. DS1030).</li>" +
              "<li><strong>CFI</strong> — kategoria <code>D</code> (Debt), grupa <code>B</code> (Bonds); atrybuty opisują typ oprocentowania, gwarancję i formę wykupu.</li>" +
              "<li><strong>LEI</strong> emitenta (np. skarbu państwa) — do agregacji limitów.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Emitent kwalifikuje się do art. 52 ust. 3? Poprawne oznaczenie w systemie (poza koszykiem 40%).</li>" +
              "<li>Przy art. 54: liczba emisji ≥ 6, maks. 30% w jednej emisji, zapis w prospekcie.</li>" +
              "<li>Limity duration, ratingu, kraju z prospektu.</li>" +
              "<li>Notowanie: rynek regulowany lub uznany? Jeśli nie — limit 10% lub kwalifikacja jako MMI.</li>" +
              "<li>Obligacje wypożyczone lub w repo nadal wliczane do limitów funduszu.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Clean / dirty price", "Cena bez narosłych odsetek / cena z narosłymi odsetkami (faktycznie płacona)."],
        ["Accrued interest", "Narosłe odsetki od ostatniej płatności kuponu."],
        ["YTM", "Rentowność do wykupu — stopa dyskontowa zrównująca wartość przepływów z ceną."],
        ["Modified duration", "Procentowa zmiana ceny przy zmianie rentowności o 1 punkt procentowy."],
        ["On-the-run / off-the-run", "Najnowsza, najpłynniejsza seria danego terminu / starsze serie."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A government bond is a debt security issued by a state. The issuer promises to pay interest (coupons) on set dates and to repay the nominal at maturity. It is the core instrument of the interest rate market and the reference point for pricing other debt securities.",
      keyFacts: [
        ["Market", "Primary: auctions by the finance ministry or debt agency (primary dealers). Secondary: mainly OTC between dealers and on platforms (MTFs), often also exchange-listed."],
        ["Coupon", "Fixed, floating, zero-coupon or inflation-linked; usually paid annually (EUR) or semi-annually (USD, GBP)."],
        ["Price", "Quoted as % of nominal, excluding accrued interest (clean price). The amount paid includes interest (dirty price)."],
        ["Settlement", "EU: T+2 (T+1 from 11 Oct 2027), DvP at a national or international CSD."],
        ["Key measures", "Yield to maturity (YTM), duration, spread to swaps or to Bunds."],
        ["Credit risk", "Sovereign risk; for bonds in the state's own currency usually the lowest in that market."],
        ["CFI code", "<code>DB****</code> (Debt – Bonds)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Government Bond is a loan from an investor to a state in the form of a transferable security. The holder receives:</p>" +
            "<ul>" +
              "<li><strong>coupons</strong> — interest on the nominal at the coupon rate;</li>" +
              "<li><strong>the nominal</strong> — at maturity.</li>" +
            "</ul>" +
            "<p>A bond's price moves <strong>opposite to yields</strong>: when market rates rise, existing bonds with lower coupons become cheaper, and vice versa. The strength of this reaction is measured by <strong>duration</strong>.</p>" +
            "<p>Variants: fixed-coupon (e.g. Polish DS, German Bund), floating (e.g. Polish WZ), zero-coupon (e.g. Polish OK), inflation-linked (e.g. BTP€i, OAT€i), treasury bills (short-term — separate card: Treasury Bill).</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Issuance.</strong> The state announces an auction. Primary dealers bid, and the issuer sets the cut-off price. Later auctions often tap the same line (same ISIN).</li>" +
              "<li><strong>Secondary trading.</strong> The fund buys from a dealer (voice, MTF platform) or on an exchange. The clean price or the yield is quoted.</li>" +
              "<li><strong>Settlement.</strong> The buyer pays the clean price plus interest accrued since the last coupon:" +
                "<p class='formula'>Dirty price = clean price + accrued interest</p>" +
                "Accrued interest = nominal × coupon × (days since last coupon / days in period), per the day-count convention (ACT/ACT for EUR government bonds).</li>" +
              "<li><strong>Coupons.</strong> On the payment date the holder on the record date receives interest via the CSD and the depositary.</li>" +
              "<li><strong>Redemption.</strong> At maturity the issuer repays the nominal with the final coupon.</li>" +
            "</ol>" +
            "<p class='formula'>Δprice ≈ − modified duration × Δyield × price</p>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A fund (NAV PLN 200m) buys PLN 10m nominal of government bonds: 5% annual coupon, 5-year maturity, clean price 101.20, 120 days since the last coupon, modified duration 4.3.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>Clean price</td><td>10,000,000 × 101.20%</td><td class='num'>PLN 10,120,000.00</td></tr>" +
              "<tr><td>Accrued interest (ACT/ACT, simplified 120/365)</td><td>10,000,000 × 5% × 120/365</td><td class='num'>PLN 164,383.56</td></tr>" +
              "<tr><td>Amount paid (dirty)</td><td>10,120,000 + 164,383.56</td><td class='num'>PLN 10,284,383.56</td></tr>" +
              "<tr><td>Yields +50 bp — change in value</td><td>10,120,000 × 4.3 × 0.005</td><td class='num'>≈ −PLN 217,580</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>The position is about 5.1% of NAV. A corporate bond would go into the \"40% bucket\". For EU government bonds a <strong>higher 35% limit</strong> applies (Art. 52(3)) and they are <strong>not counted in the 40% bucket</strong>.</li>" +
              "<li>If the prospectus and the regulator allow, the fund may hold up to 100% of NAV in one state's bonds, provided there are at least 6 different issues and no more than 30% in any single issue (Art. 54).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> market price (fixing, dealer quotes, pricing service, e.g. BVAL/CBBT) per the valuation policy; when untraded — model price from the yield curve.</p>" +
            "<ul>" +
              "<li><strong>Interest rate risk</strong> — the main risk; grows with duration.</li>" +
              "<li><strong>Sovereign credit risk</strong> — spread over \"safe\" bonds (e.g. BTP vs Bund).</li>" +
              "<li><strong>FX risk</strong> — bonds in a currency other than the fund's base currency.</li>" +
              "<li><strong>Inflation risk</strong> — for fixed-coupon bonds.</li>" +
              "<li><strong>Liquidity risk</strong> — usually low for benchmarks, higher for old, small lines (off-the-run).</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Purchase (auction or secondary market), DvP settlement.</li>" +
              "<li>Coupon payments, withholding tax for foreign bonds where applicable.</li>" +
              "<li>Use in repo or securities lending (SFT) — the bond stays in the fund's portfolio.</li>" +
              "<li>Buy-backs or switch auctions — issuer events.</li>" +
              "<li>Redemption at maturity.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(a)–(d) UCITS</span></h4><p>Bonds admitted to a regulated market (or another recognised market in the prospectus) are transferable securities. Unlisted bonds — within the 10% limit (Art. 50(2)(a)), unless they qualify as money market instruments.</p></div>" +
              "<div class='rule'><h4>35% limit <span class='law'>Art. 52(3)</span></h4><p>Up to 35% of NAV in securities of one issuer where issued or guaranteed by a Member State, its local authorities, a third country or a public international body to which a Member State belongs.</p></div>" +
              "<div class='rule'><h4>Outside the 40% bucket <span class='law'>Art. 52(5), first subpara.</span></h4><p>Art. 52(3) securities do not count towards the 40% aggregate limit for positions above 5%.</p></div>" +
              "<div class='rule'><h4>Up to 100% of NAV <span class='law'>Art. 54</span></h4><p>With regulatory approval and prospectus disclosure: up to 100% of NAV in securities of one public issuer, provided there are at least 6 issues and no more than 30% of NAV in a single issue.</p></div>" +
              "<div class='rule'><h4>Acquisition limit <span class='law'>Art. 56(2)(b) and (3)</span></h4><p>The 10% limit on an issuer's debt securities does not apply to securities issued or guaranteed by Member States, their local authorities, third countries and public international bodies.</p></div>" +
              "<div class='rule'><h4>Ratings <span class='law'>Art. 51(3) UCITS (after Dir. 2013/14/EU)</span></h4><p>The management company must not solely or mechanistically rely on credit agency ratings when assessing credit risk.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Issuer, rating and duration limits — per the AIF's documents and national law.</li>" +
              "<li>Leverage: cash-paid position = market value; financing the purchase via repo increases leverage.</li>" +
              "<li>Annex IV report: sovereign debt exposures (by country and maturity).</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — transaction report by the investment firm; transparency obligations for bond trading.</li>" +
              "<li><strong>SSR</strong> — net short positions in EU sovereign debt must be notified; uncovered short sales of sovereign debt are banned.</li>" +
              "<li><strong>SFTR</strong> — when bonds are used in repo or securities lending.</li>" +
              "<li><strong>CSDR</strong> — penalties for settlement fails.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li>Line <strong>ISIN</strong> (e.g. <code>PL0000…</code>, <code>DE000…</code>); series name (e.g. DS1030).</li>" +
              "<li><strong>CFI</strong> — category <code>D</code> (Debt), group <code>B</code> (Bonds); attributes describe interest type, guarantee and redemption form.</li>" +
              "<li>Issuer <strong>LEI</strong> (e.g. the state treasury) — for limit aggregation.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Does the issuer qualify under Art. 52(3)? Correctly flagged in the system (outside the 40% bucket).</li>" +
              "<li>Under Art. 54: at least 6 issues, max 30% in one issue, provision in the prospectus.</li>" +
              "<li>Duration, rating and country limits from the prospectus.</li>" +
              "<li>Listing: regulated or recognised market? If not — 10% limit or MMI qualification.</li>" +
              "<li>Bonds lent or in repo still count towards the fund's limits.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Clean / dirty price", "Price excluding accrued interest / price including accrued interest (actually paid)."],
        ["Accrued interest", "Interest accrued since the last coupon payment."],
        ["YTM", "Yield to maturity — the discount rate that equates the value of cash flows with the price."],
        ["Modified duration", "Percentage price change for a 1 percentage point change in yield."],
        ["On-the-run / off-the-run", "The newest, most liquid line for a maturity / older lines."]
      ]
    }
  }
});

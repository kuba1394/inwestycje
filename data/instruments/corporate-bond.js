window.INSTRUMENTS.push({
  id: "corporate-bond",
  name: "Corporate Bond",
  aliases: ["Credit Bond", "Eurobond", "High Yield Bond", "Investment Grade Bond", "obligacja korporacyjna"],
  market: "otc",
  asset: { pl: "Dłużne", en: "Fixed income" },
  sources: ["ucits", "eligible", "aifmd", "csdrT1", "sftr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Obligacja korporacyjna to papier dłużny emitowany przez spółkę (przemysłową, finansową, użyteczności publicznej). Daje kupony i zwrot nominału, a jej rentowność zawiera premię za ryzyko kredytowe emitenta (spread) ponad obligacje skarbowe.",
      keyFacts: [
        ["Rynek", "Pierwotny: emisje przez konsorcjum banków (bookbuilding). Wtórny: głównie OTC (dealerzy, platformy MTF), często formalnie notowane na giełdzie (np. Luksemburg, Dublin, Catalyst)."],
        ["Kategorie", "Investment grade (rating ≥ BBB−) i high yield (poniżej BBB−); senior secured / unsecured / subordinated."],
        ["Kupon", "Stały lub zmienny; zwykle płatny rocznie (EUR) lub półrocznie (USD)."],
        ["Rozliczenie", "UE: T+2 (od 11.10.2027 T+1); euroobligacje w międzynarodowym CSD (Euroclear, Clearstream)."],
        ["Kluczowe miary", "YTM, spread (do skarbowych, do swapów, Z-spread, OAS), duration, rating."],
        ["Zapisy umowne", "Kowenanty, opcje wykupu (call), zmiana kontroli, podporządkowanie."],
        ["Kod CFI", "<code>DB****</code> (Debt – Bonds)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Corporate Bond</em> to pożyczka dla spółki w formie zbywalnego papieru. Mechanika kuponów, narosłych odsetek i ceny jest taka sama jak przy <a href='#/i/government-bond'>Government Bond</a>. Różnica polega na <strong>ryzyku kredytowym</strong>, za które inwestor dostaje dodatkową rentowność:</p>" +
            "<p class='formula'>Rentowność obligacji korporacyjnej ≈ rentowność skarbowa (lub swap) + spread kredytowy</p>" +
            "<p>Ważne cechy, które trzeba odczytać z prospektu emisyjnego:</p>" +
            "<ul>" +
              "<li><strong>seniority</strong> — kolejność zaspokojenia w upadłości (secured → senior unsecured → subordinated → hybrydy);</li>" +
              "<li><strong>emitent vs gwarant</strong> — często emituje spółka finansująca (SPV), a gwarantuje spółka matka;</li>" +
              "<li><strong>opcje</strong> — callable (emitent może wcześniej wykupić), make-whole, puttable, change-of-control;</li>" +
              "<li><strong>kowenanty</strong> — ograniczenia zadłużenia, dywidend, zbywania aktywów (szczególnie w high yield).</li>" +
            "</ul>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Emisja.</strong> Banki prowadzące budują księgę popytu, ustalają spread i alokują obligacje inwestorom. Rozliczenie emisji zwykle T+5 lub T+7.</li>" +
              "<li><strong>Obrót wtórny.</strong> Fundusz pyta kilku dealerów o cenę (RFQ na platformie lub telefonicznie). Płynność jest dużo mniejsza niż przy obligacjach skarbowych.</li>" +
              "<li><strong>Rozliczenie.</strong> DvP w CSD; płaci się cenę z narosłymi odsetkami (konwencja zwykle ACT/ACT dla EUR, 30/360 dla USD).</li>" +
              "<li><strong>W trakcie.</strong> Kupony, zmiany ratingu, raporty emitenta, ewentualne zdarzenia (call, tender offer, zmiana warunków przez zgromadzenie obligatariuszy).</li>" +
              "<li><strong>Wykup</strong> lub, przy problemach emitenta, restrukturyzacja albo niewypłacalność (odzysk zależy od seniority).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy — limity emitenta i grupy",
          html:
            "<p>Fundusz UCITS (NAV 200 mln EUR) kupuje obligację spółki A: nominał 5 mln EUR, kupon 4%, 5 lat, cena 98,50. Spółka A należy do grupy G. Fundusz ma już obligacje spółki matki G (4 mln EUR) i jej akcje (2 mln EUR).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Wartość nowej pozycji (bez odsetek)</td><td>5 000 000 × 98,50%</td><td class='num'>4 925 000 EUR</td></tr>" +
              "<tr><td>Rentowność do wykupu</td><td>stopa zrównująca przepływy z ceną 98,50</td><td class='num'>≈ 4,34%</td></tr>" +
              "<tr><td>Ekspozycja na grupę G</td><td>4,925 + 4,0 + 2,0 mln</td><td class='num'>10 925 000 EUR</td></tr>" +
              "<tr><td>Jako % NAV</td><td>10,925 / 200</td><td class='num'>5,46%</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Spółki jednej grupy traktuje się jak jednego emitenta (art. 52 ust. 5). Grupa G ma 5,46% NAV — <strong>powyżej 5%</strong>, więc pozycja wchodzi do koszyka 40% i nie może przekroczyć 10%.</li>" +
              "<li>Trzeba sprawdzić, czy suma wszystkich takich pozycji nadal mieści się w 40% NAV.</li>" +
              "<li>Limit nabycia: fundusz nie może mieć więcej niż 10% dłużnych papierów spółki A (art. 56 ust. 2 lit. b).</li>" +
              "<li>Jeśli prospekt wymaga ratingu inwestycyjnego, obniżenie ratingu do high yield oznacza pasywne naruszenie polityki do usunięcia w interesie uczestników.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> kwotowania dealerów lub serwisy cenowe (np. BVAL, CBBT, ICE). Przy braku obrotu — model ze spreadu porównywalnych emisji. Wycena obligacji mało płynnych wymaga szczególnej kontroli (price challenge).</p>" +
            "<ul>" +
              "<li><strong>Ryzyko kredytowe i spreadu</strong> — pogorszenie kondycji emitenta, niewypłacalność.</li>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — duration.</li>" +
              "<li><strong>Ryzyko płynności</strong> — kluczowe, szczególnie w high yield i w stresie rynkowym.</li>" +
              "<li><strong>Ryzyko wykupu</strong> (call) — emitent wykupi obligację, gdy spadną stopy lub spread.</li>" +
              "<li><strong>Ryzyko zdarzeń</strong> — przejęcia, LBO, restrukturyzacje, zmiany warunków.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Alokacja z emisji lub zakup wtórny, rozliczenie DvP.</li>" +
              "<li>Kupony, zmiany ratingu, raporty, zgromadzenia obligatariuszy (consent solicitation).</li>" +
              "<li>Call, tender offer, wymiana obligacji (exchange offer), niewypłacalność i restrukturyzacja (nowe instrumenty w portfelu).</li>" +
              "<li>Wykup.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. a–d; art. 50 ust. 2 lit. a</span></h4><p>Notowane obligacje — zbywalne papiery wartościowe. Nowe emisje — jeśli warunki przewidują wniosek o dopuszczenie i dopuszczenie nastąpi w ciągu roku. Obligacje nienotowane (np. private placement) — limit 10%.</p></div>" +
              "<div class='rule'><h4>Kryteria zbywalnego papieru <span class='law'>art. 2 dyr. 2007/16/WE</span></h4><p>Płynność, wiarygodna wycena, dostępna informacja. Przy obligacjach mało płynnych trzeba tę ocenę udokumentować.</p></div>" +
              "<div class='rule'><h4>5/10/40 i grupa <span class='law'>art. 52 ust. 1, 2, 5</span></h4><p>Limity liczone dla emitenta, a spółki jednej grupy kapitałowej traktuje się jak jednego emitenta. Limit łączny 20% z depozytami i ekspozycją OTC wobec tego samego podmiotu.</p></div>" +
              "<div class='rule'><h4>Limit nabycia <span class='law'>art. 56 ust. 2 lit. b</span></h4><p>Maks. 10% dłużnych papierów jednego emitenta. Limit można pominąć przy nabyciu, jeśli w tym momencie nie da się obliczyć kwoty brutto emisji.</p></div>" +
              "<div class='rule'><h4>Ratingi <span class='law'>art. 51 ust. 3 (po dyr. 2013/14/UE)</span></h4><p>Bez mechanicznego polegania na ratingach — wymagana własna ocena kredytowa. Zapisy prospektu o minimalnym ratingu trzeba jednak monitorować.</p></div>" +
              "<div class='rule'><h4>Wbudowane derywaty <span class='law'>art. 51 ust. 3 akapit 4</span></h4><p>Obligacje zamienne, CLN, obligacje strukturyzowane — wbudowany derywat liczy się do ekspozycji całkowitej. Zwykła opcja call emitenta zwykle nie jest traktowana jako wbudowany derywat wymagający konwersji.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Limity emitenta, ratingu, sektora — według dokumentów AIF.</li>" +
              "<li>Płynność <span class='law'>art. 16 AIFMD</span> — dopasowanie profilu płynności portfela (szczególnie high yield) do polityki umorzeń.</li>" +
              "<li>Wycena <span class='law'>art. 19 AIFMD</span> — procedura dla instrumentów mało płynnych.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — raporty transakcyjne po stronie firmy inwestycyjnej; obowiązki przejrzystości przed- i potransakcyjnej.</li>" +
              "<li><strong>SFTR</strong> — przy użyciu obligacji w repo lub pożyczkach papierów.</li>" +
              "<li><strong>CSDR</strong> — kary za nieudane rozrachunki (częste przy mało płynnych obligacjach).</li>" +
              "<li>Brak raportowania EMIR.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> (euroobligacje często z prefiksem <code>XS</code>), w USA także CUSIP.</li>" +
              "<li><strong>LEI emitenta, gwaranta i jednostki dominującej</strong> — kluczowe do poprawnej agregacji limitów grupy.</li>" +
              "<li><strong>CFI</strong> — <code>D</code> (Debt), grupa <code>B</code> (Bonds); atrybuty opisują oprocentowanie, gwarancję i seniority.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Notowanie lub plan dopuszczenia w ciągu roku; inaczej limit 10%.</li>" +
              "<li>Mapowanie emitenta do grupy (LEI jednostki dominującej) — limit 5/10/40 i 20% na grupę.</li>" +
              "<li>Limit 10% emisji (art. 56).</li>" +
              "<li>Rating i inne wymogi prospektu (np. maks. udział high yield).</li>" +
              "<li>Wbudowane derywaty (zamienne, CLN) w ekspozycji całkowitej.</li>" +
              "<li>Zdarzenia kredytowe i restrukturyzacje — nowe instrumenty w portfelu.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Credit spread", "Premia ponad rentowność skarbową lub swapową za ryzyko kredytowe emitenta."],
        ["Investment grade / High yield", "Rating BBB− i wyżej / poniżej BBB−."],
        ["Seniority", "Kolejność zaspokojenia wierzycieli w upadłości."],
        ["Covenant", "Zobowiązanie emitenta zapisane w warunkach emisji (np. limit zadłużenia)."],
        ["Make-whole call", "Wykup przed terminem po cenie wyliczonej tak, by obligatariusz nie stracił (dyskonto przy niskim spreadzie)."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A corporate bond is a debt security issued by a company (industrial, financial, utility). It pays coupons and repays the nominal, and its yield includes a premium for the issuer's credit risk (spread) over government bonds.",
      keyFacts: [
        ["Market", "Primary: issued through a bank syndicate (bookbuilding). Secondary: mainly OTC (dealers, MTF platforms), often formally listed on an exchange (e.g. Luxembourg, Dublin, Catalyst)."],
        ["Categories", "Investment grade (rating ≥ BBB−) and high yield (below BBB−); senior secured / unsecured / subordinated."],
        ["Coupon", "Fixed or floating; usually paid annually (EUR) or semi-annually (USD)."],
        ["Settlement", "EU: T+2 (T+1 from 11 Oct 2027); Eurobonds in an international CSD (Euroclear, Clearstream)."],
        ["Key measures", "YTM, spread (to government bonds, to swaps, Z-spread, OAS), duration, rating."],
        ["Contractual terms", "Covenants, call options, change of control, subordination."],
        ["CFI code", "<code>DB****</code> (Debt – Bonds)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Corporate Bond is a loan to a company in the form of a transferable security. Coupons, accrued interest and pricing work as for a <a href='#/i/government-bond'>Government Bond</a>. The difference is <strong>credit risk</strong>, for which the investor earns extra yield:</p>" +
            "<p class='formula'>Corporate bond yield ≈ government (or swap) yield + credit spread</p>" +
            "<p>Key features to read from the offering document:</p>" +
            "<ul>" +
              "<li><strong>seniority</strong> — ranking in insolvency (secured → senior unsecured → subordinated → hybrids);</li>" +
              "<li><strong>issuer vs guarantor</strong> — often a financing vehicle (SPV) issues and the parent guarantees;</li>" +
              "<li><strong>options</strong> — callable (issuer may redeem early), make-whole, puttable, change-of-control;</li>" +
              "<li><strong>covenants</strong> — limits on debt, dividends, asset disposals (especially in high yield).</li>" +
            "</ul>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Issuance.</strong> Lead banks build a book of demand, set the spread and allocate bonds to investors. New issue settlement is usually T+5 or T+7.</li>" +
              "<li><strong>Secondary trading.</strong> The fund asks several dealers for a price (RFQ on a platform or by phone). Liquidity is much lower than for government bonds.</li>" +
              "<li><strong>Settlement.</strong> DvP at the CSD; the price paid includes accrued interest (usually ACT/ACT for EUR, 30/360 for USD).</li>" +
              "<li><strong>During the life.</strong> Coupons, rating changes, issuer reports, events (call, tender offer, changes of terms by bondholder meetings).</li>" +
              "<li><strong>Redemption</strong> or, if the issuer is in trouble, restructuring or default (recovery depends on seniority).</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example — issuer and group limits",
          html:
            "<p>A UCITS fund (NAV EUR 200m) buys a bond of company A: EUR 5m nominal, 4% coupon, 5 years, price 98.50. Company A belongs to group G. The fund already holds bonds of G's parent company (EUR 4m) and its shares (EUR 2m).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>New position value (excl. accrued)</td><td>5,000,000 × 98.50%</td><td class='num'>EUR 4,925,000</td></tr>" +
              "<tr><td>Yield to maturity</td><td>rate equating cash flows with a 98.50 price</td><td class='num'>≈ 4.34%</td></tr>" +
              "<tr><td>Exposure to group G</td><td>4.925 + 4.0 + 2.0m</td><td class='num'>EUR 10,925,000</td></tr>" +
              "<tr><td>As % of NAV</td><td>10.925 / 200</td><td class='num'>5.46%</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>Companies in one group are treated as a single issuer (Art. 52(5)). Group G is 5.46% of NAV — <strong>above 5%</strong>, so the position enters the 40% bucket and may not exceed 10%.</li>" +
              "<li>Check that all such positions together still fit within 40% of NAV.</li>" +
              "<li>Acquisition limit: the fund may hold no more than 10% of company A's debt securities (Art. 56(2)(b)).</li>" +
              "<li>If the prospectus requires investment grade, a downgrade to high yield is a passive policy breach to be remedied in unitholders' interests.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> dealer quotes or pricing services (e.g. BVAL, CBBT, ICE). When untraded — model from comparable issues' spreads. Valuing illiquid bonds needs extra control (price challenge).</p>" +
            "<ul>" +
              "<li><strong>Credit and spread risk</strong> — issuer deterioration, default.</li>" +
              "<li><strong>Interest rate risk</strong> — duration.</li>" +
              "<li><strong>Liquidity risk</strong> — key, especially in high yield and under market stress.</li>" +
              "<li><strong>Call risk</strong> — the issuer redeems when rates or spreads fall.</li>" +
              "<li><strong>Event risk</strong> — takeovers, LBOs, restructurings, changes of terms.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>New issue allocation or secondary purchase, DvP settlement.</li>" +
              "<li>Coupons, rating changes, reports, bondholder meetings (consent solicitation).</li>" +
              "<li>Call, tender offer, exchange offer, default and restructuring (new instruments in the portfolio).</li>" +
              "<li>Redemption.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(a)–(d); Art. 50(2)(a)</span></h4><p>Listed bonds — transferable securities. New issues — if the terms include an undertaking to apply for admission and admission is obtained within a year. Unlisted bonds (e.g. private placements) — 10% limit.</p></div>" +
              "<div class='rule'><h4>Transferable security criteria <span class='law'>Art. 2 Dir. 2007/16/EC</span></h4><p>Liquidity, reliable valuation, information available. For illiquid bonds this assessment must be documented.</p></div>" +
              "<div class='rule'><h4>5/10/40 and group <span class='law'>Art. 52(1), (2), (5)</span></h4><p>Limits are computed per issuer, and companies in the same group are treated as a single issuer. 20% combined limit with deposits and OTC exposure to the same body.</p></div>" +
              "<div class='rule'><h4>Acquisition limit <span class='law'>Art. 56(2)(b)</span></h4><p>Max 10% of an issuer's debt securities. The limit may be disregarded at acquisition if the gross amount of the issue cannot be calculated at that time.</p></div>" +
              "<div class='rule'><h4>Ratings <span class='law'>Art. 51(3) (after Dir. 2013/14/EU)</span></h4><p>No mechanistic reliance on ratings — own credit assessment required. Prospectus minimum-rating provisions still have to be monitored.</p></div>" +
              "<div class='rule'><h4>Embedded derivatives <span class='law'>Art. 51(3), fourth subpara.</span></h4><p>Convertibles, CLNs, structured notes — the embedded derivative counts towards global exposure. A plain issuer call is usually not treated as an embedded derivative requiring conversion.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Issuer, rating and sector limits — per the AIF's documents.</li>" +
              "<li>Liquidity <span class='law'>Art. 16 AIFMD</span> — matching the portfolio's liquidity profile (especially high yield) to the redemption policy.</li>" +
              "<li>Valuation <span class='law'>Art. 19 AIFMD</span> — procedure for illiquid instruments.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — transaction reports by the investment firm; pre- and post-trade transparency obligations.</li>" +
              "<li><strong>SFTR</strong> — when bonds are used in repo or securities lending.</li>" +
              "<li><strong>CSDR</strong> — penalties for settlement fails (common for illiquid bonds).</li>" +
              "<li>No EMIR reporting.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> (Eurobonds often with an <code>XS</code> prefix), in the US also CUSIP.</li>" +
              "<li><strong>Issuer, guarantor and parent LEI</strong> — key for correct group limit aggregation.</li>" +
              "<li><strong>CFI</strong> — <code>D</code> (Debt), group <code>B</code> (Bonds); attributes describe interest type, guarantee and seniority.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Listed, or admission planned within a year; otherwise the 10% limit.</li>" +
              "<li>Issuer mapped to its group (parent LEI) — 5/10/40 and 20% per group.</li>" +
              "<li>10% of issue limit (Art. 56).</li>" +
              "<li>Rating and other prospectus requirements (e.g. maximum high yield share).</li>" +
              "<li>Embedded derivatives (convertibles, CLNs) in global exposure.</li>" +
              "<li>Credit events and restructurings — new instruments in the portfolio.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Credit spread", "Premium over government or swap yield for the issuer's credit risk."],
        ["Investment grade / High yield", "Rating BBB− and above / below BBB−."],
        ["Seniority", "Ranking of creditors in insolvency."],
        ["Covenant", "Issuer undertaking in the bond terms (e.g. a debt limit)."],
        ["Make-whole call", "Early redemption at a price calculated so the bondholder loses nothing (discounting at a low spread)."]
      ]
    }
  }
});

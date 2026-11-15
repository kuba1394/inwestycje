window.INSTRUMENTS.push({
  id: "covered-bond",
  name: "Covered Bond",
  aliases: ["Pfandbrief", "European Covered Bond", "Mortgage Covered Bond", "list zastawny"],
  market: "otc",
  asset: { pl: "Dłużne", en: "Fixed income" },
  sources: ["ucits", "eligible", "cbd", "aifmd", "csdrT1", "sftr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Covered Bond to obligacja banku zabezpieczona wydzieloną pulą aktywów wysokiej jakości (najczęściej kredytów hipotecznych lub należności od sektora publicznego). Inwestor ma podwójne zabezpieczenie: roszczenie wobec banku i pierwszeństwo do puli. Dlatego rentowność jest zbliżona do obligacji skarbowych, a UCITS stosuje do niej wyższe limity.",
      keyFacts: [
        ["Emitent", "Instytucja kredytowa (w Polsce — banki hipoteczne emitujące listy zastawne)."],
        ["Zabezpieczenie", "Pula pokrycia (cover pool): kredyty hipoteczne, należności od sektora publicznego, aktywa płynne; nadzabezpieczenie."],
        ["Ramy prawne UE", "Dyrektywa (UE) 2019/2162 — oznaczenia „European Covered Bond” i „European Covered Bond (Premium)”, stosowana od 8.07.2022."],
        ["Rynek", "Pierwotny: emisje benchmarkowe (zwykle ≥ 500 mln EUR) przez konsorcjum. Wtórny: OTC i platformy; zwykle notowane."],
        ["Struktura wykupu", "Hard bullet albo soft bullet / conditional pass-through (możliwe przedłużenie terminu)."],
        ["Rozliczenie", "UE: T+2 (od 11.10.2027 T+1)."],
        ["Kod CFI", "<code>DB****</code> (Debt – Bonds), zabezpieczone"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Covered Bond</em> łączy cechy obligacji banku i papieru zabezpieczonego aktywami, ale nie jest sekurytyzacją: aktywa zostają w bilansie banku, a bank odpowiada całym majątkiem.</p>" +
            "<ul>" +
              "<li><strong>Podwójne roszczenie (dual recourse)</strong> — najpierw wobec emitenta, a w razie jego upadłości — pierwszeństwo do puli pokrycia, odseparowanej od masy upadłościowej.</li>" +
              "<li><strong>Nadzabezpieczenie</strong> — wartość puli przewyższa wartość wyemitowanych obligacji (dla oznaczenia Premium co do zasady min. 5% według CRR).</li>" +
              "<li><strong>Nadzór szczególny</strong> — organ nadzoru i monitor puli pokrycia (cover pool monitor) kontrolują pulę i emisje.</li>" +
              "<li><strong>Bufor płynności</strong> — pula musi pokrywać odpływy netto na 180 dni.</li>" +
            "</ul>" +
            "<p>Przykłady: niemieckie Pfandbriefe, francuskie obligations foncières, polskie listy zastawne (hipoteczne i publiczne) emitowane przez banki hipoteczne.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Tworzenie puli.</strong> Bank udziela kredytów hipotecznych spełniających kryteria (np. LTV do 80% dla mieszkaniowych) i wpisuje je do rejestru zabezpieczeń.</li>" +
              "<li><strong>Emisja.</strong> Bank emituje covered bonds w ramach programu; rating zwykle wyższy niż samego banku (często AAA lub AA).</li>" +
              "<li><strong>Obsługa.</strong> Bank płaci kupony ze swoich ogólnych przepływów. Spłaty kredytów z puli nie są „przekazywane” inwestorom (w przeciwieństwie do MBS).</li>" +
              "<li><strong>Monitoring.</strong> Bank uzupełnia pulę, gdy kredyty są spłacane lub tracą jakość, utrzymując nadzabezpieczenie.</li>" +
              "<li><strong>Upadłość emitenta.</strong> Pula przechodzi pod zarząd specjalnego administratora i obsługuje covered bonds do wykupu. Przy strukturze soft bullet termin może zostać przedłużony (zwykle o 12 miesięcy), żeby nie sprzedawać puli w pośpiechu.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy — limity UCITS",
          html:
            "<p>Fundusz obligacji UCITS (NAV 200 mln EUR) ma covered bonds banku H o wartości 30 mln EUR i obligacje senior unsecured tego samego banku za 3 mln EUR.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Test</th><th>Obliczenie</th><th class='num'>Wynik</th><th>Limit</th></tr></thead><tbody>" +
              "<tr><td>Covered bonds banku H</td><td>30 / 200</td><td class='num'>15,0%</td><td>≤ 25% (art. 52 ust. 4)</td></tr>" +
              "<tr><td>Obligacje senior banku H</td><td>3 / 200</td><td class='num'>1,5%</td><td>5/10/40 (art. 52 ust. 1–2)</td></tr>" +
              "<tr><td>Łącznie bank H</td><td>(30 + 3) / 200</td><td class='num'>16,5%</td><td>≤ 35% (art. 52 ust. 5)</td></tr>" +
              "<tr><td>Wszystkie covered bonds emitentów z udziałem > 5%</td><td>suma w portfelu</td><td class='num'>?</td><td>≤ 80% NAV</td></tr>" +
            "</tbody></table></div>" +
            "<p>Covered bonds banku H nie wchodzą do koszyka 40% (art. 52 ust. 5). Obligacja senior tego banku jest jednak zwykłą obligacją bankową i podlega standardowym limitom. Dlatego w systemie limitów te dwa instrumenty jednego emitenta muszą mieć <strong>różne oznaczenia</strong>.</p>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> jak obligacje — kwotowania dealerów, serwisy cenowe; spread zwykle do swapów (mid-swaps).</p>" +
            "<ul>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — główne ryzyko przy niskim spreadzie kredytowym.</li>" +
              "<li><strong>Ryzyko kredytowe emitenta i jakości puli</strong> — np. spadek cen nieruchomości.</li>" +
              "<li><strong>Ryzyko przedłużenia terminu</strong> (soft bullet) przy upadłości emitenta.</li>" +
              "<li><strong>Ryzyko prawne</strong> — skuteczność separacji puli zależy od prawa krajowego.</li>" +
              "<li><strong>Ryzyko płynności</strong> — niskie dla emisji benchmarkowych, wyższe dla mniejszych.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zakup z emisji lub na rynku wtórnym, rozliczenie DvP.</li>" +
              "<li>Kupony, raporty o puli (transparency template, zwykle kwartalne).</li>" +
              "<li>Zmiany ratingu, zmiany struktury programu, ewentualne przedłużenie terminu.</li>" +
              "<li>Wykup.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Limit 25% <span class='law'>art. 52 ust. 4 UCITS</span></h4><p>Do 25% NAV w obligacjach zabezpieczonych jednego emitenta, jeśli są to obligacje zdefiniowane w dyrektywie 2019/2162 albo obligacje wyemitowane przed 8.07.2022 przez instytucję kredytową z siedzibą w państwie członkowskim, objętą szczególnym nadzorem publicznym chroniącym posiadaczy.</p></div>" +
              "<div class='rule'><h4>Limit 80% <span class='law'>art. 52 ust. 4 akapit 2</span></h4><p>Jeśli fundusz ma więcej niż 5% NAV w takich obligacjach jednego emitenta, łączna wartość tych pozycji nie może przekroczyć 80% NAV.</p></div>" +
              "<div class='rule'><h4>Poza koszykiem 40%, limit 35% na podmiot <span class='law'>art. 52 ust. 5</span></h4><p>Pozycje z art. 52 ust. 4 nie liczą się do koszyka 40%. Łącznie papiery, depozyty i derywaty z jednym podmiotem nie mogą przekroczyć 35% NAV.</p></div>" +
              "<div class='rule'><h4>Limit nabycia <span class='law'>art. 56 ust. 2 lit. b</span></h4><p>Maks. 10% dłużnych papierów jednego emitenta (ten limit dotyczy też covered bonds).</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Limity emitenta i klas aktywów — według dokumentów AIF.</li>" +
              "<li>Dźwignia: pozycja opłacona gotówką = wartość rynkowa.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — raporty transakcyjne po stronie firmy inwestycyjnej.</li>" +
              "<li><strong>SFTR</strong> — przy użyciu w repo (covered bonds to popularne zabezpieczenie).</li>" +
              "<li>Brak raportowania EMIR.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong>, <strong>LEI emitenta</strong> (wspólny z innymi papierami banku — stąd potrzeba osobnego oznaczenia typu instrumentu).</li>" +
              "<li><strong>CFI</strong> — <code>D</code> (Debt), grupa <code>B</code> (Bonds), atrybut gwarancji: zabezpieczone (secured).</li>" +
              "<li>Oznaczenie „European Covered Bond (Premium)” w dokumentacji emisji.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Czy papier spełnia definicję z dyr. 2019/2162 (lub przepisy przejściowe)? Dopiero wtedy limit 25%.</li>" +
              "<li>Oznaczenie w systemie odróżniające covered bond od innych obligacji tego samego banku.</li>" +
              "<li>Limit 80% dla emitentów z udziałem > 5%.</li>" +
              "<li>Limit 35% łącznie na podmiot (z depozytami i derywatami).</li>" +
              "<li>Limit 10% emisji.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Cover pool", "Pula aktywów zabezpieczających covered bonds."],
        ["Dual recourse", "Podwójne roszczenie: wobec emitenta i wobec puli pokrycia."],
        ["Overcollateralisation", "Nadwyżka wartości puli ponad wartość wyemitowanych obligacji."],
        ["Hard / soft bullet", "Sztywny termin wykupu / możliwość przedłużenia terminu w określonych warunkach."],
        ["List zastawny", "Polski covered bond emitowany przez bank hipoteczny."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A covered bond is a bank bond secured on a segregated pool of high-quality assets (most often mortgage loans or public sector claims). The investor has double protection: a claim on the bank and priority over the pool. That is why yields are close to government bonds and UCITS applies higher limits to them.",
      keyFacts: [
        ["Issuer", "Credit institution (in Poland — mortgage banks issuing listy zastawne)."],
        ["Collateral", "Cover pool: mortgage loans, public sector claims, liquid assets; overcollateralisation."],
        ["EU legal framework", "Directive (EU) 2019/2162 — \"European Covered Bond\" and \"European Covered Bond (Premium)\" labels, applicable since 8 July 2022."],
        ["Market", "Primary: benchmark issues (usually ≥ EUR 500m) via a syndicate. Secondary: OTC and platforms; usually listed."],
        ["Maturity structure", "Hard bullet or soft bullet / conditional pass-through (maturity extension possible)."],
        ["Settlement", "EU: T+2 (T+1 from 11 Oct 2027)."],
        ["CFI code", "<code>DB****</code> (Debt – Bonds), secured"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Covered Bond combines features of a bank bond and an asset-backed security, but it is not a securitisation: the assets stay on the bank's balance sheet, and the bank is liable with all its assets.</p>" +
            "<ul>" +
              "<li><strong>Dual recourse</strong> — first against the issuer, and if it fails, priority over the cover pool, which is ring-fenced from the insolvency estate.</li>" +
              "<li><strong>Overcollateralisation</strong> — the pool is worth more than the bonds issued (for the Premium label, as a rule at least 5% under the CRR).</li>" +
              "<li><strong>Special supervision</strong> — the regulator and a cover pool monitor oversee the pool and issuance.</li>" +
              "<li><strong>Liquidity buffer</strong> — the pool must cover net outflows for 180 days.</li>" +
            "</ul>" +
            "<p>Examples: German Pfandbriefe, French obligations foncières, Polish listy zastawne (mortgage and public) issued by mortgage banks.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Building the pool.</strong> The bank grants mortgage loans that meet the criteria (e.g. LTV up to 80% for residential) and enters them in the cover register.</li>" +
              "<li><strong>Issuance.</strong> The bank issues covered bonds under a programme; the rating is usually higher than the bank's own (often AAA or AA).</li>" +
              "<li><strong>Servicing.</strong> The bank pays coupons from its general cash flows. Repayments on pool loans are not \"passed through\" to investors (unlike MBS).</li>" +
              "<li><strong>Monitoring.</strong> The bank tops up the pool as loans are repaid or lose quality, keeping the overcollateralisation.</li>" +
              "<li><strong>Issuer insolvency.</strong> The pool passes to a special administrator and services the covered bonds to maturity. Under a soft bullet structure maturity may be extended (usually by 12 months) to avoid a fire sale of the pool.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example — UCITS limits",
          html:
            "<p>A UCITS bond fund (NAV EUR 200m) holds EUR 30m of bank H covered bonds and EUR 3m of the same bank's senior unsecured bonds.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Test</th><th>Calculation</th><th class='num'>Result</th><th>Limit</th></tr></thead><tbody>" +
              "<tr><td>Bank H covered bonds</td><td>30 / 200</td><td class='num'>15.0%</td><td>≤ 25% (Art. 52(4))</td></tr>" +
              "<tr><td>Bank H senior bonds</td><td>3 / 200</td><td class='num'>1.5%</td><td>5/10/40 (Art. 52(1)–(2))</td></tr>" +
              "<tr><td>Bank H in total</td><td>(30 + 3) / 200</td><td class='num'>16.5%</td><td>≤ 35% (Art. 52(5))</td></tr>" +
              "<tr><td>All covered bonds of issuers above 5%</td><td>portfolio sum</td><td class='num'>?</td><td>≤ 80% of NAV</td></tr>" +
            "</tbody></table></div>" +
            "<p>Bank H's covered bonds do not enter the 40% bucket (Art. 52(5)). The same bank's senior bond, however, is an ordinary bank bond subject to the standard limits. That is why, in the limit system, these two instruments of one issuer must carry <strong>different flags</strong>.</p>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> as for bonds — dealer quotes, pricing services; spread usually quoted to mid-swaps.</p>" +
            "<ul>" +
              "<li><strong>Interest rate risk</strong> — the main risk given the low credit spread.</li>" +
              "<li><strong>Issuer and pool quality credit risk</strong> — e.g. falling house prices.</li>" +
              "<li><strong>Extension risk</strong> (soft bullet) if the issuer fails.</li>" +
              "<li><strong>Legal risk</strong> — effective pool segregation depends on national law.</li>" +
              "<li><strong>Liquidity risk</strong> — low for benchmark issues, higher for smaller ones.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Purchase at issue or in the secondary market, DvP settlement.</li>" +
              "<li>Coupons, pool reports (transparency template, usually quarterly).</li>" +
              "<li>Rating changes, programme changes, possible maturity extension.</li>" +
              "<li>Redemption.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>25% limit <span class='law'>Art. 52(4) UCITS</span></h4><p>Up to 25% of NAV in covered bonds of one issuer, where they are covered bonds as defined in Directive 2019/2162, or bonds issued before 8 July 2022 by a credit institution with its registered office in a Member State and subject by law to special public supervision designed to protect bondholders.</p></div>" +
              "<div class='rule'><h4>80% limit <span class='law'>Art. 52(4), second subpara.</span></h4><p>Where the fund holds more than 5% of NAV in such bonds of one issuer, the total value of these holdings must not exceed 80% of NAV.</p></div>" +
              "<div class='rule'><h4>Outside the 40% bucket, 35% per body <span class='law'>Art. 52(5)</span></h4><p>Art. 52(4) holdings do not count towards the 40% bucket. Securities, deposits and derivatives with one body together must not exceed 35% of NAV.</p></div>" +
              "<div class='rule'><h4>Acquisition limit <span class='law'>Art. 56(2)(b)</span></h4><p>Max 10% of an issuer's debt securities (this also applies to covered bonds).</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Issuer and asset class limits — per the AIF's documents.</li>" +
              "<li>Leverage: cash-paid position = market value.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — transaction reports by the investment firm.</li>" +
              "<li><strong>SFTR</strong> — when used in repo (covered bonds are popular collateral).</li>" +
              "<li>No EMIR reporting.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong>, <strong>issuer LEI</strong> (shared with the bank's other securities — hence the need for a separate instrument-type flag).</li>" +
              "<li><strong>CFI</strong> — <code>D</code> (Debt), group <code>B</code> (Bonds), guarantee attribute: secured.</li>" +
              "<li>\"European Covered Bond (Premium)\" label in the issue documentation.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Does the bond meet the Directive 2019/2162 definition (or the transitional rules)? Only then the 25% limit applies.</li>" +
              "<li>System flag distinguishing a covered bond from the same bank's other bonds.</li>" +
              "<li>80% limit for issuers above 5%.</li>" +
              "<li>35% overall limit per body (including deposits and derivatives).</li>" +
              "<li>10% of issue limit.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Cover pool", "Pool of assets securing the covered bonds."],
        ["Dual recourse", "Double claim: on the issuer and on the cover pool."],
        ["Overcollateralisation", "Excess of pool value over the bonds issued."],
        ["Hard / soft bullet", "Fixed maturity / maturity extension possible under defined conditions."],
        ["List zastawny", "Polish covered bond issued by a mortgage bank."]
      ]
    }
  }
});

window.INSTRUMENTS.push({
  id: "preferred-stock",
  name: "Preferred Stock",
  aliases: ["Preference Share", "Preferred Share", "akcja uprzywilejowana"],
  market: "exchange",
  asset: { pl: "Akcje (hybrydowe)", en: "Equity (hybrid)" },
  sources: ["ucits", "eligible", "aifmd", "csdrT1", "td"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Akcja uprzywilejowana (Preferred Stock) to akcja z pierwszeństwem przed akcjami zwykłymi do dywidendy, zwykle o stałej wysokości, oraz do majątku przy likwidacji. Najczęściej nie daje prawa głosu. Zachowuje się jak coś pomiędzy akcją a obligacją wieczystą.",
      keyFacts: [
        ["Rynek", "Giełda (np. NYSE — typowo nominał 25 USD), także obrót OTC."],
        ["Dywidenda", "Zwykle stała (% nominału), płatna kwartalnie; cumulative lub non-cumulative."],
        ["Pierwszeństwo", "Przed akcjami zwykłymi, za wszystkimi wierzycielami (w tym obligacjami podporządkowanymi)."],
        ["Prawo głosu", "Zwykle brak (czasem pojawia się, gdy dywidendy nie są wypłacane)."],
        ["Termin", "Często wieczysta, z opcją wykupu przez emitenta (callable) po kilku latach."],
        ["Rozliczenie", "Jak akcje: T+2 w UE (T+1 od 11.10.2027), T+1 w USA."],
        ["Kod CFI", "<code>EP****</code> (Equities – Preferred shares)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Preferred Stock</em> to klasa akcji z <strong>preferencją</strong> wobec akcji zwykłych:</p>" +
            "<ul>" +
              "<li><strong>dywidenda</strong> — wypłacana przed jakąkolwiek dywidendą dla akcji zwykłych, zwykle w stałej wysokości (np. 6% nominału rocznie);</li>" +
              "<li><strong>likwidacja</strong> — zwrot nominału przed akcjonariuszami zwykłymi, ale po wierzycielach.</li>" +
            "</ul>" +
            "<p>Główne odmiany:</p>" +
            "<ul>" +
              "<li><strong>cumulative</strong> — niewypłacone dywidendy kumulują się i muszą zostać wypłacone, zanim akcjonariusze zwykli cokolwiek dostaną;</li>" +
              "<li><strong>non-cumulative</strong> — pominięta dywidenda przepada (typowe dla banków, bo tylko takie akcje liczą się do kapitału Tier 1);</li>" +
              "<li><strong>convertible</strong> — z prawem zamiany na akcje zwykłe;</li>" +
              "<li><strong>callable</strong> — emitent może je wykupić po nominale od określonej daty.</li>" +
            "</ul>" +
            "<div class='callout'><strong>Polski kontekst</strong>W KSH „akcje uprzywilejowane” to szersze pojęcie. Przywilej może dotyczyć głosu (w spółce publicznej akcje uprzywilejowane co do głosu są dopuszczalne tylko w ograniczonym zakresie), dywidendy (najwyżej o połowę wyższej niż na akcje zwykłe) albo podziału majątku. Akcje uprzywilejowane co do dywidendy mogą być pozbawione prawa głosu (akcje nieme). Amerykański Preferred Stock odpowiada najbliżej akcjom uprzywilejowanym co do dywidendy bez prawa głosu.</div>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Emisja.</strong> Spółka (często bank, ubezpieczyciel, REIT lub spółka użyteczności publicznej) emituje akcje o nominale (np. 25 USD) z określoną stopą dywidendy.</li>" +
              "<li><strong>Obrót.</strong> Na giełdzie jak akcje. Cena zachowuje się podobnie do obligacji długoterminowej — zależy głównie od stóp procentowych i ryzyka kredytowego emitenta.</li>" +
              "<li><strong>Dywidendy.</strong> Zarząd deklaruje dywidendę (zwykle kwartalnie). Mimo stałej stopy wypłata nie jest prawnym obowiązkiem jak kupon obligacji — jej pominięcie nie oznacza niewypłacalności.</li>" +
              "<li><strong>Wykup.</strong> Po dacie call emitent może wykupić akcje po nominale (zwykle robi to, gdy stopy spadną i może się refinansować taniej).</li>" +
            "</ol>" +
            "<p class='formula'>Bieżąca stopa dywidendy = roczna dywidenda / cena rynkowa</p>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz (NAV równowartość 150 mln USD) kupuje 200 000 akcji uprzywilejowanych banku Z, non-cumulative, nominał 25 USD, dywidenda 6%, callable po nominale za 5 lat. Cena rynkowa 24,00 USD.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Wartość transakcji</td><td>200 000 × 24,00</td><td class='num'>4 800 000 USD (3,2% NAV)</td></tr>" +
              "<tr><td>Dywidenda roczna na akcję</td><td>25 × 6%</td><td class='num'>1,50 USD</td></tr>" +
              "<tr><td>Dywidenda kwartalna dla funduszu</td><td>200 000 × 1,50 / 4</td><td class='num'>75 000 USD</td></tr>" +
              "<tr><td>Bieżąca stopa dywidendy</td><td>1,50 / 24,00</td><td class='num'>6,25%</td></tr>" +
              "<tr><td>Rynek żąda 7,0% → cena (przybliżenie dla papieru wieczystego)</td><td>1,50 / 0,07</td><td class='num'>≈ 21,43 USD (−10,7%)</td></tr>" +
            "</tbody></table></div>" +
            "<p>Jeśli bank pominie dywidendę za kwartał, fundusz jej nie odzyska (non-cumulative), a cena zwykle mocno spadnie.</p>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Pozycja wlicza się do limitów emitenta <strong>razem</strong> z akcjami zwykłymi i obligacjami banku Z (5/10/40, a także limit łączny 20% z depozytami i derywatami OTC z bankiem Z).</li>" +
              "<li>Jeśli akcje są bez prawa głosu — limit nabycia <strong>10% akcji bez prawa głosu</strong> emitenta (art. 56 ust. 2 lit. a).</li>" +
              "<li>Klasyfikacja w systemie: akcja czy instrument dłużny? Wpływa na limity z prospektu (np. „min. 80% w akcjach”) — musi być spójna z polityką funduszu.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> kurs zamknięcia z giełdy; przy słabej płynności — wartość godziwa na podstawie spreadów porównywalnych instrumentów.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — wieczysty charakter daje dużą wrażliwość na stopy.</li>" +
              "<li><strong>Ryzyko kredytowe i podporządkowanie</strong> — w upadłości preferred są niemal na końcu kolejki.</li>" +
              "<li><strong>Ryzyko pominięcia dywidendy</strong>, szczególnie przy non-cumulative.</li>" +
              "<li><strong>Ryzyko wykupu</strong> (call) — cena rzadko rośnie znacząco powyżej ceny wykupu.</li>" +
              "<li><strong>Ryzyko płynności</strong> — mniejsze emisje mają szerokie spready.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html:
            "<ol>" +
              "<li>Zakup na giełdzie, rozliczenie DvP.</li>" +
              "<li>Deklaracja i wypłata dywidend (ex-date, record date jak przy akcjach zwykłych).</li>" +
              "<li>Zdarzenia: pominięcie dywidendy, zmiana warunków, konwersja (convertible), wykup (call), wezwanie.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. a–d UCITS; art. 2 dyr. 2007/16/WE</span></h4><p>Notowane akcje uprzywilejowane to zbywalne papiery wartościowe. Wersja convertible może zawierać wbudowany derywat (art. 10 dyr. 2007/16/WE).</p></div>" +
              "<div class='rule'><h4>Limity emitenta <span class='law'>art. 52</span></h4><p>Sumowane z wszystkimi papierami tego samego emitenta i grupy: 5/10/40, 20% łącznie z depozytami i ekspozycją OTC.</p></div>" +
              "<div class='rule'><h4>Limity nabycia <span class='law'>art. 56</span></h4><p>Maks. 10% akcji bez prawa głosu jednego emitenta (na poziomie UCITS). Gdy akcje mają prawo głosu — limit znaczącego wpływu na poziomie spółki zarządzającej.</p></div>" +
              "<div class='rule'><h4>Convertible preferred <span class='law'>CESR/10-788</span></h4><p>Wbudowane prawo konwersji liczy się do ekspozycji całkowitej: liczba akcji zwykłych z konwersji × cena akcji × delta.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Limity emitenta i klas aktywów — według dokumentów AIF; spójna klasyfikacja (akcje vs dług).</li>" +
              "<li>Dźwignia: pozycja opłacona gotówką = wartość rynkowa; convertible — konwersja w ekwiwalencie delta.</li>" +
              "<li>Spółki nienotowane: progi kontroli z art. 26–30 AIFMD liczy się od praw głosu — akcje bez głosu ich nie zwiększają.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html:
            "<ul>" +
              "<li><strong>Znaczne pakiety</strong> <span class='law'>dyr. 2004/109/WE</span> — progi liczy się od praw głosu. Akcje bez prawa głosu zwykle nie wchodzą do progów (chyba że głos się aktywuje albo akcje są zamienne na akcje z głosem).</li>" +
              "<li><strong>MiFIR</strong> — raporty transakcyjne po stronie firmy inwestycyjnej.</li>" +
              "<li>Brak raportowania EMIR.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> (inny niż akcji zwykłych), w USA także CUSIP; ticker zwykle z oznaczeniem serii (np. „-PA”, „.PRA” — zależnie od dostawcy danych).</li>" +
              "<li><strong>CFI</strong> — <code>E</code> (Equities), grupa <code>P</code> (Preferred shares); convertible preferred — grupa <code>F</code>.</li>" +
              "<li><strong>LEI emitenta</strong> — wspólny z akcjami zwykłymi i obligacjami, do agregacji limitów.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Klasyfikacja instrumentu (equity / hybrid) zgodna z polityką i limitami prospektu.</li>" +
              "<li>Agregacja z innymi papierami emitenta i grupy (5/10/40, 20%).</li>" +
              "<li>Limit 10% akcji bez prawa głosu emitenta.</li>" +
              "<li>Convertible: wbudowany derywat w ekspozycji całkowitej.</li>" +
              "<li>Monitoring zdarzeń: pominięcie dywidendy, call, konwersja.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Par value (nominał)", "Wartość nominalna akcji uprzywilejowanej — podstawa dywidendy i ceny wykupu."],
        ["Cumulative / non-cumulative", "Z kumulacją niewypłaconych dywidend / bez kumulacji."],
        ["Call date", "Data, od której emitent może wykupić akcje."],
        ["Current yield", "Bieżąca stopa dywidendy: dywidenda roczna / cena."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "Preferred stock is a share class with priority over common stock for dividends, usually fixed, and for assets in liquidation. It usually carries no voting rights. It behaves like something between a share and a perpetual bond.",
      keyFacts: [
        ["Market", "Exchange (e.g. NYSE — typically USD 25 par), also OTC."],
        ["Dividend", "Usually fixed (% of par), paid quarterly; cumulative or non-cumulative."],
        ["Priority", "Ahead of common stock, behind all creditors (including subordinated bonds)."],
        ["Voting", "Usually none (sometimes triggered when dividends are not paid)."],
        ["Term", "Often perpetual, with an issuer call option after several years."],
        ["Settlement", "Like shares: T+2 in the EU (T+1 from 11 Oct 2027), T+1 in the US."],
        ["CFI code", "<code>EP****</code> (Equities – Preferred shares)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>Preferred Stock is a class of shares with a <strong>preference</strong> over common stock:</p>" +
            "<ul>" +
              "<li><strong>dividend</strong> — paid before any common dividend, usually at a fixed rate (e.g. 6% of par a year);</li>" +
              "<li><strong>liquidation</strong> — par is repaid before common shareholders, but after creditors.</li>" +
            "</ul>" +
            "<p>Main variants:</p>" +
            "<ul>" +
              "<li><strong>cumulative</strong> — unpaid dividends accumulate and must be paid before common shareholders receive anything;</li>" +
              "<li><strong>non-cumulative</strong> — a skipped dividend is lost (typical for banks, because only such shares count as Tier 1 capital);</li>" +
              "<li><strong>convertible</strong> — with a right to convert into common shares;</li>" +
              "<li><strong>callable</strong> — the issuer may redeem them at par from a set date.</li>" +
            "</ul>" +
            "<div class='callout'><strong>Polish context</strong>Under the Polish Commercial Companies Code, \"preferred shares\" (akcje uprzywilejowane) is a broader term. The privilege may concern voting (in a public company voting-preferred shares are allowed only to a limited extent), dividends (at most 50% higher than on ordinary shares) or the distribution of assets. Dividend-preferred shares may be non-voting. US Preferred Stock most closely matches non-voting dividend-preferred shares.</div>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Issuance.</strong> A company (often a bank, insurer, REIT or utility) issues shares with a par value (e.g. USD 25) and a stated dividend rate.</li>" +
              "<li><strong>Trading.</strong> On the exchange like shares. The price behaves much like a long-dated bond — driven mainly by interest rates and the issuer's credit risk.</li>" +
              "<li><strong>Dividends.</strong> The board declares the dividend (usually quarterly). Despite the fixed rate, payment is not a legal obligation like a bond coupon — skipping it is not a default.</li>" +
              "<li><strong>Call.</strong> After the call date the issuer may redeem the shares at par (it usually does so when rates fall and it can refinance more cheaply).</li>" +
            "</ol>" +
            "<p class='formula'>Current yield = annual dividend / market price</p>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A fund (NAV equivalent to USD 150m) buys 200,000 non-cumulative preferred shares of bank Z: USD 25 par, 6% dividend, callable at par in 5 years. Market price USD 24.00.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>Trade value</td><td>200,000 × 24.00</td><td class='num'>USD 4,800,000 (3.2% of NAV)</td></tr>" +
              "<tr><td>Annual dividend per share</td><td>25 × 6%</td><td class='num'>USD 1.50</td></tr>" +
              "<tr><td>Quarterly dividend to the fund</td><td>200,000 × 1.50 / 4</td><td class='num'>USD 75,000</td></tr>" +
              "<tr><td>Current yield</td><td>1.50 / 24.00</td><td class='num'>6.25%</td></tr>" +
              "<tr><td>Market requires 7.0% → price (perpetual approximation)</td><td>1.50 / 0.07</td><td class='num'>≈ USD 21.43 (−10.7%)</td></tr>" +
            "</tbody></table></div>" +
            "<p>If the bank skips a quarterly dividend, the fund will not recover it (non-cumulative), and the price usually falls sharply.</p>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>The position counts towards issuer limits <strong>together</strong> with bank Z's common shares and bonds (5/10/40, and the 20% combined limit with deposits and OTC derivatives with bank Z).</li>" +
              "<li>If the shares are non-voting — the acquisition limit of <strong>10% of the issuer's non-voting shares</strong> (Art. 56(2)(a)).</li>" +
              "<li>Classification in the system: equity or debt instrument? It affects prospectus limits (e.g. \"at least 80% in equities\") — it must be consistent with the fund's policy.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> exchange closing price; when illiquid — fair value based on spreads of comparable instruments.</p>" +
            "<ul>" +
              "<li><strong>Interest rate risk</strong> — the perpetual nature makes it highly rate-sensitive.</li>" +
              "<li><strong>Credit risk and subordination</strong> — in insolvency, preferred holders are near the back of the queue.</li>" +
              "<li><strong>Dividend skip risk</strong>, especially for non-cumulative shares.</li>" +
              "<li><strong>Call risk</strong> — the price rarely rises much above the call price.</li>" +
              "<li><strong>Liquidity risk</strong> — smaller issues have wide spreads.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html:
            "<ol>" +
              "<li>Purchase on the exchange, DvP settlement.</li>" +
              "<li>Dividend declaration and payment (ex-date, record date as for common shares).</li>" +
              "<li>Events: dividend skip, change of terms, conversion (convertible), call, tender offer.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(a)–(d) UCITS; Art. 2 Dir. 2007/16/EC</span></h4><p>Listed preferred shares are transferable securities. A convertible version may embed a derivative (Art. 10 Dir. 2007/16/EC).</p></div>" +
              "<div class='rule'><h4>Issuer limits <span class='law'>Art. 52</span></h4><p>Aggregated with all securities of the same issuer and group: 5/10/40, 20% combined with deposits and OTC exposure.</p></div>" +
              "<div class='rule'><h4>Acquisition limits <span class='law'>Art. 56</span></h4><p>Max 10% of an issuer's non-voting shares (at UCITS level). Where the shares carry votes — the significant influence limit at management company level.</p></div>" +
              "<div class='rule'><h4>Convertible preferred <span class='law'>CESR/10-788</span></h4><p>The embedded conversion right counts towards global exposure: number of common shares on conversion × share price × delta.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Issuer and asset class limits — per the AIF's documents; consistent classification (equity vs debt).</li>" +
              "<li>Leverage: cash-paid position = market value; convertible — delta-equivalent conversion.</li>" +
              "<li>Unlisted companies: the Art. 26–30 AIFMD control thresholds are based on voting rights — non-voting shares do not add to them.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html:
            "<ul>" +
              "<li><strong>Major holdings</strong> <span class='law'>Dir. 2004/109/EC</span> — thresholds are based on voting rights. Non-voting shares usually do not count (unless voting is triggered or the shares convert into voting shares).</li>" +
              "<li><strong>MiFIR</strong> — transaction reports by the investment firm.</li>" +
              "<li>No EMIR reporting.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> (different from the common shares), in the US also CUSIP; ticker usually with a series suffix (e.g. \"-PA\", \".PRA\" — depending on the data vendor).</li>" +
              "<li><strong>CFI</strong> — <code>E</code> (Equities), group <code>P</code> (Preferred shares); convertible preferred — group <code>F</code>.</li>" +
              "<li><strong>Issuer LEI</strong> — shared with common shares and bonds, for limit aggregation.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Instrument classification (equity / hybrid) consistent with policy and prospectus limits.</li>" +
              "<li>Aggregation with other securities of the issuer and group (5/10/40, 20%).</li>" +
              "<li>10% limit on the issuer's non-voting shares.</li>" +
              "<li>Convertible: embedded derivative in global exposure.</li>" +
              "<li>Event monitoring: dividend skip, call, conversion.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Par value", "Nominal value of the preferred share — the basis for the dividend and call price."],
        ["Cumulative / non-cumulative", "With accumulation of unpaid dividends / without."],
        ["Call date", "Date from which the issuer may redeem the shares."],
        ["Current yield", "Annual dividend / price."]
      ]
    }
  }
});

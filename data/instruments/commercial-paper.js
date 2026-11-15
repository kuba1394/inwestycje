window.INSTRUMENTS.push({
  id: "commercial-paper",
  name: "Commercial Paper",
  aliases: ["CP", "ECP", "Euro Commercial Paper", "NEU CP", "ABCP", "papier komercyjny"],
  market: "otc",
  asset: { pl: "Rynek pieniężny", en: "Money market" },
  sources: ["ucits", "eligible", "mmfr", "aifmd"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Commercial Paper to krótkoterminowy, zwykle niezabezpieczony dłużny papier emitowany przez spółki i banki w celu finansowania bieżącej działalności. Najczęściej jest dyskontowy, ma termin od kilku dni do roku i nie jest notowany na giełdzie — trafia do inwestorów przez dealerów w ramach programu emisji.",
      keyFacts: [
        ["Emitenci", "Duże spółki o dobrej kondycji, banki, pojazdy ABCP (asset-backed commercial paper)."],
        ["Termin", "Od 1 dnia do 1 roku (USCP zwykle do 270 dni)."],
        ["Oprocentowanie", "Najczęściej dyskontowe; czasem z odsetkami płatnymi w terminie wykupu."],
        ["Rynek", "OTC — emisja ciągła w ramach programu przez dealerów; rynek wtórny ograniczony (dealer zwykle odkupuje)."],
        ["Rodzaje programów", "ECP (Euro CP, rozliczany w Euroclear/Clearstream), NEU CP (Francja), USCP; etykieta jakości STEP."],
        ["Rozliczenie", "Zwykle T+0 do T+2, DvP."],
        ["Kod CFI", "<code>DY****</code> (Debt – Money market instruments)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Commercial Paper</em> to dla spółek tańsza alternatywa wobec krótkiego kredytu bankowego, a dla funduszy — sposób na wyższą rentowność niż bony skarbowe przy krótkim terminie.</p>" +
            "<ul>" +
              "<li><strong>Program</strong> — emitent ustanawia program (np. ECP 2 mld EUR) z dokumentacją i dealerami, a potem emituje papiery w dowolnych kwotach i terminach w miarę potrzeb.</li>" +
              "<li><strong>Brak zabezpieczenia</strong> — inwestor polega na zdolności kredytowej emitenta. Emitenci zwykle mają linie kredytowe w bankach na spłatę CP w razie problemów z rolowaniem (<em>backstop</em>).</li>" +
              "<li><strong>ABCP</strong> — CP emitowany przez pojazd, który kupuje należności (np. handlowe) i ma wsparcie płynnościowe banku.</li>" +
            "</ul>" +
            "<p>Ceny liczy się tak samo jak dla bonu skarbowego:</p>" +
            "<p class='formula'>Cena = nominał / (1 + rentowność × dni / 360)</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Zapytanie.</strong> Fundusz informuje dealerów, ile chce zainwestować i na jaki termin, albo dealer oferuje dostępne papiery (zwykle także „na zamówienie” — <em>reverse inquiry</em>).</li>" +
              "<li><strong>Emisja.</strong> Emitent wystawia papier o wybranym terminie. Nadaje się nowy ISIN dla każdej daty wykupu.</li>" +
              "<li><strong>Rozliczenie.</strong> DvP, często tego samego dnia.</li>" +
              "<li><strong>Posiadanie.</strong> Papier zwykle trzyma się do wykupu. Sprzedaż przed terminem jest możliwa głównie do dealera.</li>" +
              "<li><strong>Wykup.</strong> Emitent spłaca nominał — najczęściej z nowej emisji CP (rolowanie). Dlatego kluczowe jest ryzyko, że rynek przestanie rolować emitenta.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz UCITS (NAV 200 mln EUR) kupuje 90-dniowy ECP spółki C (akcje notowane na giełdzie, wysoka ocena krótkoterminowa): nominał 5 mln EUR, rentowność 2,80%.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Cena zakupu</td><td>5 000 000 / (1 + 2,80% × 90/360)</td><td class='num'>4 965 243,30 EUR</td></tr>" +
              "<tr><td>Dochód do wykupu</td><td>5 000 000 − 4 965 243,30</td><td class='num'>34 756,70 EUR</td></tr>" +
              "<tr><td>Udział w NAV</td><td>4,97 / 200</td><td class='num'>≈ 2,5%</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>CP nie jest notowany, więc musi spełniać warunki <strong>art. 50 ust. 1 lit. h</strong>. Tu warunek emitenta jest spełniony, bo spółka C ma papiery notowane na rynku regulowanym.</li>" +
              "<li>Ekspozycja 2,5% wlicza się do limitu emitenta <strong>razem</strong> z obligacjami i akcjami spółki C oraz jej grupy (5/10/40, 20%).</li>" +
              "<li>Limit nabycia: maks. 10% instrumentów rynku pieniężnego jednego emitenta (art. 56 ust. 2 lit. d).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> brak notowań, więc model — krzywa rynku pieniężnego plus spread emitenta, kwotowania dealerów, ewentualnie zamortyzowany koszt (w MMF tylko w ograniczonym zakresie).</p>" +
            "<ul>" +
              "<li><strong>Ryzyko kredytowe emitenta</strong> — papier niezabezpieczony.</li>" +
              "<li><strong>Ryzyko rolowania</strong> — emitent może nie sprzedać nowej emisji w kryzysie (np. 2008, marzec 2020).</li>" +
              "<li><strong>Ryzyko płynności</strong> — praktycznie brak rynku wtórnego poza dealerem.</li>" +
              "<li><strong>Ryzyko koncentracji</strong> — fundusze rynku pieniężnego często mają wielu takich samych emitentów.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zakup od dealera, rozliczenie DvP (często T+0).</li>" +
              "<li>Trzymanie do wykupu; monitoring kondycji emitenta.</li>" +
              "<li>Wykup i reinwestycja.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>MMI poza rynkiem regulowanym <span class='law'>art. 50 ust. 1 lit. h UCITS</span></h4><p>Emisja lub emitent podlega przepisom o ochronie inwestorów i oszczędności, a emitentem jest: (i) organ publiczny lub bank centralny, (ii) podmiot z papierami notowanymi na rynku regulowanym, (iii) podmiot pod nadzorem ostrożnościowym (np. bank), albo (iv) inny podmiot zatwierdzonej kategorii — m.in. spółka z kapitałem i rezerwami co najmniej 10 mln EUR, publikująca roczne sprawozdania, lub podmiot finansujący pojazdy sekurytyzacyjne z bankową linią płynnościową (ABCP).</p></div>" +
              "<div class='rule'><h4>Informacje <span class='law'>art. 5 dyr. 2007/16/WE</span></h4><p>Dla MMI nienotowanych muszą być dostępne odpowiednie informacje o emisji, programie emisji i sytuacji prawnej i finansowej emitenta.</p></div>" +
              "<div class='rule'><h4>Limity emitenta <span class='law'>art. 52</span></h4><p>5/10/40, grupa kapitałowa, limit łączny 20% — razem z innymi papierami emitenta.</p></div>" +
              "<div class='rule'><h4>Limit nabycia <span class='law'>art. 56 ust. 2 lit. d</span></h4><p>Maks. 10% instrumentów rynku pieniężnego wyemitowanych przez jeden podmiot.</p></div>" +
            "</div>"
        },
        {
          id: "mmf", title: "Fundusze rynku pieniężnego (MMFR)",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność <span class='law'>art. 9–10 MMFR</span></h4><p>MMI z pozytywną oceną wewnętrznej procedury jakości kredytowej; ABCP — tylko spełniające dodatkowe warunki (art. 11 MMFR).</p></div>" +
              "<div class='rule'><h4>Dywersyfikacja <span class='law'>art. 17 MMFR</span></h4><p>Maks. 5% aktywów w MMI jednego emitenta (z wyjątkami); łącznie z depozytami i derywatami wobec jednego podmiotu maks. 15%.</p></div>" +
              "<div class='rule'><h4>Płynność <span class='law'>art. 24–25 MMFR</span></h4><p>Minimalne udziały aktywów zapadających w ciągu dnia i tygodnia; WAM i WAL.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Limity emitenta i jakości kredytowej — według dokumentów AIF.</li>" +
              "<li>Płynność (art. 16 AIFMD) — ograniczony rynek wtórny.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — transakcje na instrumentach rynku pieniężnego podlegają raportowaniu w zakresie określonym w MiFIR (po stronie firmy inwestycyjnej).</li>" +
              "<li><strong>MMFR</strong> — raporty MMF do nadzorcy.</li>" +
              "<li>Brak raportowania EMIR.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> — osobny dla każdej daty wykupu (ECP często z prefiksem <code>XS</code>).</li>" +
              "<li><strong>LEI emitenta i gwaranta</strong>.</li>" +
              "<li><strong>CFI</strong> — <code>D</code> (Debt), grupa <code>Y</code> (Money market instruments).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Spełnienie warunków art. 50 ust. 1 lit. h (kategoria emitenta) i dostępność informacji.</li>" +
              "<li>Agregacja z innymi papierami emitenta i grupy (5/10/40, 20%).</li>" +
              "<li>Limit 10% MMI jednego emitenta.</li>" +
              "<li>W MMF: ocena jakości kredytowej, dywersyfikacja, WAM/WAL.</li>" +
              "<li>Wycena modelowa udokumentowana zgodnie z polityką.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["CP programme", "Ramowy program emisji, w ramach którego emitent wielokrotnie wystawia CP."],
        ["ABCP", "Asset-Backed Commercial Paper — CP zabezpieczony pulą należności."],
        ["STEP", "Short-Term European Paper — rynkowa etykieta standardów informacyjnych dla papierów krótkoterminowych."],
        ["Backstop line", "Linia kredytowa banku zapewniająca spłatę CP, gdy emitent nie zroluje emisji."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "Commercial paper is a short-term, usually unsecured debt security issued by companies and banks to fund day-to-day operations. It is usually issued at a discount, matures in anything from a few days to a year, and is not exchange-listed — it reaches investors through dealers under an issuance programme.",
      keyFacts: [
        ["Issuers", "Large, creditworthy companies, banks, ABCP (asset-backed commercial paper) vehicles."],
        ["Maturity", "From 1 day to 1 year (USCP usually up to 270 days)."],
        ["Interest", "Usually discount basis; sometimes interest-bearing, paid at maturity."],
        ["Market", "OTC — continuous issuance under a programme via dealers; limited secondary market (the dealer usually buys back)."],
        ["Programme types", "ECP (Euro CP, settled in Euroclear/Clearstream), NEU CP (France), USCP; STEP quality label."],
        ["Settlement", "Usually T+0 to T+2, DvP."],
        ["CFI code", "<code>DY****</code> (Debt – Money market instruments)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>For companies, Commercial Paper is a cheaper alternative to short-term bank loans; for funds, a way to earn more than treasury bills at short maturities.</p>" +
            "<ul>" +
              "<li><strong>Programme</strong> — the issuer sets up a programme (e.g. EUR 2bn ECP) with documentation and dealers, then issues paper in any amounts and maturities as needed.</li>" +
              "<li><strong>Unsecured</strong> — the investor relies on the issuer's creditworthiness. Issuers usually have bank credit lines to repay CP if rolling fails (backstop).</li>" +
              "<li><strong>ABCP</strong> — CP issued by a vehicle that buys receivables (e.g. trade receivables) and has bank liquidity support.</li>" +
            "</ul>" +
            "<p>Pricing works as for a treasury bill:</p>" +
            "<p class='formula'>Price = nominal / (1 + yield × days / 360)</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Enquiry.</strong> The fund tells dealers how much it wants to invest and for how long, or the dealer offers available paper (also issued \"to order\" — reverse inquiry).</li>" +
              "<li><strong>Issuance.</strong> The issuer issues paper for the chosen maturity. Each maturity date gets a new ISIN.</li>" +
              "<li><strong>Settlement.</strong> DvP, often same day.</li>" +
              "<li><strong>Holding.</strong> Paper is usually held to maturity. Selling early is possible mainly back to the dealer.</li>" +
              "<li><strong>Redemption.</strong> The issuer repays the nominal — usually from a new CP issue (rolling). That is why the key risk is the market ceasing to roll the issuer.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A UCITS fund (NAV EUR 200m) buys 90-day ECP from company C (shares listed on an exchange, high short-term rating): EUR 5m nominal, 2.80% yield.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>Purchase price</td><td>5,000,000 / (1 + 2.80% × 90/360)</td><td class='num'>EUR 4,965,243.30</td></tr>" +
              "<tr><td>Return to maturity</td><td>5,000,000 − 4,965,243.30</td><td class='num'>EUR 34,756.70</td></tr>" +
              "<tr><td>Share of NAV</td><td>4.97 / 200</td><td class='num'>≈ 2.5%</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>CP is not listed, so it must meet <strong>Art. 50(1)(h)</strong>. Here the issuer condition is met because company C has securities listed on a regulated market.</li>" +
              "<li>The 2.5% exposure counts towards the issuer limit <strong>together</strong> with company C's and its group's bonds and shares (5/10/40, 20%).</li>" +
              "<li>Acquisition limit: max 10% of a single issuer's money market instruments (Art. 56(2)(d)).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> no listed prices, so a model — money market curve plus issuer spread, dealer quotes, possibly amortised cost (limited in MMFs).</p>" +
            "<ul>" +
              "<li><strong>Issuer credit risk</strong> — unsecured paper.</li>" +
              "<li><strong>Rollover risk</strong> — the issuer may fail to sell a new issue in a crisis (e.g. 2008, March 2020).</li>" +
              "<li><strong>Liquidity risk</strong> — practically no secondary market beyond the dealer.</li>" +
              "<li><strong>Concentration risk</strong> — money market funds often hold the same issuers.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Purchase from a dealer, DvP settlement (often T+0).</li>" +
              "<li>Held to maturity; monitoring of the issuer.</li>" +
              "<li>Redemption and reinvestment.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>MMI not on a regulated market <span class='law'>Art. 50(1)(h) UCITS</span></h4><p>The issue or issuer is regulated for investor and savings protection, and the issuer is: (i) a public body or central bank, (ii) an entity with securities listed on a regulated market, (iii) an entity under prudential supervision (e.g. a bank), or (iv) another entity in an approved category — including a company with capital and reserves of at least EUR 10m that publishes annual accounts, or an entity financing securitisation vehicles with a bank liquidity line (ABCP).</p></div>" +
              "<div class='rule'><h4>Information <span class='law'>Art. 5 Dir. 2007/16/EC</span></h4><p>For unlisted MMIs, appropriate information must be available on the issue, the issuance programme and the issuer's legal and financial situation.</p></div>" +
              "<div class='rule'><h4>Issuer limits <span class='law'>Art. 52</span></h4><p>5/10/40, group, 20% combined limit — together with the issuer's other securities.</p></div>" +
              "<div class='rule'><h4>Acquisition limit <span class='law'>Art. 56(2)(d)</span></h4><p>Max 10% of money market instruments issued by a single body.</p></div>" +
            "</div>"
        },
        {
          id: "mmf", title: "Money market funds (MMFR)",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Eligibility <span class='law'>Art. 9–10 MMFR</span></h4><p>MMIs with a favourable internal credit quality assessment; ABCP only if it meets additional conditions (Art. 11 MMFR).</p></div>" +
              "<div class='rule'><h4>Diversification <span class='law'>Art. 17 MMFR</span></h4><p>Max 5% of assets in MMIs of one issuer (with exceptions); combined with deposits and derivatives with one body, max 15%.</p></div>" +
              "<div class='rule'><h4>Liquidity <span class='law'>Art. 24–25 MMFR</span></h4><p>Minimum proportions of daily and weekly maturing assets; WAM and WAL.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Issuer and credit quality limits — per the AIF's documents.</li>" +
              "<li>Liquidity (Art. 16 AIFMD) — limited secondary market.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — money market instrument trades are reportable to the extent set out in MiFIR (by the investment firm).</li>" +
              "<li><strong>MMFR</strong> — MMF reports to the regulator.</li>" +
              "<li>No EMIR reporting.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> — separate for each maturity date (ECP often with an <code>XS</code> prefix).</li>" +
              "<li><strong>Issuer and guarantor LEI</strong>.</li>" +
              "<li><strong>CFI</strong> — <code>D</code> (Debt), group <code>Y</code> (Money market instruments).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Art. 50(1)(h) conditions met (issuer category) and information available.</li>" +
              "<li>Aggregation with the issuer's and group's other securities (5/10/40, 20%).</li>" +
              "<li>10% limit on one issuer's MMIs.</li>" +
              "<li>In an MMF: credit quality assessment, diversification, WAM/WAL.</li>" +
              "<li>Model valuation documented in line with policy.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["CP programme", "Framework under which the issuer repeatedly issues CP."],
        ["ABCP", "Asset-Backed Commercial Paper — CP backed by a pool of receivables."],
        ["STEP", "Short-Term European Paper — market label for disclosure standards for short-term paper."],
        ["Backstop line", "Bank credit line ensuring CP repayment if the issuer cannot roll."]
      ]
    }
  }
});

window.INSTRUMENTS.push({
  id: "certificate-of-deposit",
  name: "Certificate of Deposit",
  aliases: ["CD", "Negotiable CD", "ECD", "certyfikat depozytowy"],
  market: "otc",
  asset: { pl: "Rynek pieniężny", en: "Money market" },
  sources: ["ucits", "eligible", "mmfr", "aifmd"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Certyfikat depozytowy to zbywalny papier wystawiany przez bank, potwierdzający przyjęcie depozytu terminowego na określony czas i procent. W odróżnieniu od zwykłej lokaty można go sprzedać przed terminem innemu inwestorowi. Dla compliance kluczowe jest, czy instrument to depozyt, czy papier wartościowy, bo obowiązują inne limity.",
      keyFacts: [
        ["Emitent", "Bank (instytucja kredytowa)."],
        ["Termin", "Zwykle od 1 miesiąca do 1 roku."],
        ["Oprocentowanie", "Odsetki płatne w terminie wykupu (interest-bearing) lub dyskontowe; stałe lub zmienne."],
        ["Rynek", "OTC — emisja przez bank lub dealerów, wtórny obrót ograniczony."],
        ["Rodzaje", "ECD (Euro CD), krajowe CD (np. w ramach NEU CP we Francji), Yankee CD w USA."],
        ["Kwalifikacja", "Instrument rynku pieniężnego (zbywalny), a nie depozyt."],
        ["Kod CFI", "<code>DY****</code> (Debt – Money market instruments)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Certificate of Deposit</em> to ekonomicznie lokata terminowa w banku, ale w formie <strong>zbywalnego papieru</strong>. Bank dostaje finansowanie na określony czas, a inwestor może odzyskać pieniądze przed terminem, sprzedając CD na rynku (zamiast zrywać lokatę).</p>" +
            "<p>Wartość w dniu wykupu dla CD z odsetkami w terminie:</p>" +
            "<p class='formula'>Kwota wykupu = nominał × (1 + kupon × dni / 360)</p>" +
            "<p>Cena przy sprzedaży przed terminem to kwota wykupu zdyskontowana bieżącą rentownością rynku pieniężnego:</p>" +
            "<p class='formula'>Cena = kwota wykupu / (1 + rentowność × pozostałe dni / 360)</p>" +
            "<div class='callout'><strong>Depozyt czy papier?</strong>Zwykła lokata to depozyt (art. 50 ust. 1 lit. f UCITS). CD to instrument rynku pieniężnego (lit. h). Ta różnica decyduje, które limity stosujesz. Niezbywalne „certyfikaty” bankowe trzeba ocenić według treści umowy, a nie nazwy.</div>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Emisja.</strong> Bank wystawia CD na kwotę, termin i oprocentowanie uzgodnione z funduszem (często bezpośrednio lub przez dealera).</li>" +
              "<li><strong>Rozliczenie.</strong> DvP w CSD (ECD — Euroclear/Clearstream), często tego samego dnia.</li>" +
              "<li><strong>Posiadanie.</strong> Odsetki narastają; wycena zmienia się z rynkowymi stopami i spreadem banku.</li>" +
              "<li><strong>Sprzedaż przed terminem</strong> — do dealera lub innego inwestora po cenie rynkowej.</li>" +
              "<li><strong>Wykup.</strong> Bank wypłaca nominał z odsetkami.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz UCITS (NAV 200 mln EUR) kupuje od banku K 6-miesięczny CD (182 dni): nominał 10 mln EUR, oprocentowanie 2,50% płatne w terminie wykupu. Fundusz ma już w banku K lokatę 25 mln EUR.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Kwota wykupu</td><td>10 000 000 × (1 + 2,50% × 182/360)</td><td class='num'>10 126 388,89 EUR</td></tr>" +
              "<tr><td>Po 60 dniach stopy spadły: sprzedaż przy rentowności 2,30% (122 dni do wykupu)</td><td>10 126 388,89 / (1 + 2,30% × 122/360)</td><td class='num'>10 048 069,77 EUR</td></tr>" +
              "<tr><td>Zysk po 60 dniach</td><td>10 048 069,77 − 10 000 000</td><td class='num'>48 069,77 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<p>To więcej niż odsetki narosłe za 60 dni (41 666,67 EUR), bo stopy spadły i CD zyskał na wartości.</p>" +
            "<h3>Co to oznacza dla compliance — bank K</h3>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th class='num'>% NAV</th><th>Limit</th></tr></thead><tbody>" +
              "<tr><td>CD banku K (MMI)</td><td class='num'>5,0%</td><td>5/10/40 (art. 52 ust. 1–2)</td></tr>" +
              "<tr><td>Lokata w banku K (depozyt)</td><td class='num'>12,5%</td><td>≤ 20% depozytów w jednym banku (art. 52 ust. 1)</td></tr>" +
              "<tr><td>Łącznie z bankiem K (+ ewentualna ekspozycja z derywatów OTC)</td><td class='num'>17,5%</td><td>≤ 20% (art. 52 ust. 2)</td></tr>" +
            "</tbody></table></div>" +
            "<p>Gdyby fundusz zawarł z bankiem K swap z dodatnią wyceną 3% NAV, limit łączny 20% zostałby przekroczony.</p>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> model z krzywej rynku pieniężnego i spreadu banku lub kwotowania dealerów.</p>" +
            "<ul>" +
              "<li><strong>Ryzyko kredytowe banku</strong> — CD zwykle nie jest objęty gwarancjami depozytów dla instytucji finansowych.</li>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — niewielkie, krótki termin.</li>" +
              "<li><strong>Ryzyko płynności</strong> — rynek wtórny ograniczony, zwłaszcza w stresie.</li>" +
              "<li><strong>Ryzyko koncentracji</strong> — sumowanie z lokatami, rachunkami i derywatami u tego samego banku.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zakup (pierwotny lub wtórny), rozliczenie DvP.</li>" +
              "<li>Narastanie odsetek, wycena, ewentualna sprzedaż.</li>" +
              "<li>Wykup z odsetkami.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Kwalifikacja: MMI, nie depozyt <span class='law'>art. 50 ust. 1 lit. h vs lit. f</span></h4><p>CD emitowany przez bank pod nadzorem ostrożnościowym spełnia warunek emitenta z lit. h (iii). Depozyty (lit. f) to środki płatne na żądanie lub z prawem wypłaty, o terminie do 12 miesięcy, w instytucji kredytowej z UE lub objętej równoważnym nadzorem.</p></div>" +
              "<div class='rule'><h4>Limity dla CD <span class='law'>art. 52 ust. 1–2</span></h4><p>Jako papier wartościowy / MMI: 5/10/40 na emitenta (bank i grupa).</p></div>" +
              "<div class='rule'><h4>Limit depozytów <span class='law'>art. 52 ust. 1 akapit 1</span></h4><p>Maks. 20% NAV w depozytach w jednym podmiocie — dotyczy lokat, nie CD.</p></div>" +
              "<div class='rule'><h4>Limit łączny 20% <span class='law'>art. 52 ust. 2</span></h4><p>Papiery i MMI banku + depozyty w nim + ekspozycja z derywatów OTC wobec niego ≤ 20% NAV.</p></div>" +
              "<div class='rule'><h4>Limit nabycia <span class='law'>art. 56 ust. 2 lit. d</span></h4><p>Maks. 10% MMI jednego emitenta.</p></div>" +
            "</div>"
        },
        {
          id: "mmf", title: "Fundusze rynku pieniężnego (MMFR)",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dywersyfikacja <span class='law'>art. 17 MMFR</span></h4><p>Maks. 5% aktywów w MMI jednego emitenta, maks. 10% w depozytach w jednym banku (z wyjątkami); łącznie wobec jednego podmiotu maks. 15%.</p></div>" +
              "<div class='rule'><h4>Termin i płynność <span class='law'>art. 10, 24–25 MMFR</span></h4><p>Pozostały termin, WAM, WAL, udział aktywów dziennych i tygodniowych.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Limity koncentracji na banki — według dokumentów AIF.</li>" +
              "<li>Przy liczeniu dźwigni CD może spełniać warunki ekwiwalentu gotówki (art. 7 rozp. 231/2013), jeśli jest w walucie bazowej, łatwo zamienialny na gotówkę i o nieistotnym ryzyku zmiany wartości.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — w zakresie transakcji na instrumentach rynku pieniężnego, po stronie firmy inwestycyjnej.</li>" +
              "<li><strong>MMFR</strong> — raporty MMF.</li>" +
              "<li>Brak raportowania EMIR i SFTR (chyba że CD jest użyty w repo).</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> (ECD często <code>XS</code>), <strong>LEI banku</strong> — wspólny z lokatami i derywatami, do limitu łącznego 20%.</li>" +
              "<li><strong>CFI</strong> — <code>D</code> (Debt), grupa <code>Y</code> (Money market instruments).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Klasyfikacja: CD (MMI) vs lokata (depozyt) — zgodnie z treścią instrumentu.</li>" +
              "<li>5/10/40 dla CD; 20% dla depozytów; łącznie 20% z OTC wobec banku i grupy.</li>" +
              "<li>Limit 10% MMI jednego emitenta.</li>" +
              "<li>W MMF: limity art. 17, WAM/WAL.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Negotiable CD", "Zbywalny certyfikat depozytowy, który można sprzedać przed terminem."],
        ["ECD", "Euro Certificate of Deposit — CD emitowany na rynku euro, rozliczany w międzynarodowym CSD."],
        ["Interest-bearing", "Instrument z odsetkami płatnymi w terminie wykupu (w odróżnieniu od dyskontowego)."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A certificate of deposit is a negotiable security issued by a bank, evidencing a time deposit for a set period and rate. Unlike an ordinary deposit, it can be sold to another investor before maturity. For compliance the key question is whether the instrument is a deposit or a security, because different limits apply.",
      keyFacts: [
        ["Issuer", "Bank (credit institution)."],
        ["Maturity", "Usually 1 month to 1 year."],
        ["Interest", "Interest paid at maturity (interest-bearing) or discount basis; fixed or floating."],
        ["Market", "OTC — issued by the bank or via dealers; limited secondary trading."],
        ["Types", "ECD (Euro CD), domestic CDs (e.g. under NEU CP in France), Yankee CDs in the US."],
        ["Classification", "Money market instrument (negotiable), not a deposit."],
        ["CFI code", "<code>DY****</code> (Debt – Money market instruments)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Certificate of Deposit is economically a bank time deposit, but in the form of a <strong>negotiable security</strong>. The bank gets funding for a set period, and the investor can get its money back early by selling the CD in the market (instead of breaking a deposit).</p>" +
            "<p>Maturity value for an interest-bearing CD:</p>" +
            "<p class='formula'>Maturity amount = nominal × (1 + coupon × days / 360)</p>" +
            "<p>The price when sold before maturity is the maturity amount discounted at the current money market yield:</p>" +
            "<p class='formula'>Price = maturity amount / (1 + yield × remaining days / 360)</p>" +
            "<div class='callout'><strong>Deposit or security?</strong>An ordinary time deposit is a deposit (Art. 50(1)(f) UCITS). A CD is a money market instrument (point (h)). This difference decides which limits you apply. Non-negotiable bank \"certificates\" must be assessed on the substance of the contract, not the name.</div>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Issuance.</strong> The bank issues a CD for the amount, term and rate agreed with the fund (often directly or via a dealer).</li>" +
              "<li><strong>Settlement.</strong> DvP at the CSD (ECD — Euroclear/Clearstream), often same day.</li>" +
              "<li><strong>Holding.</strong> Interest accrues; valuation changes with market rates and the bank's spread.</li>" +
              "<li><strong>Sale before maturity</strong> — to a dealer or another investor at market price.</li>" +
              "<li><strong>Redemption.</strong> The bank pays the nominal plus interest.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A UCITS fund (NAV EUR 200m) buys a 6-month (182-day) CD from bank K: EUR 10m nominal, 2.50% interest paid at maturity. The fund already has a EUR 25m deposit with bank K.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>Maturity amount</td><td>10,000,000 × (1 + 2.50% × 182/360)</td><td class='num'>EUR 10,126,388.89</td></tr>" +
              "<tr><td>After 60 days rates have fallen: sale at a 2.30% yield (122 days to maturity)</td><td>10,126,388.89 / (1 + 2.30% × 122/360)</td><td class='num'>EUR 10,048,069.77</td></tr>" +
              "<tr><td>Gain after 60 days</td><td>10,048,069.77 − 10,000,000</td><td class='num'>EUR 48,069.77</td></tr>" +
            "</tbody></table></div>" +
            "<p>This is more than the interest accrued over 60 days (EUR 41,666.67), because rates fell and the CD gained value.</p>" +
            "<h3>What this means for compliance — bank K</h3>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Position</th><th class='num'>% of NAV</th><th>Limit</th></tr></thead><tbody>" +
              "<tr><td>Bank K CD (MMI)</td><td class='num'>5.0%</td><td>5/10/40 (Art. 52(1)–(2))</td></tr>" +
              "<tr><td>Deposit with bank K</td><td class='num'>12.5%</td><td>≤ 20% in deposits with one bank (Art. 52(1))</td></tr>" +
              "<tr><td>Total with bank K (+ any OTC derivative exposure)</td><td class='num'>17.5%</td><td>≤ 20% (Art. 52(2))</td></tr>" +
            "</tbody></table></div>" +
            "<p>If the fund also had a swap with bank K with a positive value of 3% of NAV, the 20% combined limit would be breached.</p>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> model from the money market curve and the bank's spread, or dealer quotes.</p>" +
            "<ul>" +
              "<li><strong>Bank credit risk</strong> — CDs held by financial institutions are usually not covered by deposit guarantee schemes.</li>" +
              "<li><strong>Interest rate risk</strong> — small, short maturity.</li>" +
              "<li><strong>Liquidity risk</strong> — limited secondary market, especially under stress.</li>" +
              "<li><strong>Concentration risk</strong> — aggregation with deposits, accounts and derivatives with the same bank.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Purchase (primary or secondary), DvP settlement.</li>" +
              "<li>Interest accrual, valuation, possible sale.</li>" +
              "<li>Redemption with interest.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Classification: MMI, not a deposit <span class='law'>Art. 50(1)(h) vs (f)</span></h4><p>A CD issued by a prudentially supervised bank meets the issuer condition in point (h)(iii). Deposits (point (f)) are repayable on demand or withdrawable, mature within 12 months, and are held with an EU credit institution or one subject to equivalent supervision.</p></div>" +
              "<div class='rule'><h4>Limits for a CD <span class='law'>Art. 52(1)–(2)</span></h4><p>As a security / MMI: 5/10/40 per issuer (bank and group).</p></div>" +
              "<div class='rule'><h4>Deposit limit <span class='law'>Art. 52(1), first subpara.</span></h4><p>Max 20% of NAV in deposits with one body — applies to deposits, not CDs.</p></div>" +
              "<div class='rule'><h4>20% combined limit <span class='law'>Art. 52(2)</span></h4><p>The bank's securities and MMIs + deposits with it + OTC derivative exposure to it ≤ 20% of NAV.</p></div>" +
              "<div class='rule'><h4>Acquisition limit <span class='law'>Art. 56(2)(d)</span></h4><p>Max 10% of one issuer's MMIs.</p></div>" +
            "</div>"
        },
        {
          id: "mmf", title: "Money market funds (MMFR)",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Diversification <span class='law'>Art. 17 MMFR</span></h4><p>Max 5% of assets in MMIs of one issuer, max 10% in deposits with one bank (with exceptions); combined exposure to one body max 15%.</p></div>" +
              "<div class='rule'><h4>Maturity and liquidity <span class='law'>Art. 10, 24–25 MMFR</span></h4><p>Residual maturity, WAM, WAL, share of daily and weekly assets.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Bank concentration limits — per the AIF's documents.</li>" +
              "<li>For leverage, a CD may qualify as a cash equivalent (Art. 7 Reg. 231/2013) if it is in the base currency, readily convertible to cash and subject to an insignificant risk of change in value.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — for money market instrument trades, by the investment firm.</li>" +
              "<li><strong>MMFR</strong> — MMF reports.</li>" +
              "<li>No EMIR or SFTR reporting (unless the CD is used in repo).</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> (ECDs often <code>XS</code>), <strong>bank LEI</strong> — shared with deposits and derivatives, for the 20% combined limit.</li>" +
              "<li><strong>CFI</strong> — <code>D</code> (Debt), group <code>Y</code> (Money market instruments).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Classification: CD (MMI) vs deposit — on the substance of the instrument.</li>" +
              "<li>5/10/40 for the CD; 20% for deposits; 20% combined with OTC to the bank and its group.</li>" +
              "<li>10% limit on one issuer's MMIs.</li>" +
              "<li>In an MMF: Art. 17 limits, WAM/WAL.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Negotiable CD", "A transferable certificate of deposit that can be sold before maturity."],
        ["ECD", "Euro Certificate of Deposit — CD issued in the euromarket, settled in an international CSD."],
        ["Interest-bearing", "Instrument with interest paid at maturity (as opposed to discount)."]
      ]
    }
  }
});

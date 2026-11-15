window.INSTRUMENTS.push({
  id: "treasury-bill",
  name: "Treasury Bill",
  aliases: ["T-Bill", "Bubill", "BTF", "BOT", "bon skarbowy"],
  market: "otc",
  asset: { pl: "Rynek pieniężny", en: "Money market" },
  sources: ["ucits", "eligible", "mmfr", "aifmd", "sftr"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Bon skarbowy to krótkoterminowy papier dłużny państwa (do roku), zwykle bez kuponu. Kupuje się go poniżej nominału (z dyskontem), a w dniu wykupu dostaje pełny nominał. Różnica to dochód inwestora. To podstawowy instrument lokowania płynności w funduszach i funduszach rynku pieniężnego.",
      keyFacts: [
        ["Emitent", "Skarb państwa lub agencja długu (np. Bubill — Niemcy, BTF — Francja, BOT — Włochy, T-Bill — USA)."],
        ["Termin", "Zwykle 1–12 miesięcy (np. 3, 6, 12 miesięcy)."],
        ["Oprocentowanie", "Dyskontowe — brak kuponu, dochód = nominał − cena zakupu."],
        ["Rynek", "Pierwotny: aukcje. Wtórny: OTC między dealerami."],
        ["Rozliczenie", "UE: zwykle T+2; DvP w CSD."],
        ["Kwalifikacja", "Instrument rynku pieniężnego (MMI)."],
        ["Kod CFI", "<code>DY****</code> (Debt – Money market instruments)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Treasury Bill</em> to najprostszy instrument dłużny: państwo pożycza na krótko i zwraca nominał w ustalonym dniu. Nie ma kuponów — dochód wynika wyłącznie z tego, że cena zakupu jest niższa od nominału.</p>" +
            "<p>W strefie euro cenę liczy się zwykle z rentowności rynku pieniężnego (<em>money market yield</em>, ACT/360):</p>" +
            "<p class='formula'>Cena = nominał / (1 + rentowność × dni / 360)</p>" +
            "<p>W USA kwotuje się stopę dyskonta (<em>discount rate</em>): cena = nominał × (1 − d × dni / 360). Ta sama transakcja daje więc różne liczby zależnie od konwencji — przy porównaniach trzeba to sprawdzić.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Aukcja.</strong> Agencja długu ogłasza ofertę, dealerzy składają oferty rentowności lub ceny, emitent przyjmuje najkorzystniejsze.</li>" +
              "<li><strong>Zakup.</strong> Fundusz kupuje na aukcji (przez dealera) lub na rynku wtórnym; płaci cenę zdyskontowaną.</li>" +
              "<li><strong>Posiadanie.</strong> Wartość rośnie w kierunku nominału z upływem czasu (tzw. accretion). Zmiany stóp procentowych wpływają na cenę tylko w niewielkim stopniu, bo duration jest krótka.</li>" +
              "<li><strong>Wykup.</strong> W dniu zapadalności CSD wypłaca nominał.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz (NAV 200 mln EUR) lokuje nadwyżkę płynności w 6-miesięcznym bonie skarbowym (182 dni): nominał 10 mln EUR, rentowność 2,40% (ACT/360).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Kwota</th></tr></thead><tbody>" +
              "<tr><td>Cena zakupu</td><td>10 000 000 / (1 + 2,40% × 182/360)</td><td class='num'>9 880 121,20 EUR</td></tr>" +
              "<tr><td>Dochód do wykupu (dyskonto)</td><td>10 000 000 − 9 880 121,20</td><td class='num'>119 878,80 EUR</td></tr>" +
              "<tr><td>Udział w NAV</td><td>9,88 / 200</td><td class='num'>≈ 4,9%</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Bon emitowany przez państwo członkowskie korzysta z <strong>limitu 35%</strong> (art. 52 ust. 3) lub — za zgodą i przy co najmniej 6 emisjach — do 100% NAV (art. 54). Nie wchodzi do koszyka 40%.</li>" +
              "<li>W funduszu rynku pieniężnego (MMF) bon wpływa na średni ważony termin zapadalności (WAM) i średni ważony okres życia (WAL) portfela — oba mają limity w MMFR.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> cena rynkowa lub — jeśli polityka wyceny na to pozwala — model z bieżącej krzywej rynku pieniężnego. Metoda zamortyzowanego kosztu jest w MMF dopuszczalna tylko w ograniczonych przypadkach (MMFR).</p>" +
            "<ul>" +
              "<li><strong>Ryzyko kredytowe państwa</strong> — zwykle niskie.</li>" +
              "<li><strong>Ryzyko stopy procentowej</strong> — małe ze względu na krótki termin.</li>" +
              "<li><strong>Ryzyko reinwestycji</strong> — przy wykupie stopy mogą być niższe.</li>" +
              "<li><strong>Ryzyko walutowe</strong> — dla bonów w innej walucie niż bazowa.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zakup na aukcji lub wtórnie, rozliczenie DvP.</li>" +
              "<li>Ewentualne użycie w repo (popularne zabezpieczenie).</li>" +
              "<li>Wykup i reinwestycja (rolowanie płynności).</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Dopuszczalność MMI <span class='law'>art. 50 ust. 1 lit. a–d, h UCITS; art. 3–4 dyr. 2007/16/WE</span></h4><p>Instrumenty rynku pieniężnego to instrumenty o terminie (przy emisji lub pozostałym) do 397 dni albo z regularną korektą rentowności co najmniej co 397 dni, płynne i z wiarygodną wyceną. Bony emitowane przez państwa członkowskie spełniają też warunek emitenta z lit. h.</p></div>" +
              "<div class='rule'><h4>Limit 35% / 100% <span class='law'>art. 52 ust. 3, art. 54</span></h4><p>Jak dla obligacji skarbowych; poza koszykiem 40%.</p></div>" +
              "<div class='rule'><h4>Limit nabycia <span class='law'>art. 56 ust. 3</span></h4><p>Limit 10% instrumentów rynku pieniężnego jednego emitenta nie dotyczy emitentów publicznych.</p></div>" +
            "</div>"
        },
        {
          id: "mmf", title: "Fundusze rynku pieniężnego (MMFR)",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Termin instrumentu <span class='law'>art. 10 MMFR</span></h4><p>Krótkoterminowy MMF: pozostały termin MMI ≤ 397 dni. Standardowy MMF: do 2 lat, jeśli rentowność jest korygowana co najmniej co 397 dni.</p></div>" +
              "<div class='rule'><h4>WAM i WAL <span class='law'>art. 24–25 MMFR</span></h4><p>Krótkoterminowy MMF: WAM ≤ 60 dni, WAL ≤ 120 dni. Standardowy MMF: WAM ≤ 6 miesięcy, WAL ≤ 12 miesięcy.</p></div>" +
              "<div class='rule'><h4>Dywersyfikacja <span class='law'>art. 17 MMFR</span></h4><p>Co do zasady maks. 5% aktywów w MMI jednego emitenta. Wyjątek: do 100% w MMI emitentów publicznych, za zgodą nadzorcy, przy co najmniej 6 emisjach i maks. 30% w jednej emisji.</p></div>" +
              "<div class='rule'><h4>Ocena jakości kredytowej <span class='law'>art. 19–20 MMFR</span></h4><p>Wewnętrzna procedura oceny jakości kredytowej, bez mechanicznego polegania na ratingach.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Limity według dokumentów AIF; bony często traktowane jako ekwiwalent gotówki.</li>" +
              "<li>Rozp. 231/2013: przy obliczaniu dźwigni metodą brutto gotówkę i ekwiwalenty gotówki o wysokiej płynności można wyłączyć, jeśli spełniają warunki art. 7 rozporządzenia: są w walucie bazowej, łatwo zamienialne na znaną kwotę gotówki, z nieistotnym ryzykiem zmiany wartości i z dochodem nie wyższym niż rentowność 3-miesięcznych obligacji skarbowych wysokiej jakości.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — raporty transakcyjne po stronie firmy inwestycyjnej.</li>" +
              "<li><strong>SFTR</strong> — przy użyciu w repo lub pożyczkach papierów.</li>" +
              "<li><strong>MMFR</strong> — kwartalne (dla małych funduszy roczne) raporty MMF do nadzorcy.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> emisji, <strong>LEI</strong> emitenta.</li>" +
              "<li><strong>CFI</strong> — <code>D</code> (Debt), grupa <code>Y</code> (Money market instruments).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Kwalifikacja jako MMI (termin ≤ 397 dni, płynność, wycena).</li>" +
              "<li>Emitent publiczny — limit 35% / art. 54; poza koszykiem 40%.</li>" +
              "<li>W MMF: WAM, WAL, dywersyfikacja, wymogi płynności dziennej i tygodniowej.</li>" +
              "<li>Konwencja rentowności (ACT/360 vs stopa dyskonta) poprawnie zmapowana w systemie wyceny.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Discount instrument", "Instrument bez kuponu, kupowany poniżej nominału."],
        ["Money market yield", "Rentowność liczona od ceny zakupu, zwykle ACT/360."],
        ["Discount rate", "Stopa dyskonta liczona od nominału (konwencja USA)."],
        ["WAM / WAL", "Weighted Average Maturity / Weighted Average Life — średni ważony termin do zapadalności / do spłaty kapitału."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A treasury bill is a short-term government debt security (up to one year), usually with no coupon. It is bought below nominal (at a discount), and the full nominal is paid at maturity. The difference is the investor's return. It is the core liquidity instrument for funds and money market funds.",
      keyFacts: [
        ["Issuer", "State treasury or debt agency (e.g. Bubill — Germany, BTF — France, BOT — Italy, T-Bill — US)."],
        ["Maturity", "Usually 1–12 months (e.g. 3, 6, 12 months)."],
        ["Interest", "Discount basis — no coupon, return = nominal − purchase price."],
        ["Market", "Primary: auctions. Secondary: OTC between dealers."],
        ["Settlement", "EU: usually T+2; DvP at the CSD."],
        ["Classification", "Money market instrument (MMI)."],
        ["CFI code", "<code>DY****</code> (Debt – Money market instruments)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>A Treasury Bill is the simplest debt instrument: the state borrows for a short period and repays the nominal on a set date. There are no coupons — the return comes only from the purchase price being below nominal.</p>" +
            "<p>In the euro area the price is usually calculated from the money market yield (ACT/360):</p>" +
            "<p class='formula'>Price = nominal / (1 + yield × days / 360)</p>" +
            "<p>In the US a discount rate is quoted: price = nominal × (1 − d × days / 360). The same trade therefore gives different numbers depending on the convention — check this when comparing.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Auction.</strong> The debt agency announces the offering, dealers bid yields or prices, and the issuer accepts the best bids.</li>" +
              "<li><strong>Purchase.</strong> The fund buys at auction (through a dealer) or in the secondary market, paying the discounted price.</li>" +
              "<li><strong>Holding.</strong> Value accretes towards nominal over time. Rate changes have only a small effect on price because duration is short.</li>" +
              "<li><strong>Redemption.</strong> At maturity the CSD pays the nominal.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A fund (NAV EUR 200m) places surplus liquidity in a 6-month (182-day) treasury bill: EUR 10m nominal, 2.40% yield (ACT/360).</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Amount</th></tr></thead><tbody>" +
              "<tr><td>Purchase price</td><td>10,000,000 / (1 + 2.40% × 182/360)</td><td class='num'>EUR 9,880,121.20</td></tr>" +
              "<tr><td>Return to maturity (discount)</td><td>10,000,000 − 9,880,121.20</td><td class='num'>EUR 119,878.80</td></tr>" +
              "<tr><td>Share of NAV</td><td>9.88 / 200</td><td class='num'>≈ 4.9%</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>A bill issued by a Member State benefits from the <strong>35% limit</strong> (Art. 52(3)) or — with approval and at least 6 issues — up to 100% of NAV (Art. 54). It does not enter the 40% bucket.</li>" +
              "<li>In a money market fund (MMF) the bill affects the portfolio's weighted average maturity (WAM) and weighted average life (WAL) — both are limited under the MMFR.</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> market price or — if the valuation policy allows — a model from the current money market curve. Amortised cost is allowed in MMFs only in limited cases (MMFR).</p>" +
            "<ul>" +
              "<li><strong>Sovereign credit risk</strong> — usually low.</li>" +
              "<li><strong>Interest rate risk</strong> — small given the short maturity.</li>" +
              "<li><strong>Reinvestment risk</strong> — rates may be lower at maturity.</li>" +
              "<li><strong>FX risk</strong> — for bills in a currency other than the base currency.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Purchase at auction or in the secondary market, DvP settlement.</li>" +
              "<li>Possible use in repo (popular collateral).</li>" +
              "<li>Redemption and reinvestment (rolling liquidity).</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>MMI eligibility <span class='law'>Art. 50(1)(a)–(d), (h) UCITS; Art. 3–4 Dir. 2007/16/EC</span></h4><p>Money market instruments have a maturity (at issue or residual) of up to 397 days, or a regular yield adjustment at least every 397 days, and are liquid with a reliable valuation. Bills issued by Member States also meet the issuer condition in point (h).</p></div>" +
              "<div class='rule'><h4>35% / 100% limit <span class='law'>Art. 52(3), Art. 54</span></h4><p>As for government bonds; outside the 40% bucket.</p></div>" +
              "<div class='rule'><h4>Acquisition limit <span class='law'>Art. 56(3)</span></h4><p>The 10% limit on an issuer's money market instruments does not apply to public issuers.</p></div>" +
            "</div>"
        },
        {
          id: "mmf", title: "Money market funds (MMFR)",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Instrument maturity <span class='law'>Art. 10 MMFR</span></h4><p>Short-term MMF: MMI residual maturity ≤ 397 days. Standard MMF: up to 2 years, provided the yield resets at least every 397 days.</p></div>" +
              "<div class='rule'><h4>WAM and WAL <span class='law'>Art. 24–25 MMFR</span></h4><p>Short-term MMF: WAM ≤ 60 days, WAL ≤ 120 days. Standard MMF: WAM ≤ 6 months, WAL ≤ 12 months.</p></div>" +
              "<div class='rule'><h4>Diversification <span class='law'>Art. 17 MMFR</span></h4><p>As a rule max 5% of assets in MMIs of one issuer. Exception: up to 100% in MMIs of public issuers, with regulatory approval, at least 6 issues and max 30% in one issue.</p></div>" +
              "<div class='rule'><h4>Credit quality assessment <span class='law'>Art. 19–20 MMFR</span></h4><p>Internal credit quality assessment procedure, without mechanistic reliance on ratings.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>Limits per the AIF's documents; bills are often treated as cash equivalents.</li>" +
              "<li>Reg. 231/2013: under the gross method, cash and highly liquid cash equivalents may be excluded if they meet the Art. 7 conditions: held in the base currency, readily convertible to a known amount of cash, subject to an insignificant risk of change in value, and providing a return no greater than a high-quality 3-month government bond.</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — transaction reports by the investment firm.</li>" +
              "<li><strong>SFTR</strong> — when used in repo or securities lending.</li>" +
              "<li><strong>MMFR</strong> — quarterly (annual for small funds) MMF reports to the regulator.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li>Issue <strong>ISIN</strong>, issuer <strong>LEI</strong>.</li>" +
              "<li><strong>CFI</strong> — <code>D</code> (Debt), group <code>Y</code> (Money market instruments).</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>Qualifies as an MMI (maturity ≤ 397 days, liquidity, valuation).</li>" +
              "<li>Public issuer — 35% / Art. 54 limit; outside the 40% bucket.</li>" +
              "<li>In an MMF: WAM, WAL, diversification, daily and weekly liquidity requirements.</li>" +
              "<li>Yield convention (ACT/360 vs discount rate) correctly mapped in the pricing system.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Discount instrument", "Instrument with no coupon, bought below nominal."],
        ["Money market yield", "Yield calculated on the purchase price, usually ACT/360."],
        ["Discount rate", "Rate calculated on the nominal (US convention)."],
        ["WAM / WAL", "Weighted Average Maturity / Weighted Average Life."]
      ]
    }
  }
});

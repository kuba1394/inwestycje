window.INSTRUMENTS.push({
  id: "money-market-fund",
  name: "Money Market Fund",
  aliases: ["MMF", "LVNAV", "CNAV", "VNAV", "Short Term Investment Fund", "STIF", "Cash Fund", "fundusz rynku pieniężnego"],
  market: "otc",
  asset: { pl: "Fundusze", en: "Funds" },
  sources: ["mmfr", "ucits", "esma2014"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Fundusz rynku pieniężnego inwestuje w bardzo krótkie, wysokiej jakości instrumenty: bony skarbowe, commercial paper, certyfikaty depozytowe, depozyty i reverse repo. Służy do parkowania gotówki. W UE każdy taki fundusz musi spełniać rozporządzenie MMFR (2017/1131), które określa jego typ, limity i bufory płynności.",
      keyFacts: [
        ["Typy w UE (MMFR)", "Public debt CNAV, LVNAV, VNAV krótkoterminowy, VNAV standardowy."],
        ["Typy w USA (Rule 2a-7)", "Government, prime, tax-exempt (municipal)."],
        ["Cena jednostki", "CNAV: stała (np. 1,00); LVNAV: stała z pasmem ±20 pb; VNAV: zmienna."],
        ["Płynność", "Zwykle T+0 lub T+1."],
        ["W portfelu UCITS", "Jednostki funduszu (art. 55), nie gotówka."],
        ["STIF", "Short Term Investment Fund — fundusz gotówkowy banku-custodiana (sweep), zwykle w USA."]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Money Market Fund</em> (MMF) to fundusz, którego celem jest zachowanie wartości kapitału i płynność przy dochodzie zbliżonym do stóp rynku pieniężnego. W UE każdy fundusz, który inwestuje w krótkoterminowe aktywa i ma taki cel, musi uzyskać zezwolenie jako MMF według MMFR.</p>
<p>Typy według MMFR:</p>
<ul>
<li><strong>Public debt CNAV</strong> — min. 99,5% w instrumentach dłużnych państw i instytucji publicznych; stała cena jednostki.</li>
<li><strong>LVNAV</strong> (low volatility NAV) — stała cena, o ile wycena rynkowa nie odbiega od niej o więcej niż 20 pb.</li>
<li><strong>VNAV</strong> — zmienna cena; krótkoterminowy albo standardowy (dłuższe terminy).</li>
</ul>
<p>W systemach amerykańskich spotyka się też podział na fundusze <em>taxable</em> i <em>tax-exempt</em> (inwestujące w zwolnione z podatku papiery municypalne) oraz <em>STIF</em> — wspólne fundusze krótkoterminowe banków-custodianów, do których trafia automatycznie wolna gotówka.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Wpłata.</strong> Fundusz inwestujący składa zlecenie, często tego samego dnia (T+0) przed godziną odcięcia.</li>
<li><strong>Inwestycja.</strong> MMF kupuje instrumenty o krótkich terminach i utrzymuje bufory płynności dziennej i tygodniowej.</li>
<li><strong>Dochód.</strong> W CNAV i LVNAV dochód jest naliczany dziennie i wypłacany lub kapitalizowany; w VNAV odzwierciedla go wzrost ceny jednostki.</li>
<li><strong>Umorzenie.</strong> Wypłata zwykle T+0 lub T+1. Przy spadku płynności tygodniowej poniżej progów zarząd LVNAV/CNAV ocenia zastosowanie opłat, limitów umorzeń lub zawieszenia (art. 34 MMFR).</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>UCITS (NAV 80 mln EUR) trzyma 6 mln EUR na rachunku bieżącym i 18 mln EUR w jednym LVNAV MMF, traktując je w raporcie wewnętrznym jako „gotówkę”.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Test</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>MMF jako fundusz (art. 55 ust. 1)</td><td>18 / 80</td><td class='num'>22,5% &gt; 20%</td></tr>
<tr><td>Rachunek bieżący (płynne aktywa pomocnicze)</td><td>6 / 80</td><td class='num'>7,5%</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Jednostki MMF nie są gotówką ani depozytem — podlegają limitom funduszy (20% na fundusz). Tu jest przekroczenie o 2,5 pkt proc.</li>
<li>Rozłożenie gotówki na dwa MMF albo przeniesienie części do depozytów usuwa problem.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> cena jednostki publikowana przez MMF (CNAV/LVNAV stała, VNAV zmienna).</p>
<ul>
<li><strong>Ryzyko kredytowe</strong> emitentów instrumentów w portfelu MMF.</li>
<li><strong>Ryzyko płynności i runu</strong> — w marcu 2020 r. fundusze LVNAV miały duże odpływy (lekcja na stronie historii).</li>
<li><strong>Ryzyko „złamania” stałej ceny</strong> (CNAV/LVNAV).</li>
<li><strong>Ryzyko stopy procentowej</strong> — niewielkie przy krótkich terminach.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Wpłata i umorzenie (często dziennie).</li>
<li>Dzienne naliczanie dochodu (dywidenda dzienna w CNAV/LVNAV).</li>
<li>Przy ujemnych stopach — mechanizmy umarzania jednostek lub zmienna cena.</li>
<li>Zmiana typu funduszu, połączenie, likwidacja.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Inwestycja UCITS w MMF <span class='law'>art. 50 ust. 1 lit. e, art. 55</span></h4><p>Jak każdy fundusz: maks. 20% NAV w jednym MMF, 30% łącznie dla MMF niebędących UCITS, 25% jednostek.</p></div>
<div class='rule'><h4>Reinwestycja zabezpieczenia gotówkowego <span class='law'>ESMA/2014/937</span></h4><p>Dozwolona tylko w krótkoterminowe MMF (obok depozytów, obligacji skarbowych wysokiej jakości i reverse repo).</p></div>
<div class='rule'><h4>Gdy sam fundusz jest MMF <span class='law'>MMFR art. 17, 24, 25</span></h4><p>MMFR zastępuje limity art. 52 UCITS: 5% na emitenta MMI (10% dla VNAV, z koszykiem 40%), 10% depozytów w jednym banku, bufory płynności (krótkoterminowe: dzienne ≥ 10%, tygodniowe ≥ 30%), WAM i WAL.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>AIF może być MMF (MMFR obowiązuje niezależnie od tego, czy fundusz jest UCITS czy AIF).</li>
<li>Jednostki MMF w AIF — limity według statutu; w raportach Annex IV jako inwestycja w fundusz.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>MMF raportuje kwartalnie do nadzorcy (MMFR art. 37), małe MMF rocznie.</li>
<li>Fundusz inwestujący — bez raportów EMIR/SFTR dla jednostek; jeśli jednostki MMF służą jako zabezpieczenie w SFT, raportuje się je w polach zabezpieczenia SFTR.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li><strong>ISIN</strong> klasy jednostek, <strong>LEI</strong> funduszu.</li>
<li><strong>CFI</strong> zaczyna się od <code>C</code>.</li>
<li>W danych referencyjnych zapisz typ MMFR (CNAV/LVNAV/VNAV, krótkoterminowy/standardowy) — od niego zależy np. dopuszczalność do reinwestycji zabezpieczeń.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>MMF ujęty jako fundusz, a nie gotówka — limity art. 55.</li>
<li>Typ MMFR zgodny z polityką (np. tylko krótkoterminowe MMF dla reinwestycji zabezpieczeń).</li>
<li>Rozproszenie między kilka MMF przy dużej gotówce.</li>
<li>Fundusze spoza UE (US 2a-7, STIF) — spełnienie art. 50 ust. 1 lit. e.</li>
</ul>`
        }
      ],
      glossary: [
        ["CNAV / LVNAV / VNAV", "Typy MMF: stała cena (dług publiczny), stała cena z pasmem 20 pb, zmienna cena."],
        ["WAM / WAL", "Średni ważony termin do zapadalności (lub zmiany stopy) i średni ważony termin życia portfela."],
        ["Sweep", "Automatyczne przenoszenie wolnej gotówki do funduszu gotówkowego (STIF)."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "A money market fund invests in very short, high-quality instruments: treasury bills, commercial paper, certificates of deposit, deposits and reverse repos. It is used to park cash. In the EU every such fund must comply with the MMF Regulation (2017/1131), which sets its type, limits and liquidity buffers.",
      keyFacts: [
        ["EU types (MMFR)", "Public debt CNAV, LVNAV, short-term VNAV, standard VNAV."],
        ["US types (Rule 2a-7)", "Government, prime, tax-exempt (municipal)."],
        ["Unit price", "CNAV: constant (e.g. 1.00); LVNAV: constant within a ±20 bp band; VNAV: variable."],
        ["Liquidity", "Usually T+0 or T+1."],
        ["In a UCITS portfolio", "Fund units (Art. 55), not cash."],
        ["STIF", "Short Term Investment Fund — a custodian bank's cash sweep fund, mostly in the US."]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Money Market Fund</em> (MMF) aims to preserve capital and liquidity while earning close to money-market rates. In the EU any fund that invests in short-term assets with that objective must be authorised as an MMF under the MMFR.</p>
<p>MMFR types:</p>
<ul>
<li><strong>Public debt CNAV</strong> — at least 99.5% in public debt instruments; constant unit price.</li>
<li><strong>LVNAV</strong> (low volatility NAV) — constant price, as long as the market valuation does not deviate from it by more than 20 bp.</li>
<li><strong>VNAV</strong> — variable price; short-term or standard (longer maturities).</li>
</ul>
<p>US-style systems also split funds into <em>taxable</em> and <em>tax-exempt</em> (investing in tax-exempt municipal paper), and use <em>STIF</em> — custodian banks' collective short-term funds that automatically receive idle cash.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Subscription.</strong> The investing fund places an order, often same-day (T+0) before the cut-off.</li>
<li><strong>Investment.</strong> The MMF buys short-dated instruments and keeps daily and weekly liquidity buffers.</li>
<li><strong>Income.</strong> In CNAV and LVNAV funds income accrues daily and is paid out or reinvested; in VNAV funds it shows in a rising unit price.</li>
<li><strong>Redemption.</strong> Usually paid T+0 or T+1. If weekly liquidity falls below thresholds, the board of an LVNAV/CNAV fund assesses fees, gates or suspension (MMFR Art. 34).</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A UCITS (NAV EUR 80m) holds EUR 6m on a current account and EUR 18m in a single LVNAV MMF, reported internally as "cash".</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Test</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>MMF as a fund (Art. 55(1))</td><td>18 / 80</td><td class='num'>22.5% &gt; 20%</td></tr>
<tr><td>Current account (ancillary liquid assets)</td><td>6 / 80</td><td class='num'>7.5%</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>MMF units are neither cash nor a deposit — fund limits apply (20% per fund). Here the breach is 2.5 percentage points.</li>
<li>Splitting the cash across two MMFs or moving part of it to deposits solves it.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> the unit price published by the MMF (constant for CNAV/LVNAV, variable for VNAV).</p>
<ul>
<li><strong>Credit risk</strong> of issuers in the MMF portfolio.</li>
<li><strong>Liquidity and run risk</strong> — in March 2020 LVNAV funds saw large outflows (see the history page).</li>
<li><strong>Risk of "breaking" the constant price</strong> (CNAV/LVNAV).</li>
<li><strong>Interest rate risk</strong> — small given short maturities.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Subscription and redemption (often daily).</li>
<li>Daily income accrual (daily dividend in CNAV/LVNAV).</li>
<li>With negative rates — unit cancellation mechanisms or a variable price.</li>
<li>Change of fund type, merger, liquidation.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>A UCITS investing in an MMF <span class='law'>Art. 50(1)(e), Art. 55</span></h4><p>As for any fund: max 20% of NAV in one MMF, 30% in aggregate for non-UCITS MMFs, 25% of units.</p></div>
<div class='rule'><h4>Reinvestment of cash collateral <span class='law'>ESMA/2014/937</span></h4><p>Allowed only in short-term MMFs (alongside deposits, high-quality government bonds and reverse repos).</p></div>
<div class='rule'><h4>When the fund itself is an MMF <span class='law'>MMFR Art. 17, 24, 25</span></h4><p>The MMFR replaces UCITS Art. 52: 5% per MMI issuer (10% for VNAV, with a 40% bucket), 10% of deposits per bank, liquidity buffers (short-term: daily ≥ 10%, weekly ≥ 30%), WAM and WAL.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>An AIF can be an MMF (the MMFR applies whether the fund is a UCITS or an AIF).</li>
<li>MMF units in an AIF — limits per its rules; in Annex IV reports as an investment in a fund.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>An MMF reports quarterly to its supervisor (MMFR Art. 37), small MMFs annually.</li>
<li>Investing fund — no EMIR/SFTR reports for the units; where MMF units are used as collateral in an SFT, they are reported in the SFTR collateral fields.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li><strong>ISIN</strong> of the share class, fund <strong>LEI</strong>.</li>
<li><strong>CFI</strong> starts with <code>C</code>.</li>
<li>Record the MMFR type (CNAV/LVNAV/VNAV, short-term/standard) in reference data — eligibility for collateral reinvestment, for example, depends on it.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>MMF booked as a fund, not cash — Art. 55 limits.</li>
<li>MMFR type in line with policy (e.g. only short-term MMFs for collateral reinvestment).</li>
<li>Spread across several MMFs when cash is large.</li>
<li>Non-EU funds (US 2a-7, STIF) — Art. 50(1)(e) compliance.</li>
</ul>`
        }
      ],
      glossary: [
        ["CNAV / LVNAV / VNAV", "MMF types: constant price (public debt), constant price within a 20 bp band, variable price."],
        ["WAM / WAL", "Weighted average maturity (or time to rate reset) and weighted average life of the portfolio."],
        ["Sweep", "Automatic transfer of idle cash into a cash fund (STIF)."]
      ]
    }
  }
});

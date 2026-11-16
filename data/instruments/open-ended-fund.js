window.INSTRUMENTS.push({
  id: "open-ended-fund",
  name: "Open-Ended Investment Fund",
  aliases: ["Mutual Fund", "UCITS Fund", "OEIC", "SICAV", "Unit Investment Trust", "FIO", "fundusz otwarty"],
  market: "otc",
  asset: { pl: "Fundusze", en: "Funds" },
  sources: ["ucits", "eligible", "aifmd", "aifmd2"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Fundusz otwarty zbywa i odkupuje jednostki na żądanie inwestora po cenie równej wartości aktywów netto (NAV) na jednostkę. Jednostek nie kupuje się na giełdzie, tylko składa zlecenie u agenta transferowego lub przez platformę funduszową. To najczęstsza pozycja „funduszowa” w portfelach funduszy funduszy.",
      keyFacts: [
        ["Forma", "Fundusz kontraktowy (FCP, unit trust), spółka (SICAV, OEIC) lub w Polsce FIO/SFIO."],
        ["Cena", "NAV na jednostkę z dnia wyceny (forward pricing — cena nieznana w chwili zlecenia)."],
        ["Płynność", "Zbywanie i odkupywanie codziennie lub z inną częstotliwością (tygodniowo, miesięcznie)."],
        ["Rozliczenie", "Przez agenta transferowego; zwykle T+1 do T+3 po dniu wyceny."],
        ["Klasyfikacja w UCITS", "Jednostki funduszu — art. 50 ust. 1 lit. e, limity art. 55 i 56."],
        ["Kod CFI", "<code>C</code> — Collective investment vehicles (np. <code>CI…</code>)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Open-Ended Investment Fund</em> zbiera wpłaty wielu inwestorów i inwestuje je zgodnie z polityką inwestycyjną. Liczba jednostek nie jest stała: rośnie przy wpłatach i maleje przy umorzeniach.</p>
<p>W UE większość funduszy otwartych dla klientów detalicznych to <strong>UCITS</strong>. Pozostałe to AIF otwarte (np. fundusze nieruchomości, hedge funds). W USA odpowiednikiem są <em>mutual funds</em>, a <em>Unit Investment Trust</em> (UIT) to amerykański fundusz o stałym, niezarządzanym aktywnie portfelu, którego jednostki też można odkupić.</p>
<p class='formula'>NAV na jednostkę = (aktywa − zobowiązania) / liczba jednostek</p>
<p>Różnica względem <a href='#/i/exchange-traded-fund'>ETF</a> i <a href='#/i/closed-end-fund'>funduszu zamkniętego</a>: jednostki funduszu otwartego nie są notowane — kupuje się je i umarza bezpośrednio w funduszu po NAV.</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Zlecenie.</strong> Fundusz inwestujący składa zlecenie nabycia (kwotowe lub na liczbę jednostek) przez agenta transferowego albo platformę (np. Clearstream Vestima, Allfunds, Euroclear FundSettle) przed godziną odcięcia (cut-off).</li>
<li><strong>Wycena.</strong> Fundusz docelowy liczy NAV na dzień wyceny. Cena jest nieznana w chwili zlecenia (forward pricing).</li>
<li><strong>Przydział.</strong> Agent przydziela jednostki i wysyła potwierdzenie (contract note).</li>
<li><strong>Rozrachunek.</strong> Płatność i zapis jednostek w rejestrze, zwykle T+1–T+3.</li>
<li><strong>Umorzenie.</strong> Analogicznie — zlecenie, NAV, wypłata. W stresie fundusz może zawiesić umorzenia lub zastosować inne narzędzie płynności (gates, swing pricing).</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>UCITS (NAV 100 mln EUR) ma 18 mln EUR w funduszu A (UCITS) i 22 mln EUR w trzech AIF otwartych spełniających art. 50 ust. 1 lit. e. Zarządzający chce dokupić A za 3 mln EUR.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Test</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Fundusz A po zakupie (art. 55 ust. 1)</td><td>21 / 100</td><td class='num'>21% &gt; 20%</td></tr>
<tr><td>Fundusze inne niż UCITS (art. 55 ust. 2)</td><td>22 / 100</td><td class='num'>22% ≤ 30%</td></tr>
<tr><td>Maksymalny zakup A</td><td>20 − 18</td><td class='num'>2 mln EUR</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Zakup 3 mln EUR spowodowałby przekroczenie aktywne. Limit 20% sprawdza się przy wycenie z dnia transakcji, ale NAV docelowy poznaje się dopiero po wycenie — trzeba zostawić bufor.</li>
<li>Sprawdź też limit 25% jednostek funduszu A (art. 56 ust. 2 lit. c) — przy małym funduszu docelowym może być ograniczeniem wcześniej niż 20% NAV.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> ostatni opublikowany NAV funduszu docelowego (przy rzadkiej wycenie — NAV opóźniony).</p>
<ul>
<li><strong>Ryzyko rynkowe</strong> aktywów funduszu docelowego.</li>
<li><strong>Ryzyko płynności</strong> — niedopasowanie częstotliwości umorzeń (np. fundusz dzienny inwestuje w fundusz miesięczny), zawieszenie umorzeń.</li>
<li><strong>Ryzyko operacyjne</strong> — godziny odcięcia, błędy w zleceniach, opóźnione potwierdzenia.</li>
<li><strong>Podwójne opłaty</strong> — opłaty funduszu inwestującego i docelowego.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Zlecenie, wycena, przydział i rozrachunek.</li>
<li>Dystrybucja dochodu (klasy dystrybucyjne) albo jego kapitalizacja (klasy akumulacyjne).</li>
<li>Zmiany prospektu, połączenia funduszy (art. 37 i nast. UCITS), zmiana klasy jednostek.</li>
<li>Zawieszenie umorzeń lub likwidacja funduszu docelowego.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. e</span></h4><p>Jednostki UCITS albo innych funduszy otwartych, które: podlegają nadzorowi równoważnemu, dają ochronę uczestników równoważną UCITS (zasady rozdziału aktywów, pożyczek, niekrytej sprzedaży), publikują sprawozdania półroczne i roczne, a według dokumentów mogą inwestować maks. 10% w inne fundusze.</p></div>
<div class='rule'><h4>Limity <span class='law'>art. 55</span></h4><p>Maks. 20% NAV w jednym funduszu; łącznie maks. 30% NAV w funduszach innych niż UCITS. Subfundusz liczy się osobno.</p></div>
<div class='rule'><h4>Limit nabycia <span class='law'>art. 56 ust. 2 lit. c</span></h4><p>Maks. 25% jednostek jednego funduszu docelowego.</p></div>
<div class='rule'><h4>Fundusze z tej samej grupy <span class='law'>art. 55 ust. 3</span></h4><p>Bez opłat za zbycie i odkupienie jednostek.</p></div>
<div class='rule'><h4>Płynne aktywa pomocnicze</h4><p>Jednostki funduszy, także rynku pieniężnego, nie są gotówką — to inwestycja w fundusz.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limity inwestycji w inne fundusze wynikają ze statutu AIF i prawa krajowego.</li>
<li>Ekspozycja i dźwignia: AIF uwzględnia ekspozycję funduszy docelowych, które kontroluje lub które stworzono w celu zwiększenia jego ekspozycji (rozp. 231/2013 art. 7–8).</li>
<li>Zarządzanie płynnością (art. 16 AIFMD): dopasuj warunki umorzeń funduszy docelowych do warunków umorzeń AIF.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li>Brak raportów EMIR i SFTR dla samych jednostek.</li>
<li>Sprawozdania funduszu: lista funduszy docelowych i maksymalny poziom opłat zarządzających (art. 55 ust. 3 UCITS).</li>
<li>Annex IV (AIF) — pozycje w funduszach docelowych.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li><strong>ISIN</strong> klasy jednostek (każda klasa ma własny ISIN), <strong>LEI</strong> funduszu lub subfunduszu.</li>
<li><strong>CFI</strong> zaczyna się od <code>C</code>; drugi znak opisuje rodzaj (np. <code>CI</code> — fundusze standardowe).</li>
<li>Przy limitach liczy się subfundusz, a nie klasa jednostek — zsumuj wszystkie klasy tego samego subfunduszu.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>UCITS czy AIF? Udokumentowane spełnienie art. 50 ust. 1 lit. e dla funduszy innych niż UCITS.</li>
<li>Limit 20% na fundusz, 30% łącznie dla funduszy innych niż UCITS, 25% jednostek.</li>
<li>Agregacja klas jednostek tego samego subfunduszu.</li>
<li>Limit 10% inwestycji w inne fundusze po stronie funduszu docelowego.</li>
<li>Częstotliwość umorzeń vs płynność funduszu inwestującego.</li>
<li>Zwrot opłat (rebates) przypisany funduszowi.</li>
</ul>`
        }
      ],
      glossary: [
        ["Forward pricing", "Wycena zlecenia po NAV ustalonym po godzinie odcięcia, nieznanym w chwili zlecenia."],
        ["Cut-off", "Godzina graniczna przyjmowania zleceń na dany dzień wyceny."],
        ["Transfer agent", "Agent transferowy — prowadzi rejestr uczestników i realizuje zlecenia."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An open-ended fund issues and redeems units at the investor's request at a price equal to net asset value (NAV) per unit. Units are not bought on an exchange — orders go to a transfer agent or a fund platform. It is the most common fund holding in fund-of-funds portfolios.",
      keyFacts: [
        ["Form", "Contractual fund (FCP, unit trust), company (SICAV, OEIC) or, in Poland, FIO/SFIO."],
        ["Price", "NAV per unit on the dealing day (forward pricing — price unknown when ordering)."],
        ["Liquidity", "Subscriptions and redemptions daily or at another frequency (weekly, monthly)."],
        ["Settlement", "Via the transfer agent; usually T+1 to T+3 after the dealing day."],
        ["UCITS classification", "Fund units — Art. 50(1)(e), limits in Art. 55 and 56."],
        ["CFI code", "<code>C</code> — Collective investment vehicles (e.g. <code>CI…</code>)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>An <em>Open-Ended Investment Fund</em> pools money from many investors and invests it according to its investment policy. The number of units is not fixed: it grows with subscriptions and falls with redemptions.</p>
<p>In the EU most open-ended retail funds are <strong>UCITS</strong>. The others are open-ended AIFs (e.g. property funds, hedge funds). In the US the equivalent is a <em>mutual fund</em>, while a <em>Unit Investment Trust</em> (UIT) is a US fund with a fixed, unmanaged portfolio whose units can also be redeemed.</p>
<p class='formula'>NAV per unit = (assets − liabilities) / number of units</p>
<p>Difference from an <a href='#/i/exchange-traded-fund'>ETF</a> and a <a href='#/i/closed-end-fund'>closed-end fund</a>: open-ended fund units are not listed — they are bought and redeemed directly with the fund at NAV.</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Order.</strong> The investing fund places a subscription order (by amount or number of units) with the transfer agent or a platform (e.g. Clearstream Vestima, Allfunds, Euroclear FundSettle) before the cut-off time.</li>
<li><strong>Valuation.</strong> The target fund calculates NAV for the dealing day. The price is unknown when the order is placed (forward pricing).</li>
<li><strong>Allocation.</strong> The agent allocates units and sends a confirmation (contract note).</li>
<li><strong>Settlement.</strong> Payment and registration of units, usually T+1–T+3.</li>
<li><strong>Redemption.</strong> The same way — order, NAV, payment. Under stress the fund may suspend redemptions or use another liquidity tool (gates, swing pricing).</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A UCITS (NAV EUR 100m) holds EUR 18m in fund A (a UCITS) and EUR 22m in three open-ended AIFs meeting Art. 50(1)(e). The manager wants to buy another EUR 3m of A.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Test</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Fund A after the purchase (Art. 55(1))</td><td>21 / 100</td><td class='num'>21% &gt; 20%</td></tr>
<tr><td>Non-UCITS funds (Art. 55(2))</td><td>22 / 100</td><td class='num'>22% ≤ 30%</td></tr>
<tr><td>Maximum purchase of A</td><td>20 − 18</td><td class='num'>EUR 2m</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>A EUR 3m purchase would cause an active breach. The 20% limit is checked at trade-date valuation, but the target NAV is only known after valuation — leave a buffer.</li>
<li>Also check the 25% of units limit for fund A (Art. 56(2)(c)) — with a small target fund it may bind before 20% of NAV.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> the target fund's last published NAV (with infrequent dealing — a lagged NAV).</p>
<ul>
<li><strong>Market risk</strong> of the target fund's assets.</li>
<li><strong>Liquidity risk</strong> — mismatched dealing frequency (e.g. a daily fund investing in a monthly fund), suspension of redemptions.</li>
<li><strong>Operational risk</strong> — cut-off times, order errors, late confirmations.</li>
<li><strong>Layered fees</strong> — fees of the investing and the target fund.</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Order, valuation, allocation and settlement.</li>
<li>Income distribution (distributing classes) or accumulation (accumulating classes).</li>
<li>Prospectus changes, fund mergers (UCITS Art. 37 et seq.), share class conversions.</li>
<li>Suspension of redemptions or liquidation of the target fund.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(e)</span></h4><p>Units of UCITS or of other open-ended funds that: are subject to equivalent supervision, give unitholder protection equivalent to UCITS (rules on segregation, borrowing, uncovered sales), publish half-yearly and annual reports, and under their documents may invest at most 10% in other funds.</p></div>
<div class='rule'><h4>Limits <span class='law'>Art. 55</span></h4><p>Max 20% of NAV in one fund; non-UCITS funds max 30% of NAV in aggregate. Each sub-fund counts separately.</p></div>
<div class='rule'><h4>Acquisition limit <span class='law'>Art. 56(2)(c)</span></h4><p>Max 25% of the units of one target fund.</p></div>
<div class='rule'><h4>Funds of the same group <span class='law'>Art. 55(3)</span></h4><p>No subscription or redemption fees.</p></div>
<div class='rule'><h4>Ancillary liquid assets</h4><p>Fund units, including money market funds, are not cash — they are an investment in a fund.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Limits on investing in other funds come from the AIF's rules and national law.</li>
<li>Exposure and leverage: the AIF includes the exposure of target funds it controls or that were set up to increase its exposure (Reg. 231/2013 Art. 7–8).</li>
<li>Liquidity management (AIFMD Art. 16): align the target funds' redemption terms with the AIF's own.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li>No EMIR or SFTR reports for the units themselves.</li>
<li>Fund reports: list of target funds and the maximum management fee level (UCITS Art. 55(3)).</li>
<li>Annex IV (AIF) — positions in target funds.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li><strong>ISIN</strong> of the share class (each class has its own ISIN), <strong>LEI</strong> of the fund or sub-fund.</li>
<li><strong>CFI</strong> starts with <code>C</code>; the second letter gives the type (e.g. <code>CI</code> — standard funds).</li>
<li>Limits apply per sub-fund, not per share class — add up all classes of the same sub-fund.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>UCITS or AIF? Documented compliance with Art. 50(1)(e) for non-UCITS funds.</li>
<li>20% per fund, 30% aggregate for non-UCITS funds, 25% of units.</li>
<li>Aggregation of share classes of the same sub-fund.</li>
<li>The target fund's 10% limit on investing in other funds.</li>
<li>Redemption frequency vs the investing fund's liquidity.</li>
<li>Fee rebates credited to the fund.</li>
</ul>`
        }
      ],
      glossary: [
        ["Forward pricing", "Dealing at a NAV set after the cut-off, unknown when the order is placed."],
        ["Cut-off", "The deadline for orders for a given dealing day."],
        ["Transfer agent", "Keeps the register of unitholders and processes orders."]
      ]
    }
  }
});

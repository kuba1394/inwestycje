window.INSTRUMENTS.push({
  id: "currency-future",
  name: "Currency Future",
  aliases: ["FX Future", "Euro FX Future", "Currency Future Spread", "kontrakt terminowy na walutę", "FEUR"],
  market: "exchange",
  asset: { pl: "Derywaty giełdowe", en: "Listed derivatives" },
  sources: ["ucits", "cesr10788", "esmaShare", "emir"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "Giełdowy odpowiednik FX forward: standaryzowany kontrakt na wymianę określonej kwoty jednej waluty na drugą w przyszłym terminie. Rozlicza się przez izbę rozliczeniową, z codziennym depozytem, więc nie ma bilateralnego ryzyka kontrahenta. Przykłady: kontrakty Euro FX na CME (125 000 EUR), kontrakty EUR/PLN na GPW (10 000 EUR).",
      keyFacts: [
        ["Wielkość kontraktu", "Stała (np. CME Euro FX — 125 000 EUR; GPW — 10 000 EUR)."],
        ["Terminy", "Kwartalne (marzec, czerwiec, wrzesień, grudzień), czasem miesięczne."],
        ["Cena", "Wynika z parytetu stóp procentowych, jak kurs terminowy."],
        ["Rozliczenie", "Codzienny variation margin; na końcu dostawa walut lub gotówkowe."],
        ["Spread", "Currency Future Spread — rolowanie między terminami."],
        ["Kod CFI", "<code>FF</code> — Financial futures (baza: waluta)"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html: `<p><em>Currency Future</em> to kontrakt futures, którego instrumentem bazowym jest kurs walutowy. Ekonomicznie daje to samo co <a href='#/i/fx-forward'>FX Forward</a>, ale z trzema różnicami: standaryzowana kwota i termin, codzienne rozliczanie zysków i strat oraz CCP jako kontrahent.</p>
<p class='formula'>Cena futures ≈ kurs spot × (1 + r<sub>waluty kwotowanej</sub> × d/360) / (1 + r<sub>waluty bazowej</sub> × d/360)</p>`
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html: `<ol class='steps'>
<li><strong>Otwarcie</strong> pozycji długiej (kupno waluty bazowej) lub krótkiej.</li>
<li><strong>Depozyty</strong> — initial margin, codzienny variation margin.</li>
<li><strong>Rolowanie</strong> przed terminem — sprzedaż bliższego i kupno dalszego kontraktu (spread).</li>
<li><strong>Termin</strong> — dostawa walut (CME, przez CLS) lub rozliczenie gotówkowe.</li>
</ol>`
        },
        {
          id: "example", title: "Przykład liczbowy",
          html: `<p>Fundusz w EUR ma aktywa w USD o wartości 10 mln USD i chce zabezpieczyć kurs kontraktami CME Euro FX (125 000 EUR), kurs 1,1000.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>
<tr><td>Kwota w EUR</td><td>10 000 000 / 1,10</td><td class='num'>9 090 909 EUR</td></tr>
<tr><td>Liczba kontraktów (kupno EUR)</td><td>9 090 909 / 125 000</td><td class='num'>72,7 → 73</td></tr>
<tr><td>Zabezpieczona kwota</td><td>73 × 125 000 × 1,10</td><td class='num'>10 037 500 USD</td></tr>
</tbody></table></div>
<h3>Co to oznacza dla compliance</h3>
<ul>
<li>Standaryzacja powoduje niewielkie nadmierne zabezpieczenie (100,4%). Przy klasach zabezpieczonych mieść się w paśmie 95–105% (opinia ESMA34-43-296).</li>
<li>Brak limitu kontrahenta z art. 52 ust. 1 (derywat giełdowy rozliczany przez CCP); w metodzie zaangażowania zabezpieczenie może być kompensowane z aktywami w USD.</li>
</ul>`
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html: `<p><strong>Wycena:</strong> kurs rozliczeniowy giełdy.</p>
<ul>
<li><strong>Ryzyko kursowe</strong>.</li>
<li><strong>Ryzyko bazy</strong> — futures i spot różnią się o punkty terminowe.</li>
<li><strong>Ryzyko płynności depozytów</strong> — variation margin płatny gotówką codziennie.</li>
<li><strong>Ryzyko niedopasowania</strong> kwoty (standaryzacja).</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Cykl życia i zdarzenia",
          html: `<ol>
<li>Otwarcie, codzienne depozyty.</li>
<li>Rolowanie kwartalne.</li>
<li>Zamknięcie lub dostawa w terminie.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Dopuszczalność <span class='law'>art. 50 ust. 1 lit. g</span></h4><p>Derywat na kurs walutowy — dopuszczalny.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Liczba × wielkość kontraktu × kurs; kompensowanie z zabezpieczanymi aktywami przy spełnieniu warunków hedgingu.</p></div>
<div class='rule'><h4>Klasy zabezpieczone <span class='law'>ESMA34-43-296</span></h4><p>Zabezpieczenie przypisane klasie, w paśmie 95–105%.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Ekspozycja w metodzie brutto; w metodzie zaangażowania — możliwe kompensowanie przy zabezpieczeniu walutowym.</li>
</ul>`
        },
        {
          id: "reporting", title: "Raportowanie i obowiązki rynkowe",
          html: `<ul>
<li><strong>EMIR</strong> — raport do T+1.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html: `<ul>
<li>Kod kontraktu i terminu, <strong>ISIN</strong> serii, MIC.</li>
<li><strong>CFI</strong> <code>FF…</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html: `<ul class='checklist'>
<li>Wskaźnik zabezpieczenia (klasy zabezpieczone).</li>
<li>Global exposure i kompensowanie.</li>
<li>Gotówka na variation margin.</li>
<li>Rolowanie przed terminem.</li>
</ul>`
        }
      ],
      glossary: [
        ["Contract size", "Stała kwota waluty bazowej w jednym kontrakcie."],
        ["Basis", "Różnica między ceną futures a kursem spot."],
        ["Roll", "Przeniesienie pozycji na dalszy termin."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "The listed counterpart of an FX forward: a standardised contract to exchange a set amount of one currency for another at a future date. It is cleared by a clearing house with daily margining, so there is no bilateral counterparty risk. Examples: CME Euro FX futures (EUR 125,000), EUR/PLN futures on the Warsaw Stock Exchange (EUR 10,000).",
      keyFacts: [
        ["Contract size", "Fixed (e.g. CME Euro FX — EUR 125,000; WSE — EUR 10,000)."],
        ["Maturities", "Quarterly (March, June, September, December), sometimes monthly."],
        ["Price", "Follows interest rate parity, like a forward rate."],
        ["Settlement", "Daily variation margin; at expiry delivery of currencies or cash."],
        ["Spread", "Currency Future Spread — rolling between maturities."],
        ["CFI code", "<code>FF</code> — Financial futures (underlying: currency)"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html: `<p>A <em>Currency Future</em> is a futures contract whose underlying is an exchange rate. Economically it gives the same as an <a href='#/i/fx-forward'>FX Forward</a>, with three differences: standardised amount and date, daily settlement of gains and losses, and the CCP as counterparty.</p>
<p class='formula'>Futures price ≈ spot × (1 + r<sub>quote currency</sub> × d/360) / (1 + r<sub>base currency</sub> × d/360)</p>`
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html: `<ol class='steps'>
<li><strong>Opening</strong> a long (buying the base currency) or short position.</li>
<li><strong>Margins</strong> — initial margin, daily variation margin.</li>
<li><strong>Rolling</strong> before expiry — selling the near and buying the next contract (spread).</li>
<li><strong>Expiry</strong> — delivery of currencies (CME, via CLS) or cash settlement.</li>
</ol>`
        },
        {
          id: "example", title: "Worked example",
          html: `<p>A EUR fund has USD 10m of USD assets and wants to hedge them with CME Euro FX futures (EUR 125,000), rate 1.1000.</p>
<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>
<tr><td>Amount in EUR</td><td>10,000,000 / 1.10</td><td class='num'>EUR 9,090,909</td></tr>
<tr><td>Number of contracts (buy EUR)</td><td>9,090,909 / 125,000</td><td class='num'>72.7 → 73</td></tr>
<tr><td>Hedged amount</td><td>73 × 125,000 × 1.10</td><td class='num'>USD 10,037,500</td></tr>
</tbody></table></div>
<h3>What this means for compliance</h3>
<ul>
<li>Standardisation leads to a small over-hedge (100.4%). For hedged share classes stay within the 95–105% band (ESMA34-43-296 opinion).</li>
<li>No Art. 52(1) counterparty limit (listed derivative cleared by a CCP); under the commitment approach the hedge may be netted against the USD assets.</li>
</ul>`
        },
        {
          id: "risks", title: "Valuation and risks",
          html: `<p><strong>Valuation:</strong> exchange settlement price.</p>
<ul>
<li><strong>FX risk</strong>.</li>
<li><strong>Basis risk</strong> — futures and spot differ by the forward points.</li>
<li><strong>Margin liquidity risk</strong> — variation margin is paid in cash daily.</li>
<li><strong>Size mismatch risk</strong> (standardisation).</li>
</ul>`
        },
        {
          id: "lifecycle", title: "Lifecycle and events",
          html: `<ol>
<li>Opening, daily margins.</li>
<li>Quarterly roll.</li>
<li>Close-out or delivery at expiry.</li>
</ol>`
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html: `<div class='rules'>
<div class='rule'><h4>Eligibility <span class='law'>Art. 50(1)(g)</span></h4><p>A derivative on an exchange rate — eligible.</p></div>
<div class='rule'><h4>Global exposure <span class='law'>CESR/10-788</span></h4><p>Number × contract size × rate; netting against hedged assets where the hedging conditions are met.</p></div>
<div class='rule'><h4>Hedged share classes <span class='law'>ESMA34-43-296</span></h4><p>The hedge is attributed to the class, within the 95–105% band.</p></div>
</div>`
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html: `<ul>
<li>Exposure under the gross method; under the commitment method — netting possible for currency hedges.</li>
</ul>`
        },
        {
          id: "reporting", title: "Reporting and market obligations",
          html: `<ul>
<li><strong>EMIR</strong> — report by T+1.</li>
</ul>`
        },
        {
          id: "identifiers", title: "Identifiers",
          html: `<ul>
<li>Contract and maturity code, series <strong>ISIN</strong>, MIC.</li>
<li><strong>CFI</strong> <code>FF…</code>.</li>
</ul>`
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html: `<ul class='checklist'>
<li>Hedge ratio (hedged share classes).</li>
<li>Global exposure and netting.</li>
<li>Cash for variation margin.</li>
<li>Roll before expiry.</li>
</ul>`
        }
      ],
      glossary: [
        ["Contract size", "The fixed amount of the base currency in one contract."],
        ["Basis", "The difference between the futures price and the spot rate."],
        ["Roll", "Moving a position to a later maturity."]
      ]
    }
  }
});

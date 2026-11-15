window.BASICS.push({
  id: "counterparty-risk",
  title: { pl: "Ryzyko kontrahenta i netting", en: "Counterparty risk and netting" },
  level: 2,
  prereq: ["derivatives", "collateral"],
  sources: ["ucits", "emir3dir", "esma2014"],
  related: ["interest-rate-swap", "cross-currency-swap", "repurchase-agreement", "exchange-traded-note"],
  content: {
    pl: {
      summary: "Ryzyko kontrahenta to ryzyko, że druga strona transakcji upadnie, zanim wywiąże się z zobowiązań. Dotyczy derywatów OTC, repo, pożyczek papierów, depozytów i papierów emitowanych przez banki. UCITS ogranicza je limitami (5% / 10% NAV dla derywatów nierozliczanych centralnie i technik EPM, 20% łącznie), a ryzyko obniżają netting, zabezpieczenia i clearing przez CCP.",
      keyFacts: [
        ["Bieżąca ekspozycja", "Dodatnia wycena transakcji (ile kontrahent jest nam winien dziś)."],
        ["Potencjalna ekspozycja", "O ile może wzrosnąć ekspozycja do następnej wymiany zabezpieczeń lub zamknięcia."],
        ["Netting", "Kompensowanie należności i zobowiązań wobec tego samego kontrahenta (ISDA)."],
        ["Wrong-way risk", "Ekspozycja rośnie, gdy kontrahent słabnie."]
      ],
      sections: [
        { id: "measure", title: "Jak mierzyć",
          html: "<p class='formula'>Ekspozycja = max(Σ wycen transakcji objętych nettingiem − zabezpieczenie, 0)</p>" +
                "<p>Przykład: z bankiem B fundusz ma swap +3 mln, forward −1 mln i opcję +0,5 mln, wszystkie pod jedną umową ISDA. Netting: 3 − 1 + 0,5 = 2,5 mln. Bank przekazał 2,2 mln zabezpieczenia → ekspozycja 0,3 mln.</p>" +
                "<p>Bez umowy ramowej z nettingiem syndyk mógłby żądać płatności z transakcji z ujemną wyceną, a należności z pozostałych zgłosić tylko jako wierzytelność — „cherry picking”.</p>" },
        { id: "sources", title: "Gdzie występuje w funduszu",
          html: "<ul>" +
                "<li><strong>Derywaty OTC</strong> — swapy, forwardy, opcje OTC (zob. <a href='#/i/cross-currency-swap'>CCS</a>: ekspozycja rośnie z kursem).</li>" +
                "<li><strong>Techniki EPM</strong> — <a href='#/i/repurchase-agreement'>repo</a>, <a href='#/i/securities-lending'>pożyczki papierów</a>.</li>" +
                "<li><strong>Depozyty</strong> w bankach i środki na rachunkach.</li>" +
                "<li><strong>Papiery emitowane przez banki</strong> — <a href='#/i/certificate-of-deposit'>CD</a>, <a href='#/i/exchange-traded-note'>ETN</a>, certyfikaty, warranty.</li>" +
                "<li><strong>Brokerzy i CCP</strong> — depozyty zabezpieczające.</li>" +
                "</ul>" },
        { id: "ucits", title: "Limity UCITS",
          html: "<table class='calc'><thead><tr><th>Limit</th><th>Wartość</th><th>Podstawa</th></tr></thead><tbody>" +
                "<tr><td>Derywaty nierozliczane centralnie + EPM, kontrahent = instytucja kredytowa</td><td class='num'>10% NAV</td><td>art. 52 ust. 1</td></tr>" +
                "<tr><td>Jak wyżej, inny kontrahent</td><td class='num'>5% NAV</td><td>art. 52 ust. 1</td></tr>" +
                "<tr><td>Depozyty w jednym podmiocie</td><td class='num'>20% NAV</td><td>art. 52 ust. 1</td></tr>" +
                "<tr><td>Papiery + depozyty + ekspozycja z derywatów wobec jednego podmiotu</td><td class='num'>20% NAV</td><td>art. 52 ust. 2</td></tr>" +
                "</tbody></table>" +
                "<p>Po zmianach EMIR 3 derywaty rozliczane przez CCP autoryzowaną lub uznaną według EMIR nie liczą się do limitów 5% / 10%.</p>" },
        { id: "wwr", title: "Wrong-way risk",
          html: "<p>Najgroźniejsza sytuacja: ekspozycja rośnie dokładnie wtedy, gdy kontrahent słabnie. Przykłady: kupno ochrony <a href='#/i/credit-default-swap'>CDS</a> od banku na inny bank z tego samego kraju; zabezpieczenie w obligacjach państwa, w którym działa kontrahent. Kryterium niskiej korelacji zabezpieczeń z kontrahentem w wytycznych ESMA odpowiada właśnie na to ryzyko.</p>" }
      ],
      glossary: [
        ["Counterparty risk", "Ryzyko niewywiązania się drugiej strony transakcji."],
        ["Close-out netting", "Rozliczenie netto wszystkich transakcji z kontrahentem w razie jego niewypłacalności."],
        ["Cherry picking", "Wybiórcze wykonywanie korzystnych umów przez syndyka upadłego kontrahenta."],
        ["Potential future exposure", "Możliwy przyszły wzrost ekspozycji na kontrahenta."]
      ]
    },
    en: {
      summary: "Counterparty risk is the risk that the other party to a trade fails before meeting its obligations. It arises in OTC derivatives, repo, securities lending, deposits and bank-issued securities. UCITS limits it (5% / 10% of NAV for non-centrally cleared derivatives and EPM techniques, 20% combined), and netting, collateral and CCP clearing reduce it.",
      keyFacts: [
        ["Current exposure", "Positive value of the trades (what the counterparty owes us today)."],
        ["Potential exposure", "How much exposure could grow before the next collateral exchange or close-out."],
        ["Netting", "Offsetting receivables and payables with the same counterparty (ISDA)."],
        ["Wrong-way risk", "Exposure grows as the counterparty weakens."]
      ],
      sections: [
        { id: "measure", title: "How to measure it",
          html: "<p class='formula'>Exposure = max(Σ values of trades under netting − collateral, 0)</p>" +
                "<p>Example: with bank B the fund has a swap at +3m, a forward at −1m and an option at +0.5m, all under one ISDA. Netting: 3 − 1 + 0.5 = 2.5m. The bank has posted 2.2m of collateral → exposure 0.3m.</p>" +
                "<p>Without a master agreement with netting, an administrator could demand payment on trades with negative value and treat the rest only as a claim — \"cherry picking\".</p>" },
        { id: "sources", title: "Where it arises in a fund",
          html: "<ul>" +
                "<li><strong>OTC derivatives</strong> — swaps, forwards, OTC options (see <a href='#/i/cross-currency-swap'>CCS</a>: exposure grows with FX moves).</li>" +
                "<li><strong>EPM techniques</strong> — <a href='#/i/repurchase-agreement'>repo</a>, <a href='#/i/securities-lending'>securities lending</a>.</li>" +
                "<li><strong>Deposits</strong> with banks and cash on accounts.</li>" +
                "<li><strong>Bank-issued securities</strong> — <a href='#/i/certificate-of-deposit'>CDs</a>, <a href='#/i/exchange-traded-note'>ETNs</a>, certificates, warrants.</li>" +
                "<li><strong>Brokers and CCPs</strong> — margin posted.</li>" +
                "</ul>" },
        { id: "ucits", title: "UCITS limits",
          html: "<table class='calc'><thead><tr><th>Limit</th><th>Value</th><th>Basis</th></tr></thead><tbody>" +
                "<tr><td>Non-centrally cleared derivatives + EPM, counterparty = credit institution</td><td class='num'>10% of NAV</td><td>Art. 52(1)</td></tr>" +
                "<tr><td>As above, other counterparty</td><td class='num'>5% of NAV</td><td>Art. 52(1)</td></tr>" +
                "<tr><td>Deposits with one body</td><td class='num'>20% of NAV</td><td>Art. 52(1)</td></tr>" +
                "<tr><td>Securities + deposits + derivative exposure to one body</td><td class='num'>20% of NAV</td><td>Art. 52(2)</td></tr>" +
                "</tbody></table>" +
                "<p>After EMIR 3, derivatives cleared through a CCP authorised or recognised under EMIR do not count towards the 5% / 10% limits.</p>" },
        { id: "wwr", title: "Wrong-way risk",
          html: "<p>The most dangerous case: exposure grows exactly when the counterparty weakens. Examples: buying <a href='#/i/credit-default-swap'>CDS</a> protection from a bank on another bank in the same country; collateral in bonds of the state where the counterparty operates. The ESMA criterion of low correlation between collateral and counterparty addresses exactly this risk.</p>" }
      ],
      glossary: [
        ["Counterparty risk", "The risk that the other party to a trade fails to perform."],
        ["Close-out netting", "Net settlement of all trades with a counterparty on its default."],
        ["Cherry picking", "An administrator selectively performing only favourable contracts of a failed counterparty."],
        ["Potential future exposure", "Possible future growth in exposure to a counterparty."]
      ]
    }
  }
});

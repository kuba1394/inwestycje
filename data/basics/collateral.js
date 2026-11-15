window.BASICS.push({
  id: "collateral",
  title: { pl: "Zabezpieczenia, haircut i CSA", en: "Collateral, haircuts and the CSA" },
  level: 2,
  prereq: ["derivatives"],
  sources: ["esma2014", "marginRts", "sftr"],
  related: ["repurchase-agreement", "securities-lending", "interest-rate-swap", "covered-bond"],
  content: {
    pl: {
      summary: "Zabezpieczenie (collateral) to gotówka lub papiery, które jedna strona przekazuje drugiej, żeby ograniczyć ryzyko, że nie wywiąże się z umowy. Przy derywatach OTC zasady wymiany zabezpieczeń zapisuje się w CSA, przy repo w GMRA, a przy pożyczkach papierów w GMSLA. Dla UCITS zabezpieczenie zmniejsza ekspozycję na kontrahenta tylko wtedy, gdy spełnia kryteria ESMA.",
      keyFacts: [
        ["CSA (Credit Support Annex)", "Załącznik do ISDA: rodzaje zabezpieczeń, haircuty, progi, minimalne kwoty transferu."],
        ["Haircut", "Procentowe obniżenie wartości zabezpieczenia na wypadek spadku jego ceny."],
        ["VM i IM", "Variation margin — pokrywa bieżącą wycenę; initial margin — przyszłą możliwą zmianę."],
        ["Przeniesienie tytułu vs zastaw", "Zabezpieczenie może przejść na własność drugiej strony albo zostać tylko zastawione."]
      ],
      sections: [
        { id: "why", title: "Po co zabezpieczenia",
          html: "<p>Swap z dodatnią wyceną 2 mln EUR oznacza, że bank jest winien funduszowi 2 mln. Jeśli bank upadnie, fundusz staje się jego wierzycielem. Gdy bank codziennie przekazuje zabezpieczenie równe wycenie, w razie upadku fundusz zatrzymuje to zabezpieczenie i strata jest bliska zeru.</p>" },
        { id: "csa", title: "Kluczowe parametry CSA",
          html: "<ul>" +
                "<li><strong>Dopuszczalne zabezpieczenia</strong> — gotówka w określonych walutach, obligacje skarbowe, czasem inne papiery.</li>" +
                "<li><strong>Haircut</strong> — np. obligacja 10-letnia warta 100 liczy się jako 96 (haircut 4%).</li>" +
                "<li><strong>Próg (threshold)</strong> — ekspozycja poniżej progu nie wymaga zabezpieczenia (dla VM według EMIR próg wynosi zero).</li>" +
                "<li><strong>Minimalna kwota transferu (MTA)</strong> — małych kwot się nie przesyła (regulacyjnie maks. 500 tys. EUR łącznie dla VM i IM).</li>" +
                "<li><strong>Częstotliwość</strong> — wyceny i wezwania codziennie.</li>" +
                "<li><strong>Spory</strong> — procedura, gdy strony różnią się w wycenie.</li>" +
                "</ul>" },
        { id: "example", title: "Przykład z haircutem",
          html: "<p>Fundusz ma swap z wyceną +1 000 000 EUR. Bank przekazuje obligacje skarbowe o wartości rynkowej 1 040 000 EUR, haircut 4%.</p>" +
                "<div class='table-scroll'><table class='calc'><tbody>" +
                "<tr><td>Wartość zabezpieczenia po haircut: 1 040 000 × 96%</td><td class='num'>998 400 EUR</td></tr>" +
                "<tr><td>Ekspozycja netto na bank: 1 000 000 − 998 400</td><td class='num'>1 600 EUR</td></tr>" +
                "</tbody></table></div>" },
        { id: "ucits", title: "Kryteria UCITS (ESMA/2014/937)",
          html: "<p>Zabezpieczenie otrzymane przy derywatach OTC i technikach EPM obniża ekspozycję na kontrahenta, jeśli:</p>" +
                "<ul>" +
                "<li>jest <strong>płynne</strong> i notowane, z przejrzystą wyceną;</li>" +
                "<li>jest <strong>wyceniane codziennie</strong>, z odpowiednimi haircutami;</li>" +
                "<li>emitent ma <strong>wysoką jakość kredytową</strong>;</li>" +
                "<li>ma <strong>niską korelację</strong> z kontrahentem (bank nie daje własnych obligacji);</li>" +
                "<li>jest <strong>zdywersyfikowane</strong> — co do zasady maks. 20% NAV w jednym emitencie (wyjątek dla papierów skarbowych przy co najmniej 6 emisjach);</li>" +
                "<li>może być <strong>w każdej chwili egzekwowane</strong> bez zgody kontrahenta;</li>" +
                "<li>zabezpieczenie niepieniężne <strong>nie jest sprzedawane, reinwestowane ani zastawiane</strong>; gotówkę można reinwestować tylko w ściśle określone aktywa.</li>" +
                "</ul>" +
                "<p>Prospekt funduszu musi opisywać politykę zabezpieczeń i haircutów.</p>" },
        { id: "reuse", title: "Ponowne wykorzystanie",
          html: "<p>Przy przeniesieniu tytułu własności odbiorca może użyć zabezpieczenia dalej (np. w repo). SFTR (art. 15) wymaga wtedy informacji o ryzyku i uprzedniej zgody przekazującego. Dla UCITS ponowne użycie zabezpieczenia niepieniężnego jest zakazane.</p>" }
      ],
      glossary: [
        ["Collateral", "Zabezpieczenie — aktywa przekazane w celu ograniczenia ryzyka kontrahenta."],
        ["Threshold", "Próg ekspozycji, poniżej którego nie wymaga się zabezpieczenia."],
        ["MTA (Minimum Transfer Amount)", "Minimalna kwota przekazania zabezpieczenia."],
        ["Title transfer", "Przeniesienie własności zabezpieczenia na drugą stronę."],
        ["Reuse", "Ponowne wykorzystanie otrzymanego zabezpieczenia przez odbiorcę."]
      ]
    },
    en: {
      summary: "Collateral is cash or securities that one party gives another to reduce the risk of non-performance. For OTC derivatives the collateral rules are set in the CSA, for repo in the GMRA, and for securities lending in the GMSLA. For a UCITS, collateral reduces counterparty exposure only if it meets the ESMA criteria.",
      keyFacts: [
        ["CSA (Credit Support Annex)", "ISDA annex: eligible collateral, haircuts, thresholds, minimum transfer amounts."],
        ["Haircut", "A percentage reduction in collateral value to allow for a fall in its price."],
        ["VM and IM", "Variation margin covers current value; initial margin covers potential future change."],
        ["Title transfer vs pledge", "Collateral may pass into the other party's ownership or only be pledged."]
      ],
      sections: [
        { id: "why", title: "Why collateral",
          html: "<p>A swap valued at +EUR 2m means the bank owes the fund EUR 2m. If the bank fails, the fund becomes its creditor. When the bank posts collateral equal to the value every day, the fund keeps that collateral on default and the loss is close to zero.</p>" },
        { id: "csa", title: "Key CSA terms",
          html: "<ul>" +
                "<li><strong>Eligible collateral</strong> — cash in specified currencies, government bonds, sometimes other securities.</li>" +
                "<li><strong>Haircut</strong> — e.g. a 10-year bond worth 100 counts as 96 (4% haircut).</li>" +
                "<li><strong>Threshold</strong> — exposure below the threshold needs no collateral (for VM under EMIR the threshold is zero).</li>" +
                "<li><strong>Minimum transfer amount (MTA)</strong> — small amounts are not moved (regulatory maximum EUR 500k combined for VM and IM).</li>" +
                "<li><strong>Frequency</strong> — daily valuations and calls.</li>" +
                "<li><strong>Disputes</strong> — the procedure when the parties disagree on value.</li>" +
                "</ul>" },
        { id: "example", title: "Example with a haircut",
          html: "<p>A fund has a swap valued at +EUR 1,000,000. The bank posts government bonds with a market value of EUR 1,040,000, 4% haircut.</p>" +
                "<div class='table-scroll'><table class='calc'><tbody>" +
                "<tr><td>Collateral value after haircut: 1,040,000 × 96%</td><td class='num'>EUR 998,400</td></tr>" +
                "<tr><td>Net exposure to the bank: 1,000,000 − 998,400</td><td class='num'>EUR 1,600</td></tr>" +
                "</tbody></table></div>" },
        { id: "ucits", title: "UCITS criteria (ESMA/2014/937)",
          html: "<p>Collateral received on OTC derivatives and EPM techniques reduces counterparty exposure if it:</p>" +
                "<ul>" +
                "<li>is <strong>liquid</strong> and traded, with transparent pricing;</li>" +
                "<li>is <strong>valued daily</strong>, with appropriate haircuts;</li>" +
                "<li>has an issuer of <strong>high credit quality</strong>;</li>" +
                "<li>has <strong>low correlation</strong> with the counterparty (a bank does not post its own bonds);</li>" +
                "<li>is <strong>diversified</strong> — as a rule max 20% of NAV per issuer (exception for government securities with at least 6 issues);</li>" +
                "<li>can be <strong>enforced at any time</strong> without the counterparty's consent;</li>" +
                "<li>non-cash collateral is <strong>not sold, reinvested or pledged</strong>; cash may be reinvested only in strictly defined assets.</li>" +
                "</ul>" +
                "<p>The fund's prospectus must describe its collateral and haircut policy.</p>" },
        { id: "reuse", title: "Reuse",
          html: "<p>Under title transfer the recipient may use the collateral onward (e.g. in repo). SFTR (Art. 15) then requires risk disclosure and the provider's prior consent. For a UCITS, reuse of non-cash collateral is prohibited.</p>" }
      ],
      glossary: [
        ["Collateral", "Assets provided to reduce counterparty risk."],
        ["Threshold", "Exposure level below which no collateral is required."],
        ["MTA (Minimum Transfer Amount)", "The minimum amount of collateral moved."],
        ["Title transfer", "Transfer of ownership of collateral to the other party."],
        ["Reuse", "The recipient using collateral it has received."]
      ]
    }
  }
});

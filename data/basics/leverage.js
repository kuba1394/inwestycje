window.BASICS.push({
  id: "leverage",
  title: { pl: "Dźwignia finansowa", en: "Leverage" },
  level: 1,
  prereq: ["fund-types"],
  sources: ["ucits", "aifmd", "aifmdL2", "aifmd2"],
  related: ["equity-index-future", "contract-for-difference", "total-return-swap", "exchange-traded-certificate"],
  content: {
    pl: {
      summary: "Dźwignia oznacza, że ekspozycja na rynek jest większa niż własny kapitał. Można ją uzyskać, pożyczając pieniądze (dźwignia finansowa) albo przez derywaty, w których wpłaca się tylko depozyt (dźwignia syntetyczna). Dźwignia mnoży zarówno zyski, jak i straty — dlatego UCITS i AIFMD ją mierzą i ograniczają.",
      keyFacts: [
        ["Dźwignia = ", "ekspozycja / kapitał własny (NAV)."],
        ["Finansowa", "Kredyt, repo, krótka sprzedaż finansująca zakupy."],
        ["Syntetyczna", "Futures, swapy, CFD, opcje — duża ekspozycja przy małym zaangażowaniu gotówki."],
        ["Pomiar", "UCITS: ekspozycja całkowita (zaangażowanie lub VaR). AIFMD: metoda brutto i zaangażowania."]
      ],
      sections: [
        { id: "idea", title: "Jak działa dźwignia",
          html: "<p>Masz 100 000 zł. Kupujesz akcje za 100 000 zł — rynek rośnie o 10%, zarabiasz 10 000 zł (10%). Teraz pożyczasz dodatkowe 400 000 zł i kupujesz akcje za 500 000 zł (dźwignia 5×):</p>" +
                "<div class='table-scroll'><table class='calc'><thead><tr><th>Ruch rynku</th><th class='num'>Bez dźwigni</th><th class='num'>Dźwignia 5×</th></tr></thead><tbody>" +
                "<tr><td>+10%</td><td class='num'>+10 000 (+10%)</td><td class='num'>+50 000 (+50%)</td></tr>" +
                "<tr><td>−10%</td><td class='num'>−10 000 (−10%)</td><td class='num'>−50 000 (−50%)</td></tr>" +
                "<tr><td>−20%</td><td class='num'>−20 000 (−20%)</td><td class='num'>−100 000 (−100%)</td></tr>" +
                "</tbody></table></div>" +
                "<p>Przy dźwigni 5× spadek rynku o 20% zabiera cały kapitał. Do tego dochodzi koszt finansowania.</p>" },
        { id: "synthetic", title: "Dźwignia z derywatów",
          html: "<p>Kupując <a href='#/i/equity-index-future'>kontrakt terminowy</a> o wartości 1 mln EUR, wpłacasz tylko depozyt, np. 80 000 EUR. Ekspozycja to 1 mln, a zaangażowana gotówka — 80 tys. Podobnie działają <a href='#/i/contract-for-difference'>CFD</a>, <a href='#/i/total-return-swap'>TRS</a> czy certyfikaty turbo.</p>" +
                "<p>Dlatego w funduszach nie liczy się dźwigni z samej gotówki, tylko z <strong>ekspozycji</strong>: każdy derywat przelicza się na ekwiwalent instrumentu bazowego (nominał, wartość rynkową bazy, dla opcji — × delta).</p>" },
        { id: "ucits", title: "UCITS",
          html: "<ul>" +
                "<li><strong>Ekspozycja całkowita z derywatów</strong> (art. 51 ust. 3) w metodzie zaangażowania nie może przekroczyć 100% NAV — czyli łączna ekspozycja portfela może sięgać ok. 200% NAV.</li>" +
                "<li>W metodzie VaR: absolutny VaR ≤ 20% NAV albo relatywny ≤ 2× VaR portfela referencyjnego (zob. <a href='#/basics/global-exposure'>Ekspozycja całkowita</a>).</li>" +
                "<li><strong>Pożyczki</strong> (art. 83): tylko tymczasowe, do 10% aktywów.</li>" +
                "</ul>" },
        { id: "aifmd", title: "AIFMD",
          html: "<ul>" +
                "<li><strong>Metoda brutto</strong> (art. 7 rozp. 231/2013): suma wartości bezwzględnych wszystkich pozycji, bez kompensowania, z wyłączeniem gotówki i ekwiwalentów gotówki.</li>" +
                "<li><strong>Metoda zaangażowania</strong> (art. 8): jak wyżej, ale z kompensowaniem i hedgingiem spełniającym warunki.</li>" +
                "<li>Dźwignia wyrażona jako stosunek ekspozycji do NAV (np. 150% = 1,5×). ZAFI ustala maksymalny poziom dla każdego AIF i go ujawnia.</li>" +
                "<li><strong>Dźwignia na znaczną skalę</strong>: metoda zaangażowania &gt; 300% NAV → dodatkowe raporty.</li>" +
                "<li><strong>AIFMD II</strong>: AIF udzielające pożyczek mają pułapy dźwigni 175% (otwarte) i 300% (zamknięte), w metodzie zaangażowania.</li>" +
                "</ul>" }
      ],
      glossary: [
        ["Leverage", "Dźwignia — stosunek ekspozycji do kapitału własnego."],
        ["Gross method", "Metoda brutto liczenia dźwigni AIF — bez kompensowania pozycji."],
        ["Commitment method", "Metoda zaangażowania — z kompensowaniem i hedgingiem na określonych warunkach."],
        ["Margin", "Depozyt zabezpieczający wnoszony przy derywatach."]
      ]
    },
    en: {
      summary: "Leverage means market exposure is larger than your own capital. You can get it by borrowing (financial leverage) or through derivatives where you post only margin (synthetic leverage). Leverage multiplies both gains and losses — that is why UCITS and AIFMD measure and limit it.",
      keyFacts: [
        ["Leverage =", "exposure / own capital (NAV)."],
        ["Financial", "Borrowing, repo, short sales funding purchases."],
        ["Synthetic", "Futures, swaps, CFDs, options — large exposure for little cash."],
        ["Measurement", "UCITS: global exposure (commitment or VaR). AIFMD: gross and commitment methods."]
      ],
      sections: [
        { id: "idea", title: "How leverage works",
          html: "<p>You have PLN 100,000. You buy shares for PLN 100,000 — the market rises 10%, you earn PLN 10,000 (10%). Now you borrow another PLN 400,000 and buy PLN 500,000 of shares (5× leverage):</p>" +
                "<div class='table-scroll'><table class='calc'><thead><tr><th>Market move</th><th class='num'>No leverage</th><th class='num'>5× leverage</th></tr></thead><tbody>" +
                "<tr><td>+10%</td><td class='num'>+10,000 (+10%)</td><td class='num'>+50,000 (+50%)</td></tr>" +
                "<tr><td>−10%</td><td class='num'>−10,000 (−10%)</td><td class='num'>−50,000 (−50%)</td></tr>" +
                "<tr><td>−20%</td><td class='num'>−20,000 (−20%)</td><td class='num'>−100,000 (−100%)</td></tr>" +
                "</tbody></table></div>" +
                "<p>At 5× leverage a 20% market fall wipes out all the capital. On top of that comes the cost of financing.</p>" },
        { id: "synthetic", title: "Leverage from derivatives",
          html: "<p>Buying a <a href='#/i/equity-index-future'>futures contract</a> worth EUR 1m, you post only margin, e.g. EUR 80,000. Exposure is 1m, while cash committed is 80k. <a href='#/i/contract-for-difference'>CFDs</a>, <a href='#/i/total-return-swap'>TRS</a> and turbo certificates work similarly.</p>" +
                "<p>That is why funds do not measure leverage from cash alone, but from <strong>exposure</strong>: each derivative is converted into the underlying equivalent (notional, underlying market value, for options × delta).</p>" },
        { id: "ucits", title: "UCITS",
          html: "<ul>" +
                "<li><strong>Global exposure from derivatives</strong> (Art. 51(3)) under the commitment approach may not exceed 100% of NAV — so total portfolio exposure can reach about 200% of NAV.</li>" +
                "<li>Under VaR: absolute VaR ≤ 20% of NAV or relative VaR ≤ 2× the reference portfolio's VaR (see <a href='#/basics/global-exposure'>Global exposure</a>).</li>" +
                "<li><strong>Borrowing</strong> (Art. 83): only temporary, up to 10% of assets.</li>" +
                "</ul>" },
        { id: "aifmd", title: "AIFMD",
          html: "<ul>" +
                "<li><strong>Gross method</strong> (Art. 7 Reg. 231/2013): sum of absolute values of all positions, no netting, excluding cash and cash equivalents.</li>" +
                "<li><strong>Commitment method</strong> (Art. 8): as above, but with netting and hedging that meet the conditions.</li>" +
                "<li>Leverage is expressed as exposure to NAV (e.g. 150% = 1.5×). The AIFM sets a maximum for each AIF and discloses it.</li>" +
                "<li><strong>Leverage on a substantial basis</strong>: commitment method &gt; 300% of NAV → additional reporting.</li>" +
                "<li><strong>AIFMD II</strong>: loan-originating AIFs have leverage caps of 175% (open-ended) and 300% (closed-ended), on the commitment method.</li>" +
                "</ul>" }
      ],
      glossary: [
        ["Leverage", "The ratio of exposure to own capital."],
        ["Gross method", "AIF leverage method without netting of positions."],
        ["Commitment method", "Leverage method with netting and hedging under set conditions."],
        ["Margin", "Collateral posted on derivatives."]
      ]
    }
  }
});

window.INSTRUMENTS.push({
  id: "exchange-traded-commodity",
  name: "Exchange-Traded Commodity (ETC)",
  aliases: ["ETC", "Physical Gold ETC", "Commodity ETP"],
  market: "exchange",
  asset: { pl: "Towary", en: "Commodities" },
  sources: ["ucits", "eligible", "cesr10788", "aifmd", "csdrT1"],
  content: {
    /* ===================== POLSKI ===================== */
    pl: {
      summary: "ETC to notowany papier dłużny (zwykle emitowany przez spółkę celową), którego wartość odzwierciedla cenę towaru — np. złota — lub indeksu kontraktów terminowych na towary. Najpopularniejsze są ETC zabezpieczone fizycznym metalem przechowywanym w skarbcu. W Europie ETC zastępują fundusze towarowe, bo UCITS nie może być funduszem jednego towaru.",
      keyFacts: [
        ["Emitent", "Spółka celowa (SPV), często w Irlandii lub Jersey; powiernik (trustee) działa w imieniu posiadaczy."],
        ["Zabezpieczenie", "Fizyczny metal w skarbcu (np. Londyn, Zurych) albo zabezpieczone swapy/kontrakty futures."],
        ["Wartość", "Jednostka odpowiada określonej ilości towaru (entitlement), zmniejszanej o opłatę roczną."],
        ["Rynek", "Giełda (segment ETP); tworzenie i umarzanie przez uczestników autoryzowanych."],
        ["Rozliczenie", "UE: T+2 (od 11.10.2027 T+1), często w międzynarodowym CSD."],
        ["Wykup fizyczny", "Część programów pozwala uprawnionym posiadaczom odebrać metal — dla UCITS istotne ograniczenie."],
        ["Kod CFI", "Kategoria <code>D</code> (Debt); grupa zależna od struktury i dostawcy danych"]
      ],
      sections: [
        {
          id: "definition", title: "Definicja",
          html:
            "<p><em>Exchange-Traded Commodity</em> to papier dłużny, który daje ekspozycję na cenę towaru bez posiadania go bezpośrednio. Dwa główne typy:</p>" +
            "<ul>" +
              "<li><strong>fizycznie zabezpieczone</strong> (np. złoto, srebro) — emitent kupuje metal i przechowuje go w skarbcu custodiana; metal jest zastawiony na rzecz posiadaczy;</li>" +
              "<li><strong>syntetyczne</strong> — ekspozycja przez swapy lub kontrakty terminowe na towary, z zabezpieczeniem w papierach.</li>" +
            "</ul>" +
            "<p>W odróżnieniu od <a href='#/i/exchange-traded-note'>ETN</a> ETC zwykle jest zabezpieczony, ale nadal jest długiem, a nie funduszem.</p>"
        },
        {
          id: "mechanics", title: "Jak to działa krok po kroku",
          html:
            "<ol class='steps'>" +
              "<li><strong>Tworzenie.</strong> Uczestnik autoryzowany dostarcza gotówkę lub metal; emitent kupuje metal do skarbca i emituje jednostki.</li>" +
              "<li><strong>Obrót.</strong> Na giełdzie, z market makerami; cena blisko wartości metalu przypadającego na jednostkę.</li>" +
              "<li><strong>Opłata.</strong> Pobierana przez stopniowe zmniejszanie ilości metalu przypadającej na jednostkę.</li>" +
              "<li><strong>Umorzenie.</strong> Uczestnik autoryzowany oddaje jednostki i odbiera gotówkę lub metal.</li>" +
              "<li><strong>Zdarzenie niewypłacalności.</strong> Powiernik egzekwuje zabezpieczenie (sprzedaje metal) na rzecz posiadaczy.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Przykład liczbowy",
          html:
            "<p>Fundusz mieszany (NAV 200 mln EUR) chce mieć ekspozycję na złoto i kupuje ETC zabezpieczony fizycznym złotem za 5 mln EUR.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Pozycja</th><th>Obliczenie</th><th class='num'>Wynik</th></tr></thead><tbody>" +
              "<tr><td>Udział w NAV</td><td>5 / 200</td><td class='num'>2,5%</td></tr>" +
              "<tr><td>Cena złota +10% (w EUR)</td><td>5 000 000 × 10%</td><td class='num'>+500 000 EUR</td></tr>" +
              "<tr><td>Opłata roczna 0,15%</td><td>5 000 000 × 0,15%</td><td class='num'>≈ 7 500 EUR</td></tr>" +
            "</tbody></table></div>" +
            "<h3>Co to oznacza dla compliance</h3>" +
            "<ul>" +
              "<li>Do limitu emitenta wlicza się <strong>emitenta ETC (SPV)</strong> — 2,5% NAV w ramach 5/10/40.</li>" +
              "<li>Kluczowa jest <strong>dopuszczalność</strong> dla UCITS (patrz niżej): ETC na metale szlachetne budzi wątpliwości w świetle zakazu nabywania certyfikatów reprezentujących metale szlachetne.</li>" +
              "<li>Fundusz nie może mieć możliwości otrzymania metalu (dostawa fizyczna).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Wycena i ryzyka",
          html:
            "<p><strong>Wycena:</strong> kurs giełdowy; porównanie z wartością metalu na jednostkę (np. fixing LBMA).</p>" +
            "<ul>" +
              "<li><strong>Ryzyko ceny towaru</strong> i walutowe (złoto notowane w USD).</li>" +
              "<li><strong>Ryzyko struktury</strong> — skuteczność zastawu, ryzyko custodiana skarbca, ryzyko kontrahentów swapu (ETC syntetyczne).</li>" +
              "<li><strong>Ryzyko rolowania</strong> — ETC na kontraktach terminowych (contango i backwardation).</li>" +
              "<li><strong>Ryzyko płynności</strong> — zależność od market makerów.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Cykl życia i rozliczenie",
          html:
            "<ol>" +
              "<li>Zakup na giełdzie, rozliczenie DvP.</li>" +
              "<li>Raporty o ilości metalu (lista sztabek), zmiany programu.</li>" +
              "<li>Sprzedaż; ewentualne zakończenie programu przez emitenta.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Zakaz metali szlachetnych <span class='law'>art. 50 ust. 2 lit. b UCITS</span></h4><p>UCITS nie może nabywać metali szlachetnych ani certyfikatów je reprezentujących.</p></div>" +
              "<div class='rule'><h4>Papiery powiązane z towarami <span class='law'>art. 2 ust. 2 dyr. 2007/16/WE</span></h4><p>Instrumenty powiązane z wynikiem towarów mogą być zbywalnymi papierami wartościowymi, jeśli spełniają kryteria, nie zawierają wbudowanego derywatu i nie prowadzą do dostawy fizycznej.</p></div>" +
              "<div class='rule'><h4>Kwestia interpretacyjna</h4><p>Czy ETC zabezpieczony fizycznym złotem jest dopuszczalnym papierem (1:1, bez dostawy), czy „certyfikatem reprezentującym metal szlachetny”, oceniają nadzorcy krajowi — ich stanowiska się różnią. Przed inwestycją potrzebna jest ocena prawna zgodna z praktyką nadzorcy kraju funduszu i zapis w polityce.</p></div>" +
              "<div class='rule'><h4>Wbudowany derywat <span class='law'>art. 10 dyr. 2007/16/WE</span></h4><p>ETC z dźwignią lub odwrotny zawiera derywat — wtedy bazą musiałby być dopuszczalny indeks finansowy (indeks towarowy spełniający kryteria), a nie pojedynczy towar.</p></div>" +
              "<div class='rule'><h4>Limity emitenta <span class='law'>art. 52</span></h4><p>Emitent ETC: 5/10/40, limit łączny 20%.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>AIF mogą zwykle inwestować w towary i ETC zgodnie z dokumentami — dyrektywa nie zakazuje metali szlachetnych.</li>" +
              "<li>Raport Annex IV: ekspozycja na towary (np. złoto).</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Raportowanie",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — raporty transakcyjne po stronie firmy inwestycyjnej.</li>" +
              "<li>Brak raportowania EMIR dla samego ETC.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identyfikatory",
          html:
            "<ul>" +
              "<li><strong>ISIN</strong> ETC, <strong>LEI emitenta (SPV)</strong>.</li>" +
              "<li><strong>CFI</strong> — kategoria <code>D</code> (Debt); grupa zależna od struktury.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Checklista kontroli post-trade",
          html:
            "<ul class='checklist'>" +
              "<li>Ocena dopuszczalności dla UCITS (art. 50 ust. 2 lit. b, art. 2 ust. 2 dyr. 2007/16/WE) — udokumentowana.</li>" +
              "<li>Brak wbudowanego derywatu i dostawy fizycznej do funduszu.</li>" +
              "<li>Limit emitenta (SPV).</li>" +
              "<li>Limity ekspozycji na towary z prospektu.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Metal entitlement", "Ilość metalu przypadająca na jednostkę ETC."],
        ["Trustee", "Powiernik reprezentujący posiadaczy i egzekwujący zabezpieczenie."],
        ["Contango / backwardation", "Ceny terminowe wyższe / niższe od cen spot — wpływają na koszt rolowania futures."]
      ]
    },

    /* ===================== ENGLISH ===================== */
    en: {
      summary: "An ETC is a listed debt security (usually issued by a special purpose vehicle) whose value tracks the price of a commodity — e.g. gold — or an index of commodity futures. The most popular are ETCs backed by physical metal held in a vault. In Europe, ETCs replace commodity funds because a UCITS cannot be a single-commodity fund.",
      keyFacts: [
        ["Issuer", "Special purpose vehicle (SPV), often in Ireland or Jersey; a trustee acts for holders."],
        ["Collateral", "Physical metal in a vault (e.g. London, Zurich) or collateralised swaps/futures."],
        ["Value", "Each unit represents a set quantity of the commodity (entitlement), reduced by the annual fee."],
        ["Market", "Exchange (ETP segment); creation and redemption by authorised participants."],
        ["Settlement", "EU: T+2 (T+1 from 11 Oct 2027), often in an international CSD."],
        ["Physical redemption", "Some programmes let eligible holders take delivery of metal — an important constraint for UCITS."],
        ["CFI code", "Category <code>D</code> (Debt); group depends on structure and data vendor"]
      ],
      sections: [
        {
          id: "definition", title: "Definition",
          html:
            "<p>An Exchange-Traded Commodity is a debt security giving exposure to a commodity price without holding the commodity directly. Two main types:</p>" +
            "<ul>" +
              "<li><strong>physically backed</strong> (e.g. gold, silver) — the issuer buys metal and stores it with a vault custodian; the metal is pledged to holders;</li>" +
              "<li><strong>synthetic</strong> — exposure via commodity swaps or futures, collateralised with securities.</li>" +
            "</ul>" +
            "<p>Unlike an <a href='#/i/exchange-traded-note'>ETN</a>, an ETC is usually collateralised, but it is still debt, not a fund.</p>"
        },
        {
          id: "mechanics", title: "How it works, step by step",
          html:
            "<ol class='steps'>" +
              "<li><strong>Creation.</strong> An authorised participant delivers cash or metal; the issuer buys metal for the vault and issues units.</li>" +
              "<li><strong>Trading.</strong> On the exchange with market makers; price close to the value of metal per unit.</li>" +
              "<li><strong>Fee.</strong> Charged by gradually reducing the metal entitlement per unit.</li>" +
              "<li><strong>Redemption.</strong> An authorised participant returns units and receives cash or metal.</li>" +
              "<li><strong>Default event.</strong> The trustee enforces the security (sells the metal) for holders.</li>" +
            "</ol>"
        },
        {
          id: "example", title: "Worked example",
          html:
            "<p>A mixed-asset fund (NAV EUR 200m) wants gold exposure and buys EUR 5m of a physically backed gold ETC.</p>" +
            "<div class='table-scroll'><table class='calc'><thead><tr><th>Item</th><th>Calculation</th><th class='num'>Result</th></tr></thead><tbody>" +
              "<tr><td>Share of NAV</td><td>5 / 200</td><td class='num'>2.5%</td></tr>" +
              "<tr><td>Gold price +10% (in EUR)</td><td>5,000,000 × 10%</td><td class='num'>+EUR 500,000</td></tr>" +
              "<tr><td>Annual fee 0.15%</td><td>5,000,000 × 0.15%</td><td class='num'>≈ EUR 7,500</td></tr>" +
            "</tbody></table></div>" +
            "<h3>What this means for compliance</h3>" +
            "<ul>" +
              "<li>The issuer limit applies to the <strong>ETC issuer (SPV)</strong> — 2.5% of NAV within 5/10/40.</li>" +
              "<li><strong>Eligibility</strong> for UCITS is key (see below): precious metal ETCs raise questions in light of the ban on certificates representing precious metals.</li>" +
              "<li>The fund must not be able to receive metal (physical delivery).</li>" +
            "</ul>"
        },
        {
          id: "risks", title: "Valuation and risks",
          html:
            "<p><strong>Valuation:</strong> exchange price; compared with the metal value per unit (e.g. LBMA fixing).</p>" +
            "<ul>" +
              "<li><strong>Commodity price risk</strong> and FX risk (gold priced in USD).</li>" +
              "<li><strong>Structural risk</strong> — effectiveness of the pledge, vault custodian risk, swap counterparty risk (synthetic ETCs).</li>" +
              "<li><strong>Roll risk</strong> — futures-based ETCs (contango and backwardation).</li>" +
              "<li><strong>Liquidity risk</strong> — dependence on market makers.</li>" +
            "</ul>"
        },
        {
          id: "lifecycle", title: "Lifecycle and settlement",
          html:
            "<ol>" +
              "<li>Purchase on the exchange, DvP settlement.</li>" +
              "<li>Metal reports (bar list), programme changes.</li>" +
              "<li>Sale; possible programme termination by the issuer.</li>" +
            "</ol>"
        },
        {
          id: "ucits", title: "Post-trade compliance: UCITS",
          html:
            "<div class='rules'>" +
              "<div class='rule'><h4>Precious metals ban <span class='law'>Art. 50(2)(b) UCITS</span></h4><p>A UCITS may not acquire precious metals or certificates representing them.</p></div>" +
              "<div class='rule'><h4>Commodity-linked securities <span class='law'>Art. 2(2) Dir. 2007/16/EC</span></h4><p>Instruments linked to commodity performance may be transferable securities if they meet the criteria, do not embed a derivative and do not lead to physical delivery.</p></div>" +
              "<div class='rule'><h4>Interpretive question</h4><p>Whether a physically backed gold ETC is an eligible security (1:1, no delivery) or a \"certificate representing a precious metal\" is assessed by national regulators — and their positions differ. Before investing, a legal assessment consistent with the practice of the fund's home regulator and a policy provision are needed.</p></div>" +
              "<div class='rule'><h4>Embedded derivative <span class='law'>Art. 10 Dir. 2007/16/EC</span></h4><p>A leveraged or inverse ETC embeds a derivative — its underlying would then have to be an eligible financial index (a commodity index meeting the criteria), not a single commodity.</p></div>" +
              "<div class='rule'><h4>Issuer limits <span class='law'>Art. 52</span></h4><p>ETC issuer: 5/10/40, 20% combined limit.</p></div>" +
            "</div>"
        },
        {
          id: "aifmd", title: "Post-trade compliance: AIFMD",
          html:
            "<ul>" +
              "<li>AIFs can usually invest in commodities and ETCs per their documents — the Directive does not ban precious metals.</li>" +
              "<li>Annex IV report: commodity exposure (e.g. gold).</li>" +
            "</ul>"
        },
        {
          id: "reporting", title: "Reporting",
          html:
            "<ul>" +
              "<li><strong>MiFIR</strong> — transaction reports by the investment firm.</li>" +
              "<li>No EMIR reporting for the ETC itself.</li>" +
            "</ul>"
        },
        {
          id: "identifiers", title: "Identifiers",
          html:
            "<ul>" +
              "<li>ETC <strong>ISIN</strong>, <strong>issuer (SPV) LEI</strong>.</li>" +
              "<li><strong>CFI</strong> — category <code>D</code> (Debt); group depends on the structure.</li>" +
            "</ul>"
        },
        {
          id: "checklist", title: "Post-trade control checklist",
          html:
            "<ul class='checklist'>" +
              "<li>UCITS eligibility assessment (Art. 50(2)(b), Art. 2(2) Dir. 2007/16/EC) — documented.</li>" +
              "<li>No embedded derivative and no physical delivery to the fund.</li>" +
              "<li>Issuer (SPV) limit.</li>" +
              "<li>Commodity exposure limits from the prospectus.</li>" +
            "</ul>"
        }
      ],
      glossary: [
        ["Metal entitlement", "Quantity of metal per ETC unit."],
        ["Trustee", "Represents holders and enforces the security."],
        ["Contango / backwardation", "Futures prices above / below spot — affect the cost of rolling futures."]
      ]
    }
  }
});

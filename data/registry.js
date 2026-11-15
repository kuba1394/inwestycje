/*
 * Rejestr instrumentów.
 * - window.INSTRUMENTS wypełniają pliki z data/instruments/*.js
 * - window.PLANNED to lista instrumentów zaplanowanych (bez karty) — widoczna w katalogu jako „w przygotowaniu”.
 * - window.LAW to wspólne źródła prawne, do których odwołują się karty (pole `sources`).
 * Nazwy instrumentów są zawsze po angielsku.
 */
window.INSTRUMENTS = [];

window.LAW = {
  ucits:      { label: "Directive 2009/65/EC (UCITS Directive)", url: "https://eur-lex.europa.eu/eli/dir/2009/65/oj" },
  eligible:   { label: "Commission Directive 2007/16/EC (eligible assets)", url: "https://eur-lex.europa.eu/eli/dir/2007/16/oj" },
  emir3dir:   { label: "Directive (EU) 2024/2994 (EMIR 3 — zmiany w UCITS)", url: "https://eur-lex.europa.eu/eli/dir/2024/2994/oj" },
  aifmd:      { label: "Directive 2011/61/EU (AIFMD)", url: "https://eur-lex.europa.eu/eli/dir/2011/61/oj" },
  aifmdL2:    { label: "Commission Delegated Regulation (EU) 231/2013 (AIFMD Level 2)", url: "https://eur-lex.europa.eu/eli/reg_del/2013/231/oj" },
  emir:       { label: "Regulation (EU) 648/2012 (EMIR)", url: "https://eur-lex.europa.eu/eli/reg/2012/648/oj" },
  marginRts:  { label: "Commission Delegated Regulation (EU) 2016/2251 (margin RTS)", url: "https://eur-lex.europa.eu/eli/reg_del/2016/2251/oj" },
  csdrT1:     { label: "Regulation (EU) 2025/2075 (CSDR — T+1)", url: "https://eur-lex.europa.eu/eli/reg/2025/2075/oj" },
  ssr:        { label: "Regulation (EU) 236/2012 (Short Selling Regulation)", url: "https://eur-lex.europa.eu/eli/reg/2012/236/oj" },
  td:         { label: "Directive 2004/109/EC (Transparency Directive)", url: "https://eur-lex.europa.eu/eli/dir/2004/109/oj" },
  bmr:        { label: "Regulation (EU) 2016/1011 (Benchmarks Regulation)", url: "https://eur-lex.europa.eu/eli/reg/2016/1011/oj" },
  mifidDR:    { label: "Commission Delegated Regulation (EU) 2017/565 (MiFID II — art. 10, FX spot)", url: "https://eur-lex.europa.eu/eli/reg_del/2017/565/oj" },
  cesr10788:  { label: "CESR/10-788 — Guidelines on Risk Measurement and the Calculation of Global Exposure", url: null },
  esma2014:   { label: "ESMA/2014/937 — Guidelines on ETFs and other UCITS issues", url: null },
  esmaShare:  { label: "ESMA34-43-296 — Opinion on UCITS share classes (2017)", url: null }
};

/* market: "exchange" | "otc" */
window.PLANNED = [
  // Exchange-Traded
  { name: "Preferred Stock", market: "exchange", asset: { pl: "Akcje", en: "Equity" } },
  { name: "Depositary Receipt (ADR / GDR)", market: "exchange", asset: { pl: "Akcje", en: "Equity" } },
  { name: "Exchange-Traded Fund (ETF)", market: "exchange", asset: { pl: "Fundusze", en: "Funds" } },
  { name: "Exchange-Traded Note (ETN)", market: "exchange", asset: { pl: "Dłużne / strukturyzowane", en: "Debt / structured" } },
  { name: "Exchange-Traded Commodity (ETC)", market: "exchange", asset: { pl: "Towary", en: "Commodities" } },
  { name: "Real Estate Investment Trust (REIT)", market: "exchange", asset: { pl: "Akcje", en: "Equity" } },
  { name: "Closed-End Fund", market: "exchange", asset: { pl: "Fundusze", en: "Funds" } },
  { name: "Warrant", market: "exchange", asset: { pl: "Derywaty giełdowe", en: "Listed derivatives" } },
  { name: "Listed Equity Option", market: "exchange", asset: { pl: "Derywaty giełdowe", en: "Listed derivatives" } },
  { name: "Government Bond Future", market: "exchange", asset: { pl: "Derywaty giełdowe", en: "Listed derivatives" } },
  { name: "Short-Term Interest Rate Future (STIR)", market: "exchange", asset: { pl: "Derywaty giełdowe", en: "Listed derivatives" } },
  { name: "Exchange-Traded Certificate", market: "exchange", asset: { pl: "Produkty strukturyzowane", en: "Structured products" } },
  // OTC
  { name: "Government Bond", market: "otc", asset: { pl: "Dłużne", en: "Fixed income" }, note: { pl: "obrót głównie OTC, często także notowane", en: "mostly traded OTC, often also listed" } },
  { name: "Corporate Bond", market: "otc", asset: { pl: "Dłużne", en: "Fixed income" }, note: { pl: "obrót głównie OTC, często także notowane", en: "mostly traded OTC, often also listed" } },
  { name: "Covered Bond", market: "otc", asset: { pl: "Dłużne", en: "Fixed income" } },
  { name: "Convertible Bond", market: "otc", asset: { pl: "Dłużne / hybrydowe", en: "Fixed income / hybrid" } },
  { name: "Treasury Bill", market: "otc", asset: { pl: "Rynek pieniężny", en: "Money market" } },
  { name: "Commercial Paper", market: "otc", asset: { pl: "Rynek pieniężny", en: "Money market" } },
  { name: "Certificate of Deposit", market: "otc", asset: { pl: "Rynek pieniężny", en: "Money market" } },
  { name: "Forward Rate Agreement (FRA)", market: "otc", asset: { pl: "Derywaty stopy procentowej", en: "Interest rate derivatives" } },
  { name: "Overnight Index Swap (OIS)", market: "otc", asset: { pl: "Derywaty stopy procentowej", en: "Interest rate derivatives" } },
  { name: "Cross-Currency Swap", market: "otc", asset: { pl: "Derywaty stopy procentowej / walutowe", en: "Rates / FX derivatives" } },
  { name: "Interest Rate Cap / Floor", market: "otc", asset: { pl: "Derywaty stopy procentowej", en: "Interest rate derivatives" } },
  { name: "Swaption", market: "otc", asset: { pl: "Derywaty stopy procentowej", en: "Interest rate derivatives" } },
  { name: "FX Swap", market: "otc", asset: { pl: "Derywaty walutowe", en: "FX derivatives" } },
  { name: "Non-Deliverable Forward (NDF)", market: "otc", asset: { pl: "Derywaty walutowe", en: "FX derivatives" } },
  { name: "FX Option", market: "otc", asset: { pl: "Derywaty walutowe", en: "FX derivatives" } },
  { name: "Credit Default Swap (CDS)", market: "otc", asset: { pl: "Derywaty kredytowe", en: "Credit derivatives" } },
  { name: "Total Return Swap (TRS)", market: "otc", asset: { pl: "Derywaty", en: "Derivatives" } },
  { name: "Equity Swap", market: "otc", asset: { pl: "Derywaty akcyjne", en: "Equity derivatives" } },
  { name: "Contract for Difference (CFD)", market: "otc", asset: { pl: "Derywaty akcyjne", en: "Equity derivatives" } },
  { name: "Repurchase Agreement (Repo)", market: "otc", asset: { pl: "Finansowanie papierami (SFT)", en: "Securities financing (SFT)" } },
  { name: "Securities Lending", market: "otc", asset: { pl: "Finansowanie papierami (SFT)", en: "Securities financing (SFT)" } }
];

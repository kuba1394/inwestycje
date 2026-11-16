/*
 * Rejestr instrumentów.
 * - window.INSTRUMENTS wypełniają pliki z data/instruments/*.js
 * - window.PLANNED to lista instrumentów zaplanowanych (bez karty) — widoczna w katalogu jako „w przygotowaniu”.
 * - window.LAW to wspólne źródła prawne, do których odwołują się karty (pole `sources`).
 * Nazwy instrumentów są zawsze po angielsku.
 */
window.INSTRUMENTS = [];
window.BASICS = [];

window.LAW = {
  ucits:      { label: "Directive 2009/65/EC (UCITS Directive)", url: "https://eur-lex.europa.eu/eli/dir/2009/65/oj" },
  eligible:   { label: "Commission Directive 2007/16/EC (eligible assets)", url: "https://eur-lex.europa.eu/eli/dir/2007/16/oj" },
  emir3dir:   { label: "Directive (EU) 2024/2994 (EMIR 3 — zmiany w UCITS)", url: "https://eur-lex.europa.eu/eli/dir/2024/2994/oj" },
  aifmd:      { label: "Directive 2011/61/EU (AIFMD)", url: "https://eur-lex.europa.eu/eli/dir/2011/61/oj" },
  aifmdL2:    { label: "Commission Delegated Regulation (EU) 231/2013 (AIFMD Level 2)", url: "https://eur-lex.europa.eu/eli/reg_del/2013/231/oj" },
  emir:       { label: "Regulation (EU) 648/2012 (EMIR)", url: "https://eur-lex.europa.eu/eli/reg/2012/648/oj" },
  marginRts:  { label: "Commission Delegated Regulation (EU) 2016/2251 (margin RTS)", url: "https://eur-lex.europa.eu/eli/reg_del/2016/2251/oj" },
  csdr:       { label: "Regulation (EU) 909/2014 (CSDR)", url: "https://eur-lex.europa.eu/eli/reg/2014/909/oj" },
  aifmd2:     { label: "Directive (EU) 2024/927 (AIFMD II)", url: "https://eur-lex.europa.eu/eli/dir/2024/927/oj" },
  csdrT1:     { label: "Regulation (EU) 2025/2075 (CSDR — T+1)", url: "https://eur-lex.europa.eu/eli/reg/2025/2075/oj" },
  ssr:        { label: "Regulation (EU) 236/2012 (Short Selling Regulation)", url: "https://eur-lex.europa.eu/eli/reg/2012/236/oj" },
  td:         { label: "Directive 2004/109/EC (Transparency Directive)", url: "https://eur-lex.europa.eu/eli/dir/2004/109/oj" },
  bmr:        { label: "Regulation (EU) 2016/1011 (Benchmarks Regulation)", url: "https://eur-lex.europa.eu/eli/reg/2016/1011/oj" },
  sftr:       { label: "Regulation (EU) 2015/2365 (SFTR)", url: "https://eur-lex.europa.eu/eli/reg/2015/2365/oj" },
  cbd:        { label: "Directive (EU) 2019/2162 (Covered Bonds Directive)", url: "https://eur-lex.europa.eu/eli/dir/2019/2162/oj" },
  secReg:     { label: "Regulation (EU) 2017/2402 (Securitisation Regulation)", url: "https://eur-lex.europa.eu/eli/reg/2017/2402/oj" },
  mifir:      { label: "Regulation (EU) 600/2014 (MiFIR)", url: "https://eur-lex.europa.eu/eli/reg/2014/600/oj" },
  mifid:      { label: "Directive 2014/65/EU (MiFID II)", url: "https://eur-lex.europa.eu/eli/dir/2014/65/oj" },
  mmfr:       { label: "Regulation (EU) 2017/1131 (Money Market Funds Regulation)", url: "https://eur-lex.europa.eu/eli/reg/2017/1131/oj" },
  mifidDR:    { label: "Commission Delegated Regulation (EU) 2017/565 (MiFID II — art. 10, FX spot)", url: "https://eur-lex.europa.eu/eli/reg_del/2017/565/oj" },
  cesr10788:  { label: "CESR/10-788 — Guidelines on Risk Measurement and the Calculation of Global Exposure", url: null },
  esma2014:   { label: "ESMA/2014/937 — Guidelines on ETFs and other UCITS issues", url: null },
  esmaShare:  { label: "ESMA34-43-296 — Opinion on UCITS share classes (2017)", url: null }
};

/* market: "exchange" | "otc" */
window.PLANNED = [
  // Wszystkie zaplanowane instrumenty mają już karty. Nowe pozycje dodawaj tutaj:
  // { name: "Instrument Name", market: "exchange" | "otc", asset: { pl: "…", en: "…" } }
];

# Szablon karty instrumentu

Każda karta to plik `data/instruments/<id>.js`, który dodaje obiekt do `window.INSTRUMENTS`.

```js
window.INSTRUMENTS.push({
  id: "credit-default-swap",          // adres: #/i/credit-default-swap
  name: "Credit Default Swap",        // ZAWSZE po angielsku
  aliases: ["CDS"],                   // dodatkowe nazwy do wyszukiwarki
  market: "otc",                      // "exchange" albo "otc"
  asset: { pl: "Derywaty kredytowe", en: "Credit derivatives" },
  sources: ["ucits", "emir"],         // klucze z window.LAW w data/registry.js
  content: {
    pl: {
      summary: "Jedno–dwa zdania.",
      keyFacts: [["Etykieta", "Wartość (może zawierać HTML)"]],
      sections: [ { id: "definition", title: "Definicja", html: "<p>…</p>" } ],
      glossary: [["Termin", "Wyjaśnienie"]]
    },
    en: { /* ta sama struktura, te same id sekcji */ }
  }
});
```

## Stały układ sekcji (`id` → tytuł PL / EN)

| id | PL | EN |
|---|---|---|
| `definition` | Definicja | Definition |
| `mechanics` | Jak to działa krok po kroku | How it works, step by step |
| `example` | Przykład liczbowy | Worked example |
| `risks` | Wycena i ryzyka | Valuation and risks |
| `lifecycle` | Cykl życia i rozliczenie | Lifecycle and settlement |
| `ucits` | Post-trade compliance: UCITS | Post-trade compliance: UCITS |
| `aifmd` | Post-trade compliance: AIFMD | Post-trade compliance: AIFMD |
| `reporting` | Raportowanie | Reporting |
| `identifiers` | Identyfikatory | Identifiers |
| `checklist` | Checklista kontroli post-trade | Post-trade control checklist |

Można dodać sekcję dodatkową (np. `mmf` — Fundusze rynku pieniężnego), o ile ma to samo `id` w PL i EN.

## Klasy HTML do użycia w treści

- `<ol class='steps'>` — numerowane kroki mechaniki
- `<p class='formula'>` — wzór
- `<table class='calc'>` z `<td class='num'>` — obliczenia (owinięte w `<div class='table-scroll'>`)
- `<div class='rules'><div class='rule'><h4>Tytuł <span class='law'>art. X</span></h4><p>…</p></div></div>` — reguły regulacyjne
- `<div class='callout'>` / `<div class='callout warn'>` — wyróżniona uwaga
- `<ul class='checklist'>` — lista kontrolna

Treść jest wstawiana jako HTML — używaj apostrofów `'` w atrybutach, bo pliki używają cudzysłowów `"` dla stringów JS.

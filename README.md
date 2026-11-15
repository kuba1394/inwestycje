# Instrumenty finansowe — baza wiedzy

Statyczna strona internetowa z opisami instrumentów finansowych dla zespołu **post-trade compliance** funduszy inwestycyjnych (UCITS, AIFMD).

- Podział: **Exchange-Traded** i **OTC**
- Nazwy instrumentów zawsze po angielsku
- Opisy po polsku i po angielsku; przełącznik PL/EN na każdej karcie (domyślnie PL)
- Każda karta: definicja → mechanika krok po kroku → przykład liczbowy → wycena i ryzyka → cykl życia → UCITS → AIFMD → raportowanie → identyfikatory → checklista kontroli → słowniczek → podstawa prawna

## Zawartość

37 kart: 14 Exchange-Traded i 23 OTC (akcje, fundusze, ETP, derywaty giełdowe i OTC, instrumenty dłużne i rynku pieniężnego, transakcje finansujące papiery wartościowe).

## Uruchomienie

Strona nie wymaga budowania ani serwera. Wystarczy otworzyć `index.html` w przeglądarce albo włączyć GitHub Pages:

**Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`**

## Struktura

```
index.html                     # szkielet strony
css/style.css                  # wygląd (jasny/ciemny motyw, wydruk)
js/app.js                      # routing, katalog, wyszukiwarka, przełącznik języka
data/registry.js               # wspólne źródła prawne + lista instrumentów w przygotowaniu
data/instruments/<id>.js       # jedna karta = jeden plik
docs/TEMPLATE.md               # jak dodać nowy instrument
```

## Dodawanie instrumentu

1. Skopiuj istniejący plik z `data/instruments/` i zmień `id`, `name`, `market`, treść `pl` i `en`.
2. Dodaj `<script src="data/instruments/<id>.js"></script>` w `index.html`.
3. Jeśli instrument był na liście `window.PLANNED` w `data/registry.js`, usuń go stamtąd.

Szczegóły: [docs/TEMPLATE.md](docs/TEMPLATE.md).

## Zastrzeżenie

Materiał edukacyjny i roboczy. Przykłady liczbowe są hipotetyczne. Przed użyciem w kontroli sprawdź aktualny tekst przepisów, dokumenty funduszu i procedury wewnętrzne.

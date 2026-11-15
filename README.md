# Instrumenty finansowe — baza wiedzy

Statyczna strona internetowa z opisami instrumentów finansowych dla zespołu **post-trade compliance** funduszy inwestycyjnych (UCITS, AIFMD).

- Podział: **Exchange-Traded** i **OTC**
- Nazwy instrumentów zawsze po angielsku
- Opisy po polsku i po angielsku; przełącznik PL/EN na każdej karcie (domyślnie PL)
- Każda karta: definicja → mechanika krok po kroku → przykład liczbowy → wycena i ryzyka → cykl życia → UCITS → AIFMD → raportowanie → identyfikatory → checklista kontroli → słowniczek → podstawa prawna

## Zawartość

- **Katalog** — 37 kart: 14 Exchange-Traded i 23 OTC. Każda ma poziom trudności, sekcję „W 30 sekund”, wymagane podstawy, powiązane instrumenty i datę weryfikacji.
- **Nauka** — ścieżka nauki w 6 etapach z postępem, 13 stron podstaw (PL/EN), słownik PL↔EN z podpowiedziami na kartach, fiszki, 41 quizów (108 pytań) i test losowy, tabele porównawcze, lekcje z historii (Herstatt, LTCM, Reserve Primary, AIG, LIBOR, marzec 2020, Archegos, LDI).
- **Compliance** — drzewo decyzyjne „nowy instrument w portfelu”, matryca obowiązków (limity, ekspozycja, EMIR, clearing, SFTR, SSR, znaczne pakiety), tabela limitów UCITS/AIFMD/MMFR, studia przypadków, oś czasu zmian w przepisach.
- **Kalkulatory** — test 5/10/40, ekspozycja w metodzie zaangażowania, FX forward, cena/duration/DV01 obligacji, bon skarbowy, Black-Scholes.

Postęp nauki (przeczytane, wyniki quizów, fiszki) zapisuje się w `localStorage` przeglądarki.

## Uruchomienie

Strona nie wymaga budowania ani serwera. Wystarczy otworzyć `index.html` w przeglądarce albo włączyć GitHub Pages:

**Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / `(root)`**

## Struktura

```
index.html                     # szkielet strony
css/style.css                  # wygląd (jasny/ciemny motyw, wydruk)
js/app.js                      # rdzeń: routing, katalog, renderer kart, słownik i podpowiedzi, postęp
js/learn.js                    # Nauka: ścieżka, podstawy, słownik, fiszki, quizy, porównania, historia
js/compliance.js               # Compliance: drzewo decyzyjne, matryca, limity, przypadki, zmiany
js/tools.js                    # Kalkulatory
data/registry.js               # wspólne źródła prawne + lista instrumentów w przygotowaniu
data/instruments/<id>.js       # jedna karta = jeden plik
data/basics/<id>.js            # strony podstaw (PL/EN)
data/meta.js                   # poziom, „W 30 sekund”, wymagane podstawy, powiązania, data weryfikacji
data/quiz.js, path.js, compare.js, history.js, glossary-extra.js        # treści modułu Nauka
data/decision.js, matrix.js, limits.js, cases.js, changes.js            # treści modułu Compliance
docs/TEMPLATE.md               # jak dodać nowy instrument
```

## Dodawanie instrumentu

1. Skopiuj istniejący plik z `data/instruments/` i zmień `id`, `name`, `market`, treść `pl` i `en`.
2. Dodaj `<script src="data/instruments/<id>.js"></script>` w `index.html`.
3. Dodaj wpis w `data/meta.js` i wiersz w `data/matrix.js`; opcjonalnie quiz w `data/quiz.js` (id zestawu = id karty).
4. Jeśli instrument był na liście `window.PLANNED` w `data/registry.js`, usuń go stamtąd.

Szczegóły: [docs/TEMPLATE.md](docs/TEMPLATE.md).

## Zastrzeżenie

Materiał edukacyjny i roboczy. Przykłady liczbowe są hipotetyczne. Przed użyciem w kontroli sprawdź aktualny tekst przepisów, dokumenty funduszu i procedury wewnętrzne.

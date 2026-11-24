# „Znajdź najbliższy meetup” — materiały promo

**Feature:** przycisk „Find my nearest meetup” w sekcji Join Us na meetjs.pl — używa eksperymentalnego elementu `<geolocation>` (fallback: `navigator.geolocation`), liczy odległość haversine do miast meet.js i podpowiada najbliższe. W promieniu ~20 km pokazuje „Looks like you're in a meet.js city”. Plus FAQ na natywnym `<details>`.

**Link:** https://meetjs.pl (sekcja „Join Us”, pod mapą Polski)
**Wersja PL** — pod posty społeczności meet.js

---

## 1. LinkedIn (post)

**Obraz:** `graphics/linkedin-1200x630.png`

### Wariant A — społeczność + frontend geek

📍 Nowość na meetjs.pl: „Znajdź najbliższy meetup”

Jeden klik — i mapa podpowie, w którym mieście jest Twój lokalny meet.js. Bez wpisywania miasta, bez scrollowania listy.

A dla frontendowców coś ekstra: pod spodem działa nowy, eksperymentalny element HTML `<geolocation>` (z fallbackiem do `navigator.geolocation`). Odległość do miast liczymy wzorem haversine — wszystko w Twojej przeglądarce, lokalizacja nie wychodzi z urządzenia. 🔒

Sprawdź: https://meetjs.pl

#meetjs #JavaScript #webdev #frontend #HTML

### Wariant B — krótszy

📍 Nowe na meetjs.pl — kliknij „Find my nearest meetup”, a mapa wskaże Twoje miasto meet.js.

Ciekawostka dla frontendowców: działa na eksperymentalnym `<geolocation>` + haversine, w 100% client-side.

https://meetjs.pl

---

## 2. X (Twitter)

**Obraz:** `graphics/x-1200x675.png`

### Wariant A

📍 Nowość na meetjs.pl — „Find my nearest meetup”

Jeden klik → mapa wskazuje Twoje miasto meet.js.

Pod spodem: eksperymentalny `<geolocation>` + haversine, wszystko client-side. Lokalizacja nie opuszcza przeglądarki 🔒

meetjs.pl

### Wariant B (krótszy)

Nowy ficzer na meetjs.pl: 📍 „Find my nearest meetup” — `<geolocation>` + haversine, zero JS-owych bibliotek do mapy, lokalizacja zostaje w przeglądarce.

meetjs.pl

---

## Warianty EN (na wypadek postów anglojęzycznych)

### LinkedIn EN

📍 New on meetjs.pl: "Find my nearest meetup"

One click — and the map tells you which city hosts your local meet.js meetup. No typing, no scrolling through the list.

Frontend bonus: it's powered by the experimental `<geolocation>` HTML element (with a `navigator.geolocation` fallback), and distances are computed with the haversine formula — entirely in your browser. Your location never leaves your device. 🔒

Try it: https://meetjs.pl

#meetjs #JavaScript #webdev #frontend #HTML

### X EN

📍 New on meetjs.pl — "Find my nearest meetup"

One click → the map points you to your meet.js city. Powered by the experimental `<geolocation>` element + haversine, fully client-side 🔒

meetjs.pl

---

## Notatki operacyjne

| Kanał    | Format obrazu | Plik                    |
| -------- | ------------- | ----------------------- |
| LinkedIn | 1200×630      | `linkedin-1200x630.png` |
| X        | 1200×675      | `x-1200x675.png`        |

- Grafika pokazuje realną mapę Polski z meetjs.pl (prawdziwe pozycje miast) + mock UI: przycisk, wynik „Kraków”, chip `<geolocation>`.
- Regeneracja: `node docs/social-media/nearest-city/generate-graphics.mjs` (fonty cache'owane w `.fonts/`).
- Jak na grafice „Kraków” nie pasuje — podmień `KRAKOW` / tekst wyniku w skrypcie i regeneruj.

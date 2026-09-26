# Shamrock Calendar — Final Website

Veröffentlichungsfertige, statische und vollständig responsive Website ohne externe Laufzeit-Abhängigkeiten.

## Dateien

- `dist/index.html` — vollständige Website
- `dist/assets/styles.css` — Gestaltung und mobile Ansichten
- `dist/assets/app.js` — Benutzeroberfläche und Sprachen EN-US, FR-CA, DE
- `dist/assets/calendar-engine.js` — getrennte Kalenderberechnung
- `dist/assets/shamrock-calendar-night.png` — originales Hero-Artwork
- `tests/calendar.test.mjs` — systematische Rechen- und Strukturtests

## Kurze Endabnahme

1. Die drei Flaggen testen; Standardsprache ist Englisch (USA).
2. Auf Android prüfen, ob Hero, Datumseingabe und Ergebnis ohne horizontales Scrollen erscheinen.
3. Die beiden Bereichsgrenzen sowie den Übergang 1 v. Chr. / 1 n. Chr. ausprobieren.
4. Festtage auf Kleeblatt, Tagesnummer und besondere Hervorhebung bei zusammentreffendem Sonnen- und Monddatum prüfen.
5. In einem Schaltjahr kontrollieren: Feabhra II hat 30 Tage und kein eigenes Fest; Feabhra I hat 29 Tage und trägt das Februarfest.

Tests lokal ausführen: `npm test`

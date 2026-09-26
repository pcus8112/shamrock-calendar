# Shamrock Calendar – GitHub Pages

Dieses Paket ist direkt für GitHub Pages vorbereitet.

## Veröffentlichung

1. Den **Inhalt dieses Pakets** in das Hauptverzeichnis des Repositorys `shamrock-calendar` hochladen.
2. Vorhandene Dateien gleichen Namens ersetzen.
3. Unter **Settings → Pages** als Quelle **Deploy from a branch**, Branch **main** und Ordner **/(root)** verwenden.
4. Als Custom Domain `calendar.singershamrock.com` beibehalten.

Die Datei `index.html` liegt absichtlich direkt im Hauptverzeichnis. Der Ordner `assets` muss daneben liegen.

## Richtige Struktur

```text
index.html
assets/
CNAME
.nojekyll
README.md
```

Die Ordner `dist` und `tests` werden für die veröffentlichte GitHub-Pages-Version nicht benötigt.

# Mad Scientist

Ein 2D-Seitenscroller-Actionspiel, entwickelt mit reinem HTML, CSS und JavaScript (Canvas). Du spielst einen verrückten Wissenschaftler, der sich durch ein Level voller Gegner kämpft und den Endboss besiegt.

## ✨ Features

- Spielbarer Charakter mit Laserwaffe und werfbaren Bomben
- 3 verschiedene Gegnertypen plus Endboss
- Boss mit Idle-, Treffer- und Zerstörungs-Animation sowie einer Faust-Attacke
- Einsammelbare Gegenstände: Bomben und Heiltränke
- Soundeffekte und Hintergrundmusik (mit Stummschalt-Button)
- Unterstützung für Mobile & Tablet mit Touch-Steuerung
- Querformat (Landscape) für mobile Geräte
- Game-Over- und Sieg-Bildschirm

## 🎮 Steuerung

### Tastatur & Maus

| Taste / Button | Aktion |
|----------------|--------|
| `W` / `A` / `S` / `D` | Hoch / links / runter / rechts bewegen |
| `Leertaste` | Springen |
| Linke Maustaste | Laser schießen |
| Rechte Maustaste | Bombe werfen |
| `R` | Trank trinken (heilen) |
| `Esc` | Pause / zurück zur Steuerung |

### Touch (Mobile / Tablet)

- **D-Pad** (links) – bewegen
- **R** (links) – Trank trinken
- **Jump / Shoot / Bomb** (rechts) – springen, schießen, Bombe werfen

## 🚀 Ausführen

1. Repository klonen.
2. `index.html` im Browser öffnen **oder** den Ordner lokal ausliefern (empfohlen):
   - VS Code: Erweiterung „Live Server" installieren → Rechtsklick auf `index.html` → „Open with Live Server".
   - Oder: `npx serve` / `python -m http.server` im Projektordner ausführen.

> Ein lokaler Server wird empfohlen, da Audio und localStorage zuverlässiger funktionieren als über `file://`.

### Mobile-Landscape-Test (ohne echtes Gerät)

Öffne `test-mobile.html` – es zeigt das Spiel in einem Landscape-Rahmen mit Schnell-Buttons für Handy-/Tablet-Größen.

## 📁 Projektstruktur

```
mad-scientist/
├── index.html            # Startseite
├── game.html             # Das Spiel
├── controls.html         # Steuerungs-Seite
├── controls-game.html    # In-Game-Steuerungs-Seite
├── impressum.html        # Impressum
├── test-mobile.html      # Mobile-Landscape-Testwerkzeug
├── js/                   # Spiellogik (Klassen)
│   ├── models/           # Charakter, Gegner, Boss, Welt, Sounds, ...
│   ├── game.js           # Einstiegspunkt
│   ├── menu-sound.js     # Klick-Sound für Buttons
│   └── mute.js           # Stummschalt-Zustand (localStorage)
├── style/                # Stylesheets
├── sounds/               # Audio-Dateien
└── img/                  # Bilder / Sprites
```

## 🛠️ Technologien

- HTML5 Canvas
- CSS
- Vanilla JavaScript (ohne Frameworks)

## 📄 Credits

Erstellt von Radek Gnych ©

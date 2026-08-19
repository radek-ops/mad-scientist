# Mad Scientist

A 2D side-scrolling action game built with plain HTML, CSS and JavaScript (Canvas). You play a mad scientist who fights his way through a level full of enemies and defeats the final boss.

## ✨ Features

- Playable character with laser gun and throwable bombs
- 3 different enemy types plus a final boss
- Boss with idle, get-hit, destroy animation and a boxing punch attack
- Collectibles: bombs and health potions
- Sound effects and background music (with mute button)
- Mobile / tablet support with on-screen touch controls
- Landscape orientation for mobile devices
- Game over and win screen

## 🎮 Controls

### Keyboard & Mouse

| Key / Button | Action |
|--------------|--------|
| `W` / `A` / `S` / `D` | Move up / left / down / right |
| `Space` | Jump |
| Left mouse button | Shoot laser |
| Right mouse button | Throw bomb |
| `R` | Drink potion (heal) |
| `Esc` | Break / back to controls |

### Touch (mobile / tablet)

- **D-Pad** (left) – move
- **R** (left) – drink potion
- **Jump / Shoot / Bomb** (right) – jump, shoot, throw bomb

## 🚀 How to run

1. Clone the repository.
2. Open `index.html` in your browser, **or** serve the folder locally (recommended):
   - VS Code: install the "Live Server" extension → right-click `index.html` → "Open with Live Server".
   - Or: `npx serve` / `python -m http.server` in the project folder.

> A local server is recommended because audio and localStorage work more reliably than via `file://`.
>
> **Browser:** Always use the latest version of your browser (Chrome, Firefox, Safari or Opera). The game uses modern web features.

### Mobile landscape testing (no device needed)

Open `test-mobile.html` – it shows the game in a landscape frame with quick buttons for phone/tablet sizes.

## 📁 Project structure

```
mad-scientist/
├── index.html            # Start page
├── game.html             # The game
├── controls.html         # Controls page
├── controls-game.html    # In-game controls page
├── impressum.html        # Imprint
├── test-mobile.html      # Mobile landscape test tool
├── js/                   # Game logic (classes)
│   ├── models/           # Character, enemies, boss, world, sounds, ...
│   ├── game.js           # Entry point
│   ├── menu-sound.js     # Button click sound
│   └── mute.js           # Mute state (localStorage)
├── style/                # Stylesheets
├── sounds/               # Audio files
└── img/                  # Images / sprites
```

## 🛠️ Technologies

- HTML5 Canvas
- CSS
- Vanilla JavaScript (no frameworks)

## 📄 Credits

Created by Radek Gnych ©

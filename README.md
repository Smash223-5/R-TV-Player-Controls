# R TV Player Controls

A lightweight Chrome extension that adds essential keyboard shortcuts, modal controls, and custom navigation for the R TV / Chartdrama video player in Telegram Web mini-apps.

---

## Features

- **Apple Dark-Modern UI:** Sleek, rounded-corner popup interface with status indicator (`ON`/`OFF`).
- **Custom Shortcuts:** Full playback, timeline seeking, fullscreen, miniApp modal toggle, and episode switching.
- **Scroll Lock:** Prevents the browser from scrolling down when pressing `Spacebar`.
- **R TV Navigation & AutoAppStart:** Custom launcher with support for Original URL, Custom URLs, and automatic clicking on "Watch Drama" / "Open App" buttons.

---

## Keyboard Controls

| Key | Action |
| :--- | :--- |
| **`G`** | Toggle MiniApp Modal View (Expand / Collapse) |
| **`E`** | Toggle Episode List (Show / Hide) |
| **`F`** | Toggle Video Fullscreen |
| **`SPACE`** / **`K`** | Play / Pause |
| **`RIGHT ARROW`** | Seek forward 1 second |
| **`LEFT ARROW`** | Seek backward 1 second |
| **`L`** | Seek forward 5 seconds |
| **`J`** | Seek backward 5 seconds |
| **`N`** | Next Episode *(if no next episode, seeks to end)* |
| **`B`** | Previous Episode *(if no previous episode, seeks to 0:00)* |

---

## Settings Menu

Access settings by clicking the **Gear Icon** in the top-right corner of the extension popup:

1. **Original Link (`https://t.me/any_drama_bot/rtv`)** — Opens the default Telegram bot page.
2. **Custom Link** — Opens your specified URL.
3. **Custom Link + AppStart** — Opens your specified URL and automatically triggers the **Watch Drama** or **Open App** button upon loading.

---

## Installation Guide

1. **Download / Clone** this repository to your computer.
2. Make sure all project files (`manifest.json`, `content.js`, `popup.html`, `popup.js`, and `icon.png`) are in the same folder.
3. Open Google Chrome and go to `chrome://extensions/`.
4. Enable **Developer mode** (top-right toggle).
5. Click **Load unpacked** and select your project folder.
6. Open or refresh your Telegram Web player tab (`Ctrl + F5` or `Cmd + Shift + R`).

---

## Extension Structure

```text
├── manifest.json   # Configuration, permissions, and script rules
├── content.js      # Page script handling keyboard shortcuts
├── popup.html      # Modern UI layout (Main Menu & Settings Screen)
├── popup.js        # Logic for toggle state, custom URLs & Auto-AppStart
└── icon.png        # Extension icon

# R TV Player Controls

A lightweight Chrome extension that adds essential keyboard shortcuts and playback controls to the custom web video player used in Telegram Web mini-apps (such as Chartdrama / R TV).

---

## Features

- **Custom Keyboard Shortcuts:** Full control over playback, timeline seeking, fullscreen mode, and episode navigation.
- **Scroll Prevention:** Prevents the page from scrolling down when pressing the `Spacebar`.
- **Extension Toggle:** Clean popup interface to easily enable or disable shortcuts with a single click.
- **Cross-Frame Support:** Injects directly into embedded player frames (`mini.chartdrama.com`).

---

## Keyboard Controls

| Key | Action |
| :--- | :--- |
| **`F`** | Toggle Fullscreen |
| **`SPACE`** / **`K`** | Play / Pause |
| **`RIGHT ARROW`** | Seek forward 1 second |
| **`LEFT ARROW`** | Seek backward 1 second |
| **`L`** | Seek forward 5 seconds |
| **`J`** | Seek backward 5 seconds |
| **`N`** | Next Episode *(if no next episode, seeks to the end)* |
| **`B`** | Previous Episode *(if no previous episode, seeks to 0:00)* |

---

## Installation Guide

Since this is a custom extension, install it directly via Chrome's Developer Mode:

1. **Download / Clone** this repository to your local machine.
2. Ensure all files (`manifest.json`, `content.js`, `popup.html`, `popup.js`, and `icon.png`) are in the same root folder.
3. Open Google Chrome and navigate to `chrome://extensions/`.
4. Enable **Developer mode** using the toggle in the top-right corner.
5. Click **Load unpacked** in the top-left corner.
6. Select the folder containing the project files.
7. Open or refresh your Telegram Web player page (`Ctrl + F5` or `Cmd + Shift + R`).

---

## Extension Structure

```text
├── manifest.json   # Extension manifest & match rules
├── content.js      # Main script handling keyboard shortcuts
├── popup.html      # Simple UI with an Enable/Disable toggle
├── popup.js        # Logic for saving the toggle state
└── icon.png        # Extension icon

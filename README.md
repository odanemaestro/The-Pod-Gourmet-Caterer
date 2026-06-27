# The Pod Gourmet Caterer — Menu Site & TV Display

Three things live in this folder:

- **index.html** — the customer-facing website (phone, desktop, browser)
- **catering.html** — the catering inquiry page (call/email to book an event)
- **tv.html** — the full-screen display made for the TV in the restaurant
- **menu-data.js** — the menu itself. Edit this one file and both index.html and tv.html update.

## Updating the menu

Open `menu-data.js`. Each day is a list of items with a category:

```js
{ name: "Curried Mutton", cat: "protein" }
```

Categories: `protein` (mains), `soup`, `rice` (rice/starch), `side` (salads/veg), `boiled` (boiled provisions).

To add, remove, or rename a dish, just edit that list. To add a day note (like Friday's "Good morning ladies"), edit the `note` field for that day. Leave it as `""` for no note.

Save the file — no build step, no install. Refresh the browser and it's live.

## Running it

**Easiest:** double-click `index.html` or `tv.html` to open directly in a browser.

**For the actual TV:** open `tv.html` in the browser on the device plugged into the screen, then make it full screen (F11 on most browsers, or use the browser's kiosk/full-screen mode). It will:
- Show today's menu automatically based on the device's clock
- Roll over to the next day on its own after midnight
- Skip Saturday/Sunday and hold on Monday until the week starts again
- Update the clock in the header

If you ever want to manually flip to a different day on the TV (to preview Thursday's setup on a Wednesday, for example), just click that day's pill at the top — it won't affect the auto-rollover later.

## Hosting it properly

Right now this works as local files. If you want it reachable from any device (e.g. so staff can check the menu from a phone, or so the TV pulls from one central place instead of a local file), the simplest free option is:

1. Create a free GitHub repository and upload these files
2. Turn on GitHub Pages for that repo
3. You'll get a real URL (like `yourname.github.io/menu`) that both the website and the TV can use

Happy to walk through that setup if you want to go that route.

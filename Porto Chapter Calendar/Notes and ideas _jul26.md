# Porto Chapter — Notes & Ideas (July 2026)

_A working scratchpad for the Porto group calendar: things to remember, decisions made, and ideas not yet on the grid. The calendar itself lives in `porto-chapter-calendar.html`; this file is just the human context around it._

Last updated: 2026-07-09

---

## 📌 Open actions

| # | Action | Owner | Status |
| - | ------ | ----- | ------ |
| 1 | **Sunset river cruise (Sun 5 Jul, 19:30–21:30)** happened before the calendar window (grid starts Mon 6 Jul), so it was **dropped from the grid** for now. Revisit if we ever want a "past / retrospective" section covering the first weekend. | — | Parked |

_Add new actions above this line._

---

## ✅ Decisions log

- **Cruise dropped (9 Jul):** it's in the past and sits outside the 4-week window; not worth extending the grid backward for a single finished event.
- **Villa weekend** rendered as per-day tiles inside the 24–26 Jul cells (not a floating lane).
- **RSVP banner removed** — it referenced 8 Jul deadlines that have passed.

---

## 🛠️ Troubleshooting (fixes that worked)

- **Social link preview not showing (WhatsApp, 9 Jul) — SOLVED.** The page had valid Open Graph tags and a reachable image, but WhatsApp still rendered a plain title/domain card with no thumbnail. Two causes, both fixed:
  - **Stale scraper cache.** WhatsApp caches the preview per exact URL, effectively forever, and has no debugger to clear it. **Fix that worked:** re-share the link with a fresh cache-buster query, e.g. `https://cv.garlez.me/porto-chapter-calendar.html?v=3` — WhatsApp treats it as a new URL and re-fetches everything. Bump the number (`?v=4`, `?v=5`, …) each time.
  - **Oversized image.** The original `og:image` was a 320 KB PNG; WhatsApp silently drops previews over ~300 KB. **Fix:** switched to a 600×315 JPEG (~39 KB). Keep the OG image a small JPEG/PNG — avoid WebP, which WhatsApp doesn't reliably render for previews.
- **Other platforms:** Facebook/Messenger → developers.facebook.com/tools/debug → "Scrape Again"; LinkedIn → linkedin.com/post-inspector; Telegram → message @WebpageBot. The `?v=` trick works everywhere as a fallback.

---

## 💡 Ideas parking lot (not scheduled)

Things floated in the channel with no fixed date yet — nudge an organiser to pin a time:

- **Tile-painting workshop** — no date/venue.
- **Via Ferrata climb** — Erin researching routes.
- **Skill share — SEO & GEO fundamentals** — Nigel; date once volunteer numbers are in.

---

## 🗒️ Notes

- "Today" in the calendar is pinned to **Wed 8 Jul 2026** (inferred from RSVP-deadline language). Bump it if the reference date should move.
- Statuses: **Confirmed** = booked/decided · **Pending** = binding post awaiting cut-off · **Interest** = poll or idea.
- Always verify times and prices against the channel before committing money.

---

## 🔗 Quick links

- Live calendar: <https://cv.garlez.me/porto-chapter-calendar.html>
- Source thread: `#por_jul26_adventures` (WiFi Tribe Slack)

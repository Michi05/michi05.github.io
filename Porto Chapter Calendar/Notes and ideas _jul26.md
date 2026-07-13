# Porto Chapter — Notes & Ideas (July 2026)

_A working scratchpad for the Porto group calendar: things to remember, decisions made, and ideas not yet on the grid. The calendar itself lives in `porto-chapter-calendar.html`; this file is just the human context around it._

Last updated: 2026-07-13

---

## 🗺️ Roadmap

- [x] Cleaning hours + Tribal Tuesdays
- [x] Add emojis to see things faster
- [x] Add football matches
- [x] Sync (download) to YOUR own calendar
- [ ] Update automatically from API
- [ ] Auto-Publish a screenshot that can be seen in a glance from slack... in the preview or the canvas
- [x] Full public calendar to sync connect to
- [ ] Make the Google Calendar push part of the regular update workflow (currently a manual one-off — see `google-calendar-mcp-setup.md`)
- [ ] Daily notifications the night before -- automatic chases!

##### With API:
- [ ] Link back to the Slack posts
- [ ] Include full data and comments... even emojis if possible... this is not reliable yet!!
- [ ] Include how many people accepted (if I can...)
- [ ] Polls and multiple-choice on the side (they get a bit lost at the bottom)... or maybe a tabbed version to separate confirmed from 'ideas'
- [ ] Improve the 'clash' algorithm

##### UI Improvements
- [ ] Improve linking to locations
- [x] 4 + 3 format with less tiles per row but more room for weekend plans
- [x] Hide past weeks (instead of days) days after the first week is passed
- [ ] Consolidate colours/lines/emojis, update legend, improve filtering, etc.
- [ ] Sort tiles properly (maybe separate days in 3 parts)


---

## 📌 Open actions

| # | Action | Owner | Status |
| - | ------ | ----- | ------ |
| 1 | **Sunset river cruise (Sun 5 Jul, 19:30–21:30)** happened before the calendar window (grid starts Mon 6 Jul), so it was **dropped from the grid** for now. Revisit if we ever want a "past / retrospective" section covering the first weekend. | — | Parked |

_Add new actions above this line._

---

## ✅ Decisions log

- **Cruise dropped (9 Jul):** it's in the past and sits outside the 4-week window; not worth extending the grid backward for a single finished event.
- **Villa weekend** rendered as a spanning bar across 24–27 Jul cells (confirmed: 3 nights, Fri 24 → Mon 27).
- **RSVP banner removed** — it referenced 8 Jul deadlines that have passed.
- **First week confirmed (9 Jul):** All first-week activities set to confirmed (green) except football matches, poll activities (Odyssey, food tour, speakeasy, autism skill share), and weekly housekeeping (cleaning, Tribal Tuesday).
- **Villa weekend confirmed (9 Jul):** All 4 days confirmed as 3-night stay. Removed separate "optional 3rd night" entry; extended span to cover Fri 24 → Mon 27.
- **B2B sales skill share confirmed (9 Jul):** Harry's session on Thu 9 Jul moved to confirmed status.
- **Odyssey IMAX confirmed & rescheduled (9 Jul):** Moved from Thu 16 poll to Fri 17 at 1:00 PM. Confirmed with group discount (€13.50 for 6+). Added Google Maps link.
- **Food tour moved to Wed 15 (9 Jul):** Porto Walkers food tour pinned to Wednesday 15 Jul at 11:30.
- **Added Lado B Café (9 Jul):** Dan's francesinha lunch suggestion for Fri 10 at 12:00. Added with Google Maps link.
- **Added 8 World Cup matches (9 Jul):** All quarter-finals, semi-finals, third-place, and final added with ⚽ emoji. All set to "interest" status.
- **Simplified clash detection (9 Jul):** All overlaps now show as ◇ (competing options) instead of distinguishing ⚠ hard clashes. Since all events are group activities, overlaps just mean "pick one."
- **Added category emojis (9 Jul):** All event titles prefixed with category-based emojis for quick visual scanning (see README §3.3 for full list).
- **UI improvements (9 Jul):**
  - Floating ideas section moved to top, collapsed by default with counter badge
  - Renamed to "Ideas TBD" with centered text and expand/collapse arrows
  - Width reduced to 85%
  - Status filter buttons consolidated with live counts (removed separate tally pills from hero)
  - Legend replaced with ⓘ icon + hover popover showing only clash indicators
  - Legend icon positioned in bottom-right of hero
  - Weekend day numbers (Sat/Sun) now in firebrick red
  - Events sorted chronologically within each day (morning → evening)
- **Add-to-calendar / .ics export (11 Jul):** Drawer shows an "Add to calendar ↓" button for every dated EVENTS/SPANS item — builds an RFC5545 `.ics` on the fly (data URI, no Blob) and downloads on click. Skipped for FLOATING (dateless) items by design, and hidden for `cancelled` events (brunch, kayak) per call.
- **Calendar grid restructured into Mon–Thu / Fri–Sun rows (13 Jul):** Each 7-day week now renders as two grid rows instead of one, so cells never over-shrink. Weekday names moved inside each day cell (no shared header, since the two row shapes don't share a column layout); Fri–Sun rows render at 85% width, centered, to read as visually "shorter." Below 640px both row shapes collapse to 2 columns.
- **"Show past days" renamed to "Show past rows" (13 Jul):** Toggle now `display:none`s an entire past row at once (only once every day in it is behind today) instead of hiding individual day cells, which used to leave ugly blank gaps. Days within a not-yet-fully-past row still gray out individually. Default changed to **off** — past rows stay hidden until switched on.
- **Dedicated public Google Calendar set up (13 Jul):** New account `wifitribe.porto.jul26@gmail.com`, GCP project `wifitribe-porto-jul26`, public iCal subscribe feed enabled. Claude Code wired to it via `nspady/google-calendar-mcp` (local stdio, OAuth Desktop client, credentials kept outside the repo). All 33 dated `EVENTS`/`SPANS` entries pushed as a one-off (cancelled events and undated `FLOATING` ideas skipped). No automatic sync yet — see `google-calendar-mcp-setup.md` and the new roadmap item above.

---

## 🛠️ Troubleshooting (fixes that worked)

- **Social link preview not showing (WhatsApp, 9 Jul) — SOLVED.** The page had valid Open Graph tags and a reachable image, but WhatsApp still rendered a plain title/domain card with no thumbnail. Two causes, both fixed:
  - **Stale scraper cache.** WhatsApp caches the preview per exact URL, effectively forever, and has no debugger to clear it. **Fix that worked:** re-share the link with a fresh cache-buster query, e.g. `https://cv.garlez.me/porto-chapter-calendar.html?v=3` — WhatsApp treats it as a new URL and re-fetches everything. Bump the number (`?v=4`, `?v=5`, …) each time.
  - **Oversized image.** The original `og:image` was a 320 KB PNG; WhatsApp silently drops previews over ~300 KB. **Fix:** switched to a 600×315 JPEG (~39 KB). Keep the OG image a small JPEG/PNG — avoid WebP, which WhatsApp doesn't reliably render for previews.
- **Other platforms:** Facebook/Messenger → developers.facebook.com/tools/debug → "Scrape Again"; LinkedIn → linkedin.com/post-inspector; Telegram → message @WebpageBot. The `?v=` trick works everywhere as a fallback.

---

## 🗒️ Notes

- "Today" in the calendar is computed live in Porto local time (`Europe/Lisbon`).
- Statuses: **Confirmed** = booked/decided · **Pending** = binding post awaiting cut-off · **Interest** = poll or idea.
- Always verify times and prices against the channel before committing money.
- Category emojis represent the **kind of activity** (duration/context), not the specific content. For example, Chefs on Fire gets 🚌 (trip) not 🍽️ (food), and food tour gets 🏛️ (tour) not 🍽️ (food).
- All overlaps are treated as "competing options" (◇) — the group simply picks one. No distinction between "hard clashes" and "soft overlaps."

---

## 🔗 Quick links

- Live calendar: <https://cv.garlez.me/porto-chapter-calendar.html>
- Source thread: `#por_jul26_adventures` (WiFi Tribe Slack)
- Detailed change log: `development_runbook_jul26.md`

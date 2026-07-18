# Calendar Workflow (Jul 2026)

_Process doc for keeping `porto-chapter-calendar.html` current by monitoring the `#por_jul26_*` Slack channels. Schema/tech/design details live in `README.md` — this file only covers the monitoring workflow and decision rules. Change history lives in `development_runbook_jul26.md` and `Notes and ideas _jul26.md`; don't duplicate entries here, log there._

---

## 1. Channel map

Source of truth: **`channel-map.json`** (workspace `T40A6MC8G`, one entry per `por_jul26_*` channel: Slack channel ID + category `type`). Don't hardcode channel IDs elsewhere — read them from that file.

Four categories, each with its own monitoring rule (below): **Events**, **Spontaneous**, **Other**, **uncategorized** (not yet classified — flag for a categorisation decision before treating it either way, don't silently skip or silently monitor).

---

## 2. Monitoring rules by category

### Events
Channels: `adventures`, `skillshare`, `tribaltuesday` (see `channel-map.json` for current membership — treat that file as authoritative, this list can drift).
- Full monitoring, full history relevant.
- Anything with a date/time (confirmed, pending, or interest/poll) → add per the standard schema, `README.md` §8.
- This is where most of the existing 33+ calendar entries came from.

### Spontaneous
Channels: `coworking`, `fitness`, `food`.
- **Only scan the last 2 days of messages** (today + yesterday, plus check for a "today" divider) — older chatter here is noise (coffee-shop-of-the-hour stuff), not calendar-worthy.
- Within that window, only act on messages **planning for today or later** — same-day-in-the-past chatter ("went there this morning", "heading out now" posted hours ago about something already happening) doesn't get a tile.
- **Confirmation bar** before adding a tile: the plan needs a fixed date/time (or is happening within a clearly bounded window) and isn't still being negotiated. Concretely:
  - ✅ Add: a booked/self-organised activity with firm date, time, cost if any — e.g. `foodtour2` (Hiba's Taste Porto tour, fixed Wed 22 Jul 15:30–19:00, €89, gifted/already booked by her).
  - ❌ Skip: "debating where to go / what time" threads still being hashed out in real time (e.g. Alex Cogen's "going out tonight ~10p" thread on 18 Jul — venue and time still undecided when checked). Re-check later if it firms up.
- When it qualifies: add **one tile**, with a longer explanation in `note` (more context than the terse Events-channel notes, since there's no separate thread for people to read) — see `foodtour2` in `EVENTS` for the template.

### Other
Channels: `announcements`, `chitchat`.
- Not calendar-relevant by default. Skim only if searching for context on something else; don't monitor proactively.

### Uncategorized
Channels not yet assigned (currently: `arrivals`, `castleweekend`, `gratitude`, `overheard`, `photos`, `recommendations`, `splitwise`, `traitors` — check `channel-map.json` for the live list).
- Don't monitor and don't ignore by default — flag to the user for a category call, then update `channel-map.json`.

---

## 3. Adding an entry

Follow `README.md` §8 (event object shape, `EVENTS`/`SPANS`/`FLOATING`, step-by-step). One addition on top of that doc, decided 18 Jul (logged in `Notes and ideas _jul26.md`):

> **Every new entry from now on carries a `post` field** — the permalink to the source Slack message (`https://wifitribe.slack.com/archives/<channelId>/p<ts>`). Rendered in the drawer as "View Slack post ↗" and folded into the `.ics` description. Existing pre-18-Jul entries weren't backfilled with this — only new ones need it.

To get a permalink while reading Slack via the chrome-devtools MCP: the message's timestamp element is an `<a href="https://wifitribe.slack.com/archives/{channelId}/p{ts}">` — grab it with `evaluate_script`, don't guess the URL format.

---

## 4. Tooling

- **Reading Slack**: chrome-devtools MCP against the already-open Slack tab (`list_pages` → `select_page` → `evaluate_script` / `take_snapshot`). No Slack API wired up — this is DOM scraping of the live client. Day dividers (`[data-qa="channel_day_divider_label"]`) are the reliable way to bound a "last N days" scan; thread replies need an explicit click-through (`take_snapshot` to find the "N replies" button, click it, then re-scrape).
- **Pushing to Google Calendar**: `google-calendar` MCP is wired to the dedicated `wifitribe.porto.jul26@gmail.com` account — see `google-calendar-mcp-setup.md`. **Still a manual one-off, not automatic** — adding a tile to the HTML does not push to Google Calendar by itself. If a sync is wanted for a new/changed entry, it has to be done explicitly via the MCP tools.

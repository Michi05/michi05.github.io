# Porto Chapter — Group Calendar

A single-file, interactive web calendar that turns a sprawling group-trip Slack channel into a
four-week, at-a-glance planner. Built for a friend group travelling in Porto so nobody misses an
activity and time collisions are obvious before they become double-bookings.

**Deliverable:** `porto-chapter-calendar.html` — one self-contained file, no build step, no
dependencies. Open it in any modern browser.

---

## 1. Original goals

The brief was to analyse the channel message list and generate a calendar that differentiates
activities by commitment level. The explicit requirements, and how each is met:

| Requirement from the brief | How it's addressed |
| --- | --- |
| Differentiate **confirmed / pending / placeholder** | Three visual statuses — colour + fill + border style — plus filter toggles with live counts. |
| **Main goal:** see what's available at a glance; avoid missing things | Whole trip fits on one screen as a 4-week grid; a collapsible "Ideas TBD" section surfaces undated activities. |
| **Prevent collisions, or see them clearly when they exist** | Automatic overlap detection by time-of-day slot, shown as per-day badges and per-tile markers, with a drill-down that lists exactly what conflicts. |
| Relevant for **~4 weeks**, may span two months | Fixed range Mon 6 Jul → Sun 2 Aug 2026; renders month boundaries (Aug days are muted/out-of-range). No multi-month scaling needed. |
| Favour the **overall picture** but allow **dynamic drill-down** | Grid gives the overview; clicking any tile or day badge opens a detail drawer with the full context. |
| Tell apart **long vs short** activities (full-day vs a block vs a 1-hour/deadline item) | Duration is encoded independently of status: full-width bars, timed blocks, and slim pills. |

---

## 2. Source data & date reconstruction

The Slack export gives message timestamps and relative language ("tonight", "tomorrow", "next
week") but **no absolute dates on most events**. Dates were reconstructed from internal evidence
rather than guessed:

- Several binding posts say *"reply by tomorrow (Weds 8 Jul)"* and one interest post says
  *"respond by today Tuesday 5pm"*. Together these fix the recent posting day as **Tue 7 Jul** and
  therefore **"today" = Wed 8 Jul 2026**.
- Working backwards from that anchor: the Portugal vs Spain match ("TONIGHT") lands on **Mon 6 Jul**,
  the "Good morning" cluster is that same Monday, and "next week" food-tour/villa references resolve
  to the weeks of 13 Jul and 24 Jul.
- Relative phrases were converted to concrete dates (e.g. "Wednesday morning ~9am" posted on Monday →
  Wed 8 Jul; a `getyourguide` link carrying `date_from=2026-07-12` confirmed the kayak Sunday).

Two interpretive calls are documented as assumptions in §7 because the thread doesn't state them
outright.

---

## 3. Information model

Every activity is classified on **two independent axes**, plus an optional third (deadlines).

### 3.1 Status — how locked-in is it?

| Status | Meaning | Visual |
| --- | --- | --- |
| **Confirmed** | Booked or decided (tickets being purchased, slot fixed) | Solid green fill, green left bar |
| **Pending** | A binding post still inside its RSVP window | Solid ochre fill, ochre left bar |
| **Interest** | Interest post, poll, or floated idea — not committed | Dashed blue outline, no fill |

The fill weight itself signals commitment: interest reads as a "sketched, unglazed tile", pending as warm, confirmed as fully glazed-in.

**Note:** The "pending" status is rarely used in practice. Most events are either confirmed (green) or interest (blue). The filter buttons show live counts for each status.

### 3.2 Length — how much of the day does it eat?

| Length | Examples | Visual |
| --- | --- | --- |
| **Full day** | Douro tour, Chefs on Fire, day trips | Full-width bar labelled "all day" |
| **Part day** (morning / afternoon / evening) | Food tour, fado, cocktails | Standard block with a time and a period label |
| **Short** | Majestic coffee, Livraria slot | Slim pill with just a start time |

Time-of-day isn't given its own colour to avoid overloading the eye; instead events sort
chronologically within a cell (all-day → morning → afternoon → evening), so the day reads top-to-bottom.

### 3.3 Category emojis

Each event title is prefixed with a category emoji for quick visual scanning. These represent the **kind of activity** (duration and context), not the specific content:

| Emoji | Category | Examples |
| --- | --- | --- |
| ⚽ | Sports / Match | World Cup matches |
| 🏄 | Sports / Water | Kayak |
| 🏖️ | Sports / Leisure | Beach day |
| 🧗 | Sports / Climbing | Via Ferrata |
| 🏛️ | City / Tour | Food tour, bookstore, café |
| 🚶 | City / Walk | Walking tour |
| 🚌 | Full-day trip | Day tours, Chefs on Fire |
| 🍽️ | Food / Meal | Brunch, francesinha lunch |
| 🍸 | Food / Drinks | Cocktails, bar crawl |
| 🎵 | Entertainment / Music | Fado concerts |
| 🎭 | Entertainment / Theatre | Stand-up comedy |
| 🎬 | Entertainment / Cinema | IMAX movie |
| 💼 | Professional / Skill share | B2B sales, autism talk, SEO |
| 🧳 | Travel / Logistics | Checkout |
| 🏡 | Accommodation | Villa weekend |
| 🎨 | Workshop | Tile-painting |

### 3.4 Deadlines

Events carrying an RSVP cut-off (`deadline`) drive a highlighted callout in the detail drawer.

---

## 4. Collision detection

Each event occupies **time-of-day slots**: full-day = morning + afternoon (evenings stay free, so a
day tour followed by a night out is *not* flagged); a part/short event occupies only its own period;
a poll with undecided timing occupies nothing.

Two events on the same date that share a slot produce a conflict:

- **◇ Competing options** — The group needs to pick one (e.g. Sun 12 Jul: brunch vs kayak vs beach).

All overlaps are treated as "competing options" rather than "hard clashes" since these are group activities where the group simply needs to choose. Conflicts surface at three levels of zoom: a day badge in the grid, an inset outline on each affected tile, and a cross-linked list inside the detail drawer.

---

## 5. Design decisions

### 5.1 Aesthetic direction — Porto azulejos

The visual identity is drawn from Porto's own material world: the blue-and-white glazed **azulejo**
tilework that covers the city (São Bento station being the famous example). This grounds the design
in the subject rather than a generic calendar look, and deliberately **avoids the default
AI-design palette** (cream background + high-contrast serif + terracotta accent), which would read
as templated.

- **Palette:** cool porcelain background (`#EAF0F6`), azulejo indigo for structure (`#122F58`),
  cobalt accent (`#2E63B0`). Status hues are the only other colours: glaze green (confirmed), kiln
  ochre (pending), cobalt (interest). Port-wine garnet (`#B23A2E`) is reserved *exclusively* for
  clash warnings, so red always means "conflict".
- **Signature element:** a hand-built SVG azulejo frieze across the hero, and event tiles styled
  as small glazed ceramic tiles. Boldness is spent here; everything else stays quiet.
- **Typography:** *Archivo* (wide, uppercase, tracked-out) for the display title gives an
  architectural/tiled feel without reaching for the default serif; *Inter* for body; *IBM Plex Mono*
  for dates, times, prices, and category tags — the monospaced numerals reinforce the "data" feel and
  keep the grid legible. Google Fonts with full system fallbacks.
- **Category tags** are short mono labels (`DOURO`, `FADO`, `CHEFS·FIRE`) rather than emoji, to stay
  consistent with the ceramic register and scan cleanly.

### 5.2 Layout

Overview-first: a fixed weekday header over four stacked week-rows. Multi-day events (the villa
weekend) render as a single spanning bar in a dedicated lane above the day cells, so a continuous
stay reads as one thing rather than three separate chips. Today is ringed; past days are muted; the
Aug tail is shown as out-of-range hatching so the calendar edges are honest about the range.

**Weekend styling:** Saturday and Sunday day numbers are displayed in firebrick red to visually distinguish weekends from weekdays.

**Collapsible sections:** The "Ideas TBD" section at the top is collapsed by default with a counter showing the number of undated activities. Click to expand and see the floating ideas.

**Legend icon:** A small blue ⓘ icon in the bottom-right of the hero section reveals a popover with clash indicator meanings on hover.

**Status filters:** The filter buttons (Confirmed / Pending / Interest) are consolidated into a single row with live counts, replacing the separate tally pills that were previously in the hero.

### 5.3 Copy

Interface language names things by what the user controls ("Show past days", "Reply by 12 PM"), states overlap meaning plainly, and keeps the footer honest about provenance and the need to verify times before spending money.

---

## 6. Technical decisions

- **Single static HTML file, vanilla JS, zero dependencies.** A trip calendar should open instantly
  and survive being emailed around or dropped on any host. No framework, no CDN runtime, no build.
- **Data-driven rendering.** All activities live in three plain arrays (`EVENTS`, `SPANS`,
  `FLOATING`). Rendering, filtering, and overlap detection derive from that data, so updating the
  calendar means editing objects, not markup (see §8).
- **Event sorting.** Events are sorted by date first, then chronologically by start time within each day (morning → afternoon → evening). Full-day events appear at the top of their date group.
- **Overlap algorithm** runs once on load (`computeClashes`) into a lookup map keyed by event id, then
  reused by both views and the drawer — O(events² per day), trivial at this scale.
- **Two views, one data source.** A 7-column grid for wide screens and a stacked **Agenda** list for
  phones; the agenda is auto-selected below 820px because a 7-wide grid is unusable on a narrow
  screen. Both are rendered from the same event objects.
- **Drill-down drawer** is a single reusable panel driven by event id, with cross-links so you can
  hop from an overlap straight to the conflicting activity. Closes on backdrop click, the × button, or
  Escape.
- **Dates handled in UTC** (`Date.UTC`, ISO `YYYY-MM-DD` keys) to avoid timezone drift shifting an
  event onto the wrong day.
- **Accessibility floor:** every tile and control is a real `<button>`, visible keyboard focus rings,
  `aria-pressed` on toggles, a labelled `role="dialog"` drawer, and `prefers-reduced-motion` honoured
  for all transitions.

---

## 7. Assumptions & known limitations

These are judgement calls the thread doesn't fully settle — worth confirming with the group:

- **"Today" is computed live in Porto local time** (`Europe/Lisbon`, DST-aware) via
  `Intl.DateTimeFormat("en-CA", …)`, so the highlighted day is correct for every viewer regardless of
  their own timezone. **The date range is fixed by design** (Mon 6 Jul → Sun 2 Aug 2026): while the
  real date falls inside that window the current day is ringed and earlier days are dimmed; once the
  date is outside the window no day is ringed (nothing breaks — there's simply no "today" marker).
  To reuse this calendar for another trip, change the `START` date and the range accordingly.
- **Emeraude's Douro mention (Thu 9 Jul)** is treated as superseded by the Saturday 11 Jul group
  binding post; Thursday is shown as her Aveiro day tour instead. If both were meant to stand, they
  need splitting.
- **Poll events** (Odyssey movie, food tour, cocktails, villa nights) are pinned to their *lead*
  candidate date with all options listed in the drawer. They deliberately don't occupy a time slot,
  so an undecided poll won't raise false overlaps — the trade-off is that a poll's *potential*
  conflicts aren't pre-flagged.
- **Floating items** (tile painting, via ferrata, SEO skill share) have no date in the thread and live in a
  separate "Ideas TBD" section rather than on the grid.
- **Per-tile overlap markers reflect the underlying data**, not the current filter — hiding one side of
  an overlap via the status filter still shows the marker on the other. The day-level badge *is*
  filter-aware.
- Ephemeral "we're here now" match-night messages (Bonaparte / O Tosco) are folded into the single
  Portugal vs Spain event rather than shown separately.

---

## 8. Maintaining / updating the calendar

All content lives in the `<script>` block. To change the calendar, edit the data arrays — no other
code needs touching.

**Event object shape (`EVENTS`):**

```js
{
  id:      "douro",                 // unique string, used for cross-links
  title:   "🚌 Douro Valley boat tour & wine tasting",  // prefix with category emoji
  tag:     "DOURO",                 // short mono category label shown on the tile
  org:     "Emeraude L",            // who posted it
  status:  "confirmed",             // "confirmed" | "pending" | "interest"
  date:    "2026-07-11",            // ISO date (omit for floating items)
  len:     "fullday",               // "fullday" | "part" | "short"
  start:   "08:30",                 // 24h "HH:MM" (drives morning/afternoon/evening)
  end:     "16:30",                 // optional
  price:   "€90",                   // optional
  loc:     "Meet: Largo da Lapa 1", // optional
  link:    { label:"getyourguide.com", url:"https://..." },   // optional
  deadline:{ text:"Commit so the booking can go in",
             date:"2026-07-08", time:"10:00" },               // optional → feeds drawer callout
  options: ["Mon 13 Jul", "Wed 15 Jul"],                      // optional, for polls
  noSlot:  true                     // optional: undecided time → excluded from overlap detection
}
```

- **`SPANS`** holds multi-day events (`startDate` / `endDate`) rendered as a spanning bar.
- **`FLOATING`** holds undated ideas (no `date`), shown in the "Ideas TBD" section.
- To move the visible window, change the `START` date and the `4` in the week-building loop.
- Overlap behaviour follows automatically from `date`, `len`, and `start`; no manual conflict list to
  maintain.

### 8.1 Add a new activity (step by step)

1. Open `porto-chapter-calendar.html` and find the `const EVENTS = [ ... ]` array in the `<script>`.
2. Copy an existing object and paste it as a new entry, then edit the fields. Only `id`, `title`,
   `tag`, `org`, `status`, and `len` are required — drop any optional field you don't need.
3. **Prefix the title with a category emoji** from the table in §3.3.
4. Give it a **unique `id`** (used for cross-links). Save and refresh the browser — that's it. The
   tile, filters, and overlap detection all pick it up automatically.

```js
// Example: a confirmed morning pastel-de-nata run on Fri 17 Jul
{
  id:     "natas",
  title:  "🍽️ Pastel de nata crawl",
  tag:    "FOOD",
  org:    "You",
  status: "confirmed",
  date:   "2026-07-17",
  len:    "short",
  start:  "10:00",
  loc:    "Manteigaria + Fábrica da Nata"
}
```

- **Multi-day trip?** Add it to `SPANS` instead, with `startDate` / `endDate` (no `len`/`start`).
- **No date yet?** Add it to `FLOATING` (omit `date`); it lands in the "Ideas TBD" section.

### 8.2 Add a new field, category, or status

- **A new detail row** (e.g. a `dresscode` field): add it to the object, then add one line in
  `openDrawer()` where the other `rows.push([...])` calls are, so it renders in the drawer.
- **A new category tag:** just set `tag:"WHATEVER"` — tags are free text, nothing else to register.
- **A new category emoji:** add it to the title string. The emoji system is free-form — no registration needed.
- **A new status** beyond confirmed/pending/interest: this one touches more than data. You'd add a
  colour block in `:root`, a `.chip.<status>` rule in the CSS, a matching entry in the `openDrawer`
  status label map, and a filter button in the controls. Doable, but it's the one change that isn't
  data-only — most needs are met by the three existing statuses.

---

## 9. File structure

```
porto-chapter-calendar.html   The entire app: markup, CSS, data, and logic in one file
README.md                     This document
Notes and ideas _jul26.md     Working scratchpad with decisions and troubleshooting
development_runbook_jul26.md  Detailed chronological log of changes
```

---

*Reconstructed from the #porto Slack thread. Statuses reflect the thread at the inferred "today"
(Wed 8 Jul 2026); verify times and prices against the channel before committing money.*

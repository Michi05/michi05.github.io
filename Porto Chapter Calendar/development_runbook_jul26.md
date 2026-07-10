# Porto Chapter — Development Runbook (July 2026)

_Detailed chronological log of changes made to the calendar during the development session on 9 July 2026._

---

## Session: 9 July 2026

### Phase 1: UI/UX Improvements

#### 1.1 Floating Ideas Section
**Goal:** Make undated activities more discoverable without cluttering the main view.

**Changes:**
- Moved the "Floating ideas" section from bottom to top (between hero and controls)
- Renamed to "Ideas TBD"
- Made collapsible: collapsed by default, expands on click
- Added counter badge showing number of floating items (e.g., "3")
- Centered the title text with expand/collapse arrows (▾) on each side
- Reduced section width to 85% for visual balance
- Arrows rotate 180° when expanded (▾ → ▴)

**Technical details:**
- Added `collapsed` class to section by default
- Used `max-height` transition for smooth expand/collapse animation
- Counter populated from `FLOATING.length` in `buildFloating()`
- Toggle button uses `aria-expanded` for accessibility
- Chevron rotation via CSS transform with `prefers-reduced-motion` support

#### 1.2 Status Filter Consolidation
**Goal:** Remove redundancy between hero tally pills and filter buttons.

**Changes:**
- Removed `<div class="tally">` from hero section
- Added counter spans to each filter button (e.g., "Confirmed [5]")
- Made filter buttons expand to full width with `flex: 1`
- Counter styled as small cobalt pill matching existing design language

**Technical details:**
- Updated `buildTally()` to populate counter elements instead of creating pills
- Each counter uses `id="count-{status}"` pattern
- Counter styling: `font-size: 10.5px`, `padding: 1px 7px`, `border-radius: 999px`

#### 1.3 Legend Redesign
**Goal:** Simplify legend to show only essential information (clash indicators).

**Changes:**
- Removed old legend showing all-day/morning/short visual examples
- Replaced with single ⓘ icon (blue circle, 22px)
- Icon positioned in bottom-right of hero-body
- Hover reveals popover with two items:
  - ⚠ Hard clash — same day & time
  - ◇ Competing options — pick one
- Popover has arrow pointer and subtle shadow

**Technical details:**
- Popover uses `opacity: 0` by default, `opacity: 1` on hover/focus
- Arrow created with `::before` and `::after` pseudo-elements (border triangles)
- Positioned with `top: calc(100% + 6px)` and `left: 50%` with transform
- `prefers-reduced-motion` disables transition

#### 1.4 Weekend Styling
**Goal:** Visually distinguish weekends from weekdays.

**Changes:**
- Saturday and Sunday day numbers now displayed in firebrick red (#B22222)
- Applied to both weekday header and day cell numbers

**Technical details:**
- Added `.weekend` class to day cells where `dt.getUTCDay() === 0 || dt.getUTCDay() === 6`
- CSS rule: `.weekend .dnum { color: #B22222 }`
- Weekday header already had `.we` class for weekends, updated color to match

#### 1.5 Chronological Event Sorting
**Goal:** Events within each day should appear in time order.

**Changes:**
- Events sorted by date first, then by start time within each day
- Order: morning → afternoon → evening
- Full-day events appear at top of their date group
- Events with `noSlot: true` (polls) appear before timed events

**Technical details:**
- Sorting happens in the data array itself (not just at render time)
- Manual reordering of EVENTS array to achieve correct sequence
- Render logic already sorts by `len` then `start`, so data order is preserved

---

### Phase 2: Data Updates

#### 2.1 First Week Status Changes
**Goal:** Mark first-week activities as confirmed based on group decisions.

**Events changed to `status: "confirmed"`:**
- `walk` — Free walking tour (Mon 6 Jul)
- `viana` — Viana do Castelo day tour (Wed 8 Jul)
- `majestic` — Majestic Café (Wed 8 Jul)
- `aveiro-em` — Aveiro tour (Thu 9 Jul)
- `douro` — Douro Valley boat tour (Sat 11 Jul) — changed from "pending"
- `fadoA` — Fado — Carminho Valença (Sat 11 Jul)
- `nightout` — Night out bar crawl (Sat 11 Jul)
- `brunch` — Sunday brunch (Sun 12 Jul)
- `kayak` — Douro Valley kayak (Sun 12 Jul)
- `beach` — Beach day Espinho (Sun 12 Jul)

**Kept as-is:**
- All `match-*` events (football matches) — remain "interest"
- `ss-sales` — B2B sales skill share — later changed to confirmed
- `livraria` — Livraria Lello — already confirmed
- `ss-autism` — Autism skill share — remains "interest" (poll)

#### 2.2 Villa Weekend Consolidation
**Goal:** Clarify that all 4 days are confirmed (3-night option won).

**Changes:**
- Extended `villa` span from `endDate: "2026-07-26"` to `"2026-07-27"`
- Changed status from "interest" to "confirmed"
- Updated note to "Confirmed: 3 nights (Fri 24 → Mon 27 Jul)."
- Removed separate `villa-opt` event from EVENTS array
- Added 🏡 emoji prefix to title

#### 2.3 B2B Sales Skill Share
**Goal:** Confirm Harry's skill share session.

**Changes:**
- Changed `ss-sales` status from "interest" to "confirmed"
- Added 💼 emoji prefix to title

#### 2.4 Odyssey IMAX Reschedule
**Goal:** Update movie screening based on binding post.

**Changes:**
- Moved from `date: "2026-07-16"` to `"2026-07-17"`
- Changed status from "interest" to "confirmed"
- Added `start: "13:00"` (1:00 PM)
- Updated price from "€15 (deluxe screen)" to "€13.50 (group of 6+)"
- Added `link` with Google Maps URL
- Removed `options` array and `noSlot: true`
- Updated note to reflect confirmed time and group discount
- Added 🎬 emoji prefix to title

#### 2.5 Food Tour Reschedule
**Goal:** Pin food tour to specific date.

**Changes:**
- Moved from `date: "2026-07-13"` to `"2026-07-15"` (Wednesday)
- Removed `options` array (was a poll)
- Added 🏛️ emoji prefix to title

#### 2.6 Added Lado B Café
**Goal:** Add Dan's francesinha lunch suggestion.

**New event:**
```js
{
  id: "lado-b",
  title: "🍽️ Lado B Café — francesinha lunch",
  tag: "FOOD",
  org: "Dan Perez",
  status: "interest",
  date: "2026-07-10",
  len: "part",
  start: "12:00",
  loc: "Lado B Café (Coliseu), R. de Passos Manuel 190, Porto",
  link: { label: "Google Maps", url: "https://maps.app.goo.gl/p3bRLrNhuHn9bkJn8" },
  note: "Recommended by the tour guide for francesinha. Near Livraria Lello for those doing the bookstore visit. Opens at 12:00."
}
```

#### 2.7 Added World Cup Matches
**Goal:** Add all remaining World Cup matches from the schedule.

**New events (all with ⚽ emoji, status: "interest"):**
- `match-qf1` — France vs Morocco (Thu 9 Jul, 21:00)
- `match-qf2` — Spain vs Belgium (Fri 10 Jul, 20:00)
- `match-qf3` — Norway vs England (Sat 11 Jul, 22:00)
- `match-qf4` — Argentina vs Switzerland (Sun 12 Jul, 02:00)
- `match-sf1` — France/Morocco vs Spain/Belgium (Tue 14 Jul, 20:00)
- `match-sf2` — Norway/England vs Argentina/Switzerland (Wed 15 Jul, 20:00)
- `match-3rd` — Third-place match (Sat 18 Jul, 21:00)
- `match-final` — Final (Sun 19 Jul, 20:00)

All matches have `loc: "Sky Sports"` or `"Livescore+"` and note: "World Cup [round]. Watch party TBD."

#### 2.8 Category Emoji System
**Goal:** Add visual category indicators to all event titles.

**Emoji assignments:**

| Emoji | Category | Events |
|-------|----------|--------|
| ⚽ | Sports / Match | All World Cup matches |
| 🏄 | Sports / Water | Kayak |
| 🏖️ | Sports / Leisure | Beach day |
| 🧗 | Sports / Climbing | Via Ferrata (floating) |
| 🏛️ | City / Tour | Majestic Café, Livraria Lello, Food tour |
| 🚶 | City / Walk | Walking tour |
| 🚌 | Full-day trip | Viana, Aveiro, Douro Valley, Chefs on Fire |
| 🍽️ | Food / Meal | Brunch, Lado B Café |
| 🍸 | Food / Drinks | Night out, Speakeasy |
| 🎵 | Entertainment / Music | Fado A (Valença), Fado B (Coimbra) |
| 🎭 | Entertainment / Theatre | Stand-up comedy |
| 🎬 | Entertainment / Cinema | Odyssey IMAX |
| 💼 | Professional / Skill share | B2B sales, Autism, SEO (floating) |
| 🧳 | Travel / Logistics | Checkout |
| 🏡 | Accommodation | Villa weekend |
| 🎨 | Workshop | Tile-painting (floating) |

**Design principle:** Emojis represent the **kind of activity** (duration and context), not the specific content. For example:
- Chefs on Fire gets 🚌 (trip) not 🍽️ (food) because it's a full-day excursion to Aveiro
- Food tour gets 🏛️ (tour) not 🍽️ (food) because it's a walking tour with tastings
- Brunch gets 🍽️ (meal) because it's a sit-down dining experience

---

### Phase 3: Logic Changes

#### 3.1 Simplified Clash Detection
**Goal:** Remove distinction between "hard clashes" and "competing options."

**Rationale:** Since all events are group activities where the group simply needs to choose, there's no meaningful difference between a "hard clash" (confirmed vs confirmed) and a "soft overlap" (interest vs interest). The group just needs to pick one.

**Changes:**
- Modified `computeClashes()` function to always set `level: "choose"` instead of checking status
- Removed ⚠ hard clash indicator from legend
- All overlap markers now show as ◇ (competing options)
- Updated README and Notes to reflect new behavior

**Before:**
```js
const level = (a.status === "confirmed" || a.status === "pending" || 
               b.status === "confirmed" || b.status === "pending") 
              ? "clash" : "choose";
```

**After:**
```js
const level = "choose";
```

---

## Summary Statistics

**Events by status (after changes):**
- Confirmed: 15 events
- Pending: 0 events
- Interest: 20 events (including 8 football matches, 3 floating ideas)

**Events by date range:**
- Week 1 (6-12 Jul): 18 events
- Week 2 (13-19 Jul): 10 events
- Week 3 (20-26 Jul): 0 events (villa starts Fri 24)
- Week 4 (27 Jul-2 Aug): 2 events (villa ends Mon 27, checkout Fri 31)

**Floating ideas:** 3 items (tile-painting, via ferrata, SEO skill share)

---

## Files Modified

1. `porto-chapter-calendar.html` — Main calendar file (all changes)
2. `README.md` — Updated documentation to reflect new features
3. `Notes and ideas _jul26.md` — Added decisions log and troubleshooting notes
4. `development_runbook_jul26.md` — This file (created)

---

## Testing Notes

- All changes tested in browser at various viewport widths
- Collapsible section works with keyboard navigation (Enter/Space to toggle)
- Legend popover accessible via hover and keyboard focus
- Weekend styling applies correctly to both header and day cells
- Event sorting verified: morning events appear before afternoon, which appear before evening
- Filter counts update correctly when events are added/removed
- Overlap detection still works correctly with simplified logic

---

## Future Considerations

- **Day sectioning / time-of-day clarity:** Currently events are sorted chronologically but there's no visual separation of the day into morning/afternoon/evening blocks. Consider:
  - Adding subtle divider lines or section headers within each day cell (e.g., "Morning", "Afternoon", "Evening")
  - Using different background tints or borders to indicate time blocks
  - Making full-day events visually distinct (e.g., spanning the full height of the cell with a different pattern)
  - Adding a small time indicator badge on each event chip showing its time block
  - This would help users quickly scan and understand when activities happen without reading every event's time

- **Multi-month support:** Current implementation is hardcoded to 4 weeks. Would need to parameterize `START` date and week count.
- **Recurring events:** Housekeeping (cleaning, bedding) and Tribal Tuesday are implemented separately from main events. Could be unified.
- **Export functionality:** No current way to export calendar to iCal or other formats.
- **Mobile optimization:** Agenda view works well, but could benefit from swipe gestures or pull-to-refresh.
- **Dark mode:** Not currently implemented. Would need to add CSS variables and toggle.

---

_End of runbook._

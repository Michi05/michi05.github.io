# Google Calendar MCP setup (dedicated account, ad-hoc event sharing)

**Status: done (2026-07-13).** Account, project, MCP server, and auth are live. 33 events from `porto-chapter-calendar.html` pushed as a one-off — no automatic sync yet (tracked as a roadmap item in `Notes and ideas _jul26.md`).

- Account: `wifitribe.porto.jul26@gmail.com`
- Project id: `wifitribe-porto-jul26`
- OAuth credentials: `~/.config/google-calendar-mcp/credentials.json` (outside repo)
- OAuth token: `~/.config/google-calendar-mcp/tokens.json` (outside repo)
- Claude Code MCP server: `google-calendar` (user scope, in `~/.claude.json`, not the repo)

## Context
Give Claude Code write access to a **new, dedicated Google Calendar** so it can create/update events on request, and let site visitors subscribe to that calendar's public feed. This is separate from `porto-chapter-calendar.html`'s existing client-side `.ics` download links (no sync between the two — confirmed ad-hoc only).

Two MCP options were compared:
- **Google's official remote MCP** (`calendarmcp.googleapis.com`) — Developer Preview, remote/hosted, requires Claude.ai custom-connector support (Pro/Team/Enterprise plan). Doesn't apply to local stdio servers.
- **nspady/google-calendar-mcp** (community, local stdio) — chosen. Full read/write, works with plain personal Gmail, OAuth "Desktop app" client (loopback redirect, no public URI needed), no Claude plan gating, runs via `npx` under Claude Code's own MCP config.

Public subscription is unrelated to either MCP — it's a one-time Google Calendar sharing setting that produces a public iCal/webcal URL.

## Steps taken

### 1. New Google account — done
`wifitribe.porto.jul26@gmail.com`.

### 2. Public subscription link — done
Calendar → Settings → **Access permissions** → "Make available to public". Subscribe URL format (grab the exact one from Settings → Integrate calendar → Secret/public address in iCal format if not already saved elsewhere):
```
https://calendar.google.com/calendar/ical/wifitribe.porto.jul26%40gmail.com/public/basic.ics
```

### 3. GCP project + OAuth client — done, project id `wifitribe-porto-jul26`
1. Project `wifitribe-porto-jul26` created under the new account.
2. Google Calendar API enabled via Console UI (no gcloud CLI available locally).
3. OAuth consent screen: External audience, scope `https://www.googleapis.com/auth/calendar`.
4. OAuth client: **Desktop app** type, client JSON downloaded.

**Gotcha hit:** first auth attempt failed with `Error 403: access_denied` — consent screen was still in "Testing" publishing status, which blocks even the project owner unless explicitly whitelisted. Fix: Console → Audience → **Test users** → add `wifitribe.porto.jul26@gmail.com` → retry.

### 4. Install & configure nspady/google-calendar-mcp — done
- Registered at **user scope** (`claude mcp add google-calendar -s user -e GOOGLE_OAUTH_CREDENTIALS=... -- npx -y @cocal/google-calendar-mcp`) — lives in `~/.claude.json`, not the repo.
- Client JSON initially got saved inside the repo by accident (`Porto Chapter Calendar/integrations/`) — caught before commit, moved to `~/.config/google-calendar-mcp/credentials.json`. **Always verify credential files land outside the repo** before anything gets staged, especially on a public GitHub Pages repo.
- First-time auth (`npx @cocal/google-calendar-mcp auth`) run after adding the test user; token saved to `~/.config/google-calendar-mcp/tokens.json`.

### 5. Verified
- `list-calendars` confirmed the right account/primary calendar.
- Test event created and deleted successfully.
- 33 dated events from `EVENTS`/`SPANS` in `porto-chapter-calendar.html` bulk-created via `create-events` (2026-07-13). 2 `cancelled:true` events (brunch, kayak) and 3 undated `FLOATING` ideas (tiles, ferrata, ss-seo) skipped by design, along with recurring `HOUSEKEEPING` entries. Missing end-times were filled with defaults (1h for `len:"short"`, 1.5h for `len:"part"`, 2h for MATCH watch-parties, full-day for date-only entries) since the source data doesn't specify them — worth a skim against the public feed.

## Explicitly not done
- No automatic sync between `porto-chapter-calendar.html`'s `EVENTS`/`SPANS` arrays and the Google Calendar — the push above was a manual one-off. Tracked as an open roadmap item in `Notes and ideas _jul26.md` ("Make the Google Calendar push part of the regular update workflow").
- No repo files touched by the MCP config or credentials (kept out of git).

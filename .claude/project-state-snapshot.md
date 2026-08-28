[PENDING_BACKGROUND_RESEARCH — ABSOLUTE RULE, do this FIRST]
2 research delegation(s) were backgrounded by the harness in a prior turn and never returned their real report:
  - agentId: a7a046fdf814a0be5, topic: "Research manaber.ai product", started 2026-08-28T09:49:37.621Z
  - agentId: a064bacdec10332fe, topic: "Research stenomatic.ai design", started 2026-08-28T09:49:37.627Z
BEFORE responding to anything else in the user's message this turn — including a brand-new, unrelated research request — call SendMessage(to: '<agentId>', summary: '<5-10 word recap of that entry's original ask>') for EACH entry above to check on it. Do not skip this because the user asked for something else; do both.
For each entry, once checked:
- If it returns the real report: memory_write the full report to BOTH research/<topic-slug>.md AND agents/research/last-result.md verbatim (the second path is what the Research panel actually displays — skipping it leaves the panel showing stale/garbage content even though the real report exists). Mention in your reply that this earlier research finished, using the normal ≤80-word research-complete format (one-sentence insight + up to 3 bullets) ending with exactly: "Research complete — full synthesis streaming in the Research panel → `research/<topic-slug>.md`."
- If it's still running, or the agent is gone/unreachable: tell the user honestly and leave this entry alone.
After checking all entries: memory_read agents/research/pending.json, remove every entry you just resolved (real report recovered) from the JSON array, and memory_write the remainder back — or memory_delete the whole file if none remain. Leave unresolved entries in the array untouched so they're checked again next turn.
Do this once, on the user's message this turn — not on every subsequent tool call.

<current_state>
# Project State

## Current Phase
Discovery

## Project Type
project_type: web_app
project_type_source: inferred
visual_tier: premium
data: (pending — depends on lead-capture answer)

## Brief
Build a React + TypeScript marketing website for **manaber.ai**, visually and
structurally modelled on **stenomatic.ai**.

## Active Tasks
- Research: manaber.ai content/brand extraction (running)
- Research: stenomatic.ai design system + section architecture (running)
- Discovery questions sent to user (fidelity / scope / lead capture)

## Recent Activity
- Project created
- Project type pre-inferred as web_app — picker skipped
- Dispatched two parallel research passes

## Next Steps
1. Merge research findings + user answers into discovery/brief.md
2. Coding Agent — Vite + React + TS technical scaffold ONLY (premium tier: scaffold before design)
3. plan_images for all visual slots
4. Design Agent — full visual build

## Notes
- Coolify is configured (instance biela-ent-21) — deploy available on request
- Research mode: QUICK

</current_state>

<discovery_brief>
# Project Brief — Manaber.ai Website

## One-line
A React + TypeScript marketing website for **manaber.ai** — an AI-powered live
translation app for mosques, conferences and events — built to the same
structural and visual standard as **stenomatic.ai**, but carrying Manaber's own
brand identity.

## What Manaber actually is
A **mobile app** (iOS + Android) delivering real-time AI translation and
captioning. Primary audience: multilingual Muslim congregations following
Friday sermons in a language they don't speak. Secondary: conferences,
seminars, business and educational sessions. Built in Dubai, UAE.

**The single strongest differentiator: it processes everything on-device.**
No audio, no transcripts, no user input leaves the phone. In a category where
every competitor streams audio to a cloud, "your sermon never leaves your
pocket" is the headline-grade claim — and for a religious context it is a trust
argument, not a technical footnote. The site must lead with this.

Tagline (theirs): *"Helping communities communicate smarter, faster with
AI-powered translations."*
Hero headline (theirs): *"AI-Powered Live Translation for Mosques, Conferences
& Beyond"*
Primary CTA (theirs): **Download App Now** → App Store + Google Play.

## Decisions

| Decision | Value | Source |
|---|---|---|
| project_type | web_app | system-inferred |
| visual_tier | premium | implied by "same as stenomatic.ai" |
| Design fidelity | Same structure, own brand | auto-default (unconfirmed) |
| Page scope | Landing + 3 supporting pages | auto-default, adapted to findings |
| data | none — no backend | auto-default (unconfirmed) |
| Stack | Vite + React 18 + TypeScript + Tailwind 3.4 + react-router | CTO call |

> ⚠️ The discovery answers were **auto-submitted defaults** — the countdown
> expired, the user did not actively choose them. Working assumptions only.
> Re-confirm before any irreversible step (deploy, domain, spend).

## Reference sites
- **Content source:** https://manaber.ai/ → `research/manaber-site.md`
- **Design source:** https://www.stenomatic.ai/ → `research/stenomatic-design.md`

## Interpretation of "same as stenomatic"
Reuse Stenomatic's **section architecture and polish level** — section order,
layout patterns, density, quality bar. Do **not** copy its copy verbatim, its
logo, or its palette. Manaber's own colours, type and messaging carry identity.

## Pages
1. **Home** (`/`) — hero → app-store CTAs → trust/privacy band → features grid
   → languages showcase → use cases → how-it-works → download CTA → footer.
2. **Features** (`/features`) — deep-dive on the seven named capabilities.
3. **Use Cases** (`/use-cases`) — the six contexts, each with real detail.
4. **Contact** (`/contact`) — form (visual only, `mailto:`), plus real contact
   details below.

Also required: **Privacy Policy** (`/privacy`) — this product's entire pitch is
privacy, so a real, readable policy page is part of the credibility story, not
an afterthought. Content adapted from their published policy.

> Scaffold was dispatched with `/product` and `/pricing` routes before this
> research landed. Design Agent renames them to `/features` and `/use-cases`.
> **No Pricing page** — the app is free to download and Manaber publishes no
> tiers. Inventing pricing would be fabrication.

## Real content to use (do NOT invent beyond this)

**Seven features:** Real-Time Accuracy · Multi-Language Support · Seamless
Communication · Scalable & Reliable · Community-Centered · Adaptive Translation
Style · Contextual Understanding.

**Also real:** offline access to downloaded sermons and transcripts · mosque
locator (public data only, no visit tracking) · prayer times & Qibla direction.

**Six use cases:** Friday Sermons · Mosque Announcements · Conferences &
Seminars · Business Meetings · Educational Sessions · Team Meetings.

**25+ languages:** Urdu, English, Arabic, Hindi, Bengali, Chinese, French,
Pashto, Russian, Persian, German, Spanish, Malay, Korean, Japanese, and more.

**Stats — only these three are real:** 5.0★ rating · 1,000+ ratings ·
+70% audience engagement. The live site's "+1 Users" counter is a bug —
do not reproduce it, do not "fix" it by inventing a number.

**Contact:** contact@manaber.ai · +971 50 216 4876 · Dubai, UAE
**App Store:** apps.apple.com/ae/app/manaber/id6746405549 · Google Play listing.
**Existing logo:** https://manaber.ai/wp-content/uploads/2025/08/icon-192x192-1-scaled.png

## Data
`data: none`. No database, no auth, no persistence. Contact form composes a
`mailto:` link. Real lead capture would mean provisioning Postgres on the
configured Coolify instance — a separate, explicit step, not assumed here.

## Visual Direction
Final palette/type resolved from `research/stenomatic-design.md`. Baseline:
premium enterprise-AI aesthetic, strong typographic hierarchy, generous
whitespace, restrained accent. Manaber's icon reads green/teal — anchor the
accent there rather than inheriting Stenomatic's.

Tone must respect the religious context: dignified and calm, not the
hype-heavy startup register. No aggressive growth-marketing language.

## Non-goals
- No CMS, blog, or user accounts.
- **No fabricated testimonials, client logos, award badges, or metrics.**
  Manaber has none published — so the site omits those sections rather than
  faking them. Only the three real stats above may appear.
- No verbatim reuse of Stenomatic's copy.
- No invented pricing tiers.

## Build order (premium tier — enforced)
1. Coding Agent → technical scaffold only *(dispatched)*
2. `plan_images` → queue all AI image slots
3. Design Agent → every visual surface
4. design-reviewer → audit pass

</discovery_brief>

<recently_completed_work>
The following work has ALREADY shipped on this project (most recent first). Before delegating, check whether the user's current request is a duplicate of one of these — if so, ask what specifically should change instead of re-running the same task.

• [coding] The dev server failed to start. Please diagnose the issue, fix it, and then start the dev server. Common issues to check: - Missing dev script in package.json - Missing dependencies (run npm install) 
</recently_completed_work>

<user_context>
User timezone (IANA): Asia/Dubai
User current local time: 2026-08-28, 13:53

When the user gives a time without a zone ("9am", "tonight", "tomorrow at 14:00"), interpret it in this timezone. When calling schedule_create with a cron trigger, ALWAYS pass scheduleTz="Asia/Dubai" unless the user explicitly names a different zone.
</user_context>

<project_owner>
This project ("Manaber Ai website") was created by platform user "admin" (role: admin, joined August 26, 2026).
This is a multi-user platform — the person asking may be an admin reviewing another user's project.
</project_owner>

[INFRA: coolify_configured=true]
A Coolify instance is wired in Settings → Infrastructure. You may `delegate_to_agent(type='infra', ...)` for managed databases, application deploys, and log fetching. For `data: real-db` projects, prefer delegating DB provisioning to infra BEFORE the coding agent scaffolds — see the Coolify block in your CODING_AGENT delegation guide.
Configured instances:
  - biela-ent-21 (default) — id=163649488, url=http://localhost:8000
When the user names a specific instance ("deploy to Staging"), pass the instance name in the infra task; otherwise the default is used.

[INTERNAL_GIT]
If you probe the git remote "origin" (ssh://git@localhost:2222/...) from within your own execution here, it will report "Connection refused" on port 2222 — that is expected, not evidence the internal git server is down. "localhost" in this context is this sandboxed container's own loopback, not the host; the internal git server is healthy and real pushes (which run host-side, not from here) are unaffected. If you genuinely need to check reachability from within this turn, use host.docker.internal:2222 instead of localhost:2222.
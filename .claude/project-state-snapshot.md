<current_state>
# Project State

## Current Phase
Build complete — reviewed, fixed, verified. Not deployed.

## Project Type
project_type: web_app
project_type_source: inferred
visual_tier: premium
data: none

## What exists
React 18 + TypeScript + Vite 8 + Tailwind 3.4.19 + react-router-dom v6
marketing site for **manaber.ai** — an on-device AI live translation app for
mosques, conferences and events (Dubai, UAE). Structure and polish modelled on
stenomatic.ai; identity is Manaber's own emerald.

**Routes:** `/` · `/features` · `/use-cases` · `/contact` · `/privacy` · 404
**Design system:** emerald scale around `#10B981`, warm neutrals, Inter (body)
+ Instrument Serif (display italic accent), radius/shadow scales,
`tracking-eyebrow`, one shared refcounted IntersectionObserver (`useReveal`).
**Images:** 7 AI-generated via Runware, all verified swapped into source.

## Completed
- Research: manaber.ai content/brand → `research/manaber-site.md`
- Research: stenomatic.ai design system → `research/stenomatic-design.md`
- Scaffold (Vite/React/TS/router/Tailwind), Tailwind v4→v3 syntax bug fixed
- `plan_images` — 7 slots, all landed
- Design system + Header/Footer + 9-section Home
- Features, Use Cases, Contact, Privacy built in parallel
- Design audit — applied fixes (see below)
- Code review — APPROVE, 3 medium findings, all fixed
- Final: `npm run build` clean, `npm run lint` exit 0, 11 image literals intact

## Design audit fixes applied
Above-the-fold content was gated on IntersectionObserver on 3 routes (hard-rule
breach) · `bg-emerald-950` was dead code losing to `bg-neutral-950` in Tailwind's
output order · interior mastheads rebalanced to use the right column · two
contrast failures fixed (footer 4.06:1→7.8:1; micro-labels 2.5:1) · Use Cases
renumbered to reading order · h1 scale unified, `7xl` deferred to `xl` ·
icon-chip sizing unified · Header drawer now closes before the new route paints.

## Code review fixes applied
1. `ScrollToTop.tsx` — cross-page hash links now resolve their anchor. I then
   rewrote the guard with two refs (pathname + hash) so the Footer's
   `/features#languages` also works when clicked from `/features` itself; the
   agent's first version short-circuited that case.
2. `Privacy.tsx` — scroll-spy tracks intersecting ids across observer callbacks
   so `aria-current` no longer sticks to a section the reader has left.
3. `Contact.tsx` — focus moves to the confirmation heading on submit.

## Open Items / Risks
- **Discovery answers were auto-submitted defaults, never actively confirmed**
  (fidelity, page scope, no-backend). Re-confirm before deploy or spend.
- **"25+ languages" is unverified.** It comes from Manaber's own live site, but
  it is the one figure outside the three verified stats. Confirm against the
  current App Store listing before this goes public.
- **Google Play URL is a search link**, not a package URL — the real package id
  was not verifiable. Needs replacing with the actual listing.
- Contact form is `mailto:` only and says so honestly. Real lead capture =
  provision Postgres on Coolify (`biela-ent-21`) — separate explicit step.
- Existing logo not used; brand wordmark is typographic. Their real icon is at
  `manaber.ai/wp-content/uploads/2025/08/icon-192x192-1-scaled.png`.

## Content discipline held throughout
No testimonials, client logos, case studies, awards, certifications, pricing,
team bios, response-time promises, latency or accuracy figures. Only the three
real stats (5.0★ · 1,000+ ratings · +70% engagement). Stenomatic's copy and
palette were not reused. Privacy policy claims no compliance framework.

## Uncommitted work — HELD by user decision (2026-08-30)
Solution pages + mega-menu landed on disk before the escalation reached the
user. User's answer: **hold as-is, no further work.** So: not committed, not
reviewed, not reverted, not deployed. Left exactly as the agent wrote it in
the working tree (`src/lib/solutions.ts` modified, `.biela/` untracked).
Do NOT commit, sweep, or continue this work without an explicit new request.

## Netlify deploy — prepared, NOT deployed (2026-08-31)
User asked to deploy to Netlify team `sumairzahid123`. Prep done, publish blocked.
- `netlify.toml` committed: build `npm run build`, publish `dist`, NODE_VERSION 20,
  SPA fallback `/*` → `/index.html` 200, immutable cache on `/assets/*`
- `public/_redirects` committed (same fallback for drag-and-drop deploys)
- `npm run build` clean — 307 KB JS / 87.7 KB gzip, 35.4 KB CSS
- `manaber-dist.zip` at workspace root (gitignored), 7 files, verified valid
- `vite.config.ts` does NOT import `.biela/ports.mjs`, so a fresh clone builds fine
BLOCKED on GitHub auth (2026-08-31). Nothing has been published.
- `github_create_repo` → "Resource not accessible by personal access token"
- User then created the repo themselves: github.com/ManaberAi/Manaber-AI-Website
- Remote `github` wired in workspace (origin still points at internal Forgejo)
- First push → secret scan blocked on `.claude/agents/{coding,coding-lite}.md`
  (placeholder `postgresql://user:password@host:5432/dbname`, NOT a real credential)
- Fixed by untracking `.claude/` entirely (commit 85ceb56) — platform tooling +
  internal state snapshots, not website source. Files remain on disk, gitignored.
- Second push → 403 "Write access to repository not granted"
Root cause: connected PAT is for user `Sumair10`; repo is owned by org `ManaberAi`.
Looks like a fine-grained PAT with no ManaberAi resource-owner grant.
Retry is one `github_push` call once the token has write on that repo.
No Netlify token available, no netlify CLI installed.

### Scanner blocker — RESOLVED (verified, not guessed)
Two wrong attempts first, both reverted, nothing lost:
1. Untracked `.claude/` wholesale (85ceb56) — user flagged it as far too broad
   for a two-line problem. Reverted.
2. Bracketed the Postgres placeholders (6a92233) — made it WORSE, 1 match/file
   → 3. Reverted. Root cause of the regression: secretlint's
   database-connection-string rule ALLOWLISTS obvious dummy words, so
   `postgresql://user:password@host` was never flagged; `<user>:<password>`
   defeated the allowlist and created new matches.

Actual match, found by running the rule locally instead of guessing:
`npx @secretlint/quick-start .claude/agents/coding.md` → line 642,
rule `[MongoDBConnection]`, on the MONGODB_URI example line in the `.env`
section (a mongo scheme URL carrying inline dev credentials).
DO NOT quote that literal in any tracked file — doing so propagates the match
into `project-state-snapshot.md`. That is how a 3rd match appeared 2026-08-31.
Fix (commit 2ed6820): switched it to `${MONGO_PASSWORD}` interpolation,
mirroring the PostgreSQL block above. Verified `secretlint` exit 0.
LESSON: run the scanner locally to identify the literal — never guess it.

### ⚠️ BUT: editing `.claude/agents/*.md` is FUTILE — they regenerate
The platform rewrites `.claude/agents/*.md` from a template on session start.
Commit 2ed6820 is in git history, but the next turn the working tree came back
MODIFIED with line 642 restored to the original. Any edit there is transient.
Consequence: the scanner hit CANNOT be fixed by editing those files. The only
durable options are (a) stop tracking them, or (b) fix the platform template
upstream (outside this project), or (c) skip GitHub entirely.
This is new evidence that post-dates the user's rejection of untracking —
they rejected it as "too broad for a two-line fix", before it was known the
two lines regenerate every turn.

### REMAINING BLOCKER — 403, GitHub write access (unresolved)
`git push github master` → `remote: Write access to repository not granted` (403).
Persists with the NEW token connected 2026-08-31 (classic `repo` scope requested).
Token authenticates as user `Sumair10`; repo is owned by org `ManaberAi`.
So the token is valid but that account lacks write on that specific repo.
Likely one of: Sumair10 not a collaborator/member with write · org enforces SAML
SSO and the token was never authorized · fine-grained token with no org grant.
User's own link was .../settings/access — the collaborator page.

⚠️ SECURITY: on 2026-08-31 the user pasted a raw PAT (`github_pat_11AM6FVK…`)
directly into chat. It was NOT used. User was told to revoke and rotate it, and
reconnected via the secure dialog. Confirm the old one was actually deleted.
Never accept a credential as chat text — use `github_request_connection`.

### Scanner — CLEARED for good (2026-08-31, commit 90ce456)
User chose the narrow option: untrack `.claude/agents/` ONLY (13 regenerating
templates). `coach-lessons-snapshot.md`, `project-state-snapshot.md` and
`skills/coach-lessons/SKILL.md` stay tracked. Files remain on disk.
Verified: secretlint over all 53 tracked files → exit 0, zero findings.
A push now reaches GitHub instead of being blocked locally.

### Token was revoked — needs reconnecting (current blocker)
Push reached the remote and returned `Invalid username or token`, and
`github_status` now returns connected:false "GitHub rejected it (invalid or
expired)". Earlier failures were 403 (valid token, no write access); this is
401-class. Inference: the token connected via the dialog was the SAME one the
user had pasted into chat, so revoking it invalidated the stored connection.
`github_request_connection` dialog reopened for a freshly generated token.

### 403 CONFIRMED as the sole remaining blocker (2026-08-31, isolated)
Fresh valid token connected (github_status → Sumair10, connected:true).
Push → 403 "Write access to repository not granted". NOT 401 this time, so the
token is genuinely valid — the account simply has no write on the org repo.
Everything else is proven clear: scanner exit 0 over 53 tracked files, remote
wired, work committed at 90ce456, working tree clean.
User believes they granted access; the grant is not in effect. Untestable from
here — no read-only GitHub API path is available to the orchestrator.
Three candidate causes, in likelihood order:
 1. Collaborator INVITATION still pending — must be accepted at
    github.com/ManaberAi/Manaber-AI-Website/invitations as Sumair10
 2. SAML SSO not authorized for this specific token (resets per new token) —
    github.com/settings/tokens → token → Configure SSO → Authorize ManaberAi
 3. Role granted was Read rather than Write
FALLBACK if this keeps failing: create the repo under Sumair10 personally
(where the token works) and transfer it to ManaberAi afterwards; or abandon
GitHub and deploy `manaber-dist.zip` / a Netlify token straight to Netlify.
NOTE: `github_create_repo` failed earlier under the OLD fine-grained token;
untested under the current classic `repo`-scope token.

## Next Steps (none in flight — awaiting user)
- User picks a publish path: widen PAT scope → I create+push repo; OR supply a
  Netlify token → I install CLI and deploy; OR drag `manaber-dist.zip` onto Netlify
- Verify the two open content items above (25+ languages, Play Store URL)
- Optional: deploy to Coolify (`biela-ent-21`) on explicit request

</current_state>

<existing_images>
# Already-generated images (recovered from images_library)

These dataAiIds ALREADY have a generated image in the DB. Do NOT call
plan_images for any dataAiId in this list — the image exists and will
render via the normal slot pipeline. Use the EXACT dataAiId verbatim if
you need to reference a slot; coining a new slug for the same conceptual
image will trigger a duplicate generation and waste Runware credits.

Total recovered slots: 11

| dataAiId | url | prompt |
| --- | --- | --- |
| small-diverse-team-standing-together-7a75 | https://im.runware.ai/image/os/w05dlim3/ws/3/ii/575373f4-3370-459f-baaf-d5b0feeaa7da.webp | Small diverse team standing together around a wall-mounted screen in a bright modern workspace, soft window daylight. Muted neutral palette with a hint of green, minimal interior, focused collaborativ |
| warm-documentary-photograph-of-a-33e9 | https://im.runware.ai/image/os/w05dlim3/ws/3/ii/5839d4a0-941e-4453-88d2-66dcbb1434d9.webp | Warm documentary photograph of a mosque courtyard after prayer, a small group of people standing and talking in soft late afternoon daylight. Neutral stone and sand tones, clean architectural lines, c |
| usecase-mosque-announcements | https://im.runware.ai/image/os/w05dlim3/ws/3/ii/cd11c5ff-f24b-4475-85a3-d91c8451f17d.webp | Warm documentary photograph of a mosque courtyard shortly after prayer, a small group of people standing and talking together in soft late afternoon daylight. Neutral stone and sand tones with a faint |
| usecase-team-meetings | https://im.runware.ai/image/os/w05dlim3/ws/3/ii/eb7a35c1-5333-4682-8a96-77a1f1195bbb.webp | A small diverse team standing together around a wall-mounted screen in a bright modern workspace, lit by soft window daylight. Muted neutral palette with a subtle green accent, minimal interior, focus |
| hero-visual | https://im.runware.ai/image/os/w05dlim3/ws/3/ii/9d9a9667-8699-4561-a133-d934aa438d26.webp | Serene modern mosque interior photographed at golden hour. Warm directional sunlight streams through intricate geometric lattice windows, casting soft patterned shadows across a calm prayer hall. Wide |
| languages-visual | https://im.runware.ai/image/os/w05dlim3/ws/3/ii/b5cc6f20-3612-4d6d-bb31-42c0a6826b63.webp | Abstract minimal 3D render of a soft flowing gradient mesh in emerald, teal and pale mint, suggesting many connected voices converging. Smooth matte surfaces, studio HDRI lighting, generous white nega |
| privacy-visual | https://im.runware.ai/image/os/w05dlim3/ws/3/ii/1bdfdfc8-0079-4097-96ae-f7045b8ee00b.webp | Minimal studio photograph of a single modern smartphone resting on a matte slate surface, lit by soft directional light with a subtle emerald green rim highlight along one edge. Clean, calm, premium t |
| usecase-conference | https://im.runware.ai/image/os/w05dlim3/ws/3/ii/9a85b22c-98d0-420b-bd8a-34675e8c985f.webp | Modern conference auditorium seen from the side, an attentive seated audience facing a softly lit stage. Cool neutral tones with a subtle warm key light, clean contemporary interior design, shallow de |
| usecase-business-meeting | https://im.runware.ai/image/os/w05dlim3/ws/3/ii/ca2b5246-ca4d-4ff5-8779-63b4703d6f0f.webp | Bright modern meeting room with a small diverse team seated around a light wood table in soft window daylight. Calm professional atmosphere, minimal interior, muted neutral palette with a hint of gree |
| usecase-friday-sermon | https://im.runware.ai/image/os/w05dlim3/ws/3/ii/a236c4a7-1d82-43ef-8560-3c163bc7121a.webp | Wide, respectful photograph of a spacious mosque prayer hall filled with soft natural daylight. Warm neutral stone and carpet tones, clean architectural lines, calm and reverent atmosphere. Documentar |
| usecase-education | https://im.runware.ai/image/os/w05dlim3/ws/3/ii/04846f8b-09c4-4718-ad4f-4a1b9db39e78.webp | Calm university lecture room with students seated in rows, warm natural light from tall windows, neutral wood and off-white tones. Focused studious atmosphere, documentary style, shallow depth of fiel |
</existing_images>

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
User current local time: 2026-08-31, 10:47

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

[DEV_SERVER]
Status: running
Local URL: http://localhost:26002 (only reachable inside this server)
Public URL: https://manaber-ai-website-26002.demo4.hubdesk.ai
IMPORTANT: Always use the Public URL when the user asks for a link, preview, or wants to open the app from their phone or browser. Never give localhost to the user.

[INTERNAL_GIT]
If you probe the git remote "origin" (ssh://git@localhost:2222/...) from within your own execution here, it will report "Connection refused" on port 2222 — that is expected, not evidence the internal git server is down. "localhost" in this context is this sandboxed container's own loopback, not the host; the internal git server is healthy and real pushes (which run host-side, not from here) are unaffected. If you genuinely need to check reachability from within this turn, use host.docker.internal:2222 instead of localhost:2222.

[BLOCKCHAIN]
BLOCKCHAIN DEVELOPMENT TOOL DOCUMENTATION:

TOOL: create_blockchain_wallet (you may also see it as
mcp__orchestrator__create_blockchain_wallet). It takes NO parameters — call
it with an empty argument object.

IMPORTANT — this tool's own description may be hidden from you. Tool schemas
get deferred, so you may only ever see this tool's NAME in your tool list and
never read what it does. That is why its documentation is repeated here, in
full: do NOT skip calling it just because you cannot see its description, and
do NOT go looking up its schema before using it. It takes no arguments, and
everything you need to decide is written below.

WHEN TO USE: Call it when the user asks for blockchain-specific
functionality, and only ONCE per project. Without calling it you have ZERO
blockchain development knowledge and cannot deliver what the user asked for.
e.g.: "let's create a crypto token", "build a decentralised exchange".

MANDATORY SEQUENCING — THIS IS THE PART THAT GETS MISSED:
Call it BEFORE any contract work begins. Before you write contract code
yourself, and BEFORE you delegate the build to a coding agent. The blockchain
instructions, the required project architecture, and the contract-generation
tools do not exist for this project until it has run. A build dispatched
first is scaffolded without them — no Hardhat layout, no Factory.sol — and
has to be thrown away and redone from scratch. It is the FIRST step, not a
finishing touch.

BEFORE CALLING, ask yourself:
1. "Do I need a wallet for future interactions with this project — deploying,
   signing transactions?"
2. "Is the user developing a decentralized app?"
3. "Am I going to create smart contracts?"
If the answer to any of those is yes, call it now.

DO NOT CALL IT for projects that only talk ABOUT blockchain and write no
contracts — a blog, a landing page, a dashboard reading a public price API.
e.g.: "let's build a blog about blockchain" — no wallet.
Also do not call it a second time on a project that already has one.

AFTER THE USER DEPLOYS CONTRACTS:
The Smart Contracts panel sends you a message automatically once contracts
have been deployed, asking you to redeploy the website. When that arrives:
- Do NOT deploy the contracts again. They are already live and the new
  addresses are already written to public/deployment.json.
- Redeploy the site on whichever host this project is ALREADY deployed on.
  Check what it uses rather than assuming — some projects deploy to Vercel,
  others to Coolify through the infra agent, which owns the app's uuid.
- If the project has never been deployed anywhere, DEPLOY IT TO COOLIFY now,
  via the infra agent. Do not ask first and do not stop to report that no
  deployment exists — the contracts are already live on a real chain, so the
  site belongs live too, and that is the whole point of this request.
  Only if Coolify is not configured on this platform at all should you stop
  and tell the user, since then there is nothing to deploy to.

EVM-ONLY Inforcement:
For now, you are able to create ONLY EVM-based smart contracts.
If the user requests for NON-EVM development, such as Solana, kindly
guide him into using EVM, telling him NON-EVM development is not
supported yet.
Do not ask the user which chain he wants the app to be deployed on.
Biela supports multiple EVM chains for deployment, which the users can
select at deploy time.

USER INSTRUCTIONS NOT CLEAR:
When user's instructions are not very clear, you can use the most common
option for development.
For example, if an user asks for a crypto coin, create an ERC20 contract
with the name SimpleCoin, SCOIN ticker and 1 million supply, alongside
the hardhat node and the dashboard-like interface for interacting with
the token.
NEVER create JUST the smart contract code, but ALWAYS create the entire
project's arhitecture as you will be instructed in CODING MODE.

[RESEARCH MODE: QUICK]
The user has selected Quick Research. Do NOT use Workflow("deep-research"). Instead call Agent({ subagent_type: 'research', ... }) with a concise task: 2–3 targeted web searches, extract key facts, write a brief summary. Target completion: under 2 minutes. Skip adversarial claim verification.
---
name: coach-lessons
description: Load the Coach's accumulated lessons for this project — user preferences, delegation patterns, tech gotchas, anti-patterns. Consult BEFORE non-trivial planning or before delegating a subagent so prior decisions are honoured. Refresh by re-invoking the skill.
allowed-tools: Bash(cat:*)
---

# Coach Lessons

These lessons were learned by the Coach background agent from past turns —
both in this project and globally across projects you've worked on. They
override generic defaults: when a lesson contradicts your instinct, the
lesson wins unless evidence in the current task says otherwise.

Load the current snapshot:

!`cat .claude/coach-lessons-snapshot.md`

## How to use

- Read every line; lessons are short and load-bearing.
- Promoted (global) lessons sit at the top — those have been validated across
  multiple projects, so weight them more heavily than project-local ones.
- Categories you'll see:
  - **user-preference** — how this user wants things done.
  - **delegation-pattern** — when to spawn a subagent vs. doing it inline.
  - **tech-gotcha** — a bug, kernel limit, or framework quirk that bit us before.
  - **style** — code/comm style this user prefers.
  - **anti-pattern** — what NOT to do; usually paired with the why.
- If a lesson is wrong or outdated, do NOT silently ignore it — call
  `mcp__orchestrator__memory_write` with a note so the Coach picks up the
  contradiction in its next pass.

## When NOT to load lessons

Skip the snapshot for trivial single-tool responses (one read, one ack).
The snapshot adds tokens; only load when you're about to plan, delegate,
or write meaningful code.

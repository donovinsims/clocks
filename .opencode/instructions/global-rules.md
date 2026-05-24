# Clockout — Project Global Rules

## Product Context

- **Clockout** = Local-first automation for owner-operated service businesses. Flat fee. You own it.
- Founder: Donovin · Roscoe, IL · Solo operator
- Biz context in CTX memory under `biz-context/*` (CLAUDE.md, playbooks, ICP, brand voice, marketing plans)
- See `project/product-overview` for quick summary

## Source Code

- Vite + TypeScript frontend (shadcn/ui components)
- Located in `/Users/forex/clocks/`
- Main entry: `src/start.ts`

## CTX Memory Index

Project biz-context files are imported into CTX graph memory under these prefixes:

- `claude.*` — CLAUDE.md instructions
- `clockout.executive.brief.*` — Executive Brief
- `clockout.internal.playbook.*` — Internal Playbook
- `clockout.brand.voice.bio.*` — Brand Voice
- `clockout.icp.*` — ICP details
- `one.page.marketing.plan.*` — Marketing plan
- `cold.email.playbook.*` — Cold email playbook
- `vibe.marketing.playbook.*` — Vibe marketing
- `direct.response.copy.gist.*` — Direct response copy

## DCP Usage

- Compress completed task segments proactively
- Keep active work-in-progress uncompressed
- Use `compress` tool directly (DCP `/dcp` commands don't work in web UI)

## Versioning & Code Quality

- No AGENTS.md — use CTX graph memory instead
- Prefer CTX-first: retrieve/read/pack before grepping entire files
- Keep responses concise — no padding or summaries

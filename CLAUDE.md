# Clockout — Project Guide

This project is **Clockout**, a local automation service for owner-operated businesses.

## Quick Start
- Biz context is in CTX graph memory under `biz-context/*` namespaces
- Use `/ctx-retrieve` or `/ctx-ask` before reading full files
- Use `/ctx-memory-search` to find specific biz context
- Codebase: Vite + TypeScript + shadcn/ui in `src/`

## Key CTX Memory Keys
- `project/product-overview` — one-liner, pricing, ICP
- `project/deep-research-icp-strategy` — ICP research summary
- `project/business-validator` — business validation summary
- `claude.*` — general working instructions
- `clockout.executive.brief.*` — executive overview
- `clockout.internal.playbook.*` — internal operations playbook
- `clockout.brand.voice.bio.*` — brand voice guidelines
- `clockout.icp.*` — ideal customer profile
- `one.page.marketing.plan.*` — full marketing plan
- `cold.email.playbook.*` — cold email strategy
- `vibe.marketing.playbook.*` — vibe marketing approach
- `direct.response.copy.gist.*` — direct response copy techniques
- `project/analytics-setup.*` (if applicable)

## DCP
Use `compress` proactively after closing work segments. Keep WIP uncompressed.

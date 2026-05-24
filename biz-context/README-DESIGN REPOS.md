# 🛠️ Clockout: AI Development Skills Guide

Welcome to the Clockout project skills catalog. This repository contains advanced Claude skills and specialized prompt workflows _tailored specifically_ for building the Clockout business website.

**Our Project Goal:**
Build a high-converting, math-first, anti-agency local AI automation operator website serving trades in the Roscoe/Rockford/Beloit area. The site must feel like a letter from a neighbor, _never_ a generic SaaS or corporate agency.

---

## 📐 Layout & Information Architecture

### 1. Website Builder (`website-builder.md`)

- **What it is:** A workflow for generating sitemaps and mapping out information architecture.
- **How to use it for Clockout:** Prompt the agent with: _"Use the `website-builder` to map sections for Clockout. The `/` page is a math-first sales letter (missed calls = lost estimates), and `/about` is a personal anti-agency letter. Keep sections minimal."_
- **Expected Output:** A `sitemap.md` explicitly linking your pain-math sections to specific `shadcn-ui` components.

### 2. Landing Page Design Workflow (`landing-page-design-workflow.md`)

- **What it is:** A specialized workflow guide for distinctive, conversion-first layouts.
- **How to use it for Clockout:** Tell the agent: _"Follow `landing-page-design-workflow.md` to design Clockout's home page. The primary persona is an exhausted owner-operator. No logo walls, no SaaS fluff."_
- **Expected Output:** A structured, direct-response letter layout built for velocity and trust.

---

## 🎨 Design Systems & Visual Language

### 3. CKM Design System (`ckm-design-system.md`) & UI Design System (`ui-design-system.md`)

- **What they are:** Toolkits for generating systematic design tokens and managing consistent visual language.
- **How to use them for Clockout:** Run these skills with the prompt: _"Generate a minimalistic, local-operator design system. Base it on a dark navy and warm accent palette. Optimize body text for long-form reading on budget phones."_
- **Expected Output:** A predictable, serious, non-corporate Tailwind theme configuration that feels "senior designer" level but remains grounded.

---

## ✍️ Conversion Copy & Marketing Psychology

### 4. Marketing Skills Repository (`marketingskills/`) & Copy Creator (`marketing-copy-creator.md`)

- **What they are:** Deep libraries for CRO, marketing psychology, and persuasive copywriting frameworks.
- **How to use them for Clockout:** Prompt: _"Use the marketing psychology and copy creator skills to draft the `/about` page. Write it as a one-column letter from a local peer in Roscoe/Rockford/Beloit. Exclude all marketing jargon and add a soft CTA to text or call."_
- **Expected Output:** High-converting copy anchored purely in local pain points (missed follow-ups) rather than abstract technical features.

---

## 🔍 Audits, Heuristics & UX Evaluation

### 5. Impeccable Audit (`impeccable.md`) & Web Design Guidelines (`web-design-guidelines.md`)

- **What they are:** Hard-nosed technical and visual audit tools.
- **How to use them for Clockout:** Run `/impeccable audit` and ask the agent to validate against `web-design-guidelines.md`. Prompt: _"Audit `/app/page.tsx`. Focus entirely on mobile readability, long-form reading comfort, and whether the layout feels like a startup or a local operator."_
- **Expected Output:** Actionable CSS tweaks to remove excessive gradients, fix tap targets for tradespeople on the go, and enforce maximum contrast.

### 6. UX Heuristics (`ux-heuristics/` & `heuristic-evaluation-playbook.md`)

- **What they are:** Interface validation against standard GDS/Nielsen principles.
- **How to use them for Clockout:** Prompt: _"Run a heuristic evaluation on the Clockout lead form. Flag any instances of agency-speak, hidden pricing info, or mismatched expectations."_
- **Expected Output:** A simplified, friction-free conversion flow that respects the user's time.

---

## 🧠 Workflow Scaffolding

### 7. Prompt Engineering Scaffolding (`prompt-engineering-repository.md`)

- **What it is:** Strategies for task decomposition.
- **How to use it for Clockout:** Use this guide to string the above tools together. E.g., **Plan** (Website Builder) -> **Structure** (Landing Page Design) -> **Copy** (Marketing Skills) -> **Style** (CKM Tokens) -> **Audit** (Impeccable).
- **Expected Output:** An orderly build process that prevents the AI from losing the "local operator" context mid-build.

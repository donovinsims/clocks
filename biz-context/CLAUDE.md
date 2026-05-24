# CLAUDE.md — Clockout Website Project

## What This Project Is

Building the Clockout marketing website — a conversion-first site for a local AI automation operator serving owner-operated small businesses in Winnebago County and the Roscoe/Rockford/Beloit corridor.

**Primary goal:** Get local business owners to book a Free AI Assessment via Cal.com.

**Stack:** TanStack Start (@tanstack/react-router) · Tailwind CSS v4 · shadcn/ui · Vite · Cloudflare deployment

---

## Business Context

**Company:** Clockout  
**Founder:** Solo operator. Not an agency.  
**Service:** Done-for-you AI automation — in-person install, flat fee, client-owned systems  
**Core offer:** Identify the exact operational leak costing the business money, build the fix in 3–7 days, hand it over fully. No retainer. No lock-in.  
**Positioning:** Anti-agency. Local. Proof before pitch. You own everything.  
**Domain:** Spaceship-registered, deployed to Vercel

---

## Target Customer (ICP)

**The qualifier is not the industry or the headcount. It is the situation.**

If the owner is still the one answering calls, chasing leads, and doing admin at night — this is for them.

Owner-operated local businesses in Roscoe, Rockford, Machesny Park, Loves Park, and South Beloit. The owner is the bottleneck. They are losing money to missed calls, cold leads, no follow-up, and manual admin they do themselves after hours. Non-technical. Overworked. Skeptical of agencies and SaaS tools they have already paid for and abandoned.

**Do not filter by employee count or revenue.** The situation is the only filter. A one-person nail salon and a 20-person HVAC company can have identical problems.

**Examples of strong fits:**

- HVAC, plumbing, electrical, general contracting, auto repair (primary proof cases in copy)
- Real estate agents and small brokerages
- One-person home service trades (woodwork, landscaping, handyman)
- Nail salons, barbershops, and personal service businesses
- Any local owner in Winnebago County answering their own calls, doing their own follow-up, working nights on admin

**Their real problems:**

- Missed calls while on-site — 68% of callers never call back; $800–$1,200 per missed call
- Estimates and quotes going cold with no follow-up system
- No-shows with zero recovery process
- 8–12 hrs/week of manual admin bleeding into evenings

**What they've already tried and hated:** HubSpot, marketing agencies ($3K–$8K/month retainers), DIY Zapier

**What they want:** A system that runs without them. Evenings free. Full ownership. Clear ROI before they spend a dollar.

---

## Site Architecture

| Page           | Main Goal                        | Secondary Goal             | Visual Style                    |
| -------------- | -------------------------------- | -------------------------- | ------------------------------- |
| `/`            | Convert                          | Prove the cost and the fix | Long-form, clean, high-contrast |
| `/about`       | Build trust                      | Remove agency fear         | Personal letter, narrow column  |
| `/agents`      | Impress                          | Show breadth of capability | Card grid, modal details        |
| `/blog`        | Educate + attract search traffic | Build authority            | Simple article feed             |
| `/blog/[slug]` | Convert readers                  | Explain one problem deeply | Readable article format         |
| `/assessment`  | Book the call                    | Reduce hesitation          | Minimal, distraction-free       |

**Primary CTA on every page:** Book a Free AI Assessment → `https://cal.com/donovin`

**User journey (cold entry):** Home → About → Agents → Blog → Assessment

---

## Page Layouts

### `/` — Home

Long-form sales letter. One job: convert skeptical local operators by showing the pain, the cost, and the fix. Numbers-first. Not an agency site. Sections: hero, operating cost breakdown, how it works, what you get, proof, anti-agency statement, FAQ, final CTA. Wide spacing, bold headings, no clutter.

### `/about` — Founder trust page

Narrow single-column. Reads like a personal letter from a local operator. Answers: "Who is this guy, and can I trust him?" Sections: blunt intro, why software failed local businesses, how you operate, soft CTA. One photo, minimal text width, anti-agency feel.

### `/agents` — Automations showcase

Gallery of automations you can build for clients. Not a closer — a "holy sh\*t, this is possible" moment for non-technical owners. Sections: hero, grid of automation cards, modal/detail views, final CTA. Card-based layout, icons/tags, clear ROI language per card.

### `/blog` — Local education hub

SEO and trust engine. Captures search traffic through operational case-study posts about missed calls, cold leads, no-shows, and manual admin. Built using content strategy from the `coreyhaines31/marketingskills` repo — specifically the page-CRO, copywriting, and marketing-psychology skills. Sections: hero, article list, featured local examples. Simple readable cards, strong post titles.

**Blog content rules:**

- Every post opens with the problem and the dollar cost
- Every post explains the system in plain English
- Every post ends with a PS CTA to the Free Assessment
- No jargon. No generic AI trend content. Local examples only.
- Title formulas: "How a $X fix recovered $Y/month for a local [business type]" or "The $X operating cost hiding in your [process]"

### `/blog/[slug]` — Individual post

Opens with the problem, shows the cost, explains the system, ends with a CTA. Narrow reading width, numbered steps, strong PS at the bottom.

### `/assessment` — Booking page

Full conversion page. Copy-only layout. No video. No distractions. Structured as follows:

**Section 1 — Hero**
Main promise + supporting line + primary CTA button.

- Promise: A 20-minute audit that shows exactly where your business is losing money.
- Supporting line: Written ROI report delivered same day. No pitch. No obligation.
- CTA: Book the Free Assessment → `https://cal.com/donovin`

**Section 2 — Problem → Opportunity → Promise**

- Problem: You know you're losing jobs to missed calls and cold leads. You just don't know the exact number.
- Opportunity: One 20-minute call shows you the dollar amount — and the fix.
- Promise: Walk away with a written report showing where you're bleeding cash and what a fix would cost and return.

**Section 3 — What you get**

- 20-minute live walkthrough of your operations (phone or in-person)
- Written ROI report showing the monthly cost of each operational leak
- Effort/Impact matrix ranking every fix by ease and dollar return
- No sales pitch at the end — just the numbers

**Section 4 — Who this is / is not for**

- IS FOR: Owner-operated local businesses in Roscoe, Rockford, Machesny Park, Loves Park, and South Beloit. Any size. Any industry. You answer your own calls. You do your own follow-up. You've tried a tool before and gone back to doing it manually.
- NOT FOR: Businesses with a dedicated admin staff handling follow-up and scheduling. Businesses looking for a marketing agency. Businesses looking for a managed monthly service.

**Section 5 — Investment + ROI framing + guarantee + what happens next**

- Investment: Free (future ramp to $150–$250)
- ROI framing: If one recovered call pays $800–$1,200, the report pays for itself before you spend anything.
- Guarantee: If the numbers don't justify a fix, you'll know in 20 minutes — before you spend a dollar.
- What happens next (numbered steps):
  1. Book a time below
  2. Complete a 5-minute intake form
  3. 20-minute call — no pitch, just your numbers
  4. Written ROI report delivered same day
  5. Optional: install the fix in 3–7 days at a flat price

**Section 6 — Testimonials**
Three placeholder testimonials in this format (owner replaces with real ones):

> "[Specific outcome] in [timeframe]. I didn't expect the number to be that high."
> — [First name], [Business type], [City]

**Section 7 — FAQ**

- "Is this actually free?" — Yes. 20 minutes. Written report. No pitch.
- "What if my business isn't in the trades?" — If your phone is your front desk, this applies to you.
- "What if I've tried automation before and it didn't work?" — Prior tools failed because they required you to change how you work. This installs to fit how you already operate.
- "Do I have to buy anything after?" — No. The report stands alone. If a fix makes sense, you decide.
- "What if the numbers don't show a problem worth fixing?" — Then you'll know that in 20 minutes and owe nothing.

**Section 8 — Final CTA**
Two options framed plainly: keep losing money every week, or spend 20 minutes and find out the number.
CTA button: `https://cal.com/donovin`

---

## Design Principles

- **Mobile-first.** ICP reads on their phone between jobs.
- **Aggressive white space.** Exhausted readers scan, not read.
- **No animations that delay content.** Speed over polish.
- **No agency aesthetics.** No gradients-on-gradients, no floating mockups, no stock photos of people in headsets.
- **No SaaS vibes.** No "Supercharge your workflow" language. No feature grids.
- **Numbers over claims.** Show the operating cost, not the promise.

---

## Brand Voice Rules

Apply these to every word on the site — copy, labels, CTAs, error states.

- **Sentence length:** 8–14 words avg
- **Paragraph length:** 1–3 sentences. One idea only.
- **Vocabulary:** 6th–8th grade. Peer at the supply house, not a tech founder.
- **Tone:** Declarative. Fact-based. Direct. No hype.
- **Punctuation:** Minimal commas. Heavy periods. Colons to introduce systems or cost breakdowns.
- **No corporate case:** Never capitalize Synergy, Ecosystem, Transformation, Solutions
- **No emojis**
- **No exclamation marks**
- **Numbers over claims:** `3 missed calls × $800 = $2,400 lost` not "significant revenue loss"
- **Proof before pitch:** Show the operating cost before you introduce the fix
- **Time/cost callouts:** `Time to build: 3 days. Cost: $500 flat.`
- **No video language:** Never write "watch this" or reference any video. Copy and static layout only.

---

## Code Standards

- Use **Next.js App Router** (not Pages)
- Use **shadcn/ui** components — run `pnpm dlx shadcn add [component]` before writing custom versions
- Use **Tailwind CSS** utility classes only — no custom CSS files unless unavoidable
- **No external UI libraries** beyond shadcn/ui (no MUI, no Chakra, no Radix direct)
- Components go in `/components/` — one file per component
- Page sections go in `/components/sections/`
- Keep components small and single-purpose
- No inline styles
- TypeScript throughout

---

## File Structure (Target)

```
clockout-site/
├── app/
│   ├── page.tsx                  # Homepage (sales letter)
│   ├── about/page.tsx
│   ├── agents/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── assessment/page.tsx       # Full conversion page + Cal.com embed
│   └── layout.tsx
├── components/
│   ├── ui/                       # shadcn/ui auto-generated
│   ├── sections/                 # Page sections (Hero, Numbers, Proof, FAQ, CTA, etc.)
│   └── Nav.tsx, Footer.tsx
├── content/
│   └── blog/                     # MDX or JSON blog post files
├── lib/
├── public/
└── CLAUDE.md
```

---

## Integrations

| Service | Purpose                    | Notes                                                                     |
| ------- | -------------------------- | ------------------------------------------------------------------------- |
| Cal.com | Free AI Assessment booking | URL: `https://cal.com/donovin` — Embed on `/assessment`, link in all CTAs |
| Vercel  | Hosting                    | Auto-deploy from main branch                                              |
| Senja   | Testimonials               | Embed widget on homepage and `/assessment`                                |
| Tally   | Pre-assessment intake form | Linked after Cal.com booking confirmation                                 |
| Stripe  | Payment pages              | Not on main site — separate checkout URLs                                 |

---

## Homepage Section Order

1. **Hero** — One-sentence problem statement + primary CTA
2. **Numbers section** — Quantify the operating cost (missed calls × dollar value)
3. **How it works** — 3-step process, no jargon
4. **What you get** — Specific deliverables, not features
5. **Proof** — Senja testimonials embed
6. **Anti-agency statement** — Why Clockout is different (you own it, flat fee, local)
7. **FAQ** — Address the real objections (cost, complexity, "what if it breaks")
8. **Final CTA** — Book the assessment

---

## What NOT to Build

- No feature comparison tables
- No chatbots or pop-ups
- No newsletter capture
- No social proof counters ("500+ businesses automated!")
- No hero videos, background video, or video embeds anywhere on the site

---

## Definition of Done (per page)

Before any page is considered complete:

- [ ] Loads clean on mobile (375px) and desktop (1280px)
- [ ] No raw markdown, template variables, or placeholder text visible
- [ ] All CTAs link to `https://cal.com/donovin`
- [ ] No console errors
- [ ] Copy follows brand voice rules above
- [ ] Passes Lighthouse performance score ≥ 85 on mobile

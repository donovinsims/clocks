# Clockout — Analytics Tracking Plan

**Status**: Pre-launch (no analytics installed)  
**Stack**: TanStack Start SSR, Vite, React 19, Vercel  
**Date**: 2026-05-22  
**Author**: Analytics Implementation Review

---

## Table of Contents

1. [Tool Recommendation](#1-tool-recommendation)
2. [Event Tracking Plan](#2-event-tracking-plan)
3. [Implementation Approach](#3-implementation-approach)
4. [UTM Strategy](#4-utm-strategy)
5. [Conversion Tracking](#5-conversion-tracking)
6. [Privacy Considerations](#6-privacy-considerations)
7. [Measurement Framework](#7-measurement-framework)
8. [Minimum Viable Analytics (Solo Founder)](#8-minimum-viable-analytics-solo-founder)

---

## 1. Tool Recommendation

### Contenders

| Tool          | Pricing (solo)                      | Privacy                        | Self-host? | SSR Compat       | Event Tracking            | Effort      |
| ------------- | ----------------------------------- | ------------------------------ | ---------- | ---------------- | ------------------------- | ----------- |
| **Plausible** | ~€12/mo (startup) or self-host free | GDPR-native, no cookies        | Yes        | Script tag + API | Pageviews + custom events | Low         |
| **Fathom**    | $14/mo (1 site)                     | GDPR-native, no cookies        | No         | Script tag       | Pageviews + custom events | Low         |
| **PostHog**   | Free tier (1M events/mo)            | Requires cookie consent for EU | Yes        | Snippet + JS lib | Full product analytics    | Medium      |
| **GA4**       | Free                                | Requires cookie consent banner | No         | gtag / GTM       | Full event model          | Medium-High |
| **Umami**     | Free self-host                      | GDPR-native, no cookies        | Yes        | Script tag       | Pageviews + custom events | Low-Medium  |

### Recommendation: **Plausible** (primary) + **PostHog** (optional for product analytics)

**Why Plausible for a solo pre-revenue founder:**

1. **No cookies, no consent banner required** — Plausible uses no persistent identifiers. It's privacy-compliant out of the box in the EU (and IL/WI corridor customers don't need cookie banners). This saves you the cost and complexity of cookie consent tooling.
2. **Dead-simple install** — one `<script>` tag or one npm package. Works on SSR/Vercel without fuss.
3. **Cheap at scale** — ~€12/mo for startup tier. Self-hosted is free if you want to run it on a $5 VPS.
4. **Custom events** — supports `plausible()` function calls for all the events below.
5. **Goals/conversions** — native goal tracking for page visits and custom events.
6. **UTM tracking** — built-in, automatic.
7. **Dashboard is all you need** — you're one person. Plausible's single-page dash gives you traffic sources, top pages, goals, and engagement in one glance.

**Why PostHog as an optional supplement:**

- If you eventually want session replays, feature flags, or funnel analysis beyond what Plausible offers.
- The free tier (1M events/mo) will handle pre-launch traffic easily.
- But it requires cookie consent if you ever get EU visitors, and the setup is heavier.
- **Defer this until you have paying customers.** Do not install it pre-launch.

**Decision: Start with Plausible. Skip PostHog until post-launch.**

| Cost                             | €0 (self-host) or ~€12/mo (cloud) |
| -------------------------------- | --------------------------------- |
| Cookie banner needed?            | **No**                            |
| Install time                     | 30 minutes                        |
| Maintenance                      | Near-zero                         |
| Covers what you need pre-launch? | Yes                               |

---

## 2. Event Tracking Plan

### Event Naming Convention

- Use `snake_case` (consistent with Plausible norm)
- Prefix: `clockout_` (namespace to avoid collisions if you add tools later)
- Pattern: `[object]_[action]` (e.g. `booking_modal_opened`, `calculator_slider_moved`)

### Event Definitions

| #   | Event Name                       | Category   | Properties                                                                                                    | Trigger                                                                                                                                       | Priority    | Notes                                                                                                                                                                  |
| --- | -------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `clockout_booking_opened`        | Conversion | `source` (string: hero \| pricing \| faq \| assessment \| agent_card \| calculator \| guarantee \| final_cta) | Any click on a `BookingButton` or button that calls `open()` on the booking context                                                           | 🔴 Critical | Add a `source` prop to each `BookingButton` instance to identify which page section triggered it                                                                       |
| 2   | `clockout_booking_completed`     | Conversion | —                                                                                                             | User completes the Cal.com booking flow (confirmation page shown)                                                                             | 🔴 Critical | Cal.com embed fires an event on booking; you can listen for it via `getCalApi()` → `cal("on", "bookingSuccessful", ...)` — or use Cal.com webhook to a server function |
| 3   | `clockout_leadbar_subscribed`    | Conversion | `email_domain` (string, e.g. "gmail.com")                                                                     | LeadBar form submitted successfully (ConvertKit API returns ok)                                                                               | 🟡 High     | Track in the `handleSubmit` success branch in `LeadBar.tsx`                                                                                                            |
| 4   | `clockout_assessment_saved`      | Conversion | `name` (string), `email` (string), `total_leak` (number), `severity` (string: tight \| moderate \| severe)    | User fills in name + email on assessment results page and submits (note: currently there's no submit on that form — see implementation notes) | 🟡 High     | The assessment results form currently captures name+email in state but has no submit handler. Needs implementation.                                                    |
| 5   | `clockout_calculator_interacted` | Engagement | `missed_calls` (number), `ticket_size` (number), `monthly_leak` (number)                                      | User moves either slider in the Cost Calculator                                                                                               | 🟢 Medium   | Fire on the `useEffect` that tracks `missed`/`ticket` changes (already has `setInteracted(true)` — piggyback there)                                                    |
| 6   | `clockout_assessment_started`    | Engagement | —                                                                                                             | User clicks "Start the Scorecard" on `/assessment`                                                                                            | 🟢 Medium   | Fires in `handleStart` from the landing step                                                                                                                           |
| 7   | `clockout_assessment_completed`  | Engagement | `total_leak` (number), `severity` (string), `answers` (array of numbers)                                      | User finishes all 5 questions and reaches results step                                                                                        | 🟢 Medium   | Fire when `step` transitions to `"results"`                                                                                                                            |
| 8   | `clockout_agent_card_opened`     | Engagement | `agent_name` (string), `agent_num` (string)                                                                   | User taps an agent card on `/agents`                                                                                                          | 🟢 Medium   | Fire in the `onClick` handler on each agent card button                                                                                                                |
| 9   | `clockout_faq_toggled`           | Engagement | `question` (string), `action` (string: open \| close)                                                         | User clicks a `<details>` / `<summary>` FAQ item to expand or collapse it                                                                     | 🔵 Low      | Attach `onToggle` handler to each `<details>` element                                                                                                                  |
| 10  | `clockout_page_viewed`           | Engagement | `page` (string: /, /assessment, /agents, /operator-os, /about, /blog)                                         | Page load / route change                                                                                                                      | 🟢 Medium   | Plausible tracks pageviews automatically. Augment with custom event if you want richer page metadata.                                                                  |

### Priority Legend

| Priority    | Meaning                                                           |
| ----------- | ----------------------------------------------------------------- |
| 🔴 Critical | Core business conversion. Required before any paid traffic.       |
| 🟡 High     | Supports conversion tracking and lead quality. Needed pre-launch. |
| 🟢 Medium   | Engagement insight. Useful but not blocking.                      |
| 🔵 Low      | Nice-to-have. Skip if time-constrained.                           |

### Implementation Notes by Event

**1. `clockout_booking_opened`** — Modify `BookingButton` to accept a `source` prop:

```tsx
// BookingButton in BookingModal.tsx
type BtnProps = {
  className?: string;
  children: React.ReactNode;
  source?: string; // NEW
  // ...
};
export function BookingButton({ source = "unknown", ... }: BtnProps) {
  const { open } = useBooking();
  return (
    <button onClick={() => {
      plausible("clockout_booking_opened", { props: { source } }); // NEW
      open();
    }}>
      {/* ... */}
    </button>
  );
}
```

Then pass `source` from each call site (e.g. `<BookingButton source="assessment_results">`).

**2. `clockout_booking_completed`** — Listen for Cal.com's `bookingSuccessful` event:

```tsx
// In BookingProvider, after getCalApi():
useEffect(() => {
  (async () => {
    const cal = await getCalApi();
    cal("ui", { ... });
    cal("on", "bookingSuccessful", () => {
      plausible("clockout_booking_completed");
    });
    setCalReady(true);
  })();
}, []);
```

**3. `clockout_leadbar_subscribed`** — In `LeadBar.tsx` success branch:

```tsx
// In handleSubmit, after await subscribeToConvertKit(...):
setStatus("success");
plausible("clockout_leadbar_subscribed", {
  props: { email_domain: email.split("@")[1] },
});
```

**4. `clockout_assessment_saved`** — The assessment results form (`assessment.tsx` lines 787–850) currently shows name+email inputs but has no submit button or handler. Add a save button:

```tsx
// Add after the email input (line 838), before the closing </div> (line 850):
<button
  onClick={() => {
    if (!leadName || !leadEmail) return;
    plausible("clockout_assessment_saved", {
      props: { name: leadName, email: leadEmail, total_leak: totalLeak, severity: severity.label },
    });
    // Optionally also subscribe to ConvertKit here
    setLeadSaved(true); // new state to show confirmation
  }}
  className="cta cta--primary"
  style={{ width: "100%", justifyContent: "center" }}
>
  Save my results
</button>
```

**5. `clockout_calculator_interacted`** — In `sections.tsx` CostCalculator, the `useEffect` at line 27 already fires on changes. Add:

```tsx
useEffect(() => {
  if (missed !== prevMissed.current || ticket !== prevTicket.current) {
    setInteracted(true);
    prevMissed.current = missed;
    prevTicket.current = ticket;
    setAnimKey((k) => k + 1);
    plausible("clockout_calculator_interacted", {
      props: { missed_calls: missed, ticket_size: ticket, monthly_leak: monthlyLost },
    });
  }
}, [missed, ticket]);
```

**6. `clockout_assessment_started`** — In `assessment.tsx`:

```tsx
<button
  className="cta cta--primary cta--lg"
  onClick={() => {
    setStep("quiz");
    plausible("clockout_assessment_started");
  }}
>
  Start the Scorecard
</button>
```

**7. `clockout_assessment_completed`** — In `assessment.tsx` where `setStep("results")` is called:

```tsx
// In handleAnswer, the branch where quiz completes:
setTimeout(() => {
  setStep("results");
  plausible("clockout_assessment_completed", {
    props: {
      total_leak: totalLeak,
      severity: getSeverity(totalLeak).label,
      answers: JSON.stringify(answers),
    },
  });
}, 1800);
```

**8. `clockout_agent_card_opened`** — In `agents.tsx`:

```tsx
<button
  key={a.num}
  type="button"
  className="agent-card"
  onClick={() => {
    setActive(a);
    plausible("clockout_agent_card_opened", {
      props: { agent_name: a.name, agent_num: a.num }
    });
  }}
>
```

**9. `clockout_faq_toggled`** — Use a ref-based approach:

```tsx
// In FAQ component (sections.tsx), wrap details with onToggle:
<details
  key={f.q}
  className="faq__item"
  onToggle={(e) => {
    if ((e.target as HTMLDetailsElement).open) {
      plausible("clockout_faq_toggled", { props: { question: f.q, action: "open" } });
    }
  }}
>
```

**10. Page views** — Plausible handles these automatically. No custom code needed.

---

## 3. Implementation Approach

### Decision: Direct script tag (no GTM)

**Why not Google Tag Manager?** You don't need it. You have 10 events, one tool, a simple site. GTM adds complexity, latency, and a debugging surface. Direct integration is cleaner for a solo founder.

### Install on TanStack Start SSR + Vercel

**Step 1: Install the Plausible npm package**

```bash
npm install plausible-tracker
```

**Step 2: Create an analytics module**

```tsx
// src/lib/analytics.ts
import Plausible from "plausible-tracker";

const ANALYTICS_DOMAIN = "clockout.io"; // update after launch

export const plausible = Plausible({
  domain: ANALYTICS_DOMAIN,
  hashMode: false,
  trackLocalhost: import.meta.env.DEV,
  apiHost: "https://plausible.io", // or your self-hosted URL
});
```

**Step 3: Initialize in the root layout**

TanStack Start SSR means you need to inject the script in the `<head>` and initialize tracking after hydration. Add to `__root.tsx`:

```tsx
// In __root.tsx, top-level imports:
import { useEffect } from "react";
import { plausible } from "@/lib/analytics";

// Inside RootComponent function, before the return:
const [initialized, setInitialized] = useState(false);

useEffect(() => {
  if (!initialized) {
    plausible.enableAutoPageviews();
    setInitialized(true);
  }
}, [initialized]);
```

For the Plausible script tag, add it to the `head` links or scripts:

```tsx
// In __root.tsx, the head definition, add to scripts array:
scripts: [
  {
    src: "https://plausible.io/js/script.js",
    "data-domain": ANALYTICS_DOMAIN,
    defer: true,
  },
  // ... existing scripts
];
```

**Alternatively** (simpler): Just use the `<Script>` component in `RootShell`:

```tsx
function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script defer data-domain="clockout.io" src="https://plausible.io/js/script.js" />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
```

Then the `plausible()` function from `plausible-tracker` works automatically because it hooks into the global `window.plausible`.

**Note on SSR**: The `plausible-tracker` npm package is client-only. Guard calls with `if (typeof window !== "undefined")` or import dynamically. The script tag approach automatically handles this.

### API Proxy (Optional)

If you want to block ad blockers, you can proxy Plausible through your own domain using Vercel rewrites:

```json
// vercel.json (existing — add rewrite)
{
  "rewrites": [
    {
      "source": "/js/script.js",
      "destination": "https://plausible.io/js/script.js"
    },
    {
      "source": "/api/event",
      "destination": "https://plausible.io/api/event"
    }
  ]
}
```

Then change `apiHost` to your domain. This is **optional** and can be added later.

### If you prefer no npm dependency (lightest approach):

Just use the script tag + window.plausible directly:

```tsx
// In any component:
const track = (event: string, data?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && (window as any).plausible) {
    (window as any).plausible(event, { props: data });
  }
};

// Usage:
track("clockout_booking_opened", { source: "hero" });
```

This avoids the npm dependency entirely. The script tag from Plausible exposes `window.plausible` globally.

---

## 4. UTM Strategy

### Standard Parameters

Use these five UTM parameters consistently across all campaigns:

| Parameter      | Purpose                           | Example                                                  |
| -------------- | --------------------------------- | -------------------------------------------------------- |
| `utm_source`   | Platform (where the link appears) | `google`, `linkedin`, `facebook`, `nextdoor`, `direct`   |
| `utm_medium`   | Channel type                      | `cpc`, `social`, `email`, `sms`, `local`                 |
| `utm_campaign` | Campaign name — snake_case        | `cold_email_v1`, `nextdoor_spring`, `bni_referral`       |
| `utm_content`  | Specific ad or link variant       | `hero_cta`, `assessment_cta`, `leadbar_checklist`        |
| `utm_term`     | Keyword (for paid search)         | `missed call automation`, `rockford business automation` |

### Naming Convention

```
{source}_{campaign}_{content}_{date}
```

| Field          | Rules                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------- |
| `utm_source`   | Lowercase, one word: `google`, `linkedin`, `nextdoor`, `bni`, `email`                        |
| `utm_medium`   | One of: `cpc`, `social`, `email`, `organic`, `referral`, `sms`, `direct`, `local`            |
| `utm_campaign` | Snake case, descriptive: `cold_email_plumbers_v1`, `nextdoor_spring_2026`                    |
| `utm_content`  | Matches event source property: `hero_audit`, `pricing_cta`, `assessment_link`, `faq_section` |

### Template URL Builder

```
https://clockout.io/?utm_source=SOURCE&utm_medium=MEDIUM&utm_campaign=CAMPAIGN&utm_content=CONTENT
```

### Where to Tag Links

| Channel           | Source     | Medium     | Example Campaign           |
| ----------------- | ---------- | ---------- | -------------------------- |
| Google Ads        | `google`   | `cpc`      | `rockford_hvac_2026`       |
| LinkedIn post     | `linkedin` | `social`   | `owner_operator_awareness` |
| Nextdoor          | `nextdoor` | `social`   | `local_outreach_spring`    |
| BNI referral link | `bni`      | `referral` | `bni_rockford_q2`          |
| Cold email        | `email`    | `email`    | `cold_email_plumbers_v1`   |
| Email signature   | `email`    | `email`    | `email_signature`          |
| Direct / typed    | (omit)     | (omit)     | (omit)                     |
| QR code on flyer  | `qr`       | `offline`  | `flyer_downtown_rockford`  |

---

## 5. Conversion Tracking

### Plausible Goal Setup

In Plausible dashboard → **Goals** → **Add Goal**:

| Goal Type    | Target                        | Notes                                 |
| ------------ | ----------------------------- | ------------------------------------- |
| Custom Event | `clockout_booking_opened`     | **Primary** — counts booking interest |
| Custom Event | `clockout_booking_completed`  | **Primary** — counts booked audits    |
| Custom Event | `clockout_leadbar_subscribed` | **Secondary** — email capture         |
| Custom Event | `clockout_assessment_saved`   | **Secondary** — qualified lead        |
| Page Visit   | `/assessment`                 | **Engagement** — scorecard started    |
| 404 Page     | (automatic)                   | Monitor broken links                  |

### Conversion Funnels

Plausible doesn't do multi-step funnels natively (that's a PostHog strength). For pre-launch, track these manually:

**Booking Funnel** (in a spreadsheet or simple dashboard):

1. Page view → any page
2. `clockout_booking_opened`
3. `clockout_booking_completed`

**Email Funnel**:

1. LeadBar impression (track via page views)
2. `clockout_leadbar_subscribed`

**Assessment Funnel**:

1. Page view `/assessment`
2. `clockout_assessment_started`
3. `clockout_assessment_completed`
4. `clockout_assessment_saved`

### What Each Conversion Means

| Event                         | Dollar Value (proxy)    | When It Matters                |
| ----------------------------- | ----------------------- | ------------------------------ |
| `clockout_booking_completed`  | ~$250–$800 expected LTV | Primary OKR — bookings booked  |
| `clockout_leadbar_subscribed` | ~$0 (top-of-funnel)     | Lead magnet efficacy           |
| `clockout_assessment_saved`   | ~$50–$250 (warm lead)   | High-intent lead qualification |

---

## 6. Privacy Considerations

### Plausible is GDPR/CCPA Compliant by Design

- **No cookies** — Plausible uses no persistent identifiers, no first-party cookies, no localStorage.
- **No personal data** — IPs are anonymized (last octet removed) and not stored.
- **Fingerprinting** — Plausible does not fingerprint visitors.
- **Data retention** — Plausible stores raw data for 30 days (default), aggregates indefinitely.

### What This Means for Clockout

| Requirement                     | Status                                            |
| ------------------------------- | ------------------------------------------------- |
| Cookie consent banner           | **Not required** (no cookies set)                 |
| Privacy policy update           | **Minimal** — just mention Plausible + ConvertKit |
| Data Processing Agreement (DPA) | Plausible offers one (GDPR Art 28)                |
| Opt-out mechanism               | Implicit (no tracking if JS blocked)              |
| CCPA "Do Not Sell"              | N/A — no personal data sold                       |

### ConvertKit (Kit) Privacy Note

The ConvertKit integration (`lib/convertkit.ts`) collects email addresses. This _does_ process personal data.

**Recommendations:**

1. **Add a privacy policy** page (`/privacy`) before going live with paid traffic. Most basic template: mention what data ConvertKit collects, that you don't sell it, and how to request deletion.
2. **Add a checkbox** on the LeadBar and assessment save form: "I agree to the privacy policy" — optional pre-launch, but best practice.
3. **ConvertKit handles GDPR compliance** on their end (they store data in US with Standard Contractual Clauses).

### Cookieless Tracking — The Big Advantage

Because Plausible is cookieless, you can:

- Run traffic from EU visitors without a cookie consent banner.
- Avoid the ~$5k/yr cost of a consent management platform (Cookiebot, Osano, etc.).
- Keep your site fast (no CMP scripts blocking rendering).

---

## 7. Measurement Framework

### Dashboard Layout (Plausible Default Dashboard)

The Plausible default dashboard answers 80% of pre-launch questions. Set up these **Goals** and **Custom Events** as the key metrics:

### Key Business Questions

| Question                              | Metric                         | Event / Page                                           |
| ------------------------------------- | ------------------------------ | ------------------------------------------------------ |
| Where are my visitors coming from?    | Top Sources                    | Plausible default                                      |
| Which pages get the most engagement?  | Top Pages + Time on Page       | Plausible default                                      |
| How many people book audits?          | Unique conversions             | `clockout_booking_completed` goal                      |
| Which CTAs drive the most bookings?   | Conversion rate by source      | `clockout_booking_opened` with `source` prop           |
| How many people take the assessment?  | Page views + event count       | `/assessment` pageviews, `clockout_assessment_started` |
| What's the calculator telling people? | Avg missed calls / ticket size | `clockout_calculator_interacted` props                 |
| Are FA answers being read?            | FAQ toggle rate                | `clockout_faq_toggled`                                 |
| Which agents interest people most?    | Card tap rate by agent         | `clockout_agent_card_opened` props                     |

### Weekly Review Cadence (Solo Founder)

Every Monday, answer these three questions in 5 minutes:

1. **Conversion**: Did anyone book an audit? (Count of `clockout_booking_completed`)
2. **Leads**: How many emails captured? (Count of `clockout_leadbar_subscribed`)
3. **Traffic**: Is anything driving visitors? (Top 3 sources from dashboard)

That's it. You don't need a dashboard tool. Plausible's homepage shows all three on one screen.

### When to Add More

| Trigger                                | Add                                                             |
| -------------------------------------- | --------------------------------------------------------------- |
| You start running paid ads             | UTM tagging on every ad → monitor by campaign in Plausible      |
| You launch a second traffic channel    | Source breakdown in Plausible                                   |
| You get >100 visitors/day consistently | Consider session recordings (PostHog or Microsoft Clarity free) |
| You hire someone for marketing         | Share Plausible dashboard (read-only link)                      |
| You want funnel analysis               | Add PostHog free tier                                           |

---

## 8. Minimum Viable Analytics (Solo Founder)

### The Absolute Minimum

If you have **one hour** before launch, do this:

```
1. Add Plausible script tag to __root.tsx                             (5 min)
2. Track clockout_booking_opened on BookingButton                     (10 min)
3. Track clockout_booking_completed via Cal.com event listener        (10 min)
4. Track clockout_leadbar_subscribed in LeadBar success branch        (5 min)
5. Deploy                                                             (5 min)
        ↓
  Total: 35 minutes
```

That's it. You'll know:

- How many people visit the site
- How many click "Book audit"
- How many complete a booking
- How many subscribe via LeadBar

### Phase 2 (Next hour)

```
6. Add source prop to all BookingButton call sites                   (10 min)
7. Track clockout_assessment_started and clockout_assessment_completed (10 min)
8. Track clockout_calculator_interacted                              (10 min)
9. Track clockout_agent_card_opened                                  (5 min)
10. Track clockout_faq_toggled                                       (5 min)
11. Deploy                                                           (5 min)
```

### What NOT to Do Pre-Launch

| Don't                               | Why                                                    |
| ----------------------------------- | ------------------------------------------------------ |
| Install Google Tag Manager          | Overkill for 10 events on a simple site                |
| Set up GA4                          | Data model is complex, privacy requires consent banner |
| Add cookie consent banner           | You don't need one with Plausible. Save $0–5k/yr.      |
| Build a dashboard in Looker/Tableau | Plausible dashboard is sufficient for 1 person         |
| Track every click                   | YAGNI. Track only what drives a decision.              |
| Segment by user ID / device         | Plausible doesn't do this. You don't need it yet.      |

### Pre-Launch Checklist

- [ ] **Plausible script tag** added to `__root.tsx`
- [ ] **`clockout_booking_opened`** fires from every `BookingButton`
- [ ] **`clockout_booking_completed`** fires from Cal.com event
- [ ] **`clockout_leadbar_subscribed`** fires from LeadBar success
- [ ] **Source prop** on every `BookingButton` call site (for CTA performance analysis)
- [ ] **Plausible goals** configured in dashboard
- [ ] **UTM params** documented for future campaigns
- [ ] **Privacy policy** mentions Plausible + ConvertKit (can be brief)
- [ ] **Environment gating**: only fire events in production (check `import.meta.env.PROD`)
- [ ] **Verify** in Plausible real-time dashboard after deploy

---

## Appendix: Files to Modify

| File                              | Changes                                                                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/routes/__root.tsx`           | Add Plausible `<script>` tag in `RootShell`; add `analytics` init effect in `RootComponent`                                                                   |
| `src/components/BookingModal.tsx` | Add `source` prop to `BookingButton`; call `plausible("clockout_booking_opened")` on click; listen for Cal.com `bookingSuccessful` event in `BookingProvider` |
| `src/components/LeadBar.tsx`      | Add `plausible("clockout_leadbar_subscribed")` in success branch                                                                                              |
| `src/components/sections.tsx`     | Add `plausible` calls in `CostCalculator` (slider interaction) and `FAQ` (toggle)                                                                             |
| `src/routes/assessment.tsx`       | Add `plausible` calls on quiz start, quiz complete, and results save                                                                                          |
| `src/routes/agents.tsx`           | Add `plausible` call on agent card click                                                                                                                      |
| `src/lib/analytics.ts`            | **New file** — Plausible initialization and exports                                                                                                           |

---

## Appendix: Conversion Waterfall Model

```
                      ┌──────────────────────┐
                      │  Website Visitor      │
                      │  (page view)          │
                      └───────┬──────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
     ┌──────────────┐ ┌──────────┐ ┌──────────────┐
     │ LeadBar      │ │ Cost Calc│ │ Assessment   │
     │ Subscribed   │ │ Interact │ │ Started      │
     └──────┬───────┘ └──────────┘ └──────┬───────┘
            │                             │
            ▼                             ▼
     ┌──────────────┐            ┌──────────────┐
     │ (Email Lead) │            │ Assessment   │
     │              │            │ Completed    │
     └──────────────┘            └──────┬───────┘
                                        │
                                        ▼
                               ┌──────────────┐
                               │ Assessment   │
                               │ Saved        │
                               │ (Name+Email) │
                               └──────┬───────┘
                                      │
              All paths converge to ──┘
                                      │
                                      ▼
                            ┌──────────────────┐
                            │ Booking Modal    │
                            │ Opened           │
                            └──────┬───────────┘
                                   │
                                   ▼
                            ┌──────────────────┐
                            │ Booking Modal    │
                            │ Completed        │
                            │ ★ PRIMARY CONV   │
                            └──────────────────┘
```

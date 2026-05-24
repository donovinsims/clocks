## 2024-05-24 - Preloading in Tanstack Router

**Learning:** TanStack Router does not preload routes on link hover/intent by default.
**Action:** Always verify if `defaultPreload: 'intent'` is set in the router configuration (`createRouter` options) to improve perceived performance during page transitions.

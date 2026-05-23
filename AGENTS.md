# AGENTS.md

## Project Context
This project is a React application built with TanStack Start (SSR) and Vite, utilizing Radix UI and Tailwind CSS v4 for styling. It is configured for Vercel deployment using Nitro.

## Tech Stack
- **Framework:** React 19, @tanstack/react-start, @tanstack/react-router
- **Build Tool:** Vite with Nitro for SSR/Vercel
- **Styling:** Tailwind CSS v4, Radix UI components (shadcn-style)
- **Testing:** Vitest for unit/integration tests, Playwright for E2E
- **Form/Validation:** react-hook-form, zod
- **Formatting/Linting:** Prettier, ESLint

## Coding Preferences
- **Design System:** Preserve the existing Tailwind v4 + Radix UI visual aesthetic, color palette, typography, spacing, components, and states 100%. Focus solely on internal consistency, accessibility, and polish.
- **Testing:** Maintain >80% test coverage on critical paths.
- **Formatting:** Do not run global formatting or linting fixes (e.g., `npm run format` or `npm run lint --fix`) as they modify thousands of lines and cause massive diffs. Format and lint specific files only using commands like `npx eslint <file>`.
- **Node Scripts:** Ad-hoc Node evaluation scripts must use the '.cjs' extension or ESM syntax since `"type": "module"` is set in `package.json`.
- **UI Modifications:** Frontend UI modifications must be visually verified using a temporary Playwright script to capture screenshots before finalization.
- **State/Modals:** Global scripts, scroll-lock logic for modals, and application providers are managed via TanStack Router in `src/routes/__root.tsx`.

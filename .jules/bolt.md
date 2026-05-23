## 2024-05-23 - Context Provider Value Memoization
**Learning:** In React applications built with extensive layouts and global providers (like `BookingProvider` wrapping the main `<Outlet />` tree or global components), unmemoized context values can cause widespread unnecessary re-renders of any component consuming the context when the provider's state updates.
**Action:** Always wrap context provider values in `useMemo` when providing an object, especially if the provider wraps a large part of the application or is consumed by frequently rendered components.

## 2024-05-23 - TanStack Start CSRF Warning
**Learning:** TanStack Start displays a warning about missing CSRF middleware when using `createServerFn`. If `createCsrfMiddleware` cannot be easily imported/configured due to package structure or other constraints, you can disable the warning in `vite.config.ts` via `tanstackStart: { serverFns: { disableCsrfMiddlewareWarning: true } }` to prevent CI/build failures from warnings.
**Action:** When a framework logs a development warning that blocks deployment or PR merges, investigate whether the warning can be legitimately suppressed in the framework's configuration file.

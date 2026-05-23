## 2024-05-23 - Context Provider Value Memoization
**Learning:** In React applications built with extensive layouts and global providers (like `BookingProvider` wrapping the main `<Outlet />` tree or global components), unmemoized context values can cause widespread unnecessary re-renders of any component consuming the context when the provider's state updates.
**Action:** Always wrap context provider values in `useMemo` when providing an object, especially if the provider wraps a large part of the application or is consumed by frequently rendered components.

## 2024-05-23 - TanStack Start CSRF Middleware
**Learning:** TanStack Start server functions (`createServerFn`) require CSRF middleware to be properly registered in `src/start.ts` when using the default setup, otherwise the internal RPC routing will fail and redirect to GET (307) or throw errors.
**Action:** When debugging TanStack Start `createServerFn` routing issues, check if `createCsrfMiddleware` is correctly applied in `createStart`'s `requestMiddleware`. Also note that direct cURL testing of server functions will naturally fail if CSRF protection is active; test via the actual React frontend instead.

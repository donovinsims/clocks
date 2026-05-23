## 2024-05-23 - Context Provider Value Memoization
**Learning:** In React applications built with extensive layouts and global providers (like `BookingProvider` wrapping the main `<Outlet />` tree or global components), unmemoized context values can cause widespread unnecessary re-renders of any component consuming the context when the provider's state updates.
**Action:** Always wrap context provider values in `useMemo` when providing an object, especially if the provider wraps a large part of the application or is consumed by frequently rendered components.

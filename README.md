## Summary

This project is a Next.js demo that uses React, TypeScript, SWR for data fetching, and TanStack React Table for displaying paginated Pokemon(s) data in a client component. The `CustomTable` component use inline skeleton loaders and error rows to maintain a driendly layout and improve UX during network requests. A strict Content Security Policy and HTTP headers are applied via Next.js middleware for production readiness and security hardening

---

## README

# Pokémon Explorer

A Next.js + React + TypeScript demo showcasing SWR-based data fetching and TanStack React Table for paginated, filterable tables.

## Features

- **Pokemon List** with server side pagination as well filtering.
- **Evolution Triggers** table using the same pagination pattern.
- **Inline Loading & Error States** in tables for a friendly UX.
- **Modal Details** using SWR to fetch individual Pokemon(s) stats.
- **Security Headers** via Next.js middleware for CSP, HSTS, frame and MIME protections.

## Getting Started

1. **Clone the repo**

   ```bash
   git clonehttps://github.com/b-laztornex/gotta-catch-em-all
   cd gotta-catch-em-all
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run in development**

   ```bash
   npm run dev
   ```

   This starts the Next.js server at `http://localhost:3000` with TypeScript support out of the box.

4. **Build for production**

   ```bash
   npm run build
   npm start
   ```

5. **Environment**  
   All API calls go to the public [PokeAPI](https://pokeapi.co/)—no local `.env` setup required.

## Project Structure

```
/src
 ├─ /app          # Next.js App Router pages
 ├─ /components   # React client components (PageClient, CustomTable, CustomModal)
 ├─ /hooks        # Custom SWR hooks (useList, useEvolution, useDebounce)
 ├─ /lib          # Shared utilities and middleware
 └─ middleware.ts # Next.js security headers
```

## Approach Explanation

### Centralized Fetching with SWR

All data fetching uses a `fetcher` and aligns with SWR’s recommended pattern for consistent error handling and caching across your app.

### Inline Loading & Error States

Instead of unmounting tables during fetches, the `CustomTable` renders:

- **Error row** spanning all columns for single-row error feedback.
- **Skeleton rows** matching the `pageSize` to preserve layout during initial load.

### TanStack React Table for Pagination

the use `@tanstack/react-table` in manual pagination mode, computing `maxPage` from `totalCount` and `pageSize`, and disabling “Next”/“Previous” buttons appropriately.

### Security & Performance

A middleware injects strict CSP, HSTS, X-Frame-Options, and X-Content-Type-Options headers for production safety. React table virtualization could be added for large datasets as next steps.

---

## Future Improvements

With more time, it could be interesting to implement the following:

1. **Add Unit & E2E Tests** with Jest and Cypress/Playwright to validate fetching logic and table interactions.
2. **Implement Virtualization** via `@tanstack/react-virtual` for performance with large datasets.
3. **Enable Server‑Side Sorting & Filtering** by extending SWR hooks to accept sorting/filter params and passing them to the API.
4. **Extract Constants & Types** into a shared `/lib/types.ts` and `/lib/constants.ts` for better maintainability.
5. **Add Theming & Accessibility** improvements—ARIA attributes on modals and tables, keyboard navigation, and high‑contrast themes, enabling also darkmode.
6. **Error Logging & Monitoring** using Sentry or LogRocket to track runtime errors in production.
7. **Test and add proper layout for Responsive layout** Responsive design adapts content fluidly across device widths, improving readability and interaction on everything from small phones to large desktops
8. **.env file** for environment specific configuration

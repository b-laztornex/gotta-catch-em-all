# Pokemon table list

A Next.js + React + TypeScript pokemon list demo server side data fetching with getServerSideProps and a generic paginated table component.

## Summary

This project is a simplified Next.js application that:

- Fetches the Pokémon list and individual Pokémon details on the server using getServerSideProps.
- Uses a reusable Table component for paginated lists (both the main list and an optional evolution triggers table).
- Keeps all fetch logic in lib/api.ts and types in lib/types.ts for clear separation of concerns.
- Removes client-side SWR and complex modal logic in favor of file-based routing (`pages/` directory).

## Features

- **Server‑Side Pagination & Filtering**: Main Pokémon list paginates server-side via query parameters (e.g. `?page=1`).
- **Detail Page**: Dynamic route `pages/pokemon/[name].tsx` fetches and displays Pokémon details.
- **Evolution Triggers Table**: Optional secondary table on the detail page that fetches data from `/evolution-trigger` with its own pagination.
- **Generic Table Component**: `components/Table.tsx` takes columns, data, and pagination callbacks, making it reusable across pages.
- **Clear Project Structure**: Fetch logic in `lib/api.ts`, types in `lib/types.ts`, pages under `pages/`, and shared components under `components/`.

## Getting Started

### Install dependencies

1. Clone the repo

git clonehttps://github.com/b-laztornex/gotta-catch-em-all
cd gotta-catch-em-all

2. Install dependencies

npm install
Run in development

npm run dev
This starts the Next.js server at http://localhost:3000 with TypeScript support out of the box.

3. Build for production

npm run build
npm start
Environment
All API calls go to the public PokeAPI—no local .env setup required.

Project Structure

/lib
├ constants.ts # API and pagination constants
├ types.ts # Shared TypeScript types
└ api.ts # Fetch helper functions
/components
└ Table.tsx # Reusable generic paginated table
/pages
├ index.tsx # Main list page with server-side pagination
└ pokemon
└ [name].tsx # Detail page with evolution triggers table

## Future Improvements

Unit & E2E Tests: Add Jest and Cypress or Playwright tests.

Virtualization: Use @tanstack/react-virtual for large lists.

Sorting & Advanced Filtering: Enhance the API helpers to support more query parameters.

Theming & Accessibility: Improve ARIA attributes, keyboard navigation, and support dark mode.

Error Monitoring: Integrate Sentry or similar for production error tracking.

# Pokemon table list

A Next.js + React + TypeScript Pokémon list demo with server side data fetching, strict TypeScript interfaces, and a reusable paginated table component.

## Summary

This project is a simplified Next.js application that:

- Fetches the Pokémon list and individual Pokémon details on the server using getServerSideProps.
- Uses strict TypeScript interfaces for all props avoiding any
- Organizes all UI components (modals, tables, buttons, etc.) under components/ui/ for clarity and reusability.
- Uses a reusable Table component for paginated lists (main list and evolution triggers table).
- Modal displays pokemon details and a scrollable, fixed-height evolution triggers table with accessibility improvements.
- Keeps all fetch logic in lib/api.ts and types in lib/types.ts for clear separation of concerns.
- Removes client-side SWR and complex modal logic in favor of file-based routing (`pages/` directory).

## Features

- **Server‑Side Pagination & Filtering**: Main Pokémon list paginates server-side via query parameters (e.g. `?page=1`).
- **Detail Page**: Dynamic route `pages/pokemon/[name].tsx` fetches and displays Pokémon details.
- **Evolution Triggers Table**: Modal includes a scrollable, fixed-height table of evolution triggers fetched from /evolution-trigger.
- **Generic Table Component**: `components/CustomTable.tsx` takes columns, data, and pagination callbacks, making it reusable across pages.
- **Clear Project Structure**: Fetch logic in `lib/api.ts`, types in `lib/types.ts`, pages under `pages/`, and shared components under `components/` and `components/ui/`.
- **Accessibility**: Improved ARIA attributes, keyboard navigation, and modal accessibility.
- **Unit Tests**: Jest and React Testing Library tests for modal and table functionality.

## Getting Started

### Install dependencies

1. Clone the repo

```sh
git clone https://github.com/b-laztornex/gotta-catch-em-all
cd gotta-catch-em-all
```

2. Install dependencies

```sh
npm install
```

Run in development

```sh
npm run dev
```

This starts the Next.js server at http://localhost:3000 with TypeScript support out of the box.

3. Build for production

```sh
npm run build
npm start
```

### Environment

All API calls go to the public PokeAPI—no local .env setup required.

## Project Structure

/lib
├ constants.ts # API and pagination constants
├ types.ts # Shared TypeScript types
└ api.ts # Fetch helper functions
/components
├ CustomTable.tsx # Reusable generic paginated table
└ ui/
├ ModalHeader.tsx
├ ModalBody.tsx
├ ModalFooter.tsx
├ TablePagination.tsx
└ dialog.tsx
/pages
├ index.tsx # Main list page with server-side pagination
└ pokemon
└ [name].tsx # Detail page with evolution triggers table

## Future Improvements

-> Virtualization: Use @tanstack/react-virtual for large lists.
-> Sorting & Advanced Filtering: Enhance the API helpers to support more query parameters.
-> Accessibility && Theming: Further improve ARIA attributes, keyboard navigation, and support dark mode.
-> Error Monitoring: Integrate Sentry or similar for production error tracking.

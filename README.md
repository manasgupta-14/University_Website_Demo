# Aarohan Open University — Frontend Assessment Demo

A responsive, VMOU-inspired university information website built for a frontend practical assignment. This is a fictional demo and is not affiliated with VMOU or any real university.

## Stack
- React 19
- JavaScript (ES modules)
- Vite
- Tailwind CSS v4 with custom theme styles
- Local mock data in `src/data/`

## Setup
Requires Node.js compatible with the installed Vite version.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Quality checks
```bash
npm run lint
npm run build
```

## Implemented features
- Responsive navigation with active section indication and mobile menu.
- Hero area with clickable latest notices; the Latest Notices panel always shows the newest source-data notices and is independent of global search/category filters.
- Notices and online services rendered from local arrays.
- Shared global search across notices, services and student support links.
- Shared category filtering across notices and services, with clear-filters action and no-results states.
- Search-term highlighting in notice and service cards.
- Notice details modal with dialog semantics, Escape-to-close, outside-click close, formatted date and clearly labelled sample content.
- Simulated asynchronous data loading, error state and retry. Add `?error` to the page URL to test the simulated error once; Retry succeeds.
- Toast feedback for service, support and privacy-policy demo actions.
- Keyboard focus styles, labelled primary/useful navigation, grouped category-filter controls, reduced-motion support and responsive layout.

## State-management notes
`App.jsx` owns the shared search query, category, loaded data, loading/error state, selected notice and toast message. Child components receive state and callbacks through props. `useMemo` derives filtered arrays from the source data and current filters, avoiding separate conflicting filter states.

## Known limitations
- Frontend only: no backend, database, real authentication, payments, external service integrations or real student records.
- All notice and service data is fictional/local mock data. Latest Notices remains a fixed preview of the source data while the main notice list responds to search and category filters.
- The loading/error behavior is simulated by `src/data/api.js`.
- External fonts require internet access; system sans-serif fallbacks are provided.

## AI assistance disclosure
AI assistance was used to help review and update React components, search/filter state flow, accessibility behavior, styling, documentation and debugging. The candidate should review the implementation and be prepared to explain and modify it during the interview.

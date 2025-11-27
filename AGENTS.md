# Repository Guidelines

## Project Structure & Module Organization
- Next.js App Router lives in `src/app` with route segments for the landing page (`page.tsx`), post detail (`posts/[slug]`), `about`, and `friends`; shared layout is in `layout.tsx` with global styles in `globals.css`.
- Reusable UI primitives sit in `src/components/ui` (`button.tsx`, `input.tsx`); layout shell pieces live in `src/components/layout-wrapper.tsx`, `sidebar.tsx`, `mobile-nav.tsx`, and `footer.tsx`.
- Utility helpers are in `src/lib/utils.ts` (use `cn` for Tailwind class merging); static assets and favicons go under `public/`.
- Fonts are configured via `next/font` in `layout.tsx`; keep additional assets or metadata colocated with their routes to leverage automatic code-splitting.

## Build, Test, and Development Commands
- `npm run dev` — start the local dev server with hot reload.
- `npm run build` — produce the optimized production build in `.next/`; catches type errors and missing imports.
- `npm start` — serve the prebuilt app locally (requires `npm run build` first).
- `npm run lint` — run ESLint with Next.js Core Web Vitals + TypeScript rules; fix findings before committing.

## Coding Style & Naming Conventions
- TypeScript-first; keep 2-space indentation and prefer named exports. React components use PascalCase; route folders and slugs use kebab-case; utilities are camelCase.
- Use Tailwind v4 utility classes for styling and compose classNames with the `cn` helper instead of manual string concatenation.
- Keep UI tokens aligned with the existing serif/sans font mix and neutral palette defined in `globals.css`; colocate styles with components rather than global overrides.

## Testing Guidelines
- Automated tests are not yet present; prioritize linting and manual verification of key routes (`/`, `/posts/[slug]`, `/about`, `/friends`) across mobile and desktop.
- Name future test files `<name>.test.tsx` and place them in `src/__tests__/` or next to the component/page under test. Aim for meaningful coverage of rendering, accessibility, and route-level behaviors.

## Commit & Pull Request Guidelines
- History currently only includes the initial scaffold; write concise, imperative commit subjects (e.g., "Add post detail layout") and keep changes focused.
- Before opening a PR, ensure `npm run lint` and `npm run build` pass. Include a short summary, rationale, and screenshots/GIFs for UI changes.
- Link related issues/tasks, list manual verification steps, and call out breaking changes or new environment variables if introduced.

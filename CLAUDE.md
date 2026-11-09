# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio of Juan Esteban Pelaez, live at https://jestebanpelaez.dev. Next.js and TypeScript, based on the Magic Portfolio template by Once UI, deployed on Vercel.

A redesign is in progress. The full spec is in `docs/redesign/BRIEF.md`. Read it before any change to layout, styling or project pages.

## How to work here

- Start every non-trivial task in plan mode and wait for approval before editing files.
- Work one phase of the brief at a time. Do not start the next phase unless asked.
- Use the dependencies already in the project. Ask before adding a new one.
- Run the build and lint before saying a task is done.
- Keep commits small, one per logical change.

## Commands

```bash
npm run dev            # dev server on http://localhost:3000
npm run build          # production build, also catches frontmatter and type errors at build time
npx tsc --noEmit       # typecheck only (currently passes)
npx biome check src    # lint + format check (Biome, config in biome.json)
npm run biome-write    # format the whole repo with Biome
```

- `npm run lint` is broken: it runs `next lint`, which Next 16 removed. Use `npx biome check` and `npx tsc --noEmit` as the lint step. `npx biome check src` currently reports about 120 errors that existed before the redesign. Don't introduce new ones in files you touch, and don't mass-fix unrelated files without asking.
- There is no test suite.
- lint-staged runs `biome check --write` and `biome format --write` on staged JS/TS/JSON files.
- Env vars (see `.env.example`): `NEXT_PUBLIC_SITE_URL` sets the canonical base URL for metadata, robots and sitemap. `PAGE_ACCESS_PASSWORD` is for password-protected routes.

## Architecture

- **App Router** in `src/app`: `page.tsx` (home), `about/`, `work/` (list) and `work/[slug]/` (project page), plus `blog/` and `gallery/` left over from the template. `api/` holds the OG image generator (`api/og/generate`), OG fetch/proxy, RSS and the password check routes.
- **Site config and copy** live in `src/resources/`, not in the pages. `content.tsx` exports `person`, `social`, `home`, `about`, `work`, `blog`, `gallery` (the text and data each page renders). `once-ui.config.ts` exports `routes` (which routes are enabled), `protectedRoutes`, `baseURL`, fonts, theme `style`, background `effects` and `schema`. Import both through the `@/resources` barrel.
- **Route gating**: `src/components/RouteGuard.tsx` (client component, wraps every page in `layout.tsx`) shows the 404 for routes set to `false` in `routes`, and checks the password for routes in `protectedRoutes`. Disabling a page is a config change, not a file deletion.
- **Project loading**: `src/utils/utils.ts` `getPosts([...pathSegments])` reads every `.mdx` in a directory with `gray-matter` and returns `{ slug, metadata, content }`. The slug is the file name. It is called with `["src","app","work","projects"]` from `work/[slug]/page.tsx` (`generateStaticParams`, `generateMetadata`, the page) and from `components/work/Projects.tsx` (list, sorted by `publishedAt`). The `Metadata` type there is the old template schema. Phase 3 of the brief replaces it with the typed and validated schema in the brief.
- **Rendering**: project and blog bodies currently go through `CustomMDX` (`src/components/mdx.tsx`, `next-mdx-remote`). The redesigned templates render from frontmatter only.
- **Metadata/SEO**: pages use Once UI's `Meta.generate` and `<Schema>` with `baseURL` from `once-ui.config.ts`. `sitemap.ts` and `robots.ts` also use `baseURL`.
- **Redesign inputs** are in `docs/redesign/`: `BRIEF.md` (spec, frontmatter schema, phases), `content/` (final page copy), `projects/` (the 8 new project files that replace `src/app/work/projects/`), `design-reference/*.html` (mockups to read for layout, not code to copy).

## Once UI conventions

From `.agents` (the Once UI rules file in the repo root). Follow these when building UI:

- Build layouts from Once UI primitives (`Column`, `Row`, `Grid`, `Heading`, `Text`) and their props (`gap`, `padding`, `fillWidth`, `maxWidth`, `background`/`onBackground`, breakpoint objects `s`/`m`/`l`) instead of raw `<div>`s and hex colours. Fall back to inline styles sparingly, and to an SCSS module when you need selectors or states.
- `align` sets `text-align`. To center children, use `horizontal="center"`.
- Product-specific components go in one folder with a barrel `index.ts` (see `src/components/index.ts`).
- No Tailwind or other styling tools that aren't already in the project.
- The redesign's design tokens in the brief (colours, fonts, hairlines, accent) replace Once UI's default theme. Define them once, through the Once UI theme config or CSS variables, and use them through the primitives. Never hard-code them per component.

## Content rules

All copy on the site follows these rules. They apply to anything you write or edit, including alt text and metadata.

- Never use the em dash character (U+2014). Use a comma, a colon, a full stop or a hyphen.
- Never invent experience, technologies, metrics or results. Every number on the site must already be in the project files or the brief. If something is missing, leave a visible placeholder and ask.
- A personal or school project is never presented as paid work. Only Arabian Fragrance is client work.
- When writing new copy, avoid generic AI-sounding phrases: "passionate about", "driven to solve", "always learning", "genuinely". Plain, specific sentences. This does not apply to the final copy in docs/redesign/, which is used as written.
- The owner's title is "Software Engineer". Never "Full Stack Developer".
- Copy in `docs/redesign/content/` and `docs/redesign/projects/` is final. Use it as written. If a layout seems to need different copy, ask instead of rewriting.

## Project files

Each project is one `.mdx` file in `src/app/work/projects/`. Its frontmatter drives the page; the body is not used. The schema is in the brief. Adding a project means adding one file, with no code changes. Keep the existing file names: they are the URL slugs, and those links are already in CVs and applications. (Until phase 3 is done, the current files still use the old template frontmatter and body.)

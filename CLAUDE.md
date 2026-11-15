# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio of Juan Esteban Pelaez, live at https://jestebanpelaez.dev. Next.js and TypeScript, based on the Magic Portfolio template by Once UI, deployed on Vercel.

The site uses an editorial design: white page, serif headlines, one accent colour, two-column sections and project case studies. The spec it was built from is in `docs/redesign/BRIEF.md`. Read it before any change to layout, styling or project pages.

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

- **App Router** in `src/app`: `page.tsx` (home), `about/`, `work/` (list) and `work/[slug]/` (project page). `api/` holds the OG image generator (`api/og/generate`), OG fetch/proxy and the password check routes.
- **Site config and copy** live in `src/resources/`, not in the pages. `content.tsx` exports `person`, `social`, `home`, `about`, `work` (the text and data each page renders). `once-ui.config.ts` exports `routes` (which routes are enabled), `protectedRoutes`, `baseURL`, `fonts`, theme `style`, `dataStyle`, `schema` and `sameAs`. Import both through the `@/resources` barrel. Design tokens are CSS variables in `src/resources/custom.css`.
- **Route gating**: `src/components/RouteGuard.tsx` (client component, wraps every page in `layout.tsx`) shows the 404 for routes set to `false` in `routes`, and checks the password for routes in `protectedRoutes`. Disabling a page is a config change, not a file deletion.
- **Project loading**: `src/utils/projects.ts` reads every `.mdx` in `src/app/work/projects/` with `gray-matter`, validates the frontmatter against the schema (types in `src/types/project.types.ts`) and returns `Project[]` (`{ slug, metadata }`) sorted by `order`. The slug is the file name. Use `getProjects()`, `getProject(slug)`, `getNextCaseStudy(slug)` and `getAdjacentShortProjects(slug)`. Invalid frontmatter (unknown key, wrong type, bad enum or hex, duplicate `order`, em dash) throws one error that lists every problem, which fails `npm run build`. A new frontmatter field must be added to both the type and the validator.
- **Rendering**: `work/[slug]/page.tsx` picks the template by `format`: `CaseStudy` or `ShortProject`, both in `src/components/project/` along with `Diagram`, `ProjectMedia`, `ProjectHeader` and the next/previous links. They render from frontmatter only; there is no MDX rendering in the project. The per-project `panel` colour is passed down as the `--panel` CSS variable.
- **Missing media**: `showMedia(src)` in `src/utils/projects.ts` decides whether a media slot renders. In development a missing file shows a placeholder box with the alt text, so layouts can be checked. In production it renders nothing and the layout closes up: cards become text only, a short project drops to one column, a section shows its text full width. `ProjectMedia` checks it too, as a safety net.
- **Metadata/SEO**: pages use Once UI's `Meta.generate` and `<Schema>` with `baseURL` from `once-ui.config.ts`. `sitemap.ts` and `robots.ts` also use `baseURL`. Share images: the home page uses `public/images/og/home.png` (1200×630, set as `home.image` in `content.tsx`); a project uses its `hero.image` when it exists and is landscape (`imageSize()` reads the file header), otherwise the generated card from `/api/og/generate`.
- **Design reference** in `docs/redesign/`: `BRIEF.md` (spec, frontmatter schema), `content/` (the page copy as approved), `projects/` (the project files as first delivered), `design-reference/*.html` (mockups to read for layout, not code to copy). Keep it as reference. The live project files in `src/app/work/projects/` are the source of truth: their image paths and some alt texts have changed since.

## Once UI conventions

From `.agents` (the Once UI rules file in the repo root). Follow these when building UI:

- Build layouts from Once UI primitives (`Column`, `Row`, `Grid`, `Heading`, `Text`) and their props (`gap`, `padding`, `fillWidth`, `maxWidth`, `background`/`onBackground`, breakpoint objects `s`/`m`/`l`) instead of raw `<div>`s and hex colours. Fall back to inline styles sparingly, and to an SCSS module when you need selectors or states.
- `align` sets `text-align`. To center children, use `horizontal="center"`.
- Product-specific components go in one folder with a barrel `index.ts` (see `src/components/index.ts`).
- No Tailwind or other styling tools that aren't already in the project.
- The design tokens in the brief (colours, fonts, hairlines, accent) replace Once UI's default theme. Define them once, through the Once UI theme config or CSS variables, and use them through the primitives. Never hard-code them per component.

## Content rules

All copy on the site follows these rules. They apply to anything you write or edit, including alt text and metadata.

- Never use the em dash character (U+2014). Use a comma, a colon, a full stop or a hyphen.
- Never invent experience, technologies, metrics or results. Every number on the site must already be in the project files or the brief. If something is missing, leave a visible placeholder and ask.
- A personal or school project is never presented as paid work. Only Arabian Fragrance is client work.
- When writing new copy, avoid generic AI-sounding phrases: "passionate about", "driven to solve", "always learning", "genuinely". Plain, specific sentences. This does not apply to the final copy in docs/redesign/, which is used as written.
- The owner's title is "Software Engineer". Never "Full Stack Developer".
- Copy in `docs/redesign/content/` and `docs/redesign/projects/` is final. Use it as written. If a layout seems to need different copy, ask instead of rewriting.

## Project files

Each project is one `.mdx` file in `src/app/work/projects/`. Its frontmatter drives the page; the body is not used. The schema is in the brief and typed in `src/types/project.types.ts`. Keep the existing file names: they are the URL slugs, and those links are already in CVs and applications.

### Adding a project

1. Add `src/app/work/projects/<slug>.mdx`. The file name is the URL (`/work/<slug>`). No code changes are needed.
2. Required fields: `title`, `format` (`"case-study"` or `"short"`), `order` (unique; sets the order on the home page, /work and the next/previous links), `headline`, `kind`. Copy an existing project of the same format as a starting point.
3. `featured: true` puts it in the large cards on the home page; otherwise it gets a small card. Case studies need a `panel` hex colour for the backgrounds behind their images and diagrams.
4. Run `npm run build`. Frontmatter errors (unknown key, wrong type, duplicate `order`, em dash) fail the build with a list of every problem.

### Adding its images

- Put files in `public/images/projects/<project>/` and reference them from the frontmatter as `/images/projects/<project>/<file>`. Repoint paths to existing files rather than copying or renaming them.
- PNG, JPEG, GIF and short muted MP4 all work. Every image needs an `alt`, which follows the Content rules.
- Media boxes crop to fill (`object-fit: cover`) at fixed ratios, so pick or crop images for the box:

| Field | Box | Notes |
| --- | --- | --- |
| `cover` | 4:5 large card, 16:9 small card | `coverFit: "contain"` shows the whole image on the panel colour instead |
| `hero.image` | 16:8, full width | Also the share image if landscape |
| `gallery` | desktop 16:9 (first) and 4:3; mobile 9:19 | Shown whole on the panel colour. `device: "desktop"` or `"mobile"` |
| `sections[].image` | 4:3 | `dark: true` for terminals and logs. A section can also have no image (text full width) or a `diagram` |
| `images[0]` (short) | 4:3 | `fit: "contain"` for diagrams that must not be cropped |

- A path whose file doesn't exist yet is fine: it shows a placeholder in development and is left out in production. Check new images with `npm run dev` at 390px and 1440px wide.

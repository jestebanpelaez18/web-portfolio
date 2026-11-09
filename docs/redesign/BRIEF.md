# Portfolio redesign brief

This brief describes the redesign of jestebanpelaez.dev. Everything that needs deciding has been decided: the copy is final, the structure is fixed, and the design is drawn in the reference files. The job is to implement it in this repo.

Work in phases (below). Do one phase per session, start each in plan mode, and wait for approval before editing.

## What is in this folder

| Path | What it is |
| --- | --- |
| `docs/redesign/BRIEF.md` | This file |
| `docs/redesign/content/home-and-about.md` | Final copy for the home and About pages |
| `docs/redesign/projects/*.mdx` | The 8 projects, written in the new frontmatter format, ready to replace `src/app/work/projects/*.mdx` |
| `docs/redesign/design-reference/*.html` | The approved mockups. Read them for layout, spacing and type sizes. They use inline styles and a `{{accent}}` / `{{panel}}` placeholder (see Design tokens). They are references, not code to copy in |
| `CLAUDE.md` | Standing rules for working in this repo |

## Goal

Move the site away from the default Magic Portfolio look to an editorial style: white page, black text, serif headlines, one accent colour, lots of whitespace, and a two-column section grid (section title on the left, content on the right). Projects become case studies that mix images, numbers and short text, so a reader can skim in 20 seconds and go deeper if interested.

## Design tokens

| Token | Value |
| --- | --- |
| Background | `#FFFFFF` |
| Text | `#111111` |
| Muted text | `#5E5E5E` (labels), `#6B6B6B` (serif sublines), `#3F3F3F` (secondary body) |
| Hairlines | `#E3E3E3` |
| Accent (`{{accent}}`) | `#1F3FD1`, used for links, arrows and "Get in touch". Nothing else |
| Panel colours (`{{panel}}`) | One per project, from its frontmatter `panel` field. Soft backgrounds behind images and diagrams |
| Dark media placeholder | `#161616` for terminal recordings |
| Display font | Instrument Serif (Google Fonts), weight 400, for h1, h2 and big serif sublines |
| Body font | Geist, already in the project |
| Labels | 13 to 14px, uppercase, letter-spacing 0.08em, muted colour |

No gradients, no glow, no rounded cards, no shadows. Sections are separated by 1px hairlines.

## Remove from the current design

- The dotted background with the radial mask
- The floating pill navigation in the centre of the header
- The RevealFx entrance animations
- The "Helsinki" label in the top-left of the header
- The dark mode toggle (the new design is light only; keep it only if it costs nothing to support both)

## Global layout

- **Header:** name on the left ("Juan Esteban Pelaez", 20px, 600). On the right: Work, About, and "Get in touch" in the accent colour. Wraps on mobile.
- **Container:** max-width 1440px, side padding `clamp(16px, 4vw, 40px)`.
- **Two-column section:** `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`. Title on the left in Instrument Serif (`clamp(40px, 4.5vw, 64px)`), content on the right. Stacks to one column on phones without media queries.
- **Footer:** hairline on top, then "© 2026 Juan Esteban Pelaez" and a small "Based on Magic Portfolio by Once UI" credit (the template licence asks for visible attribution).
- **Every page works at phone width.** No horizontal scroll.

## Pages

### Home (`design-reference/Main.html`)

1. Hero: h1 "Software Engineer" and a large serif subline in muted grey. Copy in `content/home-and-about.md`.
2. "Selected work": the projects with `featured: true`, as large cards in a 3-column grid (`minmax(300px, 1fr)`). Each card: cover image (4:5, panel colour behind it while it loads), title, headline in muted text, `kind` label in caps.
3. Below a hairline, the projects with `featured: false` as smaller cards (16:9 image, title, headline, tags in caps).
4. About strip (two-column section) with a link to /about.
5. Contact strip: "Let's talk", email, GitHub, LinkedIn.

Projects are ordered by the `order` field.

### About (`design-reference/About.html`)

Two-column sections, in this order: intro (photo, location, availability, "Download CV" button on the left; three paragraphs on the right), Experience, Education, Skills, Certifications, Languages, Outside work, Contact. Copy in `content/home-and-about.md`. This replaces the current `about` object in `src/resources/content.tsx`, including the table of contents on the left, which goes away.

### Case study (`format: "case-study"`, see `ArabianFragrance.html`, `HSL.html`, `Transcendence.html`)

Render sections only when their field exists, in this order:

1. Header: `kind` label (plus `period` if present) on the left column; title (h1) and `headline` (serif subline) on the right.
2. Meta row (hairline above): ROLE (`roleSummary`), TEAM (`team`, optional), STACK (`stack` joined with commas), LINKS (`links`, accent colour with →).
3. Hero: either `hero.image` full width (16:8) on the panel colour, or `hero.diagram` (see Diagrams).
4. Summary: two-column section, `summary` paragraphs.
5. Highlights: two-column section, `highlights` in a 2x2 grid (title 20px 600, text 18px).
6. Gallery: `gallery` images on the panel colour. Desktop shots full width, mobile shots in a row of three.
7. In numbers: `results` as big numbers (`clamp(64px, 6vw, 96px)`) with a small label under each.
8. Deep-dive sections: each item in `sections` is a two-column row of image and text, alternating sides with `imageSide`.
9. Contributions: `contributionsTitle` ("My role" or "What I built") with `contributions` as an arrow list (→ in accent colour).
10. `beyond`: an optional shaded box under the contributions, label "BEYOND THE CODE".
11. Next project link: the next project by `order`, big serif text with →.

### Short project (`format: "short"`, see `Minishell.html`)

1. Header: `kind` and `tags` joined by " · " on the left; title and `headline` on the right.
2. One two-column row: the first image of `images` (4:3) on the left; on the right `summary`, `highlights` as a list with hairlines, `stack` joined by " · ", and the GitHub link.
3. Previous and next project links by `order`.

### Diagrams

`hero.diagram` is a row of steps joined by → that wraps on mobile. Each step is a white box with a 1px border showing `label` (caps), `title` and `text`. A step with `dark: true` is black with white text. A step can be a `stack` of steps shown in a column (Transcendence's REST API and real-time services). `footnote` goes under the row after a dashed line. Build it with HTML and CSS, not an image.

## Frontmatter schema

All fields are optional except `title`, `format`, `order`, `headline` and `kind`. Type it in TypeScript and validate it when the projects are loaded, so a typo in a project file fails the build with a clear message.

```yaml
title: string
format: "case-study" | "short"
featured: boolean          # large card on the home page
order: number
kind: string               # "Client work", "Personal project", "Team project", "Solo project"
tags: string[]             # shown on short projects and small cards
period: string             # "Jul 2025 - Oct 2026"
headline: string           # one sentence, shown as the serif subline and on cards
cover: string              # card image
panel: string              # hex colour
roleSummary: string
team: string
stack: string[]
links: [{ label: string, url: string }]
hero:
  image: { src: string, alt: string }
  diagram:
    label: string
    steps: [{ label, title, text, dark?, stack?: [steps] }]
    footnote: string
summary: string[]
highlights: [{ title: string, text: string }]
gallery: [{ src: string, alt: string, device: "desktop" | "mobile" }]
results: [{ value: string, label: string }]
sections:                  # each item has either image + paragraphs, or a diagram
  - title: string
    paragraphs: string[]
    image: { src, alt }
    imageSide: "left" | "right"
    dark: boolean            # dark background behind the image (logs, terminals)
    diagram: { label?, steps, footnote }   # same shape as hero.diagram, shown full width on the panel colour
contributionsTitle: string
contributions: string[]
beyond: string
images: [{ src: string, alt: string }]   # short projects
```

The MDX body is not used by the new templates. Keep it empty.

The six existing projects keep their current file names, so links already shared in CVs and applications keep working. Philosophers and Cub3D are new.

Keep generating metadata and Open Graph tags from `title` and `headline`.

## Images

Paths in the project files point to `/images/projects/<project>/...`. The owner will add the real files. Until a file exists, render a placeholder box in the panel colour with the alt text, so the layout can be checked without images. Use `next/image`. Terminal recordings can be GIF or short muted looping MP4.

## Fixes that are not design

1. **Wrong base URL in meta tags.** `og:url`, `og:image` and the JSON-LD schema point to `https://web-portfolio.vercel.app`. Find the base URL setting and change it to `https://jestebanpelaez.dev`.
2. **Template leftovers.** Delete the Magic Portfolio example posts in `src/app/blog/posts/` and the gallery images and entries in `src/resources/content.tsx`. Disable the blog and gallery routes if nothing else uses them.
3. **Em dashes.** The site must not contain the em dash character (U+2014) anywhere in visible copy. Search the whole repo for it.

## Phases

Do one phase per session. Use `/clear` between phases. Run the build and lint at the end of each phase.

1. **Cleanup and fixes.** Base URL, template leftovers, footer attribution. No visual changes yet.
2. **Foundation.** Fonts, colours, header, footer, container, the two-column section component. Remove the effects listed above.
3. **Projects.** The frontmatter schema and validation, the case study template, the short project template, the diagram component. Replace `src/app/work/projects/*.mdx` with the files in `docs/redesign/projects/`.
4. **Home and About.** Rebuild both pages from `content/home-and-about.md`.
5. **Images and final pass.** Real images in, check every page at 390px and 1440px wide, check the Open Graph preview.

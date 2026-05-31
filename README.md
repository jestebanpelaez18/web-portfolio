# Juan Esteban Pelaez Portfolio

Personal portfolio site built with Next.js and MDX to showcase flagship software engineering projects, technical writing, and professional background.

This repository started from the Magic Portfolio template and is customized for my own content, project pages, and branding.

![Portfolio preview](public/images/og/home.jpg)

## Tech Stack

- Framework: Next.js 16 (App Router)
- UI System: Once UI + Sass modules
- Language: TypeScript
- Content: MDX + gray-matter frontmatter
- Runtime: React 19
- Styling: Sass + design tokens
- Tooling: Biome, ESLint, TypeScript

## Main Features

- MDX-based project pages at src/app/work/projects
- MDX-based blog posts at src/app/blog/posts
- Centralized personal/profile data in src/resources/content.tsx
- Configurable design system options in src/resources/once-ui.config.ts
- SEO-ready metadata, sitemap, robots, and Open Graph generation
- Responsive pages for Home, About, Work, Blog, and Gallery

## Project Structure

```text
src/
	app/
		about/
		blog/
			posts/
		work/
			projects/
		api/
	components/
	resources/
		content.tsx
		once-ui.config.ts
public/
	images/
```

## Local Setup

1. Clone the repository

```bash
git clone https://github.com/jestebanpelaez18/personal-web-portfolio.git
cd personal-web-portfolio
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open http://localhost:3000

## Available Scripts

```bash
npm run dev         # Start local development server
npm run build       # Build production bundle
npm run start       # Start production server
npm run lint        # Run lint checks
npm run biome-write # Format code with Biome
npm run export      # Export static output (when applicable)
```

## Content Workflow

### Update personal data

Edit:

- src/resources/content.tsx
- src/resources/once-ui.config.ts

### Add a new project

Create a new file in src/app/work/projects with a slug name, for example:

```text
src/app/work/projects/my-new-project.mdx
```

Add frontmatter fields such as:

- title
- publishedAt
- summary
- images
- team
- link

### Add a new blog post

Create a new .mdx file in src/app/blog/posts.

## Deployment

This project is ready to deploy on Vercel.

Basic deployment flow:

1. Push to GitHub
2. Import repository in Vercel
3. Configure environment variables if needed
4. Deploy

## Acknowledgements

- [Once UI](https://once-ui.com)
- [Next.js](https://nextjs.org)
- Magic Portfolio template by Once UI team

## License

Distributed under the CC BY-NC 4.0 License.

- Attribution is required
- Commercial usage is not allowed
- Extended commercial licensing is available through Once UI licensing

See [LICENSE](LICENSE) for details.
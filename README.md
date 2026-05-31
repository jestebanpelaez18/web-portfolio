# Web Portfolio

Personal portfolio website built with Next.js and MDX.

![Portfolio preview](public/images/og/home.jpg)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- MDX
- Once UI + Sass
- ESLint + Biome

## Repository Structure

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

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build production bundle
npm run start       # Start production server
npm run lint        # Run lint checks
npm run biome-write # Format code with Biome
npm run export      # Static export (when applicable)
```

## License

See [LICENSE](LICENSE).
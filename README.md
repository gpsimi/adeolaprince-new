# path-of-becoming-launch (adeolaprince-new)

This repository contains a Next.js application (app router) for the "Path of Becoming" launch site.

This README replaces the previous placeholder content with clear setup instructions, scripts, and notes so you or a collaborator can get the project running locally quickly.

## Prerequisites

- Node.js (recommended: 18.x or later)
- npm (bundled with Node) or yarn/pnpm if you prefer

## Install

Open PowerShell in the project root and run:

```powershell
npm install
```

Or with yarn:

```powershell
yarn
```

Or with pnpm:

```powershell
pnpm install
```

## Available scripts

The project defines the following npm scripts (copied from `package.json`):

- `npm run dev` — start the Next.js development server
- `npm run build` — build the production app
- `npm run start` — run the built production server
- `npm run lint` — run the Next.js linter

Examples (PowerShell):

```powershell
npm run dev      # start dev server
npm run build    # build for production
npm run start    # start production server after build
npm run lint     # run linter
```

## Environment variables

This project may expect environment variables for integrations (analytics, Stripe, Mailchimp, etc.). No secret values are committed here. If you add environment variables for local development, create a `.env.local` file in the project root and add keys there, for example:

```
# .env.local
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
STRIPE_SECRET_KEY=sk_test_...
```

Do not commit `.env.local` to version control.

## Project structure (high level)

- `src/app/` — Next.js app routes and pages (app router)
- `src/components/` — shared UI components
- `src/hooks/` — custom React hooks
- `src/lib/` — small utilities
- `public/` — static assets

Explore `src/app` to see pages like `about`, `book`, `preorder`, `register`, and `success`.

Note: To display the hero portrait image used on the homepage, add the provided portrait file to:

```
public/hero-portrait.jpg
```

If the file is not present the hero will fall back to the same layout but without the portrait image.

## Common tasks and tips

- To add SEO defaults, place a reusable `Seo` component in `src/components` and import it into `src/app/layout.tsx`.
- For a newsletter or contact form without a backend, use Formspree or Netlify Forms and add the form page under `src/app/contact`.
- To add a blog, consider MDX + a small posts loader in `src/lib`.

## Contributing

1. Fork the repo and make a feature branch.
2. Run and test locally using `npm run dev`.
3. Open a pull request with a clear description of changes.

If you'd like, I can implement an initial set of improvements (SEO component, contact page, analytics placeholder). Tell me which and I will make the changes and run a quick build/lint.

## License

This project does not include a license file. Add a `LICENSE` if you want to set one.

---

Last updated: October 9, 2025

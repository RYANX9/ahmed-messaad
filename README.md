# Ahmed Messaad — Portfolio (Bento)

Live: [ahmed-messaad.vercel.app](https://ahmed-messaad.vercel.app)

A bento-grid personal portfolio built with Next.js and Framer Motion, featuring a dynamic animated intro sequence for the profile image and a modular project grid.

## Features

- Bento-style responsive grid layout
- Animated profile image intro, consistent across desktop and mobile
- Project cards driven from a typed data source (`app/data.ts`)
- Downloadable CV
- Fast page loads with route-level optimized transitions

## Tech stack

- **Next.js 15** (App Router, Turbopack)
- **React 19** with **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** for animation
- **lucide-react** for icons

## Project structure

```
app/
  page.tsx          landing page
  layout.tsx
  data.ts            project/content data
  colors.ts          theme colors
  ProjectCard.tsx    project card component
  globals.css
public/
  ahmed_messaad_cv.pdf
  project images
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notes

This is a lighter, front-end-only build of the portfolio. A separate, more feature-complete version — with a Postgres-backed timeline, publications, and auth — lives at [RYANX9/ahmedmessaad](https://github.com/RYANX9/ahmedmessaad).

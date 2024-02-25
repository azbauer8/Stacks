# 🚀Liftoff

A template for creating sites with Next.js 14 (app router) and NextUI (v2).

## Features

- Global layout with navbar and footer
- Theme toggle (light, dark, and system)
- Linting and formatting with [Biome.js](https://biomejs.dev/)
- Next.js experimental Partial Prerendering feature enabled by default

  - Allows the server to send a static shell of your site while the dynamic content loads in. Significant performance boost with minimal effort.
  - Simply wrap any dynamic content with a `<Suspense fallback={<Skeleton />}>...` and it will replace the fallback element once the content has loaded
- Statically typed links with Next.js `experimental.typedRoutes` feature

  - Next.js Link href's will have route autocomplete
  - In any other context where you may be linking to a route, you can get the same functionality by typing the string as a Route
    ```typescript
      import { Route } from "next"

      const example = "/example" as Route
      ```
- Recommended VSCode extensions

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)

## How to Use

### Clone this project

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

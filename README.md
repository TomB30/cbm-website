# Camp Barney Medintz Website

Modern Vue 3 rebuild of [campbarney.org](https://www.campbarney.org/) — same content and pages, refreshed UI/UX with summer-camp atmosphere.

## Live site

https://tomb30.github.io/cbm-website/

## Stack

- Vue 3 + TypeScript + Vite
- Vue Router + Pinia
- Content crawled from the live WordPress site into `src/content/`

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Content

- `src/content/registry.json` — all page routes/titles
- `src/content/pages/*.json` — page copy, structured blocks, and images
- `src/content/site.ts` — navigation, contact info, session dates

Raw crawl archives live in `.crawl-data/` (not required at runtime).

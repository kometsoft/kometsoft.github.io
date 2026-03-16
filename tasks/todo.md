## Astro v6 upgrade fixes (Bun)

- [x] Migrate legacy content config `src/content/config.ts` -> `src/content.config.ts` with loaders
- [x] Fix Tailwind v4 PostCSS plugin (`@tailwindcss/postcss`) and rebuild

## Notes

- `bun run build` previously failed with `LegacyContentConfigError` (fixed by migration).
- `bun run build` then failed in `@astrojs/tailwind` because Tailwind v4 moved its PostCSS plugin to `@tailwindcss/postcss`.
- Astro v6 replaces `ViewTransitions` with `ClientRouter` from `astro:transitions`.


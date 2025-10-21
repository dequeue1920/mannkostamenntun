2025-10-20 — Converted `courses_en.html` to Jekyll

- Added front matter: `layout: default`, `title`, `lang: en`.
- Replaced static page title with `{% include components/page-title.html %}`.
- Added `{% include components/language-switcher.html %}` for multilingual support.
- Replaced service images with responsive `<picture>` fallback (WebP/AVIF/JPG) using existing `img/` assets.
- Ensured `img` elements include `alt` text and `loading="lazy"`.

Notes: Image fallbacks reference files in `/img/` which already exist in the repo. Consider running `npm run process-images` to populate `/assets/images/` if you prefer that path.

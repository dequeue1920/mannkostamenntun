2025-10-20 — Converted `courses_en.html` to Jekyll

- Added front matter=`layout=default`, `title`, `lang=en`.
- Replaced static page title with `{% include components/page-title.html %}`.
- Added `{% include components/language-switcher.html %}` for multilingual support.
- Replaced service images with responsive `<picture>` fallback (WebP/AVIF/JPG) using existing `img/` assets.
- Ensured `img` elements include `alt` text and `loading="lazy"`.

Notes=Image fallbacks reference files in `/img/` which already exist in the repo. Consider running `npm run process-images` to populate `/assets/images/` if you prefer that path.

2025-10-21 — Converted `portfolio.html` to Jekyll

- Added front matter=`layout=default`, `title`, `lang=is`, `permalink=/portfolio/`.
- Created `_includes/components/portfolio-title.html` and `_includes/components/portfolio-items.html` to render title and image grid from `img/works/` static files.
- Replaced inline portfolio markup with includes and semantic HTML elements (`main`, `section`, `figure`).
- Created `portfolio_en.html` (lang=en, permalink `/en/portfolio/`) that reuses the same includes.
- Updated `index.html` to use `{{ '/portfolio/' | relative_url }}` instead of a static `portfolio.html` link.

Notes=The `portfolio-items` include enumerates `site.static_files` for `/img/works/` and builds responsive `<picture>` elements using existing image variants (320/640/960 and placeholders). This keeps the markup data-driven and avoids duplication.

- [x] Successful build: Workflow **Build and Deploy Jekyll Site** completed successfully.
	Commit: `feat(layout): include language-switcher in header`
	Status: ✅ Success
	Timestamp: 2025-10-22 13:45

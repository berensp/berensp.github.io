# CLAUDE.md — AI Assistant Guide for berens.co

## Project Overview

This is **berens.co**, a personal portfolio and blog built with **Jekyll** and hosted on **GitHub Pages**. The site belongs to Paul Berens and was originally forked from [Dan Romero's Clio template](https://github.com/danromero/clio). It has grown into a rich personal site with blog posts, recipes, prayers, cycling/running routes with maps, data-driven daily content, and automated integrations with external services.

- **Live URL**: https://berens.co
- **Domain**: configured via `CNAME` file
- **Primary branch**: `master`

## Tech Stack

| Component       | Technology                          |
|-----------------|-------------------------------------|
| Static generator | Jekyll 3.9.5 (github-pages gem)    |
| Language         | Ruby 3.2+                          |
| Markdown parser  | kramdown                           |
| Templating       | Liquid                             |
| Hosting          | GitHub Pages                       |
| CI/CD            | GitHub Actions                     |
| CSS              | Custom (`assets/main.css`), no framework |
| Maps             | OpenLayers 8.2.0 (CDN)            |
| JavaScript       | Vanilla JS (8 utility scripts in `assets/js/`) |

## Build & Development

### Local Development

```bash
bundle install            # Install Ruby dependencies
bundle exec jekyll serve  # Start local dev server (http://localhost:4000)
bundle exec jekyll build --trace  # Build the site (outputs to _site/)
```

### Requirements

- Ruby 3.2+
- Bundler gem
- Dependencies defined in `Gemfile` and locked in `Gemfile.lock`

### Key Configuration

- **`_config.yml`**: Main Jekyll config — site title, URL, collections, permalink structure, plugins
- **`Gemfile`**: Ruby dependencies (Jekyll 3.9.5, github-pages, jekyll-last-modified-at)
- **`CNAME`**: Custom domain (`berens.co`)

### Permalink Structure

Posts: `/:categories/:title:output_ext`
Collections: each has its own permalink pattern (e.g., `/recipes/:path/`, `/prayers/:path/`)

## Directory Structure

```
.
├── _config.yml            # Jekyll configuration
├── _layouts/              # 13 HTML layout templates
├── _includes/             # Shared components (head.html, footer.html)
├── _data/                 # YAML/JSON data files driving dynamic content
├── _posts/                # Blog posts (YYYY-MM-DD-slug.md)
├── _prayers/              # Prayer collection
├── _recipes/              # Recipe collection
├── _runs/                 # Running routes with GPX maps
├── _rides/                # Cycling routes with GPX maps
├── pages/                 # Static pages (about, contact, today, etc.)
├── posts/                 # Post archive and tag pages
│   └── tags/
├── assets/
│   ├── main.css           # Main stylesheet (light + dark mode)
│   ├── js/                # JavaScript utility scripts
│   ├── images/            # Site images (avatars, family, qr, og)
│   ├── maps/              # GPX files for route rendering
│   ├── og/                # Open Graph social preview images
│   ├── audio/             # Audio files
│   ├── songs/             # Song data files
│   └── downloads/         # Downloadable files
├── .github/workflows/     # GitHub Actions (CI, Strava, Swarm, Telegram)
├── index.md               # Home page
├── 404.md                 # Error page
├── RELEASE_NOTES.md       # Version history
└── Gemfile / Gemfile.lock # Ruby dependencies
```

### What is NOT tracked in git

Per `.gitignore`: `_drafts/`, `_site/`, `.DS_Store`, `*.plist`, `*.swp`, `.bundle/`

## Content Collections

### Blog Posts (`_posts/`)

File naming: `YYYY-MM-DD-slug.md`

Front matter:

```yaml
---
layout: post
title: Post Title
date: YYYY-MM-DD
author: Paul Berens
tags: ["tag1", "tag2"]
description: Short description for meta/SEO
ogimage: image_filename.png    # optional, for Open Graph
---
```

Common tags: `tech`, `product`, `books`, `faith`, `music`, `history`

### Recipes (`_recipes/`)

File naming: `slug.md`

```yaml
---
layout: recipe
title: Recipe Name
preptime: 10        # minutes
cooktime: 10        # minutes
yield: 4 servings
---
```

Body uses `## Ingredients` with checkbox lists, then `## Instructions` with numbered steps.

### Prayers (`_prayers/`)

File naming: `slug.md`

```yaml
---
layout: prayer
title: Prayer Name
category: Category Name
ogimage: image.png   # optional
---
```

### Running Routes (`_runs/`)

File naming: `slug.md`

```yaml
---
layout: map_run
title: Run Name
gpx_url: filename.gpx       # GPX file in assets/maps/
id: unique_id
long: -13646990.55           # OpenLayers map center longitude
lat: 4566013.63              # OpenLayers map center latitude
zoom: 13
distance: 7.4 mi
elevation: 2,041 ft
difficulty: easy|medium|hard
category: Location Category
description: Short description
---
```

### Cycling Routes (`_rides/`)

Same pattern as runs but uses `layout: map_ride`.

```yaml
---
layout: map_ride
title: Ride Name
gpx_url: filename.gpx
id: unique_id
long: ...
lat: ...
zoom: 13
distance: 18 mi
elevation: 1700 ft
difficulty: easy|moderate|hard
category: Shorter Rides|Longer Rides
description: Short description
---
```

## Layouts (`_layouts/`)

| Layout               | Purpose                                      |
|----------------------|----------------------------------------------|
| `default.html`       | Base template — includes head, "← Home" nav  |
| `home.html`          | Home page with rotating avatar               |
| `post.html`          | Blog posts with sharing links, tags, subscribe |
| `page.html`          | Generic static pages                         |
| `recipe.html`        | Recipes with prep/cook time display           |
| `prayer.html`        | Prayer display                               |
| `map_run.html`       | Running routes with OpenLayers GPX map        |
| `map_ride.html`      | Cycling routes with OpenLayers GPX map        |
| `strava_activity.html` | Strava activity data display               |
| `bookreview.html`    | Book review pages                            |
| `tag_page.html`      | Tag archive listing                          |
| `sf.html`            | San Francisco-specific layout                |
| `timediff.html`      | Time difference calculator                   |

## Data Files (`_data/`)

These YAML/JSON files drive dynamic content throughout the site:

| File                      | Purpose                            |
|---------------------------|------------------------------------|
| `bdays.yml`               | Birthday calendar (~18KB)          |
| `books.yml`               | Book collection                    |
| `contacts.yml`            | Contact methods (apps/platforms)   |
| `countries.yml`           | Countries visited                  |
| `daily_events.yml`        | Daily event calendar (~27KB)       |
| `daily_song.yml`          | 366-day song catalog (~34KB)       |
| `feast_days.yml`          | Catholic liturgical calendar       |
| `relative_dates.yml`      | Relative date calculations         |
| `rosary_mysteries.yml`    | Rosary cycle data                  |
| `quotidie.yml`            | Daily content data                 |
| `learning.yml`            | Learning topics                    |
| `strava.json`             | Latest Strava activity (auto-updated) |
| `swarm.json`              | Latest Swarm check-in (auto-updated) |
| `telegram_subscribers.json` | Telegram bot subscriber list     |

## Styling

- **Single stylesheet**: `assets/main.css` (~409 lines)
- **Light/dark mode**: CSS custom properties with `@media (prefers-color-scheme: dark)`
- **No CSS framework** — all custom styles
- **Typography**: Sans-serif throughout
- **Utility classes used**: `.muted`, `.small`, `.post-list`, `.post-link`
- **Highlight colors**: Yellow, turquoise, lilac, gray (via `<mark>` variants)

## GitHub Actions Workflows

| Workflow                     | Trigger                     | Purpose                                   |
|------------------------------|-----------------------------|-------------------------------------------|
| `jekyll.yml`                 | Push to master, PRs         | Build site with `jekyll build --trace`     |
| `update-strava.yml`          | Daily 7AM UTC, manual       | Sync latest Strava activity to `_data/strava.json` |
| `update-swarm.yml`           | Scheduled, manual           | Sync Swarm check-in to `_data/swarm.json`  |
| `telegram-daily-song.yml`    | Scheduled                   | Send daily song via Telegram bot           |
| `telegram-preview-song.yml`  | Manual                      | Preview Telegram song message              |
| `telegram-subscriptions.yml` | Scheduled                   | Manage Telegram subscriber list            |

Automated workflows commit data changes directly back to the repository.

### Required Secrets (for workflows)

- `STRAVA_CLIENT_ID`, `STRAVA_CLIENT_SECRET`, `STRAVA_ACCESS_TOKEN`, `STRAVA_REFRESH_TOKEN`
- Swarm/Foursquare API credentials
- Telegram bot token and chat IDs

## Conventions & Patterns

### Content Conventions

- All content is **Markdown** (kramdown flavor) with YAML front matter
- Blog posts always include `layout`, `title`, `date`, `author`, `tags`, `description`
- Footnotes use standard kramdown syntax: `[^1]` with `[^1]: footnote text`
- Image captions use `<span class="muted small">caption text</span>` below the image
- Internal links use relative paths: `[text](/path/)` with trailing slashes
- Posts about books italicize the title in post listings (via Liquid conditional in `index.md`)

### HTML in Markdown

Some content mixes HTML with Markdown, particularly:
- Recipes use `<ul>` with `<input type="checkbox"/>` for ingredient checklists
- Layouts use Liquid templating extensively
- `<mark>` tags for highlights

### Naming Conventions

- Post files: `YYYY-MM-DD-slug.md` (lowercase, hyphenated slugs)
- Collection items: `slug.md` (no date prefix)
- Pages: `slug.md` in `pages/` directory
- Layouts: `snake_case.html`
- JavaScript: `kebab-case.js`
- Data files: `snake_case.yml` or `snake_case.json`
- Image assets: descriptive names, no strict convention

### JavaScript

All scripts are vanilla JS in `assets/js/`. No build step or bundler — scripts are loaded directly in layouts via `<script>` tags.

Key scripts:
- `avatar-rotator.js` — rotates home page avatar by day of week
- `date_calculator.js` — date/time calculations
- `weather.js` — weather data fetching
- `gpx-renderer.js` — GPX map rendering helper
- `rosary-mysteries.js` — liturgical cycle calculations

## Important Notes for AI Assistants

1. **This is a GitHub Pages site** — it must remain compatible with the `github-pages` gem and its supported plugins. Do not add gems or plugins not supported by GitHub Pages (unless using a custom build action).

2. **Jekyll version**: The site uses Jekyll 3.9.5 via the `github-pages` gem. Be mindful of API differences with Jekyll 4.x.

3. **No build tooling** for CSS/JS — files are served as-is. Do not introduce webpack, Sass compilation, or other build steps unless specifically requested.

4. **Automated data files** — `_data/strava.json`, `_data/swarm.json`, and `_data/telegram_subscribers.json` are updated by GitHub Actions. Do not modify these files manually as changes will be overwritten.

5. **Custom domain** — The `CNAME` file must always contain `berens.co`. Do not remove or modify it.

6. **Sensitive data** — Workflows use repository secrets for API tokens. Never hardcode credentials.

7. **Content tone** — The site is personal with a literary, Catholic, and intellectually curious voice. Content references include classical literature, theology, music, cycling, and technology.

8. **Existing patterns** — When adding new content or features, follow the established patterns in existing layouts, front matter, and naming conventions documented above. Prefer consistency with the existing codebase over introducing new patterns.


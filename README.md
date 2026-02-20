# berens.co

Personal site of Paul Berens — blog, recipes, prayers, cycling and running routes, and daily data-driven content. Originally forked from Dan Romero's [Clio](../danromero/clio) template and expanded considerably.

**Live at [berens.co](https://berens.co)**

## Stack

Jekyll 3.9.5 · GitHub Pages · kramdown · Liquid · vanilla CSS & JS

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Requires Ruby 3.2+ and Bundler.

## What's here

| Directory | What's in it |
|---|---|
| `_posts/` | Blog posts (tech, faith, books, music, history) |
| `_recipes/` | Recipes with ingredient checklists |
| `_prayers/` | Catholic prayers in English, Latin, and Spanish |
| `_runs/` | Running routes with GPX maps |
| `_rides/` | Cycling routes with GPX maps |
| `_data/` | YAML/JSON files powering daily content, songs, feast days, birthdays, and more |
| `_layouts/` | 13 templates (posts, maps, recipes, prayers, etc.) |
| `pages/` | Static pages (about, contact, now, today, beliefs, values, cv, ...) |
| `assets/` | CSS, JS, images, GPX files, audio, Open Graph images |

## Automations

GitHub Actions sync live data from Strava (cycling/running) and Swarm (check-ins), and a Telegram bot sends a daily song to subscribers. These workflows commit directly to the repo — the JSON files they update (`_data/strava.json`, `_data/swarm.json`, `_data/telegram_subscribers.json`) should not be edited by hand.

## For AI assistants


See [CLAUDE.md](CLAUDE.md) for the full guide: directory structure, front matter conventions, layout reference, naming patterns, data file inventory, and rules for working on this codebase.

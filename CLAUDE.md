# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run docs:dev      # start local dev server
npm run docs:build    # production build (output to .vitepress/dist)
npm run docs:preview  # preview the production build locally
```

No test or lint commands are configured.

## Architecture

This is a **VitePress 2.x** documentation site — "The Claude Book: Mastering Claude Code and Cowork."

**Content** lives as Markdown files at the repo root and in subdirectories:
- `docs/` — main documentation pages (setup, welcome, github-integration, etc.)
- `illustrations/` — standalone illustration pages
- `index.md` — home page (VitePress `layout: home` with hero + features)
- `glossary.md`, `about.md` — top-level pages

**Static assets** go in `public/` and are served at the root path (e.g. `public/claude-ai.svg` → `/claude-ai.svg`).

**Theme** (`/.vitepress/theme/`):
- Extends the VitePress default theme
- `style.css` — full Anthropic brand overrides: coral/terracotta brand color (`#d97757`), warm cream backgrounds, Lora (headings), Source Serif 4 (body), JetBrains Mono (code)
- `Layout.vue` — wraps the default layout to wire up `medium-zoom` on elements with `data-zoomable`; add `data-zoomable` to any image that should be click-to-zoom

**Navigation** is defined entirely in `.vitepress/config.mts` — both `nav` (top bar) and `sidebar`. Add new pages there when creating new content files.

**Plugins:**
- `vitepress-plugin-lightbox` — enabled via `markdown.config` in `config.mts`
- `medium-zoom` — applied in `Layout.vue` on route change; target images with `data-zoomable`

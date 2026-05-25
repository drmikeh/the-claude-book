# The Claude Book

**Mastering Claude Code and Cowork** — a comprehensive documentation site covering Claude Code from beginner to expert.

Built with [VitePress 2.x](https://vitepress.dev/) by [Dr. Mike Hopper](https://github.com/drmikeh).

## Topics Covered

- **Getting Started** — AI fundamentals, the CLAUDE.md file, and welcome guide
- **The Claude Code CLI** — installation, getting started, and model selection
- **Skills** — installing, using, writing, and hooks; Skills Hall of Fame
- **Advanced Topics** — GitHub integration, the Advisor Tool, prompt caching
- **Reference** — config files and configuration reference

## Development

```bash
npm install
npm run docs:dev      # start local dev server (http://localhost:5173)
npm run docs:build    # production build → .vitepress/dist
npm run docs:preview  # preview the production build locally
```

## Layout

```
  ┌──────────────────────────────────────────────────────────────┐
  │                    THE CLAUDE BOOK                           │
  │                  (VitePress 2.x site)                        │
  ├────────────────────┬─────────────────────────────────────────┤
  │  CONTENT           │  CONFIGURATION / THEME                  │
  │  (Markdown pages)  │  (.vitepress/)                          │
  │                    │                                         │
  │  docs/             │  config.mts ─── nav + sidebar           │
  │  ├─ index.md       │       │                                 │
  │  ├─ getting-       │       └── plugins                       │
  │  │   started/      │           ├── lightbox (zoom)           │
  │  ├─ claude-code-   │           └── medium-zoom               │
  │  │   cli/          │                                         │
  │  ├─ skills/        │  theme/                                 │
  │  │   └─ hof/       │  ├─ style.css  (Anthropic branding)     │
  │  ├─ advanced/      │  └─ Layout.vue (medium-zoom wiring)     │
  │  ├─ illustrations/ │                                         │
  │  └─ reference/     │  public/  (images, SVGs, PNGs)          │
  └────────────────────┴─────────────────────────────────────────┘
            │
            ▼  npm run docs:build
     ┌──────────────┐
     │  Static site │  ← deployed as plain HTML/CSS/JS
     │  (dist/)     │
     └──────────────┘
```

## Book Structure

| Section          | What it covers                                                                                      |
| :--------------- | :-------------------------------------------------------------------------------------------------- |
| getting-started/ | Welcome, AI fundamentals, global & project instructions                                             |
| claude-code-cli/ | Installation, getting started, model selection, permissions, cheat sheet                            |
| skills/          | What skills are, how to install/use/write them, hooks                                               |
| skills/hof/      | "Hall of Fame" — spotlighting notable skill authors (Matt Pocock, Superpowers plugin, Boris Cherny) |
| advanced/        | Fully autonomous mode, GitHub integration, the Advisor tool, prompt caching                         |
| reference/       | Config file reference                                                                               |

## Project Structure

```
.
├── index.md                  # Home page
├── about.md                  # About the author
├── glossary.md               # Glossary
├── docs/
│   ├── getting-started/      # Intro and foundational concepts
│   ├── claude-code-cli/      # CLI usage and configuration
│   ├── skills/               # Skills guide and Hall of Fame
│   ├── advanced/             # Advanced topics
│   └── reference/            # Config reference
├── illustrations/            # Standalone illustration pages
├── public/                   # Static assets (images, SVGs)
└── .vitepress/
    ├── config.mts            # Site config, nav, and sidebar
    └── theme/                # Custom theme (brand colors, fonts, zoom)
```

## How the build works

1. You write content as .md files inside docs/
2. VitePress reads config.mts to build the nav bar and sidebar
3. The custom theme (style.css) applies Anthropic's brand colors — coral/terracotta #d97757, warm cream backgrounds, Lora/Source Serif 4 fonts
4. Layout.vue wires up medium-zoom so any image tagged data-zoomable pops open on click
5. npm run docs:build compiles everything into a deployable static site

There's also a standalone illustrations/ section with dedicated visual pages (agentic kitchen, key AI components, where agents run) — these seem to be
rich visual explainers meant to be shared or embedded.

## The Gotcha ⚠️

> [!NOTE]
> The docs/ root is the VitePress source root — not the repo root.

This is easy to miss. All internal links in the nav/sidebar config (/getting-started/welcome) are relative to docs/, not to the repo root. The
VitePress dev server is also launched with vitepress dev docs, pointing it at that subdirectory. So if you ever add a new page, it needs to live under
docs/ AND be registered in config.mts — just adding the Markdown file won't make it appear in the nav.

Similarly, static assets go in docs/public/ — not a top-level public/ folder — even though they're served at the root URL path (/claude-ai.svg).

## License

Copyright © 2026 Dr. Mike Hopper

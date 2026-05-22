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

## License

Copyright © 2026 Dr. Mike Hopper

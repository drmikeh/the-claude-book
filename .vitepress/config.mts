import { defineConfig } from 'vitepress';
import lightbox from 'vitepress-plugin-lightbox';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'The Claude Book',
    description: 'Mastering Claude Code and Cowork',
    markdown: {
        theme: {
            light: 'github-dark',
            dark: 'github-dark',
        },
        config: (md) => {
            // Use lightbox plugin
            md.use(lightbox, {});
        },
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/claude-ai.svg',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Docs', link: '/docs/getting-started/welcome' },
            { text: 'Glossary', link: '/glossary' },
            {
                text: 'Illustrations',
                items: [
                    { text: 'Key Components of Modern AI', link: '/illustrations/key-components' },
                    { text: 'Agentic Kitchen', link: '/illustrations/agentic-kitchen' },
                    { text: 'Where Agents Run', link: '/illustrations/where-agents-run' },
                ],
            },
            { text: 'About', link: '/about' },
        ],

        sidebar: [
            {
                text: 'Getting Started',
                // collapsed: false,
                items: [
                    { text: 'Welcome', link: '/docs/getting-started/welcome' },
                    { text: 'AI Fundamentals', link: '/docs/getting-started/ai-fundamentals' },
                    { text: 'The CLAUDE.md File', link: '/docs/getting-started/claude-md-file' },
                ],
            },
            {
                text: 'The Claude Code CLI',
                // collapsed: true,
                items: [
                    { text: 'Installation', link: '/docs/claude-code-cli/installation' },
                    { text: 'Getting Started', link: '/docs/claude-code-cli/getting-started' },
                    { text: 'Choosing a Model', link: '/docs/claude-code-cli/choosing-a-model' },
                ],
            },
            {
                text: 'Skills',
                // collapsed: true,
                items: [
                    { text: 'Skills', link: '/docs/skills/intro' },
                    { text: 'Installing Skills', link: '/docs/skills/installing' },
                    { text: 'Using Skills', link: '/docs/skills/using' },
                    { text: 'Writing Skills', link: '/docs/skills/writing' },
                    { text: 'Hooks', link: '/docs/skills/hooks' },
                    // { text: 'Tool Use', link: '/docs/skills/tool-use' },
                ],
            },
            {
                text: 'Skills Hall of Fame',
                // collapsed: true,
                items: [
                    { text: 'Matt Pocock Skills', link: '/docs/skills/hof/matt-pocock' },
                    { text: 'Anthropic Superpowers Plugin', link: '/docs/skills/hof/superpowers-plugin' },
                    { text: 'Boris Cherny Skills', link: '/docs/skills/hof/boris-cherny' },
                ],
            },
            {
                text: 'Advanced Claude Code Topics',
                // collapsed: true,
                items: [
                    { text: 'GitHub Integration', link: '/docs/advanced/github-integration' },
                    { text: 'Advisor Tool', link: '/docs/advanced/advisor-tool' },
                    { text: 'Prompt Caching', link: '/docs/advanced/prompt-caching' },
                ],
            },
            {
                text: 'Claude Cowork Basics',
            },
            {
                text: 'Reference',
                // collapsed: true,
                items: [{ text: 'Config Files', link: '/docs/reference/config-files' }],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],

        footer: {
            // message: 'Built with assistance from Claude Code',
            copyright: 'Copyright © 2026 Dr. Mike Hopper',
        },
    },
});

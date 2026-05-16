import { defineConfig } from 'vitepress';
import lightbox from 'vitepress-plugin-lightbox';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'The Claude Book',
    description: 'Mastering Claude Code and Cowork',
    markdown: {
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
                    { text: 'Agentic Kitchen', link: '/illustrations/agentic-kitchen' },
                    { text: 'Where Agents Run', link: '/illustrations/where-agents-run' },
                ],
            },
            { text: 'About', link: '/about' },
        ],

        sidebar: [
            {
                text: 'Getting Started',
                items: [
                    { text: 'Welcome', link: '/docs/getting-started/welcome' },
                    { text: 'AI Fundamentals', link: '/docs/getting-started/ai-fundamentals' },
                    { text: 'The CLAUDE.md File', link: '/docs/getting-started/claude-md-file' },
                    { text: 'The Claude CLI', link: '/docs/getting-started/claude-cli' },
                ],
            },
            {
                text: 'Claude Code Basics',
            },
            {
                text: 'The Skills Hall of Fame',
                items: [
                    { text: 'The Superpowers Plugin Skills', link: '/docs/skills-hof/superpowers-plugin' },
                    { text: 'Matt Pocock Skills', link: '/docs/skills-hof/matt-pocock-skills' },
                ],
            },

            {
                text: 'Advanced Claude Code Topics',
                items: [{ text: 'GitHub Integration', link: '/docs/advanced/github-integration' }],
            },
            {
                text: 'Claude Cowork Basics',
            },
            {
                text: 'Reference',
                items: [{ text: 'Config Files', link: '/docs/reference/config-files' }],
            },
            {
                text: 'Examples',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' },
                ],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],

        footer: {
            // message: 'Built with assistance from Claude Code',
            copyright: 'Copyright © 2026 Dr. Mike Hopper',
        },
    },
});

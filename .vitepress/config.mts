import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'The Claude Book',
    description: 'Mastering Claude Code and Cowork',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: '/claude-ai.svg',
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Docs', link: '/docs/' },
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
                    { text: 'Welcome', link: '/docs/welcome' },
                    { text: 'Setup', link: '/docs/setup' },
                ],
            },
            {
                text: 'Claude Code Basics',
                items: [
                    { text: 'Welcome', link: '/docs/welcome' },
                    { text: 'Setup', link: '/docs/setup' },
                ],
            },
            {
                text: 'Advanced Claude Code Topics',
                items: [
                    { text: 'Welcome', link: '/docs/welcome' },
                    { text: 'Setup', link: '/docs/setup' },
                ],
            },
            {
                text: 'Claude Cowork Basics',
                items: [
                    { text: 'Welcome', link: '/docs/welcome' },
                    { text: 'Setup', link: '/docs/setup' },
                ],
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

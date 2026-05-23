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
            { text: 'Docs', link: '/getting-started/welcome' },
            { text: 'Glossary', link: '/glossary' },
            {
                text: 'Illustrations',
                items: [
                    {
                        text: 'Key Components of Modern AI',
                        link: '/illustrations/key-components',
                    },
                    {
                        text: 'Agentic Kitchen',
                        link: '/illustrations/agentic-kitchen',
                    },
                    {
                        text: 'Where Agents Run',
                        link: '/illustrations/where-agents-run',
                    },
                ],
            },
            { text: 'About', link: '/about' },
        ],

        sidebar: [
            {
                text: 'Getting Started',
                // collapsed: false,
                items: [
                    { text: 'Welcome', link: '/getting-started/welcome' },
                    {
                        text: 'AI Fundamentals',
                        link: '/getting-started/ai-fundamentals',
                    },
                    {
                        text: 'Global Instructions',
                        link: '/getting-started/global-instructions',
                    },
                    {
                        text: 'Project Instructions',
                        link: '/getting-started/project-instructions',
                    },
                ],
            },
            {
                text: 'The Claude Code CLI',
                // collapsed: true,
                items: [
                    {
                        text: 'Installation',
                        link: '/claude-code-cli/installation',
                    },
                    {
                        text: 'Getting Started',
                        link: '/claude-code-cli/getting-started',
                    },
                    {
                        text: 'Choosing a Model',
                        link: '/claude-code-cli/choosing-a-model',
                    },
                    {
                        text: 'Setting Permissions',
                        link: '/claude-code-cli/setting-permissions',
                    },
                ],
            },
            {
                text: 'Skills',
                // collapsed: true,
                items: [
                    { text: 'Skills', link: '/skills/intro' },
                    {
                        text: 'Installing Skills',
                        link: '/skills/installing',
                    },
                    { text: 'Using Skills', link: '/skills/using' },
                    { text: 'Writing Skills', link: '/skills/writing' },
                    { text: 'Hooks', link: '/skills/hooks' },
                    // { text: 'Tool Use', link: '/skills/tool-use' },
                ],
            },
            {
                text: 'Skills Hall of Fame',
                // collapsed: true,
                items: [
                    {
                        text: 'Matt Pocock Skills',
                        link: '/skills/hof/matt-pocock',
                    },
                    {
                        text: 'Anthropic Superpowers Plugin',
                        link: '/skills/hof/superpowers-plugin',
                    },
                    {
                        text: 'Boris Cherny Skills',
                        link: '/skills/hof/boris-cherny',
                    },
                ],
            },
            {
                text: 'Advanced Claude Code Topics',
                // collapsed: true,
                items: [
                    {
                        text: 'Fully Autonomous Claude Code',
                        link: '/advanced/fully-autonomous',
                    },
                    {
                        text: 'GitHub Integration',
                        link: '/advanced/github-integration',
                    },
                    {
                        text: 'Advisor Tool',
                        link: '/advanced/advisor-tool',
                    },
                    {
                        text: 'Prompt Caching',
                        link: '/advanced/prompt-caching',
                    },
                ],
            },
            {
                text: 'Claude Cowork Basics',
            },
            {
                text: 'Reference',
                // collapsed: true,
                items: [
                    {
                        text: 'Config Files',
                        link: '/reference/config-files',
                    },
                ],
            },
        ],

        search: {
            provider: 'local',
        },

        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/drmikeh/the-claude-book',
            },
        ],

        footer: {
            // message: 'Built with assistance from Claude Code',
            copyright: 'Copyright © 2026 Dr. Mike Hopper',
        },
    },
});

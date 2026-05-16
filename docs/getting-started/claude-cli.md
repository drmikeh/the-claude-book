---
layout: doc
outline: [2, 4]
---

# Getting Started with the Claude CLI

Intro goes here.

## Installation

There are multiple ways to install the `claude` CLI:

::: code-group

```shell [Homebrew]
brew install claude
```

```shell [npm]
npm install -g @anthropic/claude-code
```

```shell [Shell]
curl -fsSL https://claude.ai/install.sh | bash
```

:::

## Starting Claude CLI

Simply type `claude` in your terminal to start the CLI.

To exit the CLI, type `/exit`.

```
❯ claude
 ▐▛███▜▌   Claude Code v2.1.141
▝▜█████▛▘  Opus Plan · Claude Pro
  ▘▘ ▝▝    ~/Developer/2026/gen_ai/master-claude-repo

───────────────────────────────────────────────────────────────────────────────
❯ /exit
───────────────────────────────────────────────────────────────────────────────
```

## Setting The Status Line

The Claude CLI has a status line at the bottom of the window that can be configured to show a lot of interesting information.

You can run the `/statusline` command to customize the status line at the bottom of the terminal. Claude may even scan your shell settings (i.e. your `.zshrc` file) and set the statusline to match what you have set for your shell prompt.

Example:

![Customized Status Line](/customized-statusline.png)

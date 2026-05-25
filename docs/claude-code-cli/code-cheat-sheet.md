---
layout: doc
outline: [2, 4]
---

# Claude Code Cheatsheet

> **Last updated:** May 2025 · [Official Docs](https://code.claude.com/docs/en/overview)

## 🚀 CLI — Session Management

Commands run from your terminal to start and manage sessions.

| Command                         | Description                                                 | Example                                      |
| ------------------------------- | ----------------------------------------------------------- | -------------------------------------------- |
| `claude`                        | Start an interactive session                                | `claude`                                     |
| `claude "query"`                | Start a session with an initial prompt                      | `claude "explain this project"`              |
| `claude -p "query"`             | Print response and exit (non-interactive)                   | `claude -p "explain this function"`          |
| `cat file \| claude -p "query"` | Process piped content                                       | `cat logs.txt \| claude -p "explain"`        |
| `claude -c`                     | Continue the most recent conversation                       | `claude -c`                                  |
| `claude -r "<session>" "query"` | Resume a session by ID or name                              | `claude -r "auth-refactor" "Finish this PR"` |
| `claude -n "name"`              | Name the current session                                    | `claude -n "my-feature-work"`                |
| `claude update`                 | Update to the latest version                                | `claude update`                              |
| `claude install [version]`      | Install a specific version (`stable`, `latest`, or `2.x.x`) | `claude install stable`                      |

## 🔐 CLI — Authentication

| Command                   | Description                                      | Example                       |
| ------------------------- | ------------------------------------------------ | ----------------------------- |
| `claude auth login`       | Sign in to your Anthropic account                | `claude auth login --console` |
| `claude auth logout`      | Log out from your Anthropic account              | `claude auth logout`          |
| `claude auth status`      | Show authentication status                       | `claude auth status --text`   |
| `claude setup-token`      | Generate a long-lived OAuth token for CI/scripts | `claude setup-token`          |
| `claude auth login --sso` | Force SSO authentication                         | `claude auth login --sso`     |

## ⚙️ CLI — Configuration Flags

Pass these flags when launching Claude Code to customize behavior.

| Flag                           | Description                                                                               | Example                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `--model <model>`              | Set model for the session (`sonnet`, `opus`, or full name)                                | `claude --model claude-opus-4-6`                        |
| `--effort <level>`             | Set effort level: `low`, `medium`, `high`, `xhigh`, `max`                                 | `claude --effort high`                                  |
| `--permission-mode <mode>`     | Start in a permission mode: `default`, `acceptEdits`, `plan`, `auto`, `bypassPermissions` | `claude --permission-mode plan`                         |
| `--add-dir <path>`             | Add additional working directories                                                        | `claude --add-dir ../apps ../lib`                       |
| `--append-system-prompt "..."` | Append custom text to the system prompt                                                   | `claude --append-system-prompt "Always use TypeScript"` |
| `--system-prompt "..."`        | Replace the entire system prompt                                                          | `claude --system-prompt "You are a Python expert"`      |
| `--system-prompt-file <file>`  | Load system prompt from a file                                                            | `claude --system-prompt-file ./custom-prompt.txt`       |
| `--tools "..."`                | Restrict which tools Claude can use                                                       | `claude --tools "Bash,Edit,Read"`                       |
| `--allowedTools "..."`         | Tools that run without a permission prompt                                                | `"Bash(git log *)" "Read"`                              |
| `--disallowedTools "..."`      | Tools that are denied or removed                                                          | `"Bash(rm *)" "Edit"`                                   |
| `--mcp-config <file>`          | Load MCP servers from a JSON file                                                         | `claude --mcp-config ./mcp.json`                        |
| `--plugin-dir <path>`          | Load a plugin for this session                                                            | `claude --plugin-dir ./my-plugin`                       |
| `--bare`                       | Minimal mode — skips hooks, skills, MCP, CLAUDE.md                                        | `claude --bare -p "query"`                              |
| `--debug`                      | Enable debug mode (optional category filter)                                              | `claude --debug "api,mcp"`                              |
| `--verbose`                    | Show full turn-by-turn output                                                             | `claude --verbose`                                      |
| `--max-turns <n>`              | Limit agentic turns (print mode only)                                                     | `claude -p --max-turns 3 "query"`                       |
| `--max-budget-usd <n>`         | Budget cap in dollars (print mode only)                                                   | `claude -p --max-budget-usd 5.00 "query"`               |
| `--bg`                         | Start as a background agent and return immediately                                        | `claude --bg "investigate the flaky test"`              |
| `--output-format <fmt>`        | Output format: `text`, `json`, `stream-json`                                              | `claude -p "query" --output-format json`                |
| `--worktree`, `-w`             | Start in an isolated git worktree                                                         | `claude -w feature-auth`                                |
| `--chrome`                     | Enable Chrome browser integration                                                         | `claude --chrome`                                       |
| `--version`, `-v`              | Output the version number                                                                 | `claude -v`                                             |

## 🔧 Configuration (Inside Session)

Use these slash commands to configure Claude from within an active session.

| Command                 | Description                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| `/config`               | Open Settings UI (theme, model, output style, etc.). Alias: `/settings`                  |
| `/model [model]`        | Select or change the AI model interactively                                              |
| `/effort [level\|auto]` | Set effort level (`low`, `medium`, `high`, `xhigh`, `max`) or use the interactive slider |
| `/theme`                | Change the color theme (light, dark, daltonized, ANSI, custom)                           |
| `/permissions`          | Manage allow/ask/deny rules for tools. Alias: `/allowed-tools`                           |
| `/hooks`                | View hook configurations for tool events                                                 |
| `/mcp`                  | Manage MCP server connections and OAuth                                                  |
| `/agents`               | Manage subagent configurations                                                           |
| `/terminal-setup`       | Configure Shift+Enter and other terminal keybindings                                     |
| `/keybindings`          | Open or create your keybindings configuration file                                       |
| `/statusline`           | Configure the Claude Code status line                                                    |

## 📄 Context Management

Commands to understand and manage the context window.

| Command                   | Description                                                                                                    |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `/context [all]`          | Visualize context usage as a colored grid with optimization tips                                               |
| `/compact [instructions]` | Summarize the conversation to free up context. Pass focus instructions: `/compact keep only the plan and diff` |
| `/clear [name]`           | Start a fresh conversation (previous stays in `/resume`). Aliases: `/reset`, `/new`                            |
| `/btw <question>`         | Ask a side question without adding it to conversation history                                                  |

## ℹ️ Information & Status

| Command          | Description                                                                       |
| ---------------- | --------------------------------------------------------------------------------- |
| `/help`          | Show help and all available commands                                              |
| `/doctor`        | Diagnose installation, settings, MCP servers, and context usage                   |
| `/status`        | Show version, model, account, and connectivity (works while Claude is responding) |
| `/usage`         | Show session cost, plan limits, and activity stats. Aliases: `/cost`, `/stats`    |
| `/skills`        | List available skills (press `t` to sort by token count)                          |
| `/memory`        | Edit CLAUDE.md memory files and manage auto-memory                                |
| `/context`       | Show current context window usage                                                 |
| `/release-notes` | View the changelog in an interactive version picker                               |
| `/insights`      | Analyze your Claude Code sessions for patterns and friction points                |

## 🗄️ Memory & Project Setup

| Command            | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| `/init`            | Initialize project with a `CLAUDE.md` guide                    |
| `/memory`          | Edit CLAUDE.md files, enable/disable auto-memory, view entries |
| `/team-onboarding` | Generate a team onboarding guide from your usage history       |

**CLAUDE.md locations:**

| Scope             | Path                                            |
| ----------------- | ----------------------------------------------- |
| Global (personal) | `~/.claude/CLAUDE.md`                           |
| Project           | `.claude/CLAUDE.md` or `CLAUDE.md` in repo root |

## 🔀 Session Navigation

| Command              | Description                                                                      |
| -------------------- | -------------------------------------------------------------------------------- |
| `/resume [session]`  | Resume a conversation by ID or name. Alias: `/continue`                          |
| `/branch [name]`     | Fork the current conversation at this point. Alias: `/fork`                      |
| `/rename [name]`     | Rename the current session                                                       |
| `/clear`             | Start a new conversation with empty context                                      |
| `/export [filename]` | Export the current conversation as plain text                                    |
| `/rewind`            | Roll back code and conversation to a checkpoint. Aliases: `/checkpoint`, `/undo` |

## 📋 Workflow Commands (Slash)

Commands to manage and accelerate your development workflow.

| Command                | Description                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| `/plan [description]`  | Enter plan mode. Pass a description to start immediately                       |
| `/diff`                | Open an interactive diff viewer for uncommitted changes and per-turn diffs     |
| `/copy [N]`            | Copy the last assistant response to clipboard. Pass `N` to copy the Nth-latest |
| `/goal [condition]`    | Set a persistent goal; Claude works across turns until it's met                |
| `/background [prompt]` | Detach session to run as a background agent. Alias: `/bg`                      |

## ⚡ Parallel Work & Agents

| Command                | Description                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `/agents`              | Open the agent manager to monitor and dispatch parallel sessions                       |
| `/tasks`               | List and manage background tasks. Alias: `/bashes`                                     |
| `/batch <instruction>` | **[Skill]** Break a large change into parallel units, each running in its own worktree |
| `/background`          | Detach the current session to keep running in the background. Alias: `/bg`             |
| `claude agents`        | Open agent view from the terminal (CLI command)                                        |
| `claude attach <id>`   | Attach to a background session in this terminal                                        |
| `claude stop <id>`     | Stop a background session                                                              |
| `claude logs <id>`     | Print recent output from a background session                                          |
| `claude respawn <id>`  | Restart a background session with its conversation intact                              |
| `claude rm <id>`       | Remove a background session from the list                                              |

## 🔍 Code Quality (Bundled Skills)

These are built-in skills invoked with `/` commands.

| Command                     | Description                                                                                        |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| `/review [PR]`              | Review a pull request locally in the current session                                               |
| `/security-review`          | Analyze pending changes for security vulnerabilities                                               |
| `/simplify [focus]`         | **[Skill]** Review recently changed files for reuse, quality, and efficiency issues, then fix them |
| `/ultrareview [PR]`         | Deep multi-agent cloud-based code review                                                           |
| `/debug [description]`      | **[Skill]** Enable debug logging and troubleshoot session issues                                   |
| `/fewer-permission-prompts` | **[Skill]** Scan transcripts and add allowlist rules to reduce permission prompts                  |

## 🛠️ Debugging & Diagnostics

| Command                      | Description                                                          |
| ---------------------------- | -------------------------------------------------------------------- |
| `/doctor`                    | Run an automated check of installation, settings, MCP, and context   |
| `claude doctor`              | Same as `/doctor` but from the shell (use when `claude` won't start) |
| `/debug [description]`       | Enable debug logging mid-session                                     |
| `/heapdump`                  | Write a JS heap snapshot to `~/Desktop` for memory diagnostics       |
| `/feedback [report]`         | Submit feedback or bug reports to Anthropic. Alias: `/bug`           |
| `claude --debug "api,mcp"`   | Start with debug output (category-filtered)                          |
| `claude --debug-file <path>` | Write debug logs to a specific file                                  |

## 🧰 MCP & Plugins

| Command                        | Description                                  |
| ------------------------------ | -------------------------------------------- |
| `/mcp`                         | Manage MCP server connections and OAuth      |
| `claude mcp`                   | Configure MCP servers from the CLI           |
| `/plugin`                      | Manage Claude Code plugins                   |
| `claude plugin install <name>` | Install a plugin                             |
| `/reload-plugins`              | Reload all active plugins without restarting |
| `--mcp-config <file>`          | Load MCP servers from a JSON file at launch  |
| `--strict-mcp-config`          | Use only MCP servers from `--mcp-config`     |

## 🌐 Remote & Web

| Command                  | Description                                                                 |
| ------------------------ | --------------------------------------------------------------------------- |
| `/remote-control`        | Make this session available for remote control from claude.ai. Alias: `/rc` |
| `claude remote-control`  | Start a Remote Control server (CLI)                                         |
| `claude --remote "task"` | Create a new web session on claude.ai                                       |
| `/teleport`              | Pull a Claude Code web session into this terminal. Alias: `/tp`             |
| `/autofix-pr [prompt]`   | Spawn a web session that watches the current PR and pushes fixes            |
| `/desktop`               | Continue this session in the Claude Code Desktop app                        |

## ⌨️ Keyboard Shortcuts (Interactive Mode)

| Shortcut    | Action                                                                     |
| ----------- | -------------------------------------------------------------------------- |
| `Ctrl+C`    | Cancel current operation                                                   |
| `Shift+Tab` | Cycle through permission modes (default → plan → auto → bypassPermissions) |
| `Ctrl+R`    | Search prompt history                                                      |
| `↑` / `↓`   | Navigate prompt history                                                    |
| `Tab`       | Autocomplete skill/command name                                            |

## 📁 Key File Locations

| File / Directory                   | Purpose                               |
| ---------------------------------- | ------------------------------------- |
| `CLAUDE.md` (project root)         | Project-level memory and instructions |
| `~/.claude/CLAUDE.md`              | Personal global memory                |
| `.claude/settings.json`            | Project settings                      |
| `.claude/settings.local.json`      | Local (gitignored) project settings   |
| `~/.claude/settings.json`          | User-level settings                   |
| `~/.claude/skills/<name>/SKILL.md` | Personal custom skills                |
| `.claude/skills/<name>/SKILL.md`   | Project-specific custom skills        |
| `~/.claude/themes/`                | Custom themes                         |

## 💡 Quick Tips

- Type `/` in a session to see all available commands with live filtering.
- Use `Shift+Tab` to cycle permission modes without restarting.
- `/compact` with instructions (e.g., `/compact keep only the plan`) lets you surgically preserve what matters.
- `CLAUDE.md` is read at every session start — keep it focused and under 500 lines.
- Use `disable-model-invocation: true` in a skill's frontmatter to require manual `/skill-name` invocation.
- `claude -p` (print mode) is ideal for scripting and CI pipelines.
- Background sessions (`--bg`) let you run long tasks without tying up a terminal.

_Sources: [CLI Reference](https://docs.anthropic.com/en/docs/claude-code/cli-reference) · [Commands](https://code.claude.com/docs/en/commands) · [Skills](https://docs.anthropic.com/en/docs/claude-code/slash-commands) · [Settings](https://docs.anthropic.com/en/docs/claude-code/settings)_

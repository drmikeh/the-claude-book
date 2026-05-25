---
layout: doc
outline: [2, 4]
---

# Config Files Across Claude Products

Here's a comprehensive breakdown of all configuration files across Claude Chat, Cowork, and Code:

## Claude Chat (claude.ai)

Claude Chat doesn't use file-based configuration — everything is stored server-side as account settings.

| Surface                  | Location                                                        | Purpose                                                                                                                                 |
| ------------------------ | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Profile Preferences**  | Settings → General → "What preferences should Claude consider?" | Injects your instructions into the system prompt automatically on every conversation — your context is loaded before you type anything. |
| **Style**                | Settings → Style                                                | Custom writing/tone style presets                                                                                                       |
| **Memory**               | Auto-generated or manually edited via UI                        | Persistent facts Claude carries across sessions                                                                                         |
| **Project Instructions** | Per-project system prompt field                                 | Instructions scoped to a specific Project                                                                                               |

None of these are local files — they live in Anthropic's servers and are not directly editable outside the UI.

## Claude Cowork (Desktop App)

Cowork adds file-based context on top of Chat's server-side settings:

| File/Surface            | Location                                     | Purpose                                                                                                                                          |
| ----------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Global Instructions** | Settings → Cowork → Edit Global Instructions | Specify your preferred tone, output format, or background on your role. (Server-side)                                                            |
| **`claude.md`**         | In your connected working folder             | Cowork figures out what you changed and writes those preferences here; every time you tell Cowork to remember something, it writes to this file. |
| **`memory.md`**         | In your connected working folder             | Persistent memory companion to claude.md                                                                                                         |
| **Context `.md` files** | Anywhere in your connected folder            | User-created context files (about-me, my-voice, my-rules, etc.)                                                                                  |

Cowork reads files from your connected folder at session start — so your `.md` files **are** your configuration.

## Claude Code (CLI)

This is the richest config system. Scopes apply to settings, subagents, MCP servers, plugins, and CLAUDE.md files across user, project, and local levels.

### Settings Files (`settings.json`)

| Scope       | Location                      | Shared?                             |
| ----------- | ----------------------------- | ----------------------------------- |
| **User**    | `~/.claude/settings.json`     | No — personal, all projects         |
| **Project** | `.claude/settings.json`       | Yes — committed to git              |
| **Local**   | `.claude/settings.local.json` | No — gitignored, personal overrides |
| **Managed** | System-level (see below)      | Yes — IT/org enforced               |

**Managed settings locations:**

| Platform       | Path                                                            |
| -------------- | --------------------------------------------------------------- |
| macOS (MDM)    | `com.anthropic.claudecode` plist via Jamf/Kandji                |
| macOS (file)   | `/Library/Application Support/ClaudeCode/managed-settings.json` |
| Linux/WSL      | `/etc/claude-code/managed-settings.json`                        |
| Windows (GPO)  | `HKLM\SOFTWARE\Policies\ClaudeCode`                             |
| Windows (file) | `C:\Program Files\ClaudeCode\managed-settings.json`             |

Drop-in fragment directory at `managed-settings.d/` is also supported alongside the main file, merged alphabetically.

### Instruction Files (`CLAUDE.md`)

| Scope           | Location                                        | Notes                       |
| --------------- | ----------------------------------------------- | --------------------------- |
| **User global** | `~/.claude/CLAUDE.md`                           | Applies to all projects     |
| **Project**     | `CLAUDE.md` or `.claude/CLAUDE.md` in repo root | Committed, shared with team |
| **Local**       | `CLAUDE.local.md` in project root               | Gitignored, personal        |

Think of `settings.json` as "what Claude can do" and `CLAUDE.md` as "what Claude should know."

### MCP Configuration

| Scope            | Location                                                       |
| ---------------- | -------------------------------------------------------------- |
| **User + local** | `~/.claude.json`                                               |
| **Project**      | `.mcp.json` (in project root, version-controlled)              |
| **Managed**      | `managed-mcp.json` (same system directory as managed-settings) |

### Other Files in `~/.claude/`

```
~/.claude/
├── settings.json          # Global user settings
├── settings.local.json    # Local user settings (not synced)
├── CLAUDE.md              # Global instructions
├── .credentials.json      # API credentials (Linux/Windows only)
├── commands/              # Global custom slash commands
│   ├── review.md
│   └── test.md
├── agents/                # User-scoped subagents
└── projects/              # Session history (JSONL) per project
```

And `~/.claude.json` — OAuth session, user-scoped MCP config, per-project tool trust state.

### Priority Order (highest → lowest)

```
Managed → CLI args → Local → Project → User
```

### Quick Mental Model

```
Claude Chat   → Server-side only (UI settings + Profile Preferences)
Claude Cowork → Server-side + working-folder .md files
Claude Code   → Full file hierarchy: ~/.claude/ + .claude/ + system paths
```

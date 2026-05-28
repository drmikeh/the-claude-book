---
layout: doc
outline: [2, 4]
---

# Hooks

A **hook** is a user-defined handler that runs automatically at a fixed point in Claude Code's lifecycle — think of it as an event listener for the agent loop.

The analogy that maps well for a software engineer: hooks are to Claude Code what middleware is to an Express app, or what Git hooks are to a repository. You're intercepting well-defined lifecycle events and injecting deterministic behavior — formatting, validation, blocking, logging — regardless of what the AI "decides" to do.

## Hooks Are Deterministic

The key distinction from just prompting Claude is determinism. A prompt instruction like "always run Prettier after editing files" is advisory — Claude might forget or skip it. A `PostToolUse` hook that runs prettier --write on every file edit is guaranteed to execute every single time.

## Hook Structure

Each hook has three parts:

- **Event** — which lifecycle moment to intercept (`PreToolUse`, `Stop`, `SessionStart`, etc.)
- **Matcher** — an optional regex filter to narrow when it fires (e.g. only on Bash tool calls, or only on Edit|Write operations)
- **Handler** — what actually runs: a shell command, HTTP endpoint, LLM prompt eval, or a spawned subagent

## An Example of a Hook

Here's a `PostToolUse` hook that runs Prettier after every file edit:

```json
// .claude/settings.json
{
    "hooks": {
        "PostToolUse": [
            {
                "matcher": "Edit|Write|MultiEdit",
                "hooks": [
                    {
                        "type": "command",
                        "command": "npx prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\""
                    }
                ]
            }
        ]
    }
}
```

The matcher targets the three tools Claude uses to write files: `Edit` (single-block edits), `MultiEdit` (multiple edits in one call), and `Write` (full file writes). The env var `$CLAUDE_TOOL_INPUT_FILE_PATH` is injected by Claude Code and resolves to the file that was just modified.

Since `PostToolUse` is non-blocking, it can't undo the edit — but it runs **synchronously** before Claude's next action, so the file is formatted before Claude reads it back or makes further changes.

A few practical refinements worth considering:

**Scope it to formattable files only**, to avoid Prettier erroring on binary or unsupported types:

```json
"command": "npx prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true"
```

The `|| true` ensures a Prettier failure (e.g. on a file type it doesn't handle) doesn't surface as a hook error.

**Use a local Prettier config** — Prettier will automatically pick up `.prettierrc`, `prettier.config.js`, etc. from the project root, so no extra config needed in the hook itself.

**Prefer a local binary over `npx`** if startup latency matters in a large project:

```json
"command": "./node_modules/.bin/prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true"
```

## Some Hooks are Blocking

Some hooks may block the agent from continuing execution, and some never block. When a hook "blocks," it halts the operation that triggered it — the tool call, turn, or session event never proceeds (or is forced to continue, depending on the hook).

The mechanism is the **exit code** returned by the hook handler:

- **Exit 0** — hook ran fine, no decision, execution continues normally
- **Exit 2** — **block**: the operation is stopped, and stderr is sent to Claude as the reason
- **Any other code** — error, shown to the user, but execution continues anyway

So "blocking" is just `exit 2` in a shell script (or `{"decision": "block"}` in JSON output for HTTP/prompt hooks).

What "blocked" means depends on the hook:

| Hook                    | What "block" does                                                         |
| ----------------------- | ------------------------------------------------------------------------- |
| `PreToolUse`            | Tool call is cancelled; Claude sees the reason and can try something else |
| `PermissionRequest`     | Permission is denied without prompting the user                           |
| `Stop`                  | Forces Claude to keep working instead of finishing the turn               |
| `SubagentStop`          | Subagent output is rejected; it must continue                             |
| `UserPromptSubmit`      | Prompt is rejected before Claude ever sees it                             |
| `WorktreeCreate/Remove` | Replaces default git behavior entirely                                    |

The `Stop` hook is the most counterintuitive one — "blocking" a stop means _preventing_ Claude from stopping, not stopping it from doing something. It's how you enforce task completion: if tests are still failing, exit 2 and Claude keeps going.

## The Hooks

As of May 2026, there are 30 hook events over 9 categories, as shown below.

### Session Lifecycle Hooks

|  Hook event  | When it fires                                                     | Blocks? | Use Cases                                                                                                        |
| :----------: | :---------------------------------------------------------------- | :-----: | :--------------------------------------------------------------------------------------------------------------- |
|    Setup     | On `--init-only`, `--init`, or `--maintenance` flags (CI/scripts) |   No    | One-time env bootstrapping; install deps; pre-flight checks in CI pipelines                                      |
| SessionStart | Session begins or resumes (after clear, compact, or resume)       |   No    | Inject context from prior sessions; set env vars; load project-specific config; log session start to audit trail |
|  SessionEnd  | Session terminates for any reason                                 |   No    | Cleanup temp files; persist session summary to DB; send cost/usage report; flush logs                            |

### Per-turn Event Hooks

|     Hook event      | When it fires                                                   | Blocks? | Use Cases                                                                                                                                 |
| :-----------------: | :-------------------------------------------------------------- | :-----: | :---------------------------------------------------------------------------------------------------------------------------------------- |
|  UserPromptSubmit   | User hits enter — before Claude processes the prompt            |   Yes   | Append context (ticket ID, git branch) to every prompt; enforce prompt policies; validate input; log all user prompts                     |
| UserPromptExpansion | A slash command expands into a prompt, before it reaches Claude |   Yes   | Validate or gate custom slash commands; transform expansion output; block disallowed commands                                             |
|        Stop         | Claude finishes responding (end of turn)                        |   Yes   | Enforce task completion (force Claude to keep going if tests fail); run a final linter or type-check; send desktop notification when done |
|     StopFailure     | Turn ends due to an API error (rate limit, billing, etc.)       |   No    | Alert on API errors; log billing/rate-limit events; trigger retry logic externally; send PagerDuty alert                                  |

### Tool Execution Hooks

|     Hook event     | When it fires                                                              | Blocks? | Use Cases                                                                                                                                  |
| :----------------: | :------------------------------------------------------------------------- | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------- |
|     PreToolUse     | After Claude creates tool params, before the tool executes                 |   Yes   | Block destructive shell commands (`rm -rf`); auto-approve safe read ops; enforce allowlists; log all tool invocations; rewrite tool inputs |
| PermissionRequest  | A permission dialog appears (tool needs user approval)                     |   Yes   | Auto-approve known-safe tools to eliminate click fatigue; auto-deny disallowed operations; enforce policy-based access control             |
|  PermissionDenied  | A tool call is denied by the auto-mode classifier                          |   No    | Return `{retry: true}` to let Claude retry; log denied ops for security review; alert on repeated denials                                  |
|    PostToolUse     | After a tool call succeeds                                                 |   No    | Auto-format files after write/edit; run linter after code changes; log tool results; send feedback to Claude for next iteration            |
| PostToolUseFailure | After a tool call fails                                                    |   No    | Log errors to observability platform; alert on repeated failures; surface actionable hints back to Claude                                  |
|   PostToolBatch    | After a full batch of parallel tool calls resolves, before next model call |   No    | Aggregate results from parallel tool calls; run cross-file validation after a batch of edits; batch-log tool results                       |

### Subagent & Task Hooks

|  Hook event   | When it fires                                         | Blocks? | Use Cases                                                                                                               |
| :-----------: | :---------------------------------------------------- | :-----: | :---------------------------------------------------------------------------------------------------------------------- |
| SubagentStart | A subagent is spawned via the Agent tool or @-mention |   No    | Inject subagent-specific context; log subagent spawns for orchestration tracing; initialize subagent env vars           |
| SubagentStop  | A subagent finishes its work                          |   Yes   | Validate subagent output before it's returned; enforce quality gates on delegated tasks; log subagent cost/duration     |
|  TaskCreated  | A task is being created via `TaskCreate`              |   No    | Log task creation to external tracker; inject task context or constraints; audit task creation in multi-agent workflows |
| TaskCompleted | A task is being marked as completed                   |   No    | Trigger downstream automation on task completion; update external project boards; run acceptance checks                 |
| TeammateIdle  | An agent-team teammate is about to go idle            |   No    | Re-assign work before a teammate idles; alert orchestrator; log idle events in parallel agent orchestration             |

### Compaction & Context Hooks

| Hook event  | When it fires                      | Blocks? | Use Cases                                                                                                 |
| :---------: | :--------------------------------- | :-----: | :-------------------------------------------------------------------------------------------------------- |
| PreCompact  | Before context compaction runs     |   No    | Back up full transcript before it's summarized; extract and persist key decisions; snapshot current state |
| PostCompact | After context compaction completes |   No    | Re-inject project context after compaction; verify compaction summary accuracy; resume monitoring         |

### MCP & Elicitation Hooks

|    Hook event     | When it fires                                                          | Blocks? | Use Cases                                                                                                      |
| :---------------: | :--------------------------------------------------------------------- | :-----: | :------------------------------------------------------------------------------------------------------------- |
|    Elicitation    | An MCP server requests user input during a tool call                   |   No    | Log elicitation events; surface custom UI for MCP prompts; route elicitation to specific channels (e.g. Slack) |
| ElicitationResult | User responds to an MCP elicitation, before response is sent to server |   No    | Validate or transform user elicitation responses; audit MCP interaction history; enforce response policies     |

### File & Config Watching Hooks

|     Hook event     | When it fires                                                     | Blocks? | Use Cases                                                                                                             |
| :----------------: | :---------------------------------------------------------------- | :-----: | :-------------------------------------------------------------------------------------------------------------------- |
| InstructionsLoaded | A `CLAUDE.md` or `.claude/rules/*.md` file is loaded into context |   No    | Validate instruction files on load; log which rules files were applied; dynamically inject supplemental instructions  |
|    ConfigChange    | A configuration file changes during a live session                |   No    | Hot-reload environment on config change; notify team of settings changes; validate new config before it takes effect  |
|     CwdChanged     | Working directory changes (e.g. Claude runs `cd`)                 |   No    | Trigger `direnv` reload; activate project-specific virtualenv; load per-directory `.env`; update shell prompt context |
|    FileChanged     | A watched file changes on disk (matcher specifies filenames)      |   No    | Re-run build on source file change; reload config on `.env` change; trigger tests when a spec file is modified        |

### Worktree Management Hooks

|   Hook event   | When it fires                                                           | Blocks? | Use Cases                                                                                                 |
| :------------: | :---------------------------------------------------------------------- | :-----: | :-------------------------------------------------------------------------------------------------------- |
| WorktreeCreate | A worktree is being created via `--worktree` or `isolation: "worktree"` |   Yes   | Replace default git worktree behavior; inject custom branch naming; provision worktree-specific resources |
| WorktreeRemove | A worktree is being removed (session exit or subagent finish)           |   Yes   | Override git cleanup; archive worktree artifacts; deprovision worktree-specific infra before removal      |

### Notification Hooks

|  Hook event  | When it fires                                                          | Blocks? | Use Cases                                                                                             |
| :----------: | :--------------------------------------------------------------------- | :-----: | :---------------------------------------------------------------------------------------------------- |
| Notification | Claude Code sends a notification (permission prompt, idle, auth, etc.) |   No    | Desktop/TTS alerts when Claude needs input; route notifications to Slack; log all notification events |

### Controlling Agent Execution with Blocking Hooks

The following hooks are **blocking** hooks that establish a control plane.

- `PreToolUse`
- `PermissionRequest`
- `UserPromptSubmit`
- `Stop`
- `SubagentStop`
- `WorktreeCreate`
- `WorktreeRemove` can all exit with code `2` to halt execution — everything else is observability/side-effects only.

## Hook Handler Types

**Four handler types exist** (not just shell commands):

- `command` — shell script (the classic)
- `http` — POST to a local or remote endpoint (added Feb 2026); useful for centralized policy services
- `prompt` — lightweight LLM evaluation, returns `{ok: true/false}`
- `agent` — spawns a subagent with `Read/Grep/Glob` access for deeper codebase analysis

## Notes

**`PostToolUse`** has a nuance: it can't block the tool that already ran, but it _can_ write feedback to Claude's context, effectively steering the next turn.

**`async: true`** (added Jan 2026) lets you fire-and-forget any hook — good for logging, backups, and notifications that shouldn't add latency to the main loop.

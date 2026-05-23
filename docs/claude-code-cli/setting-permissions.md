---
layout: doc
outline: [2, 4]
---

# Setting Permissions

Setting permissiosn is a balance between being productive and being safe. You don't want Claude Code to constantly ask you for permission before every change it makes. At the same time, you don't want Claude making destructive changes that are either difficult or impossible to back out.

Here we will provide a sensible middle ground that ensures Claude Code will operate in ways that are both productive and safe. We will look at three complementary strategies for configuring Claude's permission model:

1. Permission Mode (interactive)
2. Allow/Deny settings
3. Hooks

### 1. Permission Mode Strategy

When using Claude Code interactively, it has three modes cycled via `Shift+Tab`:

| Mode                  | What It Does                                          | When to Use                      |
| --------------------- | ----------------------------------------------------- | -------------------------------- |
| **Normal**            | Prompts on every potentially dangerous op             | First session on a new codebase  |
| **Auto-accept edits** | File edits proceed immediately; commands still prompt | Active dev on a trusted codebase |
| **Plan mode**         | Read-only; no writes at all                           | Exploration, architecture review |

Auto-accept mode eliminates permission prompts for file edits, enabling uninterrupted execution for the session. This is your primary "get out of the way" lever for day-to-day coding.

> [!TIP]
> For safe autonomous changes, use **auto-accept edits** as your default. Git operations that make changes will stay gated.

### 2. The `allowedTools` / `deny` Configuration — Your Safety Contract

In `.claude/settings.json`, define what Claude can and cannot do without asking:

```json
{
    "permissions": {
        "allow": [
            "Bash(npm run test:*)",
            "Bash(npm run lint:*)",
            "Bash(npm run build:*)",
            "Bash(git diff:*)",
            "Bash(git status:*)",
            "Bash(git log:*)",
            "Bash(git stash:*)"
        ],
        "deny": [
            "Bash(git commit:*)",
            "Bash(git push:*)",
            "Bash(git merge:*)",
            "Bash(git rebase:*)",
            "Bash(rm -rf:*)",
            "Bash(sudo:*)"
        ]
    }
}
```

> [!TIP]
> Think of permissions in Claude Code as your App Store approval system: the allowlist should only include commands that are 100% harmless. The deny list is your hard floor — no amount of prompt jailbreaking gets past it.

### 3. Hooks — The Real Power Move

Unlike `CLAUDE.md` instructions which are advisory, hooks are deterministic and guarantee the action happens. This is the critical distinction:

- **CLAUDE.md** → Claude _should_ do this (~70% reliable)
- **Hooks** → This _always_ happens (100% deterministic)

`CLAUDE.md` instructions get followed about 70% of the time. For style preferences, that's acceptable. For rules like "don't push to main" or "don't delete production data," 70% compliance is a production incident waiting to happen. Hooks close that gap to 100% by running scripts at specific points in Claude's workflow, making certain behaviors structurally impossible.

**Recommended hook setup** (`.claude/settings.json`):

```json
{
    "hooks": {
        "PostToolUse": [
            {
                "matcher": "Edit|Write",
                "hooks": [
                    {
                        "type": "command",
                        "command": "npx prettier --write \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
                    },
                    {
                        "type": "command",
                        "command": "npx eslint --fix \"$CLAUDE_FILE_PATH\" 2>/dev/null || true"
                    }
                ]
            }
        ],
        "PreToolUse": [
            {
                "matcher": "Bash",
                "hooks": [
                    {
                        "type": "command",
                        "command": "echo \"$CLAUDE_TOOL_INPUT\" | grep -qE '(git commit|git push|git merge|rm -rf)' && exit 2 || exit 0"
                    }
                ]
            }
        ]
    }
}
```

The `PreToolUse` hook with `exit 2` **blocks** the command before it runs. `PostToolUse` hooks auto-format without interrupting flow.

---

### 4. CLAUDE.md — Scope and Contract

The WHAT/WHY/HOW framework forces you to be complete. If you leave out one of the three, Claude guesses — and Claude guesses wrong.

Recommended structure for your project's `CLAUDE.md`:

```markdown
## WHAT (Project context)

TypeScript monorepo using Nx. Entry: apps/api. Shared libs: libs/shared.

## WHY (Constraints that matter)

- We never commit directly to main
- All migrations are irreversible — never auto-apply
- Secrets live in .env.local — never log or commit

## HOW (Workflow rules)

- Run `npm test` after every code change
- Always work on a feature branch (never main/master)
- Use `git stash` not `git reset --hard` for backups
- Create PRs for review, don't merge autonomously

## @imports for modularity

@docs/testing-conventions.md
@docs/git-workflow.md
```

`CLAUDE.md` is a living document — every time Claude makes a mistake, add a rule. Boris Cherny calls this Compound Engineering.

### 5. Git Workflow: The Right Boundary

Your stated goal — Claude works freely but no irreversible git actions — maps cleanly to this:

```
✅ Claude can do:          ❌ Claude cannot do:
─────────────────          ────────────────────
Create/edit files          git commit
Run tests                  git push
Run linters                git merge / rebase
git diff / status          git reset --hard
git stash                  rm -rf anything
git branch (create)        Modify .env files
```

**Practical workflow:**

1. You give Claude a task → it works autonomously
2. When done, Claude runs tests, formats, shows you `git diff`
3. You review the diff and make the commit yourself
4. This keeps you as the **semantic gatekeeper**, not the execution bottleneck

### 6. Auto Mode (Enterprise / Max Plans Only)

Anthropic released Auto mode as a safer alternative to `--dangerously-skip-permissions`. A Sonnet 4.6-based classifier evaluates risk per tool call, auto-approving safe operations and blocking dangerous ones such as mass file deletion, data exfiltration, and malicious code execution.

Auto mode is currently unavailable on Pro/Max plans. The `acceptEdits` mode + Hooks + allow/deny list combination described above remains the most practical auto-approval workflow for individual users.

### 7. Custom Slash Commands for Repeatability

Every markdown file in `.claude/commands/` becomes a slash command. Commands committed to the project folder are shared with your team. Commands can run shell commands and embed the output directly into the prompt before Claude sees anything — a review command can pull the current `git diff` automatically.

Useful ones for your setup:

```bash
.claude/commands/
  review.md       → /project:review  (runs git diff, asks Claude to review)
  test.md         → /project:test    (runs full test suite, summarizes failures)
  ready.md        → /project:ready   (lint + test + diff summary before you commit)
```

### TL;DR Decision Tree

```
Starting a new/unfamiliar codebase?
  → Plan Mode first, then Normal Mode

Active development on a known codebase?
  → Auto-accept edits + deny list for git writes

Critical rule (no push to main, no rm -rf)?
  → Hook with exit 2 — not CLAUDE.md

Repetitive task (format, lint, test)?
  → PostToolUse hook — remove yourself from the loop entirely

Ready to ship?
  → You run git commit/push manually after reviewing the diff
```

The overall pattern: **Claude owns execution, you own commit history.** That's the balance point you're looking for.

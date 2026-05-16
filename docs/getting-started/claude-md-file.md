---
layout: doc
outline: [2, 4]
---

# The CLAUDE.md File

The `CLAUDE.md` file provides a location to define rules, guidelines, and policies that you want Claude to follow. These "instructions" cut across all prompts and skills. Sometimes these instructions are called a "Constitution", which is a good analogy. These instructions are considered non-negotiable.

Claude Code reads your global and project-scoped `CLAUDE.md` files at the start of every session, and becomes part of Claude's system prompt. Every conversation starts with this context already loaded, eliminating the need to explain basic project information repeatedly.

## Why It Exists

Claude Code has no memory between sessions by default. Without `CLAUDE.md`, you'd repeat yourself constantly: code style, test commands, branch conventions, architectural quirks, domain terminology, etc. You end up explaining the same architectural decisions, testing requirements, and code style preferences at the start of every conversation. `CLAUDE.md` fixes that.

## File Placement & Loading Strategy

Claude Code uses a multi-file, directory-walk loading strategy that is intentionally additive rather than overriding. When you start a Claude Code session in a directory, Claude walks up the directory tree from your current working directory toward the repository root, collecting every CLAUDE.md file it encounters.

This means you can layer them:

|      Location       | Purpose                                                |
| :-----------------: | :----------------------------------------------------- |
| ~/.claude/CLAUDE.md | Your personal workflow preferences, editor quirks      |
|    Project root     | Team-wide conventions, stack context, shared workflows |
|    Subdirectory     | Module-specific rules (e.g., /api/CLAUDE.md)           |

> [!TIP]
> Using all three keeps each file short and focused. Dumping everything into the project file makes it long, noisy, and hard to maintain.

You can define a global `CLAUDE.md` file and a project-specific `CLAUDE.md` file.

- `~/.claude/CLAUDE.md` - instructions that apply to all of your projects
- `/path/to/my/project/CLAUDE.md` - instructions that apply to a specific project

If there is any conflict between the two, the project-specific instructions will override the global instructions.

> [!IMPORTANT]
> Instructions from your `CLAUDE.md` files are always loaded into your agent's context window. Thus, you should keep your `CLAUDE.md` files short, preferably under 200 lines of code, to avoid these files consuming too much of your agent's context window.

## What to put in the global CLAUDE.md file

The global instructions should be agnostic of any project-specific requirements, such as tech stack rules and guidelines.

Thus global instructions should define the highest policies, such as how Claude should behave in general. A good starting point is to consider Andrej Karpathy's `CLAUDE.md` guidelines:

1. Think before coding
2. Favor simplicity
3. Make only surgical changes
4. Be goal-driven

Below is a `CLAUDE.md` file that captures these principals.

**~/.claude/CLAUDE.md:**

```markdown
# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.
```

## What to put in a project CLAUDE.md file

Project-specific instructions go into the project's `CLAUDE.md` file. This can include coding standards, git and GitHub workflows, project structure, and allowed and non-allowed technologies.

If you already have a project with structure and code, you can use the `/init` command in Claude Code to have Claude create a `CLAUDE.md` file. Claude will then analyze your project's files to create a `CLAUDE.md` file that matches the code and project structure that currently exists.

From there, you can update `CLAUDE.md` as needed to define the project-specific instructions for Claude to follow whenever it generates or edits the project files.

> [!TIP]
> While Claude uses a file called `CLAUDE.md`, many other harnesses use the file named `AGENTS.md`, which does the same thing as `CLAUDE.md`. If you want to use other harnesses, you can simply symlink from `AGENTS.md` to `CLAUDE.md` so that your `CLAUDE.md` file is ready by harnesses expecting the name to be `AGENTS.md`.

```shell
cd my-project-home-directory
ln -s CLAUDE.md AGENTS.md      # assumes CLAUDE.md already exists.
```

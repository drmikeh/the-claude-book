---
layout: doc
outline: [2, 4]
---

# Project Scoped Instructions

> [!TIP]
> `CLAUDE.md` is Claude's instruction file. Treat it like its AI’s onboarding doc.

Project-scoped instructions are stored in the `CLAUDE.md` file at the root of the project. This is where you define rules, guidelines, and policies that you want Claude Code to follow. These "instructions" cut across all prompts and skills. Sometimes these instructions are called a "Constitution", which is a good analogy, since these instructions are considered non-negotiable.

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

See: [Global Instructions](/getting-started/global-instructions.html).

## What to put in a project CLAUDE.md file

Project-specific instructions go into the project's `CLAUDE.md` file. This can include coding standards, git and GitHub workflows, project structure, and allowed and non-allowed technologies.

If you already have a project with structure and code, you can use the `/init` command in Claude Code to have Claude create a `CLAUDE.md` file. Claude will then analyze your project's files to create a `CLAUDE.md` file that matches the code and project structure that currently exists.

From there, you can update `CLAUDE.md` as needed to define the project-specific instructions for Claude to follow whenever it generates or edits the project files.

## What if I already have an `AGENTS.md` file?

While Claude uses a file called `CLAUDE.md`, many other harnesses use the file named `AGENTS.md`, which does the same thing as `CLAUDE.md`. If you want to use other harnesses, you can simply symlink from `AGENTS.md` to `CLAUDE.md` so that your `CLAUDE.md` file is ready by harnesses expecting the name to be `AGENTS.md`.

```shell
cd my-project-home-directory
ln -s AGENTS.md CLAUDE.md       # assumes AGENTS.md already exists.
```

Another option is to put generic instructions in `AGENTS.md` and Claude specific instructions in `CLAUDE.md` and dynamically import `AGENTS.md` into `CLAUDE.md`.

```markdown
# CLAUDE.md

## First import the generic AGENTS.md file

@AGENTS.md

## Add Claude-specific instructions here
```

---
layout: doc
outline: [2, 4]
---

# The Superpowers Plugin Skills

The [Superpowers Plugin](https://github.com/obra/superpowers) is an open-source, agentic skills framework and software development methodology created by Jesse Vincent (obra) that transforms coding agents like Claude Code into structured, senior-level developers.  While it is a third-party project licensed under MIT, it was **officially accepted into the Anthropic Claude Code plugin marketplace on January 15, 2026**, confirming its quality and reliability for users.

## The 7 Phases

![7 Phases](/public/superpowers-7-phases.png)

The plugin implements a **7-phase professional development workflow** that includes Socratic brainstorming, micro-task planning, and strict **Test-Driven Development (TDD)** using a red-green-refactor cycle.  It automatically triggers skills to break down complex projects into manageable tasks, dispatch subagents for implementation, and perform code reviews, ensuring disciplined architecture and testing without manual intervention.

## Core Workflows

It provides composable skills for:

- **Test-Driven Development (TDD)** — enforcing red-green-refactor cycles where tests must fail before implementation
- **Systematic Debugging** — a four-phase methodology requiring root cause investigation before any fixes
- **Socratic Brainstorming** — refining requirements before coding begins
- **Subagent-Driven Development** — parallel agents with built-in code review checkpoints

## Key Features

Key features and installation details include:

- **Workflow Structure**: It enforces a brainstorm-plan-implement cycle, using git worktrees for parallel task isolation and requiring passing tests before any code is committed.
- **Compatibility**: Although optimized for **Claude Code**, it also supports **Codex CLI**, **Codex App**, **GitHub Copilot CLI**, **Cursor**, **Gemini CLI**, and **OpenCode** with specific installation commands for each.
- **Cost**: The plugin is **completely free** with no hidden costs or subscription limits, suitable for both personal and commercial use.

## Installation

::: code-group

```shell [Anthropic Marketplace]
# From the official, built-in Anthropic Marketplace
/plugin install superpowers@claude-plugins-official
```

```shell [Superpowers Marketplace]
# From the Superpowers Marketplace
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

:::

## **The Basic Workflow**

1. **brainstorming** - Activates before writing code. Refines rough ideas through questions, explores alternatives, presents design in sections for validation. Saves design document.
2. **using-git-worktrees** - Activates after design approval. Creates isolated workspace on new branch, runs project setup, verifies clean test baseline.
3. **writing-plans** - Activates with approved design. Breaks work into bite-sized tasks (2-5 minutes each). Every task has exact file paths, complete code, verification steps.
4. **subagent-driven-development** or **executing-plans** - Activates with plan. Dispatches fresh subagent per task with two-stage review (spec compliance, then code quality), or executes in batches with human checkpoints.
5. **test-driven-development** - Activates during implementation. Enforces RED-GREEN-REFACTOR: write failing test, watch it fail, write minimal code, watch it pass, commit. Deletes code written before tests.
6. **requesting-code-review** - Activates between tasks. Reviews against plan, reports issues by severity. Critical issues block progress.
7. **finishing-a-development-branch** - Activates when tasks complete. Verifies tests, presents options (merge/PR/keep/discard), cleans up worktree.

**The agent checks for relevant skills before any task.** Mandatory workflows, not suggestions.

## The Nine Skills

There are nine skills over seven phases of SDLC.

![9 Skills](/public/superpowers-skills.png)

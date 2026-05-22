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

![Superpowers Workflows](/superpowers-skills-flow.png)

## Key Features

Key features and installation details include:

- **Workflow Structure**: It enforces a brainstorm-plan-implement cycle, using git worktrees for parallel task isolation and requiring passing tests before any code is committed.
- **Compatibility**: Although optimized for **Claude Code**, it also supports **Codex CLI**, **Codex App**, **GitHub Copilot CLI**, **Cursor**, **Gemini CLI**, and **OpenCode** with specific installation commands for each.
- **Cost**: The plugin is **completely free** with no hidden costs or subscription limits, suitable for both personal and commercial use.

### Skill Priority Order

1. Process skills first — these govern HOW to approach the work:
    - `superpowers:brainstorming` — before any creative/feature work
    - `superpowers:systematic-debugging` — before proposing any fix
    - `superpowers:writing-plans` — when you have multi-step requirements
2. Implementation skills second — these guide execution:
    - `superpowers:test-driven-development` — before writing implementation code
    - `superpowers:executing-plans` — when running a written plan
    - `frontend-design:frontend-design` — for UI/component work

### Common Triggers

| Situation                     | Skill to invoke                             |
| :---------------------------- | :------------------------------------------ |
| Building something new        | `brainstorming` → then implementation skill |
| Bug or test failure           | `systematic-debugging`                      |
| About to claim work is done   | `verification-before-completion`            |
| Multi-step implementation     | `writing-plans` → `executing-plans`         |
| Requesting a code review      | `requesting-code-review`                    |
| Code review feedback received | `receiving-code-review`                     |
| Completing a feature branch   | `finishing-a-development-branch`            |
| 2+ independent tasks          | `dispatching-parallel-agents`               |

## Compatibility

The Superpowers plugin works with the following harnesses:

- Claude Code
- Codex CLI
- Codex App
- Factory Droid
- Gemini CLI
- OpenCode
- Cursor
- GitHub Copilot CLI

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

See the official [Superpowers Plugin](https://github.com/obra/superpowers) GitHub repository for installation to other AI tools and harnesses.

## **The Basic Workflow**

1. **brainstorming** - Activates before writing code. Refines rough ideas through questions, explores alternatives, presents design in sections for validation. Saves design document.
2. **using-git-worktrees** - Activates after design approval. Creates isolated workspace on new branch, runs project setup, verifies clean test baseline.
3. **writing-plans** - Activates with approved design. Breaks work into bite-sized tasks (2-5 minutes each). Every task has exact file paths, complete code, verification steps.
4. **subagent-driven-development** or **executing-plans** - Activates with plan. Dispatches fresh subagent per task with two-stage review (spec compliance, then code quality), or executes in batches with human checkpoints.
5. **test-driven-development** - Activates during implementation. Enforces RED-GREEN-REFACTOR: write failing test, watch it fail, write minimal code, watch it pass, commit. Deletes code written before tests.
6. **requesting-code-review** - Activates between tasks. Reviews against plan, reports issues by severity. Critical issues block progress.
7. **finishing-a-development-branch** - Activates when tasks complete. Verifies tests, presents options (merge/PR/keep/discard), cleans up worktree.

**The agent checks for relevant skills before any task.** Mandatory workflows, not suggestions.

## The Skills

| Skill                          | Phase              | Description                                                                                           |
| :----------------------------- | :----------------- | :---------------------------------------------------------------------------------------------------- |
| brainstorming                  | Planning           | Socratic design refinement                                                                            |
| writing-plans                  | Planning           | Detailed implementation plans                                                                         |
| using-git-worktrees            | Setup              | Parallel development branches                                                                         |
| subagent-driven-development    | Setup              | Fast iteration with two-stage review (spec compliance, then code quality)                             |
| dispatching-parallel-agents    | Setup              | Concurrent subagent workflows                                                                         |
| executing-plans                | Implementation     | Batch execution with checkpoints                                                                      |
| test-driven-development        | Implementation     | RED-GREEN-REFACTOR cycle (includes testing anti-patterns reference)                                   |
| systematic-debugging           | Implementation     | 4-phase root cause process (root-cause-tracing, defense-in-depth, condition-based-waiting techniques) |
| verification-before-completion | Implementation     | Ensure it's actually fixed                                                                            |
| requesting-code-review         | Review             | Pre-review checklist                                                                                  |
| receiving-code-review          | Review             | Responding to feedback                                                                                |
| finishing-a-development-branch | Completion         | Merge/PR decision workflow                                                                            |
| writing-skills                 | Skills Development | Create new skills following best practices (includes testing methodology)                             |
| using-superpowers              | Help               | Introduction to the skills system                                                                     |

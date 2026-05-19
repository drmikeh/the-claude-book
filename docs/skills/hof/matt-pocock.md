---
layout: doc
outline: [2, 4]
---

# Matt Pocock Skills

Matt Pocock published a set of skills on his [GitHub repository](https://github.com/mattpocock/skills). One of the skills, the `/grill-me` skill, went viral.

## Skills Summary

Here is a summary of some of Matt's sklls:

| Skill                           | Description                                                                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `grill-me`                      | Interview the user relentlessly about a plan or design until reaching shared understanding.                                   |
| `grill-with-docs`               | Grilling session that challenges your plan against the existing domain model.                                                 |
| `tdd`                           | Test-driven development with red-green-refactor loop.                                                                         |
| `setup-matt-pocock-skills`      | Run before first use of `to-issues`, `to-prd`, `triage`, `diagnose`, `tdd`, `improve-codebase-architecture`, or `zoom-out`    |
| `to-prd`                        | Turn the current conversation context into a Product Requirements Document (PRD) and publish it to the project issue tracker. |
| `to-issues`                     | Break a plan, spec, or PRD into independent issues on the project issue tracker using tracer-bullet vertical slices.          |
| `zoom-out`                      | Tell the agent to zoom out and give broader context or a higher-level perspective                                             |
| `improve-codebase-architecture` | Find opportunities for improvement in a codebase, informed by the domain language in CONTEXT.md.                              |
| `caveman`                       | Ultra-compressed communication mode. Cuts token usage ~75% by dropping filler while keeping full technical accuracy.          |
| `handoff`                       | Compact the current conversation into a handoff document so another agent can continue the work.                              |
| `git-guardrails-claude-code`    | Set up Claude Code hooks to block dangerous git commands (push, reset --hard, clean, etc.) before they execute.               |
| `setup-pre-commit`              | Set up Husky pre-commit hooks with lint-staged, Prettier, type checking, and tests.                                           |

## Document Based Requirements Tracking

Several of these skills use a set of markdown files to guide the AI through making decisions and following workflows.

| File                                               | Description                                                           |
| -------------------------------------------------- | --------------------------------------------------------------------- |
| `CONTEXT.md`                                       | Defines a project's domain language.                                  |
| `CONTEXT-MAP.md`                                   | Used when a project has multiple CONTEXT.md files.                    |
| `docs/adr/` and any `src/\*/docs/adr/` directories | Stores previous Architecture Decision Records (ADRs).                 |
| `docs/agents/`                                     | Stores `issue-tracker.md`, `triage-labels.md`, and `domain.md`        |
| `.scratch/`                                        | sign that a local-markdown issue tracker convention is already in use |

## Installation

```sh
npx skills@latest add mattpocock/skills
```

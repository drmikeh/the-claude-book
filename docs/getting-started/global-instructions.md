---
layout: doc
outline: [2, 4]
---

# Global Instructions

There are two ways to setup Claude with global instructions: one for Claude Chat and Claude Cowork, and the other for Claude Code. By setting up these global instructions, you are configuring Claude to work according to your rules and preferences.

## Global Instructions for Claude Code

The `~/.claude/CLAUDE.md` file serves as global memory for Claude Code, applying across every project you work on. It's a good place for style preferences, editor configuration, or cross-project tooling knowledge. Claude merges this with any project-level `CLAUDE.md` files at session start.

### Best Practices

The global instructions for Claude Code should:

* define the highest policies, such as how Claude should behave in general.
* be agnostic of any project-specific requirements, such as tech stack rules and guidelines, which are better defined at project scope.

### Sample Global CLAUDE.md File

A good starting point is to consider Andrej Karpathy's `CLAUDE.md` guidelines:

1. Think before coding (Don’t assume. Don’t hide confusion. Surface tradeoffs)
2. Favor simplicity (Minimum code that solves the problem. Nothing speculative)
3. Make only surgical changes (Touch only what you must. Clean up only your own mess)
4. Be goal-driven (avoid vague plans with no verification)

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

## Global Instructions for Claude Chat and Claude Cowork

Global instructions for Claude Chat and Claude Cowork are managed under a user's profile settings and stored with the user's account. These settings are accessible from either the browser at [claude.ai](claude.ai) or the Desktop App. To reach the global instructions, from either the browser or the Desktop App, go to `Settings → General` and then fill in the "Instructions for Claude" text field.

### Sample Global Instructions for Claude Chat and Claude Cowork

Here is an example set of global instructions.

```text
I'm a software engineer with deep expertise, working primarily in TypeScript. I'm also an instructor specializing in software engineering and generative AI.

## How I like responses

- Balanced length — enough context to be useful, but no unnecessary padding
- Professional tone
- I'm a visual learner: use diagrams, structured layouts, and visual analogies whenever they help
- Use analogies to clarify complex concepts — especially when explaining something new or abstract
- Assume expert-level knowledge in software engineering; don't over-explain fundamentals unless I ask

## My main use cases

- Coding and technical work
- Research and analysis
- Learning and explanation

## For code

- default to TypeScript unless I specify otherwise
```

---
layout: doc
outline: [2, 4]
---

# Choosing a Model

Claude Code allows for selecting an LLM/model to use for planning and implementation.

## Model Tiers

| Alias      | Resolves to (Anthropic API)    | Best for                                    |
| ---------- | ------------------------------ | ------------------------------------------- |
| `opus`     | Opus 4.7                       | Complex reasoning, architecture, research   |
| `sonnet`   | Sonnet 4.6                     | Daily coding — best balance of quality/cost |
| `haiku`    | Haiku (latest)                 | Simple scripts, fast throwaway tasks        |
| `best`     | Same as `opus`                 | Convenience alias                           |
| `opusplan` | Opus (plan) → Sonnet (execute) | Hybrid: smart planning, efficient execution |

## How to Set the Model

Configuration is honored in this priority order:

```bash
# 1. During session (highest priority)
/model opus
/model sonnet          # interactive picker if no arg: /model

# 2. At startup
claude --model opusplan

# 3. Environment variable
export ANTHROPIC_MODEL=sonnet

# 4. Settings file (lowest priority)
# ~/.claude/settings.json
{ "model": "sonnet" }
```

**To persist a `/model` choice as your new default:** press `d` on the highlighted row in the interactive picker — it writes to your settings file.

---

## The `opusplan` Alias — Most Interesting Option

`opusplan` uses Opus during plan mode for complex reasoning and architecture decisions, then automatically switches to Sonnet for code generation and execution — giving you the best of both worlds. This is the sweet spot for complex feature work.

---

## Effort Levels (Orthogonal to Model)

Effort is a separate dial that controls _how much the model thinks per turn_, independent of which model you're on:

| Level    | Use when...                                                     |
| -------- | --------------------------------------------------------------- |
| `low`    | Latency-sensitive, scoped tasks                                 |
| `medium` | Cost-sensitive work, some quality tradeoff OK                   |
| `high`   | Intelligence-sensitive work                                     |
| `xhigh`  | Default on Opus 4.7; best for most coding + agentic tasks       |
| `max`    | Deep reasoning on demanding tasks — session only, can overthink |

```bash
/effort high
/effort xhigh     # Opus 4.7 default
```

**One-off override:** include `ultrathink` anywhere in your prompt — it triggers deeper reasoning for that turn without changing the session effort level.

## Extended Context (1M tokens)

Opus 4.7, Opus 4.6, and Sonnet 4.6 all support a 1M token context window. On Max, Team, and Enterprise plans, Opus is automatically upgraded to 1M context. Sonnet with 1M context requires usage credits on every plan.

```bash
/model opus[1m]
/model sonnet[1m]
```

## Practical Decision Framework

```
Is the task architectural / research-heavy?
  └─ Yes → opus or opusplan
  └─ No  → Is it simple/throwaway?
              └─ Yes → haiku
              └─ No  → sonnet (the sane default for ~90% of work)
```

For most daily coding sessions, `sonnet` with `xhigh` effort is the practical sweet spot. Reserve `opus` for when you're doing design work, deep debugging, or need architectural judgment.

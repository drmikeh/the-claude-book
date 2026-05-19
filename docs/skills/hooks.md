---
layout: doc
outline: [2, 4]
---

# Hooks

Hooks are a way to make Claude always do something whenever an event occurs.

Example: a `PostToolUse` Hook to always format a file after it is created or edited.

```json
"PostToolUse": [
    {
        "matcher": "Write|Edit",
        "hooks": [
            {
                "type": "command",
                "command": "bun run format || true"
            }
        ]
    }
]
```

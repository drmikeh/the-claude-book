---
layout: doc
outline: [2, 4]
---

# Prompt Caching

**Prompt caching** is an Anthropic API feature that lets you cache large, reused portions of a prompt (system prompts, documents, few-shot examples) so that subsequent requests referencing that cached content are faster and cheaper.

## How it works

Without caching, every API call reprocesses the entire input — even if 90% of it is identical across requests.

With caching, you mark a portion of your prompt as cacheable. Anthropic stores the computed KV (key-value) state of that content, and subsequent requests that hit the cache skip reprocessing it.

```
Request 1:  [System Prompt 5000 tokens] + [User message]  → full processing, cache written
Request 2:  [System Prompt 5000 tokens] + [User message]  → cache hit, only user msg processed
```

## When to use Prompt Caching

Prompt caching via `cache_control` is an **API-level feature** that you configure programmatically when making direct calls to the Anthropic API.

> [!INFO]
> When using **Claude Code CLI interactively** (i.e., just running `claude` and chatting), caching is handled **automatically and transparently** by Anthropic's infrastructure — you don't configure it yourself. Claude Code manages the conversation context and Anthropic's backend decides what to cache.

Prompt Caching is relevant when you're **building something with the SDK** — for example:

- A custom Claude Code **plugin/skill** that makes its own API calls
- A **slash command** implementation that calls the API programmatically
- An **MCP server** you've written that proxies requests
- A standalone **agentic script** invoked from the Claude Code environment

In those cases where you own the API call, you'd apply `cache_control` as shown.

| Context                         | Caching approach                              |
| ------------------------------- | --------------------------------------------- |
| Interactive `claude` CLI        | Automatic — nothing to configure              |
| Your own SDK/API code           | Manual `cache_control` on content blocks      |
| Claude Code plugins/MCP servers | Manual `cache_control` in your implementation |

## The mechanics

- You mark cache breakpoints using `"cache_control": { "type": "ephemeral" }` in your message content blocks
- The cache is keyed on the **exact content** up to that breakpoint — any change invalidates it
- Cache TTL is **5 minutes** (refreshed on each hit)
- Works on system prompts, user message content blocks, tool definitions, and documents

## Why it matters

| Metric   | Impact                                                             |
| -------- | ------------------------------------------------------------------ |
| Latency  | Significant reduction on cache hits (KV state is reused)           |
| Cost     | Cache writes cost ~25% more; cache reads cost ~90% less            |
| Best for | Large stable system prompts, RAG documents, few-shot example banks |

## Practical analogy

Think of it like **memoization at the token processing level** — the model has already "read and understood" your big context block, and you're reusing that intermediate computation rather than re-deriving it every call.

It's especially impactful for agentic workflows where the same large system prompt or document set is sent with every tool call iteration.

## Examples

Here are practical examples of prompt caching in Claude Code-style workflows:

### 1. Large System Prompt (Persistent Agent Persona)

Useful when your agent has extensive instructions, tool descriptions, or behavioral guidelines that don't change across turns.

```typescript
const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 8096,
    system: [
        {
            type: 'text',
            text: `You are an expert TypeScript architect with deep knowledge of...
             [3000+ tokens of stable instructions, conventions, constraints]`,
            cache_control: { type: 'ephemeral' },
        },
    ],
    messages: [{ role: 'user', content: userMessage }],
});
```

### 2. Large Codebase Context

Cache a set of source files you're repeatedly asking questions about — great for refactoring sessions or code review loops.

```typescript
const sourceFiles = await loadProjectFiles(); // e.g., 10k tokens of .ts files

const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 8096,
    messages: [
        {
            role: 'user',
            content: [
                {
                    type: 'text',
                    text: `Here is the codebase:\n\n${sourceFiles}`,
                    cache_control: { type: 'ephemeral' }, // cache the files
                },
                {
                    type: 'text',
                    text: userQuery, // "Why does AuthService throw here?" — not cached
                },
            ],
        },
    ],
});
```

Each follow-up question reuses the cached file context.

### 3. RAG Document Cache

When you've retrieved a large set of documents and will ask multiple questions against them in the same session:

```typescript
const retrievedDocs = await vectorSearch(query, { topK: 20 }); // large result set
const docText = formatDocsAsContext(retrievedDocs);

const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 4096,
    system: [
        {
            type: 'text',
            text: 'You are a helpful assistant. Answer only from the provided documents.',
            cache_control: { type: 'ephemeral' }, // cache system prompt
        },
    ],
    messages: [
        {
            role: 'user',
            content: [
                {
                    type: 'text',
                    text: docText,
                    cache_control: { type: 'ephemeral' }, // cache the docs separately
                },
                {
                    type: 'text',
                    text: userQuestion,
                },
            ],
        },
    ],
});
```

> You can have **multiple cache breakpoints** — Anthropic supports up to 4 simultaneously.

### 4. Few-Shot Example Bank

Cache a large set of input/output examples when doing structured generation (e.g., code transformation, classification):

```typescript
const fewShotExamples = `
  Input: [raw SQL] → Output: [TypeORM entity]
  ... [50 examples, ~6000 tokens]
`;

const response = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 2048,
    messages: [
        {
            role: 'user',
            content: [
                {
                    type: 'text',
                    text: fewShotExamples,
                    cache_control: { type: 'ephemeral' },
                },
                {
                    type: 'text',
                    text: `Now convert this:\n${newSqlInput}`,
                },
            ],
        },
    ],
});
```

## Key Pattern

In all these cases, the structure is the same:

```
[STABLE, LARGE content] ← cache_control here
[DYNAMIC, SMALL content] ← changes each request, not cached
```

The cache busts whenever the stable content changes, so keep it truly stable within a session window (remember the 5-minute TTL).

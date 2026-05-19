---
layout: doc
outline: [2, 4]
---

# Advisor Tool

The Advisor Tool (officially the _Advisor Strategy_) was launched in beta on April 9, 2026.

## TL;DR

It's a server-side "phone a friend" mechanism — your cheap executor model makes one API call and gets Opus-level guidance injected mid-stream, with no extra orchestration code on your end. Minimal config change, meaningful quality lift, lower net cost than running Opus solo.

## What It Is

The Advisor Tool is a Claude API capability that pairs Claude Opus as an advisor with Claude Sonnet (or Haiku) as the executor in a multi-step agentic task. Opus reviews the task, plans the steps, and supervises the work — while Sonnet/Haiku handles the per-step generation.

Think of it like a senior/junior engineering pairing on autopilot: the junior (Sonnet/Haiku) drives the work, and only escalates to the senior (Opus) when hitting genuine complexity — not for every decision.

## How It Works

The executor model drives the workflow — it reads tool results, iterates toward a solution, and generates final output. Only when it hits a reasoning wall does it consult Opus for a plan, a correction, or a stop signal. The mechanism is a server-side tool type `advisor_20260301`.

When the executor invokes the advisor tool, Anthropic's infrastructure transparently routes the full shared context to Opus. Opus returns a concise strategic response — typically 400–700 tokens — and the executor resumes. One API call, one billing event, zero separate orchestration.

This is the inversion of the classic orchestrator pattern — instead of Opus coordinating and delegating down, the executor handles tasks independently and escalates to Opus only at complex decision points, after which Opus returns a plan or corrective feedback and the executor resumes.

## Key Benchmark Results

Sonnet 4.6 with an Opus 4.6 advisor scored 74.8% on SWE-bench Multilingual, up from 72.1% for Sonnet alone (+2.7 points), while reducing cost per agentic task by 11.9%. Haiku 4.5 with an Opus advisor improved BrowseComp performance from 19.7% to 41.2% — more than a 2x gain.

The Haiku + Opus advisor result is the striking one: near-Sonnet quality at a fraction of the cost.

## How to Use It

**Beta header required on every request:**

```
anthropic-beta: advisor-tool-2026-03-01
```

**Tool configuration (added to your `tools` array):**

```json
{
    "type": "advisor_20260301",
    "name": "advisor",
    "model": "claude-opus-4-6",
    "max_uses": 3
}
```

**Primary model** is set to your executor — `claude-sonnet-4-6` or `claude-haiku-4-5`.

The advisor tool integrates directly into your existing tools array in the Messages API. Your agent can call web search, execute code, and consult Opus in the same request loop without any special configuration beyond adding the advisor tool entry and the beta header.

## Cost Model

The advisor tool itself has no separate access fee, but advisor tokens are billed at Claude Opus 4.6 rates and executor tokens at Sonnet or Haiku rates. Because Opus only generates 400–700 tokens per consultation while the executor handles full output at lower rates, total costs stay well below running Opus end-to-end.

## Availability

The advisor tool is available in beta natively on the Claude Platform. For Bedrock, the advisor tool can't run server-side, but proxy libraries like LiteLLM are implementing the orchestration so the user-facing API is identical.

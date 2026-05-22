---
layout: home

hero:
    name: 'Generative AI Glossary'
    tagline: Common concepts and terminology.
---

# Core Concepts

## Agent

An AI system that can perceive its environment, make decisions, and take actions autonomously to accomplish a goal. Unlike a simple chatbot that only responds to prompts, an agent can plan multi-step tasks, use tools, and adapt based on intermediate results.

## Sub-Agent

A specialized agent spawned by a parent (orchestrator) agent to handle a discrete subtask. The parent delegates work to sub-agents, collects their results, and synthesizes a final response. This pattern enables parallelism and separation of concerns — analogous to a manager delegating to individual contributors.

## Context

The accumulated information available to a model during inference, typically held in a _context window_. This includes the system prompt, conversation history, tool results, and any injected documents. Context is finite (measured in tokens) and is the primary "working memory" of an LLM.

## Context Window

The maximum amount of text (measured in tokens) a model can process at once. Everything outside this window is invisible to the model. Longer context windows allow richer, longer-running conversations and larger document inputs.

## Prompt

The input provided to a language model — instructions, questions, examples, or any combination. Prompt engineering is the practice of crafting inputs that reliably produce desired outputs.

## Prompt Caching

**Prompt caching** is an Anthropic API feature that lets you cache large, reused portions of a prompt (system prompts, documents, few-shot examples) so that subsequent requests referencing that cached content are faster and cheaper.

## System Prompt

A special prompt, typically invisible to end users, that sets the model's persona, rules, and behavioral constraints for a session. It's the first thing in the context window and has high influence over model behavior.

## Token

The atomic unit of text that LLMs process. A token is roughly 3–4 characters or 0.75 words in English. Models are priced and limited by token count, not word or character count.

---

# Architecture & Infrastructure

## MCP (Model Context Protocol)

An open protocol that standardizes how AI models connect to external tools, data sources, and services. MCP defines a client-server architecture where a model can call _MCP servers_ (tools like Gmail, Slack, databases) through a consistent interface — essentially a universal adapter layer for AI integrations.

## Harness

The scaffolding or runtime environment that manages an agent's execution loop — handling tool calls, routing results back to the model, enforcing safety guardrails, managing retries, and orchestrating sub-agents. The harness is to an agent what an operating system is to a program.

## Skill

A packaged, reusable prompt or workflow that encodes domain expertise and best practices for a specific task (e.g., "code review," "generate a PPTX," "write a runbook"). Skills are invoked by name and provide a structured, repeatable approach — like calling a well-tested function rather than writing logic from scratch each time.

## Tool / Function Calling

The ability for an LLM to invoke external functions or APIs — web search, file I/O, database queries, code execution, etc. The model outputs a structured call (name + arguments); the harness executes it and returns the result to the model's context.

## RAG (Retrieval-Augmented Generation)

A pattern where relevant documents are fetched from an external knowledge base and injected into the model's context before generation. RAG grounds the model's responses in up-to-date or domain-specific information without requiring fine-tuning.

## Embedding

A numerical vector representation of text that captures semantic meaning. Embeddings power similarity search — the backbone of RAG systems — by allowing "find text that means the same thing" rather than "find text that matches exactly."

## Vector Database

A database optimized for storing and querying embeddings. Given a query embedding, it returns the most semantically similar stored entries. Common examples: Pinecone, Weaviate, pgvector.

---

# Model Behavior

## Inference

The process of running a trained model to generate output from input. This is distinct from _training_ (adjusting model weights on data). Most production AI usage is inference only.

## Temperature

A sampling parameter (0–2 typically) that controls output randomness. Low temperature → more deterministic, predictable responses. High temperature → more creative, varied responses. A temperature of 0 makes the model nearly deterministic.

## Hallucination

When a model generates plausible-sounding but factually incorrect information. A known failure mode of LLMs, particularly for specific facts, citations, or recent events outside the training cutoff.

## Fine-Tuning

Continuing to train a pre-trained model on a smaller, domain-specific dataset to specialize its behavior. Less common than prompt engineering or RAG for most use cases due to cost and complexity.

## Grounding

Connecting model outputs to verified, external sources of truth to reduce hallucination. RAG, tool use, and citations are all grounding strategies.

---

# Agentic Patterns

## Orchestrator

The top-level agent or process that decomposes a goal into subtasks and coordinates sub-agents or tools to accomplish them. The orchestrator owns the plan; sub-agents own the execution.

## ReAct (Reason + Act)

A prompting pattern where the model alternates between _reasoning_ (thinking through what to do next) and _acting_ (calling a tool or producing output). Produces more reliable multi-step behavior than action-only approaches.

## Chain-of-Thought (CoT)

A prompting technique that instructs the model to "think step by step" before giving a final answer. Significantly improves accuracy on reasoning tasks by externalizing intermediate logic.

## Memory

Persistent storage that allows an agent to retain information across sessions or conversation turns. Contrasted with the in-session _context window_, memory survives restarts and can be selectively retrieved when relevant.

## Guardrails

Rules, filters, or classifiers that constrain model behavior — preventing harmful outputs, enforcing tone/policy compliance, or blocking unsafe tool calls. Can be enforced at the prompt, harness, or infrastructure level.

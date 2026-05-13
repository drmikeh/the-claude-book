---
layout: doc
---

![Where Agents Run](/where-agents-run.png)

# Where Agents Run

## **Local machine**

The three harnesses you mentioned (`claude` CLI, Desktop app, VS Code plugin) are all local process runners. They share the same underlying Claude Code runtime; the harness is just the UI wrapper. The Agent SDK also falls here if you're building a custom loop that runs on your own machine.

## **GitHub Actions runner**

The `anthropics/claude-code-action` runs on your own GitHub runner (standard GitHub-hosted or self-hosted). The action executes entirely on your infrastructure; Anthropic API calls go to whichever provider you configure.

It has two modes:

1. interactive - Claude responds to `@claude` mentions in PRs/issues - good for working feature requests and bug fixes.
2. automation mode - Claude is given a prompt in the workflow YAML and runs headlessly on every matching CI event - good for automating PR reviews.

## **Anthropic Managed Agents (beta)**

This is a pre-built, configurable agent harness that runs in Anthropic-managed infrastructure — best for long-running tasks and asynchronous work.

- Instead of building your own agent loop, tool execution, and runtime, you get a fully managed environment where Claude can read files, run commands, browse the web, and execute code securely.
- The four key concepts are:
    1. **Agent** (model + tools + MCP config)
    2. **Environment** (cloud container template)
    3. **Session** (a running instance)
    4. **Events** (SSE-streamed bidirectional messages). You can steer or interrupt a session mid-run.

## **Third-party cloud**

For enterprise environments, you can use Claude Code GitHub Actions with your own cloud infrastructure, which gives you control over data residency and billing.

- Supported providers include Amazon Bedrock, Google Vertex AI, and Microsoft Foundry.
- These are primarily relevant for the GitHub Actions use case, but also apply if you're building custom agent infrastructure on your own cloud account.

The key axis to reason about is **who owns the loop and the sandbox**:

- local means you do
- GitHub Actions means GitHub's runner infrastructure does (with your code driving it)
- Managed Agents means Anthropic handles the entire runtime
- Third-party cloud means you've delegated to AWS/GCP/Azure but still own the architecture.

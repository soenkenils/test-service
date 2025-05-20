# GitHub Copilot

## General Copilot Usage

### Don't let Copilot fly the plane 

You are the real pilot. Copilot is meant to be an assistant.
Let it generate code suggestions, not the complete code base!

### Use Copilot's tools

Don't use comments as prompts!
**Inline Chat (Cmd+I)** for suggestions
**Ghost Text** for suggestions
**Chat Window** for more general questions

### Slash Commands

Don't recreate existing prompts. Use predefined slash commands.

* `/explain`
* `/fix`
* `/doc`
* `/tests`

### Context is everything

Examples:

* `@workspace`
* `#file`, `#editor`, `#selection`, `#terminalSelection`

### The 3S Principle

3S = simple, specific, short

#### Simple

The more code Copilot writes, the higher the chance for hallucinations!
Break your solution in simple steps.

#### Specific

#### Short

## Agent Mode

Three options: Ask, Edit, Agent

* Ask: Provide answers in Chat.
* Edit: Same answer but Copilot creates files on their own.
* Agent: Is going to act a little bit like you would.

LLMs have training cutoff dates! Important: Provide the model with the context that it needs to be successful.

```shell
#fetch <url-to-documentation> Follow the instructions exactly
```

## MCP

MCP = Model Context Protocol

## Custom Instructions


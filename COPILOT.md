# GitHub Copilot Tipps & Tricks

## Understanding LLMs

### Context

Surrounding information that makes an LLM understand what you are talking about.
The more context you have, the higher the quality of the conversation.

### Tokens

In the world of LLMs text is broken down into units of tokens.
A unit can be a word, a part of a word, or even a single letter.
Too few tokens and the LLM may lack context, too many and the LLM can be overwhelmed.

### Limitations

LLMs rely on patterns and probabilities they were trained on.
Models are never perfect. They sometimes provide incorrect answers, also called hallucinations.

### Prompts

You can work with LLMs' power and limitations by combining everything into a prompt. A prompt gives a model context via tokens.

**Prompt Engineering** = term for crafting prompts.

## General Copilot Usage

### Don't Let Copilot Fly the Plane

You are the real pilot. Copilot is meant to be an assistant.
Let it generate code suggestions, not the complete code base!

### Use Copilot's Tools

Don't use code comments as prompts!
Use **Inline Chat (Cmd+I)** for suggestions.
Use **Ghost Text** for suggestions.
Use the **Chat Window** for more general questions.

### Use Slash Commands

Don't recreate existing prompts. Use predefined slash commands.

* `/explain` - Explains selected code or functionality
* `/fix` - Identifies and suggests fixes for bugs or issues
* `/doc` - Generates documentation for your code
* `/tests` - Creates unit tests for your functions or classes
* `/help` - Shows available commands and their usage
* `/new` - Creates new files or components
* `/commit` - Generates commit messages based on changes
* `/review` - Performs code review and suggests improvements

### Context is everything

Examples:

* `@workspace` - References your entire workspace/solution
* `#file` - References a specific file in your project
* `#editor` - References the currently open file in the editor
* `#selection` - References currently selected code
* `#terminalSelection` - References selected text from terminal output

### The 3S Principle

3S = simple, specific, short

#### Simple

The more code Copilot writes, the higher the chance for hallucinations!
Break your solution into simple steps. Instead of asking for a complete application, ask for individual components or functions. This reduces complexity and improves accuracy.

**Example:**
- ❌ "Create a complete e-commerce website with user authentication, shopping cart, and payment processing"
- ✅ "Create a user registration form with email validation"

#### Specific

Be precise about what you want. Include details about:
- Programming language and frameworks
- Expected input/output formats
- Error handling requirements
- Performance constraints
- Coding standards

**Example:**
- ❌ "Make this code better"
- ✅ "Optimize this Python function for better performance and add type hints"

#### Short

Keep prompts concise but informative. Long prompts can confuse the model and lead to unfocused responses. Aim for 1-3 sentences that clearly state your intent.

**Example:**
- ❌ "I have this function that processes user data and I need it to be faster because right now it's really slow when we have lots of users and it's causing problems in production and I think maybe we could use caching or something but I'm not sure what would be best..."
- ✅ "Optimize this user data processing function using caching to improve performance for high user loads"

## Agent Mode

Three options: Ask, Edit, Agent

* **Ask**: Provide answers in Chat without making changes to your files.
* **Edit**: Same answer but Copilot creates and modifies files on their own.
* **Agent**: Acts more autonomously, planning and executing multi-step tasks like you would.

**Hint:** LLMs have training cutoff dates! Important: Provide the model with the context that it needs to be successful.

```shell
#fetch <url-to-documentation> Follow the instructions exactly
```

## MCP (Model Context Protocol)

MCP = Model Context Protocol

MCP is a standardized protocol that allows AI models to connect to external data sources and tools. It enables Copilot to access real-time information, databases, APIs, and other services beyond its training data.

### Key Benefits:
- **Real-time data access**: Connect to live APIs, databases, and services
- **Extended capabilities**: Access tools like calculators, web browsers, or custom business systems
- **Standardized integration**: Consistent way to add new data sources and tools
- **Security**: Controlled access to external resources with proper authentication

### Common MCP Use Cases:
- Connecting to company databases for code generation
- Accessing API documentation for accurate integration code
- Real-time data analysis and reporting
- Custom tool integration (deployment scripts, monitoring systems)

### How to discover MCPs:

* Take a look at https://mcp.so/
* Search with https://www.perplexity.ai/
* Check GitHub repositories with "mcp" tag
* Explore vendor-specific MCP implementations

### Setting up MCP:
1. Install the MCP server for your desired service
2. Configure authentication and permissions
3. Add MCP configuration to your Copilot settings
4. Test the connection with simple queries

## Custom Instructions (`.github/copilot-instructions.md`)

**Purpose:** Repository-wide instructions and preferences that are automatically added to each chat request

**Characteristics:**

* Short, standalone instructions that add context or relevant information to supplement users' chat questions
* Automatically active with every Copilot Chat request
* A single file for the entire repository
* Focus on **coding standards and conventions**

**Example:**

```text
We use Bazel for managing our Java dependencies, not Maven, so when talking about Java packages, always give me instructions and code samples that use Bazel.

We always write JavaScript with double quotes and tabs for indentation, so when your responses include JavaScript code, please follow those conventions.

Our team uses Jira for tracking items of work.
```

## Shared Prompts (`.github/prompts/`)

**Purpose:** Reusable prompt templates for specific tasks

**Characteristics:**

* One or more prompt files containing user-defined instructions for specific tasks
* Must be called explicitly (e.g. with #prompt-name)
* Support placeholders and variables
* Focus on **specific workflows and tasks**

## Main Differences

| Aspect | copilot-instructions.md | Shared Prompts |
|--------|------------------------|----------------|
| **Activation** | Automatically with every chat request | Manually via `#prompt-name` |
| **Scope** | Repository-wide | Task-specific |
| **Number of files** | Single file | Multiple files possible |
| **Purpose** | Coding standards, conventions | Workflows, templates, specific tasks |
| **Variables** | No | Yes ({{variable_name}}) |

## Prompting Strategies

### Q&A Prompt

Help the model prompt you to get to the best prompts.

**Example:**
```
I want to create a user authentication system. Ask me questions to understand my requirements before generating code.
```

This approach lets Copilot gather necessary context through a conversation, leading to more accurate and relevant suggestions.

### Pros and Cons Prompt

Ask Copilot to evaluate different approaches before making recommendations.

**Example:**
```
What are the pros and cons of using JWT vs. session-based authentication for a Node.js API? Then recommend the best approach for my use case.
```

This helps you make informed decisions by understanding trade-offs.

### Stepwise Chain of Thought Prompt

Break complex problems into logical steps that Copilot can follow.

**Example:**
```
Help me implement user registration step by step:
1. First, create the database schema
2. Then, create the API endpoint
3. Finally, add input validation and error handling
```

This approach reduces errors and ensures all aspects are covered.

### Role Prompt

Ask Copilot to take on a specific role or perspective.

**Examples:**
```
Act as a senior security engineer and review this authentication code for vulnerabilities.

As a performance optimization expert, suggest improvements for this database query.

From the perspective of a new team member, explain how this codebase is structured.
```

Role prompts leverage specialized knowledge and provide focused expertise.
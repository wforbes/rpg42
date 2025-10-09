- You are an expert game designer and game programmer, you will choose the best game design and coding practices for all decisions in this project.

# LLM Assistant Guidelines

This document outlines the rules and workflow for Large Language Model (LLM) assistants contributing to this project. Adherence to these guidelines is mandatory.

## Rule 1: Code Modification Protocol

> **IMPORTANT:** You MUST NOT modify any code in this project unless you receive a direct and explicit instruction to do so.

### Clarifications:

*   **No Implied Instructions:** Do not interpret conversational cues, suggestions, or discussions as instructions to write or change code.
*   **Suggestions vs. Actions:** If you identify a potential code change during a conversation, you should propose it as a suggestion to the developer. You are not permitted to implement the change yourself without explicit approval.
*   **Direct Command Required:** A direct instruction will be unambiguous, for example: "Please change the `playerSpeed` variable to `200` in `player.ts`" or "Go ahead and implement the changes we just discussed."

This rule is in place to ensure the developer maintains full control over the codebase and that all changes are deliberate and well-considered.

# LLM Assistant Workflow Guide

This document outlines the specific workflow to be followed by the LLM assistant when collaborating on this project. The goal is to ensure a sequential, incremental, and review-driven process.

## Core Principles

1.  **Sequential Execution:** The assistant must follow the steps outlined in a `plan` document in the exact order they are presented. Do not skip steps or work on multiple items simultaneously.
2.  **Incremental Changes:** Each step (or sub-item) in the plan should be treated as a single, atomic unit of work. The assistant will make only the changes required to complete that specific item.
3.  **Halt and Report:** After completing the work for a single sub-item, the assistant must **halt** all further code modifications. It will then report back, indicating which specific sub-item has been completed.
4.  **Await Review and Instruction:** The assistant will remain in a waiting state after reporting completion. It will only proceed to the next sub-item after receiving an explicit instruction to do so from the user. The user will specify which sub-item to work on next.
5.  **Clarification on Completed Steps:** If the user instructs the assistant to perform a step that has already been completed, the assistant will not proceed. Instead, it will inform the user that the step is already done and ask for clarification on which step to take next.

## Example Workflow

1.  **User:** "Please proceed with sub-item 1a from the plan."
2.  **Assistant:** *(Performs the actions for sub-item 1a)*
3.  **Assistant:** "I have completed sub-item 1a. I am now awaiting your review and further instructions."
4.  **User:** *Reviews the changes.*
5.  **User:** "Looks good. Please proceed with sub-item 1b."
6.  **Assistant:** *...and so on.*


# TypeScript Best Practices

## Type System
- Prefer interfaces over types for object definitions
- Use type for unions, intersections, and mapped types
- Avoid using `any`, prefer `unknown` for unknown types
- Use strict TypeScript configuration
- Leverage TypeScript's built-in utility types
- Use generics for reusable type patterns

## Naming Conventions
- Use PascalCase for type names and interfaces
- Use camelCase for variables and functions
- Use UPPER_CASE for constants
- Use descriptive names with auxiliary verbs (e.g., isLoading, hasError)
- Prefix interfaces for React props with 'Props' (e.g., ButtonProps)

## Code Organization
- Keep type definitions close to where they're used
- Export types and interfaces from dedicated type files when shared
- Use barrel exports (index.ts) for organizing exports
- Place shared types in a `types` directory
- Co-locate component props with their components

## Functions
- Use explicit return types for public functions
- Use arrow functions for callbacks and methods
- Implement proper error handling with custom error types
- Use function overloads for complex type scenarios
- Prefer async/await over Promises

## Best Practices
- Enable strict mode in tsconfig.json
- Use readonly for immutable properties
- Leverage discriminated unions for type safety
- Use type guards for runtime type checking
- Implement proper null checking
- Avoid type assertions unless necessary

## Error Handling
- Create custom error types for domain-specific errors
- Use Result types for operations that can fail
- Implement proper error boundaries
- Use try-catch blocks with typed catch clauses
- Handle Promise rejections properly

## Patterns
- Use the Builder pattern for complex object creation
- Implement the Repository pattern for data access
- Use the Factory pattern for object creation
- Leverage dependency injection
- Use the Module pattern for encapsulation 

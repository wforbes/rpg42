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

## Rule 2: LLM Assistant Workflow Guide

This document outlines the specific workflow to be followed by the LLM assistant when collaborating on this project. The goal is to ensure a sequential, incremental, and review-driven process.

### Core Principles

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

# Planning & Task Sequencing Principles

This section outlines the rules for how planning documents should be structured to ensure an efficient, testable, and incremental development workflow.

## Rule 3: The Principle of Vertical Slicing & Immediate Testability

> **IMPORTANT:** Plans MUST be structured as granular, end-to-end "vertical slices" of functionality. Each step must result in a small, immediately verifiable change. Avoid planning broad, horizontal layers of interdependent code that cannot be tested until all layers are complete.

### Clarifications:

*   **Build Just-In-Time:** Do not plan to build an entire abstract system (e.g., a complete data access layer, a full state management store, a comprehensive set of UI components) before it is needed. Instead, build only the specific methods, state variables, or components required for the immediate user-facing feature being implemented.
*   **Ensure Immediate Feedback:** Each task, or a very small group of tasks, should result in a testable outcome. This creates a tight feedback loop to catch errors early. A testable outcome can be:
    *   A visible UI change that renders correctly.
    *   A verifiable `console.log` from a backend function.
    *   A specific database record being created or updated.
    *   A component that appears or disappears based on a state change.
*   **Follow the Data Flow:** When planning features, the task sequence should follow the flow of data and user interaction. For a user-facing feature, this often means starting with the UI and progressively building out the backend logic that supports it. This aligns the automated development process with the natural, iterative way a human developer works.

### Example: Planning a Sign-Up Form

#### **INCORRECT (Horizontal Layers - AVOID THIS):**

1.  **Plan A:** Build the entire data access layer for all user operations (create, read, update, delete).
2.  **Plan B:** Build the entire validation layer with all Zod schemas for all user-related forms.
3.  **Plan C:** Build the static UI for the sign-up form.
4.  **Plan D:** Connect the UI to the validation and data layers.

*   **Problem:** The work in Plan A and B is abstract and untestable until Plan D. Errors made in these foundational layers are only discovered late in the process, making them harder to fix and leading to wasted effort.

#### **CORRECT (Vertical Slice - USE THIS):**

1.  **Step 1: Build the UI.** Create the static HTML for the sign-up form.
    *   *Testable Outcome:* The page renders correctly in the browser.
2.  **Step 2: Create a Placeholder Action.** Make the form submit to a backend action that only `console.log`s the data.
    *   *Testable Outcome:* Submitting the form logs the expected data to the server console.
3.  **Step 3: Define and Wire Up Validation.** Add the necessary validation libraries and connect them to the form.
    *   *Testable Outcome:* Typing invalid data in the form fields displays the correct error messages.
4.  **Step 4: Build *only* the `createUser` method.** Implement the *single* repository method needed to save a new user.
    *   *Testable Outcome:* This specific piece of the data layer can be unit-tested in isolation.
5.  **Step 5: Connect the Action to the Database.** Update the form action to call the `createUser` method.
    *   *Testable Outcome:* Successfully submitting the form creates a new user record in the database.

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

## Rule 4: Library and Dependency Protocol

> **IMPORTANT:** When working with third-party libraries, especially those with rapid development cycles (e.g., UI frameworks, bundlers), you MUST NOT rely solely on your internal knowledge. Your primary source of truth is always the official documentation for the specific version listed in the project's `package.json`.

**### Core Principles:**

*   **Verify, Then Act:** Before implementing any feature using a library, first verify the correct implementation patterns and API usage in the official documentation. State the library and version you are referencing in your reasoning.
*   **Trust the User's Context:** If the user provides a link to documentation, it immediately becomes the authoritative source. Discard any conflicting internal knowledge and align your approach with the provided document.
*   **Debug by Questioning Assumptions:** If an implementation fails, your first debugging step is to question your own assumptions about the library's API. Re-consult the official documentation *before* assuming the issue is with the environment, cache, or configuration.
*   **Explicitly State Dependencies:** When proposing a plan involving new libraries, explicitly state the library and version you intend to use (e.g., "For this task, I will use `library-name@v5.2.1`"). 

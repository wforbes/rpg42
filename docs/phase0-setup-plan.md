# Phase 0 Plan: Project Setup & Dependencies

This document outlines the initial setup tasks required to prepare the **Next.js** project for development. The goal is to establish our core toolset, styling foundation, and project documentation before we begin building features in Phase 1.

## 0a. Project Documentation

The first step is to ensure the project's purpose and context are clear to any developer (including our future selves).

*   `[x]` **0a-1. Update README.md**: Clean up the default Next.js README in the `client/` directory.
    *   Add a clear and concise description of the project: "rpg42 is a 2D retro-style RPG where players build their coding skills through in-game quests and challenges."
    *   Include a "Project Status" section explaining that this is a full rewrite of an older JavaFX project called 'Omnia'.
    *   Link to the original Omnia repository: `https://github.com/wforbes/Omnia`.

## 0b. UI & Styling Foundation

Next, we will install and configure **Mantine**, our chosen UI library, to establish a consistent look and feel for the application.

*   `[x]` **0b-1. Install Mantine UI**: Follow the official Next.js installation guide to add Mantine to the project.
*   `[x]` **0b-2. Configure PostCSS**: Configure the `postcss.config.mjs` file to support Mantine's styling system alongside Tailwind CSS.
*   `[x]` **0b-3. Set up Mantine Provider**: Wrap the root layout in `MantineProvider` to enable themeing and other context-based features throughout the application.

## 0c. Recommended Dependencies: Forms & Validation

To build robust and secure authentication forms in Phase 2, we need powerful tools for data validation and form state management.

*   `[x]` **0c-1. Install Zod**: Install `zod`.
    *   **Justification**: Zod is the industry standard for TypeScript-first schema declaration and validation. We will use it on the server-side within our Next.js Route Handlers (API routes) to validate all user input before it touches our database.
*   `[x]` **0c-2. Install Mantine Form**: Use the `@mantine/form` package, which is already installed.
    *   **Justification**: This is the official form management library for Mantine. It integrates seamlessly with Mantine components and has a first-party adapter for using Zod for validation (`zodResolver`). This provides a robust, type-safe solution for handling complex forms like signup and login.

## 0d. Recommended Dependencies: Utilities & Icons

These are small, quality-of-life libraries that will make development cleaner and more efficient.

*   `[x]` **0d-1. Install Class Merging Utilities**: Install `clsx` and `tailwind-merge`.
    *   **Justification**: When building components, we often need to apply classes conditionally. These utilities provide a clean way to manage complex and conditional class strings and intelligently merge conflicting Tailwind CSS classes.
*   `[ ]` **0d-2. Install Icon Library**: Install `@tabler/icons-react`.
    *   **Justification**: We will need icons for UI elements. `@tabler/icons-react` is the icon set recommended and maintained by the Mantine team. They are designed to work perfectly with Mantine components.

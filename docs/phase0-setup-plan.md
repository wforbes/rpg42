# Phase 0 Plan: Project Setup & Dependencies

This document outlines the initial setup tasks required to prepare the SvelteKit project for development. The goal is to establish our core toolset, styling foundation, and project documentation before we begin building features in Phase 1.

## 0a. Project Documentation

The first step is to ensure the project's purpose and context are clear to any developer (including our future selves).

*   `[ ]` **0a-1. Update README.md**: Clean up the default SvelteKit README in the `rpg42/` directory.
    *   Add a clear and concise description of the project: "rpg42 is a 2D retro-style RPG where players build their coding skills through in-game quests and challenges."
    *   Include a "Project Status" section explaining that this is a full rewrite of an older JavaFX project called 'Omnia'.
    *   Link to the original Omnia repository: `https://github.com/wforbes/Omnia`.

## 0b. UI & Styling Foundation

Next, we will install and configure Skeleton, our chosen UI library, to establish a consistent look and feel for the application.

*   `[ ]` **0b-1. Install Skeleton UI**: Follow the official SvelteKit installation guide to add Skeleton to the project. This will involve installing `@skeletonlabs/skeleton` and `@skeletonlabs/tw-plugin`.
*   `[ ]` **0b-2. Configure Tailwind CSS**: Create and configure the `tailwind.config.js` and `postcss.config.js` files to integrate the Skeleton plugin and theme.
*   `[ ]` **0b-3. Select a Theme**: Choose the 'cerberus' theme.
*   `[ ]` **0b-4. Create App Layout**: Modify the root `+layout.svelte` to initialize the Skeleton `storePopup` and other global components, and set up the basic HTML document structure (`<head>`, `<body>`, etc.) as recommended by the Skeleton docs.

## 0c. Recommended Dependencies: Forms & Validation

To build robust and secure authentication forms in Phase 2, we need powerful tools for data validation and form state management.

*   `[ ]` **0c-1. Install Zod**: Install `zod`.
    *   **Justification**: Zod is the industry standard for TypeScript-first schema declaration and validation. We will use it on the server-side within our SvelteKit actions to validate all user input (e.g., ensuring an email is a valid email format, a password meets complexity requirements) before it ever touches our database.
*   `[ ]` **0c-2. Install SvelteKit-Superforms**: Install `sveltekit-superforms` and its Zod adapter, `zod-form-data`.
    *   **Justification**: This is a critical library for SvelteKit. It dramatically simplifies form handling by integrating our `zod` schemas directly with our Svelte components. It handles all the boilerplate for us: type safety, client-side validation that mirrors server-side rules, error message display, and maintaining form state without a full page reload. This will save a tremendous amount of time and effort when building the signup and login pages.

## 0d. Recommended Dependencies: Utilities & Icons

These are small, quality-of-life libraries that will make development cleaner and more efficient.

*   `[ ]` **0d-1. Install Class Merging Utilities**: Install `clsx` and `tailwind-merge`.
    *   **Justification**: When building components, we often need to apply classes conditionally (e.g., `class:btn-primary={isPrimary}`). These utilities provide a clean way to manage complex and conditional class strings and intelligently merge conflicting Tailwind CSS classes (e.g., merging `px-2` and `px-4` into just `px-4`). The Skeleton team highly recommends them.
*   `[ ]` **0d-2. Install Icon Library**: Install `lucide-svelte`.
    *   **Justification**: We will need icons for UI elements like buttons, navigation links, and alerts. `lucide-svelte` is a popular, lightweight, and tree-shakeable icon set that is very easy to use within Svelte components and is styled with `currentColor` by default, making it easy to integrate with Tailwind's text color utilities.

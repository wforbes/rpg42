# Phase 1 Plan: Web Application Shell

This document outlines the tasks required to build the basic user-facing shell of the `rpg42` web application. The goal is to create the main layout, a simple marketing page, and the global navigation before tackling the authentication system in Phase 2.

## 1a. Global Layout & Components

First, we will establish the consistent look and feel of the entire application.

*   `[ ]` **1a-1. Implement Root Layout**: Modify the `src/routes/+layout.svelte` file to implement the basic structure of the site using Skeleton's layout components.
*   `[ ]` **1a-2. Create App Bar Component**: Create a reusable component for the main application navigation bar (`<AppBar>` from Skeleton).
    *   It should display the site title, "rpg42".
    *   It should have placeholder navigation links for "Home", "Login", and "Sign Up".
*   `[ ]` **1a-3. Implement Light/Dark Mode Toggle**: Add the "light switch" toggle to the App Bar to allow users to switch between light and dark themes, following the Skeleton cookbook guide.

## 1b. Marketing & Home Page

Next, we will build the public-facing landing page for the application.

*   `[ ]` **1b-1. Design Home Page**: Update the root `src/routes/+page.svelte` to serve as the marketing/landing page.
*   `[ ]` **1b-2. Add Marketing Copy**: Include the placeholder marketing text: *"rpg42 is a mysterious game about a quest to learn the secrets of the universe through building your coding skills in an epic retro-style adventure."*
*   `[ ]` **1b-3. Add Call to Action**: Add "Sign Up" and "Login" buttons that will eventually link to the authentication pages.

## 1c. Routing & Page Setup

Finally, we'll create the empty pages for the authentication flow and the game itself, which will be filled in during later phases.

*   `[ ]` **1c-1. Create Authentication Routes**: Create the directory structure and placeholder `+page.svelte` files for the following routes:
    *   `/login`
    *   `/signup`
*   `[ ]` **1c-2. Create Game Route**: Create the directory structure and a placeholder `+page.svelte` for the main game route:
    *   `/game`
*   `[ ]` **1c-3. Link Navigation**: Update the App Bar component to correctly link to the new `/login` and `/signup` pages.

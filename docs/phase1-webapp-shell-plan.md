# Phase 1 Plan: Web Application Shell

This document outlines the tasks required to build the basic user-facing shell of the `rpg42` web application. The goal is to create the main layout, a simple marketing page, and the global navigation before tackling the authentication system in Phase 2.

## 1a. Global Layout & Components

First, we will establish the consistent look and feel of the entire application using Mantine's `AppShell`.

*   `[x]` **1a-1. Implement AppShell Layout**: Modify the `app/layout.tsx` file to use Mantine's `<AppShell>` component as the root layout. This will provide a consistent structure with a header, main content area, etc.
*   `[x]` **1a-2. Create Header Component**: Create a reusable component for the main application header (e.g., `app/components/Header.tsx`).
    *   It should display the site title, "rpg42", using a Mantine `<Title>` component.
    *   It should contain placeholder navigation links for "Home", "Login", and "Sign Up". These will be Mantine `<Button>` or `<Anchor>` components that will later use Next.js's `<Link>`.
*   `[x]` **1a-3. Implement Light/Dark Mode Toggle**: Add a `ColorSchemeToggle` component to the header that uses Mantine's `useMantineColorScheme` hook to switch between light and dark themes.

## 1b. Marketing & Home Page

Next, we will build the public-facing landing page for the application.

*   `[x]` **1b-1. Design Home Page**: Update the root `app/page.tsx` to serve as the marketing/landing page.
*   `[x]` **1b-2. Add Marketing Copy**: Inside a Mantine `<Container>` and `<Text>` component, include the placeholder marketing text: *"rpg42 is a mysterious game about a quest to learn the secrets of the universe through building your coding skills in an epic retro-style adventure."*
*   `[x]` **1b-3. Add Call to Action**: Add "Sign Up" and "Login" buttons (using Mantine `<Button>`) that will eventually link to the authentication pages.

## 1c. Routing & Page Setup

Finally, we'll create the empty pages for the authentication flow and ensure navigation works correctly.

*   `[ ]` **1c-1. Create Authentication Routes**: Create the directory structure and placeholder `page.tsx` files for the following routes:
    *   `app/login/page.tsx`
    *   `app/signup/page.tsx`
*   `[ ]` **1c-2. Link Navigation**: Update the Header component to use Next.js's `<Link>` component within the Mantine buttons/anchors to correctly link to the new `/`, `/login`, and `/signup` pages.
*   `[ ]` **1c-3. Confirm Game Route**: Ensure the existing `/game` route at `app/game/page.tsx` is still functional.

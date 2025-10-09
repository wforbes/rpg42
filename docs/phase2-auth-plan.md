# Phase 2 Plan: Authentication & Data Layer

This document outlines the tasks for implementing the full authentication system. The tasks are ordered to follow a granular, "frontend-to-backend" workflow, ensuring each step is a small, testable increment.

## 2a. User Sign Up

Our goal is to create a fully functional, validated sign-up form that persists new users to the database.

*   `[ ]` **2a-1. Create the UI Form**: In the `/signup` route, build the static HTML form using Skeleton components. It should have fields for `username`, `email`, and `password`, and a submit button. At this stage, it won't do anything.
*   `[ ]` **2a-2. Create a Placeholder Action**: In `src/routes/signup/+page.server.ts`, create a basic SvelteKit form action. For now, its only job is to receive the form data and `console.log` it. This verifies the form submission mechanism is working.
*   `[ ]` **2a-3. Install Validation Libraries**: Run `pnpm add drizzle-zod sveltekit-superforms zod-form-data zod`.
*   `[ ]` **2a-4. Define the Validation Schema**: Create the file `src/lib/server/db/infrastructure/models/User.ts`. Inside, define and export an `InsertUserSchema` using Zod with validation rules for the form fields.
*   `[ ]` **2a-5. Wire up Form Validation**:
    *   In the `+page.server.ts`, import `superValidate` and use it in the `load` function and the form action to connect the form to the `InsertUserSchema`.
    *   In the `+page.svelte` file, implement the `superForm` logic to get client-side validation, display error messages, and manage the form state. At the end of this step, you should have a fully validated form that shows errors correctly.
*   `[ ]` **2a-6. Implement the Data Access Layer**: Build the full repository pattern as planned:
    *   Create the directory structure.
    *   Implement the `IClientProvider`, `DrizzleClientProvider`, and `IUserRepository`.
    *   Implement the `BaseRepository` and the `UserRepository` with a `create` method.
    *   Implement the `RepositoryFactory`.
*   `[ ]` **2a-7. Persist the User**: Now, update the signup form action. After successful validation, it will hash the user's password and call `RepositoryFactory.getUserRepository().create()` to save the new user to the database.

## 2b. Session Management

Our goal is to automatically log the user in after they sign up, secure the game page, and provide a way to log out.

*   `[ ]` **2b-1. Create Session on Sign Up**: Modify the signup action. After the user is successfully created in the database, use Lucia to create a session for them.
*   `[ ]` **2b-2. Redirect After Sign Up**: On successful session creation, redirect the user from `/signup` to the `/game` page.
*   `[ ]` **2b-3. Secure the Game Page**: Create `src/routes/game/+layout.server.ts`. In its `load` function, check for a valid user session. If one does not exist, redirect the user to the `/login` page.
*   `[ ]` **2b-4. Expose Session Data to App**: In the root `src/routes/+layout.server.ts`, add a `load` function that reads the user's session and returns the `user` object. This makes the user's login state available to all pages.
*   `[ ]` **2b-5. Create Logout Functionality**:
    *   Create a `/logout` server route (`+server.ts`) with a `POST` action that invalidates the user's session and redirects to the home page.
    *   In the main App Bar component, use the session data from the root layout to conditionally display a "Logout" button inside a `<form>`.
*   `[ ]` **2b-6. Add Logout Feedback**: Upon successful logout, use a redirect along with a query parameter or cookie to trigger a "You have been logged out" toast message on the home page.

## 2c. User Login

Our goal is to allow a returning, registered user to log in and access the game.

*   `[ ]` **2c-1. Create the UI Form**: In the `/login` route, build the static HTML form for `email` and `password`.
*   `[ ]` **2c-2. Create a Placeholder Action**: Create a basic form action in `/login/+page.server.ts` that logs the form data.
*   `[ ]` **2c-3. Define Validation Schema**: Create a new `LoginUserSchema` in `models/User.ts` for the login form.
*   `[ ]` **2c-4. Wire up Form Validation**: Integrate `sveltekit-superforms` into the login page and its server action to provide full validation.
*   `[ ]` **2c-5. Implement Login Logic**: Update the login action to perform the full authentication flow:
    *   Find the user by email using `RepositoryFactory.getUserRepository().findByEmail()`.
    *   Verify the password hash.
    *   If successful, create a session with Lucia and redirect to `/game`.
    *   If not, return a specific error message to the form for the user.

# Phase 2 Plan: Authentication & Data Layer (API Route & TanStack Query)

This document outlines the tasks for implementing the full authentication system using **API Routes and TanStack Query**. The tasks follow a granular, "frontend-to-backend" workflow.

## 2a. TanStack Query & API Setup

First, we will establish the foundational structure for client-side data fetching.

*   `[x]` **2a-1. Install Dependencies**: Run `pnpm add @tanstack/react-query axios`.
*   `[x]` **2a-2. Create Query Provider**: Create a new component (`app/providers.tsx`) that initializes a `QueryClient` and wraps its children in a `QueryClientProvider`.
*   `[x]` **2a-3. Update Root Layout**: Use the new `QueryProvider` in `app/layout.tsx` to make TanStack Query available to the entire application.
*   `[x]` **2a-4. Scaffold `services` Directory**: Create the `lib/services` directory and populate it with the initial file structure:
    *   `lib/services/api.ts` (for the shared Axios instance)
    *   `lib/services/query-keys.ts`
    *   `lib/services/user/mutations.ts`
    *   `lib/services/user/user_api.ts` (for fetcher functions)

## 2b. User Sign Up Frontend

Our goal is to create a fully functional, validated sign-up form that is ready to communicate with our backend.

*   `[x]` **2b-1. Create the UI Form**: In `app/(auth)/signup/page.tsx`, build the static UI form.
*   `[x]` **2b-2. Create Placeholder API Route**: In `app/api/auth/sign-up/route.ts`, create a placeholder `POST` handler.
*   `[x]` **2b-3. Create Sign Up Fetcher & Mutation**: Create the `signUp` fetcher and `useSignUpMutation` hook.
*   `[x]` **2b-4. Define Initial Validation Schema**: In `db/schema.ts`, define an initial Zod `insertUserSchema`.
*   `[x]` **2b-5. Wire up Form Validation & Mutation**: Connect the Mantine form to the Zod schema and the `useSignUpMutation` hook.

## 2c. Database & Drizzle Setup

Now, we will set up the database, schema, and tooling required to persist users.

*   `[x]` **2c-1. Install Dependencies**: Install Drizzle and its ecosystem: `pnpm add drizzle-orm pg drizzle-zod bcryptjs` and `pnpm add -D drizzle-kit dotenv @types/bcryptjs`.
*   `[x]` **2c-2. Configure Environment**: Create a `.env` file in the `client` directory and instruct the user to add their `DATABASE_URL`.
*   `[x]` **2c-3. Create Drizzle Config**: Create a `drizzle.config.ts` file in the `client` directory.
*   `[x]` **2c-4. Add `package.json` Scripts**: Add `db:generate` and `db:migrate` scripts to `package.json`.
*   `[x]` **2c-5. Define Drizzle Schema**: In `db/schema.ts`, define the `usersTable` with Drizzle, including fields for `id`, `username`, `email`, and `hashed_password`.
*   `[x]` **2c-6. Generate Zod Schema from Drizzle**: In `db/schema.ts`, replace the manual Zod schema with one generated from the Drizzle schema using `drizzle-zod`'s `createInsertSchema`.
*   `[x]` **2c-7. User Action: Generate & Migrate**: Instruct the user to run `pnpm db:generate` to create the migration file, followed by `pnpm db:migrate` to apply it to their local database, and then verify the `users` table exists in DBeaver.

## 2d. Implement Backend Sign Up Logic

With the database ready, we will implement the full backend logic.

*   `[x]` **2d-1. Implement the Data Access Layer**: Build the full repository pattern in `db/infra` (this is already done).
*   `[x]` **2d-2. Update Drizzle Client Provider**: In `db/infra/providers/DrizzleClientProvider.ts`, replace the placeholder client with a real Drizzle client instance connected to the database.
*   `[x]` **2d-3. Update `UserRepository`**: In `db/infra/repos/UserRepository.ts`, update the `create` method to use the Drizzle client to perform a real database insertion.
*   `[x]` **2d-4. Implement Full Sign Up API Logic**: Update the `sign-up` API route to validate the request, hash the password, and call the repository.

## 2e. Session Management Setup (Lucia Auth)

Now we will add a robust session management library to handle user authentication.

*   `[ ]` **2e-1. Install Dependencies**: Run `pnpm add lucia @lucia-auth/adapter-drizzle`.
*   `[ ]` **2e-2. Update Drizzle Schema**: In `db/drizzle/schema.ts`, add the `sessionTable` and `keyTable` required by the Lucia Drizzle adapter.
*   `[ ]` **2e-3. User Action: Generate & Migrate**: Instruct the user to run `pnpm db:generate` and `pnpm db:migrate` to add the new session tables to their database.
*   `[ ]` **2e-4. Initialize Lucia**: Create a new file `lib/auth.ts` to configure and export the Lucia instance, including the Drizzle adapter.
*   `[ ]` **2e-5. Add TypeScript Shim**: Create a `lucia.d.ts` file in the `lib` directory to provide TypeScript with definitions for the `Auth` and `User` objects.

## 2f. Finalize Sign-Up Flow

With session management in place, we will connect it to the sign-up process.

*   `[ ]` **2f-1. Create Session in API Route**: Update the `sign-up` API route. After successfully creating the user, use the Lucia instance to create a session and set the session cookie on the response.
*   `[ ]` **2f-2. Redirect After Sign Up**: In the `signup/page.tsx` component, use the `onSuccess` callback of the `useSignUpMutation` hook to programmatically redirect the user to the `/game` page using Next.js's `useRouter`.

## 2g. Secure Routes & Implement Logout

Our goal is to protect pages and provide a way for users to log out.

*   `[ ]` **2g-1. Secure the Game Page (Server-Side)**: Create `middleware.ts` to protect routes based on session validity.
*   `[ ]` **2g-2. Conditional UI in Header**: Conditionally render UI in the header based on authentication status.
*   `[ ]` **2g-3. Create Logout Functionality**: Implement the logout API route and connect it to the UI.

## 2h. User Login

Our goal is to allow a returning user to log in.

*   `[ ]` **2h-1. Create the UI Form**: Build the static UI form for login.
*   `[ ]` **2h-2. Create API Route, Fetcher, and Mutation**: Implement the necessary client and server components for login.
*   `[ ]` **2h-3. Define Validation Schema**: Create a `loginUserSchema`.
*   `[ ]` **2h-4. Wire up Form Validation & Mutation**: Connect the login form to the mutation.
*   `[ ]` **2h-5. Implement Login API Logic**: Implement the full backend logic for verifying credentials and creating a session.

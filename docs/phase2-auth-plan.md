# Phase 2 Plan: Authentication & Data Layer (API Route & TanStack Query)

This document outlines the tasks for implementing the full authentication system using **API Routes and TanStack Query**. The tasks follow a granular, "frontend-to-backend" workflow.

## 2a. TanStack Query & API Setup

First, we will establish the foundational structure for client-side data fetching.

*   `[ ]` **2a-1. Install Dependencies**: Run `pnpm add @tanstack/react-query axios`.
*   `[ ]` **2a-2. Create Query Provider**: Create a new component (`app/providers.tsx`) that initializes a `QueryClient` and wraps its children in a `QueryClientProvider`.
*   `[ ]` **2a-3. Update Root Layout**: Use the new `QueryProvider` in `app/layout.tsx` to make TanStack Query available to the entire application.
*   `[ ]` **2a-4. Scaffold `services` Directory**: Create the `lib/services` directory and populate it with the initial file structure:
    *   `lib/services/api.ts` (for the shared Axios instance)
    *   `lib/services/query-keys.ts`
    *   `lib/services/user/mutations.ts`
    *   `lib/services/user/user_api.ts` (for fetcher functions)

## 2b. User Sign Up

Our goal is to create a fully functional, validated sign-up form that persists new users.

*   `[ ]` **2b-1. Create the UI Form**: In `app/(auth)/signup/page.tsx`, build the static UI form using Mantine components for `username`, `email`, and `password`.
*   `[ ]` **2b-2. Create Placeholder API Route**: In `app/api/auth/sign-up/route.ts`, create a `POST` handler that accepts a request, logs its JSON body, and returns a placeholder success message.
*   `[ ]` **2b-3. Create Sign Up Fetcher & Mutation**:
    *   In `user_api.ts`, create an async `signUp` function that takes user data, calls the `/api/auth/sign-up` endpoint with `axios`, and returns the response.
    *   In `mutations.ts`, create a `useSignUpMutation` hook using `useMutation` from TanStack Query, pointing it to the `signUp` fetcher function.
*   `[ ]` **2b-4. Define Validation Schema**: In `lib/schema.ts`, define and export an `insertUserSchema` using Zod.
*   `[ ]` **2b-5. Wire up Form Validation & Mutation**:
    *   In the `signup/page.tsx` component, use the `@mantine/form` hook with `zodResolver` to validate the form against the schema.
    *   In the form's `onSubmit` handler, call the `mutate` function from the `useSignUpMutation` hook.
    *   Use the hook's `isPending` status to show a loading state on the submit button.
*   `[ ]` **2b-6. Implement the Data Access Layer**: Build the full repository pattern in `lib/db/infra` as previously planned.
*   `[ ]` **2b-7. Implement Sign Up API Logic**: Update the `sign-up` API route. It will now validate the request body against the Zod schema, hash the password, call `RepositoryFactory.getUserRepository().create()`, and then call `createSession()` to establish a user session.

## 2c. Session Management & Security

Our goal is to manage the user's session, redirect them, and secure protected routes.

*   `[ ]` **2c-1. Redirect After Sign Up**: In the `signup/page.tsx` component, use the `onSuccess` callback of the `useSignUpMutation` hook to programmatically redirect the user to `/game` using Next.js's `useRouter`.
*   `[ ]` **2c-2. Secure the Game Page (Server-Side)**: Create a `middleware.ts` file at the root of the `client` directory. In the middleware, use your `verifySession` function. If the session is invalid on a request to a protected route (e.g., `/game`), redirect the user to `/login`.
*   `[ ]` **2c-3. Conditional UI in Header**: In the `<Header>` component, use a server-side function to get the current session state. Conditionally render either "Login"/"Sign Up" buttons or a "Logout" button.
*   `[ ]` **2c-4. Create Logout Functionality**:
    *   Create an API route at `app/api/auth/logout/route.ts` that calls `deleteSession()`.
    *   Create a `useLogoutMutation` hook that calls this endpoint.
    *   Connect the "Logout" button in the header to this mutation, and use the `onSuccess` callback to redirect the user to the homepage.

## 2d. User Login

Our goal is to allow a returning user to log in.

*   `[ ]` **2d-1. Create the UI Form**: Build the static UI form in `app/(auth)/login/page.tsx`.
*   `[ ]` **2d-2. Create API Route, Fetcher, and Mutation**: Create the `login` API route, a `login` fetcher in `user_api.ts`, and a `useLoginMutation` hook in `mutations.ts`.
*   `[ ]` **2d-3. Define Validation Schema**: Create a `loginUserSchema` in `lib/schema.ts`.
*   `[ ]` **2d-4. Wire up Form Validation & Mutation**: Connect the Mantine form to the `useLoginMutation` hook.
*   `[ ]` **2d-5. Implement Login API Logic**: In the `login` API route, validate the input, find the user via the repository, verify the password, and create a session.

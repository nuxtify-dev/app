# Nuxtify App Context

This instructions file outlines the codebase structure, development standards, architectural paradigms, and commands for `@nuxtify/app` to maintain high-quality context for AI agents and development team.

## Project Overview

`@nuxtify/app` is a comprehensive Nuxt module that provides a single-page application (SPA) skeleton powered by **Nuxt 4**, **Vuetify** (integrated via `@nuxtify/core`), and **Firebase** (via `nuxt-vuefire`). It includes built-in layouts, pages, components, and utility composables to enable rapid SaaS and AI application prototyping.

### Core Stack
- **Framework:** Nuxt 4
- **UI Framework:** Vuetify (integrated via `@nuxtify/core`)
- **Backend/Auth Integration:** Firebase and Vuefire (`nuxt-vuefire`)
- **Testing:** Vitest and `@nuxt/test-utils`
- **Type Checking:** TypeScript and `vue-tsc`

---

## Architectural Paradigms & Codebase Structure

The codebase is organized into two main parts: the Nuxt module source (`src/`) and a demo playground for development and testing (`playground/`).

```
nuxtify-app/
├── src/                      # Module source code
│   ├── module.ts             # Module definition and setup entrypoint
│   ├── types/                # TypeScript type definitions (module options, etc.)
│   └── runtime/              # Code injected into the host Nuxt application
│       ├── components/       # Auto-registered Vue components (e.g., QuickSearch, signup)
│       ├── composables/      # Core/Firebase composables (e.g., state, auth, storage)
│       ├── layouts/          # Layouts (Default, Public, Signup)
│       ├── middleware/       # Route guards (authPublic, authUserOnly, authSuperAdminOnly)
│       ├── pages/            # Pre-packaged pages (Account, SignIn, SignUp, Admin)
│       ├── public/           # Shared static assets (logos, images)
│       └── utils/            # Shared utility functions (firebase, io)
├── playground/               # Live demo and development environment
└── test/                     # Vitest-based integration and unit tests
```

### 1. SPA/Client-Only Design
- **SSR Compatibility:** This module is explicitly designed for Client-Only SPA deployments.
- **Enforcement:** In `src/module.ts`, a check is performed on `nuxt.options.ssr`. If it is `true`, a warning is logged and SSR is programmatically disabled (`nuxt.options.ssr = false`).

### 2. Auto-import Registrations (Module Setup)
- **Components:** Injected using `addComponentsDir` pointing to `src/runtime/components`.
- **Composables & Utils:** Registered via `addImportsDir` from `src/runtime/composables`, `src/runtime/composables/firebase`, and `src/runtime/utils`.
- **Middlewares:**
  - `auth-public` (`src/runtime/middleware/authPublic.ts`)
  - `auth-user-only` (`src/runtime/middleware/authUserOnly.ts`)
  - `auth-super-admin-only` (`src/runtime/middleware/authSuperAdminOnly.ts`)
- **Route Rules:** Applied globally inside the module:
  - `/**` uses `auth-user-only`.
  - `/signin` & `/signup` use `auth-public`.
  - `/admin/**` uses `auth-super-admin-only`.

### 3. Layouts & Pages
- Inject default layouts: `default`, `public`, `signup`.
- Inject standard paths dynamically via `extendPages`:
  - `/` -> `IndexPage.vue`
  - `/signin` -> `SignIn.vue`
  - `/signup` -> `SignUp.vue`
  - `/signout` -> `SignOut.vue`
  - `/account` -> `AccountPage.vue`
  - `/admin` -> `AdminIndex.vue`
  - `/admin/users` -> `UsersIndex.vue`
  - `/admin/users/:uid` -> `UserIndex.vue`

---

## Development Conventions & Guidelines

### 1. Vue Composition API & SFC Syntax
- Always write Vue SFCs using `<script setup lang="ts">`.
- Lean heavily on modern reactivity features such as `defineModel()` for two-way state binding (e.g., as done in `QuickSearch.vue`).
- Do not add explicit imports for auto-imported Nuxt or Vue composables when writing user-facing code, but **explicitly import from `#imports`** when writing module runtime code (e.g., `import { defineNuxtRouteMiddleware, navigateTo } from '#imports'`).

### 2. Extensibility and Overrides
- Nuxtify is built to be easily customizable. A core concept is **progressive upgrading**.
- If a host application needs to override a component, layout, composable, or utility from Nuxtify, it simply creates a file with the **same name** in its local directory (e.g., local `components/QuickSearch.vue` will override the module's `QuickSearch.vue`). Keep this in mind when making structural changes.

### 3. Code Style and Linters
- Code formatting and style are governed by **ESLint flat config (v9)**.
- Ensure ESLint issues are resolved before opening a PR. Use `npm run lint` and `npm run lint:fix`.

---

## Tooling & Command Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Installs dependencies across the workspace. |
| `npm run dev:prepare` | Builds stubs and prepares the playground types (essential after cloning or making option/interface changes). |
| `npm run dev` | Starts the playground development environment with hot reload. |
| `npm run dev:build` | Compiles the playground Nuxt application. |
| `npm run prepack` | Compiles the Nuxt module into `dist/` ready for publication. |
| `npm run lint` | Runs ESLint validation across the repository. |
| `npm run lint:fix` | Runs ESLint and automatically corrects auto-fixable code style issues. |
| `npm run test` | Executes unit and integration tests via Vitest in one-shot mode. |
| `npm run test:watch` | Runs Vitest in interactive watcher mode. |
| `npm run test:types` | Performs full type checks across the source and the playground with `vue-tsc`. |

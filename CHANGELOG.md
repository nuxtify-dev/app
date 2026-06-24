# Changelog

## v0.3.5

[compare changes](https://github.com/nuxtify-dev/app/compare/v0.3.4...v0.3.5)

### 🚀 Enhancements

- Firebase table create slug overriding ([05bf6b1](https://github.com/nuxtify-dev/app/commit/05bf6b1))
- **playground:** Add polished demos ([852b00a](https://github.com/nuxtify-dev/app/commit/852b00a))

### 🩹 Fixes

- **types:** Duplicate type import ([e256dc5](https://github.com/nuxtify-dev/app/commit/e256dc5))
- **ui:** Alignment issue ([9a5c3d9](https://github.com/nuxtify-dev/app/commit/9a5c3d9))
- Make metadata update optional on file upload ([71b3b76](https://github.com/nuxtify-dev/app/commit/71b3b76))

### 📖 Documentation

- Use npmx.dev in readme ([a5523a3](https://github.com/nuxtify-dev/app/commit/a5523a3))

### 🏡 Chore

- Update release command ([bc290b5](https://github.com/nuxtify-dev/app/commit/bc290b5))
- **ci:** Update gh ci workflow ([8989399](https://github.com/nuxtify-dev/app/commit/8989399))
- Prefer nuxt to nuxi ([6ff97e0](https://github.com/nuxtify-dev/app/commit/6ff97e0))
- Spelling ([0c16d79](https://github.com/nuxtify-dev/app/commit/0c16d79))

## v0.3.4

- security: lock down all routes by default
- fix: query redirect param
- fix: use saveBlobAsFile
- fix(types): define slots in firebase file upload dialog
- ui: make links in admin user list secondary color
- refactor(playground): use app.config
- refactor: move signup legal text to component
- chore(deps): update firebase

## v0.3.3

- refactor: firebase list table, add itemsPerPage prop
- fix(ui): quick search items now wrap on mobile

## v0.3.2

- feat: dynamically pass slots to firebase list ([dee760f](https://github.com/nuxtify-dev/app/commit/dee760f))
- ui: wrap user menu in a div to allow for classes
- ui: update Google logo
- chore(deps): update firebase
- chore(deps): update csv-stringify

[compare changes](https://github.com/nuxtify-dev/app/compare/v0.3.1...v0.3.2)

## [0.3.1] - 2025-12-01

- ui: allow QuickSearch to be hidden by default
- ui: add margin below logo on sign in/up
- a11y: add aria label to help menu

## [0.3.0] - 2025-10-11

🚨 BREAKING CHANGES

Use getFirestoreConsoleUrl instead of getFirebaseConsoleUrl (note new call signature).

### Enhancements

- feat: add getCloudStorageConsoleUrl to admin users

### UI/UX

- ui: admin search box polish
- ui: sign in/up polish

### SEO

- seo: pages should only have one h1 tag
- seo: use useSeoMeta

### Refactors/DX

- refactor!: rename getFirebaseConsoleUrl to getFirestoreConsoleUrl
- refactor!: allow deep paths in console url
- refactor: add AdminUsersList component
- refactor: add AdminUsersDetail component
- dx: use signInWithPopup in dev

### Playground

- playground: add quick search
- playground: add app logo
- playground: add help menu

## [0.2.2] - 2025-09-26

- ui: add time to user fields

## [0.2.1] - 2025-09-13

🚨 BREAKING CHANGES

Use useFirebaseStorageURL instead of usePublicStorageUrl.

- refactor!: usePublicStorageUrl to useFirebaseStorageURL
- refactor: signout logic

## [0.2.0] - 2025-09-09

Add Firebase 12 support.

🚨 BREAKING CHANGES

Use /create instead of /new.

- chore(deps): update to firebase v12
- chore(deps): update csv-stringify
- refactor!: use /create instead of /new
- dx: add eslint warn import order rule

## [0.1.13] - 2025-08-22

- fix: timestampToString to formatDate

## [0.1.12] - 2025-08-22

🚨 BREAKING CHANGES

Use formatDate(yourTimestamp.toDate()) instead of timestampToString(yourTimestamp).

- remove!: timestampToString in favor of formatDate
- chore(deps): update nuxtify core

## [0.1.11] - 2025-08-04

- fix: merge, don't replace vuetify options

## [0.1.10] - 2025-08-04

- feat: allow overriding vuetify config
- ui: allow customizing delete button variant
- fix: show admin menu on mobile
- fix: make all /account routes require a login

## [0.1.9] - 2025-07-01

- fix: generalize Firestore delete field name
- refactor: use AppError component
- chore(deps): update nuxtify core

## [0.1.8] - 2025-06-20

- refactor: remove file-saver dependency

## [0.1.7] - 2025-06-20

- fix: saveAs import error

## [0.1.6] - 2025-06-20

- refactor: replace papaparse with csv-stringify

## [0.1.5] - 2025-06-20

- feat: add quick search to list view
- fix: papaparse import
- ui: make button bigger
- playground: add auth domain example

## [0.1.4] - 2025-06-19

- feat(ui): ability to customize upload button variant
- playground: add firebase page

## [0.1.3] - 2025-06-19

- fix: firebase signout
- ui: overflow menu polish
- ui: match sign up to sign in font size
- dx: allow for localhost firebase signin
- dx: better logging tag

## [0.1.2] - 2025-06-18

- fix: don't include extensions in middleware resolver

## [0.1.1] - 2025-06-17

- refactor: correctly extend nuxt config
- dx: use nuxt kit logger
- fix(build): @nuxt/kit implicit dependency warning

## [0.1.0] - 2025-06-17

- chore: install and configure Nuxt and Vuetify
- chore: setup dev environment (TypeScript, eslint, etc)
- docs: add readme and changelog
- feat: add initial set of features

## Meta

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and [Conventional Commits](https://www.conventionalcommits.org/).

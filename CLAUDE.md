# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

Monorepo with three sub-projects sharing a local package:

- **`expo/`** — React Native mobile app (iOS/Android) using Expo Router
- **`web/`** — Next.js web server (API backend + landing page + admin dashboard)
- **`shared/`** — Business logic shared by both, imported as `@appboiler/shared`

The `shared/` package is consumed via `file:../shared` entries in both `expo/package.json` and `web/package.json`. A symlink at `<project>/node_modules/@appboiler/shared` resolves to `../../../shared`.

## Commands

### Expo (mobile)
```bash
cd expo
npm run start          # Start Expo dev server
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator
npm run lint           # Expo lint
```

### Web (Next.js)
```bash
cd web
npm run dev            # Start dev server on 0.0.0.0
npm run build          # Production build
npm run lint           # Next.js lint
```

## Architecture

### What's included

A minimal, working cross-platform app scaffold:

- **Authentication** — Clerk (email/password, social SSO, password reset) wired in both clients
- **Subscriptions** — RevenueCat (iOS + Android) with purchase intent flow and subscription gating
- **Sync** — A simple pull/push protocol against MongoDB that demonstrates the record-merge pattern
- **Onboarding flow** — 6-step sample (currency picker → feature showcase → survey → signup → rating → paywall)
- **Settings** — User profile, currency selection (as a config example), export, account deletion
- **Landing page** + **admin dashboard** on the web side

The domain data type is a trivial **todo list** — intentionally simple, there only to exercise the sync plumbing end-to-end. Replace it with whatever your app actually does.

### Data model

MongoDB collections (on the web side, in `web/model/`):

- **`V2Todo`** — the sample record type (`todoId`, `ownerId`, `title`, `note`, `completed`, `completedAt`, `deletedAt`, `updatedAt`)
- **`V2User`** — per-user config (`userOnlineId`, `userPrimaryId`, `config`, `updatedAt`). The `config` field is free-form; it currently holds `defaultCurrency` and `tutorialPending`.
- **`UserInfo`** — Clerk-sourced display info (`userId`, `userLabel`, `userImageUrl`, `lastUpdated`), refreshed if stale > 5 days
- **`Feedback`** — submissions from the in-app feedback form
- **`SyncLog`** — audit log for sync calls

When adding a new record type: define the Mongoose schema in `web/model/`, include it in the pull/push endpoints, and add handling in the Redux reducer on the Expo side.

### Sync flow

The mobile app syncs via `GET /api/v2/sync/pull` and `POST /api/v2/sync/push`:

**Pull** — client sends a `since` timestamp; server returns all records updated after that timestamp that the user owns. Also returns `usersInfo` (always full, not filtered by `since`) and `config`.

**Push** — client sends arrays of changed records; server validates authorization and upserts each. `ownerId` is always set server-side, never trusted from the client. Records owned by another user are silently ignored.

Dirty state (local changes) triggers a sync after ~2 seconds (`SYNC_INTERVAL_WHEN_DIRTY`). Clean state syncs on a longer interval (`SYNC_INTERVAL_NOT_DIRTY`, currently 2h). See `expo/components/widgets/AccountSync.jsx` for the scheduling logic.

### Redux store (Expo)

Three slices in `expo/redux/`:

- **`todos`** (`todos.jsx`) — holds the raw records, config, pending changes queue, and derived view. Merging uses `updatedAt` timestamps — newer record wins. Delete is a soft delete (`deletedAt`) so other members/devices see the deletion on their next pull.
- **`sync`** (`sync.jsx`) — tracks `dirtyTimestamp`, `lastSyncTryTimestamp`, `lastSyncSuccessTimestamp`, `lastSyncFailTimestamp`
- **`purchase`** (`purchase.jsx`) — RevenueCat purchase intent

State is persisted with `redux-persist` + AsyncStorage. Action types live in `expo/redux/action.jsx`.

### Pending changes + sync completion

On save, a record is written both to the main list and to `pendingChanges`. On successful push, the server returns which IDs were saved and the client clears those from `pendingChanges`. On pull, if the server returned a record we had pending, we also clear it (the server has the authoritative version).

`V2_SYNC_PULL_COMPLETE` only clears `dirtyTimestamp` if no new saves happened during the sync cycle (compared against `lastSyncTryTimestamp`).

### Auth + session gating

`expo/components/providers/AppSessionProvider.tsx` wraps Clerk and RevenueCat and exposes a single hook (`useAppSession`) with signin/signup/SSO/signout helpers and the RevenueCat user state.

`expo/components/providers/AppRoutingGate.tsx` enforces routing based on auth state:
- Signed-out users → `/welcome`
- Signed-in users with pending purchase intent and no active subscription → `/process-purchase`
- All other routes → gated on `isUserSignedIn`

Both are applied per route-group layout (`_layout.jsx` files in `(tabs)`, `(config)`, `(start)`, etc.).

### Onboarding flow

Defined as an ordered array in `expo/app/(start)/onboarding.tsx`. The `ProgressDots` component in each onboarding page has a hardcoded `total={6}` and `completed={N}` — keep these in sync if you add or remove steps.

Steps: `CURRENCY` → `FEATURE_FAVORITES` → `SURVEY_GOAL` → `SIGN_UP` → `FEATURE_FEEDBACK` → `SUBSCRIPTION`.

The currency picker is a worked example of storing a value in `config` and syncing it to the server via the push endpoint. Replace it or repurpose the pattern for whatever configuration your app needs.

## Key conventions

- **Build numbers** are in `expo/app.json` — both `ios.buildNumber` (string) and `android.versionCode` (integer) must be bumped together.
- **Shared package imports** use `@appboiler/shared/<file>` (e.g. `@appboiler/shared/idUtil`). The shared package has no bundler or build step — files are consumed as-is.
- **Soft delete** — records have a `deletedAt` timestamp; the derived view filters them out, but they remain in `todoList` / in MongoDB so sync can propagate the deletion.
- **Server-controlled identity** — `ownerId` on records is set by the server (`$setOnInsert: { ownerId: userId }`). The client never sends a trusted `ownerId`.
- **Admin access** — the `/analytics` page on the web side checks `process.env.ADMIN_EMAIL` against the signed-in user, or allows anyone in development mode.

## Environment variables

### Web (`web/.env`)
- `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk auth. Both can be left blank in development: `@clerk/nextjs` auto-provisions a temporary dev instance (keyless mode) and shows a "Configure your application" prompt you can claim later.
- `MONGODB_URI` — MongoDB connection string
- `ADMIN_EMAIL` — email address allowed to access `/analytics` in production
- `NEXT_PUBLIC_GA_ID` — optional Google Analytics ID

### Expo (`expo/.env`)
- `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` — Clerk publishable key. Required — `@clerk/clerk-expo` does not support keyless mode. The easiest path is to boot the web app with keyless mode, claim the auto-provisioned Clerk instance, and copy the publishable key here.
- `EXPO_PUBLIC_API_URL` — base URL of the web backend
- `EXPO_PUBLIC_RC_APPLE_KEY`, `EXPO_PUBLIC_RC_GOOGLE_KEY` — RevenueCat API keys
- `EXPO_PUBLIC_PRO_FOR_TESTING` — set to `"true"` to simulate an active subscription

# AppBoiler

A cross-platform app starter: **Expo** mobile app + **Next.js** backend + **shared** business logic, with authentication, subscriptions, sync, and a working todo example wired end-to-end.

Use it as a starting point for a new app — swap the todo domain for whatever you're building.

---

## What's inside

**Mobile (Expo)**
- [Expo Router](https://docs.expo.dev/router/introduction/) with three tabs: Dashboard (todo list), Showcase (UI gallery), Settings
- [Clerk](https://clerk.com) authentication (email/password, password reset, SSO)
- [RevenueCat](https://revenuecat.com) subscriptions with a paywall flow
- Redux + redux-persist for state, with a simple pull/push sync against the backend
- 6-step onboarding flow (currency picker, feature showcase, survey, signup, rating, paywall)
- Settings screens, feedback modal, account deletion, data export
- NativeWind (Tailwind for RN) for styling

**Backend (Next.js)**
- Clerk middleware
- MongoDB via Mongoose
- Sync endpoints (`/api/v2/sync/pull`, `/api/v2/sync/push`)
- Feedback + account erase endpoints
- Landing page, privacy/terms pages, admin dashboard at `/analytics`
- iOS universal-links endpoint at `/.well-known/apple-app-site-association`

**Shared**
- A local `@appboiler/shared` package imported by both (symlinked via `file:../shared`)

---

## Structure

```
app-boiler/
├── expo/              # React Native (iOS/Android) app
│   ├── app/           # Expo Router screens
│   ├── components/    # UI + feature components (see CLAUDE.md for layout)
│   ├── redux/         # State slices (todos, sync, purchase)
│   ├── lib/           # Utilities
│   ├── app.config.js  # Reads identifiers from env
│   ├── eas.json       # EAS build profiles
│   └── .env           # Local dev env (gitignored)
├── web/               # Next.js backend + landing
│   ├── app/           # Route handlers, pages
│   ├── components/    # UI components
│   ├── lib/           # Server utilities
│   ├── model/         # Mongoose schemas
│   └── .env           # Local dev env (gitignored)
└── shared/            # Code imported by both clients
```

See [`CLAUDE.md`](./CLAUDE.md) for a deeper architectural tour.

---

## Prerequisites

- **Node.js** ≥ 20
- **npm** (or pnpm/yarn — pick one and stick with it)
- **Xcode** + iOS Simulator (for iOS dev)
- **Android Studio** + emulator (for Android dev)
- Accounts: [Clerk](https://clerk.com), [MongoDB Atlas](https://www.mongodb.com/atlas) (or local Mongo), [RevenueCat](https://revenuecat.com) — all have free tiers

---

## Quick start

```bash
# Clone and install
git clone <this-repo> my-app
cd my-app

cd shared && npm install && cd ..
cd web   && npm install && cd ..
cd expo  && npm install && cd ..

# Link the shared package into both consumers (one-time)
mkdir -p web/node_modules/@appboiler expo/node_modules/@appboiler
ln -sfn ../../../shared web/node_modules/@appboiler/shared
ln -sfn ../../../shared expo/node_modules/@appboiler/shared

# Copy env templates
cp web/.env.example    web/.env
cp expo/.env.example   expo/.env
cp expo/eas.json.example expo/eas.json

# Edit both .env files — minimum required values are MONGODB_URI (in web/.env)
# and EXPO_PUBLIC_API_URL (in expo/.env). Clerk can start in keyless mode with
# empty keys. See "Service setup" below.

# Run the web backend
cd web && npm run dev

# In another terminal, run the mobile app
cd expo && npm run ios       # or: npm run android, npm run start (Expo Go)
```

---

## Service setup

### 1. MongoDB

You need a MongoDB instance. Options:

- **MongoDB Atlas** (free tier): create a cluster, grab the connection string (`mongodb+srv://...`), drop it into `web/.env` as `MONGODB_URI`.
- **Local**: install MongoDB, set `MONGODB_URI=mongodb://localhost:27017/appboiler`.

No schema migration step — Mongoose creates collections on first write.

### 2. Clerk (authentication)

AppBoiler supports Clerk's **keyless mode** on the web side so you can start without any signup.

**Fastest path (dev, keyless):**
1. Leave both `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` blank in `web/.env`
2. Start the web server: `cd web && npm run dev`
3. Visit any page — a Clerk "Configure your application" prompt appears
4. Click it → sign into Clerk (or create an account) → **Claim application**
5. You now have a real dev instance; Clerk auto-populates temporary keys that persist in `.clerk/.tmp/` — once claimed, grab the real `pk_test_*` / `sk_test_*` from the dashboard and paste them into `web/.env`

**Then finish the Clerk setup (required):**

**2a. JWT custom claim** — AppBoiler's client and server both read the user's email from a custom `eml` claim. Create it:
1. Clerk dashboard → **Configure → Sessions → Customize session token**
2. Add this JSON claim:
   ```json
   { "eml": "{{user.primary_email_address}}" }
   ```
3. Save. Without this, `checkAuthorized()` in `web/lib/check.js` rejects every request.

**2b. Native application redirect URLs** (for the Expo app's SSO):
1. Clerk dashboard → **Configure → Native applications** → **Add URI**
2. Add:
   - `appboiler://sso-callback` (or whatever matches your `EXPO_APP_SCHEME`) — dev builds + standalone
   - `exp://localhost:8081/--/sso-callback` — Expo Go on simulator
   - `exp://<your-lan-ip>:8081/--/sso-callback` — Expo Go on a physical device

**2c. Enable social providers** (optional):
1. Clerk dashboard → **Configure → SSO Connections** → enable Google, Apple, etc.
2. For dev, Clerk provides shared dev OAuth credentials; for production you'll bring your own.

**2d. Copy the Publishable Key to Expo:**
- Copy the `pk_test_*` from Clerk → paste into `expo/.env` as `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`.
- (`@clerk/clerk-expo` does **not** support keyless mode — you always need a real key.)

### 3. RevenueCat (subscriptions)

RevenueCat manages in-app subscriptions and is harder to fake — plan to set this up once you want the paywall to actually work.

1. Sign up at [revenuecat.com](https://revenuecat.com)
2. **Create a Project** (one per app brand)
3. **Add two platforms** inside the project: iOS (App Store) and Android (Play Store). You'll need:
   - iOS: your Apple App Store Connect shared secret + bundle ID
   - Android: a Google Play service account JSON + package name
4. **Create an Entitlement** (e.g. `pro`) — this represents "has access to paid features"
5. **Create Products** in App Store Connect / Google Play — auto-renewing subscriptions
6. **Create an Offering** in RevenueCat — bind one or more products to the entitlement. Mark one as **Current**.
7. Grab keys from RevenueCat → **API Keys**:
   - `EXPO_PUBLIC_RC_APPLE_KEY` → the iOS App-specific API key (`appl_*`)
   - `EXPO_PUBLIC_RC_GOOGLE_KEY` → the Android App-specific API key (`goog_*`), or leave blank if Android-only later
   - `EXPO_PUBLIC_RC_ENTITLEMENT` → the entitlement identifier (e.g. `pro`)
   - `EXPO_PUBLIC_RC_YEARLY_PRODUCT_ID` → the store product identifier of the yearly plan (used by `SubscriptionPage.tsx` to pick which package to display)

**Dev without RevenueCat:** set `EXPO_PUBLIC_PRO_FOR_TESTING=true` in `expo/.env` — the app will behave as if the user has an active subscription.

### 4. Other optional setup

**Google Analytics (web):**
- Set `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` in `web/.env`. Leave blank to disable the GA snippet.

**Admin dashboard (`/analytics`):**
- Set `ADMIN_EMAIL` in `web/.env` to the email allowed to access it in production.
- In `NODE_ENV=development` the check is bypassed.

**iOS universal links:**
- Served at `/.well-known/apple-app-site-association` as a Next.js route handler.
- Set `APPLE_TEAM_ID` and `IOS_BUNDLE_ID` in `web/.env` to match your Apple Developer Team ID and the `EXPO_IOS_BUNDLE_ID` from `expo/.env`.

**App Store download link (landing page):**
- Set `NEXT_PUBLIC_APP_STORE_URL` in `web/.env` to your app's App Store URL.

---

## Running locally

### Web

```bash
cd web
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

### Expo

```bash
cd expo
npm run start    # QR code for Expo Go
npm run ios      # iOS Simulator (creates a dev build on first run)
npm run android  # Android Emulator
npm run lint
```

Your phone/simulator needs to reach the web backend — in dev, set `EXPO_PUBLIC_API_URL=http://<your-lan-ip>:3000` in `expo/.env` so a physical device can hit your laptop.

**Changing the scheme or bundle IDs is a rebuild, not a reload** — native config is baked into the build. Kill Metro + `npm run ios` again to pick it up.

---

## Rebranding: make it yours

Search-and-replace these in order:

1. **App identifiers** — edit `expo/.env`:
   - `EXPO_APP_NAME` — display name
   - `EXPO_APP_SLUG` — EAS project slug
   - `EXPO_APP_SCHEME` — URL scheme (e.g. `myapp://`)
   - `EXPO_IOS_BUNDLE_ID` — e.g. `com.yourco.myapp`
   - `EXPO_ANDROID_PACKAGE` — same idea
   - `EXPO_EAS_PROJECT_ID`, `EXPO_OWNER` — leave blank until you run `eas init`
2. **Landing page content** — `web/components/landing-page/*` (Hero, Features, Pricing, FAQAccordion, CTA) and `web/components/LandingPage.js`
3. **Privacy & Terms** — `web/components/{PrivacyPage,TermsPage}.js`
4. **Metadata** — `web/app/layout.js` and `web/app/page.js` (JSON-LD schema)
5. **Legal contact email & domain** — update any `support@example.com` or `example.com` references inside the legal pages
6. **Icons & splash** — replace `expo/assets/images/icon.png` and update `expo/app.config.js` splash color
7. **`eas.json`** — copy `expo/eas.json.example` → `expo/eas.json` and fill in your values. `eas.json` is gitignored because EAS does **not** read `.env` files at build time, so the values have to be duplicated and must stay in sync with `expo/.env`.

---

## Deployment

### Web (Docker Compose)

A ready-to-run Docker Compose stack lives in `web/deployment/`:

```bash
# Populate web/.env with LE_EMAIL + LE_DOMAIN first (used by certbot)
cd web/deployment
docker compose up -d
```

The compose file pulls prebuilt images (`appboiler/web`, `appboiler/apache`) — you'll want to replace those with your own. Look at `web/Dockerfile` as a starting point.

For a simpler deployment: `next build` and host via Vercel, Fly.io, or any Node host.

### Mobile (EAS)

```bash
cd expo
npm install -g eas-cli
eas login
eas init                                 # populates projectId into app.config.js via env
eas build --profile production --platform ios
eas submit --profile production --platform ios
```

Profiles and submit creds live in `expo/eas.json`. Update these to your Apple Team ID and App Store Connect App ID before submitting.

---

## Tech stack

| Layer | Choice |
|---|---|
| Mobile framework | Expo ~52 + Expo Router |
| Web framework | Next.js 16 (App Router) |
| Language | TypeScript + JavaScript (mixed) |
| Styling (mobile) | NativeWind (Tailwind for RN) |
| Styling (web) | Tailwind CSS v4 |
| State | Redux Toolkit + redux-persist |
| Auth | Clerk |
| Subscriptions | RevenueCat |
| Database | MongoDB + Mongoose |
| Forms/inputs | Custom components in `expo/components/input/` |

---

## Next steps

- Read [`CLAUDE.md`](./CLAUDE.md) for architecture notes (sync flow, Redux slices, auth gating, onboarding conventions)
- Open the **Showcase** tab in the running app to see every UI component at once
- Replace the todo domain — start with `web/model/V2Todo.js`, `expo/redux/todos.jsx`, the two sync endpoints, and the `(tabs)/index.jsx` screen

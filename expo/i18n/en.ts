// English translations.
// Keys grouped by surface. Add new keys here AND in de.ts together —
// TypeScript will flag misses since de.ts imports the inferred shape.

const en = {
    common: {
        next: "Next",
        back: "Back",
        save: "Save",
        cancel: "Cancel",
        close: "Close",
        skip: "Skip for Now",
        delete: "Delete",
        continue: "Continue",
        or: "or",
        and: "and",
        selectOption: "Select option",
        somethingWentWrong: "Something went wrong.",
        somethingWentWrongTryAgain: "Something went wrong. Please try again.",
        typeYesToConfirm: "type 'Yes' to confirm",
    },

    languages: {
        en: "English",
        de: "Deutsch",
    },

    welcome: {
        tagline: "Your app starts here.",
        getStarted: "Get Started",
        alreadyHaveAccount: "Already have an account?",
    },

    onboarding: {
        language: {
            title: "Choose Your Language",
            hint: "You can always change this later in Settings.",
        },
        favorites: {
            title: "A clean starting point",
            subtitle: "Auth, sync, subscriptions and settings — already wired up. Replace this screen with your own feature showcase.",
        },
        survey: {
            title: "What are you here to do?",
            subtitle: "We'll tailor a few suggestions to your goal.",
            sideProject: "Build a side project",
            production: "Ship a production app",
            learning: "Learn the stack",
            exploring: "Just exploring",
            other: "Other",
        },
        signup: {
            title: "Create a Free Account",
            subtitle: "Sign in to enable cloud backup and sync across devices.",
        },
        feedback: {
            title: "Rate AppBoiler",
            subtitle: "A quick rating helps others discover the app.",
            leaveFeedback: "Leave Feedback",
        },
        subscription: {
            title: "Unlock Pro",
            feature1: "Instant Cloud Sync & Backups",
            feature2: "Advanced features",
            feature3: "Priority support",
            manage: "Manage Your Subscription",
            noPaymentDue: "No Payment Due Now",
            tryFree: "Try for Free",
            trialInfo: "Start with a 7-day Free Trial",
            priceInfo: "Just {{price}} per year (≈ {{monthly}} /mo)",
            restore: "Restore Subscription",
            notFound: "No pro subscription found.",
            restored: "Subscription restored.",
        },
    },

    auth: {
        signIn: "Sign In",
        signUp: "Sign Up",
        welcomeBack: "Welcome Back",
        createAccount: "Create Account",
        forgotPassword: "Forgot Password?",
        verifyEmail: "Verify Email",
        verificationSent: "We sent a confirmation code to your email.",
        verificationEnter: "Enter it below to verify your account.",
        verify: "Verify",
        verificationCode: "Verification Code",
        resetPassword: "Reset Password",
        resetInfo: "We'll send a verification code to {{email}} so you can reset your password.",
        sendCode: "Send Code",
        newPassword: "New Password",
        resetVerifyInfo: "Enter the reset code you received and choose a new password.",
        resetCode: "Reset Code",
        setPassword: "Set Password",
        termsAgree: "By continuing, you agree to our",
        termsOfService: "Terms of Service",
        privacyPolicy: "Privacy Policy",
        enterEmailFirst: "Please enter an email address.",
        signInWithGoogle: "Sign In with Google",
        signInWithApple: "Sign In with Apple",
        signInFailed: "An error occurred during sign in.",
        signInFailedShort: "Sign in failed",
        name: "Name",
        email: "Email",
        password: "Password",
    },

    errors: {
        generic: "Something went wrong.",
        network: "You need an internet connection to sign up.",
        passwordRequired: "Password is required.",
        emailRequired: "Email is required.",
        emailInvalid: "Please enter a valid email address.",
        codeRequired: "Verification code is required.",
        codeIncorrect: "Incorrect verification code.",
        passwordIncorrect: "Password is incorrect.",
    },

    tabs: {
        dashboard: "Dashboard",
        showcase: "Showcase",
        settings: "Settings",
    },

    dashboard: {
        yourTodos: "Your Todos",
        empty: "No todos yet",
        emptyHint: "Tap + to add one",
        untitled: "Untitled",
        allDone: "All done",
        tasksRemaining: {
            one: "{{count}} task remaining",
            other: "{{count}} tasks remaining",
        },
    },

    todoEdit: {
        newTodo: "New Todo",
        editTodo: "Edit Todo",
        titleField: "Title",
        noteField: "Note",
        deleteConfirmTitle: "Delete Todo",
        deleteConfirmText: "Are you sure?",
    },

    settings: {
        title: "Settings",
        languageLabel: "Language",
        prefsTitle: "Settings",
        prefsDesc: "View and adjust the app's primary settings.",

        sectionSubscription: "Subscription",
        sectionSync: "Sync",
        sectionGeneral: "General",
        sectionAccount: "Account",

        subscriptionActive: "Active Pro Subscription.",
        subscriptionRenews: "Renews automatically on {{date}}.",
        subscriptionEnds: "Ends on {{date}} – won't renew.",
        subscriptionInactiveTitle: "Pro Plan Not Active",
        subscriptionInactiveDesc: "Upgrade to unlock all features.",

        signOutTitle: "Sign Out",
        signOutDesc: "Sign out of your account.",
        signOutConfirm: "Do you really want to sign out?",
        signOutDirtyConfirm: "You have unsynced records. If you sign out now, they will be permanently deleted.",

        deleteAccountTitle: "Delete Account",
        deleteAccountDesc: "Erase all data and close your account.",
        deleteAccountConfirm: "Are you sure you want to permanently delete your account and all data?",
        deleteAccountIrreversible: "This action is irreversible!",

        deleteDataTitle: "Delete Data",
        deleteDataDesc: "Erase all your data and reset the app.",
        deleteDataConfirmTitle: "Erase Data",
        deleteDataConfirmText: "Are you sure you want to permanently delete all data from this device?",

        exportTitle: "Export Data",
        exportDesc: "Export your data.",

        aboutTitle: "About",
        aboutDesc: "About the app and send us feedback.",

        syncedAt: "Last cloud sync completed at",
        syncUpgrade: "Upgrade to Pro for instant cloud sync.",
        syncOfflineTitle: "Cloud Sync Offline",
        syncOfflineDesc: "Sign up for free to automatically backup and sync your data securely.",
    },

    userPanel: {
        anonymous: "Anonymous User",
        signInHint: "Sign in to sync your data across devices.",
        signUpFree: "Sign Up for Free",
        errorUpdatingName: "Error updating name",
    },

    about: {
        title: "About",
        description: "AppBoiler is a starter template for building cross-platform apps with an Expo mobile client, a Next.js backend, and shared business logic.",
        version: "version {{version}}",
        leaveFeedback: "Leave Feedback",
    },

    exportPage: {
        title: "Export",
        description: "Export your todos as a CSV file.",
        button: "Export Todos (CSV)",
        shareDialog: "Share your export",
        failed: "Failed to export CSV: {{error}}",
        savedTo: "Sharing not available – file saved to: {{path}}",
    },

    feedback: {
        title: "Leave Feedback",
        description: "Share ideas, report bugs, or just say hello. We read every message.",
        placeholder: "Your feedback...",
        send: "Send Feedback",
        sending: "Sending...",
        enterFirst: "Please enter your feedback first.",
        error: "Error",
        success: "Success",
        thankYou: "Thank you for your feedback!",
        oops: "Oops",
        somethingWrong: "Something went wrong. Please try again.",
    },

    processPurchase: {
        completing: "Completing your subscription...",
        failed: "Could not complete the purchase.",
        goBack: "Go Back",
    },

    notFound: {
        title: "This screen doesn't exist.",
        goHome: "Go to home screen!",
    },

    infoPanel: {
        showFull: "show full info",
    },
};

export default en;
export type Translations = typeof en;

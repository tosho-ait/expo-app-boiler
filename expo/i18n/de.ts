import type { Translations } from "./en";

// German translations. Mirror en.ts exactly.
// If you add a key in en.ts, add it here too — TypeScript will flag misses.

const de: Translations = {
    common: {
        next: "Weiter",
        back: "Zurück",
        save: "Speichern",
        cancel: "Abbrechen",
        close: "Schließen",
        skip: "Vorerst überspringen",
        delete: "Löschen",
        continue: "Weiter",
        or: "oder",
        and: "und",
        selectOption: "Option auswählen",
        somethingWentWrong: "Etwas ist schiefgelaufen.",
        somethingWentWrongTryAgain: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
        typeYesToConfirm: "'Yes' eingeben zum Bestätigen",
    },

    languages: {
        en: "English",
        de: "Deutsch",
    },

    welcome: {
        tagline: "Deine App beginnt hier.",
        getStarted: "Loslegen",
        alreadyHaveAccount: "Du hast bereits ein Konto?",
    },

    onboarding: {
        language: {
            title: "Sprache auswählen",
            hint: "Du kannst dies später jederzeit in den Einstellungen ändern.",
        },
        favorites: {
            title: "Ein sauberer Ausgangspunkt",
            subtitle: "Auth, Sync, Abos und Einstellungen — bereits eingerichtet. Ersetze diesen Bildschirm durch dein eigenes Feature-Showcase.",
        },
        survey: {
            title: "Was möchtest du hier tun?",
            subtitle: "Wir passen ein paar Vorschläge an dein Ziel an.",
            sideProject: "Ein Nebenprojekt bauen",
            production: "Eine Produktiv-App veröffentlichen",
            learning: "Den Stack lernen",
            exploring: "Nur stöbern",
            other: "Anderes",
        },
        signup: {
            title: "Kostenloses Konto erstellen",
            subtitle: "Melde dich an, um Cloud-Backup und Synchronisierung über Geräte hinweg zu aktivieren.",
        },
        feedback: {
            title: "AppBoiler bewerten",
            subtitle: "Eine kurze Bewertung hilft anderen, die App zu entdecken.",
            leaveFeedback: "Feedback geben",
        },
        subscription: {
            title: "Pro freischalten",
            feature1: "Sofortige Cloud-Synchronisierung & Backups",
            feature2: "Erweiterte Funktionen",
            feature3: "Bevorzugter Support",
            manage: "Abonnement verwalten",
            noPaymentDue: "Keine Zahlung jetzt fällig",
            tryFree: "Kostenlos testen",
            trialInfo: "Starte mit einer 7-tägigen kostenlosen Testphase",
            priceInfo: "Nur {{price}} pro Jahr (≈ {{monthly}} /Monat)",
            restore: "Abonnement wiederherstellen",
            notFound: "Kein Pro-Abonnement gefunden.",
            restored: "Abonnement wiederhergestellt.",
        },
    },

    auth: {
        signIn: "Anmelden",
        signUp: "Registrieren",
        welcomeBack: "Willkommen zurück",
        createAccount: "Konto erstellen",
        forgotPassword: "Passwort vergessen?",
        verifyEmail: "E-Mail bestätigen",
        verificationSent: "Wir haben einen Bestätigungscode an deine E-Mail gesendet.",
        verificationEnter: "Gib ihn unten ein, um dein Konto zu bestätigen.",
        verify: "Bestätigen",
        verificationCode: "Bestätigungscode",
        resetPassword: "Passwort zurücksetzen",
        resetInfo: "Wir senden einen Bestätigungscode an {{email}}, damit du dein Passwort zurücksetzen kannst.",
        sendCode: "Code senden",
        newPassword: "Neues Passwort",
        resetVerifyInfo: "Gib den erhaltenen Reset-Code ein und wähle ein neues Passwort.",
        resetCode: "Reset-Code",
        setPassword: "Passwort festlegen",
        termsAgree: "Mit der Fortsetzung stimmst du unseren",
        termsOfService: "Nutzungsbedingungen",
        privacyPolicy: "Datenschutzerklärung",
        enterEmailFirst: "Bitte gib eine E-Mail-Adresse ein.",
        signInWithGoogle: "Mit Google anmelden",
        signInWithApple: "Mit Apple anmelden",
        signInFailed: "Bei der Anmeldung ist ein Fehler aufgetreten.",
        signInFailedShort: "Anmeldung fehlgeschlagen",
        name: "Name",
        email: "E-Mail",
        password: "Passwort",
    },

    errors: {
        generic: "Etwas ist schiefgelaufen.",
        network: "Du benötigst eine Internetverbindung, um dich zu registrieren.",
        passwordRequired: "Passwort ist erforderlich.",
        emailRequired: "E-Mail ist erforderlich.",
        emailInvalid: "Bitte gib eine gültige E-Mail-Adresse ein.",
        codeRequired: "Bestätigungscode ist erforderlich.",
        codeIncorrect: "Falscher Bestätigungscode.",
        passwordIncorrect: "Passwort ist falsch.",
    },

    tabs: {
        dashboard: "Dashboard",
        showcase: "Showcase",
        settings: "Einstellungen",
    },

    dashboard: {
        yourTodos: "Deine Aufgaben",
        empty: "Noch keine Aufgaben",
        emptyHint: "Tippe auf +, um eine hinzuzufügen",
        untitled: "Ohne Titel",
        allDone: "Alles erledigt",
        tasksRemaining: {
            one: "{{count}} Aufgabe übrig",
            other: "{{count}} Aufgaben übrig",
        },
    },

    todoEdit: {
        newTodo: "Neue Aufgabe",
        editTodo: "Aufgabe bearbeiten",
        titleField: "Titel",
        noteField: "Notiz",
        deleteConfirmTitle: "Aufgabe löschen",
        deleteConfirmText: "Bist du sicher?",
    },

    settings: {
        title: "Einstellungen",
        languageLabel: "Sprache",
        prefsTitle: "Einstellungen",
        prefsDesc: "Sieh dir die wichtigsten App-Einstellungen an und passe sie an.",

        sectionSubscription: "Abonnement",
        sectionSync: "Synchronisierung",
        sectionGeneral: "Allgemein",
        sectionAccount: "Konto",

        subscriptionActive: "Aktives Pro-Abonnement.",
        subscriptionRenews: "Verlängert sich automatisch am {{date}}.",
        subscriptionEnds: "Endet am {{date}} – verlängert sich nicht.",
        subscriptionInactiveTitle: "Pro-Plan nicht aktiv",
        subscriptionInactiveDesc: "Upgrade, um alle Funktionen freizuschalten.",

        signOutTitle: "Abmelden",
        signOutDesc: "Von deinem Konto abmelden.",
        signOutConfirm: "Möchtest du dich wirklich abmelden?",
        signOutDirtyConfirm: "Du hast nicht synchronisierte Datensätze. Wenn du dich jetzt abmeldest, werden sie dauerhaft gelöscht.",

        deleteAccountTitle: "Konto löschen",
        deleteAccountDesc: "Alle Daten löschen und dein Konto schließen.",
        deleteAccountConfirm: "Möchtest du dein Konto und alle Daten wirklich dauerhaft löschen?",
        deleteAccountIrreversible: "Diese Aktion ist unwiderruflich!",

        deleteDataTitle: "Daten löschen",
        deleteDataDesc: "Alle Daten löschen und die App zurücksetzen.",
        deleteDataConfirmTitle: "Daten löschen",
        deleteDataConfirmText: "Möchtest du wirklich alle Daten von diesem Gerät dauerhaft löschen?",

        exportTitle: "Daten exportieren",
        exportDesc: "Exportiere deine Daten.",

        aboutTitle: "Über",
        aboutDesc: "Über die App und sende uns Feedback.",

        syncedAt: "Letzte Cloud-Synchronisierung abgeschlossen am",
        syncUpgrade: "Upgrade auf Pro für sofortige Cloud-Synchronisierung.",
        syncOfflineTitle: "Cloud-Synchronisierung offline",
        syncOfflineDesc: "Registriere dich kostenlos, um deine Daten automatisch sicher zu sichern und zu synchronisieren.",
    },

    userPanel: {
        anonymous: "Anonymer Nutzer",
        signInHint: "Melde dich an, um deine Daten geräteübergreifend zu synchronisieren.",
        signUpFree: "Kostenlos registrieren",
        errorUpdatingName: "Fehler beim Aktualisieren des Namens",
    },

    about: {
        title: "Über",
        description: "AppBoiler ist eine Starter-Vorlage für plattformübergreifende Apps mit einem Expo-Mobile-Client, einem Next.js-Backend und gemeinsam genutzter Geschäftslogik.",
        version: "Version {{version}}",
        leaveFeedback: "Feedback geben",
    },

    exportPage: {
        title: "Exportieren",
        description: "Exportiere deine Aufgaben als CSV-Datei.",
        button: "Aufgaben exportieren (CSV)",
        shareDialog: "Export teilen",
        failed: "CSV-Export fehlgeschlagen: {{error}}",
        savedTo: "Teilen nicht verfügbar – Datei gespeichert unter: {{path}}",
    },

    feedback: {
        title: "Feedback geben",
        description: "Teile Ideen, melde Fehler oder sag einfach Hallo. Wir lesen jede Nachricht.",
        placeholder: "Dein Feedback...",
        send: "Feedback senden",
        sending: "Sende...",
        enterFirst: "Bitte gib zuerst dein Feedback ein.",
        error: "Fehler",
        success: "Erfolg",
        thankYou: "Danke für dein Feedback!",
        oops: "Hoppla",
        somethingWrong: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    },

    processPurchase: {
        completing: "Abonnement wird abgeschlossen...",
        failed: "Kauf konnte nicht abgeschlossen werden.",
        goBack: "Zurück",
    },

    notFound: {
        title: "Dieser Bildschirm existiert nicht.",
        goHome: "Zur Startseite!",
    },

    infoPanel: {
        showFull: "alle Infos anzeigen",
    },
};

export default de;

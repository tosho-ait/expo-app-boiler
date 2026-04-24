// Reads config values from environment variables (expo/.env).
// Falls back to sensible defaults so the app is still buildable without all vars set.

module.exports = {
    expo: {
        name: process.env.EXPO_APP_NAME || "AppBoiler",
        slug: process.env.EXPO_APP_SLUG || "appboiler",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        scheme: process.env.EXPO_APP_SCHEME || "appboiler",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        splash: {
            backgroundColor: "#3BA7F3"
        },
        ios: {
            buildNumber: "1",
            supportsTablet: true,
            bundleIdentifier: process.env.EXPO_IOS_BUNDLE_ID || "com.example.appboiler",
            infoPlist: {
                ITSAppUsesNonExemptEncryption: false
            },
            config: {
                usesNonExemptEncryption: false
            }
        },
        android: {
            versionCode: 1,
            adaptiveIcon: {
                foregroundImage: "./assets/images/icon.png",
                backgroundColor: "#0284c7"
            },
            package: process.env.EXPO_ANDROID_PACKAGE || "com.example.appboiler"
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/icon.png"
        },
        plugins: [
            "expo-router",
            ["expo-splash-screen"]
        ],
        experiments: {
            typedRoutes: true
        },
        extra: {
            router: {
                origin: false
            },
            eas: {
                projectId: process.env.EXPO_EAS_PROJECT_ID || ""
            }
        },
        owner: process.env.EXPO_OWNER || undefined
    }
};

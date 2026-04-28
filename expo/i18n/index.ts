import { I18n } from "i18n-js";
import { useSelector } from "react-redux";
import en from "./en";
import de from "./de";

export type LanguageCode = "en" | "de";

export const SUPPORTED_LANGUAGES: { code: LanguageCode; label: string }[] = [
    { code: "en", label: "English" },
    { code: "de", label: "Deutsch" },
];

export const DEFAULT_LANGUAGE: LanguageCode = "en";

const i18n = new I18n({ en, de });
i18n.defaultLocale = DEFAULT_LANGUAGE;
i18n.locale = DEFAULT_LANGUAGE;
i18n.enableFallback = true;

// Set locale imperatively (e.g. from a non-component context).
// Components should rely on useT() — it auto-syncs from redux.
export function setLocale(lang: LanguageCode) {
    i18n.locale = lang;
}

// Plain translate. Use this in non-component code (e.g. error formatters).
// Components should prefer useT() so they re-render on language change.
export function t(key: string, params?: Record<string, any>): string {
    return i18n.t(key, params);
}

// Hook: subscribes to the redux language slice, keeps i18n.locale in sync,
// and returns a `t` function. Components that call this re-render whenever
// the user switches language.
export function useT() {
    const lang = useSelector(
        (state: any) => state.todos?.config?.language as LanguageCode | undefined
    );
    const effective = lang || DEFAULT_LANGUAGE;
    if (i18n.locale !== effective) {
        i18n.locale = effective;
    }
    return {
        t: (key: string, params?: Record<string, any>) => i18n.t(key, params),
        language: effective,
    };
}

export default i18n;

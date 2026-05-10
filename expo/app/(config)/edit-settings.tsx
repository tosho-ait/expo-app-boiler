import React from "react";
import LanguagePanel from "@/components/feature/LanguagePanel";
import { saveConfig } from "@/redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import PageSignature from "@/components/layout/PageSignature";
import { View } from "react-native";
import { DEFAULT_LANGUAGE, LanguageCode, useT } from "@/i18n";


export default function EditSettingsScreen() {

    const router = useRouter();
    const dispatch = useDispatch();
    const { t } = useT();

    // Read & write through redux directly — no local state, no Save button.
    // Picker change → dispatch → useT re-runs → page label flips immediately.
    const language = (useSelector(
        (state: any) => state.todos.config?.language
    ) as LanguageCode | undefined) ?? DEFAULT_LANGUAGE;

    const setLanguage = (lang: LanguageCode) => {
        dispatch(saveConfig({ language: lang }));
    };

    return (
        <PageSignature
            heading={t("settings.title")}
            noBackButton={false}
            onBack={() => router.back()}>

            <View className="pt-4">
                <LanguagePanel language={language} setLanguage={setLanguage} />
            </View>

        </PageSignature>
    );
}

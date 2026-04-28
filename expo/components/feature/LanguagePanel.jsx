import { View } from 'react-native';
import React from "react";
import Select from "../input/Select";
import { SUPPORTED_LANGUAGES, useT } from "@/i18n";


export default function LanguagePanel({ language, setLanguage, hideLabel }) {
    const { t } = useT();
    return (
        <View className="flex gap-10 bg-white">
            <Select
                className="w-[100%]"
                label={hideLabel ? null : t("settings.languageLabel")}
                value={language}
                onChange={setLanguage}
                options={SUPPORTED_LANGUAGES.map(l => ({ value: l.code, label: l.label }))} />
        </View>
    );
}

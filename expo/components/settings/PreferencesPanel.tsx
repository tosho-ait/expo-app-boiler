import React from "react";
import LinkSection from "../panels/LinkSection";
import { useT } from "@/i18n";

// Renders the row only — wrap in a shared <PanelDark> at the call site
// to group multiple settings rows into a single iOS-style card.
export default function PreferencesPanel() {
    const { t } = useT();
    return (
        <LinkSection
            href="/edit-settings"
            title={t("settings.prefsTitle")}
            description={t("settings.prefsDesc")}
            icon="ii:options-outline"
            tint="bg-tertiary-50"
            iconColor="#0A84FF"
        />
    );
}

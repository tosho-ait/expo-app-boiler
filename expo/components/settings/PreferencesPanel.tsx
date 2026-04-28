import React from "react";
import PanelDark from "../panels/PanelDark";
import LinkSection from "../panels/LinkSection";
import { useT } from "@/i18n";

export default function PreferencesPanel() {
    const { t } = useT();
    return (
        <PanelDark>
            <LinkSection href="/edit-settings" title={t("settings.prefsTitle")}
                description={t("settings.prefsDesc")}
                icon="ii:construct-outline" />
        </PanelDark>
    );
}

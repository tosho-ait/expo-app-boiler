import React from "react";
import PanelDark from "../panels/PanelDark";
import LinkSection from "../panels/LinkSection";
import { useT } from "@/i18n";

export default function AboutPanel() {
    const { t } = useT();
    return (
        <PanelDark>
            <LinkSection href="/about" title={t("settings.aboutTitle")}
                icon="ii:information-circle-outline"
                description={t("settings.aboutDesc")} />
        </PanelDark>
    );
}

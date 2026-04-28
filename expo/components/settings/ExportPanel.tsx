import React from "react";
import PanelDark from "../panels/PanelDark";
import LinkSection from "../panels/LinkSection";
import { useT } from "@/i18n";

export default function ExportPanel() {
    const { t } = useT();
    return (
        <PanelDark>
            <LinkSection href="/edit-export" title={t("settings.exportTitle")} icon="mc:export-variant"
                description={t("settings.exportDesc")} />
        </PanelDark>
    );
}

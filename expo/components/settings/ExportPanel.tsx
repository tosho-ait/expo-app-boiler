import React from "react";
import LinkSection from "../panels/LinkSection";
import { useT } from "@/i18n";

export default function ExportPanel() {
    const { t } = useT();
    return (
        <LinkSection
            href="/edit-export"
            title={t("settings.exportTitle")}
            icon="mc:export-variant"
            tint="bg-success-50"
            iconColor="#34C759"
            description={t("settings.exportDesc")}
        />
    );
}

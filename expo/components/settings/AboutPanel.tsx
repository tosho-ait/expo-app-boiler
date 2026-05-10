import React from "react";
import LinkSection from "../panels/LinkSection";
import { useT } from "@/i18n";

export default function AboutPanel() {
    const { t } = useT();
    return (
        <LinkSection
            href="/about"
            title={t("settings.aboutTitle")}
            icon="ii:information-circle-outline"
            tint="bg-background-100"
            iconColor="#636366"
            description={t("settings.aboutDesc")}
        />
    );
}

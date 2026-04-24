import React from "react";
import PanelDark from "../panels/PanelDark";
import LinkSection from "../panels/LinkSection";

export default function ExportPanel() {
    return (
        <PanelDark>
            <LinkSection href="/edit-export" title="Export Data" icon="mc:export-variant"
                description="Export your data." />
        </PanelDark>
    );
}

import React from "react";
import PanelDark from "../panels/PanelDark";
import LinkSection from "../panels/LinkSection";

export default function PreferencesPanel() {
    return (
        <PanelDark>
            <LinkSection href="/edit-settings" title="Settings"
                description="View and adjust the app's primary settings."
                icon="ii:construct-outline" />
        </PanelDark>
    );
}

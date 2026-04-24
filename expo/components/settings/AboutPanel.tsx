import React from "react";
import PanelDark from "../panels/PanelDark";
import LinkSection from "../panels/LinkSection";

export default function AboutPanel() {
    return (
        <PanelDark>
            <LinkSection href="/about" title="About"
                icon="ii:information-circle-outline"
                description="About the app and send us feedback." />
        </PanelDark>
    );
}

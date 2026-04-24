import React from "react";
import UserPanel from "@/components/feature/UserPanel";
import FlexPage from "@/components/layout/FlexPage";
import FlexPanelBig from "@/components/panels/FlexPanelBig";
import Page from "@/components/layout/Page";
import SubscriptionPanel from "@/components/settings/SubscriptionPanel";
import AccountOptionsPanel from "@/components/settings/AccountOptionsPanel";
import SyncPanel from "@/components/settings/SyncPanel";
import PreferencesPanel from "@/components/settings/PreferencesPanel";
import ExportPanel from "@/components/settings/ExportPanel";
import AboutPanel from "@/components/settings/AboutPanel";

export default function ConfigPage() {

    return (
        <Page noBackButton>

            <FlexPage>

                <UserPanel />

                <FlexPanelBig>

                    <SubscriptionPanel />

                    <PreferencesPanel />

                    <ExportPanel />

                    <AboutPanel />

                    <AccountOptionsPanel />

                    <SyncPanel />

                </FlexPanelBig>

            </FlexPage>

        </Page>
    )
}

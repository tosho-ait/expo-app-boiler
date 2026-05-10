import React from "react";
import { Text, View } from "react-native";
import UserPanel from "@/components/feature/UserPanel";
import ParallaxScrollView from "@/components/layout/ParallaxScrollView";
import PanelDark from "@/components/panels/PanelDark";
import SubscriptionPanel from "@/components/settings/SubscriptionPanel";
import AccountOptionsPanel from "@/components/settings/AccountOptionsPanel";
import SyncPanel from "@/components/settings/SyncPanel";
import PreferencesPanel from "@/components/settings/PreferencesPanel";
import ExportPanel from "@/components/settings/ExportPanel";
import AboutPanel from "@/components/settings/AboutPanel";
import { useT } from "@/i18n";


function SectionHeader({ title }) {
    return (
        <Text className="text-footnote font-semibold text-typography-500 uppercase tracking-wider px-6 mb-2 mt-2">
            {title}
        </Text>
    );
}

function Section({ children }) {
    return <View className="mx-4">{children}</View>;
}


export default function ConfigPage() {

    const { t } = useT();

    return (
        <ParallaxScrollView>
            <View className="pt-4 pb-32">

                {/* Large title */}
                <View className="px-5 pt-2 pb-5">
                    <Text className="text-large-title font-bold text-typography-900">
                        {t("tabs.settings")}
                    </Text>
                </View>

                {/* Profile hero */}
                <UserPanel />

                <View className="h-6" />

                {/* SUBSCRIPTION */}
                <SectionHeader title={t("settings.sectionSubscription")} />
                <Section>
                    <PanelDark>
                        <SubscriptionPanel />
                    </PanelDark>
                </Section>

                <View className="h-6" />

                {/* SYNC */}
                <SectionHeader title={t("settings.sectionSync")} />
                <Section>
                    <SyncPanel />
                </Section>

                <View className="h-6" />

                {/* GENERAL */}
                <SectionHeader title={t("settings.sectionGeneral")} />
                <Section>
                    <PanelDark>
                        <PreferencesPanel />
                        <ExportPanel />
                        <AboutPanel />
                    </PanelDark>
                </Section>

                <View className="h-6" />

                {/* ACCOUNT */}
                <SectionHeader title={t("settings.sectionAccount")} />
                <Section>
                    <AccountOptionsPanel />
                </Section>

            </View>
        </ParallaxScrollView>
    );
}

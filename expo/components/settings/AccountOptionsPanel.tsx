import { View } from 'react-native';
import React from "react";
import LinkSection from "../panels/LinkSection";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useSelector } from "react-redux";
import PanelDark from "../panels/PanelDark";
import { useAppSession } from "../providers/AppSessionProvider";
import { useT } from "@/i18n";

export default function AccountOptionsPanel() {
    const { doSignOut, doEraseAccount, doLogoutWipeDevice, rcUser } = useAppSession();
    const { t } = useT();

    let dirtyTimestamp = useSelector(state => state.sync?.dirtyTimestamp);
    let isDirty = !!dirtyTimestamp;

    return (
        <View>
            <SignedOut>
                <PanelDark>
                    <LinkSection
                        onPress={doLogoutWipeDevice}
                        confirm={{
                            title: t("settings.deleteDataConfirmTitle"),
                            text: t("settings.deleteDataConfirmText"),
                            buttonLabel: t("common.delete"),
                            extraConfirm: true
                        }}
                        title={t("settings.deleteDataTitle")}
                        description={t("settings.deleteDataDesc")}
                        icon="ii:trash-outline" />
                </PanelDark>
            </SignedOut>

            <SignedIn>
                <PanelDark>
                    <LinkSection onPress={doEraseAccount}
                        confirm={{
                            title: t("settings.deleteAccountTitle"),
                            text: t("settings.deleteAccountConfirm"),
                            text2: t("settings.deleteAccountIrreversible"),
                            buttonLabel: t("common.delete"),
                            extraConfirm: true
                        }}
                        title={t("settings.deleteAccountTitle")}
                        description={t("settings.deleteAccountDesc")}
                        icon="ii:trash-outline" />

                    <View className="px-4"><View className="h-px bg-white" /></View>

                    {!isDirty && <LinkSection title={t("settings.signOutTitle")}
                        description={t("settings.signOutDesc")}
                        icon="ii:exit-outline"
                        onPress={doSignOut}
                        confirm={{
                            title: t("settings.signOutTitle"),
                            text: t("settings.signOutConfirm"),
                            buttonLabel: t("settings.signOutTitle")
                        }} />}

                    {isDirty && <LinkSection title={t("settings.signOutTitle")}
                        description={t("settings.signOutDesc")}
                        icon="ii:exit-outline"
                        onPress={doSignOut}
                        confirm={{
                            title: t("settings.signOutTitle"),
                            text: t("settings.signOutDirtyConfirm"),
                            text2: t("settings.signOutConfirm"),
                            buttonLabel: t("settings.signOutTitle")
                        }} />}

                </PanelDark>
            </SignedIn>
        </View>
    );
}

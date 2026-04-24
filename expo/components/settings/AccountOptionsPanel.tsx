import { View } from 'react-native';
import React from "react";
import LinkSection from "../panels/LinkSection";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useSelector } from "react-redux";
import PanelDark from "../panels/PanelDark";
import { useAppSession } from "../providers/AppSessionProvider";

export default function AccountOptionsPanel() {
    const { doSignOut, doEraseAccount, doLogoutWipeDevice, rcUser } = useAppSession();

    let dirtyTimestamp = useSelector(state => state.sync?.dirtyTimestamp);
    let isDirty = !!dirtyTimestamp;

    return (
        <View>
            <SignedOut>
                <PanelDark>
                    <LinkSection
                        onPress={doLogoutWipeDevice}
                        confirm={{
                            title: "Erase Data",
                            text: "Are you sure you want to permanently delete all data from this device?",
                            buttonLabel: "Delete",
                            extraConfirm: true
                        }}
                        title="Delete Data"
                        description="Erase all your data and reset the app."
                        icon="ii:trash-outline" />

                    {/*<View className="px-4"><View className="h-px bg-white"/></View>*/}

                    {/*<View className="py-2">*/}
                    {/*    <Button link_muted*/}
                    {/*             href="/authenticate"*/}
                    {/*             confirm={{*/}
                    {/*                 title: "Sign In",*/}
                    {/*                 text: "Signing in with a different account will permanently delete all current data.",*/}
                    {/*                 buttonLabel: "Continue"*/}
                    {/*             }}*/}
                    {/*             title="Already have a Pro account? Sign in"*/}
                    {/*    />*/}
                    {/*</View>*/}
                </PanelDark>
            </SignedOut>

            <SignedIn>
                <PanelDark>
                    <LinkSection onPress={doEraseAccount}
                        confirm={{
                            title: "Delete Account",
                            text: "Are you sure you want to permanently delete your account and all data?",
                            text2: "This action is irreversible!",
                            buttonLabel: "Delete",
                            extraConfirm: true
                        }}
                        title="Delete Account"
                        description="Erase all data and close your account."
                        icon="ii:trash-outline" />

                    <View className="px-4"><View className="h-px bg-white" /></View>

                    {!isDirty && <LinkSection title="Sign Out"
                        description="Sign out of your account."
                        icon="ii:exit-outline"
                        onPress={doSignOut}
                        confirm={{
                            title: "Sign Out",
                            text: "Do you really want to sign out?",
                            buttonLabel: "Sign Out"
                        }} />}

                    {isDirty && <LinkSection title="Sign Out"
                        description="Sign out of your account."
                        icon="ii:exit-outline"
                        onPress={doSignOut}
                        confirm={{
                            title: "Sign Out",
                            text: "You have unsynced records. If you sign out now, they will be permanently deleted.",
                            text2: "Do you really want to sign out?",
                            buttonLabel: "Sign Out"
                        }} />}

                </PanelDark>
            </SignedIn>
        </View>
    );
}

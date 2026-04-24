import { Text, View } from 'react-native';
import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { timestampToDisplayDate } from "../../lib/dateUtil";
import PanelDark from "../panels/PanelDark";
import { getIcon } from "../../lib/iconUtil";
import { useAppSession } from "@/components/providers/AppSessionProvider";


export default function SyncPanel() {

    const { rcUserHasActiveSubscription } = useAppSession();

    let lastSync = useSelector(
        state => state.sync?.lastSyncSuccessTimestamp);

    return (
        <>
            <SignedIn>
                <PanelDark>
                    <View className="flex flex-col w-full justify-center items-center py-2">

                        <View className="mb-1">
                            {getIcon("ii:cloud-outline", 36, "black")}
                        </View>

                        <Text className="text-md text-zinc-600 text-center w-full">
                            Last cloud sync completed at</Text>

                        <Text className="text-lg mt-2 font-semibold">
                            {timestampToDisplayDate(lastSync)}</Text>

                        {!rcUserHasActiveSubscription &&
                            <Text className="text-sm text-zinc-600 text-center w-full mt-3">
                                Upgrade to Pro for instant cloud sync.
                            </Text>}
                    </View>
                </PanelDark>
            </SignedIn>

            <SignedOut>
                <PanelDark>
                    {/* @ts-ignore */}
                    <Button href="/authenticate" custom={
                        <View className="flex flex-col w-full justify-center items-center py-2">
                            <View className="mb-2">
                                {getIcon("ii:cloud-offline-outline", 36, "black")}
                            </View>
                            <Text className="text-xl font-semibold text-center w-full">
                                Cloud Sync Offline</Text>
                            <Text className="text-md text-zinc-600 text-center w-full mt-1">
                                Sign up for free to automatically backup and sync your data securely.
                            </Text>
                        </View>
                    } />
                </PanelDark>
            </SignedOut>
        </>
    );
}

import { Text, View } from 'react-native';
import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { timestampToDisplayDate } from "../../lib/dateUtil";
import { getIcon } from "../../lib/iconUtil";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import { useT } from "@/i18n";


export default function SyncPanel() {

    const { rcUserHasActiveSubscription } = useAppSession();
    const { t } = useT();

    let lastSync = useSelector(
        (state: any) => state.sync?.lastSyncSuccessTimestamp);

    return (
        <>
            <SignedIn>
                <View className="bg-background-0 rounded-ios-2xl shadow-ios-card overflow-hidden px-4 py-5">
                    <View className="flex flex-col w-full justify-center items-center">

                        <View className="w-12 h-12 rounded-full bg-success-50 items-center justify-center mb-3">
                            {getIcon("ii:cloud-done", 26, "#34C759")}
                        </View>

                        <Text className="text-footnote text-typography-500 text-center">
                            {t("settings.syncedAt")}
                        </Text>

                        <Text className="text-headline font-semibold text-typography-900 mt-1">
                            {timestampToDisplayDate(lastSync)}
                        </Text>

                        {!rcUserHasActiveSubscription &&
                            <Text className="text-footnote text-typography-500 text-center mt-3 px-2">
                                {t("settings.syncUpgrade")}
                            </Text>}
                    </View>
                </View>
            </SignedIn>

            <SignedOut>
                <View className="bg-background-0 rounded-ios-2xl shadow-ios-card overflow-hidden">
                    {/* @ts-ignore */}
                    <Button href="/authenticate" custom={
                        <View className="flex flex-col w-full justify-center items-center px-4 py-5">
                            <View className="w-12 h-12 rounded-full bg-background-100 items-center justify-center mb-3">
                                {getIcon("ii:cloud-offline", 26, "#8E8E93")}
                            </View>
                            <Text className="text-headline font-semibold text-typography-900 text-center">
                                {t("settings.syncOfflineTitle")}
                            </Text>
                            <Text className="text-footnote text-typography-500 text-center mt-1 px-2">
                                {t("settings.syncOfflineDesc")}
                            </Text>
                        </View>
                    } />
                </View>
            </SignedOut>
        </>
    );
}

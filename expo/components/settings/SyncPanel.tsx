import { Text, View } from 'react-native';
import React from "react";
import { Show } from "@clerk/expo";
import Button from "../ui/Button";
import { useSelector } from "react-redux";
import { timestampToDisplayDate } from "../../lib/dateUtil";
import PanelDark from "../panels/PanelDark";
import { getIcon } from "../../lib/iconUtil";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import { useT } from "@/i18n";


export default function SyncPanel() {

    const { rcUserHasActiveSubscription } = useAppSession();
    const { t } = useT();

    let lastSync = useSelector(
        state => state.sync?.lastSyncSuccessTimestamp);

    return (
        <>
            <Show when="signed-in">
                <PanelDark>
                    <View className="flex flex-col w-full justify-center items-center py-2">

                        <View className="mb-1">
                            {getIcon("ii:cloud-outline", 36, "black")}
                        </View>

                        <Text className="text-md text-zinc-600 text-center w-full">
                            {t("settings.syncedAt")}</Text>

                        <Text className="text-lg mt-2 font-semibold">
                            {timestampToDisplayDate(lastSync)}</Text>

                        {!rcUserHasActiveSubscription &&
                            <Text className="text-sm text-zinc-600 text-center w-full mt-3">
                                {t("settings.syncUpgrade")}
                            </Text>}
                    </View>
                </PanelDark>
            </Show>
            <Show when="signed-out">
                <PanelDark>
                    {/* @ts-ignore */}
                    <Button href="/authenticate" custom={
                        <View className="flex flex-col w-full justify-center items-center py-2">
                            <View className="mb-2">
                                {getIcon("ii:cloud-offline-outline", 36, "black")}
                            </View>
                            <Text className="text-xl font-semibold text-center w-full">
                                {t("settings.syncOfflineTitle")}</Text>
                            <Text className="text-md text-zinc-600 text-center w-full mt-1">
                                {t("settings.syncOfflineDesc")}
                            </Text>
                        </View>
                    } />
                </PanelDark>
            </Show>
        </>
    );
}

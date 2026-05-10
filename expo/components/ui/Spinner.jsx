import React from 'react';
import { useAppSession } from "@/components/providers/AppSessionProvider";
import { ActivityIndicator, View } from "react-native";
import { useRevenueCat } from "@/components/providers/RevenueCatProvider";


export default function Spinner() {

    const appSession = useAppSession();
    const revenueCat = useRevenueCat();

    if (!appSession.isProcessing && !revenueCat.isProcessing) {
        return null;
    }

    return (
        <View className="absolute inset-0 z-50 flex-1 justify-center items-center bg-black/30">
            <View className="bg-background-0 rounded-ios-2xl px-8 py-8 shadow-ios-card-lg">
                <ActivityIndicator size="large" color="#091A2F" />
            </View>
        </View>
    );
}

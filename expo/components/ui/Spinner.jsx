import React from 'react';
import {useAppSession} from "@/components/providers/AppSessionProvider";
import {ActivityIndicator, View} from "react-native";
import {useRevenueCat} from "@/components/providers/RevenueCatProvider";


export default function Spinner() {

    const appSession = useAppSession();
    const revenueCat = useRevenueCat();

    if (!appSession.isProcessing && !revenueCat.isProcessing) {
        return null;
    }

    return <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ffffff"/>
    </View>;
}

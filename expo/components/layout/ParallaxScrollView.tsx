import React, { useRef } from "react";
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabOverflow } from './TabBarBackground';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollProvider } from "../providers/ScrollProvider";
import DeviceInfo from "react-native-device-info";

export default function ParallaxScrollView({ children }) {

    const isTablet = DeviceInfo.isTablet();

    const scrollRef = useRef<ScrollView>(null);
    const bottom = useBottomTabOverflow();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollProvider scrollRef={scrollRef}>
                <View className="flex-1 bg-gray-100">
                    <SafeAreaView className="flex-1">
                        <ScrollView
                            ref={scrollRef}
                            scrollEventThrottle={16}
                            scrollIndicatorInsets={{ bottom }}
                            contentContainerStyle={{ paddingBottom: bottom }}>
                            <View className={
                                isTablet
                                    ? "flex overflow-hidden px-12"
                                    : "flex overflow-hidden"
                            }>{children}</View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </ScrollProvider>
        </GestureHandlerRootView>
    );
}

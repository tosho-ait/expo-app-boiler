import React, { useRef } from "react";
import { SafeAreaView, View, ScrollView } from 'react-native';
import { useBottomTabOverflow } from './TabBarBackground';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollProvider } from "../providers/ScrollProvider";
import DeviceInfo from "react-native-device-info";

export default function ParallaxScrollView({ children }: { children: React.ReactNode }) {

    const isTablet = DeviceInfo.isTablet();

    const scrollRef = useRef<ScrollView>(null);
    const bottom = useBottomTabOverflow();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollProvider scrollRef={scrollRef}>
                <View className="flex-1 bg-background-100">
                    <SafeAreaView className="flex-1">
                        <ScrollView
                            ref={scrollRef}
                            scrollEventThrottle={16}
                            showsVerticalScrollIndicator={false}
                            scrollIndicatorInsets={{ bottom }}
                            contentContainerStyle={{ paddingBottom: bottom + 24 }}>
                            <View className={isTablet ? "px-12" : ""}>
                                {children}
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </ScrollProvider>
        </GestureHandlerRootView>
    );
}

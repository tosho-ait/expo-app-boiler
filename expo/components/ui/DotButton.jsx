import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { getIcon } from "../../lib/iconUtil";
import { useRouter } from "expo-router";
import { hapticLight } from "../../lib/hapticUtil";

export default function DotButton({
    active = false,
    icon = "",
    onPress = undefined,
    href = "",
    overlay = undefined,
}) {
    const router = useRouter();

    const doOnPress = () => {
        hapticLight();
        if (onPress) onPress();
        if (href) router.navigate(href);
    };

    const bgColor = active ? "bg-background-100" : "bg-background-0";
    const iconColor = active ? "#091A2F" : "#8E8E93";

    let button = (
        <Pressable
            onPress={doOnPress}
            className="active:opacity-70 active:scale-[0.95]">
            <View className={`w-12 h-12 rounded-full items-center justify-center shadow-ios-card ${bgColor}`}>
                <Text>{getIcon(icon, 20, iconColor)}</Text>
            </View>
        </Pressable>
    );

    if (overlay) {
        return (
            <View className="relative">
                {button}
                <View className="absolute -top-1 -right-1 bg-error-500 rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5 z-20 border-2 border-background-0">
                    <Text className="text-white text-[10px] font-bold">{overlay}</Text>
                </View>
            </View>
        );
    }

    return button;
}

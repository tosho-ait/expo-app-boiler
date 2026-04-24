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

    const bgColor = active ? "bg-gray-100" : "bg-white";
    const iconColor = active ? "#000000" : "#94a3b8";

    let button = (
        <View className="bg-white rounded-full p-1">
            <Pressable
                onPress={doOnPress}
                className={`w-12 h-12 flex justify-center items-center rounded-full ${bgColor}`}
            >
                <Text>{getIcon(icon, 20, iconColor)}</Text>
            </Pressable>
        </View>
    );

    if (overlay) {
        return (
            <View className="relative">
                {button}
                <View className="absolute top-0 right-0 bg-gray-700 rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 z-20">
                    <Text className="text-white text-xs font-bold">{overlay}</Text>
                </View>
            </View>
        );
    }

    return button;
}

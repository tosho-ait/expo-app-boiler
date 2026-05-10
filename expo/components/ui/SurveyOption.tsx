import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { getIcon } from '@/lib/iconUtil';
import { hapticLight } from '@/lib/hapticUtil';

interface SurveyOptionProps {
    title: string;
    icon: string;
    selected?: boolean;
    onPress: () => void;
}

// iOS-style selectable cell: rounded card + tinted icon tile + label + chevron.
export default function SurveyOption({ title, icon, selected = false, onPress }: SurveyOptionProps) {

    const handlePress = () => {
        hapticLight();
        onPress();
    };

    return (
        <Pressable
            onPress={handlePress}
            testID={`survey-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className={
                "flex-row items-center rounded-ios-2xl px-4 py-4 mb-3 shadow-ios-card active:opacity-80 active:scale-[0.99] " +
                (selected ? "bg-primary-800" : "bg-background-0")
            }>
            <View className={
                "w-10 h-10 rounded-ios-sm items-center justify-center mr-3 " +
                (selected ? "bg-white/15" : "bg-background-100")
            }>
                {getIcon(icon, 20, selected ? "#FFFFFF" : "#091A2F")}
            </View>
            <Text className={
                "flex-1 text-body font-medium " +
                (selected ? "text-white" : "text-typography-900")
            }>
                {title}
            </Text>
            {selected
                ? getIcon("ii:checkmark-circle", 22, "#FFFFFF")
                : getIcon("ii:chevron-forward", 18, "#C6C6C8")}
        </Pressable>
    );
}

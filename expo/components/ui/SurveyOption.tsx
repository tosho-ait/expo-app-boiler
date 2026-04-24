import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { getIcon } from '@/lib/iconUtil';

interface SurveyOptionProps {
    title: string;
    icon: string;
    onPress: () => void;
}

export default function SurveyOption({ title, icon, onPress }: SurveyOptionProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            testID={`survey-${title.replace(/\s+/g, '-').toLowerCase()}`}
            className="flex-row items-center justify-center bg-gray-100 rounded-xl p-4 w-full mb-3"
        >
            <View className="mr-3">
                {getIcon(icon, 24, "#4b5563")}
            </View>
            <Text className="text-lg font-medium text-gray-800">{title}</Text>
        </TouchableOpacity>
    );
}

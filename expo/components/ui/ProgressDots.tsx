import { View } from "react-native";
import React from "react";

interface Props {
    total: number;
    completed: number;
}

export default function ProgressDots({ total, completed }: Props) {

    if (total <= 0) return null;

    return (
        <View className="flex-row justify-center items-center w-full">
            {Array.from({ length: total }, (_, index) => (
                <View key={`progress-dot-${index}`}
                    className={`w-2.5 h-2.5 rounded-full mx-1.5 ${index < completed ? 'bg-sky-500' : 'bg-gray-200'}`}
                />
            ))}
        </View>
    );
}

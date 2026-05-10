import { View } from "react-native";
import React from "react";

interface Props {
    total: number;
    completed: number;
}

// iOS-style progress indicator: thin pill segments that fill as you advance.
// Active segment is wider with brand fill; remaining segments are hairline pills.
export default function ProgressDots({ total, completed }: Props) {

    if (total <= 0) return null;

    return (
        <View className="flex-row items-center justify-center gap-1.5 w-full px-4">
            {Array.from({ length: total }, (_, index) => {
                const isDone = index < completed;
                const isActive = index === completed - 1;
                return (
                    <View key={`progress-segment-${index}`}
                        className={
                            "h-1 rounded-full " +
                            (isActive
                                ? "flex-[2] bg-primary-800"
                                : isDone
                                    ? "flex-1 bg-primary-800/70"
                                    : "flex-1 bg-background-200")
                        }
                    />
                );
            })}
        </View>
    );
}

import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { getIcon } from "../../lib/iconUtil";
import { hapticLight } from "../../lib/hapticUtil";

// Stack of overlapping circular buttons — the active one lifts to a tinted
// fill while the others sit behind it on a white pill.
export default function ViewSwitch({
    views = [],
    activeViewId,
    onSelect
}) {
    return (
        <View className="self-start flex-row items-center bg-background-0 rounded-full p-1 shadow-ios-card">
            {views.map((v, index) => {
                const isActive = activeViewId === v.id;
                const isFirst = index === 0;

                const marginClass = !isFirst ? "-ml-3" : "";
                const zIndexClass = isActive ? "z-10" : `z-[${views.length - index}]`;

                const bgColor = isActive ? "bg-background-100" : "bg-background-0";
                const iconColor = isActive ? "#091A2F" : "#8E8E93";

                return (
                    <Pressable
                        key={v.id}
                        onPress={() => { hapticLight(); onSelect(v.id); }}
                        className={`w-12 h-12 flex justify-center items-center active:opacity-80 ${marginClass} ${zIndexClass}`}>
                        <View className={`w-full h-full rounded-full flex justify-center items-center ${bgColor}`}>
                            <Text>{getIcon(v.icon, 20, iconColor)}</Text>
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}

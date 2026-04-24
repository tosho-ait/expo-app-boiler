import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { getIcon } from "../../lib/iconUtil";
import { hapticLight } from "../../lib/hapticUtil";

export default function ViewSwitch({
    views = [],
    activeViewId,
    onSelect
}) {
    return (
        <View className="flex-row items-center bg-white rounded-full p-1">
            {views.map((v, index) => {
                const isActive = activeViewId === v.id;
                const isFirst = index === 0;
                
                const marginClass = !isFirst ? "-ml-3" : "";
                const zIndexClass = isActive ? "z-10" : `z-[${views.length - index}]`;

                const bgColor = isActive ? "bg-gray-100" : "bg-white";
                const iconColor = isActive ? "#000000" : "#94a3b8";

                return (
                    <Pressable
                        key={v.id}
                        onPress={() => { hapticLight(); onSelect(v.id); }}
                        className={`w-12 h-12 flex justify-center items-center ${marginClass} ${zIndexClass}`}
                    >
                        <View className={`w-full h-full rounded-full flex justify-center items-center ${bgColor}`}>
                            <Text>{getIcon(v.icon, 20, iconColor)}</Text>
                        </View>
                    </Pressable>
                );
            })}
        </View>
    );
}

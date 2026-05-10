import React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";

const PanelEmpty = ({ text, subtext, icon = "folder-search-outline", action }) => {
    return (
        <View className="flex-1 justify-center items-center py-16 px-6 gap-4">
            <View className="w-20 h-20 rounded-full bg-background-100 items-center justify-center mb-2">
                <MaterialCommunityIcons name={icon} size={40} color="#8E8E93" />
            </View>
            <Text className="text-title-3 text-typography-900 text-center">{text}</Text>
            {subtext && (
                <Text className="text-callout text-typography-500 text-center -mt-2">
                    {subtext}
                </Text>
            )}
            {action && (
                <View className="pt-2 w-full max-w-[280px]">
                    <Button pill title={action.label} onPress={action.onPress} />
                </View>
            )}
        </View>
    );
};

export default PanelEmpty;

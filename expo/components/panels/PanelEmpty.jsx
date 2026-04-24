import React from 'react';
import {Text, View} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {COLORS} from "@/lib/colors";
import Button from "@/components/ui/Button";

const PanelEmpty = ({text, subtext, icon = "folder-search-outline", action}) => {

    return (
        <View className="flex-1 justify-center items-center py-20 m-3 gap-4">
            <MaterialCommunityIcons name={icon} size={72} color={COLORS.MUTED_500}/>
            <Text className="text-lg text-gray-500 text-center">{text}</Text>
            {subtext && (
                <Text className="text-sm text-gray-400 text-center px-6 -mt-2">{subtext}</Text>
            )}
            {action && (
                <Button blue pill title={action.label} onPress={action.onPress}/>
            )}
        </View>
    );
};

export default PanelEmpty;

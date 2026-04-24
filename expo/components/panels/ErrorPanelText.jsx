import React from 'react';
import {Text, View} from 'react-native';
import {getIcon} from "../../lib/iconUtil";


function ErrorPanelText({error}) {
    if (error) {
        return (
            <View className="bg-[#FFE6E6] p-4 flex-row items-center my-2 rounded-md">
                <View className="ml-2 mr-5">
                    {getIcon("fa5:exclamation-triangle", 24, "#991B1B")}
                </View>
                <View className="flex-1">
                    <Text className="text-gray-800 font-semibold text-base">{error}</Text>
                </View>
            </View>
        );
    }
    return null;
}

export default ErrorPanelText;

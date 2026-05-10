import React from 'react';
import { Text, View } from 'react-native';
import { getIcon } from "../../lib/iconUtil";


function ErrorPanelText({ error }) {
    if (!error) return null;
    return (
        <View className="bg-error-50 rounded-ios-xl px-4 py-3 my-2 flex-row items-center gap-3">
            <View>
                {getIcon("ii:alert-circle", 22, "#FF3B30")}
            </View>
            <Text className="flex-1 text-callout font-medium text-error-700">
                {error}
            </Text>
        </View>
    );
}

export default ErrorPanelText;

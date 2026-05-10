import React from 'react';
import { View } from 'react-native';

function FlexPanelBig({ children }) {
    return (
        <View className="flex gap-6 px-4">
            {children}
        </View>
    );
}

export default FlexPanelBig;

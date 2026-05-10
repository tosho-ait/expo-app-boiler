import React from 'react';
import { View } from 'react-native';

function FlexPage({ children }) {
    return (
        <View className="flex gap-6 pt-2 pb-40">
            {children}
        </View>
    );
}

export default FlexPage;

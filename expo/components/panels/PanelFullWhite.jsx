import React from 'react';
import { View } from 'react-native';

// Full-width content container — soft elevated card with iOS-style radius.
const PanelFullWhite = ({ children, className = "" }) => {
    return (
        <View className={`bg-background-0 rounded-ios-2xl shadow-ios-card mx-4 px-4 py-3 ${className}`}>
            {children}
        </View>
    );
};

export default PanelFullWhite;

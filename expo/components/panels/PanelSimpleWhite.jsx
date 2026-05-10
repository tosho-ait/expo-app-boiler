import React from 'react';
import { View } from 'react-native';

const PanelSimpleWhite = ({ children, className = "" }) => {
    return (
        <View className={`w-full rounded-ios-xl bg-background-0 shadow-ios-card ${className}`}>
            {children}
        </View>
    );
};

export default PanelSimpleWhite;

import React from 'react';
import { View } from 'react-native';

const PanelSimpleWhite = ({ children, className }) => {
    return (
        <View className={`w-full rounded-md bg-white ${className}`}>
            {children}
        </View>
    );
};

export default PanelSimpleWhite;

import React, { Children } from 'react';
import { View } from 'react-native';

// iOS grouped-list container: a single elevated white card whose children
// (typically <LinkSection> rows) are separated by inset hairline dividers.
const PanelDark = ({ children }) => {
    const items = Children.toArray(children).filter(Boolean);

    return (
        <View className="bg-background-0 rounded-ios-2xl shadow-ios-card overflow-hidden">
            {items.map((child, i) => (
                <View key={i}>
                    {child}
                    {i < items.length - 1 && (
                        <View className="ml-[64px] h-px bg-outline-100" />
                    )}
                </View>
            ))}
        </View>
    );
};

export default PanelDark;

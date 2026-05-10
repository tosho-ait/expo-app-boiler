import { Text, View } from 'react-native';
import React from 'react';

export const TitleText = ({ children }: { children: React.ReactNode }) => (
    <Text className="text-title-1 font-bold text-typography-900 mb-3 text-center">{children}</Text>
);

export const SubText = ({ children }: { children: React.ReactNode }) => (
    <Text className="text-callout text-typography-500 mb-6 px-4 text-center leading-6">{children}</Text>
);

export const ScreenLayout = ({ children }: { children: React.ReactNode }) => (
    <View className="flex-1 mt-6">
        {children}
    </View>
);

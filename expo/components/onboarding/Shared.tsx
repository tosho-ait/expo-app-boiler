import { Text, View } from 'react-native';
import React from 'react';

export const TitleText = ({ children }: { children: React.ReactNode }) => (
    <Text className="text-gray-900 text-3xl font-bold mb-6 text-center">{children}</Text>
);

export const SubText = ({ children }: { children: React.ReactNode }) => (
    <Text className="text-gray-500 text-lg font-normal mb-6 px-8 text-center">{children}</Text>
);

export const ScreenLayout = ({ children }: { children: React.ReactNode }) => (
    <View className="flex-1 px-4 mt-12">
        {children}
    </View>
);

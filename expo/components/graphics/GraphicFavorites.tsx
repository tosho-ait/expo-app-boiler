import React from 'react';
import {View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function GraphicFavorites() {

    const circle = (bgClass: string, icon: string, color: string) => (
        <View className={`w-10 h-10 rounded-full items-center justify-center ${bgClass}`}>
            <MaterialIcons name={icon as any} size={18} color={color}/>
        </View>
    );

    return (
        <View className="items-center justify-center mb-10">
            <View
                className="w-48 h-80 border-4 border-gray-900 rounded-[36px] bg-white relative shadow-lg items-center pt-12 overflow-hidden">
                {/* iPhone Notch */}
                <View className="absolute top-[-2px] w-24 h-6 bg-gray-900 rounded-b-2xl z-20"/>

                {/* Star button - upper right, outline */}
                <View className="flex-row items-center justify-end mb-4 w-full px-3 mr-4">
                    <MaterialIcons name="star-outline" size={26} color="#091A2F"/>
                </View>

                {/* Favorites grid */}
                <View className="flex-row flex-wrap justify-between px-4">
                    <View className="items-center mb-4 w-[30%]">
                        {circle('bg-red-100', 'restaurant', '#dc2626')}
                        <View className="h-2 bg-gray-200 rounded-full w-8 mt-1.5"/>
                    </View>
                    <View className="items-center mb-4 w-[30%]">
                        {circle('bg-blue-100', 'directions-car', '#2563eb')}
                        <View className="h-2 bg-gray-200 rounded-full w-6 mt-1.5"/>
                    </View>
                    <View className="items-center mb-4 w-[30%]">
                        {circle('bg-green-100', 'shopping-cart', '#16a34a')}
                        <View className="h-2 bg-gray-200 rounded-full w-7 mt-1.5"/>
                    </View>
                    <View className="items-center mb-4 w-[30%]">
                        {circle('bg-purple-100', 'home', '#9333ea')}
                        <View className="h-2 bg-gray-200 rounded-full w-7 mt-1.5"/>
                    </View>
                    <View className="items-center mb-4 w-[30%]">
                        {circle('bg-amber-100', 'local-cafe', '#d97706')}
                        <View className="h-2 bg-gray-200 rounded-full w-5 mt-1.5"/>
                    </View>
                    <View className="items-center mb-4 w-[30%]">
                        {circle('bg-sky-100', 'fitness-center', '#0284c7')}
                        <View className="h-2 bg-gray-200 rounded-full w-8 mt-1.5"/>
                    </View>
                </View>
            </View>
        </View>
    );
}

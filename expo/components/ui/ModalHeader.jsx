import React from 'react';
import {Text, View} from 'react-native';
import RoundButton from './RoundButton';

export default function ModalHeader({title, onClose, before, after}) {
    return (
        <View className="flex-row justify-between items-center px-6 pt-4 pb-3">
            <Text className="text-xl font-bold text-slate-800 flex-shrink" numberOfLines={1}>
                {title}
            </Text>
            <View className="flex-row gap-3">
                {before}
                {onClose && <RoundButton variant="close" onPress={onClose}/>}
                {after}
            </View>
        </View>
    );
}

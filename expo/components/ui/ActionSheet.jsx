import React from 'react';
import {Modal, Pressable, View} from 'react-native';

export default function ActionSheet({visible, onClose, children}) {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <Pressable className="flex-1 justify-end bg-black/50" onPress={onClose}>
                <Pressable className="bg-white rounded-t-3xl pb-10" onPress={() => {}}>
                    <View className="items-center pt-2 pb-4">
                        <View className="w-10 h-1 rounded-full bg-gray-300"/>
                    </View>
                    {children}
                </Pressable>
            </Pressable>
        </Modal>
    );
}

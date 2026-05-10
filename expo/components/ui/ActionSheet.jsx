import React from 'react';
import { Modal, Pressable, View } from 'react-native';

export default function ActionSheet({ visible, onClose, children }) {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <Pressable className="flex-1 justify-end bg-black/40" onPress={onClose}>
                <Pressable className="bg-background-0 rounded-t-ios-3xl pb-10 shadow-ios-card-lg" onPress={() => { }}>
                    <View className="items-center pt-3 pb-3">
                        <View className="w-9 h-1 rounded-full bg-background-300" />
                    </View>
                    {children}
                </Pressable>
            </Pressable>
        </Modal>
    );
}

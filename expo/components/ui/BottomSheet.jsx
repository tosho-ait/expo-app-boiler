import React from 'react';
import {Keyboard, Modal, TouchableWithoutFeedback, View} from 'react-native';
import ModalHeader from './ModalHeader';

export default function BottomSheet({
    visible,
    onClose,
    title,
    children,
    heightClass = 'h-[80%]',
    dismissKeyboardOnTap = false,
}) {

    const shell = (
        <View className="flex-1 justify-end bg-black/50">
            <View className={`bg-white rounded-t-xl w-full ${heightClass}`}>
                <ModalHeader title={title} onClose={onClose}/>
                {children}
            </View>
        </View>
    );

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            {dismissKeyboardOnTap ? (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    {shell}
                </TouchableWithoutFeedback>
            ) : shell}
        </Modal>
    );
}

import React, { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import { hapticSuccess, hapticWarning } from "@/lib/hapticUtil";

export default function RoundButton({ variant, onPress, disabled, confirm }) {

    const [showModal, setShowModal] = useState(false);

    // Default variant: close
    let bgColor = "bg-background-100";
    let iconColor = "#636366";
    let iconName = "times";

    if (variant === 'save') {
        bgColor = disabled ? "bg-background-200" : "bg-primary-800";
        iconColor = disabled ? "#C6C6C8" : "white";
        iconName = "check";
    } else if (variant === 'delete') {
        bgColor = "bg-error-50";
        iconColor = "#FF3B30";
        iconName = "trash-alt";
    } else if (variant === 'reject') {
        bgColor = "bg-error-50";
        iconColor = "#FF3B30";
        iconName = "thumbs-down";
    }

    const fireHaptic = () => {
        if (disabled) return;
        if (confirm) {
            hapticWarning();
        } else if (variant === 'save') {
            hapticSuccess();
        } else if (variant === 'delete' || variant === 'reject') {
            hapticWarning();
        }
    };

    const handlePress = () => {
        fireHaptic();
        if (confirm) {
            setShowModal(true);
        } else {
            onPress && onPress();
        }
    };

    const handleConfirm = () => {
        onPress && onPress();
        setShowModal(false);
    };

    return (
        <>
            <TouchableOpacity
                onPress={handlePress}
                disabled={disabled}
                activeOpacity={0.6}
                className={`w-10 h-10 rounded-full items-center justify-center ${bgColor}`}>
                <FontAwesome5 name={iconName} size={15} color={iconColor} />
            </TouchableOpacity>

            {confirm && (
                <Modal transparent
                    visible={showModal}
                    animationType="fade"
                    onRequestClose={() => setShowModal(false)}>
                    <Pressable className="flex-1 justify-center items-center bg-black/40 px-8" onPress={() => setShowModal(false)}>
                        <Pressable
                            onPress={(e) => e.stopPropagation()}
                            className="w-full max-w-[340px] bg-background-0 rounded-ios-2xl overflow-hidden shadow-ios-card-lg">
                            <View className="px-5 pt-5 pb-3 items-center">
                                <Text className="text-headline font-semibold text-typography-900 text-center">
                                    {confirm?.title}
                                </Text>
                                <Text className="text-footnote text-typography-600 text-center mt-2">
                                    {confirm?.text}
                                </Text>
                            </View>
                            <View className="h-px bg-outline-100" />
                            <View className="flex-row">
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() => setShowModal(false)}
                                    className="flex-1 py-3 items-center justify-center">
                                    <Text className="text-body text-tertiary-500">Cancel</Text>
                                </TouchableOpacity>
                                <View className="w-px bg-outline-100" />
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={handleConfirm}
                                    className="flex-1 py-3 items-center justify-center">
                                    <Text className="text-body font-semibold text-error-500">
                                        {confirm?.buttonLabel || "Confirm"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Pressable>
                    </Pressable>
                </Modal>
            )}
        </>
    );
}

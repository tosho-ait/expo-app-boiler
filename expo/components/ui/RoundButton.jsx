import React, {useState} from 'react';
import {Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome5} from "@expo/vector-icons";
import Button from "./Button";
import {COLORS} from "@/lib/colors";
import {hapticSuccess, hapticWarning} from "@/lib/hapticUtil";

export default function RoundButton({variant, onPress, disabled, confirm}) {

    const [showModal, setShowModal] = useState(false);

    // default is close

    let bgColor = "bg-slate-200";
    let iconColor = "#64748b";
    let iconName = "times";

    if (variant === 'save') {
        bgColor = disabled ? "bg-gray-300" : COLORS.ACCENT_BG;
        iconColor = "white";
        iconName = "check";

    } else if (variant === 'delete') {
        bgColor = "bg-red-100";
        iconColor = "#ef4444";
        iconName = "trash-alt";

    } else if (variant === 'reject') {
        bgColor = "bg-red-100";
        iconColor = "#ef4444";
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
        // default "close" variant: no haptic — the modal dismiss animation is feedback enough.
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
                className={`w-10 h-10 rounded-full items-center justify-center ${bgColor}`}>
                <FontAwesome5 name={iconName} size={16} color={iconColor}/>
            </TouchableOpacity>

            {confirm && (
                <Modal transparent
                       visible={showModal}
                       animationType="fade"
                       onRequestClose={() => setShowModal(false)}>
                    <Pressable className="flex-1 justify-center items-center bg-black/25" onPress={() => setShowModal(false)}>

                        <View className="w-[90%] bg-white rounded-xl overflow-hidden">
                            <View
                                className="flex-row justify-between items-center px-5 pt-4 pb-3">
                                <Text className="text-xl font-bold text-slate-800">{confirm?.title}</Text>
                                <RoundButton variant="close" onPress={() => setShowModal(false)}/>
                            </View>

                            <View className="p-5">
                                <Text className="text-lg font-medium text-slate-800 mb-4">{confirm?.text}</Text>

                                <View className="flex-row justify-end pt-2">
                                    <Button blue
                                             title={confirm?.buttonLabel || "Confirm"}
                                             onPress={handleConfirm}/>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                </Modal>
            )}
        </>
    );
}

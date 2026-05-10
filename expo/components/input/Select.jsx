import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useT } from "@/i18n";

export default function Select({ value, onChange, options, className, label }) {

    const [visible, setVisible] = useState(false);
    const selectedOption = options.find(o => value && o.value === value);
    const { t } = useT();

    return (
        <View className={className}>

            {label && <Text className="text-footnote font-medium text-typography-500 mb-2 px-1 uppercase tracking-wide">{label}</Text>}

            <Pressable
                onPress={() => setVisible(true)}
                className="flex-row items-center justify-between bg-background-0 border border-outline-200 rounded-ios-xl px-4 h-[54px] active:opacity-80">
                <Text className={
                    "text-body " +
                    (selectedOption ? "text-typography-900" : "text-typography-400")
                }>
                    {selectedOption?.label || selectedOption?.fullName || t("common.selectOption")}
                </Text>
                <Ionicons name="chevron-down" size={18} color="#8E8E93" />
            </Pressable>

            <Modal visible={visible} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
                <Pressable className="flex-1 justify-end bg-black/40" onPress={() => setVisible(false)}>
                    <Pressable className="bg-background-0 rounded-t-ios-3xl pb-10 shadow-ios-card-lg" onPress={() => { }}>
                        <View className="items-center pt-3 pb-2">
                            <View className="w-9 h-1 rounded-full bg-background-300" />
                        </View>
                        {label && (
                            <Text className="text-headline font-semibold text-typography-900 text-center pb-3 pt-1">
                                {label}
                            </Text>
                        )}
                        <ScrollView style={{ maxHeight: 500 }} className="w-full px-3">
                            {options.map(o => {
                                if (o.group) {
                                    return (
                                        <View key={o.group} className="pt-3 pb-1 px-4">
                                            <Text className="text-caption text-typography-500 font-semibold uppercase tracking-wide">{o.group}</Text>
                                        </View>
                                    );
                                }
                                const itemLabel = o.fullName || o.label;
                                const isSelected = o.value === value;
                                return (
                                    <Pressable
                                        key={o.value}
                                        disabled={o.disabled}
                                        onPress={() => {
                                            onChange(o.value);
                                            setVisible(false);
                                        }}
                                        className={
                                            "py-3.5 px-4 rounded-ios-lg flex-row items-center justify-between active:opacity-70 " +
                                            (isSelected ? "bg-background-100" : "") +
                                            (o.disabled ? " opacity-40" : "")
                                        }>
                                        <Text className={
                                            "text-body " +
                                            (isSelected ? "text-primary-800 font-semibold" : "text-typography-900")
                                        }>{itemLabel}</Text>
                                        {isSelected && (
                                            <Ionicons name="checkmark" size={20} color="#091A2F" />
                                        )}
                                    </Pressable>
                                );
                            })}
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>

        </View>
    );
}

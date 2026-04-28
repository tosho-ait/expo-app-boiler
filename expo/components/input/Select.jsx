import React, {useState} from 'react';
import {Modal, Pressable, ScrollView, Text, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useT} from "@/i18n";

export default function Select({value, onChange, options, className, label}) {

    const [visible, setVisible] = useState(false);
    const selectedOption = options.find(o => value && o.value === value);
    const {t} = useT();

    return <View className={className}>

        {label && <Text className="text-lg font-semibold">{label}</Text>}

        <Pressable
            onPress={() => setVisible(true)}
            className="flex-row items-center justify-between border border-gray-300 rounded px-3 h-12">
            <Text className="text-base text-gray-900">{selectedOption?.label || selectedOption?.fullName || t("common.selectOption")}</Text>
            <Ionicons name="chevron-down" size={16} color="#a3a3a3"/>
        </Pressable>

        <Modal visible={visible} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
            <Pressable className="flex-1 justify-end bg-black/50" onPress={() => setVisible(false)}>
                <Pressable className="bg-white rounded-t-3xl pb-10" onPress={() => {}}>
                    <View className="items-center pt-2 pb-4">
                        <View className="w-10 h-1 rounded-full bg-gray-300"/>
                    </View>
                    <ScrollView style={{maxHeight: 500}} className="w-full px-4">
                        {options.map(o => {
                            if (o.group) {
                                return <View key={o.group} className="py-2 px-4">
                                    <Text className="text-sm text-gray-400 font-semibold">{o.group}</Text>
                                </View>
                            }
                            const itemLabel = o.fullName || o.label;
                            const isSelected = o.value === value;
                            return <Pressable
                                key={o.value}
                                disabled={o.disabled}
                                onPress={() => {
                                    onChange(o.value);
                                    setVisible(false);
                                }}
                                className={"py-3 px-4 rounded-lg " + (isSelected ? "bg-gray-100" : "") + (o.disabled ? " opacity-40" : "")}>
                                <Text className={"text-base " + (isSelected ? "font-semibold" : "")}>{itemLabel}</Text>
                            </Pressable>
                        })}
                    </ScrollView>
                </Pressable>
            </Pressable>
        </Modal>

    </View>
}

import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';


function sanitizeLabel(str) {
    if (!str) return str;
    const cleaned = str.replace(/[^a-zA-Z0-9- ]/g, '');
    return cleaned.slice(0, 16);
}

function sanitizeEmail(str) {
    if (!str) return str;
    return str.toLowerCase();
}

const InputStringUncentered = ({
    value,
    onChange,
    label,
    isDisabled,
    readOnly,
    isEmail,
    isLabel,
    maxLength,
}) => {

    const [str, setStr] = useState(value);
    const [isFocused, setIsFocused] = useState(false);

    const borderClass = isFocused ? "border-tertiary-500" : "border-outline-200";

    return (
        <View className="w-full mt-1">

            <View className={`bg-background-0 border rounded-ios-xl px-4 h-[54px] items-center flex-row ${borderClass}`}>

                <Text className="text-typography-500 text-body mr-2">{label}</Text>

                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 17,
                        color: isDisabled ? '#8E8E93' : '#111111',
                        textAlign: 'left',
                        paddingVertical: 0,
                    }}
                    editable={!isDisabled && !readOnly}
                    textAlignVertical="center"
                    onChangeText={n => {
                        if (!isDisabled && !readOnly) {
                            if (isEmail) {
                                n = sanitizeEmail(n);
                            } else if (isLabel) {
                                n = sanitizeLabel(n);
                            }
                            if (maxLength && n.length > maxLength) {
                                n = n.substring(0, maxLength);
                            }
                            setStr(n);
                            onChange(n);
                        }
                    }}
                    value={str}
                    placeholder=""
                    autoCapitalize='none'
                    autoCorrect={false}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
        </View>
    );
};

export default InputStringUncentered;

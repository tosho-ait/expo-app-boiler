import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';


const InputStringCenteredNB = ({
    value,
    onChange,
    label,
    isDisabled,
    readOnly,
    maxLength,
}) => {

    const [str, setStr] = useState(value);

    return (
        <View className="w-full">

            <View className="relative bg-background-0 rounded-ios-xl px-4 h-[54px] items-center flex-row">

                <Text className="absolute bg-background-0 z-10 pr-2 left-4 text-typography-500 text-body">{label}</Text>

                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 17,
                        color: '#111111',
                        textAlign: 'center',
                        paddingVertical: 0,
                    }}
                    editable={!isDisabled && !readOnly}
                    textAlignVertical="center"
                    onChangeText={n => {
                        if (!isDisabled && !readOnly) {
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
                />
            </View>
        </View>
    );
};

export default InputStringCenteredNB;

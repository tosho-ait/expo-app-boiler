import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';


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

    return (
        <View className="w-full mt-1">

            <View className="bg-white border border-gray-300 rounded-xl px-4 h-[50px] items-center flex-row">

                <Text className="text-gray-500 text-lg mr-1">{label}</Text>

                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 18,
                        textAlign: 'center',
                        paddingVertical: 0
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
                />
            </View>
        </View>
    );
};

export default InputStringUncentered;

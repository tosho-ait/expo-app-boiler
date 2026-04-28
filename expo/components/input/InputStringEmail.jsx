import React, { useState } from 'react';
import { Text, View, Animated, TextInput } from 'react-native';
import { useT } from "@/i18n";


function sanitizeEmail(str) {
    if (!str) return str;
    return str.toLowerCase();
}

const InputStringEmail = ({ value, onChange, isDisabled, readOnly, bumpRight, onFocus, onBlur }) => {

    const [str, setStr] = useState(value);
    const [isFocused, setIsFocused] = useState(false);
    const { t } = useT();

    // Animation state
    const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: (isFocused || (str && str.length > 0)) ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, str]);

    const labelTop = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [16, -10]
    });

    const labelSize = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12]
    });

    return (
        <View className="w-full relative mt-1">

            <Animated.Text style={{
                position: 'absolute',
                left: 12,
                top: labelTop,
                fontSize: labelSize,
                color: '#6b7280',
                zIndex: 9999,
                backgroundColor: 'white',
                paddingHorizontal: 4,
            }}>
                {t("auth.email")}
            </Animated.Text>

            <View className="bg-white border border-gray-300 rounded-xl px-4 h-[50px] items-center flex-row">

                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 18,
                        textAlign: 'left',
                        paddingVertical: 0
                    }}
                    editable={!isDisabled && !readOnly}
                    textAlignVertical="center"
                    onChangeText={n => {
                        if (!isDisabled && !readOnly) {
                            n = sanitizeEmail(n);
                            setStr(n);
                            onChange(n);
                        }
                    }}
                    value={str}
                    placeholder=""
                    textContentType="username"
                    autoComplete="username"
                    importantForAutofill="yes"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => {
                        setIsFocused(true);
                        if (onFocus) onFocus();
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        if (onBlur) onBlur();
                    }}
                />
            </View>
        </View>
    );
};

export default InputStringEmail;
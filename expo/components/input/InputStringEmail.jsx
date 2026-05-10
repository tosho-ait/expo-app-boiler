import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    interpolateColor,
} from 'react-native-reanimated';
import { useT } from "@/i18n";


function sanitizeEmail(str) {
    if (!str) return str;
    return str.toLowerCase();
}

const InputStringEmail = ({ value, onChange, isDisabled, readOnly, onFocus, onBlur, error }) => {

    const [str, setStr] = useState(value);
    const [isFocused, setIsFocused] = useState(false);
    const { t } = useT();

    const isFloated = isFocused || (str && str.length > 0);
    const progress = useSharedValue(value ? 1 : 0);

    useEffect(() => {
        progress.value = withTiming(isFloated ? 1 : 0, { duration: 200 });
    }, [isFloated, progress]);

    const focusColor = error ? '#FF3B30' : '#0A84FF';

    const animatedLabel = useAnimatedStyle(() => ({
        top: interpolate(progress.value, [0, 1], [16, -10]),
        fontSize: interpolate(progress.value, [0, 1], [16, 12]),
        color: interpolateColor(progress.value, [0, 1], ['#8E8E93', focusColor]),
    }));

    const borderClass = error
        ? "border-error-500"
        : isFocused ? "border-tertiary-500" : "border-outline-200";

    return (
        <View className="w-full relative mt-1">

            <Animated.Text style={[
                animatedLabel,
                {
                    position: 'absolute',
                    left: 12,
                    zIndex: 9999,
                    backgroundColor: 'white',
                    paddingHorizontal: 4,
                },
            ]}>
                {t("auth.email")}
            </Animated.Text>

            <View className={`bg-background-0 border rounded-ios-xl px-4 h-[50px] items-center flex-row ${borderClass}`}>

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

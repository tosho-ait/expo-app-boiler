import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    interpolateColor,
} from 'react-native-reanimated';


function sanitizeLabel(str) {
    if (!str) return str;
    const cleaned = str.replace(/[^a-zA-Z0-9- ]/g, '');
    return cleaned.slice(0, 16);
}

function sanitizeEmail(str) {
    if (!str) return str;
    return str.toLowerCase();
}

// Floating-label input. Built on Reanimated because under Expo 54 / Fabric,
// the classic Animated API doesn't reliably drive layout props like `top` and
// `fontSize` with useNativeDriver: false.
const InputString = ({
    onFocus,
    value,
    onChange,
    myRef,
    label,
    isDisabled,
    readOnly,
    isEmail,
    isLabel,
    maxLength,
    error,
}) => {

    const [str, setStr] = useState(value);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setStr(value || '');
    }, [value]);

    const isFloated = isFocused || (str && str.length > 0);
    const progress = useSharedValue(value ? 1 : 0);

    useEffect(() => {
        progress.value = withTiming(isFloated ? 1 : 0, { duration: 200 });
    }, [isFloated, progress]);

    // Color of the label: muted at rest, accent on focus, red on error.
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
                {label}
            </Animated.Text>

            <View className={`bg-background-0 border rounded-ios-xl px-4 h-[50px] items-center flex-row ${borderClass}`}>

                <TextInput
                    ref={myRef}
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
                    onFocus={() => {
                        setIsFocused(true);
                        onFocus && onFocus();
                    }}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
        </View>
    );
};

export default InputString;

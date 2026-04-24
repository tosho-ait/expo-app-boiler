import React, {useState} from 'react';
import {Animated, TextInput, View} from 'react-native';


function sanitizeLabel(str) {
    if (!str) return str;
    const cleaned = str.replace(/[^a-zA-Z0-9- ]/g, '');
    return cleaned.slice(0, 16);
}

function sanitizeEmail(str) {
    if (!str) return str;
    return str.toLowerCase();
}

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
                     }) => {

    const [str, setStr] = useState(value);
    const [isFocused, setIsFocused] = useState(false);

    // Sync internal state when value prop changes externally (e.g. form reset)
    React.useEffect(() => {
        setStr(value || '');
    }, [value]);

    // Animation state
    const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: (isFocused || (str && str.length > 0)) ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, str]); // Track str instead of value to match internal state

    // If external value changes, we might want to sync, but sticking to original logic for now
    // except reacting to value prop if provided?
    // Original code didn't sync, so I won't introduce new sync logic to minimize side effects,
    // BUT I must ensure animation respects the *current* display value which is 'str'.

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
                {label}
            </Animated.Text>

            <View className="bg-white border border-gray-300 rounded-xl px-4 h-[50px] items-center flex-row">

                <TextInput
                    ref={myRef}
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
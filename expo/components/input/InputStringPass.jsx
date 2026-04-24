import React, {useState} from 'react';
import {Text, View, Animated, TextInput} from 'react-native';


const InputStringPass = ({value, onChange, isDisabled, readOnly, label}) => {

    const [str, setStr] = useState(value);
    const [isFocused, setIsFocused] = useState(false);

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
                {label ? label : "Password"}
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
                            setStr(n);
                            onChange(n);
                        }
                    }}
                    value={str}
                    placeholder=""
                    secureTextEntry={true}
                    textContentType="password"
                    autoComplete="password"
                    importantForAutofill="yes"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
        </View>
    );
};

export default InputStringPass;
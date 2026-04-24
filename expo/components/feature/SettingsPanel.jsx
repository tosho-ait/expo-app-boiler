import { Linking, Text, View } from 'react-native';
import React from "react";
import Select from "../input/Select";
import { currencies } from "../../lib/currencies";


export default function SettingsPanel({ defaultCurrency, setDefaultCurrency, showLegal, hideCurrencyLabel }) {
    return (
        <View className="flex gap-10 bg-white">

            <Select
                className="w-[100%]"
                label={hideCurrencyLabel ? null : "Currency"}
                value={defaultCurrency}
                onChange={setDefaultCurrency}
                options={currencies.map(c => ({ value: c.value, label: c.value + " - " + c.fullName, group: c.group }))} />


            {showLegal && <View className="mt-24 px-10">
                <View key="665" className="flex">
                    <Text className="text-lg text-gray-700 text-center">By using this app, you agree to our</Text>

                    <Text className="text-lg text-gray-700 text-center">
                        <Text className="font-semibold underline"
                            onPress={() => Linking.openURL('/terms-of-service')}>
                            Terms of Service
                        </Text>{' '}and{' '}
                        <Text className="font-semibold underline"
                            onPress={() => Linking.openURL('/privacy-policy')}>
                            Privacy Policy
                        </Text>.
                    </Text>
                </View>
            </View>}

        </View>
    );
}

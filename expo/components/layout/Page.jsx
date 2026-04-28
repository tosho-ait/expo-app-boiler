import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {useNavigation, useRouter} from "expo-router";
import Button from "../ui/Button";
import DeviceInfo from "react-native-device-info";
import {useT} from "@/i18n";

const Page = ({children, heading, noBackButton}) => {

    const isTablet = DeviceInfo.isTablet();

    const router = useRouter();
    const navigation = useNavigation();
    const {t} = useT();

    return (
        <View className="flex-1 bg-gray-100">

            {/* HEADER */}
            <SafeAreaView>
                <View className="w-full pb-1 px-2 flex-row items-center justify-between">
                    <View className="w-20">
                        {!noBackButton &&
                            <Button link_blue title={t("common.back")} icon="ii:chevron-back" onPress={() => {
                                if (navigation.canGoBack()) {
                                    router.back();
                                } else {
                                    router.replace("/");
                                }
                            }}/>}
                    </View>
                    <View className="flex-1 items-center">
                        {heading && (
                            <Text className="text-xl font-bold">
                                {heading}
                            </Text>
                        )}
                    </View>
                    <View className="w-20"/>
                </View>
            </SafeAreaView>

            {/* CONTENT */}
            <View className={
                isTablet
                    ? "flex-1 bg-gray-100 px-12"
                    : "flex-1 bg-gray-100"
            }>
                <ScrollView>
                    {children}
                </ScrollView>
            </View>

        </View>
    );
};

export default Page;

import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Button from "../ui/Button";
import { useNavigation, useRouter } from "expo-router";
import DeviceInfo from "react-native-device-info";
import { useT } from "@/i18n";


// Onboarding-style page: full-bleed white content area with a bottom button
// dock that sits flush on the system grouped background.
const PageSignature = ({
    children,
    buttons,
    heading,
    noBackButton,
    onBack,
}) => {

    const isTablet = DeviceInfo.isTablet();

    const router = useRouter();
    const navigation = useNavigation();
    const { t } = useT();

    return (
        <View className="flex-1 bg-background-0">

            {/* HEADER */}
            <SafeAreaView>
                <View className="w-full px-2 pt-1 pb-2 flex-row items-center justify-between min-h-[44px]">
                    <View className="w-24">
                        {!noBackButton &&
                            <Button link_blue title={t("common.back")} icon="ii:chevron-back" testID="page-back" onPress={() => {
                                if (onBack) {
                                    onBack();
                                } else if (navigation.canGoBack()) {
                                    router.back();
                                } else {
                                    router.replace("/");
                                }
                            }} />}
                    </View>
                    <View className="flex-1 items-center">
                        {heading && (
                            typeof heading === 'string' ? (
                                <Text className="text-headline font-semibold text-typography-900" numberOfLines={1}>
                                    {heading}
                                </Text>
                            ) : (
                                heading
                            )
                        )}
                    </View>
                    <View className="w-24" />
                </View>
            </SafeAreaView>

            {/* CONTENT */}
            <View className="flex-1 flex justify-between">

                <View className={isTablet ? "flex-1 px-14 pt-4" : "flex-1 px-5 pt-4"}>
                    {children}
                </View>

                {/* BUTTON DOCK — soft shadow above the dock to lift it visually. */}
                {buttons && (
                    <SafeAreaView className="bg-background-0">
                        <View className={isTablet ? "px-14 pt-4 pb-4" : "px-5 pt-4 pb-4"}>
                            {buttons}
                        </View>
                    </SafeAreaView>
                )}

            </View>

        </View>
    );
};

export default PageSignature;

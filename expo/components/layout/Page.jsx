import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRouter } from "expo-router";
import Button from "../ui/Button";
import DeviceInfo from "react-native-device-info";
import { useT } from "@/i18n";

const Page = ({ children, heading, noBackButton, scroll = true }) => {

    const isTablet = DeviceInfo.isTablet();

    const router = useRouter();
    const navigation = useNavigation();
    const { t } = useT();

    const Body = scroll ? ScrollView : View;
    const bodyProps = scroll
        ? { contentContainerStyle: { paddingBottom: 40 }, showsVerticalScrollIndicator: false }
        : { style: { flex: 1 } };

    return (
        <View className="flex-1 bg-background-100">

            {/* HEADER — flush with the system grouped background. */}
            <SafeAreaView>
                <View className="w-full px-2 pt-1 pb-2 flex-row items-center justify-between min-h-[44px]">
                    <View className="w-24">
                        {!noBackButton &&
                            <Button link_blue title={t("common.back")} icon="ii:chevron-back" onPress={() => {
                                if (navigation.canGoBack()) {
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
                            ) : heading
                        )}
                    </View>
                    <View className="w-24" />
                </View>
            </SafeAreaView>

            {/* CONTENT */}
            <View className={isTablet ? "flex-1 px-12" : "flex-1"}>
                <Body {...bodyProps}>
                    {children}
                </Body>
            </View>

        </View>
    );
};

export default Page;

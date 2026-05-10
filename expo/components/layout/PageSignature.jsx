import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from "../ui/Button";
import { useNavigation, useRouter } from "expo-router";
import DeviceInfo from "react-native-device-info";
import { COLORS } from "@/lib/colors";
import { useT } from "@/i18n";


const PageSignature = ({
    children,
    buttons,
    heading,
    noBackButton,
    onBack
}) => {

    const isTablet = DeviceInfo.isTablet();

    const router = useRouter();
    const navigation = useNavigation();
    const { t } = useT();

    let classesContainer = "flex justify-between";
    let rootClasses = "flex-1 flex bg-white";

    const pageAccent = COLORS.BLUE_BG;

    return (
        <View className={rootClasses}>

            {/* HEADER */}
            <SafeAreaView>
                <View className="w-full pb-1 px-2 flex-row items-center justify-between">
                    <View className="w-20">
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
                                <Text className="text-xl font-bold">
                                    {heading}
                                </Text>
                            ) : (
                                heading
                            )
                        )}
                    </View>
                    <View className="w-20" />
                </View>
            </SafeAreaView>


            <View className="flex-1 bg-gray-100">

                <View style={{ flex: 1 }} className={classesContainer}>

                    <View style={{ flex: 1 }} className="items-center">
                        <View className={
                            isTablet
                                ? "px-14 items-left w-full h-full bg-white pt-4"
                                : "px-4 items-left w-full h-full bg-white pt-4"
                        }>
                            {children}
                        </View>
                    </View>

                    <View className={
                        isTablet
                            ? pageAccent
                            : pageAccent + " px-6"}>

                        {buttons && <View className="pt-6 pb-12">
                            {buttons}
                        </View>}

                        {!buttons && <View className="h-14" />}

                    </View>

                </View>

            </View>

        </View>
    );
};

export default PageSignature;

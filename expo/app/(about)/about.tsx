import { Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import PageSignature from "@/components/layout/PageSignature";
import Button from "@/components/ui/Button";
import FeedbackModal from "@/components/feature/FeedbackModal";
import * as Application from "expo-application";
import { COLORS } from "@/lib/colors";
import { useT } from "@/i18n";


export default function AboutPage() {

    const appVersion = Application.nativeApplicationVersion;
    const [showFeedback, setShowFeedback] = useState(false);
    const { t } = useT();

    return (
        <PageSignature heading={t("about.title")}>

            <View className="flex gap-6">

                <View className="flex justify-center min-h-12" />

                <View key="3" className="flex-row items-center mb-6">
                    <Image
                        source={require('../../assets/images/icon.png')}
                        className="w-24 h-24 rounded-md"
                        resizeMode="cover" />
                    <View className="ml-4 flex-1">
                        <Text className="text-3xl font-black text-left text-gray-900 leading-tight">
                            App<Text className={COLORS.BLUE_TEXT}>Boiler</Text>
                        </Text>
                        <Text className="text-lg text-gray-500 mt-1">
                            {t("welcome.tagline")}
                        </Text>
                    </View>
                </View>

                <Text key="1" className="text-lg text-gray-700 leading-relaxed">
                    {t("about.description")}
                </Text>

                <View key="5" className="flex-row items-center justify-center mb-6 gap-3">
                    <Button link_blue title={t("about.leaveFeedback")} onPress={() => setShowFeedback(true)} />
                </View>

                <View key="7" className="flex-row items-center justify-center gap-3 mb-8">
                    <Text className="text-gray-400 text-sm">{t("about.version", { version: appVersion })}</Text>
                </View>

            </View>

            <FeedbackModal visible={showFeedback} onClose={() => setShowFeedback(false)} />
        </PageSignature>
    );
}

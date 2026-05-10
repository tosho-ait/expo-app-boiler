import { Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import PageSignature from "@/components/layout/PageSignature";
import Button from "@/components/ui/Button";
import FeedbackModal from "@/components/feature/FeedbackModal";
import * as Application from "expo-application";
import { useT } from "@/i18n";


export default function AboutPage() {

    const appVersion = Application.nativeApplicationVersion;
    const [showFeedback, setShowFeedback] = useState(false);
    const { t } = useT();

    return (
        <PageSignature heading={t("about.title")}>

            <View className="flex gap-6 pt-2">

                <View className="flex-row items-center mb-4">
                    <Image
                        source={require('../../assets/images/icon.png')}
                        className="w-20 h-20 rounded-ios-xl shadow-ios-card"
                        resizeMode="cover" />
                    <View className="ml-4 flex-1">
                        <Text className="text-title-1 font-black text-left text-typography-900 leading-tight">
                            App<Text className="text-tertiary-500">Boiler</Text>
                        </Text>
                        <Text className="text-callout text-typography-500 mt-1">
                            {t("welcome.tagline")}
                        </Text>
                    </View>
                </View>

                <Text className="text-body text-typography-700 leading-7">
                    {t("about.description")}
                </Text>

                <View className="items-center mt-2">
                    <Button secondary
                        icon="ii:chatbubble-ellipses-outline"
                        title={t("about.leaveFeedback")}
                        onPress={() => setShowFeedback(true)} />
                </View>

                <View className="items-center mt-2">
                    <Text className="text-footnote text-typography-400">
                        {t("about.version", { version: appVersion })}
                    </Text>
                </View>

            </View>

            <FeedbackModal visible={showFeedback} onClose={() => setShowFeedback(false)} />
        </PageSignature>
    );
}

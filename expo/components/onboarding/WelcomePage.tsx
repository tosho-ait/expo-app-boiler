import { Text, View } from 'react-native';
import React from 'react';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import { COLORS } from "@/lib/colors";
import { ScreenLayout } from "./Shared";
import { useT } from "@/i18n";

interface Props {
    onNext: () => void;
    onLogin: () => void;
}

export default function WelcomePage({ onNext, onLogin }: Props) {
    const { t } = useT();
    const buttons = (
        <View className="flex gap-4">
            <Button pill title={t("welcome.getStarted")} action={onNext} testID="welcome-get-started" />
            <Button link_pale title={t("welcome.alreadyHaveAccount")} action={onLogin} />
        </View>
    );

    return (
        <PageSignature noBackButton={true} buttons={buttons}>
            <ScreenLayout>
                <View className="flex-1 justify-center items-center mb-32">
                    <Text className="text-5xl font-black text-center text-gray-900 leading-tight">
                        App<Text className={COLORS.BLUE_TEXT}>Boiler</Text>
                    </Text>
                    <Text className="mt-5 text-xl text-gray-500 font-medium text-center px-4">
                        {t("welcome.tagline")}
                    </Text>
                </View>
            </ScreenLayout>
        </PageSignature>
    );
}

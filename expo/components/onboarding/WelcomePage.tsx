import { Text, View } from 'react-native';
import React from 'react';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import IconInCircle from "@/components/ui/IconInCircle";
import { useT } from "@/i18n";

interface Props {
    onNext: () => void;
    onLogin: () => void;
}

export default function WelcomePage({ onNext, onLogin }: Props) {
    const { t } = useT();
    const buttons = (
        <View className="flex gap-3">
            <Button pill title={t("welcome.getStarted")} action={onNext} testID="welcome-get-started" />
            <Button ghost title={t("welcome.alreadyHaveAccount")} action={onLogin} />
        </View>
    );

    return (
        <PageSignature noBackButton={true} buttons={buttons}>
            <View className="flex-1 justify-center items-center px-6">

                <View className="mb-10">
                    <IconInCircle
                        variant="xlarge"
                        rounded={false}
                        icon="fa5:check"
                        bgColor="#091A2F"
                        iconColor="#FFFFFF"
                    />
                </View>

                <Text className="text-large-title font-black text-center text-typography-900 leading-tight">
                    App<Text className="text-tertiary-500">Boiler</Text>
                </Text>
                <Text className="mt-3 text-body text-typography-500 font-normal text-center px-6 leading-6">
                    {t("welcome.tagline")}
                </Text>

            </View>
        </PageSignature>
    );
}

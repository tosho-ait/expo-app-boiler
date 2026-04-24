import { Text, View } from 'react-native';
import React from 'react';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import { getIcon } from "@/lib/iconUtil";
import { COLORS } from "@/lib/colors";
import SettingsPanel from "@/components/feature/SettingsPanel";
import { ScreenLayout, TitleText } from "./Shared";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import ProgressDots from "../ui/ProgressDots";

interface Props {
    onNext: () => void;
    onBack: () => void;
    defaultCurrency: any;
    setDefaultCurrency: (val: any) => void;
}

export default function CurrencyPage({ onNext, onBack, defaultCurrency, setDefaultCurrency }: Props) {

    const { doSignInFree } = useAppSession();

    const handleNext = async () => {
        await doSignInFree({ defaultCurrency });
        onNext();
    };

    const buttons = <Button pill title="Next" action={handleNext} testID="onboarding-next" />;

    return (
        <PageSignature onBack={onBack} heading={<ProgressDots total={6} completed={1} />} buttons={buttons}>
            <ScreenLayout>
                <View className="items-center">
                    <View className={"w-28 h-28 rounded-full items-center justify-center mb-12 " + COLORS.BLUE_BG}>
                        {getIcon("mc:earth", 56, "#ffffff")}
                    </View>
                    <TitleText>Select Your Currency</TitleText>
                </View>
                <View className="py-4">
                    <SettingsPanel defaultCurrency={defaultCurrency} setDefaultCurrency={setDefaultCurrency}
                        showLegal={false} hideCurrencyLabel={true} />
                    <Text className="text-gray-400 text-sm text-center mt-3">
                        You can always change this later in Settings.
                    </Text>
                </View>

            </ScreenLayout>
        </PageSignature>
    );
}

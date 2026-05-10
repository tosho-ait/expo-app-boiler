import { Text, View } from 'react-native';
import React from 'react';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import IconInCircle from "@/components/ui/IconInCircle";
import { ScreenLayout, TitleText } from "./Shared";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import ProgressDots from "../ui/ProgressDots";
import LanguagePanel from "@/components/feature/LanguagePanel";
import { DEFAULT_LANGUAGE, LanguageCode, useT } from "@/i18n";
import { useDispatch, useSelector } from "react-redux";
import { saveConfig } from "@/redux/action";

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function LanguagePage({ onNext, onBack }: Props) {

    const { doSignInFree } = useAppSession();
    const { t } = useT();
    const dispatch = useDispatch();

    const language = (useSelector(
        (state: any) => state.todos?.config?.language
    ) as LanguageCode | undefined) ?? DEFAULT_LANGUAGE;

    const setLanguage = (lang: LanguageCode) => {
        dispatch(saveConfig({ language: lang }));
    };

    const handleNext = async () => {
        await doSignInFree({ language });
        onNext();
    };

    const buttons = <Button pill title={t("common.next")} action={handleNext} testID="onboarding-next" />;

    return (
        <PageSignature onBack={onBack} heading={<ProgressDots total={6} completed={1} />} buttons={buttons}>
            <ScreenLayout>
                <View className="items-center mt-4 mb-8">
                    <IconInCircle
                        variant="large"
                        rounded={false}
                        icon="mc:earth"
                        bgColor="#0A84FF"
                        iconColor="#FFFFFF"
                    />
                </View>
                <TitleText>{t("onboarding.language.title")}</TitleText>
                <View className="pt-4">
                    <LanguagePanel language={language} setLanguage={setLanguage} hideLabel />
                    <Text className="text-footnote text-typography-400 text-center mt-4 px-4">
                        {t("onboarding.language.hint")}
                    </Text>
                </View>
            </ScreenLayout>
        </PageSignature>
    );
}

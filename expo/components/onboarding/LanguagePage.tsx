import { Text, View } from 'react-native';
import React from 'react';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import { getIcon } from "@/lib/iconUtil";
import { COLORS } from "@/lib/colors";
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

    // Read & write through redux so the UI flips instantly on selection —
    // every useT consumer (including this page itself) re-renders.
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
                <View className="items-center">
                    <View className={"w-28 h-28 rounded-full items-center justify-center mb-12 " + COLORS.BLUE_BG}>
                        {getIcon("mc:earth", 56, "#ffffff")}
                    </View>
                    <TitleText>{t("onboarding.language.title")}</TitleText>
                </View>
                <View className="py-4">
                    <LanguagePanel language={language} setLanguage={setLanguage} />
                    <Text className="text-gray-400 text-sm text-center mt-3">
                        {t("onboarding.language.hint")}
                    </Text>
                </View>
            </ScreenLayout>
        </PageSignature>
    );
}

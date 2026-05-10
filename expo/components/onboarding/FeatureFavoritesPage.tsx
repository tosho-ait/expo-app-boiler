import React from 'react';
import { View } from "react-native";
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import GraphicFavorites from "@/components/graphics/GraphicFavorites";
import { ScreenLayout, TitleText, SubText } from "./Shared";
import ProgressDots from "@/components/ui/ProgressDots";
import { useT } from "@/i18n";

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function FeatureFavoritesPage({ onNext, onBack }: Props) {
    const { t } = useT();
    const buttons = <Button pill title={t("common.next")} action={onNext} testID="onboarding-next" />;

    return (
        <PageSignature onBack={onBack} heading={<ProgressDots total={6} completed={2} />} buttons={buttons}>
            <ScreenLayout>
                <View className="flex-1 items-center justify-center">
                    <View className="bg-background-100 rounded-ios-3xl p-8 mb-10">
                        <GraphicFavorites />
                    </View>
                    <TitleText>{t("onboarding.favorites.title")}</TitleText>
                    <SubText>{t("onboarding.favorites.subtitle")}</SubText>
                </View>
            </ScreenLayout>
        </PageSignature>
    );
}

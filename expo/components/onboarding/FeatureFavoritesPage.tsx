import React from 'react';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import GraphicFavorites from "@/components/graphics/GraphicFavorites";
import { ScreenLayout, TitleText, SubText } from "./Shared";
import ProgressDots from "@/components/ui/ProgressDots";
import { View } from "react-native";
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
                <GraphicFavorites />
                <View className="mb-10" />
                <TitleText>{t("onboarding.favorites.title")}</TitleText>
                <SubText>{t("onboarding.favorites.subtitle")}</SubText>
            </ScreenLayout>
        </PageSignature>
    );
}

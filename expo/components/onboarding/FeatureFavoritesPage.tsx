import React from 'react';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import GraphicFavorites from "@/components/graphics/GraphicFavorites";
import { ScreenLayout, TitleText, SubText } from "./Shared";
import ProgressDots from "@/components/ui/ProgressDots";
import { View } from "react-native";

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function FeatureFavoritesPage({ onNext, onBack }: Props) {
    const buttons = <Button pill title="Next" action={onNext} testID="onboarding-next" />;

    return (
        <PageSignature onBack={onBack} heading={<ProgressDots total={6} completed={2} />} buttons={buttons}>
            <ScreenLayout>
                <GraphicFavorites />
                <View className="mb-10" />
                <TitleText>
                    A clean starting point
                </TitleText>
                <SubText>
                    Auth, sync, subscriptions and settings — already wired up. Replace this screen with your own feature showcase.
                </SubText>
            </ScreenLayout>
        </PageSignature>
    );
}

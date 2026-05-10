import { View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import { ScreenLayout, SubText, TitleText } from "./Shared";
import ProgressDots from "@/components/ui/ProgressDots";
import { useDelayedReviewPrompt } from "@/components/onboarding/useDelayedReviewPrompt";
import FeedbackModal from "@/components/feature/FeedbackModal";
import { useT } from "@/i18n";

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function FeedbackPage({ onNext, onBack }: Props) {

    useDelayedReviewPrompt();

    const { t } = useT();
    const [showFeedback, setShowFeedback] = useState(false);

    const buttons = <Button pill title={t("common.next")} action={onNext} testID="onboarding-next" />;

    return (
        <PageSignature onBack={onBack} heading={<ProgressDots total={6} completed={5} />} buttons={buttons}>
            <ScreenLayout>

                <View className="flex-1 items-center justify-center">

                    <View className="flex-row gap-1 mb-8">
                        {[0, 1, 2, 3, 4].map(i => (
                            <Ionicons key={i} name="star" size={36} color="#FF9500" />
                        ))}
                    </View>

                    <TitleText>{t("onboarding.feedback.title")}</TitleText>
                    <SubText>{t("onboarding.feedback.subtitle")}</SubText>

                    <View className="mt-6">
                        <Button secondary
                            icon="ii:chatbubble-ellipses-outline"
                            title={t("onboarding.feedback.leaveFeedback")}
                            onPress={() => setShowFeedback(true)} />
                    </View>

                </View>

            </ScreenLayout>

            <FeedbackModal visible={showFeedback} onClose={() => setShowFeedback(false)} />
        </PageSignature>
    );
}

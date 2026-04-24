import { Text, View } from 'react-native';
import React, { useState } from 'react';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import { ScreenLayout, SubText, TitleText } from "./Shared";
import ProgressDots from "@/components/ui/ProgressDots";
import { useDelayedReviewPrompt } from "@/components/onboarding/useDelayedReviewPrompt";
import FeedbackModal from "@/components/feature/FeedbackModal";

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function FeedbackPage({ onNext, onBack }: Props) {

    useDelayedReviewPrompt();

    const [showFeedback, setShowFeedback] = useState(false);

    const buttons = <Button pill title="Next" action={onNext} testID="onboarding-next" />;

    return (
        <PageSignature onBack={onBack} heading={<ProgressDots total={6} completed={5} />} buttons={buttons}>
            <ScreenLayout>

                <View className="flex-1">

                    <TitleText>
                        Rate AppBoiler
                    </TitleText>

                    <SubText>
                        A quick rating helps others discover the app.
                    </SubText>

                    <View className="mt-8 items-center">
                        <Text className="text-orange-400 text-4xl">★★★★★</Text>
                    </View>

                    <View className="flex-row justify-center mt-10">
                        <Button link_blue title="Leave Feedback" onPress={() => setShowFeedback(true)} />
                    </View>

                </View>

                <View className="flex p-4" />
            </ScreenLayout>

            <FeedbackModal visible={showFeedback} onClose={() => setShowFeedback(false)} />
        </PageSignature>
    );
}

import { View } from 'react-native';
import React from 'react';
import PageSignature from "@/components/layout/PageSignature";
import SurveyOption from "@/components/ui/SurveyOption";
import { ScreenLayout, TitleText } from "./Shared";
import ProgressDots from "@/components/ui/ProgressDots";

interface Props {
    onNext: () => void;
    onBack: () => void;
    setSurveyGoal: (val: string) => void;
}

export default function SurveyGoalPage({ onNext, onBack, setSurveyGoal }: Props) {
    const handleSelect = (val: string) => {
        setSurveyGoal(val);
        onNext();
    };

    return (
        <PageSignature onBack={onBack} heading={<ProgressDots total={6} completed={3} />}>
            <ScreenLayout>
                <TitleText>What are you here to do?</TitleText>
                <View className="pb-6" />
                <SurveyOption title="Build a side project" onPress={() => handleSelect('Side project')} />
                <SurveyOption title="Ship a production app" onPress={() => handleSelect('Production app')} />
                <SurveyOption title="Learn the stack" onPress={() => handleSelect('Learning')} />
                <SurveyOption title="Just exploring" onPress={() => handleSelect('Exploring')} />
                <SurveyOption title="Other" onPress={() => handleSelect('Other')} />
            </ScreenLayout>
        </PageSignature>
    );
}

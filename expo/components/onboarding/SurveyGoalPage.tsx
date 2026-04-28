import { View } from 'react-native';
import React from 'react';
import PageSignature from "@/components/layout/PageSignature";
import SurveyOption from "@/components/ui/SurveyOption";
import { ScreenLayout, TitleText } from "./Shared";
import ProgressDots from "@/components/ui/ProgressDots";
import { useT } from "@/i18n";

interface Props {
    onNext: () => void;
    onBack: () => void;
    setSurveyGoal: (val: string) => void;
}

export default function SurveyGoalPage({ onNext, onBack, setSurveyGoal }: Props) {
    const { t } = useT();
    const handleSelect = (val: string) => {
        setSurveyGoal(val);
        onNext();
    };

    return (
        <PageSignature onBack={onBack} heading={<ProgressDots total={6} completed={3} />}>
            <ScreenLayout>
                <TitleText>{t("onboarding.survey.title")}</TitleText>
                <View className="pb-6" />
                <SurveyOption title={t("onboarding.survey.sideProject")} onPress={() => handleSelect('Side project')} />
                <SurveyOption title={t("onboarding.survey.production")} onPress={() => handleSelect('Production app')} />
                <SurveyOption title={t("onboarding.survey.learning")} onPress={() => handleSelect('Learning')} />
                <SurveyOption title={t("onboarding.survey.exploring")} onPress={() => handleSelect('Exploring')} />
                <SurveyOption title={t("onboarding.survey.other")} onPress={() => handleSelect('Other')} />
            </ScreenLayout>
        </PageSignature>
    );
}

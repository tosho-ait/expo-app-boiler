// @ts-nocheck
import { Text, View } from 'react-native';
import React, { useState } from "react";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import LanguagePage from "@/components/onboarding/LanguagePage";
import SurveyGoalPage from "@/components/onboarding/SurveyGoalPage";
import SignUpPage from "@/components/onboarding/SignUpPage";
import FeatureFavoritesPage from "@/components/onboarding/FeatureFavoritesPage";
import FeedbackPage from "@/components/onboarding/FeedbackPage";
import SubscriptionPage from "@/components/onboarding/SubscriptionPage";
export { TitleText, SubText, ScreenLayout } from "@/components/onboarding/Shared";

export default function OnboardingScreen() {

    const { user } = useUser();

    const [step, setStep] = useState(0);
    const [surveyGoal, setSurveyGoal] = useState<string | null>(null);

    const flow = [
        'LANGUAGE',
        'FEATURE_FAVORITES',
        'SURVEY_GOAL',
        'SIGN_UP',
        'FEATURE_FEEDBACK',
        'SUBSCRIPTION'
    ];

    const handleNext = () => {
        if (step < flow.length - 1) {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(prev => prev - 1);
        } else {
            router.push("/welcome");
        }
    };

    const handleFinish = () => {
        router.push("/");
    };

    const currentStep = flow[step];

    switch (currentStep) {

        case 'LANGUAGE':
            return <LanguagePage onNext={handleNext} onBack={handleBack} />;

        case 'SURVEY_GOAL':
            return <SurveyGoalPage onNext={handleNext} onBack={handleBack}
                setSurveyGoal={setSurveyGoal} />;

        case 'SIGN_UP':
            if (user) {
                setTimeout(() => handleNext(), 500);
                return <View className="flex-1" />;
            }
            return <SignUpPage onNext={handleNext} onBack={handleBack} />;

        case 'FEATURE_FAVORITES':
            return <FeatureFavoritesPage onNext={handleNext} onBack={handleBack} />;

        case 'FEATURE_FEEDBACK':
            return <FeedbackPage onNext={handleNext} onBack={handleBack} />;

        case 'SUBSCRIPTION':
            return <SubscriptionPage handleFinish={handleFinish} onBack={handleBack} isOnboarding={true} />;

        default:
            return <View className="flex-1 bg-white flex justify-center items-center">
                <Text>Unknown step</Text>
            </View>;
    }
}

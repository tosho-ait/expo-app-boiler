import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { saveConfig } from '@/redux/action';
import { useT } from "@/i18n";

interface TutorialStep {
    textKey: string;
    position: 'bottom-right';
    pointerSide: 'bottom';
    pointerAlign: 'right';
}

const steps: TutorialStep[] = [
    {
        textKey: 'dashboard.tutorialTap',
        position: 'bottom-right',
        pointerSide: 'bottom',
        pointerAlign: 'right',
    },
];

export default function DashboardTutorial() {
    const dispatch = useDispatch();
    const { t } = useT();
    const [currentStep, setCurrentStep] = useState(0);

    const tutorialPending = useSelector((state: any) => state.todos?.config?.tutorialPending);
    const todoList = useSelector((state: any) => state.todos?.todoList) || [];

    if (!tutorialPending || todoList.length > 0) return null;

    const handleTap = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            dispatch(saveConfig({ tutorialPending: false }));
        }
    };

    const step = steps[currentStep];

    const triangle = (
        <View
            className="mr-10 self-end"
            style={{
                width: 0, height: 0,
                borderLeftWidth: 12,
                borderRightWidth: 12,
                borderTopWidth: 14,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: '#111827',
            }}
        />
    );

    const bubble = (
        <View className="bg-gray-900 rounded-2xl px-6 py-5 shadow-lg">
            <Text className="text-lg font-semibold text-white text-center leading-relaxed">
                {t(step.textKey)}
            </Text>
        </View>
    );

    return (
        <>
            <Pressable className="absolute inset-0 z-40" onPress={handleTap} />
            <View className="absolute bottom-[160px] right-4 z-50" pointerEvents="none">
                {bubble}
                {triangle}
            </View>
        </>
    );
}

import { View } from 'react-native';
import React, { useState } from 'react';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import SocialLogin from "@/components/feature/SocialLogin";
import { ScreenLayout, TitleText, SubText } from "./Shared";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import ErrorPanelText from "@/components/panels/ErrorPanelText";
import ProgressDots from "@/components/ui/ProgressDots";

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function SignUpPage({ onNext, onBack }: Props) {

    const { doSignInSocial } = useAppSession();
    const [error, setError] = useState<string | null>(null);

    const buttons = <Button link_pale title="Skip for Now" action={onNext} testID="onboarding-skip" />;

    return (
        <PageSignature onBack={onBack} heading={<ProgressDots total={6} completed={4} />} buttons={buttons}>
            <ScreenLayout>
                <View className="items-center mb-8">
                    <TitleText>
                        Create a Free Account
                    </TitleText>
                    <SubText>
                        Sign in to enable cloud backup and sync across devices.
                    </SubText>
                </View>
                <View className="flex-col gap-4 w-full mb-4">
                    <ErrorPanelText error={error} />
                    <SocialLogin
                        onSocialLogin={async (provider: any) => {
                            const {error} = await doSignInSocial({ provider, redirectPath: "onboarding" });
                            if (error) {
                                const errMsg = error.errors?.[0]?.longMessage || error.errors?.[0]?.message || error.message || "An error occurred during sign in.";
                                setError(typeof errMsg === 'string' ? errMsg : "Sign in failed");
                            } else {
                                setError(null);
                            }
                        }} />
                </View>
            </ScreenLayout>
        </PageSignature>
    );
}

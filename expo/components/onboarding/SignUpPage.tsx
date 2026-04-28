import { View } from 'react-native';
import React, { useState } from 'react';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import SocialLogin from "@/components/feature/SocialLogin";
import { ScreenLayout, TitleText, SubText } from "./Shared";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import ErrorPanelText from "@/components/panels/ErrorPanelText";
import ProgressDots from "@/components/ui/ProgressDots";
import { useT } from "@/i18n";

interface Props {
    onNext: () => void;
    onBack: () => void;
}

export default function SignUpPage({ onNext, onBack }: Props) {

    const { doSignInSocial } = useAppSession();
    const { t } = useT();
    const [error, setError] = useState<string | null>(null);

    const buttons = <Button link_pale title={t("common.skip")} action={onNext} testID="onboarding-skip" />;

    return (
        <PageSignature onBack={onBack} heading={<ProgressDots total={6} completed={4} />} buttons={buttons}>
            <ScreenLayout>
                <View className="items-center mb-8">
                    <TitleText>{t("onboarding.signup.title")}</TitleText>
                    <SubText>{t("onboarding.signup.subtitle")}</SubText>
                </View>
                <View className="flex-col gap-4 w-full mb-4">
                    <ErrorPanelText error={error} />
                    <SocialLogin
                        onSocialLogin={async (provider: any) => {
                            const {error: err} = await doSignInSocial({ provider, redirectPath: "onboarding" });
                            if (err) {
                                const errMsg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || err.message || t("auth.signInFailed");
                                setError(typeof errMsg === 'string' ? errMsg : t("auth.signInFailedShort"));
                            } else {
                                setError(null);
                            }
                        }} />
                </View>
            </ScreenLayout>
        </PageSignature>
    );
}

import React, { useState } from 'react';
import { Linking, Text, View } from 'react-native';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import InputStringEmail from "@/components/input/InputStringEmail";
import InputStringPass from "@/components/input/InputStringPass";
import InputString from "@/components/input/InputString";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import SocialLogin from "@/components/feature/SocialLogin";
import ErrorPanelSignUp from "@/components/feature/ErrorPanelSignUp";
import { useT } from "@/i18n";


const STATE_START = "START";
const STATE_PASSWORD = "PASSWORD";
const STATE_SIGNUP = "SIGNUP";
const STATE_VERIFY = "VERIFY";
const STATE_RESET_PREPARE = "RESET_PREPARE";
const STATE_RESET_VERIFY = "RESET_VERIFY";

const TitleHeading = ({ children }: { children: React.ReactNode }) => (
    <Text className="text-title-1 font-bold text-typography-900 leading-tight mb-3">
        {children}
    </Text>
);

const Helper = ({ children }: { children: React.ReactNode }) => (
    <Text className="text-callout text-typography-600 leading-6 mb-2">
        {children}
    </Text>
);


export default function AuthenticatePage() {

    const {
        doCheckUserExists,
        doSignInPass,
        doSignUpPrepare,
        doSignUpVerify,
        doSignInSocial,
        doPwdResetPrepare,
        doPwdResetVerify
    } = useAppSession();

    const { t } = useT();

    const [viewState, setViewState] = useState(STATE_START);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const [error, setError] = useState<any>(null);
    const [signUpObj, setSignUpObj] = useState<any>(null);
    const [resetSignInObj, setResetSignInObj] = useState<any>(null);

    const handleContinueEmail = async () => {
        setError(null);
        if (!emailAddress) {
            setError({ message: t("auth.enterEmailFirst") });
            return;
        }
        const result = await doCheckUserExists({ emailAddress });
        if (result.error) {
            setError(result.error);
        } else if (result.exists) {
            setViewState(STATE_PASSWORD);
        } else {
            setViewState(STATE_SIGNUP);
        }
    };

    const handleSignIn = async () => {
        setError(null);
        const { error } = await doSignInPass({ emailAddress, password });
        if (error) setError(error);
    };

    const handleSignUp = async () => {
        setError(null);
        const { error, signUp } = await doSignUpPrepare({ emailAddress, password, name });
        if (error) {
            setError(error);
        } else {
            setSignUpObj(signUp);
            setViewState(STATE_VERIFY);
        }
    };

    const handleVerify = async () => {
        setError(null);
        const { error } = await doSignUpVerify({ signUp: signUpObj, code, emailAddress });
        if (error) setError(error);
    }

    const handleForgot = () => {
        setError(null);
        setPassword('');
        setViewState(STATE_RESET_PREPARE);
    }

    const handleResetPrepare = async () => {
        setError(null);
        const { error, signIn } = await doPwdResetPrepare({ emailAddress });
        if (error) {
            setError(error);
        } else {
            setResetSignInObj(signIn);
            setViewState(STATE_RESET_VERIFY);
        }
    }

    const handleResetVerify = async () => {
        setError(null);
        const { error } = await doPwdResetVerify({ signIn: resetSignInObj, code, password, emailAddress });
        if (error) setError(error);
    }


    const renderStart = () => (
        <View key="start" className="flex gap-5">

            <TitleHeading>{t("auth.signIn")}</TitleHeading>

            <InputStringEmail onChange={setEmailAddress} value={emailAddress} />

            <Button pill title={t("common.continue")} onPress={handleContinueEmail} />

            <View className="flex-row items-center gap-3 px-2 my-2">
                <View className="h-px bg-outline-200 flex-1" />
                <Text className="text-footnote text-typography-400 font-medium">{t("common.or")}</Text>
                <View className="h-px bg-outline-200 flex-1" />
            </View>

            <SocialLogin onSocialLogin={async (provider: any) => {
                const { error } = await doSignInSocial({ provider });
                setError(error);
            }} />

        </View>
    );

    const renderPassword = () => (
        <View key="pass" className="flex gap-5">
            <TitleHeading>{t("auth.welcomeBack")}</TitleHeading>
            <InputStringEmail onChange={() => setViewState(STATE_START)} value={emailAddress} />
            <InputStringPass onChange={setPassword} value={password} />
            <Button pill title={t("auth.signIn")} onPress={handleSignIn} />
            <View className="items-center">
                <Button link_pale title={t("auth.forgotPassword")} onPress={handleForgot} />
            </View>
        </View>
    );

    const renderSignUp = () => (
        <View key="signup" className="flex gap-5">
            <TitleHeading>{t("auth.createAccount")}</TitleHeading>
            <InputStringEmail onChange={() => setViewState(STATE_START)} value={emailAddress} />
            <InputString label={t("auth.name")} onChange={setName} value={name} />
            <InputStringPass onChange={setPassword} value={password} />
            <Button pill title={t("auth.signUp")} onPress={handleSignUp} />

            <View className="mt-2">
                <Text className="text-footnote text-typography-500 text-center leading-5">
                    {t("auth.termsAgree")}{' '}
                    <Text className="font-semibold text-tertiary-500"
                        onPress={() => Linking.openURL('/terms-of-service')}>
                        {t("auth.termsOfService")}
                    </Text>
                    {' '}{t("common.and")}{' '}
                    <Text className="font-semibold text-tertiary-500"
                        onPress={() => Linking.openURL('/privacy-policy')}>
                        {t("auth.privacyPolicy")}
                    </Text>.
                </Text>
            </View>
        </View>
    );

    const renderVerify = () => (
        <View key="verify" className="flex gap-5">
            <TitleHeading>{t("auth.verifyEmail")}</TitleHeading>
            <Helper>{t("auth.verificationSent")}</Helper>
            <Helper>{t("auth.verificationEnter")}</Helper>
            <InputString label={t("auth.verificationCode")} onChange={setCode} value={code} />
            <Button pill title={t("auth.verify")} onPress={handleVerify} />
        </View>
    );

    const renderResetPrepare = () => (
        <View key="resetprep" className="flex gap-5">
            <TitleHeading>{t("auth.resetPassword")}</TitleHeading>
            <Helper>{t("auth.resetInfo", { email: emailAddress })}</Helper>
            <Button pill title={t("auth.sendCode")} onPress={handleResetPrepare} />
        </View>
    );

    const renderResetVerify = () => (
        <View key="resetver" className="flex gap-5">
            <TitleHeading>{t("auth.newPassword")}</TitleHeading>
            <Helper>{t("auth.resetVerifyInfo")}</Helper>
            <InputString label={t("auth.resetCode")} onChange={setCode} value={code} />
            <InputStringPass label={t("auth.newPassword")} onChange={setPassword} value={password} />
            <Button pill title={t("auth.setPassword")} onPress={handleResetVerify} />
        </View>
    );


    let content;
    switch (viewState) {
        case STATE_START: content = renderStart(); break;
        case STATE_PASSWORD: content = renderPassword(); break;
        case STATE_SIGNUP: content = renderSignUp(); break;
        case STATE_VERIFY: content = renderVerify(); break;
        case STATE_RESET_PREPARE: content = renderResetPrepare(); break;
        case STATE_RESET_VERIFY: content = renderResetVerify(); break;
        default: content = renderStart();
    }

    return (
        <PageSignature>
            <View className="pt-2 pb-2">
                {error && <ErrorPanelSignUp error={error} />}
            </View>
            {content}
        </PageSignature>
    );
}

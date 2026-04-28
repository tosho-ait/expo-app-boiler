import React, {useState} from 'react';
import {Linking, Text, View} from 'react-native';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import InputStringEmail from "@/components/input/InputStringEmail";
import InputStringPass from "@/components/input/InputStringPass";
import InputString from "@/components/input/InputString";
import {useAppSession} from "@/components/providers/AppSessionProvider";
import SocialLogin from "@/components/feature/SocialLogin";
import ErrorPanelSignUp from "@/components/feature/ErrorPanelSignUp";
import {useT} from "@/i18n";


const STATE_START = "START";
const STATE_PASSWORD = "PASSWORD";
const STATE_SIGNUP = "SIGNUP";
const STATE_VERIFY = "VERIFY";
const STATE_RESET_PREPARE = "RESET_PREPARE";
const STATE_RESET_VERIFY = "RESET_VERIFY";

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

    const {t} = useT();

    const [viewState, setViewState] = useState(STATE_START);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');

    const [error, setError] = useState(null);
    const [signUpObj, setSignUpObj] = useState(null);
    const [resetSignInObj, setResetSignInObj] = useState(null);

    const handleContinueEmail = async () => {

        setError(null);

        if (!emailAddress) {
            setError({message: t("auth.enterEmailFirst")});
            return;
        }

        const result = await doCheckUserExists({emailAddress});

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
        const {error} = await doSignInPass({emailAddress, password});
        if (error) setError(error);
    };

    const handleSignUp = async () => {
        setError(null);
        const {error, signUp} = await doSignUpPrepare({emailAddress, password, name});
        if (error) {
            setError(error);
        } else {
            setSignUpObj(signUp);
            setViewState(STATE_VERIFY);
        }
    };

    const handleVerify = async () => {
        setError(null);
        const {error} = await doSignUpVerify({signUp: signUpObj, code, emailAddress});
        if (error) setError(error);
    }

    const handleForgot = () => {
        setError(null);
        setPassword('');
        setViewState(STATE_RESET_PREPARE);
    }

    // Reset Flow
    const handleResetPrepare = async () => {
        setError(null);
        const {error, signIn} = await doPwdResetPrepare({emailAddress});
        if (error) {
            setError(error);
        } else {
            setResetSignInObj(signIn);
            setViewState(STATE_RESET_VERIFY);
        }
    }

    const handleResetVerify = async () => {
        setError(null);
        const {error} = await doPwdResetVerify({signIn: resetSignInObj, code, password, emailAddress});
        if (error) setError(error);
    }


    // --- Renders ---
    const renderStart = () => (
        <View key="start" className="flex gap-6">

            <Text className="text-5xl font-black text-left text-gray-900 leading-tight mb-4">{t("auth.signIn")}</Text>

            <InputStringEmail
                onChange={(val) => setEmailAddress(val)}
                value={emailAddress}
            />

            <Button pill title={t("common.continue")} onPress={handleContinueEmail}/>

            <View className="flex-row items-center gap-4 px-6 ">
                <View className="h-[1px] bg-gray-300 flex-1"/>
                <Text className="text-gray-500 font-semibold">{t("common.or")}</Text>
                <View className="h-[1px] bg-gray-300 flex-1"/>
            </View>

            <View className="flex mb-4">
                <SocialLogin onSocialLogin={async (provider) => {
                    const {error} = await doSignInSocial({provider});
                    setError(error);
                }}/>
            </View>

        </View>
    );

    const renderPassword = () => (
        <View key="pass" className="flex gap-6">

            <Text className="text-4xl font-extrabold text-left text-gray-900 leading-tight mb-4">
                {t("auth.welcomeBack")}</Text>

            <InputStringEmail onChange={() => setViewState(STATE_START)} value={emailAddress}/>

            <InputStringPass onChange={(val) => setPassword(val)} value={password}/>

            <Button pill title={t("auth.signIn")} onPress={handleSignIn}/>

            <View className="items-center">
                <Button link_pale title={t("auth.forgotPassword")} onPress={handleForgot}/>
            </View>

        </View>
    );

    const renderSignUp = () => (
        <View key="signup" className="flex gap-6">

            <Text className="text-4xl font-extrabold text-left text-gray-900 leading-tight mb-4">
                {t("auth.createAccount")}</Text>

            <InputStringEmail onChange={() => setViewState(STATE_START)} value={emailAddress}/>

            <InputString label={t("auth.name")} onChange={(val) => setName(val)} value={name}/>

            <InputStringPass onChange={(val) => setPassword(val)} value={password}/>

            <Button pill title={t("auth.signUp")} onPress={handleSignUp}/>

            <View className="flex mt-4">
                <Text className="text-sm text-gray-500 text-center">
                    {t("auth.termsAgree")}</Text>
                <Text className="text-sm text-gray-500 text-center">
                    <Text className="font-semibold underline"
                          onPress={() => Linking.openURL('/terms-of-service')}>
                        {t("auth.termsOfService")}
                    </Text>{' '}{t("common.and")}{' '}
                    <Text className="font-semibold underline"
                          onPress={() => Linking.openURL('/privacy-policy')}>
                        {t("auth.privacyPolicy")}
                    </Text>.
                </Text>
            </View>
        </View>
    );

    const renderVerify = () => (
        <View key="verify" className="flex gap-6">

            <Text className="text-4xl font-extrabold text-left text-gray-900 leading-tight mb-4">
                {t("auth.verifyEmail")}</Text>

            <View className="flex gap-0 mb-2">
                <Text className="px-6 text-center text-lg text-gray-700">
                    {t("auth.verificationSent")}</Text>
                <Text className="px-6 text-center text-lg text-gray-700">
                    {t("auth.verificationEnter")}</Text>
            </View>

            <InputString label={t("auth.verificationCode")}
                         onChange={(val) => setCode(val)}
                         value={code}/>

            <Button pill title={t("auth.verify")} onPress={handleVerify}/>

        </View>
    );

    const renderResetPrepare = () => (
        <View key="resetprep" className="flex gap-6">

            <Text className="text-4xl font-extrabold text-left text-gray-900 leading-tight mb-4">
                {t("auth.resetPassword")}</Text>

            <Text className="mb-2 px-6 text-center text-lg text-gray-700">
                {t("auth.resetInfo", {email: emailAddress})}</Text>

            <Button pill title={t("auth.sendCode")} onPress={handleResetPrepare}/>

        </View>
    );

    const renderResetVerify = () => (
        <View key="resetver" className="flex gap-6">

            <Text className="text-4xl font-extrabold text-left text-gray-900 leading-tight mb-4">
                {t("auth.newPassword")}</Text>

            <Text className="mb-2 px-6 text-center text-lg text-gray-700">
                {t("auth.resetVerifyInfo")}</Text>

            <InputString label={t("auth.resetCode")}
                         onChange={(val) => setCode(val)}
                         value={code}/>

            <InputStringPass label={t("auth.newPassword")}
                             onChange={(val) => setPassword(val)}
                             value={password}/>

            <Button pill title={t("auth.setPassword")} onPress={handleResetVerify}/>

        </View>
    );


    let content;
    switch (viewState) {
        case STATE_START:
            content = renderStart();
            break;
        case STATE_PASSWORD:
            content = renderPassword();
            break;
        case STATE_SIGNUP:
            content = renderSignUp();
            break;
        case STATE_VERIFY:
            content = renderVerify();
            break;
        case STATE_RESET_PREPARE:
            content = renderResetPrepare();
            break;
        case STATE_RESET_VERIFY:
            content = renderResetVerify();
            break;
        default:
            content = renderStart();
    }

    return (
        <PageSignature>
            <View className="flex justify-center min-h-10 mb-2">
                {error && <ErrorPanelSignUp error={error}/>}
            </View>
            {content}
        </PageSignature>
    );
}

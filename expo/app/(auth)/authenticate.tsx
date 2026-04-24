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
            setError({message: "Please enter an email address."});
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

            <Text className="text-5xl font-black text-left text-gray-900 leading-tight mb-4">Sign In</Text>

            <InputStringEmail
                onChange={(val) => setEmailAddress(val)}
                value={emailAddress}
            />

            <Button pill title="Continue" onPress={handleContinueEmail}/>

            <View className="flex-row items-center gap-4 px-6 ">
                <View className="h-[1px] bg-gray-300 flex-1"/>
                <Text className="text-gray-500 font-semibold">or</Text>
                <View className="h-[1px] bg-gray-300 flex-1"/>
            </View>

            <View className="flex mb-4">
                <SocialLogin onSocialLogin={async (provider) => {
                    setError(await doSignInSocial({provider}));
                }}/>
            </View>

        </View>
    );

    const renderPassword = () => (
        <View key="pass" className="flex gap-6">

            <Text className="text-4xl font-extrabold text-left text-gray-900 leading-tight mb-4">
                Welcome Back</Text>

            <InputStringEmail onChange={() => setViewState(STATE_START)} value={emailAddress}/>

            <InputStringPass onChange={(val) => setPassword(val)} value={password}/>

            <Button pill title="Sign In" onPress={handleSignIn}/>

            <View className="items-center">
                <Button link_pale title="Forgot Password?" onPress={handleForgot}/>
            </View>

        </View>
    );

    const renderSignUp = () => (
        <View key="signup" className="flex gap-6">

            <Text className="text-4xl font-extrabold text-left text-gray-900 leading-tight mb-4">
                Create Account</Text>

            <InputStringEmail onChange={() => setViewState(STATE_START)} value={emailAddress}/>

            <InputString label="Name" onChange={(val) => setName(val)} value={name}/>

            <InputStringPass onChange={(val) => setPassword(val)} value={password}/>

            <Button pill title="Sign Up" onPress={handleSignUp}/>

            <View className="flex mt-4">
                <Text className="text-sm text-gray-500 text-center">
                    By continuing, you agree to our</Text>
                <Text className="text-sm text-gray-500 text-center">
                    <Text className="font-semibold underline"
                          onPress={() => Linking.openURL('/terms-of-service')}>
                        Terms of Service
                    </Text>{' '}and{' '}
                    <Text className="font-semibold underline"
                          onPress={() => Linking.openURL('/privacy-policy')}>
                        Privacy Policy
                    </Text>.
                </Text>
            </View>
        </View>
    );

    const renderVerify = () => (
        <View key="verify" className="flex gap-6">

            <Text className="text-4xl font-extrabold text-left text-gray-900 leading-tight mb-4">
                Verify Email</Text>

            <View className="flex gap-0 mb-2">
                <Text className="px-6 text-center text-lg text-gray-700">
                    We sent a confirmation code to your email.</Text>
                <Text className="px-6 text-center text-lg text-gray-700">
                    Enter it below to verify your account.</Text>
            </View>

            <InputString label="Verification Code"
                         onChange={(val) => setCode(val)}
                         value={code}/>

            <Button pill title="Verify" onPress={handleVerify}/>

        </View>
    );

    const renderResetPrepare = () => (
        <View key="resetprep" className="flex gap-6">

            <Text className="text-4xl font-extrabold text-left text-gray-900 leading-tight mb-4">
                Reset Password</Text>

            <Text className="mb-2 px-6 text-center text-lg text-gray-700">
                We’ll send a verification code to {emailAddress} so you can reset your password.</Text>

            <Button pill title="Send Code" onPress={handleResetPrepare}/>

        </View>
    );

    const renderResetVerify = () => (
        <View key="resetver" className="flex gap-6">

            <Text className="text-4xl font-extrabold text-left text-gray-900 leading-tight mb-4">
                New Password</Text>

            <Text className="mb-2 px-6 text-center text-lg text-gray-700">
                Enter the reset code you received and choose a new password.</Text>

            <InputString label="Reset Code"
                         onChange={(val) => setCode(val)}
                         value={code}/>

            <InputStringPass label="New Password"
                             onChange={(val) => setPassword(val)}
                             value={password}/>

            <Button pill title="Set Password" onPress={handleResetVerify}/>

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

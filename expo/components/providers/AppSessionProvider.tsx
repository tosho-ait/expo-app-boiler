import React, {createContext, useContext, useEffect, useState} from 'react';
import {useAuth, useClerk, useSignIn, useSignUp, useSSO, useUser} from "@clerk/clerk-expo";
import {useDispatch, useSelector} from "react-redux";
import {loginOfflineUser, loginOnlineUser, logoutDevice, logoutWipeDevice} from "@/redux/action";
import {fetchConfig, fetchErase} from "@/lib/fetchUtil";
import * as SplashScreen from "expo-splash-screen";
import {useRevenueCat} from "./RevenueCatProvider";
import {makeRedirectUri} from "expo-auth-session";
import {generateUUID} from "@/lib/miscUtil";


export const EXPO_PUBLIC_PRO_FOR_TESTING = process.env.EXPO_PUBLIC_PRO_FOR_TESTING === 'true';

const NOT_READY_ERR = "Not ready yet!"

interface AppSessionContextType {
    isClerkSignedIn: boolean;
    isUserSignedIn: boolean;
    isUserOnlineSignedIn: boolean;
    userOnlineId: string | null;
    userPrimaryId: string | null;
    getToken: () => Promise<string | null>;
    clerkUser: any;
    doSignInPass: (params: any) => Promise<any>;
    doSignInSocial: (props: any) => Promise<any>;
    doSignInFree: (props: any) => Promise<any>;
    doCheckUserExists: (params: any) => Promise<any>;
    doSignUpPrepare: (params: any) => Promise<any>;
    doSignUpVerify: (params: any) => Promise<any>;
    doSignUpSocial: (params: any) => Promise<any>;
    doPwdResetPrepare: (params: any) => Promise<any>;
    doPwdResetVerify: (params: any) => Promise<any>;
    doSignOut: () => Promise<void>;
    doEraseAccount: () => Promise<void>;
    doLogoutDevice: () => Promise<void>;
    doLogoutWipeDevice: () => Promise<void>;
    rcUser: any;
    rcUserHasActiveSubscription: boolean;
    rcPackages: any[];
    rcRestorePurchases: () => Promise<any>;
    rcPurchasePackage: (pkg: any) => Promise<any>;
    isProcessing: boolean;
}

const AppSessionContext = createContext<AppSessionContextType | null>(null);

export const useAppSession = () => {
    const context = useContext(AppSessionContext);
    if (!context) {
        throw new Error('useAppSession must be used within a AppSessionProvider');
    }
    return context;
};

export const AppSessionProvider = ({children}: { children: React.ReactNode; }) => {

    const {signOut} = useClerk();
    const clerkUser = useUser()?.user;

    const signInHook = useSignIn(); // {signIn, setActive, isl: isLoaded}
    const signUpHook = useSignUp(); // {isLoaded, signUp, setActive}

    const {startSSOFlow} = useSSO();

    const {isSignedIn, getToken, isLoaded} = useAuth();

    const dispatch = useDispatch();

    const {rcIsLoaded, rcUser, rcPackages, rcRestorePurchases, rcPurchasePackage} = useRevenueCat();

    const userPrimaryId = useSelector(state => state.todos.userPrimaryId);
    const userOnlineId = useSelector(state => state.todos.userOnlineId);
    const [isProcessing, setIsProcessing] = useState(false);

    // Shared tail of every online sign-in/up/reset flow: pull token, fetch
    // server config, dispatch the online-user redux action. Returns an error
    // object on failure (caller should propagate), null on success. Pass
    // emailAddress for password flows; SSO leaves it undefined and we decode
    // it out of the Clerk token.
    const finalizeOnlineLogin = async (emailAddress?: string) => {
        const token = await getToken();
        if (!token) {
            await signOut();
            return {error: "Internal Error: No token found."};
        }
        if (!emailAddress) {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            emailAddress = decoded.eml;
        }
        const response = await fetchConfig({getToken, primaryId: userPrimaryId});
        if (!response) {
            await signOut();
            return {error: "Failed to fetch user configuration."};
        }
        const {userPrimaryId: newPrimaryId, language} = response;
        dispatch(loginOnlineUser(emailAddress, language, newPrimaryId));
        return null;
    };

    const doSignInFree = async ({language}: {language?: string} = {}) => {
        dispatch(loginOfflineUser(generateUUID(), language));
    }

    const doSignInSocial = async ({provider, redirectPath = "sso-callback"}: any) => {
        if (!signInHook.isLoaded) return {error: NOT_READY_ERR};
        if (isProcessing) return {};
        try {
            setIsProcessing(true);
            const redirectUrl = makeRedirectUri({
                scheme: "yamapp",
                path: redirectPath,
            });
            const signInAttempt = await startSSOFlow({
                strategy: provider,
                redirectUrl
            });
            if (signInAttempt.createdSessionId) {
                await signInHook.setActive({session: signInAttempt.createdSessionId});
                const err = await finalizeOnlineLogin();
                if (err) return err;
                return {};
            }
            return {error: signInAttempt};
        } catch (err) {
            return {error: err};
        } finally {
            setIsProcessing(false);
        }
    }

    const doCheckUserExists = async ({emailAddress}) => {
        if (!signInHook.isLoaded) return {error: NOT_READY_ERR};
        try {
            const signInAttempt = await signInHook.signIn.create({
                identifier: emailAddress,
            });
            // If we get here, the user exists (likely needs password)
            return {exists: true};
        } catch (err) {
            // Check for specific error code for "user not found"
            if (err.errors && err.errors[0]?.code === "form_identifier_not_found") {
                return {exists: false};
            }
            return {error: err};
        }
    }

    const doSignInPass = async ({emailAddress, password}) => {
        if (!signInHook.isLoaded) return {error: NOT_READY_ERR};
        if (isProcessing) return {};
        try {
            setIsProcessing(true);
            const signInAttempt = await signInHook.signIn.create({
                identifier: emailAddress,
                password,
            })
            if (signInAttempt.status === 'complete') {
                await signInHook.setActive({session: signInAttempt.createdSessionId});
                const err = await finalizeOnlineLogin(emailAddress);
                if (err) return err;
            }
            return {signInAttempt};
        } catch (err) {
            return {error: err};
        } finally {
            setIsProcessing(false);
        }
    }

    const doSignUpPrepare = async ({emailAddress, password, name}) => {
        if (!signUpHook.isLoaded) return {error: NOT_READY_ERR};
        try {
            await signUpHook.signUp.create({
                emailAddress,
                password,
                firstName: !!name ? name : "anonymous"
            })
            await signUpHook.signUp.prepareEmailAddressVerification({strategy: 'email_code'})
            return {signUp: signUpHook.signUp}
        } catch (err) {
            return {error: err}
        }
    }

    const doSignUpVerify = async ({signUp, code, emailAddress}) => {
        if (!signUpHook.isLoaded) return {error: NOT_READY_ERR};
        if (isProcessing) return {};
        try {
            setIsProcessing(true);
            const signInAttempt = await signUp.attemptEmailAddressVerification({code})
            if (signInAttempt.status === 'complete') {
                await signUpHook.setActive({session: signInAttempt.createdSessionId});
                const err = await finalizeOnlineLogin(emailAddress);
                if (err) return err;
            }
            return {signInAttempt};
        } catch (err) {
            return {error: err};
        } finally {
            setIsProcessing(false);
        }
    }

    const doPwdResetPrepare = async ({emailAddress}) => {
        if (!signInHook.isLoaded) return {error: NOT_READY_ERR};
        try {
            await signInHook.signIn.create({
                strategy: 'reset_password_email_code',
                identifier: emailAddress,
            })
            return {signIn: signInHook.signIn}
        } catch (err) {
            return {error: err}
        }
    }

    const doPwdResetVerify = async ({signIn, code, password, emailAddress}) => {
        if (!signInHook.isLoaded) return {error: NOT_READY_ERR};
        if (isProcessing) return {};
        try {
            setIsProcessing(true);
            const signInAttempt = await signIn.attemptFirstFactor({
                strategy: 'reset_password_email_code',
                code,
                password,
            })
            if (signInAttempt.status === 'complete') {
                await signInHook.setActive({session: signInAttempt.createdSessionId});
                const err = await finalizeOnlineLogin(emailAddress);
                if (err) return err;
            }
            return {signInAttempt: signInAttempt};
        } catch (err) {
            return {error: err};
        } finally {
            setIsProcessing(false);
        }
    }

    const doLogoutDevice = async () => {
        dispatch(logoutDevice());
    }

    const doLogoutWipeDevice = async () => {
        dispatch(logoutWipeDevice());
    }

    const doSignOut = async () => {
        await signOut();
    }

    const doEraseAccount = async () => {
        await fetchErase({
            getToken,
            onSuccess: async () => {
                await signOut();
            }
        });
    }

    useEffect(() => {
        const processAsync = async () => {
            // logout part 2, reset the local state if is logged out in clerk
            if (isLoaded && !isSignedIn && userOnlineId) {
                try {
                    dispatch(logoutDevice());
                } catch (err) {
                }
            }
        }
        processAsync();
    }, [isSignedIn, userOnlineId, isLoaded]);


    // Hold the splash and the rendered tree together until both auth and RC
    // have settled, so consumers don't flicker through an unauthenticated /
    // pre-entitlement frame on boot.
    const hasBooted = isLoaded && rcIsLoaded;

    useEffect(() => {
        if (hasBooted) SplashScreen.hideAsync();
    }, [hasBooted]);

    if (!hasBooted) return null;

    let isUserSignedIn = !!((isSignedIn && userOnlineId) || userPrimaryId);
    let isUserOnlineSignedIn = !!(isSignedIn && userOnlineId);

    let isClerkSignedIn = !!isSignedIn;

    let rcUserHasActiveSubscription = !!rcUser?.hasActiveSubscription || EXPO_PUBLIC_PRO_FOR_TESTING;

    return (
        <AppSessionContext.Provider
            value={{
                isClerkSignedIn,

                isUserSignedIn,
                isUserOnlineSignedIn,

                userOnlineId,
                userPrimaryId,

                getToken,
                clerkUser,

                doSignInPass,
                doSignInSocial,
                doSignInFree,
                doCheckUserExists,

                doSignUpPrepare,
                doSignUpVerify,

                doPwdResetPrepare,
                doPwdResetVerify,

                doSignOut,
                doEraseAccount,
                doLogoutDevice,
                doLogoutWipeDevice,

                rcUser,
                rcUserHasActiveSubscription,
                rcPackages,
                rcRestorePurchases,
                rcPurchasePackage,

                isProcessing

            }}>
            {children}
        </AppSessionContext.Provider>
    );

};

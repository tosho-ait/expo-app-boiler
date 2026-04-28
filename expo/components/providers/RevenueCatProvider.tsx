import React, {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import Purchases, {CustomerInfo, MakePurchaseResult, PurchasesPackage,} from 'react-native-purchases';
import {useSelector} from 'react-redux';


const APIKeys = {
    apple: process.env.EXPO_PUBLIC_RC_APPLE_KEY as string,
    google: process.env.EXPO_PUBLIC_RC_GOOGLE_KEY as string || '',
};

const PRO_ENTITLEMENT = process.env.EXPO_PUBLIC_RC_ENTITLEMENT || 'pro';

export interface UserState {
    hasActiveSubscription: boolean;
    activeSubscription?: string;
    activeSubscriptionDetails?: any;
    managementURL?: string | null;
}

interface RevenueCatContextType {
    rcIsLoaded: boolean; // SDK initialized + entitlements synced
    rcUser: UserState;
    rcPackages: PurchasesPackage[];
    rcRestorePurchases: () => Promise<CustomerInfo | undefined>;
    rcPurchasePackage: (pack: PurchasesPackage) => Promise<MakePurchaseResult | undefined>;
    isProcessing: boolean;
}

const USER_NO_SUBSCRIPTION: UserState = {hasActiveSubscription: false};

const RevenueCatContext = createContext<RevenueCatContextType | null>(null);

export const useRevenueCat = () => {
    const context = useContext(RevenueCatContext);
    if (!context) {
        throw new Error('useRevenueCat must be used within a RevenueCatProvider');
    }
    return context;
};

export const RevenueCatProvider = ({children}: { children: React.ReactNode }) => {

    const userPrimaryId = useSelector((state: any) => state.todos?.userPrimaryId);

    const [rcIsInitializedFor, setRcIsInitializedFor] = useState<string | null>(null);

    const [rcUser, setRcUser] = useState<UserState>(USER_NO_SUBSCRIPTION);
    const [rcPackages, setRcPackages] = useState<PurchasesPackage[]>([]);

    const [isProcessing, setIsProcessing] = useState(false);

    const hasConfiguredRef = useRef(false);

    // Update rcUser from CustomerInfo function
    const updateCustomerInformation = useCallback(async (customerInfo: CustomerInfo) => {
            try {
                const entitlement = customerInfo.entitlements?.active[PRO_ENTITLEMENT];
                if (!entitlement) {
                    setRcUser(USER_NO_SUBSCRIPTION);
                } else {
                    const productId = entitlement.productIdentifier;
                    setRcUser({
                        hasActiveSubscription: true,
                        activeSubscription: productId,
                        activeSubscriptionDetails: customerInfo.subscriptionsByProductIdentifier[productId],
                        managementURL: customerInfo.managementURL ?? null,
                    });
                }
            } catch (e) {
                console.error("RC updateCustomerInformation:", e);
            } finally {
                const rcUserId = await Purchases.getAppUserID();
                setRcIsInitializedFor(rcUserId);
            }
        },
        []
    );

    // RevenueCat is only needed once a userPrimaryId exists — that happens at
    // the first onboarding step (LanguagePage → loginOfflineUser) or after
    // online sign-in. Before that, we're on /welcome / /sign-in / /sign-up,
    // which never read RC state, so booting RC there is wasted work and risks
    // a splash-stuck deadlock during App Review (sandbox StoreKit can hang).
    useEffect(() => {
        if (!userPrimaryId) return;
        // Drop any prior user's synced state so consumers don't read stale
        // entitlements during a userPrimaryId change (e.g. anonymous → online
        // sign-in where the server returns a different primary id).
        setRcIsInitializedFor(null);
        setRcUser(USER_NO_SUBSCRIPTION);
        let cancelled = false;
        const init = async () => {
            try {
                Purchases.addCustomerInfoUpdateListener(updateCustomerInformation);
                if (hasConfiguredRef.current) {
                    const result = await Purchases.logIn(userPrimaryId);
                    if (cancelled) return;
                    if (result?.customerInfo) await updateCustomerInformation(result.customerInfo);
                } else {
                    const apiKey = Platform.OS === 'ios' ? APIKeys.apple : APIKeys.google;
                    await Purchases.configure({apiKey, appUserID: userPrimaryId});
                    hasConfiguredRef.current = true;
                    const info = await Purchases.getCustomerInfo();
                    if (cancelled) return;
                    await updateCustomerInformation(info);
                }
                const offerings = await Purchases.getOfferings();
                if (!cancelled && offerings.current) {
                    setRcPackages(offerings.current.availablePackages);
                }
            } catch (e) {
                console.error("RevenueCat init failed:", e);
                // Unblock boot on failure (e.g. offline / sandbox quirk):
                // stamp the app-user-id so rcIsLoaded can resolve.
                try {
                    const id = await Purchases.getAppUserID();
                    if (!cancelled && id) setRcIsInitializedFor(id);
                } catch {}
            }
        };
        init();
        return () => {
            cancelled = true;
            Purchases.removeCustomerInfoUpdateListener(updateCustomerInformation);
        };
    }, [userPrimaryId]);

    // No userPrimaryId → RC isn't needed yet, so we're "loaded" by definition.
    // Otherwise wait for the entitlement sync to settle on this user.
    const rcIsLoaded = !userPrimaryId || rcIsInitializedFor === userPrimaryId;

    // Restore purchases function
    const rcRestorePurchases = async (): Promise<CustomerInfo | undefined> => {
        if (!rcIsLoaded || isProcessing) return;
        try {
            setIsProcessing(true);
            const info = await Purchases.restorePurchases();
            updateCustomerInformation(info); // optional, listener will also fire
            return info;
        } catch (e) {
            console.error("RC restorePurchases:", e);
        } finally {
            setIsProcessing(false);
        }
    };

    // Purchase package function
    const rcPurchasePackage = async (pack: PurchasesPackage): Promise<MakePurchaseResult | undefined> => {
        if (!rcIsLoaded || isProcessing) return;
        try {
            setIsProcessing(true);
            const purchaseInfo = await Purchases.purchasePackage(pack);
            const customerInfo = await Purchases.getCustomerInfo();
            updateCustomerInformation(customerInfo);
            return purchaseInfo;
        } catch (e) {
            throw e;
        } finally {
            setIsProcessing(false);
        }
    };

    // Expose context
    return (
        <RevenueCatContext.Provider
            value={{
                rcIsLoaded,
                rcUser,
                rcPackages,
                rcRestorePurchases,
                rcPurchasePackage,
                isProcessing,
            }}>
            {children}
        </RevenueCatContext.Provider>
    );
};

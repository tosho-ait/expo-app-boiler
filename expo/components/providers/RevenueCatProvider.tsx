import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
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

    const [rcIsInitialized, setRcIsInitialized] = useState(false);
    const [rcUserIdSyncedFor, setRcUserIdSyncedFor] = useState<string | null>(null);

    const [rcUser, setRcUser] = useState<UserState>(USER_NO_SUBSCRIPTION);
    const [rcPackages, setRcPackages] = useState<PurchasesPackage[]>([]);

    const [isProcessing, setIsProcessing] = useState(false);

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

            } finally {
                const rcUserId = await Purchases.getAppUserID();
                setRcUserIdSyncedFor(rcUserId);
            }
        },
        []
    );

    // Initialize SDK and fetch offerings
    useEffect(() => {
        const init = async () => {
            try {
                const apiKey = Platform.OS === 'ios' ? APIKeys.apple : APIKeys.google;
                await Purchases.configure({apiKey});
                Purchases.addCustomerInfoUpdateListener(updateCustomerInformation);
                const offerings = await Purchases.getOfferings();
                if (offerings.current) {
                    setRcPackages(offerings.current.availablePackages);
                }
            } catch (e) {
                console.error("RevenueCat init failed:", e);
            } finally {
                setRcIsInitialized(true);
            }
        };
        init();
        return () => {
            Purchases.removeCustomerInfoUpdateListener(updateCustomerInformation);
        };
    }, []);

    // Any app user change immediately invalidates entitlements
    useEffect(() => {
        setRcUserIdSyncedFor(null);
    }, [userPrimaryId]);

    // Sync user on login/logout
    useEffect(() => {
        if (!rcIsInitialized) return;
        const syncUser = async () => {
            try {
                const rcUserId = await Purchases.getAppUserID();
                // Logout
                if (!userPrimaryId) {
                    if (!rcUserId.startsWith('$RCAnonymousID')) {
                        await Purchases.logOut();
                    }
                    return;
                }
                // Login
                if (userPrimaryId !== rcUserId) {
                    const result = await Purchases.logIn(userPrimaryId);
                    if (result?.customerInfo) {
                        // Fast entitlement sync
                        updateCustomerInformation(result.customerInfo);
                    }
                }
            } catch (e) {
            }
        };
        syncUser();
    }, [userPrimaryId, rcIsInitialized]);

    // Restore purchases function
    const rcRestorePurchases = async (): Promise<CustomerInfo | undefined> => {
        if (!rcIsInitialized || isProcessing) return;
        try {
            setIsProcessing(true);
            const info = await Purchases.restorePurchases();
            updateCustomerInformation(info); // optional, listener will also fire
            return info;
        } catch (e) {
            //
        } finally {
            setIsProcessing(false);
        }
    };

    // Purchase package function
    const rcPurchasePackage = async (pack: PurchasesPackage): Promise<MakePurchaseResult | undefined> => {
        if (!rcIsInitialized || isProcessing) return;
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

    // if we dont have a userPrimaryId we dont care if we have the rc customerInfo updated
    const rcIsLoaded =
        rcIsInitialized &&
        (
            (userPrimaryId && rcUserIdSyncedFor === userPrimaryId) ||
            (!userPrimaryId && rcUserIdSyncedFor?.startsWith('$RCAnonymousID'))
        );

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

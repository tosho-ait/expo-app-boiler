import React, { useEffect } from 'react';
import { Redirect, usePathname } from "expo-router";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import { useSelector } from "react-redux";


export const AppRoutingGate = ({ children }: { children: React.ReactNode; }) => {

    const pathname = usePathname();

    const {
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
        doSignOut,
        doEraseAccount,
        doLogoutDevice,
        rcUserHasActiveSubscription,
        rcPackages,
        rcRestorePurchases,
        rcPurchasePackage
    } = useAppSession();


    useEffect(() => {
        if (isClerkSignedIn && pathname.startsWith("/welcome")) {
            doSignOut();
        }
    }, [isClerkSignedIn, pathname]);

    let needRedirect;

    const purchaseIntent = useSelector((state: any) => state.purchase.intent);

    if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up") || pathname.startsWith("/reset-pass") || pathname.startsWith("/authenticate")) {

        if (isUserOnlineSignedIn) {
            if (purchaseIntent && !rcUserHasActiveSubscription) {
                needRedirect = "/process-purchase";
            } else {
                needRedirect = "/";
            }
        }

    } else if (pathname.startsWith("/welcome")) {

        if (isUserSignedIn) {
            needRedirect = "/";
        }

    } else if (pathname.startsWith("/onboarding")) {

        // do nothing

    } else if (pathname.startsWith("/get-subscription")) {

        if (rcUserHasActiveSubscription) {
            needRedirect = "/";
        }

    } else if (pathname.startsWith("/process-purchase")) {

        if (rcUserHasActiveSubscription) {
            needRedirect = "/";
        }

    } else {

        if (!isUserSignedIn) {
            needRedirect = "/welcome";
        }

        if (isUserOnlineSignedIn && purchaseIntent && !rcUserHasActiveSubscription) {
            needRedirect = "/process-purchase";
        }
    }

    if (needRedirect) {
        return <Redirect href={needRedirect as any} />
    }

    return (
        <>{children}</>
    );

}

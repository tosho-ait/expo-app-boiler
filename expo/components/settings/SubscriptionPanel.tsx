import React from "react";
import PanelDark from "@/components/panels/PanelDark";
import LinkSection from "@/components/panels/LinkSection";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import { dToD } from "@/lib/dateUtil";

function HasSubscriptionPanel() {
    const { rcUser, rcPackages } = useAppSession();

    let title = rcUser?.activeSubscription;
    let details = "Active Pro Subscription.";
    let details2 = "Renews automatically on " + dToD(rcUser?.activeSubscriptionDetails?.expiresDate) + ".";

    if (!rcUser?.activeSubscriptionDetails?.willRenew) {
        details2 = "Ends on " + dToD(rcUser?.activeSubscriptionDetails?.expiresDate) + " – won't renew."
    }

    rcPackages?.map(pkg => {
        if (pkg.product.identifier === title) {
            title = pkg.product.title;
        }
    });

    return <PanelDark>
        <LinkSection href={rcUser?.managementURL}
            title={title}
            description={details}
            description2={details2}
            icon="fa5:crown" />
    </PanelDark>
}

function NoSubscriptionPanel() {
    return <PanelDark>
        <LinkSection href="/get-subscription"
            title="Pro Plan Not Active"
            description="Upgrade to unlock all features."
            icon="fa5:crown" />
    </PanelDark>;
}

export default function SubscriptionPanel() {
    const { rcUserHasActiveSubscription } = useAppSession();

    return (
        <>
            {!rcUserHasActiveSubscription && <NoSubscriptionPanel />}
            {rcUserHasActiveSubscription && <HasSubscriptionPanel />}
        </>
    );
}

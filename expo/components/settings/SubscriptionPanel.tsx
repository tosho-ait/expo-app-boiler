import React from "react";
import PanelDark from "@/components/panels/PanelDark";
import LinkSection from "@/components/panels/LinkSection";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import { dToD } from "@/lib/dateUtil";
import { useT } from "@/i18n";

function HasSubscriptionPanel() {
    const { rcUser, rcPackages } = useAppSession();
    const { t } = useT();

    let title = rcUser?.activeSubscription;
    const expires = dToD(rcUser?.activeSubscriptionDetails?.expiresDate);
    let details = t("settings.subscriptionActive");
    let details2 = t("settings.subscriptionRenews", { date: expires });

    if (!rcUser?.activeSubscriptionDetails?.willRenew) {
        details2 = t("settings.subscriptionEnds", { date: expires });
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
    const { t } = useT();
    return <PanelDark>
        <LinkSection href="/get-subscription"
            title={t("settings.subscriptionInactiveTitle")}
            description={t("settings.subscriptionInactiveDesc")}
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

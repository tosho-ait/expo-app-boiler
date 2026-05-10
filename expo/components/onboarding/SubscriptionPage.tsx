import { Text, View } from 'react-native';
import React from 'react';
import Button from "@/components/ui/Button";
import PageSignature from "@/components/layout/PageSignature";
import { getIcon } from "@/lib/iconUtil";
import { ScreenLayout } from "./Shared";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { setPurchaseIntent } from "@/redux/action";
import ProgressDots from "@/components/ui/ProgressDots";
import { useT } from "@/i18n";

interface Props {
    onBack?: () => void;
    handleFinish?: () => void;
    isOnboarding?: boolean;
}

export default function SubscriptionPage({
    onBack = () => router.back(),
    handleFinish,
    isOnboarding = false
}: Props) {
    const { isUserOnlineSignedIn, rcPackages, rcRestorePurchases, rcUser, rcUserHasActiveSubscription } = useAppSession();
    const dispatch = useDispatch();
    const { t } = useT();

    const yearlyProductId = process.env.EXPO_PUBLIC_RC_YEARLY_PRODUCT_ID;
    const yearlyPkg = rcPackages?.find((p: any) => p.product.identifier === yearlyProductId);

    const priceString = yearlyPkg?.product?.priceString || "$9.99";
    const monthlyPriceRaw = (yearlyPkg?.product?.price || 9.99) / 12;
    const symbol = priceString.replace(/[\d.,\s]/g, '') || "$";
    const monthlyPriceString = `${symbol}${monthlyPriceRaw.toFixed(2)}`;


    const handleSubscribe = () => {
        if (yearlyPkg) {
            dispatch(setPurchaseIntent(yearlyPkg));
            if (isUserOnlineSignedIn) {
                router.replace("/process-purchase");
            } else {
                router.replace("/authenticate");
            }
        } else if (handleFinish) {
            handleFinish();
        }
    };

    const buttons = isOnboarding ? (
        <View className="items-center w-full">
            {/* @ts-ignore */}
            <Button ghost title={t("common.skip")} action={() => handleFinish && handleFinish()} testID="onboarding-skip" />
        </View>
    ) : null;

    const renderFeature = (icon: string, text: string, tint: string, iconColor: string) => (
        <View className="flex-row items-center mb-3">
            <View className={`w-10 h-10 rounded-ios-sm items-center justify-center mr-3 ${tint}`}>
                {getIcon(icon, 20, iconColor)}
            </View>
            <Text className="text-callout text-typography-800 font-medium flex-1">{text}</Text>
        </View>
    );

    return (
        <PageSignature onBack={onBack} noBackButton={false} heading={<ProgressDots total={6} completed={6} />}
            buttons={buttons}>
            <ScreenLayout>
                <View className="flex-1">

                    <View className="mb-6">
                        <Text className="text-title-1 font-bold text-typography-900 px-1 leading-tight">
                            {t("onboarding.subscription.title")}
                        </Text>
                    </View>

                    {/* Pricing card */}
                    <View className="bg-background-100 rounded-ios-2xl p-5 mb-6">
                        {renderFeature("mc:cloud-sync", t("onboarding.subscription.feature1"), "bg-tertiary-50", "#0A84FF")}
                        {renderFeature("fa:bar-chart", t("onboarding.subscription.feature2"), "bg-success-50", "#34C759")}
                        {renderFeature("fa5:users", t("onboarding.subscription.feature3"), "bg-[#F3E8FF]", "#AF52DE")}
                    </View>

                </View>

                <View className="flex gap-2 items-center w-full mb-2">
                    {rcUserHasActiveSubscription ? (
                        <View className="w-full pb-4">
                            {/* @ts-ignore */}
                            <Button pill href={rcUser?.managementURL} title={t("onboarding.subscription.manage")} />
                        </View>
                    ) : (
                        <>
                            <View className="flex-row items-center mb-2">
                                <View className="mr-2">
                                    {getIcon("fa5:check", 14, "#636366")}
                                </View>
                                <Text className="text-footnote font-semibold text-typography-500">{t("onboarding.subscription.noPaymentDue")}</Text>
                            </View>
                            {/* @ts-ignore */}
                            <Button pill title={t("onboarding.subscription.tryFree")} action={handleSubscribe as any} />
                            <Text className="text-footnote font-medium text-typography-500 mt-2 text-center">
                                {t("onboarding.subscription.trialInfo")}
                            </Text>
                            <Text className="text-footnote font-medium text-typography-500 text-center">
                                {t("onboarding.subscription.priceInfo", { price: priceString, monthly: monthlyPriceString })}
                            </Text>
                        </>
                    )}

                    {!isOnboarding && isUserOnlineSignedIn && !rcUserHasActiveSubscription && (
                        <View className="mt-4">
                            {/* @ts-ignore */}
                            <Button link_pale
                                title={t("onboarding.subscription.restore")}
                                onPress={async () => {
                                    let result;
                                    try {
                                        result = await rcRestorePurchases();
                                    } catch (e) {
                                        alert(t("onboarding.subscription.notFound"));
                                    }
                                    if (!result?.activeSubscriptions?.length) {
                                        alert(t("onboarding.subscription.notFound"));
                                    } else {
                                        alert(t("onboarding.subscription.restored"));
                                    }
                                }} />
                        </View>
                    )}
                </View>
            </ScreenLayout>
        </PageSignature>
    );
}

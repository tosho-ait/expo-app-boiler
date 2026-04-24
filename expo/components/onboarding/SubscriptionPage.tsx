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
import { COLORS } from "@/lib/colors";
import ProgressDots from "@/components/ui/ProgressDots";

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
            <Button link_pale title="Skip for Now" action={() => handleFinish && handleFinish()} testID="onboarding-skip" />
        </View>
    ) : null;

    const renderSubscriptionFeature = (icon: string, text: string, bgClass: string) => (
        <View className="flex-row items-center mb-3 px-2">
            <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${bgClass}`}>
                {getIcon(icon, 22, "#ffffff")}
            </View>
            <Text className="text-xl text-gray-800 font-medium flex-1">{text}</Text>
        </View>
    );

    return (
        <PageSignature onBack={onBack} noBackButton={false} heading={<ProgressDots total={6} completed={6} />}
            buttons={buttons}>
            <ScreenLayout>
                <View className="flex-1">

                    <View className="mb-6 items-center">
                        <Text className="text-4xl font-black text-center text-gray-900 leading-tight px-2">
                            Unlock Pro
                        </Text>
                    </View>

                    <View className="flex w-full mt-5 mb-2">
                        {renderSubscriptionFeature("mc:cloud-sync", "Instant Cloud Sync & Backups", COLORS.BLUE_BG)}
                        {renderSubscriptionFeature("fa:bar-chart", "Advanced features", COLORS.GREEN_BG)}
                        {renderSubscriptionFeature("fa5:users", "Priority support", COLORS.PURPLE_BG)}
                    </View>

                </View>

                <View className="flex gap-1 items-center w-full mb-6">
                    {rcUserHasActiveSubscription ? (
                        <View className="w-full pb-4">
                            <Button pill href={rcUser?.managementURL} title="Manage Your Subscription" />
                        </View>
                    ) : (
                        <>
                            <View className="flex-row items-center mb-3">
                                <View className="mr-2">
                                    {getIcon("fa5:check", 16, "#4b5563")}
                                </View>
                                <Text className="text-sm font-semibold text-gray-600">No Payment Due Now</Text>
                            </View>
                            {/* @ts-ignore */}
                            <Button pill title="Try for Free" action={handleSubscribe as any} />
                            <Text className="text-sm font-medium text-gray-500 mt-2">
                                Start with a 7-day Free Trial
                            </Text>
                            <Text className="text-sm font-medium text-gray-500 mt-2">
                                Just {priceString} per year (≈ {monthlyPriceString} /mo)
                            </Text>
                        </>
                    )}

                    {!isOnboarding && isUserOnlineSignedIn && !rcUserHasActiveSubscription && (
                        <View className="mt-4">
                            {/* @ts-ignore */}
                            <Button link_pale
                                title="Restore Subscription"
                                onPress={async () => {
                                    let result;
                                    try {
                                        result = await rcRestorePurchases();
                                    } catch (e) {
                                        alert("No pro subscription found.");
                                    }
                                    if (!result?.activeSubscriptions?.length) {
                                        alert("No pro subscription found.");
                                    } else {
                                        alert("Subscription restored.");
                                    }
                                }} />
                        </View>
                    )}
                </View>
            </ScreenLayout>
        </PageSignature>
    );
}

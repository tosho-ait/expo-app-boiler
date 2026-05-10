import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import { setPurchaseIntent } from "../../redux/action";
import PageSignature from "@/components/layout/PageSignature";
import Button from "@/components/ui/Button";
import { router } from "expo-router";
import { useT } from "@/i18n";


export default function ProcessPurchase() {

    const dispatch = useDispatch();
    const purchaseIntent = useSelector(state => state.purchase.intent);
    const { rcPurchasePackage, userOnlineId, rcUser } = useAppSession();
    const { t } = useT();
    const [error, setError] = useState(false);

    useEffect(() => {

        const process = async () => {
            if (purchaseIntent && userOnlineId && !rcUser.activeSubscription) {
                try {
                    await rcPurchasePackage(purchaseIntent);
                    dispatch(setPurchaseIntent(null));
                } catch (e) {
                    dispatch(setPurchaseIntent(null));
                    setError(true);
                }
            } else if (!purchaseIntent) {
                setError(true);
            }
        }

        process();

    }, [purchaseIntent, userOnlineId, rcUser.activeSubscription]);

    if (error) {
        return (
            <PageSignature>
                <View className="flex-1 justify-center items-center">
                    <Text className="text-headline font-semibold text-typography-700 mt-4 mb-6 text-center">
                        {t("processPurchase.failed")}
                    </Text>
                    <Button pill title={t("processPurchase.goBack")} onPress={() => router.replace("/get-subscription")} />
                </View>
            </PageSignature>
        );
    }

    return (
        <PageSignature>
            <View className="flex-1 justify-center items-center">
                <Text className="text-headline font-semibold text-typography-700 mt-4">
                    {t("processPurchase.completing")}
                </Text>
            </View>
        </PageSignature>
    );
}

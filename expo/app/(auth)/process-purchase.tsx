import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import { setPurchaseIntent } from "../../redux/action";
import PageSignature from "@/components/layout/PageSignature";
import Button from "@/components/ui/Button";
import { router } from "expo-router";


export default function ProcessPurchase() {

    const dispatch = useDispatch();
    const purchaseIntent = useSelector(state => state.purchase.intent);
    const { rcPurchasePackage, userOnlineId, rcUser } = useAppSession();
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
                <View className="flex-1 justify-center items-center bg-white">
                    <Text className="text-lg font-bold text-gray-700 mt-4 mb-6">
                        Could not complete the purchase.
                    </Text>
                    <Button pill title="Go Back" onPress={() => router.replace("/get-subscription")} />
                </View>
            </PageSignature>
        );
    }

    return (
        <PageSignature>
            <View className="flex-1 justify-center items-center bg-white">
                <Text className="text-lg font-bold text-gray-700 mt-4">
                    Completing your subscription...
                </Text>
            </View>
        </PageSignature>
    );
}

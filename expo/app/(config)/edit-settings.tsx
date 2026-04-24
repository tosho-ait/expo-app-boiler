import React, { useState } from "react";
import SettingsPanel from "@/components/feature/SettingsPanel";
import Button from "@/components/ui/Button";
import { saveConfig } from "@/redux/action";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import PageSignature from "@/components/layout/PageSignature";
import { View } from "react-native";


export default function EditSettingsScreen() {

    const router = useRouter();
    const dispatch = useDispatch();
    const _defaultCurrency = useSelector((state: any) => state.todos.config?.defaultCurrency) || "USD";
    let [defaultCurrency, setDefaultCurrency] = useState(_defaultCurrency);

    return (
        <PageSignature
            heading="Settings"
            noBackButton={false}
            onBack={() => router.back()}
            buttons={
                <Button pill
                    title="Save"
                    onPress={() => {
                        dispatch(saveConfig({ defaultCurrency }));
                        router.navigate('/config');
                    }} />}>

            <View className="p-4" />

            <SettingsPanel defaultCurrency={defaultCurrency} setDefaultCurrency={setDefaultCurrency} showLegal={false}
                hideCurrencyLabel={false} />

        </PageSignature>
    );
}

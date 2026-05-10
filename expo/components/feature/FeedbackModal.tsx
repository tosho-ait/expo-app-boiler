import { Alert, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import BottomSheet from "@/components/ui/BottomSheet";
import { fetchFeedback } from '@/lib/fetchUtil';
import { useUser } from "@clerk/expo";
import { useT } from "@/i18n";


function FeedbackModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {

    const [text, setText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useUser();
    const { t } = useT();

    useEffect(() => {
        if (visible) {
            setText("");
            setIsSubmitting(false);
        }
    }, [visible]);

    const handleSend = async () => {
        if (!text.trim()) {
            Alert.alert(t("feedback.error"), t("feedback.enterFirst"));
            return;
        }

        setIsSubmitting(true);

        const email = user?.primaryEmailAddress?.emailAddress
            || user?.emailAddresses?.[0]?.emailAddress
            || undefined;

        await fetchFeedback({
            text,
            email,
            onSuccess: () => {
                Alert.alert(t("feedback.success"), t("feedback.thankYou"));
                setText("");
                setIsSubmitting(false);
                onClose();
            },
            onFail: () => {
                Alert.alert(t("feedback.oops"), t("feedback.somethingWrong"));
                setIsSubmitting(false);
            }
        });
    };

    return (
        <BottomSheet visible={visible} onClose={onClose} title={t("feedback.title")} dismissKeyboardOnTap>
            <View className="p-6 gap-6 flex-1">

                <Text className="text-lg text-gray-600">
                    {t("feedback.description")}
                </Text>

                <TextInput
                    multiline
                    className="w-full h-[140px] border border-gray-300 rounded-lg p-3 text-xl text-gray-900 align-text-top"
                    placeholder={t("feedback.placeholder")}
                    placeholderTextColor="#a3a3a3"
                    value={text}
                    onChangeText={setText}
                    editable={!isSubmitting}
                    autoFocus
                />

                <View className="flex-row justify-end">
                    <Button
                        blue
                        title={isSubmitting ? t("feedback.sending") : t("feedback.send")}
                        isDisabled={isSubmitting}
                        onPress={handleSend}
                    />
                </View>

            </View>
        </BottomSheet>
    );
}

export default FeedbackModal;

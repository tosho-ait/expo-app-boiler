import { Alert, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import BottomSheet from "@/components/ui/BottomSheet";
import { fetchFeedback } from '@/lib/fetchUtil';
import { useUser } from '@clerk/clerk-expo';


function FeedbackModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {

    const [text, setText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        if (visible) {
            setText("");
            setIsSubmitting(false);
        }
    }, [visible]);

    const handleSend = async () => {
        if (!text.trim()) {
            Alert.alert("Error", "Please enter your feedback first.");
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
                Alert.alert("Success", "Thank you for your feedback!");
                setText("");
                setIsSubmitting(false);
                onClose();
            },
            onFail: () => {
                Alert.alert("Oops", "Something went wrong. Please try again.");
                setIsSubmitting(false);
            }
        });
    };

    return (
        <BottomSheet visible={visible} onClose={onClose} title="Leave Feedback" dismissKeyboardOnTap>
            <View className="p-6 gap-6 flex-1">

                <Text className="text-lg text-gray-600">
                    Share ideas, report bugs, or just say hello. We read every message.
                </Text>

                <TextInput
                    multiline
                    className="w-full h-[140px] border border-gray-300 rounded-lg p-3 text-xl text-gray-900 align-text-top"
                    placeholder="Your feedback..."
                    placeholderTextColor="#a3a3a3"
                    value={text}
                    onChangeText={setText}
                    editable={!isSubmitting}
                    autoFocus
                />

                <View className="flex-row justify-end">
                    <Button
                        blue
                        title={isSubmitting ? "Sending..." : "Send Feedback"}
                        isDisabled={isSubmitting}
                        onPress={handleSend}
                    />
                </View>

            </View>
        </BottomSheet>
    );
}

export default FeedbackModal;

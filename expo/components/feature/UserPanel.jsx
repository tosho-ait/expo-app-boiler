import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Image, Pressable, Text, View, TextInput, ActivityIndicator } from 'react-native'
import Button from "../ui/Button";
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import { useT } from "@/i18n";


function resolveCurrentUserDetails({ clerkUser, anonymousLabel }) {
    const primaryEmail = clerkUser?.primaryEmailAddress?.emailAddress
        || clerkUser?.emailAddresses?.[0]?.emailAddress
        || "";
    const fullName = clerkUser?.fullName || clerkUser?.firstName || "";
    return {
        label: fullName || primaryEmail || anonymousLabel,
        email: primaryEmail,
        imageUrl: clerkUser?.imageUrl || null,
    };
}


export default function UserPanel({ }) {

    const { clerkUser } = useAppSession();
    const { t } = useT();

    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState("");
    const [isSavingName, setIsSavingName] = useState(false);

    async function onSaveName() {
        if (!newName.trim()) return;
        setIsSavingName(true);
        try {
            const parts = newName.trim().split(" ");
            const firstName = parts[0] || "";
            const lastName = parts.slice(1).join(" ") || "";
            await clerkUser?.update({ firstName, lastName });
            setIsEditingName(false);
        } catch (err) {
            alert(err?.errors?.[0]?.message || t("userPanel.errorUpdatingName"));
        } finally {
            setIsSavingName(false);
        }
    }

    async function onPickImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 0.1,
                base64: true,
            });
            if (!result.canceled && result.assets[0].base64) {
                const base64 = result.assets[0].base64;
                const mimeType = result.assets[0].mimeType;
                const image = `data:${mimeType};base64,${base64}`;
                await clerkUser?.setProfileImage({ file: image });
            }
        } catch (err) {
            alert(err.errors[0].message);
        }
    }

    const details = resolveCurrentUserDetails({ clerkUser, anonymousLabel: t("userPanel.anonymous") });

    return (
        <View className="bg-background-0 mx-4 rounded-ios-2xl shadow-ios-card p-5">
            <SignedIn>
                <View className="items-center">
                    <View className="relative w-28 h-28 mb-4">
                        {details.imageUrl ? (
                            <Image
                                source={{ uri: details.imageUrl }}
                                className="w-28 h-28 rounded-full"
                                resizeMode="cover" />
                        ) : (
                            <View className="w-28 h-28 rounded-full bg-background-100 items-center justify-center">
                                <MaterialIcons name="person" size={64} color="#8E8E93" />
                            </View>
                        )}
                        <Pressable
                            onPress={onPickImage}
                            className="absolute bottom-0 right-0 w-9 h-9 bg-primary-800 rounded-full items-center justify-center shadow-ios-card active:opacity-80">
                            <Ionicons name="camera" size={18} color="white" />
                        </Pressable>
                    </View>

                    {isEditingName ? (
                        <View className="flex-row items-center gap-2 w-full justify-center">
                            <TextInput
                                className="text-title-3 font-semibold text-typography-900 border-b border-outline-200 min-w-[180px] text-center pb-1"
                                value={newName}
                                onChangeText={setNewName}
                                autoFocus
                                editable={!isSavingName}
                            />
                            <Pressable onPress={onSaveName} disabled={isSavingName} className="p-1">
                                {isSavingName ? (
                                    <ActivityIndicator size="small" color="#091A2F" />
                                ) : (
                                    <Ionicons name="checkmark-circle" size={26} color="#34C759" />
                                )}
                            </Pressable>
                            <Pressable onPress={() => setIsEditingName(false)} disabled={isSavingName} className="p-1">
                                <Ionicons name="close-circle" size={26} color="#8E8E93" />
                            </Pressable>
                        </View>
                    ) : (
                        <Pressable
                            onPress={() => { setNewName(details.label); setIsEditingName(true); }}
                            className="flex-row items-center gap-2 active:opacity-60">
                            <Text className="text-title-2 font-bold text-typography-900">
                                {details.label}
                            </Text>
                            <Ionicons name="pencil" size={16} color="#8E8E93" />
                        </Pressable>
                    )}

                    {details.email && details.email !== details.label && (
                        <Text className="text-footnote text-typography-500 mt-1">{details.email}</Text>
                    )}
                </View>
            </SignedIn>
            <SignedOut>
                <View className="items-center py-2">
                    <View className="w-28 h-28 rounded-full bg-background-100 items-center justify-center mb-4">
                        <MaterialIcons name="person" size={64} color="#8E8E93" />
                    </View>
                    <Text className="text-title-2 font-bold text-typography-900 mb-1">{t("userPanel.anonymous")}</Text>
                    <Text className="text-callout text-typography-500 mb-5 text-center">
                        {t("userPanel.signInHint")}
                    </Text>
                    <View className="w-full max-w-[280px]">
                        <Button pill title={t("userPanel.signUpFree")} href="/authenticate" />
                    </View>
                </View>
            </SignedOut>
        </View>
    );
}

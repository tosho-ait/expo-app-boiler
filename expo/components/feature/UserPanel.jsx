import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { Image, Pressable, Text, View, TextInput, ActivityIndicator } from 'react-native'
import Button from "../ui/Button";
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from "@expo/vector-icons";
import { useAppSession } from "@/components/providers/AppSessionProvider";
import PanelFullWhite from "@/components/panels/PanelFullWhite";


function resolveCurrentUserDetails({ clerkUser }) {
    const primaryEmail = clerkUser?.primaryEmailAddress?.emailAddress
        || clerkUser?.emailAddresses?.[0]?.emailAddress
        || "";
    const fullName = clerkUser?.fullName || clerkUser?.firstName || "";
    return {
        label: fullName || primaryEmail || "Anonymous",
        imageUrl: clerkUser?.imageUrl || null,
    };
}


export default function UserPanel({ }) {

    const { clerkUser } = useAppSession();

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
            alert(err?.errors?.[0]?.message || "Error updating name");
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

    const details = resolveCurrentUserDetails({ clerkUser });

    return <PanelFullWhite>
        <SignedIn>
            <View className="items-center space-y-2 p-2">
                <View className="relative w-40 h-40">
                    {details.imageUrl ? (
                        <Image
                            source={{ uri: details.imageUrl }}
                            className="w-40 h-40 rounded-full border border-gray-300"
                            resizeMode="cover" />
                    ) : (
                        <View className="w-40 h-40 rounded-full border border-gray-300 bg-gray-200 items-center justify-center">
                            <MaterialIcons name="person" size={80} color="gray" />
                        </View>
                    )}
                    <Pressable
                        onPress={onPickImage}
                        className="absolute bottom-0 right-0 bg-white rounded-full p-2">
                        <MaterialIcons name="photo-camera" size={18} color="gray" />
                    </Pressable>
                </View>

                <View className="flex-row items-center justify-center pt-2 w-full px-4 h-12 relative">
                    {isEditingName ? (
                        <>
                            <TextInput
                                className="text-xl font-semibold text-gray-800 border-b border-gray-300 min-w-[150px] text-center pb-1"
                                value={newName}
                                onChangeText={setNewName}
                                autoFocus
                                editable={!isSavingName}
                            />
                            <View className="flex-row items-center space-x-1 absolute right-4">
                                <Pressable onPress={onSaveName} disabled={isSavingName} className="p-1">
                                    {isSavingName ? (
                                        <ActivityIndicator size="small" color="black" />
                                    ) : (
                                        <MaterialIcons name="check" size={24} color="green" />
                                    )}
                                </Pressable>
                                <Pressable onPress={() => setIsEditingName(false)} disabled={isSavingName} className="p-1">
                                    <MaterialIcons name="close" size={24} color="gray" />
                                </Pressable>
                            </View>
                        </>
                    ) : (
                        <View className="relative flex-row items-center justify-center">
                            <Text className="text-xl font-semibold text-gray-800 text-center px-2">
                                {details.label}
                            </Text>
                            <Pressable onPress={() => { setNewName(details.label); setIsEditingName(true); }} className="absolute -right-6 p-1">
                                <MaterialIcons name="edit" size={18} color="gray" />
                            </Pressable>
                        </View>
                    )}
                </View>

            </View>
        </SignedIn>
        <SignedOut>
            <View className="flex flex-col items-center justify-center p-8 space-y-4">

                <View className="relative w-40 h-40 flex items-center justify-center">
                    <View className="w-40 h-40 rounded-full border border-gray-300 bg-gray-200 items-center justify-center">
                        <MaterialIcons name="person" size={80} color="gray" />
                    </View>
                </View>

                <Text className="text-2xl font-semibold text-gray-800 pt-4 text-center">Anonymous User</Text>

                <View className="w-full max-w-[250px] pt-2">
                    <Button title="Sign Up for Free" href="/authenticate" />
                </View>

            </View>
        </SignedOut>
    </PanelFullWhite>;
}

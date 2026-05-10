import "@/global.css";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import 'react-native-reanimated';
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AccountSync from "@/components/feature/AccountSync";
import Spinner from "@/components/ui/Spinner";
import { ClerkProvider } from "@clerk/expo";
import { resourceCache } from '@clerk/expo/resource-cache'
import { tokenCache } from "@/components/providers/tokenCache";
import { RevenueCatProvider } from "@/components/providers/RevenueCatProvider";
import { AppSessionProvider } from "@/components/providers/AppSessionProvider";
import { AntDesign, Feather, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...AntDesign.font,
        ...Ionicons.font,
        ...Feather.font,
        ...FontAwesome5.font,
        ...FontAwesome6.font,
        ...MaterialCommunityIcons.font,
        ...MaterialIcons.font
    });

    if (!loaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>

                <ClerkProvider tokenCache={tokenCache} __experimental_resourceCache={resourceCache}
                    publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>

                    <RevenueCatProvider>
                        <AppSessionProvider>

                            <View style={{ flex: 1 }}>
                                <Stack>

                                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                    <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                                    <Stack.Screen name="(about)" options={{ headerShown: false }} />
                                    <Stack.Screen name="(start)" options={{ headerShown: false }} />
                                    <Stack.Screen name="(config)" options={{ headerShown: false }} />

                                    <Stack.Screen name="+not-found" options={{ headerShown: false }} />

                                    <Stack.Screen name="todo-edit"
                                        options={{ presentation: 'modal', headerShown: false }} />

                                </Stack>

                                <AccountSync />

                                <Spinner />

                            </View>

                        </AppSessionProvider>
                    </RevenueCatProvider>

                </ClerkProvider>

            </PersistGate>
        </Provider>
    );
}

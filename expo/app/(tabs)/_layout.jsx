import { router, Tabs, usePathname } from 'expo-router';
import React from 'react';
import { Platform, Pressable, View } from 'react-native';
import { HapticTab } from '@/components/ui/HapticTab';
import TabBarBackground from '../../components/layout/TabBarBackground';
import { getIcon } from "../../lib/iconUtil";
import { AppRoutingGate } from "@/components/providers/AppRoutingGate";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "@/lib/colors";
import { useT } from "@/i18n";


export default function TabLayout() {
    const pathname = usePathname();
    const { t } = useT();

    return (
        <AppRoutingGate instance="tabs">

            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: COLORS.ACCENT,
                    tabBarInactiveTintColor: "#8E8E93",
                    headerShown: false,
                    tabBarButton: HapticTab,
                    tabBarBackground: TabBarBackground,
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontWeight: '500',
                    },
                    tabBarStyle: Platform.select({
                        ios: { position: 'absolute', borderTopWidth: 0 },
                        default: { borderTopWidth: 0, elevation: 0 },
                    }),
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: t("tabs.dashboard"),
                        tabBarTestID: 'tab-dashboard',
                        tabBarIcon: ({ color, focused }) => getIcon(focused ? "ii:list" : "ii:list-outline", 24, color)
                    }}
                />
                <Tabs.Screen
                    name="showcase"
                    options={{
                        title: t("tabs.showcase"),
                        tabBarTestID: 'tab-showcase',
                        tabBarIcon: ({ color, focused }) => getIcon(focused ? "ii:color-palette" : "ii:color-palette-outline", 24, color)
                    }}
                />
                <Tabs.Screen
                    name="config"
                    options={{
                        title: t("tabs.settings"),
                        tabBarTestID: 'tab-settings',
                        tabBarIcon: ({ color, focused }) => getIcon(focused ? "ii:settings" : "ii:settings-outline", 24, color)
                    }}
                />
            </Tabs>

            {pathname === "/" && (
                <Pressable
                    className="absolute bottom-[100px] right-5 bg-primary-800 w-14 h-14 rounded-full items-center justify-center z-50 shadow-ios-fab active:opacity-90 active:scale-95"
                    onPress={() => router.push("/todo-edit")}>
                    <AntDesign name="plus" size={28} color="white" />
                </Pressable>
            )}

        </AppRoutingGate>
    );
}

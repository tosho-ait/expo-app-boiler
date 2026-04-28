import { router, Tabs, usePathname } from 'expo-router';
import React from 'react';
import { Platform, Pressable } from 'react-native';
import { HapticTab } from '@/components/ui/HapticTab';
import TabBarBackground from '../../components/layout/TabBarBackground';
import { getIcon } from "../../lib/iconUtil";
import { AppRoutingGate } from "@/components/providers/AppRoutingGate";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "@/lib/colors";
import DashboardTutorial from "@/components/feature/DashboardTutorial";
import { useT } from "@/i18n";


export default function TabLayout() {
    const pathname = usePathname();
    const { t } = useT();

    return (
        <AppRoutingGate instance="tabs">

            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: COLORS.ACCENT,
                    headerShown: false,
                    tabBarButton: HapticTab,
                    tabBarBackground: TabBarBackground,
                    tabBarStyle: Platform.select({
                        ios: { position: 'absolute' },
                        default: {},
                    }),
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: t("tabs.dashboard"),
                        tabBarTestID: 'tab-dashboard',
                        tabBarIcon: ({ color }) => getIcon("ii:list-outline", 24, color)
                    }}
                />
                <Tabs.Screen
                    name="showcase"
                    options={{
                        title: t("tabs.showcase"),
                        tabBarTestID: 'tab-showcase',
                        tabBarIcon: ({ color }) => getIcon("ii:color-palette-outline", 24, color)
                    }}
                />
                <Tabs.Screen
                    name="config"
                    options={{
                        title: t("tabs.settings"),
                        tabBarTestID: 'tab-settings',
                        tabBarIcon: ({ color }) => getIcon("ii:settings-outline", 24, color)
                    }}
                />
            </Tabs>

            {pathname === "/" && (
                <Pressable
                    className={"absolute bottom-[90] right-6  px-4 py-4 rounded-full z-50 " + COLORS.ACCENT_BG}
                    onPress={() => router.push("/todo-edit")}>
                    <AntDesign name="plus" size={36} color="white" />
                </Pressable>
            )}

            {pathname === "/" && <DashboardTutorial />}

        </AppRoutingGate>
    );
}

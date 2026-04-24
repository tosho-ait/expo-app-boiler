import {Slot} from 'expo-router';
import React from 'react';
import {AppRoutingGate} from "@/components/providers/AppRoutingGate";


export default function Layout() {
    return (
        <AppRoutingGate instance="start">
            <Slot/>
        </AppRoutingGate>
    );
}

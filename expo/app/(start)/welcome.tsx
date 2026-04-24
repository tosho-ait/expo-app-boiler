import React from "react";
import WelcomePage from "@/components/onboarding/WelcomePage";
import {router} from "expo-router";


export default function WelcomeScreen() {
    return (
        <WelcomePage
            onNext={() => router.push("/onboarding")}
            onLogin={() => router.push("/authenticate")}/>
    );
}

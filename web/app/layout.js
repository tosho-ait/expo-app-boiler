import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: 'AppBoiler — Cross-platform app starter',
    description: 'A starter template for building cross-platform apps with an Expo mobile client, a Next.js backend, and shared business logic.',
    authors: [{ name: 'AppBoiler' }],
    alternates: {
        canonical: '/',
    },
    appleWebApp: {
        title: 'AppBoiler',
        statusBarStyle: 'black-translucent',
    },
    twitter: {
        card: 'summary_large_image',
    },
    openGraph: {
        title: 'AppBoiler — Cross-platform app starter',
        description: 'A starter template for building cross-platform apps with an Expo mobile client, a Next.js backend, and shared business logic.',
        siteName: 'AppBoiler',
        locale: 'en_US',
        type: 'website',
    },
};


import FeedbackModal from "@/components/FeedbackModal";

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

                    {children}
                    <FeedbackModal />
                    {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}

                </body>
            </html>
        </ClerkProvider>
    );
}

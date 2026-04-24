'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function FAQAccordion() {
    const faqs = [
        {
            q: "What is AppBoiler?",
            a: "AppBoiler is a minimal starter template for building cross-platform apps with an Expo mobile client, a Next.js backend, and shared business logic."
        },
        {
            q: "What's included?",
            a: "Authentication (Clerk), subscriptions (RevenueCat), a pull/push sync protocol against MongoDB, a sample onboarding flow, paywall, settings screens, feedback and a simple todo list to wire it all together."
        },
        {
            q: "Do I need an account to use the app?",
            a: "No. You can try the app in anonymous mode. Cloud sync and subscription features require an account."
        },
        {
            q: "Where is my data stored?",
            a: "By default, data stays on your device. Once you sign in, it can be synced to the backend you configure."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((item, i) => (
                <div
                    key={i}
                    className="border border-slate-200 bg-sky-200 rounded-2xl ">
                    <button
                        onClick={() => toggle(i)}
                        className="w-full flex justify-between items-center py-5 px-6 text-left">

                        <span className="text-lg font-medium">{item.q}</span>
                        <span className="text-sky-900 text-2xl font-bold">
                            {openIndex === i ? "−" : "+"}
                        </span>
                    </button>

                    <AnimatePresence initial={false}>
                        {openIndex === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden">
                                <div className="px-6 pb-6 text-slate-600 text-md leading-relaxed">
                                    {item.a}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}

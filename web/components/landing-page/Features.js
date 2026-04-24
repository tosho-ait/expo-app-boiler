import { motion } from "motion/react";

const featureList = [
    {
        title: "Ship cross-platform",
        subtitle: "Expo + Next.js",
        description: "A React Native mobile app powered by Expo Router plus a Next.js web server for APIs and the landing page. One monorepo, two clients.",
        bgClass: "bg-emerald-500",
    },
    {
        title: "Auth, sync, billing",
        subtitle: "Batteries included",
        description: "Clerk for authentication, RevenueCat for subscriptions, and a simple pull/push sync protocol against MongoDB — ready to extend.",
        bgClass: "bg-indigo-500",
    },
    {
        title: "Shared business logic",
        subtitle: "One source of truth",
        description: "A local @appboiler/shared package imported by both the mobile app and the server keeps your core types and utilities in one place.",
        bgClass: "bg-amber-500",
    },
    {
        title: "Ready-made flows",
        subtitle: "Onboarding, paywall, settings",
        description: "Sample onboarding flow, paywall, settings screens, feedback modal and a simple todo list to demonstrate the sync pipeline end-to-end.",
        bgClass: "bg-sky-500",
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-slate-100">
            <div className="container mx-auto px-6 xl:px-20 max-w-6xl">

                <div className="mb-20 text-center">
                    <p className="text-xs font-semibold text-sky-500 uppercase tracking-widest mb-3">Features</p>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">What you get out of the box</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {featureList.map((f, i) => (
                        <motion.div
                            key={i}
                            className="bg-white rounded-3xl p-10 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}>

                            <div className={`w-14 h-14 rounded-full mb-8 ${f.bgClass}`} />

                            <span className="text-xs uppercase tracking-wider text-sky-600 font-bold mb-3 block">
                                {f.subtitle}
                            </span>
                            <h3 className="text-2xl font-bold mb-4 tracking-tight text-slate-800">
                                {f.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {f.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

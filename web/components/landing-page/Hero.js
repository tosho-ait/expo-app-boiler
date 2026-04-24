import { motion } from "motion/react";

export default function Hero() {
    return (
        <section id="hero" className="pt-32 pb-20 bg-gradient-to-br from-sky-50 to-white">
            <div className="container mx-auto px-6 xl:px-20">

                <motion.div
                    className="w-full text-center max-w-3xl mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-slate-900 tracking-tight">
                        Your next app<br className="hidden lg:block" />
                        <span className="text-sky-600"> starts here.</span>
                    </h1>

                    <p className="text-lg md:text-xl mb-10 text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
                        AppBoiler is a starter template for building cross-platform apps with an Expo mobile client, a Next.js backend, and shared business logic.
                    </p>

                </motion.div>

            </div>
        </section>
    );
}

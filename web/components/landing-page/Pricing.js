import React from 'react';
import { motion } from "motion/react";
import Link from "next/link";

export default function Pricing() {

    return (
        <section id="pricing" className="relative py-28 bg-sky-900 text-white text-center overflow-hidden">
            <div className="container mx-auto px-10 xl:px-20">

                <div className="mb-20 text-center">
                    <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest mb-2">Pricing</p>
                    <h2 className="mt-2 text-3xl md:text-4xl font-bold">Simple, flexible plans</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-sky-600/20 rounded-3xl p-10 border border-slate-300">

                        <div className="h-[180px] flex flex-col">
                            <h3 className="text-2xl font-bold mb-2">Free</h3>
                            <p className="text-sky-300 mb-4">Get started and explore the basics.</p>
                            <div className="flex-grow flex flex-col justify-center">
                                <p className="text-5xl font-extrabold mb-1">$ 0</p>
                                <p className="text-slate-400 text-sm font-medium mb-4">always free</p>
                            </div>
                        </div>

                        <ul className="text-left space-y-3 text-slate-200">
                            <li>✓ Core features</li>
                            <li>✓ Local-first data</li>
                            <li>✓ No ads, no lock-in</li>
                        </ul>

                        <div className="mt-10 flex justify-center">
                            <Link href="#download"
                                className="bg-black text-white hover:bg-gray-900 font-bold py-3 px-8 rounded-full transition-colors">
                                Get Started
                            </Link>
                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-sky-600/20 rounded-3xl p-10 border border-sky-400 relative shadow-[0_0_40px_rgba(14,165,233,0.2)]">

                        <div className="h-[180px] flex flex-col">
                            <h3 className="text-2xl font-bold mb-2">Pro</h3>
                            <p className="text-sky-300 mb-4">Unlock everything.</p>
                            <div className="flex-grow flex flex-col justify-center">
                                <p className="text-5xl font-extrabold mb-1">$ 9.99</p>
                                <p className="text-slate-400 text-sm font-medium mb-4">per year</p>
                            </div>
                        </div>

                        <ul className="text-left space-y-3 text-slate-100">
                            <li>✓ Everything in Free</li>
                            <li>✓ Cloud sync & backup</li>
                            <li>✓ Priority support</li>
                        </ul>

                        <div className="mt-10 flex justify-center">
                            <Link href="#download"
                                className="bg-black text-white hover:bg-gray-900 font-bold py-3 px-8 rounded-full transition-colors">
                                Get Started
                            </Link>
                        </div>

                    </motion.div>

                </div>

            </div>
        </section>
    );
}

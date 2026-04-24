'use client';

import React from 'react';
import Link from "next/link";


export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="container mx-auto px-10 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">

                    <div>
                        <Link href="#hero" className="text-2xl font-bold tracking-tight text-white">
                            App<span className="text-sky-500">Boiler</span>
                        </Link>
                        <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
                            A cross-platform app starter template.
                        </p>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-white font-semibold uppercase tracking-wider mb-4 text-sm">Product</h3>
                            <ul className="flex flex-col gap-3">
                                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                                <li><Link href="#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold uppercase tracking-wider mb-4 text-sm">Legal</h3>
                            <ul className="flex flex-col gap-3">
                                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} AppBoiler.</p>
                </div>
            </div>
        </footer>
    );
}

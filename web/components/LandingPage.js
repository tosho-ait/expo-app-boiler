'use client';

import React from 'react';
import Footer from "./Footer";
import Header from "./landing-page/Header";
import Hero from "./landing-page/Hero";
import Features from "./landing-page/Features";
import Pricing from "./landing-page/Pricing";
import FAQ from "./landing-page/FAQ";
import CTA from "./landing-page/CTA";

export default function LandingPage() {
    return (
        <div className="font-sans text-gray-800">
            <Header />
            <Hero />
            <Features />
            <Pricing />
            <FAQ />
            <CTA />
            <Footer />
        </div>
    );
}

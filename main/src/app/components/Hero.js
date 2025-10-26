// FILE: app/components/Hero.js

import React from 'react';
import { ShoppingCart, CreditCard, User, Zap } from 'lucide-react';

const Hero = () => (
    <section className="relative pt-20 pb-32 sm:pt-28 sm:pb-40">
        <div className="container mx-auto px-6 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Generated $20 million in sales.
            </h1>
            <h2 className="mt-8 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white max-w-4xl mx-auto">
                Training sales reps to make millions a year. Getting that promotion and new high-paying clients is easy.
            </h2>
            <a
                href="#services"
                className="mt-8 inline-block px-8 py-4 bg-yellow-400 text-[#0f1729] text-lg sm:text-xl font-bold rounded-lg hover:bg-yellow-300 transition-colors shadow-lg"
            >
                FASTEST way to earn freedom NOW
            </a>
        </div>
    </section>
);

export default Hero;
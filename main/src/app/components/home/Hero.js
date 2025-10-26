// FILE: src/app/components/home/Hero.js
'use client';

export default function Hero({ content = {} }) {
  return (
    <section id="home" className="relative pt-24 pb-6 sm:pt-28 sm:pb-8 overflow-hidden">
      {/* Yellow dots background for hero section */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `radial-gradient(circle, rgba(245, 158, 11, 0.4) 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }}></div>
      <div className="container mx-auto px-6 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
          {content.hero?.title || "Generated $20 million in sales."}
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white mb-8 max-w-4xl mx-auto">
          {content.hero?.content || "Training sales reps to make millions a year. Getting that promotion and new high-paying clients is easy."}
        </p>
        <a
          href="#services"
          className="inline-block px-10 py-5 bg-yellow-400 text-[#0f1729] text-lg sm:text-xl font-bold rounded-xl hover:bg-yellow-300 transition-colors shadow-xl"
        >
          {content.hero_cta?.title || "FASTEST way to earn freedom NOW"}
        </a>
      </div>
    </section>
  );
}

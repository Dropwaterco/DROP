import React from 'react';
import HeroSection from '@/components/HeroSection';
import FeatureSplitSection from '@/components/FeatureSplitSection';
import VariantShowcase from '@/components/VariantShowcase';
import WhyDropSection from '@/components/WhyDropSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import MarqueeTicker from '@/components/MarqueeTicker';

export default function Home() {
  return (
    <div className="bg-[#111111] min-h-screen font-sans selection:bg-[#C9A84C] selection:text-[#111111]">
      <main className="relative z-10 bg-[#F9F9F9]">
        <HeroSection />
        <MarqueeTicker />
        <FeatureSplitSection />
        <VariantShowcase />
        <WhyDropSection />
        <WaitlistSection />
      </main>

      <Footer theme="default" />
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeadForm, { LeadFormConfig } from './ui/LeadForm';
import { PRODUCTS } from '@/lib/data/products';

gsap.registerPlugin(ScrollTrigger);

const DRINK_OPTIONS = ['Gym', 'Café', 'Home', 'Work', 'Events', 'Other'] as const;
const BUSINESS_TYPE_OPTIONS = ['Café', 'Gym', 'Hotel', 'Event', 'Retailer', 'Other'] as const;
const VOLUME_OPTIONS = ['<50 cases', '50–200 cases', '200+ cases'] as const;

// Extract unique sizes from all products
const ALL_SIZES = Array.from(
  new Set(PRODUCTS.flatMap(p => p.availableSizes || []))
).map(s => s.toUpperCase());
const SIZES_TEXT = ALL_SIZES.length > 0 ? `${ALL_SIZES.join(' & ')} CANS` : 'PREMIUM CANS';

// Individual Consumer Form Config
const consumerConfig: LeadFormConfig = {
  endpoint: '/api/v1/waitlist',
  submitText: 'Join the List',
  submitLoadingText: 'Joining...',
  successTitle: 'You\'re In',
  accentColor: '#00E599', // Mint green
  layout: 'stack',
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your name' },
    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@email.com' },
    { name: 'city', label: 'City', type: 'text', placeholder: 'Mumbai, Delhi, Bangalore...' },
    { name: 'drinkContext', label: 'Where would you drink DROP.?', type: 'select', options: DRINK_OPTIONS }
  ]
};

// B2B Wholesale Business Form Config
const businessConfig: LeadFormConfig = {
  endpoint: '/api/v1/business-enquiries',
  submitText: 'Request Wholesale Info',
  submitLoadingText: 'Sending Request...',
  successTitle: 'Enquiry Received',
  accentColor: '#38BDF8', // Mineral Blue
  layout: 'grid',
  fields: [
    { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'Acme Hospitality / Apex Gym', colSpan: 1 },
    { name: 'contactName', label: 'Contact Name', type: 'text', required: true, placeholder: 'Your full name', colSpan: 1 },
    { name: 'email', label: 'Work Email', type: 'email', required: true, placeholder: 'purchasing@business.com', colSpan: 1 },
    { name: 'phone', label: 'Phone Number', type: 'text', placeholder: '+91 98765 43210', colSpan: 1 },
    { name: 'businessType', label: 'Business Type', type: 'select', options: BUSINESS_TYPE_OPTIONS, required: true, colSpan: 2 },
    { name: 'monthlyRequirement', label: 'Estimated Monthly Volume', type: 'select', options: VOLUME_OPTIONS, colSpan: 2 }
  ]
};

export default function WaitlistSection() {
  const [activeTab, setActiveTab] = useState<'individual' | 'business'>('individual');
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const isIndividual = activeTab === 'individual';
  const activeAccent = isIndividual ? '#00E599' : '#38BDF8';

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="relative bg-[#0A0A0A] py-24 sm:py-32 md:py-40 px-6 sm:px-10 md:px-16 text-white border-t border-white/10 overflow-hidden"
    >
      {/* Subtle Background Structural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline, Trust Signals & Integrated Can Visual */}
          <div className="lg:col-span-5 flex flex-col items-start pt-2">
            
            {/* Badges & Trust Signals */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div 
                className="px-3 py-1 bg-white/5 border text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-sm transition-colors duration-300"
                style={{ borderColor: `${activeAccent}40`, color: activeAccent }}
              >
                {SIZES_TEXT}
              </div>
              <div className="text-white/40 text-[11px] font-mono tracking-widest uppercase hidden sm:block">
                • RECYCLABLE ALUMINUM
              </div>
            </div>

            {/* Headline */}
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter uppercase leading-[0.92] text-white mb-6 font-sans"
              style={{ fontFamily: 'var(--font-heading), sans-serif' }}
            >
              BE FIRST<br />TO TRY IT.
            </h2>

            <p className="text-white/60 text-sm md:text-base font-normal tracking-wide leading-relaxed max-w-md mb-8">
              Launching 2027. Early access for individuals and direct wholesale distribution for premium commercial venues.
            </p>

            {/* Product Image Integration */}
            <div className="relative w-full max-w-[260px] h-[220px] mb-8 bg-[#111111]/80 border border-white/10 rounded-sm p-4 flex items-center justify-center overflow-hidden group">
              <div 
                className="absolute inset-0 opacity-10 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: activeAccent }}
              />
              <img
                src="/assets/black_can_raw.png"
                alt="DROP canned water"
                className="h-[180px] object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-white/40 border-t border-white/10 pt-2 uppercase">
                <span>MATTE FINISH</span>
                <span>330ML / 500ML</span>
              </div>
            </div>

            {/* B2B Trust Signal Footer */}
            <div className="pt-6 border-t border-white/10 w-full text-white/40 text-xs font-mono tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeAccent }} />
              TRUSTED BY PREMIUM HOTELS, CAFÉS & STUDIOS
            </div>
          </div>

          {/* Right Column: Distinct Elevated Form Surface with Segmented Toggle */}
          <div className="lg:col-span-7 bg-[#111111] border border-white/15 p-7 sm:p-10 md:p-12 rounded-sm shadow-2xl relative">
            
            {/* ── Segmented Toggle (Dual Audience Selector) ── */}
            <div className="mb-8">
              <div className="grid grid-cols-2 bg-[#0A0A0A] p-1.5 border border-white/10 rounded-sm">
                <button
                  type="button"
                  onClick={() => setActiveTab('individual')}
                  className={`py-3 px-4 text-xs font-bold font-mono tracking-[0.15em] uppercase rounded-sm transition-all duration-200 cursor-pointer ${
                    isIndividual
                      ? 'bg-[#00E599] text-black shadow-md'
                      : 'text-white/50 hover:text-white bg-transparent'
                  }`}
                >
                  JOIN THE WAITLIST
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('business')}
                  className={`py-3 px-4 text-xs font-bold font-mono tracking-[0.15em] uppercase rounded-sm transition-all duration-200 cursor-pointer ${
                    !isIndividual
                      ? 'bg-[#38BDF8] text-black shadow-md'
                      : 'text-white/50 hover:text-white bg-transparent'
                  }`}
                >
                  ORDER FOR BUSINESS
                </button>
              </div>

              {/* Micro-copy explanation for path */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-white/40 px-1">
                <span>
                  {isIndividual 
                    ? '• For individuals — get notified at launch'
                    : '• For businesses — wholesale pricing & bulk cases'
                  }
                </span>
                <span className="uppercase text-[10px]" style={{ color: activeAccent }}>
                  {isIndividual ? 'CONSUMER ACCESS' : 'WHOLESALE ACCOUNT'}
                </span>
              </div>
            </div>

            {/* Render Form with Dynamic Active Config */}
            <LeadForm 
              key={activeTab} 
              config={isIndividual ? consumerConfig : businessConfig} 
            />

          </div>

        </div>
      </div>
    </section>
  );
}

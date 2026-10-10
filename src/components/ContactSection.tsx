'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LeadForm, { LeadFormConfig } from './ui/LeadForm';

gsap.registerPlugin(ScrollTrigger);

const BUSINESS_TYPES = ['Café', 'Gym', 'Hotel', 'Salon', 'Co-working', 'Event', 'Other'] as const;
const VOLUME_OPTIONS = ['<100 cans', '100–500', '500–1000', '1000+'] as const;

const contactConfig: LeadFormConfig = {
  endpoint: '/api/v1/business-enquiries',
  submitText: 'Request B2B Info',
  submitLoadingText: 'Sending...',
  successTitle: 'Request Received',
  buttonTheme: 'outline',
  layout: 'grid',
  selectBgColor: '#0F1112',
  fields: [
    { name: 'businessName', label: 'Business Name', type: 'text', required: true, placeholder: 'Your business name', colSpan: 2 },
    { name: 'contactName', label: 'Contact Name', type: 'text', required: true, placeholder: 'Your name' },
    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'business@email.com' },
    { name: 'phone', label: 'Phone Number', type: 'text', placeholder: '+91 XXXXX XXXXX' },
    { name: 'businessType', label: 'Business Type', type: 'select', required: true, options: BUSINESS_TYPES },
    { name: 'city', label: 'City', type: 'text', placeholder: 'Mumbai, Delhi, etc.' },
    { name: 'monthlyRequirement', label: 'Monthly Requirement', type: 'select', options: VOLUME_OPTIONS },
    { name: 'message', label: 'Message / Notes', type: 'textarea', placeholder: 'Tell us about your space...', colSpan: 2 }
  ]
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
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

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0F1112] py-12 sm:py-20 md:py-28 px-5 sm:px-8 md:px-16 overflow-hidden"
    >
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      <div ref={contentRef} className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
              fontSize: 'clamp(1.5rem, 5vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: 0,
              lineHeight: 1,
            }}
          >
            Your space deserves better than plastic. Stock DROP.
          </h2>
          <p className="text-white/50 text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto">
            Cafés, gyms, hotels, salons, co-working spaces, and events — stock DROP. for guests who notice the difference.
          </p>
        </div>

        <LeadForm config={contactConfig} />
      </div>
    </section>
  );
}

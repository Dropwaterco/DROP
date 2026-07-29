'use client';

import React from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "@/components/ui/hover-footer";

interface FooterProps {
  theme?: "default" | "olive";
}

export default function Footer({ theme = "default" }: FooterProps) {
  const isOlive = theme === "olive";
  
  const footerBg = isOlive ? "bg-[#0F1112] border-[#C9A84C]/30" : "bg-[#0F0F11] border-white/10";
  const titleText = isOlive ? "text-[#C9A84C]" : "text-white";
  const descText = isOlive ? "text-[#C9A84C]/70" : "text-gray-400";
  const bodyText = isOlive ? "text-[#C9A84C]/80" : "text-gray-300";
  const linkHover = isOlive ? "hover:text-[#C9A84C]/100 text-[#C9A84C]/85" : "hover:text-white text-gray-300";
  const iconColor = isOlive ? "#C9A84C" : "#8b5cf6"; // Purple icons for default theme!
  const borderLine = isOlive ? "border-[#C9A84C]/20" : "border-white/10";
  const socialText = isOlive ? "text-[#C9A84C]/60 hover:text-[#C9A84C]" : "text-gray-400 hover:text-white";
  const copyText = isOlive ? "text-[#C9A84C]/50" : "text-gray-500";
  const strokeMobile = isOlive ? "2px #C9A84C" : "2px white";

  const navLinks = [
    { label: "Products", href: "/#products" },
    { label: "Our Story", href: "/story" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "For Business", href: "/contact" },
  ];

  return (
    <footer className={`relative h-fit overflow-hidden border-t font-sans ${footerBg}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-14 pt-16 sm:pt-20 pb-0 z-40 relative">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 pb-12 relative z-10 mt-8">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] rounded-sm max-w-max p-1 -ml-1">
              <h2 
                className={`text-5xl font-black tracking-tighter ${titleText}`}
                style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
              >
                DROP.
              </h2>
            </Link>
            <p className={`text-sm leading-relaxed font-medium max-w-xs ${descText}`}>
              Premium hydration designed for the modern lifestyle. AS. IT. SHOULD. BE.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={`text-lg font-bold mb-6 ${titleText}`}>Navigation</h4>
            <ul className={`space-y-3 font-medium text-sm ${bodyText}`}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className={`cursor-pointer transition-colors ${linkHover} focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] rounded-sm p-1 -ml-1 inline-block`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h4 className={`text-lg font-bold mb-6 ${titleText}`}>Contact Us</h4>
            <ul className={`space-y-4 text-sm font-medium ${bodyText}`}>
              <li className="flex items-start space-x-3 p-1 -ml-1">
                <MapPin size={16} stroke={iconColor} className="shrink-0 mt-0.5" />
                <span className={descText}>
                  Vashi, Juhugaon<br />
                  Navi Mumbai 400703, India
                </span>
              </li>
              <li className="flex items-center space-x-3 min-w-0">
                <Mail size={16} stroke={iconColor} className="shrink-0" />
                <a href="mailto:contactus@dropwater.in" className={`transition-colors break-all ${linkHover} focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] rounded-sm p-1 inline-block`}>
                  contactus@dropwater.in
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} stroke={iconColor} className="shrink-0" />
                <a href="tel:+918976127355" className={`transition-colors ${linkHover} focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] rounded-sm p-1 inline-block`}>
                  +91 8976127355
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className={`border-t my-8 relative z-50 ${borderLine}`} />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-6 md:space-y-0 relative z-50 pb-16">
          {/* Social icons */}
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/dropwaterco"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`transition-colors ${socialText} focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] rounded-sm p-1`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href="https://www.facebook.com/share/19DAJZCxGM/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={`transition-colors ${socialText} focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] rounded-sm p-1`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a
              href="https://x.com/dropofficialw?s=11"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className={`transition-colors ${socialText} focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] rounded-sm p-1`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z" /><path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772" /></svg>
            </a>
          </div>

          {/* Legal links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            <Link href="/privacy" className={`text-xs font-medium transition-colors ${linkHover} focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] rounded-sm p-1`}>
              Privacy Policy
            </Link>
            <span className={`text-xs ${copyText}`}>·</span>
            <Link href="/terms" className={`text-xs font-medium transition-colors ${linkHover} focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] rounded-sm p-1`}>
              Terms of Service
            </Link>
          </div>

          {/* Copyright + India */}
          <div className="text-center md:text-right">
            <p className={`font-medium ${copyText}`}>
              &copy; {new Date().getFullYear()} Drop Water. All rights reserved.
            </p>
            <p className={`text-[10px] mt-1 font-medium tracking-wider uppercase ${copyText}`}>
              Drop Water — India — Coming Soon
            </p>
          </div>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-20 -mb-24 relative z-10 pointer-events-auto">
        <TextHoverEffect text="DROP." className="z-50" theme={theme} />
      </div>

      {/* Fallback giant text for mobile */}
      <div className="flex lg:hidden absolute bottom-[-5vh] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] overflow-hidden select-none z-0">
        <div 
          className="text-[clamp(8rem,25vw,20rem)] font-black tracking-tighter"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            WebkitTextStroke: strokeMobile,
            color: 'transparent'
          }}
        >
          DROP.
        </div>
      </div>

      <FooterBackgroundGradient theme={theme} />
    </footer>
  );
}

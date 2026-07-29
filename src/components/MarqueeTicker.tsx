import React from 'react';

export default function MarqueeTicker() {
  const text = "PURE WATER · INFINITELY RECYCLABLE · 330ML + 500ML · AS. IT. SHOULD. BE. · ";
  const repeatedText = Array(10).fill(text).join('');
  return (
    <div className="w-full border-y border-[#C9A84C]/30 bg-[#C9A84C] text-[#111111] py-4 md:py-5 overflow-hidden flex whitespace-nowrap relative">
      <div className="animate-marquee shrink-0 font-inter text-xs md:text-sm tracking-[0.24em] font-black uppercase inline-block">
        {repeatedText}
      </div>
      <div aria-hidden="true" className="animate-marquee shrink-0 font-inter text-xs md:text-sm tracking-[0.24em] font-black uppercase inline-block">
        {repeatedText}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 42s linear infinite;
        }
      `}} />
    </div>
  );
}

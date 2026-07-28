'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroNavbar from '@/components/HeroNavbar';
import Footer from '@/components/Footer';

type ThemePreset = 'obsidian' | 'horizon' | 'bento';

interface Milestone {
  year: string;
  title: string;
  desc: string;
  image?: string;
  tag?: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '2022',
    title: 'THE SPARK',
    desc: 'The realization that water shouldn\'t just be consumed—it should be experienced. A vision for a clinical, ultra-premium hydration vessel was born.',
    tag: 'Concept Phase'
  },
  {
    year: '2023',
    title: 'THE SOURCE',
    desc: 'Mapping the deepest glacial aquifers. We secured a single-source extraction point defined by its extreme alkalinity and mineral purity.',
    tag: 'Discovery'
  },
  {
    year: '2024',
    title: 'THE VESSEL',
    desc: 'Engineered for cold retention. The brushed aluminum can features a double-walled architecture and zero-waste recyclability.',
    image: '/assets/new-can-2.png',
    tag: 'Packaging Design'
  },
  {
    year: '2025',
    title: 'THE FIRST DROP',
    desc: 'Market launch across global design capitals. DROP. becomes the standard for luxury hydration in high-end galleries and concept stores.',
    tag: 'Pre-Launch'
  },
  {
    year: '2026',
    title: 'THE VALIDATION',
    desc: 'Real-world testing across hospitality, fitness and retail refined every detail ahead of the India launch.',
    tag: 'Pilot Phase'
  },
  {
    year: '2027',
    title: 'THE FUTURE',
    desc: 'Beyond hydration. Atmospheric water generation integrated into luxury architecture. The DROP. ecosystem expands into total environmental purity.',
    tag: 'Vision'
  }
];

export default function StoryClient() {
  const [preset, setPreset] = useState<ThemePreset>('obsidian');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Horizontal scroll states
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Active year observer state
  const [activeYears, setActiveYears] = useState<Record<string, boolean>>({});

  // Compile WebGL shaders
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    // Vertex Shader (shared)
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader - Obsidian Preset (Vortex Ripple)
    const fsSourceObsidian = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
        vec2 uv = v_texCoord;
        vec2 center = vec2(0.5) + (u_mouse / u_resolution - 0.5) * 0.08;
        vec2 toCenter = uv - center;
        float dist = length(toCenter);
        
        // Vortex spiraling effect
        float angle = atan(toCenter.y, toCenter.x);
        float wave = sin(dist * 20.0 - u_time * 1.5 + angle) * 0.03;
        uv += normalize(toCenter) * wave;
        
        float intensity = exp(-length(uv - center) * 2.0) * 0.7;
        
        vec3 colorA = vec3(0.0, 0.0, 0.0); // Pure Black
        vec3 colorB = vec3(0.06, 0.06, 0.07); // Deep Charcoal
        vec3 colorC = vec3(0.79, 0.64, 0.29); // Premium Gold Accent
        
        vec3 finalColor = mix(colorA, colorB, intensity);
        float rippleGlow = smoothstep(0.4, 0.0, abs(wave)) * intensity;
        finalColor += colorC * rippleGlow * 0.35;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Fragment Shader - Horizon Preset (Liquid Metal)
    const fsSourceHorizon = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;
        
        // Procedural liquid metal flow
        float n = sin(uv.x * 5.0 + u_time * 0.3) * 0.5 + sin(uv.y * 4.0 - u_time * 0.25) * 0.5;
        float n2 = sin(uv.x * 12.0 - u_time * 0.6) * 0.08 + sin(uv.y * 10.0 + u_time * 0.5) * 0.08;
        
        float intensity = n * 0.5 + 0.5 + n2;
        
        vec3 colorA = vec3(0.04, 0.05, 0.07); // Navy Void
        vec3 colorB = vec3(0.18, 0.20, 0.24); // Cold Silver Steel
        vec3 colorC = vec3(0.50, 0.60, 0.70); // Cyan Liquid Metal Highlight
        
        vec3 finalColor = mix(colorA, colorB, intensity);
        finalColor = mix(finalColor, colorC, pow(intensity, 3.5) * 0.6);
        
        float dist = distance(uv, mouse);
        float glow = exp(-dist * 8.0) * 0.12;
        finalColor += vec3(0.65, 0.75, 0.9) * glow;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Fragment Shader - Bento Preset (Clean light grid wave)
    const fsSourceBento = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;
        
        float wave = sin(uv.x * 15.0 - u_time * 0.8) * cos(uv.y * 15.0 + u_time * 0.8) * 0.5 + 0.5;
        
        vec3 colorA = vec3(0.96, 0.96, 0.97); // Clinical light grey
        vec3 colorB = vec3(0.93, 0.94, 0.95); // Ambient grid surface
        vec3 colorC = vec3(0.0, 0.48, 1.0);  // Soft oxygen blue highlight
        
        vec3 finalColor = mix(colorA, colorB, wave * 0.3);
        
        float dist = distance(uv, mouse);
        float glow = exp(-dist * 12.0) * 0.06;
        finalColor = mix(finalColor, colorC, glow);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Select fragment shader based on active preset
    let activeFsSource = fsSourceObsidian;
    if (preset === 'horizon') activeFsSource = fsSourceHorizon;
    if (preset === 'bento') activeFsSource = fsSourceBento;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, activeFsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLocation = gl.getUniformLocation(program, 'u_time');
    const uResolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const uMouseLocation = gl.getUniformLocation(program, 'u_mouse');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Handle resizing
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    const render = (time: number) => {
      if (uTimeLocation) gl.uniform1f(uTimeLocation, time * 0.001);
      if (uResolutionLocation) gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
      if (uMouseLocation) gl.uniform2f(uMouseLocation, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };
    render(0);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [preset]);

  // Handle intersection observer to reveal years and story cards in Obsidian theme
  useEffect(() => {
    if (preset !== 'obsidian') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const year = entry.target.getAttribute('data-year');
        if (year) {
          setActiveYears(prev => ({
            ...prev,
            [year]: entry.isIntersecting
          }));
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-10% 0px -10% 0px'
    });

    const groups = document.querySelectorAll('.reveal-group');
    groups.forEach(group => observer.observe(group));

    return () => observer.disconnect();
  }, [preset]);

  // Horizontal wheel scroll handler for Horizon theme
  useEffect(() => {
    if (preset !== 'horizon') return;
    const wrapper = scrollWrapperRef.current;
    if (!wrapper) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        wrapper.scrollLeft += e.deltaY;
      }
    };
    wrapper.addEventListener('wheel', handleWheel, { passive: false });
    return () => wrapper.removeEventListener('wheel', handleWheel);
  }, [preset]);

  // Horizontal drag handlers for Horizon theme
  const handleMouseDown = (e: React.MouseEvent) => {
    if (preset !== 'horizon' || !scrollWrapperRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollWrapperRef.current.offsetLeft);
    setScrollLeft(scrollWrapperRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || preset !== 'horizon' || !scrollWrapperRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollWrapperRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollWrapperRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className={`w-full relative min-h-screen font-sans antialiased overflow-hidden ${preset === 'bento' ? 'bg-[#f5f5f7] text-[#1d1d1f]' : 'bg-black text-white'}`}>
      
      {/* Floating WebGL background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-60"
        style={{ mixBlendMode: preset === 'bento' ? 'normal' : 'screen' }}
      />

      {/* HeroNavbar text switches theme style correctly */}
      <HeroNavbar activeIndex={preset === 'bento' ? 4 : 1} />

      {/* Floating Interactive Design Mode Switcher */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-black/60 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex gap-1 shadow-2xl">
        <button
          onClick={() => setPreset('obsidian')}
          className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase transition-all duration-300 ${preset === 'obsidian' ? 'bg-[#C9A84C] text-black shadow-lg font-black' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
        >
          ✦ Obsidian Core
        </button>
        <button
          onClick={() => setPreset('horizon')}
          className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase transition-all duration-300 ${preset === 'horizon' ? 'bg-[#93C5FD] text-black shadow-lg font-black' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
        >
          ✦ Liquid Horizon
        </button>
        <button
          onClick={() => setPreset('bento')}
          className={`px-4 py-2 rounded-full text-[10px] sm:text-xs font-black tracking-widest uppercase transition-all duration-300 ${preset === 'bento' ? 'bg-[#007aff] text-white shadow-lg font-black' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
        >
          ✦ Tech Bento
        </button>
      </div>

      {/* Inline styles for custom preset rendering */}
      {stylePresets(preset)}

      {/* THEME 1: OBSIDIAN CORE */}
      {preset === 'obsidian' && (
        <div className="relative z-10 w-full">
          {/* Obsidian Hero */}
          <section className="min-h-screen flex items-center justify-center text-center px-6 relative">
            <div className="space-y-6">
              <h1 
                className="text-[12vw] md:text-[8rem] font-black leading-none uppercase italic tracking-tighter text-white"
                style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
              >
                OBSIDIAN<br />
                <span className="text-[#C9A84C]">RIPPLE</span>
              </h1>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.4em] text-[#C9A84C]/80">
                The Evolution of Pure Futurism
              </p>
              <div className="pt-10 flex flex-col items-center gap-2 animate-bounce opacity-40">
                <span className="text-[10px] tracking-[0.2em] font-bold">SCROLL TO EVOLVE</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </section>

          {/* Obsidian Vertical Roadmap */}
          <main className="max-w-4xl mx-auto px-6 pb-40 relative z-10">
            <div className="space-y-[25vh]">
              {MILESTONES.map((m, idx) => {
                const isEven = idx % 2 === 0;
                const isActive = activeYears[m.year];
                return (
                  <div 
                    key={m.year} 
                    data-year={m.year}
                    className="reveal-group flex flex-col items-start md:items-center relative"
                  >
                    <div className="w-full flex flex-col md:flex-row items-start md:items-center">
                      
                      {/* Left year display */}
                      <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right md:pr-12' : 'md:order-2 md:text-left md:pl-12'} mb-4 md:mb-0`}>
                        <span 
                          className={`year-outline font-black text-6xl md:text-[8rem] leading-none transition-all duration-1000 ${isActive ? 'active' : ''}`}
                          style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
                        >
                          {m.year}
                        </span>
                      </div>

                      {/* Right timeline node divider (desktop only) */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20">
                        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-700 ${isActive ? 'bg-[#C9A84C] border-[#C9A84C] scale-150 shadow-[0_0_15px_#C9A84C]' : 'bg-black border-white/20'}`} />
                      </div>

                      {/* Text card */}
                      <div className={`w-full md:w-1/2 ${isEven ? 'md:order-2 md:pl-12' : 'md:text-right md:pr-12'}`}>
                        <div className={`story-card border-l-2 md:border-l-0 ${isEven ? 'md:border-l-2 md:border-r-0' : 'md:border-r-2 md:border-l-0'} border-[#C9A84C] pl-6 md:pl-0 md:px-8 py-4 transition-all duration-700 ${isActive ? 'active' : 'opacity-30 translate-x-4'}`}>
                          <span className="text-[10px] tracking-[0.2em] font-bold text-[#C9A84C] uppercase block mb-1">
                            {m.tag}
                          </span>
                          <h3 
                            className="text-2xl font-bold tracking-tight mb-3 uppercase text-white"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {m.title}
                          </h3>
                          <p className="text-white/60 text-sm md:text-base leading-relaxed font-medium">
                            {m.desc}
                          </p>

                          {m.image && (
                            <div className="mt-4 relative w-32 h-32 md:ml-auto select-none opacity-40 hover:opacity-100 transition-opacity duration-500">
                              <Image 
                                src={m.image} 
                                alt={m.title} 
                                fill 
                                className="object-contain filter grayscale brightness-125"
                                sizes="128px"
                              />
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Obsidian Join CTA */}
            <div className="mt-40 text-center space-y-6">
              <h3 
                className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight"
                style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
              >
                Join the Journey
              </h3>
              <p className="text-[#F9F9F9]/50 text-sm max-w-sm mx-auto">
                Step into the future of premium hydration. Secure your early drop allocations.
              </p>
              <div className="pt-4">
                <Link 
                  href="/#waitlist"
                  className="inline-flex bg-[#C9A84C] hover:bg-white text-black font-bold text-xs tracking-widest uppercase px-10 py-5 rounded-none transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Join The Roadmap
                </Link>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* THEME 2: LIQUID HORIZON */}
      {preset === 'horizon' && (
        <div className="relative z-10 h-screen w-full flex flex-col justify-between">
          <div className="fixed top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 pointer-events-none" />

          <main 
            ref={scrollWrapperRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            className="h-full overflow-x-auto overflow-y-hidden no-scrollbar cursor-grab active:cursor-grabbing relative flex items-center"
          >
            <div className="flex items-center pl-[10vw] pr-[20vw] h-full w-max">
              
              {/* Intro panel */}
              <section className="w-[85vw] md:w-[450px] mr-[10vw] flex-shrink-0 flex flex-col justify-center select-none">
                <div className="space-y-4">
                  <h1 
                    className="text-5xl md:text-[6rem] font-black leading-none text-white tracking-tighter uppercase"
                    style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
                  >
                    LIQUID<br />
                    HORIZON
                  </h1>
                  <p className="text-xs font-bold tracking-[0.3em] text-[#93C5FD] uppercase">
                    Horizontal Evolution Track
                  </p>
                  <div className="pt-12 flex items-center gap-3 opacity-30 animate-pulse">
                    <span className="text-[10px] tracking-[0.2em] font-bold">DRAG OR SCROLL RIGHT</span>
                    <svg className="w-4 h-4 rotate-[-90deg]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>
              </section>

              {/* Milestones Horizontal Loop */}
              {MILESTONES.map((m, idx) => (
                <div 
                  key={m.year} 
                  className="w-[85vw] md:w-[450px] mr-[15vw] flex-shrink-0 relative group"
                >
                  {/* Timeline node */}
                  <div className="absolute top-[50%] left-0 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#93C5FD] shadow-[0_0_15px_#93C5FD] z-20 group-hover:scale-125 transition-transform" />

                  {/* Frosted Glass card */}
                  <div className="glass-card rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-8 md:p-10 flex flex-col justify-between h-[360px] hover:border-white/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div>
                      <span 
                        className="font-black text-6xl text-white/5 block leading-none mb-4 group-hover:text-white/10 transition-colors"
                        style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
                      >
                        {m.year}
                      </span>
                      <span className="text-[10px] tracking-[0.2em] font-bold text-[#93C5FD] uppercase block mb-1">
                        {m.tag}
                      </span>
                      <h3 className="text-xl font-bold tracking-tight uppercase text-white mb-3">
                        {m.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed font-medium">
                        {m.desc}
                      </p>
                    </div>

                    {m.image && (
                      <div className="relative w-full h-16 opacity-30 group-hover:opacity-60 transition-opacity">
                        <Image 
                          src={m.image} 
                          alt={m.title} 
                          fill 
                          className="object-contain filter grayscale brightness-125"
                          sizes="300px"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* End Card */}
              <section className="w-[80vw] md:w-[400px] flex-shrink-0 flex flex-col justify-center p-8 select-none">
                <div className="space-y-6">
                  <h3 
                    className="text-4xl font-black uppercase text-white tracking-tight"
                    style={{ fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif' }}
                  >
                    The Future
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed font-medium">
                    Be a part of our next milestone. Join the DROP roadmap waitlist today.
                  </p>
                  <Link 
                    href="/#waitlist"
                    className="inline-flex bg-[#93C5FD] hover:bg-white text-black font-bold text-xs tracking-widest uppercase px-8 py-4 w-max transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Join Launch List
                  </Link>
                </div>
              </section>

            </div>
          </main>
        </div>
      )}

      {/* THEME 3: TECH BENTO */}
      {preset === 'bento' && (
        <div className="relative z-10 w-full min-h-screen">
          <main className="max-w-7xl mx-auto px-6 md:px-16 pt-32 pb-32">
            
            {/* Header intro */}
            <div className="mb-16">
              <h1 className="text-[12vw] md:text-[5.5rem] font-black tracking-tighter leading-none mb-4 text-[#1d1d1f] uppercase">
                EVOLUTION.
              </h1>
              <p className="text-[#86868b] max-w-lg text-lg font-medium leading-relaxed">
                The clinical progression of pure hydration, structured in an architectural bento landscape.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-6 auto-rows-[160px] md:auto-rows-[180px]">
              
              {/* Box 1: Giant bottle image card */}
              <div className="col-span-2 md:col-span-4 lg:col-span-6 row-span-3 bento-card bg-white rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden group shadow-sm border border-black/5 hover:border-[#007aff]/30">
                <div className="relative w-full h-4/5 select-none">
                  <Image 
                    src="/assets/new-can-2.png" 
                    alt="Can Spec" 
                    fill 
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700" 
                    sizes="400px"
                  />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#007aff] uppercase">Design Spec</span>
                    <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f]">PURE MATTE ALUMINUM</h3>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#007aff] font-bold">→</span>
                </div>
              </div>

              {/* Milestone 1: 2022 */}
              <div className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 bento-card bg-white rounded-[2rem] p-8 flex flex-col justify-between shadow-sm border border-black/5 hover:border-[#007aff]/30">
                <div>
                  <span className="text-[#007aff] font-black text-4xl opacity-20 block">2022</span>
                  <h4 className="text-lg font-bold text-[#1d1d1f] mt-1">THE SPARK</h4>
                </div>
                <p className="text-[#86868b] text-sm leading-relaxed font-medium">
                  The realization that water shouldn\'t just be consumed—it should be experienced. A clinical hydration vessel concept.
                </p>
              </div>

              {/* Specs card */}
              <div className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 bento-card bg-gradient-to-br from-[#1C1F22] to-[#0A0C0D] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-sm border border-white/5 hover:border-[#007aff]/30">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#007aff] uppercase">Material study</span>
                  <div className="w-8 h-1 bg-[#007aff] mt-2" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white/50 tracking-wider">RECYCLABILITY</p>
                  <p className="text-base font-bold">100% INFINITE</p>
                </div>
              </div>

              {/* Milestone 2: 2023 */}
              <div className="col-span-2 md:col-span-2 lg:col-span-4 row-span-2 bento-card bg-white rounded-[2rem] p-8 flex flex-col justify-between shadow-sm border border-black/5 hover:border-[#007aff]/30">
                <div>
                  <span className="text-[#007aff] font-black text-4xl opacity-20 block">2023</span>
                  <h4 className="text-lg font-bold text-[#1d1d1f] mt-1">THE SOURCE</h4>
                </div>
                <p className="text-[#86868b] text-sm leading-relaxed font-medium">
                  Securing a single-source glacial aquifer defined by extreme alkalinity and raw mineral purity.
                </p>
              </div>

              {/* Milestone 3: 2024 */}
              <div className="col-span-2 md:col-span-4 lg:col-span-5 row-span-2 bento-card bg-white rounded-[2rem] p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm border border-black/5 hover:border-[#007aff]/30">
                <div className="flex-1">
                  <span className="text-[#007aff] font-black text-4xl opacity-20 block">2024</span>
                  <h4 className="text-lg font-bold text-[#1d1d1f] mt-1">THE VESSEL</h4>
                  <p className="text-[#86868b] text-sm leading-relaxed font-medium mt-2">
                    Double-walled structure engineered for ultimate cold retention and zero-waste recyclability.
                  </p>
                </div>
                <div className="w-16 h-16 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#007aff] flex-shrink-0">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Milestone 4: 2025 */}
              <div className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 bento-card bg-white rounded-[2rem] p-8 flex flex-col justify-between shadow-sm border border-black/5 hover:border-[#007aff]/30">
                <div>
                  <span className="text-[#007aff] font-black text-4xl opacity-20 block">2025</span>
                  <h4 className="text-lg font-bold text-[#1d1d1f] mt-1">THE FIRST DROP</h4>
                </div>
                <p className="text-[#86868b] text-sm leading-relaxed font-medium">
                  Market launch across global design capitals. DROP. becomes the gallery standard.
                </p>
              </div>

              {/* Milestone 5: 2026 */}
              <div className="col-span-2 md:col-span-2 lg:col-span-3 row-span-2 bento-card bg-white rounded-[2rem] p-8 flex flex-col justify-between shadow-sm border border-black/5 hover:border-[#007aff]/30">
                <div>
                  <span className="text-[#007aff] font-black text-4xl opacity-20 block">2026</span>
                  <h4 className="text-lg font-bold text-[#1d1d1f] mt-1">THE VALIDATION</h4>
                </div>
                <p className="text-[#86868b] text-sm leading-relaxed font-medium">
                  Hospitality, fitness and retail pilots refined DROP. ahead of the India launch.
                </p>
              </div>

              {/* Milestone 6: 2027 */}
              <div className="col-span-2 md:col-span-4 lg:col-span-8 row-span-2 bento-card bg-[#007aff] text-white rounded-[2rem] p-8 flex flex-col justify-between shadow-md border-none group hover:bg-[#006bd6]">
                <div>
                  <span className="text-white/40 font-black text-4xl block">2027</span>
                  <h4 className="text-2xl font-bold text-white mt-1 italic tracking-tight">THE FUTURE</h4>
                  <p className="text-white/80 text-sm leading-relaxed font-medium mt-2 max-w-lg">
                    Atmospheric water generation integrated into luxury architecture. The DROP ecosystem expands.
                  </p>
                </div>
                <button className="bg-white text-[#007aff] font-bold text-[10px] tracking-widest uppercase px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform w-max">
                  Join The Roadmap
                </button>
              </div>

              {/* Social/Link card */}
              <div className="col-span-2 md:col-span-2 lg:col-span-4 row-span-2 bento-card bg-white rounded-[2rem] p-8 flex flex-col justify-between shadow-sm border border-black/5 hover:border-[#007aff]/30">
                <div className="text-xl font-black text-[#1d1d1f]">DROP.</div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#86868b] mb-3">Connect</p>
                  <div className="flex gap-3 text-[#007aff]">
                    <a href="mailto:contactus@dropwater.in" className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center font-bold">@</a>
                    <a href="https://www.instagram.com/dropwaterco" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center font-bold">IG</a>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      )}

      {/* Global Story Page Footer */}
      <div className={preset === 'bento' ? 'bg-[#f5f5f7]' : 'bg-black'}>
        <Footer theme={preset === 'bento' ? 'olive' : 'default'} />
      </div>

    </div>
  );
}

function stylePresets(preset: ThemePreset) {
  return (
    <style dangerouslySetInnerHTML={{__html: `
      /* Common WebGL background animations */
      @keyframes pulse-light-glow {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.05); }
      }
      
      /* Year outline fill transition in Obsidian core */
      .year-outline {
        color: transparent;
        -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.15);
        transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .year-outline.active {
        color: #C9A84C;
        -webkit-text-stroke: 1.5px #C9A84C;
        text-shadow: 0 0 40px rgba(201, 168, 76, 0.35);
      }

      /* Story text card transition in Obsidian core */
      .story-card {
        opacity: 0.1;
        transform: translateY(30px);
        transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .story-card.active {
        opacity: 1;
        transform: translateY(0);
      }

      /* Liquid Horizon layouts */
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      /* Bento layout hover card styling */
      .bento-card {
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .bento-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.08);
      }
    `}} />
  );
}

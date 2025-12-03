import React, { useState, useEffect, useRef } from 'react';
import { SparklesIcon } from '../components/icons/SparklesIcon.tsx';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon.tsx';
import { GeoLogo } from '../components/logo.tsx';
import { UserIcon } from '../components/icons/UserIcon.tsx';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

// Feature Data
const FEATURES = [
  {
    id: 'apparel',
    title: "Apparel Studio",
    desc: "Neural Style Transfer",
    // Fashion/Suit image
    image: "https://images.unsplash.com/photo-1593030761757-71bd90d22559?q=80&w=1974&auto=format&fit=crop", 
    color: "from-amber-400 to-orange-500",
    page: 'home'
  },
  {
    id: 'vehicle',
    title: "Automotive Works",
    desc: "Geometry Engine",
    // Car image
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop", 
    color: "from-blue-400 to-cyan-500",
    page: 'vehicle'
  },
  {
    id: 'session',
    title: "Studio Sessions",
    desc: "Virtual Compositing",
    // Couple/Studio image
    image: "https://images.unsplash.com/photo-1621784562877-e95e34770ce9?q=80&w=1974&auto=format&fit=crop",
    color: "from-purple-400 to-pink-500",
    page: 'session'
  },
  {
    id: 'campaign',
    title: "Campaign Bureau",
    desc: "Political Branding",
    // Poster/Design image
    image: "https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?q=80&w=2076&auto=format&fit=crop",
    color: "from-red-500 to-rose-500",
    page: 'campaign'
  },
  {
    id: 'cinema',
    title: "Veo Cinema",
    desc: "Motion Synthesis",
    // Cinematic/Video vibe
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop",
    color: "from-emerald-400 to-teal-500",
    page: 'animate'
  }
];

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const touchStartX = useRef<number>(0);

  // Auto-rotate
  useEffect(() => {
      const interval = setInterval(() => {
          setCurrIndex((prev) => (prev + 1) % FEATURES.length);
      }, 3500);
      return () => clearInterval(interval);
  }, []);

  const handleNext = () => setCurrIndex((prev) => (prev + 1) % FEATURES.length);
  const handlePrev = () => setCurrIndex((prev) => (prev - 1 + FEATURES.length) % FEATURES.length);

  // CSS 3D Transform Logic
  const getSlideStyle = (index: number) => {
      const total = FEATURES.length;
      let diff = (index - currIndex + total) % total;
      if (diff > total / 2) diff -= total;
      
      const isActive = diff === 0;
      const xTranslate = diff * 110; // Spacing
      const zTranslate = isActive ? 0 : -400 - (Math.abs(diff) * 150); // Depth
      const rotateY = diff * -25; // Rotation
      const opacity = isActive ? 1 : 0.6 - (Math.abs(diff) * 0.15);
      
      return {
          transform: `perspective(1000px) translateX(${xTranslate}%) translateZ(${zTranslate}px) rotateY(${rotateY}deg)`,
          zIndex: total - Math.abs(diff),
          opacity: Math.max(opacity, 0),
          filter: isActive ? 'none' : 'grayscale(100%) brightness(30%)',
          pointerEvents: isActive ? 'auto' : 'none'
      } as React.CSSProperties;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden relative font-sans selection:bg-amber-500/30 flex flex-col">
        
        {/* Background Ambient Light */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>

        {/* Header/Nav */}
        <nav className="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-center max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2">
                <GeoLogo />
            </div>
            <div className="flex gap-4">
                <button 
                    onClick={() => onNavigate('login')} 
                    className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors hidden sm:block"
                >
                    Sign In
                </button>
                <button 
                    onClick={() => onNavigate('signup')} 
                    className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                    Get Started
                </button>
            </div>
        </nav>

        {/* Main Stage */}
        <div className="flex-grow flex flex-col items-center justify-center relative z-10 pt-20 pb-32">
            
            {/* Hero Text */}
            <div className="text-center mb-16 relative z-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                    <SparklesIcon className="w-3 h-3 text-amber-400" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-300">Next-Gen Neural Engine</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-bold font-playfair tracking-tighter mb-4 leading-[0.9] text-white">
                    Design <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200">Without Limits</span>
                </h1>
                <p className="text-zinc-400 text-sm md:text-lg max-w-lg mx-auto font-light leading-relaxed mt-6">
                    The world's most advanced AI studio for Apparel, Automotive, and Cinematic visualization.
                </p>
            </div>

            {/* 3D Carousel */}
            <div className="relative w-full max-w-5xl h-[450px] flex items-center justify-center">
                {FEATURES.map((feature, index) => (
                    <div
                        key={feature.id}
                        className="absolute w-[280px] md:w-[320px] aspect-[3/4] rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group"
                        style={getSlideStyle(index)}
                        onClick={() => {
                            if (index === currIndex) onNavigate(feature.page);
                            else setCurrIndex(index);
                        }}
                    >
                        <div className="absolute inset-0 rounded-2xl overflow-hidden">
                            <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                        </div>
                        
                        <div className="absolute bottom-0 left-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 text-transparent bg-clip-text bg-gradient-to-r ${feature.color}`}>
                                {feature.desc}
                            </p>
                            <h3 className="text-2xl font-bold font-playfair text-white mb-4">{feature.title}</h3>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Launch Module <ArrowRightIcon className="w-3 h-3" />
                            </div>
                        </div>

                        {/* Reflections/Gloss */}
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
                    </div>
                ))}
            </div>

            {/* Nav Indicators */}
            <div className="flex gap-2 mt-8">
                {FEATURES.map((_, idx) => (
                    <button 
                        key={idx}
                        onClick={() => setCurrIndex(idx)}
                        className={`w-12 h-1 rounded-full transition-all duration-300 ${currIndex === idx ? 'bg-amber-500' : 'bg-zinc-800 hover:bg-zinc-700'}`}
                    />
                ))}
            </div>

        </div>

        {/* Dynamic Island Footer */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[90%]">
            <div className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-full p-2 pl-6 pr-2 shadow-2xl flex items-center gap-6 animate-fade-in">
                
                <div className="flex items-center gap-6 hidden sm:flex">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">
                        © 2025 Geo Studio
                    </span>
                    <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
                    <button onClick={() => onNavigate('about')} className="text-[10px] font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap uppercase tracking-wider">
                        About
                    </button>
                    <button className="text-[10px] font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap uppercase tracking-wider">
                        Privacy
                    </button>
                    <button className="text-[10px] font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap uppercase tracking-wider">
                        Terms
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block"></div>
                    <button 
                        onClick={() => onNavigate('signup')}
                        className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-amber-400 hover:scale-105 transition-all shadow-lg whitespace-nowrap"
                    >
                        <UserIcon className="w-3 h-3" />
                        Join Now
                    </button>
                </div>
            </div>
        </div>

    </div>
  );
};

export default LandingPage;
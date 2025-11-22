
import React from 'react';
import { SparklesIcon } from '../components/icons/SparklesIcon.tsx';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon.tsx';
import { GeoLogo } from '../components/logo.tsx';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const FeatureCard = ({ title, description, icon, delay }: { title: string, description: string, icon: React.ReactNode, delay: string }) => (
    <div className="group relative p-8 rounded-xl bg-white/40 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-lg dark:shadow-none" style={{ animationDelay: delay }}>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/60 dark:bg-white/5 border border-zinc-200 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 text-amber-500 dark:text-amber-400 shadow-sm dark:shadow-none">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 font-playfair">{title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{description}</p>
        </div>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen overflow-y-auto custom-scrollbar bg-zinc-50 dark:bg-zinc-950 relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-white/5 border border-zinc-200 dark:border-white/10 backdrop-blur-md mb-4 shadow-sm dark:shadow-none">
                    <SparklesIcon className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">The Next Gen Design Engine</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-zinc-900 dark:text-white font-playfair tracking-tighter leading-none">
                    Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-400 dark:from-amber-400 dark:to-yellow-200">Reality</span>
                </h1>
                
                <p className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                    Experience the world's most advanced AI customization studio. 
                    From bespoke fashion to automotive engineering, visualize your imagination instantly.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <button 
                        onClick={() => onNavigate('home')}
                        className="group relative px-8 py-4 bg-amber-500 text-black font-bold text-sm uppercase tracking-[0.2em] rounded-sm overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Launch Studio <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                    
                    <button 
                        onClick={() => onNavigate('gallery')}
                        className="px-8 py-4 bg-transparent border border-zinc-300 dark:border-white/20 text-zinc-700 dark:text-white font-bold text-sm uppercase tracking-[0.2em] rounded-sm hover:bg-zinc-100 dark:hover:bg-white/5 hover:border-zinc-400 dark:hover:border-white transition-all"
                    >
                        View Gallery
                    </button>
                </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <div className="w-6 h-10 rounded-full border-2 border-zinc-400 dark:border-zinc-600 flex items-start justify-center p-1">
                    <div className="w-1 h-2 bg-amber-500 rounded-full"></div>
                </div>
            </div>
        </section>

        {/* Modules Section */}
        <section className="relative py-32 px-4 border-t border-zinc-200 dark:border-white/5 bg-zinc-100/50 dark:bg-black/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white font-playfair mb-4">The Suite</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">Four powerful engines. Infinite possibilities.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard 
                        title="Apparel"
                        description="Bespoke tailoring for men, women, and children. Visualize suits, gowns, and streetwear with identity-locking precision."
                        delay="0ms"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>}
                    />
                    <FeatureCard 
                        title="Automotive"
                        description="Complete vehicle transformations. Apply vinyl wraps, body kits, rims, and performance mods while keeping the plate legible."
                        delay="100ms"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>}
                    />
                    <FeatureCard 
                        title="Campaign"
                        description="Political and brand identity tools. Generate posters, vehicle branding, and marketing materials instantly."
                        delay="200ms"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.43.872 1.138.914 1.836l.073 1.243a1.852 1.852 0 0 1-.914 1.836M8.25 21h-6" /></svg>}
                    />
                    <FeatureCard 
                        title="Cinema"
                        description="Create movie posters and animate still images into cinematic video clips using Veo technology."
                        delay="300ms"
                        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" /></svg>}
                    />
                </div>
            </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 px-4 border-t border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 text-center transition-colors">
             <div className="flex justify-center mb-8">
                 <GeoLogo className="scale-75" />
             </div>
             <div className="flex justify-center gap-8 mb-8 text-xs font-bold uppercase tracking-widest text-zinc-500">
                 <button onClick={() => onNavigate('home')} className="hover:text-zinc-900 dark:hover:text-white transition-colors">Studio</button>
                 <button onClick={() => onNavigate('gallery')} className="hover:text-zinc-900 dark:hover:text-white transition-colors">Gallery</button>
                 <button onClick={() => onNavigate('about')} className="hover:text-zinc-900 dark:hover:text-white transition-colors">About</button>
             </div>
             <p className="text-[10px] text-zinc-600 dark:text-zinc-700 uppercase tracking-widest">© 2024 Geo Studio AI. Powered by Google Gemini.</p>
        </footer>
    </div>
  );
};

export default LandingPage;

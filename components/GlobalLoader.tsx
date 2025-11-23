
import React from 'react';
import { GeoLogo } from './logo.tsx';

const GlobalLoader: React.FC = () => (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md transition-opacity duration-300 animate-fade-in cursor-wait">
        <div className="relative flex flex-col items-center">
            <div className="animate-pulse mb-6 scale-125 opacity-90">
                <GeoLogo />
            </div>
            <div className="w-24 h-[2px] bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 animate-progress"></div>
            </div>
            <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400 animate-pulse">Initializing</p>
        </div>
    </div>
);

export default GlobalLoader;


import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon } from './icons/MenuIcon.tsx';
import { CloseIcon } from './icons/CloseIcon.tsx';
import { GeoLogo } from './logo.tsx';
import ThemeToggle from './ThemeToggle.tsx';

interface HeaderProps {
    onNavigate: (page: string) => void;
}

const MENU_ITEMS = [
    { id: 'landing', label: 'Home' },
    { id: 'home', label: 'Studio' },
    { id: 'session', label: 'Session' },
    { id: 'campaign', label: 'Campaign' },
    { id: 'poster', label: 'Poster' },
    { id: 'animate', label: 'Cinema' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'about', label: 'About' }
];

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    
    const touchStartY = useRef<number>(0);
    const currentRotation = useRef<number>(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const step = 360 / MENU_ITEMS.length;
        let normalizedRot = Math.abs(rotation) % 360;
        if (rotation > 0) normalizedRot = 360 - normalizedRot;
        
        const index = Math.round((rotation * -1) / step) % MENU_ITEMS.length;
        const safeIndex = index < 0 ? MENU_ITEMS.length + index : index;
        setActiveItemIndex(safeIndex);
    }, [rotation]);

    const handleNavClick = (page: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        onNavigate(page);
        setIsMenuOpen(false);
    };

    // --- Rotary Interaction Logic ---
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        currentRotation.current = rotation;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const deltaY = e.touches[0].clientY - touchStartY.current;
        
        // Add threshold to distinguish clicks from drags (prevents jitter)
        if (Math.abs(deltaY) < 10) return;

        const newRotation = currentRotation.current + (deltaY * 0.8);
        setRotation(newRotation);
        
        const step = 360 / MENU_ITEMS.length;
        if (Math.floor(newRotation / step) !== Math.floor(rotation / step)) {
             if (navigator.vibrate) navigator.vibrate(5);
        }
    };
    
    const handleWheel = (e: React.WheelEvent) => {
        const newRotation = rotation - (e.deltaY * 0.2);
        setRotation(newRotation);
    };

    const NavLink = ({ page, label }: { page: string; label: string }) => (
        <button 
            onClick={() => handleNavClick(page)} 
            className="relative px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-300 uppercase group"
        >
            <span className="relative z-10">{label}</span>
            <span className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-sm scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out -z-10"></span>
            <span className="absolute bottom-1.5 left-4 right-4 h-[1px] bg-amber-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
        </button>
    );

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-6 md:px-8 transition-all duration-500 ${isScrolled ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-white/5 shadow-sm' : 'bg-transparent'}`}>
                <div onClick={() => handleNavClick('landing')} className="cursor-pointer flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity group z-50">
                    <div className="group-hover:scale-110 transition-transform duration-500">
                        <GeoLogo className="scale-90 origin-left" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-2 bg-white/50 dark:bg-zinc-900/50 p-1 rounded-full border border-zinc-200 dark:border-white/5 backdrop-blur-md z-50 shadow-sm dark:shadow-lg">
                        <NavLink page="home" label="Studio" />
                        <NavLink page="session" label="Session" />
                        <NavLink page="campaign" label="Campaign" />
                        <NavLink page="poster" label="Poster" />
                        <NavLink page="animate" label="Cinema" />
                        <NavLink page="gallery" label="Gallery" />
                        <NavLink page="quiz" label="Quiz" />
                    </nav>

                    {/* Theme Toggle */}
                    <div className="z-50 hidden md:block">
                        <ThemeToggle />
                    </div>

                    {/* Mobile Toggle */}
                    <div className="lg:hidden z-50 flex items-center gap-2">
                        <div className="md:hidden">
                            <ThemeToggle />
                        </div>
                        <button 
                            onClick={() => {
                                setIsMenuOpen(true);
                                setRotation(0);
                            }} 
                            className="text-zinc-600 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors p-2 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-full border border-zinc-200 dark:border-white/5 shadow-sm"
                        >
                            <MenuIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Rotary Menu Overlay */}
            <div className={`fixed inset-0 z-[100] bg-zinc-100 dark:bg-zinc-950 flex flex-col justify-center items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                
                <button 
                    onClick={() => setIsMenuOpen(false)} 
                    className="absolute top-6 right-6 p-4 text-zinc-500 hover:text-black dark:hover:text-white z-50"
                >
                    <CloseIcon className="w-8 h-8" />
                </button>

                {/* Title / Logo Area */}
                <div className="absolute top-12 left-0 right-0 text-center z-10 pointer-events-none">
                    <GeoLogo className="justify-center scale-75 mb-2" />
                    <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">System Navigation</p>
                </div>

                {/* The Rotary Dial Container */}
                <div 
                    className="relative w-full h-full flex items-center justify-end pr-4 md:pr-20 cursor-grab active:cursor-grabbing touch-none"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onWheel={handleWheel}
                >
                    {/* Background Rings */}
                    <div className="absolute right-[-30vh] h-[80vh] w-[80vh] rounded-full border border-zinc-300 dark:border-zinc-800/50 pointer-events-none"></div>
                    <div className="absolute right-[-35vh] h-[90vh] w-[90vh] rounded-full border border-zinc-200 dark:border-zinc-800/30 pointer-events-none"></div>
                    
                    {/* Active Indicator */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-32 h-16 border-r-4 border-amber-500 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none z-0"></div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)] z-20"></div>

                    {/* Rotating Items Container */}
                    <div 
                        className="relative z-30 h-[60vh] w-[60vh] right-[-30vh] rounded-full transition-transform duration-75 ease-linear will-change-transform"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    >
                        {MENU_ITEMS.map((item, index) => {
                            const angleStep = 360 / MENU_ITEMS.length;
                            const itemAngle = index * angleStep;
                            const isActive = index === activeItemIndex;
                            
                            return (
                                <div
                                    key={item.id}
                                    className="absolute top-1/2 left-1/2 w-48 h-10 -mt-5 -ml-24 flex items-center justify-end pr-16 origin-center will-change-transform"
                                    style={{ 
                                        transform: `rotate(${itemAngle}deg) translate(-30vh) rotate(-${itemAngle}deg) rotate(${-rotation}deg)`
                                    }}
                                >
                                    <button
                                        onClick={(e) => handleNavClick(item.id, e)}
                                        className={`text-right transition-all duration-300 ${isActive ? 'scale-150' : 'scale-100 opacity-40'} pointer-events-auto`}
                                    >
                                        <span className={`block text-3xl font-playfair font-bold ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <span className="block text-[8px] uppercase tracking-[0.3em] text-amber-500 mt-1 animate-fade-in">
                                                Enter Module
                                            </span>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
                    <p className="text-zinc-500 text-[10px] animate-pulse">SCROLL KNOB TO SELECT</p>
                </div>
            </div>
        </>
    );
};

export default Header;

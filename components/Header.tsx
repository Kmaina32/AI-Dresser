
import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon } from './icons/MenuIcon.tsx';
import { CloseIcon } from './icons/CloseIcon.tsx';
import { GeoLogo } from './logo.tsx';
import ThemeToggle from './ThemeToggle.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { UserIcon } from './icons/UserIcon.tsx';

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
    { id: 'about', label: 'About' },
    { id: 'profile', label: 'Account' }
];

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const { user } = useAuth();
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

    const handleNavClick = (page: string) => {
        onNavigate(page);
        setIsMenuOpen(false);
    };

    const handleUserClick = () => {
        if (user) {
            onNavigate('profile');
        } else {
            onNavigate('login');
        }
    };

    // --- Rotary Interaction Logic ---
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        currentRotation.current = rotation;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const deltaY = e.touches[0].clientY - touchStartY.current;
        // Increased sensitivity for better mobile feel (0.8 -> 1.2)
        const newRotation = currentRotation.current + (deltaY * 1.2);
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

                    {/* User Account Button */}
                    <button 
                        onClick={handleUserClick}
                        className={`relative z-50 p-1 rounded-full border transition-all duration-300 flex items-center gap-2 pr-3 ${user ? 'bg-amber-500/10 border-amber-500/50 text-amber-600 dark:text-amber-400 pl-1' : 'bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white pl-2'}`}
                        title={user ? 'My Account' : 'Sign In'}
                    >
                        {user ? (
                            <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover border border-amber-500/30" />
                        ) : (
                            <UserIcon className="w-5 h-5" />
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">
                            {user ? user.name.split(' ')[0] : 'Login'}
                        </span>
                    </button>

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
                {/* Adjusted positioning for mobile ergonomics */}
                <div 
                    className="relative w-full h-full flex items-center justify-end pr-0 md:pr-20 cursor-grab active:cursor-grabbing touch-none"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onWheel={handleWheel}
                    style={{ touchAction: 'none' }}
                >
                    {/* Background Rings - Positioned slightly more off-screen on mobile for thumb reach */}
                    <div className="absolute right-[-40vh] md:right-[-30vh] h-[80vh] w-[80vh] rounded-full border border-zinc-300 dark:border-zinc-800/50 pointer-events-none opacity-50"></div>
                    <div className="absolute right-[-45vh] md:right-[-35vh] h-[90vh] w-[90vh] rounded-full border border-zinc-200 dark:border-zinc-800/30 pointer-events-none opacity-30"></div>
                    
                    {/* Active Indicator */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 md:w-48 h-24 border-r-4 border-amber-500 bg-gradient-to-l from-amber-500/10 to-transparent pointer-events-none z-0"></div>
                    
                    {/* Rotating Items Container */}
                    <div 
                        className="relative h-[60vh] w-[60vh] right-[-40vh] md:right-[-30vh] rounded-full transition-transform duration-75 ease-linear will-change-transform"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    >
                        {MENU_ITEMS.map((item, index) => {
                            const angleStep = 360 / MENU_ITEMS.length;
                            const itemAngle = index * angleStep;
                            const isActive = index === activeItemIndex;
                            
                            return (
                                <div
                                    key={item.id}
                                    className="absolute top-1/2 left-1/2 w-64 h-12 -mt-6 -ml-32 flex items-center justify-end pr-20 origin-center will-change-transform"
                                    style={{ 
                                        transform: `rotate(${itemAngle}deg) translate(-32vh) rotate(-${itemAngle}deg) rotate(${-rotation}deg)`
                                    }}
                                >
                                    <button
                                        onClick={() => handleNavClick(item.id)}
                                        className={`text-right transition-all duration-300 ${isActive ? 'scale-125 md:scale-150 opacity-100' : 'scale-90 opacity-30'}`}
                                    >
                                        <span className={`block text-2xl md:text-3xl font-playfair font-bold ${isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'}`}>
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <span className="block text-[8px] uppercase tracking-[0.3em] text-amber-500 mt-1 animate-fade-in">
                                                {item.id === 'profile' ? (user ? 'Manage' : 'Sign In') : 'Enter Module'}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="absolute bottom-12 left-0 right-0 text-center pointer-events-none px-6">
                    <div className="h-1 w-12 bg-zinc-300 dark:bg-zinc-800 mx-auto rounded-full mb-2"></div>
                    <p className="text-zinc-500 text-[10px] animate-pulse uppercase tracking-widest">Scroll Dial to Navigate</p>
                </div>
            </div>
        </>
    );
};

export default Header;

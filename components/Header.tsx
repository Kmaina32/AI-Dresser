
import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open to prevent interacting with background elements
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    const handleNavClick = (page: string) => {
        onNavigate(page);
        setIsMenuOpen(false);
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
                        {MENU_ITEMS.filter(item => item.id !== 'landing').map(item => (
                             <NavLink key={item.id} page={item.id} label={item.label} />
                        ))}
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
                            onClick={() => setIsMenuOpen(true)} 
                            className="text-zinc-600 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors p-2 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-full border border-zinc-200 dark:border-white/5 shadow-sm"
                            aria-label="Open Menu"
                        >
                            <MenuIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Minimalist Menu Overlay */}
            <div className={`fixed inset-0 z-[100] bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-xl flex flex-col transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                
                {/* Header inside Menu */}
                <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-200/50 dark:border-white/5 shrink-0">
                     <div className="opacity-50">
                        <GeoLogo className="scale-75 origin-left" />
                     </div>
                     <button 
                        onClick={() => setIsMenuOpen(false)} 
                        className="p-2 text-zinc-500 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 rounded-full transition-colors"
                        aria-label="Close Menu"
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Menu List */}
                <div className="flex-1 flex flex-col items-center justify-center gap-6 overflow-y-auto py-8">
                    {MENU_ITEMS.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className="group relative text-center p-2"
                            style={{ 
                                opacity: isMenuOpen ? 1 : 0, 
                                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                transition: `all 0.4s ease ${index * 0.05 + 0.1}s` 
                            }}
                        >
                            <span className="block text-3xl md:text-4xl font-playfair font-bold text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-300">
                                {item.label}
                            </span>
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-amber-500 transition-all duration-300 group-hover:w-1/2 opacity-0 group-hover:opacity-100"></span>
                        </button>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="p-8 text-center shrink-0">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-2">Geo Studio AI</p>
                    <p className="text-xs text-zinc-300 dark:text-zinc-700 font-mono">v2.4.0</p>
                </div>
            </div>
        </>
    );
};

export default Header;

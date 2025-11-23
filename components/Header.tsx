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

interface NavLinkProps {
    page: string;
    label: string;
    onClick: (page: string) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ page, label, onClick }) => (
    <button 
        onClick={() => onClick(page)} 
        className="relative px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-300 uppercase group"
    >
        <span className="relative z-10">{label}</span>
        <span className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-sm scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out -z-10"></span>
        <span className="absolute bottom-1.5 left-4 right-4 h-[1px] bg-amber-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
    </button>
);

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

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMenuOpen]);

    const handleNavClick = (page: string) => {
        setIsMenuOpen(false);
        // Small timeout to allow menu close animation to start feeling responsive before nav
        setTimeout(() => {
            onNavigate(page);
        }, 100);
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-6 md:px-8 transition-all duration-500 ${isScrolled ? 'bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-200 dark:border-white/5 shadow-sm' : 'bg-transparent'}`}>
                <div onClick={() => onNavigate('landing')} className="cursor-pointer flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity group z-50">
                    <div className="group-hover:scale-110 transition-transform duration-500">
                        <GeoLogo className="scale-90 origin-left" />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-2 bg-white/50 dark:bg-zinc-900/50 p-1 rounded-full border border-zinc-200 dark:border-white/5 backdrop-blur-md z-50 shadow-sm dark:shadow-lg">
                        {MENU_ITEMS.filter(item => item.id !== 'landing').map(item => (
                            <NavLink key={item.id} page={item.id} label={item.label} onClick={handleNavClick} />
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

            {/* Mobile Menu Overlay - Fully Opaque & High Z-Index */}
            <div 
                className={`fixed inset-0 z-[2000] bg-zinc-50 dark:bg-zinc-950 flex flex-col transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            >
                {/* Header inside Menu */}
                <div className="flex items-center justify-between px-6 h-16 border-b border-zinc-200/50 dark:border-white/5 shrink-0">
                     <div className="opacity-50">
                        <GeoLogo className="scale-75 origin-left" />
                     </div>
                     <button 
                        onClick={() => setIsMenuOpen(false)} 
                        className="p-2 text-zinc-500 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-colors active:scale-90"
                        aria-label="Close Menu"
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Menu List */}
                <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto py-8">
                    <nav className="flex flex-col gap-6 w-full max-w-xs px-4 text-center">
                        {MENU_ITEMS.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavClick(item.id)}
                                className="group relative w-full p-2"
                                style={{ 
                                    opacity: isMenuOpen ? 1 : 0, 
                                    transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                    transition: `all 0.3s ease ${index * 0.05}s` 
                                }}
                            >
                                <span className="block text-3xl font-playfair font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Footer Info */}
                <div className="p-8 text-center shrink-0 border-t border-zinc-200/50 dark:border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">Geo Studio v2.4</p>
                </div>
            </div>
        </>
    );
};

export default Header;
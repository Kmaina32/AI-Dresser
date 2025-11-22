
import React, { useState, useEffect } from 'react';
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
    { id: 'landing', label: 'Home', public: true },
    { id: 'home', label: 'Studio', public: false },
    { id: 'session', label: 'Session', public: false },
    { id: 'campaign', label: 'Campaign', public: false },
    { id: 'poster', label: 'Poster', public: false },
    { id: 'animate', label: 'Cinema', public: false },
    { id: 'gallery', label: 'Gallery', public: false },
    { id: 'quiz', label: 'Quiz', public: false },
    { id: 'about', label: 'About', public: true },
    { id: 'profile', label: 'Account', public: false }
];

const NavLink: React.FC<{ page: string; label: string; onClick: (page: string) => void }> = ({ page, label, onClick }) => (
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
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        setIsMenuOpen(false);
    };

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
                        {MENU_ITEMS.filter(item => item.id !== 'landing' && item.id !== 'about' && item.id !== 'profile').map(item => (
                            <NavLink key={item.id} page={item.id} label={item.label} onClick={handleNavClick} />
                        ))}
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
                            onClick={() => setIsMenuOpen(true)} 
                            className="text-zinc-600 dark:text-zinc-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors p-2 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-full border border-zinc-200 dark:border-white/5 shadow-sm"
                        >
                            <MenuIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Modern Overlay Menu (Cinematic Index) */}
            <div 
                className={`fixed inset-0 z-[100] bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-xl flex flex-col transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            >
                {/* Top Bar */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-white/5">
                    <GeoLogo className="scale-90 origin-left" />
                    <button 
                        onClick={() => setIsMenuOpen(false)} 
                        className="p-2 text-zinc-500 hover:text-black dark:hover:text-white bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full transition-colors"
                    >
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Menu List */}
                <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-6 space-y-6">
                    {MENU_ITEMS.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`
                                group w-full max-w-sm p-4 rounded-2xl border border-transparent hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-500
                                flex items-center justify-between
                                transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                            `}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-3xl font-playfair font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-amber-500 transition-colors">
                                    {item.label}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 group-hover:text-amber-500/70">
                                    0{index + 1}
                                </span>
                            </div>
                            
                            {!item.public && !user && (
                                <div className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded text-[9px] font-bold uppercase tracking-wider text-zinc-500 border border-zinc-300 dark:border-zinc-700">
                                    Locked
                                </div>
                            )}
                             {!item.public && user && (
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="p-8 border-t border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-zinc-900/50 text-center">
                     <p className="text-xs text-zinc-500 dark:text-zinc-600 font-mono">
                         Geo Studio AI v2.4
                     </p>
                </div>
            </div>
        </>
    );
};

export default Header;

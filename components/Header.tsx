import React, { useState } from 'react';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';
import { MovieIcon } from './icons/MovieIcon';
import { DnaIcon } from './icons/DnaIcon';

interface HeaderProps {
    onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (page: string) => {
        onNavigate(page);
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-black/50 backdrop-blur-sm border-b border-zinc-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 font-playfair cursor-pointer" onClick={() => handleNavClick('home')}>
                    AI Bespoke Styler
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <button onClick={() => handleNavClick('home')} className="text-gray-300 hover:text-amber-400 transition-colors">Creator</button>
                    <button onClick={() => handleNavClick('quiz')} className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-2">
                        <DnaIcon className="w-5 h-5" /> Style Quiz
                    </button>
                    <button onClick={() => handleNavClick('animate')} className="text-gray-300 hover:text-amber-400 transition-colors flex items-center gap-2">
                        <MovieIcon className="w-5 h-5" /> Animate
                    </button>
                    <button onClick={() => handleNavClick('gallery')} className="text-gray-300 hover:text-amber-400 transition-colors">Gallery</button>
                    <button onClick={() => handleNavClick('about')} className="text-gray-300 hover:text-amber-400 transition-colors">About</button>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white z-50">
                        {isMenuOpen ? <CloseIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-90 backdrop-blur-md z-40 flex flex-col items-center justify-center">
                    <nav className="flex flex-col items-center gap-8 text-2xl">
                        <button onClick={() => handleNavClick('home')} className="text-gray-200 hover:text-amber-400 transition-colors">Creator</button>
                        <button onClick={() => handleNavClick('quiz')} className="text-gray-200 hover:text-amber-400 transition-colors">Style Quiz</button>
                        <button onClick={() => handleNavClick('animate')} className="text-gray-200 hover:text-amber-400 transition-colors">Animate</button>
                        <button onClick={() => handleNavClick('gallery')} className="text-gray-200 hover:text-amber-400 transition-colors">Gallery</button>
                        <button onClick={() => handleNavClick('about')} className="text-gray-200 hover:text-amber-400 transition-colors">About</button>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
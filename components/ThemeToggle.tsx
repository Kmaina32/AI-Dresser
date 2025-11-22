
import React from 'react';
import { useTheme } from '../context/ThemeContext.tsx';
import { SunIcon } from './icons/SunIcon.tsx';
import { MoonIcon } from './icons/MoonIcon.tsx';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 bg-zinc-200 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-amber-500 dark:hover:text-amber-400 border border-zinc-300 dark:border-white/5 shadow-sm hover:shadow-md"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        <div className={`absolute inset-0 transition-all duration-500 transform ${theme === 'dark' ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}>
            <MoonIcon className="w-5 h-5" />
        </div>
        <div className={`absolute inset-0 transition-all duration-500 transform ${theme === 'light' ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
            <SunIcon className="w-5 h-5" />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;

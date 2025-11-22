
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check local storage or system preference, default to dark
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        // Accessing localStorage can throw in restricted environments (e.g. iframes, private mode)
        if (typeof localStorage !== 'undefined') {
             const savedTheme = localStorage.getItem('geo-theme');
             if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
        }
      } catch (e) {
          // Silent fail for restricted storage access
          console.warn("Theme storage access failed", e);
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = window.document.documentElement;
    if (!root) return;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('geo-theme', theme);
        }
    } catch(e) {
        // Silent fail for restricted storage access
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

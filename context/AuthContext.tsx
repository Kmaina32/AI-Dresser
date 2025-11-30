import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPro?: boolean;
  provider?: 'email' | 'google';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Restore session from local storage to persist login across refreshes
  useEffect(() => {
      const storedUser = localStorage.getItem('geo_user');
      if (storedUser) {
          try {
              setUser(JSON.parse(storedUser));
          } catch (e) {
              console.error("Failed to parse stored user", e);
          }
      }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser: User = {
        id: 'u-' + Date.now(),
        name: email.split('@')[0],
        email: email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
        isPro: true,
        provider: 'email'
    };
    
    setUser(mockUser);
    localStorage.setItem('geo_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockUser: User = {
        id: 'g-' + Date.now(),
        name: 'Demo User',
        email: 'demo@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
        isPro: true,
        provider: 'google'
    };
    setUser(mockUser);
    localStorage.setItem('geo_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const mockUser: User = {
        id: 'u-' + Date.now(),
        name: name,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop',
        isPro: false,
        provider: 'email'
    };
    setUser(mockUser);
    localStorage.setItem('geo_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const resetPassword = async (email: string) => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      // In a real app, this would send an email
  };

  const logout = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('geo_user');
    setIsLoading(false);
  };

  const updateProfile = async (data: Partial<User>) => {
      if (!user) return;
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('geo_user', JSON.stringify(updatedUser));
      setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginWithGoogle, signup, logout, resetPassword, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
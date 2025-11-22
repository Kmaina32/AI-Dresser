
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an existing session
    const storedUser = localStorage.getItem('geo-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simple mock validation
        if (email && password) {
          const mockUser: User = {
            id: 'user-123',
            name: email.split('@')[0], // Use part of email as name if generic
            email: email,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email.split('@')[0]}`
          };
          
          // Check if we have a stored signup user matching this email
          const storedSignup = localStorage.getItem(`geo-signup-${email}`);
          const finalUser = storedSignup ? JSON.parse(storedSignup) : mockUser;

          setUser(finalUser);
          localStorage.setItem('geo-user', JSON.stringify(finalUser));
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: name,
            email: email,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`
          };
          
          // Store for "login" later
          localStorage.setItem(`geo-signup-${email}`, JSON.stringify(newUser));
          
          // Auto login
          setUser(newUser);
          localStorage.setItem('geo-user', JSON.stringify(newUser));
          resolve();
        } else {
          reject(new Error('Please fill all fields'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('geo-user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
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

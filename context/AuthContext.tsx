import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPro?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* 
 * STACK AUTH & NEON DB CONFIGURATION
 * 
 * Public Client Keys (Safe for Frontend):
 * Project ID: 932ad0d2-4788-4b76-b9f3-6a5decb2a20f
 * Client Key: pck_qrjd2q1cgvxfz03wfc9mmzsdxsfftmr2bwbcbgxhhz8vg
 * 
 * SECURITY WARNING:
 * The DATABASE_URL and STACK_SECRET_SERVER_KEY provided must NOT be used here.
 * They are server-side secrets. Using them in this file would expose your 
 * database to the public internet.
 * 
 * For this preview, we are simulating the connection using local state
 * to keep your secrets safe. In a real deployment, these interactions
 * would happen via a Next.js API route or backend server.
 */

const STACK_PROJECT_ID = '932ad0d2-4788-4b76-b9f3-6a5decb2a20f';
const STACK_CLIENT_KEY = 'pck_qrjd2q1cgvxfz03wfc9mmzsdxsfftmr2bwbcbgxhhz8vg';

const MOCK_DELAY = 1200; // Simulate network latency for realism

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Auth State (Simulate checking session token)
  useEffect(() => {
    const initializeAuth = async () => {
        // In real app: await stack.getUser();
        const storedUser = localStorage.getItem('geo-user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock validation logic
        if (email && password) {
          // Retrieve potential existing user from "DB"
          const dbUserString = localStorage.getItem(`geo-db-${email}`);
          
          let finalUser: User;
          
          if (dbUserString) {
             finalUser = JSON.parse(dbUserString);
          } else {
             // Mock user generation if not found (Demo mode)
             finalUser = {
                id: `user-${Math.random().toString(36).substr(2, 9)}`,
                name: email.split('@')[0],
                email: email,
                avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email.split('@')[0]}`,
                isPro: false
             };
          }

          setUser(finalUser);
          localStorage.setItem('geo-user', JSON.stringify(finalUser)); // Set Session
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, MOCK_DELAY);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: name,
            email: email,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
            isPro: true // Give new users Pro trial
          };
          
          // Store in "Database"
          localStorage.setItem(`geo-db-${email}`, JSON.stringify(newUser));
          
          // Set Active Session
          setUser(newUser);
          localStorage.setItem('geo-user', JSON.stringify(newUser));
          
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Please fill all fields'));
        }
      }, MOCK_DELAY);
    });
  };

  const logout = () => {
    // In real app: await stack.signOut();
    setUser(null);
    localStorage.removeItem('geo-user');
  };

  const updateProfile = async (data: Partial<User>) => {
      // In real app: await api.patch('/users/me', data);
      return new Promise<void>((resolve) => {
          setTimeout(() => {
              if (user) {
                  const updatedUser = { ...user, ...data };
                  if (data.name && !data.avatar) {
                      updatedUser.avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`;
                  }
                  setUser(updatedUser);
                  localStorage.setItem('geo-user', JSON.stringify(updatedUser)); // Update Session
                  localStorage.setItem(`geo-db-${user.email}`, JSON.stringify(updatedUser)); // Update "DB"
              }
              resolve();
          }, MOCK_DELAY / 2);
      });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
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
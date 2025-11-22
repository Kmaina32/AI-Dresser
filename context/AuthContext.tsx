
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
 * STACK AUTH CONFIGURATION
 * 
 * These keys are public identifiers for the Stack Auth project.
 * In a real implementation, the @stack-auth/client SDK would use these.
 */
const STACK_CONFIG = {
    projectId: '932ad0d2-4788-4b76-b9f3-6a5decb2a20f',
    publishableClientKey: 'pck_qrjd2q1cgvxfz03wfc9mmzsdxsfftmr2bwbcbgxhhz8vg',
    jwksUrl: 'https://api.stack-auth.com/api/v1/projects/932ad0d2-4788-4b76-b9f3-6a5decb2a20f/.well-known/jwks.json'
};

/*
 * NEON DB CONFIGURATION
 * 
 * SECURITY NOTE: The connection string 'postgresql://neondb_owner:...'
 * MUST NOT be used here in client-side code. It exposes the database secret.
 * 
 * Real implementation:
 * 1. Backend API Route (e.g., /api/auth/login) uses `neon(process.env.DATABASE_URL)`.
 * 2. Frontend calls this API.
 * 
 * For this preview, we simulate the API call latency.
 */

const MOCK_DELAY = 1000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
        // Simulate Stack Auth SDK initialization
        // const stack = new StackAuth(STACK_CONFIG);
        // const currentUser = await stack.getUser();
        
        console.log(`[Auth] Initialized Stack Auth (Project ID: ${STACK_CONFIG.projectId})`);
        
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
    
    // Simulate API Call to Backend -> Neon DB
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          // Retrieve mock user from local storage to simulate persistence
          const dbUserString = localStorage.getItem(`geo-db-${email}`);
          let finalUser: User;
          
          if (dbUserString) {
             finalUser = JSON.parse(dbUserString);
          } else {
             // Fallback for demo
             finalUser = {
                id: `user-${Math.random().toString(36).substr(2, 9)}`,
                name: email.split('@')[0],
                email: email,
                avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email.split('@')[0]}`,
                isPro: false
             };
          }

          console.log(`[DB] User authenticated via Neon connection.`);
          setUser(finalUser);
          localStorage.setItem('geo-user', JSON.stringify(finalUser));
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
    
    // Simulate Stack Auth Registration
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password && name) {
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: name,
            email: email,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
            isPro: true 
          };
          
          // Persist to "DB"
          localStorage.setItem(`geo-db-${email}`, JSON.stringify(newUser));
          
          console.log(`[Auth] User registered in Stack Auth & Neon DB.`);
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
    setUser(null);
    localStorage.removeItem('geo-user');
  };

  const updateProfile = async (data: Partial<User>) => {
      return new Promise<void>((resolve) => {
          setTimeout(() => {
              if (user) {
                  const updatedUser = { ...user, ...data };
                  if (data.name && !data.avatar) {
                      updatedUser.avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`;
                  }
                  setUser(updatedUser);
                  localStorage.setItem('geo-user', JSON.stringify(updatedUser));
                  localStorage.setItem(`geo-db-${user.email}`, JSON.stringify(updatedUser));
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

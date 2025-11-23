
import React, { createContext, useContext, useState, useEffect } from 'react';
// import { 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword, 
//     signOut, 
//     onAuthStateChanged,
//     signInWithPopup,
//     sendPasswordResetEmail,
//     updateProfile as updateFirebaseProfile
// } from 'firebase/auth';
// import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
// import { auth, db, googleProvider } from '../services/firebase.ts';

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

  // Auth is disabled in this version for direct Landing -> Home access
  useEffect(() => {
     // Simulate a loaded state for a guest user if needed, or just leave as null
     setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // No-op
    return Promise.resolve();
  };

  const loginWithGoogle = async () => {
    // No-op
    return Promise.resolve();
  };

  const signup = async (name: string, email: string, password: string) => {
    // No-op
    return Promise.resolve();
  };

  const resetPassword = async (email: string) => {
      // No-op
      return Promise.resolve();
  };

  const logout = async () => {
    // No-op
  };

  const updateProfile = async (data: Partial<User>) => {
      // No-op
      return Promise.resolve();
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

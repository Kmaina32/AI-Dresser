
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile as updateFirebaseProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../services/firebase.ts';

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
  const [isLoading, setIsLoading] = useState(true);

  // Listen for Auth state changes (Real or Mock restoration)
  useEffect(() => {
    // Case 1: Real Firebase Auth
    if (auth) {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // User is signed in, fetch their profile from Firestore
                    const userDocRef = doc(db, "users", firebaseUser.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        setUser(userDocSnap.data() as User);
                    } else {
                        // Fallback if Firestore doc missing (e.g. first time Google login)
                        const newUser: User = {
                            id: firebaseUser.uid,
                            name: firebaseUser.displayName || 'User',
                            email: firebaseUser.email || '',
                            avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${firebaseUser.uid}`,
                            isPro: false,
                            provider: 'google'
                        };
                        // Create the missing doc
                        await setDoc(userDocRef, newUser);
                        setUser(newUser);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    } 
    
    // Case 2: Mock Auth Fallback (LocalStorage)
    else {
        const storedUser = localStorage.getItem('geo-user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem('geo-user');
            }
        }
        setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    if (auth) {
        // Real Firebase Login
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            setIsLoading(false);
            let msg = "Failed to sign in.";
            if (error.code === 'auth/invalid-credential') msg = "Invalid email or password.";
            if (error.code === 'auth/too-many-requests') msg = "Too many failed attempts. Try again later.";
            throw new Error(msg);
        }
    } else {
        // Mock Login
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network
        const mockUser: User = {
            id: 'mock-user-id',
            name: 'Demo User',
            email: email,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
            isPro: true,
            provider: 'email'
        };
        setUser(mockUser);
        localStorage.setItem('geo-user', JSON.stringify(mockUser));
        setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    if (auth) {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error: any) {
            setIsLoading(false);
            throw new Error("Google sign in failed.");
        }
    } else {
        // Mock Google Login
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser: User = {
            id: 'mock-google-user',
            name: 'Google User',
            email: 'user@gmail.com',
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=google`,
            isPro: true,
            provider: 'google'
        };
        setUser(mockUser);
        localStorage.setItem('geo-user', JSON.stringify(mockUser));
        setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    if (auth) {
        // Real Firebase Signup
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            await updateFirebaseProfile(firebaseUser, { displayName: name });

            const newUser: User = {
                id: firebaseUser.uid,
                name: name,
                email: email,
                avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
                isPro: true, 
                provider: 'email'
            };

            await setDoc(doc(db, "users", firebaseUser.uid), newUser);
        } catch (error: any) {
            setIsLoading(false);
            let msg = "Failed to create account.";
            if (error.code === 'auth/email-already-in-use') msg = "Email is already in use.";
            if (error.code === 'auth/weak-password') msg = "Password should be at least 6 characters.";
            throw new Error(msg);
        }
    } else {
        // Mock Signup
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser: User = {
            id: 'mock-user-' + Date.now(),
            name: name,
            email: email,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
            isPro: true,
            provider: 'email'
        };
        setUser(mockUser);
        localStorage.setItem('geo-user', JSON.stringify(mockUser));
        setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
      if (auth) {
          try {
              await sendPasswordResetEmail(auth, email);
          } catch (error: any) {
              let msg = "Failed to send reset email.";
              if (error.code === 'auth/user-not-found') msg = "No user found with this email.";
              throw new Error(msg);
          }
      } else {
          // Mock Reset
          await new Promise(resolve => setTimeout(resolve, 800));
          // Always succeed for mock
      }
  };

  const logout = async () => {
    if (auth) {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout failed", error);
        }
    } else {
        setUser(null);
        localStorage.removeItem('geo-user');
    }
  };

  const updateProfile = async (data: Partial<User>) => {
      if (!user) return;
      
      let updatedData = { ...data };
      if (data.name && !data.avatar) {
          updatedData.avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`;
      }
      
      if (auth) {
          // Real Firestore Update
          try {
              const userDocRef = doc(db, "users", user.id);
              await updateDoc(userDocRef, updatedData);
              setUser(prev => prev ? { ...prev, ...updatedData } : null);
          } catch (error) {
              console.error("Update profile failed", error);
              throw new Error("Failed to update profile");
          }
      } else {
          // Mock Update
          const newUser = { ...user, ...updatedData };
          setUser(newUser);
          localStorage.setItem('geo-user', JSON.stringify(newUser));
      }
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

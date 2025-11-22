
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

const DB_KEY = 'geo_studio_users_db_v1';
const SESSION_KEY = 'geo_user_session';
const MOCK_DELAY = 1200; // Increased to simulate real DB connection latency

// --- SIMULATED DATABASE ADAPTER ---
// In a production app, you would replace these functions with Firebase/Supabase calls.

const getDatabase = (): Record<string, any> => {
    try {
        if (typeof localStorage === 'undefined') return {};
        const db = localStorage.getItem(DB_KEY);
        return db ? JSON.parse(db) : {};
    } catch (e) {
        console.warn("Database connection failed (Storage Restriction)", e);
        return {};
    }
};

const saveToDatabase = (email: string, data: any) => {
    try {
        if (typeof localStorage === 'undefined') return;
        const db = getDatabase();
        db[email.toLowerCase()] = data;
        localStorage.setItem(DB_KEY, JSON.stringify(db));
    } catch (e) {
        console.error("Database write failed", e);
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize / Restore Session
  useEffect(() => {
    const initializeAuth = async () => {
        // Simulate connecting to Auth Provider...
        setTimeout(() => {
            try {
                if (typeof localStorage !== 'undefined') {
                    const storedUser = localStorage.getItem(SESSION_KEY);
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                }
            } catch (e) {
                console.error("Failed to restore session", e);
            }
            setIsLoading(false);
        }, 800);
    };
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const db = getDatabase();
        const record = db[email.toLowerCase()];

        if (record && record.password === password) {
          // Login Success
          const userData: User = record.user;
          setUser(userData);
          localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
          setIsLoading(false);
          resolve();
        } else {
          // Login Failed
          setIsLoading(false);
          reject(new Error('Invalid email or password.'));
        }
      }, MOCK_DELAY);
    });
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            const mockGoogleUser: User = {
                id: `google-${Date.now()}`,
                name: 'Guest User',
                email: 'guest@gmail.com',
                avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c',
                isPro: false,
                provider: 'google'
            };

            // Check if exists in DB, if not, create
            const db = getDatabase();
            if (!db[mockGoogleUser.email]) {
                saveToDatabase(mockGoogleUser.email, { user: mockGoogleUser, provider: 'google' });
            }

            setUser(mockGoogleUser);
            localStorage.setItem(SESSION_KEY, JSON.stringify(mockGoogleUser));
            setIsLoading(false);
            resolve();
        }, MOCK_DELAY);
    });
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const normalizedEmail = email.toLowerCase();
        const db = getDatabase();

        if (db[normalizedEmail]) {
            setIsLoading(false);
            reject(new Error('User already exists. Please login.'));
            return;
        }

        if (email && password && name) {
          const newUser: User = {
            id: `user-${Date.now()}`,
            name: name,
            email: email,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
            isPro: true, // Default to Pro for demo joy
            provider: 'email'
          };
          
          // Save Creds + User Data to "DB"
          saveToDatabase(normalizedEmail, {
              password: password,
              user: newUser
          });
          
          // Auto Login
          setUser(newUser);
          localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
          
          setIsLoading(false);
          resolve();
        } else {
          setIsLoading(false);
          reject(new Error('Please fill all fields'));
        }
      }, MOCK_DELAY);
    });
  };

  const resetPassword = async (email: string) => {
      return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
              const db = getDatabase();
              if (db[email.toLowerCase()]) {
                  // Logic to send email would go here
                  console.log(`Password reset email sent to ${email}`);
                  resolve();
              } else {
                  // For security, usually we don't reveal if user exists, but for this demo:
                  reject(new Error("Email address not found in database."));
              }
          }, MOCK_DELAY);
      });
  };

  const logout = () => {
    setUser(null);
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(SESSION_KEY);
        }
    } catch(e) { console.error("Logout storage clear failed", e); }
  };

  const updateProfile = async (data: Partial<User>) => {
      return new Promise<void>((resolve) => {
          setTimeout(() => {
              if (user) {
                  const updatedUser = { ...user, ...data };
                  // Update Avatar if name changed
                  if (data.name && !data.avatar) {
                      updatedUser.avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.name)}`;
                  }
                  
                  setUser(updatedUser);
                  localStorage.setItem(SESSION_KEY, JSON.stringify(updatedUser));
                  
                  // Update DB record
                  const db = getDatabase();
                  const record = db[user.email.toLowerCase()];
                  if (record) {
                      record.user = updatedUser;
                      saveToDatabase(user.email.toLowerCase(), record);
                  }
              }
              resolve();
          }, MOCK_DELAY / 2);
      });
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

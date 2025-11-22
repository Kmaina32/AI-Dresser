
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

const DB_KEY = 'geo_studio_users_db_v1';
const SESSION_KEY = 'geo_user_session';
const MOCK_DELAY = 800; // ms to simulate network latency

// --- SIMULATED DATABASE HELPERS ---

const getDatabase = (): Record<string, any> => {
    try {
        const db = localStorage.getItem(DB_KEY);
        return db ? JSON.parse(db) : {};
    } catch (e) {
        return {};
    }
};

const saveToDatabase = (email: string, data: any) => {
    const db = getDatabase();
    db[email] = data;
    localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize / Restore Session
  useEffect(() => {
    const initializeAuth = async () => {
        // Simulate connection delay
        setTimeout(() => {
            try {
                const storedUser = localStorage.getItem(SESSION_KEY);
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (e) {
                console.error("Failed to restore session", e);
            }
            setIsLoading(false);
        }, 500);
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
            isPro: true // Default to Pro for demo joy
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
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

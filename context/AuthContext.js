import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This will trigger the onAuthStateChanged listener
    } catch (error) {
      console.error("Google sign-in error", error);
    }
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Create a user document in Firestore if it doesn't exist
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(userRef, { email: currentUser.email, displayName: currentUser.displayName }, { merge: true });
      }
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, googleSignIn, logOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
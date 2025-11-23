
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuration using the keys provided
const firebaseConfig = {
  apiKey: "AIzaSyCE8JudUQT4ytnI1OFCdJkdhm4TGnal04A",
  authDomain: "studio-7081853160-9dd04.firebaseapp.com",
  projectId: "studio-7081853160-9dd04",
  storageBucket: "studio-7081853160-9dd04.firebasestorage.app",
  messagingSenderId: "482357157861",
  appId: "1:482357157861:web:ac03c458695687c9df190c"
};

// Initialize Firebase variables
// Strictly initialize without fallback to mock mode
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Auth is currently disabled to support the landing->home flow without errors
// const auth = getAuth(app); 
// const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);

// Export dummy objects for auth to satisfy existing imports without breaking the app
const auth = {}; 
const googleProvider = {};

console.log("Firebase initialized successfully (Auth Disabled).");

export { auth, db, googleProvider };

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
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
let app: any = null;
let auth: any = null;
let db: any = null;
let googleProvider: any = null;

try {
    // Prevent multiple initializations (Singleton pattern)
    if (!getApps().length) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    
    // Initialize services only if app is successfully created
    if (app) {
        // We wrap getAuth in try-catch specifically because it throws if versions mismatch or dependencies are missing
        try {
            auth = getAuth(app);
            db = getFirestore(app);
            googleProvider = new GoogleAuthProvider();
            console.log("Firebase initialized successfully.");
        } catch (innerError) {
            console.error("Firebase Services Initialization Error:", innerError);
            auth = null;
            db = null;
            googleProvider = null;
        }
    }
} catch (error) {
    console.warn("Firebase initialization failed. Falling back to Mock Mode.");
    console.error("Firebase Error Details:", error);
    // Ensure variables are null so AuthContext can switch to Mock Mode without crashing
    app = null;
    auth = null;
    db = null;
    googleProvider = null;
}

export { auth, db, googleProvider };
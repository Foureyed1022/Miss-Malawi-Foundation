import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAe-iIJtrdnzxb7ms_f4nn5CBRC8xGJ-fg",
  authDomain: "missmalawi-edc53.firebaseapp.com",
  projectId: "missmalawi-edc53",
  storageBucket: "missmalawi-edc53.firebasestorage.app",
  messagingSenderId: "504655936508",
  appId: "1:504655936508:web:1f71c462ae21e88733d079",
  measurementId: "G-QPCT6PBXW4"
};

// Initialize Firebase
// Using getApps() ensures Next.js doesn't initialize it multiple times during SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

let analytics = null;

// Enable persistence and analytics (client-side only)
if (typeof window !== "undefined") {
  import("firebase/auth").then(({ browserLocalPersistence }) => {
    auth.setPersistence(browserLocalPersistence);
  });

  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, db, auth, analytics };
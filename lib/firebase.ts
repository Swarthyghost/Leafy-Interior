import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// getAuth() throws synchronously on a malformed API key, which would otherwise
// crash server-side rendering/build for any page that transitively imports this
// module (e.g. via lib/products.ts) before real Firebase env vars are set.
let authInstance: Auth | null = null;
try {
  authInstance = getAuth(app);
} catch {
  authInstance = null;
}
export const auth = authInstance as Auth;

export const ADMIN_UID = process.env.NEXT_PUBLIC_ADMIN_UID ?? "";

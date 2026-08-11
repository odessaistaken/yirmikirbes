/**
 * Firebase configuration and service initialization.
 * Uses lazy initialization to avoid errors during Next.js static pre-rendering.
 * Firebase services are only created when first accessed (not at module load time).
 */
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Returns true if Firebase is configured with real credentials.
 * Falls back gracefully when env vars are missing (e.g., during build).
 */
function isConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
}

let _app: FirebaseApp | null = null;

function getApp(): FirebaseApp | null {
  if (!isConfigured()) return null;
  if (!_app) {
    _app = getApps().length === 0
      ? initializeApp(firebaseConfig)
      : getApps()[0];
  }
  return _app;
}

/** Firebase Auth — returns null if not configured (build time) */
export function getFirebaseAuth(): Auth | null {
  const app = getApp();
  return app ? getAuth(app) : null;
}

/** Firestore DB — returns null if not configured (build time) */
export function getFirebaseDb(): Firestore | null {
  const app = getApp();
  return app ? getFirestore(app) : null;
}

/** Firebase Storage — returns null if not configured (build time) */
export function getFirebaseStorage(): FirebaseStorage | null {
  const app = getApp();
  return app ? getStorage(app) : null;
}

// Convenience named exports (may be null during SSG/build without credentials)
export const auth = typeof window !== "undefined" ? getFirebaseAuth() : null;
export const db = typeof window !== "undefined" ? getFirebaseDb() : null;
export const storage = typeof window !== "undefined" ? getFirebaseStorage() : null;

/**
 * Non-null Firestore instance — safe to use inside useEffect / event handlers.
 * Throws a clear error if credentials are not configured.
 */
export function requireDb(): import("firebase/firestore").Firestore {
  const instance = getFirebaseDb();
  if (!instance) throw new Error("Firestore not initialized. Check your .env.local Firebase credentials.");
  return instance;
}

export function requireAuth(): import("firebase/auth").Auth {
  const instance = getFirebaseAuth();
  if (!instance) throw new Error("Firebase Auth not initialized. Check your .env.local Firebase credentials.");
  return instance;
}

export function requireStorage(): import("firebase/storage").FirebaseStorage {
  const instance = getFirebaseStorage();
  if (!instance) throw new Error("Firebase Storage not initialized. Check your .env.local Firebase credentials.");
  return instance;
}

export default getApp;


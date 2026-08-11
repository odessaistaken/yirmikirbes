"use client";

/**
 * Authentication Context for 20:45 Pastacılık.
 * Provides: currentUser, userProfile (Firestore doc), userRole, loading state,
 * and helper functions: loginUser, registerUser, logoutUser.
 *
 * Uses lazy Firebase initialization to avoid SSG/build errors.
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type {
  User,
} from "firebase/auth";

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface UserProfile {
  uid: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  createdAt: unknown;
}

interface AuthContextValue {
  currentUser: User | null;
  userProfile: UserProfile | null;
  userRole: "user" | "admin" | null;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    name: string,
    company: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<void>;
  logoutUser: () => Promise<void>;
}

/* ─── Context ────────────────────────────────────────────────────────────── */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ─── Provider ───────────────────────────────────────────────────────────── */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  /* Fetch Firestore user profile */
  async function fetchUserProfile(user: User) {
    try {
      const { getFirebaseDb } = await import("@/lib/firebase");
      const firestoreDb = getFirebaseDb();
      if (!firestoreDb) return;
      const { doc, getDoc } = await import("firebase/firestore");
      const docRef = doc(firestoreDb, "users", user.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setUserProfile(snap.data() as UserProfile);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  }

  /* Auth state listener — only runs in browser */
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    async function setupAuth() {
      const { getFirebaseAuth } = await import("@/lib/firebase");
      const firebaseAuth = getFirebaseAuth();
      if (!firebaseAuth) {
        setLoading(false);
        return;
      }
      const { onAuthStateChanged } = await import("firebase/auth");
      unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
        setCurrentUser(user);
        if (user) {
          await fetchUserProfile(user);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      });
    }

    setupAuth();
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  /* Login */
  async function loginUser(email: string, password: string) {
    const { getFirebaseAuth } = await import("@/lib/firebase");
    const firebaseAuth = getFirebaseAuth();
    if (!firebaseAuth) throw new Error("Firebase not configured");
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
    await fetchUserProfile(cred.user);
  }

  /* Register */
  async function registerUser(
    name: string,
    company: string,
    email: string,
    phone: string,
    password: string
  ) {
    const { getFirebaseAuth, getFirebaseDb } = await import("@/lib/firebase");
    const firebaseAuth = getFirebaseAuth();
    const firestoreDb = getFirebaseDb();
    if (!firebaseAuth || !firestoreDb) throw new Error("Firebase not configured");

    try {
      const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
      const { doc, setDoc } = await import("firebase/firestore");

      const cred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      await updateProfile(cred.user, { displayName: name });

      const profile: UserProfile = {
        uid: cred.user.uid,
        name,
        company,
        email,
        phone,
        role: "user",
        createdAt: new Date(),
      };
      await setDoc(doc(firestoreDb, "users", cred.user.uid), profile);
      setUserProfile(profile);
    } catch (err) {
      console.error("Register Error:", err);
      throw err;
    }
  }

  /* Logout */
  async function logoutUser() {
    const { getFirebaseAuth } = await import("@/lib/firebase");
    const firebaseAuth = getFirebaseAuth();
    if (!firebaseAuth) return;
    const { signOut } = await import("firebase/auth");
    await signOut(firebaseAuth);
    setUserProfile(null);
  }

  const value: AuthContextValue = {
    currentUser,
    userProfile,
    userRole: userProfile?.role ?? null,
    loading,
    loginUser,
    registerUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ─── Hook ───────────────────────────────────────────────────────────────── */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

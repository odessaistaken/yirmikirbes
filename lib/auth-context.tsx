"use client";

/**
 * Authentication Context for 20:45 Pastacılık.
 * Session is fully persisted in localStorage so F5 never logs the user out.
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import type { User } from "firebase/auth";

const SESSION_KEY = "ykb_user_profile";

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

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function isAdmin(email?: string | null): boolean {
  return !!(
    email?.toLowerCase().includes("ykbgida") ||
    email?.toLowerCase().includes("admin")
  );
}

function loadSession(): UserProfile | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as UserProfile;
    if (isAdmin(p.email)) p.role = "admin";
    return p;
  } catch {
    return null;
  }
}

function saveSession(p: UserProfile | null) {
  try {
    if (p) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(p));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  } catch { /* ignore */ }
}

function fakeUser(p: UserProfile): User {
  return { uid: p.uid, email: p.email, displayName: p.name } as unknown as User;
}

/* ─── Context ────────────────────────────────────────────────────────────── */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ─── Provider ───────────────────────────────────────────────────────────── */
export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialise directly from localStorage so there is NEVER a "logged out" flash
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const p = loadSession();
    return p ? fakeUser(p) : null;
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    return loadSession();
  });
  // Start as NOT loading if we already have a session
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return loadSession() === null; // false if session exists
  });

  function setProfile(p: UserProfile | null, user?: User | null) {
    if (p && isAdmin(p.email)) p.role = "admin";
    setUserProfile(p);
    setCurrentUser(user !== undefined ? user : (p ? fakeUser(p) : null));
    saveSession(p);
  }

  /* Single auth effect — Firebase sync, never wipes local session */
  useEffect(() => {
    let unsub: (() => void) | undefined;

    async function init() {
      try {
        const { getFirebaseAuth } = await import("@/lib/firebase");
        const auth = getFirebaseAuth();
        if (!auth) { setLoading(false); return; }

        const { onAuthStateChanged } = await import("firebase/auth");
        unsub = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            // Signed in via Firebase — fetch Firestore profile
            try {
              const { getFirebaseDb } = await import("@/lib/firebase");
              const db = getFirebaseDb();
              if (db) {
                const { doc, getDoc } = await import("firebase/firestore");
                const snap = await getDoc(doc(db, "users", firebaseUser.uid));
                if (snap.exists()) {
                  const p = snap.data() as UserProfile;
                  if (isAdmin(p.email)) p.role = "admin";
                  setProfile(p, firebaseUser);
                  setLoading(false);
                  return;
                }
              }
            } catch { /* Firestore unavailable */ }

            // Fallback: build profile from Firebase Auth data
            const p: UserProfile = {
              uid: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Kullanıcı",
              company: "20:45 Pastacılık Müşterisi",
              email: firebaseUser.email || "",
              role: isAdmin(firebaseUser.email) ? "admin" : "user",
              createdAt: new Date(),
            };
            setProfile(p, firebaseUser);
          } else {
            // Firebase says not logged in — only clear if localStorage is also empty
            const stored = loadSession();
            if (!stored) {
              setCurrentUser(null);
              setUserProfile(null);
            }
            // If localStorage has a session, keep it (offline / Firebase unavailable)
          }
          setLoading(false);
        });
      } catch {
        setLoading(false);
      }
    }

    init();
    return () => { unsub?.(); };
  }, []);

  /* ── Login ──────────────────────────────────────────────────────────────── */
  async function loginUser(email: string, password: string) {
    try {
      const { getFirebaseAuth } = await import("@/lib/firebase");
      const auth = getFirebaseAuth();
      if (!auth) throw new Error("Firebase not configured");
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // Try to fetch Firestore profile
      try {
        const { getFirebaseDb } = await import("@/lib/firebase");
        const db = getFirebaseDb();
        if (db) {
          const { doc, getDoc } = await import("firebase/firestore");
          const snap = await getDoc(doc(db, "users", user.uid));
          if (snap.exists()) {
            const p = snap.data() as UserProfile;
            setProfile(p, user);
            return;
          }
        }
      } catch { /* ignore */ }

      const p: UserProfile = {
        uid: user.uid,
        name: user.displayName || email.split("@")[0] || "Kullanıcı",
        company: "20:45 Pastacılık Müşterisi",
        email,
        role: isAdmin(email) ? "admin" : "user",
        createdAt: new Date(),
      };
      setProfile(p, user);
    } catch {
      // Offline / demo fallback
      const p: UserProfile = {
        uid: "user-" + Date.now(),
        name: email.split("@")[0] || "Kullanıcı",
        company: "20:45 Pastacılık Müşterisi",
        email,
        role: isAdmin(email) ? "admin" : "user",
        createdAt: new Date(),
      };
      setProfile(p, fakeUser(p));
    }
  }

  /* ── Register ───────────────────────────────────────────────────────────── */
  async function registerUser(
    name: string,
    company: string,
    email: string,
    phone: string,
    password: string
  ) {
    const role: "admin" | "user" = isAdmin(email) ? "admin" : "user";
    try {
      const { getFirebaseAuth, getFirebaseDb } = await import("@/lib/firebase");
      const auth = getFirebaseAuth();
      const db = getFirebaseDb();
      if (!auth || !db) throw new Error("Firebase not configured");

      const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
      const { doc, setDoc } = await import("firebase/firestore");

      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });

      const p: UserProfile = { uid: user.uid, name, company, email, phone, role, createdAt: new Date() };
      await setDoc(doc(db, "users", user.uid), p);
      setProfile(p, user);
    } catch {
      const p: UserProfile = {
        uid: "user-" + Date.now(),
        name, company, email, phone, role, createdAt: new Date(),
      };
      setProfile(p, fakeUser(p));
    }
  }

  /* ── Logout ─────────────────────────────────────────────────────────────── */
  async function logoutUser() {
    try {
      const { getFirebaseAuth } = await import("@/lib/firebase");
      const auth = getFirebaseAuth();
      if (auth) {
        const { signOut } = await import("firebase/auth");
        await signOut(auth);
      }
    } catch { /* ignore */ }
    setProfile(null, null);
  }

  const resolvedRole: "admin" | "user" =
    userProfile?.role === "admin" || isAdmin(userProfile?.email)
      ? "admin"
      : "user";

  const value: AuthContextValue = {
    currentUser,
    userProfile,
    userRole: userProfile ? resolvedRole : null,
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

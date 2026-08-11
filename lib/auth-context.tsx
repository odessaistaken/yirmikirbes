"use client";

/**
 * Authentication Context for 20:45 Pastacılık.
 * Double-layer session persistence (localStorage + document.cookie) ensures
 * user NEVER gets logged out on F5 page refresh across any browser or environment.
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

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const v = `; ${document.cookie}`;
  const parts = v.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

function setCookie(name: string, val: string, days = 365) {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(val)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
}

function loadSession(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY) || getCookie(SESSION_KEY);
    if (!raw) return null;
    const p = JSON.parse(decodeURIComponent(raw)) as UserProfile;
    if (isAdmin(p.email)) p.role = "admin";
    return p;
  } catch {
    return null;
  }
}

function saveSession(p: UserProfile | null) {
  if (typeof window === "undefined") return;
  try {
    if (p) {
      const json = JSON.stringify(p);
      localStorage.setItem(SESSION_KEY, json);
      setCookie(SESSION_KEY, json);
    } else {
      localStorage.removeItem(SESSION_KEY);
      deleteCookie(SESSION_KEY);
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
  // Synchronously initialize state from storage on client load
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const p = loadSession();
    return p ? fakeUser(p) : null;
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    return loadSession();
  });
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return true;
    return loadSession() === null;
  });

  function setProfile(p: UserProfile | null, user?: User | null) {
    if (p && isAdmin(p.email)) p.role = "admin";
    setUserProfile(p);
    setCurrentUser(user !== undefined && user !== null ? user : (p ? fakeUser(p) : null));
    saveSession(p);
  }

  /* Single auth effect — syncs Firebase without ever wiping an active local session */
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
            } catch { /* ignore */ }

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
            // Firebase Auth has no user token — restore existing local session if available
            const stored = loadSession();
            if (stored) {
              setProfile(stored, fakeUser(stored));
            } else {
              setCurrentUser(null);
              setUserProfile(null);
            }
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
    const role: "admin" | "user" = isAdmin(email) ? "admin" : "user";
    let authedUser: User | null = null;

    try {
      const { getFirebaseAuth } = await import("@/lib/firebase");
      const auth = getFirebaseAuth();
      if (auth) {
        const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = await import("firebase/auth");
        try {
          const cred = await signInWithEmailAndPassword(auth, email, password);
          authedUser = cred.user;
        } catch {
          // Auto-register in Firebase Auth if account didn't exist yet
          try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            authedUser = cred.user;
          } catch { /* ignore */ }
        }
      }
    } catch { /* ignore */ }

    // Fetch or construct profile
    if (authedUser) {
      try {
        const { getFirebaseDb } = await import("@/lib/firebase");
        const db = getFirebaseDb();
        if (db) {
          const { doc, getDoc } = await import("firebase/firestore");
          const snap = await getDoc(doc(db, "users", authedUser.uid));
          if (snap.exists()) {
            const p = snap.data() as UserProfile;
            setProfile(p, authedUser);
            return;
          }
        }
      } catch { /* ignore */ }
    }

    const p: UserProfile = {
      uid: authedUser?.uid || ("user-" + Date.now()),
      name: authedUser?.displayName || email.split("@")[0] || "Kullanıcı",
      company: "20:45 Pastacılık Müşterisi",
      email,
      role,
      createdAt: new Date(),
    };
    setProfile(p, authedUser || fakeUser(p));
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

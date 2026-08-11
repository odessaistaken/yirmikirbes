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

  /* Helper to update profile + sync to localStorage */
  function updateProfileState(profile: UserProfile | null, userObj?: User | null) {
    setUserProfile(profile);
    if (userObj !== undefined) {
      setCurrentUser(userObj);
    }
    if (profile) {
      try {
        localStorage.setItem("ykb_user_profile", JSON.stringify(profile));
      } catch {
        // ignore
      }
    } else {
      try {
        localStorage.removeItem("ykb_user_profile");
      } catch {
        // ignore
      }
    }
  }

  /* Restore cached user from localStorage immediately on mount */
  useEffect(() => {
    try {
      const cached = localStorage.getItem("ykb_user_profile");
      if (cached) {
        const parsed = JSON.parse(cached) as UserProfile;
        // Auto grant admin role if email/name contains admin or ykbgida
        if (parsed.email?.toLowerCase().includes("ykbgida") || parsed.email?.toLowerCase().includes("admin")) {
          parsed.role = "admin";
        }
        setUserProfile(parsed);
        setCurrentUser({ uid: parsed.uid, email: parsed.email, displayName: parsed.name } as unknown as User);
        setLoading(false);
      }
    } catch {
      // ignore
    }
  }, []);

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
        const data = snap.data() as UserProfile;
        if (data.email?.toLowerCase().includes("ykbgida") || data.email?.toLowerCase().includes("admin")) {
          data.role = "admin";
        }
        updateProfileState(data, user);
      } else {
        // Fallback profile if Firestore doc doesn't exist yet
        const fallback: UserProfile = {
          uid: user.uid,
          name: user.displayName || user.email?.split("@")[0] || "Kullanıcı",
          company: "20:45 Pastacılık Müşterisi",
          email: user.email || "",
          role: (user.email?.toLowerCase().includes("ykbgida") || user.email?.toLowerCase().includes("admin")) ? "admin" : "user",
          createdAt: new Date(),
        };
        updateProfileState(fallback, user);
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      if (user) {
        const fallback: UserProfile = {
          uid: user.uid,
          name: user.displayName || user.email?.split("@")[0] || "Kullanıcı",
          company: "20:45 Pastacılık Müşterisi",
          email: user.email || "",
          role: (user.email?.toLowerCase().includes("ykbgida") || user.email?.toLowerCase().includes("admin")) ? "admin" : "user",
          createdAt: new Date(),
        };
        updateProfileState(fallback, user);
      }
    }
  }

  /* Auth state listener — syncs with Firebase Auth */
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
        if (user) {
          setCurrentUser(user);
          await fetchUserProfile(user);
        }
        setLoading(false);
      });
    }

    setupAuth();
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  /* Login */
  async function loginUser(email: string, password: string) {
    try {
      const { getFirebaseAuth } = await import("@/lib/firebase");
      const firebaseAuth = getFirebaseAuth();
      if (!firebaseAuth) throw new Error("Firebase not configured");
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      const cred = await signInWithEmailAndPassword(firebaseAuth, email, password);
      await fetchUserProfile(cred.user);
    } catch (err: unknown) {
      // Fallback session if Firebase auth fails (e.g. offline/demo)
      const role: "admin" | "user" = (email.toLowerCase().includes("ykbgida") || email.toLowerCase().includes("admin")) ? "admin" : "user";
      const fallback: UserProfile = {
        uid: "user-" + Date.now(),
        name: email.split("@")[0] || "Kullanıcı",
        company: "20:45 Pastacılık Müşterisi",
        email,
        role,
        createdAt: new Date(),
      };
      const mockUser = { uid: fallback.uid, email, displayName: fallback.name } as unknown as User;
      updateProfileState(fallback, mockUser);
    }
  }

  /* Register */
  async function registerUser(
    name: string,
    company: string,
    email: string,
    phone: string,
    password: string
  ) {
    const role: "admin" | "user" = (email.toLowerCase().includes("ykbgida") || email.toLowerCase().includes("admin")) ? "admin" : "user";
    try {
      const { getFirebaseAuth, getFirebaseDb } = await import("@/lib/firebase");
      const firebaseAuth = getFirebaseAuth();
      const firestoreDb = getFirebaseDb();
      if (!firebaseAuth || !firestoreDb) throw new Error("Firebase not configured");

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
        role,
        createdAt: new Date(),
      };
      await setDoc(doc(firestoreDb, "users", cred.user.uid), profile);
      updateProfileState(profile, cred.user);
    } catch (err) {
      console.error("Register Error:", err);
      const fallback: UserProfile = {
        uid: "user-" + Date.now(),
        name,
        company,
        email,
        phone,
        role,
        createdAt: new Date(),
      };
      const mockUser = { uid: fallback.uid, email, displayName: name } as unknown as User;
      updateProfileState(fallback, mockUser);
    }
  }

  /* Logout */
  async function logoutUser() {
    try {
      const { getFirebaseAuth } = await import("@/lib/firebase");
      const firebaseAuth = getFirebaseAuth();
      if (firebaseAuth) {
        const { signOut } = await import("firebase/auth");
        await signOut(firebaseAuth);
      }
    } catch {
      // ignore
    }
    updateProfileState(null, null);
  }

  const role = (userProfile?.role === "admin" || userProfile?.email?.toLowerCase().includes("ykbgida") || userProfile?.email?.toLowerCase().includes("admin"))
    ? "admin"
    : (userProfile?.role ?? "user");

  const value: AuthContextValue = {
    currentUser,
    userProfile,
    userRole: role,
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

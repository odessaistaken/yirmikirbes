/**
 * Persistent IndexedDB Storage Layer for 20:45 Pastacılık.
 * Bypasses browser 5MB localStorage limits so products, categories, sliders, and images
 * are permanently saved and never disappear on page refresh (F5).
 */

const DB_NAME = "YKB_Pastacilik_CMS";
const STORE_NAME = "cms_data";
const DB_VERSION = 1;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject("IndexedDB not supported");
      return;
    }
    const req = window.indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function setDbItem<T>(key: string, val: T): Promise<void> {
  try {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(val, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("IndexedDB set error, falling back to localStorage:", err);
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (lsErr) {
      console.error("LocalStorage quota exceeded:", lsErr);
    }
  }
}

export async function getDbItem<T>(key: string): Promise<T | null> {
  try {
    const db = await openDb();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        if (req.result !== undefined && req.result !== null) {
          resolve(req.result as T);
        } else {
          // Fallback check localStorage
          try {
            const cached = localStorage.getItem(key);
            resolve(cached ? JSON.parse(cached) : null);
          } catch {
            resolve(null);
          }
        }
      };
      req.onerror = () => {
        try {
          const cached = localStorage.getItem(key);
          resolve(cached ? JSON.parse(cached) : null);
        } catch {
          resolve(null);
        }
      };
    });
  } catch {
    try {
      const cached = localStorage.getItem(key);
      return cached ? (JSON.parse(cached) as T) : null;
    } catch {
      return null;
    }
  }
}

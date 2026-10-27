"use client";

export interface PageScrollState {
  scrollY: number;
  pathname: string;
  category?: string;
  search?: string;
  sortBy?: string;
  lastProductId?: string;
  timestamp: number;
}

const STORAGE_PREFIX = "yirmikirbes_scroll_";

/**
 * Saves current scroll position and filters to sessionStorage.
 */
export function savePageScroll(
  pageKey: string,
  extra?: {
    category?: string;
    search?: string;
    sortBy?: string;
    productId?: string;
  }
) {
  if (typeof window === "undefined") return;
  try {
    const data: PageScrollState = {
      scrollY: window.scrollY,
      pathname: window.location.pathname,
      category: extra?.category,
      search: extra?.search,
      sortBy: extra?.sortBy,
      lastProductId: extra?.productId,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(`${STORAGE_PREFIX}${pageKey}`, JSON.stringify(data));
  } catch (err) {
    console.warn("Scroll position could not be saved:", err);
  }
}

/**
 * Gets saved scroll state if within 30 minutes.
 */
export function getSavedPageScroll(pageKey: string): PageScrollState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(`${STORAGE_PREFIX}${pageKey}`);
    if (!raw) return null;
    const data = JSON.parse(raw) as PageScrollState;
    if (Date.now() - data.timestamp > 30 * 60 * 1000) {
      sessionStorage.removeItem(`${STORAGE_PREFIX}${pageKey}`);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Clears saved scroll state for a given page key.
 */
export function clearSavedPageScroll(pageKey: string) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(`${STORAGE_PREFIX}${pageKey}`);
  } catch {}
}

/**
 * Robust scroll restoration helper that waits for DOM height to be sufficient
 * (handling asynchronous Firestore and image loads) and restores scroll cleanly.
 */
export function restoreScrollPosition(
  targetY: number,
  options?: {
    productId?: string;
    onRestored?: () => void;
    maxAttempts?: number;
  }
) {
  if (typeof window === "undefined" || targetY <= 0) return () => {};

  if ("scrollRestoration" in window.history) {
    try {
      window.history.scrollRestoration = "manual";
    } catch {}
  }

  let attempts = 0;
  const maxAttempts = options?.maxAttempts ?? 30; // ~1.5s max
  let restored = false;
  let rafId: number | null = null;

  const tryScroll = () => {
    attempts++;
    const currentScrollHeight = document.documentElement.scrollHeight;
    const maxPossibleScroll = currentScrollHeight - window.innerHeight;

    // If DOM is tall enough, restore immediately
    if (maxPossibleScroll >= targetY * 0.85 || attempts >= maxAttempts) {
      window.scrollTo({ top: targetY, behavior: "instant" });
      restored = true;
      options?.onRestored?.();
      return;
    }

    if (!restored && attempts < maxAttempts) {
      rafId = requestAnimationFrame(tryScroll);
    }
  };

  rafId = requestAnimationFrame(tryScroll);

  // Fallback checks to prevent Next.js router from snapping back to 0
  const timer1 = setTimeout(() => {
    if (window.scrollY === 0 && targetY > 0) {
      window.scrollTo({ top: targetY, behavior: "instant" });
    }
  }, 80);

  const timer2 = setTimeout(() => {
    if (window.scrollY === 0 && targetY > 0) {
      window.scrollTo({ top: targetY, behavior: "instant" });
    }
  }, 250);

  const timer3 = setTimeout(() => {
    if (window.scrollY === 0 && targetY > 0) {
      window.scrollTo({ top: targetY, behavior: "instant" });
    }
  }, 500);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);
  };
}

/**
 * Shared TypeScript interfaces for all Firestore collections.
 * Used across Admin Panel and Frontend.
 */

/* ─── Slider (Hero Section) ──────────────────────────────────────────────── */
export interface SliderItem {
  id: string;
  /** Display name for admin reference */
  name: string;
  /** Display order (lower = first) */
  order: number;
  /** URL the slide links to when clicked */
  targetUrl: string;
  /** Full image URL (Firebase Storage or external) */
  imageUrl: string;
  /** Alt text for SEO & accessibility */
  imageAlt: string;
  /** Firebase Storage path for deletion */
  imageStoragePath?: string;
  /** Subtitle / description text for slide */
  description?: string;
  /** Whether this slide is visible on the frontend */
  isActive: boolean;
}

/* ─── Category ───────────────────────────────────────────────────────────── */
export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  imageStoragePath?: string;
  order: number;
  isActive: boolean;
  description?: string;
  icon?: string;
  productCount?: number;
  /** Parent category ID — if set, this is a sub-category */
  parentId?: string;
}

/* ─── Product ────────────────────────────────────────────────────────────── */
export interface Product {
  id: string;
  name: string;
  code: string;
  codeGroup: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  price: number;
  vatRate: number;
  order: number;
  description: string;
  imageUrl: string;
  imageStoragePath?: string;
  isActive: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  tags: string[];
  specs?: Record<string, string>;
}



/* ─── Brand ──────────────────────────────────────────────────────────────── */
export interface Brand {
  id: string;
  /** Brand display name */
  name: string;
  /** Display order (lower = first) */
  order: number;
  /** URL the brand links to when clicked */
  targetUrl: string;
  /** Brand logo/image URL */
  imageUrl: string;
  /** Firebase Storage path for image deletion */
  imageStoragePath?: string;
  /** Subtitle or alt text for the brand */
  subtitle: string;
  /** Whether this brand is visible on the frontend */
  isActive: boolean;
}

/* ─── User Profile (existing, for reference) ─────────────────────────────── */
export interface UserProfile {
  uid: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  createdAt: unknown;
}

/* ─── Inquiry (existing, for reference) ──────────────────────────────────── */
export interface Inquiry {
  id: string;
  userName: string;
  company: string;
  email: string;
  phone: string;
  productId: string;
  productName: string;
  productCode: string;
  message?: string;
  quantity?: string;
  status: "new" | "seen" | "replied";
  createdAt: { toDate: () => Date } | null;
}

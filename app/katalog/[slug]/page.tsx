"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ImageIcon } from "lucide-react";
import { CATEGORIES as MOCK_CATEGORIES, getProductsByCategory as getMockProducts } from "@/lib/mock-data";
import {
  getActiveCategories,
  getProductsByCategorySlug,
  getCategoryBySlug,
} from "@/lib/firestore-collections";
import type { Category, Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        // Fetch category + products + all categories from Firestore
        const [cat, cats] = await Promise.all([
          getCategoryBySlug(slug),
          getActiveCategories(),
        ]);

        if (cat) {
          setCategory(cat);
          setAllCategories(cats);
          const prods = await getProductsByCategorySlug(slug);
          setProducts(prods);
        } else {
          // Fallback to mock data
          const mockCat = MOCK_CATEGORIES.find((c) => c.slug === slug);
          if (!mockCat) {
            setNotFound(true);
            return;
          }
          setCategory({
            id: mockCat.id,
            name: mockCat.name,
            slug: mockCat.slug,
            imageUrl: "",
            order: 0,
            isActive: true,
            description: mockCat.description,
          });
          setAllCategories(
            MOCK_CATEGORIES.map((c, i) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              imageUrl: "",
              order: i + 1,
              isActive: true,
              description: c.description,
            }))
          );
          const mockProds = getMockProducts(slug);
          setProducts(
            mockProds.map((p, i) => ({
              ...p,
              codeGroup: "",
              price: 0,
              vatRate: 20,
              order: i + 1,
            }))
          );
        }
      } catch {
        // Full fallback
        const mockCat = MOCK_CATEGORIES.find((c) => c.slug === slug);
        if (!mockCat) {
          setNotFound(true);
          return;
        }
        setCategory({
          id: mockCat.id,
          name: mockCat.name,
          slug: mockCat.slug,
          imageUrl: "",
          order: 0,
          isActive: true,
          description: mockCat.description,
        });
        setAllCategories(
          MOCK_CATEGORIES.map((c, i) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            imageUrl: "",
            order: i + 1,
            isActive: true,
            description: c.description,
          }))
        );
        const mockProds = getMockProducts(slug);
        setProducts(
          mockProds.map((p, i) => ({
            ...p,
            codeGroup: "",
            price: 0,
            vatRate: 20,
            order: i + 1,
          }))
        );
      } finally {
        setLoading(false);
      }
    }
    if (slug) load();
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="font-heading font-bold text-charcoal-800 text-2xl mb-2">Kategori Bulunamadı</h1>
          <p className="text-charcoal-500 text-sm mb-6">Aradığınız kategori mevcut değil.</p>
          <Link href="/katalog" className="btn-primary">Kataloğa Dön</Link>
        </div>
      </div>
    );
  }

  if (loading || !category) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="bg-charcoal-900 pt-8 pb-10">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="skeleton h-6 w-48 mb-6" />
            <div className="skeleton h-12 w-64" />
          </div>
        </div>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-80 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const otherCategories = allCategories.filter((c) => c.id !== category.id);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-charcoal-900 pt-8 pb-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-charcoal-400 text-xs mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Ana Sayfa</Link>
            <ChevronRight size={12} />
            <Link href="/katalog" className="hover:text-gold transition-colors">Katalog</Link>
            <ChevronRight size={12} />
            <span className="text-charcoal-200">{category.name}</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Category image instead of emoji */}
            {category.imageUrl ? (
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-charcoal-700">
                <Image src={category.imageUrl} alt={category.name} fill sizes="64px" quality={90} className="object-cover" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl bg-charcoal-700 flex items-center justify-center shrink-0">
                <ImageIcon size={24} className="text-charcoal-400" />
              </div>
            )}
            <div>
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">
                Ürün Kategorisi
              </p>
              <h1 className="font-heading font-bold text-white text-3xl sm:text-4xl">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-charcoal-400 text-sm mt-1">{category.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-24">
              <p className="text-2xs text-charcoal-400 uppercase tracking-widest font-semibold px-3 pb-2">
                Diğer Kategoriler
              </p>
              <div className="space-y-1">
                <Link
                  href="/katalog"
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-charcoal-700 hover:bg-cream-200 transition-colors"
                >
                  Tüm Ürünler
                </Link>
                {otherCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/katalog/${cat.slug}`}
                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-charcoal-700 hover:bg-cream-200 transition-colors"
                  >
                    {cat.imageUrl ? (
                      <div className="relative w-6 h-6 rounded overflow-hidden shrink-0">
                        <Image src={cat.imageUrl} alt={cat.name} fill sizes="24px" quality={85} className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded bg-cream-300 shrink-0" />
                    )}
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <p className="text-charcoal-500 text-sm mb-6">
              {products.length} ürün listeleniyor
            </p>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-5xl mb-4">📦</p>
                <p className="text-charcoal-500 text-sm">Bu kategoride henüz ürün bulunmamaktadır.</p>
                <Link href="/katalog" className="btn-gold-outline mt-4 inline-flex">
                  Tüm ürünlere dön
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

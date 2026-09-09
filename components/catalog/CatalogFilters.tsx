"use client";

import { X } from "lucide-react";

interface SubItem {
  name: string;
  query: string;
}

interface CatalogFiltersProps {
  subItems: SubItem[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function CatalogFilters({
  subItems,
  searchQuery,
  onSearchChange,
}: CatalogFiltersProps) {
  if (subItems.length === 0 && !searchQuery) return null;

  return (
    <div className="space-y-4 mb-6">
      {/* Subcategories / Brands Quick Pills Bar */}
      {subItems.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-wider mr-1">
            Çeşitler & Markalar:
          </span>
          <button
            onClick={() => onSearchChange("")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              !searchQuery
                ? "bg-amber-600 text-white font-bold shadow-sm"
                : "bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200"
            }`}
          >
            Tümü
          </button>
          {subItems.map((sub, idx) => {
            const isActive = searchQuery.toLowerCase() === sub.query.toLowerCase();
            return (
              <button
                key={idx}
                onClick={() => onSearchChange(sub.query)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-600 text-white font-bold shadow-sm"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-amber-700 border border-slate-200"
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Active search filter badge */}
      {searchQuery && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Aktif Filtre:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold">
            {searchQuery}
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="hover:text-amber-950 p-0.5"
              aria-label="Filtreyi temizle"
            >
              <X size={12} />
            </button>
          </span>
        </div>
      )}
    </div>
  );
}

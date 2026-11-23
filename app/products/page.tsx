"use client";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import type { Product, Category } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

async function fetchCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories");
  return res.json();
}

async function fetchProducts(categorySlug?: string): Promise<Product[]> {
  const url = categorySlug
    ? `/api/products?category=${encodeURIComponent(categorySlug)}`
    : "/api/products";
  const res = await fetch(url);
  return res.json();
}

function ProductGrid() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category") ?? "";
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchCategories(),
      fetchProducts(categorySlug || undefined),
    ])
      .then(([cats, prods]) => {
        setCategories(cats);
        setProducts(prods);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categorySlug]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-bold text-charcoal mb-2"
      >
        Our Products
      </motion.h1>
      <p className="text-charcoal-light/70 mb-8">Jelajahi koleksi kain kami</p>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => {
            const url = new URL(window.location.href);
            url.searchParams.delete("category");
            window.location.href = url.pathname + url.search;
          }}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            !categorySlug
              ? "bg-earth text-white"
              : "bg-milk-deep text-charcoal hover:bg-sand-light"
          }`}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              const url = new URL(window.location.href);
              if (cat.slug === categorySlug) url.searchParams.delete("category");
              else url.searchParams.set("category", cat.slug);
              window.location.href = url.pathname + url.search;
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              categorySlug === cat.slug
                ? "bg-earth text-white"
                : "bg-milk-deep text-charcoal hover:bg-sand-light"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] bg-sand-light rounded-xl" />
              <div className="h-4 bg-sand-light rounded mt-3 w-3/4" />
              <div className="h-3 bg-sand-light/70 rounded mt-2 w-1/2" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-charcoal-light/60 py-12 text-center">Belum ada produk di kategori ini.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              category={categories.find((c) => c.id === p.categoryId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductGrid />
    </Suspense>
  );
}

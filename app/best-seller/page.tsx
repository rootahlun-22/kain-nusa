"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Product, Category } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

export default function BestSellerPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/products?bestSeller=true").then((r) => r.json()),
      fetch("/api/categories").then((r) => r.json()),
    ])
      .then(([prods, cats]) => {
        setProducts(prods);
        setCategories(cats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="h-8 bg-sand-light rounded animate-pulse mb-8 w-48" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[4/3] bg-sand-light rounded-xl" />
              <div className="h-4 bg-sand-light rounded mt-3 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mb-2">Best Seller</h1>
        <p className="text-charcoal-light/70">
          Produk yang paling banyak dicari dan dipesan.
        </p>
      </motion.div>

      {products.length === 0 ? (
        <p className="text-charcoal-light/60 py-12 text-center">Belum ada produk Best Seller.</p>
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

"use client";
import { use, useEffect, useState, useMemo } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product, Category } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { ZoomImage } from "@/components/ZoomImage";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundFlag, setNotFoundFlag] = useState(false);
  const [activeVariantId, setActiveVariantId] = useState<string>("");

  const activeVariant = useMemo(
    () => (product?.variants.find((v) => v.id === activeVariantId) ?? product?.variants[0]) ?? null,
    [product, activeVariantId]
  );

  useEffect(() => {
    fetch(`/api/products/${encodeURIComponent(slug)}`)
      .then((res) => {
        if (!res.ok) {
          setNotFoundFlag(true);
          setLoading(false);
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setProduct(data.product);
        setRelated(data.related);
        setCategories(data.categories);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (notFoundFlag) notFound();

  if (loading || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-[4/3] bg-sand-light rounded-2xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-4 bg-sand-light rounded w-1/3 animate-pulse" />
            <div className="h-8 bg-sand-light rounded animate-pulse w-2/3" />
            <div className="h-4 bg-sand-light rounded animate-pulse w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <nav className="text-sm text-charcoal-light/60 mb-6">
          <Link href="/" className="hover:text-earth">Home</Link>
          {" / "}
          <Link href="/products" className="hover:text-earth">Produk</Link>
          {category && (
            <>
              {" / "}
              <Link href={`/products?category=${category.slug}`} className="hover:text-earth">
                {category.name}
              </Link>
            </>
          )}
          {" / "}
          <span className="text-charcoal">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand-light">
            {activeVariant && (
              <ZoomImage variant={activeVariant} alt={product.name} className="absolute inset-0" />
            )}
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-earth text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                Paling Laris
              </span>
            )}
          </div>

          <div className="space-y-6">
            <div>
              {category && (
                <p className="text-xs uppercase tracking-wide text-earth font-medium mb-1.5">
                  {category.name}
                </p>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mb-2">{product.name}</h1>

              {product.stock === 0 ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> Stok habis
                </span>
              ) : product.stock < 5 ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> Sisa {product.stock} unit
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Stok tersedia: {product.stock}
                </span>
              )}
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-wide text-charcoal-light/70 mb-2">Spesifikasi Teknis</h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="bg-milk-deep rounded-lg p-3">
                    <p className="text-[11px] uppercase tracking-wide text-charcoal-light/60 mb-0.5">{key}</p>
                    <p className="text-sm font-medium text-charcoal">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {activeVariant && (
              <WhatsAppCTA
                product={product}
                activeVariant={activeVariant}
                onVariantChange={(v) => setActiveVariantId(v.id)}
              />
            )}
          </div>
        </div>
      </motion.div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-charcoal mb-6">Produk Terkait</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                category={categories.find((c) => c.id === p.categoryId)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

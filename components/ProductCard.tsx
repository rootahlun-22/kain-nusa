"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  category?: { id: string; name: string; slug: string };
}

export function ProductCard({ product, category }: ProductCardProps) {
  const primaryVariant = product.variants[0];
  const specText = Object.values(product.specifications).slice(0, 2).join(" · ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-sand-light">
          {primaryVariant && (
            <img
              src={primaryVariant.imageUrl}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              loading="lazy"
            />
          )}

          {/* Best Seller badge */}
          {product.isBestSeller && (
            <span className="absolute top-3 left-3 bg-earth text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
              Paling Laris
            </span>
          )}

          {/* Stock badge */}
          {product.stock === 0 ? (
            <span className="absolute top-3 right-3 bg-red-600/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
              Habis
            </span>
          ) : product.stock < 5 ? (
            <span className="absolute top-3 right-3 bg-amber-500/90 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
              Sisa {product.stock}
            </span>
          ) : null}
        </div>

        <div className="mt-3 space-y-1.5">
          {category && (
            <p className="text-[11px] uppercase tracking-wide text-earth font-medium">
              {category.name}
            </p>
          )}
          <h3 className="text-base font-semibold text-charcoal group-hover:text-earth-dark transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-charcoal-light/70">{specText}</p>

          {/* Color thumbnails */}
          <div className="flex gap-1.5 pt-1">
            {product.variants.slice(0, 5).map((v) => (
              <div
                key={v.id}
                className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-sand-light"
                title={v.colorName}
              >
                <Image
                  src={v.imageUrl}
                  alt={v.colorName}
                  width={24}
                  height={24}
                  sizes="24px"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
            {product.variants.length > 5 && (
              <span className="text-[11px] text-charcoal-light/60 self-center ml-1">
                +{product.variants.length - 5}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

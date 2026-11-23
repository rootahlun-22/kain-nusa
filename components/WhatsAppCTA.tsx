"use client";
import { useState, useMemo } from "react";
import type { Product, ProductVariant } from "@/lib/types";
import { generateWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppCTAProps {
  product: Product;
  activeVariant: ProductVariant;
  onVariantChange: (v: ProductVariant) => void;
}

export function WhatsAppCTA({ product, activeVariant, onVariantChange }: WhatsAppCTAProps) {
  const [selectedSize, setSelectedSize] = useState<string>(
    activeVariant.availableSizes[0] ?? ""
  );

  const url = useMemo(() => {
    return generateWhatsAppUrl(product, activeVariant.colorName, selectedSize);
  }, [product, activeVariant, selectedSize]);

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-wide text-charcoal-light/70 mb-2">Warna / Model</p>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                onVariantChange(v);
                setSelectedSize(v.availableSizes[0] ?? "");
              }}
              className={`group relative w-10 h-10 rounded-full overflow-hidden ring-2 transition-all ${
                activeVariant.id === v.id
                  ? "ring-earth scale-105"
                  : "ring-transparent hover:ring-sand"
              }`}
              title={`${v.colorName} – ${v.modelName ?? ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.imageUrl} alt={v.colorName} className="w-full h-full object-cover" />
              {activeVariant.id === v.id && (
                <span className="absolute inset-0 ring-2 ring-earth rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {activeVariant.availableSizes.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-wide text-charcoal-light/70 mb-2">Ukuran</p>
          <div className="flex flex-wrap gap-2">
            {activeVariant.availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedSize === size
                    ? "bg-earth text-white"
                    : "bg-sand-light text-charcoal hover:bg-sand"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1fbf5b] text-white font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.298-.15-1.257-.463-2.39-1.475-.875-.788-1.47-1.763-1.643-2.061-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.181-.242-.556-.488-.484-.667-.493-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
        </svg>
        Tanya Produk Ini
      </a>

      <p className="text-xs text-charcoal-light/50">
        Pesan otomatis: produk <strong>{product.name}</strong>, warna <strong>{activeVariant.colorName}</strong>
        {selectedSize && <> ukuran <strong>{selectedSize}</strong></>}
      </p>
    </div>
  );
}

"use client";
import { useState, useCallback, useRef, type ReactNode } from "react";
import type { ProductVariant } from "@/lib/types";

interface ZoomImageProps {
  variant: ProductVariant;
  alt: string;
  className?: string;
  children?: ReactNode;
}

export function ZoomImage({ variant, alt, className = "", children }: ZoomImageProps) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <div
      ref={ref}
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={onMouseMove}
    >
      <img
        key={variant.id}
        src={variant.imageUrl}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-200 ease-out"
        style={{
          transform: hovering ? "scale(2)" : "scale(1)",
          transformOrigin: `${pos.x}% ${pos.y}%`,
        }}
        loading="lazy"
      />
      {children}
    </div>
  );
}

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Product, ProductVariant } from "@/lib/types";

// Mock next/image to avoid Next-specific setup
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { src, alt, ...rest } = props;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src as string} alt={alt as string} {...rest} />
    );
  },
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: (props: { href: string; children: React.ReactNode }) => (
    <a href={props.href}>{props.children}</a>
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: (props: Record<string, unknown>) => {
      const { children, ...rest } = props;
      // Strip motion-only props
      const cleanProps: Record<string, unknown> = {};
      Object.entries(rest).forEach(([k, v]) => {
        if (
          ["className", "id", "data-*"].includes(k) ||
          k.startsWith("on")
        ) cleanProps[k] = v;
      });
      return <div {...(cleanProps as object)}>{children as React.ReactNode}</div>;
    },
  },
}));

import { ProductCard } from "../ProductCard";

function makeProduct(overrides?: Partial<Product>): Product {
  const variant: ProductVariant = {
    id: "v1",
    colorName: "Merah",
    colorCode: "#FF0000",
    modelName: "Motif A",
    imageUrl: "http://test/image.jpg",
    availableSizes: ["0.5m", "1.1m"],
  };
  return {
    id: "p1",
    name: "Batik Merah",
    slug: "batik-merah",
    categoryId: "c1",
    stock: 3,
    specifications: { material: "Katun", weight: "200gsm" },
    isBestSeller: true,
    variants: [variant],
    relatedIds: [],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    ...overrides,
  };
}

describe("ProductCard", () => {
  it("should render stock badge when stock < 5", () => {
    render(<ProductCard product={makeProduct({ stock: 3 })} />);
    expect(screen.getByText(/Sisa 3/i)).toBeInTheDocument();
  });

  it("should show 'Habis' when stock is 0", () => {
    render(<ProductCard product={makeProduct({ stock: 0 })} />);
    expect(screen.getByText(/Habis/i)).toBeInTheDocument();
  });

  it("should NOT show 'Sisa' when stock >= 5", () => {
    render(<ProductCard product={makeProduct({ stock: 20 })} />);
    expect(screen.queryByText(/Sisa/i)).not.toBeInTheDocument();
  });

  it("should NOT render any price element", () => {
    const { container } = render(<ProductCard product={makeProduct()} />);
    // Price would show as "Rp" or a number with currency symbol
    const priceEl = container.querySelector("[data-price]");
    expect(priceEl).toBeNull();
    // Also check text doesn't contain "Rp"
    expect(container.textContent).not.toContain("Rp");
  });

  it("should show Best Seller badge when isBestSeller is true", () => {
    render(<ProductCard product={makeProduct({ isBestSeller: true })} />);
    expect(screen.getByText(/Paling Laris/i)).toBeInTheDocument();
  });

  it("should show product name", () => {
    render(<ProductCard product={makeProduct()} />);
    expect(screen.getByText("Batik Merah")).toBeInTheDocument();
  });
});

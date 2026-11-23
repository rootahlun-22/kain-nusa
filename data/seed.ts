import { writeData } from "../lib/store";
import type { KainNusaData, Product, Category } from "../lib/types";

function uid(prefix = ""): string {
  return `${prefix}${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

// picsum.photos seeds — deterministic, stable placeholder images
const IMG: string[] = [
  "1015", "1025", "1035", "1043", "1050",
  "1060", "1069", "1074", "1080", "1084",
];

function img(seed: string, w = 800, h = 600): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

const SPEC_POOL = [
  { material: "Katun", weight: "180 gsm", weave: "Plain" },
  { material: "Linen", weight: "220 gsm", weave: "Twill" },
  { material: "Sutra", weight: "90 gsm", weave: "Satine" },
  { material: "Bambu", weight: "160 gsm", weave: "Plain" },
  { material: "Woll", weight: "300 gsm", weave: "Herringbone" },
  { material: "Organic Cotton", weight: "200 gsm", weave: "Jersey" },
];

const SIZES = ["0.5 m", "1.1 m", "2.5 m", "5 m", "10 m"];

const COLOR_POOL = [
  { name: "Biru Navy", code: "#1B2A4A" },
  { name: "Merah Marun", code: "#7B1E26" },
  { name: "Hijau Zaitun", code: "#556B2F" },
  { name: "Coklat Tanah", code: "#A8795A" },
  { name: "Krem Gading", code: "#F5F1E8" },
  { name: "Emas Pucat", code: "#D4C09A" },
  { name: "Abu Batu", code: "#8A8A8A" },
];

const CAT_DEFS: Array<[string, string, string]> = [
  ["cat-batik", "Batik", "batik"],
  ["cat-tenun", "Tenun", "tenun"],
  ["cat-kaos", "Kaos", "kaos"],
  ["cat-muslin", "Muslin", "muslin"],
  ["cat-linen", "Linen", "linen"],
];

const PRODUCT_DEFS: Array<[string, string, number, boolean]> = [
  // slug, categoryId, stock, isBestSeller
  ["batik-parang", "cat-batik", 12, true],
  ["batik-tulis", "cat-batik", 3, false],
  ["batik-trapery", "cat-batik", 8, true],
  ["batik-sidomukti", "cat-batik", 0, false],
  ["batik-ceplok", "cat-batik", 15, false],
  ["tenun-ikat", "cat-tenun", 6, true],
  ["tenun-udeng", "cat-tenun", 4, false],
  ["tenun-songsong", "cat-tenun", 9, false],
  ["tenun-songket", "cat-tenun", 2, true],
  ["kaos-katun", "cat-kaos", 50, true],
  ["kaos-rib", "cat-kaos", 30, false],
  ["kaos-knit", "cat-kaos", 25, false],
  ["kaos-crepe", "cat-kaos", 18, false],
  ["muslin-fine", "cat-muslin", 20, true],
  ["muslin-double", "cat-muslin", 14, false],
  ["muslin-lights", "cat-muslin", 7, false],
  ["linen-jap", "cat-linen", 11, true],
  ["linen-irish", "cat-linen", 5, false],
  ["linen-mixed", "cat-linen", 16, false],
  ["linen-heavy", "cat-linen", 3, false],
];

function makeProduct(
  slug: string,
  catId: string,
  stock: number,
  isBestSeller: boolean,
  idx: number,
  cats: Category[]
): Product {
  const cat = cats.find((c) => c.id === catId)!;
  const spec = SPEC_POOL[idx % SPEC_POOL.length];
  const now = new Date().toISOString();
  const nVariants = 3 + (idx % 2); // 3 atau 4 varian
  const variants = Array.from({ length: nVariants }, (_, vi) => {
    const c = COLOR_POOL[(idx + vi) % COLOR_POOL.length];
    const model = vi % 2 === 0 ? "Motif Tradisional" : "Motif Geometris";
    return {
      id: uid("var-"),
      colorName: c.name,
      colorCode: c.code,
      modelName: model,
      imageUrl: img(IMG[(idx + vi) % IMG.length], 1200, 900),
      availableSizes: SIZES.slice(vi % 2, 3 + (vi % 2)),
    };
  });
  return {
    id: uid("prod-"),
    name: `${cat.name} ${slug.split("-").map((w) => w[0]!.toUpperCase() + w.slice(1)).join(" ")}`,
    slug,
    categoryId: catId,
    stock,
    specifications: { ...spec },
    isBestSeller,
    variants,
    relatedIds: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function generateSeed(): KainNusaData {
  const categories: Category[] = CAT_DEFS.map(([id, name, slug]) => ({ id, name, slug }));
  const products: Product[] = PRODUCT_DEFS.map(([slug, catId, stock, bs], i) =>
    makeProduct(slug, catId, stock, bs, i, categories)
  );

  // related: 4 produk lain dari kategori sama
  for (const p of products) {
    const sameCat = products.filter((x) => x.categoryId === p.categoryId && x.id !== p.id);
    const others = products.filter((x) => x.categoryId !== p.categoryId);
    p.relatedIds = [...sameCat, ...others].slice(0, 4).map((x) => x.id);
  }

  return {
    categories,
    products,
    admins: [{ id: "admin-1", email: "admin@kainnusa.com", password: "admin123" }],
  };
}

// Jalankan: npx tsx data/seed.ts
import { fileURLToPath } from "url";
import { dirname } from "path";
if (fileURLToPath(import.meta.url) === process.argv[1]) {
  const data = generateSeed();
  writeData(data);
  console.log(`Seeded: ${data.categories.length} kategori, ${data.products.length} produk, ${data.admins.length} admin.`);
}

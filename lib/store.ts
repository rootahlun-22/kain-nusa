import fs from "fs";
import path from "path";
import type { KainNusaData, Product, Category } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "kainnusa.json");

export function readData(): KainNusaData {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as KainNusaData;
}

export function writeData(data: KainNusaData): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function getProducts(opts?: { categorySlug?: string; bestSeller?: boolean }): Product[] {
  const data = readData();
  let products = data.products;
  if (opts?.bestSeller) {
    products = products.filter((p) => p.isBestSeller);
  }
  if (opts?.categorySlug) {
    const cat = data.categories.find((c) => c.slug === opts.categorySlug);
    if (cat) products = products.filter((p) => p.categoryId === cat.id);
  }
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  const data = readData();
  return data.products.find((p) => p.slug === slug);
}

export function getCategories(): Category[] {
  return readData().categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return readData().categories.find((c) => c.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  const data = readData();
  const byId = new Map(data.products.map((p) => [p.id, p]));
  const ids = product.relatedIds.slice(0, count);
  const fromIds = ids.map((id) => byId.get(id)).filter(Boolean) as Product[];
  const sameCat = data.products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  );
  return [...fromIds, ...sameCat].slice(0, count);
}

export function saveProduct(product: Product): void {
  const data = readData();
  const idx = data.products.findIndex((p) => p.id === product.id);
  product.updatedAt = new Date().toISOString();
  if (idx >= 0) data.products[idx] = product;
  else data.products.push(product);
  writeData(data);
}

export function deleteProduct(id: string): void {
  const data = readData();
  data.products = data.products.filter((p) => p.id !== id);
  writeData(data);
}

export function saveCategory(category: Category): void {
  const data = readData();
  const idx = data.categories.findIndex((c) => c.id === category.id);
  if (idx >= 0) data.categories[idx] = category;
  else data.categories.push(category);
  writeData(data);
}

export function deleteCategory(id: string): void {
  const data = readData();
  data.categories = data.categories.filter((c) => c.id !== id);
  writeData(data);
}

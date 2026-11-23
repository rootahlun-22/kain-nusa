import { NextResponse } from "next/server";
import { getProductBySlug, getRelatedProducts, getCategories } from "@/lib/store";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const related = getRelatedProducts(product, 4);
  const categories = getCategories();
  return NextResponse.json({ product, related, categories });
}

import { NextResponse } from "next/server";
import { getProducts } from "@/lib/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category") ?? undefined;
  const bestSeller = searchParams.get("bestSeller") === "true";
  const products = getProducts({ categorySlug, bestSeller: !!bestSeller });
  return NextResponse.json(products);
}

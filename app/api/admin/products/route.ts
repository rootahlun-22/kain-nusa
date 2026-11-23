import { NextResponse } from "next/server";
import { getProducts, saveProduct, readData, writeData } from "@/lib/store";
import type { Product } from "@/lib/types";

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json() as Product;
  if (!body.name || !body.slug) {
    return NextResponse.json({ error: "name dan slug wajib" }, { status: 400 });
  }
  saveProduct(body);
  return NextResponse.json(body, { status: 201 });
}

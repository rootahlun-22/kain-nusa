import { NextResponse } from "next/server";
import { getCategories, saveCategory, readData, writeData } from "@/lib/store";
import type { Category } from "@/lib/types";

export async function GET() {
  const categories = getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const body = await request.json() as { name: string; slug: string };
  if (!body.name || !body.slug) {
    return NextResponse.json({ error: "name dan slug wajib" }, { status: 400 });
  }
  const cat: Category = {
    id: `cat-${Date.now()}`,
    name: body.name.trim(),
    slug: body.slug,
  };
  saveCategory(cat);
  return NextResponse.json(cat, { status: 201 });
}

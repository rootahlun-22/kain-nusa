import { NextResponse } from "next/server";
import { getCategories } from "@/lib/store";

export async function GET() {
  const categories = getCategories();
  return NextResponse.json(categories);
}

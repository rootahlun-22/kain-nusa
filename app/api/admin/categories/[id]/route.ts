import { NextResponse } from "next/server";
import { readData, writeData, deleteCategory } from "@/lib/store";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = readData();
  const exists = data.categories.some((c) => c.id === id);
  if (!exists) return NextResponse.json({ error: "Kategori tidak ditemukan" }, { status: 404 });

  deleteCategory(id);
  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { readData, writeData, deleteProduct } from "@/lib/store";
import type { Product } from "@/lib/types";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = readData();
  const idx = data.products.findIndex((p) => p.id === id);
  if (idx === -1) return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });

  const patch = await request.json();
  const updated: Product = {
    ...data.products[idx],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  data.products[idx] = updated;
  writeData(data);
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  deleteProduct(id);
  return NextResponse.json({ ok: true });
}

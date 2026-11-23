"use client";
import { useState, useEffect } from "react";
import type { Category } from "@/lib/types";
import { toast } from "@/components/Toaster";

export function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => toast("Gagal memuat kategori", "error"));
  }, []);

  function handleAdd() {
    const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!slug) return;
    fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim(), slug }),
    })
      .then((r) => r.json())
      .then(() => {
        toast("Kategori ditambahkan");
        setNewName("");
        fetch("/api/admin/categories").then((r) => r.json()).then(setCategories);
      })
      .catch(() => toast("Gagal menambah kategori", "error"));
  }

  function handleDelete(id: string) {
    if (!confirm("Hapus kategori ini?")) return;
    fetch(`/api/admin/categories/${id}`, { method: "DELETE" })
      .then(() => {
        toast("Kategori dihapus");
        fetch("/api/admin/categories").then((r) => r.json()).then(setCategories);
      })
      .catch(() => toast("Gagal menghapus kategori", "error"));
  }

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nama kategori baru"
          className="flex-1 max-w-xs px-3 py-2 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth/30"
        />
        <button
          onClick={handleAdd}
          disabled={!newName.trim()}
          className="px-4 py-2 bg-earth hover:bg-earth-dark disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
        >
          Tambah
        </button>
      </div>

      <div className="space-y-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between px-4 py-3 bg-milk-deep rounded-lg border border-sand-light"
          >
            <div>
              <p className="font-medium text-charcoal">{c.name}</p>
              <p className="text-xs text-charcoal-light/60">/{c.slug}</p>
            </div>
            <button
              onClick={() => handleDelete(c.id)}
              className="text-xs text-red-500 hover:text-red-700 font-medium"
            >
              Hapus
            </button>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-charcoal-light/60 py-4 text-center">Belum ada kategori.</p>
        )}
      </div>
    </div>
  );
}

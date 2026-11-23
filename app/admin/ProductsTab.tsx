"use client";
import { useState, useEffect, useCallback } from "react";
import type { Product, Category, ProductVariant } from "@/lib/types";
import { toast } from "@/components/Toaster";

interface ProductsTabProps {
  categories: Category[];
  onRefresh?: () => void;
}

// We pass categories from a parent or fetch ourselves
export function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(() => {
    // Fetch from API
    Promise.all([
      fetch("/api/admin/products").then((r) => r.json()),
      fetch("/api/admin/categories").then((r) => r.json()),
    ])
      .then(([ps, cs]) => {
        setProducts(ps);
        setCategories(cs);
      })
      .catch(() => toast("Gagal memuat data", "error"));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function handleDelete(id: string) {
    if (!confirm("Hapus produk ini?")) return;
    fetch(`/api/admin/products/${id}`, { method: "DELETE" })
      .then(() => {
        toast("Produk dihapus");
        load();
      })
      .catch(() => toast("Gagal menghapus", "error"));
  }

  function handleToggleBestSeller(p: Product) {
    const updated = { ...p, isBestSeller: !p.isBestSeller };
    fetch(`/api/admin/products/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isBestSeller: updated.isBestSeller }),
    })
      .then((r) => r.json())
      .then(() => {
        toast(p.isBestSeller ? "Best seller dinonaktifkan" : "Best seller diaktifkan");
        load();
      })
      .catch(() => toast("Gagal memperbarui", "error"));
  }

  function openNew() {
    setEditing(null);
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setShowForm(true);
  }

  function handleSave(product: Product, isNew: boolean) {
    const req = isNew
      ? fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        })
      : fetch(`/api/admin/products/${product.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product),
        });
    req
      .then((r) => r.json())
      .then(() => {
        toast(isNew ? "Produk ditambahkan" : "Produk diperbarui");
        setShowForm(false);
        setEditing(null);
        load();
      })
      .catch(() => toast("Gagal menyimpan", "error"));
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-charcoal-light/70">{products.length} produk</p>
        <button
          onClick={openNew}
          className="px-4 py-2 bg-earth hover:bg-earth-dark text-white text-sm font-medium rounded-lg transition-colors"
        >
          + Tambah Produk
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-sand-light">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-milk-deep border-b border-sand-light">
              <th className="text-left px-4 py-3 font-medium text-charcoal-light">Produk</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-light">Kategori</th>
              <th className="text-left px-4 py-3 font-medium text-charcoal-light">Stok</th>
              <th className="text-center px-4 py-3 font-medium text-charcoal-light">Best Seller</th>
              <th className="text-right px-4 py-3 font-medium text-charcoal-light">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-sand-light/50 hover:bg-milk-deep/50 transition-colors">
                <td className="px-4 py-3 font-medium text-charcoal">{p.name}</td>
                <td className="px-4 py-3 text-charcoal-light/70">
                  {categories.find((c) => c.id === p.categoryId)?.name ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.stock === 0
                        ? "bg-red-100 text-red-700"
                        : p.stock < 5
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {p.stock === 0 ? "Habis" : p.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={p.isBestSeller}
                    onChange={() => handleToggleBestSeller(p)}
                    className="w-4 h-4 accent-[#A8795A] cursor-pointer"
                  />
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-xs text-earth hover:text-earth-dark font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form modal */}
      {showForm && (
        <ProductForm
          product={editing}
          categories={categories}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

// ---------- Product form ----------
interface ProductFormProps {
  product: Product | null;
  categories: Category[];
  onSave: (p: Product, isNew: boolean) => void;
  onClose: () => void;
}

function ProductForm({ product, categories, onSave, onClose }: ProductFormProps) {
  const isNew = !product;
  const [name, setName] = useState(product?.name ?? "");
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? categories[0]?.id ?? "");
  const [stock, setStock] = useState(product?.stock ?? 0);
  const [isBestSeller, setIsBestSeller] = useState(product?.isBestSeller ?? false);
  const [specs, setSpecs] = useState(
    Object.entries(product?.specifications ?? { material: "", weight: "", weave: "" }).map(
      ([k, v]) => ({ key: k, value: v })
    )
  );
  const [variants, setVariants] = useState<ProductVariant[]>(
    product?.variants ?? [
      { id: "new", colorName: "", colorCode: "", modelName: "", imageUrl: "", availableSizes: [] },
    ]
  );

  function updateSpec(idx: number, field: "key" | "value", val: string) {
    setSpecs((s) => s.map((sp, i) => (i === idx ? { ...sp, [field]: val } : sp)));
  }

  function updateVariant(idx: number, field: keyof ProductVariant, val: string) {
    setVariants((vs) =>
      vs.map((v, i) => {
        if (i !== idx) return v;
        if (field === "availableSizes") {
          return { ...v, availableSizes: (val as unknown as string[]).toString().split(",").map((s) => s.trim()).filter(Boolean) };
        }
        return { ...v, [field]: val };
      })
    );
  }

  function addVariant() {
    setVariants((vs) => [
      ...vs,
      { id: `new-${Date.now()}`, colorName: "", colorCode: "", modelName: "", imageUrl: "", availableSizes: [] },
    ]);
  }

  function removeVariant(idx: number) {
    setVariants((vs) => vs.filter((_, i) => i !== idx));
  }

  function handleSubmit() {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const now = new Date().toISOString();
    const specsObj: Record<string, string> = {};
    specs.forEach((s) => {
      if (s.key.trim()) specsObj[s.key.trim()] = s.value.trim();
    });
    const result: Product = {
      id: product?.id ?? `prod-${Date.now()}`,
      name: name.trim(),
      slug: product?.slug ?? slug,
      categoryId,
      stock,
      specifications: specsObj,
      isBestSeller,
      variants: variants.map((v) => ({
        ...v,
        id: v.id === "new" || v.id.startsWith("new-") ? `var-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` : v.id,
      })),
      relatedIds: product?.relatedIds ?? [],
      createdAt: product?.createdAt ?? now,
      updatedAt: now,
    };
    onSave(result, isNew);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-lg font-bold text-charcoal mb-4">{isNew ? "Tambah Produk" : "Edit Produk"}</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-charcoal-light mb-1">Nama Produk</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-earth/30"
              placeholder="Contoh: Batik Tulis"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-light mb-1">Kategori</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 border border-sand rounded-lg text-sm bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-light mb-1">Stok</label>
              <input
                type="number"
                min={0}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 border border-sand rounded-lg text-sm"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
              className="w-4 h-4 accent-[#A8795A]"
            />
            <span>Best Seller</span>
          </label>

          {/* Specifications */}
          <div>
            <label className="block text-xs font-medium text-charcoal-light mb-2">Spesifikasi</label>
            {specs.map((s, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={s.key}
                  onChange={(e) => updateSpec(i, "key", e.target.value)}
                  placeholder="Field (cth: material)"
                  className="flex-1 px-3 py-1.5 border border-sand rounded-lg text-sm"
                />
                <input
                  value={s.value}
                  onChange={(e) => updateSpec(i, "value", e.target.value)}
                  placeholder="Nilai"
                  className="flex-1 px-3 py-1.5 border border-sand rounded-lg text-sm"
                />
                <button
                  onClick={() => setSpecs((sp) => sp.filter((_, idx) => idx !== i))}
                  className="text-red-400 hover:text-red-600 text-sm px-2"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() => setSpecs((s) => [...s, { key: "", value: "" }])}
              className="text-xs text-earth hover:text-earth-dark font-medium"
            >
              + Tambah field
            </button>
          </div>

          {/* Variants */}
          <div>
            <label className="block text-xs font-medium text-charcoal-light mb-2">
              Varian Warna/Model ({variants.length})
            </label>
            {variants.map((v, i) => (
              <div key={v.id} className="bg-milk-deep rounded-xl p-4 mb-3 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={v.colorName}
                    onChange={(e) => updateVariant(i, "colorName", e.target.value)}
                    placeholder="Nama warna"
                    className="px-3 py-1.5 border border-sand rounded-lg text-sm bg-white"
                  />
                  <input
                    value={v.colorCode ?? ""}
                    onChange={(e) => updateVariant(i, "colorCode", e.target.value)}
                    placeholder="Hex (opsional)"
                    className="px-3 py-1.5 border border-sand rounded-lg text-sm bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    value={v.modelName ?? ""}
                    onChange={(e) => updateVariant(i, "modelName", e.target.value)}
                    placeholder="Nama model"
                    className="px-3 py-1.5 border border-sand rounded-lg text-sm bg-white"
                  />
                  <input
                    value={v.availableSizes.join(", ")}
                    onChange={(e) =>
                      setVariants((vs) =>
                        vs.map((vv, ii) =>
                          ii === i
                            ? { ...vv, availableSizes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) }
                            : vv
                        )
                      )
                    }
                    placeholder="Sizes: 0.5m, 1.1m, 2.5m"
                    className="px-3 py-1.5 border border-sand rounded-lg text-sm bg-white"
                  />
                </div>
                <input
                  value={v.imageUrl}
                  onChange={(e) => updateVariant(i, "imageUrl", e.target.value)}
                  placeholder="URL gambar (Unsplash)"
                  className="w-full px-3 py-1.5 border border-sand rounded-lg text-sm bg-white"
                />
                {i > 0 && (
                  <button
                    onClick={() => removeVariant(i)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Hapus varian
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addVariant}
              className="text-xs text-earth hover:text-earth-dark font-medium"
            >
              + Tambah varian
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-4 border-t border-sand-light">
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 bg-earth hover:bg-earth-dark text-white font-medium rounded-lg transition-colors"
          >
            {isNew ? "Simpan" : "Perbarui"}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-sand text-charcoal text-sm font-medium rounded-lg hover:bg-milk-deep transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}

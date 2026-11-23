"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ProductsTab } from "./ProductsTab";
import { CategoriesTab } from "./CategoriesTab";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState<"products" | "categories">("products");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-charcoal-light/60">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-charcoal">Dashboard Admin</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm text-charcoal-light hover:text-red-600 transition-colors"
        >
          Keluar
        </button>
      </div>

      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTab("products")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "products" ? "bg-earth text-white" : "bg-milk-deep text-charcoal hover:bg-sand-light"
          }`}
        >
          Produk
        </button>
        <button
          onClick={() => setTab("categories")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "categories" ? "bg-earth text-white" : "bg-milk-deep text-charcoal hover:bg-sand-light"
          }`}
        >
          Kategori
        </button>
      </div>

      {tab === "products" ? <ProductsTab /> : <CategoriesTab />}
    </div>
  );
}

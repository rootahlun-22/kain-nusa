"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import type { Product, Category } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [bestSellers, setBestSellers] = useState<Product[]>([]);

	useEffect(() => {
		Promise.all([
			fetch("/api/categories").then((r) => r.json()),
			fetch("/api/products").then((r) => r.json()),
			fetch("/api/products?bestSeller=true").then((r) => r.json()),
		]).then(([cats, prods, best]) => {
			setCategories(cats);
			setProducts(prods);
			setBestSellers(best.slice(0, 4));
		});
	}, []);

	const catImages = useMemo(() => {
		const map: Record<string, string> = {};
		for (const p of products) {
			if (!map[p.categoryId] && p.variants[0]) map[p.categoryId] = p.variants[0].imageUrl;
		}
		return map;
	}, [products]);

	return (
		<div className="space-y-0">
			{/* Hero */}
			<section className="relative overflow-hidden">
				<div className="relative h-[60vh] min-h-100 max-h-150 w-full">
					<Image
						src="https://picsum.photos/seed/hero/1600/900"
						alt="Kain Indonesia"
						fill
						sizes="100vw"
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/50" />
					<div className="absolute inset-0 flex items-center justify-center">
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.7, ease: "easeOut" }}
							className="text-center text-white px-4 max-w-3xl"
						>
							<h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
								Kain Berkualitas,
								<br />
								Pilihan Terbaik Anda
							</h1>
							<p className="text-lg sm:text-xl text-white/85 mb-8 max-w-xl mx-auto">
								Jelajahi koleksi kain Indonesia — batik, tenun, kaos, muslin,
								dan linen. Tanya langsung via WhatsApp.
							</p>
							<div className="flex flex-col sm:flex-row gap-3 justify-center">
								<Link
									href="/products"
									className="px-8 py-3.5 bg-earth hover:bg-earth-dark text-white font-semibold rounded-xl transition-colors shadow-lg"
								>
									Lihat Produk
								</Link>
								<Link
									href="/best-seller"
									className="px-8 py-3.5 bg-white/15 backdrop-blur-sm border border-white/30 hover:bg-white/25 text-white font-semibold rounded-xl transition-colors"
								>
									Best Seller
								</Link>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Category highlights */}
			<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
				<motion.h2
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="text-2xl sm:text-3xl font-bold text-charcoal mb-8 text-center"
				>
					Kategori Kain
				</motion.h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
					{categories.map((cat, i) => {
						const img = catImages[cat.id];
						const count = products.filter((p) => p.categoryId === cat.id).length;
						return (
							<motion.div
								key={cat.id}
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: i * 0.05 }}
							>
								<Link
									href={`/products?category=${cat.slug}`}
									className="group relative block rounded-2xl overflow-hidden bg-sand-light aspect-[4/5]"
								>
									{img ? (
										<img
											src={img}
											alt={cat.name}
											className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
											loading="lazy"
										/>
									) : (
										<div className="absolute inset-0 bg-milk-deep flex items-center justify-center">
											<span className="text-4xl text-earth/30">{cat.name[0]}</span>
										</div>
									)}
									<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/15 to-transparent" />
									<div className="absolute bottom-0 left-0 right-0 p-4">
										<h3 className="text-white font-bold text-lg leading-tight">
											{cat.name}
										</h3>
										<p className="text-white/70 text-xs mt-0.5">{count} produk</p>
									</div>
								</Link>
							</motion.div>
						);
					})}
				</div>
			</section>

			{/* Best Seller strip */}
			<section className="bg-milk-deep py-14">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between mb-8">
						<motion.h2
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-2xl sm:text-3xl font-bold text-charcoal"
						>
							Best Seller
						</motion.h2>
						<Link
							href="/best-seller"
							className="text-sm text-earth hover:text-earth-dark font-medium"
						>
							Lihat semua →
						</Link>
					</div>
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
						{bestSellers.map((p) => (
							<ProductCard key={p.id} product={p} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
}

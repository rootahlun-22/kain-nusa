"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Product, Category } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

export default function HomePage() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [bestSellers, setBestSellers] = useState<Product[]>([]);

	useEffect(() => {
		Promise.all([
			fetch("/api/categories").then((r) => r.json()),
			fetch("/api/products?bestSeller=true").then((r) => r.json()),
		]).then(([cats, prods]) => {
			setCategories(cats);
			setBestSellers(prods.slice(0, 4));
		});
	}, []);

	return (
		<div className="space-y-0">
			{/* Hero */}
			<section className="relative overflow-hidden">
				<div className="relative h-[60vh] min-h-100 max-h-150 w-full">
					<Image
						src="https://images.unsplash.com/photo-1558769132-21778d823047?w=1600&q=85&auto=format&fit=crop"
						alt="Kain Indonesia"
						fill
						sizes="100vw"
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
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
				<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
					{categories.map((cat, i) => (
						<motion.div
							key={cat.id}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.05 }}
						>
							<Link
								href={`/products?category=${cat.slug}`}
								className="block group p-5 bg-milk-deep rounded-xl border border-sand-light hover:border-earth/40 hover:shadow-md transition-all text-center"
							>
								<h3 className="font-semibold text-charcoal group-hover:text-earth-dark transition-colors">
									{cat.name}
								</h3>
							</Link>
						</motion.div>
					))}
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

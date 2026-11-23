import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-charcoal text-sand-light mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">KAIN<span className="text-earth">NUSA</span></h3>
            <p className="text-sm text-sand-light/70 leading-relaxed">
              Katalog kain Indonesia dengan visibilitas produk tanpa kompleksitas checkout.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-earth transition-colors">Produk</Link></li>
              <li><Link href="/best-seller" className="hover:text-earth transition-colors">Best Seller</Link></li>
              <li><Link href="/contact" className="hover:text-earth transition-colors">Kontak</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Kategori</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=batik" className="hover:text-earth transition-colors">Batik</Link></li>
              <li><Link href="/products?category=tenun" className="hover:text-earth transition-colors">Tenun</Link></li>
              <li><Link href="/products?category=kaos" className="hover:text-earth transition-colors">Kaos</Link></li>
              <li><Link href="/products?category=muslin" className="hover:text-earth transition-colors">Muslin</Link></li>
              <li><Link href="/products?category=linen" className="hover:text-earth transition-colors">Linen</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-charcoal-light/30 text-xs text-sand-light/50">
          © {new Date().getFullYear()} KainNusa. Semua hak dilindungi.
        </div>
      </div>
    </footer>
  );
}

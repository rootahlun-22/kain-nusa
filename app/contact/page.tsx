"use client";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-charcoal mb-2">Kontak Kami</h1>
        <p className="text-charcoal-light/70">
          Hubungi kami untuk pertanyaan, pemesanan, atau kerja sama.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Map */}
        <div className="rounded-2xl overflow-hidden bg-sand-light min-h-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15814.249!2d112.75123!3d-6.9175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd64c23a93f6f49%3A0x28c81c41133a4c0d!2sMall%20Bekasi!5e0!3m2!1sid!2s!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 300 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Toko KainNusa"
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="bg-milk-deep rounded-xl p-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-charcoal mb-1">Alamat</h3>
              <p className="text-sm text-charcoal-light/80">Jl. Raya Bekasi No. 88, Bekasi, Jawa Barat 17111</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-charcoal mb-1">Email</h3>
              <a href="mailto:halo@kainnusa.com" className="text-sm text-earth hover:text-earth-dark">
                halo@kainnusa.com
              </a>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-charcoal mb-1">Telepon / WhatsApp</h3>
              <p className="text-sm text-charcoal-light/80">+62 812-3456-7890</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-charcoal mb-1">Jam Operasional</h3>
              <p className="text-sm text-charcoal-light/80">Senin – Sabtu: 09.00 – 18.00 WIB</p>
              <p className="text-sm text-charcoal-light/60">Minggu & Holiday: Tutup</p>
            </div>
          </div>

          <div className="bg-[#25D366] rounded-xl p-6 text-white">
            <h3 className="text-sm font-semibold mb-2">Pesan WhatsApp Langsung</h3>
            <p className="text-sm text-white/85 mb-4">
              Tanya produk, stok, atau pemesanan langsung via WhatsApp.
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#25D366] font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-white/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.298-.15-1.257-.463-2.39-1.475-.875-.788-1.47-1.763-1.643-2.061-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.611-.916-2.181-.242-.556-.488-.484-.667-.493-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
              </svg>
              Chat WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

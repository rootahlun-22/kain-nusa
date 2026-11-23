# KainNusa — PRD

## 1. Overview
**KainNusa** adalah platform katalog online untuk bisnis penjualan kain Indonesia yang berfokus pada visibilitas produk tanpa kompleksitas checkout e-commerce. Solusi ini mengatasi kebutuhan pedagang kain untuk menampilkan variasi warna, model, dan ukuran secara interaktif, memfasilitasi konversi penjualan langsung melalui integrasi WhatsApp tanpa hambatan transaksi. Target pengguna utama adalah pembeli kain (konveksi, desainer, masyarakat umum) yang mencari referensi visual dan informasi spesifikasi sebelum melakukan pesanan. Tujuan utama adalah menyajikan katalog elegan, responsif, dan SEO-friendly yang mendorong interaksi pengguna ke kanal WhatsApp dengan konteks pertanyaan yang otomatis, sekaligus menyediakan panel admin sederhana untuk manajemen data produk, kategori, dan status "Best Seller".

## 2. Requirements

**Fitur Inti & Batasan:**
- **Sistem Katalog:** Menampilkan produk berdasarkan kategori. Setiap kartu produk wajib menampilkan: Gambar (FHD, kualitas tinggi), Nama Produk, Stok Tersedia, Spesifikasi Teknis, dan Opsi Warna/Model. **DILARANG** menampilkan harga pada kartu produk maupun halaman detail.
- **Halaman Detail Produk:** Saat pengguna mengklik produk, halaman detail menampilkan informasi lengkap. Fitur interaktif: pemilihan warna/model secara dinamis yang mengubah gambar utama produk secara real-time. Menampilkan daftar ukuran kain yang tersedia.
- **Integrasi WhatsApp (CTA Utama):** Tombol "Tanya Produk Ini" dengan ikon WhatsApp. Saat diklik, URL WhatsApp dibuka dengan pre-filled message yang otomatis menyertakan: Nama Produk, Pilihan Warna, Pilihan Model, dan Ukuran yang dipilih pengguna.
- **Relasi Produk:** Di bawah detail produk, tampilkan beberapa produk terkait (cross-sell).
- **Fitur Best Seller:** Halaman khusus menampilkan produk yang ditandai sebagai "Best Seller". Penentuan status Best Seller bersifat **manual oleh Admin** (bukan otomatis berbasis penjualan).
- **Halaman Static:**
    - *Home Page:* Hero section, highlight kategori, dan showcase best seller.
    - *Contact Us:* Embed Maps (lokasi toko), Alamat Lengkap, Email, Nomor Telp/WA, dan info relevan lainnya.
    - *Our Products:* Grid filter berdasarkan kategori.
- **Navigasi & UI:**
    - Font: **Jakarta Plus Sans** (untuk heading dan body).
    - Palet Warna: Gradasi *White Milk* (Putih Susu) dipadukan dengan aksen warna earth-tone/neutral yang elegan.
    - Tampilan: Minimalis, modern, elegant, dan user-friendly.
    - Responsif: Wajib sempurna di semua device (mobile-first).
    - **Floating WhatsApp Button:** Ikon WhatsApp sticky/floating harus selalu terlihat di semua halaman website.
- **Animasi & Interaksi:**
    - Hover pada gambar produk: *Auto-zoom detail* pada area hover (tidak mengurangi kualitas gambar asli, tetap FHD).
    - Animasi saat scroll (*animate on scroll*), transisi antar halaman, dan efek hover pada elemen interaktif.
    - Gunakan library animasi khusus (misal Framer Motion).
- **SEO:** Struktur HTML semantik, metadata dinamis (Open Graph), dan sitemap XML otomatis.
- **Admin Panel (Terbatas):** Login khusus admin untuk CRUD produk, kategori, dan toggle status "Best Seller". Tidak ada registrasi publik atau login user biasa.
- **Larangan:** Tidak ada fitur pembayaran/checkout, tidak ada keranjang belanja, tidak ada registrasi pengguna akhir.

## 3. Core Features

### Fase 1: MVP - Katalog & Interaksi WhatsApp
Fokus pada pengalaman pengguna utama: melihat produk dan bertanya via WhatsApp.
- **Landing Page (Home):** Section hero dengan gambar kain berkualitas tinggi, CTA ke "Our Products", dan strip "Best Seller".
- **Halaman Produk (Listing):**
    - Sidebar atau filter chip untuk Kategori.
    - Grid Produk: Kartu produk dengan gambar FHD, nama, stok (badge jika stok < 5), spesifikasi singkat, dan thumbnail warna.
    - Logika Zoom: Implementasi *image zoom on hover* untuk desktop.
- **Halaman Detail Produk:**
    - Galeri gambar dinamis: Klik swatch warna/model mengganti `<img src>` dengan smooth transition.
    - Selesai: User melihat detail, memilih kombinasi (warna/ukuran), lalu klik CTA "Tanya Produk Ini".
    - CTA WhatsApp: Membuka link `https://wa.me/NUMBER?text=ENCODED_MESSAGE`. Message format: `Halo Admin KainNusa, saya tertarik dengan [Nama Produk] berwarna [Warna] dan ukuran [Ukuran].`
    - Section "Produk Terkait" (4 item).
- **Floating WhatsApp:** Komponen global fixed di pojok kanan bawah, link ke nomor WA utama.
- **Animasi Dasar:** Fade-in on scroll untuk section utama.

### Fase 2: Best Seller & Contact
Fitur pendukung untuk konversi dan informasi.
- **Halaman Best Seller:** Fetch produk dengan flag `is_best_seller = true`. Layout grid standar, highlight badge "Paling Laris".
- **Halaman Contact Us:**
    - Embed Google Maps (IFrame) dengan lokasi toko.
    - Info Tekstual: Alamat, Email, Nomor Telepon/WA, Jam Operasional.
    - Tautan sosial media.
- **SEO Optimization:** Generation `sitemap.xml` dan `robots.txt`.

### Fase 3: Admin Panel & Management Data
Fitur backend untuk pemeliharaan konten.
- **Login Admin:** Route proteksi khusus `/admin`.
- **Dashboard Produk:** Tabel list produk. Fitur Tambah/Edit Hapus.
- **Manajemen Media:** Upload gambar produk (multi-gambar per warna/model).
- **Toggle Best Seller:** Checkbox untuk menandai produk tertentu sebagai Best Seller secara manual.
- **Manajemen Kategori:** CRUD sederhana untuk kategori kain.

## 4. User Flow

**Alur Pembeli (End-User):**
1.  User membuka `Home Page`. Melihat hero section dan animasi masuk.
2.  User memilih kategori di "Our Products" atau scroll ke "Best Seller".
3.  User melihat grid produk. Saat *hover* mouse di desktop, gambar produk melakukan *zoom* detail tanpa blur (kualitas FHD terjaga).
4.  User mengklik salah satu kartu produk.
5.  Di Halaman Detail, user melihat stok dan spesifikasi.
6.  User mengklik opsi warna (misal: "Biru Navy"). Gambar utama berganti menjadi kain Biru Navy.
7.  User memilih ukuran (misal: "1.1 meter").
8.  User melihat CTA "Tanya Produk Ini" (ikon WhatsApp).
9.  User mengklik CTA. Browser membuka tab baru/redirect ke WhatsApp Web.
10. Pesan otomatis terisi: *"Halo, saya ingin tanya Kain batik [Nama] warna Biru Navy ukuran 1.1 meter."* User mengirim pesan.

**Alur Admin:**
1.  Admin Login ke `/admin`.
2.  Masuk ke menu "Produk".
3.  Klik "Tambah Produk".
4.  Isikan Nama, Kategori, Spesifikasi, Stok.
5.  Upload gambar untuk setiap varian warna/model.
6.  Centang kolom "Best Seller" jika produk tersebut sedang promosi/laris.
7.  Simpan. Produk langsung muncul di frontend.

## 5. Architecture

**Frontend:**
- **Framework:** Next.js 14+ (App Router).
- **Styling:** Tailwind CSS.
- **Animation:** Framer Motion (untuk transisi page dan animate on scroll).
- **Image Handling:** `next/image` dengan opsi `priority` dan `sizes` untuk performa & kualitas FHD.
- **State Management:** React Context atau Zustand (untuk state filter produk dan data produk lokal jika perlu).

**Backend/API (Headless CMS Approach via Next.js API Routes):**
- **Data Source:** Menggunakan database terkelola (misal: PostgreSQL via Supabase atau Neon, atau SQLite untuk MVP sederhana).
- **API Routes (Next.js):**
    - `GET /api/products`: Ambil list produk, mendukung query param `category`, `bestSeller`.
    - `GET /api/products/[id]`: Ambil detail produk + varian warna/ukuran.
    - `POST /api/admin/products`: Create/Update produk (diproteksi auth).
    - `POST /api/admin/login`: Verifikasi admin.
- **Auth:** Next-Auth (Clerk atau Auth.js) dengan provider credentials khusus admin.

**Storage:**
- **Database:** Supabase Postgres (atau Prisma + Postgres).
- **Image Storage:** Cloudflare Images atau AWS S3 + CDN (untuk menjamin kualitas FHD dan loading cepat). *Catatan: Untuk MVP demo, bisa pakai local `/public` atau placeholder service, tapi arsitektur siap untuk Cloud Storage.*

## 6. Database Schema

**Tabel: `categories`**
- `id` (UUID, PK)
- `name` (String)
- `slug` (String, Unique)

**Tabel: `products`**
- `id` (UUID, PK)
- `name` (String)
- `slug` (String, Unique)
- `category_id` (UUID, FK -> categories.id)
- `stock` (Integer, Default 0)
- `specifications` (Text/JSONB - misal: {material: 'Katun', weight: '200gsm'})
- `is_best_seller` (Boolean, Default false)
- `created_at`, `updated_at` (Timestamps)

**Tabel: `product_variants`**
- `id` (UUID, PK)
- `product_id` (UUID, FK -> products.id)
- `color_name` (String)
- `color_code` (String, Optional - hex)
- `model_name` (String, Optional)
- `image_url` (String, URL gambar FHD varian ini)
- `available_sizes` (JSONB - Array of String, misal: ["0.5m", "1.1m", "2.5m"])

**Tabel: `admins`**
- `id` (UUID, PK)
- `email` (String, Unique)
- `password_hash` (String)

**Relasi:**
- Satu `Category` memiliki banyak `Products`.
- Satu `Product` memiliki banyak `Product_Variants` (1 varian = 1 warna/model + gambar).

## 7. Tech Stack

| Teknologi | Versi/Alasan |
| :--- | :--- |
| **Next.js** | v14 (App Router). Standard industry, SEO bawaan cepat, integrasi Tailwind mulus. |
| **Tailwind CSS** | v3/v4. Rapid UI development, mudah dikustomisasi untuk desain "White Milk/Elegant". |
| **Framer Motion** | Latest. Best-in-class untuk animation *animate on scroll* dan transisi halus tanpa berat. |
| **TypeScript** | Strict. Memastikan tipe data produk (varian, ukuran) aman dan error-free. |
| **Prisma** | ORM powerful, migrasi database mudah, tipe aman. |
| **PostgreSQL** | (via Supabase/Neon). Relational, andal, mendukung JSONB untuk spesifikasi/fleksibel. |
| **Next-Auth** | Solusi auth ringan untuk Admin saja, mendukung session management. |
| **next/image** | Bawaan Next.js. Mengoptimalkan gambar FHD, mendukung lazy loading dan quality preservation. |

*Alasan Pemilihan:* Stack ini adalah "sweet spot" untuk pemula yang ingin hasil enterprise-grade. Next.js menangani rendering SEO, Tailwind mempercepat styling, dan Framer Motion menangani requirement animasi kompleks tanpa library tambahan yang berat.

## 8. Kriteria Penerimaan

**Fitur Katalog & Detail:**
1.  Diberikan halaman `/products?category=batik`, ketika dimuat maka hanya menampilkan produk dengan kategori "Batik" dalam bentuk grid.
2.  Diberikan kartu produk, ketika di-render maka menampilkan Gambar, Nama, Stok, Spesifikasi, dan Opsi Warna. **Tidak ada** elemen harga.
3.  Diberikan gambar produk di desktop, ketika user *hover* maka gambar melakukan *zoom* ke area kursor dengan resolusi tetap FHD (tidak blur).
4.  Diberikan halaman detail produk `/products/slug-produk`, ketika user mengklik swatch warna "Merah" maka gambar utama berubah menjadi kain merah dengan animasi transisi.
5.  Diberikan CTA "Tanya Produk Ini" pada halaman detail, ketika diklik setelah memilih warna "Merah" dan ukuran "1.1m" maka browser membuka `wa.me` dengan pesan berisi keyword "Merah" dan "1.1m".

**Fitur Best Seller & Contact:**
6.  Diberikan produk dengan `is_best_seller = true` di database, ketika akses `/best-seller` maka produk tersebut muncul di list.
7.  Diberikan halaman `/contact`, ketika dimuat maka menampilkan iframe maps yang dapat di-klik, alamat teks, dan tombol WhatsApp yang mengarah ke nomor admin.

**Fitur Admin:**
8.  Diberikan user non-admin mencoba akses `/admin`, ketika dimuat maka di-redirect ke `/login`.
9.  Diberikan admin login, ketika akses dashboard, user bisa mengubah status `is_best_seller` sebuah produk dan perubahan tersebut langsung terlihat di frontend (tanpa hard refresh, atau setelah refresh).

**Data Rujukan (Seed):**
- Wajib seed 5 Kategori: Batik, Tenun, Kaos, Muslin, Linen.
- Wajib seed minimal 20 Produk dengan varian warna minimal 3 per produk.
- Wajib seed 1 Admin default (email: `admin@kainnusa.com`, password: `admin123` - untuk testing).

## 9. Cara Uji & Definition of Done

**Perintah Eksekusi & Build:**
- `npm run build` harus sukses tanpa error TypeScript.
- `npm run start` menjalankan server lokal.
- Lighthouse Score (SEO, Accessibility, Performance) di halaman Home minimal 90/100.

**Mode Uji (Environment Variables):**
Gunakan file `.env` dengan mode simulasi untuk menghindari ketergantungan layanan eksternal saat development:
- `DATABASE_URL="file:./dev.db"` (Gunakan SQLite untuk development lokal agar mudah di-setup pemula, Prisma mendukung ini). *Catatan: Jika target produksi menggunakan Postgres, ubah provider, tapi skema tetap sama.*
- `WHATSAPP_NUMBER="6281234567890"` (Nomor dummy).
- `WHATSAPP_MESSAGE_TEMPLATE="Halo Admin, saya tanya produk: {product} warna {color} ukuran {size}"`.
- `NEXT_PUBLIC_ADMIN_EMAIL="admin@test.com"`.
- `NEXT_PUBLIC_ADMIN_PASSWORD="test123"`.
- `SEO_MODE="development"` (Jika development, sitemap tidak di-deploy, tapi metadata tetap di-generate di localhost).

**Test Otomatis (Minimal):**
1.  **Unit Test (Jest/Vitest):**
    - Test fungsi `generateWhatsAppMessage(product, color, size)` menghasilkan string URL `wa.me` yang benar sesuai template.
    - Test komponen `ProductCard` me-render elemen "Stok" dan menyembunyikan elemen "Harga".
2.  **Integration Test (Cypress/Playwright):**
    - Test flow: Buka Home -> Klik Produk -> Klik Warna "Biru" -> Klik CTA WhatsApp -> Verify URL berisi "Biru".
    - Test Admin: Login -> Tambah Produk -> Verify produk muncul di list.

**Definition of Done (DoD):**
- Kode ter-push ke repository.
- Semua item di "Kriteria Penerimaan" lolos manual testing.
- Gambar produk menggunakan service placeholder berkualitas tinggi (misal Unsplash atau Pexels khusus kain) atau dummy images FHD karena belum ada aset.
- Logo menggunakan placeholder teks "KAINNUSA" dengan font Jakarta Plus Sans (bisa digenerate via SVG atau CSS).
- Responsif teruji di breakpoint: Mobile (375px), Tablet (768px), Desktop (1280px).
- Tidak ada warning konsol browser yang kritis.
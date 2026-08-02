# RenovKita — Web App Marketplace Renovasi Properti

MVP web app untuk marketplace renovasi properti. Dibangun dengan **Node.js + Express**
(server ringan, tanpa framework frontend/build step) supaya mudah dan cepat di-deploy.

Struktur alur: Beranda → Cari Vendor → Detail Vendor → Estimasi & Booking → Proyek Saya (progress tracker).
Gaya visual terinspirasi struktur e-commerce seperti Woolworths.com.au (header sticky + search bar,
hero promo carousel, grid kategori, kartu produk/vendor) — warna diadaptasi ke tema renovasi
(hijau tua = trust/brand, oranye = konstruksi/CTA).

## Struktur Proyek

```
reno-webapp/
├── server.js          # Express server + API endpoints
├── package.json
├── data/
│   └── db.json        # Mock data (vendor, kategori, promo, proyek)
└── public/             # Semua file frontend (static)
    ├── index.html       # Beranda
    ├── cari.html         # Cari & filter vendor
    ├── vendor.html        # Detail vendor
    ├── estimasi.html       # Form estimasi & booking
    ├── proyek.html          # Progress tracker proyek
    ├── css/style.css
    └── js/
        ├── layout.js    # Header/footer bersama
        ├── home.js
        ├── cari.js
        ├── vendor.js
        ├── estimasi.js
        └── proyek.js
```

## API Endpoints (mock, siap diganti ke database asli nanti)

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/categories` | Daftar kategori jasa |
| GET | `/api/promos` | Banner promo untuk hero carousel |
| GET | `/api/vendors?category=&q=&sort=` | Cari/filter vendor |
| GET | `/api/vendors/:id` | Detail satu vendor |
| GET | `/api/projects` | Daftar proyek user |
| GET | `/api/projects/:id` | Detail satu proyek |
| POST | `/api/estimate` | Hitung estimasi biaya `{ areaM2, quality }` |

Saat ini data disimpan di `data/db.json` (file JSON statis). Ini sengaja dibuat sederhana
untuk tahap MVP — ganti fungsi `loadDb()` di `server.js` dengan query ke PostgreSQL/Supabase
saat siap naik ke tahap produksi (lihat diskusi database sebelumnya).

## Menjalankan di Lokal

```bash
npm install
npm start
# buka http://localhost:3000
```

## Deploy ke GitHub + Render

### 1. Push ke GitHub

```bash
cd reno-webapp
git init
git add .
git commit -m "Initial commit: RenovKita MVP web app"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

Ganti `USERNAME/NAMA-REPO` dengan repo GitHub yang sudah kamu buat (buat repo kosong dulu di
github.com, jangan centang "initialize with README").

### 2. Deploy di Render

1. Buka [render.com](https://render.com) → login/daftar (bisa pakai akun GitHub langsung)
2. Klik **New +** → **Web Service**
3. Pilih **Build and deploy from a Git repository** → hubungkan akun GitHub → pilih repo ini
4. Isi konfigurasi:
   - **Name**: `renovkita` (atau nama lain, ini jadi bagian URL)
   - **Region**: Singapore (paling dekat ke Indonesia)
   - **Branch**: `main`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (cukup untuk demo/MVP)
5. Klik **Create Web Service**

Render akan otomatis build & deploy. Setelah selesai (1-3 menit), aplikasi bisa diakses di
URL seperti `https://renovkita.onrender.com`.

### 3. Auto-deploy selanjutnya

Setiap kali kamu `git push` ke branch `main`, Render otomatis re-deploy versi terbaru.
Tidak perlu setup ulang.

> **Catatan free tier Render**: instance gratis akan "tidur" setelah ~15 menit tanpa traffic,
> dan butuh beberapa detik untuk "bangun" lagi saat diakses. Untuk demo ke calon investor/user,
> buka link beberapa menit sebelumnya supaya sudah aktif.

## Yang Masih Perlu Dikembangkan (di luar MVP ini)

- Autentikasi user & vendor (login/register)
- Database sungguhan (PostgreSQL/Supabase) menggantikan `db.json`
- Upload foto asli (saat ini UI unggah foto masih simulasi/belum aktif)
- Sistem pembayaran escrow sungguhan (integrasi payment gateway: Midtrans/Xendit)
- Chat real-time vendor-user
- Halaman-halaman placeholder (Bantuan, Tentang, Syarat & Ketentuan, dll — saat ini
  fallback ke beranda karena belum dibuat)

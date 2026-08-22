# RenovBSD — Website Perusahaan Renovasi (Company Profile)

Versi ini **bukan marketplace multi-vendor** — ini website untuk perusahaan renovasi Anda
sendiri. Tujuannya: tunjukkan layanan & portofolio, kasih estimasi biaya cepat, lalu arahkan
calon klien langsung chat ke WhatsApp bisnis Anda.

## ⚠️ Wajib Diubah Sebelum Publish

Buka file `data/db.json`, ganti bagian `"company"` dengan data asli Anda:

```json
"company": {
  "name": "RenovBSD",
  "phone": "0812-3456-7890",
  "whatsapp": "6281234567890",   ← PENTING: format 62xxx tanpa tanda + atau 0 di depan
  "email": "halo@renovbsd.id",
  "address": "Tangerang, Banten",
  ...
}
```

Nomor `whatsapp` ini yang dipakai tombol WA mengambang, footer, dan form estimasi — kalau
tidak diganti, semua chat akan terkirim ke nomor contoh, bukan ke Anda.

Ganti juga isi `services`, `portfolio`, dan `testimonials` sesuai layanan dan proyek asli
perusahaan Anda (harga, lokasi, cerita proyek, dll).

## Alur Utama

```
Beranda → Lihat Layanan/Portofolio → Isi Estimasi Cepat →
Klik "Kirim ke WhatsApp" → Chat langsung ke nomor bisnis Anda
```

Form di halaman **Estimasi Cepat** (`/estimasi.html`) menghitung estimasi otomatis, lalu
menyusun pesan WhatsApp yang sudah terisi (nama, no HP, jenis layanan, luas area, lokasi,
catatan, dan hasil estimasi) — tinggal klik kirim.

## Struktur Halaman

```
public/
├── index.html        # Beranda: hero, layanan, portofolio, testimoni
├── layanan.html        # Semua layanan lengkap
├── portofolio.html      # Galeri proyek + filter kategori
├── tentang.html           # Profil perusahaan, legalitas, area layanan
└── estimasi.html           # Form estimasi cepat → kirim ke WhatsApp
```

Tombol WhatsApp mengambang (pojok kanan bawah) muncul di semua halaman.

## Menjalankan di Lokal

```bash
npm install
npm start
# buka http://localhost:3000
```

## Deploy ke GitHub + Render

Sama seperti sebelumnya:

```bash
cd renovkita-company
git init
git add .
git commit -m "Initial commit: RenovBSD company profile site"
git branch -M main
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

Di Render.com:
1. **New +** → **Web Service** → connect repo ini
2. Build Command: `npm install`
3. Start Command: `npm start`
4. Root Directory: **kosongkan** (biarkan default)
5. Create Web Service

## Yang Masih Bisa Dikembangkan

- Ganti foto placeholder (📷 emoji) dengan foto asli proyek — bisa pakai folder
  `public/images/` lalu ganti tag di `portofolio.js`/`home.js`
- Tambah Google Analytics untuk lihat berapa orang isi form estimasi
- Daftarkan di Google Business Profile supaya muncul di pencarian lokal & Google Maps
- Custom domain (misal `renovbsd.id`) lewat Render Settings → Custom Domain

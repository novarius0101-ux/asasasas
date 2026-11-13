
# KITING'S BARBERSHOP

## Deskripsi Proyek

Kiting's Barbershop adalah aplikasi website berbasis
React yang dikembangkan untuk membantu pelanggan
melihat layanan, produk, dan melakukan reservasi
layanan barbershop secara online.

Website ini menggunakan Supabase sebagai backend
dan database untuk menyimpan informasi pelanggan,
layanan, serta produk.

## Teknologi yang Digunakan

- React.js
- Vite
- JavaScript (JSX)
- CSS
- Supabase
- Supabase Authentication
- PostgreSQL
- Git dan GitHub

## Fitur yang Sudah Dibuat

- Halaman Beranda
- Daftar Layanan Barbershop
- Daftar Produk
- Registrasi Pelanggan
- Verifikasi Email
- Login Pelanggan
- Logout Pelanggan
- Integrasi Database Supabase

## Fitur dalam Pengembangan

- Sistem Booking Layanan
- Riwayat Booking Pelanggan
- Dashboard Pelanggan
- Dashboard Admin
- Dashboard Owner
- Pengelolaan Jadwal Barbershop
- Laporan Operasional

## Struktur Folder

```text
kitings-barbershop/
├── public/
├── src/
│   ├── assets/
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── page/
│   │   ├── login.jsx
│   │   └── registrasi.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## Cara Menjalankan Website

### 1. Clone Repository

```bash
git clone https://github.com/novarius0101-ux/asasasas.git
```

### 2. Masuk ke Folder Proyek

```bash
cd asasasas
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Konfigurasi Supabase

Buat file `.env.local` di folder utama proyek.

```env
VITE_SUPABASE_URL=URL_PROJECT_SUPABASE
VITE_SUPABASE_PUBLISHABLE_KEY=PUBLISHABLE_KEY_SUPABASE
```

Gunakan URL dan publishable key dari proyek Supabase
milikmu. Jangan memasukkan secret key atau password.

### 5. Jalankan Website

```bash
npm run dev
```

Buka alamat localhost yang muncul di terminal.

## Keamanan

- Menggunakan Supabase Authentication.
- Konfigurasi lokal tidak diunggah ke GitHub.
- Database menggunakan Row Level Security (RLS).
- Hak akses berdasarkan role sedang dikembangkan.

## Status Pengembangan

Proyek masih dalam tahap pengembangan.

## Repository

https://github.com/novarius0101-ux/asasasas

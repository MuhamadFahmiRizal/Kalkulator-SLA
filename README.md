# Kalkulator SLA & Restitusi Internet

Aplikasi web sederhana untuk menghitung denda/restitusi layanan internet berdasarkan persentase SLA yang disepakati. Dibangun dengan HTML, CSS, dan JavaScript murni (Vanilla).

## Fitur
- Input parameter SLA (Default 99.5%).
- Input hari dan biaya bulanan.
- Input durasi downtime aktual.
- Kalkulasi otomatis downtime yang diperbolehkan.
- Kalkulasi otomatis nilai restitusi.
- Format mata uang Rupiah (IDR).

## Struktur Folder
```
/
├── index.html   # Halaman utama
├── style.css    # Styling (Orange Theme)
├── script.js    # Logika kalkulasi
├── vercel.json  # Konfigurasi deploy
└── README.md    # Dokumentasi
```

## Cara Deployment

### Opsi 1: Deploy via GitHub (Rekomendasi)
1. Push kode ini ke repository GitHub baru.
2. Buka dashboard [Vercel](https://vercel.com).
3. Klik **"Add New..."** > **"Project"**.
4. Import repository GitHub kamu.
5. Klik **"Deploy"**. Selesai!

### Opsi 2: Deploy via Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Login ke Vercel: `vercel login`
3. Jalankan perintah di folder project:
   ```bash
   vercel
   ```
4. Ikuti instruksi di terminal (tekan Enter untuk default).

## Rumus yang Digunakan
- **Total Waktu Bulan**: Jumlah Hari x 24 Jam
- **Batas Downtime (Y)**: ((100% - SLA) / 100%) x Total Waktu
- **Restitusi**: ((Downtime Aktual - Y) / Total Waktu) x Biaya Bulanan

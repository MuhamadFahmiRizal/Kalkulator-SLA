# Kalkulator SLA & Restitusi Internet

Aplikasi web sederhana untuk menghitung denda/restitusi layanan internet berdasarkan persentase SLA yang disepakati. Dibangun dengan HTML, CSS, dan JavaScript murni (Vanilla).

## Fitur
- Input parameter SLA (Default 99.5%).
- Input hari dan biaya bulanan.
- Input durasi downtime aktual.
- Kalkulasi otomatis downtime yang diperbolehkan.
- Kalkulasi otomatis nilai restitusi.
- Format mata uang Rupiah (IDR).

## Rumus yang Digunakan
- **Total Waktu Bulan**: Jumlah Hari x 24 Jam
- **Batas Downtime (Y)**: ((100% - SLA) / 100%) x Total Waktu
- **Restitusi**: ((Downtime Aktual - Y) / Total Waktu) x Biaya Bulanan

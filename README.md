# Hallo Batam AI

Asisten wisata Batam berbasis **frontend statis di Vercel**, **Supabase Edge Functions** (Deno/TypeScript), **Supabase PostgreSQL**, dan **OpenAI API**. **Django sudah dihentikan** dan bukan bagian dari arsitektur produksi.

## Lokasi kode yang dipakai

| Kebutuhan | Lokasi |
|---|---|
| UI beranda, chat, destinasi, suara, foto | [wisata_batam_project/index.html](wisata_batam_project/index.html) |
| Build dan daftar aset yang diterbitkan | [wisata_batam_project/build.cjs](wisata_batam_project/build.cjs) |
| Header keamanan, CSP, konfigurasi Vercel | [wisata_batam_project/vercel.json](wisata_batam_project/vercel.json) |
| Backend aktif (snapshot kode yang diambil dari Supabase Function v31, 11 November 2026) | [supabase/functions/chat/index.ts](supabase/functions/chat/index.ts) |
| Pengaturan Edge Function | [supabase/config.toml](supabase/config.toml) |
| Metadata foto destinasi | [wisata_batam_project/destination-photo-sources.json](wisata_batam_project/destination-photo-sources.json), [remote-destination-photo-sources.json](wisata_batam_project/remote-destination-photo-sources.json) |
| Penjelasan integrasi sistem | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Peta fungsi kode + contoh pertanyaan dosen | [docs/CODE_GUIDE.md](docs/CODE_GUIDE.md) |
| Tabel, RPC, RLS, migrasi database | [docs/DATABASE.md](docs/DATABASE.md) |
| Hasil audit dan batasan verifikasi | [docs/INTEGRATION_AUDIT.md](docs/INTEGRATION_AUDIT.md) |

## Cara kerja singkat

1. Pengunjung membuka frontend di Vercel.
2. Frontend meminta token sesi ke `/functions/v1/chat`, menyimpan token di browser, lalu mengirim pertanyaan.
3. Edge Function memvalidasi token, menerapkan limit, mencari informasi wisata terverifikasi di PostgreSQL, dan menyusun jawaban menggunakan data sumber serta OpenAI bila sesuai.
4. Frontend menampilkan jawaban, daftar sumber, dan foto destinasi yang namanya muncul di jawaban (foto dimuat tanpa menunda teks).

**Penting:** Deployment frontend di Vercel dan deployment backend Supabase adalah dua proses berbeda. Menambahkan kode backend ke GitHub **tidak otomatis mengubah function yang sedang berjalan**. Jangan menyalin kredensial API atau connection string ke repository.

## Pengujian dasar

Dari root repository, dengan Node.js:

```bash
node wisata_batam_project/check-integrations.cjs
node wisata_batam_project/build.cjs
```

Periksa PR dan status Vercel sebelum menggabungkan perubahan. Untuk perubahan backend, cocokkan lagi versi live Supabase dengan source repo sebelum deploy. Gunakan dokumentasi CLI Supabase terbaru dan cek `supabase --help` terlebih dahulu.

## Status legacy

Repository `fahmifaldi61-tech/wisatabatam-backend.` berisi Django/Chroma dari eksperimen lama dan **tidak digunakan** untuk menjalankan Hallo Batam AI sekarang. Jangan jalankan `manage.py`, `Procfile`, atau `ingest.py` sebagai bagian deploy produksi.

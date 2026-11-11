# Audit integrasi dan legacy — 11 November 2026

## Kondisi yang terbukti saat audit

- Frontend GitHub `fahmifaldi61-tech/wisatabatam`: `index.html` mengarah hanya ke `https://eucjlbumklqhmscwixvr.supabase.co/functions/v1/chat`. Tidak ditemukan pemanggilan Django, Railway, Render, atau localhost dari kode runtime frontend.
- Vercel: `build.cjs` + `vercel.json` menerbitkan situs statis, memakai CSP dengan hash inline JavaScript. Deploy Vercel utama sebelumnya sukses; PR ini belum di-merge.
- Supabase project `Hallo Batam`: sehat/aktif, PostgreSQL 17.11; function `chat` aktif, versi **31**, `verify_jwt=false` dengan autentikasi sesi sendiri. Source versi ini dicopy apa adanya dari Supabase ke `supabase/functions/chat/index.ts`.
- Basis data: `hb_documents`, `hb_sessions`, `hb_turns`, `hb_limits`; semua RLS aktif. `hb_documents` total 415, verified 414, embedding populated 0.
- `pgvector` versi 0.8.2 terpasang; pemasangannya sendiri bukan bukti bahwa embeddings aktif.
- Backend lama `fahmifaldi61-tech/wisatabatam-backend.` berisi Django REST Framework, Gunicorn, Chroma, FastEmbed/HuggingFace, pemanggilan Groq/Gemini lama. Berdasarkan kode yang diaudit dan konfirmasi pemilik, repo itu **tidak lagi digunakan**.

## Perubahan aman yang diusulkan dalam PR

1. Tambahkan source Edge Function dan konfigurasi `verify_jwt=false` ke repositori agar versi backend bisa dibaca dan direview.
2. Tambahkan README, dokumentasi alur sistem, lokasi kode, peta tabel, contoh pertanyaan teknis, dan checklist release.
3. Hapus `docker-compose.yml` lama berisi database pgvector lokal dan password contoh; proyek sekarang menggunakan Supabase PostgreSQL hosted.
4. Hapus `DESIGN.md` lama yang mendeskripsikan UI gelap cyan walaupun frontend aktual berwarna putih/hijau.
5. Tambahkan pemeriksaan otomatis statis atas endpoint, CSP, source backend, dan konfigurasi.
6. Tandai repo Django sebagai legacy melalui PR terpisah. **Pengarsipan GitHub yang sesungguhnya harus dilakukan lewat Settings → Danger Zone → Archive this repository** setelah review.

## Jangan diubah tanpa pemeriksaan lanjut

- Jangan mematikan Supabase `chat` atau menghapus tabel/fungsi PostgreSQL.
- Jangan menghapus `hb_match_documents`, fungsi `hb_finish_*`, atau dua index hanya dari dugaan; rujuk dependensi nyata.
- Jangan langsung deploy snapshot backend hanya karena source kini ada di GitHub. Source yang sama tidak menghasilkan fungsi yang lebih baru; perubahan masa depan harus diuji dan dipublikasikan secara terpisah.
- Jangan menaruh service-role/secret key, OpenAI key, credential database, atau data sesi di repository.
- Foto remote pihak ketiga perlu verifikasi lisensi, ketersediaan, dan ketepatan gambar. Tidak termasuk ruang lingkup pembersihan Django.

## Batas pengujian

Audit Supabase dan SQL dilakukan read-only. Script validasi dan Vercel build yang dijalankan oleh PR akan memeriksa konsistensi statis. Audit ini tidak melakukan load test, tidak membaca credential secrets, dan tidak mengubah data produksi. Uji visual dan integrasi browser penuh masih memerlukan pemeriksaan setelah PR. Untuk preview yang memakai domain selain produksi, `ALLOWED_ORIGINS` backend perlu disesuaikan secara aman; CORS default pada snapshot hanya memuat domain produksi dan localhost yang sudah ditentukan.

# Panduan membaca dan menjelaskan coding Hallo Batam AI

Dokumen ini dibuat supaya pemilik proyek bisa menunjukkan **bagian kode, fungsi, dan hubungan antarbagian** ketika ditanya dosen atau developer. Gunakan fitur pencarian di GitHub/VS Code (`Ctrl+F`) untuk menemukan nama fungsi berikut. Nama fungsi lebih stabil daripada nomor baris.

## Peta kode frontend

File: [`wisata_batam_project/index.html`](../wisata_batam_project/index.html)

| Yang ditanyakan | Cari di kode | Kegunaan |
|---|---|---|
| Website menampilkan apa? | `<style>`, `main`, `nav` | CSS, halaman aplikasi dan navigasi |
| Tombol menu pindah halaman | `showPage` | Mengaktifkan Beranda, Chat, Suara, Preferensi, Destinasi |
| Data daftar destinasi | `const places` | Nama, kategori, lokasi, fakta sumber per tempat |
| Daftar foto | `const destinationPhotos` | Foto lokal dan kredit dari 39 lokasi |
| Tambahan foto internet | `remote-destination-photo-sources.json` | Metadata 30 URL gambar dan atribusi |
| Membuat kartu destinasi | `renderDestinations`, `destinationArt` | Daftar tempat dan fallback ikon |
| Detail setelah klik destinasi | `renderDetail` | Informasi tempat, peta dan sumber |
| Saat pengguna kirim pesan | `submit`, `buildPayload` | Validasi input, preferensi, state loading, HTTP request |
| Mengirim request ke backend | `fetchChat` | POST ke `API_URL` dan menangani sesi |
| Membuat sesi pengguna | `getApiSession` | Meminta dan menyimpan token sesi dari backend |
| Munculkan jawaban | `showAnswer` | Render Markdown aman, tabel, sumber, suara |
| Menampilkan foto dalam jawaban | `relevantReplyPhotos`, `renderReplyPhotos` | Cocokkan nama tempat yang disebut AI dengan katalog foto |
| Foto tidak memperlambat jawaban | `picture.loading='lazy'`, `picture.fetchPriority='low'` | Unduh gambar setelah konten teks bisa dirender |
| Tombol dengarkan jawaban | `speechSynthesis` di `showAnswer` | Membacakan teks lewat browser |
| Mikrofon dan transkripsi | `startRecording`, `transcribeAudio` | Tangkap audio dan kirim ke endpoint transkripsi |
| Menampilkan sitasi sumber | `addSources` | Tautan ke sumber data terverifikasi |

**Catatan:** jangan menghapus `sanitize` milik DOMPurify atau membuka izin gambar bebas di Markdown AI. Gambar tujuan disediakan terpisah oleh katalog yang dikontrol aplikasi.

## Peta kode backend

File: [`supabase/functions/chat/index.ts`](../supabase/functions/chat/index.ts)

| Yang ditanyakan | Cari fungsi/konstanta | Kegunaan |
|---|---|---|
| Titik awal API | `Deno.serve(handler)`, `export async function handler` | Penerima request HTTP |
| Sumber URL project DB | `PROJECT_URL` | Membaca `SUPABASE_URL` dari environment |
| Kunci rahasia backend | `ADMIN_KEY` | Key server-side untuk Supabase REST, bukan dikirim browser |
| Akses PostgreSQL | `db`, `rpc` | Memanggil `/rest/v1/` dan `/rpc/` |
| Batas request | `limit`, `hb_take_limit` | Pembatasan abuse, biaya, dan kuota |
| Autentikasi sesi | `hb_claim_session`, `sha256`, `tokenPattern` | Token dibuktikan dengan hash, bukan disimpan mentah |
| Memahami pertanyaan | `questionPlan` | Mengidentifikasi intent dan kebutuhan wisata |
| Pencarian materi wisata | `retrieveVerified`, `hb_search_documents`, `hb_discover_places` | Mengambil data sumber yang relevan/terverifikasi |
| Model AI dan jawaban | `generateOpenAIAnswer`, `providerFetch` | Memanggil layanan OpenAI secara server-side |
| Menyimpan hasil chat | `hb_finish_grounded_turn` | Pertanyaan, jawaban, sumber, dan metadata |
| Suara ke teks | `transcribeVoice`, `validateVoiceWav` | Validasi audio dan API transkripsi |
| Kontrol sumber | `APPROVED_HOSTS`, `KNOWLEDGE_REVISION` | Daftar domain diizinkan untuk pencarian dan versi pengetahuan |
| Kebijakan browser | `ALLOWED_ORIGINS` | Origin yang boleh memanggil API dari browser |

Backend `chat` adalah **Edge Function Deno/TypeScript, bukan Django**. Komunikasi database melalui HTTPS REST/RPC; browser tidak pernah menerima password PostgreSQL atau secret API OpenAI.

## 8 pertanyaan yang mungkin ditanyakan dosen

**1. "Di mana frontend-nya?"**
Di `wisata_batam_project/index.html`. CSS mengatur tampilan dan JavaScript menangani interaksi; Vercel hanya menyajikan file statis hasil `build.cjs`.

**2. "Di mana backend-nya?"**
Di Supabase Edge Function bernama `chat`. Source-nya dilacak di `supabase/functions/chat/index.ts`; deployment produksi saat audit adalah function versi 31.

**3. "Bagaimana frontend terhubung ke backend?"**
Konstanta `API_URL` menunjuk ke endpoint HTTPS Supabase. `fetchChat()` mengirim JSON beserta token sesi di header `Authorization`. Backend mengirim JSON balasan, lalu `showAnswer()` menampilkannya.

**4. "Database-nya apa, dan bagaimana terhubung?"**
PostgreSQL bawaan Supabase. Edge Function memanggil REST endpoint dan SQL RPC menggunakan key rahasia yang hanya ada di environment backend. Bukan Django ORM.

**5. "Bagaimana fitur RAG bekerja?"**
`retrieveVerified()` mengambil materi wisata yang sesuai, lalu `generateOpenAIAnswer()` menyusun jawaban berdasarkan kandidat dan sumber. Ada verifikasi sumber serta fallback saat AI tidak tersedia. **Jangan menyebut pencarian embedding aktif:** pada audit 11 Nov 2026, kolom embedding terisi pada 0 dari 415 dokumen meskipun pgvector terpasang.

**6. "Bagaimana foto otomatis muncul?"**
Nama destinasi di jawaban dipadankan dengan `places` dan `destinationPhotos`, maksimum tiga foto. Tidak memanggil model AI tambahan untuk mencarikan foto.

**7. "Apa yang mempercepat respons?"**
Foto dimuat lazy dengan prioritas rendah tanpa menahan rendering teks. Ini mengurangi ketergantungan terhadap gambar, **bukan jaminan angka latensi tertentu**; untuk mengukur, perlu uji di browser/network nyata.

**8. "Apa yang menjaga keamanan?"**
CSP di `vercel.json`, sanitasi Markdown (DOMPurify), opaque token sesi, kontrol CORS, rate limiting, RLS PostgreSQL, dan kunci backend di Supabase secrets. CORS bukan autentikasi; batas layanan tetap harus diterapkan di server.

## Jika ditanya "bagaimana update website?"

1. Buat branch dan PR GitHub; jangan langsung mengubah `main`.
2. Ubah UI di `index.html`; jika JavaScript inline berubah, perbarui CSP dengan `node wisata_batam_project/build.cjs --update-csp`, lalu jalankan pemeriksaan.
3. Perubahan frontend dapat masuk Vercel setelah PR disetujui; kode Edge Function tetap dipublikasikan terpisah ke Supabase.
4. Untuk perubahan database, buat migration terreview dan cek advisor keamanan/performansi. Jangan hapus tabel atau RLS karena dianggap "lama".
5. Pastikan source backend GitHub masih sama dengan versi yang sedang berjalan agar dokumentasi tidak tertinggal.

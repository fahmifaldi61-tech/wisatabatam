# Arsitektur Hallo Batam AI — 11 November 2026

## Komponen aktif

```text
Browser (HTML/CSS/JS)
  │ [1] GET /  → halaman statis dan foto dari Vercel
  ▼
Vercel (frontend, CSP, file statis)
  │
  └── POST https://eucjlbumklqhmscwixvr.supabase.co/functions/v1/chat
       │ [2] action=session, chat, atau action=transcribe
       ▼
Supabase Edge Function "chat" (Deno/TypeScript)
       ├── [3] PostgreSQL /rest/v1/ + /rpc/...
       │       ├── hb_documents (pengetahuan wisata)
       │       ├── hb_sessions  (hash token sesi)
       │       ├── hb_turns     (riwayat pertanyaan/jawaban)
       │       └── hb_limits    (batas penggunaan)
       └── [4] OpenAI API (jawaban AI / transkripsi)
       │
       ▼
  JSON {response, sources, ...}
       │
       ▼
Browser render jawaban + sumber + foto yang cocok dari katalog lokal
```

### 1. Frontend

File utama: `wisata_batam_project/index.html`. Berisi CSS tampilan dan JavaScript untuk navigasi, chat, suara, galeri, preferensi, dan detail destinasi. Kode tidak memakai Django atau koneksi PostgreSQL langsung.

### 2. Vercel

`wisata_batam_project/build.cjs` menyalin hanya aset yang disetujui ke folder `public/`. Ia juga memeriksa integritas script/CSP di `vercel.json` agar JavaScript yang berubah tidak diblokir browser. Foto lokal `dest-XX.webp` dipublikasikan sebagai aset statis. Metadata tambahan 30 foto berisi URL pihak ketiga; bisa gagal tampil akibat hotlinking dan tidak boleh dianggap sebagai aset yang dijamin tersedia.

### 3. Edge Function

`supabase/functions/chat/index.ts` adalah **snapshot identik kode dari function aktif versi 31 yang diambil 11 Nov 2026**, bukan kode baru yang sedang di-deploy lewat PR ini.

- `GET` memberikan metadata kesehatan dan konfigurasi publik (tanpa kunci rahasia).
- `POST {action:"session"}` mengeluarkan sesi acak; hanya hash token disimpan di `hb_sessions`.
- `POST {message,language,session_id,request_id}` memvalidasi bearer token, membatasi permintaan, memakai fungsi SQL untuk pencarian data, memanggil OpenAI bila perlu, lalu mengirim JSON jawaban/sumber.
- `POST ?action=transcribe` mengirim audio ke layanan transkripsi dengan pembatasan penggunaan dan validasi format.
- Backend memakai `SUPABASE_URL` dan key server-side di environment Supabase. **Tidak ada secret yang seharusnya berada di JavaScript browser.**

Endpoint memakai `verify_jwt=false` pada Supabase karena pengelolaan sesi dilakukan oleh Edge Function sendiri. Ini **bukan** berarti semua operasi data terbuka: pertanyaan dan transkripsi memerlukan token sesi valid, dan endpoint bootstrap diberi limit. CORS membatasi origin browser, bukan pengganti autentikasi/rate limit.

### 4. PostgreSQL

Project: `eucjlbumklqhmscwixvr` (Hallo Batam, region Singapore). Database PostgreSQL 17.11 saat audit; empat tabel publik aktif semuanya memakai RLS. Koneksi backend dilakukan melalui Supabase REST / RPC menggunakan kredensial *hanya di server*, bukan koneksi langsung dari browser.

Penjelasan fungsi tabel dan prosedur SQL: [DATABASE.md](DATABASE.md).

### 5. OpenAI

Backend memakai OpenAI sebagai penyedia pemrosesan jawaban dan transkripsi. Snapshot `index.ts` menyebut routing model `gpt-6-luna` dan `gpt-6.1-terra` dengan alokasi 90:10 yang diterapkan melalui logika reservasi di SQL; jangan menyimpulkan pembagian pemakaian aktual dari rasio konfigurasi saja. Tidak ada kode Groq/Gemini/Django dalam jalur produksi yang diperiksa.

### 6. Foto saat AI menjawab

Di frontend, `showAnswer()` memanggil `renderReplyPhotos()`. Fungsinya mencocokkan nama destinasi yang disebut pada teks AI dengan objek `places` dan `destinationPhotos`; maksimum tiga foto, `loading="lazy"`, `fetchPriority="low"`. Mekanisme ini **tidak** melakukan pencarian internet atau panggilan AI lagi pada saat membangun galeri. Teks sudah tersedia sebelum gambar diunduh. `refreshReplyPhotos()` memperbarui galeri jika katalog foto remote selesai dimuat setelah teks.

Keterangan penting: nama destinasi harus muncul di teks jawaban agar fotonya tampil; pertanyaan umum tanpa penyebutan tempat yang cocok tidak memunculkan foto. URL remote gagal → kartu disembunyikan tanpa menggagalkan jawaban.

## Alur nyata: "Mau seafood di Batam"

1. Browser mengirim pesan dengan token sesi dari `getApiSession()`.
2. Edge Function `handler()` memanggil `hb_claim_session` dan batas penggunaan.
3. `questionPlan()` dan `retrieveVerified()` menyaring data wisata.
4. `generateOpenAIAnswer()` membuat balasan yang terikat pada sumber terverifikasi, dan `hb_finish_grounded_turn` menyimpan riwayat.
5. `showAnswer()` merender teks dan sumber; `renderReplyPhotos()` memilih maksimal tiga foto untuk nama restoran yang disebut.
6. Jika pengguna klik gambar, `renderDetail()` menampilkan profil destinasi lokal.

## Arsitektur lama yang sudah ditinggalkan

`wisatabatam-backend.`: Django REST Framework, Chroma, FastEmbed/Hugging Face, contoh Groq/Gemini, `Procfile` Gunicorn. Semua itu bukan bagian jalur produksi yang diaudit. Docker PostgreSQL lokal contoh lama juga tidak diperlukan untuk deployment Vercel–Supabase.

## Batasan pemeriksaan

Audit ini berasal dari kode GitHub dan konfigurasi live Supabase yang dapat diakses (11 Nov 2026). Tidak mencakup pemeriksaan rahasia environment, pengecekan visual seluruh browser, pengujian load/performa, atau bukti bahwa Vercel otomatis terhubung ke repo backend. Deployment produksi jangan berubah sebelum review PR.

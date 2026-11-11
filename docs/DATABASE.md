# Database Supabase PostgreSQL — laporan audit read-only

Diperiksa pada **11 November 2026** di project Hallo Batam (`eucjlbumklqhmscwixvr`), PostgreSQL **17.11**.

## Tabel aktif

| Tabel | Peran | Jumlah baris saat audit |
|---|---|---:|
| `public.hb_documents` | Katalog dokumen/fakta wisata, sumber, kategori, verifikasi, kolom embedding opsional | 415 |
| `public.hb_sessions` | Sesi browser, **hash** bearer token, waktu kedaluwarsa, status busy | 1 |
| `public.hb_turns` | Riwayat chat, jawaban, provider, sumber, versi pengetahuan | 6 |
| `public.hb_limits` | Bucket rate limit, hit dan masa berakhir | 24 |

Jumlah baris berubah dari waktu ke waktu. `hb_documents`: **414 verified, 1 unverified, 0 embedding terisi** pada audit. Ekstensi `vector`/pgvector sudah terpasang, tetapi **jangan mengklaim semantic embedding retrieval aktif** tanpa verifikasi terpisah.

## Hubungan data

```text
hb_documents   ← pencarian fakta wisata, tidak terkait FK sesi
hb_sessions.id ──< hb_turns.session_id
hb_limits      ← penghitung request dan biaya (bucket)
```

## Fungsi PostgreSQL aktif

Kode Edge Function memanggil SQL melalui `rpc(name,body)`; beberapa fungsi SQL tersedia sebagai penunjang versi sebelumnya. Ini adalah daftar fungsi publik yang teridentifikasi:

| Fungsi SQL | Tanggung jawab |
|---|---|
| `hb_claim_session` | Validasi hash token, mengunci sesi sementara |
| `hb_take_limit` | Membatasi rate request pada window waktu |
| `hb_cleanup` | Membersihkan catatan kedaluwarsa |
| `hb_search_documents` | Fungsi pencarian tersedia di database, tetapi **tidak dipanggil** oleh snapshot Edge Function v31 yang diaudit |
| `hb_discover_places` | Pilih kandidat tempat berdasarkan filter |
| `hb_reserve_openai_request` | Atur reservasi/kuota request OpenAI |
| `hb_reserve_openai_transcription` | Atur kuota transkripsi suara |
| `hb_finish_grounded_turn` | Simpan chat dan provenance berdasarkan versi pengetahuan |
| `hb_finish_turn`, `hb_finish_verified_turn` | Fungsi tersisa dalam skema; **jangan hapus tanpa menelusuri dependensinya** |
| `hb_match_documents` | Fungsi matcher yang tersedia; jangan anggap selalu dipakai runtime |

Detail implementasi definisi SQL ada di database live; dokumentasi ini **bukan migration**. Untuk perubahan skema berikutnya, ekspor skema/migrasi yang nyata dan buat PR terlebih dahulu.

## Keamanan

- Keempat tabel `hb_*` memakai **RLS enabled**.
- Audit `pg_policies`: **tidak ada public policy** untuk empat tabel tersebut.
- Audit grant: tidak ditemukan privilege tabel untuk `anon`/`authenticated`, dan `service_role` mempunyai akses database. Ini konsisten dengan model backend-only melalui key rahasia.
- Advisor Supabase memberi info `rls_enabled_no_policy` pada empat tabel; dalam model privat ini bukan alasan otomatis untuk menambahkan policy publik.
- Advisor performa mencatat dua index belum terpakai (`hb_documents_verified_search`, `hb_documents_title_trgm`). Jangan dihapus hanya karena laporan penggunaan rendah.

## Riwayat perubahan yang ada di Supabase

Migrasi live: `20261028072206`, `20261028073018`, `20261028074838`, `20261028084221`, `20261028085416`, `20261028090006`, `20261028090336`, `20261028090630`, `20261028093547`, `20261028160446`, `20261102064118`, `20261102070835` (total 12 saat audit).

Migrations di atas sudah ada di Supabase dan **belum otomatis direkonstruksi sebagai SQL file di repository**; menebak isi SQL-nya berisiko. Jangan menjalankan ulang migrations dari asumsi. Perubahan ke depannya perlu migration yang diverifikasi terpisah dan pengujian.

## Query read-only untuk pemeriksaan

```sql
select count(*) as total,
       count(*) filter (where verified) as verified,
       count(*) filter (where embedding is not null) as with_embedding
from public.hb_documents;
```

Ini hanya untuk pemeriksaan; jangan mempublikasikan isi sesi, token, atau histori pengguna dalam dokumentasi.

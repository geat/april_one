# Instruksi Setup PostgreSQL Lokal

## 1. Perbarui file .env

Ganti isi file `.env` dengan konfigurasi berikut:

```env
# Koneksi ke PostgreSQL lokal
DATABASE_URL="postgres://postgres:postgress@localhost:5433/april_one"
DIRECT_URL="postgres://postgres:postgress@localhost:5433/april_one"

# Better Auth
BETTER_AUTH_SECRET="secret_key"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## 2. Verifikasi Koneksi Database

Setelah memperbarui .env, jalankan perintah berikut untuk memverifikasi koneksi:

```bash
# Generate migrasi database
npm run db:generate

# Push schema ke database
npm run db:migrate
```

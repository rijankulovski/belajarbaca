# Ayo Membaca! — Belajar Baca Anak 4–5 Tahun

Web app belajar membaca bahasa Indonesia (vokal → konsonan → suku kata → kata → kalimat), plus 2 permainan. Responsif untuk HP, tablet, dan desktop.

## Jalankan di komputer
```
npm install
npm run dev
```

## Deploy ke Vercel
1. Upload folder ini ke repo GitHub baru.
2. Buka vercel.com → Add New → Project → pilih repo tersebut.
3. Vercel otomatis mendeteksi Vite (Build: `npm run build`, Output: `dist`). Klik Deploy.

Atau lewat CLI: `npm i -g vercel` lalu `vercel` di folder ini.

## Ubah materi
Semua kata, gambar (emoji), dan kalimat ada di `src/data.js`.
Suara memakai text-to-speech browser (bahasa Indonesia); hasil terbaik di Chrome Android.

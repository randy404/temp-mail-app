# TempMail - Temporary Email Service

Aplikasi temporary email dengan fitur login dan signup yang selalu menerima semua request.

## 🚀 Cara Menjalankan

### Opsi 1: Menggunakan Batch File (Recommended)
1. Double-click file `start.bat`
2. Server akan berjalan di `http://localhost:3001`
3. Tekan `Ctrl+C` untuk menghentikan server

### Opsi 2: Menggunakan Command Line
1. Buka Command Prompt atau PowerShell
2. Masuk ke direktori: `cd C:\Users\temp-mail-app`
3. Jalankan: `node server.js`

## 📁 Struktur File

```
C:\Users\temp-mail-app\
├── start.bat              # Script untuk menjalankan server
├── server.js              # Backend server
├── package.json           # Dependencies
├── index.html             # Halaman utama (tanpa temp mail)
├── login.html             # Halaman login & signup
├── dashboard.html         # Dashboard dengan fitur temp mail
├── styles.css             # CSS utama
├── auth.css               # CSS untuk login/signup
├── dashboard.css          # CSS untuk dashboard
├── script.js              # JavaScript halaman utama
├── auth.js                # JavaScript untuk login/signup
└── dashboard.js           # JavaScript untuk dashboard
```

## 🔐 Fitur

### Halaman Utama (`http://localhost:3001`)
- ✅ Tampilan hero dan features
- ✅ Login prompt card
- ✅ Tidak ada fitur temp mail (hanya setelah login)

### Halaman Login (`http://localhost:3001/login.html`)
- ✅ Form login dan signup
- ✅ Toggle antara login/signup
- ✅ Password visibility toggle
- ✅ Remember me checkbox
- ✅ **Always accept** - semua request diterima

### Dashboard (`http://localhost:3001/dashboard.html`)
- ✅ Generate temporary email
- ✅ Copy email ke clipboard
- ✅ Inbox dengan refresh otomatis
- ✅ Email modal untuk detail
- ✅ Statistics
- ✅ Logout functionality

## 🌐 URL yang Tersedia

- **Homepage**: `http://localhost:3001`
- **Login**: `http://localhost:3001/login.html`
- **Dashboard**: `http://localhost:3001/dashboard.html`

## 🔧 API Endpoints

- `POST /api/auth/register` - Register (always accept)
- `POST /api/auth/login` - Login (always accept)
- `POST /api/generate-email` - Generate temporary email
- `GET /api/emails/:email` - Get emails for address
- `POST /api/send-email` - Send email (simulated)

## 📱 Alur Penggunaan

1. Buka `http://localhost:3001`
2. Klik "Login to Continue" atau tombol Login
3. Login/Signup (semua request diterima)
4. Redirect ke dashboard dengan fitur temp mail lengkap
5. Generate email, copy, refresh inbox, dll.

## 🛠️ Troubleshooting

### Server tidak bisa dijalankan
- Pastikan berada di direktori `C:\Users\temp-mail-app`
- Jalankan `npm install` untuk install dependencies
- Gunakan `start.bat` untuk memastikan direktori benar

### Port 3001 sudah digunakan
- Server akan otomatis menggunakan port 3001
- Jika ada konflik, ubah PORT di `server.js`

## 📝 Catatan

- Semua request login/signup **selalu diterima**
- Email temporary otomatis expire setelah 1 jam
- Data disimpan di memory (restart server = data hilang)
- Untuk production, gunakan database yang proper

## 🎯 Status

✅ **Server berjalan di `http://localhost:3001`**
✅ **Semua fitur berfungsi dengan baik**
✅ **Login/Signup selalu accept**
✅ **Temp mail hanya bisa diakses setelah login**
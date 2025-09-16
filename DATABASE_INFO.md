# TempMail Database Integration

## 🗄️ Database Information

### Database Type
- **SQLite** - File-based database yang mudah digunakan
- **File Location**: `tempmail.db` (dalam folder project)

### Database Schema

#### 1. Users Table
```sql
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);
```

#### 2. Emails Table
```sql
CREATE TABLE emails (
    id TEXT PRIMARY KEY,
    email_address TEXT NOT NULL,
    from_address TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT 0
);
```

#### 3. Temporary Emails Table
```sql
CREATE TABLE temporary_emails (
    email_address TEXT PRIMARY KEY,
    user_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_accessed DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
```

## 🔄 Perubahan dari Sistem Lama

### Sebelum (In-Memory Storage)
- Data tersimpan di RAM server
- Data hilang saat server restart
- Tidak ada validasi email duplikat
- Semua registrasi/login diterima otomatis

### Sekarang (Database Storage)
- Data tersimpan permanen di file database
- Data tetap ada meski server restart
- Validasi email duplikat
- Validasi password untuk login
- Error handling yang lebih baik

## 🚀 Fitur Baru

1. **Registrasi dengan Validasi**
   - Cek email duplikat
   - Validasi input required
   - Error handling yang proper

2. **Login dengan Autentikasi**
   - Validasi email dan password
   - Update last login time
   - Error handling untuk kredensial salah

3. **Penyimpanan Email Permanen**
   - Email tersimpan di database
   - Status read/unread
   - Timestamp untuk setiap email

4. **Cleanup Otomatis**
   - Hapus data lama setiap jam
   - Hemat space database

## 📁 File yang Ditambahkan/Dimodifikasi

### File Baru
- `database.js` - Class untuk mengelola database
- `tempmail.db` - File database SQLite
- `DATABASE_INFO.md` - Dokumentasi ini

### File yang Dimodifikasi
- `server.js` - Menggunakan database instead of in-memory
- `package.json` - Menambahkan dependency sqlite3

## 🔧 Cara Menggunakan

1. **Jalankan Server**
   ```bash
   node server.js
   ```

2. **Akses Aplikasi**
   - Homepage: http://localhost:3001
   - Login: http://localhost:3001/login.html
   - Dashboard: http://localhost:3001/dashboard.html

3. **Registrasi Akun Baru**
   - Buka halaman login
   - Klik "Sign Up"
   - Isi form registrasi
   - Akun akan tersimpan di database

4. **Login**
   - Gunakan email dan password yang sudah didaftarkan
   - Sistem akan validasi kredensial dari database

## 🛡️ Keamanan (Untuk Production)

### Yang Perlu Ditambahkan
1. **Password Hashing**
   ```javascript
   const bcrypt = require('bcrypt');
   const hashedPassword = await bcrypt.hash(password, 10);
   ```

2. **JWT Token**
   ```javascript
   const jwt = require('jsonwebtoken');
   const token = jwt.sign({ userId: user.id }, 'secret-key');
   ```

3. **Input Validation**
   - Sanitasi input
   - Validasi format email
   - Rate limiting

4. **Environment Variables**
   - Database connection string
   - JWT secret key
   - Server port

## 📊 Monitoring Database

### Melihat Data di Database
```bash
# Install SQLite CLI
sqlite3 tempmail.db

# Lihat semua tabel
.tables

# Lihat data users
SELECT * FROM users;

# Lihat data emails
SELECT * FROM emails;

# Keluar
.quit
```

## 🔄 Backup Database

```bash
# Backup database
cp tempmail.db tempmail_backup.db

# Restore database
cp tempmail_backup.db tempmail.db
```

---

**Status**: ✅ Database integration completed successfully!
**Server**: Running on http://localhost:3001
**Database**: SQLite (tempmail.db)

# 📧 Email Testing Guide - TempMail

## 🧪 Cara Menguji Email Temporary

### 1. **Generate Temporary Email**
1. Login ke dashboard
2. Klik tombol "Generate New" (🔄)
3. Email temporary akan muncul di field
4. Copy email address untuk digunakan

### 2. **Kirim Test Email**
1. Scroll ke section "Test Email Sender"
2. Isi form dengan data:
   - **From Email**: `test@example.com` (default)
   - **Subject**: `Test Email from TempMail` (default)
   - **Message**: Pesan test (default sudah ada)
3. Klik tombol "Send Test Email" (📧)
4. Tunggu konfirmasi "Test email sent successfully!"

### 3. **Cek Inbox**
1. Scroll ke section "Inbox"
2. Klik tombol "Refresh" (🔄)
3. Email test akan muncul di inbox
4. Klik email untuk membacanya

## 🎯 Fitur Testing yang Tersedia

### ✅ **Test Email Form**
- Form lengkap untuk mengirim test email
- Pre-filled dengan data default
- Validasi input required
- Loading state saat mengirim

### ✅ **Real Email Storage**
- Email tersimpan di database SQLite
- Persistent storage (tidak hilang saat refresh)
- Tracking read/unread status
- Timestamp untuk setiap email

### ✅ **Visual Indicators**
- Email unread: Background biru + border kiri
- Email read: Background normal
- Subject bold untuk email unread
- Hover effects untuk interaksi

### ✅ **Auto-Update Features**
- Inbox otomatis update setelah kirim email
- Stats counter update real-time
- Email history update otomatis
- Read status update saat buka email

## 🔄 Workflow Testing Lengkap

### Step 1: Setup
```
1. Login → Dashboard
2. Generate New Email → abc123@tempmail.com
3. Copy email address
```

### Step 2: Send Test Email
```
1. Scroll to "Test Email Sender"
2. Fill form:
   - From: test@example.com
   - Subject: My Test Email
   - Message: Hello, this is a test!
3. Click "Send Test Email"
4. Wait for success message
```

### Step 3: Verify Receipt
```
1. Scroll to "Inbox"
2. Click "Refresh" button
3. See email appears with blue background (unread)
4. Click email to open and read
5. Email background changes to normal (read)
```

### Step 4: Check History
```
1. Click "Show History"
2. See email address in history
3. Shows "1 emails" received
4. Shows "Just now" last used
```

## 📊 Data yang Dicatat

### Email Database Record:
```json
{
    "id": "uuid-123",
    "email_address": "abc123@tempmail.com",
    "from_address": "test@example.com",
    "subject": "My Test Email",
    "content": "Hello, this is a test!",
    "created_at": "2024-01-01T10:00:00.000Z",
    "is_read": 0
}
```

### History Database Record:
```json
{
    "id": 1,
    "user_id": "user-uuid",
    "email_address": "abc123@tempmail.com",
    "created_at": "2024-01-01T10:00:00.000Z",
    "last_used": "2024-01-01T10:00:00.000Z",
    "total_emails_received": 1,
    "is_active": 1
}
```

## 🎨 UI/UX Features

### Test Email Form:
- **Orange Send Button**: Eye-catching untuk aksi utama
- **Form Validation**: Error messages untuk input kosong
- **Loading State**: Spinner saat mengirim
- **Auto-clear**: Form reset setelah berhasil kirim

### Inbox Display:
- **Unread Indicator**: Blue background + left border
- **Read Status**: Normal background
- **Hover Effects**: Smooth transitions
- **Click to Open**: Modal popup untuk baca email

### History Section:
- **Toggle View**: Show/hide history
- **Reuse Button**: One-click untuk gunakan email lama
- **Stats Display**: Email count + last used time
- **Responsive Design**: Mobile-friendly layout

## 🔧 Technical Implementation

### Frontend (dashboard.js):
- `sendTestEmail()` - Kirim test email via API
- `refreshInbox()` - Ambil email dari database
- `openEmail()` - Buka email + mark as read
- `updateInbox()` - Update tampilan inbox

### Backend (server.js):
- `POST /api/send-email` - Simpan email ke database
- `GET /api/emails/:email` - Ambil email dari database
- `PUT /api/emails/:id/read` - Mark email as read

### Database (database.js):
- `saveEmail()` - Simpan email ke database
- `getEmailsForAddress()` - Ambil email untuk alamat tertentu
- `markEmailAsRead()` - Update status read
- `updateEmailCount()` - Update counter di history

## 🚀 Advanced Testing

### Multiple Emails:
1. Generate email baru
2. Kirim beberapa test email
3. Cek inbox - semua email muncul
4. Cek history - counter bertambah

### Email History:
1. Generate beberapa email berbeda
2. Reuse email lama
3. Cek history - last used ter-update
4. Cek inbox - email lama aktif kembali

### Read/Unread Status:
1. Kirim email test
2. Cek inbox - email unread (blue)
3. Klik email - buka modal
4. Tutup modal - email read (normal)
5. Refresh - status tetap read

## 🎉 Benefits

### ✅ **Real Testing**
- Email benar-benar tersimpan di database
- Bisa test flow lengkap send → receive → read
- Data persistent meski refresh browser

### ✅ **User Experience**
- Interface yang intuitif dan mudah digunakan
- Visual feedback yang jelas
- Loading states untuk UX yang smooth

### ✅ **Data Tracking**
- History lengkap semua email yang dibuat
- Counter email yang diterima
- Timestamp untuk setiap aksi

### ✅ **Development Ready**
- API endpoints lengkap untuk integration
- Database schema yang scalable
- Error handling yang proper

---

**Status**: ✅ Email Testing System completed successfully!
**Server**: Running on http://localhost:3001
**Database**: SQLite with persistent email storage
**Features**: Send, Receive, Read, Track, History

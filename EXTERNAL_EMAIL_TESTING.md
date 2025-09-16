# 📧 External Email Testing Guide - TempMail

## 🌐 Menguji Email Temporary dari Luar

Sekarang Anda bisa menguji email temporary dengan mengirim email dari aplikasi email eksternal seperti Gmail, Outlook, atau aplikasi email lainnya!

## 🚀 Setup SMTP Server

### 1. **Server Configuration**
- **SMTP Host**: `localhost`
- **SMTP Port**: `2525`
- **Security**: None (untuk testing)
- **Authentication**: None (untuk testing)

### 2. **Supported Domains**
Email temporary yang didukung:
- `@tempmail.com`
- `@temp-mail.org`
- `@guerrillamail.com`
- `@mailinator.com`
- `@10minutemail.com`
- `@tempmail.net`
- `@disposable.email`
- `@throwaway.email`

## 📨 Cara Testing dengan Email Client Eksternal

### **Method 1: Menggunakan Email Client HTML**

1. **Akses Email Client**
   - Buka: `http://localhost:3001/email-client.html`
   - Form email client sederhana untuk testing

2. **Kirim Test Email**
   - Isi form dengan data:
     - **From**: `your-email@gmail.com`
     - **To**: `abc123@tempmail.com` (email temporary Anda)
     - **Subject**: `Test Email`
     - **Message**: `Hello from external email!`
   - Klik "Send Email"

3. **Cek Inbox**
   - Buka dashboard: `http://localhost:3001/dashboard.html`
   - Klik "Refresh" di inbox
   - Email akan muncul dengan background biru (unread)

### **Method 2: Menggunakan Gmail/Outlook**

#### **Gmail Setup:**
1. **Buka Gmail Settings**
   - Gmail → Settings → Accounts and Import
   - "Send mail as" → "Add another email address"

2. **Configure SMTP**
   - **SMTP Server**: `localhost`
   - **Port**: `2525`
   - **Username**: (kosong)
   - **Password**: (kosong)
   - **Security**: None

3. **Send Email**
   - Compose new email
   - **To**: `abc123@tempmail.com` (email temporary Anda)
   - **Subject**: `Test from Gmail`
   - **Message**: `This is a test email from Gmail!`
   - Send

#### **Outlook Setup:**
1. **Add Account**
   - File → Account Settings → New
   - Choose "Manual setup"

2. **Configure SMTP**
   - **Account Type**: SMTP
   - **Server**: `localhost`
   - **Port**: `2525`
   - **Authentication**: None

3. **Send Email**
   - New Email
   - **To**: `abc123@tempmail.com`
   - **Subject**: `Test from Outlook`
   - **Message**: `This is a test email from Outlook!`
   - Send

### **Method 3: Menggunakan Command Line**

#### **Windows (PowerShell):**
```powershell
# Install Send-MailMessage (built-in)
Send-MailMessage -To "abc123@tempmail.com" -From "test@example.com" -Subject "Test Email" -Body "Hello from PowerShell!" -SmtpServer "localhost" -Port 2525
```

#### **Linux/Mac (mail command):**
```bash
echo "Hello from command line!" | mail -s "Test Email" -S smtp=localhost:2525 abc123@tempmail.com
```

## 🔧 Technical Implementation

### **SMTP Server Features:**
- ✅ **Real SMTP Protocol**: Menggunakan protokol SMTP standar
- ✅ **Email Parsing**: Parse email dengan mailparser
- ✅ **Database Integration**: Simpan email ke SQLite
- ✅ **Domain Validation**: Hanya terima email untuk domain temporary
- ✅ **Error Handling**: Handle error dengan proper logging

### **Email Processing Flow:**
```
1. External Email Client → SMTP Server (port 2525)
2. SMTP Server → Email Parser
3. Email Parser → Database Storage
4. Database → Dashboard Display
```

### **Database Updates:**
- Email tersimpan di tabel `emails`
- Update `last_accessed` di `temporary_emails`
- Update `total_emails_received` di `email_history`

## 🎯 Testing Scenarios

### **Scenario 1: Basic Email Test**
1. Generate temporary email: `test123@tempmail.com`
2. Send email dari Gmail ke `test123@tempmail.com`
3. Cek inbox di dashboard
4. Email muncul dengan status unread (blue background)
5. Klik email untuk read
6. Status berubah ke read (normal background)

### **Scenario 2: Multiple Emails**
1. Generate temporary email: `multi@tempmail.com`
2. Kirim 3 email berbeda dari berbagai sumber
3. Cek inbox - semua email muncul
4. Cek history - counter menunjukkan 3 emails
5. Test reuse email address

### **Scenario 3: Different Domains**
1. Generate email dengan domain berbeda:
   - `test1@tempmail.com`
   - `test2@guerrillamail.com`
   - `test3@mailinator.com`
2. Kirim email ke masing-masing
3. Semua email masuk dengan benar
4. History terpisah untuk setiap domain

## 🚨 Troubleshooting

### **Email Tidak Masuk:**
1. **Cek SMTP Server Status**
   - Pastikan server berjalan di port 2525
   - Cek console untuk error messages

2. **Cek Domain Support**
   - Pastikan menggunakan domain yang didukung
   - Lihat list domain di server startup

3. **Cek Firewall**
   - Pastikan port 2525 tidak diblokir
   - Test dengan telnet: `telnet localhost 2525`

### **SMTP Connection Error:**
1. **Cek Server Status**
   ```bash
   netstat -an | findstr 2525
   ```

2. **Test SMTP Connection**
   ```bash
   telnet localhost 2525
   ```

3. **Cek Logs**
   - Lihat console output untuk error messages
   - Cek database untuk email yang masuk

## 📊 Monitoring & Logs

### **Server Logs:**
```
SMTP Server running on port 2525
Email received for: abc123@tempmail.com
Email from: test@gmail.com
Processing email:
  From: test@gmail.com
  To: abc123@tempmail.com
  Subject: Test Email
Email saved to database for abc123@tempmail.com
```

### **Database Queries:**
```sql
-- Check emails received
SELECT * FROM emails WHERE email_address = 'abc123@tempmail.com';

-- Check email history
SELECT * FROM email_history WHERE email_address = 'abc123@tempmail.com';

-- Check temporary emails
SELECT * FROM temporary_emails WHERE email_address = 'abc123@tempmail.com';
```

## 🎉 Benefits

### ✅ **Real Email Testing**
- Email benar-benar dikirim melalui SMTP
- Bisa test dari aplikasi email eksternal
- Protocol yang sama dengan email service nyata

### ✅ **Multiple Client Support**
- Gmail, Outlook, Thunderbird
- Command line tools
- Custom email clients
- Mobile email apps

### ✅ **Production Ready**
- SMTP server yang scalable
- Error handling yang proper
- Database integration
- Logging dan monitoring

### ✅ **Developer Friendly**
- Easy setup dan configuration
- Clear documentation
- Multiple testing methods
- Troubleshooting guides

---

**Status**: ✅ External Email Testing System completed!
**SMTP Server**: Running on localhost:2525
**Web Interface**: http://localhost:3001/email-client.html
**Dashboard**: http://localhost:3001/dashboard.html
**Features**: Real SMTP, External Clients, Database Storage

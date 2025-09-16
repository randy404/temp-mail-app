# 🧪 Panduan Uji Coba TempMail di Vercel

## 📋 **URL TempMail Anda:**
**https://temp-mail-jtt9loffl-randymay2178-1570s-projects.vercel.app**

---

## **1. Test Dasar - Web Interface**

### **Langkah 1: Buka Website**
1. Buka browser (Chrome, Firefox, Edge)
2. Kunjungi: `https://temp-mail-jtt9loffl-randymay2178-1570s-projects.vercel.app`
3. Pastikan halaman terbuka tanpa error

### **Langkah 2: Generate Email**
1. Klik tombol **"Generate New Email"**
2. Copy email address yang muncul (contoh: `abc123@tempmail.com`)
3. Catat email ini untuk testing

---

## **2. Test API Endpoints**

### **Test 1: Generate Email**
```bash
# Buka browser dan kunjungi:
https://temp-mail-jtt9loffl-randymay2178-1570s-projects.vercel.app/api/generate
```
**Expected Result:** JSON response dengan email baru

### **Test 2: Check Inbox**
```bash
# Ganti EMAIL_ADDRESS dengan email yang di-generate
https://temp-mail-jtt9loffl-randymay2178-1570s-projects.vercel.app/api/emails/EMAIL_ADDRESS
```
**Expected Result:** JSON response dengan array emails (kosong jika belum ada)

### **Test 3: List Domains**
```bash
https://temp-mail-jtt9loffl-randymay2178-1570s-projects.vercel.app/api/domains
```
**Expected Result:** JSON response dengan list 8 domain

---

## **3. Test Real-World Usage**

### **Test 1: Website Registration**
1. **Generate email** dari TempMail
2. **Buka website** yang memerlukan email verification (contoh: GitHub, Discord, dll)
3. **Gunakan email TempMail** untuk registrasi
4. **Check inbox** di TempMail untuk melihat verification email

### **Test 2: Newsletter Signup**
1. **Generate email** baru
2. **Sign up** untuk newsletter website
3. **Check inbox** untuk konfirmasi

### **Test 3: Social Media**
1. **Generate email** baru
2. **Buat akun** di platform social media
3. **Check inbox** untuk verification

---

## **4. Test dengan Tools**

### **Postman/Insomnia**
1. **Import collection** dengan endpoints:
   - `GET /api/generate`
   - `GET /api/emails/:email`
   - `GET /api/domains`

### **Browser Developer Tools**
1. **F12** untuk buka DevTools
2. **Console tab** untuk test JavaScript
3. **Network tab** untuk monitor API calls

---

## **5. Test Scenarios**

### **Scenario 1: Multiple Emails**
1. Generate 5 email berbeda
2. Check masing-masing inbox
3. Pastikan data terpisah

### **Scenario 2: Email Persistence**
1. Generate email
2. Refresh halaman
3. Check apakah email masih ada (Note: di Vercel data tidak persistent)

### **Scenario 3: Error Handling**
1. Test dengan email yang tidak valid
2. Test dengan endpoint yang salah
3. Pastikan error response yang proper

---

## **6. Expected Results**

### **✅ Success Cases:**
- Website terbuka tanpa error
- Email berhasil di-generate
- API endpoints merespons dengan benar
- JSON response format yang valid

### **❌ Known Limitations:**
- Data tidak persistent (hilang saat restart)
- SMTP server tidak aktif
- Email hanya bisa diterima via API internal

---

## **7. Troubleshooting**

### **Jika Website Tidak Buka:**
1. Check URL apakah benar
2. Coba refresh halaman
3. Check koneksi internet

### **Jika API Error:**
1. Check browser console untuk error
2. Pastikan endpoint URL benar
3. Coba generate email baru

### **Jika Email Tidak Masuk:**
1. Ingat: SMTP tidak aktif di Vercel
2. Email hanya bisa diterima via API internal
3. Untuk testing real email, perlu deploy ke server dengan SMTP

---

## **8. Next Steps**

### **Untuk Production Use:**
1. **Deploy ke Heroku/Railway** untuk SMTP support
2. **Setup domain** yang proper
3. **Configure DNS** untuk email routing
4. **Add database** untuk persistence

### **Untuk Development:**
1. **Test local** dengan `npm run dev`
2. **Modify features** sesuai kebutuhan
3. **Add new endpoints** jika diperlukan

---

## **📞 Support**

Jika ada masalah atau pertanyaan:
1. Check browser console untuk error
2. Test dengan endpoint yang berbeda
3. Coba generate email baru
4. Refresh halaman dan coba lagi

**Happy Testing! 🚀**

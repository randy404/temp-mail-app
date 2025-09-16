# 🚀 Deploy TempMail ke Render.com (Gratis!)

## 📋 **Langkah-langkah Deploy:**

### **1. Buka Render.com**
- Kunjungi: https://render.com
- Klik **"Get Started for Free"**
- Sign up dengan **GitHub** (paling mudah)

### **2. Connect GitHub Repository**
- Klik **"New +"** → **"Web Service"**
- Connect dengan GitHub account
- Pilih repository **temp-mail-app**

### **3. Configure Deployment**
```
Name: temp-mail-app
Environment: Node
Build Command: npm install
Start Command: node public-email-service.js
```

### **4. Environment Variables**
```
NODE_ENV=production
SMTP_PORT=25
```

### **5. Deploy**
- Klik **"Create Web Service"**
- Tunggu deployment selesai (5-10 menit)
- Dapatkan URL: `https://temp-mail-app.onrender.com`

---

## ✅ **Setelah Deploy:**

### **SMTP Configuration:**
```
SMTP Host: temp-mail-app.onrender.com
SMTP Port: 25
SMTP Security: None
```

### **Test Email:**
1. **Generate email** di dashboard
2. **Kirim email** dari Gmail/Yahoo ke alamat tersebut
3. **Check inbox** di dashboard

---

## 🎯 **Keuntungan Render:**

✅ **Gratis** untuk tier starter  
✅ **SMTP server aktif** di port 25  
✅ **Bisa terima email** dari Gmail, Yahoo, dll  
✅ **Auto-deploy** dari GitHub  
✅ **Custom domain** support  

---

## 📧 **Test Email Pribadi:**

### **Dari Gmail:**
1. Buka Gmail
2. Compose email baru
3. To: `generated-email@tempmail.com`
4. Send

### **Dari Outlook:**
1. Buka Outlook
2. New email
3. To: `generated-email@tempmail.com`
4. Send

### **Check Inbox:**
1. Refresh dashboard
2. Email akan muncul di inbox
3. Klik untuk membaca

---

## 🔧 **Troubleshooting:**

### **Jika SMTP tidak aktif:**
- Check environment variables
- Restart service
- Check logs di Render dashboard

### **Jika email tidak masuk:**
- Pastikan domain benar
- Check SMTP port 25
- Test dengan email client lain

---

## 🚀 **Ready to Deploy!**

Repository sudah siap di GitHub. Tinggal connect ke Render dan deploy!

**Happy Deploying! 🎉**

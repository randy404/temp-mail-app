# 🚀 Step-by-Step Deploy TempMail ke Render

## 📋 **Langkah 1: Buat Repository GitHub**

1. **Buka GitHub:** https://github.com/new
2. **Repository name:** `temp-mail-app`
3. **Description:** `Temporary Email Service with SMTP`
4. **Public** (gratis)
5. **Klik "Create repository"**

## 📋 **Langkah 2: Push Code ke GitHub**

```bash
# Di terminal, jalankan:
git remote add origin https://github.com/USERNAME/temp-mail-app.git
git branch -M main
git push -u origin main
```

## 📋 **Langkah 3: Deploy ke Render**

1. **Buka Render:** https://render.com
2. **Klik "Get Started for Free"**
3. **Sign up dengan GitHub**
4. **Klik "New +" → "Web Service"**
5. **Connect GitHub repository**
6. **Pilih "temp-mail-app"**

## 📋 **Langkah 4: Configure Settings**

```
Name: temp-mail-app
Environment: Node
Build Command: npm install
Start Command: node public-email-service.js
```

## 📋 **Langkah 5: Environment Variables**

```
NODE_ENV=production
SMTP_PORT=25
```

## 📋 **Langkah 6: Deploy**

1. **Klik "Create Web Service"**
2. **Tunggu deployment** (5-10 menit)
3. **Dapatkan URL:** `https://temp-mail-app.onrender.com`

---

## ✅ **Setelah Deploy Berhasil:**

### **SMTP Configuration:**
```
Host: temp-mail-app.onrender.com
Port: 25
Security: None
```

### **Test Email:**
1. **Generate email** di dashboard
2. **Kirim email** dari Gmail ke alamat tersebut
3. **Check inbox** di dashboard

---

## 🎯 **Keuntungan:**

✅ **Gratis** untuk tier starter  
✅ **SMTP server aktif** di port 25  
✅ **Bisa terima email** dari Gmail, Yahoo, dll  
✅ **Auto-deploy** dari GitHub  
✅ **Custom domain** support  

---

## 🚀 **Ready to Deploy!**

Repository sudah siap. Tinggal ikuti langkah-langkah di atas!

**Happy Deploying! 🎉**

# 🚀 Quick Test Guide - TempMail

## 🆓 **3 Cara Gratis untuk Testing**

### **1. Heroku (Paling Mudah - 5 Menit)**

#### **Step 1: Install Heroku CLI**
- Download: https://devcenter.heroku.com/articles/heroku-cli
- Install dan restart command prompt

#### **Step 2: Deploy**
```bash
# Login Heroku
heroku login

# Create app (ganti "my-tempmail" dengan nama unik)
heroku create my-tempmail

# Deploy
git add .
git commit -m "Deploy TempMail"
git push heroku main
```

#### **Step 3: Test**
- Buka: `https://my-tempmail.herokuapp.com`
- Generate email temporary
- Test web interface

#### **Hasil:**
- ✅ Web interface bekerja
- ✅ Generate email bekerja
- ✅ Inbox bekerja
- ❌ SMTP external tidak bisa (port 25 diblokir)

---

### **2. Railway (Support SMTP - 10 Menit)**

#### **Step 1: Setup**
1. Buka https://railway.app
2. Sign up dengan GitHub
3. Connect repository

#### **Step 2: Deploy**
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Pilih repository Anda
4. Railway auto-deploy

#### **Step 3: Test**
- URL: `https://your-app.railway.app`
- Test web interface
- Test SMTP (jika setup domain)

#### **Hasil:**
- ✅ Web interface bekerja
- ✅ Generate email bekerja
- ✅ SMTP port 25 support
- ✅ $5 credit gratis/bulan

---

### **3. Vercel (Paling Cepat - 3 Menit)**

#### **Step 1: Setup**
1. Buka https://vercel.com
2. Sign up dengan GitHub
3. Import repository

#### **Step 2: Deploy**
1. Click "Import"
2. Pilih repository
3. Deploy otomatis

#### **Step 3: Test**
- URL: `https://your-app.vercel.app`
- Test web interface

#### **Hasil:**
- ✅ Web interface bekerja
- ✅ Deploy super cepat
- ❌ Tidak support SMTP

---

## 🎯 **Rekomendasi Testing**

### **Untuk Testing Web Interface:**
**Pilih Heroku** - Paling mudah dan stabil

### **Untuk Testing SMTP External:**
**Pilih Railway** - Support port 25

### **Untuk Testing Cepat:**
**Pilih Vercel** - Deploy dalam 3 menit

---

## 🧪 **Testing Scenarios**

### **Scenario 1: Web Interface Testing**
1. Deploy ke Heroku
2. Buka web interface
3. Generate email: `abc123@tempmail.com`
4. Test copy email
5. Test refresh inbox
6. Test responsive design

### **Scenario 2: API Testing**
```bash
# Test generate email
curl https://your-app.herokuapp.com/api/generate

# Response:
{
  "success": true,
  "email": "xyz789@tempmail.com",
  "message": "Temporary email generated successfully"
}
```

### **Scenario 3: Database Testing**
1. Generate beberapa email
2. Cek database (jika akses server)
3. Verify email tersimpan
4. Test email history

---

## 📱 **Mobile Testing**

### **Test di Smartphone:**
1. Buka URL di browser mobile
2. Test responsive design
3. Test touch interactions
4. Test copy email

### **Test di Tablet:**
1. Buka di iPad/Android tablet
2. Test landscape/portrait
3. Test touch gestures

---

## 🔧 **Troubleshooting**

### **Heroku Deploy Error:**
```bash
# Check logs
heroku logs --tail

# Common fixes:
# 1. Check Procfile exists
# 2. Check package.json start script
# 3. Check Node.js version
```

### **Railway Deploy Error:**
```bash
# Check Railway dashboard
# Check environment variables
# Check build logs
```

### **Vercel Deploy Error:**
```bash
# Check Vercel dashboard
# Check build logs
# Check function logs
```

---

## 🎉 **Hasil Testing**

Setelah deploy berhasil, Anda akan memiliki:

### ✅ **Public URL**
- Heroku: `https://your-app.herokuapp.com`
- Railway: `https://your-app.railway.app`
- Vercel: `https://your-app.vercel.app`

### ✅ **Features yang Bekerja**
- Generate temporary email
- Web interface responsive
- Copy email ke clipboard
- Inbox real-time
- API endpoints

### ✅ **Database**
- SQLite database
- Persistent storage
- Email history

### ❌ **Keterbatasan Free Tier**
- Heroku: App sleep setelah 30 menit
- Railway: $5 credit limit
- Vercel: Function timeout

---

## 🚀 **Next Steps**

1. **Deploy ke platform pilihan**
2. **Test semua features**
3. **Share URL untuk feedback**
4. **Upgrade ke paid** jika butuh SMTP external
5. **Setup custom domain** untuk branding

---

**Status**: ✅ Ready for free testing!
**Time**: 3-10 menit untuk deploy
**Cost**: $0 untuk testing dasar
**Result**: Public email temporary service

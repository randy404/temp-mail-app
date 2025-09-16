# 🆓 Free Testing Options - TempMail

## 🌐 Platform Gratis untuk Uji Coba

### **1. Heroku (Paling Mudah - 100% Gratis)**

#### ✅ **Keunggulan:**
- Gratis selamanya
- Setup mudah dengan Git
- Auto-deploy dari GitHub
- SSL certificate gratis
- Custom domain support

#### ❌ **Keterbatasan:**
- Tidak support SMTP port 25
- App sleep setelah 30 menit tidak aktif
- 550 jam/bulan gratis

#### 🚀 **Cara Deploy:**
```bash
# 1. Install Heroku CLI
# Download dari: https://devcenter.heroku.com/articles/heroku-cli

# 2. Login
heroku login

# 3. Create app
heroku create your-tempmail-app

# 4. Deploy
git add .
git commit -m "Deploy TempMail"
git push heroku main
```

#### 📧 **Testing Email:**
- Web interface: ✅ Bekerja
- Internal email: ✅ Bekerja  
- External SMTP: ❌ Tidak bisa (port 25 diblokir)

---

### **2. Railway (Gratis - Alternatif Heroku)**

#### ✅ **Keunggulan:**
- Gratis $5 credit/bulan
- Support port 25 (SMTP)
- Deploy dari GitHub
- Custom domain gratis

#### 🚀 **Cara Deploy:**
1. Buka [railway.app](https://railway.app)
2. Login dengan GitHub
3. Connect repository
4. Deploy otomatis

#### 📧 **Testing Email:**
- Web interface: ✅ Bekerja
- Internal email: ✅ Bekerja
- External SMTP: ✅ Bekerja (dengan limit)

---

### **3. Render (Gratis - 750 jam/bulan)**

#### ✅ **Keunggulan:**
- 750 jam gratis/bulan
- Auto-deploy dari GitHub
- SSL gratis
- Custom domain

#### 🚀 **Cara Deploy:**
1. Buka [render.com](https://render.com)
2. Connect GitHub
3. Create Web Service
4. Deploy otomatis

---

### **4. Vercel (Gratis - Serverless)**

#### ✅ **Keunggulan:**
- Gratis selamanya
- Deploy super cepat
- Custom domain gratis
- Global CDN

#### ❌ **Keterbatasan:**
- Serverless (tidak support SMTP)
- Hanya untuk web interface

---

### **5. Netlify (Gratis - Static + Functions)**

#### ✅ **Keunggulan:**
- Gratis selamanya
- Deploy dari GitHub
- Custom domain gratis
- Form handling

#### ❌ **Keterbatasan:**
- Tidak support SMTP server
- Hanya untuk web interface

---

## 🎯 **Rekomendasi untuk Testing**

### **Untuk Testing Web Interface:**
1. **Heroku** - Paling mudah
2. **Vercel** - Paling cepat
3. **Netlify** - Paling stabil

### **Untuk Testing SMTP (Email External):**
1. **Railway** - Support port 25
2. **DigitalOcean** - $5/bulan (murah)
3. **Vultr** - $2.50/bulan (paling murah)

---

## 🚀 **Quick Start dengan Heroku**

### **Step 1: Prepare Files**
```bash
# Create Procfile
echo "web: node public-email-service.js" > Procfile

# Update package.json
{
  "scripts": {
    "start": "node public-email-service.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### **Step 2: Deploy**
```bash
# Login Heroku
heroku login

# Create app
heroku create your-tempmail-app

# Deploy
git add .
git commit -m "Deploy TempMail"
git push heroku main
```

### **Step 3: Test**
- Web: `https://your-tempmail-app.herokuapp.com`
- API: `https://your-tempmail-app.herokuapp.com/api/generate`

---

## 🧪 **Testing Scenarios**

### **Scenario 1: Web Interface Testing**
1. Deploy ke Heroku
2. Buka web interface
3. Generate email temporary
4. Test internal email sending
5. Cek inbox functionality

### **Scenario 2: API Testing**
```bash
# Test generate email
curl https://your-app.herokuapp.com/api/generate

# Test get emails
curl https://your-app.herokuapp.com/api/emails/test@tempmail.com

# Test domains
curl https://your-app.herokuapp.com/api/domains
```

### **Scenario 3: External Email Testing**
1. Deploy ke Railway (support SMTP)
2. Setup custom domain
3. Test email dari Gmail/Outlook
4. Verify email masuk ke inbox

---

## 💡 **Tips untuk Testing Gratis**

### **1. Gunakan Multiple Platforms**
- Heroku untuk web interface
- Railway untuk SMTP testing
- Vercel untuk backup

### **2. Optimize untuk Free Tier**
```javascript
// Add to public-email-service.js
if (process.env.NODE_ENV === 'production') {
    // Optimize for free tier
    app.use(express.static(path.join(__dirname), {
        maxAge: '1d' // Cache static files
    }));
}
```

### **3. Monitor Usage**
```bash
# Heroku
heroku logs --tail

# Railway
railway logs

# Vercel
vercel logs
```

### **4. Setup Monitoring**
```javascript
// Add health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});
```

---

## 🎉 **Hasil Testing**

Setelah deploy ke platform gratis, Anda akan memiliki:

### ✅ **Web Interface**
- URL: `https://your-app.herokuapp.com`
- Generate email temporary
- Cek inbox real-time
- Copy email ke clipboard

### ✅ **API Endpoints**
- `GET /api/generate` - Generate email
- `GET /api/emails/:email` - Get emails
- `GET /api/domains` - List domains

### ✅ **Database**
- SQLite database
- Persistent storage
- Email history

### ❌ **SMTP External** (kecuali Railway)
- Tidak bisa terima email dari Gmail/Outlook
- Hanya internal testing

---

## 🚀 **Next Steps**

1. **Pilih platform** (Heroku untuk mudah)
2. **Deploy aplikasi**
3. **Test web interface**
4. **Share URL** untuk testing
5. **Upgrade ke paid** jika butuh SMTP external

---

**Status**: ✅ Free testing options available!
**Recommended**: Heroku untuk web interface, Railway untuk SMTP
**Cost**: $0 untuk testing dasar

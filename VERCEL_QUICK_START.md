# ⚡ Vercel Quick Start - TempMail

## 🚀 **Deploy dalam 3 Menit!**

### **Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

### **Step 2: Login**
```bash
vercel login
```

### **Step 3: Deploy**
```bash
vercel
```

### **Step 4: Test**
- Buka URL yang ditampilkan
- Generate email temporary
- Test web interface

---

## 🎯 **Yang Bekerja di Vercel:**

### ✅ **Web Interface**
- Generate email temporary
- Copy email ke clipboard
- Inbox real-time
- Responsive design
- Mobile-friendly

### ✅ **API Endpoints**
- `GET /api/generate` - Generate email
- `GET /api/emails/:email` - Get emails
- `GET /api/domains` - List domains

### ✅ **Features**
- Database storage (in-memory)
- Auto-refresh inbox
- Email history
- Copy functionality

### ❌ **Yang Tidak Bekerja:**
- SMTP server (tidak support di Vercel)
- Persistent database (reset setiap deploy)

---

## 🧪 **Testing Scenarios**

### **1. Web Interface Test**
1. Buka URL Vercel
2. Generate email: `abc123@tempmail.com`
3. Copy email ke clipboard
4. Test responsive design
5. Test mobile interface

### **2. API Test**
```bash
# Test generate email
curl https://your-app.vercel.app/api/generate

# Test domains
curl https://your-app.vercel.app/api/domains
```

### **3. Mobile Test**
1. Buka di smartphone
2. Test touch interactions
3. Test copy email
4. Test responsive layout

---

## 📱 **Mobile Testing**

### **Test di Smartphone:**
- Buka URL di browser mobile
- Test generate email
- Test copy functionality
- Test responsive design

### **Test di Tablet:**
- Buka di iPad/Android tablet
- Test landscape/portrait
- Test touch gestures

---

## 🔧 **Troubleshooting**

### **Deploy Error:**
```bash
# Check logs
vercel logs

# Redeploy
vercel --prod
```

### **Function Timeout:**
- Vercel free tier: 10 detik timeout
- Optimize code untuk performa
- Use efficient algorithms

### **Database Issues:**
- Vercel menggunakan in-memory database
- Data reset setiap deploy
- Untuk persistent data, gunakan external database

---

## 🎉 **Hasil Deploy**

### **URL yang Didapat:**
- Production: `https://your-app.vercel.app`
- Custom domain: `https://yourdomain.com` (jika setup)

### **Features yang Bekerja:**
- ✅ Web interface responsive
- ✅ Generate email temporary
- ✅ API endpoints
- ✅ Mobile-friendly
- ✅ Copy email functionality
- ✅ Real-time inbox

### **Perfect untuk:**
- Testing web interface
- Demo aplikasi
- Portfolio project
- Quick deployment

---

## 🚀 **Next Steps**

1. **Test semua features**
2. **Share URL untuk feedback**
3. **Setup custom domain** (opsional)
4. **Monitor performance**
5. **Optimize jika perlu**

---

**Status**: ✅ Ready for Vercel!
**Time**: 3 menit untuk deploy
**Cost**: $0 (gratis selamanya)
**Result**: Public web interface + API

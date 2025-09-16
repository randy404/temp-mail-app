# 🚀 Deploy TempMail ke Vercel - Panduan Lengkap

## ⚡ **Mengapa Vercel?**

### ✅ **Keunggulan Vercel:**
- **Gratis selamanya** dengan limit yang generous
- **Deploy super cepat** (3-5 menit)
- **Global CDN** untuk performa optimal
- **Auto-deploy** dari GitHub
- **Custom domain** gratis
- **SSL certificate** otomatis
- **Serverless functions** yang scalable

### ❌ **Keterbatasan Vercel:**
- **Tidak support SMTP server** (serverless)
- **Function timeout** 10 detik (free tier)
- **Tidak bisa run persistent server**

### 🎯 **Cocok untuk:**
- Web interface testing
- API endpoints testing
- Frontend development
- Quick deployment

---

## 🚀 **Cara Deploy ke Vercel**

### **Method 1: Deploy via Vercel Dashboard (Paling Mudah)**

#### **Step 1: Prepare Repository**
```bash
# Pastikan semua file sudah ada
# - public-email-service.js
# - public-interface.html
# - vercel.json
# - package.json
# - database.js
# - styles.css
```

#### **Step 2: Push ke GitHub**
```bash
# Jika belum ada repository
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/tempmail-app.git
git push -u origin main
```

#### **Step 3: Deploy via Vercel**
1. Buka https://vercel.com
2. Sign up dengan GitHub
3. Click "New Project"
4. Import repository Anda
5. Vercel auto-detect settings
6. Click "Deploy"

#### **Step 4: Test**
- URL: `https://your-app.vercel.app`
- Test web interface
- Test API endpoints

---

### **Method 2: Deploy via Vercel CLI**

#### **Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

#### **Step 2: Login**
```bash
vercel login
```

#### **Step 3: Deploy**
```bash
# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (pilih akun Anda)
# - Link to existing project? N
# - Project name? tempmail-app
# - Directory? ./
```

#### **Step 4: Test**
- URL akan ditampilkan setelah deploy
- Test web interface

---

## 🔧 **Konfigurasi Vercel**

### **vercel.json Configuration**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "public-email-service.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "public-email-service.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### **package.json Updates**
```json
{
  "scripts": {
    "start": "node public-email-service.js",
    "dev": "nodemon server.js",
    "vercel-build": "echo 'Build complete'"
  },
  "engines": {
    "node": "18.x"
  }
}
```

---

## 🧪 **Testing di Vercel**

### **1. Web Interface Testing**
```bash
# Test URL
curl https://your-app.vercel.app

# Expected: HTML page loads
```

### **2. API Testing**
```bash
# Test generate email
curl https://your-app.vercel.app/api/generate

# Expected response:
{
  "success": true,
  "email": "abc123@tempmail.com",
  "message": "Temporary email generated successfully"
}

# Test domains
curl https://your-app.vercel.app/api/domains

# Expected response:
{
  "success": true,
  "domains": ["tempmail.com", "temp-mail.org", ...]
}
```

### **3. Database Testing**
```bash
# Test email storage
curl -X POST https://your-app.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@tempmail.com",
    "from": "sender@example.com",
    "subject": "Test Email",
    "content": "Hello from Vercel!"
  }'
```

---

## 📱 **Mobile Testing**

### **Test di Smartphone:**
1. Buka URL di browser mobile
2. Test responsive design
3. Test touch interactions
4. Test copy email functionality

### **Test di Tablet:**
1. Buka di iPad/Android tablet
2. Test landscape/portrait mode
3. Test touch gestures

---

## 🔍 **Monitoring & Logs**

### **View Logs**
```bash
# Via CLI
vercel logs

# Via Dashboard
# Go to Vercel Dashboard > Your Project > Functions tab
```

### **Monitor Performance**
```bash
# Check function performance
vercel inspect

# View analytics
# Go to Vercel Dashboard > Analytics tab
```

---

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **1. Function Timeout**
```javascript
// Add timeout handling
app.use((req, res, next) => {
  req.setTimeout(10000); // 10 seconds
  res.setTimeout(10000);
  next();
});
```

#### **2. Database Issues**
```javascript
// Use in-memory database for Vercel
const db = new Map(); // Fallback for serverless
```

#### **3. SMTP Not Working**
```javascript
// Disable SMTP for Vercel
if (process.env.VERCEL) {
  console.log('SMTP disabled on Vercel');
  // Skip SMTP server setup
}
```

### **Debug Commands:**
```bash
# Check deployment status
vercel ls

# View deployment details
vercel inspect [deployment-url]

# Check environment variables
vercel env ls
```

---

## 🎯 **Optimizations untuk Vercel**

### **1. Static File Optimization**
```javascript
// Serve static files efficiently
app.use(express.static(path.join(__dirname), {
  maxAge: '1d',
  etag: true
}));
```

### **2. Function Optimization**
```javascript
// Optimize for serverless
const handler = (req, res) => {
  // Your logic here
};

module.exports = handler;
```

### **3. Database Optimization**
```javascript
// Use lightweight database
const db = new Map(); // In-memory for Vercel
```

---

## 🎉 **Hasil Deploy ke Vercel**

### ✅ **Yang Bekerja:**
- Web interface responsive
- Generate email temporary
- API endpoints
- Database storage (in-memory)
- Copy email functionality
- Mobile-friendly design

### ❌ **Yang Tidak Bekerja:**
- SMTP server (tidak support di Vercel)
- Persistent database (reset setiap deploy)
- Long-running processes

### 🌐 **URL yang Didapat:**
- Production: `https://your-app.vercel.app`
- Custom domain: `https://yourdomain.com` (jika setup)

---

## 🚀 **Next Steps**

### **1. Test Semua Features**
- Web interface
- API endpoints
- Mobile responsiveness
- Copy functionality

### **2. Setup Custom Domain**
- Beli domain
- Add di Vercel dashboard
- Configure DNS

### **3. Monitor Performance**
- Check Vercel analytics
- Monitor function logs
- Optimize jika perlu

### **4. Share untuk Testing**
- Share URL dengan teman
- Test dari berbagai device
- Collect feedback

---

## 💡 **Tips untuk Vercel**

### **1. Optimize untuk Free Tier**
- Minimize function execution time
- Use efficient algorithms
- Cache static assets

### **2. Monitor Usage**
- Check function invocations
- Monitor bandwidth usage
- Watch for timeout errors

### **3. Backup Strategy**
- Export database regularly
- Use external database (PlanetScale, Supabase)
- Implement data persistence

---

**Status**: ✅ Ready for Vercel deployment!
**Time**: 3-5 menit untuk deploy
**Cost**: $0 (gratis selamanya)
**Result**: Public web interface + API

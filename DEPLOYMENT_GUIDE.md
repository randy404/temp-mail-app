# 🌐 Deployment Guide - TempMail Public Service

## 🚀 Cara Membuat Email Temporary yang Bisa Digunakan di Internet

Untuk membuat email temporary yang benar-benar bisa digunakan di internet (seperti 10MinuteMail), Anda perlu deploy server ke cloud dan mengkonfigurasi DNS.

## 📋 Prerequisites

### 1. **Cloud Server**
- **Heroku** (Gratis, mudah)
- **DigitalOcean** ($5/bulan)
- **AWS EC2** (Pay as you go)
- **Google Cloud** (Free tier)
- **Vultr** ($2.50/bulan)

### 2. **Domain Name** (Opsional)
- Beli domain di Namecheap, GoDaddy, atau Cloudflare
- Atau gunakan subdomain gratis

### 3. **DNS Configuration**
- Setup MX records untuk email
- Setup A records untuk web server

## 🎯 Step-by-Step Deployment

### **Option 1: Deploy ke Heroku (Paling Mudah)**

#### 1. **Setup Heroku**
```bash
# Install Heroku CLI
# Download dari: https://devcenter.heroku.com/articles/heroku-cli

# Login ke Heroku
heroku login

# Create new app
heroku create your-tempmail-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set PORT=3000
```

#### 2. **Update package.json**
```json
{
  "scripts": {
    "start": "node public-email-service.js",
    "dev": "nodemon public-email-service.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

#### 3. **Deploy**
```bash
# Add Heroku remote
git remote add heroku https://git.heroku.com/your-tempmail-app.git

# Deploy
git add .
git commit -m "Deploy TempMail service"
git push heroku main
```

#### 4. **Setup Custom Domain (Opsional)**
```bash
# Add custom domain
heroku domains:add yourdomain.com

# Setup DNS
# A record: yourdomain.com -> Heroku IP
# CNAME: www.yourdomain.com -> your-tempmail-app.herokuapp.com
```

### **Option 2: Deploy ke DigitalOcean**

#### 1. **Create Droplet**
- Ubuntu 20.04 LTS
- $5/month plan
- Add SSH key

#### 2. **Setup Server**
```bash
# Connect to server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
apt install nginx -y
```

#### 3. **Deploy Application**
```bash
# Clone repository
git clone https://github.com/your-username/tempmail-app.git
cd tempmail-app

# Install dependencies
npm install

# Start with PM2
pm2 start public-email-service.js --name tempmail
pm2 startup
pm2 save
```

#### 4. **Setup Nginx**
```bash
# Create Nginx config
nano /etc/nginx/sites-available/tempmail

# Add configuration
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
ln -s /etc/nginx/sites-available/tempmail /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## 📧 Email Configuration

### **Setup SMTP Server**

#### 1. **Configure Firewall**
```bash
# Allow SMTP port
ufw allow 25
ufw allow 587
ufw allow 465
```

#### 2. **Setup MX Records**
```
# DNS Configuration
yourdomain.com.    MX    10    mail.yourdomain.com.
mail.yourdomain.com.    A    YOUR_SERVER_IP
```

#### 3. **Update SMTP Configuration**
```javascript
// Update public-email-service.js
const smtpPort = process.env.SMTP_PORT || 25; // Use port 25 for production
```

### **Setup SSL Certificate**
```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 🔧 Production Configuration

### **Environment Variables**
```bash
# Production settings
NODE_ENV=production
PORT=3000
SMTP_PORT=25
DB_PATH=/var/lib/tempmail/tempmail.db
```

### **Database Setup**
```bash
# Create database directory
mkdir -p /var/lib/tempmail
chown -R www-data:www-data /var/lib/tempmail

# Setup database backup
crontab -e
# Add: 0 2 * * * cp /var/lib/tempmail/tempmail.db /var/backups/tempmail-$(date +\%Y\%m\%d).db
```

### **Monitoring**
```bash
# Install monitoring
npm install -g pm2-logrotate

# Setup log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

## 🌍 DNS Configuration

### **A Records**
```
yourdomain.com        A    YOUR_SERVER_IP
www.yourdomain.com    A    YOUR_SERVER_IP
mail.yourdomain.com   A    YOUR_SERVER_IP
```

### **MX Records**
```
yourdomain.com        MX    10    mail.yourdomain.com
tempmail.com          MX    10    mail.yourdomain.com
temp-mail.org         MX    10    mail.yourdomain.com
guerrillamail.com     MX    10    mail.yourdomain.com
```

### **CNAME Records**
```
*.yourdomain.com      CNAME    yourdomain.com
```

## 🚀 Testing Deployment

### **1. Test Web Interface**
```bash
# Test HTTP
curl http://yourdomain.com

# Test HTTPS
curl https://yourdomain.com
```

### **2. Test SMTP**
```bash
# Test SMTP connection
telnet yourdomain.com 25

# Send test email
echo "Test email" | mail -s "Test" test@tempmail.com
```

### **3. Test Email Generation**
```bash
# Test API
curl https://yourdomain.com/api/generate
curl https://yourdomain.com/api/domains
```

## 📊 Monitoring & Maintenance

### **Log Monitoring**
```bash
# View PM2 logs
pm2 logs tempmail

# View Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### **Database Backup**
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d)
cp /var/lib/tempmail/tempmail.db /var/backups/tempmail-$DATE.db
find /var/backups -name "tempmail-*.db" -mtime +30 -delete
```

### **Performance Monitoring**
```bash
# Install monitoring tools
npm install -g clinic

# Run performance test
clinic doctor -- node public-email-service.js
```

## 🎯 Final Result

Setelah deployment berhasil, Anda akan memiliki:

### ✅ **Public Email Service**
- URL: `https://yourdomain.com`
- SMTP: `yourdomain.com:25`
- Domains: `@tempmail.com`, `@temp-mail.org`, dll

### ✅ **Features**
- Generate temporary emails
- Receive emails from internet
- Web interface untuk cek inbox
- API untuk integration
- Database storage

### ✅ **Usage**
1. User buka `https://yourdomain.com`
2. Generate temporary email
3. Gunakan untuk daftar akun di website lain
4. Cek inbox untuk email verifikasi
5. Email otomatis tersimpan di database

## 💰 Cost Estimation

### **Heroku (Gratis)**
- Web: Free tier
- SMTP: Tidak support port 25
- Domain: $10-15/tahun

### **DigitalOcean ($5/bulan)**
- Server: $5/bulan
- Domain: $10-15/tahun
- SSL: Gratis (Let's Encrypt)

### **Total Cost: $60-75/tahun**

---

**Status**: ✅ Deployment Guide completed!
**Next Steps**: Choose deployment option and follow the guide
**Result**: Public email temporary service accessible from internet

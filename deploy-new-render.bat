@echo off
echo ========================================
echo    DEPLOY BARU KE RENDER
echo ========================================
echo.

echo 1. Opening Render Dashboard...
start https://dashboard.render.com

echo.
echo 2. Opening GitHub Repository...
start https://github.com/randy404/temp-mail-app

echo.
echo ========================================
echo    LANGKAH DEPLOY BARU:
echo ========================================
echo.

echo STEP 1 - Di Render Dashboard:
echo 1. Klik "Deploy a Web Service"
echo 2. Klik "Connect GitHub"
echo 3. Authorize Render
echo 4. Pilih repository "temp-mail-app"
echo.

echo STEP 2 - Configure Service:
echo Name: temp-mail-app
echo Environment: Node
echo Build Command: npm install
echo Start Command: node public-email-service.js
echo.

echo STEP 3 - Environment Variables:
echo NODE_ENV=production
echo SMTP_PORT=25
echo.

echo STEP 4 - Deploy:
echo 1. Klik "Create Web Service"
echo 2. Tunggu deployment (5-10 menit)
echo 3. Dapatkan service URL
echo.

echo ========================================
echo    SETELAH DEPLOY:
echo ========================================
echo.

echo Service URL akan seperti:
echo https://temp-mail-app.onrender.com
echo.

echo SMTP Configuration:
echo Host: temp-mail-app.onrender.com
echo Port: 25
echo Security: None
echo.

echo Test Email:
echo 1. Generate email di dashboard
echo 2. Kirim email dari Gmail ke alamat tersebut
echo 3. Check inbox di dashboard
echo.

echo ========================================
echo    READY TO DEPLOY!
echo ========================================
echo.
echo Repository sudah siap di GitHub.
echo Tinggal ikuti langkah-langkah di atas!
echo.
pause

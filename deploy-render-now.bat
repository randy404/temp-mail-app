@echo off
echo ========================================
echo    DEPLOY TEMPMAIL KE RENDER
echo ========================================
echo.

echo 1. Opening Render.com...
start https://render.com

echo.
echo 2. Instructions for deployment:
echo.
echo    a) Click "Get Started for Free"
echo    b) Sign up with GitHub
echo    c) Click "New +" → "Web Service"
echo    d) Connect your GitHub repository
echo    e) Select "temp-mail-app" repository
echo    f) Configure settings:
echo       - Name: temp-mail-app
echo       - Environment: Node
echo       - Build Command: npm install
echo       - Start Command: node public-email-service.js
echo    g) Add Environment Variables:
echo       - NODE_ENV=production
echo       - SMTP_PORT=25
echo    h) Click "Create Web Service"
echo.

echo 3. After deployment, your TempMail will be available at:
echo    https://temp-mail-app.onrender.com
echo.
echo 4. SMTP Configuration:
echo    Host: temp-mail-app.onrender.com
echo    Port: 25
echo    Security: None
echo.

echo ========================================
echo    READY TO DEPLOY!
echo ========================================
echo.
echo Follow the instructions above to deploy to Render.
echo Your TempMail will be able to receive emails from Gmail, Yahoo, etc.
echo.
pause

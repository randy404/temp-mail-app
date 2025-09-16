@echo off
echo ========================================
echo    DEPLOY TEMPMAIL KE RAILWAY
echo    (Gratis, Mudah, dengan SMTP)
echo ========================================
echo.

echo 1. Installing Railway CLI...
npm install -g @railway/cli

echo.
echo 2. Login to Railway (akan buka browser)...
railway login

echo.
echo 3. Creating Railway project...
railway init

echo.
echo 4. Setting environment variables...
railway variables set NODE_ENV=production
railway variables set SMTP_PORT=25

echo.
echo 5. Deploying to Railway...
railway up

echo.
echo 6. Getting deployment URL...
railway domain

echo.
echo ========================================
echo    DEPLOYMENT COMPLETED!
echo ========================================
echo.
echo Your TempMail will be available at Railway domain
echo SMTP Server will be running on port 25
echo You can send emails from Gmail, Yahoo, etc.
echo.
pause

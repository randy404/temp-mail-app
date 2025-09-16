@echo off
echo ========================================
echo    AUTO DEPLOY BARU KE RENDER
echo ========================================
echo.

echo 1. Checking Git status...
git status

echo.
echo 2. Adding all files...
git add .

echo.
echo 3. Committing changes...
git commit -m "Deploy new service to Render with correct interface"

echo.
echo 4. Pushing to GitHub...
git push origin main

echo.
echo 5. Opening Render Dashboard...
start https://dashboard.render.com

echo.
echo 6. Opening GitHub Repository...
start https://github.com/randy404/temp-mail-app

echo.
echo ========================================
echo    DEPLOYMENT READY!
echo ========================================
echo.

echo GitHub repository updated successfully!
echo Now follow these steps on Render:
echo.

echo STEP 1 - Create New Service:
echo 1. Click "Deploy a Web Service"
echo 2. Click "Connect GitHub"
echo 3. Authorize Render
echo 4. Select "temp-mail-app" repository
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
echo 1. Click "Create Web Service"
echo 2. Wait for deployment (5-10 minutes)
echo 3. Get service URL
echo.

echo ========================================
echo    EXPECTED RESULT:
echo ========================================
echo.

echo Service URL: https://temp-mail-app.onrender.com
echo Interface: Dashboard (not public-interface)
echo Features: Login, Email Generator, Inbox, History, Test Sender
echo SMTP: Active on port 25
echo.

echo You can send emails from Gmail, Yahoo, etc.!
echo.
pause

@echo off
echo ========================================
echo    QUICK DEPLOY TEMPMAIL
echo ========================================
echo.

echo 1. Opening GitHub to create repository...
start https://github.com/new

echo.
echo 2. Opening Render.com for deployment...
start https://render.com

echo.
echo ========================================
echo    FOLLOW THESE STEPS:
echo ========================================
echo.

echo STEP 1 - Create GitHub Repository:
echo 1. Repository name: temp-mail-app
echo 2. Description: Temporary Email Service
echo 3. Public repository
echo 4. Click "Create repository"
echo.

echo STEP 2 - Push Code to GitHub:
echo 1. Copy the repository URL from GitHub
echo 2. Run these commands in terminal:
echo    git remote add origin YOUR_REPO_URL
echo    git branch -M main
echo    git push -u origin main
echo.

echo STEP 3 - Deploy to Render:
echo 1. Sign up with GitHub on Render
echo 2. Click "New +" → "Web Service"
echo 3. Connect your repository
echo 4. Configure settings:
echo    - Name: temp-mail-app
echo    - Environment: Node
echo    - Build Command: npm install
echo    - Start Command: node public-email-service.js
echo 5. Add Environment Variables:
echo    - NODE_ENV=production
echo    - SMTP_PORT=25
echo 6. Click "Create Web Service"
echo.

echo ========================================
echo    AFTER DEPLOYMENT:
echo ========================================
echo.
echo Your TempMail will be available at:
echo https://temp-mail-app.onrender.com
echo.
echo SMTP Configuration:
echo Host: temp-mail-app.onrender.com
echo Port: 25
echo Security: None
echo.
echo You can send emails from Gmail, Yahoo, etc.!
echo.
pause

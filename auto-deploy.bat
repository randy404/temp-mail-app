@echo off
echo ========================================
echo    AUTO DEPLOY TEMPMAIL KE RENDER
echo ========================================
echo.

echo 1. Checking Git status...
git status

echo.
echo 2. Adding all files...
git add .

echo.
echo 3. Committing changes...
git commit -m "Deploy TempMail to Render with SMTP support"

echo.
echo 4. Pushing to GitHub...
echo Please make sure you have created a GitHub repository first!
echo.

set /p REPO_URL="Enter your GitHub repository URL (e.g., https://github.com/username/temp-mail-app.git): "

git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

echo.
echo 5. Opening Render.com for deployment...
start https://render.com

echo.
echo ========================================
echo    GITHUB REPOSITORY READY!
echo ========================================
echo.
echo Now follow these steps on Render:
echo 1. Sign up with GitHub
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
echo Your TempMail will be available at:
echo https://temp-mail-app.onrender.com
echo.
pause

@echo off
echo ========================================
echo    CHECK RENDER DEPLOYMENT STATUS
echo ========================================
echo.

echo 1. Opening Render Dashboard...
start https://dashboard.render.com

echo.
echo 2. Opening GitHub Repository...
start https://github.com/randy404/temp-mail-app

echo.
echo ========================================
echo    WHAT TO CHECK:
echo ========================================
echo.

echo A. DI RENDER DASHBOARD:
echo    1. Look for service named "temp-mail-app" or "mailtemp"
echo    2. If NO service found:
echo       - Click "Deploy a Web Service"
echo       - Connect GitHub repository
echo       - Select "temp-mail-app" repository
echo       - Configure settings (see below)
echo.
echo    3. If service EXISTS:
echo       - Click on the service
echo       - Check "Deployments" tab
echo       - Look for build status
echo       - Check service URL
echo.

echo B. CONFIGURE SERVICE (if creating new):
echo    Name: temp-mail-app
echo    Environment: Node
echo    Build Command: npm install
echo    Start Command: node public-email-service.js
echo    Environment Variables:
echo      - NODE_ENV=production
echo      - SMTP_PORT=25
echo.

echo C. CHECK GITHUB REPOSITORY:
echo    1. Verify all files are pushed
echo    2. Check latest commit
echo    3. Ensure repository is public
echo.

echo ========================================
echo    TROUBLESHOOTING:
echo ========================================
echo.

echo If service exists but not working:
echo 1. Check build logs for errors
echo 2. Verify environment variables
echo 3. Check service URL
echo 4. Look for deployment failures
echo.

echo If no service found:
echo 1. Create new Web Service
echo 2. Connect GitHub repository
echo 3. Deploy with correct settings
echo.

pause

@echo off
echo ========================================
echo    TempMail - Deploy to Vercel
echo ========================================
echo.

echo Vercel provides:
echo - Free hosting forever
echo - Global CDN
echo - Auto-deploy from GitHub
echo - Custom domain support
echo - SSL certificate automatic
echo.

echo Checking if Vercel CLI is installed...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Vercel CLI...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install Vercel CLI!
        echo Please install manually: npm install -g vercel
        pause
        exit /b 1
    )
)

echo.
echo Logging in to Vercel...
vercel login

echo.
echo Deploying to Vercel...
vercel

echo.
echo ========================================
echo    Deployment Complete!
echo ========================================
echo.
echo Your TempMail service is now available at the URL shown above.
echo.
echo Test the service:
echo 1. Open the URL in your browser
echo 2. Generate a temporary email
echo 3. Test the web interface
echo 4. Test on mobile device
echo.
echo Note: SMTP server is not supported on Vercel
echo This is perfect for web interface testing
echo.
echo For full SMTP support, consider Railway or DigitalOcean
echo.
pause

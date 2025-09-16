@echo off
echo ========================================
echo    TempMail - Deploy to Heroku
echo ========================================
echo.

echo Checking if Heroku CLI is installed...
heroku --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Heroku CLI is not installed!
    echo Please download and install from: https://devcenter.heroku.com/articles/heroku-cli
    pause
    exit /b 1
)

echo.
echo Please enter your Heroku app name:
set /p APP_NAME=App name: 

echo.
echo Logging in to Heroku...
heroku login

echo.
echo Creating Heroku app...
heroku create %APP_NAME%

echo.
echo Setting environment variables...
heroku config:set NODE_ENV=production -a %APP_NAME%

echo.
echo Deploying to Heroku...
git add .
git commit -m "Deploy TempMail to Heroku"
git push heroku main

echo.
echo ========================================
echo    Deployment Complete!
echo ========================================
echo.
echo Your TempMail service is now available at:
echo https://%APP_NAME%.herokuapp.com
echo.
echo Test the service:
echo 1. Open the URL above
echo 2. Generate a temporary email
echo 3. Test the web interface
echo.
echo Note: SMTP port 25 is not available on Heroku free tier
echo For full SMTP support, consider Railway or DigitalOcean
echo.
pause

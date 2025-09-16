@echo off
echo ========================================
echo    DEPLOY TEMPMAIL KE HEROKU
echo ========================================
echo.

echo 1. Initializing Git repository...
git init
git add .
git commit -m "Initial commit for Heroku deployment"

echo.
echo 2. Creating Heroku app...
heroku create temp-mail-app-email

echo.
echo 3. Setting environment variables...
heroku config:set NODE_ENV=production
heroku config:set SMTP_PORT=25

echo.
echo 4. Deploying to Heroku...
git push heroku main

echo.
echo 5. Opening app...
heroku open

echo.
echo ========================================
echo    DEPLOYMENT COMPLETED!
echo ========================================
echo.
echo Your TempMail will be available at:
echo https://temp-mail-app-email.herokuapp.com
echo.
echo SMTP Server will be running on port 25
echo You can send emails from Gmail, Yahoo, etc.
echo.
pause

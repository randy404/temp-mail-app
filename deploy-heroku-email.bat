@echo off
echo ========================================
echo    DEPLOY TEMPMAIL KE HEROKU
echo    (Untuk bisa terima email pribadi)
echo ========================================
echo.

echo 1. Installing Heroku CLI...
echo Please install Heroku CLI from: https://devcenter.heroku.com/articles/heroku-cli
echo.

echo 2. Login to Heroku...
heroku login

echo.
echo 3. Creating Heroku app...
heroku create temp-mail-app-email

echo.
echo 4. Setting environment variables...
heroku config:set NODE_ENV=production
heroku config:set SMTP_PORT=25

echo.
echo 5. Deploying to Heroku...
git add .
git commit -m "Deploy TempMail with SMTP support"
git push heroku main

echo.
echo 6. Opening app...
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

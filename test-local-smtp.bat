@echo off
echo ========================================
echo    TEST TEMPMAIL LOKAL DENGAN SMTP
echo ========================================
echo.

echo 1. Starting local TempMail with SMTP...
echo 2. SMTP Server will run on port 2525
echo 3. You can send emails from your email client
echo.

echo Starting server...
node public-email-service.js

echo.
echo ========================================
echo    SMTP CONFIGURATION:
echo ========================================
echo.
echo SMTP Host: localhost
echo SMTP Port: 2525
echo SMTP Security: None
echo.
echo Test dengan email client:
echo 1. Generate email di dashboard
echo 2. Kirim email ke alamat tersebut
echo 3. Check inbox di dashboard
echo.
pause

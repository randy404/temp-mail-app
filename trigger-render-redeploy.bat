@echo off
echo ========================================
echo    TRIGGER RENDER REDEPLOY
echo ========================================
echo.

echo 1. Changes pushed to GitHub successfully!
echo 2. Render will automatically redeploy...
echo 3. Wait 2-3 minutes for deployment to complete
echo.

echo Opening Render dashboard...
start https://dashboard.render.com

echo.
echo ========================================
echo    REDEPLOY IN PROGRESS
echo ========================================
echo.
echo Your TempMail will be updated with the correct interface:
echo - Dashboard layout (not public-interface)
echo - Login system
echo - Email history
echo - Test email sender
echo.
echo Check: https://temp-mail-app.onrender.com
echo.
echo Wait 2-3 minutes, then refresh the page!
echo.
pause

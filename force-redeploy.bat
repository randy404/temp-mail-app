@echo off
echo ========================================
echo    FORCE REDEPLOY TO RENDER
echo ========================================
echo.

echo 1. Adding changes...
git add .

echo.
echo 2. Creating empty commit to trigger redeploy...
git commit --allow-empty -m "Force redeploy - fix interface routing"

echo.
echo 3. Pushing to GitHub...
git push origin main

echo.
echo 4. Opening Render dashboard...
start https://dashboard.render.com

echo.
echo ========================================
echo    FORCE REDEPLOY TRIGGERED
echo ========================================
echo.
echo Changes pushed to GitHub with empty commit.
echo This will force Render to redeploy.
echo.
echo Wait 3-5 minutes, then check:
echo https://temp-mail-app.onrender.com
echo.
echo The interface should now show the correct dashboard!
echo.
pause

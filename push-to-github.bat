@echo off
echo ========================================
echo    PUSH TEMPMAIL KE GITHUB
echo ========================================
echo.

echo 1. Adding remote repository...
echo Please create a new repository on GitHub first!
echo Repository name: temp-mail-app
echo.

set /p REPO_URL="Enter your GitHub repository URL (e.g., https://github.com/username/temp-mail-app.git): "

echo.
echo 2. Adding remote origin...
git remote add origin %REPO_URL%

echo.
echo 3. Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo    GITHUB REPOSITORY READY!
echo ========================================
echo.
echo Now you can deploy to Render:
echo 1. Go to render.com
echo 2. Connect GitHub repository
echo 3. Deploy TempMail
echo.
pause

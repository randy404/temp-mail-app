@echo off
echo Deploying TempMail to Vercel...
echo.

REM Set default values untuk menghindari prompt interaktif
echo y | vercel --prod --name temp-mail-app --yes

echo.
echo Deployment completed!
echo Check your Vercel dashboard for the URL
pause

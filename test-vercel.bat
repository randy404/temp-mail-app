@echo off
echo ========================================
echo    TESTING TEMPMAIL VERCEL DEPLOYMENT
echo ========================================
echo.

set URL=https://temp-mail-jtt9loffl-randymay2178-1570s-projects.vercel.app

echo 1. Opening TempMail Website...
start %URL%
timeout /t 3 /nobreak >nul

echo.
echo 2. Testing API Endpoints...
echo.

echo Testing /api/generate...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%URL%/api/generate' -Method GET; Write-Host 'SUCCESS: ' $response.StatusCode; Write-Host 'Response: ' $response.Content } catch { Write-Host 'ERROR: ' $_.Exception.Message }"

echo.
echo Testing /api/domains...
powershell -Command "try { $response = Invoke-WebRequest -Uri '%URL%/api/domains' -Method GET; Write-Host 'SUCCESS: ' $response.StatusCode; Write-Host 'Response: ' $response.Content } catch { Write-Host 'ERROR: ' $_.Exception.Message }"

echo.
echo 3. Manual Testing Instructions:
echo.
echo    a) Generate a new email in the website
echo    b) Copy the email address
echo    c) Test with: %URL%/api/emails/YOUR_EMAIL_ADDRESS
echo    d) Try registering on websites with the temp email
echo.
echo 4. Open Testing Guide...
start TESTING_GUIDE.md

echo.
echo Testing completed! Check the opened files for results.
pause

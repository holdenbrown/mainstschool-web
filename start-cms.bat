@echo off
echo Starting Netlify CMS Proxy Server...
echo.
echo This will allow you to test the CMS locally without authentication.
echo Keep this window open while testing the CMS.
echo.
echo Access your site at: http://localhost:5500
echo Access the CMS at: http://localhost:5500/admin/
echo.
REM Prefer npx to avoid requiring a global install
npx -y netlify-cms-proxy-server@latest
pause

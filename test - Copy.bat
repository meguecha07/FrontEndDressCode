@echo off
setlocal enabledelayedexpansion

REM Primero, genera la estructura de carpetas excluyendo .git, dist y node_modules
(for /d %%D in (*) do (
  if /I NOT "%%D"==".git" if /I NOT "%%D"=="dist" if /I NOT "%%D"=="node_modules" (
    tree "%%D" /F /A
  )
)) > estructura_carpetas.txt

REM Luego, agrega el contenido de cada archivo en src\main y todas sus subcarpetas, excluyendo las carpetas especificadas y archivos .css
for /r "src\" %%F in (*) do (
  set "skip=0"
  for %%D in (.git dist node_modules) do (
    echo %%F | findstr /I /C:"\\%%D\\" >nul && set "skip=1"
  )
  if /I "%%~xF"==".css" set "skip=1"
  if !skip! NEQ 1 (
    echo. >> estructura_carpetas.txt
    echo Contenido de: %%F >> estructura_carpetas.txt
    echo ----------------------------- >> estructura_carpetas.txt
    type "%%F" >> estructura_carpetas.txt
    echo. >> estructura_carpetas.txt
  )
)

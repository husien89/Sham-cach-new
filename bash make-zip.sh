#!/usr/bin/env bash
# ==============================================================
# SHAM.CASH - Full project generator + ZIP packager
# Requires: bash, python3 (pre-installed on Linux/macOS)
# ==============================================================
set -euo pipefail

PROJECT="sham-cash"
rm -rf "$PROJECT" "$PROJECT.zip"
mkdir -p "$PROJECT"

# ---------- Directory structure ----------
mkdir -p "$PROJECT/.github/workflows"
mkdir -p "$PROJECT/app/src/main/java/com/husien/shamcash"
mkdir -p "$PROJECT/app/src/main/res/layout"
mkdir -p "$PROJECT/app/src/main/res/values"
mkdir -p "$PROJECT/app/src/main/res/xml"
mkdir -p "$PROJECT/app/src/main/res/drawable"

cd "$PROJECT"

# ==============================================================
# 1) .gitignore
# ==============================================================
cat > .gitignore <<'SHAMEOF'
*.iml
.gradle/
/local.properties
/.idea/
.DS_Store
/build/
/app/build/
/captures/
.externalNativeBuild/
.cxx/
local.properties
*.hprof
*.jks
*.keystore
SHAMEOF

# ==============================================================
# 2) README.md
# ==============================================================
cat > README.md <<'SHAMEOF'
# SHAM.CASH

Native Android WebView application for https://sham.cash

## Build

### GitHub Actions (recommended)

Push to `main` or open a Pull Request. The APK is built automatically
and uploaded as a workflow artifact.

### Local build

Requirements:
- JDK 17
- Android SDK Platform 35
- Gradle 8.9

```bash
gradle assembleDebug

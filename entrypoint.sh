#!/bin/bash
set -e

echo "=== Bockovino Auto-Update Entrypoint ==="

# Konfiguračné premenné (môžu byť nastavené cez environment variables)
REPO_URL="${GIT_REPO_URL:-https://github.com/matoboco/bockovino2026.git}"
BRANCH="${GIT_BRANCH:-main}"
REPO_DIR="/app/repo"
WEB_ROOT="/usr/share/nginx/html"

echo "Repository URL: $REPO_URL"
echo "Branch: $BRANCH"

# Kontrola, či už existuje git repo
if [ -d "$REPO_DIR/.git" ]; then
    echo "Git repository už existuje, robím git pull..."
    cd "$REPO_DIR"

    # Nastavenie bezpečnosti pre git (kvôli ownership)
    git config --global --add safe.directory "$REPO_DIR"

    # Pull najnovších zmien
    git fetch origin "$BRANCH"
    git reset --hard "origin/$BRANCH"

    echo "✓ Git pull dokončený"
else
    echo "Inicializujem git repository..."
    cd /app

    # Klonovanie repository
    git clone --branch "$BRANCH" --single-branch "$REPO_URL" repo

    echo "✓ Repository naklonovaný"
fi

# Kopírovanie web obsahu do nginx root
echo "Kopírujem web obsah do nginx..."
if [ -d "$REPO_DIR/web" ]; then
    cp -r "$REPO_DIR/web/"* "$WEB_ROOT/"
    echo "✓ Web obsah skopírovaný z $REPO_DIR/web/"
else
    echo "⚠ Adresár $REPO_DIR/web/ neexistuje!"
fi

echo "=== Spúšťam nginx ==="
echo ""

# Spustenie nginx (alebo iného príkazu z CMD)
exec "$@"

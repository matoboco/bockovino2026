#!/bin/bash

echo "🍷 Bockovino Docker Auto-Update"
echo "================================"
echo ""

# Kontrola, či existuje docker-compose.updated.yml
if [ -f "docker-compose.updated.yml" ]; then
    COMPOSE_FILE="docker-compose.updated.yml"
    echo "ℹ️  Používam docker-compose.updated.yml"
else
    COMPOSE_FILE="docker-compose.yml"
    echo "ℹ️  Používam docker-compose.yml"
fi

# Ak je parameter "build" alebo "rebuild"
if [ "$1" = "build" ] || [ "$1" = "rebuild" ]; then
    echo "🔨 Building Docker image..."
    docker-compose -f "$COMPOSE_FILE" build --no-cache
fi

# Spustenie
echo "🚀 Spúšťam kontajner..."
docker-compose -f "$COMPOSE_FILE" up -d

# Status
echo ""
echo "✅ Hotovo!"
echo ""
docker-compose -f "$COMPOSE_FILE" ps
echo ""
echo "📊 Logy (CTRL+C pre ukončenie):"
docker-compose -f "$COMPOSE_FILE" logs -f

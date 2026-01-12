# Bockovino - Docker Auto-Update Setup

## Popis

Toto riešenie automaticky stiahne najnovšiu verziu webstránky z Git repository pri každom spustení/reštarte Docker kontajnera.

## Ako to funguje

1. Pri spustení kontajnera sa automaticky spustí `entrypoint.sh` skript
2. Skript urobí `git pull` (alebo `git clone` pri prvom spustení) z určenej vetvy
3. Obsah `web/` adresára sa skopíruje do nginx root
4. Nginx sa spustí a zobrazí aktuálnu verziu stránky

## Použitie na Synology

### Prvé nastavenie:

1. **Skopíruj tieto súbory na Synology:**
   - `Dockerfile`
   - `entrypoint.sh`
   - `docker-compose.updated.yml`

2. **Premenuj docker-compose súbor:**
   ```bash
   mv docker-compose.updated.yml docker-compose.yml
   ```
   (Alebo si zachovaj oba a použi `docker-compose.updated.yml` manuálne)

3. **Nastav git vetvu (voliteľné):**
   Edituj `docker-compose.yml` a zmeň:
   ```yaml
   - GIT_BRANCH=main  # Zmeň na tvoju vetvu, napr. production
   ```

4. **Build a spustenie:**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

### Aktualizácia obsahu:

Keď urobíš zmeny v GitHub repository:

```bash
# Jednoducho reštartuj kontajner
docker-compose restart

# Alebo úplne znovu vytvor kontajner
docker-compose down
docker-compose up -d
```

Pri každom reštarte sa automaticky stiahne najnovšia verzia z GitHub!

## Výhody

✅ **Automatická aktualizácia** - pri reštarte sa načíta nový obsah z GitHub
✅ **Jednoduchá správa** - stačí pushnúť do GitHub a reštartovať kontajner
✅ **Rýchle deploymenty** - git pull je rýchlejší než manuálne kopírovanie
✅ **Verziovanosť** - všetky zmeny sú v git histórii
✅ **Rollback** - môžeš ľahko vrátiť na staršiu verziu zmenou vetvy

## Pokročilé použitie

### Použitie inej vetvy (napr. production):

```bash
docker-compose down
docker-compose up -d -e GIT_BRANCH=production
```

### Manuálny git pull bez reštartu:

```bash
docker exec bockovino-web /entrypoint.sh nginx -g "daemon off;"
```

### Zobrazenie logov:

```bash
docker-compose logs -f web
```

### Privátne repository:

Ak je tvoje repo privátne, vytvor `.env` súbor:

```bash
GIT_REPO_URL=https://username:personal_access_token@github.com/matoboco/bockovino2026.git
GIT_BRANCH=main
```

A v `docker-compose.yml` použi:

```yaml
env_file:
  - .env
```

## Troubleshooting

**Problém:** Kontajner sa nespustí
```bash
docker-compose logs web
```

**Problém:** Git pull nefunguje
```bash
docker exec -it bockovino-web bash
cd /app/repo
git status
```

**Problém:** Stará verzia obsahu
```bash
# Vymaž volume a kontajner
docker-compose down -v
docker-compose up -d --build
```

## Staré riešenie vs. Nové riešenie

### Staré (docker-compose.yml):
```yaml
volumes:
  - ./web:/usr/share/nginx/html  # Priame mountovanie lokálneho adresára
```
- ❌ Musíš manuálne robiť git pull na Synology
- ❌ Potrebuješ SSH/terminálový prístup
- ❌ Lokálne súbory sa môžu rozísť s GitHub

### Nové (docker-compose.updated.yml):
```yaml
build: .
environment:
  - GIT_BRANCH=main  # Automatický git pull pri štarte
```
- ✅ Automatický git pull pri reštarte
- ✅ Stačí reštartovať v Synology UI
- ✅ Vždy aktuálna verzia z GitHub

## Synology DSM - Container Manager

V Synology Container Manager:

1. Klikni na kontajner `bockovino-web`
2. Zvoľ "Restart"
3. Kontajner sa reštartuje a automaticky stiahne najnovšiu verziu!

Jednoduché ako facka! 🍷

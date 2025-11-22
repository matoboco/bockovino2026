# Walkthrough - Nový Web Vinárstvo BOČKO

Tento dokument popisuje vytvorenie nového webu pre rodinné vinárstvo Bočko. Web je navrhnutý v minimalistickom, ale hrejivom rodinnom štýle, s dôrazom na tradíciu a kvalitu.

## Prehľad Zmien

### 1. Dizajn a Štruktúra
- **HTML5/CSS3:** Čistý kód bez ťažkých frameworkov.
- **Responzivita:** Web je plne prispôsobený pre mobily a tablety.
- **Vizuálna identita:**
    - Farby: Vínová červená (`#722F37`) a Teplá béžová (`#D4C4A8`).
    - Fonty: *Playfair Display* (nadpisy) a *Lato* (text).
- **Obrázky:** Použité vygenerované realistické vizuály (vinice, hrozno, víno) a existujúce logo.

### 2. Štruktúra (One-Page)
Web je realizovaný ako jednostránková aplikácia (Single Page) pre plynulý užívateľský zážitok. Všetok obsah je dostupný scrollovaním alebo cez navigáciu v hlavičke.

- **Domov (`#domov`):** Hero sekcia s atmosférou viníc.
- **O nás (`#o-nas`):** Príbeh rodiny a vinárstva.
- **Vinohrady (`#vinohrady`):** Informácie o integrovanej produkcii.
- **Vína (`#vina`):** Katalóg vín.
- **Kontakt (`#kontakt`):** Kontaktné údaje a formulár.

### 3. Funkcionalita
- **Mapa:** Implementovaná pomocou **Leaflet.js** (OpenStreetMap) so zobrazením polohy vinárstva.
- **Formulár:** Pripravený na použitie so službou **Formspree** (pre statické weby). Je potrebné zaregistrovať sa na formspree.io a nahradiť `YOUR_FORM_ID` v `index.html`.
- **Sezónne pozadie:** Úvodná fotka (`hero-bg`) sa automaticky mení podľa aktuálneho mesiaca (Jar, Leto, Jeseň, Zima).

### 4. Deployment (Docker)
Pripravené súbory pre nasadenie pomocou Dockeru:
- `docker-compose.yml`: Konfigurácia služby, ktorá stiahne `nginx:alpine` image a mapuje adresár `./web` do kontajnera.

Spustenie:
```bash
docker-compose up -d
```
Web bude dostupný na `http://localhost:9980`.

## Súbory
- `web/`: Hlavný adresár so zdrojovým kódom stránky.
    - `index.html`: Hlavný súbor.
    - `css/style.css`: Štýly.
    - `js/main.js`: Skripty.
    - `assets/images/`: Obrázky.
- `docs/`: Dokumentácia.

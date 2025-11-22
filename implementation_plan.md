# Plán Implementácie - Nový Web Vinárstvo BOČKO

## Cieľ
Vytvoriť modernú, vizuálne atraktívnu a responzívnu webovú stránku pre rodinné vinárstvo Bočko, ktorá bude lepšie reprezentovať kvalitu ich vín a dlhoročnú tradíciu. Web bude vychádzať z existujúceho obsahu (texty, logo), ale s úplne novým dizajnom a technickým riešením.

## Technológie
- **HTML5:** Sémantická štruktúra pre lepšie SEO.
- **CSS3:** Moderný dizajn s využitím Flexbox/Grid, CSS premenných pre jednoduchú správu farieb a typografie. Žiadne ťažké frameworky (ako Bootstrap), aby bol web rýchly a unikátny.
- **JavaScript (Vanilla):** Pre interaktívne prvky (mobilné menu, galéria, animácie).
- **Optimalizácia:** Dôraz na rýchlosť načítania a mobilnú verziu (Mobile First).

## Dizajn a Vizuálna Identita
- **Štýl:** Minimalistický a moderný, ale s dôrazom na **hrejivú rodinnú atmosféru**. Web nesmie pôsobiť chladne/korporátne.
- **Atmosféra:** Prívetivá, osobná, autentická. Použitie jemných textúr alebo organických tvarov.
- **Farby:**
    - Primárna: Vínová červená / Bordová (hlboká, teplá).
    - Sekundárna: Teplá béžová / Zlatistá (piesková) - pre zjemnenie a teplo.
    - Akcenty: Jemná zelená (vinohrad) alebo terakotová.
    - Pozadie: Krémová biela (nie sterilná biela) pre mäkší dojem.
- **Typografia:** Kombinácia moderného pätkového písma (napr. *Playfair Display* alebo *Merriweather*) pre nadpisy a čistého bezpätkového (napr. *Lato* alebo *Open Sans*) pre text.
- **Obrázky:** Autentické rodinné fotografie kombinované s vygenerovanými tematickými vizuálmi (atmosférické zábery viníc, detail hrozna, slnko).

## Štruktúra Stránok (One-Page)
Web bude fungovať ako jedna dlhá stránka s plynulým scrollovaním medzi sekciami.

### 1. Hero sekcia (Domov)
- Veľká fotka na pozadí, logo, uvítací text, CTA tlačidlo.

### 2. O nás (Sekcia `#o-nas`)
- Príbeh rodiny a vinárstva.

### 3. Naše vinohrady (Sekcia `#vinohrady`)
- Informácie o lokalite a integrovanej produkcii.

### 4. Naše vína (Sekcia `#vina`)
- Katalóg vín (Biele, Vyzreté, Červené).
- **NOVÉ:** Interaktívne karty vín. Po kliknutí na názov/kartu sa **rozbalí detail** priamo v karte (akordeónový štýl). Obsahuje menší obrázok, popis a párovanie.

### 5. Kontakt (Sekcia `#kontakt`)
- Adresa, mapa (Leaflet.js - OpenStreetMap).
- Formulár (spracovanie cez externú službu napr. Formspree, keďže ide o statický web).

## Plán Prác (Fázy)
1. **Príprava:** Nastavenie štruktúry projektu, stiahnutie fontov, definícia farieb.
2. **Layout:** Vytvorenie hlavičky (menu) a pätičky.
3. **Homepage:** Kódovanie hlavnej stránky.
4. **Podstránky:** Kódovanie obsahu O nás, Vinohrady, Vína, Kontakt.
5. **Responsivita:** Ladenie zobrazenia pre mobily a tablety.
6. **Finalizácia:** SEO meta tagy, optimalizácia obrázkov, testovanie.

## Požiadavka na kontrolu používateľom
- Prosím skontrolujte navrhovanú štruktúru a technológie.
- Máte preferencie ohľadom farebnosti, ak sa líši od návrhu?

## Deployment (Docker)
- **Kontajnerizácia:** Vytvorenie `Dockerfile` pre Nginx (Alpine verzia pre minimalizáciu veľkosti).
- **Orchestrácia:** Vytvorenie `docker-compose.yml` pre jednoduché spustenie.
- **Konfigurácia:**
    - Nginx bude servovať statické súbory (HTML, CSS, JS, obrázky).
    - Počúvanie na porte 80 (http).
    - SSL/HTTPS nebude riešené na úrovni kontajnera (offloading na Cloudflare).

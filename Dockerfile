FROM nginx:alpine

# Inštalácia git a bash
RUN apk add --no-cache git bash

# Vytvorenie adresára pre repo
RUN mkdir -p /app/repo

# Kopírovanie entrypoint skriptu
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Nastavenie pracovného adresára
WORKDIR /app/repo

# Použitie custom entrypoint
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

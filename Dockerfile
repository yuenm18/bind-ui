FROM node:10

EXPOSE 53/udp
EXPOSE 3001

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y bind9 bind9utils && \
    echo '#!/bin/bash\nservice bind9 restart' > /usr/local/sbin/rndc && \
    chmod +x /usr/local/sbin/rndc

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

ENTRYPOINT ["./docker-entrypoint.sh"]
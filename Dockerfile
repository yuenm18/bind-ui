FROM node:10

EXPOSE 53/udp
EXPOSE 3001

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y bind9 bind9utils && \
    echo '#!/bin/bash\nservice bind9 restart' > /usr/local/sbin/rndc && \
    echo '#!/bin/bash\nservice bind9 start\nnode server/bin/www' > run.sh && \
    chmod +x /usr/local/sbin/rndc run.sh

ARG ORIGIN
ARG ZONE_FILE

RUN echo "zone \"$ORIGIN\" {\n  type master;\n  file \"$ZONE_FILE\";\n};\n" >> /etc/bind/named.conf.local && \
    echo "\$ORIGIN $ORIGIN\n\$TTL 86400\n@ IN SOA ns1.$ORIGIN admin.$ORIGIN 1 604800 86400 2419200 86400\n@ 86400 IN NS ns1.$ORIGIN\nns1 86400 IN A 127.0.0.1\n" >> /etc/bind/db.$ORIGIN

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

ENTRYPOINT /usr/src/app/run.sh
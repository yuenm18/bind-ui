#!/bin/bash

set -e

service bind9 start

echo -e "zone \"$ORIGIN\" {\n  type master;\n  file \"$ZONE_FILE\";\n};\n" >> /etc/bind/named.conf.local
echo -e "\$ORIGIN $ORIGIN\n\$TTL 86400\n@ IN SOA ns1.$ORIGIN admin.$ORIGIN 1 604800 86400 2419200 86400\n@ 86400 IN NS ns1.$ORIGIN\nns1 86400 IN A 127.0.0.1\n" >> /etc/bind/db.$ORIGIN

node server/bin/www

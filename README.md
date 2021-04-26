# Setup Howto

## building all containers
```
docker build -t bind9 bind9
docker build -t webapp-with-proxy webapp-with-proxy
docker build -t webapp-without-proxy webapp-without-proxy
(docker build -t ubuntu-with-ping ubuntu-with-ping)
```

## DNS server
See [running a dns server in docker](https://medium.com/nagoya-foundation/running-a-dns-server-in-docker-61cc2003e899) for more information.
<see files in networking>
create a new bridged network
```
docker network create --driver=bridge --subnet=172.20.0.0/16 japan-net
```
run the networking bind9 container
```
docker run -d --rm --name=dns-server --net=japan-net --ip=172.20.0.2 bind9
```
start the bind9 daemon
```
docker exec -d dns-server /etc/init.d/bind9 start
```

## start json-webserver
```
cd json-webserver
docker run --rm -p 3000:3000 --name json-server --net=japan-net --ip=172.20.0.5 --dns=172.20.0.2 -v `pwd`:/data williamyeh/json-server --watch db.json
```

## start the webapps
```
docker run -d --rm -p 80:80 --name webapp-with-proxy --net=japan-net --ip=172.20.0.6 --dns=172.20.0.2 webapp-with-proxy
docker run -d --rm -p 81:80 --name webapp-without-proxy --net=japan-net --ip=172.20.0.7 --dns=172.20.0.2 webapp-without-proxy
```

## start cors-anywhere from repository redocly
```
docker run -d --rm -p 8080:8080 --name cors-anywhere --net=japan-net --ip=172.20.0.8 --dns=172.20.0.2 redocly/cors-anywhere
```

## TODO: connect to the network via socks
```
docker run -d --rm -p 1337:1080 --name socks5 --net=japan-net --ip=172.20.0.9 --dns=172.20.0.2 serjs/go-socks5-proxy
```

## name resolution for host
add the following entries to your computers hosts file under `/etc/hosts`:
```
127.0.0.1  proxy.tokyo-foundation.com
127.0.0.1  webapp-with-proxy.tokyo-foundation.com
127.0.0.1  webapp-without-proxy.tokyo-foundation.com
```

## now the webapps are accessible under:
http://webapp-without-proxy.tokyo-foundation.com:81/
http://webapp-with-proxy.tokyo-foundation.com/
http://json-server.nagoya-foundation.com:3000/posts


## For testing purposes
start ubuntu with ping
```
docker run -d --rm --name=host1 --net=japan-net --ip=172.20.0.3 --dns=172.20.0.2 ubuntu-with-ping /bin/bash -c "while :; do sleep 10; done"
docker run -d --rm --name=host2 --net=japan-net --ip=172.20.0.4 --dns=172.20.0.2 ubuntu-with-ping /bin/bash -c "while :; do sleep 10; done"
```
accessing host1
```
docker exec -it host1 bash
> ping host1.nagoya-foundation.com
> ping json-server.nagoya-foundation.com
```

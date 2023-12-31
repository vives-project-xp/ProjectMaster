# EMQX

## Table of contents

* Installation
* Clients
* Dashboard

## Installation

1. To get the Docker image, run: bash

```YML

  docker pull emqx/emqx:5.3.0

```

2. To start the Docker container, run:

```YML

  docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083  emqx:5.3.0

```

3. make the git ignore

so your data is not shared to github

```YML
.emqx1_data
```

4. Make a docker compose file

```YML

version: '3'

services:
  emqx1:
    image: emqx/emqx:5.2.1
    container_name: emqx
    environment:
    - "EMQX_NODE_NAME=emqx@Projectmaster"
    - "EMQX_CLUSTER__DISCOVERY_STRATEGY=static"
    - "EMQX_CLUSTER__STATIC__SEEDS=[emqx@Projectmaster]"
    - "EMQX_LISTENER__SSL__EXTERNAL__CERTFILE=etc/certs/emqx.pem"
    - "EMQX_LISTENER__SSL__EXTERNAL__CACERTFILE=etc/certs/ca.pem"
    - "EMQX_LISTENER__SSL__EXTERNAL__KEYFILE=etc/certs/emqx.key"
    ports:
      - 1883:1883
      - 8083:8083
      - 8084:8084
      - 8883:8883
      - 18083:18083 
    volumes:
      - ./emqx1_data:/opt/emqx/data

```

5. run the docker compose  file

```YML
 docker-compose up
```

#### documentation

https://www.emqx.io/docs/en/latest/deploy/install-docker.html

## Clients

### usernames

  - Aurora
  - lannootree
  - Dancing light(DL)
  - Raining leds(RL)
  - Music light Tiles(MLT)
  - EOMarkers

#### Access

- If you need password ask the admin
- if you need access to mqtt explorer use the Username and Password you got from the admin

### Topics
 Every Project has his own topic where they can send and recieve data from (PM/{username}/{devices})



### Dashboard

this is the main dashboard where you can see the basic things.

<b>Things like </b>
  - amount of messages
  - Amount of connections/ live connections
  - amount of topics
  - amount of subscriptions at that moment

<b>There is also the node information where you can find</b>
- The name of the node
- the uptime
- the CPU and Memory load 
- and so much more

<img src="img/EMQX.PNG" alt="EMQX image">
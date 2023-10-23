# EMQX 

## Table of contents

* Installation
* Clients
* Security

## Installation

1. To get the Docker image, run: bash

``` YML

  docker pull emqx/emqx:5.3.0

```

2. To start the Docker container, run:

``` YML

  docker run -d --name emqx -p 1883:1883 -p 8083:8083 -p 8084:8084 -p 8883:8883 -p 18083:18083  emqx:5.3.0

```

3. make the git ignore
``` YML


emqx1_data


```


4. Make a docker compose file
``` YML

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

``` YML

 docker-compose up

```

#### documentation
https://www.emqx.io/docs/en/latest/deploy/install-docker.html



## Clients

### Lannootree

username: Lannootree


### EOMarkers

username:  
- 10:91:A8:F1:0F:7C
- 58:CF:79:E2:9A:BC	
- 58:CF:79:E2:C6:C4	
- 58:CF:79:E3:7F:A4	

### Tracking light

username : Aurora


### Dancing light

username : DL

### Raining leds

username : RL


### Nodered

username : Nodered


#### Acces
- If you need password ask the admin
- if you need acces to mqtt explorer ask admin





## Authorization

### Lannootree

| Action  	|  Permission 	|   Topic	|   	|   	|
|---	|---	|---	|---	|---	|
|  Publish & Subscribe 	|  Allow 	|  PM/Lannootree/Lannootree/effect 	|
|  Publish & Subscribe 	|  Allow 	|  PM/Lannootree/Lannootree/command	|
|  Publish & Subscribe	|  Allow 	|  PM/Lannootree/Lannootree/rgb 	|   	
|  Publish & Subscribe	|  Deny 	|  	$SYS/# 	| 







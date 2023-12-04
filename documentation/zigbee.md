# EMQX

## Table of contents

* Openhabian installation
* Zigbee2mqtt installation
* connect buttons

## Openhabian installation

 
 1. Install openhabian Raspberry Pi version from the link below.
 https://www.openhab.org/download/
 Install the .img.xz file and flash it onto the usb with etcher or rufus.

 2. Change the ssid and password in the openhabian.conf file.


 

 3. put the usb in the raspberry and after startup you will get the blue screen from the link below. 
  https://www.openhab.org/docs/installation/openhabian.html

 4. select optional Components and install zigbee2mqtt. Than execute and exit.

 5. Install mqtt binding via gui on the ip address of the pi followed with the port :8080.
 
 https://www.youtube.com/watch?v=-U4-ZFYftLY

 6. Connect with the ip address with putty to make it easier to copy code.

 put in these commands: 
 ```sh

    sudo bash
    # install git - you can skip this if it's already installed
    apt-get update
    apt-get install git

    # download, link and create config file
    git clone -b openHAB https://github.com/openhab/openhabian.git /opt/openhabian
    ln -s /opt/openhabian/openhabian-setup.sh /usr/local/bin/openhabian-config
    cp /opt/openhabian/build-image/openhabian.conf /etc/openhabian.conf

    

```
you can use ``` sudo openhabian-config ``` if you want to add more components.




## Zigbee2mqtt installation for Conbee ||

1. We first need to determine the location of the adapter. Connect the adapter to your Raspberry Pi. Most of the times the location is /dev/ttyACM0. This can be verified by:

```sh
pi@raspberry:~ $ ls -l /dev/ttyACM0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyACM0  # <-- adapter (CC2531 in this case) on /dev/ttyACM0

```

2. Setup 

```sh
    # Set up Node.js repository and install Node.js + required dependencies
    # NOTE 1: Older i386 hardware can work with [unofficial-builds.nodejs.org](https://unofficial-builds.nodejs.org/download/release/v16.15.0/ e.g. Version 16.15.0 should work.
    # NOTE 2: For Ubuntu see tip below
    sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs git make g++ gcc

    # Verify that the correct nodejs and npm (automatically installed with nodejs)
    # version has been installed
    node --version  # Should output V16.x, V17.x, V18.X or V20.X
    npm --version  # Should output 6.X, 7.X or 8.X

    # Create a directory for zigbee2mqtt and set your user as owner of it
    sudo mkdir /opt/zigbee2mqtt
    sudo chown -R ${USER}: /opt/zigbee2mqtt

    # Clone Zigbee2MQTT repository
    git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git /opt/zigbee2mqtt

    # Install dependencies (as user "pi")
    cd /opt/zigbee2mqtt
    npm ci
    # If this command fails and returns an ERR_SOCKET_TIMEOUT error, run this command instead: npm ci  --maxsockets 1

    # Build the app
    npm run build

```

TIP

On Ubuntu, Node.js can be installed through Snap
```sh
    # Install latest nodejs from snap store
    # The --classic argument is required here as Node.js needs full access to your system in order to be useful.
    # You can also use the --channel=XX argument to install a legacy version where XX is the version you want to install (we need 14+).
    sudo snap install node --classic

    # Verify node has been installed
    # If you encounter an error at this stage and used the snap store instructions, adjust the BIN path as follows:
    ## PATH=$PATH:/snap/node/current/bin
    # then re-verify nodejs and npm versions as above
    node --version

```

3. Configure

```sh
cp /opt/zigbee2mqtt/data/configuration.example.yaml /opt/zigbee2mqtt/data/configuration.yaml
nano /opt/zigbee2mqtt/data/configuration.yaml

```
 If this doesn't work try sudo in front of the command.

 Put this in the configuration.yaml:

 ```yaml

    homeassistant: true

    # Enable the frontend, runs on port 8081
    frontend:
    # Optional, default 8080
    port: 8081
    # Optional, default 0.0.0.0. Opens a unix socket when given a path instead of an address (e.g. '/run/zigbee2mqtt/zigbee2mqtt.sock')
    host: 0.0.0.0
    # Optional, enables authentication, disabled by default
    auth_token: your-secret-token
    # Optional, url on which the frontend can be reached, currently only used for the Home Assistant device configuration page
    url: 'https://zigbee2mqtt.myhouse.org'
    # Optional, certificate file path for exposing HTTPS. The sibling property 'ssl_key' must be set for HTTPS to be activated
    ssl_cert: /config/etc/letsencrypt/live/mydomain.com/fullchain.pem
    # Optional, private key file path for exposing HTTPS. The sibling property 'ssl_cert' must be set for HTTPS to be activated
    ssl_key: /config/etc/letsencrypt/live/mydomain.com/privkey.pem

    mqtt:
    base_topic: zigbee2mqtt
    server: mqtt://projectmaster.devbit.be
    user: openhabian
    password: admin

    serial:
    port: /dev/ttyACM0
    adapter: deconz



 ```

 Save the file and exit.

 4. Starting zigbee2mqtt.

```sh
    cd /opt/zigbee2mqtt
    npm start
```
    
 If everything works you should be able to connect to the ip address of the pi with port 8081 and see the gui from the zigbee2mqtt.


 Now that everything works, we want systemctl to start Zigbee2MQTT automatically on boot, this can be done by executing:
 ```sh
    sudo systemctl enable zigbee2mqtt.service
```


5. Some tips that can be handy later:

```sh
# Stopping Zigbee2MQTT
sudo systemctl stop zigbee2mqtt

# Starting Zigbee2MQTT
sudo systemctl start zigbee2mqtt

# View the log of Zigbee2MQTT
sudo journalctl -u zigbee2mqtt.service -f

```
 ## Connect buttons

 For the 8 button zigbee switch: 
 klick in the gui on Permit join (all)
 hold the 2 top buttons until the ligth is on and then click on the top right button. the led should flicker now and hold it close to the gateway and it would connect and show up. 


 ## start after boot

 To run Zigbee2MQTT as daemon (in background) and start it automatically on boot we will run Zigbee2MQTT with systemctl.

```sh
# Create a systemctl configuration file for Zigbee2MQTT
sudo nano /etc/systemd/system/zigbee2mqtt.service
```


Add the following to this file:
```text
[Unit]
Description=zigbee2mqtt
After=network.target

[Service]
Environment=NODE_ENV=production
ExecStart=/usr/bin/npm start
WorkingDirectory=/opt/zigbee2mqtt
StandardOutput=inherit
# Or use StandardOutput=null if you don't want Zigbee2MQTT messages filling syslog, for more options see systemd.exec(5)
StandardError=inherit
Restart=always
RestartSec=5s
User=root

[Install]
WantedBy=multi-user.target
```

Verify that the configuration works:

```sh
# Start Zigbee2MQTT
sudo systemctl start zigbee2mqtt

# Show status
systemctl status zigbee2mqtt.service
```

Output should look like:

```sh
pi@raspberry:/opt/zigbee2mqtt $ systemctl status zigbee2mqtt.service
● zigbee2mqtt.service - zigbee2mqtt
   Loaded: loaded (/etc/systemd/system/zigbee2mqtt.service; disabled; vendor preset: enabled)
   Active: active (running) since Thu 2018-06-07 20:27:22 BST; 3s ago
 Main PID: 665 (npm)
   CGroup: /system.slice/zigbee2mqtt.service
           ├─665 npm
           ├─678 sh -c node index.js
           └─679 node index.js

Jun 07 20:27:22 raspberry systemd[1]: Started zigbee2mqtt.
Jun 07 20:27:23 raspberry npm[665]: > zigbee2mqtt@1.6.0 start /opt/zigbee2mqtt
Jun 07 20:27:23 raspberry npm[665]: > node index.js
Jun 07 20:27:24 raspberry npm[665]: Zigbee2MQTT:info  2019-11-09T13:04:01: Logging to directory: '/opt/zigbee2mqtt/data/log/2019-11-09.14-04-01'
Jun 07 20:27:25 raspberry npm[665]: Zigbee2MQTT:info  2019-11-09T13:04:01: Starting Zigbee2MQTT version 1.6.0 (commit #720e393)
```

Now that everything works, we want systemctl to start Zigbee2MQTT automatically on boot, this can be done by executing:


```sh
sudo systemctl enable zigbee2mqtt.service

```

 





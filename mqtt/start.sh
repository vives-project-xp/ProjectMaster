#!/bin/bash

# Start both projects
#cd /mqtt/mqtt-broker && docker-compose up &

cd /mqtt/Lannootree && npm start &


# Keep the container running
tail -f /dev/null

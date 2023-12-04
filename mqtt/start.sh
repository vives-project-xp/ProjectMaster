#!/bin/bash

# Start both projects
cd /mqtt/discovery && npm start &
cd /mqtt/Lannootree && npm start &

# Keep the container running
tail -f /dev/null

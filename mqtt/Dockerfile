# Builder stage for project 'discovery'
FROM node:latest as builder
 
WORKDIR /mqtt/discovery
 
COPY discovery/package.json ./
RUN npm install
 
COPY discovery .
 
# Final stage
FROM node:latest
 
WORKDIR /mqtt
 
# Copy the built files from both projects
COPY --from=builder /mqtt/discovery /mqtt/discovery
 
# Set any other configuration or settings
 
 
# CMD to run both projects
 
CMD cd /mqtt/discovery && npm start
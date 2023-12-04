# Builder stage for project 'discovery'
FROM node:latest as builder1

WORKDIR /mqtt/discovery

COPY discovery/package.json ./
RUN npm install

COPY discovery .

# Builder stage for project 'Lannootree'
FROM node:latest as builder2

WORKDIR /mqtt/Lannootree

COPY Lannootree/package.json ./
RUN npm install

COPY Lannootree .

# Final stage
FROM node:latest

WORKDIR /mqtt

# Copy the built files from both projects
COPY --from=builder1 /mqtt/discovery /mqtt/discovery
COPY --from=builder2 /mqtt/Lannootree /mqtt/Lannootree

# Set any other configuration or settings

# CMD to run both projects
#CMD ["npm", "start", "--prefix", "discovery"]
#CMD ["npm", "start", "--prefix", "Lannootree"]


# CMD to run both projects
COPY start.sh /mqtt/start.sh
RUN chmod +x /mqtt/start.sh
CMD ["/mqtt/start.sh"]
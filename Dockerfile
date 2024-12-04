# Use the official Node.js image from Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Install dockerize to handle service waiting
RUN apt-get update && apt-get install -y wget \
  && wget -q https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
  && tar -xvzf dockerize-linux-amd64-v0.6.1.tar.gz \
  && mv dockerize /usr/local/bin/

# Copy package.json and package-lock.json (if present) to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Copy .env file to the container so Prisma can access it
COPY .env .env

# Build the TypeScript project
RUN npm run build

# Expose the port your app runs on (default 3000 for Node.js apps)
EXPOSE 3000

# Start your application with migration and seed (move these commands to runtime)
CMD ["dockerize", "-wait", "tcp://postgres:5432", "-timeout", "60s", "npm", "run", "migrate-and-start"]

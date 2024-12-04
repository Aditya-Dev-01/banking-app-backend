# Use the official Node.js image from Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Copy .env file to the container so Prisma can access it
COPY .env .env

# Run Prisma migration and seed the database
RUN npm run migrate  # This will run the Prisma migrations
RUN npm run seed     # This will seed the database

# Build the TypeScript project
RUN npm run build

# Expose the port your app runs on (default 3000 for Node.js apps)
EXPOSE 3000

# Start your application
CMD ["npm", "run", "start"]

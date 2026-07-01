# Use Node.js 20 Alpine as the base image
FROM node:20-alpine

# Install build dependencies (required for bcrypt and other native modules on Alpine)
RUN apk add --no-cache python3 make g++

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the backend will run on
EXPOSE 5001

# Define the environment variable for the port
ENV PORT=5001

# Healthcheck to ensure the backend is responsive
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:5001/ || exit 1

# Command to run the application
CMD ["npm", "start"]

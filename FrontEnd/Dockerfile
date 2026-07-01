# Stage 1: Build the React/Vite application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Define build arguments for environment variables
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_ENV=production

# Set environment variables for the build process
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_ENV=$VITE_ENV

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build
COPY . .
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the build output from the previous stage to Nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Healthcheck to ensure the container is running
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

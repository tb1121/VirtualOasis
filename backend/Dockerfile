# Use the official Node.js 18 image as the base image
FROM node:22.2.0

# Set the working directory in the container
WORKDIR /app

# Copy the backend-specific package.json and package-lock.json to the working directory
COPY backend-package.json ./package.json

# Install dependencies
RUN npm install

# Copy the backend directory content (not the directory itself) to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Start the backend server
CMD ["node", "server.js"]

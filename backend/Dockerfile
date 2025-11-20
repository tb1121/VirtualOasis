# Use the official Node.js image
FROM node:22.2.0

# Set working directory inside the container
WORKDIR /app

# Copy backend package.json
COPY backend-package.json package.json

# Install dependencies
RUN npm install

# Copy backend source code
COPY . .

# Expose backend port
EXPOSE 3001

# Start backend
CMD ["node", "server.js"]

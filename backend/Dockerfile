# Backend Dockerfile (Express)
FROM node:22.2.0

WORKDIR /app

# Copy ONLY backend package.json
COPY backend/backend-package.json ./package.json

# Install backend dependencies
RUN npm install

# Copy ONLY backend source code
COPY backend/. .

EXPOSE 3001

CMD ["node", "server.js"]

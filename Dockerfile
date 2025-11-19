# Frontend Dockerfile (Next.js)
FROM node:22.2.0

WORKDIR /app

# Copy only frontend package files
COPY package.json package-lock.json ./

# Install frontend dependencies
RUN npm install

# Copy ONLY frontend files
COPY . .

# Build Next.js
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

FROM node:18-alpine

WORKDIR /app

# Copy package files and install deps
COPY api-gateway/package*.json ./
RUN npm install --no-audit --no-fund --prefer-offline --production=false --legacy-peer-deps

# Copy source and shared
COPY api-gateway/src/ ./src/

# Expose port
EXPOSE 3006

# Start application
CMD ["npx", "tsx", "src/server.ts"]

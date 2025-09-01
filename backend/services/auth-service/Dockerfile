# Multi-stage build for services/auth-service
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY services/auth-service/package*.json ./
COPY services/auth-service/tsconfig.json ./

# Install dependencies (simple approach)
RUN npm install --no-audit --no-fund --prefer-offline --production=false --legacy-peer-deps

# Copy source code
COPY services/auth-service/src/ ./src/

# Production stage
FROM node:18-alpine AS production

# Create app user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package files
COPY services/auth-service/package*.json ./
COPY services/auth-service/tsconfig.json ./

# Install dependencies (simple approach)
RUN npm install --no-audit --no-fund --prefer-offline --production=false --legacy-peer-deps

# Copy source code from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/src ./src

# Copy shared dependencies from context
COPY --chown=nodejs:nodejs shared ./shared

# Debug: List files
RUN ls -la /app/src/
RUN ls -la /app/
RUN pwd

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3000

# Start application with npx tsx
CMD ["npx", "tsx", "src/server.ts"]

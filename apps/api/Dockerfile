# Multi-stage Dockerfile for Portfolio API BFF Monorepo
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root configurations and workspace manifests
COPY package*.json ./
COPY tsconfig.base.json ./
COPY packages/shared/package*.json ./packages/shared/
COPY apps/api/package*.json ./apps/api/

# Install dependencies across workspaces
RUN npm ci

# Copy source code
COPY packages/shared/ ./packages/shared/
COPY apps/api/ ./apps/api/

# Build shared and api packages
RUN npm run build -w @portfolio/shared
RUN npm run build -w @portfolio/api

# Production Runner stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3333
ENV HOST=0.0.0.0

# Copy root manifests
COPY package*.json ./
COPY packages/shared/package*.json ./packages/shared/
COPY apps/api/package*.json ./apps/api/

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built artifacts
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/apps/api/dist ./apps/api/dist

EXPOSE 3333

CMD ["node", "apps/api/dist/infrastructure/http/server.js"]

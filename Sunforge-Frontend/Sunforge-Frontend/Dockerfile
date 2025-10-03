# Build
FROM node:20.16.0 AS builder

# Set working directory
WORKDIR /app

# Copy only module file first for caching
COPY package.json package-lock.json ./

# Download dependencies
RUN npm ci

# Copy only main source file
COPY . .

# Build all packages in the repo
RUN npm run build

# Final Stage
FROM node:20.16.0-alpine

# Create non-root user
RUN adduser -D -u 1000 appuser
USER appuser

# set workign directory
WORKDIR /home/appuser

# Copy the binary from the builder 
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Install only production dependencies:
RUN npm ci --omit=dev

# Expose application port
EXPOSE 5010

# RUn the binary
CMD ["node", "dist/server.js" ]

# Development stage
FROM node:20.16.0 AS dev

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 5010
CMD [ "sh", "-c", "npm run dev -- --host 0.0.0.0" ]
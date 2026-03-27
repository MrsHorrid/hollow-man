# Production Dockerfile for Hollow Man Client (React + Vite)
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci && npm cache clean --force

# Copy source
COPY . .

# Build the app
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine AS production

# Install security updates
RUN apk upgrade --no-cache

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Add security headers and compression
RUN echo 'server_tokens off;' > /etc/nginx/conf.d/security.conf && \
    echo 'gzip on;' > /etc/nginx/conf.d/compression.conf && \
    echo 'gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;' >> /etc/nginx/conf.d/compression.conf

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

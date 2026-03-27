# 🚀 Deployment Guide

Complete deployment instructions for The Hollow Man multiplayer horror game.

## Table of Contents

- [Quick Start](#quick-start)
- [Environment Setup](#environment-setup)
- [Docker Deployment](#docker-deployment)
- [Cloud Platforms](#cloud-platforms)
  - [Render](#render)
  - [Railway](#railway)
  - [Vercel](#vercel)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)
- [Scaling](#scaling)

---

## Quick Start

### Local Development

```bash
# Install dependencies
npm run install:all

# Run both server and client
npm run dev
```

### Docker (Local)

```bash
# Build and run with docker-compose
docker-compose up --build

# Access the game
# Client: http://localhost:3000
# Server: http://localhost:3001
```

---

## Environment Setup

1. Copy environment templates:

```bash
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env
```

2. Update the values in each `.env` file with your configuration.

### Required Environment Variables

**Server (`server/.env`):**
- `NODE_ENV` - Set to `production` for production
- `PORT` - Server port (default: 3001)
- `LOG_LEVEL` - Logging level (debug, info, warn, error)

**Client (`client/.env`):**
- `VITE_SERVER_URL` - URL of your game server

---

## Docker Deployment

### Development

```bash
docker-compose up --build
```

### Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Build Individual Images

```bash
# Server
docker build -t hollow-man-server:latest ./server

# Client
docker build -t hollow-man-client:latest ./client
```

### Docker Registry Push

```bash
# Tag for your registry
docker tag hollow-man-server:latest your-registry/hollow-man-server:latest
docker tag hollow-man-client:latest your-registry/hollow-man-client:latest

# Push
docker push your-registry/hollow-man-server:latest
docker push your-registry/hollow-man-client:latest
```

---

## Cloud Platforms

### Render

1. Connect your GitHub repository to Render
2. Create a Blueprint from `render.yaml`
3. Environment variables are automatically configured

**Manual Setup:**

1. Create a new Web Service for the server:
   - Build Command: `cd server && npm install && npm run build`
   - Start Command: `cd server && npm start`
   - Environment: `NODE_ENV=production`, `PORT=3001`

2. Create a Static Site for the client:
   - Build Command: `cd client && npm install && npm run build`
   - Publish Directory: `client/dist`
   - Environment: `VITE_SERVER_URL=<your-server-url>`

### Railway

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Initialize: `railway init`
4. Deploy: `railway up`

Configuration is in `railway.json`.

### Vercel (Frontend Only)

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy client:

```bash
cd client
vercel --prod
```

Or connect your GitHub repo to Vercel for auto-deploy.

**Environment Variable:**
- `VITE_SERVER_URL` - Your game server URL

---

## CI/CD Pipeline

GitHub Actions workflows are configured in `.github/workflows/`.

### Workflows

1. **CI/CD Pipeline** (`ci-cd.yml`)
   - Runs on push to `main` or `develop`
   - Builds and tests both server and client
   - Builds Docker images and pushes to GHCR
   - Auto-deploys to staging (develop) or production (main)

2. **Health Check** (`health-check.yml`)
   - Runs daily at 9:00 AM UTC
   - Checks production and staging health endpoints
   - Notifies on failures

### Required Secrets

Add these to your GitHub repository (Settings > Secrets and variables > Actions):

| Secret | Description |
|--------|-------------|
| `PROD_URL` | Production server URL (e.g., `https://api.yourgame.com`) |
| `STAGING_URL` | Staging server URL |

### Manual Deployment

```bash
# Deploy to staging
git push origin develop

# Deploy to production
git push origin main
```

---

## Monitoring

### Health Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Basic health check |
| `GET /health/detailed` | Detailed system and game stats |
| `GET /ready` | Kubernetes-ready check |
| `GET /metrics` | Prometheus-compatible metrics |

### Example Metrics Response

```
hollow_man_uptime_seconds 3600
hollow_man_rooms_total 5
hollow_man_players_total 12
hollow_man_socket_connections 8
```

### Logging

Server logs include:
- HTTP request logs with duration
- Socket connection/disconnection events
- Room lifecycle events
- Error stack traces

View logs with Docker:

```bash
docker logs hollow-man-server
docker logs hollow-man-client
```

### Health Check Automation

The health check workflow runs daily and verifies:
- Server responds with 200 OK
- Response time is acceptable

---

## Troubleshooting

### Common Issues

#### "Cannot connect to server"

1. Check server is running: `curl http://localhost:3001/health`
2. Verify `VITE_SERVER_URL` in client environment
3. Check firewall rules for port 3001

#### "CORS error"

1. Verify `CORS_ORIGINS` includes your client domain
2. For development, server allows all origins (`*`)

#### "Docker build fails"

1. Ensure Docker Desktop is running
2. Check for syntax errors in Dockerfile
3. Clear Docker cache: `docker system prune -a`

#### "Out of memory"

Server memory limits are set in `docker-compose.yml`:
```yaml
deploy:
  resources:
    limits:
      memory: 512M
```

Increase if needed for many concurrent players.

### Debugging

Enable debug logging:
```bash
# Server
LOG_LEVEL=debug npm run dev

# Docker
docker-compose up -e LOG_LEVEL=debug
```

### Getting Help

1. Check server logs: `docker logs hollow-man-server`
2. Verify environment variables are set correctly
3. Test health endpoints manually
4. Check GitHub Actions logs for CI issues

---

## Scaling

### Horizontal Scaling

For multiple server instances, you'll need:

1. **Redis** for Socket.IO adapter (shared state between instances)
2. **Load balancer** with sticky sessions
3. Update `docker-compose.prod.yml` replicas:

```yaml
deploy:
  replicas: 3
```

### Vertical Scaling

Increase resource limits in Docker Compose:

```yaml
deploy:
  resources:
    limits:
      cpus: '2'
      memory: 1G
```

### Performance Guidelines

| Players | CPU | Memory | Instances |
|---------|-----|--------|-----------|
| 1-20 | 0.5 | 256M | 1 |
| 20-100 | 1 | 512M | 1-2 |
| 100-500 | 2 | 1G | 2-4 |
| 500+ | 4 | 2G | 4+ |

### Database Considerations

Currently uses in-memory storage. For persistence:

1. Add Redis for session storage
2. Implement database adapter (MongoDB/PostgreSQL)
3. Update `GameRoom` to persist state

---

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong CORS origins (not `*`)
- [ ] Enable rate limiting
- [ ] Use non-root Docker user
- [ ] Keep dependencies updated (`npm audit`)
- [ ] Enable security headers (configured in nginx/Vercel)
- [ ] Use secrets management (not hardcoded values)

---

## Support

For deployment issues:
1. Check this guide's troubleshooting section
2. Review GitHub Actions logs
3. Open an issue with deployment details

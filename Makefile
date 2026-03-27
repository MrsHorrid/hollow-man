.PHONY: help install dev build test docker-build docker-up docker-down deploy-k8s clean

# Default target
help:
	@echo "Hollow Man - Available Commands:"
	@echo ""
	@echo "  make install         Install all dependencies"
	@echo "  make dev             Run development server"
	@echo "  make build           Build production assets"
	@echo "  make test            Run tests"
	@echo "  make docker-build    Build Docker images"
	@echo "  make docker-up       Start Docker containers"
	@echo "  make docker-down     Stop Docker containers"
	@echo "  make deploy-k8s      Deploy to Kubernetes"
	@echo "  make clean           Clean build artifacts"
	@echo ""

# Development
install:
	npm run install:all

dev:
	npm run dev

# Build
build:
	cd server && npm run build
	cd client && npm run build

# Test
test:
	cd server && npm run build
	cd client && npm run build

# Docker
docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f

docker-clean:
	docker-compose down -v
	docker system prune -f

# Production Docker
docker-prod-up:
	docker-compose -f docker-compose.prod.yml up -d

docker-prod-down:
	docker-compose -f docker-compose.prod.yml down

# Kubernetes
deploy-k8s:
	kubectl apply -f k8s/

delete-k8s:
	kubectl delete -f k8s/

# Cleanup
clean:
	rm -rf server/dist client/dist
	rm -rf server/node_modules client/node_modules node_modules

# Hollow Man - Kubernetes Deployment

## Prerequisites

- Kubernetes cluster (EKS, GKE, AKS, or minikube)
- kubectl configured
- ingress-nginx controller installed
- cert-manager installed (for HTTPS)

## Quick Deploy

```bash
# Update image names in k8s/*.yaml to match your registry
# Deploy everything
kubectl apply -f k8s/

# Check status
kubectl get pods
kubectl get services
kubectl get ingress
```

## Configuration

### Update Image Registry

Edit `k8s/server.yaml` and `k8s/client.yaml`:

```yaml
image: ghcr.io/YOUR_USERNAME/hollow-man-server:latest
image: ghcr.io/YOUR_USERNAME/hollow-man-client:latest
```

### Update Domain

Edit ingress hosts in both YAML files:

```yaml
rules:
  - host: api.YOUR_DOMAIN.com  # Server
  - host: YOUR_DOMAIN.com      # Client
```

### Environment Variables

Add secrets for sensitive data:

```bash
kubectl create secret generic hollow-man-secrets \
  --from-literal=JWT_SECRET=your-secret \
  --from-literal=API_KEY=your-api-key
```

Then reference in deployment:

```yaml
env:
  - name: JWT_SECRET
    valueFrom:
      secretKeyRef:
        name: hollow-man-secrets
        key: JWT_SECRET
```

## Scaling

```bash
# Scale server to 4 replicas
kubectl scale deployment hollow-man-server --replicas=4

# Scale client to 3 replicas
kubectl scale deployment hollow-man-client --replicas=3

# Enable HPA (Horizontal Pod Autoscaler)
kubectl autoscale deployment hollow-man-server \
  --cpu-percent=70 \
  --min=2 \
  --max=10
```

## Monitoring

```bash
# View logs
kubectl logs -f deployment/hollow-man-server

# Port forward for local testing
kubectl port-forward svc/hollow-man-server 3001:3001

# Check resource usage
kubectl top pods
```

## Cleanup

```bash
kubectl delete -f k8s/
```

# The Oats Hub — Deployment Guide

## Infrastructure

| Service    | Provider  | Purpose              |
|------------|-----------|----------------------|
| Frontend   | Vercel    | Next.js hosting      |
| Backend    | Railway   | FastAPI hosting      |
| Database   | Neon      | PostgreSQL           |
| Storage    | Cloudinary| Image CDN            |
| Payments   | Razorpay  | Payment gateway      |

## Deployment Workflow

### Frontend
1. Push to `main` → Vercel auto-deploys
2. Preview deployments on PRs

### Backend
1. Push to `main` → Railway auto-deploys
2. Health check validates at `GET /health`

## Database Migrations

```bash
alembic revision --autogenerate -m "description"
alembic upgrade head
alembic downgrade -1
```

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] CORS origins updated for production
- [ ] JWT secret is production-grade
- [ ] Debug mode disabled
- [ ] Health check endpoint responds

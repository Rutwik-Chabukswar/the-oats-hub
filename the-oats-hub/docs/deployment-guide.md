# Deployment Guide

The Oats Hub monorepo components are designed to be deployed separately for optimal scaling.

## 1. Backend Deployment

The backend should be deployed to a containerized PaaS or an AWS EC2/ECS environment.

### Prerequisites for Production
1. **PostgreSQL Database**: A managed database like AWS RDS or Render Postgres.
2. **Environment Variables**: Set strictly in the hosting platform. Make sure `ENVIRONMENT=production`.

### Gunicorn + Uvicorn
In production, do not run `uvicorn` directly. Use Gunicorn as a process manager with Uvicorn workers.

```bash
gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```
*(Adjust `--workers` based on CPU cores, typically `2 * cores + 1`)*

### Migrations
Before the application starts, ensure migrations are run:
```bash
alembic upgrade head
```
This is often done in a "Release Phase" or "Pre-deploy Command" depending on the platform (e.g., Render/Heroku).

## 2. Frontend Deployment

The Next.js frontend is optimized for **Vercel**.

1. Connect the repository to Vercel.
2. Set the Root Directory to `frontend`.
3. Set the Build Command to `npm run build` and Output Directory to `.next` (Vercel usually auto-detects this).
4. Add the `NEXT_PUBLIC_API_URL` environment variable pointing to the production backend URL (e.g., `https://api.theoatshub.com/api/v1`).

### Static Generation vs Server-Side Rendering
Next.js will automatically optimize pages. Product detail pages can be statically generated (SSG) with Revalidation (ISR) to ensure fast load times while keeping inventory data fresh. Cart and Checkout are client-side or dynamically rendered.

## 3. Infrastructure Considerations

- **SSL/TLS**: Ensure both API and Frontend are served over HTTPS.
- **CORS**: Ensure `ALLOWED_ORIGINS` in the backend `.env` contains the exact production frontend domain.
- **CDN**: Cloudinary handles image delivery. Vercel automatically acts as a CDN for frontend assets.

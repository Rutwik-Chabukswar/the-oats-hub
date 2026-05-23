# Environment Setup Guide

This document defines the environment variables required to run The Oats Hub securely across various environments.

## Principles

1. **No secrets in source control**: `.env` files are in `.gitignore`.
2. **Pydantic Validation**: Backend uses `Pydantic BaseSettings` to enforce required variables at startup.
3. **Environment Parity**: Try to keep development, staging, and production environments as similar as possible.

## Backend `.env`

Create `backend/.env` based on `backend/.env.example`.

| Variable | Type | Description | Required in Prod? | Default (Dev) |
|----------|------|-------------|-------------------|---------------|
| `PROJECT_NAME` | string | Name of the API. | No | `The Oats Hub API` |
| `ENVIRONMENT` | string | `development`, `staging`, or `production`. | Yes | `development` |
| `DATABASE_URL` | string | Async SQLAlchemy URL. | Yes | `sqlite+aiosqlite:///test.db` |
| `JWT_SECRET_KEY` | string | Used to sign JWTs. Must be strong. | Yes | *empty* (Throws if prod) |
| `RAZORPAY_KEY_ID` | string | Razorpay API Key. | Yes | *empty* |
| `RAZORPAY_KEY_SECRET` | string | Razorpay API Secret. | Yes | *empty* |
| `CLOUDINARY_CLOUD_NAME` | string | Cloudinary Cloud Name. | Yes | *empty* |
| `CLOUDINARY_API_KEY` | string | Cloudinary API Key. | Yes | *empty* |
| `CLOUDINARY_API_SECRET` | string | Cloudinary API Secret. | Yes | *empty* |

## Frontend `.env.local`

Create `frontend/.env.local` based on `frontend/.env.example`.

| Variable | Type | Description | Required? | Default |
|----------|------|-------------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | string | URL of the backend API (v1 prefix included). | Yes | `http://localhost:8000/api/v1` |

## Security Notes
- Never prefix sensitive variables with `NEXT_PUBLIC_` on the frontend, as this bundles them into the client-side JavaScript.
- Rotate `JWT_SECRET_KEY` periodically or if compromised. This will invalidate all active user sessions.

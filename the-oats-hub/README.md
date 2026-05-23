# The Oats Hub

The Oats Hub is a premium D2C (Direct-to-Consumer) nutrition e-commerce platform. This repository contains both the frontend and backend applications, organized as a scalable monorepo.

## 🚀 Project Overview

The Oats Hub is built with a focus on high performance, SEO optimization, and a seamless user experience. The platform supports complete e-commerce functionality, including user authentication, product catalog management, cart operations, order processing, and secure payments via Razorpay.

## 💻 Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **API State**: React Query (@tanstack/react-query)
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.10+
- **Database**: PostgreSQL (via SQLite for local dev)
- **ORM**: SQLAlchemy 2.0 (Async)
- **Migrations**: Alembic
- **Validation**: Pydantic v2
- **Authentication**: JWT (JSON Web Tokens)

### Integrations
- **Payments**: Razorpay
- **Media Storage**: Cloudinary

## 🏗 Architecture Explanation

This project follows a **Layered Clean Architecture** pattern heavily influenced by Domain-Driven Design (DDD) principles:

1. **Frontend**: Feature-sliced design mixed with Next.js App Router conventions.
2. **Backend**: 
   - **Routes/Controllers**: `app/api/routes`
   - **Services (Business Logic)**: `app/services`
   - **Repositories (Data Access)**: `app/repositories`
   - **Models (Database)**: `app/models`
   - **Schemas (Validation/DTOs)**: `app/schemas`

For detailed architectural insights, refer to our [Architecture Documentation](./docs/architecture.md).

## 📁 Folder Structure

```
.
├── backend/                  # FastAPI Backend Application
│   ├── alembic/              # Database migrations
│   ├── app/                  # Application core
│   │   ├── api/              # API routes & dependencies
│   │   ├── auth/             # Authentication logic
│   │   ├── core/             # Config, logging, security
│   │   ├── db/               # Database session & base
│   │   ├── integrations/     # Razorpay, Cloudinary
│   │   ├── middleware/       # Exception handlers, CORS
│   │   ├── models/           # SQLAlchemy models
│   │   ├── repositories/     # Database access layer
│   │   ├── schemas/          # Pydantic validation schemas
│   │   └── services/         # Business logic layer
│   ├── tests/                # Pytest suites
│   └── requirements/         # Python dependencies
├── frontend/                 # Next.js Frontend Application
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   ├── components/       # UI, eCommerce, Layout components
│   │   ├── features/         # Feature-specific logic
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utils, API client, Token mgmt
│   │   ├── providers/        # React Context & Query Providers
│   │   ├── services/         # API integration services
│   │   ├── store/            # Client state management
│   │   └── types/            # TypeScript definitions
│   └── public/               # Static assets
└── docs/                     # Technical Documentation
```

## 🛠 Local Setup

### Environment Variables

Both frontend and backend require environment variables. Copy the examples to create your local `.env` files.

**Backend (`backend/.env`):**
```ini
PROJECT_NAME="The Oats Hub API"
ENVIRONMENT="development"
DATABASE_URL="sqlite+aiosqlite:///test.db"  # Use postgresql+asyncpg://... for production
JWT_SECRET_KEY="your-secret-key-here"
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""
CLOUDINARY_CLOUD_NAME=""
```

**Frontend (`frontend/.env.local`):**
```ini
NEXT_PUBLIC_API_URL="http://localhost:8000/api/v1"
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements/dev.txt
   ```
4. Run database migrations:
   ```bash
   alembic upgrade head
   ```
5. Start the API server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🗄 Database Setup & Migrations

The project uses Alembic for database migrations.

- **Create a new migration**: `alembic revision --autogenerate -m "Description"`
- **Apply migrations**: `alembic upgrade head`
- **Rollback migration**: `alembic downgrade -1`

## 🚀 Deployment Instructions

- **Backend**: Deployable via Docker or directly to platforms like Render, Railway, or AWS ECS. Gunicorn with Uvicorn workers is recommended for production.
- **Frontend**: Optimized for Vercel deployment. Can also be built using `npm run build` and served via any Node.js hosting.

Refer to the [Deployment Guide](./docs/deployment-guide.md) for detailed instructions.

## 🔐 Authentication Flow

We use JWT-based stateless authentication.
1. User logs in -> Returns `access_token` and `refresh_token`.
2. Frontend stores tokens securely (cookies or localStorage) and attaches `access_token` to API requests via Axios interceptors.
3. Upon expiration, the Axios interceptor automatically calls `/auth/refresh` using the `refresh_token`.

Read the full [Authentication Flow Document](./docs/authentication-flow.md).

## 📚 API Documentation

Once the backend is running, Swagger UI and ReDoc are automatically generated:
- **Swagger UI**: [http://localhost:8000/api/docs](http://localhost:8000/api/docs)
- **ReDoc**: [http://localhost:8000/api/redoc](http://localhost:8000/api/redoc)

## 📈 Scalability Notes

The current architecture is highly scalable. The separation of `Repositories` and `Services` allows for easy caching layers (e.g., Redis) to be introduced in the services without modifying data access logic. The Next.js frontend utilizes Server Components for optimal initial load times and SEO.

Read the [Scalability Analysis](./docs/scalability-analysis.md) for future scaling strategies.

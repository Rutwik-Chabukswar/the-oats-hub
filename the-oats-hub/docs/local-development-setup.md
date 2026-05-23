# Local Development Setup Guide

Follow this guide to get the full stack running on your local machine.

## Prerequisites

- Python 3.10+
- Node.js 18+ (20+ recommended)
- Git

## 1. Clone the Repository

```bash
git clone <repository_url>
cd the-oats-hub
```

## 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements/dev.txt
```

### Configure Environment
Copy the example environment file:
```bash
cp .env.example .env
```
Update `.env` with dummy values for development. Use the default SQLite database path (`sqlite+aiosqlite:///test.db`).

### Database Migrations
Create the local SQLite database and apply schemas:
```bash
alembic upgrade head
```

### Start Server
```bash
uvicorn app.main:app --reload
```
The API is now running at `http://localhost:8000`. Access docs at `/api/docs`.

## 3. Frontend Setup

Open a new terminal window.

```bash
cd frontend
npm install
```

### Configure Environment
Copy the example environment file:
```bash
cp .env.example .env.local
```
Ensure `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1` is set.

### Start Server
```bash
npm run dev
```
The frontend is now running at `http://localhost:3000`.

## 4. Development Workflow

- Any changes to `backend/app/` will auto-reload the FastAPI server.
- Any changes to `frontend/src/` will hot-reload Next.js.
- For database schema changes in backend models, run:
  ```bash
  alembic revision --autogenerate -m "description"
  alembic upgrade head
  ```

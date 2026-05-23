# Backend Prompt Template

## Context
- Project: The Oats Hub
- Stack: FastAPI + SQLAlchemy + PostgreSQL
- Pattern: Route → Service → Repository

## Feature Request
- Feature: [NAME]
- Endpoint: `[METHOD] /api/v1/[resource]`

## Files to Create
1. `app/schemas/[resource].py` — Pydantic schemas
2. `app/models/[resource].py` — SQLAlchemy model
3. `app/repositories/[resource]_repository.py` — Data access
4. `app/services/[resource]_service.py` — Business logic
5. `app/api/routes/[resource].py` — Route handlers

## Rules
- Use async/await everywhere
- Dependency injection for DB session
- Standardized response format
- Proper error handling with HTTPException
- See: `docs/api-conventions.md`
- See: `docs/coding-rules.md`

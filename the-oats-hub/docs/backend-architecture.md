# Backend Architecture

The backend is built with **FastAPI** and **SQLAlchemy 2.0 (Async)**, strictly adhering to Clean Architecture principles.

## Layered Design

The backend code inside `app/` is divided into distinct layers:

1. **API Routes (`api/routes/`)**:
   - **Role**: Handle HTTP requests, parsing inputs, and formatting HTTP responses.
   - **Rule**: No business logic or database calls here. They only call Services.

2. **Services (`services/`)**:
   - **Role**: Contain the core business logic.
   - **Rule**: Extend `BaseService`. They coordinate between multiple repositories, perform business validations, and trigger third-party integrations (like emails or payments). They format the standard `SuccessResponse` or `ErrorResponse`.

3. **Repositories (`repositories/`)**:
   - **Role**: Handle all direct database interactions using SQLAlchemy.
   - **Rule**: Extend `BaseRepository`. No business logic here. Returns SQLAlchemy model instances or None.

4. **Models (`models/`)**:
   - **Role**: SQLAlchemy declarative base classes representing database tables.

5. **Schemas (`schemas/`)**:
   - **Role**: Pydantic models for request validation and response serialization.

## Data Flow Example: Getting a Product

1. **Request** hits `GET /api/v1/products/{slug}`
2. **Route** (`api/routes/product.py`) calls `ProductService.get_by_slug(slug)`
3. **Service** (`services/product.py`) applies business logic (e.g., check if active) and calls `ProductRepository.get_by_slug(slug)`
4. **Repository** (`repositories/product.py`) executes an async SQLAlchemy query and returns a `Product` model.
5. **Service** wraps the result in a `SuccessResponse`.
6. **Route** returns the response, which FastAPI serializes to JSON based on the Pydantic schema.

## Core Components

### Database Management
- **Async Engine**: Configured in `app/db/session.py`. Uses `create_async_engine` and lazy loading to prevent initialization issues.
- **Migrations**: Alembic (`alembic/`) manages schema changes.

### Dependency Injection
FastAPI's `Depends` is heavily used for:
- Database Sessions (`get_db`)
- Authentication (`get_current_user`, `get_current_admin_user`)

### Error Handling
Centralized exception handling in `app/middleware/exception_handler.py`. Custom exceptions like `AuthenticationError` and `AuthorizationError` are mapped to appropriate HTTP status codes, ensuring uniform API error responses.

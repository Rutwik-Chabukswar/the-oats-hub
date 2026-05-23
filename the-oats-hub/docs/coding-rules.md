# Coding Rules & Conventions

To maintain a production-grade codebase, all contributors must adhere to the following rules.

## 1. General Monorepo Rules
- Do not mix backend and frontend code.
- Avoid using `any` or loose typings in either Python or TypeScript.

## 2. Backend (Python/FastAPI)

### Architecture Adherence
- **NEVER** write raw SQL unless absolutely necessary (use SQLAlchemy ORM).
- **NEVER** access the database directly from an API Route. Always call a Service.
- **NEVER** write business logic inside a Repository.

### Type Hinting
- Strict type hinting is required. Use `mypy` locally to ensure compliance.
- Use built-in types `list`, `dict` (Python 3.9+) instead of `typing.List`, `typing.Dict`.

### Async/Await
- The backend is fully asynchronous. Use `AsyncSession` for DB interactions.
- Do not use blocking I/O (like `requests` library). Use `httpx` if external HTTP calls are needed.

### Formatting & Linting
- Use `black` for formatting.
- Use `ruff` or `flake8` for linting.
- Maximum line length: 100 characters.

## 3. Frontend (TypeScript/Next.js)

### Components
- Use Functional Components.
- For UI primitives, strictly use `shadcn/ui` components located in `src/components/ui`. Do not invent new buttons or inputs unless necessary.
- Prefix prop interfaces with component name: `interface ProductCardProps {}`.

### State Management
- Use React Query for **all** API fetching. Do not use plain `useEffect` and `fetch/axios` directly in components for data loading.
- Place all API calls in `src/services/` and import them into custom hooks.

### Server vs. Client Components
- By default, assume Next.js App Router components are **Server Components**.
- Only add `"use client";` at the top of the file when using React hooks (`useState`, `useEffect`, React Query) or DOM APIs.

### Linting & Formatting
- Use ESLint and Prettier.
- Follow the rules defined in `eslint.config.mjs`.

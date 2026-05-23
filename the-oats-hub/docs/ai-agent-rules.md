# The Oats Hub — AI Agent Rules

## Purpose

These rules govern all AI-assisted code generation for The Oats Hub project.

## Before Writing Code

1. **Search existing patterns** — Check for similar components/services first
2. **Reuse abstractions** — Use existing utilities, hooks, and base classes
3. **Follow folder conventions** — Place files in the correct directory
4. **Read relevant docs** — Check architecture.md and coding-rules.md

## NEVER

- Invent new API patterns outside `api-conventions.md`
- Duplicate existing components or utilities
- Ignore naming conventions
- Ignore the architecture docs
- Use `any` type in TypeScript
- Write inline styles (use Tailwind)
- Create files larger than 300 lines
- Put business logic in routes
- Put database queries in services

## ALWAYS

- Use strict TypeScript typing
- Create reusable, modular code
- Follow the Service → Repository pattern
- Use Pydantic schemas for validation
- Use dependency injection in FastAPI
- Prefer server components in Next.js
- Keep components focused (single responsibility)
- Write descriptive variable and function names

## File Creation Checklist

When creating a new file, ensure:

- [ ] Correct directory per architecture
- [ ] Follows naming convention
- [ ] Exports are properly typed
- [ ] No duplicate functionality exists
- [ ] Under 300 lines

## Feature Development Flow

Always build vertically:

```
1. Schema (Pydantic) → 2. Model (SQLAlchemy) → 3. Repository
→ 4. Service → 5. Route → 6. Frontend Service → 7. UI Component
→ 8. Tests → 9. Polish
```

## Code Quality

- No TODO comments in production code
- All functions must have docstrings (Python) or JSDoc (TypeScript)
- Error states must be handled in UI
- Loading states must be shown in UI

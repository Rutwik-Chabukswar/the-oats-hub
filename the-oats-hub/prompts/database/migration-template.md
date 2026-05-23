# Database Prompt Template

## Context
- ORM: SQLAlchemy 2.0+ (async)
- Migrations: Alembic
- DB: PostgreSQL (Neon)

## Migration Request
- Description: [DESCRIPTION]
- Tables affected: [TABLES]

## Rules
- UUID primary keys
- Prices in paise (integer)
- Include created_at / updated_at
- Include soft delete columns where appropriate
- See: `docs/database-schema.md`

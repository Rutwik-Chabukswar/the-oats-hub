# The Oats Hub — AI Master Setup Document

You are building a premium D2C ecommerce platform called The Oats Hub.

This project uses AI-assisted development with Antigravity IDE agents.

Your responsibility is to strictly follow all architecture, coding, and folder conventions defined in this document.

You must NEVER invent architecture patterns outside these instructions.

---

# BUSINESS CONTEXT

Brand:
- The Oats Hub

Business Type:
- Premium nutrition ecommerce brand

Products:
- Oats
- Peanut butter
- Healthy food products

Theme:
- Black + Gold

Primary Goals:
- Premium UI
- Mobile-first
- SEO-first
- Scalable architecture
- AI-ready backend
- Fast performance

---

# FINAL TECH STACK

Frontend:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend:
- FastAPI
- SQLAlchemy
- Alembic

Database:
- PostgreSQL (Neon)

Auth:
- JWT Authentication

Payments:
- Razorpay

Storage:
- Cloudinary

Hosting:
- Vercel + Railway

---

# MONOREPO STRUCTURE

Create this structure:

/the-oats-hub
 ├── frontend/
 ├── backend/
 ├── docs/
 ├── prompts/
 ├── README.md
 └── .gitignore

---

# FRONTEND STRUCTURE

/frontend
 ├── app/
 ├── components/
 │    ├── ui/
 │    ├── shared/
 │    ├── product/
 │    ├── cart/
 │    └── layout/
 │
 ├── features/
 │    ├── auth/
 │    ├── products/
 │    ├── cart/
 │    ├── checkout/
 │    └── orders/
 │
 ├── hooks/
 ├── services/
 ├── store/
 ├── lib/
 ├── types/
 ├── styles/
 ├── constants/
 ├── providers/
 └── utils/

---

# BACKEND STRUCTURE

/backend
 ├── app/
 │    ├── api/
 │    │    ├── routes/
 │    │    └── dependencies/
 │    │
 │    ├── auth/
 │    ├── core/
 │    ├── db/
 │    ├── models/
 │    ├── schemas/
 │    ├── services/
 │    ├── repositories/
 │    ├── middleware/
 │    ├── integrations/
 │    ├── utils/
 │    └── main.py
 │
 ├── alembic/
 ├── tests/
 ├── requirements/
 └── .env

---

# DOCS STRUCTURE

/docs
 ├── architecture.md
 ├── database-schema.md
 ├── api-conventions.md
 ├── ui-guidelines.md
 ├── coding-rules.md
 ├── product-rules.md
 ├── deployment.md
 ├── auth-flow.md
 ├── feature-roadmap.md
 └── ai-agent-rules.md

---

# PROMPTS STRUCTURE

/prompts
 ├── frontend/
 ├── backend/
 ├── database/
 ├── ui/
 ├── debugging/
 └── feature-specs/

---

# ARCHITECTURE PRINCIPLES

The architecture must be:

- API-first
- Mobile-first
- SEO-first
- Scalable
- Modular
- Service-based
- Reusable
- AI-friendly

---

# FRONTEND RULES

Use:
- TypeScript strict mode
- Tailwind utility classes
- shadcn/ui components
- Reusable components
- Feature-based architecture

Rules:
- Prefer server components
- Use client components only when required
- Avoid prop drilling
- One component per file
- Avoid files larger than 300 lines

---

# BACKEND RULES

Use:
- FastAPI async architecture
- SQLAlchemy ORM
- Service-based logic separation

Rules:
- Routes remain thin
- Services contain business logic
- Repositories contain DB logic
- Schemas handle validation
- Use dependency injection patterns

---

# API CONVENTIONS

Base:
- /api/v1

Example:
GET /products
GET /products/{id}
POST /products
PATCH /products/{id}
DELETE /products/{id}

Success Response:
{
  "success": true,
  "message": "",
  "data": {}
}

Error Response:
{
  "success": false,
  "message": "",
  "errors": []
}

---

# DATABASE PRINCIPLES

Core entities:
- users
- products
- product_variants
- carts
- cart_items
- orders
- order_items
- reviews
- addresses

Rules:
- Prices stored in paise
- UUID primary keys preferred
- Inventory tracked per variant
- Soft delete support preferred

---

# UI GUIDELINES

Theme:
- Premium black + gold
- Minimal
- Modern D2C design

Requirements:
- Mobile-first
- Spacious layouts
- Sticky mobile CTAs
- Premium product focus

Use:
- shadcn/ui as foundation
- Tailwind utilities
- Responsive design

---

# AI AGENT RULES

Before generating code:
- Search existing patterns
- Reuse abstractions
- Follow folder conventions

Never:
- Invent APIs
- Duplicate components
- Ignore naming conventions
- Ignore architecture docs

Always:
- Use strict typing
- Create reusable code
- Prefer modularity
- Keep consistency

---

# INITIAL REQUIRED FILES

Create:
- README.md
- .gitignore
- frontend package initialization
- backend package initialization
- all docs markdown files
- placeholder prompt files

---

# DEVELOPMENT PHILOSOPHY

Build vertically.

Correct workflow:
Feature
→ schema
→ API
→ frontend
→ testing
→ polish

Never:
- Build entire backend first
- Build entire frontend first

---

# PHASE 0 GOAL

The final result should be:

A production-grade AI-native ecommerce engineering foundation optimized for scalable AI-assisted development using Antigravity agents.
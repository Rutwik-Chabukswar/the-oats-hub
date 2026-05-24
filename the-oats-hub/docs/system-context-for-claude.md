# The Oats Hub — System Architecture & Design Overview

This document provides a comprehensive overview of **The Oats Hub**, a premium wellness and nutrition e-commerce platform. It is designed to quickly onboard any AI assistant (like Claude) to the current state, tech stack, architecture, and design language of the project.

---

## 1. High-Level Architecture

The Oats Hub is a full-stack web application separated into two primary repositories/directories:
- **Frontend**: Next.js 14 (App Router) with React, TypeScript, Tailwind CSS, and Framer Motion.
- **Backend**: Python FastAPI with SQLAlchemy (async), SQLite (for development), and Alembic for migrations.

The application follows a decoupled architecture where the Next.js frontend acts as a client consuming RESTful APIs exposed by the FastAPI backend.

---

## 2. Backend (FastAPI)

**Location**: `/backend/`

### Tech Stack
- **Framework**: FastAPI (Python 3.12+)
- **ORM**: SQLAlchemy 2.0 (Async mode with `aiosqlite`)
- **Migrations**: Alembic
- **Authentication**: JWT (JSON Web Tokens) with Passlib (bcrypt)
- **Database**: SQLite (currently `test.db` in dev)

### Directory Structure
```text
backend/
├── alembic/              # Database migrations
├── app/
│   ├── api/              # API routers (endpoints)
│   │   ├── deps.py       # Dependency injections (auth, db session)
│   │   └── v1/           # API version 1 routers (auth, users, products, categories)
│   ├── core/             # Configuration, security, JWT logic
│   ├── db/               # Database session management
│   ├── models/           # SQLAlchemy ORM models
│   ├── schemas/          # Pydantic models for request/response validation
│   └── services/         # Business logic layer
├── seed_products.py      # Script to populate database with initial product data
└── fix_images.py         # Utility script for bulk database updates
```

### Database Schema (Core Models)
- **User**: Authentication, roles (`customer`, `admin`), profile data.
- **Product**: Core product details (`name`, `slug`, `category_id`, `base_price`, `nutrition_info`).
- **ProductImage**: Linked images for products (URLs map to frontend `/public/products/`).
- **Category**: Product categories.
- *(Planned/Pending)*: Cart, CartItem, Order, OrderItem, Address.

### Key API Conventions
- Standardized wrapper responses: `{ "success": true, "message": "...", "data": {} }`
- JWT authentication passed via Bearer token in headers.

---

## 3. Frontend (Next.js)

**Location**: `/frontend/`

### Tech Stack
- **Framework**: Next.js 14 (App Router, Server Components + Client Components)
- **Styling**: Tailwind CSS, `clsx`, `tailwind-merge`
- **Animation**: Framer Motion
- **UI Components**: Radix UI primitives (headless accessibility), custom bespoke UI
- **Data Fetching**: SWR (custom hooks like `useProducts`)

### Directory Structure
```text
frontend/
├── src/
│   ├── app/              # Next.js App Router pages (/, /products, /products/[slug])
│   ├── components/
│   │   ├── ecommerce/    # Product cards, listings, price displays
│   │   ├── storefront/   # Homepage sections (Hero, Showcase, Trust, CTA)
│   │   └── ui/           # Shared UI primitives (Buttons, Inputs, Select)
│   ├── hooks/            # SWR data fetching hooks (useProducts, useCategories)
│   ├── lib/              # Utility functions (axios client, tailwind merge)
│   └── types/            # TypeScript interfaces matching backend schemas
└── public/
    ├── products/         # Local packaging photography assets
    └── ingredients/      # Cinematic ingredient textures
```

---

## 4. The "Premium Wellness" Design Language

We recently executed a massive visual overhaul to pivot the brand from standard e-commerce to a **luxury, editorial wellness magazine** aesthetic. 

When generating code or UI for this project, you **MUST** adhere strictly to this design language:

### Core Aesthetics
- **Theme**: Extremely Dark / Cinematic. We use `bg-brand-black` and deep `#0F0D0A` for cards. We *do not* use stark white backgrounds.
- **Lighting**: Subtle, ambient radial glows (`radial-gradient` with low opacity gold) instead of harsh borders or drop shadows.
- **Colors**:
  - `brand-black`: Main background (`#0A0A0A` or similar deep darks).
  - `brand-white`: Text color, often dimmed to `text-brand-white/50` or `text-brand-white/70` for hierarchy.
  - `brand-gold`: Accent color used for thin lines, subtle hover states, and active indicators.

### Typography (Editorial Mix)
- **Headings**: Oversized **Serif** (`font-serif`), often incorporating italicized accent words (e.g., `Why <span className="italic">The Oats Hub?</span>`).
- **Pre-titles / Labels**: Micro-typography. Extremely wide tracking, uppercase (`tracking-[0.3em] uppercase text-[10px] text-brand-gold/70`).
- **Body Text**: Clean geometric sans-serif (`font-light`, `leading-relaxed`, `text-brand-white/50`).

### Interaction & Motion (Cinematic)
- **Duration**: Slow, intentional transitions. We use `duration-500` or `duration-700` instead of snappy 150ms transitions.
- **Image Hover**: Cinematic zoom (e.g., `duration-[2s] ease-out group-hover:scale-105`).
- **Card Hover**: Cards never lift up aggressively. Instead, their borders softly illuminate (`hover:border-brand-gold/20`) or they emit a very subtle shadow glow.
- **Scroll Reveal**: Sections fade in smoothly as the user scrolls down, using Framer Motion (`StaggerContainer`, `StaggerItem`).

### Specific Component Rules
- **No Generic Cards**: Do not use standard Shadcn UI `<Card>` components with white backgrounds and standard borders. All containers must be bespoke, utilizing transparent or `#0F0D0A` backgrounds.
- **Inputs & Forms**: Dark pills. `rounded-full`, `bg-[#0F0D0A]`, thin `border-brand-white/[0.08]`, with gold focus rings.
- **Buttons**: Pill-shaped (`rounded-full`), tracking-wide uppercase text.

---

## 5. Key Pages & Components

### Homepage (`/`) Flow
1. **Premium Hero**: Cinematic full-screen landing with a warm wellness lifestyle image and clear CTA.
2. **Brand Philosophy**: Asymmetric editorial layout with "ghosted" background numbers (01, 02) and parallax textures.
3. **Product Showcase**: "Featured Collection" showcasing top products in the premium dark cards.
4. **Cinematic Ingredient Showcase**: "What we stand behind." High-end packaging photography with cinematic parallax images.
5. **Why Choose Us**: 2x2 grid of trust pillars (Premium Sourced, Lab Tested, etc.).
6. **Product Benefits**: Flush, border-separated grid highlighting nutritional benefits.
7. **Trust Section**: 4 key stats and 3 editorial-style customer quotes.
8. **Premium CTA**: Final glowing pill button to drive conversion.

### Products Page (`/products`)
- Features a highly polished, editorial header.
- Uses custom dark-themed search and category dropdown filters.
- Implements SWR for client-side filtering and pagination.
- Renders using `ProductListing` and `ProductCard`.

---

## 6. Current Development State

- **Completed**: Full backend CRUD for products/categories. Frontend homepage and products listing page completely overhauled to the luxury editorial design language. Database seeded with matching local image assets (`/products/pintola.png`, etc.). Next.js compilation is fully clean with 0 Type errors or warnings.
- **Next Steps / Pending**:
  - Implement the detailed Product Detail Page (`/products/[slug]`) adhering to the new luxury aesthetic.
  - Implement full Cart, Checkout, and Payment flow logic.
  - Integrate User Dashboard (Profile, Order History).

*(End of summary. Claude, use this document to maintain absolute consistency with the architectural and visual standards established above.)*

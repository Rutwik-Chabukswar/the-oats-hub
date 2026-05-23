# Frontend Architecture

The frontend is built with **Next.js (App Router)** and **React**, focusing on a balance between performance, SEO, and developer experience.

## Feature-Sliced Design

The project structure inside `src/` favors a feature-sliced architecture mixed with global utilities:

- **`app/`**: Next.js App Router definitions. Contains the actual page structures and layouts.
- **`components/`**: 
  - `ui/`: Reusable, generic UI primitives (buttons, inputs, dialogs) mostly driven by shadcn/ui.
  - `ecommerce/`: Domain-specific components (ProductCard, Cart, Checkout forms).
- **`features/`**: Modules grouped by business domain (e.g., `products`, `auth`, `cart`).
- **`services/`**: API wrappers and integration logic.
- **`hooks/`**: Custom React hooks (e.g., `useProducts`, `useCategories`).
- **`providers/`**: Global Context providers (`QueryProvider`, `AuthProvider`).

## State Management

1. **Server State (API Data)**: Managed via **React Query** (`@tanstack/react-query`). 
   - Provides out-of-the-box caching, background fetching, pagination, and optimistic updates.
   - Custom hooks in `src/hooks/` abstract the React Query usage.

2. **Client State (UI Data)**: 
   - Local state via React `useState`.
   - Global client state (like shopping cart contents before checkout) is intended to be managed via a lightweight store (Zustand/Jotai) located in `src/store/`.

## API Integration

- **Axios Client**: Configured in `src/lib/api-client.ts` with a base URL.
- **Interceptors**:
  - **Request**: Automatically attaches the JWT `access_token` from storage to every request.
  - **Response**: Handles 401 Unauthorized errors by automatically calling the refresh token endpoint. If successful, it retries the original request seamlessly.

## Styling

- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **CSS Variables**: `src/app/globals.css` defines the core design tokens (colors, radius) ensuring dark/light mode compatibility and easy theming.

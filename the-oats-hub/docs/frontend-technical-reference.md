# The Oats Hub — Frontend Technical Reference

This document serves as a deep-dive technical reference for the frontend of **The Oats Hub**. It is intended for AI assistants (like Claude) and engineers to fully understand the architectural patterns, styling rules, and component structures of the Next.js application.

---

## 1. Core Technologies

- **Framework**: [Next.js 14](https://nextjs.org/) (using the App Router paradigm).
- **Language**: TypeScript (strict mode enabled).
- **Styling**: Tailwind CSS (with `clsx` and `tailwind-merge` for dynamic class construction).
- **Animation**: Framer Motion (for cinematic scroll reveals and interaction states).
- **Components**: Bespoke UI mixed with headless Radix UI primitives for accessibility (selects, dialogues, etc.).
- **Data Fetching**: [SWR](https://swr.vercel.app/) (stale-while-revalidate) wrapped in custom hooks.
- **Icons**: Lucide React.

---

## 2. Directory Architecture

The frontend lives entirely within the `/frontend` directory. All application source code is within `/frontend/src`.

```text
frontend/src/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout (fonts, global styles, providers)
│   ├── page.tsx          # Homepage (marketing/storefront sections)
│   ├── globals.css       # Tailwind entry and global CSS variables
│   └── products/         # Product listing & details routes
│       ├── page.tsx      # All products listing
│       └── [slug]/       # Dynamic product detail page (PDP)
│
├── components/           # React Components
│   ├── ecommerce/        # Domain-specific UI (ProductCard, PriceDisplay, ProductListing)
│   ├── storefront/       # Homepage sections (PremiumHero, TrustSection, BrandPhilosophy)
│   ├── ui/               # Generic/Reusable UI (Input, Select, Button, Skeletons)
│   └── layout/           # Global layout components (Navbar, PremiumFooter)
│
├── hooks/                # Data Fetching & State
│   ├── useProducts.ts    # SWR hook for querying the backend product API
│   └── useCategories.ts  # SWR hook for querying categories
│
├── lib/                  # Utilities
│   ├── utils.ts          # cn() utility (clsx + tailwind-merge)
│   └── api.ts            # Axios instance configured with base URL
│
├── types/                # TypeScript Definitions
│   └── index.ts          # Core domain models (Product, Category, User, Cart)
│
└── utils/                # Formatting and Helpers
    └── format.ts         # formatPrice() (paise to currency)
```

---

## 3. Data Fetching & State Management

### The Custom Hook Pattern (SWR)
We do not use Redux or Zustand for server state. Instead, we use **SWR** wrapped in custom hooks to communicate with the FastAPI backend.

**Example**: `useProducts(params)`
- Automatically serializes query parameters (page, per_page, category_id, search).
- Handles loading (`isLoading`) and error (`error`) states.
- Revalidates data intelligently.

### Client vs. Server Components
- Most marketing sections (`storefront/`) that require Framer Motion (`ScrollReveal`, `StaggerContainer`) are explicitly marked with `"use client"`.
- We utilize Next.js server components where possible for layouts and SEO, but interactive elements (filtering, shopping cart, animations) rely on client boundaries.

---

## 4. The "Premium Wellness" Design System

The platform has been meticulously engineered to feel like a high-end editorial wellness magazine. 

### A. Color Palette
We do not use standard black (`#000000`) or white (`#FFFFFF`).
- **Backgrounds**: `bg-brand-black` (a very deep, warm off-black). Component cards use `#0F0D0A` to slightly elevate them from the background.
- **Text**: `text-brand-white` (an off-white, typically #FAFAFA). Text hierarchy is established using opacity: `text-brand-white/90` for primary, `text-brand-white/50` for secondary.
- **Accents**: `text-brand-gold` (a muted, sophisticated gold `#C9A84C`). Used for active states, micro-labels, and subtle glows.

### B. Typography (Editorial Stack)
- **Primary Headings**: **Serif** fonts. We use `font-serif` heavily for sections headers and product titles to convey craftsmanship.
- **Italic Accents**: Headings frequently mix upright serifs with italicized phrases (e.g., `Why <span className="italic">The Oats Hub?</span>`).
- **Micro-Labels (Pre-titles)**: `tracking-[0.3em] uppercase text-[10px]`. This extreme tracking is a signature of luxury editorial design.
- **Body**: Clean geometric sans-serif, using `font-light` and `leading-relaxed`.

### C. Cinematic Motion
- **No Snappy Transitions**: Transitions should feel intentional and weighty. We use `duration-500`, `duration-700`, and for image zooms, `duration-[2s] ease-out`.
- **Card Hovers**: Cards do not jump (`-translate-y-1`). Instead, they emit subtle inner glows (`bg-[#13110C]`), their borders illuminate (`hover:border-brand-gold/20`), and inner icons gently shift colors.
- **Scroll Reveals**: Handled by the `ScrollReveal` component using Framer Motion to gently fade and slide elements up as they enter the viewport.

### D. Layout Patterns
- **Asymmetry**: We actively avoid boring, symmetrical block grids for marketing content. We use staggered heights, overlapping text, and offset indices (e.g., ghosted numbers like `01`, `02` in the background).
- **Hairlines**: We use 1px borders heavily for structure. E.g., `border-brand-white/[0.04]` for cards, or a `w-6 h-[1px] bg-brand-gold/50` line next to pre-titles.
- **Atmospherics**: Deep backgrounds often feature radial gradients that simulate ambient lighting.
  ```tsx
  <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(201,168,76,0.03)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
  ```

---

## 5. Key Component Architecture

### A. The `ProductCard` (`components/ecommerce/product-card.tsx`)
A masterclass in the design system:
- It strips away standard Shadcn UI borders.
- Uses a `bg-[#0F0D0A]` image container with an inner atmospheric glow.
- The image scales slowly on hover (`duration-[2s]`), while a dark gradient overlay fades up from the bottom (`opacity-0 group-hover:opacity-100 duration-500`).
- Typography uses the editorial serif for the product name and micro-tracking gold for the category.

### B. Form Controls (Inputs, Selects)
Form controls have been stripped of light-mode defaults:
- They are pill-shaped (`rounded-full`).
- They use deep backgrounds (`bg-[#0F0D0A]`) with thin transparent borders (`border-brand-white/[0.08]`).
- Focus states utilize the gold accent: `focus-visible:ring-brand-gold/40`.
- **Important**: Inputs must be explicitly controlled (using `value` and `onChange` bound to React State) to avoid Next.js / Base UI warnings when interacting with `useSearchParams`.

### C. The `ProductListing` (`components/ecommerce/product-listing.tsx`)
- Handles complex client-side state for search and category filtering.
- Syncs local React state (for the Search Input) with Next.js URL parameters (`useSearchParams` and `useRouter`) via `useEffect`.
- Implements bespoke pagination with gold hover states and italic serif page indicators (`1 / 5`).

---

## 6. Development Guidelines

When making modifications or adding new features to the frontend:
1. **Never use `bg-white` or light cards.** The app is strictly dark-mode editorial.
2. **Type Safety**: Always rely on `src/types/index.ts`. E.g., Use `PriceDisplay` component to handle paise-to-rupee conversions safely.
3. **Responsive Design**: Ensure complex asymmetric layouts collapse gracefully on mobile using standard Tailwind `md:` and `lg:` breakpoints.
4. **Hydration Errors**: When rendering `useSearchParams` or `window` dependent data, wrap the parent in `<Suspense>` to prevent Next.js SSR hydration mismatches.

*(End of Technical Reference)*

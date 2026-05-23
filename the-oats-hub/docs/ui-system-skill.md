# UI System Governance & Visual Philosophy
**The Oats Hub: Premium D2C Design System**

## 1. Brand Philosophy
**The Oats Hub** is a premium wellness e-commerce brand. It operates as a luxury direct-to-consumer (D2C) nutrition platform, promoting a modern, clean-label lifestyle.
- **Premium Wellness Identity**: The brand embodies quality, health, and sophistication.
- **Luxury D2C Positioning**: The experience should feel akin to luxury fashion or high-end electronics, not a discount supplement shop.
- **Emotional Product Storytelling**: Every interface should tell a story of health, vitality, and purity. 

## 2. Visual Philosophy
- **Whitespace-First Layouts**: Generous margins and paddings are mandatory. Elements need room to breathe. Clutter destroys the perception of luxury.
- **Calm Premium Feel**: Avoid aggressive marketing banners, loud neon colors, or frantic countdown timers. The interface must evoke tranquility and confidence.
- **Luxury Minimalism**: Less is more. Focus on high-quality typography, stunning product photography, and subtle UI borders.
- **Trust-Focused UI**: Emphasize cleanliness and clarity. Trust is built through consistent, bug-free, and pixel-perfect design.

## 3. Color System
The color palette is restrained, leveraging dark modes, sleek surfaces, and a signature gold accent.

- **Backgrounds**: 
  - Light mode: Pure white (`#ffffff`) or extremely light warm gray (`#fafafa`).
  - Dark mode: True black (`#000000`) or deep charcoal (`#0a0a0a`). Never use muddy grays.
- **Elevated Surfaces**: Use slight color variations (`#f4f4f5` light, `#18181b` dark) to lift cards and dropdowns without relying heavily on harsh shadows.
- **Gold Accent System** (`#D4AF37` / Brand Gold):
  - **Where to use**: Primary CTAs, active states, premium badges, and subtle icons.
  - **Where NOT to use**: Backgrounds, large blocks of text, or generic informational alerts. Gold is a spotlight; do not flood the stage with it.
- **Typography Colors**: High contrast for readability. Almost black (`#09090b`) for light mode, almost white (`#fafafa`) for dark mode. Use muted tones (`#71717a`) for secondary text.
- **Border Colors**: Extremely subtle (`#e4e4e7` light, `#27272a` dark). Borders should organize content invisibly.

## 4. Typography System
We use **Inter** (or a similar modern sans-serif like Roboto/Outfit) to convey clinical precision alongside modern elegance.

- **Hero Hierarchy (`h1`)**: Massive, confident, tight tracking. `text-4xl` to `text-6xl`, `font-extrabold`, `tracking-tight`.
- **Section Hierarchy (`h2`, `h3`)**: Clear, structural. `text-2xl` to `text-3xl`, `font-semibold`.
- **Body Hierarchy (`p`)**: Highly readable. `text-base`, `leading-relaxed`, `text-muted-foreground`.
- **Pricing Hierarchy**: Bold, unapologetic. The price is a feature of quality.
- **Label Styles**: Uppercase, wide tracking for subheadings. `text-xs`, `uppercase`, `tracking-widest`, `font-medium`.

## 5. Spacing Philosophy
- **Section Spacing**: Massive vertical rhythm. `py-16` or `py-24` between major landing page sections.
- **Container Sizing**: Restrict max widths to ensure optimal reading lines. `max-w-7xl` for standard grids, `max-w-3xl` for articles.
- **Breathing Room**: Always pad generously inside cards (`p-6` or `p-8`). Never let text touch the edges.
- **Premium Composition Rules**: If a layout feels cramped, increase the gap, do not shrink the text.

## 6. Layout System
- **Mobile-First Layouts**: Every design starts with the thumb zone. Grids must collapse elegantly into single columns on mobile.
- **Desktop Cinematic Layouts**: Utilize the horizontal space for immersive product galleries. Use asymmetric splits (e.g., 60% image / 40% sticky text).
- **Editorial Composition**: Treat product pages like magazine spreads. Mix large lifestyle photography with structured technical data.
- **Responsive Grid Rules**: CSS Grid is standard. `grid-cols-1` on mobile, `md:grid-cols-2`, `lg:grid-cols-3` or `4` on large screens.

## 7. Card System
- **Product Cards**: Borderless or extremely subtle 1px border. The product image is the hero. Backgrounds should be neutral to let the product pop.
- **Elevated Surfaces**: Minimal drop shadows. Use `shadow-sm` or `shadow-md` with low opacity (`shadow-black/5`).
- **Hover Philosophy**: Gentle, magnetic. Lift the card slightly (`-translate-y-1`) or zoom the image within its container (`scale-105`).
- **Premium Shadows**: Never use default harsh shadows. Shadows should simulate soft, ambient lighting.

## 8. Button System
- **Primary CTA**: Solid background (Brand Gold or Black/White depending on theme). Rounded corners (`rounded-full` or `rounded-xl`). High contrast text.
- **Secondary CTA**: Ghost or outline buttons. `border-border` with hover background matching the subtle surface color.
- **Ghost Button Rules**: Used for secondary actions (e.g., "Learn More", "Cancel"). Should not distract from the Primary CTA.
- **Interaction Philosophy**: Buttons must feel substantial. Add `active:scale-95` and `transition-all` for tactile feedback.

## 9. Mobile UX Rules
- **Sticky CTAs**: "Add to Cart" or "Checkout" buttons must be sticky at the bottom of the screen on product and cart pages.
- **Bottom Sheets**: Prefer slide-up bottom sheets for filters, options, and cart over full-page modals.
- **Thumb Reachability**: Place primary navigation and critical actions in the bottom third of the screen.
- **Responsive Spacing**: Scale down `py-24` to `py-12` on mobile, but maintain structural hierarchy.
- **Tap Target Rules**: Minimum 44x44px for all interactive elements.

## 10. Admin UI Philosophy
- **Operational UI**: The Admin dashboard is a tool, not an advertisement. Function > Emotion.
- **Readability**: High-density data tables. Smaller text (`text-sm`) is acceptable here to maximize viewport utility.
- **Dashboard Cleanliness**: Avoid massive images. Rely heavily on borders, subtle background stripes, and clear status badges.
- **Separation from Storefront**: Do not use the Brand Gold excessively in admin. Use standard functional colors (Blue for action, Green for success, Red for destructive).

## 11. AI Agent Rules
**What future agents MUST do:**
- MUST use predefined Tailwind tokens (e.g., `text-muted-foreground`, `bg-background`).
- MUST wrap complex layouts in responsive grids.
- MUST implement mobile-first styling (`w-full md:w-1/2`).
- MUST use Lucide React for consistent iconography.
- MUST implement skeleton loaders for async UI components.

**What future agents MUST NEVER do:**
- MUST NEVER use generic bright colors (e.g., `bg-red-500` for headers) unless it's a semantic error state.
- MUST NEVER hardcode pixel values for margins/padding (always use Tailwind spacing `p-4`, `gap-8`).
- MUST NEVER create cramped, margin-less layouts.
- MUST NEVER bypass the `useAuth` or `useCart` contexts for localized state hacks.
- MUST NEVER import external, unapproved UI libraries without explicit instruction.

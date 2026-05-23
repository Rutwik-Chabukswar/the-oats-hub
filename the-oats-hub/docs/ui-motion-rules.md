# Motion & Animation System
**The Oats Hub: Premium UX Motion Guidelines**

## 1. Motion Philosophy
Motion in The Oats Hub must be:
- **Subtle**: Invisible until it matters. It should guide the eye, not distract it.
- **Premium**: Smooth, intentional, and physics-based. Bounce effects should feel heavy and grounded, not floaty or erratic.
- **Elegant**: Avoid abrupt flashes. Transitions should feel like turning the page of a high-end magazine.
- **Performance-First**: 60fps minimum. If an animation drops frames on a mid-tier mobile device, remove the animation.

## 2. Animation Rules
- **Duration Ranges**: 
  - Micro-interactions (hover, tap): `150ms` - `200ms`
  - Route/Page Transitions: `300ms` - `400ms`
  - Complex Choreography (modals, drawers): `400ms` - `500ms`
- **Easing Philosophy**: Use `ease-out` for elements entering the screen (decelerating). Use `ease-in` for elements leaving (accelerating). For Framer Motion, prefer spring physics (`type: "spring", stiffness: 300, damping: 30`) over linear tweens.
- **Animation Hierarchy**: Hero elements animate first, followed by secondary content. Never animate everything at once.

## 3. Page Transitions
- **Route Transitions**: Use Framer Motion `<AnimatePresence>`. Pages should fade in (`opacity: 0 -> 1`) while translating slightly upward (`y: 10 -> 0`).
- **Fade Patterns**: Content swaps (like filtering a product list) should crossfade to avoid jarring layout shifts.
- **Slide Behavior**: Navigational shifts (e.g., going deeper into an account menu) should slide horizontally (`x: 20 -> 0`).

## 4. Product Card Motion
- **Hover Scaling**: The product image should scale gently inside its container (`scale-105`) while the container itself remains static to prevent layout jitter.
- **Elevation**: The card border or shadow should softly intensify on hover (`shadow-sm -> shadow-md`).
- **Image Interactions**: When variants are hovered, product images should crossfade smoothly, not snap abruptly.

## 5. Add-to-Cart Motion
- **Pulse Feedback**: When the CTA is clicked, the button should shrink slightly (`scale: 0.95`) and return, providing immediate tactile success feedback.
- **Cart Badge Behavior**: The cart counter in the header should pop (`scale: 1.2 -> 1.0`) when an item is added.
- **Success Transitions**: The button text should temporarily switch to "Added!" with a checkmark before the Cart Drawer slides open.

## 6. Scroll Reveal Rules
- **Fade-Up Behavior**: As the user scrolls, new sections should fade in and slide up (`y: 20 -> 0`, `opacity: 0 -> 1`).
- **Viewport Animations**: Trigger animations only when elements enter the viewport. Use Framer Motion's `whileInView` with `viewport={{ once: true, margin: "-100px" }}`.
- **Stagger Rules**: When revealing a grid of items (like a product list), stagger the children by `0.05s` to create a cascading entrance.

## 7. Skeleton Loading Rules
- **Shimmer Behavior**: Skeletons must use a smooth, continuous linear gradient shimmer (`animate-pulse` or custom CSS animation moving a gradient).
- **Layout Preservation**: Skeletons MUST match the exact dimensions of the content they are replacing. Layout shifts after loading are unacceptable.
- **Loading UX**: Prefer optimistic UI updates over blocking loading spinners whenever a mutation occurs (e.g., liking an item, updating cart quantity).

## 8. Modal + Drawer Motion
- **Bottom Sheet Behavior**: On mobile, modals should slide up from the bottom (`y: "100%" -> 0`) and attach to the bottom edge.
- **Cart Drawer Behavior**: On desktop, the cart should slide in from the right (`x: "100%" -> 0`). The overlay background should fade in (`opacity: 0 -> 0.5`) simultaneously.
- **Mobile Motion Patterns**: Ensure drawers can be swiped down to close, mimicking native iOS/Android behavior.

## 9. Mobile Motion Constraints
- **GPU-Friendly Motion**: ONLY animate `transform` (scale, translate, rotate) and `opacity`. NEVER animate `width`, `height`, `margin`, or `padding` as they trigger layout recalculations and cause stuttering.
- **Lightweight Transitions**: Disable complex staggered animations on mobile devices if they impact scrolling performance.
- **No Frame Drops**: If Framer Motion causes lag, fall back to pure CSS transitions (`transition-all duration-300 ease-out`).

## 10. AI Motion Rules
**Allowed Animation Patterns:**
- `framer-motion` for complex entering/leaving choreography.
- Tailwind `transition-*` classes for simple hover/focus states.
- Skeleton loaders for asynchronous data fetching.

**Forbidden Motion Patterns:**
- NEVER use infinite bouncing or flashing animations.
- NEVER animate layout properties (`width`, `height`, `top`, `left`).
- NEVER create animations longer than `800ms`.
- NEVER trigger heavy animations on scroll without debouncing or using `IntersectionObserver`/`whileInView`.

**Performance Constraints:**
- AI agents MUST wrap heavily animated lists in memoized components to prevent unnecessary re-renders during motion.

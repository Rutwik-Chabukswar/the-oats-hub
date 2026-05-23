# The Oats Hub — UI Guidelines

## Brand Identity

| Property       | Value                          |
|----------------|--------------------------------|
| Brand Name     | The Oats Hub                   |
| Brand Type     | Premium D2C Nutrition          |
| Theme          | Black + Gold                   |
| Feel           | Premium, Modern, Clean         |

## Color Palette

### Primary Colors
| Token                | Value       | Usage                      |
|----------------------|-------------|----------------------------|
| `--brand-black`      | `#0A0A0A`   | Primary background         |
| `--brand-gold`       | `#C9A84C`   | Accent, CTAs, highlights   |
| `--brand-gold-light` | `#E8D48B`   | Hover states, soft accents |
| `--brand-white`      | `#FAFAFA`   | Text on dark backgrounds   |
| `--brand-gray`       | `#1A1A1A`   | Card backgrounds           |
| `--brand-gray-light` | `#2A2A2A`   | Borders, dividers          |

### Semantic Colors
| Token          | Value       | Usage                |
|----------------|-------------|----------------------|
| `--success`    | `#22C55E`   | Success states       |
| `--warning`    | `#F59E0B`   | Warning states       |
| `--error`      | `#EF4444`   | Error states         |
| `--info`       | `#3B82F6`   | Informational        |

## Typography

- **Primary Font**: Inter (Google Fonts)
- **Heading Font**: Inter (600-800 weight)
- **Body Font**: Inter (400 weight)

### Scale
| Element  | Size      | Weight | Line Height |
|----------|-----------|--------|-------------|
| H1       | 2.5rem    | 800    | 1.2         |
| H2       | 2rem      | 700    | 1.3         |
| H3       | 1.5rem    | 600    | 1.4         |
| Body     | 1rem      | 400    | 1.6         |
| Small    | 0.875rem  | 400    | 1.5         |
| Caption  | 0.75rem   | 400    | 1.4         |

## Component Guidelines

### Buttons
- Primary: Gold background, black text
- Secondary: Outlined with gold border
- Ghost: No border, gold text on hover
- All buttons have subtle hover transitions (150ms)

### Cards
- Dark background (`--brand-gray`)
- Subtle gold border on hover
- Rounded corners (8px)
- Soft shadow

### Images
- Product images should be high quality
- Use `next/image` for optimization
- Provide proper alt text for accessibility

## Responsive Breakpoints

| Breakpoint | Width   | Usage             |
|------------|---------|-------------------|
| `sm`       | 640px   | Mobile landscape  |
| `md`       | 768px   | Tablet            |
| `lg`       | 1024px  | Desktop           |
| `xl`       | 1280px  | Wide desktop      |
| `2xl`      | 1536px  | Ultra-wide        |

## Layout Rules

1. **Mobile-First**: Always design for 375px width first
2. **Spacious**: Use generous padding and margins
3. **Sticky CTAs**: Important buttons sticky on mobile
4. **Max Width**: Content container max-width 1280px
5. **Grid System**: 4 cols mobile → 8 cols tablet → 12 cols desktop

## Accessibility

- Minimum contrast ratio: 4.5:1 for text
- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Provide ARIA labels where needed
- Focus indicators must be visible

## Animation Guidelines

- Transition duration: 150ms for micro-interactions
- Ease function: `ease-in-out`
- No layout shift during animations
- Respect `prefers-reduced-motion`

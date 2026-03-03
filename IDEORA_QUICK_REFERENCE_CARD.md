# 🎨 IDEORA ELITE VISUAL SYSTEM - QUICK REFERENCE CARD

## Color Palette Cheat Sheet

```css
/* FOUNDATION (Use as base) */
--primary-bg:       #0A0E27 (Deep Indigo)
--secondary-bg:     #1A1F3A (Charcoal)
--text-primary:     #FFFFFF (Pure White)
--text-secondary:   #E2E8F0 (Light Gray)

/* INTELLIGENCE ACCENTS (Use for UI) */
--accent-cyan:      #00D9FF (Electric Cyan) → CTAs, Primary highlights
--accent-blue:      #0080FF (Electric Blue) → Data, Analytics
--accent-violet:    #B026FF (Neon Violet) → AI, Neural elements

/* DATA COMMUNICATION */
--positive:         #10B981 (Success Green) → Growth, Positive
--alert:            #FF006E (Alert Orange) → Opportunities, High Priority
```

---

## Quick Component Usage

### Hero Section
```tsx
<section style={{backgroundImage: 'url(/hero-bg-intelligence.jpg)'}}>
  {/* Intelligence aesthetic: neural network glow */}
</section>

<section style={{backgroundImage: 'url(/hero-bg-momentum.jpg)'}}>
  {/* Momentum aesthetic: growth trajectory */}
</section>

<section style={{backgroundImage: 'url(/hero-bg-insights.jpg)'}}>
  {/* Insights aesthetic: central AI mesh */}
</section>
```

### Glass Card
```tsx
<div className="bg-charcoal/85 backdrop-blur-md border border-cyan-400/20 
                rounded-3xl p-6 shadow-lg hover:border-cyan-400/50 
                hover:shadow-xl transition-all duration-300">
  {children}
</div>
```

### Micro Intelligence Card
```tsx
import { MicroIntelligenceCard } from '@/components/landing/micro-intelligence-cards';

<MicroIntelligenceCard
  icon={<TrendingUp className="w-5 h-5" />}
  title="Trend Intelligence"
  metric="+24% week-over-week"
  description="Spot emerging trends before competition"
  gradient="cyan"
/>
```

---

## Typography Scale

| Purpose | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Hero | 64px | 700 | 1.2 |
| Section Title | 48px | 600 | 1.3 |
| Card Title | 24px | 600 | 1.4 |
| Body Large | 18px | 400 | 1.6 |
| Body Regular | 16px | 400 | 1.6 |
| Small | 14px | 400 | 1.5 |
| Label | 12px | 500 | 1.3 |
| Caption | 11px | 400 | 1.4 |

---

## Spacing Quick Reference

```
xs:  4px    (Micro gaps between elements)
sm:  8px    (Tight spacing)
md:  16px   (Standard padding)
lg:  24px   (Comfortable spacing)
xl:  32px   (Generous spacing)
2xl: 48px   (Large gaps)
3xl: 64px   (Section breaks)
```

---

## Shadow System

```css
/* Use based on depth */
box-shadow: var(--shadow-micro);      /* Subtle, close to surface */
box-shadow: var(--shadow-small);      /* Slight elevation */
box-shadow: var(--shadow-medium);     /* Clear elevation */
box-shadow: var(--shadow-large);      /* Strong elevation */
box-shadow: var(--shadow-elevation);  /* Maximum depth */
```

---

## Motion Timing

| Interaction | Duration | Easing | Example |
|------------|----------|--------|---------|
| Micro (button hover) | 150-200ms | ease-out | Color shift, opacity |
| Standard (card hover) | 250-300ms | ease-out | Scale, shadow |
| Complex | 400-600ms | cubic-bezier | Page transitions |
| Entrance | 400-500ms | ease-out | Fade in, slide |
| Exit | 250-350ms | ease-in | Fade out, slide |

---

## Asset File Reference

### Hero Backgrounds (Choose 1 per section)
- `/public/hero-bg-intelligence.jpg` - Neural network (analytical feel)
- `/public/hero-bg-momentum.jpg` - Growth trajectory (dynamic feel)
- `/public/hero-bg-insights.jpg` - AI mesh (discovery feel)

### Tileable Backgrounds (Layer behind content)
- `/public/bg-neural-mesh.jpg` - Neural texture
- `/public/bg-data-heatmap.jpg` - Data density
- `/public/bg-strategy-grid.jpg` - Strategy perspective
- `/public/bg-intelligence-flow.jpg` - Organic flow
- `/public/bg-particle-motion.jpg` - Subtle particles

### Animated Elements (Embed in sections)
- `/trend-graph-anim.gif` - Upward trend line
- `/velocity-meter-anim.gif` - Circular score meter
- `/typing-generation-anim.gif` - AI typing effect
- `/opportunity-pulse-anim.gif` - Pulsing badge
- `/neural-path-anim.gif` - Neural network forming

---

## Color Usage Guidelines

### When to Use Each Color

**Electric Cyan (#00D9FF)**
- Primary call-to-action buttons
- Main focus/highlight areas
- Border glows on premium cards
- Loading indicators
- Active states

**Electric Blue (#0080FF)**
- Chart lines and data visualization
- Secondary CTAs
- Data labels
- Link text
- Icon accents

**Neon Violet (#B026FF)**
- AI/algorithmic indicators
- Neural network elements
- Special feature badges
- Accent highlights
- Alternative CTAs

**Success Green (#10B981)**
- Growth metrics
- Positive indicators
- Completion status
- Approved states

**Alert Orange (#FF006E)**
- Opportunities
- High-priority items
- Important alerts
- Call attention

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 639px) {
  /* Single column, simpler layouts */
}

/* Tablet */
@media (min-width: 640px) and (max-width: 1023px) {
  /* Two columns, simplified animations */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Multi-column, full animations */
}
```

---

## DO's & DON'Ts

### DO ✅
- Use colors intentionally (each color has a purpose)
- Apply glass morphism consistently to cards
- Use 14px border-radius for premium feel
- Implement smooth 300ms transitions
- Layer backgrounds for depth
- Use Electric Cyan for primary interactions
- Apply subtle shadows for elevation
- Keep animations under 5 seconds
- Use text-balance for headings
- Maintain consistent spacing

### DON'T ❌
- Don't use multiple bright colors together
- Don't create harsh shadows
- Don't use rounded corners smaller than 8px
- Don't animate without purpose
- Don't ignore responsive design
- Don't use decorative elements without function
- Don't exceed 5 colors per section
- Don't use playful or cartoonish effects
- Don't forget line-height on body text
- Don't apply backdrop blur on older browsers without fallback

---

## Quick Integration Checklist

- [ ] Import color variables from `/app/globals.css`
- [ ] Use Tailwind classes for theming
- [ ] Apply 14px border-radius to cards
- [ ] Use backdrop-blur-md for glass effect
- [ ] Add border with primary color at 20% opacity
- [ ] Implement hover state (increased opacity + elevation)
- [ ] Use 300ms ease-out timing function
- [ ] Reference design tokens in CSS
- [ ] Test in both dark and light modes
- [ ] Verify mobile responsiveness

---

## Component Template

```tsx
export function PremiumCard() {
  return (
    <div className={`
      bg-gradient-to-br from-charcoal/85 to-charcoal/50
      backdrop-blur-md border border-primary/20
      rounded-[14px] p-6 shadow-lg
      hover:border-primary/50 hover:shadow-xl
      transition-all duration-300
      hover:-translate-y-1
    `}>
      {/* Content */}
    </div>
  );
}
```

---

## Real-World Example

```tsx
import Image from 'next/image';

export function HeroWithBackground() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/hero-bg-intelligence.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-0" />
      
      {/* Content */}
      <div className="relative z-10 text-center space-y-6 max-w-4xl px-6">
        <h1 className="text-6xl font-bold text-white text-balance">
          AI Content Intelligence
        </h1>
        <button className="px-8 py-4 bg-primary text-primary-foreground rounded-full 
                          font-semibold hover:shadow-lg hover:shadow-primary/50 
                          transition-all duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
}
```

---

## Brand Color Swatches

```
Deep Indigo       Obsidian          Charcoal          Graphite
#0A0E27           #0F1419           #1A1F3A           #2D3748
████████          ████████          ████████          ████████

Electric Cyan     Electric Blue     Neon Violet       Success Green
#00D9FF           #0080FF           #B026FF           #10B981
████████          ████████          ████████          ████████

Alert Orange      Pure White        Light Gray
#FF006E           #FFFFFF           #E2E8F0
████████          ████████          ████████
```

---

## Animation Durations

- Hover card lift: 300ms
- Border glow increase: 300ms
- Shadow depth: 300ms
- Text fade-in: 400ms
- Slide entrance: 500ms
- Complex animation: 600ms

---

## Accessibility Notes

- ✅ All colors meet WCAG AA contrast requirements
- ✅ Use `prefers-reduced-motion` for animation-sensitive users
- ✅ Maintain text contrast of at least 4.5:1
- ✅ Don't rely on color alone for meaning
- ✅ Provide focus states for keyboard navigation
- ✅ Use semantic HTML elements
- ✅ Add alt text for all images

---

## Performance Tips

- Lazy load background images
- Use WebM/MP4 for animations (smaller than GIF)
- Optimize SVG animations
- Defer non-critical CSS
- Use CSS custom properties (not pre-processing)
- Minimize backdrop blur on mobile
- Test on real devices

---

**IDEORA ELITE VISUAL SYSTEM - Quick Reference Complete** ✨

*Keep this handy for daily implementation and team consistency.*

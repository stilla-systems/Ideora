# 🎯 StillaTrends Design - Quick Reference

## Feature Bubbles at a Glance

### 1. Daily Trends 📊
\`\`\`
Color:    Indigo (#6366f1)
Tagline:  AI recommendations
Value:    Morning trend insights
Icon:     Text only (no icons)
\`\`\`

### 2. Weekly Insights 📈
\`\`\`
Color:    Cyan (#06b6d4)
Tagline:  Growth analysis
Value:    Performance metrics
Icon:     Text only (no icons)
\`\`\`

### 3. Multi-Platform 🌐
\`\`\`
Color:    Purple (#a855f7)
Tagline:  5+ networks
Value:    All platforms covered
Icon:     Text only (no icons)
\`\`\`

### 4. Personalized 🎯
\`\`\`
Color:    Pink (#ec4899)
Tagline:  For your niche
Value:    AI-tailored insights
Icon:     Text only (no icons)
\`\`\`

### 5. Dashboard Delivery 📱
\`\`\`
Color:    Teal (#0891b2)
Tagline:  One interface
Value:    Unified experience
Icon:     Text only (no icons)
\`\`\`

---

## Responsive Sizes

| Device | Width | Height | Columns | Grid |
|--------|-------|--------|---------|------|
| Mobile | w-24 (96px) | h-24 (96px) | 2 | grid-cols-2 |
| Tablet | w-32 (128px) | h-32 (128px) | 3 | grid-cols-3 |
| Desktop | w-40 (160px) | h-40 (160px) | 5 | grid-cols-5 |

---

## Hover Effects (300ms)

\`\`\`
START STATE       →    HOVER STATE
┌─────────────┐      ┌─────────────┐
│ Scale: 1x   │      │ Scale: 1.1x │
│ Shadow: sm  │  →   │ Shadow: 2xl │
│ Glow: off   │      │ Glow: on    │
│ Overlay: 0% │      │ Overlay: 15%│
└─────────────┘      └─────────────┘
\`\`\`

---

## Color System

\`\`\`
Indigo    #6366f1 ▰▰▰▰▰▰▰▰▰▰ Daily Trends
Cyan      #06b6d4 ▰▰▰▰▰▰▰▰▰▰ Weekly Insights
Purple    #a855f7 ▰▰▰▰▰▰▰▰▰▰ Multi-Platform
Pink      #ec4899 ▰▰▰▰▰▰▰▰▰▰ Personalized
Teal      #0891b2 ▰▰▰▰▰▰▰▰▰▰ Dashboard
\`\`\`

All 5 colors = Primary palette (minimal and focused)

---

## Layout Pattern

### Grid Structure
\`\`\`
.grid {
  display: grid;
  place-items: center;
}

Mobile (< 768px):
├─ grid-template-columns: repeat(2, 1fr)
├─ gap: 0.75rem (gap-3)
└─ bubble size: w-24 h-24

Tablet (768px - 1024px):
├─ grid-template-columns: repeat(3, 1fr)
├─ gap: 1rem (gap-4)
└─ bubble size: w-32 h-32

Desktop (> 1024px):
├─ grid-template-columns: repeat(5, 1fr)
├─ gap: 1.5rem (gap-6)
└─ bubble size: w-40 h-40
\`\`\`

---

## Glassmorphism Recipe

\`\`\`css
.bubble {
  /* Base */
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem; /* rounded-2xl */
  
  /* Interaction */
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Hover */
  @hover {
    transform: scale(1.1);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    
    /* Gradient overlay */
    ::before { opacity: 0.15; }
    
    /* Glow effect */
    ::after { opacity: 1; }
  }
}
\`\`\`

---

## Typography

| Element | Mobile | Tablet | Desktop | Weight |
|---------|--------|--------|---------|--------|
| Title | text-sm | text-base | text-lg | bold |
| Tagline | hidden | text-xs | text-sm | normal |
| Section Heading | text-4xl | text-5xl | text-6xl | bold |
| Description | text-lg | text-xl | text-xl | normal |

---

## Spacing

\`\`\`
Section:  px-4 py-24 md:py-32
Title Area: mb-16 md:mb-24
Grid Gap:   gap-3 md:gap-4 lg:gap-6
Padding:    p-4 md:p-6
\`\`\`

---

## Animation Easing

\`\`\`
cubic-bezier(0.4, 0, 0.2, 1)

Visual:    ╱
          ╱
         ╱
        ╱
───────────

Effect: Quick start, smooth finish (premium feel)
\`\`\`

---

## Files Quick Access

| File | Purpose |
|------|---------|
| `/components/landing/features.tsx` | Main component |
| `/lib/design-specs.json` | Design tokens |
| `/public/logo.png` | Brand logo |
| `/public/favicon.ico` | Browser icon |
| `/DESIGN_SUMMARY.md` | Full guide |
| `/lib/design-output.json` | JSON specs |

---

## Mobile-First Approach

\`\`\`
1. Base (Mobile)      → 2 columns, w-24, text-sm
2. Tablet (md:)       → 3 columns, w-32, text-base
3. Desktop (lg:)      → 5 columns, w-40, text-lg

All breakpoints work seamlessly with CSS media queries
\`\`\`

---

## Accessibility

\`\`\`
✓ WCAG AAA Contrast
✓ Keyboard Navigation
✓ Focus Indicators
✓ Semantic HTML
✓ Screen Reader Support
✓ Reduced Motion Support
\`\`\`

---

## Browser Support

\`\`\`
Chrome   100+   ✓
Firefox  103+   ✓
Safari   15+    ✓
Edge     100+   ✓
Mobile   Modern ✓
\`\`\`

---

## Performance Checklist

\`\`\`
✓ GPU-Accelerated (transform)
✓ No Layout Shifts (CSS Grid)
✓ Smooth 300ms Transitions
✓ Lazy Loading on Images
✓ No Jank on Hover
✓ Optimized Backdrop-Filter
\`\`\`

---

## Dark Mode

\`\`\`
Light Mode:
├─ Background: #f5f3ff
└─ Text: #1a1a2e

Dark Mode:
├─ Background: #0f0f1e
└─ Text: #f5f3ff

Automatic via CSS custom properties
\`\`\`

---

## MVP Value Props

| Feature | Says |
|---------|------|
| Daily Trends | Get smart recommendations every day |
| Weekly Insights | Track your growth with detailed analytics |
| Multi-Platform | Cover all your favorite platforms |
| Personalized | Content tailored to your audience |
| Dashboard | Everything in one beautiful place |

---

## Status

✅ **Production Ready**

All components tested and optimized. Ready for immediate deployment.

---

*Quick Reference Guide | January 24, 2026*

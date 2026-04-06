# IDEORA Premium Landing Page - Interaction & Motion Guide

## User Journey & Interaction Flow

### 1. Page Load Experience

**Hero Section** (0ms - 500ms)
- Fade in headline with perfect letter spacing
- Badge appears with live indicator pulse
- Subheadline becomes visible
- CTAs ready for interaction

**Aesthetic**: Minimal, no distracting animations
**Feel**: Premium, professional, ready for action

---

## Section-by-Section Interactions

### HEADER
**Sticky Navigation**
- Background: Gradient blend of dark + subtle purple
- Links: "Intelligence", "Pricing", "Login"
- Hover Effect: Underline gradient (violet → pink → cyan)
- CTA Button: "Start Free Trial" with gradient
- Theme Toggle: Dark/light mode switch

**Mobile**: Hamburger menu expands to vertical list

---

### HERO SECTION
**Badge**
- Style: Glass morphism with live dot indicator
- Hover: Slight scale (1.02)
- Text: "AI Content Intelligence Platform"

**Headline**
- Text: "Turn Ideas Into Impact."
- Size: 7xl on desktop, 5xl on mobile
- Weight: Bold (700)
- Color: Pure white (#f0f1f5)
- Letter-spacing: Tight (tracking-tight)
- Line-height: Relaxed (leading-tight)

**Subheadline**
- Size: xl (20px)
- Color: Gray-300
- Max-width: 2xl container
- Text balance for optimal breaks

**CTAs**
- Primary Button: "Start Free Trial"
  - Style: Solid white background
  - Hover: Slight scale + shadow
  - Transition: 300ms ease-out
  
- Secondary Button: "Explore the Intelligence Engine"
  - Style: Outlined (border-gray-600)
  - Icon: Arrow (right) that translates on hover
  - Hover: Subtle background glow

**Background**
- Gradient orbs (subtle, opacity 0.05-0.1)
- Depth effect with layered gradients
- No animation - static, premium

---

### INTELLIGENCE PREVIEW SECTION

**Container**
- Title: "Animated Intelligence Preview"
- Subtitle: "Real-time metrics that show your content's potential"

**Metric Cards (6 Total)**
Each card follows this pattern:

**Standard State:**
- Background: Glass (rgba with backdrop blur)
- Border: Color-coded (violet, cyan, pink, amber, red)
- Opacity: 0.08-0.15
- Padding: p-6
- Border-radius: rounded-xl

**Hover State:**
- Shadow: Shadow-xl
- Transform: Subtle lift (shadow adds depth illusion)
- Transition: 300ms ease-out

**Card Content:**
```
[Colored Icon Box] [Right-aligned Value]
Metric Title
Small descriptive text
```

**Color Coding:**
- Idea Score (92) → Violet
- Engagement Forecast (+61%) → Cyan
- Optimal Post Time (7:42 PM) → Pink
- Trend Velocity (RISING) → Amber
- Platform Heat Index (🔥) → Red
- Predictive Accuracy (94%) → Violet

**Responsive:**
- Desktop: 3 columns (grid-cols-3)
- Tablet: 2 columns (md:grid-cols-2)
- Mobile: 1 column

---

### AUTHORITY SECTION: "NOT JUST IDEAS. DIRECTION."

**Section Structure**
- Title: Bold 5xl headline
- Subtitle: Explanatory text, gray-400

**Capability Cards (4 Total)**
Layout: 2x2 grid (md:grid-cols-2)

**Each Card Contains:**
1. **Icon Box** (12px rounded-lg, color-coded)
   - 6x6 icon in Lucide React
   - Semi-transparent background
   
2. **Title** (xl font-semibold)
   - White text
   - Clear, action-oriented
   
3. **Description** (text-gray-400)
   - Detailed explanation
   - Value-focused language

4. **Decorative Blur Orb** (top-right)
   - 32px blur orb
   - Matching card color
   - 0.2 opacity

**Color Mapping:**
- Predictive Scoring → Violet (#a78bfa)
- Opportunity Alerts → Cyan (#06d6ff)
- Content Structure → Pink (#f472b6)
- Platform Alignment → Amber (#fbbf24)

**Interactions:**
- Hover: Scale up 5% (hover:scale-105)
- Shadow: Increased on hover
- Transition: 300ms duration

---

### DASHBOARD PREVIEW SECTION

**Container**
- Title: "Growth Dashboard Preview"
- Subtitle: "A command center for creators"

**Dashboard Mock**
Glass morphism card with:
- Header bar (border-bottom)
- "Your Content Intelligence" title
- Time period dropdown (Last 7 days)

**Stat Cards (4 Grid)**
Layout: md:grid-cols-4 (full width on desktop, 2 on tablet, 1 on mobile)

Each stat card shows:
```
[Colored Icon] Metric Label
Large number (text-3xl font-bold)
Contextual descriptor (text-xs color)
```

Examples:
- Avg Idea Score: 87 (with progress bar)
- Growth Projection: +34% (with color label)
- Ideas This Week: 12 (with descriptor)
- Engagement Momentum: ↑ Strong (with trend)

**Chart Section** (2-column on desktop)
1. **Platform Performance**
   - 3 platform rows (TikTok, YouTube Shorts, Instagram)
   - Each with horizontal progress bar
   - Labels and scores

2. **AI Recommendation Panel**
   - Cyan background (rgba(6, 214, 255, 0.08))
   - 🤖 Emoji prefix
   - Actionable recommendation
   - Expected engagement impact highlighted

---

### PRICING SECTION

**Section Header**
- Title: "Creator Plans" (4xl-5xl, bold)
- Subtitle: "Pricing for every stage. Start free, scale with confidence."

**Pricing Cards (3 Total)**
Layout: md:grid-cols-3 gap-8

**Card Structure:**
1. **Plan Badge** (if featured)
   - "Most Popular" badge
   - Positioned: absolute -top-4 left-1/2
   - Background: Gradient (violet → pink → cyan)

2. **Plan Header**
   - Title (2xl bold)
   - Tagline (sm gray-400)
   - Price (4xl bold)
   - Period (gray-400)

3. **Feature List**
   - Space-y-3 (gap between items)
   - Check icon (Lucide: Check)
   - Color: Violet-400
   - Text: Gray-300

4. **CTA Button**
   - Full width (w-full)
   - Featured plan: Gradient button
   - Other plans: Ghost/outlined button

**Featured Plan (Growth - $79)**
- md:scale-105 (slightly larger)
- ring-2 ring-violet-400 (colored border)
- gradient background (rgba with blur)

**Responsive:**
- Desktop: 3 equal columns
- Tablet: 1-2 columns, stacked
- Mobile: Single column

**Hover Effects:**
- Cards: Lift with shadow
- Buttons: Scale slightly on hover
- Transitions: 300ms smooth

---

### FOOTER

**Content**
- Links and company info
- Contact/social links
- Newsletter signup (optional)

**Styling**
- Consistent with header
- Glass morphism background
- High contrast text

---

## Global Interaction Patterns

### Button States

**Primary Button** (Solid White)
```
Normal:   bg-white text-black
Hover:    bg-gray-100 + shadow-lg
Active:   scale-95 (pressed)
Disabled: opacity-50 cursor-not-allowed
```

**Secondary Button** (Outlined)
```
Normal:   border-gray-600 text-white
Hover:    bg-white/5 (subtle glow)
Active:   scale-95
Disabled: opacity-50 cursor-not-allowed
```

**Gradient Button** (CTA/Featured)
```
Normal:   bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-500
Hover:    shadow-xl shadow-violet-500/50 + scale-102
Active:   scale-95
Disabled: opacity-50
```

### Link Hover States

**Navigation Links**
- Gradient underline (0 → full width)
- Duration: 300ms
- Easing: ease-out
- Colors: Violet → Pink → Cyan

**Text Links**
- Color change: Gray-300 → White
- Underline appears
- Transition: 200ms

### Card Hover States

**Standard Cards**
- Shadow: shadow-xl
- Scale: hover:scale-105
- Duration: 300ms

### Scroll Behavior

**Page-wide**
- Scroll: Smooth (CSS)
- No parallax effects
- No heavy animations on scroll

**Anchor Links**
- Jump to section with smooth scroll
- Focus management maintained
- Keyboard accessible

---

## Micro-Interactions

### Badge
- Live dot: Subtle pulse (optional)
- Scale on hover: 1.02
- Duration: 300ms

### Icon Containers
- Background: Semi-transparent color
- Border: Subtle, matching color
- Size: w-10 h-10
- Border-radius: rounded-lg

### Progress Bars
- Background: bg-gray-800 (dark)
- Foreground: Gradient (cyan → blue)
- Height: h-1 or h-2
- Border-radius: rounded-full

### Loading States (if applicable)
- Skeleton screens with pulse animation
- Gray-400 placeholders
- Smooth fade-in when loaded

---

## Accessibility Considerations

### Keyboard Navigation
- Tab order: Logical flow
- Focus visible: Ring outline
- Skip links: Jump to main content
- Form accessibility: Labels associated

### Screen Readers
- Semantic HTML structure
- ARIA labels where needed
- Alt text for images
- Heading hierarchy maintained

### Color Contrast
- Text on background: WCAG AA minimum
- Links: Distinguishable from text
- Focus indicators: High contrast

### Motion & Animation
- Respect prefers-reduced-motion
- No flashing (>3Hz)
- Auto-play videos: Muted, no sound
- No infinite animations

---

## Performance Optimization

### Loading Strategy
- Hero section: Visible immediately
- Below-fold: Lazy loaded
- Images: Next.js Image optimization
- Fonts: System fonts + Geist (Google Fonts)

### Rendering
- Hardware acceleration: Transform properties
- GPU rendering: Will-change on hover
- CSS containment: Efficient repaints

### Smooth Scrolling
- CSS: scroll-behavior smooth
- JavaScript: Minimal (none for landing)
- RequestAnimationFrame: Not needed

---

## Visual Hierarchy

### Type Scale
```
7xl (56px) - Main headline
5xl (48px) - Section titles
4xl (36px) - Subheadings
2xl (24px) - Card titles
xl  (20px) - Body text
lg  (18px) - Body text secondary
sm  (14px) - Labels
xs  (12px) - Meta text
```

### Color Hierarchy
1. **White** (#f0f1f5) - Primary text
2. **Gray-300** (#d1d5db) - Secondary text
3. **Gray-400** (#9ca3af) - Meta text
4. **Accent colors** - CTAs and highlights

### Spacing Hierarchy
- Sections: py-24 (96px)
- Containers: max-w-6xl to max-w-7xl
- Cards: p-6 to p-8 (24-32px)
- Elements: gap-6 to gap-8

---

## Summary: Interaction Philosophy

**Guiding Principles:**
1. **Subtle, Not Flashy** - 300ms transitions, minimal animations
2. **Premium Feel** - Glass morphism, depth, precision spacing
3. **Purposeful Motion** - Every animation has a reason
4. **Accessible First** - WCAG compliance, keyboard friendly
5. **Performance** - Smooth 60fps, no jank
6. **Creator-Focused** - Language and design serve creator needs

**Overall Vibe:** Linear meets Stripe. Professional, intelligent, trustworthy.

---

*Last Updated*: 2026-03-03
*Design System Version*: 1.0

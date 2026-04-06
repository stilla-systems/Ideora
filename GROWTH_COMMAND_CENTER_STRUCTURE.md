# Growth Command Center - Visual Structure & Layout

## Overall Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                               │
│  ┌─────────────────┐  ┌──────────────────────────────────────────────────┐  │
│  │                 │  │                                                  │  │
│  │     SIDEBAR     │  │           MAIN CONTENT AREA                      │  │
│  │                 │  │    (Grid: 2 columns left, 1 column right)       │  │
│  │  256px Width    │  │                                                  │  │
│  │  Sticky Nav     │  │  ┌──────────────────────────────┐  ┌──────────┐ │  │
│  │                 │  │  │   TODAY'S TOP IDEA (Full)     │  │ LIVE     │ │  │
│  │ ▪ Command Center│  │  │   • Score: 87                │  │ ALERTS   │ │  │
│  │ ▪ Idea Lab      │  │  │   • Hook Strength: 92%       │  │          │ │  │
│  │ ▪ Trend Radar   │  │  │   • Trend Alignment: 78%     │  │ ⚠ URGENT │ │  │
│  │ ▪ Live Engine   │  │  │   • Watch Retention: 84%     │  │ 💡 OPP   │ │  │
│  │ ▪ Analytics     │  │  └──────────────────────────────┘  │ 📈 SIGNAL│ │  │
│  │ ▪ Growth F'cast │  │                                    │          │ │  │
│  │ ▪ Profile I.    │  │  ┌─────────────┬─────────────┐    │          │ │  │
│  │ ▪ Settings      │  │  │ ENGAGEMENT  │ OPTIMAL     │    │ PLATFORM │ │  │
│  │                 │  │  │ PREDICTION  │ POST TIME   │    │ SIGNALS  │ │  │
│  │─────────────────│  │  │ +2.3K       │ 7:45 PM     │    │          │ │  │
│  │ ⚙️ Settings     │  │  │ ↑ 34%       │ Peak Window │    │ TikTok   │ │  │
│  │ 🚪 Logout      │  │  └─────────────┴─────────────┘    │ YouTube  │ │  │
│  │                 │  │                                    │ X        │ │  │
│  │                 │  │  ┌──────────────────────────────┐  │ Threads  │ │  │
│  │                 │  │  │ CONTENT BLUEPRINT GENERATOR   │  │ Instagram│ │  │
│  │                 │  │  │ • Hook (0-3 sec)            │  │          │ │  │
│  │                 │  │  │ • Body (3-25 sec)           │  │ AI RECS  │ │  │
│  │                 │  │  │ • CTA (25-30 sec)           │  │          │ │  │
│  │                 │  │  └──────────────────────────────┘  │ [Btn]    │ │  │
│  │                 │  │                                    │ [Btn]    │ │  │
│  │                 │  │  ┌──────────────────────────────┐  │          │ │  │
│  │                 │  │  │ GROWTH ACCELERATION          │  │ WEEKLY   │ │  │
│  │                 │  │  │ Reach │ Followers │ Velocity │  │ MOMENTUM │ │  │
│  │                 │  │  │ 45.2K │ +340     │ 3.2x     │  │          │ │  │
│  │                 │  │  └──────────────────────────────┘  │ Mon-Sun  │ │  │
│  │                 │  │                                    │ Bars     │ │  │
│  │                 │  │                                    │          │ │  │
│  │                 │  │                                    └──────────┘ │  │
│  │                 │  │                                                  │  │
│  └─────────────────┘  └──────────────────────────────────────────────────┘  │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

Desktop: Full 3-panel view
Tablet: Sidebar collapsible, 2-column main
Mobile: Sidebar drawer, full-width panels
```

## Sidebar Navigation (Left Panel)

```
┌─────────────────────────────┐
│ IDEORA                      │
│ GROWTH COMMAND CENTER       │
├─────────────────────────────┤
│ 📊 Command Center ← Active  │
│ ⚡ Idea Lab                 │
│ 📈 Trend Radar              │
│ 📻 Live Engine              │
│ 📈 Analytics                │
│ 🎯 Growth Forecast          │
│ 👤 Profile Intelligence     │
├─────────────────────────────┤
│ ⚙️  Settings                │
│ 🚪 Logout                   │
└─────────────────────────────┘

Active item: Cyan left border (#06b6d4)
Icons: Lucide icons, 16px
Font: Monospace, 12px, uppercase labels
Background: Slate-950 (#0f172a)
Borders: 1px solid #334155
```

## Main Panel - Top Idea Card (Full Width, 2/3 Column)

```
┌──────────────────────────────────────────────┐
│ TODAY'S TOP IDEA                          87  │
│                                         SCORE │
├──────────────────────────────────────────────┤
│                                              │
│ AI Goes Wrong Compilation                    │
│                                              │
│ Hook Strength        ■████████░░    92%      │
│ Trend Alignment      ■███████░░░    78%      │
│ Watch Retention      ■████████░░    84%      │
│                                              │
└──────────────────────────────────────────────┘

Background: Slate-900 (#1e293b)
Border: 1px solid #334155
Padding: 24px
Header: Monospace, uppercase, gray-400
Title: 20px, bold, white
Score: 36px, bold, cyan (#06b6d4)
Bars: 4px height, cyan fill over gray background
Percentages: Monospace, cyan text
```

## Two-Column Cards (Under Top Idea)

### Engagement Prediction
```
┌─────────────────────────────┐
│ ENGAGEMENT PREDICTION       │
├─────────────────────────────┤
│                             │
│ +2.3K                       │
│ Expected Engagement         │
│                             │
│ [↑ 34% vs average]          │
│                             │
└─────────────────────────────┘
```

### Optimal Post Time
```
┌─────────────────────────────┐
│ OPTIMAL POST TIME           │
├─────────────────────────────┤
│                             │
│ 7:45 PM                     │
│ Monday, Tomorrow            │
│                             │
│ [Peak Window]               │
│                             │
└─────────────────────────────┘
```

Both cards:
- Width: 50% - 12px gap
- Height: 180px
- Same styling as Top Idea card
- Number: 28px, bold, white/cyan
- Label: Monospace, gray-500

## Content Blueprint Card

```
┌──────────────────────────────────────────────┐
│ CONTENT BLUEPRINT GENERATOR                  │
├──────────────────────────────────────────────┤
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ HOOK (0-3 sec)                         │  │
│ │ "I asked ChatGPT to write code..."     │  │
│ └────────────────────────────────────────┘  │
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ BODY (3-25 sec)                        │  │
│ │ Show the AI-generated code, reactions..│  │
│ └────────────────────────────────────────┘  │
│                                              │
│ ┌────────────────────────────────────────┐  │
│ │ CTA (25-30 sec)                        │  │
│ │ "Drop a comment: worst AI fail..."     │  │
│ └────────────────────────────────────────┘  │
│                                              │
└──────────────────────────────────────────────┘

Inner boxes: Slate-800 (#1e293b) background
Border: 1px solid #334155
Padding: 16px
Label: Monospace, uppercase, gray-400, 12px
Text: Regular, white, 14px
Space between: 16px
```

## Growth Acceleration Panel

```
┌──────────────────────────────────────────────┐
│ GROWTH ACCELERATION PANEL                    │
├──────────────────────────────────────────────┤
│                                              │
│ ┌──────────┬──────────┬──────────┐          │
│ │PROJECTED │FOLLOWERS │ VELOCITY │          │
│ │ REACH    │ GROWTH   │          │          │
│ │  45.2K   │  +340    │  3.2x    │          │
│ └──────────┴──────────┴──────────┘          │
│                                              │
└──────────────────────────────────────────────┘

3 equal columns
Inner boxes: Slate-800 background
Metrics: 20px, bold, white (velocity: cyan)
Labels: Monospace, uppercase, gray-500, 12px
```

## Right Panel - Live Alerts

```
┌─────────────────────────────────┐
│ LIVE ALERTS                     │
├─────────────────────────────────┤
│                                 │
│ ⚠️  URGENT                      │
│     TikTok algorithm shift...  │
│ [red-500/10 bg, red border]     │
│                                 │
│ 💡 OPPORTUNITY                  │
│    #AIFails trending on YouTube │
│ [yellow-500/10 bg, yellow...]   │
│                                 │
│ 📈 SIGNAL                       │
│    Your audience peak: Fri 8PM │
│ [green-500/10 bg, green border] │
│                                 │
└─────────────────────────────────┘

Box height: Each alert ~80px
Padding: 12px
Gap: 12px between alerts
Icons: 16px, color-matched to severity
Text: 12px, color-matched to severity
Font: Monospace label, regular body
```

## Platform Signals

```
┌─────────────────────────────────┐
│ PLATFORM SIGNALS                │
├─────────────────────────────────┤
│                                 │
│ TikTok    ■████████░░░  85%    │
│ YouTube   ■███████░░░░░  72%   │
│ X         ■██████████░░  88%   │
│ Threads   ■██████░░░░░░  65%   │
│ Instagram ■███████████░  92%   │
│                                 │
└─────────────────────────────────┘

Each row: 32px height
Label: 14px, monospace, gray-300
Bar: 12px monospace, cyan fill
Percentage: Right-aligned, monospace, gray-500
```

## AI Recommendations

```
┌─────────────────────────────────┐
│ AI RECOMMENDATIONS              │
├─────────────────────────────────┤
│                                 │
│ [🎯 Post at 7:45 PM        ]    │
│ [⚡ Use trending sound      ]    │
│ [📈 Target 25-34 audience   ]    │
│                                 │
└─────────────────────────────────┘

Buttons: Full width
Background: Cyan-500/10 (#06b6d4)
Border: 1px solid cyan-500/30
Text: Cyan-400, 12px, monospace
Padding: 12px
Gap: 8px between buttons
Hover: Darker cyan background
```

## Weekly Momentum

```
┌─────────────────────────────────┐
│ WEEKLY MOMENTUM                 │
├─────────────────────────────────┤
│ Mon ■████████░░░░░░░░░░ 85%    │
│ Tue ■███████░░░░░░░░░░░ 72%    │
│ Wed ■█████████░░░░░░░░░ 88%    │
│ Thu ■██████░░░░░░░░░░░░ 65%    │
│ Fri ■███████████░░░░░░░ 92%    │
│ Sat ■███████░░░░░░░░░░░ 78%    │
│ Sun ■████████░░░░░░░░░░ 81%    │
│                                 │
└─────────────────────────────────┘

Day label: Monospace, 12px, gray-500, 8px width
Bar container: 12px height
Progress bar: 4px, cyan fill
Percentage: Right-aligned, 8px width
Row height: 24px
Gap: 8px between rows
```

## Color Reference

**Dark Theme - Trading Terminal**

| Element | Color | Hex |
|---------|-------|-----|
| Background | Slate 950 | #0f172a |
| Cards | Slate 900 | #1e293b |
| Borders | Slate 600 | #334155 |
| Text Primary | Slate 100 | #e2e8f0 |
| Text Secondary | Slate 400 | #94a3b8 |
| Text Muted | Slate 500 | #64748b |
| Accent | Cyan 500 | #06b6d4 |
| Success | Green 500 | #10b981 |
| Warning | Yellow 500 | #f59e0b |
| Critical | Red 500 | #ef4444 |

## Responsive Behavior

### Desktop (1024px+)
- Full 3-panel layout
- Sidebar: 256px fixed
- Main: 2/3 width
- Right: 1/3 width
- All cards visible simultaneously

### Tablet (768px - 1024px)
- Sidebar collapsible (hamburger menu)
- Main content: full width when sidebar closed
- Right panel may stack below on smaller tablets
- Cards remain 2-column grid

### Mobile (< 768px)
- Sidebar in drawer/modal
- Single column layout
- Cards stack vertically
- Full viewport width
- Bottom navigation option

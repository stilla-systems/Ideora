# StillaTrends Dashboard - n8n Integration Guide

## Overview
The dashboard is fully connected to n8n webhooks for fetching daily trend recommendations. When users select their niche and platforms, the dashboard sends their preferences to your n8n workflow and displays the results.

## Configuration

### 1. Environment Variable Setup
Add the following environment variable to your Vercel project:

```
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-path
```

This is a public variable (prefixed with `NEXT_PUBLIC_`) so it's safe to expose in the browser.

### 2. n8n Webhook Payload Structure
The dashboard sends the following payload to your webhook:

```json
{
  "user_id": "user_1234567890",
  "selected_niches": ["Photography"],
  "selected_platforms": ["TikTok", "YouTube"],
  "request_type": "daily",
  "plan_type": "starter",
  "delivery_mode": "dashboard"
}
```

**Fields:**
- `user_id`: Authenticated user ID from sessionStorage
- `selected_niches`: Array of niche selections from the user
- `selected_platforms`: Array of selected social platforms
- `request_type`: Always "daily" for dashboard requests
- `plan_type`: Subscription tier (hardcoded as "starter" for now)
- `delivery_mode`: Always "dashboard" for front-end rendering

### 3. Expected Response Format
Your n8n workflow should return JSON in this exact format:

```json
{
  "daily_recommendations": [
    {
      "id": "rec_1",
      "platform": "TikTok",
      "whatToPost": "Behind-the-scenes content showing your creative process",
      "hookDirection": "Start with unexpected visual or sound contrast",
      "whyMatters": "Audiences respond to raw, unpolished content that feels genuine."
    },
    {
      "id": "rec_2",
      "platform": "YouTube",
      "whatToPost": "Tutorial with trending topic angle",
      "hookDirection": "Hook in first 3 seconds with relevance",
      "whyMatters": "Educational content drives watch time and subscriber growth."
    },
    {
      "id": "rec_3",
      "platform": "Instagram",
      "whatToPost": "Carousel post with user-generated content",
      "hookDirection": "Tease the best content in the first slide",
      "whyMatters": "Carousels get 3x higher engagement than single images."
    }
  ],
  "weekly_insight": null
}
```

**Fields:**
- `daily_recommendations`: Array of up to 3 recommendation objects
- `id`: Unique identifier for each recommendation
- `platform`: Social media platform name
- `whatToPost`: What content to create (string, can be 1-2 sentences)
- `hookDirection`: How to hook viewers in the first few seconds
- `whyMatters`: Why this approach works (social psychology insight)
- `weekly_insight`: Optional; can be null for now (reserved for future use)

## Error Handling

The dashboard gracefully handles errors:

- **Missing webhook URL**: Shows "Unable to fetch trends at this time. Please try again."
- **Webhook timeout/error**: Shows friendly error message, allows retry
- **Empty recommendations**: Shows "No trends available right now. Please try again soon."
- **Not authenticated**: Shows "Please log in to fetch trends."

All errors are user-friendly with no technical details exposed.

## Testing

1. **Set environment variable**: Add `NEXT_PUBLIC_N8N_WEBHOOK_URL` in Vercel project settings
2. **Log in**: Create a test account and log in to the dashboard
3. **Select options**: Pick a niche and at least one platform
4. **Submit**: Click "Get today's trends"
5. **Verify response**: Check browser console for the payload being sent and received

## Implementation Details

**Location**: `/app/dashboard/page.tsx`

**Key function**: `handleGetTrends()` 
- Validates user input
- Gets authenticated user ID
- Calls `fetchDailyTrends()` from `/lib/api.ts`
- Handles response or error states

**API function**: `fetchDailyTrends()` in `/lib/api.ts`
- Sends POST request to webhook URL
- Includes all required payload fields
- Returns recommendations array or error message
- No logging of backend internals (debug mode only)

## States

The dashboard has four UI states:

1. **Empty**: User selects niche and platforms
2. **Loading**: "Checking what's gaining attention today…"
3. **Results**: Displays up to 3 recommendation cards
4. **Error**: Friendly error message with retry option

## Design

- Glassmorphism panels with backdrop blur
- Indigo-to-cyan gradient accents
- Fully responsive (mobile-first)
- No charts, metrics, or icons
- Calm, premium spacing

## Next Steps

1. Create n8n workflow that receives the payload
2. Process user preferences and fetch trending content
3. Format response exactly as specified above
4. Test with Vercel deployment
5. Monitor webhook requests and response times

---

For questions or troubleshooting, check the browser console for debug messages prefixed with `[Dashboard]`.

# StillaTrends Dashboard - Quick Setup

## One-Line Setup
Add `NEXT_PUBLIC_N8N_WEBHOOK_URL` environment variable to Vercel project pointing to your n8n webhook endpoint.

## Webhook Endpoint URL Format
```
https://your-n8n-instance.com/webhook/your-webhook-path
```

## What Gets Sent to n8n
```json
{
  "user_id": "user_123...",
  "selected_niches": ["Photography"],
  "selected_platforms": ["TikTok", "YouTube"],
  "request_type": "daily",
  "plan_type": "starter",
  "delivery_mode": "dashboard"
}
```

## What to Return from n8n
```json
{
  "daily_recommendations": [
    {
      "id": "1",
      "platform": "TikTok",
      "whatToPost": "...",
      "hookDirection": "...",
      "whyMatters": "..."
    }
  ],
  "weekly_insight": null
}
```

## Error Handling (Automatic)
- Missing env var → "Unable to fetch trends at this time. Please try again."
- Webhook error → Same user-friendly message
- Empty results → "No trends available right now. Please try again soon."
- Not logged in → "Please log in to fetch trends."

## File Locations
- Dashboard page: `/app/dashboard/page.tsx`
- API integration: `/lib/api.ts` (fetchDailyTrends function)
- Auth: `/lib/auth.ts` (getCurrentUser function)

## Testing Checklist
- [ ] Environment variable set in Vercel
- [ ] User logged in
- [ ] Niche selected
- [ ] At least one platform selected
- [ ] Submit button enabled
- [ ] n8n webhook responds with correct format
- [ ] Results display in 3-card grid
- [ ] Error states show friendly messages

## Display Format
Each recommendation card shows:
1. Platform badge (colored)
2. "What to post" section
3. "Hook direction" section  
4. "Why it matters" section (with divider line)

Maximum 3 cards displayed in a responsive grid.

---

**No additional setup needed.** Just provide the webhook URL and it works!

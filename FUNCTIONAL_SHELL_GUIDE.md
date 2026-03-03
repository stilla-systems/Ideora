# Functional Frontend Shell - Implementation Guide

## Overview

Ideora has been converted from a static marketing UI into a functional SaaS frontend shell with proper routing, validation, loading states, and accessibility.

## Key Features Implemented

### 1. Email Validation (Zod)

**Location**: `/lib/validations.ts`

Comprehensive validation schemas for:
- Newsletter subscriptions
- User signup
- User login

```typescript
import { newsletterSchema } from '@/lib/validations';

const validatedData = newsletterSchema.parse({ email });
```

### 2. CTA Button Routing

**Updated Components**:
- `/components/landing/hero.tsx` - Start Free Trial & Learn More
- `/components/landing/header.tsx` - Navigation CTA
- `/components/landing/pricing.tsx` - Plan selection with query params

**Routing Pattern**:
```typescript
// Pricing to Signup with plan selection
<Link href={`/auth/signup?plan=${plan.name.toLowerCase()}`}>
  Get Started
</Link>
```

### 3. Plan Selection

**Query Parameter**: `?plan=starter|growth|elite`

**Signup Form Integration**:
```typescript
const searchParams = useSearchParams();
const plan = searchParams.get('plan');
```

### 4. Newsletter Subscription

**API Endpoint**: `/app/api/newsletter/subscribe` (POST)

**Request**:
```json
{
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "email": "user@example.com"
}
```

### 5. Loading States

All interactive buttons implement `disabled` state with:
- Visual feedback (reduced opacity)
- Aria attributes (`aria-busy`, `aria-label`)
- Clear loading text

**Example**:
```typescript
<Button
  disabled={isLoading}
  aria-busy={isLoading}
  aria-label={isLoading ? 'Creating account...' : 'Sign up'}
>
  {isLoading ? 'Creating account...' : 'Create Account'}
</Button>
```

### 6. Accessibility

Added ARIA labels to:
- All CTA buttons
- Form inputs
- Loading states
- Icon buttons (`aria-hidden` for decorative icons)

**Best Practices**:
- Proper semantic HTML
- Clear button purposes
- Loading state communication
- Icon labeling

## API Scaffold Structure

```
/app/api/
├── README.md                    # API documentation
├── newsletter/
│   └── subscribe/route.ts       # Newsletter endpoint
├── auth/
│   ├── signup/route.ts          # User registration
│   ├── login/route.ts           # Authentication
│   └── logout/route.ts          # Session cleanup
├── user/
│   ├── profile/route.ts         # User profile management
│   └── preferences/route.ts     # User preferences
└── content/
    ├── ideas/route.ts           # Content ideas
    └── analytics/route.ts       # Analytics data
```

## Updated Components

### Hero Section
- Proper Link usage with aria labels
- Smooth transitions and hover states
- Mobile-responsive CTA buttons

### Pricing Section
- Plan selection with query params
- Per-plan button routing
- Accessibility labels on each button

### Newsletter (Footer)
- Zod validation
- Proper error handling
- Toast notifications
- API integration
- Loading states

### Signup Form
- Plan selection detection
- Visual plan indicator
- Form validation
- Loading state management
- Error display

## Authentication Routes

**Placeholders Created**:
- `/auth/login` - Login form
- `/auth/signup` - Signup form with plan selection

**Integration Ready**:
- Session management
- Password hashing
- Email verification
- Plan assignment

## Usage Examples

### Newsletter Validation
```typescript
import { newsletterSchema } from '@/lib/validations';

try {
  const data = newsletterSchema.parse({ email });
  // Valid email
} catch (error) {
  // Show error to user
}
```

### Plan Selection Routing
```typescript
// User clicks "Get Started" on Growth plan
href="/auth/signup?plan=growth"

// In signup form:
const plan = searchParams.get('plan'); // "growth"
```

### API Calls
```typescript
const response = await fetch('/api/newsletter/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
});
```

## Next Steps

1. **Authentication Backend**: Implement actual signup/login with password hashing
2. **Database Integration**: Connect to Supabase or another database
3. **Plan Management**: Store selected plans and user tier data
4. **Email Service**: Integrate Mailchimp, SendGrid, or similar
5. **Analytics**: Track signup flow and plan selection
6. **Testing**: Unit tests for validation schemas

## Clean Code Practices

- All async operations have loading states
- All interactive elements have aria labels
- Proper error boundaries and user feedback
- Toast notifications for success/error states
- Mobile-first responsive design
- Consistent button styling and transitions

## Removed Elements

- Dead/non-functional buttons
- Placeholder onClick handlers
- Static links without proper routing
- Untested form submissions

All buttons now route correctly using Next.js Link and useRouter for client-side navigation.

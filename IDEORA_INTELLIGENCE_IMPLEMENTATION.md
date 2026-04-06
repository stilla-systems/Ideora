# IDEORA AI Intelligence System - Implementation Guide

## Database Migration Checklist

- [ ] Execute `/scripts/intelligence-engines-schema.sql` migration
- [ ] Verify all tables created successfully
- [ ] Set up RLS policies for data security
- [ ] Create indexes for performance optimization
- [ ] Enable Row-Level Security on all tables
- [ ] Test user data isolation with RLS policies

**Migration Command:**
```bash
# Using Supabase CLI
supabase migration new intelligence_engines
# Then copy intelligence-engines-schema.sql content

# Or direct SQL execution in Supabase dashboard
```

---

## Engine Library Setup Checklist

### Core Engine Files
- [x] `/lib/intelligence-engines/idea-engine.ts` - Idea scoring and analysis
- [x] `/lib/intelligence-engines/trend-velocity-engine.ts` - Trend detection and momentum
- [x] `/lib/intelligence-engines/creator-dna-engine.ts` - Creator profiling and audience analysis
- [x] `/lib/intelligence-engines/live-opportunity-engine.ts` - Streaming windows and alerts
- [x] `/lib/intelligence-engines/growth-projection-engine.ts` - Growth forecasting
- [x] `/lib/intelligence-engines/orchestration-engine.ts` - Engine coordination and gating

### Integration Points
- [ ] Import engines in dashboard components
- [ ] Connect to Supabase client
- [ ] Set up authentication for feature access

---

## API Route Implementation

### Recommended Route Structure

```
/app/api/intelligence/
├── ideas/
│   ├── score/
│   │   └── route.ts          POST - Score new idea
│   └── list/
│       └── route.ts          GET - Get user's ideas
├── trends/
│   ├── analyze/
│   │   └── route.ts          POST - Analyze trend velocity
│   └── trending/
│       └── route.ts          GET - Get trending topics
├── creator-dna/
│   ├── profile/
│   │   └── route.ts          POST/GET - Creator DNA profile
│   └── recommendations/
│       └── route.ts          GET - Format recommendations
├── opportunities/
│   ├── detect/
│   │   └── route.ts          POST - Find streaming windows
│   ├── alerts/
│   │   └── route.ts          GET - Get real-time alerts
│   └── acknowledge/
│       └── route.ts          POST - Acknowledge alert
├── growth/
│   ├── project/
│   │   └── route.ts          POST - Generate projection
│   ├── simulate/
│   │   └── route.ts          POST - Simulate frequency
│   └── scenarios/
│       └── route.ts          GET - Get growth scenarios
└── synthesis/
    └── daily/
        └── route.ts          GET - Daily synthesis
```

### Example Route Implementation

**`/app/api/intelligence/ideas/score/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { IdeaIntelligenceEngine } from '@/lib/intelligence-engines/idea-engine';
import { IntelligenceOrchestration } from '@/lib/intelligence-engines/orchestration-engine';

export async function POST(request: NextRequest) {
  try {
    const { userId, creatorId, subscriptionTier, idea } = await request.json();

    // Validate subscription access
    await IntelligenceOrchestration.validateAccessPermissions(
      userId,
      'idea_scoring',
      subscriptionTier
    );

    // Score the idea
    const score = await IdeaIntelligenceEngine.scoreIdea(userId, idea);

    // Log usage
    await IntelligenceOrchestration.logEngineUsage(
      userId,
      'idea_intelligence',
      'idea_scoring'
    );

    return NextResponse.json({ success: true, score });
  } catch (error) {
    console.error('Error scoring idea:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
```

---

## Component Integration Examples

### Daily Synthesis Dashboard
```typescript
import { IntelligenceOrchestration } from '@/lib/intelligence-engines/orchestration-engine';

export default async function DashboardPage() {
  const synthesis = await IntelligenceOrchestration.executeDailySynthesis({
    userId: session.user.id,
    creatorId: creator.id,
    subscriptionTier: user.subscription_tier
  });

  return (
    <div>
      <h2>Today's Opportunities</h2>
      {synthesis.dailySynthesis.topOpportunities.map(opp => (
        <OpportunityCard key={opp.rank} {...opp} />
      ))}
    </div>
  );
}
```

### Idea Scoring Form
```typescript
import { IdeaIntelligenceEngine } from '@/lib/intelligence-engines/idea-engine';

export function IdeaSubmissionForm() {
  const [score, setScore] = useState(null);

  const handleSubmit = async (idea) => {
    const result = await IdeaIntelligenceEngine.scoreIdea(userId, idea);
    setScore(result);
  };

  return (
    <div>
      <IdeaForm onSubmit={handleSubmit} />
      {score && <IdeaScoreCard score={score} />}
    </div>
  );
}
```

### Real-Time Alerts Panel
```typescript
import { LiveOpportunityEngine } from '@/lib/intelligence-engines/live-opportunity-engine';

export function AlertsPanel({ userId, creatorId }) {
  useEffect(() => {
    // Start real-time monitoring
    LiveOpportunityEngine.startRealtimeMonitoring({
      userId,
      creatorId,
      subscriptionTier: user.subscription_tier
    });
  }, [userId, creatorId]);

  const alerts = await LiveOpportunityEngine.getActiveOpportunities(creatorId);

  return (
    <AlertsList>
      {alerts.map(alert => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </AlertsList>
  );
}
```

---

## Subscription Tier Feature Matrix

### Setup Checklist

1. **Populate `engine_feature_access` table:**
```sql
INSERT INTO engine_feature_access (subscription_tier, feature_name, enabled, rate_limit_per_day) VALUES
('free', 'idea_scoring', true, 2),
('free', 'trend_analysis', true, 1),
('starter', 'idea_scoring', true, 100),
('starter', 'trend_analysis', true, 30),
('growth', 'realtime_alerts', true, 100),
('growth', 'weekly_briefing', true, 4),
('elite', 'realtime_alerts', true, NULL),
('elite', 'daily_synthesis', true, NULL);
```

2. **Implement feature gates in components:**
```typescript
const canAccessFeature = (tier: string, feature: string) => {
  const featureMatrix = {
    free: ['idea_scoring', 'trend_overview'],
    starter: ['idea_scoring', 'trend_analysis', 'creator_profile'],
    growth: [...starterFeatures, 'realtime_alerts', 'weekly_briefing'],
    elite: [...growthFeatures, 'daily_synthesis', 'predictive_analytics']
  };
  return featureMatrix[tier]?.includes(feature) || false;
};
```

---

## Testing Checklist

### Unit Tests
- [ ] IdeaIntelligenceEngine.scoreIdea()
- [ ] TrendVelocityEngine.analyzeTrendVelocity()
- [ ] CreatorDNAEngine.analyzeAudienceBehavior()
- [ ] LiveOpportunityEngine.detectLiveOpportunityWindows()
- [ ] GrowthProjectionEngine.generateGrowthProjection()

### Integration Tests
- [ ] Daily synthesis execution
- [ ] Real-time monitoring
- [ ] Subscription gating validation
- [ ] Rate limiting enforcement
- [ ] RLS policy enforcement

### Performance Tests
- [ ] Daily synthesis <2.5s
- [ ] Individual engine calls <1s
- [ ] Real-time alerts <30s delivery
- [ ] Database queries <500ms

---

## Deployment Checklist

### Pre-Deployment
- [ ] All migrations tested locally
- [ ] Engine implementations reviewed
- [ ] API routes implemented and tested
- [ ] Components integrated with engines
- [ ] Rate limits configured per tier
- [ ] RLS policies verified
- [ ] Error handling implemented

### Deployment Steps
1. Run database migration on production
2. Deploy engine library code
3. Deploy API routes
4. Update dashboard components
5. Set feature flags in admin panel
6. Monitor error rates and latency

### Post-Deployment
- [ ] Verify data isolation with RLS
- [ ] Test free tier limitations
- [ ] Test paid tier features
- [ ] Monitor database performance
- [ ] Check real-time alert delivery
- [ ] Validate rate limit enforcement

---

## Monitoring & Metrics

### Key Metrics to Track

**Usage Metrics:**
- Daily active users per engine
- Feature usage distribution
- Subscription tier breakdown
- Conversion from free to paid

**Performance Metrics:**
- Average response times per engine
- Orchestration engine latency
- Database query performance
- Alert delivery time

**Quality Metrics:**
- Prediction accuracy (actual vs. projected)
- Alert effectiveness (CTR on alerts)
- User engagement with recommendations
- Churn rate by tier

### Recommended Monitoring Tools
- Supabase Analytics for database metrics
- Vercel Analytics for API performance
- Custom dashboards in admin panel
- Email alerts for performance degradation

---

## Troubleshooting Guide

### Issue: Rate Limit Exceeded
**Solution:** Check `engine_feature_access` limits and `user_engine_usage` table. Reset daily limits if testing.

### Issue: RLS Policy Blocking Data Access
**Solution:** Verify `auth.uid()` matches user's `auth_id` in users table. Check RLS policy definitions.

### Issue: Slow Synthesis Performance
**Solution:** Optimize database queries, cache trending data, parallelize engine execution further.

### Issue: Missing Creator Profile
**Solution:** Ensure `CreatorDNAEngine.buildCreatorProfile()` is called on user onboarding.

### Issue: Alerts Not Triggering
**Solution:** Verify `real_time_alerts` triggers are executing. Check alert conditions and thresholds.

---

## Future Enhancement Opportunities

1. **ML Model Integration**
   - Replace deterministic scoring with neural networks
   - Improve retention prediction accuracy
   - Add NLP for sentiment analysis

2. **Advanced Analytics**
   - Cohort analysis per creator
   - Predictive churn modeling
   - A/B testing for recommendations

3. **User Customization**
   - Allow creators to adjust alert thresholds
   - Custom growth scenarios
   - Weighted preference profiles

4. **API & Integrations**
   - RESTful API for third-party integrations
   - Webhook for real-time alerts
   - Zapier/Make.com integrations

5. **Multi-Creator Management**
   - Team collaboration features
   - Centralized analytics dashboard
   - Shared strategy planning

---

## Support & Documentation

**Internal Documentation:**
- See `/IDEORA_AI_INTELLIGENCE_SYSTEM.md` for architecture details
- See individual engine files for API documentation
- See database schema file for data structure details

**External Documentation:** (to be created)
- Creator dashboard guide
- Feature explanations
- Best practices guide
- FAQ section

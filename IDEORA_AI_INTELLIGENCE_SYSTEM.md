# IDEORA AI Intelligence System Architecture

## Overview

IDEORA's AI Intelligence System consists of five core engines that work together to provide creators with real-time, predictive, and strategic insights for content planning and growth optimization.

---

## The Five Core Engines

### 1. **Idea Intelligence Engine**
**Purpose:** Score, analyze, and predict content performance

**Key Functions:**
- **Idea Scoring**: Rates ideas from 0-100 based on multiple factors
- **Hook Analysis**: Evaluates opening lines for strength and engagement potential
- **Retention Prediction**: Predicts watch-time retention and completion rates
- **Content Structure Recommendations**: Suggests optimal narrative flow
- **Performance Tracking**: Records actual vs. predicted performance

**Scoring Methodology:**
```
Overall Score = (Hook Strength × 0.25) + 
                (Trend Alignment × 0.25) + 
                (Niche Fit × 0.2) + 
                (Uniqueness × 0.15) + 
                (Predicted Retention × 0.15)
```

**Database Tables:**
- `idea_submissions` - Stores user-submitted ideas
- `idea_intelligence_scores` - Contains all scoring metrics
- `idea_performance_history` - Tracks actual performance post-publication

**API Reference:**
```typescript
IdeaIntelligenceEngine.scoreIdea(userId, idea)
IdeaIntelligenceEngine.getUserIdeas(userId)
```

---

### 2. **Trend Velocity Engine**
**Purpose:** Detect trend acceleration and platform-specific momentum

**Key Functions:**
- **Trend Acceleration Detection**: Measures growth velocity over time
- **Momentum Scoring**: Rates current trend momentum (0-100)
- **Lifespan Prediction**: Categorizes trends (emerging, peak, declining, saturated)
- **Platform-Specific Analysis**: Ranks trends differently per platform
- **Optimal Posting Window**: Suggests best timing for trend exploitation

**Momentum Calculation:**
```
Momentum Score = Base(50) + 
                Growth Rate Bonus + 
                Acceleration Bonus
```

**Lifespan Stages:**
- **Emerging**: High acceleration, low volume, early adoption phase
- **Peak**: Maximum visibility, highest engagement rates
- **Declining**: Negative growth rate, audience fatigue
- **Saturated**: Oversaturation, minimal engagement lift

**Database Tables:**
- `platform_trends` - Global trend tracking
- `trend_velocity_metrics` - Momentum and velocity data
- `trend_history` - Historical trend data for analysis

**API Reference:**
```typescript
TrendVelocityEngine.analyzeTrendVelocity(trendName, platform)
TrendVelocityEngine.getTrendingTopics(platforms, limit)
TrendVelocityEngine.recordTrendSnapshot(trendId, volume, engagement)
```

---

### 3. **Creator DNA Engine**
**Purpose:** Learn creator niche, audience behavior, and optimal content formats

**Key Functions:**
- **Audience Profiling**: Analyzes demographics and behavior patterns
- **Peak Engagement Analysis**: Identifies optimal posting times and days
- **Format Effectiveness Scoring**: Ranks content formats by performance
- **Sentiment Tracking**: Monitors audience sentiment trends
- **Growth Cohort Analysis**: Segments audience by acquisition method

**Format Scoring:**
- Short-form video (TikTok, Instagram Reels, YouTube Shorts)
- Medium-form video (YouTube, Instagram, Threads)
- Long-form video (YouTube, Podcasts)
- Carousel posts
- Infographics
- Live streams

**Database Tables:**
- `creator_profiles` - Creator niche and audience data
- `audience_behavior_analysis` - Peak times, sentiment, retention
- `format_effectiveness` - Performance metrics per format/platform

**API Reference:**
```typescript
CreatorDNAEngine.buildCreatorProfile(userId, dnaData)
CreatorDNAEngine.analyzeAudienceBehavior(userId)
CreatorDNAEngine.recommendFormatsByPlatform(userId)
CreatorDNAEngine.recordFormatPerformance(creatorId, format, platform, views, engagement)
```

---

### 4. **Live Opportunity Engine**
**Purpose:** Detect optimal streaming windows and real-time engagement opportunities

**Key Functions:**
- **Streaming Window Detection**: Identifies best times for live content
- **Concurrent Viewer Prediction**: Estimates audience size at specific times
- **Engagement Probability Scoring**: Predicts likelihood of high engagement
- **Real-Time Alert System**: Notifies creators of trending moments
- **Opportunity Scoring**: Rates engagement moments (0-100)

**Opportunity Types:**
- **Trending Audio**: Viral sounds with momentum
- **Viral Trend**: Community-wide trending topics
- **Community Moments**: Localized trend spikes
- **Platform Push**: Algorithmic amplification moments
- **Algorithm Surge**: Unexpected algorithm favorability windows

**Alert Urgency Levels:**
- **Critical**: >90 score, immediate action required
- **High**: 75-89 score, post within 24 hours
- **Medium**: 50-74 score, consider posting
- **Low**: <50 score, monitor for future

**Database Tables:**
- `live_opportunity_windows` - Optimal streaming times
- `real_time_alerts` - System-triggered opportunities
- `engagement_opportunity_scores` - Moment-by-moment scoring

**API Reference:**
```typescript
LiveOpportunityEngine.detectLiveOpportunityWindows(creatorId)
LiveOpportunityEngine.triggerRealTimeAlert(userId, alertData)
LiveOpportunityEngine.scoreEngagementOpportunity(creatorId, momentType)
LiveOpportunityEngine.getActiveOpportunities(creatorId)
LiveOpportunityEngine.acknowledgeOpportunity(alertId, action)
```

---

### 5. **Growth Projection Model**
**Purpose:** Predict and simulate growth under various scenarios

**Key Functions:**
- **30-Day Projection**: Forecasts follower growth and confidence intervals
- **Posting Frequency Simulation**: Models impact of different posting schedules
- **Scenario Analysis**: Generates conservative, realistic, and aggressive scenarios
- **Sustainability Scoring**: Evaluates burnout risk
- **Growth Driver Identification**: Pinpoints primary growth factors

**Growth Calculation:**
```
Daily Growth Rate = (Engagement Rate × 0.5 × Posts/Week) / 7
Adjusted for scale and historical performance
30-Day Projection = Current Followers × (1 + Daily Rate)^30
```

**Scenario Profiles:**

**Conservative (High Confidence):**
- 2-3 posts per week
- 5% monthly growth
- High sustainability
- Organic, algorithm-dependent

**Realistic (High Confidence):**
- 4-5 posts per week
- 15% monthly growth
- Moderate sustainability
- Trend-aware, strategic posting

**Aggressive (Medium Confidence):**
- 7+ posts per week
- 35%+ monthly growth
- High burnout risk
- Viral-focused, rapid trend adoption

**Database Tables:**
- `growth_projections` - 30-day and extended forecasts
- `posting_frequency_simulations` - Scenario modeling
- `growth_scenario_analysis` - Multi-month projections

**API Reference:**
```typescript
GrowthProjectionEngine.generateGrowthProjection(creatorId)
GrowthProjectionEngine.simulatePostingFrequency(creatorId, postsPerWeek)
GrowthProjectionEngine.generateGrowthScenarios(creatorId)
GrowthProjectionEngine.getCreatorProjections(creatorId)
```

---

## AI Orchestration Flow

### Daily Synthesis (All Tiers)
```
1. Fetch trending topics (Trend Velocity Engine)
2. Detect live opportunities (Live Opportunity Engine)
3. Generate growth projection (Growth Projection Engine)
4. Analyze audience behavior (Creator DNA Engine)
5. Synthesize into cohesive daily recommendations
6. Generate action items with priority levels
7. Log usage for rate limiting
```

### Real-Time Monitoring (Growth, Elite)
```
Every 5 minutes:
1. Check for trending moments
2. Score opportunity urgency
3. Trigger alerts for high-score opportunities (>80)
4. Deliver via push notification/email
```

### Weekly Briefing (Growth, Elite)
```
1. Generate growth scenarios (Growth Projection Engine)
2. Recommend top formats (Creator DNA Engine)
3. Analyze emerging trends (Trend Velocity Engine)
4. Build competitor landscape analysis
5. Generate strategic week-ahead plan
```

---

## Subscription Gating & Feature Access

### Feature Access Matrix

**FREE Tier:**
- Basic idea scoring (2/day limit)
- Trend overview (daily)
- Creator profile setup
- Basic growth projection

**STARTER ($39/month):**
- Unlimited idea scoring
- Daily trend analysis
- Audience behavior insights
- Posting frequency simulations
- Rate: 30 requests/day

**GROWTH ($79/month):**
- Everything in Starter
- Real-time opportunity alerts (5-min frequency)
- Weekly strategic briefing
- Advanced format recommendations
- Competitor landscape analysis
- Rate: 100 requests/day
- Multiple platforms tracking

**ELITE ($149/month):**
- Everything in Growth
- Instant real-time alerts (1-min frequency)
- Daily synthesized briefing
- Advanced growth scenario modeling
- Predictive analytics (14-day lookahead)
- Dedicated intelligence dashboard
- API access for integrations
- Rate: Unlimited

### Rate Limiting Implementation

```typescript
// Database: engine_feature_access
{
  subscription_tier: 'growth',
  feature_name: 'realtime_alerts',
  rate_limit_per_day: 100,
  rate_limit_per_month: 3000
}

// Checked on every request
if (usage.usage_count >= rateLimit) {
  throw new Error("Rate limit exceeded")
}
```

### Usage Tracking

```typescript
// Database: user_engine_usage
{
  user_id: UUID,
  engine_type: 'trend_velocity',
  feature_name: 'analyze_trend_velocity',
  usage_date: DATE,
  usage_count: INTEGER,
  reset_date: TIMESTAMP
}
```

---

## Data Architecture

### Core Tables Overview

**User Management:**
- `users` - User accounts with subscription tier
- `creator_profiles` - Creator-specific metadata
- `user_preferences` - Content and notification preferences

**Intelligence Storage:**
- `idea_submissions` & `idea_intelligence_scores` - Idea analysis
- `platform_trends` & `trend_velocity_metrics` - Trend data
- `audience_behavior_analysis` & `format_effectiveness` - Creator DNA
- `live_opportunity_windows` & `real_time_alerts` - Live opportunities
- `growth_projections` & `posting_frequency_simulations` - Growth forecasts

**Access Control:**
- `engine_feature_access` - Feature availability by tier
- `user_engine_usage` - Usage tracking and rate limiting

### Indexing Strategy

All user_id lookups are indexed for <10ms query response:
```sql
CREATE INDEX idx_user_lookups ON all_tables(user_id);
CREATE INDEX idx_platform_lookups ON platform_trends(platform);
CREATE INDEX idx_creator_lookups ON creator_profiles(user_id);
```

---

## AI Model Integration

### Current Architecture
All scoring and predictions use deterministic algorithms based on:
- Historical performance data
- Engagement metrics
- Trend velocity calculations
- Creator-specific audience patterns

### Future ML Enhancements
- Neural networks for hook strength prediction
- Time-series forecasting for growth projections
- NLP for trend sentiment analysis
- Collaborative filtering for format recommendations

---

## Security & Privacy

### Row-Level Security (RLS)
Users can only access their own data via Supabase RLS policies:
```sql
CREATE POLICY "Users view own data" ON creator_profiles
  FOR SELECT USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));
```

### Data Encryption
- Sensitive creator data encrypted at rest
- PII handled per privacy policy
- GDPR compliance for EU users

---

## Monitoring & Analytics

**Key Metrics Tracked:**
- Daily active users per engine
- Feature usage patterns
- Prediction accuracy (actual vs. projected)
- Alert effectiveness (acted upon vs. ignored)
- Growth scenario accuracy
- User engagement with recommendations

**Performance Monitoring:**
- Query latency <500ms for all operations
- Orchestration engine completes <2s
- Real-time alerts delivered <30s

---

## Integration Points

### Client-Side Usage
```typescript
// In React components
import { IntelligenceOrchestration } from '@/lib/intelligence-engines/orchestration-engine';

const result = await IntelligenceOrchestration.executeDailySynthesis({
  userId: user.id,
  creatorId: creator.id,
  subscriptionTier: user.subscription_tier
});
```

### API Routes (Future)
```
POST /api/intelligence/ideas/score
POST /api/intelligence/trends/analyze
POST /api/intelligence/creator-dna/analyze
POST /api/intelligence/opportunities/detect
POST /api/intelligence/growth/project
GET /api/intelligence/daily-synthesis
```

---

## Performance Targets

- **Idea Scoring**: <500ms
- **Trend Analysis**: <1s (cached trending data)
- **Creator DNA Analysis**: <1.5s (requires historical data fetch)
- **Live Opportunity Detection**: <800ms
- **Growth Projection**: <1s
- **Daily Synthesis**: <2.5s (parallel execution of all engines)
- **Real-Time Alerts**: <30s end-to-end

---

## Future Roadmap

**Phase 2:**
- ML-powered hook strength prediction
- Content collaborative filtering
- Advanced NLP sentiment analysis

**Phase 3:**
- Multi-account management
- Team collaboration features
- Custom AI model training per creator

**Phase 4:**
- Predictive content calendar generation
- Automated content repurposing recommendations
- Cross-platform content synchronization

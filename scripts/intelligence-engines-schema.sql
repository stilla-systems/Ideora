-- IDEORA AI Intelligence System - Database Schema
-- Five Core Engines: Idea, Trend, Creator DNA, Live Opportunity, Growth Projection

-- 1. IDEA INTELLIGENCE ENGINE TABLES
-- Scores, analyzes, and predicts content performance

CREATE TABLE IF NOT EXISTS idea_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  content_hook TEXT NOT NULL,
  suggested_format VARCHAR(100),
  platforms TEXT[] DEFAULT ARRAY[]::TEXT[],
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS idea_intelligence_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID NOT NULL REFERENCES idea_submissions(id) ON DELETE CASCADE,
  overall_score FLOAT CHECK (overall_score >= 0 AND overall_score <= 100),
  hook_strength_score FLOAT CHECK (hook_strength_score >= 0 AND hook_strength_score <= 100),
  predicted_watch_retention FLOAT CHECK (predicted_watch_retention >= 0 AND predicted_watch_retention <= 100),
  trend_alignment_score FLOAT CHECK (trend_alignment_score >= 0 AND trend_alignment_score <= 100),
  niche_fit_score FLOAT CHECK (niche_fit_score >= 0 AND niche_fit_score <= 100),
  uniqueness_score FLOAT CHECK (uniqueness_score >= 0 AND uniqueness_score <= 100),
  recommended_structure VARCHAR(255),
  key_insights TEXT[],
  confidence_level VARCHAR(20) CHECK (confidence_level IN ('low', 'medium', 'high')),
  reasoning JSONB,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(idea_id)
);

CREATE TABLE IF NOT EXISTS idea_performance_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idea_id UUID NOT NULL REFERENCES idea_submissions(id) ON DELETE CASCADE,
  publication_date DATE,
  platform VARCHAR(50),
  views INTEGER DEFAULT 0,
  engagement_rate FLOAT DEFAULT 0.0,
  watch_time_seconds INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  actual_retention FLOAT,
  actual_engagement FLOAT,
  vs_predicted_variance FLOAT,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TREND VELOCITY ENGINE TABLES
-- Detects trend acceleration and momentum across platforms

CREATE TABLE IF NOT EXISTS platform_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trend_name VARCHAR(255) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  category VARCHAR(100),
  hashtags TEXT[],
  keywords TEXT[],
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(trend_name, platform)
);

CREATE TABLE IF NOT EXISTS trend_velocity_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trend_id UUID NOT NULL REFERENCES platform_trends(id) ON DELETE CASCADE,
  measurement_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  views_24h BIGINT DEFAULT 0,
  views_7d BIGINT DEFAULT 0,
  acceleration_rate FLOAT,
  growth_rate FLOAT,
  momentum_score FLOAT CHECK (momentum_score >= 0 AND momentum_score <= 100),
  trend_lifespan_prediction VARCHAR(50) CHECK (trend_lifespan_prediction IN ('emerging', 'peak', 'declining', 'saturated')),
  estimated_days_remaining INTEGER,
  platform_specific_momentum JSONB,
  UNIQUE(trend_id, measurement_timestamp)
);

CREATE TABLE IF NOT EXISTS trend_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trend_id UUID NOT NULL REFERENCES platform_trends(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  rank_position INTEGER,
  volume INTEGER,
  engagement_rate FLOAT,
  sentiment_score FLOAT,
  UNIQUE(trend_id, date)
);

-- 3. CREATOR DNA ENGINE TABLES
-- Learns creator niche, audience behavior, and optimal formats

CREATE TABLE IF NOT EXISTS creator_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  primary_niche VARCHAR(100),
  secondary_niches TEXT[] DEFAULT ARRAY[]::TEXT[],
  target_audience_age_min INTEGER,
  target_audience_age_max INTEGER,
  primary_platforms TEXT[] DEFAULT ARRAY[]::TEXT[],
  total_followers BIGINT DEFAULT 0,
  average_engagement_rate FLOAT DEFAULT 0.0,
  content_frequency_per_week FLOAT DEFAULT 0.0,
  preferred_content_length VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS audience_behavior_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
  peak_engagement_hours VARCHAR(100),
  peak_engagement_days TEXT[],
  audience_sentiment_trend VARCHAR(20) CHECK (audience_sentiment_trend IN ('positive', 'neutral', 'negative')),
  content_preference_distribution JSONB,
  format_performance_ranking JSONB,
  audience_growth_trend FLOAT,
  retention_rate FLOAT,
  churn_rate FLOAT,
  cohort_analysis JSONB,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS format_effectiveness (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
  format_type VARCHAR(100),
  platform VARCHAR(50),
  sample_size INTEGER,
  average_views FLOAT,
  average_engagement_rate FLOAT,
  average_watch_time FLOAT,
  recommended BOOLEAN DEFAULT false,
  confidence_score FLOAT,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(creator_id, format_type, platform)
);

-- 4. LIVE OPPORTUNITY ENGINE TABLES
-- Detects optimal streaming times and engagement opportunities

CREATE TABLE IF NOT EXISTS live_opportunity_windows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
  optimal_start_hour INTEGER CHECK (optimal_start_hour >= 0 AND optimal_start_hour <= 23),
  optimal_duration_minutes INTEGER,
  predicted_concurrent_viewers INTEGER,
  engagement_probability FLOAT CHECK (engagement_probability >= 0 AND engagement_probability <= 100),
  recommended_duration VARCHAR(50),
  opportunity_rank INTEGER,
  last_calculated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(creator_id, platform, day_of_week)
);

CREATE TABLE IF NOT EXISTS real_time_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  alert_type VARCHAR(50) CHECK (alert_type IN ('trend_spike', 'live_window', 'engagement_peak', 'hashtag_trending', 'competitor_activity')),
  trigger_name VARCHAR(255),
  description TEXT,
  platforms TEXT[] DEFAULT ARRAY[]::TEXT[],
  urgency_level VARCHAR(20) CHECK (urgency_level IN ('low', 'medium', 'high', 'critical')),
  action_recommended TEXT,
  alert_sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_acknowledged BOOLEAN DEFAULT false,
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  action_taken TEXT,
  action_taken_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS engagement_opportunity_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
  moment_type VARCHAR(100) CHECK (moment_type IN ('trending_audio', 'viral_trend', 'community_moment', 'platform_push', 'algorithm_surge')),
  score FLOAT CHECK (score >= 0 AND score <= 100),
  time_window_minutes INTEGER,
  estimated_reach_boost FLOAT,
  probability_of_success FLOAT,
  recommended_action TEXT,
  expiration_time TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. GROWTH PROJECTION MODEL TABLES
-- Predicts and simulates growth under various scenarios

CREATE TABLE IF NOT EXISTS growth_projections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
  projection_date DATE NOT NULL,
  projection_horizon_days INTEGER,
  current_followers BIGINT,
  predicted_followers_day_30 BIGINT,
  growth_rate_percentage FLOAT,
  confidence_interval_low BIGINT,
  confidence_interval_high BIGINT,
  primary_growth_driver VARCHAR(100),
  secondary_growth_drivers TEXT[],
  assumptions JSONB,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(creator_id, projection_date)
);

CREATE TABLE IF NOT EXISTS posting_frequency_simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
  scenario_name VARCHAR(100),
  posts_per_week INTEGER,
  average_engagement_per_post FLOAT,
  projected_daily_reach BIGINT,
  projected_monthly_followers BIGINT,
  projected_monthly_engagement BIGINT,
  virality_multiplier FLOAT,
  sustainability_score FLOAT,
  burnout_risk VARCHAR(20) CHECK (burnout_risk IN ('low', 'medium', 'high')),
  simulated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS growth_scenario_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
  scenario_name VARCHAR(100),
  scenario_type VARCHAR(50) CHECK (scenario_type IN ('conservative', 'realistic', 'aggressive')),
  parameters JSONB,
  month_1_projection BIGINT,
  month_3_projection BIGINT,
  month_6_projection BIGINT,
  key_success_factors TEXT[],
  risk_factors TEXT[],
  confidence_level VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SUBSCRIPTION & ACCESS CONTROL TABLES

CREATE TABLE IF NOT EXISTS engine_feature_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_tier VARCHAR(50) CHECK (subscription_tier IN ('free', 'starter', 'growth', 'elite')),
  feature_name VARCHAR(100),
  enabled BOOLEAN DEFAULT true,
  rate_limit_per_day INTEGER,
  rate_limit_per_month INTEGER,
  UNIQUE(subscription_tier, feature_name)
);

CREATE TABLE IF NOT EXISTS user_engine_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  engine_type VARCHAR(50) CHECK (engine_type IN ('idea_intelligence', 'trend_velocity', 'creator_dna', 'live_opportunity', 'growth_projection')),
  feature_name VARCHAR(100),
  usage_count INTEGER DEFAULT 0,
  usage_date DATE DEFAULT CURRENT_DATE,
  reset_date DATE,
  UNIQUE(user_id, engine_type, feature_name, usage_date)
);

-- INDEXES FOR PERFORMANCE

CREATE INDEX IF NOT EXISTS idx_idea_user ON idea_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_idea_scores_idea ON idea_intelligence_scores(idea_id);
CREATE INDEX IF NOT EXISTS idx_trend_platform ON platform_trends(platform);
CREATE INDEX IF NOT EXISTS idx_trend_velocity_trend ON trend_velocity_metrics(trend_id);
CREATE INDEX IF NOT EXISTS idx_creator_user ON creator_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_audience_creator ON audience_behavior_analysis(creator_id);
CREATE INDEX IF NOT EXISTS idx_live_opportunity_creator ON live_opportunity_windows(creator_id);
CREATE INDEX IF NOT EXISTS idx_real_time_alerts_user ON real_time_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_growth_projections_creator ON growth_projections(creator_id);
CREATE INDEX IF NOT EXISTS idx_posting_sim_creator ON posting_frequency_simulations(creator_id);
CREATE INDEX IF NOT EXISTS idx_engine_usage_user ON user_engine_usage(user_id);

-- ROW LEVEL SECURITY POLICIES

ALTER TABLE idea_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE idea_intelligence_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audience_behavior_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE format_effectiveness ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_opportunity_windows ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_time_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_projections ENABLE ROW LEVEL SECURITY;
ALTER TABLE posting_frequency_simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_engine_usage ENABLE ROW LEVEL SECURITY;

-- RLS: Users can only access their own data
CREATE POLICY "Users can view their own ideas" ON idea_submissions
  FOR SELECT USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

CREATE POLICY "Users can create ideas" ON idea_submissions
  FOR INSERT WITH CHECK (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

CREATE POLICY "Users can view their creator profile" ON creator_profiles
  FOR SELECT USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

CREATE POLICY "Users can view their alerts" ON real_time_alerts
  FOR SELECT USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

CREATE POLICY "Users can view their projections" ON growth_projections
  FOR SELECT USING (auth.uid() = (SELECT auth_id FROM users WHERE id = (SELECT user_id FROM creator_profiles WHERE id = creator_id)));

CREATE POLICY "Users can view their usage" ON user_engine_usage
  FOR SELECT USING (auth.uid() = (SELECT auth_id FROM users WHERE id = user_id));

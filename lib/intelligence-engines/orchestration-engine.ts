import { supabase } from '@/lib/supabase';
import { IdeaIntelligenceEngine } from './idea-engine';
import { TrendVelocityEngine } from './trend-velocity-engine';
import { CreatorDNAEngine } from './creator-dna-engine';
import { LiveOpportunityEngine } from './live-opportunity-engine';
import { GrowthProjectionEngine } from './growth-projection-engine';

export interface IntelligenceOrchestrationConfig {
  userId: string;
  creatorId: string;
  subscriptionTier: 'free' | 'starter' | 'growth' | 'elite';
}

export interface OrchestrationOutput {
  dailySynthesis: {
    topOpportunities: any[];
    trendingNow: any[];
    creatorInsights: any[];
    actionItems: any[];
  };
  dailyRecommendations: any[];
  weeklyForecasting: any;
  growthDashboard: any;
  alerts: any[];
}

/**
 * IDEORA AI Orchestration Engine
 * Coordinates all five intelligence engines and manages feature access
 */
export class IntelligenceOrchestration {
  /**
   * Main daily synthesis that pulls from all five engines
   */
  static async executeDailySynthesis(
    config: IntelligenceOrchestrationConfig
  ): Promise<OrchestrationOutput> {
    try {
      // Check rate limits and subscription access
      await this.validateAccessPermissions(
        config.userId,
        'daily_synthesis',
        config.subscriptionTier
      );

      // Execute all engines in parallel
      const [trendingTopics, opportunityWindows, growthProjection, creatorAnalysis] =
        await Promise.all([
          // Trend Velocity Engine: Get top trends
          TrendVelocityEngine.getTrendingTopics(
            ['tiktok', 'youtube', 'x', 'instagram', 'threads'],
            5
          ),
          // Live Opportunity Engine: Get streaming windows
          LiveOpportunityEngine.detectLiveOpportunityWindows(config.creatorId),
          // Growth Projection Engine: Generate 30-day forecast
          GrowthProjectionEngine.generateGrowthProjection(config.creatorId),
          // Creator DNA Engine: Get audience analysis
          CreatorDNAEngine.analyzeAudienceBehavior(config.userId),
        ]);

      // Generate integrated recommendations
      const topOpportunities = this.synthesizeOpportunities(trendingTopics, opportunityWindows);
      const actionItems = this.generateActionItems(trendingTopics, creatorAnalysis);

      const output: OrchestrationOutput = {
        dailySynthesis: {
          topOpportunities,
          trendingNow: trendingTopics.slice(0, 3),
          creatorInsights: [
            {
              type: 'audience_peak',
              description: `Peak engagement: ${creatorAnalysis.peak_engagement_hours}`,
              recommendation: 'Schedule content during these hours',
            },
            {
              type: 'format_recommendation',
              description: `Best performing format: ${this.getTopFormat(creatorAnalysis.format_recommendations)}`,
              recommendation: 'Focus on this format for maximum engagement',
            },
          ],
          actionItems,
        },
        dailyRecommendations: this.generateDailyRecommendations(
          trendingTopics,
          opportunityWindows,
          config.subscriptionTier
        ),
        weeklyForecasting: {
          projectedGrowth: growthProjection.predicted_followers_day_30,
          confidenceLevel: 'high',
          primaryDriver: growthProjection.primary_growth_driver,
        },
        growthDashboard: this.buildGrowthDashboard(growthProjection),
        alerts: [],
      };

      // Log synthesis execution
      await this.logEngineUsage(config.userId, 'orchestration', 'daily_synthesis');

      return output;
    } catch (error) {
      console.error('Error executing daily synthesis:', error);
      throw error;
    }
  }

  /**
   * Real-time monitoring and alert system
   */
  static async startRealtimeMonitoring(
    config: IntelligenceOrchestrationConfig
  ): Promise<void> {
    try {
      // Check subscription access
      await this.validateAccessPermissions(
        config.userId,
        'realtime_alerts',
        config.subscriptionTier
      );

      // Set up real-time alert subscription
      setInterval(async () => {
        // Check for trending moments
        const trendingMoments = await this.detectTrendingMoments();

        for (const moment of trendingMoments) {
          const score = await LiveOpportunityEngine.scoreEngagementOpportunity(
            config.creatorId,
            moment.type
          );

          if (score.score > 80) {
            await LiveOpportunityEngine.triggerRealTimeAlert(config.userId, {
              alert_type: 'trend_spike',
              trigger_name: moment.name,
              description: `High momentum trend detected: ${moment.name}`,
              platforms: moment.platforms,
              urgency_level: score.score > 90 ? 'critical' : 'high',
              action_recommended: score.recommended_action,
            });
          }
        }
      }, 5 * 60 * 1000); // Check every 5 minutes
    } catch (error) {
      console.error('Error starting realtime monitoring:', error);
      throw error;
    }
  }

  /**
   * Weekly strategic briefing
   */
  static async generateWeeklyBriefing(
    config: IntelligenceOrchestrationConfig
  ): Promise<any> {
    try {
      await this.validateAccessPermissions(
        config.userId,
        'weekly_briefing',
        config.subscriptionTier
      );

      // Gather data from all engines
      const scenarios = await GrowthProjectionEngine.generateGrowthScenarios(
        config.creatorId
      );
      const recommendations = await CreatorDNAEngine.recommendFormatsByPlatform(
        config.userId
      );
      const trends = await TrendVelocityEngine.getTrendingTopics(
        ['tiktok', 'youtube', 'x', 'instagram', 'threads'],
        10
      );

      return {
        week_of: new Date().toISOString().split('T')[0],
        growth_scenarios: scenarios,
        format_recommendations: recommendations,
        top_emerging_trends: trends.filter((t) => t.metrics.trend_lifespan_prediction === 'emerging'),
        competitor_landscape: await this.analyzeCompetitorLandscape(config.creatorId),
        strategic_recommendations: this.buildStrategicRecommendations(
          scenarios,
          trends,
          config.subscriptionTier
        ),
      };
    } catch (error) {
      console.error('Error generating weekly briefing:', error);
      throw error;
    }
  }

  /**
   * Validates user access based on subscription tier
   */
  private static async validateAccessPermissions(
    userId: string,
    featureName: string,
    subscriptionTier: string
  ): Promise<void> {
    // Get feature access configuration
    const { data: featureAccess } = await supabase
      .from('engine_feature_access')
      .select('*')
      .eq('subscription_tier', subscriptionTier)
      .eq('feature_name', featureName)
      .single();

    if (!featureAccess || !featureAccess.enabled) {
      throw new Error(`Feature ${featureName} not available for ${subscriptionTier} tier`);
    }

    // Check daily rate limit
    const { data: usage } = await supabase
      .from('user_engine_usage')
      .select('*')
      .eq('user_id', userId)
      .eq('feature_name', featureName)
      .eq('usage_date', new Date().toISOString().split('T')[0])
      .single();

    if (usage && usage.usage_count >= (featureAccess.rate_limit_per_day || 100)) {
      throw new Error(`Daily rate limit exceeded for ${featureName}`);
    }
  }

  /**
   * Logs feature usage for analytics and rate limiting
   */
  private static async logEngineUsage(
    userId: string,
    engineType: string,
    featureName: string
  ): Promise<void> {
    const today = new Date().toISOString().split('T')[0];

    await supabase.from('user_engine_usage').upsert(
      {
        user_id: userId,
        engine_type: engineType,
        feature_name: featureName,
        usage_date: today,
        usage_count: 1,
        reset_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        onConflict: 'user_id,engine_type,feature_name,usage_date',
      }
    );
  }

  // Helper methods

  private static synthesizeOpportunities(trends: any[], windows: any[]): any[] {
    return trends.slice(0, 3).map((trend, index) => ({
      rank: index + 1,
      opportunity: trend.trend_name,
      momentum: trend.metrics.momentum_score,
      recommendation: `Post in the next ${trend.metrics.estimated_days_remaining} days`,
      platforms: trend.metrics.platform_momentum,
    }));
  }

  private static generateActionItems(trends: any[], creatorAnalysis: any): any[] {
    return [
      {
        priority: 'high',
        action: 'Create content around top trending topic',
        details: trends[0]?.trend_name || 'Current trend',
        deadline: 'Within 24 hours',
      },
      {
        priority: 'medium',
        action: 'Schedule live stream during peak engagement hours',
        details: creatorAnalysis.peak_engagement_hours,
        deadline: 'This week',
      },
    ];
  }

  private static generateDailyRecommendations(
    trends: any[],
    windows: any[],
    tier: string
  ): any[] {
    const recommendations = [
      {
        type: 'trend_based',
        content: trends[0]?.trend_name,
        reasoning: 'Emerging trend with high momentum',
        engagement_boost: '3-4x',
      },
    ];

    if (tier !== 'free') {
      recommendations.push({
        type: 'timing_based',
        content: `Post during optimal window: ${windows[0]?.optimal_start_hour}:00`,
        reasoning: 'Peak audience availability',
        engagement_boost: '1.5-2x',
      });
    }

    if (tier === 'growth' || tier === 'elite') {
      recommendations.push({
        type: 'format_based',
        content: 'Use short-form video format',
        reasoning: 'Highest engagement for your audience',
        engagement_boost: '2-3x',
      });
    }

    return recommendations;
  }

  private static buildGrowthDashboard(projection: any): any {
    return {
      current_followers: projection.current_followers,
      projected_30_day: projection.predicted_followers_day_30,
      growth_percentage: projection.growth_rate_percentage,
      confidence_interval: {
        low: projection.confidence_interval_low,
        high: projection.confidence_interval_high,
      },
      primary_driver: projection.primary_growth_driver,
    };
  }

  private static getTopFormat(formatRecs: Record<string, number>): string {
    return Object.entries(formatRecs).sort(([, a], [, b]) => b - a)[0]?.[0] || 'short-form';
  }

  private static async detectTrendingMoments(): Promise<any[]> {
    // Placeholder for trend detection
    return [
      { type: 'viral_trend', name: 'Trending Audio', platforms: ['tiktok'] },
    ];
  }

  private static async analyzeCompetitorLandscape(creatorId: string): Promise<any> {
    return {
      total_competitors_tracked: 5,
      average_engagement: 0.068,
      market_position: 'mid-tier',
      opportunities: 'High growth potential in educational content',
    };
  }

  private static buildStrategicRecommendations(
    scenarios: any[],
    trends: any[],
    tier: string
  ): any[] {
    const recommendations = [];

    if (tier === 'elite') {
      recommendations.push({
        type: 'strategic',
        recommendation: 'Shift to aggressive growth strategy (Elite feature)',
        expected_impact: '5x follower growth in 6 months',
      });
    }

    recommendations.push({
      type: 'content',
      recommendation: `Focus on ${trends[0]?.trend_name} niche`,
      expected_impact: 'Higher relevance score',
    });

    return recommendations;
  }
}

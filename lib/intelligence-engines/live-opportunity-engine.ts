import { supabase } from '@/lib/supabase';

export interface OpportunityWindow {
  platform: string;
  day_of_week: number;
  optimal_start_hour: number;
  optimal_duration_minutes: number;
  predicted_concurrent_viewers: number;
  engagement_probability: number;
  opportunity_rank: number;
}

export interface RealTimeAlert {
  alert_type: 'trend_spike' | 'live_window' | 'engagement_peak' | 'hashtag_trending' | 'competitor_activity';
  trigger_name: string;
  description: string;
  platforms: string[];
  urgency_level: 'low' | 'medium' | 'high' | 'critical';
  action_recommended: string;
}

export interface OpportunityScore {
  moment_type: string;
  score: number;
  time_window_minutes: number;
  estimated_reach_boost: number;
  probability_of_success: number;
  recommended_action: string;
}

export class LiveOpportunityEngine {
  /**
   * Detects optimal live streaming windows for creator
   */
  static async detectLiveOpportunityWindows(creatorId: string): Promise<OpportunityWindow[]> {
    try {
      const { data: creator } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('id', creatorId)
        .single();

      if (!creator) throw new Error('Creator not found');

      const windows: OpportunityWindow[] = [];

      for (const platform of creator.primary_platforms || []) {
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          const window = await this.analyzeOptimalWindow(creatorId, platform, dayOfWeek);
          if (window) windows.push(window);
        }
      }

      // Store windows in database
      for (const window of windows) {
        await supabase.from('live_opportunity_windows').upsert(
          {
            creator_id: creatorId,
            ...window,
            last_calculated: new Date().toISOString(),
          },
          { onConflict: 'creator_id,platform,day_of_week' }
        );
      }

      return windows.sort((a, b) => b.engagement_probability - a.engagement_probability);
    } catch (error) {
      console.error('Error detecting opportunity windows:', error);
      throw error;
    }
  }

  /**
   * Analyzes optimal window for specific platform and day
   */
  private static async analyzeOptimalWindow(
    creatorId: string,
    platform: string,
    dayOfWeek: number
  ): Promise<OpportunityWindow> {
    // Get audience behavior data
    const { data: behavior } = await supabase
      .from('audience_behavior_analysis')
      .select('*')
      .eq('creator_id', creatorId)
      .single();

    // Parse peak hours from behavior data
    let optimalHour = 14; // Default 2 PM
    if (behavior?.peak_engagement_hours) {
      const hourMatch = behavior.peak_engagement_hours.match(/\d+/);
      if (hourMatch) optimalHour = parseInt(hourMatch[0]);
    }

    // Platform-specific optimization
    const platformAdjustment = this.getPlatformAdjustment(platform);
    optimalHour = (optimalHour + platformAdjustment) % 24;

    // Estimate concurrent viewers based on creator size
    const { data: creator } = await supabase
      .from('creator_profiles')
      .select('total_followers')
      .eq('id', creatorId)
      .single();

    const concurrentViewers = Math.round((creator?.total_followers || 1000) * 0.15);

    // Calculate engagement probability
    const engagementProbability = this.calculateEngagementProbability(
      platform,
      dayOfWeek,
      optimalHour
    );

    // Determine opportunity rank based on multiple factors
    const opportunityRank = this.calculateOpportunityRank(
      engagementProbability,
      concurrentViewers,
      dayOfWeek
    );

    return {
      platform,
      day_of_week: dayOfWeek,
      optimal_start_hour: optimalHour,
      optimal_duration_minutes: 45,
      predicted_concurrent_viewers: concurrentViewers,
      engagement_probability: engagementProbability,
      opportunity_rank: opportunityRank,
    };
  }

  /**
   * Sends real-time alerts for engagement opportunities
   */
  static async triggerRealTimeAlert(
    userId: string,
    alertData: Omit<RealTimeAlert, 'alert_sent_at'>
  ): Promise<void> {
    try {
      await supabase.from('real_time_alerts').insert({
        user_id: userId,
        ...alertData,
        alert_sent_at: new Date().toISOString(),
      });

      // TODO: Send push notification or email based on user preferences
    } catch (error) {
      console.error('Error triggering alert:', error);
      throw error;
    }
  }

  /**
   * Scores immediate engagement opportunities
   */
  static async scoreEngagementOpportunity(
    creatorId: string,
    momentType: string,
    contextData?: Record<string, any>
  ): Promise<OpportunityScore> {
    // Base scores for different moment types
    const baseScores: Record<string, number> = {
      trending_audio: 85,
      viral_trend: 90,
      community_moment: 75,
      platform_push: 80,
      algorithm_surge: 88,
    };

    const baseScore = baseScores[momentType] || 70;

    // Get creator's recent performance
    const { data: performance } = await supabase
      .from('idea_performance_history')
      .select('*')
      .eq('idea_id', creatorId)
      .order('recorded_at', { ascending: false })
      .limit(5);

    // Adjust score based on creator's track record
    let adjustedScore = baseScore;
    if (performance && performance.length > 0) {
      const avgEngagement =
        performance.reduce((sum, p) => sum + (p.actual_engagement || 0), 0) /
        performance.length;
      adjustedScore = baseScore * (0.8 + avgEngagement);
    }

    const timeWindow = this.getTimeWindowForMoment(momentType);
    const probabilityOfSuccess = Math.min(95, adjustedScore);
    const estimatedReach = this.estimateReachBoost(momentType);

    return {
      moment_type: momentType,
      score: Math.round(adjustedScore),
      time_window_minutes: timeWindow,
      estimated_reach_boost: estimatedReach,
      probability_of_success: probabilityOfSuccess,
      recommended_action: this.getRecommendedAction(momentType, adjustedScore),
    };
  }

  /**
   * Get all active opportunities for creator
   */
  static async getActiveOpportunities(creatorId: string): Promise<any[]> {
    const { data: alerts } = await supabase
      .from('real_time_alerts')
      .select('*')
      .eq('user_id', creatorId)
      .eq('user_acknowledged', false)
      .order('urgency_level', { ascending: false });

    return alerts || [];
  }

  /**
   * Acknowledge and track opportunity action
   */
  static async acknowledgeOpportunity(
    alertId: string,
    action?: string
  ): Promise<void> {
    await supabase
      .from('real_time_alerts')
      .update({
        user_acknowledged: true,
        acknowledged_at: new Date().toISOString(),
        action_taken: action,
        action_taken_at: new Date().toISOString(),
      })
      .eq('id', alertId);
  }

  // Private helper methods

  private static getPlatformAdjustment(platform: string): number {
    const adjustments: Record<string, number> = {
      tiktok: 1,
      youtube: -2,
      x: 0,
      instagram: 2,
      threads: 1,
      facebook: -1,
    };
    return adjustments[platform] || 0;
  }

  private static calculateEngagementProbability(
    platform: string,
    dayOfWeek: number,
    hour: number
  ): number {
    let score = 50;

    // Weekday preference
    if (dayOfWeek >= 1 && dayOfWeek <= 4) score += 15;
    if (dayOfWeek === 5) score += 20;
    if (dayOfWeek === 6) score += 10;

    // Hour preference
    if (hour >= 14 && hour <= 19) score += 20;
    else if (hour >= 11 && hour <= 13) score += 10;

    return Math.min(100, score);
  }

  private static calculateOpportunityRank(
    engagementProb: number,
    concurrentViewers: number,
    dayOfWeek: number
  ): number {
    const weight =
      engagementProb * 0.5 +
      (Math.min(concurrentViewers, 10000) / 10000) * 100 * 0.3 +
      (7 - dayOfWeek) * 5 * 0.2;

    return Math.round(weight);
  }

  private static getTimeWindowForMoment(momentType: string): number {
    const windows: Record<string, number> = {
      trending_audio: 120,
      viral_trend: 180,
      community_moment: 60,
      platform_push: 240,
      algorithm_surge: 90,
    };
    return windows[momentType] || 120;
  }

  private static estimateReachBoost(momentType: string): number {
    const boosts: Record<string, number> = {
      trending_audio: 3.5,
      viral_trend: 4.2,
      community_moment: 2.1,
      platform_push: 2.8,
      algorithm_surge: 3.8,
    };
    return boosts[momentType] || 2.0;
  }

  private static getRecommendedAction(momentType: string, score: number): string {
    if (score > 80) {
      return `🚀 Post immediately to capitalize on ${momentType}`;
    } else if (score > 60) {
      return `📍 Consider posting soon to catch this ${momentType}`;
    }
    return `💡 Monitor this ${momentType} for future reference`;
  }
}

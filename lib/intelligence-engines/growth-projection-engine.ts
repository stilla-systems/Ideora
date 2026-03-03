import { supabase } from '@/lib/supabase';

export interface GrowthProjection {
  projection_date: string;
  current_followers: number;
  predicted_followers_day_30: number;
  growth_rate_percentage: number;
  confidence_interval_low: number;
  confidence_interval_high: number;
  primary_growth_driver: string;
}

export interface PostingFrequencySimulation {
  scenario_name: string;
  posts_per_week: number;
  projected_monthly_followers: number;
  projected_monthly_engagement: number;
  virality_multiplier: number;
  sustainability_score: number;
  burnout_risk: 'low' | 'medium' | 'high';
}

export interface GrowthScenario {
  scenario_name: string;
  scenario_type: 'conservative' | 'realistic' | 'aggressive';
  month_1_projection: number;
  month_3_projection: number;
  month_6_projection: number;
  key_success_factors: string[];
  risk_factors: string[];
  confidence_level: string;
}

export class GrowthProjectionEngine {
  /**
   * Generates 30-day growth projection for creator
   */
  static async generateGrowthProjection(creatorId: string): Promise<GrowthProjection> {
    try {
      const { data: creator } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('id', creatorId)
        .single();

      if (!creator) throw new Error('Creator not found');

      // Get performance history
      const { data: performance } = await supabase
        .from('idea_performance_history')
        .select('*')
        .eq('idea_id', creatorId)
        .order('recorded_at', { ascending: false })
        .limit(30);

      // Calculate growth metrics
      const currentFollowers = creator.total_followers || 0;
      const avgEngagementRate =
        performance?.reduce((sum, p) => sum + (p.engagement_rate || 0), 0) / (performance?.length || 1) || 0.05;

      // Project 30-day growth
      const dailyGrowthRate = this.calculateDailyGrowthRate(
        avgEngagementRate,
        creator.content_frequency_per_week || 3,
        currentFollowers
      );

      const projectedFollowers30d = Math.round(
        currentFollowers * Math.pow(1 + dailyGrowthRate, 30)
      );

      const growthPercentage = ((projectedFollowers30d - currentFollowers) / currentFollowers) * 100;

      const projection: GrowthProjection = {
        projection_date: new Date().toISOString().split('T')[0],
        current_followers: currentFollowers,
        predicted_followers_day_30: projectedFollowers30d,
        growth_rate_percentage: parseFloat(growthPercentage.toFixed(2)),
        confidence_interval_low: Math.round(projectedFollowers30d * 0.85),
        confidence_interval_high: Math.round(projectedFollowers30d * 1.15),
        primary_growth_driver: this.identifyPrimaryDriver(performance),
      };

      // Store projection
      await supabase
        .from('growth_projections')
        .insert({
          creator_id: creatorId,
          ...projection,
          assumptions: {
            engagement_rate: avgEngagementRate,
            posting_frequency: creator.content_frequency_per_week,
            external_factors: 'standard market conditions',
          },
        })
        .select();

      return projection;
    } catch (error) {
      console.error('Error generating growth projection:', error);
      throw error;
    }
  }

  /**
   * Simulates growth under different posting frequencies
   */
  static async simulatePostingFrequency(
    creatorId: string,
    postsPerWeek: number
  ): Promise<PostingFrequencySimulation> {
    try {
      const { data: creator } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('id', creatorId)
        .single();

      if (!creator) throw new Error('Creator not found');

      // Get historical data
      const { data: performance } = await supabase
        .from('idea_performance_history')
        .select('*')
        .eq('idea_id', creatorId)
        .order('recorded_at', { ascending: false })
        .limit(30);

      const avgEngagement = performance?.length
        ? performance.reduce((sum, p) => sum + (p.actual_engagement || 0), 0) /
          performance.length
        : 0.05;

      // Simulate month 1 and month 3 projections
      const currentFollowers = creator.total_followers || 1000;
      const dailyGrowthRate = this.calculateDailyGrowthRate(avgEngagement, postsPerWeek, currentFollowers);

      const month1Followers = Math.round(currentFollowers * Math.pow(1 + dailyGrowthRate, 30));
      const month3Followers = Math.round(currentFollowers * Math.pow(1 + dailyGrowthRate, 90));

      // Calculate virality multiplier (more posts can increase virality chance)
      const viralityMultiplier = Math.min(1.5, 1 + postsPerWeek * 0.1);

      // Calculate sustainability (burnout risk increases with high frequency)
      const sustainability = Math.max(30, 100 - postsPerWeek * 10);
      const burnoutRisk = postsPerWeek > 7 ? 'high' : postsPerWeek > 5 ? 'medium' : 'low';

      const simulation: PostingFrequencySimulation = {
        scenario_name: `${postsPerWeek} posts/week`,
        posts_per_week: postsPerWeek,
        projected_monthly_followers: month1Followers,
        projected_monthly_engagement: Math.round(month1Followers * avgEngagement),
        virality_multiplier: parseFloat(viralityMultiplier.toFixed(2)),
        sustainability_score: sustainability,
        burnout_risk: burnoutRisk,
      };

      // Store simulation
      await supabase.from('posting_frequency_simulations').insert({
        creator_id: creatorId,
        ...simulation,
        average_engagement_per_post: avgEngagement,
        projected_daily_reach: Math.round((month1Followers / 30) * 0.15),
        simulated_at: new Date().toISOString(),
      });

      return simulation;
    } catch (error) {
      console.error('Error simulating posting frequency:', error);
      throw error;
    }
  }

  /**
   * Generates multiple growth scenarios (conservative, realistic, aggressive)
   */
  static async generateGrowthScenarios(creatorId: string): Promise<GrowthScenario[]> {
    try {
      const { data: creator } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('id', creatorId)
        .single();

      if (!creator) throw new Error('Creator not found');

      const baseFollowers = creator.total_followers || 1000;
      const scenarios: GrowthScenario[] = [];

      // Conservative scenario
      const conservativeMonth1 = Math.round(baseFollowers * 1.05);
      const conservativeMonth3 = Math.round(baseFollowers * 1.15);
      const conservativeMonth6 = Math.round(baseFollowers * 1.3);

      scenarios.push({
        scenario_name: 'Conservative Growth',
        scenario_type: 'conservative',
        month_1_projection: conservativeMonth1,
        month_3_projection: conservativeMonth3,
        month_6_projection: conservativeMonth6,
        key_success_factors: [
          'Consistent posting 2-3x per week',
          'Maintaining audience engagement quality',
          'Organic growth through recommendations',
        ],
        risk_factors: ['Slow growth may reduce motivation', 'Algorithm changes could impact reach'],
        confidence_level: 'high',
      });

      // Realistic scenario
      const realisticMonth1 = Math.round(baseFollowers * 1.15);
      const realisticMonth3 = Math.round(baseFollowers * 1.45);
      const realisticMonth6 = Math.round(baseFollowers * 2.0);

      scenarios.push({
        scenario_name: 'Realistic Growth',
        scenario_type: 'realistic',
        month_1_projection: realisticMonth1,
        month_3_projection: realisticMonth3,
        month_6_projection: realisticMonth6,
        key_success_factors: [
          'Post 4-5 times per week with optimized timing',
          'Use trending content and sounds',
          'Engage with community regularly',
          'Collaborate with other creators',
        ],
        risk_factors: [
          'Requires consistent effort and time',
          'Market saturation in some niches',
          'Algorithm volatility',
        ],
        confidence_level: 'high',
      });

      // Aggressive scenario
      const aggressiveMonth1 = Math.round(baseFollowers * 1.35);
      const aggressiveMonth3 = Math.round(baseFollowers * 2.5);
      const aggressiveMonth6 = Math.round(baseFollowers * 5.0);

      scenarios.push({
        scenario_name: 'Aggressive Growth',
        scenario_type: 'aggressive',
        month_1_projection: aggressiveMonth1,
        month_3_projection: aggressiveMonth3,
        month_6_projection: aggressiveMonth6,
        key_success_factors: [
          'Daily content posting (7+ posts per week)',
          'Viral content creation',
          'Frequent live streams',
          'Strategic partnerships',
          'Rapid trend adoption',
        ],
        risk_factors: [
          'High burnout risk',
          'Quality may suffer with volume',
          'Algorithm penalties possible',
          'Sustainability concerns',
        ],
        confidence_level: 'medium',
      });

      // Store scenarios
      for (const scenario of scenarios) {
        await supabase.from('growth_scenario_analysis').insert({
          creator_id: creatorId,
          ...scenario,
          parameters: {
            frequency: scenario.scenario_type === 'aggressive' ? 7 : scenario.scenario_type === 'realistic' ? 4 : 2,
            engagement_focus: scenario.scenario_type === 'aggressive' ? 'viral' : 'consistent',
          },
          created_at: new Date().toISOString(),
        });
      }

      return scenarios;
    } catch (error) {
      console.error('Error generating growth scenarios:', error);
      throw error;
    }
  }

  /**
   * Gets all projections for a creator
   */
  static async getCreatorProjections(creatorId: string) {
    const { data, error } = await supabase
      .from('growth_projections')
      .select('*')
      .eq('creator_id', creatorId)
      .order('projection_date', { ascending: false })
      .limit(12);

    if (error) throw error;
    return data;
  }

  // Private helper methods

  private static calculateDailyGrowthRate(
    engagementRate: number,
    postsPerWeek: number,
    currentFollowers: number
  ): number {
    // Base growth calculation
    const baseGrowthPerPost = engagementRate * 0.5;
    const totalWeeklyGrowth = baseGrowthPerPost * postsPerWeek;
    const dailyGrowth = totalWeeklyGrowth / 7;

    // Diminishing returns for larger accounts
    const scaleAdjustment = Math.log10(currentFollowers + 1) / 4;
    const adjustedDailyGrowth = dailyGrowth / scaleAdjustment;

    return Math.max(0.0001, Math.min(0.05, adjustedDailyGrowth));
  }

  private static identifyPrimaryDriver(performance: any[]): string {
    if (!performance || performance.length === 0) return 'engagement_rate';

    const highPerformance = performance.filter((p) => (p.actual_engagement || 0) > 0.08);

    if (highPerformance.length > performance.length * 0.5) {
      return 'high_engagement_content';
    }

    const viralContent = performance.find((p) => (p.views || 0) > 100000);
    if (viralContent) return 'viral_moments';

    return 'consistent_posting';
  }
}

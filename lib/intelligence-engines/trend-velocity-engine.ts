import { supabase } from '@/lib/supabase';

export interface TrendMetrics {
  momentum_score: number;
  trend_lifespan_prediction: 'emerging' | 'peak' | 'declining' | 'saturated';
  estimated_days_remaining: number;
  acceleration_rate: number;
  growth_rate: number;
  platform_momentum: Record<string, number>;
}

export interface TrendAnalysis {
  trend_name: string;
  platform: string;
  metrics: TrendMetrics;
  recommendations: string[];
  optimal_posting_window: string;
}

export class TrendVelocityEngine {
  /**
   * Analyzes trend acceleration and momentum across platforms
   */
  static async analyzeTrendVelocity(trendName: string, platform: string): Promise<TrendAnalysis> {
    try {
      // Get or create trend record
      const { data: trendData } = await supabase
        .from('platform_trends')
        .select('*')
        .eq('trend_name', trendName)
        .eq('platform', platform)
        .single();

      let trend = trendData;
      if (!trend) {
        const { data: newTrend } = await supabase
          .from('platform_trends')
          .insert({
            trend_name: trendName,
            platform: platform,
            category: 'general',
            detected_at: new Date().toISOString(),
          })
          .select()
          .single();
        trend = newTrend;
      }

      // Calculate velocity metrics
      const metrics = await this.calculateVelocityMetrics(trend.id);

      // Get recommendations based on metrics
      const recommendations = this.generateRecommendations(metrics);

      // Determine optimal posting window
      const optimal_posting_window = this.calculateOptimalWindow(metrics);

      return {
        trend_name: trendName,
        platform: platform,
        metrics,
        recommendations,
        optimal_posting_window,
      };
    } catch (error) {
      console.error('Error analyzing trend velocity:', error);
      throw error;
    }
  }

  /**
   * Calculates velocity metrics for a trend
   */
  private static async calculateVelocityMetrics(trendId: string): Promise<TrendMetrics> {
    // Fetch historical trend data
    const { data: history } = await supabase
      .from('trend_history')
      .select('*')
      .eq('trend_id', trendId)
      .order('date', { ascending: false })
      .limit(14);

    if (!history || history.length < 2) {
      return {
        momentum_score: 50,
        trend_lifespan_prediction: 'emerging',
        estimated_days_remaining: 30,
        acceleration_rate: 0,
        growth_rate: 0,
        platform_momentum: {},
      };
    }

    const latest = history[0];
    const previous = history[Math.min(7, history.length - 1)];

    const growth_rate = ((latest.volume - previous.volume) / previous.volume) * 100;
    const acceleration_rate = growth_rate / 7; // Per day

    const momentum_score = this.calculateMomentumScore(growth_rate, acceleration_rate);

    const lifespan = this.predictTrendLifespan(momentum_score, growth_rate, acceleration_rate);

    const estimated_days_remaining = this.estimateTrendDays(momentum_score);

    return {
      momentum_score: Math.round(momentum_score),
      trend_lifespan_prediction: lifespan,
      estimated_days_remaining,
      acceleration_rate: parseFloat(acceleration_rate.toFixed(2)),
      growth_rate: parseFloat(growth_rate.toFixed(2)),
      platform_momentum: {
        tiktok: momentum_score * 0.95,
        youtube: momentum_score * 0.85,
        x: momentum_score * 0.88,
        instagram: momentum_score * 0.92,
        threads: momentum_score * 0.78,
      },
    };
  }

  private static calculateMomentumScore(growth_rate: number, acceleration_rate: number): number {
    // Momentum = growth rate + acceleration factor
    let score = 50; // Base score

    if (growth_rate > 100) score += 40;
    else if (growth_rate > 50) score += 25;
    else if (growth_rate > 0) score += 10;

    if (acceleration_rate > 0) score += 10;

    return Math.min(100, score);
  }

  private static predictTrendLifespan(
    momentum: number,
    growth_rate: number,
    acceleration_rate: number
  ): 'emerging' | 'peak' | 'declining' | 'saturated' {
    if (momentum > 80 && acceleration_rate > 0) return 'emerging';
    if (momentum > 70 && growth_rate > 20) return 'peak';
    if (momentum < 40 || growth_rate < -10) return 'declining';
    return 'saturated';
  }

  private static estimateTrendDays(momentum: number): number {
    // Estimate remaining days based on momentum
    if (momentum > 80) return 14;
    if (momentum > 60) return 21;
    if (momentum > 40) return 30;
    return 7;
  }

  private static generateRecommendations(metrics: TrendMetrics): string[] {
    const recommendations: string[] = [];

    if (metrics.trend_lifespan_prediction === 'emerging') {
      recommendations.push(
        '🚀 Emerging trend detected - Act now for maximum reach potential'
      );
      recommendations.push(
        'Post within the next 24-48 hours to catch the momentum'
      );
    } else if (metrics.trend_lifespan_prediction === 'peak') {
      recommendations.push(
        '📈 Trend at peak momentum - High visibility opportunity'
      );
      recommendations.push(
        'Post 2-3 times in the next week to maximize engagement'
      );
    } else if (metrics.trend_lifespan_prediction === 'declining') {
      recommendations.push(
        '📉 Trend is declining - Window of opportunity closing'
      );
      recommendations.push(
        'Consider repurposing this trend with a unique angle'
      );
    }

    if (metrics.momentum_score > 80) {
      recommendations.push(`High momentum score (${metrics.momentum_score}/100) - Prioritize this trend`);
    }

    return recommendations;
  }

  private static calculateOptimalWindow(metrics: TrendMetrics): string {
    if (metrics.trend_lifespan_prediction === 'emerging') {
      return 'Next 24-48 hours (critical window)';
    } else if (metrics.trend_lifespan_prediction === 'peak') {
      return 'Next 3-7 days (optimal window)';
    }
    return 'Next 7-14 days (secondary window)';
  }

  /**
   * Get trending topics for a creator
   */
  static async getTrendingTopics(
    platforms: string[],
    limit: number = 10
  ): Promise<TrendAnalysis[]> {
    const { data: trends } = await supabase
      .from('platform_trends')
      .select('*')
      .in('platform', platforms)
      .order('detected_at', { ascending: false })
      .limit(limit);

    if (!trends) return [];

    return Promise.all(
      trends.map(async (trend) => {
        const analysis = await this.analyzeTrendVelocity(trend.trend_name, trend.platform);
        return analysis;
      })
    );
  }

  /**
   * Track trend performance over time
   */
  static async recordTrendSnapshot(
    trendId: string,
    volume: number,
    engagement_rate: number
  ): Promise<void> {
    await supabase.from('trend_history').insert({
      trend_id: trendId,
      date: new Date().toISOString().split('T')[0],
      volume,
      engagement_rate,
    });
  }
}

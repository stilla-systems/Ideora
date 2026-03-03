import { supabase } from '@/lib/supabase';

export interface CreatorDNA {
  primary_niche: string;
  secondary_niches: string[];
  target_audience_age_min: number;
  target_audience_age_max: number;
  content_frequency_per_week: number;
  preferred_content_length: string;
  average_engagement_rate: number;
}

export interface AudienceBehavior {
  peak_engagement_hours: string;
  peak_engagement_days: string[];
  audience_sentiment_trend: 'positive' | 'neutral' | 'negative';
  audience_growth_trend: number;
  retention_rate: number;
  format_recommendations: Record<string, number>;
}

export interface FormatRecommendation {
  format: string;
  platform: string;
  effectiveness_score: number;
  average_views: number;
  average_engagement: number;
  recommendation_reason: string;
}

export class CreatorDNAEngine {
  /**
   * Builds and updates creator DNA profile
   */
  static async buildCreatorProfile(
    userId: string,
    dnaData: Partial<CreatorDNA>
  ): Promise<CreatorDNA> {
    try {
      const { data: profile, error } = await supabase
        .from('creator_profiles')
        .upsert(
          {
            user_id: userId,
            ...dnaData,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        )
        .select()
        .single();

      if (error) throw error;

      return profile as CreatorDNA;
    } catch (error) {
      console.error('Error building creator profile:', error);
      throw error;
    }
  }

  /**
   * Analyzes audience behavior patterns
   */
  static async analyzeAudienceBehavior(userId: string): Promise<AudienceBehavior> {
    try {
      // Get creator profile
      const { data: creator } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!creator) {
        throw new Error('Creator profile not found');
      }

      // Analyze engagement patterns from activity logs
      const { data: activities } = await supabase
        .from('activity_log')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(100);

      // Calculate peak hours and days
      const peakHours = this.calculatePeakHours(activities || []);
      const peakDays = this.calculatePeakDays(activities || []);

      // Get format effectiveness data
      const { data: formatData } = await supabase
        .from('format_effectiveness')
        .select('*')
        .eq('creator_id', creator.id)
        .order('average_engagement_rate', { ascending: false });

      const formatRecommendations = this.buildFormatRecommendations(formatData || []);

      const behavior: AudienceBehavior = {
        peak_engagement_hours: peakHours,
        peak_engagement_days: peakDays,
        audience_sentiment_trend: 'positive',
        audience_growth_trend: creator.total_followers > 0 ? 5 : 0,
        retention_rate: 0.75,
        format_recommendations: formatRecommendations,
      };

      // Store analysis
      await supabase.from('audience_behavior_analysis').upsert(
        {
          creator_id: creator.id,
          ...behavior,
          last_updated: new Date().toISOString(),
        },
        { onConflict: 'creator_id' }
      );

      return behavior;
    } catch (error) {
      console.error('Error analyzing audience behavior:', error);
      throw error;
    }
  }

  /**
   * Recommends optimal content formats for creator
   */
  static async recommendFormatsByPlatform(userId: string): Promise<FormatRecommendation[]> {
    try {
      const { data: creator } = await supabase
        .from('creator_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!creator) throw new Error('Creator profile not found');

      const { data: formats } = await supabase
        .from('format_effectiveness')
        .select('*')
        .eq('creator_id', creator.id)
        .order('average_engagement_rate', { ascending: false });

      if (!formats || formats.length === 0) {
        return this.generateDefaultRecommendations(creator.primary_platforms || []);
      }

      return formats.map((format) => ({
        format: format.format_type,
        platform: format.platform,
        effectiveness_score: format.average_engagement_rate * 100,
        average_views: format.average_views,
        average_engagement: format.average_engagement_rate,
        recommendation_reason: this.getReason(format.average_engagement_rate),
      }));
    } catch (error) {
      console.error('Error recommending formats:', error);
      throw error;
    }
  }

  private static calculatePeakHours(activities: any[]): string {
    if (activities.length === 0) return '2-5 PM';

    const hourCounts: Record<number, number> = {};
    activities.forEach((activity) => {
      const hour = new Date(activity.created_at).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const sortedHours = Object.entries(hourCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([hour]) => {
        const h = parseInt(hour);
        return `${h}:00-${(h + 1) % 24}:00`;
      });

    return sortedHours.join(', ') || '2-5 PM';
  }

  private static calculatePeakDays(activities: any[]): string[] {
    if (activities.length === 0) return ['Tuesday', 'Wednesday', 'Thursday'];

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayCounts: Record<number, number> = {};

    activities.forEach((activity) => {
      const day = new Date(activity.created_at).getDay();
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });

    return Object.entries(dayCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([day]) => dayNames[parseInt(day)]);
  }

  private static buildFormatRecommendations(formatData: any[]): Record<string, number> {
    const recommendations: Record<string, number> = {
      'short-form': 0,
      'medium-form': 0,
      'long-form': 0,
      'carousel': 0,
      'infographic': 0,
      'live-stream': 0,
    };

    formatData.slice(0, 6).forEach((format, index) => {
      recommendations[format.format_type] = (6 - index) * 16.67;
    });

    return recommendations;
  }

  private static generateDefaultRecommendations(platforms: string[]): FormatRecommendation[] {
    const defaults: FormatRecommendation[] = [];

    platforms.forEach((platform) => {
      if (platform === 'tiktok' || platform === 'instagram') {
        defaults.push({
          format: 'short-form',
          platform,
          effectiveness_score: 85,
          average_views: 25000,
          average_engagement: 0.08,
          recommendation_reason: 'Short-form video performs best on this platform',
        });
      } else if (platform === 'youtube') {
        defaults.push({
          format: 'long-form',
          platform,
          effectiveness_score: 90,
          average_views: 50000,
          average_engagement: 0.06,
          recommendation_reason: 'YouTube audiences prefer longer, in-depth content',
        });
      }
    });

    return defaults;
  }

  private static getReason(engagementRate: number): string {
    if (engagementRate > 0.08) return 'High performing format - prioritize this';
    if (engagementRate > 0.05) return 'Good engagement - use regularly';
    return 'Moderate performance - experiment with variations';
  }

  /**
   * Track format performance over time
   */
  static async recordFormatPerformance(
    creatorId: string,
    format: string,
    platform: string,
    views: number,
    engagement: number
  ): Promise<void> {
    await supabase.from('format_effectiveness').upsert(
      {
        creator_id: creatorId,
        format_type: format,
        platform,
        sample_size: 1,
        average_views: views,
        average_engagement_rate: engagement,
        confidence_score: 0.7,
      },
      { onConflict: 'creator_id,format_type,platform' }
    );
  }
}

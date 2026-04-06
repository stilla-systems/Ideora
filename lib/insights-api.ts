// Weekly Insights API - Mock data structure ready for backend integration
export interface WorkedItem {
  id: string;
  title: string;
  description: string;
  platform: string;
  engagement: number;
  views: number;
  icon: string;
}

export interface EngagementPattern {
  id: string;
  title: string;
  description: string;
  metric: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
}

export interface CompetitorHighlight {
  id: string;
  name: string;
  platform: string;
  strategy: string;
  engagement: number;
  viewerIncrease: number;
  topContent: string;
}

export interface RecommendedTrend {
  id: string;
  position: number;
  title: string;
  description: string;
  platform: string;
  confidenceScore: number;
  expectedEngagement: string;
  icon: string;
}

export interface WeeklyInsights {
  weekOf: string;
  generatedAt: string;
  whatWorked: WorkedItem[];
  engagementPatterns: EngagementPattern[];
  competitorHighlights: CompetitorHighlight[];
  nextWeekTrends: RecommendedTrend[];
}

// Mock data - Replace with actual API calls to your backend
export async function fetchWeeklyInsights(): Promise<WeeklyInsights> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    weekOf: 'January 20-26, 2026',
    generatedAt: new Date().toISOString(),
    whatWorked: [
      {
        id: '1',
        title: 'Trending Audio Challenge',
        description: 'Video series using the viral audio from last week got exceptional response',
        platform: 'TikTok',
        engagement: 92,
        views: 125400,
        icon: '🎵',
      },
      {
        id: '2',
        title: '10-Minute Tutorial Format',
        description: 'Shorter educational content outperformed longer deep-dives this week',
        platform: 'YouTube',
        engagement: 87,
        views: 45200,
        icon: '🎓',
      },
      {
        id: '3',
        title: 'Behind-the-Scenes Stories',
        description: 'Authentic BTS content had the highest save and share rate across platform',
        platform: 'Threads',
        engagement: 85,
        views: 18900,
        icon: '🎬',
      },
    ],
    engagementPatterns: [
      {
        id: '1',
        title: 'Peak Engagement Time',
        description: 'Content posted between 6-8 PM gets 45% more engagement',
        metric: '6-8 PM',
        change: 45,
        trend: 'up',
        icon: '⏰',
      },
      {
        id: '2',
        title: 'Hook Effectiveness',
        description: 'First 2 seconds are critical - hooks with strong visuals outperform text',
        metric: '+35% CTR',
        change: 35,
        trend: 'up',
        icon: '🎣',
      },
      {
        id: '3',
        title: 'Call-to-Action Impact',
        description: 'Direct CTAs get 2.3x more comments than subtle engagement prompts',
        metric: '2.3x',
        change: 130,
        trend: 'up',
        icon: '📢',
      },
    ],
    competitorHighlights: [
      {
        id: '1',
        name: 'CreativeStudio.co',
        platform: 'TikTok',
        strategy: 'Using trending sounds with consistent visual branding',
        engagement: 8.5,
        viewerIncrease: 23000,
        topContent: 'Design tutorials with trending audio',
      },
      {
        id: '2',
        name: 'TechMastery',
        platform: 'YouTube',
        strategy: 'Educational content with detailed production value',
        engagement: 7.2,
        viewerIncrease: 15600,
        topContent: 'Advanced tech breakdowns',
      },
      {
        id: '3',
        name: 'LifeWithEva',
        platform: 'Instagram/Threads',
        strategy: 'Community-focused storytelling and daily updates',
        engagement: 6.8,
        viewerIncrease: 9200,
        topContent: 'Day-in-the-life content',
      },
    ],
    nextWeekTrends: [
      {
        id: '1',
        position: 1,
        title: 'AI Tool Tutorials',
        description:
          'AI-generated content creation is trending. Users want to learn new tools. Combine this with trending sounds for maximum reach.',
        platform: 'YouTube & TikTok',
        confidenceScore: 94,
        expectedEngagement: '9-11M views potential',
        icon: '🤖',
      },
      {
        id: '2',
        position: 2,
        title: 'Micro-Lifestyle Content',
        description:
          'Short clips about productivity hacks and lifestyle tips are gaining momentum. Audience loves relatable, actionable content.',
        platform: 'TikTok & Threads',
        confidenceScore: 88,
        expectedEngagement: '6-8M views potential',
        icon: '✨',
      },
      {
        id: '3',
        position: 3,
        title: 'Collab Series',
        description:
          'Creator collaborations and duets are seeing 3x engagement. Partner with 2-3 creators in your niche for maximum impact.',
        platform: 'TikTok & Instagram',
        confidenceScore: 85,
        expectedEngagement: '5-7M views potential',
        icon: '🤝',
      },
    ],
  };
}

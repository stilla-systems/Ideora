// API service - Connect to your n8n workflows
export interface DailyRecommendation {
  id: string;
  platform: string;
  whatToPost: string;
  hookDirection: string;
  whyMatters: string;
}

export interface TrendsResponse {
  daily_recommendations: DailyRecommendation[];
  weekly_insight: null | object;
}

export interface TrendRecommendation {
  id: string;
  postIdea: string;
  hook: string;
  caption: string;
  hashtagOrSound: string;
  engagementReason: string;
  platform: 'TikTok' | 'YouTube' | 'X' | 'Threads' | 'Facebook';
  niche: string;
  engagement: number;
  trend: 'up' | 'down' | 'stable';
  platformIcon: string;
  createdAt: string;
}

export interface InsightData {
  id: string;
  week: string;
  platform: string;
  views: number;
  engagement: number;
  growthRate: number;
  topContent: string;
}

// Mock data - Replace with actual API calls to n8n
const mockTrends: TrendRecommendation[] = [
  {
    id: '1',
    postIdea: 'Dance Challenge with Trending Audio',
    hook: '"This trending dance has 2.5M views - let me try it"',
    caption: 'POV: You just discovered the viral dance everyone is doing 💃✨ #FYP #ForYou #DanceChallenge',
    hashtagOrSound: 'That Trending Sound from TikTok Viral Moment',
    engagementReason: 'Combines trending audio with audience participation - proven 3x higher engagement rate',
    platform: 'TikTok',
    niche: 'Entertainment',
    engagement: 85,
    trend: 'up',
    platformIcon: '🎵',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    postIdea: 'AI Art Tool Tutorial (Step-by-Step)',
    hook: '"I create AI art with just 3 prompts - here is how"',
    caption: 'Step-by-step guide to creating stunning AI art in under 5 minutes. No expensive software needed! Full workflow in the description.',
    hashtagOrSound: '#AIArt #Tutorial #CreatorTools #AIDesign',
    engagementReason: 'Educational content with practical value drives watch time and subscriber growth',
    platform: 'YouTube',
    niche: 'Education',
    engagement: 92,
    trend: 'up',
    platformIcon: '🎨',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    postIdea: 'Hot Takes on Trending News Topic',
    hook: '"Everyone is saying this, but here is the unpopular opinion"',
    caption: 'Exploring the real story behind today\'s trending topic. What do you think? Reply in the comments.',
    hashtagOrSound: '#HotTake #News #Discussion #MustRead',
    engagementReason: 'Controversial opinions spark 5x more replies and retweets on X',
    platform: 'X',
    niche: 'News & Opinion',
    engagement: 78,
    trend: 'up',
    platformIcon: '🔥',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    postIdea: 'BTS Content - Studio/Office Day',
    hook: '"Day in my life creating content nobody sees"',
    caption: 'Real behind-the-scenes of how we produce content daily. The unglamorous side of creating. #CreatorLife #BehindTheScenes',
    hashtagOrSound: '#DayInMyLife #CreatorBTS #Authentic',
    engagementReason: 'Authentic BTS content creates parasocial connection - highest save/share rate',
    platform: 'Threads',
    niche: 'Creator Content',
    engagement: 88,
    trend: 'up',
    platformIcon: '🎬',
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    postIdea: 'Community Story - User Success',
    hook: '"One of our community members just hit 1M followers"',
    caption: 'Celebrating our amazing community. Share your wins in the comments! Every journey matters to us.',
    hashtagOrSound: '#CommunityFirst #Success #Together #Celebrate',
    engagementReason: 'Community-focused stories generate 2x engagement and strengthen follower loyalty',
    platform: 'Facebook',
    niche: 'Community',
    engagement: 72,
    trend: 'stable',
    platformIcon: '👥',
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    postIdea: '10-Minute Wellness Routine',
    hook: '"This 10-minute routine changed my entire week"',
    caption: 'Simple daily wellness routine anyone can do. No equipment needed. Full video includes breathing exercises and meditation tips.',
    hashtagOrSound: '#Wellness #DailyRoutine #MentalHealth #SelfCare',
    engagementReason: 'Self-improvement content has 40% higher watch-through rate and builds loyal audience',
    platform: 'YouTube',
    niche: 'Wellness',
    engagement: 89,
    trend: 'up',
    platformIcon: '🧘',
    createdAt: new Date().toISOString(),
  },
  {
    id: '7',
    postIdea: 'Trending Sound with Comedy Skit',
    hook: '"When you try to be professional but..."',
    caption: 'Relatable comedy about the gap between expectation and reality 😅 #Comedy #Relatable #FYP',
    hashtagOrSound: 'That Viral Comedy Sound Everyone Uses',
    engagementReason: 'Humor combined with trending sounds gets pushed by algorithm - 150K+ average views',
    platform: 'TikTok',
    niche: 'Comedy',
    engagement: 94,
    trend: 'up',
    platformIcon: '😂',
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    postIdea: 'Product Review - New Tech Gadget',
    hook: '"I tested this new device for 7 days, here is the truth"',
    caption: 'Honest review of the latest tech gadget. Pros, cons, and whether it is worth your money. Affiliate link in description.',
    hashtagOrSound: '#ProductReview #TechGadget #Honest #Worth',
    engagementReason: 'Review content drives high engagement and click-through - strong monetization potential',
    platform: 'YouTube',
    niche: 'Technology',
    engagement: 85,
    trend: 'up',
    platformIcon: '📱',
    createdAt: new Date().toISOString(),
  },
];

const mockInsights: InsightData[] = [
  {
    id: '1',
    week: 'Week 1-7 Jan 2024',
    platform: 'TikTok',
    views: 125000,
    engagement: 8500,
    growthRate: 23,
    topContent: '#DanceChallenge2024 - 45K engagement',
  },
  {
    id: '2',
    week: 'Week 1-7 Jan 2024',
    platform: 'YouTube',
    views: 89000,
    engagement: 12500,
    growthRate: 18,
    topContent: 'AI Art Tutorials - 8.5K likes',
  },
  {
    id: '3',
    week: 'Week 1-7 Jan 2024',
    platform: 'X',
    views: 56000,
    engagement: 3200,
    growthRate: 12,
    topContent: 'Podcast Commentary - 2.1K retweets',
  },
  {
    id: '4',
    week: 'Week 1-7 Jan 2024',
    platform: 'Threads',
    views: 98000,
    engagement: 7600,
    growthRate: 28,
    topContent: 'Behind-the-Scenes - 4.2K likes',
  },
  {
    id: '5',
    week: 'Week 1-7 Jan 2024',
    platform: 'Facebook',
    views: 145000,
    engagement: 6800,
    growthRate: 15,
    topContent: 'Community Stories - 3.1K reactions',
  },
];

// N8n Webhook Integration
export async function fetchDailyTrends(
  userId: string,
  niches: string[],
  platforms: string[]
): Promise<{ recommendations: DailyRecommendation[]; error?: string }> {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('[Dashboard] N8N webhook URL not configured');
    return {
      recommendations: [],
      error: 'Unable to fetch trends at this time. Please try again.',
    };
  }

  try {
    const payload = {
      user_id: userId,
      selected_niches: niches,
      selected_platforms: platforms,
      request_type: 'daily',
      plan_type: 'starter',
      delivery_mode: 'dashboard',
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        recommendations: [],
        error: 'Unable to fetch trends at this time. Please try again.',
      };
    }

    const data: TrendsResponse = await response.json();
    return {
      recommendations: data.daily_recommendations || [],
    };
  } catch {
    console.error('[Dashboard] Error fetching trends');
    return {
      recommendations: [],
      error: 'Unable to fetch trends at this time. Please try again.',
    };
  }
}

// API functions
export async function fetchTrendRecommendations(): Promise<TrendRecommendation[]> {
  // TODO: Replace with actual API call to n8n workflow
  // const response = await fetch('YOUR_N8N_WEBHOOK_URL/trends');
  // return response.json();
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTrends), 500);
  });
}

export async function fetchWeeklyInsights(): Promise<InsightData[]> {
  // TODO: Replace with actual API call to n8n workflow
  // const response = await fetch('YOUR_N8N_WEBHOOK_URL/insights');
  // return response.json();
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockInsights), 500);
  });
}

export async function updateTrendStatus(trendId: string, status: string): Promise<void> {
  // TODO: Replace with actual API call to n8n workflow
  // const response = await fetch(`YOUR_N8N_WEBHOOK_URL/trends/${trendId}`, {
  //   method: 'PUT',
  //   body: JSON.stringify({ status }),
  // });
  
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  });
}

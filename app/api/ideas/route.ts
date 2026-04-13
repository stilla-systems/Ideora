import { NextRequest, NextResponse } from 'next/server';

const IDEAS = [
  {
    id: '1',
    title: 'AI Fails Compilation: When ChatGPT Gets It Wrong',
    category: 'Entertainment',
    score: 94,
    platform: 'TikTok & YouTube',
    hook: '"I asked AI to help me code and it literally crashed my computer"',
    body: 'Show real-time reactions, developer friends testing, screen recording of the fail',
    cta: '"Comment your worst AI fail below"',
    predictedViews: '1.2M–2.8M',
    trend: 'Hot',
    tags: ['AI', 'Comedy', 'Viral'],
  },
  {
    id: '2',
    title: '5 Productivity Hacks That Saved Me 3 Hours Daily',
    category: 'Educational',
    score: 88,
    platform: 'YouTube & Threads',
    hook: '"I wasted years doing it the hard way — here\'s what changed everything"',
    body: 'Walk through each hack with screen recordings and before/after metrics',
    cta: '"Which hack will you try first? Reply below"',
    predictedViews: '800K–1.5M',
    trend: 'Rising',
    tags: ['Productivity', 'Tutorial', 'Lifestyle'],
  },
  {
    id: '3',
    title: 'Day in My Life as a 6-Figure Creator',
    category: 'Personal',
    score: 83,
    platform: 'TikTok & Instagram',
    hook: '"Nobody shows you the boring parts of being a full-time creator"',
    body: 'Raw BTS footage: emails, editing, calls, failures — keep it authentic',
    cta: '"What surprised you most? Drop it in the comments"',
    predictedViews: '600K–1.1M',
    trend: 'Steady',
    tags: ['CreatorLife', 'BTS', 'Authentic'],
  },
  {
    id: '4',
    title: 'React vs Next.js in 60 Seconds',
    category: 'Educational',
    score: 79,
    platform: 'YouTube Shorts & X',
    hook: '"You\'ve been choosing the wrong framework — here\'s why"',
    body: 'Side-by-side comparison: performance, DX, use cases — rapid fire style',
    cta: '"Which do you use? Vote in the poll"',
    predictedViews: '400K–900K',
    trend: 'Rising',
    tags: ['Tech', 'Dev', 'Tutorial'],
  },
  {
    id: '5',
    title: 'Trending Sound Challenge: Your Niche Twist',
    category: 'Trending',
    score: 91,
    platform: 'TikTok & Instagram Reels',
    hook: 'Lead with the trending sound, cut immediately to your niche twist at 1s',
    body: 'Use current #1 trending audio on TikTok, overlay your niche content',
    cta: '"Duet this with your version!"',
    predictedViews: '900K–2.1M',
    trend: 'Hot',
    tags: ['Trending', 'Challenge', 'Viral'],
  },
  {
    id: '6',
    title: 'What I Wish I Knew Before Starting on TikTok',
    category: 'Personal',
    score: 76,
    platform: 'TikTok & YouTube',
    hook: '"3 years and 200K followers later — here\'s what actually works"',
    body: 'Honest advice: what failed, what worked, common beginner mistakes',
    cta: '"Save this for when you feel like quitting"',
    predictedViews: '350K–700K',
    trend: 'Steady',
    tags: ['Creator', 'Advice', 'Growth'],
  },
  {
    id: '7',
    title: '#DeInfluencing: Stop Buying This',
    category: 'Trending',
    score: 85,
    platform: 'TikTok',
    hook: '"Everyone told you to buy this. I\'m here to tell you not to"',
    body: 'Review 3–5 overhyped products, give honest alternatives',
    cta: '"What overhyped product do you regret buying?"',
    predictedViews: '500K–1.2M',
    trend: 'Rising',
    tags: ['DeInfluencing', 'Honest', 'Review'],
  },
  {
    id: '8',
    title: 'Micro-Habit That Changed My Morning',
    category: 'Educational',
    score: 72,
    platform: 'Threads & Instagram',
    hook: '"One 5-minute habit. 90-day streak. Here\'s what happened"',
    body: 'Show the habit, daily tracking montage, measurable results at 30/60/90 days',
    cta: '"Starting tomorrow — who\'s joining me?"',
    predictedViews: '280K–550K',
    trend: 'Steady',
    tags: ['Habits', 'Wellness', 'SelfImprovement'],
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const limit = parseInt(searchParams.get('limit') || '8', 10);

  // If N8N is configured, try to fetch from it
  const n8nUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  if (n8nUrl) {
    try {
      const response = await fetch(`${n8nUrl}/ideas`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000),
      });
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ success: true, ideas: data.ideas || [], source: 'n8n' });
      }
    } catch {
      // Fall through to mock data
    }
  }

  // Serve mock data
  let filtered = [...IDEAS];
  if (category && category !== 'All') {
    filtered = IDEAS.filter((i) => i.category === category);
  }
  filtered = filtered.slice(0, limit);

  return NextResponse.json({ success: true, ideas: filtered, source: 'mock' });
}

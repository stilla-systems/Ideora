import { NextRequest, NextResponse } from 'next/server';

const MOCK_TRENDS = [
  {
    id: '1',
    title: '#AIFails',
    description: 'Compilations of AI tools making hilarious or surprising mistakes',
    platform: 'TikTok',
    velocity: 94,
    direction: 'up',
    changePercent: 47,
    estimatedPeak: '2–3 days',
    contentType: 'Short-form video',
    difficulty: 'Easy',
  },
  {
    id: '2',
    title: 'Slow Productivity',
    description: 'Anti-hustle content focused on sustainable work habits and rest',
    platform: 'YouTube',
    velocity: 81,
    direction: 'up',
    changePercent: 29,
    estimatedPeak: '5–7 days',
    contentType: 'Long-form & Shorts',
    difficulty: 'Medium',
  },
  {
    id: '3',
    title: '#DeInfluencing',
    description: 'Creators telling audiences NOT to buy certain products — authenticity trend',
    platform: 'TikTok',
    velocity: 76,
    direction: 'up',
    changePercent: 21,
    estimatedPeak: '3–5 days',
    contentType: 'Short-form video',
    difficulty: 'Easy',
  },
  {
    id: '4',
    title: 'Ambient Work Videos',
    description: 'Background-style content for studying or working — ASMR meets productivity',
    platform: 'YouTube',
    velocity: 69,
    direction: 'stable',
    changePercent: 4,
    estimatedPeak: '7–14 days',
    contentType: 'Long-form',
    difficulty: 'Hard',
  },
  {
    id: '5',
    title: 'Creator Behind-the-Scenes',
    description: 'Raw, unfiltered look at how creators actually build their business',
    platform: 'Threads',
    velocity: 64,
    direction: 'up',
    changePercent: 18,
    estimatedPeak: '4–6 days',
    contentType: 'Text & video',
    difficulty: 'Easy',
  },
  {
    id: '6',
    title: 'Nostalgia Tech Reviews',
    description: 'Reviewing old gadgets, software, and platforms people forgot about',
    platform: 'YouTube',
    velocity: 58,
    direction: 'down',
    changePercent: 12,
    estimatedPeak: 'Fading',
    contentType: 'Long-form',
    difficulty: 'Medium',
  },
  {
    id: '7',
    title: '#OutfitOfTheDay',
    description: 'Fashion content with strong algorithmic push on visual platforms',
    platform: 'Instagram',
    velocity: 72,
    direction: 'stable',
    changePercent: 7,
    estimatedPeak: 'Evergreen',
    contentType: 'Reels & Posts',
    difficulty: 'Easy',
  },
  {
    id: '8',
    title: 'X Thread Breakdowns',
    description: 'Short-form summaries of viral X threads turned into video content',
    platform: 'X',
    velocity: 55,
    direction: 'up',
    changePercent: 14,
    estimatedPeak: '1–2 days',
    contentType: 'Short-form video',
    difficulty: 'Easy',
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get('platform');

  // If N8N is configured, try to fetch live trends from it
  const n8nUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
  if (n8nUrl) {
    try {
      const response = await fetch(`${n8nUrl}/trends`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(5000),
      });
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({ success: true, trends: data.trends || [], source: 'n8n' });
      }
    } catch {
      // Fall through to mock data
    }
  }

  // Serve mock data with optional platform filter
  let filtered = [...MOCK_TRENDS];
  if (platform && platform !== 'All') {
    filtered = MOCK_TRENDS.filter((t) => t.platform === platform);
  }

  return NextResponse.json({ success: true, trends: filtered, source: 'mock' });
}

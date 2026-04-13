'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';

const PLATFORMS = ['All', 'TikTok', 'YouTube', 'X', 'Threads', 'Instagram'];

const TRENDS = [
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

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Hard: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function TrendRadarPage() {
  const [activePlatform, setActivePlatform] = useState('All');

  const filtered =
    activePlatform === 'All' ? TRENDS : TRENDS.filter((t) => t.platform === activePlatform);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Trend Radar</h1>
              <p className="mt-1 text-foreground/60 text-sm">Live trend signals across all platforms</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 w-fit">
              <Flame className="h-4 w-4 text-red-400" />
              <span className="text-xs text-red-400 font-medium">2 Hot Trends Active</span>
            </div>
          </div>

          {/* Platform Filter */}
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                onClick={() => setActivePlatform(p)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                  activePlatform === p
                    ? 'bg-pink-600 text-white border-pink-600'
                    : 'bg-white/5 text-foreground/60 border-white/10 hover:bg-white/10 hover:text-foreground'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Trends List */}
          <div className="space-y-3">
            {filtered.map((trend, i) => (
              <Card
                key={trend.id}
                className="border border-white/10 bg-card p-4 sm:p-5 hover:border-pink-500/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Rank + Direction */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-foreground/50">
                      {i + 1}
                    </div>
                    <div>
                      {trend.direction === 'up' && (
                        <TrendingUp className="h-5 w-5 text-green-400" />
                      )}
                      {trend.direction === 'down' && (
                        <TrendingDown className="h-5 w-5 text-red-400" />
                      )}
                      {trend.direction === 'stable' && (
                        <Minus className="h-5 w-5 text-yellow-400" />
                      )}
                    </div>
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{trend.title}</h3>
                      <Badge variant="outline" className="text-[10px] border-white/10 text-foreground/50">
                        {trend.platform}
                      </Badge>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-medium border ${DIFFICULTY_COLORS[trend.difficulty]}`}
                      >
                        {trend.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-foreground/60 line-clamp-1">{trend.description}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-[10px] text-foreground/40">
                      <span>Content: <span className="text-foreground/60">{trend.contentType}</span></span>
                      <span>Peak window: <span className="text-foreground/60">{trend.estimatedPeak}</span></span>
                    </div>
                  </div>

                  {/* Velocity Bar */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-xl font-bold text-cyan-400">{trend.velocity}</div>
                      <p className="text-[10px] text-foreground/40 font-mono">VELOCITY</p>
                    </div>
                    <div className="w-1 h-12 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="w-full bg-gradient-to-t from-cyan-500 to-violet-500 rounded-full transition-all"
                        style={{ height: `${trend.velocity}%` }}
                      />
                    </div>
                    <div
                      className={`text-xs font-semibold ${
                        trend.direction === 'up'
                          ? 'text-green-400'
                          : trend.direction === 'down'
                          ? 'text-red-400'
                          : 'text-yellow-400'
                      }`}
                    >
                      {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}
                      {trend.changePercent}%
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import React from 'react';
import { OpportunityCard, Opportunity } from './opportunity-card';
import { AlertCircle, Zap, TrendingUp, Globe, Clock, ArrowUpRight, Flame, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// ─── MOCK DATA ─────────────────────────────────────────────────────────────────

const opportunities: Opportunity[] = [
  {
    id: '1',
    trendTitle: 'AI vs Human Creator Challenge',
    region: 'Global',
    niche: 'Tech / AI',
    momentumScore: 94,
    saturationLevel: 'Low',
    whyTrending: 'Growing creator anxiety around AI displacement is generating massive empathy-driven engagement. First-mover advantage still exists — fewer than 200 creators have posted this angle.',
    suggestedAngle: "I let AI run my channel for 7 days — here's what happened to my views",
    bestPlatform: 'YouTube',
    bestFormat: 'Short-form (60s)',
    postingWindow: 'Today 6–9 PM',
    difficulty: 'Easy',
    confidenceScore: 91,
    hook: '"AI took over my channel and nobody noticed for 3 days"',
  },
  {
    id: '2',
    trendTitle: '#UnfilteredTech Rising',
    region: 'US & UK',
    niche: 'Technology',
    momentumScore: 87,
    saturationLevel: 'Low',
    whyTrending: 'Anti-polish aesthetic is outperforming production-heavy content 3:1. Audiences reward raw authenticity signals over expensive production.',
    suggestedAngle: "The most honest review of [product] you'll find — filmed on my phone",
    bestPlatform: 'TikTok',
    bestFormat: 'Raw Video (30–90s)',
    postingWindow: 'Today 7–10 PM',
    difficulty: 'Easy',
    confidenceScore: 88,
    hook: '"I\'m done pretending this product is good"',
  },
  {
    id: '3',
    trendTitle: 'Day-in-the-Life: Creator Income Reveal',
    region: 'Global',
    niche: 'Creator Economy',
    momentumScore: 82,
    saturationLevel: 'Medium',
    whyTrending: 'Income transparency content is generating 4–6x normal save rates as aspiring creators seek benchmarks. The finance-creator crossover is peaking.',
    suggestedAngle: 'How I made $12K last month creating content for 3 hours/day',
    bestPlatform: 'Instagram',
    bestFormat: 'Carousel + Reel',
    postingWindow: 'Tomorrow 8 AM',
    difficulty: 'Medium',
    confidenceScore: 84,
    hook: '"I finally revealed my creator income and this happened"',
  },
  {
    id: '4',
    trendTitle: 'Silent Walk Trend + Productivity Hook',
    region: 'North America',
    niche: 'Wellness / Productivity',
    momentumScore: 79,
    saturationLevel: 'Low',
    whyTrending: 'Silent walking is crossing over from wellness into productivity/focus content. Early adopters in business niches are seeing 200% above average retention.',
    suggestedAngle: 'I replaced my morning podcast with silence for 30 days — here\'s what changed',
    bestPlatform: 'TikTok',
    bestFormat: 'Vlog Style (60s)',
    postingWindow: 'Tomorrow 6–8 AM',
    difficulty: 'Easy',
    confidenceScore: 81,
    hook: '"I stopped consuming content during my walk — my brain changed"',
  },
  {
    id: '5',
    trendTitle: 'Behind the Algorithm: Creator Secrets',
    region: 'Global',
    niche: 'Creator Education',
    momentumScore: 76,
    saturationLevel: 'Medium',
    whyTrending: 'Meta-content about the algorithm itself is outperforming regular tutorials. Audiences want to understand the game they\'re playing.',
    suggestedAngle: 'The 3 things TikTok\'s algorithm rewards that nobody talks about',
    bestPlatform: 'X',
    bestFormat: 'Thread (10+ posts)',
    postingWindow: 'Today 11 AM–2 PM',
    difficulty: 'Easy',
    confidenceScore: 79,
    hook: '"I analyzed 500 viral videos. Here\'s the pattern nobody shares"',
  },
];

const breakingNow = [
  { id: '1', label: '#AIArt', delta: '+340%', platform: 'TikTok', hot: true },
  { id: '2', label: 'Creator Burnout', delta: '+218%', platform: 'X', hot: true },
  { id: '3', label: 'Quiet Luxury', delta: '+156%', platform: 'Instagram', hot: false },
  { id: '4', label: 'Short-form Podcasts', delta: '+134%', platform: 'YouTube', hot: false },
  { id: '5', label: '#MorningRoutine', delta: '+112%', platform: 'TikTok', hot: false },
];

const liveAlerts = [
  {
    id: '1',
    type: 'URGENT' as const,
    message: 'TikTok algorithm favoring ≤45s videos this week — trim your content',
    icon: AlertCircle,
    color: 'red',
  },
  {
    id: '2',
    type: 'OPPORTUNITY' as const,
    message: '#AIFails is gaining 40K searches/hour on YouTube Shorts',
    icon: Zap,
    color: 'amber',
  },
  {
    id: '3',
    type: 'SIGNAL' as const,
    message: 'Your audience is most active Friday 8–10 PM — plan accordingly',
    icon: TrendingUp,
    color: 'emerald',
  },
];

const watchlist = [
  { topic: 'AI & Automation', change: '+12%', trending: true },
  { topic: 'Quiet Luxury', change: '+8%', trending: true },
  { topic: 'Creator Finance', change: '+5%', trending: true },
  { topic: 'Stoicism', change: '-2%', trending: false },
];

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-mono font-bold text-gray-500 tracking-widest uppercase">
        {children}
      </span>
      <div className="flex-1 h-px bg-white/[0.04]" />
    </div>
  );
}

function DailyBrief() {
  return (
    <div
      className="rounded-xl border border-white/[0.06] p-5 backdrop-blur-sm"
      style={{ background: 'rgba(255,255,255,0.015)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Globe className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-xs font-mono text-cyan-400 tracking-wider">DAILY BRIEF</span>
        <span className="ml-auto text-xs font-mono text-gray-600">Apr 17, 2026</span>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">
        AI content is dominating discovery feeds globally. Authenticity-first formats are outperforming polished production across TikTok and YouTube Shorts. Creator economy discourse is peaking on X — income transparency threads are generating 4–8x normal engagement. Post in the next 6 hours to capture Thursday's prime window.
      </p>
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.05]">
        <span className="text-xs text-gray-600">Niches in focus:</span>
        {['AI', 'Wellness', 'Finance', 'Creator Life'].map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-gray-400">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function BreakingNow() {
  return (
    <div
      className="rounded-xl border border-white/[0.06] p-5 backdrop-blur-sm"
      style={{ background: 'rgba(255,255,255,0.015)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Flame className="w-3.5 h-3.5 text-orange-400" />
        <span className="text-xs font-mono text-orange-400 tracking-wider">BREAKING NOW</span>
        <div className="flex items-center gap-1 ml-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-xs font-mono text-gray-600">LIVE</span>
        </div>
      </div>
      <div className="space-y-2">
        {breakingNow.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0"
          >
            <div className="flex items-center gap-2">
              {item.hot && (
                <Flame className="w-3 h-3 text-orange-400 flex-shrink-0" />
              )}
              <span className="text-sm text-white font-medium">{item.label}</span>
              <span className="text-xs text-gray-600">{item.platform}</span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">{item.delta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveSignals() {
  const colorMap = {
    red: { border: 'border-red-500/20', bg: 'bg-red-500/8', label: 'text-red-400', text: 'text-red-400' },
    amber: { border: 'border-amber-500/20', bg: 'bg-amber-500/8', label: 'text-amber-400', text: 'text-amber-400' },
    emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/8', label: 'text-emerald-400', text: 'text-emerald-400' },
  };

  return (
    <div
      className="rounded-xl border border-white/[0.06] p-5 backdrop-blur-sm"
      style={{ background: 'rgba(255,255,255,0.015)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-xs font-mono text-gray-500 tracking-wider">LIVE SIGNALS</span>
      </div>
      <div className="space-y-2.5">
        {liveAlerts.map(({ id, type, message, icon: Icon, color }) => {
          const c = colorMap[color as keyof typeof colorMap];
          return (
            <div
              key={id}
              className={`flex gap-3 p-3 rounded-lg border ${c.border}`}
              style={{ background: color === 'red' ? 'rgba(239,68,68,0.05)' : color === 'amber' ? 'rgba(245,158,11,0.05)' : 'rgba(16,185,129,0.05)' }}
            >
              <Icon className={`w-3.5 h-3.5 ${c.label} flex-shrink-0 mt-0.5`} />
              <div>
                <p className={`text-xs font-mono font-bold ${c.label} mb-0.5`}>{type}</p>
                <p className="text-xs text-gray-400 leading-snug">{message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Watchlist() {
  return (
    <div
      className="rounded-xl border border-white/[0.06] p-5 backdrop-blur-sm"
      style={{ background: 'rgba(255,255,255,0.015)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-3.5 h-3.5 text-gray-500" />
        <span className="text-xs font-mono text-gray-500 tracking-wider">WATCHLIST</span>
        <span className="ml-auto text-xs font-mono text-gray-700 hover:text-gray-500 cursor-pointer transition-colors">
          EDIT
        </span>
      </div>
      <div className="space-y-2">
        {watchlist.map(({ topic, change, trending }) => (
          <div
            key={topic}
            className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0"
          >
            <span className="text-sm text-gray-300">{topic}</span>
            <div className="flex items-center gap-2">
              {trending && <TrendingUp className="w-3 h-3 text-emerald-400" />}
              <span className={`text-xs font-mono font-bold ${trending ? 'text-emerald-400' : 'text-red-400'}`}>
                {change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PostingReminder() {
  return (
    <div
      className="rounded-xl border border-cyan-500/15 p-4 backdrop-blur-sm"
      style={{
        background: 'rgba(0,217,255,0.03)',
        boxShadow: '0 0 20px rgba(0,217,255,0.04)',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <Clock className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-xs font-mono text-cyan-400 tracking-wider">NEXT PEAK WINDOW</span>
      </div>
      <p className="text-xl font-bold text-white mb-0.5">Today, 7:45 PM</p>
      <p className="text-xs text-gray-500 mb-3">Thursday • Prime engagement window for your niche</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: '68%', background: 'linear-gradient(90deg, #00D9FF55, #00D9FF)' }}
          />
        </div>
        <span className="text-xs font-mono text-cyan-400">6h 12m</span>
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ────────────────────────────────────────────────────────────────

export function GrowthCommandCenter() {
  const featuredOpp = opportunities[0];
  const gridOpps = opportunities.slice(1);

  return (
    <div className="flex gap-6 h-full">
      {/* ── Main scroll area ── */}
      <div className="flex-1 min-w-0 space-y-8 overflow-auto">
        {/* Greeting header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-gray-500 tracking-widest">INTELLIGENCE READY</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            Here's your edge for today.
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {opportunities.length} high-impact opportunities detected across your niches
          </p>
        </div>

        {/* TODAY'S OPPORTUNITIES */}
        <div>
          <SectionLabel>
            <span className="flex items-center gap-2">
              Today's Opportunities
              <Badge
                variant="outline"
                className="text-xs font-mono border-cyan-500/25 bg-cyan-500/10 text-cyan-400 px-1.5 py-0 h-4"
              >
                {opportunities.length}
              </Badge>
            </span>
          </SectionLabel>

          {/* Featured card */}
          <div className="mb-4">
            <OpportunityCard opportunity={featuredOpp} variant="featured" index={0} />
          </div>

          {/* Grid of compact cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {gridOpps.map((opp, i) => (
              <OpportunityCard key={opp.id} opportunity={opp} variant="compact" index={i} />
            ))}
          </div>
        </div>

        {/* DAILY BRIEF + BREAKING NOW */}
        <div>
          <SectionLabel>Intelligence Feed</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DailyBrief />
            <BreakingNow />
          </div>
        </div>

        {/* SIGNAL EXPLORER placeholder */}
        <div>
          <SectionLabel>Signal Explorer</SectionLabel>
          <div
            className="rounded-xl border border-white/[0.04] p-8 flex items-center justify-center backdrop-blur-sm"
            style={{ background: 'rgba(255,255,255,0.008)' }}
          >
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-gray-700 mx-auto mb-3" />
              <p className="text-sm text-gray-600 font-mono">Deep discovery — coming soon</p>
              <p className="text-xs text-gray-700 mt-1">Explore emerging signals before they peak</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right rail ── */}
      <div className="w-72 flex-shrink-0 space-y-4 overflow-auto">
        <PostingReminder />
        <LiveSignals />
        <Watchlist />
      </div>
    </div>
  );
}

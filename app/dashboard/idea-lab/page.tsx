'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, TrendingUp, RefreshCw, Copy, CheckCheck } from 'lucide-react';

const IDEA_CATEGORIES = ['All', 'Educational', 'Entertainment', 'Trending', 'Personal'];

const IDEAS = [
  {
    id: '1',
    title: 'AI Fails Compilation: When ChatGPT Gets It Wrong',
    category: 'Entertainment',
    score: 94,
    platform: 'TikTok & YouTube',
    hook: '"I asked AI to help me code and it literally crashed my computer"',
    predictedViews: '1.2M–2.8M',
    trend: 'Hot',
  },
  {
    id: '2',
    title: '5 Productivity Hacks That Saved Me 3 Hours Daily',
    category: 'Educational',
    score: 88,
    platform: 'YouTube & Threads',
    hook: '"I wasted years doing it the hard way — here\'s what changed everything"',
    predictedViews: '800K–1.5M',
    trend: 'Rising',
  },
  {
    id: '3',
    title: 'Day in My Life as a 6-Figure Creator',
    category: 'Personal',
    score: 83,
    platform: 'TikTok & Instagram',
    hook: '"Nobody shows you the boring parts of being a full-time creator"',
    predictedViews: '600K–1.1M',
    trend: 'Steady',
  },
  {
    id: '4',
    title: 'React vs Next.js in 60 Seconds',
    category: 'Educational',
    score: 79,
    platform: 'YouTube Shorts & X',
    hook: '"You\'ve been choosing the wrong framework — here\'s why"',
    predictedViews: '400K–900K',
    trend: 'Rising',
  },
  {
    id: '5',
    title: 'Trending Sound Challenge: [Current Viral Audio]',
    category: 'Trending',
    score: 91,
    platform: 'TikTok & Instagram Reels',
    hook: 'Lead with the trending sound, cut to your niche twist',
    predictedViews: '900K–2.1M',
    trend: 'Hot',
  },
  {
    id: '6',
    title: 'What I Wish I Knew Before Starting on TikTok',
    category: 'Personal',
    score: 76,
    platform: 'TikTok & YouTube',
    hook: '"3 years and 200K followers later — here\'s what actually works"',
    predictedViews: '350K–700K',
    trend: 'Steady',
  },
];

const TREND_COLORS: Record<string, string> = {
  Hot: 'bg-red-500/20 text-red-400 border-red-500/30',
  Rising: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Steady: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export default function IdeaLabPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered =
    activeCategory === 'All' ? IDEAS : IDEAS.filter((i) => i.category === activeCategory);

  const handleCopy = (idea: (typeof IDEAS)[0]) => {
    navigator.clipboard.writeText(`${idea.title}\nHook: ${idea.hook}`);
    setCopiedId(idea.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Idea Lab</h1>
              <p className="mt-1 text-foreground/60 text-sm">AI-generated content ideas ranked by potential</p>
            </div>
            <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:shadow-lg w-fit gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Ideas
            </Button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {IDEA_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all border ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white border-violet-600'
                    : 'bg-white/5 text-foreground/60 border-white/10 hover:bg-white/10 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Ideas Grid */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((idea) => (
              <Card
                key={idea.id}
                className="border border-white/10 bg-card p-5 flex flex-col gap-3 hover:border-violet-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm leading-snug">{idea.title}</h3>
                    <p className="text-xs text-foreground/50 mt-1">{idea.platform}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold text-cyan-400">{idea.score}</div>
                    <p className="text-[10px] text-foreground/40 font-mono">SCORE</p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-[10px] border-white/10 text-foreground/60">
                    {idea.category}
                  </Badge>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${TREND_COLORS[idea.trend]}`}>
                    {idea.trend}
                  </span>
                </div>

                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p className="text-[10px] font-mono text-foreground/40 mb-1">HOOK</p>
                  <p className="text-xs text-foreground/80 italic">{idea.hook}</p>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <p className="text-[10px] text-foreground/40">Predicted Views</p>
                    <p className="text-xs font-semibold text-green-400">{idea.predictedViews}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs gap-1.5 text-foreground/60 hover:text-foreground"
                      onClick={() => handleCopy(idea)}
                    >
                      {copiedId === idea.id ? (
                        <CheckCheck className="h-3.5 w-3.5 text-green-400" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      {copiedId === idea.id ? 'Copied' : 'Copy'}
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 text-xs gap-1.5 bg-violet-600/20 text-violet-400 hover:bg-violet-600/30 border border-violet-500/30"
                    >
                      <Zap className="h-3.5 w-3.5" />
                      Use
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Stats Footer */}
          <Card className="border border-white/10 bg-card p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-violet-400">6</div>
                <p className="text-xs text-foreground/50">Ideas Generated</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">87</div>
                <p className="text-xs text-foreground/50">Avg. Score</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-pink-400">5</div>
                <p className="text-xs text-foreground/50">Platforms Covered</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400 flex items-center justify-center gap-1">
                  <TrendingUp className="h-5 w-5" />
                  2
                </div>
                <p className="text-xs text-foreground/50">Hot Trends</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

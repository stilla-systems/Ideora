'use client';

import { useState, useMemo } from 'react';
import {
  mockOpportunities,
  scoreColor,
  type ContentOpportunity,
  type Difficulty,
  type ContentFormat,
  type Platform,
} from '@/lib/mock-data';
import {
  LayoutGrid,
  Star,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Copy,
  Zap,
  Clock,
  Users,
  Target,
  TrendingUp,
  Search,
  Filter,
} from 'lucide-react';

const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok',
  youtube: 'YouTube',
  instagram: 'Instagram',
  x: 'X',
  threads: 'Threads',
};

const DIFFICULTY_STYLES: Record<Difficulty, { bg: string; color: string; label: string }> = {
  easy: { bg: 'rgba(16,185,129,0.1)', color: '#10B981', label: 'Easy' },
  medium: { bg: 'rgba(245,158,11,0.1)', color: '#F59E0B', label: 'Medium' },
  hard: { bg: 'rgba(239,68,68,0.1)', color: '#EF4444', label: 'Hard' },
};

const FORMAT_LABELS: Record<ContentFormat, string> = {
  'short-video': 'Short Video',
  'long-video': 'Long Video',
  carousel: 'Carousel',
  thread: 'Thread',
  podcast: 'Podcast',
  reel: 'Reel',
};

function ScoreBadge({ score }: { score: number }) {
  const color = scoreColor(score);
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
      style={{ background: `${color}12`, border: `1px solid ${color}25` }}
    >
      <Star className="w-3.5 h-3.5" style={{ color }} />
      <span className="text-base font-bold" style={{ color }}>{score}</span>
      <span className="text-[10px] font-mono text-slate-500">/100</span>
    </div>
  );
}

function PlatformFitBar({ platform, score }: { platform: string; score: number }) {
  const colors: Record<string, string> = {
    tiktok: '#FF0050', youtube: '#FF0000', instagram: '#E1306C', x: '#1D9BF0', threads: '#888888',
  };
  const color = colors[platform] ?? '#64748B';
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono text-slate-600 w-16 uppercase">{PLATFORM_LABELS[platform as Platform] ?? platform}</span>
      <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-[10px] font-mono text-slate-500 w-8 text-right">{score}%</span>
    </div>
  );
}

function OpportunityCard({ opp }: { opp: ContentOpportunity }) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);
  const diff = DIFFICULTY_STYLES[opp.difficulty];

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: 'rgba(255,255,255,0.018)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Score bar at top */}
      <div
        className="h-0.5"
        style={{
          background: `linear-gradient(90deg, ${scoreColor(opp.score)}, transparent)`,
          opacity: 0.6,
        }}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-[9px] font-mono uppercase tracking-wide px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B' }}
              >
                {opp.category}
              </span>
              <span
                className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                style={{ background: diff.bg, color: diff.color }}
              >
                {diff.label}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white leading-snug">{opp.title}</h3>
            <p className="text-[11px] text-slate-500 mt-1 italic leading-relaxed line-clamp-2">{opp.hook}</p>
          </div>
          <ScoreBadge score={opp.score} />
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-2 py-3 mb-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Users className="w-2.5 h-2.5 text-slate-600" />
              <span className="text-[9px] font-mono text-slate-600 uppercase">Reach</span>
            </div>
            <div className="text-xs font-semibold text-white">{opp.estimatedReach}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <TrendingUp className="w-2.5 h-2.5 text-slate-600" />
              <span className="text-[9px] font-mono text-slate-600 uppercase">Engagement</span>
            </div>
            <div className="text-xs font-semibold" style={{ color: '#10B981' }}>{opp.estimatedEngagement}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Clock className="w-2.5 h-2.5 text-slate-600" />
              <span className="text-[9px] font-mono text-slate-600 uppercase">Time</span>
            </div>
            <div className="text-xs font-semibold text-white">{opp.timeToCreate}</div>
          </div>
        </div>

        {/* Formats */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {opp.formats.map((f) => (
            <span
              key={f}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(0,217,255,0.08)', color: '#00D9FF', border: '1px solid rgba(0,217,255,0.15)' }}
            >
              {FORMAT_LABELS[f]}
            </span>
          ))}
        </div>

        {/* Signal source */}
        <div
          className="rounded-xl px-3 py-2 mb-3 flex items-center gap-2"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <Zap className="w-3 h-3 text-slate-600 flex-shrink-0" />
          <span className="text-[11px] text-slate-500">Signal: <span className="text-slate-300">{opp.signalTopic}</span></span>
        </div>

        {/* Expandable blueprint */}
        <button
          className="w-full flex items-center justify-between py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="font-mono uppercase tracking-wide">Content Blueprint</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {expanded && (
          <div className="space-y-2 mt-1">
            <div
              className="rounded-xl px-3 py-2.5"
              style={{ background: 'rgba(0,217,255,0.05)', border: '1px solid rgba(0,217,255,0.1)' }}
            >
              <p className="text-[9px] font-mono text-slate-500 uppercase mb-1">Hook (0-3s)</p>
              <p className="text-xs text-white leading-relaxed">{opp.hook}</p>
            </div>
            <div
              className="rounded-xl px-3 py-2.5"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-[9px] font-mono text-slate-500 uppercase mb-1">Body</p>
              <p className="text-xs text-slate-300 leading-relaxed">{opp.bodyOutline}</p>
            </div>
            <div
              className="rounded-xl px-3 py-2.5"
              style={{ background: 'rgba(176,38,255,0.05)', border: '1px solid rgba(176,38,255,0.1)' }}
            >
              <p className="text-[9px] font-mono text-slate-500 uppercase mb-1">CTA</p>
              <p className="text-xs text-slate-300 leading-relaxed">{opp.cta}</p>
            </div>

            {/* Platform fit */}
            <div
              className="rounded-xl px-3 py-3"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <p className="text-[9px] font-mono text-slate-500 uppercase mb-2">Platform Fit</p>
              <div className="space-y-1.5">
                {Object.entries(opp.platformFit).map(([p, score]) => (
                  <PlatformFitBar key={p} platform={p} score={score} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <button
            onClick={() => setSaved(!saved)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
            style={{
              background: saved ? 'rgba(0,217,255,0.1)' : 'rgba(255,255,255,0.04)',
              color: saved ? '#00D9FF' : '#64748B',
              border: `1px solid ${saved ? 'rgba(0,217,255,0.2)' : 'rgba(255,255,255,0.06)'}`,
            }}
          >
            <Bookmark className="w-3 h-3" />
            {saved ? 'Saved' : 'Save'}
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', color: '#64748B', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <Copy className="w-3 h-3" />
            Copy Hook
          </button>
          <div className="flex-1" />
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
            style={{
              background: 'linear-gradient(135deg, rgba(0,217,255,0.15), rgba(176,38,255,0.1))',
              color: '#00D9FF',
              border: '1px solid rgba(0,217,255,0.2)',
            }}
          >
            <Target className="w-3 h-3" />
            Use in Lab
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OpportunityGridPage() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all');
  const [platform, setPlatform] = useState<Platform | 'all'>('all');
  const [format, setFormat] = useState<ContentFormat | 'all'>('all');
  const [sortBy, setSortBy] = useState('score');
  const [minScore, setMinScore] = useState(0);

  const filtered = useMemo(() => {
    let list = [...mockOpportunities];
    if (search) list = list.filter((o) => o.title.toLowerCase().includes(search.toLowerCase()) || o.signalTopic.toLowerCase().includes(search.toLowerCase()));
    if (difficulty !== 'all') list = list.filter((o) => o.difficulty === difficulty);
    if (platform !== 'all') list = list.filter((o) => platform in o.platformFit);
    if (format !== 'all') list = list.filter((o) => o.formats.includes(format));
    if (minScore > 0) list = list.filter((o) => o.score >= minScore);
    list.sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'reach') return parseInt(b.estimatedReach.replace(/\D/g, '')) - parseInt(a.estimatedReach.replace(/\D/g, ''));
      if (sortBy === 'engagement') return parseFloat(b.estimatedEngagement) - parseFloat(a.estimatedEngagement);
      return 0;
    });
    return list;
  }, [search, difficulty, platform, format, sortBy, minScore]);

  return (
    <div className="min-h-screen" style={{ background: '#080A1A' }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 px-8 py-4"
        style={{ background: 'rgba(8,10,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(247,37,133,0.15)', border: '1px solid rgba(247,37,133,0.25)' }}>
              <LayoutGrid className="w-4 h-4" style={{ color: '#F72585' }} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Opportunity Grid</h1>
              <p className="text-xs text-slate-500 font-mono">Scored content opportunities ready to execute</p>
            </div>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            <Star className="w-3 h-3" style={{ color: '#10B981' }} />
            <span className="text-xs font-mono" style={{ color: '#10B981' }}>{filtered.length} opportunities</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[200px]"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search opportunities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-white placeholder-slate-600 outline-none flex-1"
            />
          </div>

          {(['all', 'easy', 'medium', 'hard'] as Array<Difficulty | 'all'>).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className="text-xs font-medium px-3 py-2 rounded-xl transition-all"
              style={difficulty === d ? {
                background: 'rgba(0,217,255,0.12)',
                color: '#00D9FF',
                border: '1px solid rgba(0,217,255,0.2)',
              } : {
                background: 'rgba(255,255,255,0.04)',
                color: '#64748B',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {d === 'all' ? 'All' : DIFFICULTY_STYLES[d].label}
            </button>
          ))}

          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform | 'all')}
            className="text-xs rounded-xl px-3 py-2 text-slate-300 outline-none cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <option value="all" style={{ background: '#0D0F23' }}>All Platforms</option>
            {(['tiktok', 'youtube', 'instagram', 'x', 'threads'] as Platform[]).map((p) => (
              <option key={p} value={p} style={{ background: '#0D0F23' }}>{PLATFORM_LABELS[p]}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs rounded-xl px-3 py-2 text-slate-300 outline-none cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <option value="score" style={{ background: '#0D0F23' }}>Sort: Score</option>
            <option value="reach" style={{ background: '#0D0F23' }}>Sort: Reach</option>
            <option value="engagement" style={{ background: '#0D0F23' }}>Sort: Engagement</option>
          </select>
        </div>
      </div>

      {/* Score filter strip */}
      <div className="flex items-center gap-6 px-8 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <span className="text-xs text-slate-600 font-mono">MIN SCORE</span>
        {[0, 70, 80, 85, 90].map((score) => (
          <button
            key={score}
            onClick={() => setMinScore(score)}
            className="text-xs px-2.5 py-1 rounded-full transition-all"
            style={minScore === score ? {
              background: `${scoreColor(score || 75)}15`,
              color: scoreColor(score || 75),
              border: `1px solid ${scoreColor(score || 75)}25`,
            } : {
              background: 'rgba(255,255,255,0.04)',
              color: '#64748B',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {score === 0 ? 'All' : `${score}+`}
          </button>
        ))}
        <div className="ml-auto text-xs text-slate-600 font-mono">{filtered.length} results</div>
      </div>

      {/* Grid */}
      <div className="px-8 py-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <LayoutGrid className="w-10 h-10 text-slate-700 mb-3" />
            <p className="text-slate-400 font-medium">No opportunities match</p>
            <p className="text-slate-600 text-sm mt-1">Adjust your filters to see more</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((opp) => (
              <OpportunityCard key={opp.id} opp={opp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

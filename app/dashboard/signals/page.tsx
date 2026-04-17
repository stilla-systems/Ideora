'use client';

import { useState, useMemo } from 'react';
import {
  mockSignals,
  statusColor,
  velocityLabel,
  type TrendSignal,
  type TrendStatus,
  type Platform,
} from '@/lib/mock-data';
import {
  Radar,
  TrendingUp,
  Filter,
  Search,
  ChevronRight,
  ArrowUpRight,
  Globe,
  Layers,
  Flame,
  Activity,
  Clock,
} from 'lucide-react';

const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok',
  youtube: 'YouTube',
  instagram: 'Instagram',
  x: 'X',
  threads: 'Threads',
};

const STATUS_LABELS: Record<TrendStatus, { label: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }> = {
  emerging: { label: 'Emerging', icon: Activity },
  rising: { label: 'Rising', icon: TrendingUp },
  peak: { label: 'Peak', icon: Flame },
  declining: { label: 'Declining', icon: Clock },
};

const CATEGORIES = ['All', ...Array.from(new Set(mockSignals.map((s) => s.category)))];

const PLATFORMS: Array<Platform | 'all'> = ['all', 'tiktok', 'youtube', 'instagram', 'x', 'threads'];

const STATUSES: Array<TrendStatus | 'all'> = ['all', 'emerging', 'rising', 'peak', 'declining'];

function VelocityBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, background: color }}
      />
    </div>
  );
}

function SaturationIndicator({ value }: { value: number }) {
  const color = value < 35 ? '#10B981' : value < 60 ? '#F59E0B' : '#EF4444';
  const label = value < 35 ? 'Low' : value < 60 ? 'Medium' : 'High';
  return (
    <span
      className="text-[10px] font-mono px-1.5 py-0.5 rounded"
      style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}
    >
      {label} saturation
    </span>
  );
}

function SignalCard({ signal }: { signal: TrendSignal }) {
  const StatusIcon = STATUS_LABELS[signal.status]?.icon ?? Activity;
  const sc = statusColor(signal.status);

  return (
    <div
      className="rounded-2xl p-5 group cursor-pointer transition-all duration-200 hover:translate-y-[-2px]"
      style={{
        background: 'rgba(255,255,255,0.018)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: `${sc}12`, color: sc, border: `1px solid ${sc}22` }}
            >
              <StatusIcon className="w-2.5 h-2.5" />
              {signal.status}
            </span>
            <span className="text-[9px] font-mono text-slate-600 uppercase tracking-wide">{signal.category}</span>
          </div>
          <h3 className="text-sm font-semibold text-white leading-snug">{signal.topic}</h3>
          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">{signal.description}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-bold text-white">{signal.opportunityScore}</div>
          <div className="text-[9px] font-mono text-slate-500 uppercase">opp score</div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-3 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div>
          <div className="text-[10px] text-slate-600 font-mono uppercase mb-0.5">Views</div>
          <div className="text-sm font-semibold text-white">{signal.totalViews}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-600 font-mono uppercase mb-0.5">Growth</div>
          <div className="text-sm font-semibold" style={{ color: '#10B981' }}>{signal.weeklyGrowth}</div>
        </div>
        <div>
          <div className="text-[10px] text-slate-600 font-mono uppercase mb-0.5">Saturation</div>
          <div className="text-sm font-semibold" style={{
            color: signal.saturation < 35 ? '#10B981' : signal.saturation < 60 ? '#F59E0B' : '#EF4444',
          }}>
            {signal.saturation}%
          </div>
        </div>
      </div>

      {/* Velocity */}
      <div className="space-y-1.5 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-600">Velocity</span>
          <span className="text-[10px] font-mono text-slate-400">{velocityLabel(signal.velocity)} · {signal.velocity}/100</span>
        </div>
        <VelocityBar value={signal.velocity} color="#00D9FF" />
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {signal.platforms.map((p) => (
            <span
              key={p}
              className="text-[9px] font-mono px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B' }}
            >
              {PLATFORM_LABELS[p]}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-slate-600" />
          <span className="text-[10px] text-slate-600">{signal.timeToSaturation}</span>
        </div>
      </div>

      {/* Angle tip */}
      <div
        className="mt-3 rounded-xl px-3 py-2.5"
        style={{ background: 'rgba(0,217,255,0.05)', border: '1px solid rgba(0,217,255,0.1)' }}
      >
        <p className="text-[10px] font-mono text-slate-500 uppercase mb-0.5">Top Angle</p>
        <p className="text-xs text-slate-300 leading-relaxed">{signal.topAngle}</p>
      </div>
    </div>
  );
}

function FilterBar({
  search, setSearch,
  category, setCategory,
  platform, setPlatform,
  status, setStatus,
  sortBy, setSortBy,
}: {
  search: string; setSearch: (v: string) => void;
  category: string; setCategory: (v: string) => void;
  platform: string; setPlatform: (v: string) => void;
  status: string; setStatus: (v: string) => void;
  sortBy: string; setSortBy: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[200px]"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search signals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-white placeholder-slate-600 outline-none flex-1"
        />
      </div>

      {/* Category */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="text-xs rounded-xl px-3 py-2 text-slate-300 outline-none cursor-pointer"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: '#0D0F23' }}>{c}</option>)}
      </select>

      {/* Platform */}
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="text-xs rounded-xl px-3 py-2 text-slate-300 outline-none cursor-pointer"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {PLATFORMS.map((p) => (
          <option key={p} value={p} style={{ background: '#0D0F23' }}>
            {p === 'all' ? 'All Platforms' : PLATFORM_LABELS[p]}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="text-xs rounded-xl px-3 py-2 text-slate-300 outline-none cursor-pointer"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        {STATUSES.map((s) => <option key={s} value={s} style={{ background: '#0D0F23' }}>{s === 'all' ? 'All Statuses' : STATUS_LABELS[s].label}</option>)}
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="text-xs rounded-xl px-3 py-2 text-slate-300 outline-none cursor-pointer"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <option value="opportunity" style={{ background: '#0D0F23' }}>Sort: Opportunity</option>
        <option value="velocity" style={{ background: '#0D0F23' }}>Sort: Velocity</option>
        <option value="saturation" style={{ background: '#0D0F23' }}>Sort: Low Saturation</option>
        <option value="growth" style={{ background: '#0D0F23' }}>Sort: Growth Rate</option>
      </select>
    </div>
  );
}

export default function SignalExplorerPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [platform, setPlatform] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('opportunity');

  const filtered = useMemo(() => {
    let list = [...mockSignals];
    if (search) list = list.filter((s) => s.topic.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'All') list = list.filter((s) => s.category === category);
    if (platform !== 'all') list = list.filter((s) => s.platforms.includes(platform as Platform));
    if (status !== 'all') list = list.filter((s) => s.status === status);
    list.sort((a, b) => {
      if (sortBy === 'opportunity') return b.opportunityScore - a.opportunityScore;
      if (sortBy === 'velocity') return b.velocity - a.velocity;
      if (sortBy === 'saturation') return a.saturation - b.saturation;
      if (sortBy === 'growth') return parseInt(b.weeklyGrowth) - parseInt(a.weeklyGrowth);
      return 0;
    });
    return list;
  }, [search, category, platform, status, sortBy]);

  const emergingCount = filtered.filter((s) => s.status === 'emerging').length;
  const risingCount = filtered.filter((s) => s.status === 'rising').length;

  return (
    <div className="min-h-screen" style={{ background: '#080A1A' }}>
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 px-8 py-4"
        style={{ background: 'rgba(8,10,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(176,38,255,0.15)', border: '1px solid rgba(176,38,255,0.25)' }}>
              <Radar className="w-4 h-4" style={{ color: '#B026FF' }} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Signal Explorer</h1>
              <p className="text-xs text-slate-500 font-mono">Discover trending content signals</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <Activity className="w-3 h-3" style={{ color: '#10B981' }} />
              <span className="text-xs font-mono" style={{ color: '#10B981' }}>{risingCount} rising · {emergingCount} emerging</span>
            </div>
          </div>
        </div>
        <FilterBar
          search={search} setSearch={setSearch}
          category={category} setCategory={setCategory}
          platform={platform} setPlatform={setPlatform}
          status={status} setStatus={setStatus}
          sortBy={sortBy} setSortBy={setSortBy}
        />
      </div>

      {/* Stats strip */}
      <div className="flex items-center gap-6 px-8 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {(['emerging', 'rising', 'peak', 'declining'] as TrendStatus[]).map((s) => {
          const count = mockSignals.filter((sig) => sig.status === s).length;
          const sc = statusColor(s);
          const { label, icon: Icon } = STATUS_LABELS[s];
          return (
            <button
              key={s}
              onClick={() => setStatus(status === s ? 'all' : s)}
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: `${sc}15` }}>
                <Icon className="w-3 h-3" style={{ color: sc }} />
              </div>
              <span className="text-sm font-semibold text-white">{count}</span>
              <span className="text-xs text-slate-500">{label}</span>
            </button>
          );
        })}
        <div className="ml-auto text-xs text-slate-600 font-mono">{filtered.length} of {mockSignals.length} signals</div>
      </div>

      {/* Grid */}
      <div className="px-8 py-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Radar className="w-10 h-10 text-slate-700 mb-3" />
            <p className="text-slate-400 font-medium">No signals match your filters</p>
            <p className="text-slate-600 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import {
  mockSignals,
  mockOpportunities,
  mockAgents,
  mockAlerts,
  dailyBrief,
  platformStats,
  getTopOpportunities,
  getUnreadAlerts,
  velocityLabel,
  statusColor,
  scoreColor,
  type Platform,
} from '@/lib/mock-data';
import {
  TrendingUp,
  Zap,
  AlertTriangle,
  Eye,
  ArrowUpRight,
  BarChart2,
  Clock,
  Star,
  ChevronRight,
  Activity,
  Target,
  Layers,
} from 'lucide-react';

const PLATFORM_ICONS: Record<Platform, string> = {
  tiktok: 'TK',
  youtube: 'YT',
  instagram: 'IG',
  x: 'X',
  threads: 'TH',
};

const PLATFORM_COLORS: Record<Platform, string> = {
  tiktok: '#FF0050',
  youtube: '#FF0000',
  instagram: '#E1306C',
  x: '#1D9BF0',
  threads: '#888888',
};

function TopBar() {
  const unread = getUnreadAlerts().length;
  return (
    <div
      className="sticky top-0 z-10 flex items-center justify-between px-8 py-4"
      style={{
        background: 'rgba(8, 10, 26, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div>
        <h1 className="text-lg font-bold text-white tracking-tight">Command Center</h1>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div className="flex items-center gap-3">
        {unread > 0 && (
          <Link href="/dashboard/alerts">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full cursor-pointer transition-all hover:opacity-80"
              style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#EF4444' }} />
              <span className="text-xs font-semibold" style={{ color: '#EF4444' }}>{unread} alerts</span>
            </div>
          </Link>
        )}
        <Link href="/dashboard/opportunities">
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full cursor-pointer transition-all hover:opacity-80"
            style={{
              background: 'linear-gradient(135deg, rgba(0,217,255,0.15), rgba(176,38,255,0.1))',
              border: '1px solid rgba(0,217,255,0.25)',
            }}
          >
            <Zap className="w-3.5 h-3.5" style={{ color: '#00D9FF' }} />
            <span className="text-xs font-semibold" style={{ color: '#00D9FF' }}>View Opportunities</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

function DailyBriefBanner() {
  return (
    <div
      className="mx-8 mt-6 rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0,217,255,0.08) 0%, rgba(176,38,255,0.06) 50%, rgba(247,37,133,0.05) 100%)',
        border: '1px solid rgba(0,217,255,0.15)',
      }}
    >
      <div className="absolute top-0 right-0 w-64 h-32 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00D9FF, transparent)' }} />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00D9FF' }} />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-widest" style={{ color: '#00D9FF' }}>
              Today's Intelligence Brief
            </span>
          </div>
          <p className="text-white font-semibold text-base leading-snug max-w-xl">
            {dailyBrief.headline}
          </p>
          <p className="text-slate-400 text-sm mt-1.5">{dailyBrief.summary}</p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0 pt-1">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{dailyBrief.topOpportunityCount}</p>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Opportunities</p>
          </div>
          <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{dailyBrief.risingSignalCount}</p>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Signals</p>
          </div>
          <div className="w-px h-8" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="text-center">
            <p className="text-2xl font-bold" style={{ color: '#EF4444' }}>{dailyBrief.newAlertCount}</p>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Alerts</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICards() {
  const topOpp = getTopOpportunities(1)[0];
  const risingCount = mockSignals.filter((s) => s.status === 'rising').length;
  const emergingCount = mockSignals.filter((s) => s.status === 'emerging').length;
  const unreadAlerts = getUnreadAlerts().length;

  const cards = [
    {
      label: 'Top Opportunity Score',
      value: `${topOpp?.score ?? 0}`,
      unit: '/100',
      sub: topOpp?.title ?? '—',
      icon: Star,
      color: '#10B981',
      href: '/dashboard/opportunities',
    },
    {
      label: 'Rising Signals',
      value: `${risingCount}`,
      unit: ' active',
      sub: 'High velocity, low saturation',
      icon: TrendingUp,
      color: '#00D9FF',
      href: '/dashboard/signals',
    },
    {
      label: 'Emerging Trends',
      value: `${emergingCount}`,
      unit: ' new',
      sub: 'Early mover windows open',
      icon: Activity,
      color: '#B026FF',
      href: '/dashboard/signals',
    },
    {
      label: 'Unread Alerts',
      value: `${unreadAlerts}`,
      unit: ' urgent',
      sub: 'Requires your attention',
      icon: AlertTriangle,
      color: unreadAlerts > 0 ? '#EF4444' : '#64748B',
      href: '/dashboard/alerts',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-8 mt-6">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <Link key={c.label} href={c.href}>
            <div
              className="rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:translate-y-[-2px] group"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: `${c.color}18`, border: `1px solid ${c.color}25` }}
                >
                  <Icon className="w-4 h-4" style={{ color: c.color }} />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-slate-400 transition-colors" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{c.value}</span>
                <span className="text-sm text-slate-500">{c.unit}</span>
              </div>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5 uppercase tracking-wide">{c.label}</p>
              <p className="text-xs text-slate-600 mt-1 truncate">{c.sub}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function TopOpportunitiesPanel() {
  const opps = getTopOpportunities(3);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
    >
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-2.5">
          <Target className="w-4 h-4" style={{ color: '#10B981' }} />
          <span className="text-sm font-semibold text-white">Top Opportunities Today</span>
        </div>
        <Link href="/dashboard/opportunities">
          <span className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </span>
        </Link>
      </div>
      <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        {opps.map((opp, i) => (
          <div key={opp.id} className="px-6 py-4 flex items-start gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
              style={{
                background: i === 0 ? 'linear-gradient(135deg, #10B981, #059669)' : 'rgba(255,255,255,0.05)',
                color: i === 0 ? 'white' : '#64748B',
              }}
            >
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white leading-snug">{opp.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 italic truncate">{opp.hook}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                  style={{ background: `${scoreColor(opp.score)}15`, color: scoreColor(opp.score), border: `1px solid ${scoreColor(opp.score)}25` }}>
                  Score {opp.score}
                </span>
                <span className="text-[10px] text-slate-600">{opp.estimatedReach} reach</span>
                <span className="text-[10px] text-slate-600">{opp.timeToCreate}</span>
              </div>
            </div>
            <div className="flex gap-1.5 flex-shrink-0">
              {opp.formats.slice(0, 2).map((f) => (
                <span key={f} className="text-[9px] font-mono px-1.5 py-0.5 rounded"
                  style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B' }}>
                  {f.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrendSignalsPanel() {
  const rising = mockSignals.filter((s) => s.status === 'rising' || s.status === 'emerging').slice(0, 5);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
    >
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-2.5">
          <BarChart2 className="w-4 h-4" style={{ color: '#00D9FF' }} />
          <span className="text-sm font-semibold text-white">Rising Signals</span>
        </div>
        <Link href="/dashboard/signals">
          <span className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1">
            Explore <ChevronRight className="w-3 h-3" />
          </span>
        </Link>
      </div>
      <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        {rising.map((sig) => (
          <div key={sig.id} className="px-6 py-3.5 flex items-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-white truncate">{sig.topic}</span>
                <span
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: `${statusColor(sig.status)}15`, color: statusColor(sig.status) }}
                >
                  {sig.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-slate-500 font-mono">{sig.weeklyGrowth}</span>
                <span className="text-[10px] text-slate-600">{sig.totalViews} views</span>
                <span className="text-[10px] text-slate-600">{sig.timeToSaturation}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-600 font-mono">vel</span>
                <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: `${sig.velocity}%`, background: '#00D9FF' }} />
                </div>
                <span className="text-[10px] font-mono text-slate-400 w-7 text-right">{sig.velocity}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-600 font-mono">sat</span>
                <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${sig.saturation}%`,
                      background: sig.saturation < 40 ? '#10B981' : sig.saturation < 65 ? '#F59E0B' : '#EF4444',
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-400 w-7 text-right">{sig.saturation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentPipelinePanel() {
  const activeAgents = mockAgents.filter((a) => a.status === 'active' || a.status === 'processing');
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
    >
      <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-2.5">
          <Zap className="w-4 h-4" style={{ color: '#B026FF' }} />
          <span className="text-sm font-semibold text-white">Agent Pipeline</span>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full ml-1"
            style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}
          >
            {activeAgents.length} active
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        {mockAgents.map((agent) => (
          <div
            key={agent.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: agent.status === 'active' ? '#10B981' : agent.status === 'processing' ? agent.color : '#334155',
                boxShadow: agent.status === 'active' ? `0 0 6px ${agent.color}60` : undefined,
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-300 truncate">{agent.name}</p>
            </div>
            <span
              className="text-[9px] font-mono px-1.5 py-0.5 rounded flex-shrink-0"
              style={{
                background: agent.status === 'active' ? 'rgba(16,185,129,0.1)' : agent.status === 'processing' ? `${agent.color}15` : 'rgba(255,255,255,0.04)',
                color: agent.status === 'active' ? '#10B981' : agent.status === 'processing' ? agent.color : '#475569',
              }}
            >
              {agent.status === 'processing' ? 'processing' : agent.status}
            </span>
            <span className="text-[10px] font-mono text-slate-600 flex-shrink-0 w-20 text-right">{agent.throughput}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsPanel() {
  const recent = mockAlerts.slice(0, 4);
  const typeStyles: Record<string, { bg: string; color: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }> = {
    urgent: { bg: 'rgba(239,68,68,0.1)', color: '#EF4444', icon: AlertTriangle },
    opportunity: { bg: 'rgba(16,185,129,0.1)', color: '#10B981', icon: Zap },
    signal: { bg: 'rgba(0,217,255,0.1)', color: '#00D9FF', icon: Activity },
    info: { bg: 'rgba(99,102,241,0.1)', color: '#6366F1', icon: Layers },
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
    >
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4" style={{ color: '#EF4444' }} />
          <span className="text-sm font-semibold text-white">Recent Alerts</span>
        </div>
        <Link href="/dashboard/alerts">
          <span className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </span>
        </Link>
      </div>
      <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        {recent.map((alert) => {
          const style = typeStyles[alert.type] ?? typeStyles.info;
          const Icon = style.icon;
          return (
            <div key={alert.id} className={`px-6 py-3.5 flex items-start gap-3 hover:bg-white/[0.02] transition-colors ${!alert.read ? 'bg-white/[0.01]' : ''}`}>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: style.bg }}>
                <Icon className="w-3.5 h-3.5" style={{ color: style.color } as React.CSSProperties} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {!alert.read && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: style.color }} />}
                  <p className="text-xs font-medium text-slate-200 leading-snug truncate">{alert.title}</p>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{alert.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlatformActivityPanel() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
    >
      <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-2.5">
          <Eye className="w-4 h-4" style={{ color: '#F59E0B' }} />
          <span className="text-sm font-semibold text-white">Platform Activity</span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {(Object.entries(platformStats) as [Platform, (typeof platformStats)[Platform]][]).map(([platform, data]) => (
          <div key={platform} className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold flex-shrink-0"
              style={{ background: `${data.color}18`, color: data.color, border: `1px solid ${data.color}25` }}
            >
              {PLATFORM_ICONS[platform]}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-300">{data.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">{data.trending} trending</span>
                  <span className="text-xs font-mono text-slate-400">{data.activity}%</span>
                </div>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${data.activity}%`, background: data.color }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OptimalPostTime() {
  return (
    <div
      className="rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.06))',
        border: '1px solid rgba(16,185,129,0.18)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4" style={{ color: '#10B981' }} />
        <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: '#10B981' }}>Optimal Post Time</span>
      </div>
      <p className="text-4xl font-bold text-white">7:45 PM</p>
      <p className="text-sm text-slate-400 mt-1">Tonight · All major platforms</p>
      <div className="flex items-center gap-2 mt-3">
        <span
          className="text-[10px] font-mono px-2 py-1 rounded-full"
          style={{ background: 'rgba(16,185,129,0.12)', color: '#10B981', border: '1px solid rgba(16,185,129,0.2)' }}
        >
          Peak engagement window
        </span>
        <span
          className="text-[10px] font-mono px-2 py-1 rounded-full"
          style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B' }}
        >
          +2.3x avg reach
        </span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen" style={{ background: '#080A1A' }}>
      <TopBar />
      <DailyBriefBanner />
      <KPICards />

      <div className="px-8 mt-6 grid grid-cols-1 xl:grid-cols-3 gap-5 pb-8">
        {/* Left column (2/3) */}
        <div className="xl:col-span-2 space-y-5">
          <TopOpportunitiesPanel />
          <TrendSignalsPanel />
          <AgentPipelinePanel />
        </div>

        {/* Right column (1/3) */}
        <div className="space-y-5">
          <OptimalPostTime />
          <AlertsPanel />
          <PlatformActivityPanel />
        </div>
      </div>
    </div>
  );
}

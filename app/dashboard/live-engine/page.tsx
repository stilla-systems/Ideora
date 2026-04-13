'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Zap, TrendingUp, Bell, BellOff } from 'lucide-react';

type AlertType = 'urgent' | 'opportunity' | 'signal';

interface Alert {
  id: string;
  type: AlertType;
  title: string;
  body: string;
  platform: string;
  timeAgo: string;
  actionable: boolean;
}

const ALERTS: Alert[] = [
  {
    id: '1',
    type: 'urgent',
    title: 'TikTok Algorithm Shift Detected',
    body: 'New content distribution pattern favouring videos under 45 seconds with captions. Update your format immediately to maintain reach.',
    platform: 'TikTok',
    timeAgo: '12 min ago',
    actionable: true,
  },
  {
    id: '2',
    type: 'opportunity',
    title: '#AIFails Trending on YouTube Shorts',
    body: 'This hashtag is gaining 800K daily impressions. High engagement window open for the next 36–48 hours. Act now.',
    platform: 'YouTube',
    timeAgo: '28 min ago',
    actionable: true,
  },
  {
    id: '3',
    type: 'signal',
    title: 'Your Audience Peak: Friday 8 PM',
    body: 'Historical data shows your audience is 2.4× more active Friday evenings. Schedule your next post for maximum reach.',
    platform: 'All Platforms',
    timeAgo: '1 hr ago',
    actionable: false,
  },
  {
    id: '4',
    type: 'opportunity',
    title: 'Competitor Gap: Educational Shorts',
    body: 'Three of your closest competitors paused posting. There\'s a 3-day window to capture their audience with educational content.',
    platform: 'TikTok & YouTube',
    timeAgo: '2 hr ago',
    actionable: true,
  },
  {
    id: '5',
    type: 'signal',
    title: 'Engagement Spike on Threads',
    body: 'Your Threads posts are getting 3× usual saves this week. Consider cross-posting your top TikTok content there.',
    platform: 'Threads',
    timeAgo: '4 hr ago',
    actionable: false,
  },
  {
    id: '6',
    type: 'urgent',
    title: 'Viral Sound Window Closing',
    body: 'The trending audio "Espresso" is at peak velocity now. Use it in the next 12 hours for maximum algorithmic boost.',
    platform: 'Instagram & TikTok',
    timeAgo: '5 hr ago',
    actionable: true,
  },
];

const ALERT_CONFIG: Record<
  AlertType,
  { bg: string; border: string; icon: typeof AlertCircle; label: string; labelColor: string }
> = {
  urgent: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: AlertCircle,
    label: 'URGENT',
    labelColor: 'text-red-400',
  },
  opportunity: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    icon: Zap,
    label: 'OPPORTUNITY',
    labelColor: 'text-yellow-400',
  },
  signal: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    icon: TrendingUp,
    label: 'SIGNAL',
    labelColor: 'text-green-400',
  },
};

export default function LiveEnginePage() {
  const [filter, setFilter] = useState<AlertType | 'all'>('all');
  const [notificationsOn, setNotificationsOn] = useState(true);

  const filtered = filter === 'all' ? ALERTS : ALERTS.filter((a) => a.type === filter);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold">Live Engine</h1>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Live
                </span>
              </div>
              <p className="mt-1 text-foreground/60 text-sm">Real-time alerts and growth opportunities</p>
            </div>
            <button
              onClick={() => setNotificationsOn(!notificationsOn)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-sm transition-all w-fit"
            >
              {notificationsOn ? (
                <Bell className="h-4 w-4 text-cyan-400" />
              ) : (
                <BellOff className="h-4 w-4 text-foreground/40" />
              )}
              <span className="text-foreground/70">
                {notificationsOn ? 'Notifications On' : 'Notifications Off'}
              </span>
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { type: 'urgent', label: 'Urgent', count: 2, color: 'text-red-400' },
                { type: 'opportunity', label: 'Opportunities', count: 2, color: 'text-yellow-400' },
                { type: 'signal', label: 'Signals', count: 2, color: 'text-green-400' },
              ] as const
            ).map(({ type, label, count, color }) => (
              <Card
                key={type}
                className={`border border-white/10 bg-card p-4 text-center cursor-pointer transition-all hover:border-white/20 ${
                  filter === type ? 'ring-1 ring-white/20' : ''
                }`}
                onClick={() => setFilter(filter === type ? 'all' : type)}
              >
                <div className={`text-2xl font-bold ${color}`}>{count}</div>
                <p className="text-xs text-foreground/50 mt-1">{label}</p>
              </Card>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {(['all', 'urgent', 'opportunity', 'signal'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border capitalize ${
                  filter === f
                    ? 'bg-white/15 border-white/20 text-white'
                    : 'bg-white/5 border-white/10 text-foreground/50 hover:bg-white/10'
                }`}
              >
                {f === 'all' ? 'All Alerts' : f}
              </button>
            ))}
          </div>

          {/* Alerts List */}
          <div className="space-y-3">
            {filtered.map((alert) => {
              const cfg = ALERT_CONFIG[alert.type];
              const Icon = cfg.icon;
              return (
                <Card
                  key={alert.id}
                  className={`border p-4 sm:p-5 ${cfg.bg} ${cfg.border} transition-all`}
                >
                  <div className="flex gap-3">
                    <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${cfg.labelColor}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-[10px] font-mono font-bold ${cfg.labelColor}`}>
                          {cfg.label}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[10px] border-white/10 text-foreground/50"
                        >
                          {alert.platform}
                        </Badge>
                        <span className="text-[10px] text-foreground/30 ml-auto">{alert.timeAgo}</span>
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{alert.title}</h3>
                      <p className="text-xs text-foreground/60 leading-relaxed">{alert.body}</p>
                      {alert.actionable && (
                        <button className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                          Take Action →
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

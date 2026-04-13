'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Zap, TrendingUp, Bell, BellOff, X, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

type AlertType = 'urgent' | 'opportunity' | 'signal';

interface Alert {
  id: string;
  type: AlertType;
  title: string;
  body: string;
  platform: string;
  timeAgo: string;
  actionable: boolean;
  actionSteps?: string[];
  actionLink?: string;
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
    actionSteps: [
      'Trim your next video to under 45 seconds',
      'Add auto-captions or manual subtitles',
      'Use trending sounds from the TikTok Creator Marketplace',
      'Post within the next 2 hours for peak window',
    ],
  },
  {
    id: '2',
    type: 'opportunity',
    title: '#AIFails Trending on YouTube Shorts',
    body: 'This hashtag is gaining 800K daily impressions. High engagement window open for the next 36–48 hours. Act now.',
    platform: 'YouTube',
    timeAgo: '28 min ago',
    actionable: true,
    actionSteps: [
      'Create a 60-second Shorts compilation of AI blunders',
      'Use #AIFails #AIFunny #ChatGPT in description',
      'Post between 6–8 PM for maximum impressions',
      'Include a "comment your AI fail" CTA at 55s',
    ],
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
    actionSteps: [
      'Post 2 educational Shorts over the next 3 days',
      'Use their audience\'s top keywords in your captions',
      'Respond to comments on recent competitor posts to gain visibility',
      'Mirror their best-performing content format (add your own angle)',
    ],
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
    actionSteps: [
      'Open TikTok Creator → search "Espresso" → use trending version',
      'Record a 15–30s clip that fits your niche',
      'Use a text hook in the first frame',
      'Post in the next 12 hours — window closes after that',
    ],
  },
];

const ALERT_CONFIG: Record<
  AlertType,
  { bg: string; border: string; icon: typeof AlertCircle; label: string; labelColor: string }
> = {
  urgent: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: AlertCircle, label: 'URGENT', labelColor: 'text-red-400' },
  opportunity: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: Zap, label: 'OPPORTUNITY', labelColor: 'text-yellow-400' },
  signal: { bg: 'bg-green-500/10', border: 'border-green-500/30', icon: TrendingUp, label: 'SIGNAL', labelColor: 'text-green-400' },
};

function ActionModal({ alert, onClose }: { alert: Alert; onClose: () => void }) {
  const cfg = ALERT_CONFIG[alert.type];
  const Icon = cfg.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${cfg.labelColor}`} />
            <span className={`text-xs font-mono font-bold ${cfg.labelColor}`}>{cfg.label}</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 text-foreground/50">
            <X className="h-4 w-4" />
          </button>
        </div>
        <h3 className="font-bold mb-2">{alert.title}</h3>
        <p className="text-sm text-foreground/60 mb-5">{alert.body}</p>

        {alert.actionSteps && (
          <div className="space-y-2 mb-5">
            <p className="text-xs font-semibold text-foreground/50 uppercase tracking-wider">Action Steps</p>
            {alert.actionSteps.map((step, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-foreground/50 shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-foreground/80">{step}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-white/10">
          <Button
            className={`flex-1 text-sm ${
              alert.type === 'urgent'
                ? 'bg-red-600 hover:bg-red-700'
                : alert.type === 'opportunity'
                ? 'bg-yellow-600 hover:bg-yellow-700'
                : 'bg-green-600 hover:bg-green-700'
            } text-white`}
            onClick={() => {
              toast.success('Action logged', { description: 'This opportunity has been saved to your action list.' });
              onClose();
            }}
          >
            Mark as Actioned
          </Button>
          <Button variant="outline" className="border-white/10 text-sm" onClick={onClose}>
            Dismiss
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function LiveEnginePage() {
  const [filter, setFilter] = useState<AlertType | 'all'>('all');
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [activeModal, setActiveModal] = useState<Alert | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const filtered = (filter === 'all' ? ALERTS : ALERTS.filter((a) => a.type === filter))
    .filter((a) => !dismissed.has(a.id));

  const handleDismiss = (id: string) => {
    setDismissed((prev) => new Set([...prev, id]));
    toast.success('Alert dismissed');
  };

  const toggleNotifications = () => {
    const next = !notificationsOn;
    setNotificationsOn(next);
    toast.success(next ? 'Notifications enabled' : 'Notifications paused', {
      description: next ? 'You\'ll be alerted of new opportunities.' : 'No new alerts until you re-enable.',
    });
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      {activeModal && <ActionModal alert={activeModal} onClose={() => setActiveModal(null)} />}

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
              onClick={toggleNotifications}
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
                { type: 'urgent', label: 'Urgent', count: ALERTS.filter(a => a.type === 'urgent').length, color: 'text-red-400' },
                { type: 'opportunity', label: 'Opportunities', count: ALERTS.filter(a => a.type === 'opportunity').length, color: 'text-yellow-400' },
                { type: 'signal', label: 'Signals', count: ALERTS.filter(a => a.type === 'signal').length, color: 'text-green-400' },
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
          {filtered.length === 0 ? (
            <Card className="border border-white/10 bg-card p-8 text-center">
              <p className="text-foreground/50 text-sm">No alerts in this category. Check back soon.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filtered.map((alert) => {
                const cfg = ALERT_CONFIG[alert.type];
                const Icon = cfg.icon;
                return (
                  <Card key={alert.id} className={`border p-4 sm:p-5 ${cfg.bg} ${cfg.border} transition-all`}>
                    <div className="flex gap-3">
                      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${cfg.labelColor}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-[10px] font-mono font-bold ${cfg.labelColor}`}>{cfg.label}</span>
                          <Badge variant="outline" className="text-[10px] border-white/10 text-foreground/50">
                            {alert.platform}
                          </Badge>
                          <span className="text-[10px] text-foreground/30 ml-auto">{alert.timeAgo}</span>
                        </div>
                        <h3 className="font-semibold text-sm mb-1">{alert.title}</h3>
                        <p className="text-xs text-foreground/60 leading-relaxed">{alert.body}</p>
                        <div className="flex gap-3 mt-3">
                          {alert.actionable && (
                            <button
                              className={`text-xs font-medium transition-colors flex items-center gap-1 ${cfg.labelColor} hover:opacity-80`}
                              onClick={() => setActiveModal(alert)}
                            >
                              <ExternalLink className="h-3 w-3" />
                              Take Action
                            </button>
                          )}
                          <button
                            className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
                            onClick={() => handleDismiss(alert.id)}
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
